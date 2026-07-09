import os
import shutil
import re
import glob

TEMPLATE_PATH = "/Users/karolbohdanowicz/Downloads/Katalog_Akcesoriow_PRESCOT_2026.html"
OUTPUT_DIR = "/Users/karolbohdanowicz/Downloads/Katalog_2026_Gotowy"
ASSETS_DIR = os.path.join(OUTPUT_DIR, "assets")
EXTRACTED_IMG_DIR = "/Users/karolbohdanowicz/my-ai-agents/CONTENT-BOSS/pliki-i-dane/prescot_extracted"
DOWNLOADS_ASSETS_DIR = "/Users/karolbohdanowicz/Downloads/assets"

os.makedirs(ASSETS_DIR, exist_ok=True)
os.makedirs(DOWNLOADS_ASSETS_DIR, exist_ok=True)

def copy_image(filename, dest_name):
    src = os.path.join(EXTRACTED_IMG_DIR, filename)
    if os.path.exists(src):
        shutil.copy(src, os.path.join(ASSETS_DIR, dest_name))
        shutil.copy(src, os.path.join(DOWNLOADS_ASSETS_DIR, dest_name))
        return f"assets/{dest_name}"
    return ""

def get_gallery_html(page_num):
    # Find all images for this page
    pattern = os.path.join(EXTRACTED_IMG_DIR, f"img_page{page_num}_*.png")
    images = glob.glob(pattern)
    # Sort by xref number to keep some order
    images.sort(key=lambda x: int(re.search(r'xref(\d+)', x).group(1)) if re.search(r'xref(\d+)', x) else 0)
    
    if not images:
        return ""
    
    html = '<div class="flex flex-wrap gap-4 mb-6 justify-center">\\n'
    for idx, img_path in enumerate(images):
        basename = os.path.basename(img_path)
        dest_name = f"p{page_num}_{idx+1}.png"
        src = copy_image(basename, dest_name)
        
        # Display index + 1 as the visual number for the user to map to "Typ"
        num = f"{idx+1:02d}"
        
        html += f"""
        <div class="bg-white border border-gray-200 p-2 rounded-lg shadow-sm flex flex-col items-center justify-center w-32 h-32 relative group overflow-hidden hover:border-prescot-orange transition-colors">
            <div class="absolute top-1 left-2 text-xs font-bold text-gray-400 z-10">{num}</div>
            <img src="{src}" class="w-full h-full object-contain mix-blend-multiply">
        </div>
        """
    html += '</div>\\n'
    return html

logo_src = "/Users/karolbohdanowicz/my-ai-agents/CONTENT-BOSS/pliki-i-dane/brandbook_prescot_01_2025/PRESCOT_logo_biale+kolor-01.svg"
if os.path.exists(logo_src):
    shutil.copy(logo_src, os.path.join(DOWNLOADS_ASSETS_DIR, "logo.svg"))

pages_html = ""

def make_page(page_num, title, subtitle, tables_html):
    return f"""
    <div class="page flex flex-col">
        <header class="flex justify-between items-center mb-6 border-b border-prescot-orange pb-4">
            <h2 class="text-2xl font-bold text-prescot-dark uppercase">{title}</h2>
            <div class="text-sm font-bold bg-prescot-dark text-white px-4 py-1 rounded">{subtitle}</div>
        </header>
        {get_gallery_html(page_num)}
        {tables_html}
        <div class="mt-auto pt-8 border-t border-gray-200 flex justify-between">
            <div class="text-xs text-gray-400">Najniższe ceny • Wysoka jakość • Bogaty asortyment</div><div class="text-sm font-bold text-prescot-orange">{page_num:02d}</div>
        </div>
    </div>
    """

# PAGE 1 - Złączki BASIC
p1_tables = """
<table class="prescot-table text-sm">
    <thead><tr><th>Nr katalogowy</th><th>Zakończenie</th><th>Połączenie</th><th>Zakończenie</th><th>Przewód</th><th>Typ</th></tr></thead>
    <tbody>
        <tr><td>ZL-MONO-8MM-TP</td><td>8mm</td><td>14cm</td><td>-</td><td>2x0.35</td><td>1</td></tr>
        <tr><td>ZL-MONO-8MM-TPT</td><td>8mm</td><td>14cm</td><td>8mm</td><td>2x0.35</td><td>2</td></tr>
        <tr><td>ZL-MONO-8MM-TT</td><td>8mm</td><td>-</td><td>8mm</td><td>-</td><td>3</td></tr>
        <tr><td>ZL-MONO-8MM-TZ-G2.1</td><td>8mm</td><td>15cm</td><td>Gniazdo 5.5/2.1</td><td>2x0.35</td><td>4</td></tr>
        <tr><td>ZL-MONO-10MM-TP</td><td>10mm</td><td>14cm</td><td>-</td><td>2x0.35</td><td>1</td></tr>
        <tr><td>ZL-MONO-10MM-TPT</td><td>10mm</td><td>14cm</td><td>10mm</td><td>2x0.35</td><td>2</td></tr>
        <tr><td>ZL-MONO-10MM-TT</td><td>10mm</td><td>-</td><td>10mm</td><td>-</td><td>3</td></tr>
        <tr><td>ZL-MONO-10MM-TZ-G2.1</td><td>10mm</td><td>15cm</td><td>Gniazdo 5.5/2.1</td><td>2x0.35</td><td>4</td></tr>
    </tbody>
</table>
<table class="prescot-table text-sm mt-4">
    <thead><tr><th>Nr katalogowy</th><th>Zakończenie</th><th>Połączenie</th><th>Zakończenie</th><th>Przewód</th><th>Typ</th></tr></thead>
    <tbody>
        <tr><td>ZL-RGB-10MM-TP</td><td>10mm</td><td>14cm</td><td>-</td><td>4x0.35</td><td>1</td></tr>
        <tr><td>ZL-RGB-10MM-TPT</td><td>10mm</td><td>14cm</td><td>10mm</td><td>4x0.35</td><td>2</td></tr>
        <tr><td>ZL-RGB-10MM-TT</td><td>10mm</td><td>-</td><td>10mm</td><td>-</td><td>3</td></tr>
        <tr><td>ZL-RGB-10MM-TZ-G2.1</td><td>10mm</td><td>15cm</td><td>Gniazdo 5.5/2.1</td><td>4x0.35</td><td>4</td></tr>
        <tr><td>ZL-RGBW-12MM-TP</td><td>12mm</td><td>14cm</td><td>-</td><td>5x0.35</td><td>1</td></tr>
        <tr><td>ZL-RGBW-12MM-TPT</td><td>12mm</td><td>14cm</td><td>12mm</td><td>5x0.35</td><td>2</td></tr>
        <tr><td>ZL-RGBW-12MM-TT</td><td>12mm</td><td>-</td><td>12mm</td><td>-</td><td>3</td></tr>
        <tr><td>ZL-RGBW-12MM-TZ-G2.1</td><td>12mm</td><td>15cm</td><td>Gniazdo 5.5/2.1</td><td>5x0.35</td><td>4</td></tr>
    </tbody>
</table>
"""
pages_html += make_page(1, "Złączki do taśm LED", "Seria BASIC", p1_tables)

