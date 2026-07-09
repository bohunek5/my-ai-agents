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

def get_image_path(page_num, img_idx):
    # Find all images for this page and pick the idx-1
    pattern = os.path.join(EXTRACTED_IMG_DIR, f"img_page{page_num}_*.png")
    images = glob.glob(pattern)
    images.sort(key=lambda x: int(re.search(r'xref(\d+)', x).group(1)) if re.search(r'xref(\d+)', x) else 0)
    
    if img_idx <= len(images):
        basename = os.path.basename(images[img_idx-1])
        dest_name = f"p{page_num}_{img_idx}.png"
        return copy_image(basename, dest_name)
    return "assets/placeholder.png"

# Define the HTML template generator
# We will use CSS classes that are super modern and premium.
# Glassmorphism, clean shadows, outfit + inter typography, nice badges, etc.

logo_src = "/Users/karolbohdanowicz/my-ai-agents/CONTENT-BOSS/pliki-i-dane/brandbook_prescot_01_2025/PRESCOT_logo_biale+kolor-01.svg"
if os.path.exists(logo_src):
    shutil.copy(logo_src, os.path.join(ASSETS_DIR, "logo.svg"))

cover_src = copy_image('img_page0_xref4311.png', 'cover.png')

# Category Sections
sections_html = ""

# ----------------- SECTION 1: ZŁĄCZKI DO TAŚM LED -----------------
p1_img1 = get_image_path(1, 1)
p1_img2 = get_image_path(1, 2)
p2_img1 = get_image_path(2, 1)
p3_img1 = get_image_path(3, 1)

