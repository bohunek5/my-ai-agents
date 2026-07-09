#!/usr/bin/env python3
from __future__ import annotations

import argparse
import csv
import datetime as dt
import html
import socket
from collections import Counter
from pathlib import Path

from mail_report import format_hours
from monthly_info_report import (
    ROOT,
    build_analysis,
    fetch_mail_range,
    load_monthly_config,
    sender_domain,
    thread_age_hours,
)


IGNORE_PATTERNS = ["allegro", "emagro", "emag", "empik", "shoper"]


def previous_full_week(today: dt.date | None = None) -> tuple[dt.date, dt.date]:
    today = today or dt.date.today()
    this_monday = today - dt.timedelta(days=today.weekday())
    previous_monday = this_monday - dt.timedelta(days=7)
    return previous_monday, this_monday


def item_text(item) -> str:
    return f"{item.sender_email} {item.sender_name} {item.subject} {item.snippet}".lower()


def filter_ignored(items: list) -> tuple[list, list]:
    kept = []
    ignored = []
    for item in items:
        if any(pattern in item_text(item) for pattern in IGNORE_PATTERNS):
            ignored.append(item)
        else:
            kept.append(item)
    return kept, ignored


def thread_domain(thread: dict) -> str:
    party = thread["key"][0]
    if "@" in party:
        return sender_domain(party)
    return party


def safe(text: str, limit: int = 180) -> str:
    value = " ".join(str(text or "").split())
    return value[:limit]


def row_for_thread(thread: dict, end_exclusive: dt.date) -> dict:
    last = thread["last"]
    return {
        "klient": thread["key"][0],
        "domena": thread_domain(thread),
        "handlowiec": thread["salesperson"],
        "ostatnia_data": last.date.astimezone().strftime("%Y-%m-%d %H:%M"),
        "wiek_na_koniec_zakresu": format_hours(thread_age_hours(thread, end_exclusive)),
        "temat": safe(last.subject, 160),
        "status": thread["state"],
        "kategorie": ", ".join(thread["categories"]),
        "ostatni_fragment": safe(last.snippet, 260),
    }


def write_csv(path: Path, rows: list[dict]) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    fieldnames = ["klient", "domena", "handlowiec", "ostatnia_data", "wiek_na_koniec_zakresu", "temat", "status", "kategorie", "ostatni_fragment"]
    with path.open("w", newline="", encoding="utf-8") as handle:
        writer = csv.DictWriter(handle, fieldnames=fieldnames)
        writer.writeheader()
        writer.writerows(rows)


def md_table(rows: list[dict], columns: list[tuple[str, str]], limit: int = 20) -> str:
    if not rows:
        return "_Brak._\n"
    out = ["|" + "|".join(label for _, label in columns) + "|", "|" + "|".join("---" for _ in columns) + "|"]
    for row in rows[:limit]:
        values = []
        for key, _ in columns:
            value = str(row.get(key, "")).replace("|", "/")
            values.append(value)
        out.append("|" + "|".join(values) + "|")
    if len(rows) > limit:
        out.append(f"\n_Pokazuję {limit} z {len(rows)} pozycji. Pełna lista jest w CSV._")
    return "\n".join(out) + "\n"


