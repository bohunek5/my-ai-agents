import os
import shutil
import re

TEMPLATE_PATH = "/Users/karolbohdanowicz/Downloads/Katalog_Akcesoriow_PRESCOT_2026.html"
OUTPUT_DIR = "/Users/karolbohdanowicz/Downloads/Katalog_2026_Gotowy"
ASSETS_DIR = os.path.join(OUTPUT_DIR, "assets")
EXTRACTED_IMG_DIR = "/Users/karolbohdanowicz/my-ai-agents/CONTENT-BOSS/pliki-i-dane/prescot_extracted"
DOWNLOADS_ASSETS_DIR = "/Users/karolbohdanowicz/Downloads/assets"

os.makedirs(ASSETS_DIR, exist_ok=True)
os.makedirs(DOWNLOADS_ASSETS_DIR, exist_ok=True)

def get_image(filename, dest_name):
    src = os.path.join(EXTRACTED_IMG_DIR, filename)
    if os.path.exists(src):
        # copy to both places just in case
        shutil.copy(src, os.path.join(ASSETS_DIR, dest_name))
        shutil.copy(src, os.path.join(DOWNLOADS_ASSETS_DIR, dest_name))
        return f"assets/{dest_name}"
    return "https://via.placeholder.com/150"

# (Include logo explicit copy as well)
logo_src = "/Users/karolbohdanowicz/my-ai-agents/CONTENT-BOSS/pliki-i-dane/brandbook_prescot_01_2025/PRESCOT_logo_biale+kolor-01.svg"
if os.path.exists(logo_src):
    shutil.copy(logo_src, os.path.join(DOWNLOADS_ASSETS_DIR, "logo.svg"))

pages_html = ""

# Page 1 - Złączki BASIC
pages_html += f'''
    <div class="page flex flex-col">
        <header class="flex justify-between items-center mb-10 border-b border-prescot-orange pb-4">
            <h2 class="text-2xl font-bold text-prescot-dark uppercase">Złączki do taśm LED</h2>
            <div class="text-sm font-bold bg-prescot-dark text-white px-4 py-1 rounded">Seria BASIC</div>
        </header>
        <div class="grid grid-cols-4 gap-4 mb-4">
            <div class="bg-white border border-gray-200 p-2 rounded-lg shadow-sm flex flex-col items-center justify-center h-32 relative group overflow-hidden">
                <div class="absolute top-2 left-2 text-xs font-bold text-gray-400 z-10">01</div>
                <img src="{get_image('img_page1_xref10.png', 'basic_1.png')}" class="w-full h-full object-contain mix-blend-multiply">
            </div>
            <div class="bg-white border border-gray-200 p-2 rounded-lg shadow-sm flex flex-col items-center justify-center h-32 relative group overflow-hidden">
                <div class="absolute top-2 left-2 text-xs font-bold text-gray-400 z-10">02</div>
                <img src="{get_image('img_page1_xref12.png', 'basic_2.png')}" class="w-full h-full object-contain mix-blend-multiply">
            </div>
            <div class="bg-white border border-gray-200 p-2 rounded-lg shadow-sm flex flex-col items-center justify-center h-32 relative group overflow-hidden">
                <div class="absolute top-2 left-2 text-xs font-bold text-gray-400 z-10">03</div>
                <img src="{get_image('img_page1_xref14.png', 'basic_3.png')}" class="w-full h-full object-contain mix-blend-multiply">
            </div>
            <div class="bg-white border border-gray-200 p-2 rounded-lg shadow-sm flex flex-col items-center justify-center h-32 relative group overflow-hidden">
                <div class="absolute top-2 left-2 text-xs font-bold text-gray-400 z-10">04</div>
                <img src="{get_image('img_page1_xref16.png', 'basic_4.png')}" class="w-full h-full object-contain mix-blend-multiply">
            </div>
        </div>
        <table class="prescot-table">
            <thead>
                <tr><th>Nr katalogowy</th><th>Zakończenie</th><th>Połączenie</th><th>Zakończenie</th><th>Przewód</th><th>Typ</th></tr>
            </thead>
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
        <table class="prescot-table mt-4">
            <thead>
                <tr><th>Nr katalogowy</th><th>Zakończenie</th><th>Połączenie</th><th>Zakończenie</th><th>Przewód</th><th>Typ</th></tr>
            </thead>
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
        <div class="mt-auto pt-8 border-t border-gray-200 flex justify-between">
            <div class="text-xs text-gray-400">Najniższe ceny • Wysoka jakość • Bogaty asortyment</div><div class="text-sm font-bold text-prescot-orange">01</div>
        </div>
    </div>
'''

