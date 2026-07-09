#!/usr/bin/env python3
from __future__ import annotations

import argparse
import dataclasses
import datetime as dt
import email
import html
import imaplib
import os
import re
import socket
import ssl
from collections import Counter, defaultdict
from email.utils import getaddresses
from pathlib import Path

from dotenv import load_dotenv
from reportlab.lib import colors
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import mm
from reportlab.platypus import KeepTogether, Paragraph, PageBreak, SimpleDocTemplate, Spacer, Table, TableStyle

from mail_report import (
    Config,
    MailItem,
    classify_keywords,
    connect,
    decode_value,
    env_list,
    extract_text,
    format_hours,
    hours_between,
    normalize_text,
    parse_message,
    register_font,
    sender_domain,
)


ROOT = Path(__file__).resolve().parent


@dataclasses.dataclass
class MonthlyConfig:
    base: Config
    period: str
    service_domains: list[str]
    service_senders: list[str]
    env_file: Path


def load_monthly_config(env_path: Path) -> MonthlyConfig:
    load_dotenv(env_path, override=True)
    reports_dir = Path(os.getenv("REPORTS_DIR", "reports"))
    if not reports_dir.is_absolute():
        reports_dir = ROOT / reports_dir
    base = Config(
        imap_host=os.getenv("IMAP_HOST", "").strip(),
        imap_port=int(os.getenv("IMAP_PORT", "993")),
        imap_user=os.getenv("IMAP_USER", "").strip(),
        imap_password=os.getenv("IMAP_PASSWORD", "").strip(),
        mailbox_label=os.getenv("MAILBOX_LABEL", os.getenv("IMAP_USER", "skrzynka")).strip(),
        days=31,
        folders=env_list(os.getenv("MAIL_FOLDERS", "INBOX")),
        sent_folders=env_list(os.getenv("SENT_FOLDERS", "")),
        company_domains=[d.lower() for d in env_list(os.getenv("COMPANY_DOMAINS", ""))],
        reports_dir=reports_dir,
        ollama_url=os.getenv("OLLAMA_URL", "http://localhost:11434/api/generate").strip(),
        ollama_model=os.getenv("OLLAMA_MODEL", "").strip(),
    )
    return MonthlyConfig(
        base=base,
        period=os.getenv("PERIOD", "previous_month").strip(),
        service_domains=[d.lower() for d in env_list(os.getenv("SERVICE_DOMAINS", ""))],
        service_senders=[s.lower() for s in env_list(os.getenv("SERVICE_SENDERS", ""))],
        env_file=env_path,
    )


def require_config(config: MonthlyConfig) -> None:
    missing = []
    if not config.base.imap_host:
        missing.append("IMAP_HOST")
    if not config.base.imap_user:
        missing.append("IMAP_USER")
    if not config.base.imap_password or config.base.imap_password == "WSTAW_HASLO_TUTAJ":
        missing.append("IMAP_PASSWORD")
    if missing:
        raise SystemExit(f"Brakuje konfiguracji w {config.env_file}: {', '.join(missing)}")


def previous_month_range(today: dt.date | None = None) -> tuple[dt.date, dt.date]:
    today = today or dt.date.today()
    first_this_month = today.replace(day=1)
    last_prev_month = first_this_month - dt.timedelta(days=1)
    first_prev_month = last_prev_month.replace(day=1)
    return first_prev_month, first_this_month


def imap_date(value: dt.date) -> str:
    return value.strftime("%d-%b-%Y")


def fetch_mail_range(config: MonthlyConfig, start: dt.date, end_exclusive: dt.date) -> list[MailItem]:
    require_config(config)
    items: list[MailItem] = []
    folder_roles = [(folder, "przychodzacy") for folder in config.base.folders]
    folder_roles.extend((folder, "wyslany") for folder in config.base.sent_folders)
    with connect(config.base) as imap:
        for folder, direction in folder_roles:
            status, _ = imap.select(f'"{folder}"', readonly=True)
            if status != "OK":
                print(f"Pomijam folder, nie udalo sie otworzyc: {folder}")
                continue
            query = f'(SINCE "{imap_date(start)}" BEFORE "{imap_date(end_exclusive)}")'
            status, data = imap.uid("search", None, query)
            if status != "OK" or not data or not data[0]:
                continue
            for uid_bytes in data[0].split():
                uid = uid_bytes.decode("ascii", errors="replace")
                status, msg_data = imap.uid("fetch", uid, "(RFC822)")
                if status != "OK":
                    continue
                for part in msg_data or []:
                    if isinstance(part, tuple) and part[1]:
                        parsed = parse_message(config.base, folder, uid, part[1], direction)
                        if parsed:
                            items.append(parsed)
    return sorted(items, key=lambda item: item.date)


def is_company(config: MonthlyConfig, address: str) -> bool:
    return sender_domain(address) in config.base.company_domains


def is_service(config: MonthlyConfig, item: MailItem) -> bool:
    address = item.sender_email.lower()
    local = address.split("@", 1)[0] if "@" in address else address
    domain = sender_domain(address)
    if domain in config.service_domains:
        return True
    if any(domain.endswith("." + service_domain) for service_domain in config.service_domains):
        return True
    if any(local.startswith(prefix) for prefix in config.service_senders):
        return True
    subject = item.subject.lower()
    service_words = ["newsletter", "powiadomienie", "notification", "konto", "marketplace", "automatycznie", "status zamowienia"]
    return any(word in subject for word in service_words)