def render_markdown(config_label: str, start: dt.date, end_exclusive: dt.date, raw_count: int, ignored_count: int, analysis: dict, csv_paths: dict[str, Path]) -> str:
    end = end_exclusive - dt.timedelta(days=1)
    response_hours = [thread["response_hours"] for thread in analysis["answered"] if thread["response_hours"] is not None]
    avg = sum(response_hours) / len(response_hours) if response_hours else 0
    domains = analysis["client_domains"].most_common(10)
    categories = analysis["categories"].most_common(10)
    sales = sorted(set(analysis["by_sales"]) | set(analysis["offers_by_sales"]) | set(analysis["open_by_sales"]) | set(analysis["client_reply_by_sales"]))

    unanswered_rows = [row_for_thread(thread, end_exclusive) for thread in analysis["unanswered"]]
    stale_rows = [row_for_thread(thread, end_exclusive) for thread in analysis["stale"]]
    client_replied_rows = [row_for_thread(thread, end_exclusive) for thread in analysis["followed_by_client"]]
    offer_rows = [row_for_thread(thread, end_exclusive) for thread in analysis["offers"]]

    sales_lines = []
    for name in sales:
        times = analysis["response_by_sales"].get(name, [])
        sales_lines.append(
            {
                "handlowiec": name,
                "odpowiedzi": str(analysis["by_sales"].get(name, 0)),
                "oferty": str(analysis["offers_by_sales"].get(name, 0)),
                "otwarte": str(analysis["open_by_sales"].get(name, 0)),
                "klient_odpisal": str(analysis["client_reply_by_sales"].get(name, 0)),
                "sredni_czas": format_hours(sum(times) / len(times)) if times else "-",
            }
        )

    risk_notes = []
    if analysis["stale"]:
        risk_notes.append(f"{len(analysis['stale'])} wątków bez pierwszej odpowiedzi ma 72h+ na końcu tygodnia.")
    if analysis["followed_by_client"]:
        risk_notes.append(f"{len(analysis['followed_by_client'])} wątków wymaga kolejnego ruchu, bo klient odpisał po naszej odpowiedzi.")
    if analysis["offers"]:
        risk_notes.append(f"{len(analysis['offers'])} wątków wygląda jak oferta/wycena i wymaga statusu: wygrane, przegrane, follow-up albo czekamy.")
    if not risk_notes:
        risk_notes.append("Nie widać krytycznej kolejki zaległych wątków po odfiltrowaniu marketplace.")

    lines = [
        f"# Raport skrzynki: {config_label}",
        "",
        f"Zakres: {start.isoformat()} - {end.isoformat()}",
        "",
        "## Liczby",
        "",
        f"- Pobrane wiadomości: {raw_count}",
        f"- Pominięte marketplace/systemy z filtrów Allegro/eMAG/Empik/Shoper: {ignored_count}",
        f"- Wiadomości biznesowe po filtrach systemowych: {len(analysis['business'])}",
        f"- Wątki biznesowe: {len(analysis['threads'])}",
        f"- Odpowiedziane wątki: {len(analysis['answered'])}",
        f"- Bez pierwszej odpowiedzi: {len(analysis['unanswered'])}",
        f"- Bez odpowiedzi 72h+: {len(analysis['stale'])}",
        f"- Klient odpisał po naszej odpowiedzi: {len(analysis['followed_by_client'])}",
        f"- Oferty/wyceny do statusu/follow-upu: {len(analysis['offers'])}",
        f"- Średni czas pierwszej odpowiedzi: {format_hours(avg) if response_hours else '-'}",
        "",
        "## Wnioski",
        "",
    ]
    lines.extend(f"- {note}" for note in risk_notes)
    if domains:
        top_domains = ", ".join(f"{d or 'brak'} ({c})" for d, c in domains[:5])
        lines.append(f"- Najczęściej wracały domeny: {top_domains}.")
    if categories:
        lines.append(f"- Główne kategorie tematów: {', '.join(f'{k} ({v})' for k, v in categories[:6])}.")

    lines.extend(
        [
            "",
            "## Czego nie domknąłem / do zrobienia",
            "",
            "### 1. Bez pierwszej odpowiedzi",
            "",
            md_table(unanswered_rows, [("ostatnia_data", "Data"), ("klient", "Klient"), ("handlowiec", "Właściciel"), ("temat", "Temat"), ("wiek_na_koniec_zakresu", "Wiek")], 30),
            "### 2. Zaległe 72h+",
            "",
            md_table(stale_rows, [("ostatnia_data", "Data"), ("klient", "Klient"), ("temat", "Temat"), ("wiek_na_koniec_zakresu", "Wiek")], 30),
            "### 3. Klient odpisał po naszej odpowiedzi",
            "",
            md_table(client_replied_rows, [("ostatnia_data", "Data"), ("klient", "Klient"), ("handlowiec", "Właściciel"), ("temat", "Temat")], 30),
            "### 4. Oferty/wyceny do statusu lub follow-upu",
            "",
            md_table(offer_rows, [("ostatnia_data", "Data"), ("klient", "Klient"), ("handlowiec", "Właściciel"), ("temat", "Temat"), ("status", "Status")], 30),
            "## Handlowcy / właściciele tematów",
            "",
            md_table(sales_lines, [("handlowiec", "Osoba"), ("odpowiedzi", "Odp."), ("oferty", "Oferty"), ("otwarte", "Otwarte"), ("klient_odpisal", "Klient odpisał"), ("sredni_czas", "Śr. czas")], 40),
            "## Pliki CSV",
            "",
        ]
    )
    for label, path in csv_paths.items():
        lines.append(f"- {label}: `{path}`")
    lines.append("")
    return "\n".join(lines)