# PAGE 2 - HIPP
p2_tables = """
<table class="prescot-table text-sm">
    <thead><tr><th>Nr katalogowy</th><th>Zakończenie</th><th>Zakończenie</th><th>Zastosowanie</th><th>Typ</th></tr></thead>
    <tbody>
        <tr><td>PR-ZLH8-MONO-TP</td><td>8mm</td><td>przewód</td><td>bez żelu</td><td>1</td></tr>
        <tr><td>PR-ZLH8-MONO-TT</td><td>8mm</td><td>8mm</td><td>bez żelu</td><td>2</td></tr>
        <tr><td>PR-ZLH10-MONO-TP</td><td>10mm</td><td>przewód</td><td>bez żelu</td><td>1</td></tr>
        <tr><td>PR-ZLH10-MONO-TT</td><td>10mm</td><td>10mm</td><td>bez żelu</td><td>2</td></tr>
        <tr><td>PR-ZLH10-RGB-TP</td><td>10mm</td><td>przewód</td><td>bez żelu</td><td>3</td></tr>
        <tr><td>PR-ZLH10-RGB-TT</td><td>10mm</td><td>10mm</td><td>bez żelu</td><td>4</td></tr>
        <tr><td>PR-ZLH12-RGBW-TP</td><td>12mm</td><td>przewód</td><td>bez żelu</td><td>3</td></tr>
        <tr><td>PR-ZLH12-RGBW-TT</td><td>12mm</td><td>12mm</td><td>bez żelu</td><td>4</td></tr>
        <tr><td>PR-ZLH8W-MONO-TP</td><td>8mm</td><td>przewód</td><td>w żelu</td><td>1</td></tr>
        <tr><td>PR-ZLH8W-MONO-TT</td><td>8mm</td><td>8mm</td><td>w żelu</td><td>2</td></tr>
        <tr><td>PR-ZLH10W-MONO-TP</td><td>10mm</td><td>przewód</td><td>w żelu</td><td>1</td></tr>
        <tr><td>PR-ZLH10W-MONO-TT</td><td>10mm</td><td>10mm</td><td>w żelu</td><td>2</td></tr>
        <tr><td>PR-ZLH10W-RGB-TP</td><td>10mm</td><td>przewód</td><td>w żelu</td><td>3</td></tr>
        <tr><td>PR-ZLH10W-RGB-TT</td><td>10mm</td><td>10mm</td><td>w żelu</td><td>4</td></tr>
        <tr><td>PR-ZLH12W-RGBW-TP</td><td>12mm</td><td>przewód</td><td>w żelu</td><td>3</td></tr>
        <tr><td>PR-ZLH12W-RGBW-TT</td><td>12mm</td><td>12mm</td><td>w żelu</td><td>4</td></tr>
    </tbody>
</table>
"""
pages_html += make_page(2, "Złączki do taśm LED", "Seria HIPP", p2_tables)

# PAGE 3 - PCB
p3_tables = """
<table class="prescot-table text-sm">
    <thead><tr><th>Nr katalogowy</th><th>Zakończenie</th><th>Model</th><th>Zastosowanie</th><th>Typ</th></tr></thead>
    <tbody>
        <tr><td>PR-ZL8L-PCB-MONO</td><td>8mm</td><td>L</td><td>Do połączenia taśm bez żelu</td><td>1</td></tr>
        <tr><td>PR-ZL8T-PCB-MONO</td><td>8mm</td><td>T</td><td>bez żelu</td><td>2</td></tr>
        <tr><td>PR-ZL8X-PCB-MONO</td><td>8mm</td><td>X</td><td>bez żelu</td><td>3</td></tr>
        <tr><td>PR-ZL10L-PCB-MONO</td><td>10mm</td><td>L</td><td>Do połączenia taśm bez żelu</td><td>1</td></tr>
        <tr><td>PR-ZL10T-PCB-MONO</td><td>10mm</td><td>T</td><td>bez żelu</td><td>2</td></tr>
        <tr><td>PR-ZL10X-PCB-MONO</td><td>10mm</td><td>X</td><td>bez żelu</td><td>3</td></tr>
        <tr><td>PR-ZL10L-PCB-RGB</td><td>10mm</td><td>L</td><td>Do połączenia taśm bez żelu</td><td>1</td></tr>
        <tr><td>PR-ZL10T-PCB-RGB</td><td>10mm</td><td>T</td><td>bez żelu</td><td>2</td></tr>
        <tr><td>PR-ZL10X-PCB-RGB</td><td>10mm</td><td>X</td><td>bez żelu</td><td>3</td></tr>
        <tr><td>PR-ZL10L-PCB-RGBW</td><td>10mm</td><td>L</td><td>Do połączenia taśm bez żelu</td><td>1</td></tr>
        <tr><td>PR-ZL10T-PCB-RGBW</td><td>10mm</td><td>T</td><td>bez żelu</td><td>2</td></tr>
        <tr><td>PR-ZL10X-PCB-RGBW</td><td>10mm</td><td>X</td><td>bez żelu</td><td>3</td></tr>
        <tr><td>PR-ZL12L-PCB-RGBW</td><td>12mm</td><td>L</td><td>Do połączenia taśm bez żelu</td><td>1</td></tr>
        <tr><td>PR-ZL12T-PCB-RGBW</td><td>12mm</td><td>T</td><td>bez żelu</td><td>2</td></tr>
        <tr><td>PR-ZL12X-PCB-RGBW</td><td>12mm</td><td>X</td><td>bez żelu</td><td>3</td></tr>
    </tbody>
</table>
"""
pages_html += make_page(3, "Złączki do taśm LED", "Seria PCB", p3_tables)

