import os
import shutil
import glob
import re

TEMPLATE_PATH = "/Users/karolbohdanowicz/Downloads/Katalog_Akcesoriow_PRESCOT_2026.html"
EXTRACTED_IMG_DIR = "/Users/karolbohdanowicz/my-ai-agents/CONTENT-BOSS/pliki-i-dane/prescot_extracted"
ASSETS_DIR = "/Users/karolbohdanowicz/Downloads/assets"

os.makedirs(ASSETS_DIR, exist_ok=True)

def copy_image(filename, dest_name):
    src = os.path.join(EXTRACTED_IMG_DIR, filename)
    if os.path.exists(src):
        shutil.copy(src, os.path.join(ASSETS_DIR, dest_name))
        return f"assets/{dest_name}"
    return ""

def get_page_images(page_num):
    pattern = os.path.join(EXTRACTED_IMG_DIR, f"img_page{page_num}_*.png")
    images = glob.glob(pattern)
    # Sort them by the xref ID to keep original order
    images.sort(key=lambda x: int(re.search(r'xref(\d+)', x).group(1)) if re.search(r'xref(\d+)', x) else 0)
    
    # Return a list of destination paths
    res = []
    for idx, img_path in enumerate(images):
        basename = os.path.basename(img_path)
        dest_name = f"p{page_num}_{idx+1}.png"
        src = copy_image(basename, dest_name)
        res.append(src)
    return res

def process_table(html, images_list):
    """
    Given a raw HTML table, inject a new TH for 'Podgląd' and TD with the image.
    We just map image[0] to the first data row, image[1] to the second, etc.
    If there are more rows than images, the rest get empty cells.
    """
    # Split into lines
    lines = html.strip().split('\\n')
    new_lines = []
    img_idx = 0
    
    for line in lines:
        if '<tr class="text-' in line and '<th>' not in line.lower():
            # It's the header row.
            # Find the last </th> and insert <th ...>Podgląd</th> before it
            # Actually, let's just insert it as the first column.
            line = line.replace('<th', '<th class="pb-3 font-semibold w-24">Podgląd</th><th', 1)
        elif '<tr class="hover' in line or '<tr class="bg-gray-50' in line:
            if 'colspan=' in line:
                # It's a category header row, increase colspan
                line = re.sub(r'colspan="(\d+)"', lambda m: f'colspan="{int(m.group(1))+1}"', line)
            else:
                # It's a data row
                if img_idx < len(images_list):
                    img_html = f'<td class="py-2 pr-4"><div class="bg-white border border-gray-100 rounded flex items-center justify-center p-1 w-20 h-14"><img src="{images_list[img_idx]}" class="max-w-full max-h-full object-contain mix-blend-multiply"></div></td>'
                    img_idx += 1
                else:
                    img_html = '<td class="py-2 pr-4"></td>'
                
                line = line.replace('<td', img_html + '<td', 1)
        
        new_lines.append(line)
        
    return "\\n".join(new_lines)


def make_clean_page(page_num, category, title, tables_html):
    # Fetch images for this page
    images = get_page_images(page_num)
    
    # Process the tables to inject images directly into rows
    processed_tables = process_table(tables_html, images)
    
    return f"""
    <div class="page flex flex-col bg-white">
        <!-- HEADER -->
        <header class="flex justify-between items-center mb-8 border-b-2 border-gray-900 pb-4">
            <div>
                <div class="text-prescot-orange text-xs font-bold tracking-[0.15em] uppercase mb-1">{category}</div>
                <h2 class="text-3xl font-bold text-gray-900 tracking-tight uppercase">{title}</h2>
            </div>
            <img src="assets/logo.svg" class="h-8" alt="Prescot">
        </header>

        <!-- CONTENT -->
        <div class="flex-1 flex flex-col">
            <div class="w-full">
                {processed_tables}
            </div>
        </div>

        <!-- FOOTER -->
        <div class="mt-8 pt-4 border-t border-gray-200 flex justify-between items-center text-gray-400">
            <div class="text-xs font-medium">Katalog Akcesoriów 2026 / PRESCOT LED</div>
            <div class="text-sm font-bold text-gray-900">{page_num:02d}</div>
        </div>
    </div>
    """

pages_html = ""

# COPY LOGO AND COVER
logo_src = "/Users/karolbohdanowicz/my-ai-agents/CONTENT-BOSS/pliki-i-dane/brandbook_prescot_01_2025/PRESCOT_logo_biale+kolor-01.svg"
if os.path.exists(logo_src):
    shutil.copy(logo_src, os.path.join(ASSETS_DIR, "logo.svg"))

cover_src = copy_image('img_page0_xref4311.png', 'cover.png')

