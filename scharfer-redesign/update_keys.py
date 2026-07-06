import re

translations = {
    'pl': {
        "diagramTitle": "Budowa zasilacza - interaktywny diagram",
        "diagramTitleInfo": "Budowa zasilacza - innowacje Scharfer",
        "appTitle": "Gdzie sprawdzają się zasilacze?",
        "appSubtitle": "Zobacz, gdzie nasi partnerzy z powodzeniem stosują technologię Scharfer.",
        "becomePartnerTitle": "Zostań partnerem handlowym",
        "becomePartnerDesc": "Długofalowa współpraca i wysokie marże dla dystrybutorów.",
        "officialDistributor": "Oficjalny Dystrybutor",
        "contactSubtitle": "Chcesz zostać naszym dystrybutorem? Masz pytania techniczne? Napisz do nas, a nasz zespół ekspertów odpowie niezwłocznie.",
        "orderB2B": "ZAMÓW B2B",
        "detailedTech": "Szczegółowe zalety technologii",
        "faqSectionTitle": "Często Zadawane Pytania (FAQ)",
        "faqSectionDesc": "Wszystko, co musisz wiedzieć o zasilaczach LED Scharfer",
        "contactRetailTitle": "Chcesz kupić zasilacz detalicznie?",
        "contactRetailDesc": "Zostaniesz przeniesiony na naszą główną stronę www.prescot.com.pl, gdzie możesz bezpiecznie kupić zasilacze LED Scharfer w ilości detalicznej.",
        "goToStore": "Przejdź do Sklepu"
    },
    'en': {
        "diagramTitle": "Power Supply Structure - Interactive Diagram",
        "diagramTitleInfo": "Power Supply Structure - Scharfer Innovations",
        "appTitle": "Where are the power supplies used?",
        "appSubtitle": "See where our partners successfully use Scharfer technology.",
        "becomePartnerTitle": "Become a business partner",
        "becomePartnerDesc": "Long-term cooperation and high margins for distributors.",
        "officialDistributor": "Official Distributor",
        "contactSubtitle": "Want to become our distributor? Have technical questions? Write to us, and our expert team will respond immediately.",
        "orderB2B": "ORDER B2B",
        "detailedTech": "Detailed Technology Advantages",
        "faqSectionTitle": "Frequently Asked Questions (FAQ)",
        "faqSectionDesc": "Everything you need to know about Scharfer LED power supplies",
        "contactRetailTitle": "Want to buy a power supply in retail?",
        "contactRetailDesc": "You will be redirected to our main website www.prescot.com.pl, where you can securely purchase Scharfer LED power supplies in retail quantities.",
        "goToStore": "Go to Store"
    },
    'de': {
        "diagramTitle": "Netzteilaufbau - Interaktives Diagramm",
        "diagramTitleInfo": "Netzteilaufbau - Scharfer Innovationen",
        "appTitle": "Wo werden die Netzteile eingesetzt?",
        "appSubtitle": "Sehen Sie, wo unsere Partner Scharfer-Technologie erfolgreich einsetzen.",
        "becomePartnerTitle": "Werden Sie Geschäftspartner",
        "becomePartnerDesc": "Langfristige Zusammenarbeit und hohe Margen für Vertriebspartner.",
        "officialDistributor": "Offizieller Distributor",
        "contactSubtitle": "Möchten Sie unser Distributor werden? Haben Sie technische Fragen? Schreiben Sie uns, und unser Expertenteam wird umgehend antworten.",
        "orderB2B": "B2B BESTELLEN",
        "detailedTech": "Detaillierte Technologie-Vorteile",
        "faqSectionTitle": "Häufig Gestellte Fragen (FAQ)",
        "faqSectionDesc": "Alles, was Sie über Scharfer LED-Netzteile wissen müssen",
        "contactRetailTitle": "Möchten Sie ein Netzteil einzeln kaufen?",
        "contactRetailDesc": "Sie werden zu unserer Hauptseite www.prescot.com.pl weitergeleitet, wo Sie Scharfer LED-Netzteile in Einzelhandelsmengen sicher kaufen können.",
        "goToStore": "Zum Shop gehen"
    },
    'lt': {
        "diagramTitle": "Maitinimo šaltinio struktūra - Interaktyvi diagrama",
        "diagramTitleInfo": "Maitinimo šaltinio struktūra - Scharfer Inovacijos",
        "appTitle": "Kur naudojami maitinimo šaltiniai?",
        "appSubtitle": "Pamatykite, kur mūsų partneriai sėkmingai naudoja Scharfer technologiją.",
        "becomePartnerTitle": "Tapkite verslo partneriu",
        "becomePartnerDesc": "Ilgalaikis bendradarbiavimas ir didelės maržos platintojams.",
        "officialDistributor": "Oficialus Platintojas",
        "contactSubtitle": "Norite tapti mūsų platintoju? Turite techninių klausimų? Parašykite mums, ir mūsų ekspertų komanda nedelsiant atsakys.",
        "orderB2B": "UŽSAKYTI B2B",
        "detailedTech": "Išsamūs Technologijos Privalumai",
        "faqSectionTitle": "Dažniausiai Užduodami Klausimai (DUK)",
        "faqSectionDesc": "Viskas, ką reikia žinoti apie Scharfer LED maitinimo šaltinius",
        "contactRetailTitle": "Norite pirkti maitinimo šaltinį mažmena?",
        "contactRetailDesc": "Būsite nukreipti į mūsų pagrindinę svetainę www.prescot.com.pl, kur galėsite saugiai įsigyti Scharfer LED maitinimo šaltinius mažmeniniais kiekiais.",
        "goToStore": "Eiti į parduotuvę"
    }
}

file_path = 'src/data/scharferData.ts'
with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

for lang, data in translations.items():
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
                
    additions = ""
    for k, v in data.items():
        v = v.replace('"', '\\"')
        additions += f'    "{k}": "{v}",\n'
        
    content = content[:end_idx] + additions + content[end_idx:]

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)

print("Updated scharferData.ts")

