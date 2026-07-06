import re

translations = {
    'pl': {
        "searchPlaceholder": "Wyszukaj zasilacz (np. 150W, LPV-150)...",
        "allProducts": "Wszystkie",
        "only12V": "Tylko 12V",
        "only24V": "Tylko 24V",
        "catalogTitle": "Katalog Zasilaczy LED",
        "catalogSubtitle": "Niezawodne zasilacze napięciowe LED 12V i 24V w klasie szczelności IP67. Wybierz rozwiązanie idealnie dopasowane do Twojego projektu.",
        "heading12V": "Zasilacze LED Scharfer 12V",
        "heading24V": "Zasilacze LED Scharfer 24V",
        "noResults": "Brak wyników spełniających kryteria wyszukiwania.",
        "techDetails": "Szczegóły techniczne",
        "specPower": "MOC",
        "specCurrent": "PRĄD WYJŚCIOWY",
        "specEan": "KOD EAN",
        "specDim": "WYMIARY",
        "specVolt": "Napięcie wyjściowe",
        "specPowerNom": "Moc znamionowa",
        "specDimFull": "Wymiary (dł. x szer. x wys.)",
        "specIp": "Klasa szczelności",
        "specIpVal": "IP67 (pełna wodoodporność)",
        "specProtect": "Aktywne zabezpieczenia",
        "specProtectVal": "Nadnapięciowe (OVP), Przeciwzwarciowe (SCP), Termiczne (OTP), Przeciążeniowe (OLP)",
        "specWarranty": "Gwarancja producenta",
        "specWarrantyVal": "7 Lat Gwarancji (Pełna, realizowana lokalnie)",
        "downloadPdf": "Pobierz Kartę Katalogową PDF",
        "backToCatalog": "Powrót do katalogu"
    },
    'en': {
        "searchPlaceholder": "Search power supply (e.g., 150W)...",
        "allProducts": "All",
        "only12V": "12V Only",
        "only24V": "24V Only",
        "catalogTitle": "LED Power Supply Catalog",
        "catalogSubtitle": "Reliable 12V and 24V LED power supplies in IP67 protection class. Choose the perfect solution for your project.",
        "heading12V": "Scharfer 12V LED Power Supplies",
        "heading24V": "Scharfer 24V LED Power Supplies",
        "noResults": "No results match your search criteria.",
        "techDetails": "Technical Details",
        "specPower": "POWER",
        "specCurrent": "OUTPUT CURRENT",
        "specEan": "EAN CODE",
        "specDim": "DIMENSIONS",
        "specVolt": "Output Voltage",
        "specPowerNom": "Nominal Power",
        "specDimFull": "Dimensions (L x W x H)",
        "specIp": "Protection Class",
        "specIpVal": "IP67 (fully waterproof)",
        "specProtect": "Active Protections",
        "specProtectVal": "Overvoltage (OVP), Short-circuit (SCP), Thermal (OTP), Overload (OLP)",
        "specWarranty": "Manufacturer Warranty",
        "specWarrantyVal": "7 Years Warranty",
        "downloadPdf": "Download PDF Datasheet",
        "backToCatalog": "Back to catalog"
    },
    'de': {
        "searchPlaceholder": "Netzteil suchen (z.B. 150W)...",
        "allProducts": "Alle",
        "only12V": "Nur 12V",
        "only24V": "Nur 24V",
        "catalogTitle": "LED-Netzteile Katalog",
        "catalogSubtitle": "Zuverlässige 12V und 24V LED-Netzteile in IP67-Schutzklasse. Wählen Sie die perfekte Lösung für Ihr Projekt.",
        "heading12V": "Scharfer 12V LED-Netzteile",
        "heading24V": "Scharfer 24V LED-Netzteile",
        "noResults": "Keine Ergebnisse für Ihre Suchkriterien.",
        "techDetails": "Technische Details",
        "specPower": "LEISTUNG",
        "specCurrent": "AUSGANGSSTROM",
        "specEan": "EAN-CODE",
        "specDim": "ABMESSUNGEN",
        "specVolt": "Ausgangsspannung",
        "specPowerNom": "Nennleistung",
        "specDimFull": "Abmessungen (L x B x H)",
        "specIp": "Schutzklasse",
        "specIpVal": "IP67 (vollständig wasserdicht)",
        "specProtect": "Aktiver Schutz",
        "specProtectVal": "Überspannung (OVP), Kurzschluss (SCP), Temperatur (OTP), Überlast (OLP)",
        "specWarranty": "Herstellergarantie",
        "specWarrantyVal": "7 Jahre Garantie",
        "downloadPdf": "PDF-Datenblatt herunterladen",
        "backToCatalog": "Zurück zum Katalog"
    },
    'lt': {
        "searchPlaceholder": "Ieškoti maitinimo šaltinio...",
        "allProducts": "Visi",
        "only12V": "Tik 12V",
        "only24V": "Tik 24V",
        "catalogTitle": "LED Maitinimo Šaltinių Katalogas",
        "catalogSubtitle": "Patikimi 12V ir 24V LED maitinimo šaltiniai IP67 klasėje. Pasirinkite geriausią sprendimą savo projektui.",
        "heading12V": "Scharfer 12V LED Maitinimo Šaltiniai",
        "heading24V": "Scharfer 24V LED Maitinimo Šaltiniai",
        "noResults": "Pagal jūsų paieškos kriterijus rezultatų nerasta.",
        "techDetails": "Techninė informacija",
        "specPower": "GALIA",
        "specCurrent": "IŠVESTIES SROVĖ",
        "specEan": "EAN KODAS",
        "specDim": "MATMENYS",
        "specVolt": "Išvesties įtampa",
        "specPowerNom": "Nominali galia",
        "specDimFull": "Matmenys (I x P x A)",
        "specIp": "Apsaugos klasė",
        "specIpVal": "IP67 (visiškai atsparus vandeniui)",
        "specProtect": "Aktyvi apsauga",
        "specProtectVal": "Viršįtampis (OVP), Trumpasis jungimas (SCP), Terminis (OTP), Perkrova (OLP)",
        "specWarranty": "Gamintojo garantija",
        "specWarrantyVal": "7 Metų Garantija",
        "downloadPdf": "Atsisiųsti PDF specifikaciją",
        "backToCatalog": "Atgal į katalogą"
    }
}