# Page 2 - Złączki HIPP
pages_html += f'''
    <div class="page flex flex-col">
        <header class="flex justify-between items-center mb-10 border-b border-prescot-orange pb-4">
            <h2 class="text-2xl font-bold text-prescot-dark uppercase">Złączki do taśm LED</h2>
            <div class="text-sm font-bold bg-prescot-dark text-white px-4 py-1 rounded">Seria HIPP</div>
        </header>
        <div class="grid grid-cols-4 gap-4 mb-4">
            <div class="bg-white border border-gray-200 p-2 rounded-lg shadow-sm flex flex-col items-center justify-center h-32 relative group overflow-hidden">
                <div class="absolute top-2 left-2 text-xs font-bold text-gray-400 z-10">01</div>
                <img src="{get_image('img_page2_xref49.png', 'hipp_1.png')}" class="w-full h-full object-contain mix-blend-multiply">
            </div>
            <div class="bg-white border border-gray-200 p-2 rounded-lg shadow-sm flex flex-col items-center justify-center h-32 relative group overflow-hidden">
                <div class="absolute top-2 left-2 text-xs font-bold text-gray-400 z-10">02</div>
                <img src="{get_image('img_page2_xref51.png', 'hipp_2.png')}" class="w-full h-full object-contain mix-blend-multiply">
            </div>
            <div class="bg-white border border-gray-200 p-2 rounded-lg shadow-sm flex flex-col items-center justify-center h-32 relative group overflow-hidden">
                <div class="absolute top-2 left-2 text-xs font-bold text-gray-400 z-10">03</div>
                <img src="{get_image('img_page2_xref53.png', 'hipp_3.png')}" class="w-full h-full object-contain mix-blend-multiply">
            </div>
            <div class="bg-white border border-gray-200 p-2 rounded-lg shadow-sm flex flex-col items-center justify-center h-32 relative group overflow-hidden">
                <div class="absolute top-2 left-2 text-xs font-bold text-gray-400 z-10">04</div>
                <img src="{get_image('img_page2_xref55.png', 'hipp_4.png')}" class="w-full h-full object-contain mix-blend-multiply">
            </div>
        </div>
        <table class="prescot-table">
            <thead>
                <tr><th>Nr katalogowy</th><th>Zakończenie</th><th>Zakończenie</th><th>Zastosowanie</th><th>Typ</th></tr>
            </thead>
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
        <div class="mt-auto pt-8 border-t border-gray-200 flex justify-between">
            <div class="text-xs text-gray-400">Najniższe ceny • Wysoka jakość • Bogaty asortyment</div><div class="text-sm font-bold text-prescot-orange">02</div>
        </div>
    </div>
'''

# Page 3 - Złączki PCB
pages_html += f'''
    <div class="page flex flex-col">
        <header class="flex justify-between items-center mb-10 border-b border-prescot-orange pb-4">
            <h2 class="text-2xl font-bold text-prescot-dark uppercase">Złączki do taśm LED</h2>
            <div class="text-sm font-bold bg-prescot-dark text-white px-4 py-1 rounded">Seria PCB</div>
        </header>
        <div class="grid grid-cols-3 gap-4 mb-4">
            <div class="bg-white border border-gray-200 p-2 rounded-lg shadow-sm flex flex-col items-center justify-center h-32 relative group overflow-hidden">
                <div class="absolute top-2 left-2 text-xs font-bold text-gray-400 z-10">01</div>
                <img src="{get_image('img_page3_xref85.png', 'pcb_1.png')}" class="w-full h-full object-contain mix-blend-multiply">
            </div>
            <div class="bg-white border border-gray-200 p-2 rounded-lg shadow-sm flex flex-col items-center justify-center h-32 relative group overflow-hidden">
                <div class="absolute top-2 left-2 text-xs font-bold text-gray-400 z-10">02</div>
                <img src="{get_image('img_page3_xref87.png', 'pcb_2.png')}" class="w-full h-full object-contain mix-blend-multiply">
            </div>
            <div class="bg-white border border-gray-200 p-2 rounded-lg shadow-sm flex flex-col items-center justify-center h-32 relative group overflow-hidden">
                <div class="absolute top-2 left-2 text-xs font-bold text-gray-400 z-10">03</div>
                <img src="{get_image('img_page3_xref89.png', 'pcb_3.png')}" class="w-full h-full object-contain mix-blend-multiply">
            </div>
        </div>
        <table class="prescot-table">
            <thead>
                <tr><th>Nr katalogowy</th><th>Zakończenie</th><th>Model</th><th>Zastosowanie</th><th>Typ</th></tr>
            </thead>
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
        <div class="mt-auto pt-8 border-t border-gray-200 flex justify-between">
            <div class="text-xs text-gray-400">Najniższe ceny • Wysoka jakość • Bogaty asortyment</div><div class="text-sm font-bold text-prescot-orange">03</div>
        </div>
    </div>
'''

