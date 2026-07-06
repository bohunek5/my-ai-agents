import re

file_path = "/Users/karolbohdanowicz/my-ai-agents/scharfer-redesign/src/app/(desktop)/page.tsx"

with open(file_path, 'r') as f:
    content = f.read()

replacements = [
    # Hero Title
    (r'<span>7 Lat gwarancji\.</span> Stabilne Zasilanie\. Prawdziwe <span>100%</span> mocy\.',
     r'<span>{t(\'heroWarranty\')}</span> {t(\'heroPower\')} {t(\'heroReal\')}<span>{t(\'hero100\')}</span>{t(\'heroLoad\')}'),
    
    # Hero Subtitle
    (r'Koniec z piszczeniem, awariami i spadkami napięć\. Wodoodporne zasilacze LED IP67 \(12V i 24V\) stworzone do pracy pod pełnym obciążeniem\. 7 lat gwarancji\. Instalujesz i zapominasz\.',
     r'{t(\'heroSubtitlePc\')}'),
     
    # Trust Items
    (r'<span className="trust-val" style={{ color: \'var\(--c-red\)\' }}>7</span>\n\s*<span className="trust-lbl">Lat Gwarancji</span>',
     r'<span className="trust-val" style={{ color: \'var(--c-red)\' }}>{t(\'trust7Years\')}</span>\n                <span className="trust-lbl">{t(\'trustWarranty\')}</span>'),
    (r'<span className="trust-val" style={{ color: \'var\(--c-red\)\' }}>IP67</span>\n\s*<span className="trust-lbl">Pełna Szczelność</span>',
     r'<span className="trust-val" style={{ color: \'var(--c-red)\' }}>{t(\'trustIP67\')}</span>\n                <span className="trust-lbl">{t(\'trustTightnessFull\')}</span>'),
    (r'<span className="trust-val" style={{ color: \'var\(--c-red\)\' }}>100%</span>\n\s*<span className="trust-lbl">Praca pod obciążeniem</span>',
     r'<span className="trust-val" style={{ color: \'var(--c-red)\' }}>{t(\'trust100\')}</span>\n                <span className="trust-lbl">{t(\'trustLoadFull\')}</span>'),
     
    # Hero Actions
    (r'Zobacz Katalog Zasilaczy', r'{t(\'exploreOffer\')}'),
    (r'Współpraca B2B', r'{t(\'b2bCoop\')}'),
    
    # Tech section
    (r'Technologia bez kompromisów', r'{t(\'techNoComp\')}'),
    (r'Odkryj innowacje i zabezpieczenia, które sprawiają, że zasilacze Scharfer są najczęstszym wyborem profesjonalistów w branży oświetleniowej i B2B\.', r'{t(\'techDesc\')}'),
    
    # Stories
    (r'<h2>7 Lat Pełnej Gwarancji</h2>\n\s*<p>Zaufanie to podstawa w branży B2B\. Zasilacze Scharfer są projektowane tak, aby przetrwać najcięższe warunki pracy\. Dlatego każdy nasz produkt objęty jest bezwarunkową, 7-letnią gwarancją producenta\.</p>\n\s*<p>Jasne warunki współpracy B2B: w przypadku usterki gwarantujemy ekspresową wymianę na nowy model bezpośrednio z naszego magazynu w Polsce\. Buduj swoją renomę instalatorską na niezawodności\.</p>',
     r'<h2>{t(\'story1Title\')}</h2>\n              <p>{t(\'story1P1\')}</p>\n              <p>{t(\'story1P2\')}</p>'),
    
    (r'<h2>Ochrona IP67 do Zadań Specjalnych</h2>\n\s*<p>Deszcz, śnieg, wilgoć czy pył – to dla nas żaden problem\. Obudowa zasilaczy Scharfer posiada certyfikat szczelności IP67\. Są całkowicie wodoodporne i pyłoszczelne\.</p>\n\s*<p>Idealne rozwiązanie do oświetlenia elewacji, podświetlania basenów, banerów reklamowych i architektury ogrodowej\. Wyeliminuj ryzyko zwarć w instalacjach outdoorowych\.</p>',
     r'<h2>{t(\'story2Title\')}</h2>\n              <p>{t(\'story2P1\')}</p>\n              <p>{t(\'story2P2\')}</p>'),
     
    (r'<h2>Zaprojektowane do Pracy pod 100% Obciążeniem</h2>\n\s*<p>Koniec z przewymiarowaniem zasilaczy! W przeciwieństwie do tańszych zamienników, technologia Scharfer pozwala na stałą pracę pod 100% zadeklarowanym obciążeniem\.</p>\n\s*<p>Jeśli kupujesz model 150W, otrzymujesz pełne 150W czystej, stabilnej mocy\. Oznacza to mniejsze koszty instalacji \(możesz użyć mniejszego zasilacza\) oraz brak problemów z przegrzewaniem\.</p>',
     r'<h2>{t(\'story3Title\')}</h2>\n              <p>{t(\'story3P1\')}</p>\n              <p>{t(\'story3P2\')}</p>'),
     
    (r'<h2>Zgodność z Normami PN-EN, CE i RoHS</h2>\n\s*<p>Bezpieczeństwo przede wszystkim\. Zasilacze Scharfer spełniają najbardziej rygorystyczne europejskie normy bezpieczeństwa dla urządzeń oświetleniowych, w tym <strong>PN-EN 61347-1, EN 61347-2-13, EN 55015, EN 61547</strong>\.</p>\n\s*<p>Posiadają pełną certyfikację CE oraz RoHS\. Wybierając markę Scharfer, chronisz swój biznes oraz inwestycje swoich klientów przed ryzykiem pożaru, przebicia prądu i niestabilnego napięcia\. Sprzedawaj z czystym sumieniem certyfikowany sprzęt najwyższej klasy\.</p>',
     r'<h2>{t(\'story4Title\')}</h2>\n              <p>{t(\'story4P1\')}</p>\n              <p>{t(\'story4P2\')}</p>'),
     
    (r'<h2>Zabezpieczenia OVP, SCP, OTP, OLP</h2>\n\s*<p>Każdy profesjonalny zasilacz instalacyjny Scharfer wyposażony jest w aktywny, wielopoziomowy system ochrony elektroniki, zapobiegający uszkodzeniom w przypadku awarii sieci elektrycznej\.</p>\n\s*<ul style={{ listStyleType: \'none\', padding: 0, marginTop: \'1rem\' }}>\n\s*<li style={{ marginBottom: \'0\.5rem\' }}><strong>OVP \(Over Voltage Protection\)</strong> – automatyczne odcięcie przy skokach napięcia\.</li>\n\s*<li style={{ marginBottom: \'0\.5rem\' }}><strong>SCP \(Short Circuit Protection\)</strong> – błyskawiczne zabezpieczenie przeciwzwarciowe\.</li>\n\s*<li style={{ marginBottom: \'0\.5rem\' }}><strong>OTP \(Over Temperature Protection\)</strong> – ochrona termiczna przed przegrzaniem\.</li>\n\s*<li><strong>OLP \(Over Load Protection\)</strong> – zabezpieczenie przeciążeniowe przy zbyt wysokim poborze prądu\.</li>\n\s*</ul>',
     r'<h2>{t(\'story5Title\')}</h2>\n              <p>{t(\'story5P1\')}</p>\n              <ul style={{ listStyleType: \'none\', padding: 0, marginTop: \'1rem\' }}>\n                <li style={{ marginBottom: \'0.5rem\' }}>{t(\'story5L1\')}</li>\n                <li style={{ marginBottom: \'0.5rem\' }}>{t(\'story5L2\')}</li>\n                <li style={{ marginBottom: \'0.5rem\' }}>{t(\'story5L3\')}</li>\n                <li>{t(\'story5L4\')}</li>\n              </ul>'),
     
    (r'<h2>Aluminium i Żywica Epoksydowa</h2>\n\s*<p>Trwałość zasilacza 12V / 24V zależy od efektywnego odprowadzania ciepła\. Zasilacze Scharfer zamknięte są w masywnej, aluminiowej obudowie, która pełni rolę radiatora\.</p>\n\s*<p>Wnętrze urządzenia jest w 100% zalane specjalistyczną żywicą przewodzącą ciepło\. Eliminuje to puste przestrzenie izolacyjne, zapobiega wibracjom cewek i gwarantuje utrzymanie stabilnej temperatury pracy nawet przy maksymalnym obciążeniu\. Każda jednostka przechodzi również rygorystyczne testy <strong>Burn-in</strong> przed opuszczeniem fabryki\.</p>',
     r'<h2>{t(\'story6Title\')}</h2>\n              <p>{t(\'story6P1\')}</p>\n              <p>{t(\'story6P2\')}</p>'),
     
    # Apps section
    (r'<h2>Gdzie sprawdzają się Zasilacze Scharfer\?</h2>', r'<h2>{t(\'appTitle\')}</h2>'),
    (r'<p style={{ fontSize: \'1\.1rem\', color: \'var\(--c-text\)\', maxWidth: \'700px\', margin: \'0\.5rem auto 0\' }}>\n\s*Niezawodność w każdej inwestycji\. Zobacz, gdzie nasi dystrybutorzy z powodzeniem stosują technologię Scharfer\.\n\s*</p>',
     r'<p style={{ fontSize: \'1.1rem\', color: \'var(--c-text)\', maxWidth: \'700px\', margin: \'0.5rem auto 0\' }}>\n            {t(\'appSubtitle\')}\n          </p>'),
     
    (r'<h3>Domy i Rezydencje</h3>\n\s*<p .*?>Wymagające instalacje domowe.*?</p>',
     r'<h3>{t(\'app1Title\')}</h3>\n              <p style={{ margin: 0, color: \'var(--c-text)\', fontSize: \'0.9rem\', lineHeight: 1.5 }}>{t(\'app1Desc\')}</p>'),
    (r'<h3>Bloki mieszkalne</h3>\n\s*<p .*?>Oświetlenie klatek schodowych.*?</p>',
     r'<h3>{t(\'app2Title\')}</h3>\n              <p style={{ margin: 0, color: \'var(--c-text)\', fontSize: \'0.9rem\', lineHeight: 1.5 }}>{t(\'app2Desc\')}</p>'),
    (r'<h3>Hale i Magazyny</h3>\n\s*<p .*?>Wysokie hale produkcyjne.*?</p>',
     r'<h3>{t(\'app3Title\')}</h3>\n              <p style={{ margin: 0, color: \'var(--c-text)\', fontSize: \'0.9rem\', lineHeight: 1.5 }}>{t(\'app3Desc\')}</p>'),
    (r'<h3>Obiekty sportowe</h3>\n\s*<p .*?>Korty, orliki i boiska.*?</p>',
     r'<h3>{t(\'app4Title\')}</h3>\n              <p style={{ margin: 0, color: \'var(--c-text)\', fontSize: \'0.9rem\', lineHeight: 1.5 }}>{t(\'app4Desc\')}</p>'),
    (r'<h3>Ogrody & Parki</h3>\n\s*<p .*?>Oświetlenie ogrodowe i parkowe.*?</p>',
     r'<h3>{t(\'app5Title\')}</h3>\n              <p style={{ margin: 0, color: \'var(--c-text)\', fontSize: \'0.9rem\', lineHeight: 1.5 }}>{t(\'app5Desc\')}</p>'),
    (r'<h3>Hotele & Gastro</h3>\n\s*<p .*?>W branży hotelarskiej.*?</p>',
     r'<h3>{t(\'app6Title\')}</h3>\n              <p style={{ margin: 0, color: \'var(--c-text)\', fontSize: \'0.9rem\', lineHeight: 1.5 }}>{t(\'app6Desc\')}</p>'),
    (r'<h3>Kina & Kultura</h3>\n\s*<p .*?>Sale kinowe i teatralne.*?</p>',
     r'<h3>{t(\'app7Title\')}</h3>\n              <p style={{ margin: 0, color: \'var(--c-text)\', fontSize: \'0.9rem\', lineHeight: 1.5 }}>{t(\'app7Desc\')}</p>'),
    (r'<h3>Szkoły & Edukacja</h3>\n\s*<p .*?>Bezpieczeństwo dzieci i stabilność.*?</p>',
     r'<h3>{t(\'app8Title\')}</h3>\n              <p style={{ margin: 0, color: \'var(--c-text)\', fontSize: \'0.9rem\', lineHeight: 1.5 }}>{t(\'app8Desc\')}</p>'),
    (r'<h3>Parkingi Podziemne</h3>\n\s*<p .*?>Parkingi podziemne i zadaszone.*?</p>',
     r'<h3>{t(\'app9Title\')}</h3>\n              <p style={{ margin: 0, color: \'var(--c-text)\', fontSize: \'0.9rem\', lineHeight: 1.5 }}>{t(\'app9Desc\')}</p>'),
    (r'<h3>Garaże & Warsztaty</h3>\n\s*<p .*?>W warsztatach samochodowych.*?</p>',
     r'<h3>{t(\'app10Title\')}</h3>\n              <p style={{ margin: 0, color: \'var(--c-text)\', fontSize: \'0.9rem\', lineHeight: 1.5 }}>{t(\'app10Desc\')}</p>'),
    (r'<h3>Wiaty & Stolarka</h3>\n\s*<p .*?>Oświetlenie wiat ogrodowych.*?</p>',
     r'<h3>{t(\'app11Title\')}</h3>\n              <p style={{ margin: 0, color: \'var(--c-text)\', fontSize: \'0.9rem\', lineHeight: 1.5 }}>{t(\'app11Desc\')}</p>'),
    (r'<h3>Infrastruktura & Mosty</h3>\n\s*<p .*?>Iluminacja mostów, wiaduktów.*?</p>',
     r'<h3>{t(\'app12Title\')}</h3>\n              <p style={{ margin: 0, color: \'var(--c-text)\', fontSize: \'0.9rem\', lineHeight: 1.5 }}>{t(\'app12Desc\')}</p>'),

    # B2B Section
    (r'Zostań naszym partnerem biznesowym', r'{t(\'b2bTitle\')}'),
    (r'Budujemy długofalowe relacje oparte na zaufaniu i zyskach dla obu stron\.', r'{t(\'b2bSubtitle\')}'),
    
    # FAQ Section
    (r'Często zadawane pytania \(FAQ\)', r'{t(\'faqTitle\')}'),
    (r'Wszystko, co musisz wiedzieć o zasilaczach LED Scharfer', r'{t(\'faqSubtitle\')}'),
    
    # FAQ Items (needs replacing array creation)
]

for pat, rep in replacements:
    content = re.sub(pat, rep, content, flags=re.DOTALL)

# Re-create faqItems array inside component
faq_replacement = """  const faqItems = [
    {
      q: t('faq1Q'),
      a: t('faq1A')
    },
    {
      q: t('faq2Q'),
      a: t('faq2A')
    },
    {
      q: t('faq3Q'),
      a: t('faq3A')
    },
    {
      q: t('faq4Q'),
      a: t('faq4A')
    },
    {
      q: t('faq5Q'),
      a: t('faq5A')
    },
    {
      q: t('faq6Q'),
      a: t('faq6A')
    }
  ];"""
  
content = re.sub(r'  const faqItems = \[.*?\];', faq_replacement, content, flags=re.DOTALL)

with open(file_path, 'w') as f:
    f.write(content)
print("Updated desktop/page.tsx")