def normalize_subject(subject: str) -> str:
    value = subject.lower()
    value = re.sub(r"^\s*(re|fw|fwd|odp)\s*:\s*", "", value, flags=re.I)
    value = re.sub(r"\[[^\]]+\]", " ", value)
    value = re.sub(r"#\d+", " ", value)
    value = re.sub(r"[^a-z0-9ąćęłńóśźż ]+", " ", value)
    value = re.sub(r"\s+", " ", value).strip()
    return value[:90] or "(bez tematu)"


def external_participants(config: MonthlyConfig, item: MailItem) -> list[str]:
    candidates = [item.sender_email] + [addr.lower() for addr in item.recipients]
    return sorted({addr for addr in candidates if addr and not is_company(config, addr)})


def thread_key(config: MonthlyConfig, item: MailItem) -> tuple[str, str]:
    participants = external_participants(config, item)
    party = participants[0] if participants else sender_domain(item.sender_email) or item.sender_email
    return party, normalize_subject(item.subject)


def split_reports(config: MonthlyConfig, items: list[MailItem]) -> tuple[list[MailItem], list[MailItem]]:
    service = [item for item in items if is_service(config, item)]
    service_keys = {(item.folder, item.uid) for item in service}
    business = [item for item in items if (item.folder, item.uid) not in service_keys]
    return business, service


def build_threads(config: MonthlyConfig, items: list[MailItem]) -> list[dict]:
    grouped: dict[tuple[str, str], list[MailItem]] = defaultdict(list)
    for item in items:
        grouped[thread_key(config, item)].append(item)
    threads = []
    for key, messages in grouped.items():
        messages = sorted(messages, key=lambda item: item.date)
        incoming = [item for item in messages if item.direction == "przychodzacy" and not is_company(config, item.sender_email)]
        outgoing = [item for item in messages if item.direction == "wyslany"]
        first_incoming = incoming[0] if incoming else None
        first_reply = None
        response_hours = None
        if first_incoming:
            replies = [
                item
                for item in outgoing
                if item.date > first_incoming.date and first_incoming.sender_email in [addr.lower() for addr in item.recipients]
            ]
            if replies:
                first_reply = replies[0]
                response_hours = hours_between(first_incoming.date, first_reply.date)
        last = messages[-1]
        last_side = "klient" if last.direction == "przychodzacy" and not is_company(config, last.sender_email) else "firma"
        categories = sorted({category for item in messages for category in item.categories})
        offer_sent = any(item.direction == "wyslany" and any(cat in {"wycena", "zamowienie", "hurt/b2b"} for cat in item.categories) for item in messages)
        threads.append(
            {
                "key": key,
                "messages": messages,
                "incoming": incoming,
                "outgoing": outgoing,
                "first_incoming": first_incoming,
                "first_reply": first_reply,
                "response_hours": response_hours,
                "last": last,
                "last_side": last_side,
                "categories": categories,
                "offer_sent": offer_sent,
                "salesperson": salesperson_for_thread(messages),
                "state": "",
            }
        )
    threads = sorted(threads, key=lambda thread: thread["last"].date, reverse=True)
    for thread in threads:
        thread["state"] = thread_state(thread)
    return threads


def detect_salesperson(item: MailItem) -> str:
    if item.direction != "wyslany":
        return ""
    if item.sender_name and item.sender_name.lower() not in {"prescot", "prescot led", "info", "biuro"}:
        return item.sender_name
    patterns = [
        r"(?:pozdrawiam|z poważaniem|z powazaniem|z wyrazami szacunku|miłego dnia|milego dnia)[,\s]+([A-ZŁŚŻŹĆŃÓ][a-ząćęłńóśźż]+(?:\s+[A-ZŁŚŻŹĆŃÓ][a-ząćęłńóśźż]+)?)",
        r"([A-ZŁŚŻŹĆŃÓ][a-ząćęłńóśźż]+\s+[A-ZŁŚŻŹĆŃÓ][a-ząćęłńóśźż]+)\s+(?:PRESCOT|Prescot)",
    ]
    for pattern in patterns:
        match = re.search(pattern, item.snippet)
        if match:
            return match.group(1).strip()
    return item.sender_email or "wspolna skrzynka"


def salesperson_for_thread(messages: list[MailItem]) -> str:
    sent = [message for message in messages if message.direction == "wyslany"]
    if not sent:
        return "brak odpowiedzi"
    labels = [detect_salesperson(message) for message in sent]
    labels = [label for label in labels if label]
    return Counter(labels).most_common(1)[0][0] if labels else "wspolna skrzynka"


def thread_state(thread: dict) -> str:
    if thread["last_side"] == "klient" and thread["response_hours"] is None:
        return "czeka na pierwsza odpowiedz"
    if thread["last_side"] == "klient" and thread["first_reply"]:
        return "klient odpisal po handlowcu - wymaga sprawdzenia"
    if thread["last_side"] == "firma" and thread["offer_sent"]:
        return "oferta/wycena wyslana - czeka na klienta lub follow-up"
    if thread["last_side"] == "firma":
        return "ostatni ruch po stronie firmy"
    return "do kwalifikacji"


