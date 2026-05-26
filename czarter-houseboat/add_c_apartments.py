import re
import json

with open('src/data/stranda-apartments.ts', 'r') as f:
    content = f.read()

# I will append the three apartments right before the last `};`
insert_pos = content.rfind('\n};')

if insert_pos == -1:
    print("Error: Could not find end of object")
    exit(1)

new_apartments = """
    'C_Studio': {
        id: 'C Studio',
        building: 'C',
        type: 'studio',
        price: 250,
        guests: '2+2',
        idoBookingId: '32',
        icalUrl: 'https://client37851.idosell.com/panel/offer/icalexport/itemid/32/key/da39a3ee5e6b4b0d3255bfef95601890afd80709',
        description: `Apartamenty typu Studio znajdują się w budynku C, są to miejsce noclegowe z jednym łóżkiem podwójnym, rozkładaną sofę 2os., salon z aneksem kuchennym, łazienkę z prysznicem i taras.

Nasze apartamenty ulokowane są w Giżycku, przy porcie Stranda w apartamentowcach Stranda Residence, nad brzegiem jeziora Kisajno (zatoka Tracz). Rozpościera się z niego piękny widok na panoramę jezioro Kisajno i szlak żeglowny Wielkich Jezior Mazurskich. Apartament jest luksusowo wykończony i zapewnia wysoki komfort wypoczynku. Na miejscu można skorzystać z zasobów portu takich jak: tawerna, koncerty w sezonie letnim, marina, wypożyczalnia sprzętu wodnego, itp.`,
        amenities: {
            "living": [
                "TV",
                "stół",
                "krzesła",
                "sofa dla 2 osób",
                "wyjście na taras",
                "klimatyzacja",
                "wifi"
            ],
            "kitchen": [
                "ekspres do kawy",
                "płyta indukcyjna",
                "lodówka",
                "zmywarka",
                "chłodziarka do wina",
                "komplet naczyń i sztućców",
                "zestaw startowy (woda, kawa, herbata)"
            ],
            "bedroom": [
                "łóżko 180x200",
                "TV",
                "komplet pościeli",
                "suszarka na ubrania",
                "deska do prasowania",
                "żelazko",
                "klimatyzacja"
            ],
            "bathroom": [
                "prysznic",
                "pralka",
                "suszarka do włosów",
                "prostownica",
                "ręczniki",
                "żel pod prysznic",
                "balsam"
            ],
            "terrace": [
                "przestronny taras",
                "dwa leżaki",
                "stolik",
                "widok na jezioro"
            ]
        },
        additionalInfo: ['Widok na jezioro'],
        gallery: {
            "heroImage": getAssetPath("/images/stranda/C304/C304_1.webp"),
            "images": [
                getAssetPath("/images/stranda/C304/C304_1.webp"),
                getAssetPath("/images/stranda/C304/C304_2.webp"),
                getAssetPath("/images/stranda/C304/C304_3.webp"),
                getAssetPath("/images/stranda/C304/C304_4.webp")
            ]
        }
    },
    'C_1_Sypialnia': {
        id: 'C 1-Sypialnia',
        building: 'C',
        type: 'oneBedroom',
        price: 300,
        guests: '2+2',
        idoBookingId: '44',
        icalUrl: 'https://client37851.idosell.com/panel/offer/icalexport/itemid/44/key/da39a3ee5e6b4b0d3255bfef95601890afd80709',
        description: `Apartamenty z 1 sypialnią znajdują się w budynku C, w sypialni łóżko podwójne, salon z aneksem kuchennym i rozkładaną sofą 2os., łazienka z prysznicem oraz taras.

Nasze apartamenty ulokowane są w Giżycku, przy porcie Stranda w apartamentowcach Stranda Residence, nad brzegiem jeziora Kisajno (zatoka Tracz). Rozpościera się z niego piękny widok na panoramę jezioro Kisajno i szlak żeglowny Wielkich Jezior Mazurskich. Apartament jest luksusowo wykończony i zapewnia wysoki komfort wypoczynku. Na miejscu można skorzystać z zasobów portu takich jak: tawerna, koncerty w sezonie letnim, marina, wypożyczalnia sprzętu wodnego, itp.`,
        amenities: {
            "living": [
                "TV",
                "stół",
                "krzesła",
                "sofa dla 2 osób",
                "wyjście na taras",
                "klimatyzacja",
                "wifi"
            ],
            "kitchen": [
                "ekspres do kawy",
                "płyta indukcyjna",
                "lodówka",
                "zmywarka",
                "chłodziarka do wina",
                "komplet naczyń i sztućców",
                "zestaw startowy (woda, kawa, herbata)"
            ],
            "bedroom": [
                "łóżko 180x200",
                "TV",
                "komplet pościeli",
                "suszarka na ubrania",
                "deska do prasowania",
                "żelazko",
                "klimatyzacja"
            ],
            "bathroom": [
                "prysznic",
                "pralka",
                "suszarka do włosów",
                "prostownica",
                "ręczniki",
                "żel pod prysznic",
                "balsam"
            ],
            "terrace": [
                "przestronny taras",
                "dwa leżaki",
                "stolik",
                "widok na jezioro"
            ]
        },
        additionalInfo: ['Widok na jezioro'],
        gallery: {
            "heroImage": getAssetPath("/images/stranda/B402/B402_1.webp"),
            "images": [
                getAssetPath("/images/stranda/B402/B402_1.webp"),
                getAssetPath("/images/stranda/B402/B402_2.webp"),
                getAssetPath("/images/stranda/B402/B402_3.webp"),
                getAssetPath("/images/stranda/B402/B402_4.webp")
            ]
        }
    },
    'C_2_Sypialnie': {
        id: 'C 2-Sypialnie',
        building: 'C',
        type: 'twoBedrooms',
        price: 450,
        guests: '4+2',
        idoBookingId: '43',
        icalUrl: 'https://client37851.idosell.com/panel/offer/icalexport/itemid/43/key/da39a3ee5e6b4b0d3255bfef95601890afd80709',
        description: `Apartamenty z 2 sypialniami znajdują się w budynku C, są to miejsce noclegowe z dwoma sypialniami, w każdej łóżko podwójne, przestronny salon z aneksem kuchennym i sofą, łazienka z prysznicem i taras z widokiem na zatokę Tracz i port Stranda.

Nasze apartamenty ulokowane są w Giżycku, przy porcie Stranda w apartamentowcach Stranda Residence, nad brzegiem jeziora Kisajno (zatoka Tracz). Rozpościera się z niego piękny widok na panoramę jezioro Kisajno i szlak żeglowny Wielkich Jezior Mazurskich. Apartament jest luksusowo wykończony i zapewnia wysoki komfort wypoczynku. Na miejscu można skorzystać z zasobów portu takich jak: tawerna, koncerty w sezonie letnim, marina, wypożyczalnia sprzętu wodnego, itp.`,
        amenities: {
            "living": [
                "TV",
                "stół",
                "krzesła",
                "sofa dla 2 osób",
                "wyjście na taras",
                "klimatyzacja",
                "wifi"
            ],
            "kitchen": [
                "ekspres do kawy",
                "płyta indukcyjna",
                "lodówka",
                "zmywarka",
                "chłodziarka do wina",
                "komplet naczyń i sztućców",
                "zestaw startowy (woda, kawa, herbata)"
            ],
            "bedroom": [
                "łóżko 180x200",
                "TV",
                "komplet pościeli",
                "suszarka na ubrania",
                "deska do prasowania",
                "żelazko",
                "klimatyzacja"
            ],
            "bathroom": [
                "prysznic",
                "pralka",
                "suszarka do włosów",
                "prostownica",
                "ręczniki",
                "żel pod prysznic",
                "balsam"
            ],
            "terrace": [
                "przestronny taras",
                "dwa leżaki",
                "stolik",
                "widok na jezioro"
            ]
        },
        additionalInfo: ['Widok na jezioro'],
        gallery: {
            "heroImage": getAssetPath("/images/stranda/C301/C301_1.webp"),
            "images": [
                getAssetPath("/images/stranda/C301/C301_1.webp"),
                getAssetPath("/images/stranda/C301/C301_2.webp"),
                getAssetPath("/images/stranda/C301/C301_3.webp"),
                getAssetPath("/images/stranda/C301/C301_4.webp")
            ]
        }
    }"""

new_content = content[:insert_pos] + ",\n" + new_apartments + content[insert_pos:]
with open('src/data/stranda-apartments.ts', 'w') as f:
    f.write(new_content)

print("Added generic C apartments.")
