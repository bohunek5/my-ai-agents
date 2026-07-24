from pathlib import Path

from reportlab.lib import colors
from reportlab.lib.pagesizes import landscape
from reportlab.lib.units import mm
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.pdfgen import canvas


OUT = Path("output/pdf/patryk-luka-wizytowki")
OUT.mkdir(parents=True, exist_ok=True)

W, H = 90 * mm, 50 * mm
NAVY = colors.HexColor("#101923")
GOLD = colors.HexColor("#C8922D")
WHITE = colors.HexColor("#FFFFFF")
SOFT = colors.HexColor("#F7F8FA")
LINE = colors.HexColor("#DDE2E7")
TEXT = colors.HexColor("#17212D")
MUTED = colors.HexColor("#6A7480")

FONT_GEORGIA = "/System/Library/Fonts/Supplemental/Georgia.ttf"
FONT_GEORGIA_BOLD = "/System/Library/Fonts/Supplemental/Georgia Bold.ttf"
FONT_ARIAL = "/System/Library/Fonts/Supplemental/Arial.ttf"
FONT_ARIAL_BOLD = "/System/Library/Fonts/Supplemental/Arial Bold.ttf"

pdfmetrics.registerFont(TTFont("GeorgiaCustom", FONT_GEORGIA))
pdfmetrics.registerFont(TTFont("GeorgiaCustom-Bold", FONT_GEORGIA_BOLD))
pdfmetrics.registerFont(TTFont("ArialCustom", FONT_ARIAL))
pdfmetrics.registerFont(TTFont("ArialCustom-Bold", FONT_ARIAL_BOLD))


def text_center(c, text, x, y, font, size, color, tracking=0):
    c.setFont(font, size)
    c.setFillColor(color)
    if tracking <= 0:
        c.drawCentredString(x, y, text)
        return
    widths = [pdfmetrics.stringWidth(ch, font, size) for ch in text]
    total = sum(widths) + tracking * (len(text) - 1)
    cursor = x - total / 2
    for ch, w in zip(text, widths):
        c.drawString(cursor, y, ch)
        cursor += w + tracking


def text_left(c, text, x, y, font="ArialCustom", size=8, color=TEXT):
    c.setFont(font, size)
    c.setFillColor(color)
    c.drawString(x, y, text)


def front(c):
    c.setFillColor(NAVY)
    c.rect(0, 0, W, H, fill=1, stroke=0)
    c.setStrokeColor(GOLD)
    c.setLineWidth(0.7)
    c.line(22 * mm, 22.5 * mm, 68 * mm, 22.5 * mm)
    text_center(c, "PATRYK ŁUKA", W / 2, 29.5 * mm, "GeorgiaCustom", 22, GOLD, tracking=1.7)
    text_center(c, "UBEZPIECZENIA", W / 2, 17.4 * mm, "ArialCustom-Bold", 9, WHITE, tracking=4.2)
    text_center(c, "Spokój ma swoją polisę.", W / 2, 8.8 * mm, "GeorgiaCustom", 7.4, colors.HexColor("#E7EAF0"))


def stamp_box(c, x, y, w, h, label, small="data / przebieg / pieczątka"):
    c.setStrokeColor(LINE)
    c.setLineWidth(0.65)
    c.setFillColor(WHITE)
    c.roundRect(x, y, w, h, 3, fill=1, stroke=1)
    text_left(c, label, x + 3 * mm, y + h - 5.2 * mm, "ArialCustom-Bold", 6.6, TEXT)
    text_left(c, small, x + 3 * mm, y + 3.4 * mm, "ArialCustom", 5.1, MUTED)


def back_a(c):
    c.setFillColor(WHITE)
    c.rect(0, 0, W, H, fill=1, stroke=0)
    text_left(c, "KARTA PRZEGLĄDÓW", 7 * mm, 42 * mm, "ArialCustom-Bold", 10, NAVY)
    text_left(c, "miejsce na pieczątki serwisowe / diagnostyczne", 7 * mm, 37.8 * mm, "ArialCustom", 6.2, MUTED)
    c.setStrokeColor(GOLD)
    c.setLineWidth(1.1)
    c.line(7 * mm, 35.5 * mm, 83 * mm, 35.5 * mm)
    x0, y0 = 7 * mm, 20.2 * mm
    bw, bh = 24 * mm, 12 * mm
    for row in range(2):
        for col in range(3):
            n = row * 3 + col + 1
            stamp_box(c, x0 + col * 26.5 * mm, y0 - row * 14.2 * mm, bw, bh, f"Przegląd {n}")