# Page 4 - Wtyki DC
pages_html += f'''
    <div class="page flex flex-col">
        <header class="flex justify-between items-center mb-10 border-b border-prescot-orange pb-4">
            <h2 class="text-2xl font-bold text-prescot-dark uppercase">Wtyki i Przewody DC</h2>
            <div class="text-sm font-bold bg-prescot-dark text-white px-4 py-1 rounded">DC</div>
        </header>
        <div class="grid grid-cols-4 gap-4 mb-4">
            <div class="bg-white border border-gray-200 p-2 rounded-lg shadow-sm flex flex-col items-center justify-center h-24 relative group overflow-hidden">
                <img src="{get_image('img_page4_xref117.png', 'dc_wtyk1.png')}" class="w-full h-full object-contain mix-blend-multiply">
            </div>
            <div class="bg-white border border-gray-200 p-2 rounded-lg shadow-sm flex flex-col items-center justify-center h-24 relative group overflow-hidden">
                <img src="{get_image('img_page4_xref119.png', 'dc_wtyk2.png')}" class="w-full h-full object-contain mix-blend-multiply">
            </div>
        </div>
        <table class="prescot-table mt-0">
            <thead>
                <tr><th>Numer katalogowy</th><th>Zakończenie</th><th>Połączenie</th><th>Zakończenie</th><th>Przewód</th><th>Kolor</th></tr>
            </thead>
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
        
        <h3 class="text-lg font-bold text-prescot-dark mt-4 border-l-4 border-prescot-orange pl-3">Przewody DC</h3>
        <table class="prescot-table mt-0">
            <thead>
                <tr><th>Numer katalogowy</th><th>Zakończenie</th><th>Połączenie</th><th>Zakończenie</th><th>Przewód</th><th>Kolor</th></tr>
            </thead>
            <tbody>
                <tr><td>ROZ-DC-5.5/2.1-2X1CZ</td><td>5.5/2.1 x2</td><td>24cm</td><td>5.5/2.1</td><td>2x0.35/2x0.50</td><td>czarny</td></tr>
                <tr><td>ROZ-DC-5.5/2.1-3X1CZ</td><td>5.5/2.1 x3</td><td>24cm</td><td>5.5/2.1</td><td>2x0.35/2x0.50</td><td>czarny</td></tr>
                <tr><td>ROZ-DC-5.5/2.1-4X1CZ</td><td>5.5/2.1 x4</td><td>24cm</td><td>5.5/2.1</td><td>2x0.35/2x0.50</td><td>czarny</td></tr>
                <tr><td>ROZ-DC-5.5/2.1-5XCZ</td><td>5.5/2.1 x5</td><td>24cm</td><td>5.5/2.1</td><td>2x0.35/2x0.50</td><td>czarny</td></tr>
                <tr><td>ROZ-DC-5.5/2.1-6XCZ</td><td>5.5/2.1 x6</td><td>24cm</td><td>5.5/2.1</td><td>2x0.35/2x0.50</td><td>czarny</td></tr>
                <tr><td>DC-DC-150_5.5/2.1</td><td>5.5/2.1</td><td>150cm</td><td>5.5/2.1</td><td>2x0.35</td><td>czarny</td></tr>
            </tbody>
        </table>
        <div class="mt-auto pt-8 border-t border-gray-200 flex justify-between">
            <div class="text-xs text-gray-400">Najniższe ceny • Wysoka jakość • Bogaty asortyment</div><div class="text-sm font-bold text-prescot-orange">04</div>
        </div>
    </div>
'''