sections_html += f"""
<section id="zlaczki-tasm-led" class="py-20 border-b border-gray-100">
    <div class="max-w-7xl mx-auto px-6">
        <div class="mb-12">
            <span class="text-prescot-orange text-xs font-bold uppercase tracking-widest">Kategoria 01</span>
            <h2 class="text-4xl font-extrabold text-gray-900 mt-2">Złączki do Taśm LED</h2>
            <p class="text-gray-500 mt-2 max-w-2xl">Kompletna seria profesjonalnych złączek zatrzaskowych przeznaczonych do szybkiego łączenia taśm LED Mono, RGB oraz RGBW bez konieczności lutowania.</p>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <!-- SERIA BASIC MONO -->
            <div class="bg-white border border-gray-100 rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between">
                <div>
                    <div class="flex justify-between items-start mb-6">
                        <div>
                            <span class="bg-gray-100 text-gray-700 text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full">Seria BASIC</span>
                            <h3 class="text-2xl font-bold text-gray-900 mt-3">Złączki Zatrzaskowe MONO</h3>
                        </div>
                        <img src="{p1_img1}" class="w-20 h-20 object-contain mix-blend-multiply border border-gray-50 rounded-lg p-1">
                    </div>
                    <p class="text-gray-500 text-sm mb-6">Złączki przeznaczone do taśm jednokolorowych o szerokości 8 mm oraz 10 mm. Zapewniają szybki montaż na zatrzask oraz stabilne połączenie elektryczne.</p>
                    
                    <div class="overflow-x-auto">
                        <table class="w-full text-xs text-left">
                            <thead>
                                <tr class="text-gray-400 border-b border-gray-100 uppercase tracking-wider font-semibold">
                                    <th class="pb-2">Kod produktu</th>
                                    <th class="pb-2">Szerokość</th>
                                    <th class="pb-2">Połączenie</th>
                                    <th class="pb-2 text-right">Typ</th>
                                </tr>
                            </thead>
                            <tbody class="divide-y divide-gray-50 text-gray-700">
                                <tr><td class="py-2.5 font-bold text-gray-900">ZL-MONO-8MM-TP</td><td class="py-2.5">8 mm</td><td class="py-2.5">taśma-przewód (14cm)</td><td class="py-2.5 text-right font-bold text-prescot-orange">01</td></tr>
                                <tr><td class="py-2.5 font-bold text-gray-900">ZL-MONO-8MM-TPT</td><td class="py-2.5">8 mm</td><td class="py-2.5">taśma-przewód-taśma</td><td class="py-2.5 text-right font-bold text-prescot-orange">02</td></tr>
                                <tr><td class="py-2.5 font-bold text-gray-900">ZL-MONO-8MM-TT</td><td class="py-2.5">8 mm</td><td class="py-2.5">taśma-taśma (bezp.)</td><td class="py-2.5 text-right font-bold text-prescot-orange">03</td></tr>
                                <tr><td class="py-2.5 font-bold text-gray-900">ZL-MONO-8MM-TZ-G2.1</td><td class="py-2.5">8 mm</td><td class="py-2.5">z gniazdem DC 5.5/2.1</td><td class="py-2.5 text-right font-bold text-prescot-orange">04</td></tr>
                                <tr><td class="py-2.5 font-bold text-gray-900">ZL-MONO-10MM-TP</td><td class="py-2.5">10 mm</td><td class="py-2.5">taśma-przewód (14cm)</td><td class="py-2.5 text-right font-bold text-prescot-orange">01</td></tr>
                                <tr><td class="py-2.5 font-bold text-gray-900">ZL-MONO-10MM-TT</td><td class="py-2.5">10 mm</td><td class="py-2.5">taśma-taśma (bezp.)</td><td class="py-2.5 text-right font-bold text-prescot-orange">03</td></tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <!-- SERIA BASIC RGB/RGBW -->
            <div class="bg-white border border-gray-100 rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between">
                <div>
                    <div class="flex justify-between items-start mb-6">
                        <div>
                            <span class="bg-gray-100 text-gray-700 text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full">Seria BASIC</span>
                            <h3 class="text-2xl font-bold text-gray-900 mt-3">Złączki Zatrzaskowe RGB / RGBW</h3>
                        </div>
                        <img src="{p1_img2}" class="w-20 h-20 object-contain mix-blend-multiply border border-gray-50 rounded-lg p-1">
                    </div>
                    <p class="text-gray-500 text-sm mb-6">Złączki wielopinowe przeznaczone do taśm kolorowych RGB (10 mm, 4 PIN) oraz RGBW (12 mm, 5 PIN). Ułatwiają instalację wielokolorowego oświetlenia.</p>
                    
                    <div class="overflow-x-auto">
                        <table class="w-full text-xs text-left">
                            <thead>
                                <tr class="text-gray-400 border-b border-gray-100 uppercase tracking-wider font-semibold">
                                    <th class="pb-2">Kod produktu</th>
                                    <th class="pb-2">Szerokość / PIN</th>
                                    <th class="pb-2">Połączenie</th>
                                    <th class="pb-2 text-right">Typ</th>
                                </tr>
                            </thead>
                            <tbody class="divide-y divide-gray-50 text-gray-700">
                                <tr><td class="py-2.5 font-bold text-gray-900">ZL-RGB-10MM-TP</td><td class="py-2.5">10 mm / 4 PIN</td><td class="py-2.5">taśma-przewód (14cm)</td><td class="py-2.5 text-right font-bold text-prescot-orange">01</td></tr>
                                <tr><td class="py-2.5 font-bold text-gray-900">ZL-RGB-10MM-TPT</td><td class="py-2.5">10 mm / 4 PIN</td><td class="py-2.5">taśma-przewód-taśma</td><td class="py-2.5 text-right font-bold text-prescot-orange">02</td></tr>
                                <tr><td class="py-2.5 font-bold text-gray-900">ZL-RGB-10MM-TT</td><td class="py-2.5">10 mm / 4 PIN</td><td class="py-2.5">taśma-taśma (bezp.)</td><td class="py-2.5 text-right font-bold text-prescot-orange">03</td></tr>
                                <tr><td class="py-2.5 font-bold text-gray-900">ZL-RGBW-12MM-TP</td><td class="py-2.5">12 mm / 5 PIN</td><td class="py-2.5">taśma-przewód (14cm)</td><td class="py-2.5 text-right font-bold text-prescot-orange">01</td></tr>
                                <tr><td class="py-2.5 font-bold text-gray-900">ZL-RGBW-12MM-TPT</td><td class="py-2.5">12 mm / 5 PIN</td><td class="py-2.5">taśma-przewód-taśma</td><td class="py-2.5 text-right font-bold text-prescot-orange">02</td></tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <!-- SERIA HIPP (W żelu / Wodoodporne) -->
            <div class="bg-white border border-gray-100 rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between">
                <div>
                    <div class="flex justify-between items-start mb-6">
                        <div>
                            <span class="bg-blue-50 text-blue-700 text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full">Seria HIPP (IP65/IP67)</span>
                            <h3 class="text-2xl font-bold text-gray-900 mt-3">Złączki Przebijające HIPP</h3>
                        </div>
                        <img src="{p2_img1}" class="w-20 h-20 object-contain mix-blend-multiply border border-gray-50 rounded-lg p-1">
                    </div>
                    <p class="text-gray-500 text-sm mb-6">Innowacyjna technologia przebijania izolacji bez ściągania żelu silikonowego z taśmy LED. Zapewnia wysoką odporność na wilgoć i ekstremalnie szybki montaż.</p>
                    
                    <div class="overflow-x-auto">
                        <table class="w-full text-xs text-left">
                            <thead>
                                <tr class="text-gray-400 border-b border-gray-100 uppercase tracking-wider font-semibold">
                                    <th class="pb-2">Kod produktu</th>
                                    <th class="pb-2">Szerokość</th>
                                    <th class="pb-2">Zastosowanie</th>
                                    <th class="pb-2 text-right">Typ</th>
                                </tr>
                            </thead>
                            <tbody class="divide-y divide-gray-50 text-gray-700">
                                <tr><td class="py-2.5 font-bold text-gray-900">PR-ZLH8-MONO-TP</td><td class="py-2.5">8 mm</td><td class="py-2.5">bez żelu, taśma-przewód</td><td class="py-2.5 text-right font-bold text-prescot-orange">01</td></tr>
                                <tr><td class="py-2.5 font-bold text-gray-900">PR-ZLH8-MONO-TT</td><td class="py-2.5">8 mm</td><td class="py-2.5">bez żelu, taśma-taśma</td><td class="py-2.5 text-right font-bold text-prescot-orange">02</td></tr>
                                <tr><td class="py-2.5 font-bold text-gray-900">PR-ZLH10-MONO-TP</td><td class="py-2.5">10 mm</td><td class="py-2.5">bez żelu, taśma-przewód</td><td class="py-2.5 text-right font-bold text-prescot-orange">01</td></tr>
                                <tr><td class="py-2.5 font-bold text-gray-900">PR-ZLH10-RGB-TP</td><td class="py-2.5">10 mm (RGB)</td><td class="py-2.5">bez żelu, taśma-przewód</td><td class="py-2.5 text-right font-bold text-prescot-orange">03</td></tr>
                                <tr><td class="py-2.5 font-bold text-gray-900">PR-ZLH8W-MONO-TP</td><td class="py-2.5">8 mm (Wodoodp.)</td><td class="py-2.5">w żelu, taśma-przewód</td><td class="py-2.5 text-right font-bold text-prescot-orange">01</td></tr>
                                <tr><td class="py-2.5 font-bold text-gray-900">PR-ZLH10W-MONO-TT</td><td class="py-2.5">10 mm (Wodoodp.)</td><td class="py-2.5">w żelu, taśma-taśma</td><td class="py-2.5 text-right font-bold text-prescot-orange">02</td></tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <!-- SERIA PCB (Narożnikowe i Mostkowe) -->
            <div class="bg-white border border-gray-100 rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between">
                <div>
                    <div class="flex justify-between items-start mb-6">
                        <div>
                            <span class="bg-gray-100 text-gray-700 text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full">Seria PCB</span>
                            <h3 class="text-2xl font-bold text-gray-900 mt-3">Łączniki Narożne L / T / X</h3>
                        </div>
                        <img src="{p3_img1}" class="w-20 h-20 object-contain mix-blend-multiply border border-gray-50 rounded-lg p-1">
                    </div>
                    <p class="text-gray-500 text-sm mb-6">Płaskie laminaty połączeniowe przeznaczone do łączenia taśm pod kątem 90 stopni (kształt L), rozdzielania (kształt T) oraz krzyżowania (kształt X).</p>
                    
                    <div class="overflow-x-auto">
                        <table class="w-full text-xs text-left">
                            <thead>
                                <tr class="text-gray-400 border-b border-gray-100 uppercase tracking-wider font-semibold">
                                    <th class="pb-2">Kod produktu</th>
                                    <th class="pb-2">Model</th>
                                    <th class="pb-2">Szerokość / Typ</th>
                                    <th class="pb-2 text-right">Typ</th>
                                </tr>
                            </thead>
                            <tbody class="divide-y divide-gray-50 text-gray-700">
                                <tr><td class="py-2.5 font-bold text-gray-900">PR-ZL8L-PCB-MONO</td><td class="py-2.5">Kształt L</td><td class="py-2.5">8 mm / MONO</td><td class="py-2.5 text-right font-bold text-prescot-orange">01</td></tr>
                                <tr><td class="py-2.5 font-bold text-gray-900">PR-ZL8T-PCB-MONO</td><td class="py-2.5">Kształt T</td><td class="py-2.5">8 mm / MONO</td><td class="py-2.5 text-right font-bold text-prescot-orange">02</td></tr>
                                <tr><td class="py-2.5 font-bold text-gray-900">PR-ZL8X-PCB-MONO</td><td class="py-2.5">Kształt X</td><td class="py-2.5">8 mm / MONO</td><td class="py-2.5 text-right font-bold text-prescot-orange">03</td></tr>
                                <tr><td class="py-2.5 font-bold text-gray-900">PR-ZL10L-PCB-RGB</td><td class="py-2.5">Kształt L</td><td class="py-2.5">10 mm / RGB</td><td class="py-2.5 text-right font-bold text-prescot-orange">01</td></tr>
                                <tr><td class="py-2.5 font-bold text-gray-900">PR-ZL10T-PCB-RGB</td><td class="py-2.5">Kształt T</td><td class="py-2.5">10 mm / RGB</td><td class="py-2.5 text-right font-bold text-prescot-orange">02</td></tr>
                                <tr><td class="py-2.5 font-bold text-gray-900">PR-ZL10X-PCB-RGB</td><td class="py-2.5">Kształt X</td><td class="py-2.5">10 mm / RGB</td><td class="py-2.5 text-right font-bold text-prescot-orange">03</td></tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>
"""

