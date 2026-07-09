#!/usr/bin/env python3
from __future__ import annotations

import argparse
import datetime as dt
import html
import os
import smtplib
import socket
import ssl
from email.message import EmailMessage
from pathlib import Path

from weekly_action_report import IGNORE_PATTERNS, filter_ignored, row_for_thread
from monthly_info_report import ROOT, build_analysis, fetch_mail_range, load_monthly_config


REPORT_TITLE = "Plan dnia z poczty firmowej"
DEFAULT_RECIPIENT = "karol.bohdanowicz@prescot.pl"


def parse_env(path: Path) -> dict[str, str]:
    values: dict[str, str] = {}
    for raw in path.read_text(encoding="utf-8").splitlines():
        line = raw.strip()
        if not line or line.startswith("#") or "=" not in line:
            continue
        key, value = line.split("=", 1)
        values[key.strip()] = value.strip().strip('"').strip("'")
    return values


def report_range(days_back: int, today: dt.date | None = None) -> tuple[dt.date, dt.date]:
    today = today or dt.date.today()
    return today - dt.timedelta(days=days_back), today + dt.timedelta(days=1)


def safe(value: str, limit: int = 220) -> str:
    text = " ".join(str(value or "").split())
    if len(text) <= limit:
        return text
    return text[: limit - 1].rstrip() + "…"


def item_text(item) -> str:
    return f"{item.sender_email} {item.sender_name} {item.subject} {item.snippet}".lower()


def internal_items(items: list) -> list:
    noise = [
        "allegro",
        "emag",
        "emagro",
        "empik",
        "shoper",
        "idosell",
        "wordpress",
        "newsletter",
        "dpd",
        "adobe",
        "corel",
        "wetransfer",
    ]
    out = []
    for item in items:
        text = item_text(item)
        sender = (item.sender_email or "").lower()
        recipients = " ".join(item.recipients).lower()
        is_company = sender.endswith("@prescot.pl") or sender.endswith("@prescot.com.pl") or "@prescot.pl" in recipients or "@prescot.com.pl" in recipients
        if is_company and not any(n in text for n in noise):
            out.append(item)
    return out


def owner_hint(thread: dict) -> str:
    value = thread.get("salesperson") or ""
    return value if value and value != "-" else "Karol / do ustalenia"


def status_class(text: str) -> str:
    low = text.lower()
    if "pilne" in low or "zaleg" in low or "bez odpowiedzi" in low:
        return "prio"
    if "czeka" in low or "status" in low:
        return "wait"
    return "todo"


def ai_advice(subject: str, snippet: str = "", status: str = "", sender: str = "") -> str:
    text = f"{subject} {snippet} {status} {sender}".lower()

    if any(word in text for word in ["reklamac", "uszkodz", "brak", "nie działa", "problem", "zwrot"]):
        return "Nie odkładać. Najpierw potwierdzić odbiór sprawy, poprosić o brakujące dane lub zdjęcia i od razu nadać właściciela tematu."
    if any(word in text for word in ["ofert", "wycen", "cennik", "rabat", "termin", "dostęp", "dostep"]):
        return "Ustalić konkretny następny ruch handlowy: dopiąć dane, wysłać wycenę albo zrobić follow-up. Bez statusu temat łatwo zniknie."
    if any(word in text for word in ["faktur", "proforma", "płat", "plat", "korekt"]):
        return "Sprawdzić dokument i kwoty przed odpowiedzią. Jeśli brakuje decyzji księgowej, oznaczyć temat jako do potwierdzenia, nie prowadzić go z pamięci."
    if any(word in text for word in ["zamów", "zamow", "wysył", "wysyl", "kurier", "dostaw", "dpd"]):
        return "Najpierw zweryfikować status realizacji i termin. Klientowi podać konkretną informację, nie ogólną deklarację."
    if any(word in text for word in ["klus", "profil", "osłon", "oslona", "akcesori"]):
        return "Porównać nazwę, indeks i komplet akcesoriów. Przy KLUŚ łatwo pomylić wariant, więc lepiej sprawdzić źródło przed wysyłką."
    if any(word in text for word in ["taśm", "tasm", "led", "barwa", "kelvin", "zasilacz"]):
        return "Dopilnować zgodności wariantu z zastosowaniem klienta. Jeśli temat dotyczy doboru, lepiej dać krótką rekomendację zamiast samego symbolu."
    if "zaleg" in text or "bez pierwszej odpowiedzi" in text or "bez odpowiedzi" in text:
        return "Jeżeli temat ma więcej niż jeden dzień, lepiej zamknąć go decyzją albo telefonem. Kolejne odkładanie zwiększa ryzyko utraty kontroli."
    if "klient odpisał" in text or "do reakcji" in text:
        return "To jest najlepszy moment na szybkie domknięcie. Odpowiedź powinna kończyć się decyzją, pytaniem o brakujące dane albo terminem."
    if "rados" in text or "narwojsz" in text:
        return "Potraktować jako roboczy temat do uporządkowania: decyzja, odpowiedzialny i termin. Bez tego wróci jako rozproszona sprawa."
    if sender.endswith("@prescot.pl") or sender.endswith("@prescot.com.pl"):
        return "To wygląda na sprawę wewnętrzną. Warto od razu ustalić, czy wymaga działania, czy tylko odnotowania."
    return "Nadać jeden konkretny następny krok i termin. Jeśli po przeczytaniu nie ma decyzji, temat trzeba doprecyzować zamiast zostawiać otwarty."


