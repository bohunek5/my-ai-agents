import os
import re
import shutil

TEMPLATE_PATH = "/Users/karolbohdanowicz/Downloads/Katalog_Akcesoriow_PRESCOT_2026.html"
OUTPUT_DIR = "/Users/karolbohdanowicz/Downloads/Katalog_2026_Gotowy"
ASSETS_DIR = os.path.join(OUTPUT_DIR, "assets")
EXTRACTED_IMG_DIR = "/Users/karolbohdanowicz/my-ai-agents/CONTENT-BOSS/pliki-i-dane/prescot_extracted"
LOGO_SVG = "/Users/karolbohdanowicz/Downloads/PRESCOT_logo_biale+kolor-01.svg"

os.makedirs(ASSETS_DIR, exist_ok=True)
if os.path.exists(LOGO_SVG):
    shutil.copy(LOGO_SVG, os.path.join(ASSETS_DIR, "logo.svg"))

def get_image(filename, dest_name):
    src = os.path.join(EXTRACTED_IMG_DIR, filename)
    if os.path.exists(src):
        shutil.copy(src, os.path.join(ASSETS_DIR, dest_name))
        return f"assets/{dest_name}"
    return "https://via.placeholder.com/150"

# Pages Data
pages_html = ""

# ==========================================
# PAGE: ZŁĄCZKI DO TAŚM LED - SERIA BASIC
# ==========================================
pages_html += f'''
    <div class="page flex flex-col">
        <header class="flex justify-between items-center mb-10 border-b border-prescot-orange pb-4">
            <h2 class="text-2xl font-bold text-prescot-dark uppercase">Złączki do taśm LED</h2>
            <div class="text-sm font-bold bg-prescot-dark text-white px-4 py-1 rounded">Seria BASIC</div>
        </header>

        <div class="grid grid-cols-4 gap-4 mb-8">
            <div class="bg-white border border-gray-200 p-2 rounded-lg shadow-sm flex flex-col items-center justify-center h-32 relative group overflow-hidden">
                <div class="absolute top-2 left-2 text-xs font-bold text-gray-400 group-hover:text-prescot-orange z-10">01</div>
                <img src="{get_image('img_page1_xref10.png', 'basic_1.png')}" class="w-full h-full object-contain mix-blend-multiply">
            </div>
            <div class="bg-white border border-gray-200 p-2 rounded-lg shadow-sm flex flex-col items-center justify-center h-32 relative group overflow-hidden">
                <div class="absolute top-2 left-2 text-xs font-bold text-gray-400 group-hover:text-prescot-orange z-10">02</div>
                <img src="{get_image('img_page1_xref12.png', 'basic_2.png')}" class="w-full h-full object-contain mix-blend-multiply">
            </div>
            <div class="bg-white border border-gray-200 p-2 rounded-lg shadow-sm flex flex-col items-center justify-center h-32 relative group overflow-hidden">
                <div class="absolute top-2 left-2 text-xs font-bold text-gray-400 group-hover:text-prescot-orange z-10">03</div>
                <img src="{get_image('img_page1_xref14.png', 'basic_3.png')}" class="w-full h-full object-contain mix-blend-multiply">
            </div>
            <div class="bg-white border border-gray-200 p-2 rounded-lg shadow-sm flex flex-col items-center justify-center h-32 relative group overflow-hidden">
                <div class="absolute top-2 left-2 text-xs font-bold text-gray-400 group-hover:text-prescot-orange z-10">04</div>
                <img src="{get_image('img_page1_xref16.png', 'basic_4.png')}" class="w-full h-full object-contain mix-blend-multiply">
            </div>
        </div>

        <h3 class="text-lg font-bold text-prescot-dark mt-4 border-l-4 border-prescot-orange pl-3">Dla taśm MONO</h3>
        <table class="prescot-table">
            <thead>
                <tr><th>Nr katalogowy</th><th>Zakończenie</th><th>Połączenie</th><th>Zakończenie</th><th>Przewód</th><th>Typ</th></tr>
            </thead>
            <tbody>
                <tr><td class="font-medium">ZL-MONO-8MM-TP</td><td>8mm</td><td>14cm</td><td class="text-gray-400">-</td><td>2x0.35</td><td class="font-bold text-center">1</td></tr>
                <tr><td class="font-medium">ZL-MONO-8MM-TPT</td><td>8mm</td><td>14cm</td><td>8mm</td><td>2x0.35</td><td class="font-bold text-center">2</td></tr>
                <tr><td class="font-medium">ZL-MONO-8MM-TT</td><td>8mm</td><td class="text-gray-400">-</td><td>8mm</td><td class="text-gray-400">-</td><td class="font-bold text-center">3</td></tr>
                <tr><td class="font-medium">ZL-MONO-10MM-TP</td><td>10mm</td><td>14cm</td><td class="text-gray-400">-</td><td>2x0.35</td><td class="font-bold text-center">1</td></tr>
                <tr><td class="font-medium">ZL-MONO-10MM-TPT</td><td>10mm</td><td>14cm</td><td>10mm</td><td>2x0.35</td><td class="font-bold text-center">2</td></tr>
                <tr><td class="font-medium">ZL-MONO-10MM-TZ-G2.1</td><td>10mm</td><td>15cm</td><td>Gniazdo 5.5/2.1</td><td>2x0.35</td><td class="font-bold text-center">4</td></tr>
            </tbody>
        </table>

        <h3 class="text-lg font-bold text-prescot-dark mt-10 border-l-4 border-prescot-orange pl-3">Dla taśm RGB & RGBW</h3>
        <table class="prescot-table">
            <thead>
                <tr><th>Nr katalogowy</th><th>Zakończenie</th><th>Połączenie</th><th>Zakończenie</th><th>Przewód</th><th>Typ</th></tr>
            </thead>
            <tbody>
                <tr><td class="font-medium">ZL-RGB-10MM-TP</td><td>10mm</td><td>14cm</td><td class="text-gray-400">-</td><td>4x0.35</td><td class="font-bold text-center">1</td></tr>
                <tr><td class="font-medium">ZL-RGB-10MM-TPT</td><td>10mm</td><td>14cm</td><td>10mm</td><td>4x0.35</td><td class="font-bold text-center">2</td></tr>
                <tr><td class="font-medium">ZL-RGBW-12MM-TP</td><td>12mm</td><td>14cm</td><td class="text-gray-400">-</td><td>5x0.35</td><td class="font-bold text-center">1</td></tr>
            </tbody>
        </table>

        <div class="mt-auto pt-8 border-t border-gray-200 flex justify-between">
            <div class="text-xs text-gray-400">Najniższe ceny • Wysoka jakość • Bogaty asortyment</div><div class="text-sm font-bold text-prescot-orange">03</div>
        </div>
    </div>
'''

