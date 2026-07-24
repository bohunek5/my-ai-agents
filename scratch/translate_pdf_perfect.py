import fitz
import os

pdf_in = '/Users/karolbohdanowicz/Downloads/1,Rozdzielacze PRESCOT.pdf'
pdf_out_pl = '/Users/karolbohdanowicz/Downloads/1,Rozdzielacze PRESCOT PL.pdf'
pdf_out_orig_name = '/Users/karolbohdanowicz/Downloads/1,Rozdzielacze PRESCOT.pdf' # We can overwrite or update after saving backup

doc = fitz.open(pdf_in)

font_reg = '/System/Library/Fonts/Supplemental/Arial.ttf'
font_bold = '/System/Library/Fonts/Supplemental/Arial Bold.ttf'

for page in doc:
    page.insert_font(fontname='Arial-Reg', fontfile=font_reg, set_simple=False)
    page.insert_font(fontname='Arial-Bold', fontfile=font_bold, set_simple=False)

# ==================== PAGE 1 ====================
p1 = doc[0]

p1_redacts = [
    # FEATURES
    (fitz.Rect(40, 20, 200, 80), (1, 1, 1)),
    # Easy to Connect & subtext
    (fitz.Rect(40, 688, 360, 765), (1, 1, 1)),
    # No Tin Needed
    (fitz.Rect(175, 670, 280, 715), (1, 1, 1)),
    # Flame Retardant & subtext
    (fitz.Rect(310, 270, 560, 360), (1, 1, 1)),
]
for rect, color in p1_redacts:
    p1.add_redact_annot(rect, fill=color)
p1.apply_redactions()

p1.insert_text((45.4, 65.0), "CECHY", fontname="Arial-Bold", fontsize=23.7, color=(0.125, 0.553, 0.804))

p1.insert_text((385.7, 300.0), "Obudowa trudnopalna", fontname="Arial-Bold", fontsize=18.0, color=(0.137, 0.122, 0.125))
p1.insert_text((319.1, 323.4), "Obudowa wykonana z materiału trudnopalnego", fontname="Arial-Reg", fontsize=10.5, color=(0.137, 0.122, 0.125))
p1.insert_text((420.0, 338.0), "o klasie palności UL94V-1", fontname="Arial-Reg", fontsize=10.5, color=(0.137, 0.122, 0.125))

p1.insert_text((180.0, 695.0), "Bez lutowania", fontname="Arial-Reg", fontsize=10.9, color=(0.004, 0.004, 0.004))

p1.insert_text((45.4, 715.0), "Łatwe podłączenie", fontname="Arial-Bold", fontsize=18.2, color=(0.004, 0.004, 0.004))
p1.insert_text((45.4, 738.0), "otwórz - włóż - zamknij, montaż ręczny bez narzędzi", fontname="Arial-Reg", fontsize=10.5, color=(0.004, 0.004, 0.004))


# ==================== PAGE 2 ====================
p2 = doc[1]

p2_redacts = [
    # High Power & text
    (fitz.Rect(400, 20, 560, 110), (1, 1, 1)),
    # Customization Available & text
    (fitz.Rect(40, 370, 500, 450), (1, 1, 1)),
    # Housing Shape
    (fitz.Rect(430, 490, 520, 525), (1, 1, 1)),
    # Pattern Printing
    (fitz.Rect(420, 570, 525, 605), (1, 1, 1)),
    # Color
    (fitz.Rect(450, 685, 500, 720), (1, 1, 1)),
]
for rect, color in p2_redacts:
    p2.add_redact_annot(rect, fill=color)
p2.apply_redactions()

p2.insert_text((440.0, 52.0), "Wysoka moc", fontname="Arial-Bold", fontsize=19.0, color=(0.137, 0.122, 0.125))
p2.insert_text((405.0, 74.0), "Zaprojektowany do dystrybucji", fontname="Arial-Reg", fontsize=10.5, color=(0.137, 0.122, 0.125))
p2.insert_text((480.0, 88.0), "wysokiej mocy", fontname="Arial-Reg", fontsize=10.5, color=(0.137, 0.122, 0.125))