def thread_action(thread: dict, kind: str, end_exclusive: dt.date) -> dict[str, str]:
    row = row_for_thread(thread, end_exclusive)
    subject = row["temat"]
    snippet = safe(row["ostatni_fragment"], 260)
    if kind == "client_replied":
        next_step = "Klient odpisał po naszej odpowiedzi. Otworzyć wątek i wykonać kolejny ruch: odpowiedź, decyzja albo przekazanie dalej."
        status = "Do reakcji"
    elif kind == "stale":
        next_step = "Wątek ma długi czas bez pierwszej odpowiedzi. Sprawdzić, czy temat został załatwiony poza mailem albo wymaga odpowiedzi."
        status = "Zaległe"
    elif kind == "offer":
        next_step = "Nadać status oferty: wysłana, do follow-upu, wygrana, przegrana albo czekamy na dane."
        status = "Oferta / follow-up"
    else:
        next_step = "Sprawdzić temat i dopisać konkretny następny krok."
        status = "Do sprawdzenia"
    return {
        "date": row["ostatnia_data"],
        "owner": owner_hint(thread),
        "subject": subject,
        "snippet": snippet,
        "next_step": next_step,
        "status": status,
        "ai_advice": ai_advice(subject, snippet, status),
    }


def render_table(rows: list[dict[str, str]], columns: list[tuple[str, str]], empty: str = "Brak.") -> str:
    if not rows:
        return f'<p class="small">{html.escape(empty)}</p>'
    head = "".join(f"<th>{html.escape(label)}</th>" for _, label in columns)
    body = []
    for row in rows:
        tds = []
        for key, _ in columns:
            value = row.get(key, "")
            cls = ""
            if key == "status":
                cls = f' class="{status_class(value)}"'
            tds.append(f"<td{cls}>{html.escape(value)}</td>")
        body.append("<tr>" + "".join(tds) + "</tr>")
    return f"<table><thead><tr>{head}</tr></thead><tbody>{''.join(body)}</tbody></table>"