# Page 5 - Złącza DC hermetyczne
pages_html += f'''
    <div class="page flex flex-col">
        <header class="flex justify-between items-center mb-10 border-b border-prescot-orange pb-4">
            <h2 class="text-2xl font-bold text-prescot-dark uppercase">Złącza DC Hermetyczne & RGB</h2>
            <div class="text-sm font-bold bg-prescot-dark text-white px-4 py-1 rounded">Złącza</div>
        </header>
        <table class="prescot-table mt-0">
            <thead>
                <tr><th>Numer katalogowy</th><th>Zakończenie</th><th>Połączenie</th><th>Zakończenie</th><th>Przewód</th><th>Typ</th></tr>
            </thead>
            <tbody>
                <tr><td>LED-ZIP-Ż</td><td>5.5/2.1</td><td>15cm</td><td>-</td><td>2x0.50</td><td>1</td></tr>
                <tr><td>LED-ZIP-M</td><td>5.5/2.1</td><td>15cm</td><td>-</td><td>2x0.50</td><td>1a</td></tr>
                <tr><td>LED-ZIP-Ż-RGB</td><td>4 pin</td><td>15cm</td><td>-</td><td>4x0.50</td><td>2</td></tr>
                <tr><td>LED-ZIP-M-RGB</td><td>4 pin</td><td>15cm</td><td>-</td><td>4x0.50</td><td>2a</td></tr>
                <tr><td>LED-ZIP-Ż-RGBW</td><td>5 pin</td><td>15cm</td><td>-</td><td>5x0.50</td><td>3</td></tr>
                <tr><td>LED-ZIP-M-RGBW</td><td>5 pin</td><td>15cm</td><td>-</td><td>5x0.50</td><td>3a</td></tr>
            </tbody>
        </table>
        <h3 class="text-lg font-bold text-prescot-dark mt-4 border-l-4 border-prescot-orange pl-3">Złącza RGB</h3>
        <table class="prescot-table mt-0">
            <thead>
                <tr><th>Numer katalogowy</th><th>Zakończenie</th><th>Połączenie</th><th>Zakończenie</th><th>Przewód</th><th>Typ</th></tr>
            </thead>
            <tbody>
                <tr><td>GN-RGB-4PIN15</td><td>4 pin</td><td>15cm</td><td>-</td><td>4x0.35</td><td>1</td></tr>
                <tr><td>WTYK-RGB-4PIN15</td><td>4 pin</td><td>15cm</td><td>-</td><td>4x0.35</td><td>2</td></tr>
                <tr><td>WTYK-RGB-4PIN-B</td><td>4 pin</td><td>15cm</td><td>-</td><td>4x0.35</td><td>3</td></tr>
                <tr><td>WTYK-RGB-4PIN-CZ</td><td>4 pin</td><td>15cm</td><td>-</td><td>4x0.35</td><td>4</td></tr>
            </tbody>
        </table>
        <div class="mt-auto pt-8 border-t border-gray-200 flex justify-between">
            <div class="text-xs text-gray-400">Najniższe ceny • Wysoka jakość • Bogaty asortyment</div><div class="text-sm font-bold text-prescot-orange">05</div>
        </div>
    </div>
'''

# Page 6 - Wtyki DC / Gniazda DC
pages_html += f'''
    <div class="page flex flex-col">
        <header class="flex justify-between items-center mb-10 border-b border-prescot-orange pb-4">
            <h2 class="text-2xl font-bold text-prescot-dark uppercase">Wtyki i Gniazda DC</h2>
            <div class="text-sm font-bold bg-prescot-dark text-white px-4 py-1 rounded">Osprzęt</div>
        </header>
        <table class="prescot-table mt-0">
            <thead>
                <tr><th>Numer katalogowy</th><th>Zakończenie</th><th>Montaż</th><th>Typ</th></tr>
            </thead>
            <tbody>
                <tr><td>WT-DC-5.5/2.1-PP</td><td>5.5/2.1</td><td>na przewód</td><td>1</td></tr>
                <tr><td>WT-DC-5.5/2.5-PP</td><td>5.5/2.5</td><td>na przewód</td><td>1</td></tr>
                <tr><td>WT-DC-5.5/2.1ZS</td><td>5.5/2.1</td><td>zacisk śrubowy</td><td>2</td></tr>
                <tr><td>WT-DC-5.5/2.5ZS</td><td>5.5/2.5</td><td>zacisk śrubowy</td><td>2</td></tr>
            </tbody>
        </table>
        <h3 class="text-lg font-bold text-prescot-dark mt-4 border-l-4 border-prescot-orange pl-3">Gniazda DC</h3>
        <table class="prescot-table mt-0">
            <thead>
                <tr><th>Numer katalogowy</th><th>Zakończenie</th><th>Montaż</th><th>Typ</th></tr>
            </thead>
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
        <div class="mt-auto pt-8 border-t border-gray-200 flex justify-between">
            <div class="text-xs text-gray-400">Najniższe ceny • Wysoka jakość • Bogaty asortyment</div><div class="text-sm font-bold text-prescot-orange">06</div>
        </div>
    </div>
'''

