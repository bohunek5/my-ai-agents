import re

file_path = "src/lib/translations.ts"

with open(file_path, "r", encoding="utf-8") as f:
    content = f.read()

# 1. First, remove any existing amenityNames blocks from skorupki.amenities (if any)
content = re.sub(r'amenityNames:\s*\{.*?\},?\s*', '', content, flags=re.DOTALL)

# 2. Add amenityNames to the root of each language
amenities_dict = {
    'pl': {"Klimatyzacja": "Klimatyzacja", "WiFi": "WiFi", "Smart TV": "Smart TV", "Prysznic": "Prysznic", "Ręczniki": "Ręczniki", "Zmywarka": "Zmywarka", "Płyta indukcyjna": "Płyta indukcyjna", "Pościel": "Pościel", "Łóżka małżeńskie i pojedyncze": "Łóżka małżeńskie i pojedyncze", "Prywatny taras z grillem": "Prywatny taras z grillem", "Miejsce na ognisko": "Miejsce na ognisko", "Dostęp do jeziora": "Dostęp do jeziora", "Miejsce parkingowe": "Miejsce parkingowe", "W pełni wyposażony aneks kuchenny": "W pełni wyposażony aneks kuchenny", "Aneks kuchenny (płyta, lodówka, zmywarka)": "Aneks kuchenny (płyta, lodówka, zmywarka)", "Ekspres do kawy": "Ekspres do kawy", "Taras z meblami wypoczynkowymi": "Taras z meblami wypoczynkowymi", "Prywatne Jacuzzi": "Prywatne Jacuzzi", "Balkon z meblami wypoczynkowymi": "Balkon z meblami wypoczynkowymi"},
    'en': {"Klimatyzacja": "Air conditioning", "WiFi": "WiFi", "Smart TV": "Smart TV", "Prysznic": "Shower", "Ręczniki": "Towels", "Zmywarka": "Dishwasher", "Płyta indukcyjna": "Induction hob", "Pościel": "Bed linen", "Łóżka małżeńskie i pojedyncze": "Double and single beds", "Prywatny taras z grillem": "Private terrace with grill", "Miejsce na ognisko": "Campfire spot", "Dostęp do jeziora": "Lake access", "Miejsce parkingowe": "Parking space", "W pełni wyposażony aneks kuchenny": "Fully equipped kitchenette", "Aneks kuchenny (płyta, lodówka, zmywarka)": "Kitchenette (hob, fridge, dishwasher)", "Ekspres do kawy": "Coffee machine", "Taras z meblami wypoczynkowymi": "Terrace with lounge furniture", "Prywatne Jacuzzi": "Private Jacuzzi", "Balkon z meblami wypoczynkowymi": "Balcony with lounge furniture"},
    'de': {"Klimatyzacja": "Klimaanlage", "WiFi": "WLAN", "Smart TV": "Smart TV", "Prysznic": "Dusche", "Ręczniki": "Handtücher", "Zmywarka": "Spülmaschine", "Płyta indukcyjna": "Induktionskochfeld", "Pościel": "Bettwäsche", "Łóżka małżeńskie i pojedyncze": "Doppel- und Einzelbetten", "Prywatny taras z grillem": "Private Terrasse mit Grill", "Miejsce na ognisko": "Lagerfeuerplatz", "Dostęp do jeziora": "Zugang zum See", "Miejsce parkingowe": "Parkplatz", "W pełni wyposażony aneks kuchenny": "Voll ausgestattete Küchenzeile", "Aneks kuchenny (płyta, lodówka, zmywarka)": "Küchenzeile (Kochfeld, Kühlschrank, Spülmaschine)", "Ekspres do kawy": "Kaffeemaschine", "Taras z meblami wypoczynkowymi": "Terrasse mit Loungemöbeln", "Prywatne Jacuzzi": "Privater Whirlpool", "Balkon z meblami wypoczynkowymi": "Balkon mit Loungemöbeln"},
    'es': {"Klimatyzacja": "Aire acondicionado", "WiFi": "WiFi", "Smart TV": "Smart TV", "Prysznic": "Ducha", "Ręczniki": "Toallas", "Zmywarka": "Lavavajillas", "Płyta indukcyjna": "Placa de inducción", "Pościel": "Ropa de cama", "Łóżka małżeńskie i pojedyncze": "Camas dobles e individuales", "Prywatny taras z grillem": "Terraza privada con parrilla", "Miejsce na ognisko": "Zona de fogata", "Dostęp do jeziora": "Acceso al lago", "Miejsce parkingowe": "Aparcamiento", "W pełni wyposażony aneks kuchenny": "Cocina americana totalmente equipada", "Aneks kuchenny (płyta, lodówka, zmywarka)": "Cocina americana (placa, nevera, lavavajillas)", "Ekspres do kawy": "Cafetera", "Taras z meblami wypoczynkowymi": "Terraza con muebles de exterior", "Prywatne Jacuzzi": "Jacuzzi privado", "Balkon z meblami wypoczynkowymi": "Balcón con muebles de exterior"},
    'lt': {"Klimatyzacja": "Oro kondicionierius", "WiFi": "WiFi", "Smart TV": "Išmanusis televizorius", "Prysznic": "Dušas", "Ręczniki": "Rankšluosčiai", "Zmywarka": "Indaplovė", "Płyta indukcyjna": "Indukcinė viryklė", "Pościel": "Patalynė", "Łóżka małżeńskie i pojedyncze": "Dvigulės ir viengulės lovos", "Prywatny taras z grillem": "Privati terasa su griliu", "Miejsce na ognisko": "Laužavietė", "Dostęp do jeziora": "Prieiga prie ežero", "Miejsce parkingowe": "Automobilių stovėjimo aikštelė", "W pełni wyposażony aneks kuchenny": "Visiškai įrengta virtuvėlė", "Aneks kuchenny (płyta, lodówka, zmywarka)": "Virtuvėlė (viryklė, šaldytuvas, indaplovė)", "Ekspres do kawy": "Kavos aparatas", "Taras z meblami wypoczynkowymi": "Terasa su lauko baldais", "Prywatne Jacuzzi": "Privati sūkurinė vonia", "Balkon z meblami wypoczynkowymi": "Balkonas su lauko baldais"}
}

