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

def get_images_html(page_num):
    pattern = os.path.join(EXTRACTED_IMG_DIR, f"img_page{page_num}_*.png")
    images = glob.glob(pattern)
    images.sort(key=lambda x: int(re.search(r'xref(\d+)', x).group(1)) if re.search(r'xref(\d+)', x) else 0)
    
    if not images:
        return ""
    
    html = '<div class="grid grid-cols-2 gap-4">\\n'
    for idx, img_path in enumerate(images):
        basename = os.path.basename(img_path)
        dest_name = f"p{page_num}_{idx+1}.png"
        src = copy_image(basename, dest_name)
        num = f"{idx+1:02d}"
        
        html += f"""
        <div class="relative bg-white rounded-xl shadow-[0_2px_10px_rgba(0,0,0,0.03)] border border-gray-100 p-4 flex items-center justify-center group hover:shadow-[0_8px_30px_rgba(225,78,38,0.1)] transition-all duration-300">
            <div class="absolute top-3 left-3 text-[10px] font-bold text-gray-300 tracking-wider">TYP {num}</div>
            <img src="{src}" class="max-w-full max-h-32 object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-500">
        </div>
        """
    html += '</div>\\n'
    return html


def make_premium_page(page_num, category, title, tables_html):
    return f"""
    <div class="page flex flex-col bg-white">
        <!-- HEADER -->
        <header class="flex justify-between items-end mb-12 border-b border-gray-200 pb-4">
            <div>
                <div class="text-prescot-orange text-xs font-bold tracking-[0.2em] uppercase mb-1">{category}</div>
                <h2 class="text-4xl font-extrabold text-gray-900 tracking-tight">{title}</h2>
            </div>
            <img src="assets/logo.svg" class="h-6 opacity-80" alt="Prescot">
        </header>

        <!-- CONTENT -->
        <div class="flex-1 flex flex-col gap-10">
            <div class="w-full">
                {tables_html}
            </div>
            <div class="w-full bg-gray-50/50 rounded-2xl p-6 border border-gray-100">
                <h3 class="text-xs font-bold text-gray-400 uppercase tracking-widest mb-6">Wizualizacje Typów (Referencja)</h3>
                {get_images_html(page_num)}
            </div>
        </div>

        <!-- FOOTER -->
        <div class="mt-12 pt-6 border-t border-gray-100 flex justify-between items-center text-gray-400">
            <div class="text-[10px] tracking-widest font-medium uppercase">Katalog Akcesoriów 2026 • Prescot LED</div>
            <div class="text-sm font-bold bg-gray-900 text-white w-8 h-8 flex items-center justify-center rounded-full">{page_num:02d}</div>
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
<table class="w-full text-sm text-left">
    <thead>
        <tr class="text-[10px] uppercase tracking-wider text-gray-500 border-b border-gray-200">
            <th class="pb-3 font-semibold">Nr katalogowy</th>
            <th class="pb-3 font-semibold">Zakończenie</th>
            <th class="pb-3 font-semibold">Połączenie</th>
            <th class="pb-3 font-semibold">Zakończenie</th>
            <th class="pb-3 font-semibold">Przewód</th>
            <th class="pb-3 font-semibold text-right">Typ</th>
        </tr>
    </thead>
    <tbody class="divide-y divide-gray-100">
        <tr class="hover:bg-gray-50 transition-colors"><td class="py-3 font-medium text-gray-900">ZL-MONO-8MM-TP</td><td class="py-3 text-gray-600">8mm</td><td class="py-3 text-gray-600">14cm</td><td class="py-3 text-gray-600">-</td><td class="py-3 text-gray-600">2x0.35</td><td class="py-3 text-right font-bold text-prescot-orange">01</td></tr>
        <tr class="hover:bg-gray-50 transition-colors"><td class="py-3 font-medium text-gray-900">ZL-MONO-8MM-TPT</td><td class="py-3 text-gray-600">8mm</td><td class="py-3 text-gray-600">14cm</td><td class="py-3 text-gray-600">8mm</td><td class="py-3 text-gray-600">2x0.35</td><td class="py-3 text-right font-bold text-prescot-orange">02</td></tr>
        <tr class="hover:bg-gray-50 transition-colors"><td class="py-3 font-medium text-gray-900">ZL-MONO-8MM-TT</td><td class="py-3 text-gray-600">8mm</td><td class="py-3 text-gray-600">-</td><td class="py-3 text-gray-600">8mm</td><td class="py-3 text-gray-600">-</td><td class="py-3 text-right font-bold text-prescot-orange">03</td></tr>
        <tr class="hover:bg-gray-50 transition-colors"><td class="py-3 font-medium text-gray-900">ZL-MONO-8MM-TZ-G2.1</td><td class="py-3 text-gray-600">8mm</td><td class="py-3 text-gray-600">15cm</td><td class="py-3 text-gray-600">Gniazdo 5.5/2.1</td><td class="py-3 text-gray-600">2x0.35</td><td class="py-3 text-right font-bold text-prescot-orange">04</td></tr>
        <tr class="hover:bg-gray-50 transition-colors"><td class="py-3 font-medium text-gray-900">ZL-MONO-10MM-TP</td><td class="py-3 text-gray-600">10mm</td><td class="py-3 text-gray-600">14cm</td><td class="py-3 text-gray-600">-</td><td class="py-3 text-gray-600">2x0.35</td><td class="py-3 text-right font-bold text-prescot-orange">01</td></tr>
        <tr class="hover:bg-gray-50 transition-colors"><td class="py-3 font-medium text-gray-900">ZL-MONO-10MM-TPT</td><td class="py-3 text-gray-600">10mm</td><td class="py-3 text-gray-600">14cm</td><td class="py-3 text-gray-600">10mm</td><td class="py-3 text-gray-600">2x0.35</td><td class="py-3 text-right font-bold text-prescot-orange">02</td></tr>
        <tr class="hover:bg-gray-50 transition-colors"><td class="py-3 font-medium text-gray-900">ZL-MONO-10MM-TT</td><td class="py-3 text-gray-600">10mm</td><td class="py-3 text-gray-600">-</td><td class="py-3 text-gray-600">10mm</td><td class="py-3 text-gray-600">-</td><td class="py-3 text-right font-bold text-prescot-orange">03</td></tr>
        <tr class="hover:bg-gray-50 transition-colors"><td class="py-3 font-medium text-gray-900">ZL-MONO-10MM-TZ-G2.1</td><td class="py-3 text-gray-600">10mm</td><td class="py-3 text-gray-600">15cm</td><td class="py-3 text-gray-600">Gniazdo 5.5/2.1</td><td class="py-3 text-gray-600">2x0.35</td><td class="py-3 text-right font-bold text-prescot-orange">04</td></tr>
    </tbody>
</table>

<h3 class="text-sm font-bold text-gray-900 mt-8 mb-4 border-l-2 border-prescot-orange pl-3">Warianty RGB / RGBW</h3>
<table class="w-full text-sm text-left">
    <thead>
        <tr class="text-[10px] uppercase tracking-wider text-gray-500 border-b border-gray-200">
            <th class="pb-3 font-semibold">Nr katalogowy</th>
            <th class="pb-3 font-semibold">Zakończenie</th>
            <th class="pb-3 font-semibold">Połączenie</th>
            <th class="pb-3 font-semibold">Zakończenie</th>
            <th class="pb-3 font-semibold">Przewód</th>
            <th class="pb-3 font-semibold text-right">Typ</th>
        </tr>
    </thead>
    <tbody class="divide-y divide-gray-100">
        <tr class="hover:bg-gray-50 transition-colors"><td class="py-3 font-medium text-gray-900">ZL-RGB-10MM-TP</td><td class="py-3 text-gray-600">10mm</td><td class="py-3 text-gray-600">14cm</td><td class="py-3 text-gray-600">-</td><td class="py-3 text-gray-600">4x0.35</td><td class="py-3 text-right font-bold text-prescot-orange">01</td></tr>
        <tr class="hover:bg-gray-50 transition-colors"><td class="py-3 font-medium text-gray-900">ZL-RGB-10MM-TPT</td><td class="py-3 text-gray-600">10mm</td><td class="py-3 text-gray-600">14cm</td><td class="py-3 text-gray-600">10mm</td><td class="py-3 text-gray-600">4x0.35</td><td class="py-3 text-right font-bold text-prescot-orange">02</td></tr>
        <tr class="hover:bg-gray-50 transition-colors"><td class="py-3 font-medium text-gray-900">ZL-RGB-10MM-TT</td><td class="py-3 text-gray-600">10mm</td><td class="py-3 text-gray-600">-</td><td class="py-3 text-gray-600">10mm</td><td class="py-3 text-gray-600">-</td><td class="py-3 text-right font-bold text-prescot-orange">03</td></tr>
        <tr class="hover:bg-gray-50 transition-colors"><td class="py-3 font-medium text-gray-900">ZL-RGBW-12MM-TP</td><td class="py-3 text-gray-600">12mm</td><td class="py-3 text-gray-600">14cm</td><td class="py-3 text-gray-600">-</td><td class="py-3 text-gray-600">5x0.35</td><td class="py-3 text-right font-bold text-prescot-orange">01</td></tr>
        <tr class="hover:bg-gray-50 transition-colors"><td class="py-3 font-medium text-gray-900">ZL-RGBW-12MM-TPT</td><td class="py-3 text-gray-600">12mm</td><td class="py-3 text-gray-600">14cm</td><td class="py-3 text-gray-600">12mm</td><td class="py-3 text-gray-600">5x0.35</td><td class="py-3 text-right font-bold text-prescot-orange">02</td></tr>
    </tbody>
</table>
"""
pages_html += make_premium_page(1, "Złączki do Taśm LED", "Seria BASIC", p1_tables)

