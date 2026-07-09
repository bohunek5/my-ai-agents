#!/usr/bin/env python3
from __future__ import annotations

import argparse
import dataclasses
import datetime as dt
import email
import html
import imaplib
import json
import os
import re
import socket
import ssl
import textwrap
import urllib.request
from collections import Counter
from email.header import decode_header, make_header
from email.message import Message
from email.utils import getaddresses, parsedate_to_datetime
from pathlib import Path

from dotenv import load_dotenv
from reportlab.lib import colors
from reportlab.lib.enums import TA_CENTER
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import mm
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.platypus import (
    ListFlowable,
    ListItem,
    PageBreak,
    Paragraph,
    SimpleDocTemplate,
    Spacer,
    Table,
    TableStyle,
)


ROOT = Path(__file__).resolve().parent


@dataclasses.dataclass
class Config:
    imap_host: str
    imap_port: int
    imap_user: str
    imap_password: str
    mailbox_label: str
    days: int
    folders: list[str]
    sent_folders: list[str]
    company_domains: list[str]
    reports_dir: Path
    ollama_url: str
    ollama_model: str


@dataclasses.dataclass
class MailItem:
    folder: str
    uid: str
    date: dt.datetime
    subject: str
    sender_name: str
    sender_email: str
    recipients: list[str]
    snippet: str
    categories: list[str]
    direction: str


KEYWORDS = {
    "wycena": ["wycena", "oferta", "zapytanie", "koszt", "cena", "cennik"],
    "zamowienie": ["zamowienie", "zamówienie", "kupno", "zakup", "proforma"],
    "reklamacja": ["reklamacja", "zwrot", "uszkodzone", "nie dziala", "nie działa", "gwarancja"],
    "faktura": ["faktura", "fv", "paragon", "platnosc", "płatność", "przelew"],
    "serwis": ["serwis", "usterka", "naprawa", "problem", "montaz", "montaż"],
    "hurt/b2b": ["hurt", "b2b", "dystrybutor", "wspolpraca", "współpraca", "rabat"],
    "pilne": ["pilne", "asap", "natychmiast", "dzisiaj", "problem"],
}


def env_list(value: str) -> list[str]:
    return [item.strip() for item in value.split(",") if item.strip()]


def load_config() -> Config:
    load_dotenv(ROOT / ".env")
    reports_dir = Path(os.getenv("REPORTS_DIR", "reports"))
    if not reports_dir.is_absolute():
        reports_dir = ROOT / reports_dir
    return Config(
        imap_host=os.getenv("IMAP_HOST", "").strip(),
        imap_port=int(os.getenv("IMAP_PORT", "993")),
        imap_user=os.getenv("IMAP_USER", "").strip(),
        imap_password=os.getenv("IMAP_PASSWORD", "").strip(),
        mailbox_label=os.getenv("MAILBOX_LABEL", os.getenv("IMAP_USER", "skrzynka")).strip(),
        days=int(os.getenv("DAYS", "7")),
        folders=env_list(os.getenv("MAIL_FOLDERS", "INBOX")),
        sent_folders=env_list(os.getenv("SENT_FOLDERS", "")),
        company_domains=[d.lower() for d in env_list(os.getenv("COMPANY_DOMAINS", ""))],
        reports_dir=reports_dir,
        ollama_url=os.getenv("OLLAMA_URL", "http://localhost:11434/api/generate").strip(),
        ollama_model=os.getenv("OLLAMA_MODEL", "").strip(),
    )


def require_config(config: Config) -> None:
    missing = []
    if not config.imap_host:
        missing.append("IMAP_HOST")
    if not config.imap_user:
        missing.append("IMAP_USER")
    if not config.imap_password:
        missing.append("IMAP_PASSWORD")
    if missing:
        names = ", ".join(missing)
        raise SystemExit(f"Brakuje konfiguracji: {names}. Uzupelnij plik .env.")


def decode_value(value: str | None) -> str:
    if not value:
        return ""
    try:
        return str(make_header(decode_header(value)))
    except Exception:
        return value


def normalize_text(value: str) -> str:
    return re.sub(r"\s+", " ", value).strip()