details_addons = {
    'en': 'roomSalon: "Living Room", roomKitchen: "Kitchen", roomBedroom: "Bedroom", roomBathroom: "Bathroom", salonFeatures: "TV, 2-person sofa, table, chairs, A/C, wifi", kitchenFeatures: "induction hob, fridge, dishwasher, microwave, set of dishes and cutlery", bedroomFeatures: "TV, 180x200 bed, bedding set, clothes dryer, ironing board, iron, A/C", bathroomFeatures: "shower, hair dryer, bathrobes, body lotion", terraceAndOther: "Terrace and Other"',
    'de': 'roomSalon: "Wohnzimmer", roomKitchen: "Küche", roomBedroom: "Schlafzimmer", roomBathroom: "Badezimmer", salonFeatures: "TV, 2-Sitzer-Sofa, Tisch, Stühle, Klimaanlage, WLAN", kitchenFeatures: "Induktionskochfeld, Kühlschrank, Spülmaschine, Mikrowelle, Geschirr und Besteck", bedroomFeatures: "TV, 180x200 Bett, Bettwäsche, Wäscheständer, Bügelbrett, Bügeleisen, Klimaanlage", bathroomFeatures: "Dusche, Haartrockner, Bademäntel, Körperlotion", terraceAndOther: "Terrasse und Sonstiges"',
    'es': 'roomSalon: "Sala de estar", roomKitchen: "Cocina", roomBedroom: "Dormitorio", roomBathroom: "Baño", salonFeatures: "TV, sofá de 2 plazas, mesa, sillas, aire acondicionado, wifi", kitchenFeatures: "placa de inducción, nevera, lavavajillas, microondas, juego de platos y cubiertos", bedroomFeatures: "TV, cama de 180x200, juego de ropa de cama, tendedero, tabla de planchar, plancha, aire acondicionado", bathroomFeatures: "ducha, secador de pelo, albornoces, loción corporal", terraceAndOther: "Terraza y Otros"',
    'lt': 'roomSalon: "Svetainė", roomKitchen: "Virtuvė", roomBedroom: "Miegamasis", roomBathroom: "Vonia", salonFeatures: "TV, 2 vietų sofa, stalas, kėdės, oro kondicionierius, wifi", kitchenFeatures: "indukcinė kaitlentė, šaldytuvas, indaplovė, mikrobangų krosnelė, indų ir stalo įrankių rinkinys", bedroomFeatures: "TV, 180x200 lova, patalynės komplektas, drabužių džiovykla, lyginimo lenta, lygintuvas, oro kondicionierius", bathroomFeatures: "dušas, plaukų džiovintuvas, chalatai, kūno losjonas", terraceAndOther: "Terasa ir kita"'
}