def build_operational_guidance(
    priorities: list[dict[str, str]],
    client_replied: list[dict[str, str]],
    stale: list[dict[str, str]],
    offers: list[dict[str, str]],
    firmowe: list,
    radoslaw: list,
) -> tuple[str, str]:
    top_subjects = []
    for row in priorities:
        subject = " ".join((row.get("subject") or "").split())
        if len(subject) < 5:
            continue
        if subject.isdigit():
            continue
        top_subjects.append(subject)
        if len(top_subjects) >= 3:
            break
    top_line = "; ".join(html.escape(subject) for subject in top_subjects)

    if client_replied:
        first_step = (
            f"Najpierw zamknij wątki, gdzie klient już wrócił: {len(client_replied)} tematów czeka na konkretną reakcję."
        )
    elif stale:
        first_step = (
            f"Nie ma świeżych powrotów od klientów, więc pierwszy blok pracy to zaległości: {len(stale)} tematów bez domknięcia."
        )
    elif offers:
        first_step = (
            f"Brak pilnych reakcji i zaległości, więc zacznij od ofert: {len(offers)} tematów wymaga decyzji handlowej albo follow-upu."
        )
    else:
        first_step = (
            "Nie widać dziś krytycznych czerwonych flag, więc pierwszy blok przeznacz na szybkie porządki i domykanie drobnych spraw."
        )

    risk_parts = []
    if stale:
        risk_parts.append(f"największe ryzyko to {len(stale)} zaległych wątków")
    if offers:
        risk_parts.append(f"{len(offers)} ofert bez jednoznacznego statusu")
    if radoslaw:
        risk_parts.append(f"{len(radoslaw)} wątków roboczych z Radosławem do uporządkowania")
    if not risk_parts:
        risk_parts.append("brak widocznych blokad wymagających eskalacji")
    risk_line = "Dziś operacyjnie najważniejsze jest " + ", ".join(risk_parts) + "."

    if firmowe:
        closing_line = (
            f"Na końcu przejdź przez bieżące sprawy firmowe ({len(firmowe)} pozycji po filtrze), ale tylko po nadaniu decyzji priorytetom."
        )
    else:
        closing_line = "Po priorytetach nie zostaje duży blok spraw firmowych, więc warto wykorzystać dzień na domknięcia i follow-up."

    queue_line = (
        f"Kolejność pracy na dziś: 1) priorytety, 2) powroty klientów, 3) zaległości, 4) oferty, 5) sprawy firmowe. "
        f"Top tematy z raportu: {top_line if top_line else 'brak jednego dominującego wątku, dzień jest rozproszony.'}"
    )

    status_line = (
        "<b>Interpretacja statusów:</b> "
        "<b>Do reakcji</b> oznacza, że klient wykonał ruch i temat trzeba dziś popchnąć dalej. "
        "<b>Zaległe</b> oznacza, że wątek już traci kontrolę i trzeba go zamknąć decyzją albo kontaktem. "
        "<b>Oferta / follow-up</b> oznacza, że temat handlowy nie może zostać bez wyniku: wyślij, dopytaj, oznacz jako wygrane/przegrane albo ustaw termin powrotu. "
        "<b>Do sprawdzenia</b> oznacza temat roboczy, który wymaga właściciela i następnego kroku."
    )

    note_html = (
        f"<div class=\"note\"><b>Wniosek operacyjny na dziś:</b> {html.escape(first_step)} "
        f"{html.escape(risk_line)} {html.escape(closing_line)} "
        f"Raport jest generowany lokalnie, bez kasowania i przenoszenia wiadomości.</div>"
    )
    summary_html = (
        f"<div class=\"note\"><b>Rekomendacja prowadzenia dnia:</b> {html.escape(queue_line)}</div>"
        f"<div class=\"note\">{status_line}</div>"
    )
    return note_html, summary_html