def extract_text(message: Message) -> str:
    parts: list[str] = []
    if message.is_multipart():
        for part in message.walk():
            content_type = part.get_content_type()
            disposition = str(part.get("Content-Disposition", "")).lower()
            if "attachment" in disposition:
                continue
            if content_type not in {"text/plain", "text/html"}:
                continue
            payload = part.get_payload(decode=True)
            if not payload:
                continue
            charset = part.get_content_charset() or "utf-8"
            try:
                text = payload.decode(charset, errors="replace")
            except LookupError:
                text = payload.decode("utf-8", errors="replace")
            if content_type == "text/html":
                text = re.sub(r"<(script|style).*?</\1>", " ", text, flags=re.I | re.S)
                text = re.sub(r"<[^>]+>", " ", text)
            parts.append(text)
    else:
        payload = message.get_payload(decode=True)
        if payload:
            charset = message.get_content_charset() or "utf-8"
            try:
                parts.append(payload.decode(charset, errors="replace"))
            except LookupError:
                parts.append(payload.decode("utf-8", errors="replace"))
    return html.unescape(normalize_text(" ".join(parts)))


def sender_domain(address: str) -> str:
    if "@" not in address:
        return ""
    return address.rsplit("@", 1)[-1].lower()


def classify_keywords(subject: str, snippet: str) -> list[str]:
    haystack = f"{subject} {snippet}".lower()
    categories = []
    for category, words in KEYWORDS.items():
        if any(word in haystack for word in words):
            categories.append(category)
    return categories or ["inne"]


def classify_with_ollama(config: Config, subject: str, snippet: str) -> list[str]:
    if not config.ollama_model:
        return []
    prompt = textwrap.dedent(
        f"""
        Sklasyfikuj firmowy email do maksymalnie 3 kategorii z listy:
        wycena, zamowienie, reklamacja, faktura, serwis, hurt/b2b, pilne, inne.
        Odpowiedz tylko JSON array stringow, bez komentarza.

        Temat: {subject}
        Fragment: {snippet[:1200]}
        """
    ).strip()
    payload = {
        "model": config.ollama_model,
        "prompt": prompt,
        "stream": False,
        "options": {"temperature": 0.1},
    }
    try:
        request = urllib.request.Request(
            config.ollama_url,
            data=json.dumps(payload).encode("utf-8"),
            headers={"Content-Type": "application/json"},
        )
        with urllib.request.urlopen(request, timeout=20) as response:
            data = json.loads(response.read().decode("utf-8"))
        parsed = json.loads(data.get("response", "[]"))
        return [str(item).lower() for item in parsed if str(item).strip()]
    except Exception:
        return []


def connect(config: Config) -> imaplib.IMAP4_SSL:
    context = ssl.create_default_context()
    imap = imaplib.IMAP4_SSL(config.imap_host, config.imap_port, ssl_context=context)
    imap.login(config.imap_user, config.imap_password)
    return imap


def list_folders(config: Config) -> None:
    require_config(config)
    with connect(config) as imap:
        status, folders = imap.list()
        if status != "OK":
            raise SystemExit("Nie udalo sie pobrac listy folderow IMAP.")
        print("Foldery IMAP:")
        for raw in folders or []:
            print(raw.decode("utf-8", errors="replace"))


def parse_message(config: Config, folder: str, uid: str, raw: bytes, direction: str) -> MailItem | None:
    message = email.message_from_bytes(raw)
    date_header = message.get("Date")
    try:
        mail_date = parsedate_to_datetime(date_header) if date_header else dt.datetime.now(dt.timezone.utc)
    except Exception:
        mail_date = dt.datetime.now(dt.timezone.utc)
    if mail_date.tzinfo is None:
        mail_date = mail_date.replace(tzinfo=dt.timezone.utc)

    subject = normalize_text(decode_value(message.get("Subject"))) or "(bez tematu)"
    sender = getaddresses([decode_value(message.get("From"))])
    sender_name, sender_email = sender[0] if sender else ("", "")
    recipients = [addr for _, addr in getaddresses([decode_value(message.get("To")), decode_value(message.get("Cc"))]) if addr]
    body = extract_text(message)
    snippet = body[:420]
    categories = classify_with_ollama(config, subject, snippet) or classify_keywords(subject, snippet)

    return MailItem(
        folder=folder,
        uid=uid,
        date=mail_date,
        subject=subject,
        sender_name=normalize_text(sender_name),
        sender_email=sender_email.lower(),
        recipients=recipients,
        snippet=snippet,
        categories=categories,
        direction=direction,
    )