# ----------------- SECTION 2: ZASILANIE I PRZEWODY DC -----------------
p4_img1 = get_image_path(4, 1)
p5_img1 = get_image_path(5, 1)
p6_img1 = get_image_path(6, 1)

sections_html += f"""
<section id="zasilanie-przewody-dc" class="py-20 bg-gray-50/50 border-b border-gray-100">
    <div class="max-w-7xl mx-auto px-6">
        <div class="mb-12">
            <span class="text-prescot-orange text-xs font-bold uppercase tracking-widest">Kategoria 02</span>
            <h2 class="text-4xl font-extrabold text-gray-900 mt-2">Złącza, Wtyki i Rozgałęźniki DC</h2>
            <p class="text-gray-500 mt-2 max-w-2xl">Elementy połączeniowe zasilania niskonapięciowego (12V/24V) - standardowe gniazda i wtyki 5.5/2.1 oraz 5.5/2.5 mm z przewodami i szybkozłączami śrubowymi.</p>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <!-- WTYKI DC Z PRZEWODEM -->
            <div class="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300">
                <div class="flex justify-between items-center mb-6">
                    <h3 class="text-xl font-bold text-gray-900">Wtyki i Gniazda z kablem</h3>
                    <img src="{p4_img1}" class="w-16 h-16 object-contain mix-blend-multiply">
                </div>
                <table class="w-full text-xs text-left text-gray-700">
                    <thead>
                        <tr class="text-gray-400 border-b border-gray-100 uppercase tracking-wider font-semibold">
                            <th class="pb-2">Kod</th>
                            <th class="pb-2">Rozmiar</th>
                            <th class="pb-2">Długość</th>
                            <th class="pb-2 text-right">Kolor</th>
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-gray-50">
                        <tr><td class="py-2 font-bold text-gray-900">WT-DC-5.5/2.1+15</td><td class="py-2">5.5/2.1</td><td class="py-2">15 cm</td><td class="py-2 text-right">biały</td></tr>
                        <tr><td class="py-2 font-bold text-gray-900">WT-DC-5.5/2.1+15CZ</td><td class="py-2">5.5/2.1</td><td class="py-2">15 cm</td><td class="py-2 text-right font-bold">czarny</td></tr>
                        <tr><td class="py-2 font-bold text-gray-900">WT-DC-5.5/2.5+15</td><td class="py-2">5.5/2.5</td><td class="py-2">15 cm</td><td class="py-2 text-right">biały</td></tr>
                        <tr><td class="py-2 font-bold text-gray-900">ROZ-DC-5.5/2.1-4X1CZ</td><td class="py-2">Rozgałęźnik x4</td><td class="py-2">24 cm</td><td class="py-2 text-right font-bold">czarny</td></tr>
                    </tbody>
                </table>
            </div>

            <!-- ZŁĄCZA HERMETYCZNE DC/RGB -->
            <div class="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300">
                <div class="flex justify-between items-center mb-6">
                    <h3 class="text-xl font-bold text-gray-900">Kable Hermetyczne ZIP</h3>
                    <img src="{p5_img1}" class="w-16 h-16 object-contain mix-blend-multiply">
                </div>
                <table class="w-full text-xs text-left text-gray-700">
                    <thead>
                        <tr class="text-gray-400 border-b border-gray-100 uppercase tracking-wider font-semibold">
                            <th class="pb-2">Kod</th>
                            <th class="pb-2">Rodzaj / PIN</th>
                            <th class="pb-2">Przewód</th>
                            <th class="pb-2 text-right">Typ</th>
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-gray-50">
                        <tr><td class="py-2 font-bold text-gray-900">LED-ZIP-Ż</td><td class="py-2">Żeńskie DC</td><td class="py-2">2x0.50 (15cm)</td><td class="py-2 text-right font-bold text-prescot-orange">01</td></tr>
                        <tr><td class="py-2 font-bold text-gray-900">LED-ZIP-M</td><td class="py-2">Męskie DC</td><td class="py-2">2x0.50 (15cm)</td><td class="py-2 text-right font-bold text-prescot-orange">1a</td></tr>
                        <tr><td class="py-2 font-bold text-gray-900">LED-ZIP-Ż-RGB</td><td class="py-2">Żeńskie RGB (4p)</td><td class="py-2">4x0.50 (15cm)</td><td class="py-2 text-right font-bold text-prescot-orange">02</td></tr>
                        <tr><td class="py-2 font-bold text-gray-900">WTYK-RGB-4PIN-CZ</td><td class="py-2">Wtyk RGB (4p)</td><td class="py-2">4x0.35 (15cm)</td><td class="py-2 text-right font-bold text-prescot-orange">04</td></tr>
                    </tbody>
                </table>
            </div>

            <!-- OSPRZĘT DC DO OBUDOWY / ZACISKI -->
            <div class="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300">
                <div class="flex justify-between items-center mb-6">
                    <h3 class="text-xl font-bold text-gray-900">Gniazda i Wtyki na Śrubę</h3>
                    <img src="{p6_img1}" class="w-16 h-16 object-contain mix-blend-multiply">
                </div>
                <table class="w-full text-xs text-left text-gray-700">
                    <thead>
                        <tr class="text-gray-400 border-b border-gray-100 uppercase tracking-wider font-semibold">
                            <th class="pb-2">Kod</th>
                            <th class="pb-2">Typ / Standard</th>
                            <th class="pb-2">Montaż</th>
                            <th class="pb-2 text-right">Typ</th>
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-gray-50">
                        <tr><td class="py-2 font-bold text-gray-900">WT-DC-5.5/2.1-PP</td><td class="py-2">Wtyk 5.5/2.1</td><td class="py-2">na przewód</td><td class="py-2 text-right font-bold text-prescot-orange">01</td></tr>
                        <tr><td class="py-2 font-bold text-gray-900">GN-DC-5.5/2.1-OB1</td><td class="py-2">Gniazdo 5.5/2.1</td><td class="py-2">do obudowy</td><td class="py-2 text-right font-bold text-prescot-orange">02</td></tr>
                        <tr><td class="py-2 font-bold text-gray-900">GN-DC-5.5/2.1ZS</td><td class="py-2">Gniazdo z zaciskiem</td><td class="py-2">zacisk śrubowy</td><td class="py-2 text-right font-bold text-prescot-orange">05</td></tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</section>
"""