def thread_age_hours(thread: dict, end_exclusive: dt.date) -> float:
    end_dt = dt.datetime.combine(end_exclusive, dt.time.min, tzinfo=dt.timezone.utc)
    return hours_between(thread["last"].date, end_dt)


def build_analysis(config: MonthlyConfig, all_items: list[MailItem], end_exclusive: dt.date) -> dict:
    business, service = split_reports(config, all_items)
    threads = build_threads(config, business)
    answered = [thread for thread in threads if thread["response_hours"] is not None]
    unanswered = [thread for thread in threads if thread["first_incoming"] and thread["response_hours"] is None and thread["last_side"] == "klient"]
    followed_by_client = [thread for thread in threads if thread["first_reply"] and thread["last_side"] == "klient"]
    offers = [thread for thread in threads if thread["offer_sent"]]
    stale = [thread for thread in unanswered if thread_age_hours(thread, end_exclusive) >= 72]
    avg = sum(thread["response_hours"] for thread in answered) / len(answered) if answered else 0
    by_sales = Counter(thread["salesperson"] for thread in answered)
    response_by_sales: dict[str, list[float]] = defaultdict(list)
    offers_by_sales = Counter()
    open_by_sales = Counter()
    client_reply_by_sales = Counter()
    for thread in answered:
        response_by_sales[thread["salesperson"]].append(thread["response_hours"])
    for thread in offers:
        offers_by_sales[thread["salesperson"]] += 1
    for thread in unanswered:
        open_by_sales[thread["salesperson"]] += 1
    for thread in followed_by_client:
        client_reply_by_sales[thread["salesperson"]] += 1
    system_groups = classify_system_items(service)
    client_domains = Counter(sender_domain(thread["key"][0]) for thread in threads if "@" in thread["key"][0])
    categories = Counter(category for item in business for category in item.categories)
    system_domains = Counter(sender_domain(item.sender_email) for item in service)
    questions = meeting_questions(unanswered, followed_by_client, offers, stale)
    recommendations = ai_recommendations(len(unanswered), len(stale), len(offers), avg, len(followed_by_client), len(service))
    return {
        "business": business,
        "service": service,
        "threads": threads,
        "answered": answered,
        "unanswered": unanswered,
        "followed_by_client": followed_by_client,
        "offers": offers,
        "stale": stale,
        "avg": avg,
        "by_sales": by_sales,
        "response_by_sales": response_by_sales,
        "offers_by_sales": offers_by_sales,
        "open_by_sales": open_by_sales,
        "client_reply_by_sales": client_reply_by_sales,
        "system_groups": system_groups,
        "client_domains": client_domains,
        "categories": categories,
        "system_domains": system_domains,
        "questions": questions,
        "recommendations": recommendations,
    }


def meeting_questions(unanswered: list[dict], followed_by_client: list[dict], offers: list[dict], stale: list[dict]) -> list[str]:
    questions = [
        f"Kto bierze odpowiedzialnosc za {len(unanswered)} watkow bez pierwszej odpowiedzi i ktore z nich sa realnie nadal otwarte?",
        f"Ktore z {len(stale)} tematow zaleglych 72h+ wymagaja telefonu zamiast kolejnego maila?",
        f"Jaki jest status {len(offers)} wyslanych ofert: wygrane, przegrane, do follow-upu czy czekamy na klienta?",
        f"W {len(followed_by_client)} watkach klient odpisal po handlowcu - kto ma domknac nastepny krok?",
        "Czy kazda oferta ma wlasciciela, termin follow-upu i notatke z decyzja klienta?",
        "Ktore automaty/marketplace powinny byc odfiltrowane, zeby nie mieszaly sie z realnymi leadami?",
        "Czy odpowiedzi wychodza ze wspolnej skrzynki, ale wiadomo, ktory handlowiec prowadzi temat?",
        "Jakie 5 tematow z miesiaca moglo wygenerowac sprzedaz, ale nie ma widocznego domkniecia w poczcie?",
    ]
    top = unanswered[:3] + followed_by_client[:3]
    for thread in top:
        questions.append(f"Status watku: {thread['key'][0]} / {thread['last'].subject[:80]} - co jest nastepnym krokiem?")
    return questions[:14]


def ai_recommendations(unanswered: int, stale: int, offers: int, avg: float, client_replies: int, service_count: int) -> list[str]:
    notes = []
    if stale:
        notes.append("Najwiekszy problem operacyjny to zalegle watki 72h+. Wspolna skrzynka powinna miec dzienny przeglad otwartych tematow i wlasciciela dla kazdego watku.")
    if offers:
        notes.append("Oferty wymagaja osobnego statusu: wyslana, follow-up, wygrana, przegrana, brak decyzji. Sama poczta nie wystarczy do kontroli sprzedazy.")
    if client_replies:
        notes.append("Warto pilnowac watkow, gdzie klient odpisal po handlowcu. To czesto sa tematy najbardziej sprzedazowe albo reklamacyjne.")
    if avg and avg > 8:
        notes.append("Sredni czas odpowiedzi przekracza jeden dzien roboczy. Dla zapytan ofertowych celowalbym w SLA 2-4h w godzinach pracy.")
    if service_count:
        notes.append("Automaty i systemy powinny isc do oddzielnego folderu/raportu. Inaczej zaburzaja obraz pracy handlowcow.")
    notes.extend(
        [
            "Dodaj w temacie lub podpisie prosty identyfikator handlowca, jezeli wiele osob odpisuje ze wspolnej skrzynki.",
            "Raz w tygodniu warto robic 20-minutowe spotkanie tylko na: zalegle 72h+, oferty bez follow-upu, klient odpisal po handlowcu.",
            "Potencjal do poprawy: automatyczne tagowanie maili jako oferta, reklamacja, faktura, system, lead B2B oraz eksport otwartych tematow do CRM lub arkusza.",
        ]
    )
    return notes[:9]