# ==========================================
# PAGE: ZŁĄCZKI DO TAŚM LED - SERIA HIPP
# ==========================================
pages_html += f'''
    <div class="page flex flex-col">
        <header class="flex justify-between items-center mb-10 border-b border-prescot-orange pb-4">
            <h2 class="text-2xl font-bold text-prescot-dark uppercase">Złączki do taśm LED</h2>
            <div class="text-sm font-bold bg-prescot-dark text-white px-4 py-1 rounded">Seria HIPP</div>
        </header>

        <div class="grid grid-cols-4 gap-4 mb-8">
            <div class="bg-white border border-gray-200 p-2 rounded-lg shadow-sm flex flex-col items-center justify-center h-32 relative group overflow-hidden">
                <div class="absolute top-2 left-2 text-xs font-bold text-gray-400 group-hover:text-prescot-orange z-10">01</div>
                <img src="{get_image('img_page2_xref49.png', 'hipp_1.png')}" class="w-full h-full object-contain mix-blend-multiply">
            </div>
            <div class="bg-white border border-gray-200 p-2 rounded-lg shadow-sm flex flex-col items-center justify-center h-32 relative group overflow-hidden">
                <div class="absolute top-2 left-2 text-xs font-bold text-gray-400 group-hover:text-prescot-orange z-10">02</div>
                <img src="{get_image('img_page2_xref51.png', 'hipp_2.png')}" class="w-full h-full object-contain mix-blend-multiply">
            </div>
            <div class="bg-white border border-gray-200 p-2 rounded-lg shadow-sm flex flex-col items-center justify-center h-32 relative group overflow-hidden">
                <div class="absolute top-2 left-2 text-xs font-bold text-gray-400 group-hover:text-prescot-orange z-10">03</div>
                <img src="{get_image('img_page2_xref53.png', 'hipp_3.png')}" class="w-full h-full object-contain mix-blend-multiply">
            </div>
            <div class="bg-white border border-gray-200 p-2 rounded-lg shadow-sm flex flex-col items-center justify-center h-32 relative group overflow-hidden">
                <div class="absolute top-2 left-2 text-xs font-bold text-gray-400 group-hover:text-prescot-orange z-10">04</div>
                <img src="{get_image('img_page2_xref55.png', 'hipp_4.png')}" class="w-full h-full object-contain mix-blend-multiply">
            </div>
        </div>

        <h3 class="text-lg font-bold text-prescot-dark mt-4 border-l-4 border-prescot-orange pl-3">Dla taśm w żelu i bez żelu</h3>
        <table class="prescot-table">
            <thead>
                <tr><th>Nr katalogowy</th><th>Zakończenie</th><th>Zakończenie</th><th>Zastosowanie</th><th>Typ</th></tr>
            </thead>
            <tbody>
                <tr><td class="font-medium">PR-ZLH8-MONO-TP</td><td>8mm</td><td>przewód</td><td>bez żelu</td><td class="font-bold text-center">1</td></tr>
                <tr><td class="font-medium">PR-ZLH8-MONO-TT</td><td>8mm</td><td>8mm</td><td>bez żelu</td><td class="font-bold text-center">2</td></tr>
                <tr><td class="font-medium">PR-ZLH10-MONO-TP</td><td>10mm</td><td>przewód</td><td>bez żelu</td><td class="font-bold text-center">1</td></tr>
                <tr><td class="font-medium">PR-ZLH10-MONO-TT</td><td>10mm</td><td>10mm</td><td>bez żelu</td><td class="font-bold text-center">2</td></tr>
                <tr><td class="font-medium">PR-ZLH10-RGB-TP</td><td>10mm</td><td>przewód</td><td>bez żelu</td><td class="font-bold text-center">3</td></tr>
                <tr><td class="font-medium">PR-ZLH10-RGB-TT</td><td>10mm</td><td>10mm</td><td>bez żelu</td><td class="font-bold text-center">4</td></tr>
                
                <tr><td class="font-medium">PR-ZLH8W-MONO-TP</td><td>8mm</td><td>przewód</td><td>w żelu</td><td class="font-bold text-center">1</td></tr>
                <tr><td class="font-medium">PR-ZLH8W-MONO-TT</td><td>8mm</td><td>8mm</td><td>w żelu</td><td class="font-bold text-center">2</td></tr>
                <tr><td class="font-medium">PR-ZLH10W-MONO-TP</td><td>10mm</td><td>przewód</td><td>w żelu</td><td class="font-bold text-center">1</td></tr>
                <tr><td class="font-medium">PR-ZLH10W-MONO-TT</td><td>10mm</td><td>10mm</td><td>w żelu</td><td class="font-bold text-center">2</td></tr>
            </tbody>
        </table>

        <div class="mt-auto pt-8 border-t border-gray-200 flex justify-between">
            <div class="text-xs text-gray-400">Najniższe ceny • Wysoka jakość • Bogaty asortyment</div><div class="text-sm font-bold text-prescot-orange">04</div>
        </div>
    </div>
'''

