#!/usr/bin/env python3
from __future__ import annotations

import argparse
import datetime as dt
import html
import socket
from collections import Counter
from pathlib import Path

from reportlab.lib import colors
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import mm
from reportlab.platypus import PageBreak, Paragraph, SimpleDocTemplate, Spacer, Table, TableStyle

from mail_report import format_hours, register_font
from monthly_info_report import (
    ROOT,
    build_analysis,
    fetch_mail_range,
    load_monthly_config,
    previous_month_range,
    sender_domain,
    thread_age_hours,
)


def p(text: str, style: ParagraphStyle) -> Paragraph:
    return Paragraph(html.escape(str(text)), style)


def clamp(value: float, low: int = 0, high: int = 100) -> int:
    return max(low, min(high, round(value)))


def pct(part: int, whole: int) -> str:
    if not whole:
        return "0%"
    return f"{part / whole * 100:.1f}%"


def quality_score(analysis: dict) -> tuple[int, str]:
    threads = max(1, len(analysis["threads"]))
    unanswered_rate = len(analysis["unanswered"]) / threads
    stale_rate = len(analysis["stale"]) / threads
    reply_after_sales_rate = len(analysis["followed_by_client"]) / threads
    system_noise_rate = len(analysis["service"]) / max(1, len(analysis["business"]) + len(analysis["service"]))
    avg = analysis["avg"]
    score = 100
    score -= unanswered_rate * 28
    score -= stale_rate * 28
    score -= max(0, avg - 4) * 2.0
    score -= reply_after_sales_rate * 10
    score -= system_noise_rate * 7
    value = clamp(score)
    if value >= 85:
        label = "bardzo dobra kontrola obsługi"
    elif value >= 70:
        label = "dobry poziom, widoczne miejsca do domknięcia"
    elif value >= 55:
        label = "średni poziom, potrzebny system follow-upów"
    else:
        label = "wysokie ryzyko utraty tematów i jakości obsługi"
    return value, label


def response_distribution(hours: list[float]) -> Counter[str]:
    buckets: Counter[str] = Counter()
    for hour in hours:
        if hour <= 2:
            buckets["do 2h"] += 1
        elif hour <= 8:
            buckets["2-8h"] += 1
        elif hour <= 24:
            buckets["8-24h"] += 1
        elif hour <= 48:
            buckets["24-48h"] += 1
        else:
            buckets["48h+"] += 1
    return buckets


def percentile(values: list[float], point: float) -> float:
    if not values:
        return 0
    ordered = sorted(values)
    index = int(round((len(ordered) - 1) * point))
    return ordered[index]


def risk_label(thread: dict, end_exclusive: dt.date) -> str:
    age = thread_age_hours(thread, end_exclusive)
    categories = set(thread["categories"])
    if age >= 168 or categories & {"reklamacja", "pilne"}:
        return "wysokie"
    if age >= 72 or categories & {"wycena", "hurt/b2b"}:
        return "średnie"
    return "niskie"


def suggested_action(thread: dict, end_exclusive: dt.date) -> str:
    age = thread_age_hours(thread, end_exclusive)
    categories = set(thread["categories"])
    if "reklamacja" in categories or "pilne" in categories:
        return "telefon + decyzja właściciela tematu dzisiaj"
    if "wycena" in categories or "hurt/b2b" in categories:
        return "follow-up handlowy i termin kolejnego kontaktu"
    if age >= 168:
        return "zamknąć albo przypisać do osoby z terminem"
    return "sprawdzić, czy temat nadal aktualny"


def table(data: list[list], widths: list[float], font: str, header: str = "#e9eff8", font_size: float = 7.5) -> Table:
    obj = Table(data, colWidths=widths, repeatRows=1, hAlign="LEFT")
    obj.setStyle(
        TableStyle(
            [
                ("BACKGROUND", (0, 0), (-1, 0), colors.HexColor(header)),
                ("TEXTCOLOR", (0, 0), (-1, 0), colors.HexColor("#132238")),
                ("GRID", (0, 0), (-1, -1), 0.35, colors.HexColor("#d8e0eb")),
                ("ROWBACKGROUNDS", (0, 1), (-1, -1), [colors.white, colors.HexColor("#f8fafc")]),
                ("FONTNAME", (0, 0), (-1, -1), font),
                ("FONTSIZE", (0, 0), (-1, -1), font_size),
                ("VALIGN", (0, 0), (-1, -1), "TOP"),
                ("PADDING", (0, 0), (-1, -1), 5),
            ]
        )
    )
    return obj