def render_html(label: str, start: dt.date, end_exclusive: dt.date, raw_count: int, ignored_count: int, analysis: dict, firmowe: list, radoslaw: list) -> str:
    end = end_exclusive - dt.timedelta(days=1)
    client_replied = [thread_action(t, "client_replied", end_exclusive) for t in analysis["followed_by_client"][:15]]
    stale = [thread_action(t, "stale", end_exclusive) for t in analysis["stale"][:15]]
    offers = [thread_action(t, "offer", end_exclusive) for t in analysis["offers"][:15]]

    priorities = []
    for source, label_name in [(client_replied, "Klient odpisał"), (stale, "Zaległe"), (offers, "Oferta")]:
        for row in source[:5]:
            priorities.append(
                {
                    "priority": str(len(priorities) + 1),
                    "start_date": row["date"].split(" ")[0],
                    "subject": row["subject"],
                    "summary": f"{label_name}. {row['snippet']}",
                    "next_step": row["next_step"],
                    "status": row["status"],
                    "ai_advice": row["ai_advice"],
                }
            )
            if len(priorities) >= 10:
                break
        if len(priorities) >= 10:
            break

    if not priorities:
        priorities.append(
            {
                "priority": "1",
                "start_date": start.strftime("%d.%m"),
                "subject": "Brak krytycznych zaległości w analizowanym zakresie",
                "summary": "Po filtrach nie widać pilnych zaległych wątków. Zostaje kontrola najnowszych tematów firmowych.",
                "next_step": "Przejrzeć najnowsze firmowe wątki i domknąć małe sprawy operacyjne.",
                "status": "Do sprawdzenia",
                "ai_advice": "Dzień warto wykorzystać na porządkowanie małych otwartych tematów, zanim zamienią się w zaległości.",
            }
        )

    recent_rows = []
    for item in sorted(firmowe, key=lambda i: i.date, reverse=True)[:25]:
        recent_rows.append(
            {
                "date": item.date.astimezone().strftime("%Y-%m-%d %H:%M"),
                "from": item.sender_email or item.sender_name,
                "subject": safe(item.subject, 140),
                "snippet": safe(item.snippet, 260),
                "ai_advice": ai_advice(item.subject, item.snippet, sender=item.sender_email or item.sender_name),
            }
        )

    radoslaw_rows = []
    for item in sorted(radoslaw, key=lambda i: i.date, reverse=True)[:20]:
        radoslaw_rows.append(
            {
                "date": item.date.astimezone().strftime("%d.%m"),
                "subject": safe(item.subject, 160),
                "summary": safe(item.snippet, 300),
                "next_step": "Sprawdzić, czy temat wymaga odpowiedzi, decyzji albo dopisania do planu działań.",
                "status": "Do sprawdzenia",
                "ai_advice": ai_advice(item.subject, item.snippet, "Do sprawdzenia", item.sender_email or item.sender_name),
            }
        )

    operational_note, operational_summary = build_operational_guidance(
        priorities, client_replied, stale, offers, firmowe, radoslaw
    )

    return f"""<!doctype html>
<html lang="pl">
<head>
<meta charset="utf-8">
<title>{html.escape(REPORT_TITLE)}</title>
<style>
  body{{font-family:Arial,Helvetica,sans-serif;margin:0;background:#f4f6f8;color:#172033;line-height:1.45}}
  .wrap{{max-width:1120px;margin:0 auto;padding:28px}}
  h1{{font-size:28px;margin:0 0 6px;color:#10233f}}
  h2{{font-size:20px;margin:28px 0 12px;color:#10233f;border-bottom:2px solid #e5e7eb;padding-bottom:6px}}
  .lead{{color:#667085;margin:0 0 18px}}
  .grid{{display:grid;grid-template-columns:repeat(4,1fr);gap:10px;margin:18px 0}}
  .stat{{background:#fff;border:1px solid #e5e7eb;padding:12px;border-radius:6px}}
  .stat b{{display:block;font-size:24px;color:#ef4b25}}.stat span{{font-size:12px;color:#667085}}
  table{{width:100%;border-collapse:collapse;background:#fff;border:1px solid #e5e7eb;margin:10px 0 18px}}
  th,td{{border:1px solid #e5e7eb;padding:9px 10px;vertical-align:top;font-size:13px}}
  th{{background:#10233f;color:#fff;text-align:left;font-size:12px;text-transform:uppercase;letter-spacing:.02em}}
  .prio{{font-weight:bold;color:#b42318}}.done{{color:#067647;font-weight:bold}}.wait{{color:#b54708;font-weight:bold}}.todo{{color:#175cd3;font-weight:bold}}
  .note{{background:#fff7ed;border-left:4px solid #f97316;padding:12px 14px;margin:12px 0;color:#7c2d12}}
  .small{{font-size:12px;color:#667085}}
  @media(max-width:800px){{.grid{{grid-template-columns:1fr 1fr}}.wrap{{padding:16px}}th,td{{font-size:12px}}}}
</style>
</head>
<body><div class="wrap">
<h1>{html.escape(REPORT_TITLE)}</h1>
<p class="lead">Skrzynka: {html.escape(label)}. Zakres: {start:%d.%m.%Y} - {end:%d.%m.%Y}. Ujęte są firmowe wątki Prescot i robocze self-maile. Marketplace, newslettery i automaty pominięte.</p>
<div class="grid">
  <div class="stat"><b>{raw_count}</b><span>wiadomości pobrane z zakresu</span></div>
  <div class="stat"><b>{len(firmowe)}</b><span>firmowe/robocze po filtrze</span></div>
  <div class="stat"><b>{len(radoslaw)}</b><span>wpisów w wątkach z Radosławem</span></div>
  <div class="stat"><b>{len(priorities)}</b><span>obszarów do planu dnia</span></div>
</div>

<h2>Najważniejsze priorytety na dziś</h2>
{render_table(priorities, [("priority","Priorytet"),("start_date","Od kiedy"),("subject","Temat"),("summary","Co było / jest do zrobienia"),("status","Status nadany"),("ai_advice","Wnioski i rady AI")])}

<h2>Radosław Narwojsz - osobne podsumowanie</h2>
{render_table(radoslaw_rows, [("date","Data"),("subject","Temat"),("summary","Co było w wątku"),("next_step","Następny krok"),("status","Status"),("ai_advice","Wnioski i rady AI")], "Brak nowych wątków z Radosławem w tym zakresie.")}

<h2>Najnowsze firmowe / robocze tematy</h2>
{render_table(recent_rows, [("date","Data"),("from","Od"),("subject","Temat"),("snippet","Fragment"),("ai_advice","Wnioski i rady AI")], "Brak firmowych tematów po filtrze.")}

{operational_note}
{operational_summary}
</div></body></html>"""