def classify_system_items(items: list[MailItem]) -> dict[str, list[MailItem]]:
    groups = {"zamowienia": [], "problemy": [], "ingerencje_handlowca": [], "inne_systemowe": []}
    for item in items:
        text = f"{item.subject} {item.snippet}".lower()
        if any(word in text for word in ["zamowienie", "zamówienie", "order", "sprzedaz", "sprzedaż", "kupil", "kupił"]):
            groups["zamowienia"].append(item)
        elif any(word in text for word in ["blad", "błąd", "problem", "awaria", "serwis", "maintenance", "zgloszenie", "zgłoszenie", "reklamacja"]):
            groups["problemy"].append(item)
        elif item.direction == "wyslany":
            groups["ingerencje_handlowca"].append(item)
        else:
            groups["inne_systemowe"].append(item)
    return groups


def rows(items: list[MailItem], limit: int = 30) -> str:
    if not items:
        return '<tr><td colspan="4">Brak danych</td></tr>'
    return "".join(
        f"<tr><td>{html.escape(item.date.astimezone().strftime('%Y-%m-%d'))}</td><td>{html.escape(item.sender_email)}</td><td>{html.escape(item.subject)}</td><td>{html.escape(', '.join(item.categories))}</td></tr>"
        for item in items[:limit]
    )


def counter_table_html(title: str, counter: Counter[str], limit: int = 12) -> str:
    body = "".join(f"<tr><td>{html.escape(k)}</td><td>{v}</td></tr>" for k, v in counter.most_common(limit))
    return f"<section class='card'><h2>{html.escape(title)}</h2><table>{body or '<tr><td>Brak danych</td><td>-</td></tr>'}</table></section>"


def list_html(items: list[str]) -> str:
    return "<ul>" + "".join(f"<li>{html.escape(item)}</li>" for item in items) + "</ul>"