# ----------------- PAGE 1 -----------------
p1_tables = """
<table class="w-full text-sm text-left mb-8">
    <thead>
        <tr class="text-[10px] uppercase tracking-wider text-gray-800 border-b-2 border-gray-900">
            <th class="pb-3 font-bold">Nr katalogowy</th>
            <th class="pb-3 font-bold">Zakończenie</th>
            <th class="pb-3 font-bold">Połączenie</th>
            <th class="pb-3 font-bold">Zakończenie</th>
            <th class="pb-3 font-bold">Przewód</th>
            <th class="pb-3 font-bold text-right">Typ</th>
        </tr>
    </thead>
    <tbody class="divide-y divide-gray-200">
        <tr class="hover:bg-gray-50"><td class="py-3 font-semibold text-gray-900">ZL-MONO-8MM-TP</td><td class="py-3 text-gray-600">8mm</td><td class="py-3 text-gray-600">14cm</td><td class="py-3 text-gray-600">-</td><td class="py-3 text-gray-600">2x0.35</td><td class="py-3 text-right font-bold text-prescot-orange">01</td></tr>
        <tr class="hover:bg-gray-50"><td class="py-3 font-semibold text-gray-900">ZL-MONO-8MM-TPT</td><td class="py-3 text-gray-600">8mm</td><td class="py-3 text-gray-600">14cm</td><td class="py-3 text-gray-600">8mm</td><td class="py-3 text-gray-600">2x0.35</td><td class="py-3 text-right font-bold text-prescot-orange">02</td></tr>
        <tr class="hover:bg-gray-50"><td class="py-3 font-semibold text-gray-900">ZL-MONO-8MM-TT</td><td class="py-3 text-gray-600">8mm</td><td class="py-3 text-gray-600">-</td><td class="py-3 text-gray-600">8mm</td><td class="py-3 text-gray-600">-</td><td class="py-3 text-right font-bold text-prescot-orange">03</td></tr>
        <tr class="hover:bg-gray-50"><td class="py-3 font-semibold text-gray-900">ZL-MONO-8MM-TZ-G2.1</td><td class="py-3 text-gray-600">8mm</td><td class="py-3 text-gray-600">15cm</td><td class="py-3 text-gray-600">Gniazdo 5.5/2.1</td><td class="py-3 text-gray-600">2x0.35</td><td class="py-3 text-right font-bold text-prescot-orange">04</td></tr>
        <tr class="hover:bg-gray-50"><td class="py-3 font-semibold text-gray-900">ZL-MONO-10MM-TP</td><td class="py-3 text-gray-600">10mm</td><td class="py-3 text-gray-600">14cm</td><td class="py-3 text-gray-600">-</td><td class="py-3 text-gray-600">2x0.35</td><td class="py-3 text-right font-bold text-prescot-orange">01</td></tr>
        <tr class="hover:bg-gray-50"><td class="py-3 font-semibold text-gray-900">ZL-MONO-10MM-TPT</td><td class="py-3 text-gray-600">10mm</td><td class="py-3 text-gray-600">14cm</td><td class="py-3 text-gray-600">10mm</td><td class="py-3 text-gray-600">2x0.35</td><td class="py-3 text-right font-bold text-prescot-orange">02</td></tr>
        <tr class="hover:bg-gray-50"><td class="py-3 font-semibold text-gray-900">ZL-MONO-10MM-TT</td><td class="py-3 text-gray-600">10mm</td><td class="py-3 text-gray-600">-</td><td class="py-3 text-gray-600">10mm</td><td class="py-3 text-gray-600">-</td><td class="py-3 text-right font-bold text-prescot-orange">03</td></tr>
        <tr class="hover:bg-gray-50"><td class="py-3 font-semibold text-gray-900">ZL-MONO-10MM-TZ-G2.1</td><td class="py-3 text-gray-600">10mm</td><td class="py-3 text-gray-600">15cm</td><td class="py-3 text-gray-600">Gniazdo 5.5/2.1</td><td class="py-3 text-gray-600">2x0.35</td><td class="py-3 text-right font-bold text-prescot-orange">04</td></tr>
    </tbody>
</table>

<h3 class="text-sm font-bold text-gray-900 mt-6 mb-4 border-l-4 border-prescot-orange pl-3 uppercase">Warianty RGB / RGBW</h3>
<table class="w-full text-sm text-left">
    <thead>
        <tr class="text-[10px] uppercase tracking-wider text-gray-800 border-b-2 border-gray-900">
            <th class="pb-3 font-bold">Nr katalogowy</th>
            <th class="pb-3 font-bold">Zakończenie</th>
            <th class="pb-3 font-bold">Połączenie</th>
            <th class="pb-3 font-bold">Zakończenie</th>
            <th class="pb-3 font-bold">Przewód</th>
            <th class="pb-3 font-bold text-right">Typ</th>
        </tr>
    </thead>
    <tbody class="divide-y divide-gray-200">
        <tr class="hover:bg-gray-50"><td class="py-3 font-semibold text-gray-900">ZL-RGB-10MM-TP</td><td class="py-3 text-gray-600">10mm</td><td class="py-3 text-gray-600">14cm</td><td class="py-3 text-gray-600">-</td><td class="py-3 text-gray-600">4x0.35</td><td class="py-3 text-right font-bold text-prescot-orange">01</td></tr>
        <tr class="hover:bg-gray-50"><td class="py-3 font-semibold text-gray-900">ZL-RGB-10MM-TPT</td><td class="py-3 text-gray-600">10mm</td><td class="py-3 text-gray-600">14cm</td><td class="py-3 text-gray-600">10mm</td><td class="py-3 text-gray-600">4x0.35</td><td class="py-3 text-right font-bold text-prescot-orange">02</td></tr>
        <tr class="hover:bg-gray-50"><td class="py-3 font-semibold text-gray-900">ZL-RGB-10MM-TT</td><td class="py-3 text-gray-600">10mm</td><td class="py-3 text-gray-600">-</td><td class="py-3 text-gray-600">10mm</td><td class="py-3 text-gray-600">-</td><td class="py-3 text-right font-bold text-prescot-orange">03</td></tr>
        <tr class="hover:bg-gray-50"><td class="py-3 font-semibold text-gray-900">ZL-RGBW-12MM-TP</td><td class="py-3 text-gray-600">12mm</td><td class="py-3 text-gray-600">14cm</td><td class="py-3 text-gray-600">-</td><td class="py-3 text-gray-600">5x0.35</td><td class="py-3 text-right font-bold text-prescot-orange">01</td></tr>
        <tr class="hover:bg-gray-50"><td class="py-3 font-semibold text-gray-900">ZL-RGBW-12MM-TPT</td><td class="py-3 text-gray-600">12mm</td><td class="py-3 text-gray-600">14cm</td><td class="py-3 text-gray-600">12mm</td><td class="py-3 text-gray-600">5x0.35</td><td class="py-3 text-right font-bold text-prescot-orange">02</td></tr>
    </tbody>
</table>
"""
pages_html += make_clean_page(1, "Złączki do Taśm LED", "Seria BASIC", p1_tables)