# Page 7 - Złącza LED-Z2P, KLIK
pages_html += f'''
    <div class="page flex flex-col">
        <header class="flex justify-between items-center mb-10 border-b border-prescot-orange pb-4">
            <h2 class="text-2xl font-bold text-prescot-dark uppercase">Złącza i Złączki</h2>
            <div class="text-sm font-bold bg-prescot-dark text-white px-4 py-1 rounded">Seria KLIK</div>
        </header>
        <table class="prescot-table mt-0">
            <thead>
                <tr><th>Numer katalogowy</th><th>Zakończenie</th><th>Połączenie</th><th>Zakończenie</th><th>Przewód</th><th>Typ</th></tr>
            </thead>
            <tbody>
                <tr><td>LED-Z2P-Ż</td><td>2 pin</td><td>14cm</td><td>-</td><td>2x0.35</td><td>1</td></tr>
                <tr><td>LED-Z2P-M</td><td>2 pin</td><td>14cm</td><td>-</td><td>2x0.35</td><td>1</td></tr>
                <tr><td>TAM-GM-14</td><td>2 pin</td><td>14cm</td><td>-</td><td>2x0.50</td><td>2</td></tr>
                <tr><td>TAM-WZ-14</td><td>2 pin</td><td>14cm</td><td>-</td><td>2x0.50</td><td>2</td></tr>
                <tr><td>ZL-2PIN-WS</td><td>konektor żeński 6.3/2.5</td><td>-</td><td>konektor męski 6.3/2.5</td><td>-</td><td>3</td></tr>
            </tbody>
        </table>
        <h3 class="text-lg font-bold text-prescot-dark mt-4 border-l-4 border-prescot-orange pl-3">Seria KLIK</h3>
        <table class="prescot-table mt-0">
            <thead>
                <tr><th>Numer katalogowy</th><th>Zakończenie</th><th>Połączenie</th><th>Zakończenie</th><th>Przewód</th><th>Typ</th></tr>
            </thead>
            <tbody>
                <tr><td>ZL-2PIN-KLIK-W</td><td>2 pin</td><td>15cm</td><td>-</td><td>2x0.50</td><td>1</td></tr>
                <tr><td>ZL-2PIN-KLIK-G</td><td>2 pin</td><td>15cm</td><td>-</td><td>2x0.50</td><td>1a</td></tr>
                <tr><td>ZL-2PIN-KLIK300-W</td><td>2 pin</td><td>300cm</td><td>-</td><td>2x0.50</td><td>2</td></tr>
                <tr><td>ZL-2PIN-KLIK300-G</td><td>2 pin</td><td>300cm</td><td>-</td><td>2x0.50</td><td>2a</td></tr>
                <tr><td>ZL-2PIN-KLIK</td><td>2 pin</td><td>15+15cm</td><td>-</td><td>2x0.50</td><td>3</td></tr>
                <tr><td>ZL-2PIN-KLIK300+15</td><td>2 pin</td><td>300+15cm</td><td>-</td><td>2x0.50</td><td>4</td></tr>
            </tbody>
        </table>
        <div class="mt-auto pt-8 border-t border-gray-200 flex justify-between">
            <div class="text-xs text-gray-400">Najniższe ceny • Wysoka jakość • Bogaty asortyment</div><div class="text-sm font-bold text-prescot-orange">07</div>
        </div>
    </div>
'''

# Page 8 - Złączki (646/A, 673/A, ZL-2X-PUSH)
pages_html += f'''
    <div class="page flex flex-col">
        <header class="flex justify-between items-center mb-10 border-b border-prescot-orange pb-4">
            <h2 class="text-2xl font-bold text-prescot-dark uppercase">Złączki Instalacyjne</h2>
            <div class="text-sm font-bold bg-prescot-dark text-white px-4 py-1 rounded">Skręcane / Wciskane</div>
        </header>
        <table class="prescot-table mt-0">
            <thead>
                <tr><th>Numer katalogowy</th><th>Zakończenie</th><th>Zakończenie</th><th>Uziemienie</th><th>Montaż</th><th>Typ</th></tr>
            </thead>
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
        <div class="mt-auto pt-8 border-t border-gray-200 flex justify-between">
            <div class="text-xs text-gray-400">Najniższe ceny • Wysoka jakość • Bogaty asortyment</div><div class="text-sm font-bold text-prescot-orange">08</div>
        </div>
    </div>
'''