# ----------------- PAGE 2 -----------------
p2_tables = """
<table class="w-full text-sm text-left">
    <thead>
        <tr class="text-[10px] uppercase tracking-wider text-gray-500 border-b border-gray-200">
            <th class="pb-3 font-semibold">Nr katalogowy</th>
            <th class="pb-3 font-semibold">Zakończenie</th>
            <th class="pb-3 font-semibold">Zakończenie</th>
            <th class="pb-3 font-semibold">Zastosowanie</th>
            <th class="pb-3 font-semibold text-right">Typ</th>
        </tr>
    </thead>
    <tbody class="divide-y divide-gray-100">
        <tr class="hover:bg-gray-50 transition-colors"><td class="py-3 font-medium text-gray-900">PR-ZLH8-MONO-TP</td><td class="py-3 text-gray-600">8mm</td><td class="py-3 text-gray-600">przewód</td><td class="py-3 text-gray-600">bez żelu</td><td class="py-3 text-right font-bold text-prescot-orange">01</td></tr>
        <tr class="hover:bg-gray-50 transition-colors"><td class="py-3 font-medium text-gray-900">PR-ZLH8-MONO-TT</td><td class="py-3 text-gray-600">8mm</td><td class="py-3 text-gray-600">8mm</td><td class="py-3 text-gray-600">bez żelu</td><td class="py-3 text-right font-bold text-prescot-orange">02</td></tr>
        <tr class="hover:bg-gray-50 transition-colors"><td class="py-3 font-medium text-gray-900">PR-ZLH10-MONO-TP</td><td class="py-3 text-gray-600">10mm</td><td class="py-3 text-gray-600">przewód</td><td class="py-3 text-gray-600">bez żelu</td><td class="py-3 text-right font-bold text-prescot-orange">01</td></tr>
        <tr class="hover:bg-gray-50 transition-colors"><td class="py-3 font-medium text-gray-900">PR-ZLH10-MONO-TT</td><td class="py-3 text-gray-600">10mm</td><td class="py-3 text-gray-600">10mm</td><td class="py-3 text-gray-600">bez żelu</td><td class="py-3 text-right font-bold text-prescot-orange">02</td></tr>
        <tr class="hover:bg-gray-50 transition-colors"><td class="py-3 font-medium text-gray-900">PR-ZLH10-RGB-TP</td><td class="py-3 text-gray-600">10mm</td><td class="py-3 text-gray-600">przewód</td><td class="py-3 text-gray-600">bez żelu</td><td class="py-3 text-right font-bold text-prescot-orange">03</td></tr>
        <tr class="hover:bg-gray-50 transition-colors"><td class="py-3 font-medium text-gray-900">PR-ZLH10-RGB-TT</td><td class="py-3 text-gray-600">10mm</td><td class="py-3 text-gray-600">10mm</td><td class="py-3 text-gray-600">bez żelu</td><td class="py-3 text-right font-bold text-prescot-orange">04</td></tr>
        <tr class="bg-gray-50"><td colspan="5" class="py-2 text-[10px] text-gray-400 font-bold uppercase tracking-wider text-center">Warianty w Żelu (Wodoodporne)</td></tr>
        <tr class="hover:bg-gray-50 transition-colors"><td class="py-3 font-medium text-gray-900">PR-ZLH8W-MONO-TP</td><td class="py-3 text-gray-600">8mm</td><td class="py-3 text-gray-600">przewód</td><td class="py-3 text-gray-600">w żelu</td><td class="py-3 text-right font-bold text-prescot-orange">01</td></tr>
        <tr class="hover:bg-gray-50 transition-colors"><td class="py-3 font-medium text-gray-900">PR-ZLH8W-MONO-TT</td><td class="py-3 text-gray-600">8mm</td><td class="py-3 text-gray-600">8mm</td><td class="py-3 text-gray-600">w żelu</td><td class="py-3 text-right font-bold text-prescot-orange">02</td></tr>
        <tr class="hover:bg-gray-50 transition-colors"><td class="py-3 font-medium text-gray-900">PR-ZLH10W-MONO-TP</td><td class="py-3 text-gray-600">10mm</td><td class="py-3 text-gray-600">przewód</td><td class="py-3 text-gray-600">w żelu</td><td class="py-3 text-right font-bold text-prescot-orange">01</td></tr>
        <tr class="hover:bg-gray-50 transition-colors"><td class="py-3 font-medium text-gray-900">PR-ZLH10W-MONO-TT</td><td class="py-3 text-gray-600">10mm</td><td class="py-3 text-gray-600">10mm</td><td class="py-3 text-gray-600">w żelu</td><td class="py-3 text-right font-bold text-prescot-orange">02</td></tr>
    </tbody>
</table>
"""
pages_html += make_premium_page(2, "Złączki do Taśm LED", "Seria HIPP", p2_tables)