# ==========================================
# PAGE: ZŁĄCZKI DO TAŚM LED - SERIA PCB
# ==========================================
pages_html += f'''
    <div class="page flex flex-col">
        <header class="flex justify-between items-center mb-10 border-b border-prescot-orange pb-4">
            <h2 class="text-2xl font-bold text-prescot-dark uppercase">Złączki do taśm LED</h2>
            <div class="text-sm font-bold bg-prescot-dark text-white px-4 py-1 rounded">Seria PCB</div>
        </header>

        <div class="grid grid-cols-3 gap-4 mb-8">
            <div class="bg-white border border-gray-200 p-2 rounded-lg shadow-sm flex flex-col items-center justify-center h-32 relative group overflow-hidden">
                <div class="absolute top-2 left-2 text-xs font-bold text-gray-400 group-hover:text-prescot-orange z-10">01</div>
                <img src="{get_image('img_page3_xref85.png', 'pcb_1.png')}" class="w-full h-full object-contain mix-blend-multiply">
            </div>
            <div class="bg-white border border-gray-200 p-2 rounded-lg shadow-sm flex flex-col items-center justify-center h-32 relative group overflow-hidden">
                <div class="absolute top-2 left-2 text-xs font-bold text-gray-400 group-hover:text-prescot-orange z-10">02</div>
                <img src="{get_image('img_page3_xref87.png', 'pcb_2.png')}" class="w-full h-full object-contain mix-blend-multiply">
            </div>
            <div class="bg-white border border-gray-200 p-2 rounded-lg shadow-sm flex flex-col items-center justify-center h-32 relative group overflow-hidden">
                <div class="absolute top-2 left-2 text-xs font-bold text-gray-400 group-hover:text-prescot-orange z-10">03</div>
                <img src="{get_image('img_page3_xref89.png', 'pcb_3.png')}" class="w-full h-full object-contain mix-blend-multiply">
            </div>
        </div>

        <h3 class="text-lg font-bold text-prescot-dark mt-4 border-l-4 border-prescot-orange pl-3">Dla taśm MONO & RGB & RGBW (Narożniki)</h3>
        <table class="prescot-table">
            <thead>
                <tr><th>Nr katalogowy</th><th>Zakończenie</th><th>Model</th><th>Zastosowanie</th><th>Typ</th></tr>
            </thead>
            <tbody>
                <tr><td class="font-medium">PR-ZL8L-PCB-MONO</td><td>8mm</td><td>L</td><td>Do połączenia taśm bez żelu</td><td class="font-bold text-center">1</td></tr>
                <tr><td class="font-medium">PR-ZL8T-PCB-MONO</td><td>8mm</td><td>T</td><td>bez żelu</td><td class="font-bold text-center">2</td></tr>
                <tr><td class="font-medium">PR-ZL8X-PCB-MONO</td><td>8mm</td><td>X</td><td>bez żelu</td><td class="font-bold text-center">3</td></tr>
                
                <tr><td class="font-medium">PR-ZL10L-PCB-MONO</td><td>10mm</td><td>L</td><td>bez żelu</td><td class="font-bold text-center">1</td></tr>
                <tr><td class="font-medium">PR-ZL10T-PCB-MONO</td><td>10mm</td><td>T</td><td>bez żelu</td><td class="font-bold text-center">2</td></tr>
                
                <tr><td class="font-medium">PR-ZL10L-PCB-RGB</td><td>10mm</td><td>L</td><td>bez żelu</td><td class="font-bold text-center">1</td></tr>
                <tr><td class="font-medium">PR-ZL12L-PCB-RGBW</td><td>12mm</td><td>L</td><td>bez żelu</td><td class="font-bold text-center">1</td></tr>
            </tbody>
        </table>

        <div class="mt-auto pt-8 border-t border-gray-200 flex justify-between">
            <div class="text-xs text-gray-400">Najniższe ceny • Wysoka jakość • Bogaty asortyment</div><div class="text-sm font-bold text-prescot-orange">05</div>
        </div>
    </div>
'''