# Page 9 - Złączki FAST / ZL-12X2.5B
pages_html += f'''
    <div class="page flex flex-col">
        <header class="flex justify-between items-center mb-10 border-b border-prescot-orange pb-4">
            <h2 class="text-2xl font-bold text-prescot-dark uppercase">Złączki</h2>
            <div class="text-sm font-bold bg-prescot-dark text-white px-4 py-1 rounded">Seria FAST / Skręcane</div>
        </header>
        <h3 class="text-lg font-bold text-prescot-dark mt-4 border-l-4 border-prescot-orange pl-3">Seria FAST</h3>
        <table class="prescot-table mt-0">
            <thead>
                <tr><th>Numer katalogowy</th><th>Model</th><th>Zastosowanie</th><th>Typ</th></tr>
            </thead>
            <tbody>
                <tr><td>PR-ZPF-T1</td><td>T</td><td>Do rozgałęzienia przewodu</td><td>1</td></tr>
                <tr><td>PR-ZPF-T2</td><td>T</td><td>jedno lub dwużyłowego</td><td>2</td></tr>
                <tr><td>PR-ZPF-H1</td><td>H</td><td>Do połączenia dwóch przewodów</td><td>3</td></tr>
                <tr><td>PR-ZPF-H2</td><td>H</td><td>jedno lub dwużyłowych</td><td>4</td></tr>
            </tbody>
        </table>
        <h3 class="text-lg font-bold text-prescot-dark mt-4 border-l-4 border-prescot-orange pl-3">Złączki Skręcane</h3>
        <table class="prescot-table mt-0">
            <thead>
                <tr><th>Numer katalogowy</th><th>Zakończenie</th><th>Zakończenie</th><th>Typ złącza</th><th>Typ</th></tr>
            </thead>
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
        <div class="mt-auto pt-8 border-t border-gray-200 flex justify-between">
            <div class="text-xs text-gray-400">Najniższe ceny • Wysoka jakość • Bogaty asortyment</div><div class="text-sm font-bold text-prescot-orange">09</div>
        </div>
    </div>
'''

# Page 10 - Złączki WAGO / Przewody
pages_html += f'''
    <div class="page flex flex-col">
        <header class="flex justify-between items-center mb-10 border-b border-prescot-orange pb-4">
            <h2 class="text-2xl font-bold text-prescot-dark uppercase">Złączki i Przewody</h2>
            <div class="text-sm font-bold bg-prescot-dark text-white px-4 py-1 rounded">Seria WAGO / TLWY</div>
        </header>
        <h3 class="text-lg font-bold text-prescot-dark mt-4 border-l-4 border-prescot-orange pl-3">Seria WAGO</h3>
        <table class="prescot-table mt-0">
            <thead>
                <tr><th>Numer katalogowy</th><th>Zakończenie</th><th>Typ złącza</th><th>Typ</th></tr>
            </thead>
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
        <h3 class="text-lg font-bold text-prescot-dark mt-4 border-l-4 border-prescot-orange pl-3">Przewody</h3>
        <table class="prescot-table mt-0">
            <thead>
                <tr><th>Nr katalogowy</th><th>Ilość żył</th><th>Przekrój żyły</th><th>Kolor</th><th>Typ</th></tr>
            </thead>
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
        <div class="mt-auto pt-8 border-t border-gray-200 flex justify-between">
            <div class="text-xs text-gray-400">Najniższe ceny • Wysoka jakość • Bogaty asortyment</div><div class="text-sm font-bold text-prescot-orange">10</div>
        </div>
    </div>
'''

