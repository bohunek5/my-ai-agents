import re

translations = {
    'pl': {
        "faqQ1": "Jakie są warunki gwarancji na zasilacze LED Scharfer?",
        "faqA1": "Każdy zasilacz LED marki Scharfer objęty jest pełną, 7-letnią gwarancją producenta. Jesteśmy pewni naszej technologii i stosowanych komponentów, co pozwala nam zapewnić Ci maksymalne bezpieczeństwo inwestycji w oświetlenie.",
        "faqQ2": "Czy zasilacze posiadają certyfikat IP67?",
        "faqA2": "Tak, zasilacze Scharfer posiadają klasę szczelności IP67. Oznacza to pełną wodoszczelność i pyłoszczelność. Dzięki temu idealnie nadają się do montażu w łazienkach, elewacjach budynków, reklamach świetlnych oraz w innych trudnych warunkach zewnętrznych.",
        "faqQ3": "Jak zostać dystrybutorem zasilaczy Scharfer?",
        "faqA3": "Aby rozpocząć współpracę B2B, wystarczy wypełnić formularz w sekcji \"Kontakt B2B\" lub napisać bezpośrednio na adres komponenty@prescot.pl. Nasz przedstawiciel handlowy skontaktuje się z Tobą w ciągu 24 godzin w celu przedstawienia dedykowanych warunków handlowych i rabatów hurtowych.",
        "faqQ4": "Czy gwarantujecie pracę pod pełnym obciążeniem?",
        "faqA4": "Tak. Jedną z głównych zalet zasilaczy Scharfer jest gwarancja stabilnej pracy pod 100% zadeklarowanym obciążeniem. Nie musisz stosować dużych zapasów mocy (tzw. marginesów), jak to bywa w przypadku tańszych zamienników, co optymalizuje koszty całej instalacji LED.",
        "faqQ5": "Gdzie najlepiej stosować zasilacze 12V i 24V Scharfer?",
        "faqA5": "Zasilacze 12V idealnie sprawdzają się do małych instalacji LED, podświetleń meblowych, gablot, kasetonów i krótkich linii światła, gdzie zasilacz ma pozostać dyskretny (np. modele 20W). Zasilacze 24V rekomendujemy przy dłuższych ciągach oświetleniowych, zapewniając stabilne napięcie na całym odcinku.",
        "faqQ6": "Jakie są kluczowe przewagi (Przewaga Scharfer)?",
        "faqA6": "Przewaga Scharfer to przede wszystkim: obudowa w klasie IP67 zapewniająca wodoodporność i pyłoszczelność, stabilne napięcie wyjściowe, szeroki zakres wejściowy (100-250V AC), wysoka wydajność transferu, praca przy 100% obciążenia, test wypalenia przy pełnym obciążeniu oraz zaawansowane zabezpieczenia przed przeciążeniem i zwarciem.",
        "formName": "Imię i nazwisko / Nazwa firmy",
        "formEmail": "Adres e-mail",
        "formMsg": "Treść wiadomości",
        "formGdpr": "Wyrażam zgodę na przetwarzanie moich danych osobowych zgodnie z RODO w celu obsługi zapytania.",
        "formSend": "Wyślij Wiadomość",
        "contactTitle": "Skontaktuj się z nami",
        "contactAbout": "O nas:",
        "contactAboutDesc": "Jesteśmy autoryzowanym przedstawicielem Scharfer. Oferujemy pełne wsparcie B2B oraz atrakcyjne rabaty hurtowe.",
        "contactData": "Dane kontaktowe:"
    },
    'en': {
        "faqQ1": "What are the warranty conditions for Scharfer LED power supplies?",
        "faqA1": "Every Scharfer LED power supply comes with a full 7-year manufacturer's warranty. We are confident in our technology and components, allowing us to provide you with maximum security for your lighting investment.",
        "faqQ2": "Do the power supplies have IP67 certification?",
        "faqA2": "Yes, Scharfer power supplies have an IP67 protection rating. This means full water and dust resistance, making them ideal for installation in bathrooms, building facades, illuminated signs, and other tough outdoor conditions.",
        "faqQ3": "How to become a Scharfer power supply distributor?",
        "faqA3": "To start B2B cooperation, simply fill out the form in the \"B2B Contact\" section or write directly to komponenty@prescot.pl. Our sales representative will contact you within 24 hours to present dedicated commercial terms and wholesale discounts.",
        "faqQ4": "Do you guarantee operation under full load?",
        "faqA4": "Yes. One of the main advantages of Scharfer power supplies is the guarantee of stable operation under 100% declared load. You don't need to use large power reserves (so-called margins) as is the case with cheaper alternatives, which optimizes the costs of the entire LED installation.",
        "faqQ5": "Where is it best to use Scharfer 12V and 24V power supplies?",
        "faqA5": "12V power supplies are perfect for small LED installations, furniture lighting, display cases, light boxes, and short light lines where the power supply must remain discreet (e.g., 20W models). We recommend 24V power supplies for longer lighting runs, ensuring stable voltage across the entire section.",
        "faqQ6": "What are the key advantages (Scharfer Advantage)?",
        "faqA6": "The Scharfer Advantage is primarily: IP67-rated casing ensuring water and dust resistance, stable output voltage, wide input range (100-250V AC), high transfer efficiency, 100% load operation, full-load burn-in testing, and advanced overload and short-circuit protections.",
        "formName": "Name / Company Name",
        "formEmail": "Email Address",
        "formMsg": "Message",
        "formGdpr": "I consent to the processing of my personal data in accordance with GDPR to handle my inquiry.",
        "formSend": "Send Message",
        "contactTitle": "Contact us",
        "contactAbout": "About us:",
        "contactAboutDesc": "We are an authorized representative of Scharfer. We offer full B2B support and attractive wholesale discounts.",
        "contactData": "Contact data:"
    },
    'de': {
        "faqQ1": "Wie lauten die Garantiebedingungen für Scharfer LED-Netzteile?",
        "faqA1": "Auf jedes Scharfer LED-Netzteil wird eine volle 7-jährige Herstellergarantie gewährt. Wir vertrauen auf unsere Technologie und Komponenten, weshalb wir Ihnen maximale Sicherheit für Ihre Beleuchtungsinvestition bieten können.",
        "faqQ2": "Haben die Netzteile eine IP67-Zertifizierung?",
        "faqA2": "Ja, Scharfer Netzteile verfügen über die Schutzklasse IP67. Das bedeutet vollständige Wasser- und Staubdichtigkeit. Daher eignen sie sich ideal für den Einbau in Badezimmern, an Gebäudefassaden, in Leuchtreklamen und unter anderen schwierigen Außenbedingungen.",
        "faqQ3": "Wie wird man Vertriebspartner für Scharfer Netzteile?",
        "faqA3": "Um eine B2B-Zusammenarbeit zu beginnen, füllen Sie einfach das Formular im Bereich „B2B-Kontakt“ aus oder schreiben Sie direkt an komponenty@prescot.pl. Unser Vertriebsmitarbeiter wird sich innerhalb von 24 Stunden bei Ihnen melden, um Ihnen dedizierte Geschäftskonditionen und Großhandelsrabatte vorzustellen.",
        "faqQ4": "Garantieren Sie den Betrieb unter Volllast?",
        "faqA4": "Ja. Einer der Hauptvorteile von Scharfer Netzteilen ist die Garantie für einen stabilen Betrieb unter 100% der angegebenen Last. Sie müssen keine großen Leistungsreserven (sogenannte Margen) einplanen, wie es bei billigeren Alternativen der Fall ist, was die Kosten der gesamten LED-Installation optimiert.",
        "faqQ5": "Wo setzt man Scharfer 12V- und 24V-Netzteile am besten ein?",
        "faqA5": "12V-Netzteile eignen sich ideal für kleine LED-Installationen, Möbelbeleuchtung, Vitrinen, Leuchtkästen und kurze Lichtlinien, bei denen das Netzteil unauffällig bleiben soll (z. B. 20W-Modelle). Für längere Beleuchtungsstrecken empfehlen wir 24V-Netzteile, um eine stabile Spannung über den gesamten Bereich zu gewährleisten.",
        "faqQ6": "Was sind die wichtigsten Vorteile (Scharfer-Vorteil)?",
        "faqA6": "Der Scharfer-Vorteil ist in erster Linie: IP67-Gehäuse für Wasser- und Staubdichtigkeit, stabile Ausgangsspannung, großer Eingangsbereich (100-250V AC), hohe Übertragungseffizienz, Betrieb unter 100% Last, Burn-in-Test bei Volllast sowie fortschrittliche Überlast- und Kurzschlussschutzvorrichtungen.",
        "formName": "Name / Firmenname",
        "formEmail": "E-Mail Adresse",
        "formMsg": "Nachricht",
        "formGdpr": "Ich stimme der Verarbeitung meiner personenbezogenen Daten gemäß der DSGVO zur Bearbeitung meiner Anfrage zu.",
        "formSend": "Nachricht senden",
        "contactTitle": "Kontaktieren Sie uns",
        "contactAbout": "Über uns:",
        "contactAboutDesc": "Wir sind ein autorisierter Vertreter von Scharfer. Wir bieten vollen B2B-Support und attraktive Großhandelsrabatte.",
        "contactData": "Kontaktdaten:"
    },
    'lt': {
        "faqQ1": "Kokia garantija taikoma Scharfer LED maitinimo šaltiniams?",
        "faqA1": "Kiekvienam Scharfer LED maitinimo šaltiniui suteikiama pilna 7 metų gamintojo garantija. Mes pasitikime savo technologija ir komponentais, todėl galime užtikrinti maksimalų jūsų apšvietimo investicijų saugumą.",
        "faqQ2": "Ar maitinimo šaltiniai turi IP67 sertifikatą?",
        "faqA2": "Taip, Scharfer maitinimo šaltiniai turi IP67 apsaugos klasę. Tai reiškia visišką atsparumą vandeniui ir dulkėms. Dėl to jie idealiai tinka montuoti vonios kambariuose, pastatų fasaduose, šviečiančiose reklamose ir kitose sudėtingose lauko sąlygose.",
        "faqQ3": "Kaip tapti Scharfer maitinimo šaltinių platintoju?",
        "faqA3": "Norėdami pradėti B2B bendradarbiavimą, tiesiog užpildykite formą skiltyje „B2B kontaktas“ arba parašykite tiesiai adresu komponenty@prescot.pl. Mūsų pardavimų atstovas susisieks su jumis per 24 valandas ir pateiks specialias komercines sąlygas bei didmenines nuolaidas.",
        "faqQ4": "Ar garantuojate darbą su visa apkrova?",
        "faqA4": "Taip. Vienas pagrindinių Scharfer maitinimo šaltinių privalumų yra garantuotas stabilus veikimas prie 100% nurodytos apkrovos. Jums nereikia naudoti didelių galios atsargų (vadinamųjų maržų), kaip pigesnių alternatyvų atveju, o tai optimizuoja visos LED instaliacijos išlaidas.",
        "faqQ5": "Kur geriausia naudoti Scharfer 12V ir 24V maitinimo šaltinius?",
        "faqA5": "12V maitinimo šaltiniai idealiai tinka mažoms LED instaliacijoms, baldų apšvietimui, vitrinoms, šviesadėžėms ir trumpoms šviesos linijoms, kur maitinimo šaltinis turi išlikti nepastebimas (pvz., 20W modeliai). Ilgesnėms apšvietimo linijoms rekomenduojame 24V maitinimo šaltinius, užtikrinančius stabilią įtampą visame ruože.",
        "faqQ6": "Kokie yra pagrindiniai privalumai (Scharfer pranašumas)?",
        "faqA6": "Scharfer pranašumas pirmiausia yra: IP67 klasės korpusas, užtikrinantis atsparumą vandeniui ir dulkėms, stabili išėjimo įtampa, platus įėjimo diapazonas (100-250V AC), didelis perdavimo efektyvumas, veikimas su 100% apkrova, bandymas veikiant pilna apkrova ir pažangios apsaugos nuo perkrovos ir trumpojo jungimo.",
        "formName": "Vardas / Įmonės pavadinimas",
        "formEmail": "El. pašto adresas",
        "formMsg": "Pranešimas",
        "formGdpr": "Sutinku, kad mano asmens duomenys būtų tvarkomi pagal BDAR reikalavimus, siekiant atsakyti į mano užklausą.",
        "formSend": "Siųsti",
        "contactTitle": "Susisiekite su mumis",
        "contactAbout": "Apie mus:",
        "contactAboutDesc": "Esame įgaliotasis Scharfer atstovas. Siūlome visapusišką B2B palaikymą ir patrauklias didmenines nuolaidas.",
        "contactData": "Kontaktiniai duomenys:"
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

# Now apply translations to src/app/(desktop)/kontakt/page.tsx
file_path_kontakt = 'src/app/(desktop)/kontakt/page.tsx'
with open(file_path_kontakt, 'r', encoding='utf-8') as f:
    content_kontakt = f.read()

content_kontakt = content_kontakt.replace("q: 'Jakie są warunki gwarancji na zasilacze LED Scharfer?'", "q: t('faqQ1')")
content_kontakt = content_kontakt.replace("a: 'Każdy zasilacz LED marki Scharfer objęty jest pełną, 7-letnią gwarancją producenta. Jesteśmy pewni naszej technologii i stosowanych komponentów, co pozwala nam zapewnić Ci maksymalne bezpieczeństwo inwestycji w oświetlenie.'", "a: t('faqA1')")
content_kontakt = content_kontakt.replace("q: 'Czy zasilacze posiadają certyfikat IP67?'", "q: t('faqQ2')")
content_kontakt = content_kontakt.replace("a: 'Tak, zasilacze scharfer posiadają klasę szczelności IP67. Oznacza to pełną wodoszczelność i pyłoszczelność. Dzięki temu idealnie nadają się do montażu w łazienkach, elewacjach budynków, reklamach świetlnych oraz w innych trudnych warunkach zewnętrznych.'", "a: t('faqA2')")
content_kontakt = content_kontakt.replace("q: 'Jak zostać dystrybutorem zasilaczy Scharfer?'", "q: t('faqQ3')")
content_kontakt = content_kontakt.replace("a: 'Aby rozpocząć współpracę B2B, wystarczy wypełnić formularz w sekcji \"Kontakt B2B\" lub napisać bezpośrednio na adres komponenty@prescot.pl. Nasz przedstawiciel handlowy skontaktuje się z Tobą w ciągu 24 godzin w celu przedstawienia dedykowanych warunków handlowych i rabatów hurtowych.'", "a: t('faqA3')")
content_kontakt = content_kontakt.replace("q: 'Czy gwarantujecie pracę pod pełnym obciążeniem?'", "q: t('faqQ4')")
content_kontakt = content_kontakt.replace("a: 'Tak. Jedną z głównych zalet zasilaczy Scharfer jest gwarancja stabilnej pracy pod 100% zadeklarowanym obciążeniem. Nie musisz stosować dużych zapasów mocy (tzw. marginesów), jak to bywa w przypadku tańszych zamienników, co optymalizuje koszty całej instalacji LED.'", "a: t('faqA4')")
content_kontakt = content_kontakt.replace("q: 'Gdzie najlepiej stosować zasilacze 12V i 24V Scharfer?'", "q: t('faqQ5')")
content_kontakt = content_kontakt.replace("a: 'Zasilacze 12V idealnie sprawdzają się do małych instalacji LED, podświetleń meblowych, gablot, kasetonów i krótkich linii światła, gdzie zasilacz ma pozostać dyskretny (np. modele 20W). Zasilacze 24V rekomendujemy przy dłuższych ciągach oświetleniowych, zapewniając stabilne napięcie na całym odcinku.'", "a: t('faqA5')")
content_kontakt = content_kontakt.replace("q: 'Jakie są kluczowe przewagi (Przewaga Scharfer)?'", "q: t('faqQ6')")
content_kontakt = content_kontakt.replace("a: 'Przewaga Scharfer to przede wszystkim: obudowa w klasie IP67 zapewniająca wodoodporność i pyłoszczelność, stabilne napięcie wyjściowe, szeroki zakres wejściowy (100-250V AC), wysoka wydajność transferu, praca przy 100% obciążenia, test wypalenia przy pełnym obciążeniu oraz zaawansowane zabezpieczenia przed przeciążeniem i zwarciem.'", "a: t('faqA6')")

content_kontakt = content_kontakt.replace(">Skontaktuj się z nami<", ">{t('contactTitle')}<")
content_kontakt = content_kontakt.replace(">Chcesz zostać naszym dystrybutorem? Masz pytania techniczne dotyczące zasilaczy LED? Napisz do nas, a nasz zespół ekspertów odpowie niezwłocznie.<", ">{t('contactSubtitle')}<")
content_kontakt = content_kontakt.replace(">Oficjalny Dystrybutor<", ">{t('officialDistributor')}<")
content_kontakt = content_kontakt.replace(">O nas:<", ">{t('contactAbout')}<")
content_kontakt = content_kontakt.replace(">Jesteśmy autoryzowanym przedstawicielem Scharfer. Oferujemy pełne wsparcie B2B oraz atrakcyjne rabaty hurtowe.<", ">{t('contactAboutDesc')}<")
content_kontakt = content_kontakt.replace(">Dane kontaktowe:<", ">{t('contactData')}<")
content_kontakt = content_kontakt.replace(">Kontakt B2B<", ">{t('navContact')}<")
content_kontakt = content_kontakt.replace(">{t('formName')}<", ">{t('formName')}<") # already replaced theoretically but let's check what was there. Wait, no I didn't replace them in the file yet!

with open(file_path_kontakt, 'w', encoding='utf-8') as f:
    f.write(content_kontakt)