# PAGE 4 - DC
p4_tables = """
<h3 class="text-lg font-bold text-prescot-dark mt-2 border-l-4 border-prescot-orange pl-3">Wtyki DC z przewodem</h3>
<table class="prescot-table text-sm mt-2 mb-4">
    <thead><tr><th>Numer katalogowy</th><th>Zakończenie</th><th>Połączenie</th><th>Zakończenie</th><th>Przewód</th><th>Kolor</th></tr></thead>
    <tbody>
        <tr><td>WT-DC-5.5/2.1+15</td><td>5.5/2.1</td><td>15cm</td><td>-</td><td>2x0.35</td><td>biały</td></tr>
        <tr><td>WT-DC-5.5/2.1+15CZ</td><td>5.5/2.1</td><td>15cm</td><td>-</td><td>2x0.35</td><td>czarny</td></tr>
        <tr><td>WT-DC-5.5/2.5+15</td><td>5.5/2.5</td><td>15cm</td><td>-</td><td>2x0.35</td><td>biały</td></tr>
        <tr><td>WT-DC-5.5/2.5+15CZ</td><td>5.5/2.5</td><td>15cm</td><td>-</td><td>2x0.35</td><td>czarny</td></tr>
        <tr><td>WT-DC-5.5/2.1+150</td><td>5.5/2.1</td><td>150cm</td><td>-</td><td>2x0.35</td><td>biały</td></tr>
        <tr><td>WT-DC-5.5/2.1+150CZ</td><td>5.5/2.1</td><td>150cm</td><td>-</td><td>2x0.35</td><td>czarny</td></tr>
        <tr><td>WT-DC-5.5/2.5+150</td><td>5.5/2.5</td><td>150cm</td><td>-</td><td>2x0.35</td><td>biały</td></tr>
        <tr><td>WT-DC-5.5/2.5+150CZ</td><td>5.5/2.5</td><td>150cm</td><td>-</td><td>2x0.35</td><td>czarny</td></tr>
    </tbody>
</table>
<h3 class="text-lg font-bold text-prescot-dark mt-2 border-l-4 border-prescot-orange pl-3">Przewody DC</h3>
<table class="prescot-table text-sm mt-2">
    <thead><tr><th>Numer katalogowy</th><th>Zakończenie</th><th>Połączenie</th><th>Zakończenie</th><th>Przewód</th><th>Kolor</th></tr></thead>
    <tbody>
        <tr><td>ROZ-DC-5.5/2.1-2X1CZ</td><td>5.5/2.1 x2</td><td>24cm</td><td>5.5/2.1</td><td>2x0.35/2x0.50</td><td>czarny</td></tr>
        <tr><td>ROZ-DC-5.5/2.1-3X1CZ</td><td>5.5/2.1 x3</td><td>24cm</td><td>5.5/2.1</td><td>2x0.35/2x0.50</td><td>czarny</td></tr>
        <tr><td>ROZ-DC-5.5/2.1-4X1CZ</td><td>5.5/2.1 x4</td><td>24cm</td><td>5.5/2.1</td><td>2x0.35/2x0.50</td><td>czarny</td></tr>
        <tr><td>ROZ-DC-5.5/2.1-5XCZ</td><td>5.5/2.1 x5</td><td>24cm</td><td>5.5/2.1</td><td>2x0.35/2x0.50</td><td>czarny</td></tr>
        <tr><td>ROZ-DC-5.5/2.1-6XCZ</td><td>5.5/2.1 x6</td><td>24cm</td><td>5.5/2.1</td><td>2x0.35/2x0.50</td><td>czarny</td></tr>
        <tr><td>DC-DC-150_5.5/2.1</td><td>5.5/2.1</td><td>150cm</td><td>5.5/2.1</td><td>2x0.35</td><td>czarny</td></tr>
    </tbody>
</table>
"""
pages_html += make_page(4, "Wtyki i Przewody DC", "DC", p4_tables)