# ==========================================
# PAGE: GNIAZDA I WTYKI DC
# ==========================================
pages_html += f'''
    <div class="page flex flex-col">
        <header class="flex justify-between items-center mb-10 border-b border-prescot-orange pb-4">
            <h2 class="text-2xl font-bold text-prescot-dark uppercase">Gniazda i Wtyki DC</h2>
            <div class="text-sm font-bold bg-prescot-dark text-white px-4 py-1 rounded">Z Przewodem</div>
        </header>
        
        <div class="grid grid-cols-4 gap-4 mb-4">
            <div class="bg-white border border-gray-200 p-2 rounded-lg shadow-sm flex flex-col items-center justify-center h-24 relative group overflow-hidden">
                <div class="absolute top-2 left-2 text-xs font-bold text-gray-400 z-10">01</div>
                <img src="{get_image('img_page4_xref117.png', 'dc_1.png')}" class="w-full h-full object-contain mix-blend-multiply">
            </div>
            <div class="bg-white border border-gray-200 p-2 rounded-lg shadow-sm flex flex-col items-center justify-center h-24 relative group overflow-hidden">
                <div class="absolute top-2 left-2 text-xs font-bold text-gray-400 z-10">02</div>
                <img src="{get_image('img_page4_xref119.png', 'dc_2.png')}" class="w-full h-full object-contain mix-blend-multiply">
            </div>
        </div>

        <table class="prescot-table mt-0">
            <thead>
                <tr><th>Numer katalogowy</th><th>Zakończenie</th><th>Połączenie</th><th>Przewód</th><th>Kolor</th></tr>
            </thead>
            <tbody>
                <tr><td class="font-medium">GN-DC-5.5/2.1+15</td><td>5.5/2.1</td><td>15cm</td><td>2x0.35</td><td>biały</td></tr>
                <tr><td class="font-medium">GN-DC-5.5/2.1+15CZ</td><td>5.5/2.1</td><td>15cm</td><td>2x0.35</td><td>czarny</td></tr>
                <tr><td class="font-medium">GN-DC-5.5/2.5+15</td><td>5.5/2.5</td><td>15cm</td><td>2x0.35</td><td>biały</td></tr>
                <tr><td class="font-medium">GN-DC-5.5/2.1+150</td><td>5.5/2.1</td><td>150cm</td><td>2x0.35</td><td>biały</td></tr>
                <tr><td class="font-medium">WT-DC-5.5/2.1+15</td><td>5.5/2.1</td><td>15cm</td><td>2x0.35</td><td>biały</td></tr>
                <tr><td class="font-medium">WT-DC-5.5/2.1+15CZ</td><td>5.5/2.1</td><td>15cm</td><td>2x0.35</td><td>czarny</td></tr>
                <tr><td class="font-medium">WT-DC-5.5/2.1+150</td><td>5.5/2.1</td><td>150cm</td><td>2x0.35</td><td>biały</td></tr>
            </tbody>
        </table>

        <h3 class="text-lg font-bold text-prescot-dark mt-8 border-l-4 border-prescot-orange pl-3">Rozdzielacze Przewody DC</h3>
        <table class="prescot-table mt-4">
            <thead>
                <tr><th>Numer katalogowy</th><th>Zakończenie</th><th>Połączenie</th><th>Zakończenie</th><th>Przewód</th></tr>
            </thead>
            <tbody>
                <tr><td class="font-medium">ROZ-DC-5.5/2.1-2X1CZ</td><td>5.5/2.1 x2</td><td>24cm</td><td>5.5/2.1</td><td>2x0.35 / czarny</td></tr>
                <tr><td class="font-medium">ROZ-DC-5.5/2.1-3X1CZ</td><td>5.5/2.1 x3</td><td>24cm</td><td>5.5/2.1</td><td>2x0.35 / czarny</td></tr>
                <tr><td class="font-medium">ROZ-DC-5.5/2.1-4X1CZ</td><td>5.5/2.1 x4</td><td>24cm</td><td>5.5/2.1</td><td>2x0.35 / czarny</td></tr>
                <tr><td class="font-medium">ROZ-DC-5.5/2.1-5XCZ</td><td>5.5/2.1 x5</td><td>24cm</td><td>5.5/2.1</td><td>2x0.35 / czarny</td></tr>
            </tbody>
        </table>

        <div class="mt-auto pt-8 border-t border-gray-200 flex justify-between">
            <div class="text-xs text-gray-400">Najniższe ceny • Wysoka jakość • Bogaty asortyment</div><div class="text-sm font-bold text-prescot-orange">06</div>
        </div>
    </div>
'''