# Page 11 - Przyciski / Włączniki
pages_html += f'''
    <div class="page flex flex-col">
        <header class="flex justify-between items-center mb-10 border-b border-prescot-orange pb-4">
            <h2 class="text-2xl font-bold text-prescot-dark uppercase">Przyciski i Włączniki</h2>
            <div class="text-sm font-bold bg-prescot-dark text-white px-4 py-1 rounded">Osprzęt</div>
        </header>
        <h3 class="text-lg font-bold text-prescot-dark mt-4 border-l-4 border-prescot-orange pl-3">Przyciski</h3>
        <table class="prescot-table mt-0">
            <thead>
                <tr><th>Nr katalogowy</th><th>Kolor przycisku/obudowy</th><th>Kolor podświetlenia</th><th>Ilość pozycji</th><th>Otwór montażowy</th><th>Typ</th></tr>
            </thead>
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
        <h3 class="text-lg font-bold text-prescot-dark mt-4 border-l-4 border-prescot-orange pl-3">Włączniki kołyskowe</h3>
        <table class="prescot-table mt-0">
            <thead>
                <tr><th>Nr katalogowy</th><th>Kolor przycisku/obudowy</th><th>Ilość pozycji</th><th>Otwór montażowy</th><th>Typ</th></tr>
            </thead>
            <tbody>
                <tr><td>PR-WLK-B</td><td>biały/biały</td><td>2</td><td>19.4mm</td><td>1</td></tr>
                <tr><td>PR-WLK-CZ</td><td>czarny/czarny</td><td>2</td><td>19.4mm</td><td>2</td></tr>
                <tr><td>PR-WLK-SZ</td><td>szary/szary</td><td>2</td><td>19.4mm</td><td>3</td></tr>
            </tbody>
        </table>
        <div class="mt-auto pt-8 border-t border-gray-200 flex justify-between">
            <div class="text-xs text-gray-400">Najniższe ceny • Wysoka jakość • Bogaty asortyment</div><div class="text-sm font-bold text-prescot-orange">11</div>
        </div>
    </div>
'''

# Page 12 - Złączki hermetyczne na przewód
pages_html += f'''
    <div class="page flex flex-col">
        <header class="flex justify-between items-center mb-10 border-b border-prescot-orange pb-4">
            <h2 class="text-2xl font-bold text-prescot-dark uppercase">Złączki Hermetyczne</h2>
            <div class="text-sm font-bold bg-prescot-dark text-white px-4 py-1 rounded">Na Przewód</div>
        </header>
        <table class="prescot-table mt-0">
            <thead>
                <tr><th>Nr katalogowy</th><th>Rodzaj</th><th>Ilość pinów</th><th>Przewód</th><th>IP</th><th>IK</th><th>Typ</th></tr>
            </thead>
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
        <div class="mt-auto pt-8 border-t border-gray-200 flex justify-between">
            <div class="text-xs text-gray-400">Najniższe ceny • Wysoka jakość • Bogaty asortyment</div><div class="text-sm font-bold text-prescot-orange">12</div>
        </div>
    </div>
'''

# Page 13 - Złączki hermetyczne do obudowy
pages_html += f'''
    <div class="page flex flex-col">
        <header class="flex justify-between items-center mb-10 border-b border-prescot-orange pb-4">
            <h2 class="text-2xl font-bold text-prescot-dark uppercase">Złączki Hermetyczne</h2>
            <div class="text-sm font-bold bg-prescot-dark text-white px-4 py-1 rounded">Do Obudowy</div>
        </header>
        <table class="prescot-table mt-0">
            <thead>
                <tr><th>Nr katalogowy</th><th>Rodzaj</th><th>Ilość pinów</th><th>Przewód</th><th>IP</th><th>Typ</th></tr>
            </thead>
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
        <div class="mt-auto pt-8 border-t border-gray-200 flex justify-between">
            <div class="text-xs text-gray-400">Najniższe ceny • Wysoka jakość • Bogaty asortyment</div><div class="text-sm font-bold text-prescot-orange">13</div>
        </div>
    </div>
'''