def generate_monthly_html(config: MonthlyConfig, all_items: list[MailItem], start: dt.date, end_exclusive: dt.date, output: Path) -> None:
    analysis = build_analysis(config, all_items, end_exclusive)
    business = analysis["business"]
    service = analysis["service"]
    answered = analysis["answered"]
    unanswered = analysis["unanswered"]
    followed_by_client = analysis["followed_by_client"]
    offers = analysis["offers"]
    stale = analysis["stale"]
    avg = analysis["avg"]
    by_sales = analysis["by_sales"]
    response_by_sales = analysis["response_by_sales"]
    sales_rows = "".join(
        f"<tr><td>{html.escape(sales)}</td><td>{count}</td><td>{analysis['offers_by_sales'].get(sales, 0)}</td><td>{analysis['open_by_sales'].get(sales, 0)}</td><td>{analysis['client_reply_by_sales'].get(sales, 0)}</td><td>{html.escape(format_hours(sum(response_by_sales[sales]) / len(response_by_sales[sales])))}</td></tr>"
        for sales, count in by_sales.most_common()
    ) or '<tr><td colspan="6">Brak odpowiedzi handlowcow w okresie.</td></tr>'
    thread_rows = "".join(
        f"<tr><td>{html.escape(thread['key'][0])}</td><td>{html.escape(thread['salesperson'])}</td><td>{html.escape(thread['last'].subject)}</td><td>{len(thread['messages'])}</td><td>{html.escape(thread['state'])}</td><td>{html.escape(thread['last'].snippet[:180])}</td></tr>"
        for thread in followed_by_client[:25]
    ) or '<tr><td colspan="6">Brak konwersacji, w ktorych klient dopisal po odpowiedzi firmy.</td></tr>'
    unanswered_rows = "".join(
        f"<tr><td>{html.escape(thread['key'][0])}</td><td>{html.escape(thread['salesperson'])}</td><td>{html.escape(thread['last'].subject)}</td><td>{html.escape(thread['last'].date.astimezone().strftime('%Y-%m-%d'))}</td><td>{html.escape(thread['state'])}</td><td>{html.escape(thread['last'].snippet[:180])}</td></tr>"
        for thread in unanswered[:30]
    ) or '<tr><td colspan="6">Brak nierozwiazanych watkow klientow.</td></tr>'
    offer_rows = "".join(
        f"<tr><td>{html.escape(thread['key'][0])}</td><td>{html.escape(thread['salesperson'])}</td><td>{html.escape(thread['last'].subject)}</td><td>{len(thread['outgoing'])}</td><td>{html.escape(thread['state'])}</td><td>{html.escape(thread['last'].snippet[:180])}</td></tr>"
        for thread in offers[:30]
    ) or '<tr><td colspan="6">Brak wykrytych ofert wyslanych do klientow.</td></tr>'
    system_groups = analysis["system_groups"]
    client_domains = analysis["client_domains"]
    categories = analysis["categories"]
    system_domains = analysis["system_domains"]
    questions = list_html(analysis["questions"])
    recommendations = list_html(analysis["recommendations"])
    title_range = f"{start.isoformat()} - {(end_exclusive - dt.timedelta(days=1)).isoformat()}"
    output.write_text(
        f"""<!doctype html>
<html lang="pl">
<head>
  <meta charset="utf-8">
  <title>Miesieczny raport poczty - {html.escape(config.base.mailbox_label)}</title>
  <style>
    body {{ margin:0; font-family: Inter, Arial, sans-serif; color:#152238; background:#eef3f8; }}
    .wrap {{ max-width:1180px; margin:0 auto; padding:42px 28px; }}
    h1 {{ font-size:34px; margin:0 0 8px; }}
    h2 {{ margin:0 0 12px; font-size:20px; }}
    p {{ color:#667085; margin:0; }}
    .stats {{ display:grid; grid-template-columns:repeat(4,minmax(0,1fr)); gap:12px; margin:24px 0; }}
    .stat,.card {{ border:1px solid #d9e1ee; background:#fff; padding:16px; margin-bottom:14px; border-radius:8px; box-shadow:0 10px 30px rgba(21,34,56,.06); }}
    .stat strong {{ display:block; font-size:28px; line-height:1; margin-bottom:6px; }}
    table {{ width:100%; border-collapse:collapse; background:#fff; }}
    th,td {{ border-bottom:1px solid #d9e1ee; padding:8px; text-align:left; vertical-align:top; font-size:14px; }}
    th {{ font-size:12px; color:#667085; text-transform:uppercase; letter-spacing:.04em; }}
    .grid {{ display:grid; grid-template-columns:repeat(2,minmax(0,1fr)); gap:14px; }}
    .ai {{ border-color:#b9cff7; background:#f5f8ff; }}
  </style>
</head>
<body>
<main class="wrap">
  <header>
    <h1>Miesieczny raport poczty: {html.escape(config.base.mailbox_label)}</h1>
    <p>Zakres: {title_range}. Raport rozdziela realne watki klientow od systemow typu marketplace, Shoper, Allegro, Empik i automaty.</p>
  </header>

  <section class="stats">
    <div class="stat"><strong>{len(business)}</strong><span>maile biznesowe</span></div>
    <div class="stat"><strong>{len(service)}</strong><span>maile systemowe</span></div>
    <div class="stat"><strong>{len(unanswered)}</strong><span>watki bez odpowiedzi</span></div>
    <div class="stat"><strong>{len(stale)}</strong><span>zalegle 72h+</span></div>
    <div class="stat"><strong>{len(answered)}</strong><span>watki z odpowiedzia</span></div>
    <div class="stat"><strong>{html.escape(format_hours(avg)) if answered else '-'}</strong><span>sredni czas odpowiedzi</span></div>
    <div class="stat"><strong>{len(followed_by_client)}</strong><span>klient odpisal po handlowcu</span></div>
    <div class="stat"><strong>{len(offers)}</strong><span>oferty/wyceny wyslane</span></div>
  </section>

  <section class="card">
    <h2>1. Maile i watki bez odpowiedzi</h2>
    <table><thead><tr><th>Klient</th><th>Handlowiec</th><th>Temat</th><th>Ostatnia data</th><th>Status</th><th>Na czym stoi</th></tr></thead><tbody>{unanswered_rows}</tbody></table>
  </section>

  <section class="card">
    <h2>2. Podsumowanie dzialan handlowcow</h2>
    <table><thead><tr><th>Handlowiec / skrzynka</th><th>Odpowiedzi</th><th>Oferty</th><th>Otwarte</th><th>Klient odpisal</th><th>Sredni czas</th></tr></thead><tbody>{sales_rows}</tbody></table>
  </section>

  <section class="card">
    <h2>3. Klient odpisal po odpowiedzi handlowca - na czym stanelo</h2>
    <table><thead><tr><th>Klient</th><th>Handlowiec</th><th>Temat</th><th>Maili</th><th>Status</th><th>Ostatni fragment</th></tr></thead><tbody>{thread_rows}</tbody></table>
  </section>

  <section class="card">
    <h2>4. Oferty wyslane do klientow</h2>
    <table><thead><tr><th>Klient</th><th>Handlowiec</th><th>Temat</th><th>Odpowiedzi</th><th>Status</th><th>Ostatni fragment</th></tr></thead><tbody>{offer_rows}</tbody></table>
  </section>

  <section class="card">
    <h2>5. Pytania na spotkanie handlowe jutro</h2>
    {questions}
  </section>

  <section class="card ai">
    <h2>6. Ocena AI i potencjaly poprawy</h2>
    {recommendations}
  </section>

  <section class="grid">
    {counter_table_html("7. Najaktywniejsze domeny klientow", client_domains)}
    {counter_table_html("8. Tematy biznesowe", categories)}
  </section>

  <section class="card">
    <h2>7. Raport systemowy: zamowienia</h2>
    <table><thead><tr><th>Data</th><th>Nadawca</th><th>Temat</th><th>Kategorie</th></tr></thead><tbody>{rows(system_groups['zamowienia'])}</tbody></table>
  </section>

  <section class="card">
    <h2>8. Raport systemowy: problemy, serwisy, alerty</h2>
    <table><thead><tr><th>Data</th><th>Nadawca</th><th>Temat</th><th>Kategorie</th></tr></thead><tbody>{rows(system_groups['problemy'])}</tbody></table>
  </section>

  <section class="grid">
    {counter_table_html("Systemy i marketplace - domeny", system_domains)}
    {counter_table_html("Aktywnosc handlowcow", by_sales)}
  </section>
</main>
</body>
</html>
""",
        encoding="utf-8",
    )