p2.insert_text((45.3, 400.0), "Możliwość personalizacji", fontname="Arial-Bold", fontsize=20.0, color=(0.137, 0.122, 0.125))
p2.insert_text((45.3, 424.0), "Stwórz produkty pod własną marką. Dostępne opcje personalizacji:", fontname="Arial-Reg", fontsize=10.5, color=(0.137, 0.122, 0.125))

p2.insert_text((435.0, 510.0), "Kształt obudowy", fontname="Arial-Reg", fontsize=9.1, color=(0.137, 0.122, 0.125))
p2.insert_text((425.0, 590.0), "Nadruk logo / wzoru", fontname="Arial-Reg", fontsize=9.1, color=(0.137, 0.122, 0.125))
p2.insert_text((455.0, 705.0), "Kolorystyka", fontname="Arial-Reg", fontsize=9.1, color=(0.137, 0.122, 0.125))


# ==================== PAGE 3 ====================
p3 = doc[2]

p3_redacts = [
    # COMMON PARAMETER
    (fitz.Rect(40, 20, 350, 80), (1, 1, 1)),
    # Table labels and values
    (fitz.Rect(40, 375, 560, 770), (1, 1, 1)),
]
for rect, color in p3_redacts:
    p3.add_redact_annot(rect, fill=color)
p3.apply_redactions()

p3.insert_text((45.4, 65.0), "PARAMETRY WSPÓLNE", fontname="Arial-Bold", fontsize=23.7, color=(0.125, 0.553, 0.804))

params = [
    ("Napięcie robocze:", "5~48 V DC", 412.0),
    ("Liczba pinów wejściowych:", "2 Piny / 3 Piny / 4 Piny / 5 Pinów / 6 Pinów", 454.0),
    ("Liczba pinów wyjściowych:", "18 Pinów", 496.0),
    ("Materiał:", "Miedź oraz PC", 538.0),
    ("Maks. prąd wyjścia (gałęzi):", "10 A", 580.0),
    ("Maks. prąd całkowity:", "25 A", 622.0),
    ("Kolor obudowy:", "Biały", 664.0),
    ("Przekrój przewodu wejściowego:", "22~12 AWG / 0,32~4,0 mm²", 706.0),
    ("Przekrój przewodu wyjściowego:", "24~16 AWG / 0,2~1,5 mm²", 748.0),
]

for label, val, y in params:
    p3.insert_text((45.4, y), label, fontname="Arial-Bold", fontsize=15.0, color=(0.137, 0.122, 0.125))
    rect_val = fitz.Rect(280, y - 15, 550, y + 5)
    p3.insert_textbox(rect_val, val, fontname="Arial-Reg", fontsize=10.9, color=(0.137, 0.122, 0.125), align=fitz.TEXT_ALIGN_RIGHT)


# ==================== PAGE 4 ====================
p4 = doc[3]

p4_redacts = [
    # SELECTION title
    (fitz.Rect(40, 20, 250, 80), (1, 1, 1)),
    # Header row text (white on blue bar)
    (fitz.Rect(60, 82, 520, 118), (0.125, 0.553, 0.804)),
    # Data rows text
    (fitz.Rect(145, 120, 370, 755), (1, 1, 1)),
]
for rect, color in p4_redacts:
    p4.add_redact_annot(rect, fill=color)
p4.apply_redactions()

p4.insert_text((45.4, 65.0), "TABELA DOBORU", fontname="Arial-Bold", fontsize=23.7, color=(0.125, 0.553, 0.804))