# Page 14 - Baterie / Włączniki
pages_html += f'''
    <div class="page flex flex-col">
        <header class="flex justify-between items-center mb-10 border-b border-prescot-orange pb-4">
            <h2 class="text-2xl font-bold text-prescot-dark uppercase">Baterie i Włączniki</h2>
            <div class="text-sm font-bold bg-prescot-dark text-white px-4 py-1 rounded">Osprzęt</div>
        </header>
        <h3 class="text-lg font-bold text-prescot-dark mt-4 border-l-4 border-prescot-orange pl-3">Pojemniki na baterie</h3>
        <table class="prescot-table mt-0">
            <thead>
                <tr><th>Nr katalogowy</th><th>Ilość miejsc</th><th>Model</th><th>Przewód</th><th>Typ</th></tr>
            </thead>
            <tbody>
                <tr><td>PBAT-AA-1</td><td>1</td><td>AA</td><td>2x0.12</td><td>-</td></tr>
                <tr><td>PBAT-AA-2</td><td>2</td><td>AA</td><td>2x0.12</td><td>2</td></tr>
                <tr><td>PBAT-AA-2A</td><td>2</td><td>AA</td><td>2x0.12</td><td>4</td></tr>
                <tr><td>PBAT-AA-3</td><td>3</td><td>AA</td><td>2x0.12</td><td>1</td></tr>
                <tr><td>PBAT-AA-3A</td><td>3</td><td>AA</td><td>2x0.12</td><td>5</td></tr>
                <tr><td>PBAT-AA-4</td><td>4</td><td>AA</td><td>2x0.12</td><td>3</td></tr>
                <tr><td>PBAT-AA-4A</td><td>4</td><td>AA</td><td>2x0.12</td><td>6</td></tr>
            </tbody>
        </table>
        <h3 class="text-lg font-bold text-prescot-dark mt-4 border-l-4 border-prescot-orange pl-3">Baterie akumulatorowe</h3>
        <table class="prescot-table mt-0">
            <thead>
                <tr><th>Nr katalogowy</th><th>Model</th><th>Ilość (szt)</th><th>Napięcie (V)</th><th>Pojemność (mA)</th><th>Typ</th></tr>
            </thead>
            <tbody>
                <tr><td>8851</td><td>AA</td><td>4</td><td>1.2</td><td>1500</td><td>1</td></tr>
                <tr><td>8854</td><td>AA</td><td>2</td><td>1.2</td><td>2500</td><td>2</td></tr>
                <tr><td>8852</td><td>AAA</td><td>4</td><td>1.2</td><td>800</td><td>3</td></tr>
                <tr><td>8855</td><td>AAA</td><td>2</td><td>1.2</td><td>900</td><td>4</td></tr>
            </tbody>
        </table>
        <h3 class="text-lg font-bold text-prescot-dark mt-4 border-l-4 border-prescot-orange pl-3">Włączniki przelotowe</h3>
        <table class="prescot-table mt-0">
            <thead>
                <tr><th>Nr katalogowy</th><th>Kolor przycisku/obudowy</th><th>Ilość pozycji</th><th>Typ</th></tr>
            </thead>
            <tbody>
                <tr><td>PR-WLP-B</td><td>biały/biały</td><td>2</td><td>1</td></tr>
                <tr><td>PR-WLP-CZ</td><td>czarny/czarny</td><td>2</td><td>2</td></tr>
                <tr><td>S/575/N</td><td>czarny/czarny</td><td>2</td><td>3</td></tr>
            </tbody>
        </table>
        <h3 class="text-lg font-bold text-prescot-dark mt-4 border-l-4 border-prescot-orange pl-3">Baterie alkaiczne</h3>
        <table class="prescot-table mt-0">
            <thead>
                <tr><th>Nr katalogowy</th><th>Model</th><th>Ilość (szt)</th><th>Napięcie (V)</th><th>Typ</th></tr>
            </thead>
            <tbody>
                <tr><td>8753</td><td>6LR61</td><td>1</td><td>9</td><td>-</td></tr>
                <tr><td>8751</td><td>LR6</td><td>4</td><td>1.5</td><td>1</td></tr>
                <tr><td>8752</td><td>LR03</td><td>4</td><td>1.5</td><td>2</td></tr>
                <tr><td>8754</td><td>LR14</td><td>2</td><td>1.5</td><td>3</td></tr>
                <tr><td>8755</td><td>LR20</td><td>2</td><td>1.5</td><td>4</td></tr>
            </tbody>
        </table>
        <div class="mt-auto pt-8 border-t border-gray-200 flex justify-between">
            <div class="text-xs text-gray-400">Najniższe ceny • Wysoka jakość • Bogaty asortyment</div><div class="text-sm font-bold text-prescot-orange">14</div>
        </div>
    </div>
'''

# Read the HTML template
with open(TEMPLATE_PATH, "r", encoding="utf-8") as f:
    html = f.read()

# Make sure logo and cover are injected in the base HTML for page 1
html = re.sub(r'<div class="flex items-center gap-2 mb-20">.*?</div>', 
              '''<div class="flex items-center gap-2 mb-20"><img src="assets/logo.svg" alt="PRESCOT Logo" class="h-16"></div>''', html, flags=re.DOTALL)
cover_src = get_image('img_page0_xref4311.png', 'cover.png')
html = re.sub(r'<img src="https://images.unsplash.com/.*?"', f'<img src="{cover_src}"', html)

# Replace everything after PAGE 2
# Check if PAGE 3 comment exists, or just find the second occurrence of <div class="page
pages = html.split('<div class="page flex flex-col">')
if len(pages) > 2:
    html = pages[0] + '<div class="page flex flex-col">' + pages[1] + pages_html + "\\n</body>\\n</html>"

with open(TEMPLATE_PATH, "w", encoding="utf-8") as f:
    f.write(html)

print("Katalog wygenerowany 1:1, bez RGB LINE, nadpisano plik docelowy.")