def send_email(env: dict[str, str], to_addr: str, subject: str, html_body: str, attachment: Path | None = None) -> None:
    user = env["IMAP_USER"]
    password = env["IMAP_PASSWORD"]
    host = env.get("SMTP_HOST") or env.get("IMAP_HOST") or "prescot.pl"
    port = int(env.get("SMTP_PORT", "465"))

    msg = EmailMessage()
    msg["From"] = user
    msg["To"] = to_addr
    msg["Subject"] = subject
    msg.set_content("Raport dzienny jest w wersji HTML. Jeśli klient poczty go nie pokazuje, otwórz załącznik HTML.")
    msg.add_alternative(html_body, subtype="html")
    if attachment and attachment.exists():
        msg.add_attachment(attachment.read_bytes(), maintype="text", subtype="html", filename=attachment.name)

    if port == 465:
        with smtplib.SMTP_SSL(host, port, timeout=45, context=ssl.create_default_context()) as smtp:
            smtp.login(user, password)
            smtp.send_message(msg)
    else:
        with smtplib.SMTP(host, port, timeout=45) as smtp:
            smtp.ehlo()
            smtp.starttls(context=ssl.create_default_context())
            smtp.ehlo()
            smtp.login(user, password)
            smtp.send_message(msg)


def main() -> None:
    parser = argparse.ArgumentParser(description="Codzienny plan działań z poczty firmowej.")
    parser.add_argument("--env-file", default=".env")
    parser.add_argument("--days-back", type=int, default=2)
    parser.add_argument("--start", default="")
    parser.add_argument("--end-exclusive", default="")
    parser.add_argument("--send", action="store_true")
    parser.add_argument("--to", default=DEFAULT_RECIPIENT)
    args = parser.parse_args()

    socket.setdefaulttimeout(45)
    env_file = Path(args.env_file)
    if not env_file.is_absolute():
        env_file = ROOT / env_file
    config = load_monthly_config(env_file)
    env = parse_env(env_file)

    if args.start and args.end_exclusive:
        start = dt.date.fromisoformat(args.start)
        end_exclusive = dt.date.fromisoformat(args.end_exclusive)
    else:
        start, end_exclusive = report_range(args.days_back)

    raw = fetch_mail_range(config, start, end_exclusive)
    filtered, ignored = filter_ignored(raw)
    analysis = build_analysis(config, filtered, end_exclusive)
    firmowe = internal_items(filtered)
    radoslaw = [item for item in filtered if "narwojsz" in item_text(item) or "rados" in item_text(item)]

    stamp = dt.datetime.now().strftime("%Y-%m-%d_%H-%M")
    end = end_exclusive - dt.timedelta(days=1)
    base_name = f"daily_action_{config.base.mailbox_label}_{start.isoformat()}_{end.isoformat()}_{stamp}"
    out_dir = config.base.reports_dir
    out_dir.mkdir(parents=True, exist_ok=True)
    html_path = out_dir / f"{base_name}.html"

    html_body = render_html(config.base.mailbox_label, start, end_exclusive, len(raw), len(ignored), analysis, firmowe, radoslaw)
    html_path.write_text(html_body, encoding="utf-8")

    print(f"RAW: {len(raw)}")
    print(f"IGNORED: {len(ignored)}")
    print(f"FIRMOWE: {len(firmowe)}")
    print(f"RADOSLAW: {len(radoslaw)}")
    print(f"HTML: {html_path}")

    if args.send:
        subject = f"Plan dnia Prescot - {dt.date.today():%Y-%m-%d}"
        send_email(env, args.to, subject, html_body, html_path)
        print(f"SENT: {args.to}")


if __name__ == "__main__":
    main()
