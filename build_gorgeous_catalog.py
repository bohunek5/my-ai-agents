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

page_images_cache = {}
for p in range(1, 15):
    pattern = os.path.join(EXTRACTED_IMG_DIR, f"img_page{p}_*.png")
    images = glob.glob(pattern)
    images.sort(key=lambda x: int(re.search(r'xref(\d+)', x).group(1)) if re.search(r'xref(\d+)', x) else 0)
    page_images_cache[p] = images

def get_image_for_item(page_num, typ_str, item_idx):
    match = re.search(r'(\d+)', str(typ_str))
    img_idx = 0
    if match:
        img_idx = int(match.group(1)) - 1
    else:
        img_idx = item_idx
        
    images = page_images_cache.get(page_num, [])
    if 0 <= img_idx < len(images):
        basename = os.path.basename(images[img_idx])
        dest_name = f"p{page_num}_{img_idx+1}.png"
        return copy_image(basename, dest_name)
    
    if images:
        basename = os.path.basename(images[0])
        return copy_image(basename, f"p{page_num}_1.png")
    return "assets/placeholder.png"

catalog_data = [
    {
        "category": "Złączki do taśm LED",
        "series": "Seria BASIC MONO / RGB",
        "page": 1,
        "description": "Niezawodne złączki zatrzaskowe przeznaczone do taśm jednokolorowych oraz kolorowych RGB. Zapewniają szybki montaż na zatrzask oraz stabilne połączenie elektryczne bez użycia lutownicy.",
        "headers": ["Podgląd", "Kod produktu", "Połączenie", "Szerokość / PIN", "Przewód", "Typ"],
        "items": [
            {"sku": "ZL-MONO-8MM-TP", "conn": "Taśma-przewód", "params": "8 mm / 2 PIN", "detail": "Przewód 14 cm (2x0.35)", "typ": "1"},
            {"sku": "ZL-MONO-8MM-TPT", "conn": "Taśma-przewód-taśma", "params": "8 mm / 2 PIN", "detail": "Przewód 14 cm (2x0.35)", "typ": "2"},
            {"sku": "ZL-MONO-8MM-TT", "conn": "Taśma-taśma", "params": "8 mm / 2 PIN", "detail": "Połączenie bezpośrednie", "typ": "3"},
            {"sku": "ZL-MONO-8MM-TZ-G2.1", "conn": "Z gniazdem DC", "params": "8 mm / 2 PIN", "detail": "Przewód 15 cm (Gniazdo 5.5/2.1)", "typ": "4"},
            {"sku": "ZL-MONO-10MM-TP", "conn": "Taśma-przewód", "params": "10 mm / 2 PIN", "detail": "Przewód 14 cm (2x0.35)", "typ": "1"},
            {"sku": "ZL-MONO-10MM-TPT", "conn": "Taśma-przewód-taśma", "params": "10 mm / 2 PIN", "detail": "Przewód 14 cm (2x0.35)", "typ": "2"},
            {"sku": "ZL-MONO-10MM-TT", "conn": "Taśma-taśma", "params": "10 mm / 2 PIN", "detail": "Połączenie bezpośrednie", "typ": "3"},
            {"sku": "ZL-MONO-10MM-TZ-G2.1", "conn": "Z gniazdem DC", "params": "10 mm / 2 PIN", "detail": "Przewód 15 cm (Gniazdo 5.5/2.1)", "typ": "4"},
            {"sku": "ZL-RGB-10MM-TP", "conn": "Taśma-przewód (RGB)", "params": "10 mm / 4 PIN", "detail": "Przewód 14 cm (4x0.35)", "typ": "1"},
            {"sku": "ZL-RGB-10MM-TPT", "conn": "Taśma-przewód-taśma", "params": "10 mm / 4 PIN", "detail": "Przewód 14 cm (4x0.35)", "typ": "2"},
            {"sku": "ZL-RGB-10MM-TT", "conn": "Taśma-taśma (RGB)", "params": "10 mm / 4 PIN", "detail": "Połączenie bezpośrednie", "typ": "3"},
            {"sku": "ZL-RGBW-12MM-TP", "conn": "Taśma-przewód (RGBW)", "params": "12 mm / 5 PIN", "detail": "Przewód 14 cm (5x0.35)", "typ": "1"},
            {"sku": "ZL-RGBW-12MM-TPT", "conn": "Taśma-przewód-taśma", "params": "12 mm / 5 PIN", "detail": "Przewód 14 cm (5x0.35)", "typ": "2"},
        ]
    },
    {
        "category": "Złączki do taśm LED",
        "series": "Seria HIPP (Wodoodporne)",
        "page": 2,
        "description": "Złączki przebijające izolację (IDC) przeznaczone do taśm w żelu oraz bez żelu. Unikalny system styków pozwala na pewny montaż bezpośrednio przez silikon bez konieczności czyszczenia taśmy.",
        "headers": ["Podgląd", "Kod produktu", "Połączenie", "Szerokość", "Zastosowanie", "Typ"],
        "items": [
            {"sku": "PR-ZLH8-MONO-TP", "conn": "Taśma-przewód", "params": "8 mm", "detail": "Do taśm bez żelu", "typ": "1"},
            {"sku": "PR-ZLH8-MONO-TT", "conn": "Taśma-taśma", "params": "8 mm", "detail": "Do taśm bez żelu", "typ": "2"},
            {"sku": "PR-ZLH10-MONO-TP", "conn": "Taśma-przewód", "params": "10 mm", "detail": "Do taśm bez żelu", "typ": "1"},
            {"sku": "PR-ZLH10-MONO-TT", "conn": "Taśma-taśma", "params": "10 mm", "detail": "Do taśm bez żelu", "typ": "2"},
            {"sku": "PR-ZLH10-RGB-TP", "conn": "Taśma-przewód (RGB)", "params": "10 mm", "detail": "Do taśm bez żelu", "typ": "3"},
            {"sku": "PR-ZLH10-RGB-TT", "conn": "Taśma-taśma (RGB)", "params": "10 mm", "detail": "Do taśm bez żelu", "typ": "4"},
            {"sku": "PR-ZLH8W-MONO-TP", "conn": "Taśma-przewód", "params": "8 mm", "detail": "Do taśm w żelu (IP65)", "typ": "1"},
            {"sku": "PR-ZLH8W-MONO-TT", "conn": "Taśma-taśma", "params": "8 mm", "detail": "Do taśm w żelu (IP65)", "typ": "2"},
            {"sku": "PR-ZLH10W-MONO-TP", "conn": "Taśma-przewód", "params": "10 mm", "detail": "Do taśm w żelu (IP65)", "typ": "1"},
            {"sku": "PR-ZLH10W-MONO-TT", "conn": "Taśma-taśma", "params": "10 mm", "detail": "Do taśm w żelu (IP65)", "typ": "2"},
        ]
    },
    {
        "category": "Złączki do taśm LED",
        "series": "Seria PCB (Narożniki L / T / X)",
        "page": 3,
        "description": "Złączki kątowe i trójnikowe oparte na elastycznym laminacie PCB. Dedykowane do łączenia taśm pod kątem prostym, rozgałęziania linii zasilającej oraz tworzenia skomplikowanych wzorów oświetleniowych.",
        "headers": ["Podgląd", "Kod produktu", "Model / Kształt", "Szerokość", "Zastosowanie", "Typ"],
        "items": [
            {"sku": "PR-ZL8L-PCB-MONO", "conn": "Narożnik L (90°)", "params": "8 mm / MONO", "detail": "bez żelu", "typ": "1"},
            {"sku": "PR-ZL8T-PCB-MONO", "conn": "Łącznik T (3-drożny)", "params": "8 mm / MONO", "detail": "bez żelu", "typ": "2"},
            {"sku": "PR-ZL8X-PCB-MONO", "conn": "Krzyżak X (4-drożny)", "params": "8 mm / MONO", "detail": "bez żelu", "typ": "3"},
            {"sku": "PR-ZL10L-PCB-MONO", "conn": "Narożnik L (90°)", "params": "10 mm / MONO", "detail": "bez żelu", "typ": "1"},
            {"sku": "PR-ZL10T-PCB-MONO", "conn": "Łącznik T (3-drożny)", "params": "10 mm / MONO", "detail": "bez żelu", "typ": "2"},
            {"sku": "PR-ZL10X-PCB-MONO", "conn": "Krzyżak X (4-drożny)", "params": "10 mm / MONO", "detail": "bez żelu", "typ": "3"},
            {"sku": "PR-ZL10L-PCB-RGB", "conn": "Narożnik L (90°)", "params": "10 mm / RGB", "detail": "bez żelu", "typ": "1"},
            {"sku": "PR-ZL10T-PCB-RGB", "conn": "Łącznik T (3-drożny)", "params": "10 mm / RGB", "detail": "bez żelu", "typ": "2"},
            {"sku": "PR-ZL10X-PCB-RGB", "conn": "Krzyżak X (4-drożny)", "params": "10 mm / RGB", "detail": "bez żelu", "typ": "3"},
        ]
    },
    {
        "category": "Zasilanie i Rozgałęźniki DC",
        "series": "Kable Przyłączeniowe i Rozgałęźniki DC",
        "page": 4,
        "description": "Profesjonalne przewody zasilające zakończone standardowym wtykiem lub gniazdem DC 5.5/2.1 lub 5.5/2.5 mm. Płaskie rozgałęźniki wielokrotne pozwalają na bezproblemowe zasilenie wielu odbiorników z jednego źródła.",
        "headers": ["Podgląd", "Kod produktu", "Typ złącza", "Wymiar", "Długość / Kolor", "Typ"],
        "items": [
            {"sku": "WT-DC-5.5/2.1+15", "conn": "Wtyk DC z przewodem", "params": "5.5 / 2.1 mm", "detail": "15 cm / biały", "typ": "1"},
            {"sku": "WT-DC-5.5/2.1+15CZ", "conn": "Wtyk DC z przewodem", "params": "5.5 / 2.1 mm", "detail": "15 cm / czarny", "typ": "2"},
            {"sku": "WT-DC-5.5/2.5+15", "conn": "Wtyk DC z przewodem", "params": "5.5 / 2.5 mm", "detail": "15 cm / biały", "typ": "3"},
            {"sku": "WT-DC-5.5/2.5+15CZ", "conn": "Wtyk DC z przewodem", "params": "5.5 / 2.5 mm", "detail": "15 cm / czarny", "typ": "4"},
            {"sku": "ROZ-DC-5.5/2.1-2X1CZ", "conn": "Rozgałęźnik DC 2-drożny", "params": "Gniazdo -> 2x wtyk", "detail": "24 cm / czarny", "typ": "5"},
            {"sku": "ROZ-DC-5.5/2.1-4X1CZ", "conn": "Rozgałęźnik DC 4-drożny", "params": "Gniazdo -> 4x wtyk", "detail": "24 cm / czarny", "typ": "6"},
        ]
    },
    {
        "category": "Zasilanie i Rozgałęźniki DC",
        "series": "Przewody Hermetyczne ZIP i RGB",
        "page": 5,
        "description": "Hermetyczne przewody przyłączeniowe dwu-, cztero- i pięciożyłowe wyposażone w gwintowaną nakrętkę i pierścień uszczelniający. Gwarantują pełną ochronę przed wilgocią w instalacjach zewnętrznych.",
        "headers": ["Podgląd", "Kod produktu", "Typ złącza", "Standard PIN", "Przewód", "Typ"],
        "items": [
            {"sku": "LED-ZIP-Ż", "conn": "Złącze żeńskie DC", "params": "5.5 / 2.1 mm", "detail": "15 cm / 2x0.50", "typ": "1"},
            {"sku": "LED-ZIP-M", "conn": "Złącze męskie DC", "params": "5.5 / 2.1 mm", "detail": "15 cm / 2x0.50", "typ": "2"},
            {"sku": "LED-ZIP-Ż-RGB", "conn": "Złącze żeńskie RGB", "params": "4 PIN hermetyczne", "detail": "15 cm / 4x0.50", "typ": "3"},
            {"sku": "LED-ZIP-M-RGB", "conn": "Złącze męskie RGB", "params": "4 PIN hermetyczne", "detail": "15 cm / 4x0.50", "typ": "4"},
            {"sku": "GN-RGB-4PIN15", "conn": "Gniazdo RGB", "params": "4 PIN standard", "detail": "15 cm / 4x0.35", "typ": "1"},
            {"sku": "WTYK-RGB-4PIN-CZ", "conn": "Wtyk RGB", "params": "4 PIN (czarny)", "detail": "15 cm / 4x0.35", "typ": "4"},
        ]
    },
    {
        "category": "Zasilanie i Rozgałęźniki DC",
        "series": "Wtyki i Gniazda DC Śrubowe/Tablicowe",
        "page": 6,
        "description": "Złączki DC typu 'terminal block' wyposażone w samozaciski śrubowe ułatwiające podłączenie zasilaczy instalacyjnych oraz gniazda tablicowe do wbudowania.",
        "headers": ["Podgląd", "Kod produktu", "Standard", "Montaż", "Cechy", "Typ"],
        "items": [
            {"sku": "WT-DC-5.5/2.1-PP", "conn": "Wtyk DC", "params": "5.5 / 2.1 mm", "detail": "na przewód, skręcany", "typ": "1"},
            {"sku": "GN-DC-5.5/2.1-OB1", "conn": "Gniazdo DC", "params": "5.5 / 2.1 mm", "detail": "do obudowy, nakrętka", "typ": "2"},
            {"sku": "GN-DC-5.5/2.1ZS", "conn": "Gniazdo DC", "params": "5.5 / 2.1 mm", "detail": "zacisk śrubowy terminal", "typ": "5"},
        ]
    },
    {
        "category": "Kable i Szybkozłączki",
        "series": "Kable Mostkujące i Złączki KLIK",
        "page": 7,
        "description": "Specjalistyczna seria złączek zatrzaskowych z fabrycznym kablem mostkującym lub długim przewodem przyłączeniowym do 300 cm, dedykowana do meblarstwa i systemów witrynowych.",
        "headers": ["Podgląd", "Kod produktu", "Typ złącza", "Długość", "Przewód", "Typ"],
        "items": [
            {"sku": "ZL-2PIN-KLIK-W", "conn": "Kabel zasilający z wtykiem", "params": "2 PIN / Mono", "detail": "15 cm / 2x0.50", "typ": "1"},
            {"sku": "ZL-2PIN-KLIK300-W", "conn": "Kabel zasilający z wtykiem", "params": "2 PIN / Mono", "detail": "300 cm / 2x0.50", "typ": "2"},
            {"sku": "ZL-2PIN-KLIK", "conn": "Kabel mostkujący", "params": "2 PIN / Mono", "detail": "15+15 cm / 2x0.50", "typ": "3"},
        ]
    },
    {
        "category": "Kable i Szybkozłączki",
        "series": "Kostki Elektryczne i Złączki Wciskane",
        "page": 8,
        "description": "Uniwersalne złączki instalacyjne skręcano-wciskane z metalowym zaciskiem oraz szybkozłączki typu 'push-in' przeznaczone do łączenia przewodów w puszkach.",
        "headers": ["Podgląd", "Kod produktu", "Typ połączenia", "Uziemienie", "Montaż", "Typ"],
        "items": [
            {"sku": "646/A", "conn": "skręcano-wciskana", "params": "Zacisk śrubowo-sprężynowy", "detail": "Bez uziemienia, wciskana", "typ": "1"},
            {"sku": "673/A", "conn": "Złączka skręcana", "params": "Zacisk śrubowy 3-torowy", "detail": "Z uziemieniem, wciskana", "typ": "2"},
            {"sku": "ZL-2X-PUSH", "conn": "samozaciskowa 2x", "params": "Zacisk sprężynowy push-in", "detail": "Bez uziemienia, wciskana", "typ": "6"},
        ]
    },
    {
        "category": "Kable i Szybkozłączki",
        "series": "Seria FAST i Listwy 12-Torowe",
        "page": 9,
        "description": "Złączki samozaciskowe do szybkiego poboru prądu z istniejących linii kablowych oraz klasyczne, polietylenowe i poliamidowe listwy zaciskowe 12-torowe.",
        "headers": ["Podgląd", "Kod produktu", "Model / Kształt", "Parametry", "Zastosowanie", "Typ"],
        "items": [
            {"sku": "PR-ZPF-T1", "conn": "Rozgałęźnik T samozaciskowy", "params": "Zacisk typu T (przebijający)", "detail": "Pobór prądu z kabla bez cięcia", "typ": "1"},
            {"sku": "PR-ZPF-H1", "conn": "Łącznik H samozaciskowy", "params": "Zacisk typu H (przelotowy)", "detail": "Przedłużanie przewodów 2-żyłowych", "typ": "3"},
            {"sku": "ZL-12X2.5B", "conn": "Listwa śrubowa 12-torowa", "params": "Przekrój 2.5 mm2", "detail": "Polietylen, kolor biały", "typ": "1"},
        ]
    },
    {
        "category": "Kable i Szybkozłączki",
        "series": "Złączki WAGO i Przewody Sterujące",
        "page": 10,
        "description": "Profesjonalne złączki zaciskowe WAGO serii 221 (z dźwignią) oraz kompaktowe 2273, a także przewody sterujące miedziane wielożyłowe TLWY i instalacyjne dwużyłowe TLYP.",
        "headers": ["Podgląd", "Kod produktu", "Standard", "Przekrój żyły", "Opis", "Typ"],
        "items": [
            {"sku": "221-412", "conn": "Złączka WAGO 2-przewodowa", "params": "Przekrój max 4 mm2", "detail": "Oryginalna z dźwignią", "typ": "1"},
            {"sku": "2273-203", "conn": "Złączka WAGO 3-przewodowa", "params": "Przekrój max 2.5 mm2", "detail": "Wciskana, obudowa przezroczysta", "typ": "3"},
            {"sku": "TLWY4035", "conn": "Przewód miedziany RGB", "params": "4x0.35 mm2", "detail": "Giętka linka miedziana do sterowania", "typ": "1"},
        ]
    },
    {
        "category": "Przyciski i Włączniki",
        "series": "Przyciski Metalowe i Kołyski",
        "page": 11,
        "description": "Przełączniki i włączniki dedykowane do montażu w profilach aluminiowych, meblach lub obudowach sterowników. Metalowe przyciski zasilania z wbudowanym podświetleniem LED.",
        "headers": ["Podgląd", "Kod produktu", "Rodzaj przycisku", "Otwór", "Funkcja", "Typ"],
        "items": [
            {"sku": "PS11ABK", "conn": "Przycisk czarny", "params": "12 mm", "detail": "monostabilny, lutowane piny", "typ": "1"},
            {"sku": "PRZ-LED-12-B", "conn": "Metalowy z ringiem LED", "params": "16 mm", "detail": "niebieski ring LED, wandaloodp.", "typ": "6"},
            {"sku": "PR-WLK-CZ", "conn": "Kołyskowy czarny", "params": "19.4 mm", "detail": "bistabilny 2-pozycyjny I/O", "typ": "2"},
        ]
    },
    {
        "category": "Złączki Hermetyczne IP68",
        "series": "Złączki Hermetyczne THB (Na Przewód)",
        "page": 12,
        "description": "Wysokiej klasy złącza hermetyczne IP68/IP69K włoskiej firmy Techno. Gwarantują całkowite zabezpieczenie przed wilgocią w instalacjach gruntowych, basenowych i zewnętrznych.",
        "headers": ["Podgląd", "Kod produktu", "Rodzaj", "PIN / Szczelność", "Obsługiwany przewód", "Typ"],
        "items": [
            {"sku": "THB.381.A2A", "conn": "Wtyk hermetyczny", "params": "2 PIN / IP69K", "detail": "Przekrój 0.25 - 1.5 mm2", "typ": "1"},
            {"sku": "THB.387.A5A", "conn": "Wtyk hermetyczny", "params": "5 PIN / IP68", "detail": "Przekrój 0.25 - 1.5 mm2", "typ": "5"},
            {"sku": "THB.391.A3A", "conn": "Mufa połączeniowa", "params": "3 PIN / IP68", "detail": "Przekrój 0.5 - 4.0 mm2", "typ": "7"},
        ]
    },
    {
        "category": "Złączki Hermetyczne IP68",
        "series": "Złączki Hermetyczne THB (Do Obudowy)",
        "page": 13,
        "description": "Hermetyczne wtyki i gniazda panelowe z serii THB. Umożliwiają szczelne wyprowadzenie linii zasilającej z obudowy opraw oświetleniowych, naświetlaczy i skrzynek sterowniczych.",
        "headers": ["Podgląd", "Kod produktu", "Rodzaj", "PIN / Szczelność", "Opis", "Typ"],
        "items": [
            {"sku": "THB.387.E2A", "conn": "Wtyk panelowy", "params": "2 PIN / IP68", "detail": "Montaż w otwór obudowy (0.5 - 4.0 mm2)", "typ": "2"},
            {"sku": "THB.387.F5A", "conn": "Gniazdo panelowe", "params": "5 PIN / IP68", "detail": "Montaż w otwór obudowy (0.25 - 1.5 mm2)", "typ": "4"},
        ]
    },
    {
        "category": "Baterie i Akcesoria Różne",
        "series": "Zasilanie Bateryjne i Przełączniki Kablowe",
        "page": 14,
        "description": "Koszyki na baterie alkaliczne AA/AAA z wyprowadzonym przewodem, akumulatory niklowo-wodorkowe (Ni-MH) oraz tradycyjne włączniki przelotowe kablowe stosowane w oprawach biurkowych.",
        "headers": ["Podgląd", "Kod produktu", "Typ", "Standard", "Szczegóły", "Typ"],
        "items": [
            {"sku": "PBAT-AA-4", "conn": "Koszyk bateryjny", "params": "4x AA", "detail": "Nylonowa czarna obudowa", "typ": "3"},
            {"sku": "8851", "conn": "Akumulatorki AA", "params": "Ni-MH 1.2V", "detail": "Zestaw 4 sztuk (1500 mAh)", "typ": "1"},
            {"sku": "S/575/N", "conn": "Włącznik przelotowy", "params": "max 2A / 230V", "detail": "Kablowy kołyskowy, czarny", "typ": "3"},
        ]
    }
]