# Table Headers (white text)
p4.insert_text((65.0, 102.0), "Nr kat.", fontname="Arial-Bold", fontsize=10.9, color=(1, 1, 1))
p4.insert_text((150.0, 102.0), "Rodzaj taśmy", fontname="Arial-Bold", fontsize=10.9, color=(1, 1, 1))
p4.insert_text((270.0, 102.0), "Specyfikacja techniczna", fontname="Arial-Bold", fontsize=10.9, color=(1, 1, 1))
p4.insert_text((463.6, 102.0), "Zdjęcie", fontname="Arial-Bold", fontsize=10.9, color=(1, 1, 1))

rows = [
    {
        "light_color": "MONO (2 Piny)",
        "desc_lines": [
            "1 wejście / 9 wyjść dla MONO",
            "DC 5~48V / 25A",
            "Wejście główne:",
            "22~12 AWG / 0,32~4,0 mm² (Maks. 25A)",
            "Wyjścia gałęziowe:",
            "24~16 AWG / 0,2~1,5 mm² (Maks. 10A)"
        ],
        "y_start": 133.0,
        "light_y": 178.0
    },
    {
        "light_color": "CCT (3 Piny)",
        "desc_lines": [
            "1 wejście / 6 wyjść dla CCT",
            "DC 5~48V / 25A",
            "Wejście główne:",
            "22~12 AWG / 0,32~4,0 mm² (Maks. 25A)",
            "Wyjścia gałęziowe:",
            "24~16 AWG / 0,2~1,5 mm² (Maks. 10A)"
        ],
        "y_start": 262.0,
        "light_y": 307.0
    },
    {
        "light_color": "RGB (4 Piny)",
        "desc_lines": [
            "1 wejście / 4 wyjścia dla RGB",
            "DC 5~48V / 25A",
            "Wejście główne:",
            "22~12 AWG / 0,32~4,0 mm² (Maks. 25A)",
            "Wyjścia gałęziowe:",
            "24~16 AWG / 0,2~1,5 mm² (Maks. 10A)"
        ],
        "y_start": 391.0,
        "light_y": 436.0
    },
    {
        "light_color": "RGBW (5 Pinów)",
        "desc_lines": [
            "1 wejście / 3 wyjścia dla RGBW",
            "DC 5~48V / 25A",
            "Wejście główne:",
            "22~12 AWG / 0,32~4,0 mm² (Maks. 25A)",
            "Wyjścia gałęziowe:",
            "24~16 AWG / 0,2~1,5 mm² (Maks. 10A)"
        ],
        "y_start": 520.0,
        "light_y": 565.0
    },
    {
        "light_color": "RGBCW (6 Pinów)",
        "desc_lines": [
            "1 wejście / 3 wyjścia dla RGBCW",
            "DC 5~48V / 25A",
            "Wejście główne:",
            "22~12 AWG / 0,32~4,0 mm² (Maks. 25A)",
            "Wyjścia gałęziowe:",
            "24~16 AWG / 0,2~1,5 mm² (Maks. 10A)"
        ],
        "y_start": 649.0,
        "light_y": 694.0
    }
]

for row in rows:
    p4.insert_text((150.0, row["light_y"]), row["light_color"], fontname="Arial-Reg", fontsize=9.1, color=(0.004, 0.004, 0.004))
    line_y = row["y_start"]
    for idx, line in enumerate(row["desc_lines"]):
        is_bold_header = "Wejście główne" in line or "Wyjścia gałęziowe" in line
        font = "Arial-Bold" if is_bold_header else "Arial-Reg"
        p4.insert_text((240.6, line_y), line, fontname=font, fontsize=9.1, color=(0.137, 0.122, 0.125))
        line_y += 12.5

doc.save(pdf_out_pl)

# Render previews for visual verification
out_dir = '/Users/karolbohdanowicz/.gemini/antigravity-ide/brain/c845d1d1-33ac-44db-b334-e418870bc328/pdf_perfect_preview'
os.makedirs(out_dir, exist_ok=True)

for i, page in enumerate(doc):
    pix = page.get_pixmap(dpi=200)
    pix.save(f'{out_dir}/page_{i+1}.png')

print("Perfect PDF translation generated!")
