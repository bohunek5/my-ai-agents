import os
import fitz

html_template = """<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<style>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap');
@page {{
  size: 595.276pt 807.874pt;
  margin: 0;
}}
body {{
  margin: 0;
  padding: 0;
  width: 595.276px;
  height: 807.874px;
  font-family: 'Inter', sans-serif;
  color: #231f20;
  position: relative;
}}
.page-bg {{
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
}}
.text-element {{
  position: absolute;
  line-height: 1;
  white-space: nowrap;
}}
.title {{
  color: #208dcd;
  font-weight: 700;
  font-size: 23.7px;
  left: 45.4px;
  top: 42px; /* 65 - 23.7 */
}}
</style>
</head>
<body>
<img src="{bg_path}" class="page-bg" />
{content}
</body>
</html>
"""

def make_el(text, x, y, size, weight="400", color="#231f20", align="left", width=None):
    # PyMuPDF y is baseline. For CSS top, we subtract size
    # Let's subtract a bit less than size since size includes ascenders/descenders. Size * 0.8 is usually baseline offset.
    top = y - (size * 0.75) 
    style = f"left: {x}px; top: {top}px; font-size: {size}px; font-weight: {weight}; color: {color};"
    if align == "right" and width:
        # if right aligned, we use width and text-align
        style = f"left: {x}px; top: {top}px; font-size: {size}px; font-weight: {weight}; color: {color}; width: {width}px; text-align: right;"
    
    return f'<div class="text-element" style="{style}">{text}</div>'

pages_content = []

# Page 1
c1 = []
c1.append('<div class="text-element title">CECHY</div>')
c1.append(make_el("Obudowa trudnopalna", 385.7, 300.0, 18.0, "700"))
c1.append(make_el("Obudowa wykonana z materiału trudnopalnego", 319.1, 323.4, 10.5))
c1.append(make_el("o klasie palności UL94V-1", 420.0, 338.0, 10.5))

c1.append(make_el("Drut (Solid Wire)", 72.0, 843.0, 8.5)) # This is off-page? 843 > 807. Wait, was the original PDF bigger? No, 807 is height. Let's fix this later.
c1.append(make_el("Linka (Strand Wire)", 180.0, 843.0, 8.5))

c1.append(make_el("Bez lutowania", 180.0, 695.0, 10.9))
c1.append(make_el("Łatwe podłączenie", 45.4, 715.0, 18.2, "700"))
c1.append(make_el("otwórz - włóż - zamknij, szybki montaż ręczny bez narzędzi", 45.4, 738.0, 10.5))

c1.append(make_el("112", 549.9, 778.0, 14.0))
pages_content.append(c1)


# Page 2
c2 = []
c2.append(make_el("Wysoka moc", 440.0, 52.0, 19.0, "700"))
c2.append(make_el("Zaprojektowany do dystrybucji", 405.0, 74.0, 10.5))
c2.append(make_el("wysokiej mocy", 480.0, 88.0, 10.5))

c2.append(make_el("Możliwość personalizacji", 45.3, 400.0, 20.0, "700"))
c2.append(make_el("Stwórz produkty pod własną marką. Dostępne opcje personalizacji:", 45.3, 424.0, 10.5))

c2.append(make_el("Kształt obudowy", 435.0, 510.0, 9.1))
c2.append(make_el("Nadruk logo / wzoru", 425.0, 590.0, 9.1))
c2.append(make_el("Kolorystyka", 455.0, 705.0, 9.1))
c2.append(make_el("113", 34.7, 778.0, 14.0))
pages_content.append(c2)

# Page 3
c3 = []
c3.append('<div class="text-element title">PARAMETRY WSPÓLNE</div>')
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
    c3.append(make_el(label, 45.4, y, 15.0, "700"))
    c3.append(make_el(val, 280, y, 10.9, "400", "#231f20", "right", 270))
c3.append(make_el("114", 549.9, 778.0, 14.0))
pages_content.append(c3)

# Page 4
c4 = []
c4.append('<div class="text-element title">TABELA DOBORU</div>')
c4.append(make_el("Nr kat.", 65.0, 102.0, 10.9, "700", "#ffffff"))
c4.append(make_el("Rodzaj taśmy", 150.0, 102.0, 10.9, "700", "#ffffff"))
c4.append(make_el("Specyfikacja techniczna", 270.0, 102.0, 10.9, "700", "#ffffff"))
c4.append(make_el("Zdjęcie", 463.6, 102.0, 10.9, "700", "#ffffff"))

rows = [
    {
        "cat_no": "HPD-MONO-19",
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
        "cat_no": "HPD-CCT-16",
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
        "cat_no": "HPD-RGB-14",
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
        "cat_no": "HPD-RGBW-13",
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
        "cat_no": "HPD-RGBCW-13",
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
    c4.append(make_el(row["cat_no"], 65.0, row["light_y"], 9.1, "700"))
    c4.append(make_el(row["light_color"], 150.0, row["light_y"], 9.1, "400", "#010101"))
    line_y = row["y_start"]
    for idx, line in enumerate(row["desc_lines"]):
        is_bold_header = "Wejście główne" in line or "Wyjścia gałęziowe" in line
        weight = "700" if is_bold_header else "400"
        c4.append(make_el(line, 240.6, line_y, 9.1, weight))
        line_y += 12.5

c4.append(make_el("115", 34.7, 778.0, 14.0))
pages_content.append(c4)

os.makedirs('scratch/pdf_builder', exist_ok=True)
bg_dir = '/Users/karolbohdanowicz/my-ai-agents/scratch/clean_canvas_preview'

for i, content in enumerate(pages_content):
    bg_path = f"file://{bg_dir}/page_{i+1}.png"
    html = html_template.format(bg_path=bg_path, content="\n".join(content))
    with open(f'scratch/pdf_builder/page_{i+1}.html', 'w') as f:
        f.write(html)

print("HTML files generated.")