def write_html(markdown_text: str, output_path: Path) -> None:
    escaped = html.escape(markdown_text)
    output_path.write_text(
        f"""<!doctype html>
<html lang="pl">
<meta charset="utf-8">
<title>Raport tygodniowy skrzynki</title>
<style>
body {{ font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif; margin: 32px; color: #172033; }}
pre {{ white-space: pre-wrap; line-height: 1.45; font-size: 14px; }}
</style>
<pre>{escaped}</pre>
</html>
""",
        encoding="utf-8",
    )


def main() -> None:
    parser = argparse.ArgumentParser(description="Tygodniowy raport akcji ze skrzynki IMAP.")
    parser.add_argument("--env-file", default=".env")
    parser.add_argument("--start", default="")
    parser.add_argument("--end-exclusive", default="")
    args = parser.parse_args()

    socket.setdefaulttimeout(45)
    env_file = Path(args.env_file)
    if not env_file.is_absolute():
        env_file = ROOT / env_file
    config = load_monthly_config(env_file)

    if args.start and args.end_exclusive:
        start = dt.date.fromisoformat(args.start)
        end_exclusive = dt.date.fromisoformat(args.end_exclusive)
    else:
        start, end_exclusive = previous_full_week()

    raw_items = fetch_mail_range(config, start, end_exclusive)
    filtered_items, ignored = filter_ignored(raw_items)
    analysis = build_analysis(config, filtered_items, end_exclusive)

    stamp = dt.datetime.now().strftime("%Y-%m-%d_%H-%M")
    base_name = f"weekly_action_{config.base.mailbox_label}_{start.isoformat()}_{(end_exclusive - dt.timedelta(days=1)).isoformat()}_{stamp}"
    out_dir = config.base.reports_dir
    out_dir.mkdir(parents=True, exist_ok=True)

    csv_paths = {
        "bez odpowiedzi": out_dir / f"{base_name}_bez_odpowiedzi.csv",
        "zalegle 72h": out_dir / f"{base_name}_zalegle_72h.csv",
        "klient odpisal": out_dir / f"{base_name}_klient_odpisal.csv",
        "oferty": out_dir / f"{base_name}_oferty.csv",
    }
    write_csv(csv_paths["bez odpowiedzi"], [row_for_thread(thread, end_exclusive) for thread in analysis["unanswered"]])
    write_csv(csv_paths["zalegle 72h"], [row_for_thread(thread, end_exclusive) for thread in analysis["stale"]])
    write_csv(csv_paths["klient odpisal"], [row_for_thread(thread, end_exclusive) for thread in analysis["followed_by_client"]])
    write_csv(csv_paths["oferty"], [row_for_thread(thread, end_exclusive) for thread in analysis["offers"]])

    markdown = render_markdown(config.base.mailbox_label, start, end_exclusive, len(raw_items), len(ignored), analysis, csv_paths)
    md_path = out_dir / f"{base_name}.md"
    html_path = out_dir / f"{base_name}.html"
    md_path.write_text(markdown, encoding="utf-8")
    write_html(markdown, html_path)

    print(f"RAW: {len(raw_items)}")
    print(f"IGNORED: {len(ignored)}")
    print(f"BUSINESS: {len(analysis['business'])}")
    print(f"THREADS: {len(analysis['threads'])}")
    print(f"UNANSWERED: {len(analysis['unanswered'])}")
    print(f"STALE_72H: {len(analysis['stale'])}")
    print(f"CLIENT_REPLIED: {len(analysis['followed_by_client'])}")
    print(f"OFFERS: {len(analysis['offers'])}")
    print(f"MD: {md_path}")
    print(f"HTML: {html_path}")
    for label, path in csv_paths.items():
        print(f"CSV {label}: {path}")


if __name__ == "__main__":
    main()