def score_card(score: int, label: str, font: str) -> Table:
    data = [
        ["Ocena jakości obsługi", f"{score}/100", label],
    ]
    obj = Table(data, colWidths=[48 * mm, 34 * mm, 94 * mm], hAlign="LEFT")
    score_color = "#1f7a4d" if score >= 75 else "#b7791f" if score >= 55 else "#b42318"
    obj.setStyle(
        TableStyle(
            [
                ("BACKGROUND", (0, 0), (-1, -1), colors.HexColor("#10233f")),
                ("TEXTCOLOR", (0, 0), (-1, -1), colors.white),
                ("FONTNAME", (0, 0), (-1, -1), font),
                ("FONTSIZE", (0, 0), (0, 0), 9),
                ("FONTSIZE", (1, 0), (1, 0), 22),
                ("FONTSIZE", (2, 0), (2, 0), 9),
                ("BACKGROUND", (1, 0), (1, 0), colors.HexColor(score_color)),
                ("PADDING", (0, 0), (-1, -1), 11),
                ("VALIGN", (0, 0), (-1, -1), "MIDDLE"),
            ]
        )
    )
    return obj


def metric_cards(metrics: list[tuple[str, str, str]], font: str) -> Table:
    rows = []
    for index in range(0, len(metrics), 3):
        chunk = metrics[index:index + 3]
        while len(chunk) < 3:
            chunk.append(("", "", ""))
        rows.append([f"{a}\n{b}\n{c}" for a, b, c in chunk])
    obj = Table(rows, colWidths=[58 * mm, 58 * mm, 58 * mm], hAlign="LEFT")
    obj.setStyle(
        TableStyle(
            [
                ("BACKGROUND", (0, 0), (-1, -1), colors.HexColor("#f4f7fb")),
                ("BOX", (0, 0), (-1, -1), 0.45, colors.HexColor("#d8e0eb")),
                ("INNERGRID", (0, 0), (-1, -1), 0.35, colors.HexColor("#d8e0eb")),
                ("FONTNAME", (0, 0), (-1, -1), font),
                ("FONTSIZE", (0, 0), (-1, -1), 8.5),
                ("LEADING", (0, 0), (-1, -1), 11),
                ("PADDING", (0, 0), (-1, -1), 8),
                ("VALIGN", (0, 0), (-1, -1), "TOP"),
            ]
        )
    )
    return obj