def fetch_mail(config: Config) -> list[MailItem]:
    require_config(config)
    since = (dt.date.today() - dt.timedelta(days=config.days)).strftime("%d-%b-%Y")
    items: list[MailItem] = []
    folder_roles: list[tuple[str, str]] = []
    for folder in config.folders:
        folder_roles.append((folder, "przychodzacy"))
    for folder in config.sent_folders:
        folder_roles.append((folder, "wyslany"))
    seen_roles: set[tuple[str, str]] = set()
    with connect(config) as imap:
        for folder, direction in folder_roles:
            if (folder, direction) in seen_roles:
                continue
            seen_roles.add((folder, direction))
            status, _ = imap.select(f'"{folder}"', readonly=True)
            if status != "OK":
                print(f"Pomijam folder, nie udalo sie otworzyc: {folder}")
                continue
            status, data = imap.uid("search", None, f'(SINCE "{since}")')
            if status != "OK" or not data or not data[0]:
                continue
            uids = data[0].split()
            for uid_bytes in uids:
                uid = uid_bytes.decode("ascii", errors="replace")
                status, msg_data = imap.uid("fetch", uid, "(RFC822)")
                if status != "OK":
                    continue
                for part in msg_data or []:
                    if isinstance(part, tuple) and part[1]:
                        parsed = parse_message(config, folder, uid, part[1], direction)
                        if parsed:
                            items.append(parsed)
    return sorted(items, key=lambda item: item.date, reverse=True)


def demo_mail(config: Config) -> list[MailItem]:
    now = dt.datetime.now(dt.timezone.utc)
    samples = [
        ("INBOX", "1001", now - dt.timedelta(days=2), "Prośba o wycenę taśm LED 24V do mebli kuchennych", "Studio Mebli Mazury", "kontakt@studiomebli.pl", ["biuro@example.com"], "Prosimy o ofertę na taśmy LED neutralne, profile aluminiowe i zasilacze do 12 zestawów kuchennych.", "przychodzacy"),
        ("Sent", "2001", now - dt.timedelta(days=1, hours=20), "Re: Prośba o wycenę taśm LED 24V do mebli kuchennych", "Prescot", "biuro@example.com", ["kontakt@studiomebli.pl"], "Dziękujemy za zapytanie. W załączniku przesyłamy dobór taśm, profili i zasilaczy.", "wyslany"),
        ("INBOX", "1002", now - dt.timedelta(days=3, hours=4), "Reklamacja - zasilacz nie działa", "Firma Montażowa", "serwis@montaze-led.pl", ["biuro@example.com"], "Klient zgłasza problem z zasilaczem po montażu. Prosimy o informację co sprawdzić.", "przychodzacy"),
        ("INBOX", "1003", now - dt.timedelta(days=1, hours=3), "Współpraca B2B - hurtownia elektryczna", "Elektro Partner", "handel@elektropartner.pl", ["biuro@example.com"], "Jesteśmy hurtownią elektryczną i szukamy dostawcy taśm LED, profili i sterowników.", "przychodzacy"),
        ("Sent", "2003", now - dt.timedelta(hours=18), "Re: Współpraca B2B - hurtownia elektryczna", "Prescot", "biuro@example.com", ["handel@elektropartner.pl"], "Dziękujemy za kontakt. Podeślemy warunki współpracy B2B i ofertę hurtową.", "wyslany"),
        ("INBOX", "1004", now - dt.timedelta(hours=5), "Faktura za zamówienie", "Księgowość", "ksiegowosc@klient.pl", ["biuro@example.com"], "Prosimy o przesłanie faktury do ostatniego zamówienia.", "przychodzacy"),
    ]
    result = []
    for row in samples:
        folder, uid, date, subject, name, address, recipients, snippet, direction = row
        result.append(
            MailItem(
                folder=folder,
                uid=uid,
                date=date,
                subject=subject,
                sender_name=name,
                sender_email=address,
                recipients=recipients,
                snippet=snippet,
                categories=classify_keywords(subject, snippet),
                direction=direction,
            )
        )
    return result


def is_company_address(config: Config, address: str) -> bool:
    return sender_domain(address) in config.company_domains