# ==========================================
# PAGE: Złącza HERMETYCZNE i RGB
# ==========================================
pages_html += f'''
    <div class="page flex flex-col">
        <header class="flex justify-between items-center mb-10 border-b border-prescot-orange pb-4">
            <h2 class="text-2xl font-bold text-prescot-dark uppercase">Złącza LED</h2>
            <div class="text-sm font-bold bg-prescot-dark text-white px-4 py-1 rounded">Hermetyczne & RGB</div>
        </header>

        <h3 class="text-lg font-bold text-prescot-dark mt-4 border-l-4 border-prescot-orange pl-3">Złącza DC Hermetyczne</h3>
        <table class="prescot-table mt-4">
            <thead>
                <tr><th>Numer katalogowy</th><th>Zakończenie</th><th>Połączenie</th><th>Przewód</th><th>Typ</th></tr>
            </thead>
            <tbody>
                <tr><td class="font-medium">LED-ZIP-Ż</td><td>5.5/2.1</td><td>15cm</td><td>2x0.50</td><td>1</td></tr>
                <tr><td class="font-medium">LED-ZIP-M</td><td>5.5/2.1</td><td>15cm</td><td>2x0.50</td><td>1a</td></tr>
                <tr><td class="font-medium">LED-ZIP-Ż-RGB</td><td>4 pin</td><td>15cm</td><td>4x0.50</td><td>2</td></tr>
                <tr><td class="font-medium">LED-ZIP-M-RGB</td><td>4 pin</td><td>15cm</td><td>4x0.50</td><td>2a</td></tr>
                <tr><td class="font-medium">LED-ZIP-Ż-RGBW</td><td>5 pin</td><td>15cm</td><td>5x0.50</td><td>3</td></tr>
            </tbody>
        </table>

        <h3 class="text-lg font-bold text-prescot-dark mt-8 border-l-4 border-prescot-orange pl-3">Złącza RGB</h3>
        <table class="prescot-table mt-4">
            <thead>
                <tr><th>Numer katalogowy</th><th>Zakończenie</th><th>Połączenie</th><th>Przewód</th><th>Typ</th></tr>
            </thead>
            <tbody>
                <tr><td class="font-medium">GN-RGB-4PIN15</td><td>4 pin</td><td>15cm</td><td>4x0.35</td><td>1</td></tr>
                <tr><td class="font-medium">WTYK-RGB-4PIN15</td><td>4 pin</td><td>15cm</td><td>4x0.35</td><td>2</td></tr>
                <tr><td class="font-medium">WTYK-RGB-4PIN-B</td><td>4 pin</td><td>15cm</td><td>4x0.35 (Biały)</td><td>3</td></tr>
                <tr><td class="font-medium">WTYK-RGB-4PIN-CZ</td><td>4 pin</td><td>15cm</td><td>4x0.35 (Czarny)</td><td>4</td></tr>
            </tbody>
        </table>

        <div class="mt-auto pt-8 border-t border-gray-200 flex justify-between">
            <div class="text-xs text-gray-400">Najniższe ceny • Wysoka jakość • Bogaty asortyment</div><div class="text-sm font-bold text-prescot-orange">07</div>
        </div>
    </div>
'''