def generate_report(env_file: Path, output_pdf: Path, output_html: Path | None = None) -> tuple[int, dict]:
    config = load_monthly_config(env_file)
    start, end_exclusive = previous_month_range()
    items = fetch_mail_range(config, start, end_exclusive)
    analysis = build_analysis(config, items, end_exclusive)
    score, score_text = quality_score(analysis)
    response_hours = [thread["response_hours"] for thread in analysis["answered"] if thread["response_hours"] is not None]
    distribution = response_distribution(response_hours)
    threads_total = max(1, len(analysis["threads"]))
    system_total = len(analysis["service"])
    all_total = len(analysis["business"]) + len(analysis["service"])

    font = register_font()
    styles = getSampleStyleSheet()
    base = ParagraphStyle("base", parent=styles["BodyText"], fontName=font, fontSize=8.8, leading=12)
    small = ParagraphStyle("small", parent=styles["BodyText"], fontName=font, fontSize=7.4, leading=9.5)
    h1 = ParagraphStyle("h1", parent=styles["Heading1"], fontName=font, fontSize=23, leading=28, textColor=colors.HexColor("#10233f"), spaceAfter=5)
    h2 = ParagraphStyle("h2", parent=styles["Heading2"], fontName=font, fontSize=14, leading=18, textColor=colors.HexColor("#10233f"), spaceBefore=8, spaceAfter=6)
    lead = ParagraphStyle("lead", parent=base, fontSize=9.5, leading=13, textColor=colors.HexColor("#475467"))
    note = ParagraphStyle("note", parent=base, backColor=colors.HexColor("#f4f8ff"), borderColor=colors.HexColor("#b8cdf2"), borderWidth=0.5, borderPadding=7)

    doc = SimpleDocTemplate(
        str(output_pdf),
        pagesize=A4,
        leftMargin=12 * mm,
        rightMargin=12 * mm,
        topMargin=12 * mm,
        bottomMargin=11 * mm,
        title=f"Raport jakości obsługi klienta - {config.base.mailbox_label}",
    )
    story = [
        p("Raport jakości obsługi klienta", h1),
        p(f"Skrzynka: {config.base.mailbox_label} | Zakres: {start.isoformat()} - {(end_exclusive - dt.timedelta(days=1)).isoformat()}", lead),
        Spacer(1, 4 * mm),
        score_card(score, score_text, font),
        Spacer(1, 5 * mm),
        p("Wniosek zarządczy", h2),
        p(
            "Obsługa działa i handlowcy odpowiadają na część tematów szybko, ale skrzynka nie ma pełnej kontroli follow-upów. "
            "Największe ryzyko to wątki bez właściciela, zaległe tematy 72h+ oraz oferty bez widocznego statusu: wygrana, przegrana, follow-up albo czekamy na klienta.",
            note,
        ),
        Spacer(1, 4 * mm),
    ]

    metrics = [
        ("Maile biznesowe", str(len(analysis["business"])), "po odfiltrowaniu systemów"),
        ("Maile systemowe", str(system_total), f"{pct(system_total, all_total)} całej skrzynki"),
        ("Wątki biznesowe", str(len(analysis["threads"])), "po grupowaniu rozmów"),
        ("Bez odpowiedzi", str(len(analysis["unanswered"])), f"{pct(len(analysis['unanswered']), threads_total)} wątków"),
        ("Zaległe 72h+", str(len(analysis["stale"])), f"{pct(len(analysis['stale']), threads_total)} wątków"),
        ("Średni czas odp.", format_hours(analysis["avg"]) if response_hours else "-", "dla wykrytych odpowiedzi"),
        ("Mediana odp.", format_hours(percentile(response_hours, 0.5)) if response_hours else "-", "typowy czas reakcji"),
        ("P90 odp.", format_hours(percentile(response_hours, 0.9)) if response_hours else "-", "gorsze przypadki"),
        ("Oferty/wyceny", str(len(analysis["offers"])), "wymagają statusu"),
    ]
    story.append(metric_cards(metrics, font))
    story.append(Spacer(1, 5 * mm))

    dist_rows = [[p("Próg odpowiedzi", small), p("Liczba", small), p("Udział", small)]]
    for bucket in ["do 2h", "2-8h", "8-24h", "24-48h", "48h+"]:
        count = distribution.get(bucket, 0)
        dist_rows.append([bucket, str(count), pct(count, len(response_hours))])
    story.append(p("1. Jakość czasu odpowiedzi", h2))
    story.append(table(dist_rows, [70 * mm, 35 * mm, 35 * mm], font))
    story.append(Spacer(1, 3 * mm))
    story.append(
        p(
            "Cel operacyjny: zapytania ofertowe i leady B2B powinny mieć pierwszą odpowiedź w 2-4h robocze. "
            "Tematy reklamacyjne i pilne powinny mieć właściciela i pierwszy kontakt tego samego dnia.",
            base,
        )
    )

    sales_rows = [[p("Handlowiec", small), p("Odp.", small), p("Oferty", small), p("Otwarte", small), p("Klient odpisał", small), p("Śr. czas", small), p("Ocena / ryzyko", small)]]
    sales_names = sorted(set(analysis["by_sales"]) | set(analysis["offers_by_sales"]) | set(analysis["open_by_sales"]))
    for name in sales_names:
        times = analysis["response_by_sales"].get(name, [])
        open_count = analysis["open_by_sales"].get(name, 0)
        offers = analysis["offers_by_sales"].get(name, 0)
        client_back = analysis["client_reply_by_sales"].get(name, 0)
        avg = sum(times) / len(times) if times else 0
        if open_count > 5:
            comment = "dużo otwartych tematów - sprawdzić priorytety"
        elif client_back:
            comment = "klient odpisał po ofercie - domknąć następny krok"
        elif offers and not open_count:
            comment = "dobry porządek w otwartych wątkach"
        else:
            comment = "do przeglądu na spotkaniu"
        sales_rows.append([p(name, small), str(analysis["by_sales"].get(name, 0)), str(offers), str(open_count), str(client_back), format_hours(avg) if times else "-", p(comment, small)])
    if len(sales_rows) == 1:
        sales_rows.append([p("Brak danych", small), "-", "-", "-", "-", "-", "-"])
    story.append(p("2. Podsumowanie działań handlowców", h2))
    story.append(table(sales_rows, [40 * mm, 14 * mm, 16 * mm, 16 * mm, 22 * mm, 20 * mm, 48 * mm], font))
    story.append(PageBreak())

    story.append(p("3. Najważniejsze tematy na spotkanie jutro", h2))
    agenda = [
        "Ustalić właściciela każdego wątku zaległego 72h+ i termin następnego ruchu.",
        "Przejść oferty/wyceny: które są wygrane, przegrane, do follow-upu, a które wiszą bez decyzji.",
        "Wyjaśnić wątki, gdzie klient odpisał po handlowcu: czy jest kolejny krok i kto go wykonuje.",
        "Oddzielić automaty i marketplace od prawdziwych leadów, aby raport nie mieszał sprzedaży z powiadomieniami.",
        "Ustalić SLA: lead/wycena 2-4h, reklamacja tego samego dnia, follow-up ofert po 2-3 dniach.",
        "Wprowadzić prosty status tematu w CRM/arkuszu: Nowy, W toku, Oferta, Follow-up, Zamknięty, Przegrany.",
    ]
    agenda_rows = [[p("Pytanie / decyzja do podjęcia", small)]]
    for item in agenda + analysis["questions"][:8]:
        agenda_rows.append([p(item, small)])
    story.append(table(agenda_rows, [176 * mm], font, "#fff4dd"))

    story.append(p("4. Wątki wysokiego ryzyka", h2))
    risky = sorted(analysis["unanswered"], key=lambda thread: (risk_label(thread, end_exclusive), thread["last"].date), reverse=True)
    risk_rows = [[p("Ryzyko", small), p("Klient", small), p("Handlowiec", small), p("Temat", small), p("Rekomendowany ruch", small)]]
    for thread in risky[:28]:
        risk_rows.append(
            [
                risk_label(thread, end_exclusive),
                p(thread["key"][0], small),
                p(thread["salesperson"], small),
                p(thread["last"].subject[:105], small),
                p(suggested_action(thread, end_exclusive), small),
            ]
        )
    if len(risk_rows) == 1:
        risk_rows.append(["-", p("Brak krytycznych zaległości", small), "-", "-", "-"])
    story.append(table(risk_rows, [18 * mm, 42 * mm, 32 * mm, 52 * mm, 32 * mm], font, "#fde7e7"))
    story.append(PageBreak())

    story.append(p("5. Oferty, które trzeba domknąć", h2))
    offer_rows = [[p("Klient", small), p("Handlowiec", small), p("Temat", small), p("Status", small), p("Co zrobić", small)]]
    for thread in analysis["offers"][:32]:
        action = "follow-up i wpisanie statusu oferty"
        if thread["last_side"] == "klient":
            action = "odpowiedzieć klientowi i doprecyzować decyzję"
        offer_rows.append([p(thread["key"][0], small), p(thread["salesperson"], small), p(thread["last"].subject[:100], small), p(thread["state"], small), p(action, small)])
    if len(offer_rows) == 1:
        offer_rows.append([p("Brak ofert", small), "-", "-", "-", "-"])
    story.append(table(offer_rows, [40 * mm, 32 * mm, 54 * mm, 30 * mm, 20 * mm], font))

    story.append(p("6. Klient odpisał po handlowcu", h2))
    reply_rows = [[p("Klient", small), p("Handlowiec", small), p("Temat", small), p("Na czym stoi", small)]]
    for thread in analysis["followed_by_client"][:26]:
        reply_rows.append([p(thread["key"][0], small), p(thread["salesperson"], small), p(thread["last"].subject[:95], small), p(thread["last"].snippet[:160], small)])
    if len(reply_rows) == 1:
        reply_rows.append([p("Brak takich wątków", small), "-", "-", "-"])
    story.append(table(reply_rows, [42 * mm, 32 * mm, 54 * mm, 48 * mm], font))
    story.append(PageBreak())

    story.append(p("7. System poprawy jakości obsługi - 30 dni", h2))
    plan_rows = [
        [p("Obszar", small), p("Co wdrożyć", small), p("Efekt", small)],
        [p("Poranny triage", small), p("Codziennie 15 minut: nowe maile, zaległe 24h/48h/72h, przypisanie właściciela.", small), p("Mniej tematów bez odpowiedzi.", small)],
        [p("Status ofert", small), p("Każda oferta ma status: wysłana, follow-up, wygrana, przegrana, czekamy na klienta.", small), p("Widać, gdzie jest sprzedaż.", small)],
        [p("SLA", small), p("Lead/wycena: 2-4h robocze. Reklamacja: pierwszy kontakt tego samego dnia.", small), p("Stały standard obsługi.", small)],
        [p("Follow-up", small), p("Automatyczna lista ofert bez odpowiedzi po 2-3 dniach.", small), p("Więcej domknięć sprzedaży.", small)],
        [p("Filtrowanie systemów", small), p("Marketplace, Shoper, Allegro, Empik i automaty do oddzielnego raportu.", small), p("Czysty obraz pracy handlowej.", small)],
        [p("CRM/arkusz", small), p("Minimum: klient, temat, handlowiec, status, wartość/potencjał, następny krok, data follow-upu.", small), p("Zarządzanie, nie tylko skrzynka.", small)],
    ]
    story.append(table(plan_rows, [38 * mm, 92 * mm, 46 * mm], font, "#e7f4ec"))

    story.append(p("8. Sygnały z automatyki i systemów", h2))
    system_domains = analysis["system_domains"].most_common(12)
    system_rows = [[p("Domena/system", small), p("Liczba", small), p("Wniosek", small)]]
    for domain, count in system_domains:
        system_rows.append([p(domain or "brak domeny", small), str(count), p("odseparować od leadów i obsługi klienta, zostawić w raporcie systemowym", small)])
    if len(system_rows) == 1:
        system_rows.append([p("Brak systemów", small), "-", "-"])
    story.append(table(system_rows, [60 * mm, 22 * mm, 94 * mm], font))

    doc.build(story)

    if output_html:
        output_html.write_text(
            f"""<!doctype html>
<html lang="pl"><meta charset="utf-8"><title>Raport jakości obsługi klienta</title>
<body>
<h1>Raport jakości obsługi klienta</h1>
<p>Skrzynka: {html.escape(config.base.mailbox_label)}. Zakres: {start.isoformat()} - {(end_exclusive - dt.timedelta(days=1)).isoformat()}.</p>
<h2>Ocena: {score}/100 - {html.escape(score_text)}</h2>
<p>Maile biznesowe: {len(analysis["business"])}. Maile systemowe: {len(analysis["service"])}. Bez odpowiedzi: {len(analysis["unanswered"])}. Zaległe 72h+: {len(analysis["stale"])}. Oferty: {len(analysis["offers"])}.</p>
</body></html>""",
            encoding="utf-8",
        )
    return len(items), {"score": score, "label": score_text, "analysis": analysis}