# PAGE 5 - Hermetyczne & RGB
p5_tables = """
<h3 class="text-lg font-bold text-prescot-dark mt-2 border-l-4 border-prescot-orange pl-3">Złącza DC Hermetyczne</h3>
<table class="prescot-table text-sm mt-2 mb-4">
    <thead><tr><th>Numer katalogowy</th><th>Zakończenie</th><th>Połączenie</th><th>Zakończenie</th><th>Przewód</th><th>Typ</th></tr></thead>
    <tbody>
        <tr><td>LED-ZIP-Ż</td><td>5.5/2.1</td><td>15cm</td><td>-</td><td>2x0.50</td><td>1</td></tr>
        <tr><td>LED-ZIP-M</td><td>5.5/2.1</td><td>15cm</td><td>-</td><td>2x0.50</td><td>1a</td></tr>
        <tr><td>LED-ZIP-Ż-RGB</td><td>4 pin</td><td>15cm</td><td>-</td><td>4x0.50</td><td>2</td></tr>
        <tr><td>LED-ZIP-M-RGB</td><td>4 pin</td><td>15cm</td><td>-</td><td>4x0.50</td><td>2a</td></tr>
        <tr><td>LED-ZIP-Ż-RGBW</td><td>5 pin</td><td>15cm</td><td>-</td><td>5x0.50</td><td>3</td></tr>
        <tr><td>LED-ZIP-M-RGBW</td><td>5 pin</td><td>15cm</td><td>-</td><td>5x0.50</td><td>3a</td></tr>
    </tbody>
</table>
<h3 class="text-lg font-bold text-prescot-dark mt-2 border-l-4 border-prescot-orange pl-3">Złącza RGB</h3>
<table class="prescot-table text-sm mt-2">
    <thead><tr><th>Numer katalogowy</th><th>Zakończenie</th><th>Połączenie</th><th>Zakończenie</th><th>Przewód</th><th>Typ</th></tr></thead>
    <tbody>
        <tr><td>GN-RGB-4PIN15</td><td>4 pin</td><td>15cm</td><td>-</td><td>4x0.35</td><td>1</td></tr>
        <tr><td>WTYK-RGB-4PIN15</td><td>4 pin</td><td>15cm</td><td>-</td><td>4x0.35</td><td>2</td></tr>
        <tr><td>WTYK-RGB-4PIN-B</td><td>4 pin</td><td>15cm</td><td>-</td><td>4x0.35</td><td>3</td></tr>
        <tr><td>WTYK-RGB-4PIN-CZ</td><td>4 pin</td><td>15cm</td><td>-</td><td>4x0.35</td><td>4</td></tr>
    </tbody>
</table>
"""
pages_html += make_page(5, "Złącza Hermetyczne i RGB", "Złącza", p5_tables)

# PAGE 6 - Wtyki DC / Gniazda DC do obudowy
p6_tables = """
<h3 class="text-lg font-bold text-prescot-dark mt-2 border-l-4 border-prescot-orange pl-3">Wtyki DC</h3>
<table class="prescot-table text-sm mt-2 mb-4">
    <thead><tr><th>Numer katalogowy</th><th>Zakończenie</th><th>Montaż</th><th>Typ</th></tr></thead>
    <tbody>
        <tr><td>WT-DC-5.5/2.1-PP</td><td>5.5/2.1</td><td>na przewód</td><td>1</td></tr>
        <tr><td>WT-DC-5.5/2.5-PP</td><td>5.5/2.5</td><td>na przewód</td><td>1</td></tr>
        <tr><td>WT-DC-5.5/2.1ZS</td><td>5.5/2.1</td><td>zacisk śrubowy</td><td>2</td></tr>
        <tr><td>WT-DC-5.5/2.5ZS</td><td>5.5/2.5</td><td>zacisk śrubowy</td><td>2</td></tr>
    </tbody>
</table>
<h3 class="text-lg font-bold text-prescot-dark mt-2 border-l-4 border-prescot-orange pl-3">Gniazda DC</h3>
<table class="prescot-table text-sm mt-2">
    <thead><tr><th>Numer katalogowy</th><th>Zakończenie</th><th>Montaż</th><th>Typ</th></tr></thead>
    <tbody>
        <tr><td>GN-DC-5.5/2.1-OB1</td><td>5.5/2.1</td><td>do obudowy</td><td>1</td></tr>
        <tr><td>GN-DC-5.5/2.5-OB1</td><td>5.5/2.5</td><td>od wewnątrz</td><td>1</td></tr>
        <tr><td>GN-DC-5.5/2.1-OBP</td><td>5.5/2.1</td><td>do obudowy</td><td>2</td></tr>
        <tr><td>GN-DC-5.5/2.5-OBP</td><td>5.5/2.5</td><td>od wewnątrz</td><td>2</td></tr>
        <tr><td>GN-DC-5.5/2.1-OBP2</td><td>5.5/2.1</td><td>do obudowy</td><td>3</td></tr>
        <tr><td>GN-DC-5.5/2.5-OBP2</td><td>5.5/2.5</td><td>z zewnątrz</td><td>3</td></tr>
        <tr><td>GN-DC-5.5/2.1-P</td><td>5.5/2.1</td><td>na przewód</td><td>4</td></tr>
        <tr><td>GN-DC-5.5/2.5-P</td><td>5.5/2.5</td><td>na przewód</td><td>4</td></tr>
        <tr><td>GN-DC-5.5/2.1ZS</td><td>5.5/2.1</td><td>zacisk śrubowy</td><td>5</td></tr>
        <tr><td>GN-DC-5.5/2.5ZS</td><td>5.5/2.5</td><td>zacisk śrubowy</td><td>5</td></tr>
    </tbody>
</table>
"""
pages_html += make_page(6, "Wtyki i Gniazda DC", "Osprzęt", p6_tables)