hero_addons = {
    'pl': 'bookOnlineBtn: "Rezerwuj Online"',
    'en': 'bookOnlineBtn: "Book Online"',
    'de': 'bookOnlineBtn: "Online buchen"',
    'es': 'bookOnlineBtn: "Reservar Online"',
    'lt': 'bookOnlineBtn: "Užsisakyti internetu"'
}

for lang in ['pl', 'en', 'de', 'es', 'lt']:
    # 1. Inject amenityNames directly after `lang: {`
    dict_str = "amenityNames: " + str(amenities_dict[lang]).replace("'", '"') + ","
    content = re.sub(rf'({lang}:\s*\{{\n\s*\.\.\.translationsLegal\.{lang},)', r'\1\n        ' + dict_str, content)
    
    # 2. Inject missing hero fields carefully
    if lang in hero_addons:
        # Find the hero object for this language using regex
        # We look for "hero: { ... }" inside the language block.
        # A simpler way is to replace `charterBtn: "..."` with `charterBtn: "...", bookOnlineBtn: "..."` 
        # But we must only do this ONCE for the given language section.
        # Let's find the section first.
        pattern = rf'({lang}:\s*\{{.*?hero:\s*\{{.*?charterBtn:\s*"[^"]*")'
        # Check if already has bookOnlineBtn
        section = re.search(rf'{lang}:\s*\{{.*?hero:\s*\{{[^\}}]*bookOnlineBtn', content, flags=re.DOTALL)
        if not section:
            content = re.sub(pattern, r'\1, ' + hero_addons[lang], content, flags=re.DOTALL, count=1)

    # 3. Inject missing details items carefully
    if lang in details_addons:
        # Find the details.items object
        section = re.search(rf'{lang}:\s*\{{.*?details:\s*\{{.*?items:\s*\{{[^\}}]*roomSalon', content, flags=re.DOTALL)
        if not section:
            pattern = rf'({lang}:\s*\{{.*?details:\s*\{{.*?items:\s*\{{[^\}}]*?)(\}})'
            content = re.sub(pattern, r'\1, ' + details_addons[lang] + r'\2', content, flags=re.DOTALL, count=1)

# Ensure Polish 'details' has terraceAndOther if not present
if 'terraceAndOther' not in content[:content.find('en: {')]:
    content = re.sub(r'(pl:\s*\{.*?details:\s*\{.*?items:\s*\{[^\}]*?roomBathroom:\s*"Łazienka"[^\}]*?)(\})', r'\1, terraceAndOther: "Taras i Pozostałe"\2', content, flags=re.DOTALL, count=1)

with open(file_path, "w", encoding="utf-8") as f:
    f.write(content)
print("Translations patched successfully v2")
