import re
import json

with open('src/lib/translations.ts', 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Expand details block in all languages
details_append = {
    'pl': ', gallery: "Galeria", collapseGallery: "Zwiń galerię", seeMorePhotos: "Zobacz więcej zdjęć", needHelp: "Potrzebujesz pomocy?", availability: "Dostępność"',
    'en': ', gallery: "Gallery", collapseGallery: "Collapse gallery", seeMorePhotos: "See more photos", needHelp: "Need help?", availability: "Availability"',
    'de': ', gallery: "Galerie", collapseGallery: "Galerie einklappen", seeMorePhotos: "Mehr Fotos ansehen", needHelp: "Brauchen Sie Hilfe?", availability: "Verfügbarkeit"',
    'es': ', gallery: "Galería", collapseGallery: "Ocultar galería", seeMorePhotos: "Ver más fotos", needHelp: "¿Necesita ayuda?", availability: "Disponibilidad"',
    'it': ', gallery: "Galleria", collapseGallery: "Nascondi galleria", seeMorePhotos: "Vedi altre foto", needHelp: "Hai bisogno di aiuto?", availability: "Disponibilità"',
    'fr': ', gallery: "Galerie", collapseGallery: "Masquer la galerie", seeMorePhotos: "Voir plus de photos", needHelp: "Besoin d\'aide?", availability: "Disponibilité"',
    'cs': ', gallery: "Galerie", collapseGallery: "Skrýt galerii", seeMorePhotos: "Zobrazit více fotek", needHelp: "Potřebujete pomoc?", availability: "Dostupnost"',
    'lt': ', gallery: "Galerija", collapseGallery: "Suskleisti galeriją", seeMorePhotos: "Žiūrėti daugiau nuotraukų", needHelp: "Reikia pagalbos?", availability: "Prieinamumas"',
    'da': ', gallery: "Galleri", collapseGallery: "Skjul galleri", seeMorePhotos: "Se flere billeder", needHelp: "Brug for hjælp?", availability: "Tilgængelighed"',
    'se': ', gallery: "Galleri", collapseGallery: "Dölj galleri", seeMorePhotos: "Se fler bilder", needHelp: "Behöver du hjälp?", availability: "Tillgänglighet"',
    'no': ', gallery: "Galleri", collapseGallery: "Skjul galleri", seeMorePhotos: "Se flere bilder", needHelp: "Trenger du hjelp?", availability: "Tilgjengelighet"',
    'fi': ', gallery: "Galleria", collapseGallery: "Piilota galleria", seeMorePhotos: "Katso lisää kuvia", needHelp: "Tarvitsetko apua?", availability: "Saatavuus"'
}

apartments_append = {
    'pl': ', bookingTitle: "Zarezerwuj pobyt", bookingDesc: "Wybierz daty i sprawdź dostępność.", bookBtn: "ZAREZERWUJ GO"',
    'en': ', bookingTitle: "Book your stay", bookingDesc: "Choose dates and check availability.", bookBtn: "BOOK NOW"',
    'de': ', bookingTitle: "Buchen Sie Ihren Aufenthalt", bookingDesc: "Wählen Sie Daten und prüfen Sie die Verfügbarkeit.", bookBtn: "JETZT BUCHEN"',
    'es': ', bookingTitle: "Reserve su estancia", bookingDesc: "Elija fechas y verifique disponibilidad.", bookBtn: "RESERVAR"',
    'it': ', bookingTitle: "Prenota il tuo soggiorno", bookingDesc: "Scegli le date e controlla la disponibilità.", bookBtn: "PRENOTA ORA"',
    'fr': ', bookingTitle: "Réservez votre séjour", bookingDesc: "Choisissez les dates et vérifiez la disponibilité.", bookBtn: "RÉSERVER"',
    'cs': ', bookingTitle: "Rezervujte si pobyt", bookingDesc: "Vyberte termíny a zkontrolujte dostupnost.", bookBtn: "REZERVOVAT"',
    'lt': ', bookingTitle: "Užsisakykite viešnagę", bookingDesc: "Pasirinkite datas ir patikrinkite prieinamumą.", bookBtn: "UŽSAKYTI DABAR"',
    'da': ', bookingTitle: "Book dit ophold", bookingDesc: "Vælg datoer og tjek tilgængelighed.", bookBtn: "BESTIL NU"',
    'se': ', bookingTitle: "Boka din vistelse", bookingDesc: "Välj datum och kontrollera tillgänglighet.", bookBtn: "BOKA NU"',
    'no': ', bookingTitle: "Bestill ditt opphold", bookingDesc: "Velg datoer og sjekk tilgjengelighet.", bookBtn: "BESTILL NÅ"',
    'fi': ', bookingTitle: "Varaa oleskelusi", bookingDesc: "Valitse päivämäärät ja tarkista saatavuus.", bookBtn: "VARAA NYT"'
}

# Add amenities mapping for commonly used strings
amenities_en = {
    "TV": "TV", "stół": "Table", "krzesła": "Chairs", "sofa dla 2 osób": "Sofa for 2", "sofa 2os.": "Sofa for 2",
    "rozkładana kanapa 2os.": "Sofa bed for 2", "wyjście na taras": "Terrace access", "ekspres do kawy": "Coffee machine",
    "ekspres kapsułkowy do kawy Tchibo": "Tchibo capsule coffee machine", "płyta indukcyjna": "Induction hob",
    "lodówka": "Fridge", "zmywarka": "Dishwasher", "mikrofalówka": "Microwave", "mikrofala": "Microwave",
    "komplet naczyń i sztućców": "Set of dishes and cutlery", "zestaw startowy (woda, kawa, herbata)": "Welcome kit (water, coffee, tea)",
    "łóżko 180x200": "Bed 180x200", "łóżko podwójne": "Double bed", "komplet pościeli": "Bedding set",
    "suszarka na ubrania": "Clothes dryer", "deska do prasowania": "Ironing board", "żelazko": "Iron",
    "prysznic": "Shower", "wanna/prysznic": "Bathtub/Shower", "pralka": "Washing machine",
    "suszarka do włosów": "Hair dryer", "ręczniki": "Towels", "klimatyzacja": "Air conditioning", "wifi": "WiFi",
    "dwa leżaki": "Two deckchairs", "leżaki": "Deckchairs", "leżak": "Deckchair", "stolik": "Small table",
    "widok na jezioro": "Lake view", "prywatne jacuzzi": "Private jacuzzi", "jacuzzi": "Jacuzzi", "sauna": "Sauna",
    "szlafroki": "Bathrobes", "balsam do ciała": "Body lotion", "żel pod prysznic": "Shower gel", "mydło": "Soap",
    "kosmetyki w łazience": "Bathroom cosmetics", "piekarnik": "Oven", "odkurzacz": "Vacuum cleaner",
    "chłodziarka do wina": "Wine cooler", "dwa fotele": "Two armchairs", "fotel": "Armchair",
    "dwa rozkładane fotele": "Two reclining armchairs", "komplet mebli ogodowych": "Garden furniture set",
    "internet": "Internet", "sofa": "Sofa", "dwa krzesła": "Two chairs", "łóżko piętrowe": "Bunk bed"
}

amenities_de = {
    "TV": "TV", "stół": "Tisch", "krzesła": "Stühle", "sofa dla 2 osób": "Sofa für 2", "sofa 2os.": "Sofa für 2",
    "rozkładana kanapa 2os.": "Schlafsofa für 2", "wyjście na taras": "Terrassenzugang", "ekspres do kawy": "Kaffeemaschine",
    "ekspres kapsułkowy do kawy Tchibo": "Tchibo Kapselmaschine", "płyta indukcyjna": "Induktionskochfeld",
    "lodówka": "Kühlschrank", "zmywarka": "Spülmaschine", "mikrofalówka": "Mikrowelle", "mikrofala": "Mikrowelle",
    "komplet naczyń i sztućców": "Geschirr und Besteck", "zestaw startowy (woda, kawa, herbata)": "Willkommenspaket (Wasser, Kaffee, Tee)",
    "łóżko 180x200": "Bett 180x200", "łóżko podwójne": "Doppelbett", "komplet pościeli": "Bettwäsche",
    "suszarka na ubrania": "Wäscheständer", "deska do prasowania": "Bügelbrett", "żelazko": "Bügeleisen",
    "prysznic": "Dusche", "wanna/prysznic": "Badewanne/Dusche", "pralka": "Waschmaschine",
    "suszarka do włosów": "Haartrockner", "ręczniki": "Handtücher", "klimatyzacja": "Klimaanlage", "wifi": "WLAN",
    "dwa leżaki": "Zwei Liegestühle", "leżaki": "Liegestühle", "leżak": "Liegestuhl", "stolik": "Tischchen",
    "widok na jezioro": "Seeblick", "prywatne jacuzzi": "Privater Whirlpool", "jacuzzi": "Whirlpool", "sauna": "Sauna",
    "szlafroki": "Bademäntel", "balsam do ciała": "Körperlotion", "żel pod prysznic": "Duschgel", "mydło": "Seife",
    "kosmetyki w łazience": "Badezimmerkosmetik", "piekarnik": "Backofen", "odkurzacz": "Staubsauger",
    "chłodziarka do wina": "Weinkühler", "dwa fotele": "Zwei Sessel", "fotel": "Sessel",
    "dwa rozkładane fotele": "Zwei Ruhesessel", "komplet mebli ogodowych": "Gartenmöbel",
    "internet": "Internet", "sofa": "Sofa", "dwa krzesła": "Zwei Stühle", "łóżko piętrowe": "Etagenbett"
}

def dict_to_js(d):
    pairs = []
    for k, v in d.items():
        pairs.append(f'"{k}": "{v}"')
    return "{" + ", ".join(pairs) + "}"

amenities_str_en = f'amenityNames: {dict_to_js(amenities_en)}'
amenities_str_de = f'amenityNames: {dict_to_js(amenities_de)}'
amenities_str_pl = f'amenityNames: {dict_to_js({k:k for k in amenities_en.keys()})}'

def inject_in_lang(content, lang):
    # 1. inject details
    det_app = details_append.get(lang, details_append["en"])
    # match the `details: { ... }` block. We find the end of it and insert before the closing brace.
    # We will just use regex to replace `details: { ... }` but it can be multi-line.
    # Simpler: just search for `details: {` and insert at the end of that object.
    # Since we can't easily parse nested braces, we can just replace `details: {` with `details: { ` and append the keys if they don't exist.
    
    # Let's do a simple line-by-line replacement.
    lines = content.split('\n')
    in_lang = False
    in_details = False
    in_apartments = False
    
    out_lines = []
    for line in lines:
        if re.match(rf'^\s*{lang}:\s*{{$', line):
            in_lang = True
        elif re.match(r'^\s*[a-z]{2}:\s*\{$', line):
            in_lang = False
            
        if in_lang:
            if 'details: {' in line:
                if 'gallery:' not in line:
                    # Single-line details
                    if '}' in line:
                        line = line.replace('}', det_app + '}', 1)
            
            if 'apartments: {' in line:
                if 'bookingTitle:' not in line:
                    if '}' in line:
                        # find the LAST brace or something? `apartments: { ... items: { ... } }` is multi-line!
                        # wait, apartments is multi-line. The first line is `apartments: { title: "...", description: "...", details: "..."`
                        # let's just append to the first line.
                        line = line.replace('apartments: {', f'apartments: {{{apartments_append.get(lang, apartments_append["en"])}, ')
                        
            # Inject amenityNames at the end of the lang block
            if re.match(r'^\s*},\s*$', line) or re.match(r'^\s*}\s*$', line): # End of lang block
                # wait, there are many closing braces. A lang block closes with `    },`
                if line == '    },' or line == '    }':
                    # inject amenityNames here
                    if lang == 'en':
                        out_lines.append(f'        {amenities_str_en},')
                    elif lang == 'de':
                        out_lines.append(f'        {amenities_str_de},')
                    elif lang == 'pl':
                        out_lines.append(f'        {amenities_str_pl},')
                    else:
                        out_lines.append(f'        {amenities_str_en},') # fallback to en

        out_lines.append(line)
    return '\n'.join(out_lines)

for lang in ['pl', 'en', 'de', 'es', 'it', 'fr', 'cs', 'lt', 'da', 'se', 'no', 'fi']:
    content = inject_in_lang(content, lang)

with open('src/lib/translations.ts', 'w', encoding='utf-8') as f:
    f.write(content)

print("Translations patched via python script.")