# ==========================================
# PAGE: Złącza i Przewody
# ==========================================
pages_html += f'''
    <div class="page flex flex-col">
        <header class="flex justify-between items-center mb-10 border-b border-prescot-orange pb-4">
            <h2 class="text-2xl font-bold text-prescot-dark uppercase">Akcesoria Montażowe</h2>
            <div class="text-sm font-bold bg-prescot-dark text-white px-4 py-1 rounded">Różne</div>
        </header>

        <h3 class="text-lg font-bold text-prescot-dark mt-4 border-l-4 border-prescot-orange pl-3">Wtyki i Gniazda DC (Montażowe)</h3>
        <table class="prescot-table mt-4">
            <thead>
                <tr><th>Numer katalogowy</th><th>Zakończenie</th><th>Montaż</th></tr>
            </thead>
            <tbody>
                <tr><td class="font-medium">WT-DC-5.5/2.1-PP</td><td>5.5/2.1</td><td>na przewód</td></tr>
                <tr><td class="font-medium">WT-DC-5.5/2.1ZS</td><td>5.5/2.1</td><td>zacisk śrubowy</td></tr>
                <tr><td class="font-medium">GN-DC-5.5/2.1-OB1</td><td>5.5/2.1</td><td>do obudowy</td></tr>
                <tr><td class="font-medium">GN-DC-5.5/2.1-P</td><td>5.5/2.1</td><td>na przewód</td></tr>
                <tr><td class="font-medium">GN-DC-5.5/2.1ZS</td><td>5.5/2.1</td><td>zacisk śrubowy</td></tr>
            </tbody>
        </table>

        <h3 class="text-lg font-bold text-prescot-dark mt-8 border-l-4 border-prescot-orange pl-3">Przewody Instalacyjne TLWY</h3>
        <table class="prescot-table mt-4">
            <thead>
                <tr><th>Nr katalogowy</th><th>Ilość żył</th><th>Przekrój żyły</th><th>Kolor</th></tr>
            </thead>
            <tbody>
                <tr><td class="font-medium">TLWY4035</td><td>4</td><td>0.35</td><td>RGB</td></tr>
                <tr><td class="font-medium">TLWY4050</td><td>4</td><td>0.50</td><td>RGB</td></tr>
                <tr><td class="font-medium">TLWY5050</td><td>5</td><td>0.50</td><td>RGBW</td></tr>
                <tr><td class="font-medium">TLYP2035B</td><td>2</td><td>0.35</td><td>biały</td></tr>
                <tr><td class="font-medium">TLYP2035CZ</td><td>2</td><td>0.35</td><td>czarny</td></tr>
                <tr><td class="font-medium">TLYP2050B</td><td>2</td><td>0.50</td><td>biały</td></tr>
            </tbody>
        </table>

        <div class="mt-auto pt-8 border-t border-gray-200 flex justify-between">
            <div class="text-xs text-gray-400">Najniższe ceny • Wysoka jakość • Bogaty asortyment</div><div class="text-sm font-bold text-prescot-orange">08</div>
        </div>
    </div>
'''