# ----------------- SECTION 3: SZYBKIE POŁĄCZENIA KLIK I ZŁĄCZKI INSTALACYJNE -----------------
p7_img1 = get_image_path(7, 1)
p8_img1 = get_image_path(8, 1)
p9_img1 = get_image_path(9, 1)
p10_img1 = get_image_path(10, 1)

sections_html += f"""
<section id="szybkie-polaczenia-klik" class="py-20 border-b border-gray-100">
    <div class="max-w-7xl mx-auto px-6">
        <div class="mb-12">
            <span class="text-prescot-orange text-xs font-bold uppercase tracking-widest">Kategoria 03</span>
            <h2 class="text-4xl font-extrabold text-gray-900 mt-2">Szybkozłączki Instalacyjne i Przewody</h2>
            <p class="text-gray-500 mt-2 max-w-2xl">Niezbędne komponenty do szybkich i bezpiecznych połączeń elektrycznych niskiego i średniego napięcia. WAGO, kable sterujące TLWY, listwy śrubowe i seria FAST.</p>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <!-- SERIA KLIK -->
            <div class="bg-white border border-gray-100 rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-300">
                <div class="flex justify-between items-start mb-6">
                    <div>
                        <span class="bg-orange-50 text-prescot-orange text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full">Szybkozłączki KLIK</span>
                        <h3 class="text-2xl font-bold text-gray-900 mt-3">Złączki zatrzaskowe KLIK</h3>
                    </div>
                    <img src="{p7_img1}" class="w-16 h-16 object-contain mix-blend-multiply">
                </div>
                <p class="text-gray-500 text-sm mb-6">Wyjątkowo proste w montażu złącza taśma-przewód z długim kablem 300 cm lub zintegrowanym przewodem mostkowym.</p>
                <table class="w-full text-xs text-left text-gray-700">
                    <thead>
                        <tr class="text-gray-400 border-b border-gray-100 uppercase tracking-wider font-semibold">
                            <th class="pb-2">Kod produktu</th>
                            <th class="pb-2">PIN / Przewód</th>
                            <th class="pb-2">Zastosowanie</th>
                            <th class="pb-2 text-right">Typ</th>
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-gray-50">
                        <tr><td class="py-2.5 font-bold text-gray-900">ZL-2PIN-KLIK-W</td><td class="py-2.5">2 PIN / 15 cm</td><td class="py-2.5">Szybkie połączenie wtyk-taśma</td><td class="py-2.5 text-right font-bold text-prescot-orange">01</td></tr>
                        <tr><td class="py-2.5 font-bold text-gray-900">ZL-2PIN-KLIK300-W</td><td class="py-2.5">2 PIN / 300 cm</td><td class="py-2.5">Długi przewód przyłączeniowy</td><td class="py-2.5 text-right font-bold text-prescot-orange">02</td></tr>
                        <tr><td class="py-2.5 font-bold text-gray-900">ZL-2PIN-KLIK</td><td class="py-2.5">2 PIN / 15+15 cm</td><td class="py-2.5">Kabel mostkujący zatrzaskowy</td><td class="py-2.5 text-right font-bold text-prescot-orange">03</td></tr>
                    </tbody>
                </table>
            </div>

            <!-- UNIWERSALNE I SKRĘCANE -->
            <div class="bg-white border border-gray-100 rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-300">
                <div class="flex justify-between items-start mb-6">
                    <div>
                        <span class="bg-gray-100 text-gray-700 text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full">Złączki Tradycyjne</span>
                        <h3 class="text-2xl font-bold text-gray-900 mt-3">Złączki Elektryczne</h3>
                    </div>
                    <img src="{p8_img1}" class="w-16 h-16 object-contain mix-blend-multiply">
                </div>
                <p class="text-gray-500 text-sm mb-6">Klasyczne, skręcane i wciskane złączki instalacyjne z uziemieniem i bez, a także listwy 12-torowe od 2.5 mm do 25 mm.</p>
                <table class="w-full text-xs text-left text-gray-700">
                    <thead>
                        <tr class="text-gray-400 border-b border-gray-100 uppercase tracking-wider font-semibold">
                            <th class="pb-2">Kod produktu</th>
                            <th class="pb-2">Standard</th>
                            <th class="pb-2">Uziemienie</th>
                            <th class="pb-2 text-right">Typ</th>
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-gray-50">
                        <tr><td class="py-2.5 font-bold text-gray-900">646/A</td><td class="py-2.5">skręcane/wciskane</td><td class="py-2.5">NIE</td><td class="py-2.5 text-right font-bold text-prescot-orange">01</td></tr>
                        <tr><td class="py-2.5 font-bold text-gray-900">673/A</td><td class="py-2.5">skręcane (z uchwytem)</td><td class="py-2.5">TAK</td><td class="py-2.5 text-right font-bold text-prescot-orange">02</td></tr>
                        <tr><td class="py-2.5 font-bold text-gray-900">ZL-2X-PUSH</td><td class="py-2.5">szybkozłączka wciskana 2x</td><td class="py-2.5">NIE</td><td class="py-2.5 text-right font-bold text-prescot-orange">06</td></tr>
                    </tbody>
                </table>
            </div>

            <!-- SERIA FAST (Rozgałęźniki samozaciskowe) -->
            <div class="bg-white border border-gray-100 rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-300">
                <div class="flex justify-between items-start mb-6">
                    <div>
                        <span class="bg-gray-100 text-gray-700 text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full">Seria FAST</span>
                        <h3 class="text-2xl font-bold text-gray-900 mt-3">Złączki Zaciskowe FAST T / H</h3>
                    </div>
                    <img src="{p9_img1}" class="w-16 h-16 object-contain mix-blend-multiply">
                </div>
                <p class="text-gray-500 text-sm mb-6">Szybkie rozgałęzianie i łączenie przewodów 1-2 żyłowych bez ściągania izolacji. Wystarczy docisnąć kombinerkami.</p>
                <table class="w-full text-xs text-left text-gray-700">
                    <thead>
                        <tr class="text-gray-400 border-b border-gray-100 uppercase tracking-wider font-semibold">
                            <th class="pb-2">Kod produktu</th>
                            <th class="pb-2">Model / Kształt</th>
                            <th class="pb-2">Zastosowanie</th>
                            <th class="pb-2 text-right">Typ</th>
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-gray-50">
                        <tr><td class="py-2.5 font-bold text-gray-900">PR-ZPF-T1</td><td class="py-2.5">Rozgałęźnik T</td><td class="py-2.5">Rozdzielenie przewodu bez lutowania</td><td class="py-2.5 text-right font-bold text-prescot-orange">01</td></tr>
                        <tr><td class="py-2.5 font-bold text-gray-900">PR-ZPF-H1</td><td class="py-2.5">Konektor H</td><td class="py-2.5">Przedłużenie linii zasilającej</td><td class="py-2.5 text-right font-bold text-prescot-orange">03</td></tr>
                        <tr><td class="py-2.5 font-bold text-gray-900">ZL-12X2.5B</td><td class="py-2.5">Listwa 12-torowa</td><td class="py-2.5">Kostka 12x 2.5mm2 biała</td><td class="py-2.5 text-right font-bold text-prescot-orange">-</td></tr>
                    </tbody>
                </table>
            </div>

            <!-- SERIA WAGO ORAZ PRZEWODY -->
            <div class="bg-white border border-gray-100 rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-300">
                <div class="flex justify-between items-start mb-6">
                    <div>
                        <span class="bg-orange-50 text-prescot-orange text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full">WAGO / TLWY</span>
                        <h3 class="text-2xl font-bold text-gray-900 mt-3">Złączki WAGO i Kable</h3>
                    </div>
                    <img src="{p10_img1}" class="w-16 h-16 object-contain mix-blend-multiply">
                </div>
                <p class="text-gray-500 text-sm mb-6">Oryginalne złączki zaciskowe WAGO serii 221 (otwierane z dźwignią) oraz 2273 (wciskane compact). Specjalistyczne przewody RGB i instalacyjne TLYP.</p>
                <table class="w-full text-xs text-left text-gray-700">
                    <thead>
                        <tr class="text-gray-400 border-b border-gray-100 uppercase tracking-wider font-semibold">
                            <th class="pb-2">Kod produktu</th>
                            <th class="pb-2">Typ / Żyły</th>
                            <th class="pb-2">Złącze / Izolacja</th>
                            <th class="pb-2 text-right">Typ</th>
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-gray-50">
                        <tr><td class="py-2.5 font-bold text-gray-900">221-412</td><td class="py-2.5">WAGO 2x4 mm2</td><td class="py-2.5">Sprężynowy z dźwignią</td><td class="py-2.5 text-right font-bold text-prescot-orange">01</td></tr>
                        <tr><td class="py-2.5 font-bold text-gray-900">2273-203</td><td class="py-2.5">WAGO 3x2.5 mm2</td><td class="py-2.5">Kompaktowy wciskany drut</td><td class="py-2.5 text-right font-bold text-prescot-orange">03</td></tr>
                        <tr><td class="py-2.5 font-bold text-gray-900">TLWY4035</td><td class="py-2.5">Kabel RGB 4x0.35</td><td class="py-2.5">Specjalistyczny przewód sterujący</td><td class="py-2.5 text-right font-bold text-prescot-orange">-</td></tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</section>
"""