def client_incoming(config: Config, item: MailItem) -> bool:
    return item.direction == "przychodzacy" and not is_company_address(config, item.sender_email)


def client_outgoing(config: Config, item: MailItem) -> bool:
    return item.direction == "wyslany"


def find_reply(incoming: MailItem, outgoing: list[MailItem]) -> MailItem | None:
    replies = [
        item
        for item in outgoing
        if item.date > incoming.date and incoming.sender_email in [addr.lower() for addr in item.recipients]
    ]
    return min(replies, key=lambda item: item.date) if replies else None


def hours_between(start: dt.datetime, end: dt.datetime) -> float:
    return max(0.0, (end - start).total_seconds() / 3600)


def format_hours(hours: float) -> str:
    if hours < 1:
        return f"{round(hours * 60)} min"
    if hours < 48:
        return f"{hours:.1f} h"
    return f"{hours / 24:.1f} dni"


def analyze_threads(config: Config, items: list[MailItem]) -> dict:
    incoming = [item for item in items if client_incoming(config, item)]
    outgoing = [item for item in items if client_outgoing(config, item)]
    now = dt.datetime.now(dt.timezone.utc).astimezone()
    answered: list[tuple[MailItem, MailItem, float]] = []
    unanswered: list[MailItem] = []
    for item in incoming:
        reply = find_reply(item, outgoing)
        if reply:
            answered.append((item, reply, hours_between(item.date, reply.date)))
        else:
            unanswered.append(item)
    avg_reply_hours = sum(row[2] for row in answered) / len(answered) if answered else 0.0
    no_reply_24 = [item for item in unanswered if hours_between(item.date, now) >= 24]
    no_reply_48 = [item for item in unanswered if hours_between(item.date, now) >= 48]
    leads = [
        item
        for item in incoming
        if any(category in {"wycena", "zamowienie", "hurt/b2b"} for category in item.categories)
    ]
    monday = sorted(
        no_reply_48
        + [item for item in unanswered if any(category in {"wycena", "reklamacja", "hurt/b2b", "pilne"} for category in item.categories)],
        key=lambda item: item.date,
    )
    dedup_monday = []
    seen = set()
    for item in monday:
        key = (item.sender_email, item.subject, item.uid)
        if key not in seen:
            seen.add(key)
            dedup_monday.append(item)
    return {
        "incoming": incoming,
        "outgoing": outgoing,
        "answered": answered,
        "unanswered": unanswered,
        "no_reply_24": no_reply_24,
        "no_reply_48": no_reply_48,
        "avg_reply_hours": avg_reply_hours,
        "leads": leads,
        "monday": dedup_monday,
    }


def report_stats(config: Config, items: list[MailItem]) -> dict[str, Counter]:
    by_day: Counter[str] = Counter()
    by_domain: Counter[str] = Counter()
    by_sender: Counter[str] = Counter()
    by_category: Counter[str] = Counter()
    by_folder: Counter[str] = Counter()
    for item in items:
        local_date = item.date.astimezone().date().isoformat()
        by_day[local_date] += 1
        if client_incoming(config, item):
            by_domain[sender_domain(item.sender_email) or "(brak domeny)"] += 1
            label = item.sender_email or item.sender_name or "(brak nadawcy)"
            by_sender[label] += 1
        by_folder[item.folder] += 1
        for category in item.categories:
            by_category[category] += 1
    return {
        "by_day": by_day,
        "by_domain": by_domain,
        "by_sender": by_sender,
        "by_category": by_category,
        "by_folder": by_folder,
    }


def render_counter_html(title: str, counter: Counter[str], limit: int = 10) -> str:
    rows = "".join(
        f"<tr><td>{html.escape(name)}</td><td>{count}</td></tr>"
        for name, count in counter.most_common(limit)
    )
    if not rows:
        rows = '<tr><td colspan="2">Brak danych</td></tr>'
    return f"""
    <section class="card">
      <h2>{html.escape(title)}</h2>
      <table><tbody>{rows}</tbody></table>
    </section>
    """