def generate_monthly_pdf(html_path: Path, pdf_path: Path) -> None:
    text = html_path.read_text(encoding="utf-8")
    text = re.sub(r"<style.*?</style>", " ", text, flags=re.S)
    text = re.sub(r"<[^>]+>", "\n", text)
    lines = [html.unescape(line.strip()) for line in text.splitlines() if line.strip()]
    font = register_font()
    styles = getSampleStyleSheet()
    base = ParagraphStyle("base", parent=styles["BodyText"], fontName=font, fontSize=8.2, leading=11)
    h1 = ParagraphStyle("h1", parent=styles["Heading1"], fontName=font, fontSize=18, leading=22, spaceAfter=8)
    h2 = ParagraphStyle("h2", parent=styles["Heading2"], fontName=font, fontSize=12, leading=15, spaceBefore=8, spaceAfter=4)
    doc = SimpleDocTemplate(str(pdf_path), pagesize=A4, leftMargin=14 * mm, rightMargin=14 * mm, topMargin=14 * mm, bottomMargin=12 * mm)
    story = []
    for line in lines:
        if line.startswith("Miesieczny raport poczty"):
            story.append(Paragraph(html.escape(line), h1))
        elif re.match(r"^[1-8]\. |^Systemy|^Aktywnosc", line):
            story.append(Paragraph(html.escape(line), h2))
        else:
            story.append(Paragraph(html.escape(line[:900]), base))
        story.append(Spacer(1, 1.4 * mm))
    doc.build(story)


def pdf_p(text: str, style: ParagraphStyle) -> Paragraph:
    return Paragraph(html.escape(str(text)), style)


def pdf_table(data: list[list], widths: list[float], font: str, header_bg: str = "#e8eef8") -> Table:
    table = Table(data, colWidths=widths, repeatRows=1)
    table.setStyle(
        TableStyle(
            [
                ("BACKGROUND", (0, 0), (-1, 0), colors.HexColor(header_bg)),
                ("TEXTCOLOR", (0, 0), (-1, 0), colors.HexColor("#142033")),
                ("GRID", (0, 0), (-1, -1), 0.35, colors.HexColor("#d9e1ee")),
                ("FONTNAME", (0, 0), (-1, -1), font),
                ("FONTSIZE", (0, 0), (-1, -1), 7.4),
                ("VALIGN", (0, 0), (-1, -1), "TOP"),
                ("PADDING", (0, 0), (-1, -1), 5),
                ("ROWBACKGROUNDS", (0, 1), (-1, -1), [colors.white, colors.HexColor("#f8fafd")]),
            ]
        )
    )
    return table


def card_table(items: list[tuple[str, str]], font: str) -> Table:
    data = []
    for index in range(0, len(items), 2):
        left = items[index]
        right = items[index + 1] if index + 1 < len(items) else ("", "")
        data.append([left[0], left[1], right[0], right[1]])
    table = Table(data, colWidths=[33 * mm, 34 * mm, 33 * mm, 34 * mm], hAlign="LEFT")
    table.setStyle(
        TableStyle(
            [
                ("BACKGROUND", (0, 0), (-1, -1), colors.HexColor("#f5f8fc")),
                ("BOX", (0, 0), (-1, -1), 0.45, colors.HexColor("#d9e1ee")),
                ("INNERGRID", (0, 0), (-1, -1), 0.35, colors.HexColor("#d9e1ee")),
                ("FONTNAME", (0, 0), (-1, -1), font),
                ("FONTSIZE", (0, 0), (-1, -1), 8),
                ("PADDING", (0, 0), (-1, -1), 7),
                ("VALIGN", (0, 0), (-1, -1), "MIDDLE"),
            ]
        )
    )
    return table


