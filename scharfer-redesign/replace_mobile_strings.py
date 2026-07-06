import re

file_path = 'src/app/(mobile)/mobile/page.tsx'
with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

replacements = [
    ("Budowa zasilacza - innowacje Scharfer", "{t('diagramTitleInfo')}"),
    ("7 Lat Pełnej Gwarancji", "{t('story1Title')}"),
    ("Zaufanie to podstawa w branży B2B. Zasilacze Scharfer są projektowane tak, aby przetrwać najcięższe warunki pracy. Dlatego każdy nasz produkt objęty jest bezwarunkową, 7-letnią gwarancją producenta.", "{t('story1P1')}"),
    ("Jasne warunki współpracy B2B: w przypadku usterki gwarantujemy ekspresową wymianę na nowy model bezpośrednio z naszego magazynu w Polsce.", "{t('story1P2')}"),
    ("Ochrona IP67 do Zadań Specjalnych", "{t('story2Title')}"),
    ("Deszcz, śnieg, wilgoć czy pył – to dla nas żaden problem. Obudowa zasilaczy Scharfer posiada certyfikat szczelności IP67. Są całkowicie wodoodporne i pyłoszczelne.", "{t('story2P1')}"),
    ("Idealne rozwiązanie do oświetlenia elewacji, podświetlania basenów, banerów reklamowych i architektury ogrodowej. Wyeliminuj ryzyko zwarć w instalacjach outdoorowych.", "{t('story2P2')}"),
    ("Zaprojektowane do Pracy pod 100% Obciążeniem", "{t('story3Title')}"),
    ("Koniec z przewymiarowaniem zasilaczy! W przeciwieństwie do tańszych zamienników, technologia Scharfer pozwala na stałą pracę pod 100% zadeklarowanym obciążeniem.", "{t('story3P1')}"),
    ("Jeśli kupujesz model 150W, otrzymujesz pełne 150W czystej, stabilnej mocy. Oznacza to mniejsze koszty instalacji oraz brak problemów z przegrzewaniem.", "{t('story3P2')}"),
    ("Zgodność z Normami PN-EN, CE i RoHS", "{t('story4Title')}"),
    ("Bezpieczeństwo przede wszystkim. Zasilacze Scharfer spełniają najbardziej rygorystyczne europejskie normy bezpieczeństwa dla urządzeń oświetleniowych, w tym PN-EN 61347-1, EN 61347-2-13, EN 55015, EN 61547.", "{t('story4P1')}"),
    ("Posiadają pełną certyfikację CE oraz RoHS. Wybierając markę Scharfer, chronisz swój biznes oraz inwestycje swoich klientów przed ryzykiem pożaru.", "{t('story4P2')}"),
    ("Zabezpieczenia OVP, SCP, OTP, OLP", "{t('story5Title')}"),
    ("Każdy profesjonalny zasilacz instalacyjny Scharfer wyposażony jest w aktywny, wielopoziomowy system ochrony elektroniki:", "{t('story5P1')}"),
    ("<strong>OVP</strong> – automatyczne odcięcie przy skokach napięcia.", "<strong dangerouslySetInnerHTML={{ __html: t('story5L1').split('–')[0] + '–' }} /> {t('story5L1').split('–')[1] || ''}"),
    ("<strong>SCP</strong> – błyskawiczne zabezpieczenie przeciwzwarciowe.", "<strong dangerouslySetInnerHTML={{ __html: t('story5L2').split('–')[0] + '–' }} /> {t('story5L2').split('–')[1] || ''}"),
    ("<strong>OTP</strong> – ochrona termiczna przed przegrzaniem.", "<strong dangerouslySetInnerHTML={{ __html: t('story5L3').split('–')[0] + '–' }} /> {t('story5L3').split('–')[1] || ''}"),
    ("<strong>OLP</strong> – zabezpieczenie przeciążeniowe przy zbyt wysokim poborze.", "<strong dangerouslySetInnerHTML={{ __html: t('story5L4').split('–')[0] + '–' }} /> {t('story5L4').split('–')[1] || ''}"),
    ("Aluminium i Żywica Epoksydowa", "{t('story6Title')}"),
    ("Trwałość zasilacza 12V / 24V zależy od efektywnego odprowadzania ciepła. Obudowa z aluminium pełni rolę radiatora, a wnętrze jest w 100% zalane żywicą.", "{t('story6P1')}"),
    ("Eliminuje to puste przestrzenie izolacyjne, zapobiega wibracjom cewek i gwarantuje utrzymanie stabilnej temperatury pracy. Każda jednostka przechodzi test Burn-in przed wysyłką.", "{t('story6P2')}"),
    ("Szczegółowe zalety technologii", "{t('detailedTech')}"),
    ("Gdzie sprawdzają się zasilacze?", "{t('appTitle')}"),
    ("Zobacz, gdzie nasi partnerzy z powodzeniem stosują technologię Scharfer.", "{t('appSubtitle')}"),
    ("Często Zadawane Pytania (FAQ)", "{t('faqSectionTitle')}"),
    ("Wszystko, co musisz wiedzieć o zasilaczach LED Scharfer", "{t('faqSectionDesc')}"),
    ("ZAMÓW B2B", "{t('orderB2B')}"),
    ("Zostań partnerem handlowym", "{t('becomePartnerTitle')}"),
    ("Długofalowa współpraca i wysokie marże dla dystrybutorów.", "{t('becomePartnerDesc')}"),
    ("Oficjalny Dystrybutor", "{t('officialDistributor')}"),
    ("Chcesz zostać naszym dystrybutorem? Masz pytania techniczne? Napisz do nas, a nasz zespół ekspertów odpowie niezwłocznie.", "{t('contactSubtitle')}"),
    ("Przejdź do Sklepu", "{t('goToStore')}"),
    ("Chcesz kupić zasilacz detalicznie?", "{t('contactRetailTitle')}"),
    ("Zostaniesz przeniesiony na naszą główną stronę www.prescot.com.pl, gdzie możesz bezpiecznie kupić zasilacze LED Scharfer w ilości detalicznej.", "{t('contactRetailDesc')}"),
    ("Moc", "{t('filterPower')}"),
    ("Napięcie", "{t('filterVoltage')}"),
    ("Prąd wyjściowy", "{t('productCurrent')}"),
    ("Wymiary", "{t('productDimensions')}"),
    ("Kod EAN", "{t('productEan')}"),
    ("Brak pasujących zasilaczy.", "{t('noResults')}"),
    ("Szukaj zasilacza (np. 150W)...", "{t('searchPlaceholder')}"),
    ("Pobierz Kartę Katalogową PDF", "{t('downloadPdf')}"),
    ("Karta PDF", "{t('downloadPdf')}"),
    ("Szczegóły", "{t('detailsShort')}"),
    ("Specyfikacja techniczna", "{t('productSpecsTitle')}"),
    ("Zasilacz Liniowy Serii GL", "{t('glSeriesTitle')}"),
    ("Nowa generacja podłużnych, hermetycznych zasilaczy GL IP67 o bardzo wąskim profilu.", "{t('glSeriesDesc')}"),
    ("Zasilacz Modułowy Serii GP", "{t('gpSeriesTitle')}"),
    ("Kompaktowe, hermetyczne zasilacze GP IP67 o wysokiej gęstości mocy. Idealne do głębokich puszek montażowych, płytkich wnęk i szyldów reklamowych.", "{t('gpSeriesDesc')}"),
    ("Moc:", "{t('specPower')}:"),
    ("Napięcie Wyjściowe:", "{t('specOutVolt')}:"),
    ("Prąd Wyjściowy:", "{t('specOutCurr')}:"),
    ("Napięcie Wejściowe:", "{t('specInVolt')}:"),
    ("Sprawność:", "{t('specEfficiency')}:"),
    ("Wymiary (D x S x W):", "{t('specDim')}:"),
    ("Temperatura Pracy:", "{t('specTemp')}:"),
    ("Certyfikaty:", "{t('specCert')}:"),
    ("Gwarancja:", "{t('specWarranty')}:")
]

# For the <strong> parsing
# Make sure we don't double replace
for old, new in replacements:
    content = content.replace(f">{old}<", f">{new}<")
    content = content.replace(f'"{old}"', f'"{new}"')
    if old in content:
        # replace standalone occurrences if they are text nodes
        content = content.replace(old, new)

# specifically handle the search placeholder
content = content.replace('placeholder={t(\'searchPlaceholder\')}', 'placeholder={t(\'searchPlaceholder\')}')

# also replace apps loop variables
# ap.title -> t(`app${idx+1}Title` as any)
content = re.sub(r'\{ap\.title\}', r"{t(`app${idx + 1}Title` as any)}", content)
content = re.sub(r'\{ap\.desc\}', r"{t(`app${idx + 1}Desc` as any)}", content)
content = re.sub(r'alt=\{ap\.title\}', r"alt={t(`app${idx + 1}Title` as any)}", content)

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)

print("Replacements done.")