# Generate product catalog page grid
sections_html = ""
current_category = ""

for sect in catalog_data:
    cat = sect["category"]
    ser = sect["series"]
    desc = sect["description"]
    page_num = sect["page"]
    items = sect["items"]
    headers = sect["headers"]
    
    # Check if we need to start a new category header
    if cat != current_category:
        if current_category != "":
            sections_html += "</div></div></section>"
        
        current_category = cat
        cat_id = cat.lower().replace(" ", "-").replace("ł", "l").replace("ą", "a").replace("ę", "e").replace("ż", "z").replace("ź", "z")
        sections_html += f"""
        <section id="{cat_id}" class="py-12 border-b border-gray-100 scroll-mt-24">
            <div class="max-w-7xl mx-auto px-6">
                <div class="mb-10 border-l-4 border-prescot-orange pl-6">
                    <span class="text-prescot-orange text-[10px] font-bold uppercase tracking-[0.2em] mb-1 block">Dział Produktowy</span>
                    <h2 class="text-3xl font-extrabold text-gray-900 uppercase tracking-tight">{cat}</h2>
                </div>
                <div class="grid grid-cols-1 gap-10">
        """
        
    # Generate table headers
    th_html = ""
    for h in headers:
        if h == "Podgląd":
            th_html += f'<th class="pb-3 text-gray-400 font-bold uppercase tracking-wider text-[10px] w-24">{h}</th>'
        elif h == "Typ":
            th_html += f'<th class="pb-3 text-gray-400 font-bold uppercase tracking-wider text-[10px] text-right w-20">{h}</th>'
        else:
            th_html += f'<th class="pb-3 text-gray-400 font-bold uppercase tracking-wider text-[10px]">{h}</th>'

    # Generate table rows
    rows_html = ""
    for idx, item in enumerate(items):
        img_src = get_image_for_item(page_num, item["typ"], idx)
        
        detail_val = item.get("detail", item.get("wire", "-"))
        params_val = item.get("params", item.get("wire", "-"))
        
        rows_html += f"""
        <tr class="border-b border-gray-100 hover:bg-gray-50/50 transition-colors">
            <td class="py-3 pr-4">
                <div class="w-16 h-12 bg-white border border-gray-100 rounded-lg flex items-center justify-center p-1 shadow-sm overflow-hidden">
                    <img src="{img_src}" class="max-w-full max-h-full object-contain mix-blend-multiply" alt="{item["sku"]}">
                </div>
            </td>
            <td class="py-3 font-bold text-gray-900 pr-4">{item["sku"]}</td>
            <td class="py-3 text-gray-700 pr-4">{item["conn"]}</td>
            <td class="py-3 text-gray-600 pr-4">{params_val}</td>
            <td class="py-3 text-gray-500 pr-4">{detail_val}</td>
            <td class="py-3 text-right pr-2">
                <span class="bg-gray-100 text-gray-700 text-[10px] font-bold uppercase px-2 py-0.5 rounded border border-gray-200">{item["typ"]}</span>
            </td>
        </tr>
        """
        
    sections_html += f"""
    <!-- SERIES BOX -->
    <div class="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
        <div class="mb-6 flex flex-col sm:flex-row sm:items-end justify-between border-b border-gray-100 pb-4">
            <div class="max-w-3xl">
                <div class="text-prescot-orange text-[10px] font-bold uppercase tracking-wider mb-1">Kolekcja</div>
                <h3 class="text-2xl font-black text-gray-900 tracking-tight uppercase">{ser}</h3>
                <p class="text-gray-500 text-xs mt-2 leading-relaxed">{desc}</p>
            </div>
            <div class="mt-3 sm:mt-0 text-right">
                <span class="text-[9px] text-gray-400 font-bold uppercase block tracking-widest">Karta katalogowa</span>
                <span class="text-sm font-black text-gray-900 bg-gray-50 px-3 py-1 rounded border border-gray-100 inline-block mt-0.5">Strona {page_num:02d}</span>
            </div>
        </div>
        <div class="overflow-x-auto">
            <table class="w-full text-xs text-left">
                <thead>
                    <tr class="border-b border-gray-200">
                        {th_html}
                    </tr>
                </thead>
                <tbody class="divide-y divide-gray-50">
                    {rows_html}
                </tbody>
            </table>
        </div>
    </div>
    """