# PAGE 7 - Złącza LED-Z2P, KLIK
p7_tables = """
<h3 class="text-lg font-bold text-prescot-dark mt-2 border-l-4 border-prescot-orange pl-3">Złącza</h3>
<table class="prescot-table text-sm mt-2 mb-4">
    <thead><tr><th>Numer katalogowy</th><th>Zakończenie</th><th>Połączenie</th><th>Zakończenie</th><th>Przewód</th><th>Typ</th></tr></thead>
    <tbody>
        <tr><td>LED-Z2P-Ż</td><td>2 pin</td><td>14cm</td><td>-</td><td>2x0.35</td><td>1</td></tr>
        <tr><td>LED-Z2P-M</td><td>2 pin</td><td>14cm</td><td>-</td><td>2x0.35</td><td>1</td></tr>
        <tr><td>TAM-GM-14</td><td>2 pin</td><td>14cm</td><td>-</td><td>2x0.50</td><td>2</td></tr>
        <tr><td>TAM-WZ-14</td><td>2 pin</td><td>14cm</td><td>-</td><td>2x0.50</td><td>2</td></tr>
        <tr><td>ZL-2PIN-WS</td><td>konektor żeński 6.3/2.5</td><td>-</td><td>konektor męski 6.3/2.5</td><td>-</td><td>3</td></tr>
    </tbody>
</table>
<h3 class="text-lg font-bold text-prescot-dark mt-2 border-l-4 border-prescot-orange pl-3">Złączki Seria KLIK</h3>
<table class="prescot-table text-sm mt-2">
    <thead><tr><th>Numer katalogowy</th><th>Zakończenie</th><th>Połączenie</th><th>Zakończenie</th><th>Przewód</th><th>Typ</th></tr></thead>
    <tbody>
        <tr><td>ZL-2PIN-KLIK-W</td><td>2 pin</td><td>15cm</td><td>-</td><td>2x0.50</td><td>1</td></tr>
        <tr><td>ZL-2PIN-KLIK-G</td><td>2 pin</td><td>15cm</td><td>-</td><td>2x0.50</td><td>1a</td></tr>
        <tr><td>ZL-2PIN-KLIK300-W</td><td>2 pin</td><td>300cm</td><td>-</td><td>2x0.50</td><td>2</td></tr>
        <tr><td>ZL-2PIN-KLIK300-G</td><td>2 pin</td><td>300cm</td><td>-</td><td>2x0.50</td><td>2a</td></tr>
        <tr><td>ZL-2PIN-KLIK</td><td>2 pin</td><td>15+15cm</td><td>-</td><td>2x0.50</td><td>3</td></tr>
        <tr><td>ZL-2PIN-KLIK300+15</td><td>2 pin</td><td>300+15cm</td><td>-</td><td>2x0.50</td><td>4</td></tr>
    </tbody>
</table>
"""
pages_html += make_page(7, "Złącza i Złączki", "KLIK", p7_tables)

# PAGE 8 - Złączki instalacyjne
p8_tables = """
<h3 class="text-lg font-bold text-prescot-dark mt-2 border-l-4 border-prescot-orange pl-3">Złączki Skręcane / Wciskane</h3>
<table class="prescot-table text-sm mt-2">
    <thead><tr><th>Numer katalogowy</th><th>Zakończenie</th><th>Zakończenie</th><th>Uziemienie</th><th>Montaż</th><th>Typ</th></tr></thead>
    <tbody>
        <tr><td>646/A</td><td>skręcane</td><td>wciskane</td><td>NIE</td><td>wciskana</td><td>1</td></tr>
        <tr><td>673/A</td><td>skręcane</td><td>skręcane</td><td>TAK</td><td>wciskana</td><td>2</td></tr>
        <tr><td>673/V</td><td>skręcane</td><td>skręcane</td><td>TAK</td><td>przykręcana</td><td>3</td></tr>
        <tr><td>676/V</td><td>skręcane</td><td>wciskane</td><td>TAK</td><td>przykręcana</td><td>4</td></tr>
        <tr><td>88167525</td><td>wciskane</td><td>wciskane</td><td>TAK</td><td>wciskana</td><td>5</td></tr>
        <tr><td>ZL-2X-PUSH</td><td>2x</td><td>2x</td><td>NIE</td><td>wciskana</td><td>6</td></tr>
        <tr><td>ZL-3X-PUSH</td><td>3x</td><td>3x</td><td>NIE</td><td>wciskana</td><td>7</td></tr>
    </tbody>
</table>
"""
pages_html += make_page(8, "Złączki Instalacyjne", "Uniwersalne", p8_tables)

# PAGE 9 - FAST
p9_tables = """
<h3 class="text-lg font-bold text-prescot-dark mt-2 border-l-4 border-prescot-orange pl-3">Seria FAST</h3>
<table class="prescot-table text-sm mt-2 mb-4">
    <thead><tr><th>Numer katalogowy</th><th>Model</th><th>Zastosowanie</th><th>Typ</th></tr></thead>
    <tbody>
        <tr><td>PR-ZPF-T1</td><td>T</td><td>Do rozgałęzienia przewodu</td><td>1</td></tr>
        <tr><td>PR-ZPF-T2</td><td>T</td><td>jedno lub dwużyłowego</td><td>2</td></tr>
        <tr><td>PR-ZPF-H1</td><td>H</td><td>Do połączenia dwóch przewodów</td><td>3</td></tr>
        <tr><td>PR-ZPF-H2</td><td>H</td><td>jedno lub dwużyłowych</td><td>4</td></tr>
    </tbody>
</table>
<h3 class="text-lg font-bold text-prescot-dark mt-2 border-l-4 border-prescot-orange pl-3">Złączki Skręcane 12-torowe</h3>
<table class="prescot-table text-sm mt-2">
    <thead><tr><th>Numer katalogowy</th><th>Zakończenie</th><th>Zakończenie</th><th>Typ złącza</th><th>Typ</th></tr></thead>
    <tbody>
        <tr><td>ZL-12X2.5B</td><td>2.5mm</td><td>2.5mm</td><td>Skręcane</td><td>1</td></tr>
        <tr><td>ZL-12X4B</td><td>4mm</td><td>4mm</td><td>Skręcane</td><td>1</td></tr>
        <tr><td>ZL-12X6B</td><td>6mm</td><td>6mm</td><td>Skręcane</td><td>1</td></tr>
        <tr><td>ZL-12X10B</td><td>10mm</td><td>10mm</td><td>Skręcane</td><td>1</td></tr>
        <tr><td>ZL-12X16B</td><td>16mm</td><td>16mm</td><td>Skręcane</td><td>1</td></tr>
        <tr><td>ZL-12X25B</td><td>25mm</td><td>25mm</td><td>Skręcane</td><td>1</td></tr>
        <tr><td>ZL-12X2.5P</td><td>2.5mm</td><td>2.5mm</td><td>Skręcane</td><td>2</td></tr>
        <tr><td>ZL-12X4P</td><td>4mm</td><td>4mm</td><td>Skręcane</td><td>2</td></tr>
        <tr><td>ZL-12X6P</td><td>6mm</td><td>6mm</td><td>Skręcane</td><td>2</td></tr>
        <tr><td>ZL-12X10P</td><td>10mm</td><td>10mm</td><td>Skręcane</td><td>2</td></tr>
        <tr><td>ZL-12X16P</td><td>16mm</td><td>16mm</td><td>Skręcane</td><td>2</td></tr>
        <tr><td>ZL-12X25P</td><td>25mm</td><td>25mm</td><td>Skręcane</td><td>2</td></tr>
    </tbody>
</table>
"""
pages_html += make_page(9, "Złączki Instalacyjne", "FAST / Skręcane", p9_tables)