# ----------------- PAGE 2 -----------------
p2_tables = """
<table class="w-full text-sm text-left">
    <thead>
        <tr class="text-[10px] uppercase tracking-wider text-gray-800 border-b-2 border-gray-900">
            <th class="pb-3 font-bold">Nr katalogowy</th>
            <th class="pb-3 font-bold">Zakończenie</th>
            <th class="pb-3 font-bold">Zakończenie</th>
            <th class="pb-3 font-bold">Zastosowanie</th>
            <th class="pb-3 font-bold text-right">Typ</th>
        </tr>
    </thead>
    <tbody class="divide-y divide-gray-200">
        <tr class="hover:bg-gray-50"><td class="py-3 font-semibold text-gray-900">PR-ZLH8-MONO-TP</td><td class="py-3 text-gray-600">8mm</td><td class="py-3 text-gray-600">przewód</td><td class="py-3 text-gray-600">bez żelu</td><td class="py-3 text-right font-bold text-prescot-orange">01</td></tr>
        <tr class="hover:bg-gray-50"><td class="py-3 font-semibold text-gray-900">PR-ZLH8-MONO-TT</td><td class="py-3 text-gray-600">8mm</td><td class="py-3 text-gray-600">8mm</td><td class="py-3 text-gray-600">bez żelu</td><td class="py-3 text-right font-bold text-prescot-orange">02</td></tr>
        <tr class="hover:bg-gray-50"><td class="py-3 font-semibold text-gray-900">PR-ZLH10-MONO-TP</td><td class="py-3 text-gray-600">10mm</td><td class="py-3 text-gray-600">przewód</td><td class="py-3 text-gray-600">bez żelu</td><td class="py-3 text-right font-bold text-prescot-orange">01</td></tr>
        <tr class="hover:bg-gray-50"><td class="py-3 font-semibold text-gray-900">PR-ZLH10-MONO-TT</td><td class="py-3 text-gray-600">10mm</td><td class="py-3 text-gray-600">10mm</td><td class="py-3 text-gray-600">bez żelu</td><td class="py-3 text-right font-bold text-prescot-orange">02</td></tr>
        <tr class="hover:bg-gray-50"><td class="py-3 font-semibold text-gray-900">PR-ZLH10-RGB-TP</td><td class="py-3 text-gray-600">10mm</td><td class="py-3 text-gray-600">przewód</td><td class="py-3 text-gray-600">bez żelu</td><td class="py-3 text-right font-bold text-prescot-orange">03</td></tr>
        <tr class="hover:bg-gray-50"><td class="py-3 font-semibold text-gray-900">PR-ZLH10-RGB-TT</td><td class="py-3 text-gray-600">10mm</td><td class="py-3 text-gray-600">10mm</td><td class="py-3 text-gray-600">bez żelu</td><td class="py-3 text-right font-bold text-prescot-orange">04</td></tr>
        <tr class="bg-gray-50"><td colspan="4" class="py-2 text-[10px] text-gray-400 font-bold uppercase tracking-wider text-center">Warianty w Żelu (Wodoodporne)</td></tr>
        <tr class="hover:bg-gray-50"><td class="py-3 font-semibold text-gray-900">PR-ZLH8W-MONO-TP</td><td class="py-3 text-gray-600">8mm</td><td class="py-3 text-gray-600">przewód</td><td class="py-3 text-gray-600">w żelu</td><td class="py-3 text-right font-bold text-prescot-orange">01</td></tr>
        <tr class="hover:bg-gray-50"><td class="py-3 font-semibold text-gray-900">PR-ZLH8W-MONO-TT</td><td class="py-3 text-gray-600">8mm</td><td class="py-3 text-gray-600">8mm</td><td class="py-3 text-gray-600">w żelu</td><td class="py-3 text-right font-bold text-prescot-orange">02</td></tr>
        <tr class="hover:bg-gray-50"><td class="py-3 font-semibold text-gray-900">PR-ZLH10W-MONO-TP</td><td class="py-3 text-gray-600">10mm</td><td class="py-3 text-gray-600">przewód</td><td class="py-3 text-gray-600">w żelu</td><td class="py-3 text-right font-bold text-prescot-orange">01</td></tr>
        <tr class="hover:bg-gray-50"><td class="py-3 font-semibold text-gray-900">PR-ZLH10W-MONO-TT</td><td class="py-3 text-gray-600">10mm</td><td class="py-3 text-gray-600">10mm</td><td class="py-3 text-gray-600">w żelu</td><td class="py-3 text-right font-bold text-prescot-orange">02</td></tr>
    </tbody>
</table>
"""
pages_html += make_clean_page(2, "Złączki do Taśm LED", "Seria HIPP", p2_tables)