def main() -> None:
    parser = argparse.ArgumentParser(description="Profesjonalny raport jakosci obslugi klienta ze skrzynki IMAP.")
    parser.add_argument("--env-file", default=".env.info")
    parser.add_argument("--output-pdf", default="")
    parser.add_argument("--output-html", default="")
    args = parser.parse_args()

    socket.setdefaulttimeout(40)
    env_file = Path(args.env_file)
    if not env_file.is_absolute():
        env_file = ROOT / env_file
    start, _ = previous_month_range()
    stamp = dt.datetime.now().strftime("%Y-%m-%d_%H-%M")
    output_pdf = Path(args.output_pdf) if args.output_pdf else ROOT / "reports" / f"quality_customer_service_{start:%Y-%m}_{stamp}.pdf"
    output_html = Path(args.output_html) if args.output_html else ROOT / "reports" / f"quality_customer_service_{start:%Y-%m}_{stamp}.html"
    output_pdf.parent.mkdir(parents=True, exist_ok=True)
    output_html.parent.mkdir(parents=True, exist_ok=True)
    total, result = generate_report(env_file, output_pdf, output_html)
    print(f"Wiadomosci: {total}")
    print(f"Ocena: {result['score']}/100 - {result['label']}")
    print(f"PDF: {output_pdf}")
    print(f"HTML: {output_html}")


if __name__ == "__main__":
    main()