# ----------------- SECTION 4: PRZYCISKI, WŁĄCZNIKI I ZŁĄCZKI HERMETYCZNE THB -----------------
p11_img1 = get_image_path(11, 1)
p12_img1 = get_image_path(12, 1)
p13_img1 = get_image_path(13, 1)

sections_html += f"""
<section id="przełączniki-hermetyki" class="py-20 bg-gray-50/50 border-b border-gray-100">
    <div class="max-w-7xl mx-auto px-6">
        <div class="mb-12">
            <span class="text-prescot-orange text-xs font-bold uppercase tracking-widest">Kategoria 04</span>
            <h2 class="text-4xl font-extrabold text-gray-900 mt-2">Przełączniki i Złącza Hermetyczne IP68</h2>
            <p class="text-gray-500 mt-2 max-w-2xl">Profesjonalne włączniki kołyskowe i przyciski wandaloodporne LED oraz najwyższej klasy złączki przemysłowe THB o podwyższonej szczelności do wymagających środowisk zewnętrznych.</p>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <!-- PRZYCISKI I KOŁYSKI -->
            <div class="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300">
                <div class="flex justify-between items-center mb-6">
                    <h3 class="text-xl font-bold text-gray-900">Przyciski i Włączniki</h3>
                    <img src="{p11_img1}" class="w-16 h-16 object-contain mix-blend-multiply">
                </div>
                <p class="text-gray-500 text-xs mb-4">Włączniki wandaloodporne metalowe z ringiem LED (otwór 16 mm) oraz tradycyjne kołyskowe w trzech wariantach kolorystycznych.</p>
                <table class="w-full text-xs text-left text-gray-700">
                    <thead>
                        <tr class="text-gray-400 border-b border-gray-100 uppercase tracking-wider font-semibold">
                            <th class="pb-2">Kod</th>
                            <th class="pb-2">Podświetlenie</th>
                            <th class="pb-2">Montaż</th>
                            <th class="pb-2 text-right">Typ</th>
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-gray-50">
                        <tr><td class="py-2 font-bold text-gray-900">PS11ABK</td><td class="py-2">brak</td><td class="py-2">Otwór 12 mm</td><td class="py-2 text-right font-bold text-prescot-orange">01</td></tr>
                        <tr><td class="py-2 font-bold text-gray-900">PRZ-LED-12-B</td><td class="py-2">Niebieski ring</td><td class="py-2">Otwór 16 mm</td><td class="py-2 text-right font-bold text-prescot-orange">06</td></tr>
                        <tr><td class="py-2 font-bold text-gray-900">PR-WLK-CZ</td><td class="py-2">brak (kołyskowy)</td><td class="py-2">Otwór 19.4 mm</td><td class="py-2 text-right font-bold text-prescot-orange">02</td></tr>
                    </tbody>
                </table>
            </div>

            <!-- THB NA PRZEWÓD -->
            <div class="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300">
                <div class="flex justify-between items-center mb-6">
                    <h3 class="text-xl font-bold text-gray-900">Złącza THB (Na Przewód)</h3>
                    <img src="{p12_img1}" class="w-16 h-16 object-contain mix-blend-multiply">
                </div>
                <p class="text-gray-500 text-xs mb-4">Przemysłowe złącza hermetyczne IP68 z mechaniczną blokadą wkręcaną i uszczelkami pod przewody od 0.25 mm2 do 4 mm2.</p>
                <table class="w-full text-xs text-left text-gray-700">
                    <thead>
                        <tr class="text-gray-400 border-b border-gray-100 uppercase tracking-wider font-semibold">
                            <th class="pb-2">Kod</th>
                            <th class="pb-2">PIN / IP</th>
                            <th class="pb-2">Złącze</th>
                            <th class="pb-2 text-right">Typ</th>
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-gray-50">
                        <tr><td class="py-2 font-bold text-gray-900">THB.381.A2A</td><td class="py-2">2 PIN / IP69K</td><td class="py-2">Wtyk (na kabel)</td><td class="py-2 text-right font-bold text-prescot-orange">01</td></tr>
                        <tr><td class="py-2 font-bold text-gray-900">THB.387.A5A</td><td class="py-2">5 PIN / IP68</td><td class="py-2">Wtyk (na kabel)</td><td class="py-2 text-right font-bold text-prescot-orange">05</td></tr>
                        <tr><td class="py-2 font-bold text-gray-900">THB.391.A3A</td><td class="py-2">3 PIN / IP68</td><td class="py-2">Złączka przelot.</td><td class="py-2 text-right font-bold text-prescot-orange">07</td></tr>
                    </tbody>
                </table>
            </div>

            <!-- THB DO OBUDOWY -->
            <div class="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300">
                <div class="flex justify-between items-center mb-6">
                    <h3 class="text-xl font-bold text-gray-900">Złącza THB (Do Obudowy)</h3>
                    <img src="{p13_img1}" class="w-16 h-16 object-contain mix-blend-multiply">
                </div>
                <p class="text-gray-500 text-xs mb-4">Gniazda i wtyki tablicowe przeznaczone do wbudowania w obudowy lamp ogrodowych, naświetlaczy lub hermetycznych puszek rozdzielczych.</p>
                <table class="w-full text-xs text-left text-gray-700">
                    <thead>
                        <tr class="text-gray-400 border-b border-gray-100 uppercase tracking-wider font-semibold">
                            <th class="pb-2">Kod</th>
                            <th class="pb-2">PIN / IP</th>
                            <th class="pb-2">Montaż</th>
                            <th class="pb-2 text-right">Typ</th>
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-gray-50">
                        <tr><td class="py-2 font-bold text-gray-900">THB.387.E2A</td><td class="py-2">2 PIN / IP68</td><td class="py-2">Wtyk panelowy</td><td class="py-2 text-right font-bold text-prescot-orange">02</td></tr>
                        <tr><td class="py-2 font-bold text-gray-900">THB.387.F5A</td><td class="py-2">5 PIN / IP68</td><td class="py-2">Gniazdo panel.</td><td class="py-2 text-right font-bold text-prescot-orange">04</td></tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</section>
"""