def generate_monthly_pdf_report(
    config: MonthlyConfig,
    all_items: list[MailItem],
    start: dt.date,
    end_exclusive: dt.date,
    pdf_path: Path,
) -> None:
    analysis = build_analysis(config, all_items, end_exclusive)
    font = register_font()
    styles = getSampleStyleSheet()
    base = ParagraphStyle("base", parent=styles["BodyText"], fontName=font, fontSize=8.5, leading=11.5)
    small = ParagraphStyle("small", parent=styles["BodyText"], fontName=font, fontSize=7.4, leading=9.3)
    h1 = ParagraphStyle("h1", parent=styles["Heading1"], fontName=font, fontSize=22, leading=26, spaceAfter=6, textColor=colors.HexColor("#142033"))
    h2 = ParagraphStyle("h2", parent=styles["Heading2"], fontName=font, fontSize=13.5, leading=17, spaceBefore=8, spaceAfter=6, textColor=colors.HexColor("#142033"))
    note = ParagraphStyle("note", parent=base, backColor=colors.HexColor("#f5f8ff"), borderColor=colors.HexColor("#b9cff7"), borderWidth=0.5, borderPadding=7, leading=12)

    doc = SimpleDocTemplate(
        str(pdf_path),
        pagesize=A4,
        leftMargin=12 * mm,
        rightMargin=12 * mm,
        topMargin=12 * mm,
        bottomMargin=11 * mm,
        title=f"Miesieczny raport poczty - {config.base.mailbox_label}",
    )
    title_range = f"{start.isoformat()} - {(end_exclusive - dt.timedelta(days=1)).isoformat()}"
    story = [
        pdf_p(f"Miesieczny raport poczty - {config.base.mailbox_label}", h1),
        pdf_p(f"Zakres: {title_range}. Raport oddziela watki klientow od automatycznych maili marketplace, Shoper, Allegro, Empik i systemow.", base),
        Spacer(1, 5 * mm),
    ]

    cards = [
        ("Maile biznesowe", str(len(analysis["business"]))),
        ("Maile systemowe", str(len(analysis["service"]))),
        ("Bez odpowiedzi", str(len(analysis["unanswered"]))),
        ("Zalegle 72h+", str(len(analysis["stale"]))),
        ("Watki z odpowiedzia", str(len(analysis["answered"]))),
        ("Sredni czas", format_hours(analysis["avg"]) if analysis["answered"] else "-"),
        ("Klient odpisal", str(len(analysis["followed_by_client"]))),
        ("Oferty/wyceny", str(len(analysis["offers"]))),
    ]
    story.append(card_table(cards, font))
    story.append(Spacer(1, 5 * mm))

    story.append(pdf_p("Ocena AI i najwazniejsze potencjaly poprawy", h2))
    story.append(pdf_p(" ".join(analysis["recommendations"][:3]), note))
    story.append(Spacer(1, 4 * mm))

    sales_rows = [[pdf_p("Handlowiec / skrzynka", small), pdf_p("Odp.", small), pdf_p("Oferty", small), pdf_p("Otwarte", small), pdf_p("Klient odpisal", small), pdf_p("Sredni czas", small)]]
    for sales, count in analysis["by_sales"].most_common(12):
        times = analysis["response_by_sales"][sales]
        sales_rows.append(
            [
                pdf_p(sales, small),
                str(count),
                str(analysis["offers_by_sales"].get(sales, 0)),
                str(analysis["open_by_sales"].get(sales, 0)),
                str(analysis["client_reply_by_sales"].get(sales, 0)),
                format_hours(sum(times) / len(times)) if times else "-",
            ]
        )
    if len(sales_rows) == 1:
        sales_rows.append([pdf_p("Brak danych", small), "-", "-", "-", "-", "-"])
    story.append(pdf_p("1. Podsumowanie dzialan handlowcow", h2))
    story.append(pdf_table(sales_rows, [62 * mm, 18 * mm, 20 * mm, 20 * mm, 27 * mm, 28 * mm], font))

    story.append(pdf_p("2. Pytania na jutrzejsze spotkanie", h2))
    q_rows = [[pdf_p("Pytanie / temat do przejscia", small)]]
    for question in analysis["questions"][:12]:
        q_rows.append([pdf_p(question, small)])
    story.append(pdf_table(q_rows, [175 * mm], font, "#fff4de"))

    story.append(PageBreak())

    story.append(pdf_p("3. Maile i watki bez odpowiedzi", h2))
    open_rows = [[pdf_p("Klient", small), pdf_p("Handlowiec", small), pdf_p("Temat", small), pdf_p("Data", small), pdf_p("Status / na czym stoi", small)]]
    for thread in analysis["unanswered"][:35]:
        open_rows.append(
            [
                pdf_p(thread["key"][0], small),
                pdf_p(thread["salesperson"], small),
                pdf_p(thread["last"].subject[:110], small),
                thread["last"].date.astimezone().strftime("%Y-%m-%d"),
                pdf_p(f"{thread['state']}. {thread['last'].snippet[:180]}", small),
            ]
        )
    if len(open_rows) == 1:
        open_rows.append([pdf_p("Brak nierozwiazanych watkow", small), "-", "-", "-", "-"])
    story.append(pdf_table(open_rows, [38 * mm, 34 * mm, 50 * mm, 19 * mm, 35 * mm], font))

    story.append(PageBreak())

    story.append(pdf_p("4. Klient odpisal po odpowiedzi handlowca", h2))
    client_rows = [[pdf_p("Klient", small), pdf_p("Handlowiec", small), pdf_p("Temat", small), pdf_p("Maili", small), pdf_p("Na czym stanelo", small)]]
    for thread in analysis["followed_by_client"][:30]:
        client_rows.append(
            [
                pdf_p(thread["key"][0], small),
                pdf_p(thread["salesperson"], small),
                pdf_p(thread["last"].subject[:100], small),
                str(len(thread["messages"])),
                pdf_p(f"{thread['state']}. {thread['last'].snippet[:200]}", small),
            ]
        )
    if len(client_rows) == 1:
        client_rows.append([pdf_p("Brak takich konwersacji", small), "-", "-", "-", "-"])
    story.append(pdf_table(client_rows, [38 * mm, 34 * mm, 52 * mm, 13 * mm, 39 * mm], font))

    story.append(pdf_p("5. Oferty i wyceny wyslane do klientow", h2))
    offer_rows = [[pdf_p("Klient", small), pdf_p("Handlowiec", small), pdf_p("Temat", small), pdf_p("Status", small)]]
    for thread in analysis["offers"][:35]:
        offer_rows.append(
            [
                pdf_p(thread["key"][0], small),
                pdf_p(thread["salesperson"], small),
                pdf_p(thread["last"].subject[:110], small),
                pdf_p(thread["state"], small),
            ]
        )
    if len(offer_rows) == 1:
        offer_rows.append([pdf_p("Brak wykrytych ofert", small), "-", "-", "-"])
    story.append(pdf_table(offer_rows, [44 * mm, 36 * mm, 66 * mm, 30 * mm], font))

    story.append(PageBreak())

    story.append(pdf_p("6. Najaktywniejsze domeny klientow i tematy", h2))
    domain_rows = [[pdf_p("Domena klienta", small), pdf_p("Liczba", small), pdf_p("Temat", small), pdf_p("Liczba", small)]]
    domains = analysis["client_domains"].most_common(12)
    cats = analysis["categories"].most_common(12)
    for idx in range(max(len(domains), len(cats), 1)):
        domain = domains[idx] if idx < len(domains) else ("", "")
        cat = cats[idx] if idx < len(cats) else ("", "")
        domain_rows.append([pdf_p(domain[0], small), str(domain[1]), pdf_p(cat[0], small), str(cat[1])])
    story.append(pdf_table(domain_rows, [70 * mm, 18 * mm, 70 * mm, 18 * mm], font))

    story.append(pdf_p("7. Raport systemowy: zamowienia i problemy", h2))
    system_groups = analysis["system_groups"]
    system_rows = [[pdf_p("Typ", small), pdf_p("Data", small), pdf_p("Nadawca", small), pdf_p("Temat", small)]]
    for label, group_name in [("zamowienie", "zamowienia"), ("problem/alert", "problemy"), ("inne systemowe", "inne_systemowe")]:
        for item in system_groups[group_name][:12]:
            system_rows.append([label, item.date.astimezone().strftime("%Y-%m-%d"), pdf_p(item.sender_email, small), pdf_p(item.subject[:120], small)])
    if len(system_rows) == 1:
        system_rows.append(["-", "-", "-", pdf_p("Brak danych systemowych", small)])
    story.append(pdf_table(system_rows, [24 * mm, 20 * mm, 50 * mm, 82 * mm], font))

    story.append(pdf_p("8. Pelna lista rekomendacji", h2))
    rec_rows = [[pdf_p("Rekomendacja", small)]]
    for rec in analysis["recommendations"]:
        rec_rows.append([pdf_p(rec, small)])
    story.append(pdf_table(rec_rows, [176 * mm], font, "#e8f4ee"))
    doc.build(story)


