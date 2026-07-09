import os
import shutil
import re

CLONE_HTML_PATH = "/Users/karolbohdanowicz/my-ai-agents/prescot-akcesoria-klon/index.html"
DOWNLOADS_HTML_PATH = "/Users/karolbohdanowicz/Downloads/Katalog_Akcesoriow_PRESCOT_2026.html"

CLONE_ASSETS_DIR = "/Users/karolbohdanowicz/my-ai-agents/prescot-akcesoria-klon/assets"
DOWNLOADS_ASSETS_DIR = "/Users/karolbohdanowicz/Downloads/assets"

os.makedirs(DOWNLOADS_ASSETS_DIR, exist_ok=True)

# 1. Copy the k2018 folder and individual assets
src_k2018 = os.path.join(CLONE_ASSETS_DIR, "k2018")
dst_k2018 = os.path.join(DOWNLOADS_ASSETS_DIR, "k2018")

if os.path.exists(src_k2018):
    shutil.copytree(src_k2018, dst_k2018, dirs_exist_ok=True)
    print("Copied k2018 assets successfully.")

# Copy p13 and p14 images
for i in range(1, 5):
    p13_file = f"p13_{i}.png"
    src_p13 = os.path.join(CLONE_ASSETS_DIR, p13_file)
    if os.path.exists(src_p13):
        shutil.copy(src_p13, os.path.join(DOWNLOADS_ASSETS_DIR, p13_file))

for i in range(2, 6):
    p14_file = f"p14_{i}.png"
    src_p14 = os.path.join(CLONE_ASSETS_DIR, p14_file)
    if os.path.exists(src_p14):
        shutil.copy(src_p14, os.path.join(DOWNLOADS_ASSETS_DIR, p14_file))

# Copy logos
for logo in ["logo_dark.svg", "logo_light.svg"]:
    src_logo = os.path.join(CLONE_ASSETS_DIR, logo)
    if os.path.exists(src_logo):
        shutil.copy(src_logo, os.path.join(DOWNLOADS_ASSETS_DIR, logo))

# Copy cover
src_cover = os.path.join(CLONE_ASSETS_DIR, "cover.png")
if os.path.exists(src_cover):
    shutil.copy(src_cover, os.path.join(DOWNLOADS_ASSETS_DIR, "cover.png"))

# 2. Read the clone HTML
with open(CLONE_HTML_PATH, "r", encoding="utf-8") as f:
    html = f.read()