# Close final tags
if current_category != "":
    sections_html += "</div></div></section>"

cover_src = copy_image('img_page0_xref4311.png', 'cover.png')

# Compile final full catalog HTML
final_html = f"""<!DOCTYPE html>
<html lang="pl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>PRESCOT LED • Złączki i Akcesoria Instalacyjne • Katalog B2B 2026</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;600;700;800;900&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
    <script>
        tailwind.config = {{
            theme: {{
                extend: {{
                    fontFamily: {{
                        sans: ['Inter', 'sans-serif'],
                        heading: ['Outfit', 'sans-serif']
                    }},
                    colors: {{
                        'prescot-orange': '#E14E26',
                        'prescot-dark': '#354956'
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
        @media print {{
            .no-print {{ display: none !important; }}
            body {{ background: white; }}
        }}
    </style>
</head>
<body class="bg-[#F6F8F9] text-gray-800 antialiased font-sans">

    <!-- HEADER / NAVIGATION -->
    <header class="sticky top-0 bg-white/95 backdrop-blur-md border-b border-gray-200/60 z-50 no-print">
        <div class="max-w-7xl mx-auto px-6 h-16 flex justify-between items-center">
            <a href="#" class="flex items-center gap-3">
                <img src="assets/logo_dark.svg" alt="PRESCOT Logo" class="h-6">
                <span class="text-xs font-bold uppercase tracking-wider text-gray-400 border-l border-gray-200 pl-3">Akcesoria LED</span>
            </a>
            
            <nav class="hidden lg:flex gap-6 text-xs font-semibold text-gray-500">
                <a href="#zlaczki-do-tasm-led" class="hover:text-prescot-orange transition-colors">Złączki LED</a>
                <a href="#zasilanie-i-rozgalezniki-dc" class="hover:text-prescot-orange transition-colors">Kable DC</a>
                <a href="#kable-i-szybkozlaczki" class="hover:text-prescot-orange transition-colors">Złączki Instalacyjne</a>
                <a href="#przelaczniki-i-wlaczniki" class="hover:text-prescot-orange transition-colors">Włączniki</a>
                <a href="#zlacza-hermetyczne-ip68" class="hover:text-prescot-orange transition-colors">Złącza IP68</a>
            </nav>
            
            <button onclick="window.print()" class="bg-prescot-orange hover:bg-prescot-orange-hover text-white text-xs font-bold px-4 py-2.5 rounded-lg transition-all shadow-md">
                Drukuj Katalog (PDF)
            </button>
        </div>
    </header>

    <!-- COMPACT BRAND BANNER (SCHARFER B2B STYLE - NO WASTED SPACE) -->
    <section class="relative bg-white border-b border-gray-200 py-16 overflow-hidden">
        <div class="absolute inset-0 z-0 opacity-[0.02]">
            <img src="{cover_src}" class="w-full h-full object-cover">
        </div>
        <div class="max-w-7xl mx-auto px-6 relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div>
                <span class="text-prescot-orange text-[10px] font-bold uppercase tracking-[0.3em] bg-prescot-orange/5 border border-prescot-orange/15 px-2.5 py-1 rounded-md">Karta Produktowa B2B</span>
                <h1 class="text-4xl lg:text-5xl font-black text-gray-900 leading-none uppercase tracking-tight mt-3">
                    Osprzęt i Złączki <span class="text-prescot-orange">LED</span>
                </h1>
                <p class="text-gray-400 text-xs mt-2 max-w-lg">
                    Kompletne zestawienie osprzętu instalacyjnego marki PRESCOT. Oryginalne schematy i rysunki techniczne dopasowane do typów w tabelach parametrów.
                </p>
            </div>
            <div class="flex items-center gap-4 bg-gray-50 border border-gray-100 p-4 rounded-xl no-print">
                <div class="w-10 h-10 rounded-lg bg-prescot-orange/10 flex items-center justify-center text-prescot-orange font-bold">2026</div>
                <div class="text-xs">
                    <div class="font-bold text-gray-900">Aktualne wydanie</div>
                    <div class="text-gray-400 mt-0.5">Wszystkie rysunki zaktualizowane</div>
                </div>
            </div>
        </div>
    </section>

    <!-- MAIN PRODUCTS -->
    <main class="py-8">
        {sections_html}
    </main>

    <!-- FOOTER -->
    <footer class="bg-gray-900 text-white py-12 no-print border-t border-gray-800">
        <div class="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
                <img src="assets/logo_light.svg" alt="PRESCOT Logo" class="h-6 mb-4">
                <p class="text-gray-500 text-xs max-w-xs">Producent i dystrybutor profesjonalnych systemów oświetleniowych LED, zasilaczy wodoszczelnych oraz akcesoriów montażowych dla B2B.</p>
            </div>
            <div>
                <h4 class="text-xs font-bold uppercase tracking-wider text-gray-400 mb-4">Dystrybucja i Jakość</h4>
                <p class="text-gray-500 text-xs">Wszystkie produkty są objęte pełną gwarancją i posiadają certyfikaty zgodności CE oraz RoHS. Towar dostępny od ręki.</p>
            </div>
            <div>
                <h4 class="text-xs font-bold uppercase tracking-wider text-gray-400 mb-4">Kontakt B2B</h4>
                <p class="text-gray-500 text-xs">PRESCOT Sp. z o.o. | prescot.pl | E-mail: biuro@prescot.pl</p>
            </div>
        </div>
        <div class="max-w-7xl mx-auto px-6 mt-10 pt-6 border-t border-gray-800 text-[10px] text-gray-600 flex justify-between">
            <p>&copy; 2026 PRESCOT Sp. z o.o. Wszelkie prawa zastrzeżone.</p>
            <p>Wydanie: Styczeń 2026</p>
        </div>
    </footer>

</body>
</html>
"""

with open(TEMPLATE_PATH, "w", encoding="utf-8") as f:
    f.write(final_html)

print("Katalog zintegrowany w tabelach z nowym logo wygenerowany pomyślnie.")