def generate_html(config: Config, items: list[MailItem], output_path: Path) -> None:
    stats = report_stats(config, items)
    analysis = analyze_threads(config, items)
    generated = dt.datetime.now().strftime("%Y-%m-%d %H:%M")
    start = (dt.date.today() - dt.timedelta(days=config.days)).isoformat()
    end = dt.date.today().isoformat()
    urgent = [item for item in items if any(cat in {"pilne", "reklamacja", "wycena", "hurt/b2b"} for cat in item.categories)]
    monday_list = "".join(
        f"<li><strong>{html.escape(item.subject)}</strong><br><span>{html.escape(item.sender_email)} - {html.escape(', '.join(item.categories))} - {html.escape(format_hours(hours_between(item.date, dt.datetime.now(dt.timezone.utc).astimezone())))} bez odpowiedzi</span></li>"
        for item in analysis["monday"][:12]
    ) or "<li>Brak krytycznych zaleglosci na podstawie aktualnych regul.</li>"
    reply_rows = "".join(
        f"""
        <tr>
          <td>{html.escape(incoming.sender_email)}</td>
          <td>{html.escape(incoming.subject)}</td>
          <td>{html.escape(reply.sender_email or config.mailbox_label)}</td>
          <td>{html.escape(format_hours(hours))}</td>
        </tr>
        """
        for incoming, reply, hours in analysis["answered"][:12]
    ) or '<tr><td colspan="4">Brak wykrytych odpowiedzi w analizowanym okresie.</td></tr>'
    mail_rows = "".join(
        f"""
        <tr>
          <td>{html.escape(item.date.astimezone().strftime('%Y-%m-%d %H:%M'))}</td>
          <td>{html.escape(item.sender_email or item.sender_name)}</td>
          <td>{html.escape(item.subject)}</td>
          <td>{html.escape(', '.join(item.categories))}</td>
        </tr>
        """
        for item in items[:50]
    )
    urgent_list = "".join(
        f"<li><strong>{html.escape(item.subject)}</strong><br><span>{html.escape(item.sender_email)} - {html.escape(', '.join(item.categories))}</span></li>"
        for item in urgent[:12]
    ) or "<li>Brak priorytetowych wiadomosci wedlug aktualnych regul.</li>"
    document = f"""<!doctype html>
<html lang="pl">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Tygodniowy raport poczty - {html.escape(config.mailbox_label)}</title>
  <style>
    :root {{
      --ink: #162033;
      --muted: #667085;
      --line: #d9e1ee;
      --soft: #f4f7fb;
      --blue: #1f63d3;
      --red: #b42318;
    }}
    body {{
      margin: 0;
      font-family: Inter, Arial, sans-serif;
      color: var(--ink);
      background: #ffffff;
      line-height: 1.55;
    }}
    .wrap {{ max-width: 1120px; margin: 0 auto; padding: 42px 28px; }}
    header {{ border-bottom: 2px solid var(--ink); padding-bottom: 24px; margin-bottom: 28px; }}
    h1 {{ margin: 0 0 10px; font-size: 36px; line-height: 1.05; }}
    h2 {{ margin: 0 0 14px; font-size: 20px; }}
    p {{ margin: 0; color: var(--muted); }}
    .stats {{ display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 12px; margin: 24px 0; }}
    .stat, .card {{ border: 1px solid var(--line); background: var(--soft); padding: 18px; }}
    .stat strong {{ display: block; font-size: 30px; line-height: 1; margin-bottom: 6px; }}
    .grid {{ display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 14px; }}
    table {{ width: 100%; border-collapse: collapse; background: #fff; }}
    td, th {{ border-bottom: 1px solid var(--line); padding: 9px 8px; text-align: left; vertical-align: top; }}
    th {{ color: var(--muted); font-size: 13px; text-transform: uppercase; letter-spacing: .04em; }}
    ul {{ margin: 0; padding-left: 18px; }}
    li {{ margin-bottom: 10px; }}
    .priority {{ border-color: #fecdca; background: #fff6f5; }}
    .priority h2 {{ color: var(--red); }}
    .mail-table {{ margin-top: 14px; }}
    @media (max-width: 760px) {{ .stats, .grid {{ grid-template-columns: 1fr; }} h1 {{ font-size: 28px; }} }}
  </style>
</head>
<body>
  <main class="wrap">
    <header>
      <h1>Tygodniowy raport poczty</h1>
      <p>Skrzynka: <strong>{html.escape(config.mailbox_label)}</strong> | Zakres: {start} - {end} | Wygenerowano: {generated}</p>
    </header>

    <section class="stats">
      <div class="stat"><strong>{len(analysis["incoming"])}</strong><span>maili przyszlo</span></div>
      <div class="stat"><strong>{len(analysis["outgoing"])}</strong><span>maili wyszlo</span></div>
      <div class="stat"><strong>{len(analysis["unanswered"])}</strong><span>bez odpowiedzi</span></div>
      <div class="stat"><strong>{len(analysis["no_reply_48"])}</strong><span>bez odpowiedzi 48h+</span></div>
      <div class="stat"><strong>{len(analysis["leads"])}</strong><span>potencjalne leady</span></div>
      <div class="stat"><strong>{html.escape(format_hours(analysis["avg_reply_hours"])) if analysis["answered"] else "-"}</strong><span>sredni czas odpowiedzi</span></div>
      <div class="stat"><strong>{len(urgent)}</strong><span>do uwagi handlowej</span></div>
      <div class="stat"><strong>{len(stats["by_domain"])}</strong><span>domen klientow</span></div>
    </section>

    <section class="card priority">
      <h2>Do ogarniecia w poniedzialek</h2>
      <ul>{monday_list}</ul>
    </section>

    <section class="card">
      <h2>Kto odpisal i po jakim czasie</h2>
      <table>
        <thead><tr><th>Klient</th><th>Temat</th><th>Odpowiedz z</th><th>Czas</th></tr></thead>
        <tbody>{reply_rows}</tbody>
      </table>
    </section>

    <section class="grid">
      {render_counter_html("Kategorie tematow", stats["by_category"])}
      {render_counter_html("Najaktywniejsze domeny klientow", stats["by_domain"])}
      {render_counter_html("Najaktywniejsi klienci", stats["by_sender"])}
      {render_counter_html("Aktywnosc dzienna", stats["by_day"])}
    </section>

    <section class="card mail-table">
      <h2>Ostatnie wiadomosci</h2>
      <table>
        <thead><tr><th>Data</th><th>Nadawca</th><th>Temat</th><th>Kategorie</th></tr></thead>
        <tbody>{mail_rows or '<tr><td colspan="4">Brak wiadomosci w okresie.</td></tr>'}</tbody>
      </table>
    </section>
  </main>
</body>
</html>
"""
    output_path.write_text(document, encoding="utf-8")