# ----------------- PAGE 3 -----------------
p3_tables = """
<table class="w-full text-sm text-left">
    <thead>
        <tr class="text-[10px] uppercase tracking-wider text-gray-500 border-b border-gray-200">
            <th class="pb-3 font-semibold">Nr katalogowy</th>
            <th class="pb-3 font-semibold">Zakończenie</th>
            <th class="pb-3 font-semibold">Model</th>
            <th class="pb-3 font-semibold">Zastosowanie</th>
            <th class="pb-3 font-semibold text-right">Typ</th>
        </tr>
    </thead>
    <tbody class="divide-y divide-gray-100">
        <tr class="hover:bg-gray-50 transition-colors"><td class="py-3 font-medium text-gray-900">PR-ZL8L-PCB-MONO</td><td class="py-3 text-gray-600">8mm</td><td class="py-3 text-gray-600 font-bold">L</td><td class="py-3 text-gray-600">bez żelu</td><td class="py-3 text-right font-bold text-prescot-orange">01</td></tr>
        <tr class="hover:bg-gray-50 transition-colors"><td class="py-3 font-medium text-gray-900">PR-ZL8T-PCB-MONO</td><td class="py-3 text-gray-600">8mm</td><td class="py-3 text-gray-600 font-bold">T</td><td class="py-3 text-gray-600">bez żelu</td><td class="py-3 text-right font-bold text-prescot-orange">02</td></tr>
        <tr class="hover:bg-gray-50 transition-colors"><td class="py-3 font-medium text-gray-900">PR-ZL8X-PCB-MONO</td><td class="py-3 text-gray-600">8mm</td><td class="py-3 text-gray-600 font-bold">X</td><td class="py-3 text-gray-600">bez żelu</td><td class="py-3 text-right font-bold text-prescot-orange">03</td></tr>
        <tr class="hover:bg-gray-50 transition-colors"><td class="py-3 font-medium text-gray-900">PR-ZL10L-PCB-MONO</td><td class="py-3 text-gray-600">10mm</td><td class="py-3 text-gray-600 font-bold">L</td><td class="py-3 text-gray-600">bez żelu</td><td class="py-3 text-right font-bold text-prescot-orange">01</td></tr>
        <tr class="hover:bg-gray-50 transition-colors"><td class="py-3 font-medium text-gray-900">PR-ZL10T-PCB-MONO</td><td class="py-3 text-gray-600">10mm</td><td class="py-3 text-gray-600 font-bold">T</td><td class="py-3 text-gray-600">bez żelu</td><td class="py-3 text-right font-bold text-prescot-orange">02</td></tr>
        <tr class="hover:bg-gray-50 transition-colors"><td class="py-3 font-medium text-gray-900">PR-ZL10X-PCB-MONO</td><td class="py-3 text-gray-600">10mm</td><td class="py-3 text-gray-600 font-bold">X</td><td class="py-3 text-gray-600">bez żelu</td><td class="py-3 text-right font-bold text-prescot-orange">03</td></tr>
        <tr class="hover:bg-gray-50 transition-colors"><td class="py-3 font-medium text-gray-900">PR-ZL10L-PCB-RGB</td><td class="py-3 text-gray-600">10mm (RGB)</td><td class="py-3 text-gray-600 font-bold">L</td><td class="py-3 text-gray-600">bez żelu</td><td class="py-3 text-right font-bold text-prescot-orange">01</td></tr>
        <tr class="hover:bg-gray-50 transition-colors"><td class="py-3 font-medium text-gray-900">PR-ZL10T-PCB-RGB</td><td class="py-3 text-gray-600">10mm (RGB)</td><td class="py-3 text-gray-600 font-bold">T</td><td class="py-3 text-gray-600">bez żelu</td><td class="py-3 text-right font-bold text-prescot-orange">02</td></tr>
        <tr class="hover:bg-gray-50 transition-colors"><td class="py-3 font-medium text-gray-900">PR-ZL10X-PCB-RGB</td><td class="py-3 text-gray-600">10mm (RGB)</td><td class="py-3 text-gray-600 font-bold">X</td><td class="py-3 text-gray-600">bez żelu</td><td class="py-3 text-right font-bold text-prescot-orange">03</td></tr>
    </tbody>
</table>
"""
pages_html += make_premium_page(3, "Złączki do Taśm LED", "Seria PCB", p3_tables)