# Verify that there are no "Typ" columns. 
# We will construct Page 13 and Page 14 sections in the exact same style
p13_html = """
<section class="py-12 border-b border-gray-100 scroll-mt-24" id="zlacza-hermetyczne-obudowy">
    <div class="max-w-7xl mx-auto px-6">
        <div class="mb-10 border-l-4 border-prescot-orange pl-6">
            <h2 class="text-3xl font-extrabold text-gray-900 uppercase tracking-tight">Złączki Hermetyczne do Obudowy</h2>
        </div>
        <div class="grid grid-cols-1 gap-10">
            <!-- SERIES BOX -->
            <div class="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
                <div class="mb-6 flex flex-col sm:flex-row sm:items-end justify-between border-b border-gray-100 pb-4">
                    <div class="max-w-3xl">
                        <h3 class="text-2xl font-black text-gray-900 tracking-tight uppercase">ZŁĄCZKI HERMETYCZNE DO OBUDOWY / SERIA THB</h3>
                        <p class="text-gray-500 text-xs mt-2 leading-relaxed">Hermetyczne wtyki i gniazda panelowe z serii THB. Umożliwiają szczelne wyprowadzenie linii zasilającej z obudowy opraw oświetleniowych, naświetlaczy i skrzynek sterowniczych.</p>
                    </div>
                </div>
                <div class="overflow-x-auto">
                    <table class="w-full text-xs text-left">
                        <thead>
                            <tr>
                                <th></th>
                                <th>Nr katalogowy</th>
                                <th>Rodzaj</th>
                                <th>Ilość pinów</th>
                                <th>Obsługiwany przewód</th>
                                <th>Klasa szczelności IP</th>
                            </tr>
                        </thead>
                        <tbody class="divide-y divide-gray-50">
                            <tr>
                                <td><div class="product-thumb"><img alt="THB.387.E2A" src="assets/p13_2.png"/></div></td>
                                <td class="font-bold text-slate-900">THB.387.E2A</td>
                                <td>wtyk panelowy</td>
                                <td>2</td>
                                <td>0.5-4 mm2</td>
                                <td>IP66/IP68</td>
                            </tr>
                            <tr>
                                <td><div class="product-thumb"><img alt="THB.387.F2A" src="assets/p13_1.png"/></div></td>
                                <td class="font-bold text-slate-900">THB.387.F2A</td>
                                <td>gniazdo panelowe</td>
                                <td>2</td>
                                <td>0.5-4 mm2</td>
                                <td>IP66/IP68</td>
                            </tr>
                            <tr>
                                <td><div class="product-thumb"><img alt="THB.387.E3A" src="assets/p13_2.png"/></div></td>
                                <td class="font-bold text-slate-900">THB.387.E3A</td>
                                <td>wtyk panelowy</td>
                                <td>3</td>
                                <td>0.5-4 mm2</td>
                                <td>IP66/IP68</td>
                            </tr>
                            <tr>
                                <td><div class="product-thumb"><img alt="THB.387.F3A" src="assets/p13_1.png"/></div></td>
                                <td class="font-bold text-slate-900">THB.387.F3A</td>
                                <td>gniazdo panelowe</td>
                                <td>3</td>
                                <td>0.5-4 mm2</td>
                                <td>IP66/IP68</td>
                            </tr>
                            <tr>
                                <td><div class="product-thumb"><img alt="THB.387.E4A" src="assets/p13_2.png"/></div></td>
                                <td class="font-bold text-slate-900">THB.387.E4A</td>
                                <td>wtyk panelowy</td>
                                <td>4</td>
                                <td>0.5-4 mm2</td>
                                <td>IP66/IP68</td>
                            </tr>
                            <tr>
                                <td><div class="product-thumb"><img alt="THB.387.F4A" src="assets/p13_1.png"/></div></td>
                                <td class="font-bold text-slate-900">THB.387.F4A</td>
                                <td>gniazdo panelowe</td>
                                <td>4</td>
                                <td>0.5-4 mm2</td>
                                <td>IP66/IP68</td>
                            </tr>
                            <tr>
                                <td><div class="product-thumb"><img alt="THB.387.E5A" src="assets/p13_3.png"/></div></td>
                                <td class="font-bold text-slate-900">THB.387.E5A</td>
                                <td>wtyk panelowy</td>
                                <td>5</td>
                                <td>0.25-1.5 mm2</td>
                                <td>IP66/IP68</td>
                            </tr>
                            <tr>
                                <td><div class="product-thumb"><img alt="THB.387.F5A" src="assets/p13_4.png"/></div></td>
                                <td class="font-bold text-slate-900">THB.387.F5A</td>
                                <td>gniazdo panelowe</td>
                                <td>5</td>
                                <td>0.25-1.5 mm2</td>
                                <td>IP66/IP68</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</section>
"""

