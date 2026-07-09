import re
import json

translations_file = "src/lib/translations.ts"

with open(translations_file, "r") as f:
    content = f.read()

# Add a dictionary of amenities for each language
amenities_en = {
    "Klimatyzacja": "Air Conditioning",
    "WiFi": "WiFi",
    "Smart TV": "Smart TV",
    "Prysznic": "Shower",
    "Ręczniki": "Towels",
    "Zmywarka": "Dishwasher",
    "Płyta indukcyjna": "Induction hob",
    "Pościel": "Bed linen",
    "Łóżka małżeńskie i pojedyncze": "Double and single beds",
    "Prywatny taras z grillem": "Private terrace with grill",
    "Miejsce na ognisko": "Bonfire area",
    "Dostęp do jeziora": "Lake access",
    "Miejsce parkingowe": "Parking space",
    "W pełni wyposażony aneks kuchenny": "Fully equipped kitchenette",
    "Aneks kuchenny (płyta, lodówka, zmywarka)": "Kitchenette (hob, fridge, dishwasher)",
    "Ekspres do kawy": "Coffee machine",
    "Taras z meblami wypoczynkowymi": "Terrace with lounge furniture",
    "Prywatne Jacuzzi": "Private Jacuzzi",
    "Balkon z meblami wypoczynkowymi": "Balcony with lounge furniture"
}

amenities_de = {
    "Klimatyzacja": "Klimaanlage",
    "WiFi": "WLAN",
    "Smart TV": "Smart TV",
    "Prysznic": "Dusche",
    "Ręczniki": "Handtücher",
    "Zmywarka": "Geschirrspüler",
    "Płyta indukcyjna": "Induktionskochfeld",
    "Pościel": "Bettwäsche",
    "Łóżka małżeńskie i pojedyncze": "Doppel- und Einzelbetten",
    "Prywatny taras z grillem": "Private Terrasse mit Grill",
    "Miejsce na ognisko": "Lagerfeuerplatz",
    "Dostęp do jeziora": "Zugang zum See",
    "Miejsce parkingowe": "Parkplatz",
    "W pełni wyposażony aneks kuchenny": "Voll ausgestattete Küchenzeile",
    "Aneks kuchenny (płyta, lodówka, zmywarka)": "Küchenzeile (Herd, Kühlschrank, Geschirrspüler)",
    "Ekspres do kawy": "Kaffeemaschine",
    "Taras z meblami wypoczynkowymi": "Terrasse mit Loungemöbeln",
    "Prywatne Jacuzzi": "Privater Whirlpool",
    "Balkon z meblami wypoczynkowymi": "Balkon mit Loungemöbeln"
}

amenities_es = {
    "Klimatyzacja": "Aire acondicionado",
    "WiFi": "WiFi",
    "Smart TV": "Smart TV",
    "Prysznic": "Ducha",
    "Ręczniki": "Toallas",
    "Zmywarka": "Lavavajillas",
    "Płyta indukcyjna": "Placa de inducción",
    "Pościel": "Ropa de cama",
    "Łóżka małżeńskie i pojedyncze": "Camas dobles e individuales",
    "Prywatny taras z grillem": "Terraza privada con parrilla",
    "Miejsce na ognisko": "Zona de fogata",
    "Dostęp do jeziora": "Acceso al lago",
    "Miejsce parkingowe": "Aparcamiento",
    "W pełni wyposażony aneks kuchenny": "Cocina americana totalmente equipada",
    "Aneks kuchenny (płyta, lodówka, zmywarka)": "Cocina americana (placa, nevera, lavavajillas)",
    "Ekspres do kawy": "Cafetera",
    "Taras z meblami wypoczynkowymi": "Terraza con muebles de exterior",
    "Prywatne Jacuzzi": "Jacuzzi privado",
    "Balkon z meblami wypoczynkowymi": "Balcón con muebles de exterior"
}

amenities_lt = {
    "Klimatyzacja": "Oro kondicionierius",
    "WiFi": "WiFi",
    "Smart TV": "Smart TV",
    "Prysznic": "Dušas",
    "Ręczniki": "Rankšluosčiai",
    "Zmywarka": "Indaplovė",
    "Płyta indukcyjna": "Indukcinė viryklė",
    "Pościel": "Patalynė",
    "Łóżka małżeńskie i pojedyncze": "Dvigulės ir viengulės lovos",
    "Prywatny taras z grillem": "Privati terasa su kepsnine",
    "Miejsce na ognisko": "Laužavietė",
    "Dostęp do jeziora": "Prieiga prie ežero",
    "Miejsce parkingowe": "Automobilių stovėjimo aikštelė",
    "W pełni wyposażony aneks kuchenny": "Visiškai įrengta virtuvėlė",
    "Aneks kuchenny (płyta, lodówka, zmywarka)": "Virtuvėlė (viryklė, šaldytuvas, indaplovė)",
    "Ekspres do kawy": "Kavos aparatas",
    "Taras z meblami wypoczynkowymi": "Terasa su lauko baldais",
    "Prywatne Jacuzzi": "Privati sūkurinė vonia",
    "Balkon z meblami wypoczynkowymi": "Balkonas su lauko baldais"
}

def inject_dict(lang, dic):
    global content
    import re
    # Find the language block
    pattern = rf'({lang}:\s*{{)'
    
    dict_str = "amenityNames: " + json.dumps(dic, ensure_ascii=False) + ","
    
    # Inject it right after the language key
    content = re.sub(pattern, r'\1\n        ' + dict_str, content, count=1)

inject_dict('en', amenities_en)
inject_dict('de', amenities_de)
inject_dict('es', amenities_es)
inject_dict('lt', amenities_lt)

# Write back
with open(translations_file, "w") as f:
    f.write(content)

print("Injected amenityNames successfully.")