# ----------------- PAGE 3 -----------------
p3_tables = """
<table class="w-full text-sm text-left">
    <thead>
        <tr class="text-[10px] uppercase tracking-wider text-gray-800 border-b-2 border-gray-900">
            <th class="pb-3 font-bold">Nr katalogowy</th>
            <th class="pb-3 font-bold">Zakończenie</th>
            <th class="pb-3 font-bold">Model</th>
            <th class="pb-3 font-bold">Zastosowanie</th>
            <th class="pb-3 font-bold text-right">Typ</th>
        </tr>
    </thead>
    <tbody class="divide-y divide-gray-200">
        <tr class="hover:bg-gray-50"><td class="py-3 font-semibold text-gray-900">PR-ZL8L-PCB-MONO</td><td class="py-3 text-gray-600">8mm</td><td class="py-3 text-gray-600 font-bold">L</td><td class="py-3 text-gray-600">bez żelu</td><td class="py-3 text-right font-bold text-prescot-orange">01</td></tr>
        <tr class="hover:bg-gray-50"><td class="py-3 font-semibold text-gray-900">PR-ZL8T-PCB-MONO</td><td class="py-3 text-gray-600">8mm</td><td class="py-3 text-gray-600 font-bold">T</td><td class="py-3 text-gray-600">bez żelu</td><td class="py-3 text-right font-bold text-prescot-orange">02</td></tr>
        <tr class="hover:bg-gray-50"><td class="py-3 font-semibold text-gray-900">PR-ZL8X-PCB-MONO</td><td class="py-3 text-gray-600">8mm</td><td class="py-3 text-gray-600 font-bold">X</td><td class="py-3 text-gray-600">bez żelu</td><td class="py-3 text-right font-bold text-prescot-orange">03</td></tr>
        <tr class="hover:bg-gray-50"><td class="py-3 font-semibold text-gray-900">PR-ZL10L-PCB-MONO</td><td class="py-3 text-gray-600">10mm</td><td class="py-3 text-gray-600 font-bold">L</td><td class="py-3 text-gray-600">bez żelu</td><td class="py-3 text-right font-bold text-prescot-orange">01</td></tr>
        <tr class="hover:bg-gray-50"><td class="py-3 font-semibold text-gray-900">PR-ZL10T-PCB-MONO</td><td class="py-3 text-gray-600">10mm</td><td class="py-3 text-gray-600 font-bold">T</td><td class="py-3 text-gray-600">bez żelu</td><td class="py-3 text-right font-bold text-prescot-orange">02</td></tr>
        <tr class="hover:bg-gray-50"><td class="py-3 font-semibold text-gray-900">PR-ZL10X-PCB-MONO</td><td class="py-3 text-gray-600">10mm</td><td class="py-3 text-gray-600 font-bold">X</td><td class="py-3 text-gray-600">bez żelu</td><td class="py-3 text-right font-bold text-prescot-orange">03</td></tr>
        <tr class="hover:bg-gray-50"><td class="py-3 font-semibold text-gray-900">PR-ZL10L-PCB-RGB</td><td class="py-3 text-gray-600">10mm (RGB)</td><td class="py-3 text-gray-600 font-bold">L</td><td class="py-3 text-gray-600">bez żelu</td><td class="py-3 text-right font-bold text-prescot-orange">01</td></tr>
        <tr class="hover:bg-gray-50"><td class="py-3 font-semibold text-gray-900">PR-ZL10T-PCB-RGB</td><td class="py-3 text-gray-600">10mm (RGB)</td><td class="py-3 text-gray-600 font-bold">T</td><td class="py-3 text-gray-600">bez żelu</td><td class="py-3 text-right font-bold text-prescot-orange">02</td></tr>
        <tr class="hover:bg-gray-50"><td class="py-3 font-semibold text-gray-900">PR-ZL10X-PCB-RGB</td><td class="py-3 text-gray-600">10mm (RGB)</td><td class="py-3 text-gray-600 font-bold">X</td><td class="py-3 text-gray-600">bez żelu</td><td class="py-3 text-right font-bold text-prescot-orange">03</td></tr>
    </tbody>
</table>
"""
pages_html += make_clean_page(3, "Złączki do Taśm LED", "Seria PCB", p3_tables)