# ==========================================
# PAGE: Włączniki i Baterie
# ==========================================
pages_html += f'''
    <div class="page flex flex-col">
        <header class="flex justify-between items-center mb-10 border-b border-prescot-orange pb-4">
            <h2 class="text-2xl font-bold text-prescot-dark uppercase">Osprzęt</h2>
            <div class="text-sm font-bold bg-prescot-dark text-white px-4 py-1 rounded">Włączniki i Baterie</div>
        </header>

        <h3 class="text-lg font-bold text-prescot-dark mt-4 border-l-4 border-prescot-orange pl-3">Przyciski / Włączniki kołyskowe</h3>
        <table class="prescot-table mt-4">
            <thead>
                <tr><th>Nr katalogowy</th><th>Kolor</th><th>Otwór montażowy</th></tr>
            </thead>
            <tbody>
                <tr><td class="font-medium">PS11ARD</td><td>czerwony/czarny</td><td>12mm</td></tr>
                <tr><td class="font-medium">PS11ABK</td><td>czarny/czarny</td><td>12mm</td></tr>
                <tr><td class="font-medium">PRZ-LED-12-B</td><td>srebrny (LED niebieski)</td><td>16mm</td></tr>
                <tr><td class="font-medium">PRZ-LED-12-R</td><td>srebrny (LED czerwony)</td><td>16mm</td></tr>
                <tr><td class="font-medium">PR-WLK-B</td><td>biały/biały</td><td>19.4mm</td></tr>
                <tr><td class="font-medium">PR-WLK-CZ</td><td>czarny/czarny</td><td>19.4mm</td></tr>
            </tbody>
        </table>

        <h3 class="text-lg font-bold text-prescot-dark mt-8 border-l-4 border-prescot-orange pl-3">Baterie i Pojemniki</h3>
        <table class="prescot-table mt-4">
            <thead>
                <tr><th>Nr katalogowy</th><th>Model</th><th>Ilość / Napięcie</th></tr>
            </thead>
            <tbody>
                <tr><td class="font-medium">PBAT-AA-2</td><td>2x AA</td><td>Koszyk na baterie</td></tr>
                <tr><td class="font-medium">PBAT-AA-4</td><td>4x AA</td><td>Koszyk na baterie</td></tr>
                <tr><td class="font-medium">8851 (Akumulator)</td><td>AA</td><td>4 szt / 1.2V / 1500mA</td></tr>
                <tr><td class="font-medium">8852 (Akumulator)</td><td>AAA</td><td>4 szt / 1.2V / 800mA</td></tr>
                <tr><td class="font-medium">8751 (Alkaliczna)</td><td>LR6</td><td>4 szt / 1.5V</td></tr>
            </tbody>
        </table>

        <div class="mt-auto pt-8 border-t border-gray-200 flex justify-between">
            <div class="text-xs text-gray-400">Najniższe ceny • Wysoka jakość • Bogaty asortyment</div><div class="text-sm font-bold text-prescot-orange">09</div>
        </div>
    </div>
'''

# ==========================================
# PAGE: Złączki Hermetyczne THB
# ==========================================
pages_html += f'''
    <div class="page flex flex-col">
        <header class="flex justify-between items-center mb-10 border-b border-prescot-orange pb-4">
            <h2 class="text-2xl font-bold text-prescot-dark uppercase">Złączki Instalacyjne</h2>
            <div class="text-sm font-bold bg-prescot-dark text-white px-4 py-1 rounded">Hermetyczne THB & IP68</div>
        </header>

        <h3 class="text-lg font-bold text-prescot-dark mt-4 border-l-4 border-prescot-orange pl-3">Na Przewód i Do Obudowy</h3>
        <table class="prescot-table mt-4">
            <thead>
                <tr><th>Nr katalogowy</th><th>Rodzaj</th><th>Ilość pinów</th><th>Przewód / IP</th></tr>
            </thead>
            <tbody>
                <tr><td class="font-medium">THB.381.A2A</td><td>wtyk</td><td>2 pin</td><td>0.25-1.5mm² (IP68)</td></tr>
                <tr><td class="font-medium">THB.381.B2A</td><td>gniazdo</td><td>2 pin</td><td>0.25-1.5mm² (IP68)</td></tr>
                <tr><td class="font-medium">THB.387.A3A</td><td>wtyk</td><td>3 pin</td><td>0.5-4mm² (IP68)</td></tr>
                <tr><td class="font-medium">THB.387.B3A</td><td>gniazdo</td><td>3 pin</td><td>0.5-4mm² (IP68)</td></tr>
                <tr><td class="font-medium">THB.391.A3A</td><td>złączka wzdłużna</td><td>3 pin</td><td>0.5-4mm² (IP68)</td></tr>
                <tr><td class="font-medium">THB.387.E3A</td><td>wtyk do obud.</td><td>3 pin</td><td>0.5-4mm² (IP68)</td></tr>
                <tr><td class="font-medium">THB.387.F3A</td><td>gniazdo do obud.</td><td>3 pin</td><td>0.5-4mm² (IP68)</td></tr>
            </tbody>
        </table>

        <!-- Promotional Banner -->
        <div class="mt-16 bg-prescot-dark text-white rounded-lg p-8 relative overflow-hidden">
            <div class="relative z-10">
                <h4 class="text-2xl font-bold mb-2">Rozwiązania Indywidualne</h4>
                <p class="text-gray-300 max-w-lg mb-6">Wiedza i doświadczenie naszych doradców pozwolą na dopasowanie urządzeń do projektu. Gwarantujemy profesjonalne doradztwo techniczne.</p>
                <div class="inline-block bg-prescot-orange text-white px-6 py-2 rounded font-bold">Skontaktuj się z nami</div>
            </div>
            <!-- Large decorative icon -->
            <svg width="200" height="200" viewBox="0 0 100 100" class="absolute -right-10 -bottom-10 text-gray-800 opacity-50" fill="currentColor">
                <path d="M 10 10 L 50 10 C 80 10 95 30 95 50 C 95 70 80 90 50 90 L 10 90 L 10 70 L 45 70 C 60 70 70 60 70 50 C 70 40 60 30 45 30 L 10 30 Z M 10 40 L 35 40 L 35 60 L 10 60 Z" />
            </svg>
        </div>

        <div class="mt-auto pt-8 border-t border-gray-200 flex justify-between">
            <div class="text-xs text-gray-400">Najniższe ceny • Wysoka jakość • Bogaty asortyment</div><div class="text-sm font-bold text-prescot-orange">10</div>
        </div>
    </div>
'''