# PAGE 10 - WAGO / Przewody
p10_tables = """
<h3 class="text-lg font-bold text-prescot-dark mt-2 border-l-4 border-prescot-orange pl-3">Seria WAGO</h3>
<table class="prescot-table text-sm mt-2 mb-4">
    <thead><tr><th>Numer katalogowy</th><th>Zakończenie</th><th>Typ złącza</th><th>Typ</th></tr></thead>
    <tbody>
        <tr><td>221-412</td><td>2x4</td><td>Zacisk sprężynowy</td><td>1</td></tr>
        <tr><td>221-413</td><td>3x4</td><td>Zacisk sprężynowy</td><td>1</td></tr>
        <tr><td>221-415</td><td>4x4</td><td>Zacisk sprężynowy</td><td>1</td></tr>
        <tr><td>222-412</td><td>2x2.5</td><td>Zacisk sprężynowy</td><td>2</td></tr>
        <tr><td>222-413</td><td>3x2.5</td><td>Zacisk sprężynowy</td><td>2</td></tr>
        <tr><td>222-415</td><td>4x2.5</td><td>Zacisk sprężynowy</td><td>2</td></tr>
        <tr><td>2273-202</td><td>2x2.5</td><td>Wciskany</td><td>3</td></tr>
        <tr><td>2273-203</td><td>3x2.5</td><td>Wciskany</td><td>3</td></tr>
        <tr><td>2273-204</td><td>4x2.5</td><td>Wciskany</td><td>3</td></tr>
        <tr><td>2273-205</td><td>5x2.5</td><td>Wciskany</td><td>3</td></tr>
    </tbody>
</table>
<h3 class="text-lg font-bold text-prescot-dark mt-2 border-l-4 border-prescot-orange pl-3">Przewody</h3>
<table class="prescot-table text-sm mt-2">
    <thead><tr><th>Nr katalogowy</th><th>Ilość żył</th><th>Przekrój żyły</th><th>Kolor</th><th>Typ</th></tr></thead>
    <tbody>
        <tr><td>TLWY4035</td><td>4</td><td>0.35</td><td>RGB</td><td>1</td></tr>
        <tr><td>TLWY4050</td><td>4</td><td>0.50</td><td>RGB</td><td>1</td></tr>
        <tr><td>TLWY5050</td><td>5</td><td>0.50</td><td>RGBW</td><td>2</td></tr>
        <tr><td>TLYP2035B</td><td>2</td><td>0.35</td><td>biały</td><td>4</td></tr>
        <tr><td>TLYP2035CZ</td><td>2</td><td>0.35</td><td>czarny</td><td>3</td></tr>
        <tr><td>TLYP2050B</td><td>2</td><td>0.50</td><td>biały</td><td>4</td></tr>
        <tr><td>TLYP2050CZ</td><td>2</td><td>0.50</td><td>czarny</td><td>3</td></tr>
    </tbody>
</table>
"""
pages_html += make_page(10, "Złączki WAGO i Przewody", "Instalacyjne", p10_tables)