# ----------------- PAGE 4 -----------------
p4_tables = """
<table class="w-full text-sm text-left">
    <thead>
        <tr class="text-[10px] uppercase tracking-wider text-gray-800 border-b-2 border-gray-900">
            <th class="pb-3 font-bold">Nr katalogowy</th>
            <th class="pb-3 font-bold">Zakończenie</th>
            <th class="pb-3 font-bold">Długość</th>
            <th class="pb-3 font-bold">Przewód</th>
            <th class="pb-3 font-bold text-right">Kolor</th>
        </tr>
    </thead>
    <tbody class="divide-y divide-gray-200">
        <tr class="hover:bg-gray-50"><td class="py-3 font-semibold text-gray-900">WT-DC-5.5/2.1+15</td><td class="py-3 text-gray-600">5.5/2.1</td><td class="py-3 text-gray-600">15cm</td><td class="py-3 text-gray-600">2x0.35</td><td class="py-3 text-right">biały</td></tr>
        <tr class="hover:bg-gray-50"><td class="py-3 font-semibold text-gray-900">WT-DC-5.5/2.1+15CZ</td><td class="py-3 text-gray-600">5.5/2.1</td><td class="py-3 text-gray-600">15cm</td><td class="py-3 text-gray-600">2x0.35</td><td class="py-3 text-right font-bold text-gray-900">czarny</td></tr>
        <tr class="hover:bg-gray-50"><td class="py-3 font-semibold text-gray-900">WT-DC-5.5/2.5+15</td><td class="py-3 text-gray-600">5.5/2.5</td><td class="py-3 text-gray-600">15cm</td><td class="py-3 text-gray-600">2x0.35</td><td class="py-3 text-right">biały</td></tr>
        <tr class="hover:bg-gray-50"><td class="py-3 font-semibold text-gray-900">WT-DC-5.5/2.5+15CZ</td><td class="py-3 text-gray-600">5.5/2.5</td><td class="py-3 text-gray-600">15cm</td><td class="py-3 text-gray-600">2x0.35</td><td class="py-3 text-right font-bold text-gray-900">czarny</td></tr>
        <tr class="hover:bg-gray-50"><td class="py-3 font-semibold text-gray-900">ROZ-DC-5.5/2.1-2X1CZ</td><td class="py-3 text-gray-600">Rozgałęźnik x2</td><td class="py-3 text-gray-600">24cm</td><td class="py-3 text-gray-600">2x0.35</td><td class="py-3 text-right font-bold text-gray-900">czarny</td></tr>
        <tr class="hover:bg-gray-50"><td class="py-3 font-semibold text-gray-900">ROZ-DC-5.5/2.1-4X1CZ</td><td class="py-3 text-gray-600">Rozgałęźnik x4</td><td class="py-3 text-gray-600">24cm</td><td class="py-3 text-gray-600">2x0.35</td><td class="py-3 text-right font-bold text-gray-900">czarny</td></tr>
    </tbody>
</table>
"""
pages_html += make_clean_page(4, "Zasilanie LED", "Wtyki i Rozgałęźniki DC", p4_tables)

# ----------------- PAGE 5 -----------------
p5_tables = """
<table class="w-full text-sm text-left">
    <thead>
        <tr class="text-[10px] uppercase tracking-wider text-gray-800 border-b-2 border-gray-900">
            <th class="pb-3 font-bold">Nr katalogowy</th>
            <th class="pb-3 font-bold">Połączenie</th>
            <th class="pb-3 font-bold">Przewód</th>
            <th class="pb-3 font-bold text-right">Typ</th>
        </tr>
    </thead>
    <tbody class="divide-y divide-gray-200">
        <tr class="hover:bg-gray-50"><td class="py-3 font-semibold text-gray-900">LED-ZIP-Ż</td><td class="py-3 text-gray-600">Żeńskie DC 5.5/2.1</td><td class="py-3 text-gray-600">2x0.50 (15cm)</td><td class="py-3 text-right font-bold text-prescot-orange">01</td></tr>
        <tr class="hover:bg-gray-50"><td class="py-3 font-semibold text-gray-900">LED-ZIP-M</td><td class="py-3 text-gray-600">Męskie DC 5.5/2.1</td><td class="py-3 text-gray-600">2x0.50 (15cm)</td><td class="py-3 text-right font-bold text-prescot-orange">1a</td></tr>
        <tr class="hover:bg-gray-50"><td class="py-3 font-semibold text-gray-900">LED-ZIP-Ż-RGB</td><td class="py-3 text-gray-600">Żeńskie 4-pin</td><td class="py-3 text-gray-600">4x0.50 (15cm)</td><td class="py-3 text-right font-bold text-prescot-orange">02</td></tr>
        <tr class="hover:bg-gray-50"><td class="py-3 font-semibold text-gray-900">LED-ZIP-M-RGB</td><td class="py-3 text-gray-600">Męskie 4-pin</td><td class="py-3 text-gray-600">4x0.50 (15cm)</td><td class="py-3 text-right font-bold text-prescot-orange">2a</td></tr>
        <tr class="bg-gray-50"><td colspan="3" class="py-2 text-[10px] text-gray-400 font-bold uppercase tracking-wider text-center">Standard RGB</td></tr>
        <tr class="hover:bg-gray-50"><td class="py-3 font-semibold text-gray-900">GN-RGB-4PIN15</td><td class="py-3 text-gray-600">Gniazdo 4-pin</td><td class="py-3 text-gray-600">15cm</td><td class="py-3 text-right font-bold text-prescot-orange">01</td></tr>
        <tr class="hover:bg-gray-50"><td class="py-3 font-semibold text-gray-900">WTYK-RGB-4PIN-CZ</td><td class="py-3 text-gray-600">Wtyk 4-pin (Czarny)</td><td class="py-3 text-gray-600">15cm</td><td class="py-3 text-right font-bold text-prescot-orange">04</td></tr>
    </tbody>
</table>
"""
pages_html += make_clean_page(5, "Instalacje", "Złącza Hermetyczne DC/RGB", p5_tables)