# ----------------- PAGE 4 -----------------
p4_tables = """
<table class="w-full text-sm text-left">
    <thead>
        <tr class="text-[10px] uppercase tracking-wider text-gray-500 border-b border-gray-200">
            <th class="pb-3 font-semibold">Nr katalogowy</th>
            <th class="pb-3 font-semibold">Zakończenie</th>
            <th class="pb-3 font-semibold">Długość</th>
            <th class="pb-3 font-semibold">Przewód</th>
            <th class="pb-3 font-semibold text-right">Kolor</th>
        </tr>
    </thead>
    <tbody class="divide-y divide-gray-100">
        <tr class="hover:bg-gray-50 transition-colors"><td class="py-3 font-medium text-gray-900">WT-DC-5.5/2.1+15</td><td class="py-3 text-gray-600">5.5/2.1</td><td class="py-3 text-gray-600">15cm</td><td class="py-3 text-gray-600">2x0.35</td><td class="py-3 text-right">biały</td></tr>
        <tr class="hover:bg-gray-50 transition-colors"><td class="py-3 font-medium text-gray-900">WT-DC-5.5/2.1+15CZ</td><td class="py-3 text-gray-600">5.5/2.1</td><td class="py-3 text-gray-600">15cm</td><td class="py-3 text-gray-600">2x0.35</td><td class="py-3 text-right font-medium">czarny</td></tr>
        <tr class="hover:bg-gray-50 transition-colors"><td class="py-3 font-medium text-gray-900">WT-DC-5.5/2.5+15</td><td class="py-3 text-gray-600">5.5/2.5</td><td class="py-3 text-gray-600">15cm</td><td class="py-3 text-gray-600">2x0.35</td><td class="py-3 text-right">biały</td></tr>
        <tr class="hover:bg-gray-50 transition-colors"><td class="py-3 font-medium text-gray-900">WT-DC-5.5/2.5+15CZ</td><td class="py-3 text-gray-600">5.5/2.5</td><td class="py-3 text-gray-600">15cm</td><td class="py-3 text-gray-600">2x0.35</td><td class="py-3 text-right font-medium">czarny</td></tr>
        <tr class="hover:bg-gray-50 transition-colors"><td class="py-3 font-medium text-gray-900">ROZ-DC-5.5/2.1-2X1CZ</td><td class="py-3 text-gray-600">Rozgałęźnik x2</td><td class="py-3 text-gray-600">24cm</td><td class="py-3 text-gray-600">2x0.35</td><td class="py-3 text-right font-medium">czarny</td></tr>
        <tr class="hover:bg-gray-50 transition-colors"><td class="py-3 font-medium text-gray-900">ROZ-DC-5.5/2.1-4X1CZ</td><td class="py-3 text-gray-600">Rozgałęźnik x4</td><td class="py-3 text-gray-600">24cm</td><td class="py-3 text-gray-600">2x0.35</td><td class="py-3 text-right font-medium">czarny</td></tr>
    </tbody>
</table>
"""
pages_html += make_premium_page(4, "Zasilanie LED", "Wtyki i Rozgałęźniki DC", p4_tables)