def register_font() -> str:
    candidates = [
        "/System/Library/Fonts/Supplemental/Arial.ttf",
        "/Library/Fonts/Arial.ttf",
        "/System/Library/Fonts/Supplemental/Helvetica.ttf",
        "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf",
    ]
    for candidate in candidates:
        if Path(candidate).exists():
            pdfmetrics.registerFont(TTFont("ReportFont", candidate))
            bold = candidate.replace(".ttf", " Bold.ttf")
            if Path(bold).exists():
                pdfmetrics.registerFont(TTFont("ReportFont-Bold", bold))
            else:
                pdfmetrics.registerFont(TTFont("ReportFont-Bold", candidate))
            return "ReportFont"
    return "Helvetica"


def para(text: str, style: ParagraphStyle) -> Paragraph:
    return Paragraph(html.escape(text), style)


def counter_table(counter: Counter[str], title: str, styles: dict[str, ParagraphStyle], limit: int = 8) -> list:
    story = [Paragraph(title, styles["h2"])]
    data = [["Nazwa", "Liczba"]]
    data.extend([[name, str(count)] for name, count in counter.most_common(limit)])
    if len(data) == 1:
        data.append(["Brak danych", "-"])
    table = Table(data, colWidths=[120 * mm, 28 * mm])
    table.setStyle(
        TableStyle(
            [
                ("BACKGROUND", (0, 0), (-1, 0), colors.HexColor("#eef3fb")),
                ("TEXTCOLOR", (0, 0), (-1, 0), colors.HexColor("#162033")),
                ("GRID", (0, 0), (-1, -1), 0.4, colors.HexColor("#d9e1ee")),
                ("FONTNAME", (0, 0), (-1, -1), styles["base"].fontName),
                ("FONTSIZE", (0, 0), (-1, -1), 8),
                ("VALIGN", (0, 0), (-1, -1), "TOP"),
                ("PADDING", (0, 0), (-1, -1), 6),
            ]
        )
    )
    story.extend([table, Spacer(1, 8 * mm)])
    return story