# ----------------- SECTION 5: BATERIE I INNE AKCESORIA -----------------
p14_img1 = get_image_path(14, 1)

sections_html += f"""
<section id="baterie-akcesoria-rozne" class="py-20">
    <div class="max-w-7xl mx-auto px-6">
        <div class="mb-12">
            <span class="text-prescot-orange text-xs font-bold uppercase tracking-widest">Kategoria 05</span>
            <h2 class="text-4xl font-extrabold text-gray-900 mt-2">Baterie, Koszyki i Włączniki Przelotowe</h2>
            <p class="text-gray-500 mt-2 max-w-2xl">Zasilanie autonomiczne oraz akcesoria stołowe - koszyki na baterie AA/AAA z wyprowadzonym przewodem, akumulatory i włączniki przelotowe kablowe.</p>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <!-- BATERIE I KOSZYKI -->
            <div class="bg-white border border-gray-100 rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-300">
                <div class="flex justify-between items-center mb-6">
                    <h3 class="text-2xl font-bold text-gray-900">Autonomiczne Zasilanie</h3>
                    <img src="{p14_img1}" class="w-16 h-16 object-contain mix-blend-multiply">
                </div>
                <p class="text-gray-500 text-sm mb-6">Pojemniki bateryjne (koszyki) na baterie alkaliczne lub akumulatorki formatu AA i AAA do mobilnych lub awaryjnych projektów LED.</p>
                <table class="w-full text-xs text-left text-gray-700">
                    <thead>
                        <tr class="text-gray-400 border-b border-gray-100 uppercase tracking-wider font-semibold">
                            <th class="pb-2">Kod produktu</th>
                            <th class="pb-2">Typ / Ilość miejsc</th>
                            <th class="pb-2">Standard</th>
                            <th class="pb-2 text-right">Typ</th>
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-gray-50">
                        <tr><td class="py-2.5 font-bold text-gray-900">PBAT-AA-4</td><td class="py-2.5">Koszyk na 4 baterie</td><td class="py-2.5">AA (6V wyjście)</td><td class="py-2.5 text-right font-bold text-prescot-orange">03</td></tr>
                        <tr><td class="py-2.5 font-bold text-gray-900">8851</td><td class="py-2.5">Akumulatorki AA (4 szt.)</td><td class="py-2.5">Ni-MH 1.2V (Rechargeable)</td><td class="py-2.5 text-right font-bold text-prescot-orange">01</td></tr>
                    </tbody>
                </table>
            </div>

            <!-- INNE AKCESORIA -->
            <div class="bg-white border border-gray-100 rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-300">
                <div class="flex justify-between items-center mb-6">
                    <h3 class="text-2xl font-bold text-gray-900">Akcesoria Różne</h3>
                    <div class="w-8 h-8 rounded-full bg-prescot-orange/10 flex items-center justify-center text-prescot-orange text-lg">💡</div>
                </div>
                <p class="text-gray-500 text-sm mb-6">Włączniki kołyskowe przelotowe montowane na przewód płaski dwużyłowy (stołowe, biurkowe), ułatwiające sterowanie zasilaniem 230V w lampach.</p>
                <table class="w-full text-xs text-left text-gray-700">
                    <thead>
                        <tr class="text-gray-400 border-b border-gray-100 uppercase tracking-wider font-semibold">
                            <th class="pb-2">Kod produktu</th>
                            <th class="pb-2">Opis / Funkcja</th>
                            <th class="pb-2 text-right">Kolor</th>
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-gray-50">
                        <tr><td class="py-2.5 font-bold text-gray-900">S/575/N</td><td class="py-2.5">Włącznik przelotowy kablowy (max 2A)</td><td class="py-2.5 text-right">czarny</td></tr>
                        <tr><td class="py-2.5 font-bold text-gray-900">PR-WLP-B</td><td class="py-2.5">Przełącznik przelotowy lampowy</td><td class="py-2.5 text-right">biały</td></tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</section>
"""