p6_tables = """
<table class="w-full text-sm text-left">
    <thead>
        <tr class="text-[10px] uppercase tracking-wider text-gray-800 border-b-2 border-gray-900">
            <th class="pb-3 font-bold">Nr katalogowy</th>
            <th class="pb-3 font-bold">Zakończenie</th>
            <th class="pb-3 font-bold">Montaż</th>
            <th class="pb-3 font-bold text-right">Typ</th>
        </tr>
    </thead>
    <tbody class="divide-y divide-gray-200">
        <tr class="hover:bg-gray-50"><td class="py-3 font-semibold text-gray-900">WT-DC-5.5/2.1-PP</td><td class="py-3 text-gray-600">5.5/2.1</td><td class="py-3 text-gray-600">na przewód</td><td class="py-3 text-right font-bold text-prescot-orange">01</td></tr>
        <tr class="hover:bg-gray-50"><td class="py-3 font-semibold text-gray-900">GN-DC-5.5/2.1-OB1</td><td class="py-3 text-gray-600">5.5/2.1</td><td class="py-3 text-gray-600">do obudowy</td><td class="py-3 text-right font-bold text-prescot-orange">02</td></tr>
        <tr class="hover:bg-gray-50"><td class="py-3 font-semibold text-gray-900">GN-DC-5.5/2.1ZS</td><td class="py-3 text-gray-600">5.5/2.1</td><td class="py-3 text-gray-600">zacisk śrubowy</td><td class="py-3 text-right font-bold text-prescot-orange">05</td></tr>
    </tbody>
</table>
"""
pages_html += make_clean_page(6, "Zasilanie", "Gniazda i Wtyki DC", p6_tables)

p7_tables = """
<table class="w-full text-sm text-left">
    <thead>
        <tr class="text-[10px] uppercase tracking-wider text-gray-800 border-b-2 border-gray-900">
            <th class="pb-3 font-bold">Nr katalogowy</th>
            <th class="pb-3 font-bold">Przewód</th>
            <th class="pb-3 font-bold text-right">Typ</th>
        </tr>
    </thead>
    <tbody class="divide-y divide-gray-200">
        <tr class="hover:bg-gray-50"><td class="py-3 font-semibold text-gray-900">ZL-2PIN-KLIK-W</td><td class="py-3 text-gray-600">2x0.50 (15cm)</td><td class="py-3 text-right font-bold text-prescot-orange">01</td></tr>
        <tr class="hover:bg-gray-50"><td class="py-3 font-semibold text-gray-900">ZL-2PIN-KLIK300-W</td><td class="py-3 text-gray-600">2x0.50 (300cm)</td><td class="py-3 text-right font-bold text-prescot-orange">02</td></tr>
        <tr class="hover:bg-gray-50"><td class="py-3 font-semibold text-gray-900">ZL-2PIN-KLIK</td><td class="py-3 text-gray-600">2x0.50 (15+15cm)</td><td class="py-3 text-right font-bold text-prescot-orange">03</td></tr>
    </tbody>
</table>
"""
pages_html += make_clean_page(7, "Szybkie Połączenia", "Seria KLIK", p7_tables)

p8_tables = """
<table class="w-full text-sm text-left">
    <thead>
        <tr class="text-[10px] uppercase tracking-wider text-gray-800 border-b-2 border-gray-900">
            <th class="pb-3 font-bold">Nr katalogowy</th>
            <th class="pb-3 font-bold">Typ złącza</th>
            <th class="pb-3 font-bold text-right">Typ</th>
        </tr>
    </thead>
    <tbody class="divide-y divide-gray-200">
        <tr class="hover:bg-gray-50"><td class="py-3 font-semibold text-gray-900">646/A</td><td class="py-3 text-gray-600">skręcane/wciskane</td><td class="py-3 text-right font-bold text-prescot-orange">01</td></tr>
        <tr class="hover:bg-gray-50"><td class="py-3 font-semibold text-gray-900">673/A</td><td class="py-3 text-gray-600">skręcane (z uziemieniem)</td><td class="py-3 text-right font-bold text-prescot-orange">02</td></tr>
        <tr class="hover:bg-gray-50"><td class="py-3 font-semibold text-gray-900">ZL-2X-PUSH</td><td class="py-3 text-gray-600">szybkozłączka 2x</td><td class="py-3 text-right font-bold text-prescot-orange">06</td></tr>
    </tbody>
</table>
"""
pages_html += make_clean_page(8, "Złączki Elektryczne", "Skręcane i Wciskane", p8_tables)

p9_tables = """
<table class="w-full text-sm text-left">
    <thead>
        <tr class="text-[10px] uppercase tracking-wider text-gray-800 border-b-2 border-gray-900">
            <th class="pb-3 font-bold">Nr katalogowy</th>
            <th class="pb-3 font-bold">Zastosowanie</th>
            <th class="pb-3 font-bold text-right">Typ</th>
        </tr>
    </thead>
    <tbody class="divide-y divide-gray-200">
        <tr class="hover:bg-gray-50"><td class="py-3 font-semibold text-gray-900">PR-ZPF-T1</td><td class="py-3 text-gray-600">Rozgałęźnik T</td><td class="py-3 text-right font-bold text-prescot-orange">01</td></tr>
        <tr class="hover:bg-gray-50"><td class="py-3 font-semibold text-gray-900">PR-ZPF-H1</td><td class="py-3 text-gray-600">Połączenie H</td><td class="py-3 text-right font-bold text-prescot-orange">03</td></tr>
        <tr class="hover:bg-gray-50"><td class="py-3 font-semibold text-gray-900">ZL-12X2.5B</td><td class="py-3 text-gray-600">Listwa 12-torowa (2.5mm)</td><td class="py-3 text-right font-bold text-prescot-orange">-</td></tr>
    </tbody>
</table>
"""
pages_html += make_clean_page(9, "Instalacje", "Seria FAST", p9_tables)