def back_b(c):
    c.setFillColor(WHITE)
    c.rect(0, 0, W, H, fill=1, stroke=0)
    c.setFillColor(NAVY)
    c.rect(0, 0, 28 * mm, H, fill=1, stroke=0)
    text_center(c, "PŁ", 14 * mm, 28 * mm, "GeorgiaCustom-Bold", 18, GOLD)
    text_center(c, "PRZEGLĄDY", 14 * mm, 20 * mm, "ArialCustom-Bold", 5.2, WHITE, tracking=1.1)
    text_left(c, "Następny przegląd", 34 * mm, 41.8 * mm, "ArialCustom-Bold", 10, NAVY)
    c.setStrokeColor(LINE)
    c.setLineWidth(0.7)
    c.roundRect(34 * mm, 29.5 * mm, 48 * mm, 9.5 * mm, 3, fill=0, stroke=1)
    c.roundRect(34 * mm, 17.5 * mm, 48 * mm, 9.5 * mm, 3, fill=0, stroke=1)
    c.roundRect(34 * mm, 5.5 * mm, 48 * mm, 9.5 * mm, 3, fill=0, stroke=1)
    text_left(c, "Data", 36 * mm, 33.1 * mm, "ArialCustom-Bold", 6.6, MUTED)
    text_left(c, "Przebieg", 36 * mm, 21.1 * mm, "ArialCustom-Bold", 6.6, MUTED)
    text_left(c, "Pieczątka / podpis", 36 * mm, 9.1 * mm, "ArialCustom-Bold", 6.6, MUTED)


def back_c(c):
    c.setFillColor(WHITE)
    c.rect(0, 0, W, H, fill=1, stroke=0)
    c.setFillColor(SOFT)
    c.roundRect(5 * mm, 5 * mm, 80 * mm, 40 * mm, 5, fill=1, stroke=0)
    text_left(c, "PASZPORT POJAZDU", 9 * mm, 39 * mm, "ArialCustom-Bold", 9.4, NAVY)
    text_left(c, "serwis / przegląd / kontrola", 9 * mm, 34.5 * mm, "ArialCustom", 5.4, MUTED)
    x0, y0 = 9 * mm, 22.5 * mm
    for i in range(8):
        x = x0 + (i % 4) * 19 * mm
        y = y0 - (i // 4) * 13 * mm
        stamp_box(c, x, y, 16.5 * mm, 10.5 * mm, f"{i+1}", "pieczątka")


def back_d(c):
    c.setFillColor(WHITE)
    c.rect(0, 0, W, H, fill=1, stroke=0)
    text_left(c, "KONTROLA PRZED TRASĄ", 7 * mm, 42 * mm, "ArialCustom-Bold", 9.6, NAVY)
    text_left(c, "dla klientów stacji diagnostycznej", 7 * mm, 37.9 * mm, "ArialCustom", 6, MUTED)
    items = ["OC / AC", "Badanie techniczne", "Opony", "Hamulce", "Światła", "Płyny"]
    for i, item in enumerate(items):
        x = 7 * mm + (i % 2) * 38 * mm
        y = 30.5 * mm - (i // 2) * 6.5 * mm
        c.setStrokeColor(GOLD if i == 0 else LINE)
        c.setLineWidth(0.7)
        c.roundRect(x, y, 4.3 * mm, 4.3 * mm, 1, fill=0, stroke=1)
        text_left(c, item, x + 6.4 * mm, y + 1.1 * mm, "ArialCustom-Bold", 6.6, TEXT)
    c.setStrokeColor(LINE)
    c.setLineWidth(0.7)
    c.setFillColor(WHITE)
    c.roundRect(7 * mm, 3.2 * mm, 76 * mm, 10.2 * mm, 3, fill=1, stroke=1)
    text_left(c, "Miejsce na pieczątkę serwisową", 10 * mm, 8.6 * mm, "ArialCustom-Bold", 6.2, TEXT)
    text_left(c, "data / przebieg / uwagi", 10 * mm, 5.5 * mm, "ArialCustom", 4.9, MUTED)


BACKS = [
    ("wariant-a-karta-przegladow", back_a),
    ("wariant-b-nastepny-przeglad", back_b),
    ("wariant-c-paszport-pojazdu", back_c),
    ("wariant-d-kontrola-przed-trasa", back_d),
]


def make_pdf(path, draw_back):
    c = canvas.Canvas(str(path), pagesize=(W, H))
    front(c)
    c.showPage()
    draw_back(c)
    c.save()


def make_sheet(path):
    c = canvas.Canvas(str(path), pagesize=(W, H))
    front(c)
    c.showPage()
    for _, draw in BACKS:
        draw(c)
        c.showPage()
    c.save()


def make_single(path, draw):
    c = canvas.Canvas(str(path), pagesize=(W, H))
    draw(c)
    c.save()


make_single(OUT / "patryk-luka-front-slogan.pdf", front)

for slug, draw in BACKS:
    make_pdf(OUT / f"patryk-luka-wizytowka-{slug}.pdf", draw)
    make_single(OUT / f"patryk-luka-tyl-{slug}.pdf", draw)

make_sheet(OUT / "patryk-luka-wizytowki-zestaw-4-warianty.pdf")

print(OUT.resolve())