file_path = 'src/data/scharferData.ts'
with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

for lang, data in translations.items():
    # Znajdź koniec słownika danego języka (np. "navKontakt": "Kontakt")
    # i dodaj tam nowe wpisy
    
    # Dla pl np. to "navKontakt": "Kontakt", potem inne rzeczy. 
    # Szukamy "navKontakt": "Kontakt", (lub innej wartości) i dodajemy na koniec bloku
    
    # Lepszy sposób to dodanie przed zamknięciem słownika (szukamy `},` albo `};` należącego do języka)
    # Znajdź definicję języka np. `'pl': {` i znajdź jego zamykający `}`
    
    match = re.search(r"'" + lang + r"':\s*\{", content)
    if not match:
        continue
    
    start_idx = match.end()
    brace_count = 1
    end_idx = start_idx
    for i in range(start_idx, len(content)):
        if content[i] == '{':
            brace_count += 1
        elif content[i] == '}':
            brace_count -= 1
            if brace_count == 0:
                end_idx = i
                break
                
    # end_idx to pozycja `}` kończącego dany język.
    # znajdźmy ostatni klucz, żeby wstawić za nim przecinek, albo po prostu wstawmy na końcu.
    
    # przygotuj dodatek
    additions = ""
    for k, v in data.items():
        # Ucieczka cudzysłowów w wartościach
        v = v.replace('"', '\\"')
        additions += f'    "{k}": "{v}",\n'
        
    # wstaw
    # znajdź ostatni znak nie-biały przed end_idx, żeby upewnić się że ma przecinek
    content = content[:end_idx] + additions + content[end_idx:]

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)

print("Updated scharferData.ts")