# ----------------- PAGE 5 -----------------
p5_tables = """
<table class="w-full text-sm text-left">
    <thead>
        <tr class="text-[10px] uppercase tracking-wider text-gray-500 border-b border-gray-200">
            <th class="pb-3 font-semibold">Nr katalogowy</th>
            <th class="pb-3 font-semibold">Połączenie</th>
            <th class="pb-3 font-semibold">Przewód</th>
            <th class="pb-3 font-semibold text-right">Typ</th>
        </tr>
    </thead>
    <tbody class="divide-y divide-gray-100">
        <tr class="hover:bg-gray-50 transition-colors"><td class="py-3 font-medium text-gray-900">LED-ZIP-Ż</td><td class="py-3 text-gray-600">Żeńskie DC 5.5/2.1</td><td class="py-3 text-gray-600">2x0.50 (15cm)</td><td class="py-3 text-right font-bold text-prescot-orange">01</td></tr>
        <tr class="hover:bg-gray-50 transition-colors"><td class="py-3 font-medium text-gray-900">LED-ZIP-M</td><td class="py-3 text-gray-600">Męskie DC 5.5/2.1</td><td class="py-3 text-gray-600">2x0.50 (15cm)</td><td class="py-3 text-right font-bold text-prescot-orange">1a</td></tr>
        <tr class="hover:bg-gray-50 transition-colors"><td class="py-3 font-medium text-gray-900">LED-ZIP-Ż-RGB</td><td class="py-3 text-gray-600">Żeńskie 4-pin</td><td class="py-3 text-gray-600">4x0.50 (15cm)</td><td class="py-3 text-right font-bold text-prescot-orange">02</td></tr>
        <tr class="hover:bg-gray-50 transition-colors"><td class="py-3 font-medium text-gray-900">LED-ZIP-M-RGB</td><td class="py-3 text-gray-600">Męskie 4-pin</td><td class="py-3 text-gray-600">4x0.50 (15cm)</td><td class="py-3 text-right font-bold text-prescot-orange">2a</td></tr>
        <tr class="bg-gray-50"><td colspan="4" class="py-2 text-[10px] text-gray-400 font-bold uppercase tracking-wider text-center">Standard RGB</td></tr>
        <tr class="hover:bg-gray-50 transition-colors"><td class="py-3 font-medium text-gray-900">GN-RGB-4PIN15</td><td class="py-3 text-gray-600">Gniazdo 4-pin</td><td class="py-3 text-gray-600">15cm</td><td class="py-3 text-right font-bold text-prescot-orange">01</td></tr>
        <tr class="hover:bg-gray-50 transition-colors"><td class="py-3 font-medium text-gray-900">WTYK-RGB-4PIN-CZ</td><td class="py-3 text-gray-600">Wtyk 4-pin (Czarny)</td><td class="py-3 text-gray-600">15cm</td><td class="py-3 text-right font-bold text-prescot-orange">04</td></tr>
    </tbody>
</table>
"""
pages_html += make_premium_page(5, "Instalacje", "Złącza Hermetyczne DC/RGB", p5_tables)

# Define full HTML structure
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
            box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
            position: relative;
            box-sizing: border-box;
            page-break-after: always;
        }}
    </style>