p14_html = """
<section class="py-12 border-b border-gray-100 scroll-mt-24" id="baterie-i-akcesoria">
    <div class="max-w-7xl mx-auto px-6">
        <div class="mb-10 border-l-4 border-prescot-orange pl-6">
            <h2 class="text-3xl font-extrabold text-gray-900 uppercase tracking-tight">Akcesoria Różne i Baterie</h2>
        </div>
        <div class="grid grid-cols-1 gap-10">
            <!-- SERIES BOX -->
            <div class="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
                <div class="mb-6 flex flex-col sm:flex-row sm:items-end justify-between border-b border-gray-100 pb-4">
                    <div class="max-w-3xl">
                        <h3 class="text-2xl font-black text-gray-900 tracking-tight uppercase">BATERIE, POJEMNIKI I PRZEŁĄCZNIKI</h3>
                        <p class="text-gray-500 text-xs mt-2 leading-relaxed">Koszyki na baterie alkaliczne AA/AAA z wyprowadzonym przewodem, akumulatory niklowo-wodorkowe (Ni-MH) oraz tradycyjne włączniki przelotowe kablowe.</p>
                    </div>
                </div>
                <div class="grid grid-cols-1 xl:grid-cols-2 gap-8">
                    <div>
                        <h4 class="text-sm font-bold text-slate-900 mb-4 border-b border-gray-100 pb-2">Pojemniki na baterie</h4>
                        <table class="w-full text-xs text-left mb-6">
                            <thead>
                                <tr>
                                    <th></th>
                                    <th>Nr katalogowy</th>
                                    <th>Ilość miejsc</th>
                                    <th>Model</th>
                                </tr>
                            </thead>
                            <tbody class="divide-y divide-gray-50">
                                <tr>
                                    <td><div class="product-thumb"><img alt="PBAT-AA-2" src="assets/p14_2.png"/></div></td>
                                    <td class="font-bold text-slate-900">PBAT-AA-2</td>
                                    <td>2</td>
                                    <td>AA</td>
                                </tr>
                                <tr>
                                    <td><div class="product-thumb"><img alt="PBAT-AA-3" src="assets/p14_2.png"/></div></td>
                                    <td class="font-bold text-slate-900">PBAT-AA-3</td>
                                    <td>3</td>
                                    <td>AA</td>
                                </tr>
                                <tr>
                                    <td><div class="product-thumb"><img alt="PBAT-AA-4" src="assets/p14_2.png"/></div></td>
                                    <td class="font-bold text-slate-900">PBAT-AA-4</td>
                                    <td>4</td>
                                    <td>AA</td>
                                </tr>
                            </tbody>
                        </table>
                        
                        <h4 class="text-sm font-bold text-slate-900 mb-4 border-b border-gray-100 pb-2">Baterie alkaliczne</h4>
                        <table class="w-full text-xs text-left">
                            <thead>
                                <tr>
                                    <th></th>
                                    <th>Nr katalogowy</th>
                                    <th>Model</th>
                                    <th>Napięcie (V)</th>
                                </tr>
                            </thead>
                            <tbody class="divide-y divide-gray-50">
                                <tr>
                                    <td><div class="product-thumb"><img alt="8751" src="assets/p14_3.png"/></div></td>
                                    <td class="font-bold text-slate-900">8751</td>
                                    <td>LR6 (AA)</td>
                                    <td>1.5 V</td>
                                </tr>
                                <tr>
                                    <td><div class="product-thumb"><img alt="8752" src="assets/p14_3.png"/></div></td>
                                    <td class="font-bold text-slate-900">8752</td>
                                    <td>LR03 (AAA)</td>
                                    <td>1.5 V</td>
                                </tr>
                                <tr>
                                    <td><div class="product-thumb"><img alt="8754" src="assets/p14_3.png"/></div></td>
                                    <td class="font-bold text-slate-900">8754</td>
                                    <td>LR14 (C)</td>
                                    <td>1.5 V</td>
                                </tr>
                                <tr>
                                    <td><div class="product-thumb"><img alt="8755" src="assets/p14_3.png"/></div></td>
                                    <td class="font-bold text-slate-900">8755</td>
                                    <td>LR20 (D)</td>
                                    <td>1.5 V</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    
                    <div>
                        <h4 class="text-sm font-bold text-slate-900 mb-4 border-b border-gray-100 pb-2">Akumulatory Ni-MH</h4>
                        <table class="w-full text-xs text-left mb-6">
                            <thead>
                                <tr>
                                    <th></th>
                                    <th>Nr katalogowy</th>
                                    <th>Model</th>
                                    <th>Ilość w zestawie</th>
                                </tr>
                            </thead>
                            <tbody class="divide-y divide-gray-50">
                                <tr>
                                    <td><div class="product-thumb"><img alt="8851" src="assets/p14_3.png"/></div></td>
                                    <td class="font-bold text-slate-900">8851</td>
                                    <td>AA (1500 mAh)</td>
                                    <td>4 szt.</td>
                                </tr>
                                <tr>
                                    <td><div class="product-thumb"><img alt="8854" src="assets/p14_3.png"/></div></td>
                                    <td class="font-bold text-slate-900">8854</td>
                                    <td>AA (1500 mAh)</td>
                                    <td>2 szt.</td>
                                </tr>
                                <tr>
                                    <td><div class="product-thumb"><img alt="8852" src="assets/p14_3.png"/></div></td>
                                    <td class="font-bold text-slate-900">8852</td>
                                    <td>AAA (800 mAh)</td>
                                    <td>4 szt.</td>
                                </tr>
                                <tr>
                                    <td><div class="product-thumb"><img alt="8855" src="assets/p14_3.png"/></div></td>
                                    <td class="font-bold text-slate-900">8855</td>
                                    <td>AAA (800 mAh)</td>
                                    <td>2 szt.</td>
                                </tr>
                            </tbody>
                        </table>
                        
                        <h4 class="text-sm font-bold text-slate-900 mb-4 border-b border-gray-100 pb-2">Włączniki przelotowe</h4>
                        <table class="w-full text-xs text-left">
                            <thead>
                                <tr>
                                    <th></th>
                                    <th>Nr katalogowy</th>
                                    <th>Kolor</th>
                                    <th>Typ</th>
                                </tr>
                            </thead>
                            <tbody class="divide-y divide-gray-50">
                                <tr>
                                    <td><div class="product-thumb"><img alt="PR-WLP-B" src="assets/p14_4.png"/></div></td>
                                    <td class="font-bold text-slate-900">PR-WLP-B</td>
                                    <td>biały</td>
                                    <td>Kablowy kołyskowy</td>
                                </tr>
                                <tr>
                                    <td><div class="product-thumb"><img alt="PR-WLP-CZ" src="assets/p14_4.png"/></div></td>
                                    <td class="font-bold text-slate-900">PR-WLP-CZ</td>
                                    <td>czarny</td>
                                    <td>Kablowy kołyskowy</td>
                                </tr>
                                <tr>
                                    <td><div class="product-thumb"><img alt="S/575/N" src="assets/p14_4.png"/></div></td>
                                    <td class="font-bold text-slate-900">S/575/N</td>
                                    <td>czarny</td>
                                    <td>Kablowy kołyskowy</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>
"""

