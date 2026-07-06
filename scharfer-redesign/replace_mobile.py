import re

file_path = "/Users/karolbohdanowicz/my-ai-agents/scharfer-redesign/src/app/(mobile)/mobile/page.tsx"

with open(file_path, 'r') as f:
    content = f.read()

replacements = [
    # Hero Title (Mobile has brs)
    (r'<span>7 Lat gwarancji\.</span><br/>\n\s*Stabilne Zasilanie\.<br/>\n\s*Prawdziwe <span style={{ color: \'#dc2626\' }}>100%</span> mocy\.',
     r'<span>{t(\'heroWarranty\')}</span><br/>\n                    {t(\'heroPower\')}<br/>\n                    {t(\'heroReal\')}<span style={{ color: \'#dc2626\' }}>{t(\'hero100\')}</span>{t(\'heroLoad\')}'),
    
    # Hero Subtitle
    (r'Koniec z piszczeniem, awariami i spadkami napięć\. Wodoodporne zasilacze LED IP67 \(12V i 24V\) stworzone do pracy pod pełnym obciążeniem\.',
     r'{t(\'heroSubtitle\')}'),
     
    # Trust Items
    (r'<span className="trust-val" style={{ color: \'#dc2626\', fontSize: \'1\.2rem\', fontWeight: 800, display: \'block\' }}>7 Lat</span>\n\s*<span className="trust-lbl" style={{ color: \'#dc2626\', fontSize: \'0\.75rem\', fontWeight: 700, display: \'block\', marginTop: \'2px\' }}>Gwarancji</span>',
     r'<span className="trust-val" style={{ color: \'#dc2626\', fontSize: \'1.2rem\', fontWeight: 800, display: \'block\' }}>{t(\'trust7Years\')}</span>\n                      <span className="trust-lbl" style={{ color: \'#dc2626\', fontSize: \'0.75rem\', fontWeight: 700, display: \'block\', marginTop: \'2px\' }}>{t(\'trustWarranty\')}</span>'),
    (r'<span className="trust-val" style={{ color: \'#dc2626\', fontSize: \'1\.2rem\', fontWeight: 800, display: \'block\' }}>IP67</span>\n\s*<span className="trust-lbl" style={{ color: \'#dc2626\', fontSize: \'0\.75rem\', fontWeight: 700, display: \'block\', marginTop: \'2px\' }}>Szczelność</span>',
     r'<span className="trust-val" style={{ color: \'#dc2626\', fontSize: \'1.2rem\', fontWeight: 800, display: \'block\' }}>{t(\'trustIP67\')}</span>\n                      <span className="trust-lbl" style={{ color: \'#dc2626\', fontSize: \'0.75rem\', fontWeight: 700, display: \'block\', marginTop: \'2px\' }}>{t(\'trustTightness\')}</span>'),
    (r'<span className="trust-val" style={{ color: \'#dc2626\', fontSize: \'1\.2rem\', fontWeight: 800, display: \'block\' }}>100%</span>\n\s*<span className="trust-lbl" style={{ color: \'#dc2626\', fontSize: \'0\.75rem\', fontWeight: 700, display: \'block\', marginTop: \'2px\' }}>Obciążenia</span>',
     r'<span className="trust-val" style={{ color: \'#dc2626\', fontSize: \'1.2rem\', fontWeight: 800, display: \'block\' }}>{t(\'trust100\')}</span>\n                      <span className="trust-lbl" style={{ color: \'#dc2626\', fontSize: \'0.75rem\', fontWeight: 700, display: \'block\', marginTop: \'2px\' }}>{t(\'trustLoad\')}</span>'),
     
    # Tech section
    (r'Technologia bez kompromisów', r'{t(\'techNoComp\')}'),
    (r'Odkryj innowacje i zabezpieczenia, które sprawiają, że zasilacze Scharfer są najczęstszym wyborem profesjonalistów w branży oświetleniowej i B2B\.', r'{t(\'techDesc\')}'),
    
    # Stories
    (r'<h2 style={{ fontSize: \'1\.5rem\', color: \'var\(--c-heading\)\', marginBottom: \'15px\' }}>7 Lat Pełnej Gwarancji</h2>\n\s*<p .*?>Zaufanie to podstawa w branży B2B\. Zasilacze Scharfer są projektowane tak, aby przetrwać najcięższe warunki pracy\. Dlatego każdy nasz produkt objęty jest bezwarunkową, 7-letnią gwarancją producenta\.</p>\n\s*<p .*?>Jasne warunki współpracy B2B: w przypadku usterki gwarantujemy ekspresową wymianę na nowy model bezpośrednio z naszego magazynu w Polsce\. Buduj swoją renomę instalatorską na niezawodności\.</p>',
     r'<h2 style={{ fontSize: \'1.5rem\', color: \'var(--c-heading)\', marginBottom: \'15px\' }}>{t(\'story1Title\')}</h2>\n                <p style={{ color: \'var(--c-text)\', lineHeight: 1.6, marginBottom: \'10px\' }}>{t(\'story1P1\')}</p>\n                <p style={{ color: \'var(--c-text)\', lineHeight: 1.6 }}>{t(\'story1P2\')}</p>'),
    
    (r'<h2 style={{ fontSize: \'1\.5rem\', color: \'var\(--c-heading\)\', marginBottom: \'15px\' }}>Ochrona IP67 do Zadań Specjalnych</h2>\n\s*<p .*?>Deszcz, śnieg, wilgoć czy pył – to dla nas żaden problem\. Obudowa zasilaczy Scharfer posiada certyfikat szczelności IP67\. Są całkowicie wodoodporne i pyłoszczelne\.</p>\n\s*<p .*?>Idealne rozwiązanie do oświetlenia elewacji, podświetlania basenów, banerów reklamowych i architektury ogrodowej\. Wyeliminuj ryzyko zwarć w instalacjach outdoorowych\.</p>',
     r'<h2 style={{ fontSize: \'1.5rem\', color: \'var(--c-heading)\', marginBottom: \'15px\' }}>{t(\'story2Title\')}</h2>\n                <p style={{ color: \'var(--c-text)\', lineHeight: 1.6, marginBottom: \'10px\' }}>{t(\'story2P1\')}</p>\n                <p style={{ color: \'var(--c-text)\', lineHeight: 1.6 }}>{t(\'story2P2\')}</p>'),
     
    (r'<h2 style={{ fontSize: \'1\.5rem\', color: \'var\(--c-heading\)\', marginBottom: \'15px\' }}>Zaprojektowane do Pracy pod 100% Obciążeniem</h2>\n\s*<p .*?>Koniec z przewymiarowaniem zasilaczy! W przeciwieństwie do tańszych zamienników, technologia Scharfer pozwala na stałą pracę pod 100% zadeklarowanym obciążeniem\.</p>\n\s*<p .*?>Jeśli kupujesz model 150W, otrzymujesz pełne 150W czystej, stabilnej mocy\. Oznacza to mniejsze koszty instalacji \(możesz użyć mniejszego zasilacza\) oraz brak problemów z przegrzewaniem\.</p>',
     r'<h2 style={{ fontSize: \'1.5rem\', color: \'var(--c-heading)\', marginBottom: \'15px\' }}>{t(\'story3Title\')}</h2>\n                <p style={{ color: \'var(--c-text)\', lineHeight: 1.6, marginBottom: \'10px\' }}>{t(\'story3P1\')}</p>\n                <p style={{ color: \'var(--c-text)\', lineHeight: 1.6 }}>{t(\'story3P2\')}</p>'),
     
    (r'<h2 style={{ fontSize: \'1\.5rem\', color: \'var\(--c-heading\)\', marginBottom: \'15px\' }}>Zgodność z Normami PN-EN, CE i RoHS</h2>\n\s*<p .*?>Bezpieczeństwo przede wszystkim\. Zasilacze Scharfer spełniają najbardziej rygorystyczne europejskie normy bezpieczeństwa dla urządzeń oświetleniowych, w tym <strong>PN-EN 61347-1, EN 61347-2-13, EN 55015, EN 61547</strong>\.</p>\n\s*<p .*?>Posiadają pełną certyfikację CE oraz RoHS\. Wybierając markę Scharfer, chronisz swój biznes oraz inwestycje swoich klientów przed ryzykiem pożaru, przebicia prądu i niestabilnego napięcia\. Sprzedawaj z czystym sumieniem certyfikowany sprzęt najwyższej klasy\.</p>',
     r'<h2 style={{ fontSize: \'1.5rem\', color: \'var(--c-heading)\', marginBottom: \'15px\' }}>{t(\'story4Title\')}</h2>\n                <p style={{ color: \'var(--c-text)\', lineHeight: 1.6, marginBottom: \'10px\' }}>{t(\'story4P1\')}</p>\n                <p style={{ color: \'var(--c-text)\', lineHeight: 1.6 }}>{t(\'story4P2\')}</p>'),
     
    (r'<h2 style={{ fontSize: \'1\.5rem\', color: \'var\(--c-heading\)\', marginBottom: \'15px\' }}>Zabezpieczenia OVP, SCP, OTP, OLP</h2>\n\s*<p .*?>Każdy profesjonalny zasilacz instalacyjny Scharfer wyposażony jest w aktywny, wielopoziomowy system ochrony elektroniki, zapobiegający uszkodzeniom w przypadku awarii sieci elektrycznej\.</p>\n\s*<ul style={{ listStyleType: \'none\', padding: 0, marginTop: \'15px\', color: \'var\(--c-text\)\', lineHeight: 1\.6 }}>\n\s*<li style={{ marginBottom: \'8px\' }}><strong>OVP \(Over Voltage Protection\)</strong> – automatyczne odcięcie przy skokach napięcia\.</li>\n\s*<li style={{ marginBottom: \'8px\' }}><strong>SCP \(Short Circuit Protection\)</strong> – błyskawiczne zabezpieczenie przeciwzwarciowe\.</li>\n\s*<li style={{ marginBottom: \'8px\' }}><strong>OTP \(Over Temperature Protection\)</strong> – ochrona termiczna przed przegrzaniem\.</li>\n\s*<li><strong>OLP \(Over Load Protection\)</strong> – zabezpieczenie przeciążeniowe przy zbyt wysokim poborze prądu\.</li>\n\s*</ul>',
     r'<h2 style={{ fontSize: \'1.5rem\', color: \'var(--c-heading)\', marginBottom: \'15px\' }}>{t(\'story5Title\')}</h2>\n                <p style={{ color: \'var(--c-text)\', lineHeight: 1.6, marginBottom: \'10px\' }}>{t(\'story5P1\')}</p>\n                <ul style={{ listStyleType: \'none\', padding: 0, marginTop: \'15px\', color: \'var(--c-text)\', lineHeight: 1.6 }}>\n                  <li style={{ marginBottom: \'8px\' }}>{t(\'story5L1\')}</li>\n                  <li style={{ marginBottom: \'8px\' }}>{t(\'story5L2\')}</li>\n                  <li style={{ marginBottom: \'8px\' }}>{t(\'story5L3\')}</li>\n                  <li>{t(\'story5L4\')}</li>\n                </ul>'),
     
    (r'<h2 style={{ fontSize: \'1\.5rem\', color: \'var\(--c-heading\)\', marginBottom: \'15px\' }}>Aluminium i Żywica Epoksydowa</h2>\n\s*<p .*?>Trwałość zasilacza 12V / 24V zależy od efektywnego odprowadzania ciepła\. Zasilacze Scharfer zamknięte są w masywnej, aluminiowej obudowie, która pełni rolę radiatora\.</p>\n\s*<p .*?>Wnętrze urządzenia jest w 100% zalane specjalistyczną żywicą przewodzącą ciepło\. Eliminuje to puste przestrzenie izolacyjne, zapobiega wibracjom cewek i gwarantuje utrzymanie stabilnej temperatury pracy nawet przy maksymalnym obciążeniu\. Każda jednostka przechodzi również rygorystyczne testy <strong>Burn-in</strong> przed opuszczeniem fabryki\.</p>',
     r'<h2 style={{ fontSize: \'1.5rem\', color: \'var(--c-heading)\', marginBottom: \'15px\' }}>{t(\'story6Title\')}</h2>\n                <p style={{ color: \'var(--c-text)\', lineHeight: 1.6, marginBottom: \'10px\' }}>{t(\'story6P1\')}</p>\n                <p style={{ color: \'var(--c-text)\', lineHeight: 1.6 }}>{t(\'story6P2\')}</p>'),
     
    # Apps section
    (r'Gdzie sprawdzają się Zasilacze Scharfer\?', r'{t(\'appTitle\')}'),
    (r'<p style={{ fontSize: \'1rem\', color: \'var\(--c-text\)\', margin: \'0\.5rem auto 0\' }}>\n\s*Niezawodność w każdej inwestycji\. Zobacz, gdzie nasi dystrybutorzy z powodzeniem stosują technologię Scharfer\.\n\s*</p>',
     r'<p style={{ fontSize: \'1rem\', color: \'var(--c-text)\', margin: \'0.5rem auto 0\' }}>\n                {t(\'appSubtitle\')}\n              </p>'),
     
    (r'<h3 style={{ margin: \'0 0 5px\', fontSize: \'1\.1rem\', fontWeight: 700 }}>Domy i Rezydencje</h3>\n\s*<p .*?>Wymagające instalacje domowe.*?</p>',
     r'<h3 style={{ margin: \'0 0 5px\', fontSize: \'1.1rem\', fontWeight: 700 }}>{t(\'app1Title\')}</h3>\n                  <p style={{ margin: 0, color: \'var(--c-text)\', fontSize: \'0.85rem\', lineHeight: 1.5 }}>{t(\'app1Desc\')}</p>'),
    (r'<h3 style={{ margin: \'0 0 5px\', fontSize: \'1\.1rem\', fontWeight: 700 }}>Bloki mieszkalne</h3>\n\s*<p .*?>Oświetlenie klatek schodowych.*?</p>',
     r'<h3 style={{ margin: \'0 0 5px\', fontSize: \'1.1rem\', fontWeight: 700 }}>{t(\'app2Title\')}</h3>\n                  <p style={{ margin: 0, color: \'var(--c-text)\', fontSize: \'0.85rem\', lineHeight: 1.5 }}>{t(\'app2Desc\')}</p>'),
    (r'<h3 style={{ margin: \'0 0 5px\', fontSize: \'1\.1rem\', fontWeight: 700 }}>Hale i Magazyny</h3>\n\s*<p .*?>Wysokie hale produkcyjne.*?</p>',
     r'<h3 style={{ margin: \'0 0 5px\', fontSize: \'1.1rem\', fontWeight: 700 }}>{t(\'app3Title\')}</h3>\n                  <p style={{ margin: 0, color: \'var(--c-text)\', fontSize: \'0.85rem\', lineHeight: 1.5 }}>{t(\'app3Desc\')}</p>'),
    (r'<h3 style={{ margin: \'0 0 5px\', fontSize: \'1\.1rem\', fontWeight: 700 }}>Obiekty sportowe</h3>\n\s*<p .*?>Korty, orliki i boiska.*?</p>',
     r'<h3 style={{ margin: \'0 0 5px\', fontSize: \'1.1rem\', fontWeight: 700 }}>{t(\'app4Title\')}</h3>\n                  <p style={{ margin: 0, color: \'var(--c-text)\', fontSize: \'0.85rem\', lineHeight: 1.5 }}>{t(\'app4Desc\')}</p>'),
    (r'<h3 style={{ margin: \'0 0 5px\', fontSize: \'1\.1rem\', fontWeight: 700 }}>Ogrody & Parki</h3>\n\s*<p .*?>Oświetlenie ogrodowe i parkowe.*?</p>',
     r'<h3 style={{ margin: \'0 0 5px\', fontSize: \'1.1rem\', fontWeight: 700 }}>{t(\'app5Title\')}</h3>\n                  <p style={{ margin: 0, color: \'var(--c-text)\', fontSize: \'0.85rem\', lineHeight: 1.5 }}>{t(\'app5Desc\')}</p>'),
    (r'<h3 style={{ margin: \'0 0 5px\', fontSize: \'1\.1rem\', fontWeight: 700 }}>Hotele & Gastro</h3>\n\s*<p .*?>W branży hotelarskiej.*?</p>',
     r'<h3 style={{ margin: \'0 0 5px\', fontSize: \'1.1rem\', fontWeight: 700 }}>{t(\'app6Title\')}</h3>\n                  <p style={{ margin: 0, color: \'var(--c-text)\', fontSize: \'0.85rem\', lineHeight: 1.5 }}>{t(\'app6Desc\')}</p>'),
    (r'<h3 style={{ margin: \'0 0 5px\', fontSize: \'1\.1rem\', fontWeight: 700 }}>Kina & Kultura</h3>\n\s*<p .*?>Sale kinowe i teatralne.*?</p>',
     r'<h3 style={{ margin: \'0 0 5px\', fontSize: \'1.1rem\', fontWeight: 700 }}>{t(\'app7Title\')}</h3>\n                  <p style={{ margin: 0, color: \'var(--c-text)\', fontSize: \'0.85rem\', lineHeight: 1.5 }}>{t(\'app7Desc\')}</p>'),
    (r'<h3 style={{ margin: \'0 0 5px\', fontSize: \'1\.1rem\', fontWeight: 700 }}>Szkoły & Edukacja</h3>\n\s*<p .*?>Bezpieczeństwo dzieci i stabilność.*?</p>',
     r'<h3 style={{ margin: \'0 0 5px\', fontSize: \'1.1rem\', fontWeight: 700 }}>{t(\'app8Title\')}</h3>\n                  <p style={{ margin: 0, color: \'var(--c-text)\', fontSize: \'0.85rem\', lineHeight: 1.5 }}>{t(\'app8Desc\')}</p>'),
    (r'<h3 style={{ margin: \'0 0 5px\', fontSize: \'1\.1rem\', fontWeight: 700 }}>Parkingi Podziemne</h3>\n\s*<p .*?>Parkingi podziemne i zadaszone.*?</p>',
     r'<h3 style={{ margin: \'0 0 5px\', fontSize: \'1.1rem\', fontWeight: 700 }}>{t(\'app9Title\')}</h3>\n                  <p style={{ margin: 0, color: \'var(--c-text)\', fontSize: \'0.85rem\', lineHeight: 1.5 }}>{t(\'app9Desc\')}</p>'),
    (r'<h3 style={{ margin: \'0 0 5px\', fontSize: \'1\.1rem\', fontWeight: 700 }}>Garaże & Warsztaty</h3>\n\s*<p .*?>W warsztatach samochodowych.*?</p>',
     r'<h3 style={{ margin: \'0 0 5px\', fontSize: \'1.1rem\', fontWeight: 700 }}>{t(\'app10Title\')}</h3>\n                  <p style={{ margin: 0, color: \'var(--c-text)\', fontSize: \'0.85rem\', lineHeight: 1.5 }}>{t(\'app10Desc\')}</p>'),
    (r'<h3 style={{ margin: \'0 0 5px\', fontSize: \'1\.1rem\', fontWeight: 700 }}>Wiaty & Stolarka</h3>\n\s*<p .*?>Oświetlenie wiat ogrodowych.*?</p>',
     r'<h3 style={{ margin: \'0 0 5px\', fontSize: \'1.1rem\', fontWeight: 700 }}>{t(\'app11Title\')}</h3>\n                  <p style={{ margin: 0, color: \'var(--c-text)\', fontSize: \'0.85rem\', lineHeight: 1.5 }}>{t(\'app11Desc\')}</p>'),
    (r'<h3 style={{ margin: \'0 0 5px\', fontSize: \'1\.1rem\', fontWeight: 700 }}>Infrastruktura & Mosty</h3>\n\s*<p .*?>Iluminacja mostów, wiaduktów.*?</p>',
     r'<h3 style={{ margin: \'0 0 5px\', fontSize: \'1.1rem\', fontWeight: 700 }}>{t(\'app12Title\')}</h3>\n                  <p style={{ margin: 0, color: \'var(--c-text)\', fontSize: \'0.85rem\', lineHeight: 1.5 }}>{t(\'app12Desc\')}</p>'),

    # B2B Section
    (r'<h2 style={{ fontSize: \'1\.8rem\', color: \'var\(--c-heading\)\', marginBottom: \'10px\', fontWeight: 800 }}>Zostań naszym partnerem biznesowym</h2>',
     r'<h2 style={{ fontSize: \'1.8rem\', color: \'var(--c-heading)\', marginBottom: \'10px\', fontWeight: 800 }}>{t(\'b2bTitle\')}</h2>'),
    (r'<p style={{ fontSize: \'1rem\', color: \'#666\', marginBottom: \'20px\' }}>Budujemy długofalowe relacje oparte na zaufaniu i zyskach dla obu stron\.</p>',
     r'<p style={{ fontSize: \'1rem\', color: \'#666\', marginBottom: \'20px\' }}>{t(\'b2bSubtitle\')}</p>'),
     
    (r'<h4 style={{ fontSize: \'1\.1rem\', color: \'var\(--c-heading\)\', fontWeight: 700, marginBottom: \'5px\' }}>Korzystna cena i rabaty</h4>\n\s*<p .*?>Atrakcyjne warunki handlowe i elastyczne rabaty dla stałych dystrybutorów hurtowych\.</p>',
     r'<h4 style={{ fontSize: \'1.1rem\', color: \'var(--c-heading)\', fontWeight: 700, marginBottom: \'5px\' }}>{t(\'valPrice\')}</h4>\n                  <p style={{ color: \'var(--c-text)\', fontSize: \'0.9rem\' }}>{t(\'valPriceDesc\')}</p>'),
    (r'<h4 style={{ fontSize: \'1\.1rem\', color: \'var\(--c-heading\)\', fontWeight: 700, marginBottom: \'5px\' }}>Stała dostępność zasilaczy</h4>\n\s*<p .*?>Stałe stany magazynowe w Polsce gwarantujące wysyłkę w 24 godziny od zamówienia\.</p>',
     r'<h4 style={{ fontSize: \'1.1rem\', color: \'var(--c-heading)\', fontWeight: 700, marginBottom: \'5px\' }}>{t(\'valAvailability\')}</h4>\n                  <p style={{ color: \'var(--c-text)\', fontSize: \'0.9rem\' }}>{t(\'valAvailabilityDesc\')}</p>'),
    (r'<h4 style={{ fontSize: \'1\.1rem\', color: \'var\(--c-heading\)\', fontWeight: 700, marginBottom: \'5px\' }}>Dedykowane wsparcie techniczne</h4>\n\s*<p .*?>Pomoc inżynieryjna w doborze parametrów i rozwiązywaniu problemów instalacyjnych\.</p>',
     r'<h4 style={{ fontSize: \'1.1rem\', color: \'var(--c-heading)\', fontWeight: 700, marginBottom: \'5px\' }}>{t(\'valSupport\')}</h4>\n                  <p style={{ color: \'var(--c-text)\', fontSize: \'0.9rem\' }}>{t(\'valSupportDesc\')}</p>'),
    (r'<h4 style={{ fontSize: \'1\.1rem\', color: \'var\(--c-heading\)\', fontWeight: 700, marginBottom: \'5px\' }}>Zaufany partner biznesowy</h4>\n\s*<p .*?>Długofalowa współpraca oparta na partnerskich zasadach i wyłączności terytorialnej\.</p>',
     r'<h4 style={{ fontSize: \'1.1rem\', color: \'var(--c-heading)\', fontWeight: 700, marginBottom: \'5px\' }}>{t(\'valPartner\')}</h4>\n                  <p style={{ color: \'var(--c-text)\', fontSize: \'0.9rem\' }}>{t(\'valPartnerDesc\')}</p>'),

    # FAQ Section
    (r'<h2 className="section-title" style={{ fontSize: \'1\.8rem\', color: \'var\(--c-heading\)\', fontWeight: 800, marginBottom: \'10px\' }}>Często zadawane pytania \(FAQ\)</h2>',
     r'<h2 className="section-title" style={{ fontSize: \'1.8rem\', color: \'var(--c-heading)\', fontWeight: 800, marginBottom: \'10px\' }}>{t(\'faqTitle\')}</h2>'),
    (r'<p className="section-subtitle" style={{ color: \'#666\', fontSize: \'0\.95rem\' }}>Wszystko, co musisz wiedzieć o zasilaczach LED Scharfer</p>',
     r'<p className="section-subtitle" style={{ color: \'#666\', fontSize: \'0.95rem\' }}>{t(\'faqSubtitle\')}</p>'),
     
    # Footer
    (r'<h3 style={{ color: \'white\', fontSize: \'1\.2rem\', marginBottom: \'15px\', fontWeight: 600 }}>Scharfer</h3>',
     r'<h3 style={{ color: \'white\', fontSize: \'1.2rem\', marginBottom: \'15px\', fontWeight: 600 }}>Scharfer</h3>'),

    # Interactive diagram - Need to replace strings there too, but let's check `InteractiveDiagram.tsx` next.

    # Contact forms etc are already mostly done, but let me check.
    (r'Skontaktuj się z nami', r'{t(\'contactTitle\')}'),
    (r'Masz pytania dotyczące współpracy hurtowej\? Chcesz zamówić większą partię zasilaczy\? Napisz do nas\.', r'{t(\'contactSubtitle\')}'),
    (r'Wiadomość została wysłana\. Dziękujemy za kontakt!', r'{t(\'contactSuccess\')}'),
    (r'Wystąpił błąd podczas wysyłania wiadomości\. Spróbuj ponownie\.', r'{t(\'contactError\')}'),
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
print("Updated mobile/page.tsx")