# PAGE 11 - Przyciski
p11_tables = """
<h3 class="text-lg font-bold text-prescot-dark mt-2 border-l-4 border-prescot-orange pl-3">Przyciski</h3>
<table class="prescot-table text-sm mt-2 mb-4">
    <thead><tr><th>Nr katalogowy</th><th>Kolor przycisku/obudowy</th><th>Kolor podświetlenia</th><th>Ilość pozycji</th><th>Otwór montażowy</th><th>Typ</th></tr></thead>
    <tbody>
        <tr><td>PS11ARD</td><td>czerwony/czarny</td><td>-</td><td>2</td><td>12mm</td><td>-</td></tr>
        <tr><td>PS11ABK</td><td>czarny/czarny</td><td>-</td><td>2</td><td>12mm</td><td>1</td></tr>
        <tr><td>PS12ARD</td><td>czerwony/czarny</td><td>-</td><td>2</td><td>12mm</td><td>4</td></tr>
        <tr><td>PS12ABK</td><td>czarny/czarny</td><td>-</td><td>2</td><td>12mm</td><td>-</td></tr>
        <tr><td>PS502A-BR</td><td>czerwony/czarny</td><td>-</td><td>2</td><td>12.7mm</td><td>5</td></tr>
        <tr><td>PD502A-PB</td><td>czarny/czarny</td><td>-</td><td>2</td><td>12.7mm</td><td>-</td></tr>
        <tr><td>PS33BRD</td><td>czerwony/czarny</td><td>-</td><td>2</td><td>14mm</td><td>2</td></tr>
        <tr><td>PS33BBK</td><td>czarny/czarny</td><td>-</td><td>2</td><td>14mm</td><td>3</td></tr>
        <tr><td>PRZ-LED-12-B</td><td>srebrny</td><td>niebieski</td><td>2</td><td>16mm</td><td>6</td></tr>
        <tr><td>PRZ-LED-12-BO</td><td>srebrny</td><td>niebieski</td><td>2</td><td>16mm</td><td>7</td></tr>
        <tr><td>PRZ-LED-12-G</td><td>srebrny</td><td>zielony</td><td>2</td><td>16mm</td><td>6</td></tr>
        <tr><td>PRZ-LED-12-GO</td><td>srebrny</td><td>zielony</td><td>2</td><td>16mm</td><td>7</td></tr>
        <tr><td>PRZ-LED-12-R</td><td>srebrny</td><td>czerwony</td><td>2</td><td>16mm</td><td>6</td></tr>
        <tr><td>PRZ-LED-12-RO</td><td>srebrny</td><td>czerwony</td><td>2</td><td>16mm</td><td>7</td></tr>
        <tr><td>PRZ-LED-12-Y</td><td>srebrny</td><td>żółty</td><td>2</td><td>16mm</td><td>6</td></tr>
        <tr><td>PRZ-LED-12-YO</td><td>srebrny</td><td>żółty</td><td>2</td><td>16mm</td><td>7</td></tr>
    </tbody>
</table>
<h3 class="text-lg font-bold text-prescot-dark mt-2 border-l-4 border-prescot-orange pl-3">Włączniki kołyskowe</h3>
<table class="prescot-table text-sm mt-2">
    <thead><tr><th>Nr katalogowy</th><th>Kolor przycisku/obudowy</th><th>Ilość pozycji</th><th>Otwór montażowy</th><th>Typ</th></tr></thead>
    <tbody>
        <tr><td>PR-WLK-B</td><td>biały/biały</td><td>2</td><td>19.4mm</td><td>1</td></tr>
        <tr><td>PR-WLK-CZ</td><td>czarny/czarny</td><td>2</td><td>19.4mm</td><td>2</td></tr>
        <tr><td>PR-WLK-SZ</td><td>szary/szary</td><td>2</td><td>19.4mm</td><td>3</td></tr>
    </tbody>
</table>
"""
pages_html += make_page(11, "Przyciski i Włączniki", "Osprzęt", p11_tables)

# PAGE 12 - Hermetyczne THB na przewód
p12_tables = """
<table class="prescot-table text-sm mt-2">
    <thead><tr><th>Nr katalogowy</th><th>Rodzaj</th><th>Ilość pinów</th><th>Przewód</th><th>IP</th><th>IK</th><th>Typ</th></tr></thead>
    <tbody>
        <tr><td>THB.381.A2A</td><td>wtyk</td><td>2</td><td>0.25-1.5mm2</td><td>IP69K/IP68</td><td>IK06</td><td>1</td></tr>
        <tr><td>THB.381.B2A</td><td>gniazdo</td><td>2</td><td>0.25-1.5mm2</td><td>IP69K/IP68</td><td>IK06</td><td>2</td></tr>
        <tr><td>THB.387.A3A</td><td>wtyk</td><td>3</td><td>0.5-4mm2</td><td>IP66/IP68</td><td>-</td><td>3</td></tr>
        <tr><td>THB.387.B3A</td><td>gniazdo</td><td>3</td><td>0.5-4mm2</td><td>IP66/IP68</td><td>-</td><td>4</td></tr>
        <tr><td>THB.387.A4A</td><td>wtyk</td><td>4</td><td>0.5-4mm2</td><td>IP66/IP68</td><td>-</td><td>3</td></tr>
        <tr><td>THB.387.B4A</td><td>gniazdo</td><td>4</td><td>0.5-4mm2</td><td>IP66/IP68</td><td>-</td><td>4</td></tr>
        <tr><td>THB.387.A5A</td><td>wtyk</td><td>5</td><td>0.25-1.5mm2</td><td>IP66/IP68</td><td>-</td><td>5</td></tr>
        <tr><td>THB.387.B5A</td><td>gniazdo</td><td>5</td><td>0.25-1.5mm2</td><td>IP66/IP68</td><td>-</td><td>6</td></tr>
        <tr><td>THB.391.A2A</td><td>złączka</td><td>2</td><td>0.5-4mm2</td><td>IP68</td><td>-</td><td>7</td></tr>
        <tr><td>THB.391.A3A</td><td>złączka</td><td>3</td><td>0.5-4mm2</td><td>IP68</td><td>-</td><td>7</td></tr>
        <tr><td>THB.391.A4A</td><td>złączka</td><td>4</td><td>0.5-4mm2</td><td>IP68</td><td>-</td><td>7</td></tr>
    </tbody>
</table>
"""
pages_html += make_page(12, "Złączki Hermetyczne", "Na Przewód", p12_tables)