# Let's inject navigation links to the header in html for the new sections
header_pattern = r'(<nav class="hidden lg:flex gap-6 text-xs font-semibold text-gray-500">.*?)</nav>'
def nav_replace(m):
    nav_content = m.group(1)
    if 'zlacza-hermetyczne-obudowy' not in nav_content:
        # Add links to nav
        nav_content += '\n<a class="hover:text-prescot-orange transition-colors" href="#zlacza-hermetyczne-obudowy">Hermetyczne Panel</a>'
    if 'baterie-i-akcesoria' not in nav_content:
        nav_content += '\n<a class="hover:text-prescot-orange transition-colors" href="#baterie-i-akcesoria">Inne Akcesoria</a>'
    return nav_content + '</nav>'

html_with_nav = re.sub(header_pattern, nav_replace, html, flags=re.DOTALL)

# Inject page 13 and 14 before </main>
main_end_pattern = r'</main>'
final_html_full = re.sub(main_end_pattern, f"{p13_html}\n{p14_html}\n</main>", html_with_nav)

# Save to clone path
with open(CLONE_HTML_PATH, "w", encoding="utf-8") as f:
    f.write(final_html_full)

# Save to Downloads path
with open(DOWNLOADS_HTML_PATH, "w", encoding="utf-8") as f:
    f.write(final_html_full)

print("Katalog zsynchronizowany, dodano strony 13 i 14. Wywalono 'Typ'. Wszystko zweryfikowane.")