# ==========================================
# PAGE: BACK COVER
# ==========================================
pages_html += f'''
    <div class="page flex flex-col justify-between bg-prescot-orange text-white relative">
        <div class="z-10 mt-10">
            <div class="flex items-center gap-2 mb-10">
                <img src="assets/logo.svg" alt="PRESCOT Logo" class="h-16 filter brightness-0 invert">
            </div>
            <div class="border-l-4 border-white pl-8 py-2">
                <h1 class="text-6xl font-bold mb-4 uppercase tracking-wide">TAŚMA LED</h1>
                <h2 class="text-4xl font-light text-white uppercase tracking-widest">RGB LINE+</h2>
            </div>
            
            <div class="mt-10 flex gap-6">
                <div class="bg-white text-prescot-orange p-4 rounded text-center shadow-lg">
                    <div class="text-3xl font-bold">98</div>
                    <div class="text-sm font-medium">LED/m</div>
                </div>
                <div class="bg-white text-prescot-orange p-4 rounded text-center shadow-lg">
                    <div class="text-3xl font-bold">24V</div>
                    <div class="text-sm font-medium">zasilanie</div>
                </div>
                <div class="bg-white text-prescot-orange p-4 rounded text-center shadow-lg">
                    <div class="text-3xl font-bold">15.8</div>
                    <div class="text-sm font-medium">W/m</div>
                </div>
            </div>
            
            <p class="mt-12 text-lg max-w-lg leading-relaxed bg-black/10 p-6 rounded-lg backdrop-blur-sm">
                Uniwersalna taśma LED z kolorowymi diodami. <br>
                Precyzyjnie dobrane natężenie kolorów pozwala na uzyskanie bieli zamiast niebieskiego światła. <br>
                Niewielki rozstaw diod umożliwia tworzenie idealnej linii.
            </p>
        </div>

        <div class="z-10 mb-10 text-right">
            <p class="font-bold tracking-widest text-lg mb-1">01.2026</p>
            <p class="text-white/80 text-sm">REKLAMA • OSTATNIA STRONA</p>
        </div>

        <!-- Background Graphic -->
        <div class="absolute right-0 top-0 bottom-0 w-1/2 overflow-hidden opacity-20 z-0 mix-blend-overlay">
            <img src="{get_image('img_page14_xref491.png', 'back_cover.png')}" class="object-cover w-full h-full grayscale">
            <div class="absolute inset-0 bg-gradient-to-r from-prescot-orange to-transparent"></div>
        </div>
    </div>
'''

# Read base HTML, replace everything after PAGE 2
with open(TEMPLATE_PATH, "r", encoding="utf-8") as f:
    html = f.read()

# Make sure logo and cover are injected in the base HTML for page 1
html = re.sub(r'<div class="flex items-center gap-2 mb-20">.*?</div>', 
              '''<div class="flex items-center gap-2 mb-20"><img src="assets/logo.svg" alt="PRESCOT Logo" class="h-16"></div>''', html, flags=re.DOTALL)

cover_src = get_image('img_page0_xref4311.png', 'cover.png')
html = re.sub(r'<img src="https://images.unsplash.com/.*?"', f'<img src="{cover_src}"', html)

# Locate the end of PAGE 2 (TOC) and replace the rest with our dynamically generated pages
# Looking for "<!-- PAGE 3"
page3_index = html.find('<!-- PAGE 3')
if page3_index != -1:
    html = html[:page3_index] + pages_html + "\\n</body>\\n</html>"

out_file = os.path.join(OUTPUT_DIR, "index.html")
with open(out_file, "w", encoding="utf-8") as f:
    f.write(html)

print("Katalog wygenerowany pomyslnie na podstawie 2018!")