# PAGE 13 - Hermetyczne THB do obudowy
p13_tables = """
<table class="prescot-table text-sm mt-2">
    <thead><tr><th>Nr katalogowy</th><th>Rodzaj</th><th>Ilość pinów</th><th>Przewód</th><th>IP</th><th>Typ</th></tr></thead>
    <tbody>
        <tr><td>THB.387.E2A</td><td>wtyk</td><td>2</td><td>0.5-4mm2</td><td>IP66/IP68</td><td>2</td></tr>
        <tr><td>THB.387.F2A</td><td>gniazdo</td><td>2</td><td>0.5-4mm2</td><td>IP66/IP68</td><td>1</td></tr>
        <tr><td>THB.387.E3A</td><td>wtyk</td><td>3</td><td>0.5-4mm2</td><td>IP66/IP68</td><td>2</td></tr>
        <tr><td>THB.387.F3A</td><td>gniazdo</td><td>3</td><td>0.5-4mm2</td><td>IP66/IP68</td><td>1</td></tr>
        <tr><td>THB.387.E4A</td><td>wtyk</td><td>4</td><td>0.5-4mm2</td><td>IP66/IP68</td><td>2</td></tr>
        <tr><td>THB.387.F4A</td><td>gniazdo</td><td>4</td><td>0.5-4mm2</td><td>IP66/IP68</td><td>1</td></tr>
        <tr><td>THB.387.E5A</td><td>wtyk</td><td>5</td><td>0.25-1.5mm2</td><td>IP66/IP68</td><td>3</td></tr>
        <tr><td>THB.387.F5A</td><td>gniazdo</td><td>5</td><td>0.25-1.5mm2</td><td>IP66/IP68</td><td>4</td></tr>
    </tbody>
</table>
"""
pages_html += make_page(13, "Złączki Hermetyczne", "Do Obudowy", p13_tables)

# PAGE 14 - Baterie / Włączniki przelotowe
p14_tables = """
<div class="grid grid-cols-2 gap-4">
    <div>
        <h3 class="text-lg font-bold text-prescot-dark mt-2 border-l-4 border-prescot-orange pl-3">Pojemniki na baterie</h3>
        <table class="prescot-table text-sm mt-2 mb-4">
            <thead><tr><th>Nr katalogowy</th><th>Ilość miejsc</th><th>Model</th><th>Typ</th></tr></thead>
            <tbody>
                <tr><td>PBAT-AA-1</td><td>1</td><td>AA</td><td>-</td></tr>
                <tr><td>PBAT-AA-2</td><td>2</td><td>AA</td><td>2</td></tr>
                <tr><td>PBAT-AA-3</td><td>3</td><td>AA</td><td>1</td></tr>
                <tr><td>PBAT-AA-4</td><td>4</td><td>AA</td><td>3</td></tr>
            </tbody>
        </table>
        <h3 class="text-lg font-bold text-prescot-dark mt-2 border-l-4 border-prescot-orange pl-3">Baterie alkaiczne</h3>
        <table class="prescot-table text-sm mt-2">
            <thead><tr><th>Nr katalogowy</th><th>Model</th><th>Napięcie (V)</th><th>Typ</th></tr></thead>
            <tbody>
                <tr><td>8753</td><td>6LR61</td><td>9</td><td>-</td></tr>
                <tr><td>8751</td><td>LR6</td><td>1.5</td><td>1</td></tr>
                <tr><td>8752</td><td>LR03</td><td>1.5</td><td>2</td></tr>
                <tr><td>8754</td><td>LR14</td><td>1.5</td><td>3</td></tr>
                <tr><td>8755</td><td>LR20</td><td>1.5</td><td>4</td></tr>
            </tbody>
        </table>
    </div>
    <div>
        <h3 class="text-lg font-bold text-prescot-dark mt-2 border-l-4 border-prescot-orange pl-3">Baterie akumulatorowe</h3>
        <table class="prescot-table text-sm mt-2 mb-4">
            <thead><tr><th>Nr katalogowy</th><th>Model</th><th>Ilość</th><th>Typ</th></tr></thead>
            <tbody>
                <tr><td>8851</td><td>AA</td><td>4</td><td>1</td></tr>
                <tr><td>8854</td><td>AA</td><td>2</td><td>2</td></tr>
                <tr><td>8852</td><td>AAA</td><td>4</td><td>3</td></tr>
                <tr><td>8855</td><td>AAA</td><td>2</td><td>4</td></tr>
            </tbody>
        </table>
        <h3 class="text-lg font-bold text-prescot-dark mt-2 border-l-4 border-prescot-orange pl-3">Włączniki przelotowe</h3>
        <table class="prescot-table text-sm mt-2">
            <thead><tr><th>Nr katalogowy</th><th>Kolor</th><th>Typ</th></tr></thead>
            <tbody>
                <tr><td>PR-WLP-B</td><td>biały/biały</td><td>1</td></tr>
                <tr><td>PR-WLP-CZ</td><td>czarny/czarny</td><td>2</td></tr>
                <tr><td>S/575/N</td><td>czarny/czarny</td><td>3</td></tr>
            </tbody>
        </table>
    </div>
</div>
"""
pages_html += make_page(14, "Zasilanie i Przełączniki", "Osprzęt", p14_tables)


# Replace everything
with open(TEMPLATE_PATH, "r", encoding="utf-8") as f:
    html = f.read()

# Make sure logo and cover are injected in the base HTML for page 1
html = re.sub(r'<div class="flex items-center gap-2 mb-20">.*?</div>', 
              '''<div class="flex items-center gap-2 mb-20"><img src="assets/logo.svg" alt="PRESCOT Logo" class="h-16"></div>''', html, flags=re.DOTALL)
cover_src = copy_image('img_page0_xref4311.png', 'cover.png')
html = re.sub(r'<img src="https://images.unsplash.com/.*?"', f'<img src="{cover_src}"', html)

# Replace everything after PAGE 2
pages = html.split('<div class="page flex flex-col">')
if len(pages) > 2:
    html = pages[0] + '<div class="page flex flex-col">' + pages[1] + pages_html + "\\n</body>\\n</html>"

with open(TEMPLATE_PATH, "w", encoding="utf-8") as f:
    f.write(html)

print("Katalog wygenerowany 1:1 ZE WSZYSTKIMI OBRAZKAMI W GRIDACH DLA KAŻDEJ STRONY, bez RGB LINE.")