def generate_pdf(config: Config, items: list[MailItem], output_path: Path) -> None:
    font = register_font()
    styles = getSampleStyleSheet()
    custom = {
        "base": ParagraphStyle("base", parent=styles["BodyText"], fontName=font, fontSize=9, leading=12),
        "h1": ParagraphStyle("h1", parent=styles["Heading1"], fontName=font, fontSize=24, leading=28, spaceAfter=8),
        "h2": ParagraphStyle("h2", parent=styles["Heading2"], fontName=font, fontSize=14, leading=18, spaceBefore=6, spaceAfter=8),
        "center": ParagraphStyle("center", parent=styles["BodyText"], fontName=font, fontSize=9, leading=12, alignment=TA_CENTER),
    }
    stats = report_stats(config, items)
    analysis = analyze_threads(config, items)
    urgent = [item for item in items if any(cat in {"pilne", "reklamacja", "wycena", "hurt/b2b"} for cat in item.categories)]
    generated = dt.datetime.now().strftime("%Y-%m-%d %H:%M")
    start = (dt.date.today() - dt.timedelta(days=config.days)).isoformat()
    end = dt.date.today().isoformat()

    doc = SimpleDocTemplate(
        str(output_path),
        pagesize=A4,
        rightMargin=16 * mm,
        leftMargin=16 * mm,
        topMargin=16 * mm,
        bottomMargin=14 * mm,
        title=f"Tygodniowy raport poczty - {config.mailbox_label}",
    )
    story = [
        Paragraph("Tygodniowy raport poczty", custom["h1"]),
        Paragraph(f"Skrzynka: {config.mailbox_label} | Zakres: {start} - {end} | Wygenerowano: {generated}", custom["base"]),
        Spacer(1, 8 * mm),
    ]

    summary = [
        ["Przyszlo", "Wyszlo", "Bez odp.", "48h+", "Leady", "Sr. odp."],
        [
            str(len(analysis["incoming"])),
            str(len(analysis["outgoing"])),
            str(len(analysis["unanswered"])),
            str(len(analysis["no_reply_48"])),
            str(len(analysis["leads"])),
            format_hours(analysis["avg_reply_hours"]) if analysis["answered"] else "-",
        ],
    ]
    table = Table(summary, colWidths=[29 * mm] * 6)
    table.setStyle(
        TableStyle(
            [
                ("BACKGROUND", (0, 0), (-1, 0), colors.HexColor("#162033")),
                ("TEXTCOLOR", (0, 0), (-1, 0), colors.white),
                ("BACKGROUND", (0, 1), (-1, 1), colors.HexColor("#f4f7fb")),
                ("GRID", (0, 0), (-1, -1), 0.5, colors.HexColor("#d9e1ee")),
                ("FONTNAME", (0, 0), (-1, -1), font),
                ("FONTSIZE", (0, 0), (-1, -1), 10),
                ("ALIGN", (0, 0), (-1, -1), "CENTER"),
                ("PADDING", (0, 0), (-1, -1), 8),
            ]
        )
    )
    story.extend([table, Spacer(1, 8 * mm), Paragraph("Do ogarniecia w poniedzialek", custom["h2"])])
    if analysis["monday"]:
        bullets = [
            ListItem(
                Paragraph(
                    f"{item.subject} - {item.sender_email} - {', '.join(item.categories)} - {format_hours(hours_between(item.date, dt.datetime.now(dt.timezone.utc).astimezone()))} bez odpowiedzi",
                    custom["base"],
                )
            )
            for item in analysis["monday"][:10]
        ]
    else:
        bullets = [ListItem(Paragraph("Brak krytycznych zaleglosci na podstawie aktualnych regul.", custom["base"]))]
    story.extend([ListFlowable(bullets, bulletType="bullet"), Spacer(1, 6 * mm)])
    story.append(Paragraph("Kto odpisal i po jakim czasie", custom["h2"]))
    reply_data = [["Klient", "Temat", "Odpowiedz z", "Czas"]]
    for incoming, reply, hours in analysis["answered"][:10]:
        reply_data.append([incoming.sender_email, incoming.subject[:64], reply.sender_email or config.mailbox_label, format_hours(hours)])
    if len(reply_data) == 1:
        reply_data.append(["-", "Brak wykrytych odpowiedzi w analizowanym okresie.", "-", "-"])
    reply_table = Table(reply_data, colWidths=[45 * mm, 75 * mm, 35 * mm, 22 * mm], repeatRows=1)
    reply_table.setStyle(
        TableStyle(
            [
                ("BACKGROUND", (0, 0), (-1, 0), colors.HexColor("#eef3fb")),
                ("GRID", (0, 0), (-1, -1), 0.35, colors.HexColor("#d9e1ee")),
                ("FONTNAME", (0, 0), (-1, -1), font),
                ("FONTSIZE", (0, 0), (-1, -1), 7),
                ("VALIGN", (0, 0), (-1, -1), "TOP"),
                ("PADDING", (0, 0), (-1, -1), 4),
            ]
        )
    )
    story.extend([reply_table, Spacer(1, 6 * mm)])
    story.extend(counter_table(stats["by_category"], "Kategorie tematow", custom))
    story.extend(counter_table(stats["by_domain"], "Najaktywniejsze domeny klientow", custom))
    story.extend(counter_table(stats["by_sender"], "Najaktywniejsi klienci", custom))
    story.append(PageBreak())
    story.append(Paragraph("Ostatnie wiadomosci", custom["h2"]))

    rows = [["Data", "Nadawca", "Temat", "Kategorie"]]
    for item in items[:35]:
        rows.append(
            [
                item.date.astimezone().strftime("%Y-%m-%d %H:%M"),
                item.sender_email or item.sender_name,
                item.subject[:90],
                ", ".join(item.categories),
            ]
        )
    if len(rows) == 1:
        rows.append(["-", "-", "Brak wiadomosci w okresie.", "-"])
    mail_table = Table(rows, colWidths=[28 * mm, 45 * mm, 77 * mm, 28 * mm], repeatRows=1)
    mail_table.setStyle(
        TableStyle(
            [
                ("BACKGROUND", (0, 0), (-1, 0), colors.HexColor("#eef3fb")),
                ("GRID", (0, 0), (-1, -1), 0.35, colors.HexColor("#d9e1ee")),
                ("FONTNAME", (0, 0), (-1, -1), font),
                ("FONTSIZE", (0, 0), (-1, -1), 7),
                ("VALIGN", (0, 0), (-1, -1), "TOP"),
                ("PADDING", (0, 0), (-1, -1), 4),
            ]
        )
    )
    story.append(mail_table)
    doc.build(story)