p10_tables = """
<table class="w-full text-sm text-left">
    <thead>
        <tr class="text-[10px] uppercase tracking-wider text-gray-800 border-b-2 border-gray-900">
            <th class="pb-3 font-bold">Nr katalogowy</th>
            <th class="pb-3 font-bold">Parametry</th>
            <th class="pb-3 font-bold text-right">Typ</th>
        </tr>
    </thead>
    <tbody class="divide-y divide-gray-200">
        <tr class="hover:bg-gray-50"><td class="py-3 font-semibold text-gray-900">221-412</td><td class="py-3 text-gray-600">WAGO 2x4 (Zacisk sprężynowy)</td><td class="py-3 text-right font-bold text-prescot-orange">01</td></tr>
        <tr class="hover:bg-gray-50"><td class="py-3 font-semibold text-gray-900">2273-203</td><td class="py-3 text-gray-600">WAGO 3x2.5 (Wciskany)</td><td class="py-3 text-right font-bold text-prescot-orange">03</td></tr>
        <tr class="hover:bg-gray-50"><td class="py-3 font-semibold text-gray-900">TLWY4035</td><td class="py-3 text-gray-600">Przewód RGB 4x0.35</td><td class="py-3 text-right font-bold text-prescot-orange">-</td></tr>
    </tbody>
</table>
"""
pages_html += make_clean_page(10, "Złączki i Kable", "WAGO / TLWY", p10_tables)

p11_tables = """
<table class="w-full text-sm text-left">
    <thead>
        <tr class="text-[10px] uppercase tracking-wider text-gray-800 border-b-2 border-gray-900">
            <th class="pb-3 font-bold">Nr katalogowy</th>
            <th class="pb-3 font-bold">Otwór</th>
            <th class="pb-3 font-bold text-right">Typ</th>
        </tr>
    </thead>
    <tbody class="divide-y divide-gray-200">
        <tr class="hover:bg-gray-50"><td class="py-3 font-semibold text-gray-900">PS11ABK</td><td class="py-3 text-gray-600">12mm</td><td class="py-3 text-right font-bold text-prescot-orange">01</td></tr>
        <tr class="hover:bg-gray-50"><td class="py-3 font-semibold text-gray-900">PRZ-LED-12-B</td><td class="py-3 text-gray-600">16mm (Podświetlenie Niebieskie)</td><td class="py-3 text-right font-bold text-prescot-orange">06</td></tr>
        <tr class="hover:bg-gray-50"><td class="py-3 font-semibold text-gray-900">PR-WLK-CZ</td><td class="py-3 text-gray-600">19.4mm (Włącznik Kołyskowy)</td><td class="py-3 text-right font-bold text-prescot-orange">02</td></tr>
    </tbody>
</table>
"""
pages_html += make_clean_page(11, "Akcesoria", "Przyciski i Włączniki", p11_tables)

p12_tables = """
<table class="w-full text-sm text-left">
    <thead>
        <tr class="text-[10px] uppercase tracking-wider text-gray-800 border-b-2 border-gray-900">
            <th class="pb-3 font-bold">Nr katalogowy</th>
            <th class="pb-3 font-bold">Ilość Pinów</th>
            <th class="pb-3 font-bold">IP</th>
            <th class="pb-3 font-bold text-right">Typ</th>
        </tr>
    </thead>
    <tbody class="divide-y divide-gray-200">
        <tr class="hover:bg-gray-50"><td class="py-3 font-semibold text-gray-900">THB.381.A2A</td><td class="py-3 text-gray-600">2 pin (Wtyk)</td><td class="py-3 text-gray-600">IP69K/IP68</td><td class="py-3 text-right font-bold text-prescot-orange">01</td></tr>
        <tr class="hover:bg-gray-50"><td class="py-3 font-semibold text-gray-900">THB.387.A5A</td><td class="py-3 text-gray-600">5 pin (Wtyk)</td><td class="py-3 text-gray-600">IP66/IP68</td><td class="py-3 text-right font-bold text-prescot-orange">05</td></tr>
        <tr class="hover:bg-gray-50"><td class="py-3 font-semibold text-gray-900">THB.391.A3A</td><td class="py-3 text-gray-600">3 pin (Złączka)</td><td class="py-3 text-gray-600">IP68</td><td class="py-3 text-right font-bold text-prescot-orange">07</td></tr>
    </tbody>
</table>
"""
pages_html += make_clean_page(12, "Instalacje Zewnętrzne", "Złączki Hermetyczne (Na Przewód)", p12_tables)

