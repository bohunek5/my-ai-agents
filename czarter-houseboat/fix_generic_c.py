import re

with open('src/data/stranda-apartments.ts', 'r', encoding='utf-8') as f:
    content = f.read()

# Replace C_Studio description and gallery
c_studio_desc = """        description: `Apartamenty typu Studio znajdują się w budynku C, są to miejsce noclegowe z jednym łóżkiem podwójnym, rozkładaną sofą dla 2 osób, salonem z aneksem kuchennym, łazienką z prysznicem i tarasem z widokiem na zatokę Tracz i port Stranda. Przeznaczone dla maksymalnie 4 osób.`,"""
content = re.sub(r"description:\s*`Apartamenty typu Studio znajdują się w budynku C.*?`," , c_studio_desc, content, flags=re.DOTALL)

# Replace C_1_Sypialnia desc
c_1_desc = """        description: `Wypoczywaj w komfortowych apartamentach na łonie natury, otoczony przyrodą i tysiącami mazurskich jezior.`,"""
content = re.sub(r"description:\s*`Apartamenty z 1 sypialnią znajdują się w budynku C.*?`," , c_1_desc, content, flags=re.DOTALL)

# Replace C_2_Sypialnie desc
c_2_desc = """        description: `Wypoczywaj w komfortowych apartamentach na łonie natury, otoczony przyrodą i tysiącami mazurskich jezior.`,"""
content = re.sub(r"description:\s*`Apartamenty z 2 sypialniami znajdują się w budynku C.*?`," , c_2_desc, content, flags=re.DOTALL)

# Replace galleries
c_studio_gallery = """        gallery: {
            "heroImage": getAssetPath("/images/stranda/C_Generic/C_Generic_1.jpg"),
            "images": [
                getAssetPath("/images/stranda/C_Generic/C_Generic_1.jpg"),
                getAssetPath("/images/stranda/C_Generic/C_Generic_2.jpg"),
                getAssetPath("/images/stranda/C_Generic/C_Generic_3.jpg"),
                getAssetPath("/images/stranda/C_Generic/C_Generic_4.jpg"),
                getAssetPath("/images/stranda/C_Generic/C_Generic_5.jpg"),
                getAssetPath("/images/stranda/C_Generic/C_Generic_6.jpg")
            ]
        }"""
content = re.sub(r"gallery:\s*\{\s*\"heroImage\": getAssetPath\(\"/images/stranda/C304/C304_1\.webp\"\),.*?\]\s*\}", c_studio_gallery, content, flags=re.DOTALL)

c_1_gallery = """        gallery: {
            "heroImage": getAssetPath("/images/stranda/C_Generic/C_Generic_1.jpg"),
            "images": [
                getAssetPath("/images/stranda/C_Generic/C_Generic_1.jpg"),
                getAssetPath("/images/stranda/C_Generic/C_Generic_2.jpg"),
                getAssetPath("/images/stranda/C_Generic/C_Generic_3.jpg"),
                getAssetPath("/images/stranda/C_Generic/C_Generic_4.jpg"),
                getAssetPath("/images/stranda/C_Generic/C_Generic_5.jpg"),
                getAssetPath("/images/stranda/C_Generic/C_Generic_6.jpg")
            ]
        }"""
content = re.sub(r"gallery:\s*\{\s*\"heroImage\": getAssetPath\(\"/images/stranda/B402/B402_1\.webp\"\),.*?\]\s*\}", c_1_gallery, content, flags=re.DOTALL)

c_2_gallery = """        gallery: {
            "heroImage": getAssetPath("/images/stranda/C_Generic/C_Generic_1.jpg"),
            "images": [
                getAssetPath("/images/stranda/C_Generic/C_Generic_1.jpg"),
                getAssetPath("/images/stranda/C_Generic/C_Generic_2.jpg"),
                getAssetPath("/images/stranda/C_Generic/C_Generic_3.jpg"),
                getAssetPath("/images/stranda/C_Generic/C_Generic_4.jpg"),
                getAssetPath("/images/stranda/C_Generic/C_Generic_5.jpg"),
                getAssetPath("/images/stranda/C_Generic/C_Generic_6.jpg")
            ]
        }"""
content = re.sub(r"gallery:\s*\{\s*\"heroImage\": getAssetPath\(\"/images/stranda/C301/C301_1\.webp\"\),.*?\]\s*\}", c_2_gallery, content, flags=re.DOTALL)

with open('src/data/stranda-apartments.ts', 'w', encoding='utf-8') as f:
    f.write(content)

print("Updated stranda-apartments.ts")