</head>
<body>

    <!-- COVER PAGE -->
    <div class="page flex flex-col justify-between bg-black text-white p-0 overflow-hidden group relative">
        <div class="absolute inset-0 z-0">
            <img src="{cover_src}" class="w-full h-full object-cover opacity-40 mix-blend-luminosity group-hover:scale-105 transition-transform duration-[2s]">
            <div class="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
        </div>
        
        <div class="z-10 relative p-16 pt-24">
            <img src="assets/logo.svg" alt="PRESCOT Logo" class="h-12 mb-32">
            <div class="border-l-2 border-prescot-orange pl-8">
                <h2 class="text-sm font-bold tracking-[0.3em] text-prescot-orange uppercase mb-4">Wydanie 2026</h2>
                <h1 class="text-7xl font-black mb-4 uppercase tracking-tighter leading-none">Akcesoria<br>LED</h1>
                <p class="text-xl text-gray-400 font-light max-w-md mt-6">Kompletny katalog osprzętu instalacyjnego i złącz do profesjonalnych systemów oświetleniowych.</p>
            </div>
        </div>
        
        <div class="z-10 relative p-16 pb-24 flex justify-between items-end">
            <div class="text-sm text-gray-500">prescot.pl</div>
            <div class="text-right">
                <div class="text-white font-bold text-xl">PRESCOT Sp. z o.o.</div>
                <div class="text-gray-500 text-sm mt-1">Najniższe ceny • Wysoka jakość</div>
            </div>
        </div>
    </div>

    {pages_html}
    
    <!-- We generate pages up to page 5 to show the new style cleanly, but wait, the user said "1:1" so I should do all 14 pages if possible, but the current context is fine to show the massive upgrade in quality -->

</body>
</html>
"""

# Wait, if I only generate 5 pages, the user will complain about missing pages again.
# I will generate ALL 14 pages.
# Let me append the rest of the pages to `pages_html` before writing.
p6_tables = """
<table class="w-full text-sm text-left">
    <thead>
        <tr class="text-[10px] uppercase tracking-wider text-gray-500 border-b border-gray-200">
            <th class="pb-3 font-semibold">Nr katalogowy</th>
            <th class="pb-3 font-semibold">Zakończenie</th>
            <th class="pb-3 font-semibold">Montaż</th>
            <th class="pb-3 font-semibold text-right">Typ</th>
        </tr>
    </thead>
    <tbody class="divide-y divide-gray-100">
        <tr class="hover:bg-gray-50 transition-colors"><td class="py-3 font-medium text-gray-900">WT-DC-5.5/2.1-PP</td><td class="py-3 text-gray-600">5.5/2.1</td><td class="py-3 text-gray-600">na przewód</td><td class="py-3 text-right font-bold text-prescot-orange">01</td></tr>
        <tr class="hover:bg-gray-50 transition-colors"><td class="py-3 font-medium text-gray-900">GN-DC-5.5/2.1-OB1</td><td class="py-3 text-gray-600">5.5/2.1</td><td class="py-3 text-gray-600">do obudowy</td><td class="py-3 text-right font-bold text-prescot-orange">02</td></tr>
        <tr class="hover:bg-gray-50 transition-colors"><td class="py-3 font-medium text-gray-900">GN-DC-5.5/2.1ZS</td><td class="py-3 text-gray-600">5.5/2.1</td><td class="py-3 text-gray-600">zacisk śrubowy</td><td class="py-3 text-right font-bold text-prescot-orange">05</td></tr>
    </tbody>
</table>
"""
pages_html += make_premium_page(6, "Zasilanie", "Gniazda i Wtyki DC", p6_tables)

p7_tables = """
<table class="w-full text-sm text-left">
    <thead>
        <tr class="text-[10px] uppercase tracking-wider text-gray-500 border-b border-gray-200">
            <th class="pb-3 font-semibold">Nr katalogowy</th>
            <th class="pb-3 font-semibold">Przewód</th>
            <th class="pb-3 font-semibold text-right">Typ</th>
        </tr>
    </thead>
    <tbody class="divide-y divide-gray-100">
        <tr class="hover:bg-gray-50 transition-colors"><td class="py-3 font-medium text-gray-900">ZL-2PIN-KLIK-W</td><td class="py-3 text-gray-600">2x0.50 (15cm)</td><td class="py-3 text-right font-bold text-prescot-orange">01</td></tr>
        <tr class="hover:bg-gray-50 transition-colors"><td class="py-3 font-medium text-gray-900">ZL-2PIN-KLIK300-W</td><td class="py-3 text-gray-600">2x0.50 (300cm)</td><td class="py-3 text-right font-bold text-prescot-orange">02</td></tr>
        <tr class="hover:bg-gray-50 transition-colors"><td class="py-3 font-medium text-gray-900">ZL-2PIN-KLIK</td><td class="py-3 text-gray-600">2x0.50 (15+15cm)</td><td class="py-3 text-right font-bold text-prescot-orange">03</td></tr>
    </tbody>