p13_tables = """
<table class="w-full text-sm text-left">
    <thead>
        <tr class="text-[10px] uppercase tracking-wider text-gray-800 border-b-2 border-gray-900">
            <th class="pb-3 font-bold">Nr katalogowy</th>
            <th class="pb-3 font-bold">Ilość Pinów</th>
            <th class="pb-3 font-bold">IP</th>
            <th class="pb-3 font-bold text-right">Typ</th>
        </tr>
    </thead>
    <tbody class="divide-y divide-gray-200">
        <tr class="hover:bg-gray-50"><td class="py-3 font-semibold text-gray-900">THB.387.E2A</td><td class="py-3 text-gray-600">2 pin (Wtyk)</td><td class="py-3 text-gray-600">IP66/IP68</td><td class="py-3 text-right font-bold text-prescot-orange">02</td></tr>
        <tr class="hover:bg-gray-50"><td class="py-3 font-semibold text-gray-900">THB.387.F5A</td><td class="py-3 text-gray-600">5 pin (Gniazdo)</td><td class="py-3 text-gray-600">IP66/IP68</td><td class="py-3 text-right font-bold text-prescot-orange">04</td></tr>
    </tbody>
</table>
"""
pages_html += make_clean_page(13, "Instalacje Zewnętrzne", "Złączki Hermetyczne (Do Obudowy)", p13_tables)

p14_tables = """
<table class="w-full text-sm text-left">
    <thead>
        <tr class="text-[10px] uppercase tracking-wider text-gray-800 border-b-2 border-gray-900">
            <th class="pb-3 font-bold">Nr katalogowy</th>
            <th class="pb-3 font-bold">Opis</th>
            <th class="pb-3 font-bold text-right">Typ</th>
        </tr>
    </thead>
    <tbody class="divide-y divide-gray-200">
        <tr class="hover:bg-gray-50"><td class="py-3 font-semibold text-gray-900">PBAT-AA-4</td><td class="py-3 text-gray-600">Koszyk na 4 baterie AA</td><td class="py-3 text-right font-bold text-prescot-orange">03</td></tr>
        <tr class="hover:bg-gray-50"><td class="py-3 font-semibold text-gray-900">8851</td><td class="py-3 text-gray-600">Akumulatorki AA (1500mAh)</td><td class="py-3 text-right font-bold text-prescot-orange">01</td></tr>
        <tr class="hover:bg-gray-50"><td class="py-3 font-semibold text-gray-900">S/575/N</td><td class="py-3 text-gray-600">Włącznik przelotowy czarny</td><td class="py-3 text-right font-bold text-prescot-orange">03</td></tr>
    </tbody>
</table>
"""
pages_html += make_clean_page(14, "Zasilanie i Przełączniki", "Akcesoria Różne", p14_tables)


final_html = f"""<!DOCTYPE html>
<html lang="pl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Katalog Akcesoriów PRESCOT LED 2026</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet">
    <script>
        tailwind.config = {{
            theme: {{
                extend: {{
                    fontFamily: {{ sans: ['Inter', 'sans-serif'] }},
                    colors: {{
                        'prescot-orange': '#FF4B00',
                        'prescot-dark': '#111827'
                    }}
                }}
            }}
        }}
    </script>
    <style>
        body {{
            background-color: #f3f4f6;
            -webkit-print-color-adjust: exact;
        }}
        .page {{
            width: 210mm;
            min-height: 297mm;
            padding: 24mm 20mm;
            margin: 10mm auto;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
            position: relative;
            box-sizing: border-box;
            page-break-after: always;
        }}
    </style>
</head>
<body>

    <!-- COVER PAGE - ULTRA CLEAN -->
    <div class="page flex flex-col justify-center items-center bg-white text-gray-900 p-0 overflow-hidden relative">
        <div class="absolute inset-0 z-0 opacity-10">
            <img src="{cover_src}" class="w-full h-full object-cover">
        </div>
        
        <div class="z-10 relative flex flex-col items-center text-center w-full max-w-2xl px-12 py-24 bg-white/90 backdrop-blur-sm border border-gray-100 shadow-2xl rounded-2xl">
            <img src="assets/logo.svg" alt="PRESCOT Logo" class="h-16 mb-12" style="filter: brightness(0) invert(0);">
            
            <h2 class="text-xs font-bold tracking-[0.4em] text-prescot-orange uppercase mb-4">Wydanie Profesjonalne 2026</h2>
            <h1 class="text-6xl font-black mb-6 uppercase tracking-tighter leading-none text-gray-900">Katalog<br>Akcesoriów</h1>
            
            <div class="w-16 h-1 bg-prescot-orange mb-8"></div>
            
            <p class="text-sm text-gray-500 font-medium max-w-md">Kompletny katalog osprzętu instalacyjnego i złącz do systemów oświetleniowych.</p>
        </div>
        
        <div class="absolute bottom-12 left-0 right-0 flex justify-center items-center gap-12 text-xs text-gray-400 font-semibold uppercase tracking-widest z-10">
            <span>prescot.pl</span>
            <span class="w-1 h-1 bg-gray-300 rounded-full"></span>
            <span>PRESCOT Sp. z o.o.</span>
        </div>
    </div>

    {pages_html}

</body>
</html>
"""

with open(TEMPLATE_PATH, "w", encoding="utf-8") as f:
    f.write(final_html)

print("Wygenerowano czysty, inżynierski katalog z obrazkami zintegrowanymi w wierszach tabel.")