def write_reports(config: Config, items: list[MailItem], demo: bool = False) -> tuple[Path, Path]:
    config.reports_dir.mkdir(parents=True, exist_ok=True)
    stamp = dt.datetime.now().strftime("%Y-%m-%d_%H-%M")
    prefix = f"mail_report_{config.mailbox_label}_{stamp}"
    if demo:
        prefix = f"demo_{prefix}"
    html_path = config.reports_dir / f"{prefix}.html"
    pdf_path = config.reports_dir / f"{prefix}.pdf"
    generate_html(config, items, html_path)
    generate_pdf(config, items, pdf_path)
    return html_path, pdf_path


def main() -> None:
    parser = argparse.ArgumentParser(description="Tygodniowy raport poczty przez IMAP.")
    parser.add_argument("--list-folders", action="store_true", help="Pokaz foldery IMAP i zakoncz.")
    parser.add_argument("--demo", action="store_true", help="Wygeneruj przykladowy raport bez laczenia z poczta.")
    args = parser.parse_args()

    socket.setdefaulttimeout(30)
    config = load_config()
    if args.list_folders:
        list_folders(config)
        return
    items = demo_mail(config) if args.demo else fetch_mail(config)
    
    # Filter out ignored platforms: allegro, emagro, empik, shoper
    ignored_patterns = ["allegro", "emagro", "empik", "shoper"]
    filtered_items = []
    for item in items:
        text_to_check = f"{item.sender_email} {item.sender_name} {item.subject} {item.snippet}".lower()
        if any(pat in text_to_check for pat in ignored_patterns):
            continue
        filtered_items.append(item)
    items = filtered_items

    html_path, pdf_path = write_reports(config, items, demo=args.demo)
    print(f"HTML: {html_path}")
    print(f"PDF:  {pdf_path}")
    print(f"Wiadomosci w raporcie: {len(items)}")


if __name__ == "__main__":
    main()