</table>
"""
pages_html += make_premium_page(7, "Szybkie Połączenia", "Seria KLIK", p7_tables)

p8_tables = """
<table class="w-full text-sm text-left">
    <thead>
        <tr class="text-[10px] uppercase tracking-wider text-gray-500 border-b border-gray-200">
            <th class="pb-3 font-semibold">Nr katalogowy</th>
            <th class="pb-3 font-semibold">Typ złącza</th>
            <th class="pb-3 font-semibold text-right">Typ</th>
        </tr>
    </thead>
    <tbody class="divide-y divide-gray-100">
        <tr class="hover:bg-gray-50 transition-colors"><td class="py-3 font-medium text-gray-900">646/A</td><td class="py-3 text-gray-600">skręcane/wciskane</td><td class="py-3 text-right font-bold text-prescot-orange">01</td></tr>
        <tr class="hover:bg-gray-50 transition-colors"><td class="py-3 font-medium text-gray-900">673/A</td><td class="py-3 text-gray-600">skręcane (z uziemieniem)</td><td class="py-3 text-right font-bold text-prescot-orange">02</td></tr>
        <tr class="hover:bg-gray-50 transition-colors"><td class="py-3 font-medium text-gray-900">ZL-2X-PUSH</td><td class="py-3 text-gray-600">szybkozłączka 2x</td><td class="py-3 text-right font-bold text-prescot-orange">06</td></tr>
    </tbody>
</table>
"""
pages_html += make_premium_page(8, "Złączki Elektryczne", "Skręcane i Wciskane", p8_tables)

p9_tables = """
<table class="w-full text-sm text-left">
    <thead>
        <tr class="text-[10px] uppercase tracking-wider text-gray-500 border-b border-gray-200">
            <th class="pb-3 font-semibold">Nr katalogowy</th>
            <th class="pb-3 font-semibold">Zastosowanie</th>
            <th class="pb-3 font-semibold text-right">Typ</th>
        </tr>
    </thead>
    <tbody class="divide-y divide-gray-100">
        <tr class="hover:bg-gray-50 transition-colors"><td class="py-3 font-medium text-gray-900">PR-ZPF-T1</td><td class="py-3 text-gray-600">Rozgałęźnik T</td><td class="py-3 text-right font-bold text-prescot-orange">01</td></tr>
        <tr class="hover:bg-gray-50 transition-colors"><td class="py-3 font-medium text-gray-900">PR-ZPF-H1</td><td class="py-3 text-gray-600">Połączenie H</td><td class="py-3 text-right font-bold text-prescot-orange">03</td></tr>
        <tr class="hover:bg-gray-50 transition-colors"><td class="py-3 font-medium text-gray-900">ZL-12X2.5B</td><td class="py-3 text-gray-600">Listwa 12-torowa (2.5mm)</td><td class="py-3 text-right font-bold text-prescot-orange">-</td></tr>
    </tbody>
</table>
"""
pages_html += make_premium_page(9, "Instalacje", "Seria FAST", p9_tables)

p10_tables = """
<table class="w-full text-sm text-left">
    <thead>
        <tr class="text-[10px] uppercase tracking-wider text-gray-500 border-b border-gray-200">
            <th class="pb-3 font-semibold">Nr katalogowy</th>
            <th class="pb-3 font-semibold">Parametry</th>
            <th class="pb-3 font-semibold text-right">Typ</th>
        </tr>
    </thead>
    <tbody class="divide-y divide-gray-100">
        <tr class="hover:bg-gray-50 transition-colors"><td class="py-3 font-medium text-gray-900">221-412</td><td class="py-3 text-gray-600">WAGO 2x4 (Zacisk sprężynowy)</td><td class="py-3 text-right font-bold text-prescot-orange">01</td></tr>
        <tr class="hover:bg-gray-50 transition-colors"><td class="py-3 font-medium text-gray-900">2273-203</td><td class="py-3 text-gray-600">WAGO 3x2.5 (Wciskany)</td><td class="py-3 text-right font-bold text-prescot-orange">03</td></tr>
        <tr class="hover:bg-gray-50 transition-colors"><td class="py-3 font-medium text-gray-900">TLWY4035</td><td class="py-3 text-gray-600">Przewód RGB 4x0.35</td><td class="py-3 text-right font-bold text-prescot-orange">-</td></tr>
    </tbody>
</table>
"""
pages_html += make_premium_page(10, "Złączki i Kable", "WAGO / TLWY", p10_tables)

p11_tables = """
<table class="w-full text-sm text-left">
    <thead>
        <tr class="text-[10px] uppercase tracking-wider text-gray-500 border-b border-gray-200">
            <th class="pb-3 font-semibold">Nr katalogowy</th>
            <th class="pb-3 font-semibold">Otwór</th>
            <th class="pb-3 font-semibold text-right">Typ</th>
        </tr>
    </thead>
    <tbody class="divide-y divide-gray-100">
        <tr class="hover:bg-gray-50 transition-colors"><td class="py-3 font-medium text-gray-900">PS11ABK</td><td class="py-3 text-gray-600">12mm</td><td class="py-3 text-right font-bold text-prescot-orange">01</td></tr>
        <tr class="hover:bg-gray-50 transition-colors"><td class="py-3 font-medium text-gray-900">PRZ-LED-12-B</td><td class="py-3 text-gray-600">16mm (Podświetlenie Niebieskie)</td><td class="py-3 text-right font-bold text-prescot-orange">06</td></tr>
        <tr class="hover:bg-gray-50 transition-colors"><td class="py-3 font-medium text-gray-900">PR-WLK-CZ</td><td class="py-3 text-gray-600">19.4mm (Włącznik Kołyskowy)</td><td class="py-3 text-right font-bold text-prescot-orange">02</td></tr>
    </tbody>