def list_folders(config: MonthlyConfig) -> None:
    require_config(config)
    with connect(config.base) as imap:
        status, folders = imap.list()
        if status != "OK":
            raise SystemExit("Nie udalo sie pobrac folderow IMAP.")
        for raw in folders or []:
            print(raw.decode("utf-8", errors="replace"))


def write_report(config: MonthlyConfig, items: list[MailItem], start: dt.date, end_exclusive: dt.date) -> tuple[Path, Path]:
    config.base.reports_dir.mkdir(parents=True, exist_ok=True)
    stamp = dt.datetime.now().strftime("%Y-%m-%d_%H-%M")
    month_label = start.strftime("%Y-%m")
    html_path = config.base.reports_dir / f"monthly_{config.base.mailbox_label}_{month_label}_{stamp}.html"
    pdf_path = config.base.reports_dir / f"monthly_{config.base.mailbox_label}_{month_label}_{stamp}.pdf"
    generate_monthly_html(config, items, start, end_exclusive, html_path)
    generate_monthly_pdf_report(config, items, start, end_exclusive, pdf_path)
    return html_path, pdf_path


def main() -> None:
    parser = argparse.ArgumentParser(description="Miesieczny raport skrzynki info przez IMAP.")
    parser.add_argument("--env-file", default=".env.info", help="Plik env z konfiguracja skrzynki.")
    parser.add_argument("--list-folders", action="store_true", help="Pokaz foldery IMAP i zakoncz.")
    args = parser.parse_args()

    socket.setdefaulttimeout(40)
    env_path = Path(args.env_file)
    if not env_path.is_absolute():
        env_path = ROOT / env_path
    config = load_monthly_config(env_path)
    if args.list_folders:
        list_folders(config)
        return
    start, end_exclusive = previous_month_range()
    items = fetch_mail_range(config, start, end_exclusive)
    html_path, pdf_path = write_report(config, items, start, end_exclusive)
    print(f"Zakres: {start.isoformat()} - {(end_exclusive - dt.timedelta(days=1)).isoformat()}")
    print(f"Wiadomosci: {len(items)}")
    print(f"HTML: {html_path}")
    print(f"PDF:  {pdf_path}")


if __name__ == "__main__":
    main()