# Compile full document
html_template = f"""<!DOCTYPE html>
<html lang="pl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>PRESCOT LED • Profesjonalne Akcesoria i Złączki 2026</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;600;700;800&family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    <script>
        tailwind.config = {{
            theme: {{
                extend: {{
                    fontFamily: {{
                        sans: ['Inter', 'sans-serif'],
                        heading: ['Outfit', 'sans-serif']
                    }},
                    colors: {{
                        'prescot-orange': '#FF4B00',
                        'prescot-dark': '#111827'
                    }}
                }}
            }}
        }}
    </script>
    <style>
        h1, h2, h3, h4 {{
            font-family: 'Outfit', sans-serif;
        }}
        body {{
            scroll-behavior: smooth;
        }}
    </style>
</head>
<body class="bg-[#FAFAFA] text-gray-800 antialiased font-sans">

    <!-- HEADER / NAVIGATION -->
    <header class="sticky top-0 bg-white/80 backdrop-blur-md border-b border-gray-100 z-50">
        <div class="max-w-7xl mx-auto px-6 h-20 flex justify-between items-center">
            <a href="#" class="flex items-center">
                <img src="assets/logo.svg" alt="PRESCOT Logo" class="h-8">
            </a>
            <nav class="hidden md:flex gap-8 text-sm font-semibold text-gray-600">
                <a href="#zlaczki-tasm-led" class="hover:text-prescot-orange transition-colors">Złączki LED</a>
                <a href="#zasilanie-przewody-dc" class="hover:text-prescot-orange transition-colors">Przewody i Złącza DC</a>
                <a href="#szybkie-polaczenia-klik" class="hover:text-prescot-orange transition-colors">Szybkozłączki</a>
                <a href="#przełączniki-hermetyki" class="hover:text-prescot-orange transition-colors">Przełączniki IP68</a>
                <a href="#baterie-akcesoria-rozne" class="hover:text-prescot-orange transition-colors">Zasilanie bateryjne</a>
            </nav>
            <div class="text-xs font-bold tracking-[0.2em] text-prescot-orange uppercase border border-prescot-orange/20 px-3 py-1.5 rounded-full bg-prescot-orange/5">
                Katalog 2026
            </div>
        </div>
    </header>

    <!-- HERO SECTION - PREMIUM GRAPHICS & SLOGAN -->
    <section class="relative bg-white border-b border-gray-100 overflow-hidden py-32">
        <div class="absolute inset-0 z-0 opacity-5">
            <img src="{cover_src}" class="w-full h-full object-cover">
        </div>
        <div class="max-w-7xl mx-auto px-6 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div class="lg:col-span-7">
                <span class="text-prescot-orange text-sm font-bold uppercase tracking-[0.3em]">PROFESSIONAL LIGHTING HARDWARE</span>
                <h1 class="text-5xl lg:text-7xl font-black text-gray-900 leading-none uppercase tracking-tight mt-4">
                    Akcesoria<br>Instalacyjne <span class="text-prescot-orange">LED</span>
                </h1>
                <p class="text-gray-500 text-lg mt-6 max-w-xl">
                    Katalog produktowy osprzętu przyłączeniowego, profesjonalnych złączek zatrzaskowych, kabli i przełączników sterujących dla dystrybutorów i instalatorów oświetlenia.
                </p>
                <div class="flex gap-4 mt-8">
                    <a href="#zlaczki-tasm-led" class="bg-prescot-orange hover:bg-prescot-orange/95 text-white font-bold text-sm px-8 py-4 rounded-xl shadow-lg shadow-prescot-orange/20 transition-all">Przeglądaj produkty</a>
                    <a href="javascript:window.print();" class="bg-gray-900 hover:bg-gray-800 text-white font-bold text-sm px-8 py-4 rounded-xl transition-all">Drukuj ofertę</a>
                </div>
            </div>
            <div class="lg:col-span-5 relative flex justify-center items-center">
                <!-- Large product presentation in hero -->
                <div class="relative w-80 h-80 bg-[#FAFAFA] border border-gray-100 rounded-3xl p-8 flex items-center justify-center shadow-2xl">
                    <img src="{p1_img1}" class="w-full h-full object-contain mix-blend-multiply">
                    <div class="absolute -bottom-4 -right-4 bg-prescot-orange text-white text-xs font-bold px-4 py-2 rounded-lg shadow-lg">
                        ZL-MONO-8MM
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- CONTENT -->
    {sections_html}

    <!-- FOOTER -->
    <footer class="bg-gray-950 text-white py-16 border-t border-gray-900">
        <div class="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12">
            <div>
                <img src="assets/logo.svg" alt="PRESCOT Logo" class="h-8 mb-6 brightness-0 invert">
                <p class="text-gray-500 text-sm max-w-xs">Profesjonalne systemy oświetleniowe i akcesoria instalacyjne najwyższej klasy. Gwarancja niezawodności.</p>
            </div>
            <div>
                <h4 class="text-sm font-bold uppercase tracking-wider text-gray-400 mb-6">Zakres oferty</h4>
                <ul class="text-gray-500 text-sm space-y-3">
                    <li>Złączki zatrzaskowe BASIC / HIPP</li>
                    <li>Narożniki PCB i mostki</li>
                    <li>Przewody, wtyki i rozgałęźniki DC</li>
                    <li>Złącza hermetyczne przemysłowe THB</li>
                </ul>
            </div>
            <div>
                <h4 class="text-sm font-bold uppercase tracking-wider text-gray-400 mb-6">Kontakt</h4>
                <p class="text-gray-500 text-sm">PRESCOT Sp. z o.o.<br>Polskie Centrum Dystrybucyjne<br>prescot.pl</p>
            </div>
        </div>
        <div class="max-w-7xl mx-auto px-6 mt-16 pt-8 border-t border-gray-900 flex justify-between items-center text-xs text-gray-600">
            <p>&copy; 2026 PRESCOT. Wszelkie prawa zastrzeżone.</p>
            <p>Wydanie cyfrowe 2026.1</p>
        </div>
    </footer>

</body>
</html>
"""

# Replace in final string
final_html_full = html_template.replace("{sections_html}", sections_html)

with open(TEMPLATE_PATH, "w", encoding="utf-8") as f:
    f.write(final_html_full)

print("Super-premium B2B web catalog compiled successfully.")