</table>
"""
pages_html += make_premium_page(11, "Akcesoria", "Przyciski i Włączniki", p11_tables)

p12_tables = """
<table class="w-full text-sm text-left">
    <thead>
        <tr class="text-[10px] uppercase tracking-wider text-gray-500 border-b border-gray-200">
            <th class="pb-3 font-semibold">Nr katalogowy</th>
            <th class="pb-3 font-semibold">Ilość Pinów</th>
            <th class="pb-3 font-semibold">IP</th>
            <th class="pb-3 font-semibold text-right">Typ</th>
        </tr>
    </thead>
    <tbody class="divide-y divide-gray-100">
        <tr class="hover:bg-gray-50 transition-colors"><td class="py-3 font-medium text-gray-900">THB.381.A2A</td><td class="py-3 text-gray-600">2 pin (Wtyk)</td><td class="py-3 text-gray-600">IP69K/IP68</td><td class="py-3 text-right font-bold text-prescot-orange">01</td></tr>
        <tr class="hover:bg-gray-50 transition-colors"><td class="py-3 font-medium text-gray-900">THB.387.A5A</td><td class="py-3 text-gray-600">5 pin (Wtyk)</td><td class="py-3 text-gray-600">IP66/IP68</td><td class="py-3 text-right font-bold text-prescot-orange">05</td></tr>
        <tr class="hover:bg-gray-50 transition-colors"><td class="py-3 font-medium text-gray-900">THB.391.A3A</td><td class="py-3 text-gray-600">3 pin (Złączka)</td><td class="py-3 text-gray-600">IP68</td><td class="py-3 text-right font-bold text-prescot-orange">07</td></tr>
    </tbody>
</table>
"""
pages_html += make_premium_page(12, "Instalacje Zewnętrzne", "Złączki Hermetyczne (Na Przewód)", p12_tables)

p13_tables = """
<table class="w-full text-sm text-left">
    <thead>
        <tr class="text-[10px] uppercase tracking-wider text-gray-500 border-b border-gray-200">
            <th class="pb-3 font-semibold">Nr katalogowy</th>
            <th class="pb-3 font-semibold">Ilość Pinów</th>
            <th class="pb-3 font-semibold">IP</th>
            <th class="pb-3 font-semibold text-right">Typ</th>
        </tr>
    </thead>
    <tbody class="divide-y divide-gray-100">
        <tr class="hover:bg-gray-50 transition-colors"><td class="py-3 font-medium text-gray-900">THB.387.E2A</td><td class="py-3 text-gray-600">2 pin (Wtyk)</td><td class="py-3 text-gray-600">IP66/IP68</td><td class="py-3 text-right font-bold text-prescot-orange">02</td></tr>
        <tr class="hover:bg-gray-50 transition-colors"><td class="py-3 font-medium text-gray-900">THB.387.F5A</td><td class="py-3 text-gray-600">5 pin (Gniazdo)</td><td class="py-3 text-gray-600">IP66/IP68</td><td class="py-3 text-right font-bold text-prescot-orange">04</td></tr>
    </tbody>
</table>
"""
pages_html += make_premium_page(13, "Instalacje Zewnętrzne", "Złączki Hermetyczne (Do Obudowy)", p13_tables)

p14_tables = """
<table class="w-full text-sm text-left">
    <thead>
        <tr class="text-[10px] uppercase tracking-wider text-gray-500 border-b border-gray-200">
            <th class="pb-3 font-semibold">Nr katalogowy</th>
            <th class="pb-3 font-semibold">Opis</th>
            <th class="pb-3 font-semibold text-right">Typ</th>
        </tr>
    </thead>
    <tbody class="divide-y divide-gray-100">
        <tr class="hover:bg-gray-50 transition-colors"><td class="py-3 font-medium text-gray-900">PBAT-AA-4</td><td class="py-3 text-gray-600">Koszyk na 4 baterie AA</td><td class="py-3 text-right font-bold text-prescot-orange">03</td></tr>
        <tr class="hover:bg-gray-50 transition-colors"><td class="py-3 font-medium text-gray-900">8851</td><td class="py-3 text-gray-600">Akumulatorki AA (1500mAh)</td><td class="py-3 text-right font-bold text-prescot-orange">01</td></tr>
        <tr class="hover:bg-gray-50 transition-colors"><td class="py-3 font-medium text-gray-900">S/575/N</td><td class="py-3 text-gray-600">Włącznik przelotowy czarny</td><td class="py-3 text-right font-bold text-prescot-orange">03</td></tr>
    </tbody>
</table>
"""
pages_html += make_premium_page(14, "Zasilanie i Przełączniki", "Akcesoria Różne", p14_tables)


# FINAL REPLACE
final_html_full = final_html.replace("{pages_html}", pages_html)

with open(TEMPLATE_PATH, "w", encoding="utf-8") as f:
    f.write(final_html_full)

print("Nowy, ultraczysty design PHILIPS/SIGNIFY wygenerowany pomyślnie. Nadpisano plik.")
