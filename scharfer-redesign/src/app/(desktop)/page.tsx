'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';

import InteractiveDiagram from '@/components/InteractiveDiagram';

export default function HomePage() {
  const { t } = useLanguage();
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  const faqItems = [
    {
      q: 'Jakie są warunki gwarancji na zasilacze LED Scharfer?',
      a: 'Każdy zasilacz LED marki Scharfer objęty jest pełną, 7-letnią gwarancją producenta. Jesteśmy pewni naszej technologii i stosowanych komponentów, co pozwala nam zapewnić Ci maksymalne bezpieczeństwo inwestycji w oświetlenie.'
    },
    {
      q: 'Czy zasilacze posiadają certyfikat IP67?',
      a: 'Tak, zasilacze scharfer posiadają klasę szczelności IP67. Oznacza to pełną wodoszczelność i pyłoszczelność. Dzięki temu idealnie nadają się do montażu w łazienkach, elewacjach budynków, reklamach świetlnych oraz w innych trudnych warunkach zewnętrznych.'
    },
    {
      q: 'Jak zostać dystrybutorem zasilaczy Scharfer?',
      a: 'Aby rozpocząć współpracę B2B, wystarczy wypełnić formularz w sekcji "Kontakt B2B" lub napisać bezpośrednio na adres biuro@prescot.pl. Nasz przedstawiciel handlowy skontaktuje się z Tobą w ciągu 24 godzin w celu przedstawienia dedykowanych warunków handlowych i rabatów hurtowych.'
    },
    {
      q: 'Czy gwarantujecie pracę pod pełnym obciążeniem?',
      a: 'Tak. Jedną z głównych zalet zasilaczy Scharfer jest gwarancja stabilnej pracy pod 100% zadeklarowanym obciążeniem. Nie musisz stosować dużych zapasów mocy (tzw. marginesów), jak to bywa w przypadku tańszych zamienników, co optymalizuje koszty całej instalacji LED.'
    },
    {
      q: 'Gdzie najlepiej stosować zasilacze 12V i 24V Scharfer?',
      a: 'Zasilacze 12V idealnie sprawdzają się do małych instalacji LED, podświetleń meblowych, gablot, kasetonów i krótkich linii światła, gdzie zasilacz ma pozostać dyskretny (np. modele 20W). Zasilacze 24V rekomendujemy przy dłuższych ciągach oświetleniowych, zapewniając stabilne napięcie na całym odcinku.'
    },
    {
      q: 'Jakie są kluczowe przewagi (Przewaga Scharfer)?',
      a: 'Przewaga Scharfer to przede wszystkim: obudowa w klasie IP67 zapewniająca wodoodporność i pyłoszczelność, stabilne napięcie wyjściowe, szeroki zakres wejściowy (100-250V AC), wysoka wydajność transferu, praca przy 100% obciążenia, test wypalenia przy pełnym obciążeniu oraz zaawansowane zabezpieczenia przed przeciążeniem i zwarciem.'
    }
  ];

  return (
    <div className="view-section active" style={{ animation: 'none' }}>
      {/* Hero Section */}
      <div className="hero">
        <div className="hero-bg" style={{ overflow: 'hidden', position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: -1 }}>
          <iframe 
            src="https://www.youtube.com/embed/2Ofm-Rvbz9A?autoplay=1&mute=1&loop=1&playlist=2Ofm-Rvbz9A&controls=0&showinfo=0&autohide=1&start=2" 
            style={{ width: '100vw', height: '56.25vw', minHeight: '100vh', minWidth: '177.77vh', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', pointerEvents: 'none', border: 'none' }} 
            allow="autoplay; encrypted-media" 
            allowFullScreen
          />
          <div className="hero-overlay" style={{ background: 'rgba(255, 255, 255, 0.85)', position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }} />
        </div>
        <div className="hero-container" style={{ maxWidth: 'var(--max-width)' }}>
          <div className="hero-content">
            <h1 className="hero-title" style={{ display: 'block' }}>
              <span>7 Lat gwarancji.</span> Stabilne Zasilanie. Prawdziwe <span>100%</span> mocy.
            </h1>
            <p className="hero-subtitle">
              Koniec z piszczeniem, awariami i spadkami napięć. Wodoodporne zasilacze LED IP67 (12V i 24V) stworzone do pracy pod pełnym obciążeniem. 7 lat gwarancji. Instalujesz i zapominasz.
            </p>
            <div className="hero-actions">
              <Link href="/oferta" className="btn-primary large" style={{ textDecoration: 'none', display: 'inline-block' }}>
                Zobacz Katalog Zasilaczy
              </Link>
              <Link href="/kontakt" className="btn-secondary large" style={{ textDecoration: 'none', display: 'inline-block' }}>
                Współpraca B2B
              </Link>
            </div>
            <div className="hero-trust">
              <div className="trust-item">
                <span className="trust-val" style={{ color: 'var(--c-red)' }}>7</span>
                <span className="trust-lbl">Lat Gwarancji</span>
              </div>
              <div className="trust-item">
                <span className="trust-val" style={{ color: 'var(--c-red)' }}>IP67</span>
                <span className="trust-lbl">Pełna Szczelność</span>
              </div>
              <div className="trust-item">
                <span className="trust-val" style={{ color: 'var(--c-red)' }}>100%</span>
                <span className="trust-lbl">Praca pod obciążeniem</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Technology Intro Block */}
      <div className="poznaj-hero" style={{ background: 'linear-gradient(135deg, var(--c-white) 0%, #eef2f6 100%)', padding: '6rem 2rem', textAlign: 'center', borderBottom: '1px solid var(--c-border)' }}>
        <div className="container" style={{ maxWidth: 'var(--max-width)', margin: '0 auto' }}>
          <h2 style={{ fontSize: '3rem', color: 'var(--c-heading)', marginBottom: '1rem', fontWeight: 800, fontFamily: 'Outfit, sans-serif' }}>
            Technologia bez kompromisów
          </h2>
          <p style={{ fontSize: '1.25rem', color: 'var(--c-text)', lineHeight: 1.6, maxWidth: '800px', margin: '0 auto' }}>
            Odkryj innowacje i zabezpieczenia, które sprawiają, że zasilacze Scharfer są najczęstszym wyborem profesjonalistów w branży oświetleniowej i B2B.
          </p>
        </div>
      </div>

      {/* Budowa zasilacza - interaktywny diagram */}
      <div className="section-padding bg-light" style={{ padding: '4rem 2rem 0rem 2rem', background: '#fafafa', borderBottom: '1px solid var(--c-border)', overflow: 'hidden' }}>
        <div className="container" style={{ maxWidth: 'var(--max-width)', margin: '0 auto' }}>
          <InteractiveDiagram />
        </div>
      </div>

      {/* 6 story detailed rows */}
      <div className="container section-padding" style={{ maxWidth: 'var(--max-width)', margin: '0 auto' }}>
        <div className="b2b-story-section">
          {/* Row 1: Gwarancja */}
          <div className="b2b-story-row">
            <div className="b2b-story-text">
              <h2>7 Lat Pełnej Gwarancji</h2>
              <p>Zaufanie to podstawa w branży B2B. Zasilacze Scharfer są projektowane tak, aby przetrwać najcięższe warunki pracy. Dlatego każdy nasz produkt objęty jest bezwarunkową, 7-letnią gwarancją producenta.</p>
              <p>Jasne warunki współpracy B2B: w przypadku usterki gwarantujemy ekspresową wymianę na nowy model bezpośrednio z naszego magazynu w Polsce. Buduj swoją renomę instalatorską na niezawodności.</p>
            </div>
            <div className="b2b-story-img">
              <img src="/assets/sch1.webp" alt="7 lat gwarancji Scharfer" style={{ borderRadius: '8px' }} />
            </div>
          </div>

          {/* Row 2: IP67 */}
          <div className="b2b-story-row">
            <div className="b2b-story-text">
              <h2>Ochrona IP67 do Zadań Specjalnych</h2>
              <p>Deszcz, śnieg, wilgoć czy pył – to dla nas żaden problem. Obudowa zasilaczy Scharfer posiada certyfikat szczelności IP67. Są całkowicie wodoodporne i pyłoszczelne.</p>
              <p>Idealne rozwiązanie do oświetlenia elewacji, podświetlania basenów, banerów reklamowych i architektury ogrodowej. Wyeliminuj ryzyko zwarć w instalacjach outdoorowych.</p>
            </div>
            <div className="b2b-story-img">
              <img src="/assets/sch2.webp" alt="Wodoodporność IP67" style={{ borderRadius: '8px' }} />
            </div>
          </div>

          {/* Row 3: 100% Obciążenia */}
          <div className="b2b-story-row">
            <div className="b2b-story-text">
              <h2>Zaprojektowane do Pracy pod 100% Obciążeniem</h2>
              <p>Koniec z przewymiarowaniem zasilaczy! W przeciwieństwie do tańszych zamienników, technologia Scharfer pozwala na stałą pracę pod 100% zadeklarowanym obciążeniem.</p>
              <p>Jeśli kupujesz model 150W, otrzymujesz pełne 150W czystej, stabilnej mocy. Oznacza to mniejsze koszty instalacji (możesz użyć mniejszego zasilacza) oraz brak problemów z przegrzewaniem.</p>
            </div>
            <div className="b2b-story-img">
              <img src="/assets/sch4.webp" alt="100% obciążenia" style={{ borderRadius: '8px' }} />
            </div>
          </div>
          
          {/* Row 4: Zgodność i Bezpieczeństwo */}
          <div className="b2b-story-row">
            <div className="b2b-story-text">
              <h2>Zgodność z Normami PN-EN, CE i RoHS</h2>
              <p>Bezpieczeństwo przede wszystkim. Zasilacze Scharfer spełniają najbardziej rygorystyczne europejskie normy bezpieczeństwa dla urządzeń oświetleniowych, w tym <strong>PN-EN 61347-1, EN 61347-2-13, EN 55015, EN 61547</strong>.</p>
              <p>Posiadają pełną certyfikację CE oraz RoHS. Wybierając markę Scharfer, chronisz swój biznes oraz inwestycje swoich klientów przed ryzykiem pożaru, przebicia prądu i niestabilnego napięcia. Sprzedawaj z czystym sumieniem certyfikowany sprzęt najwyższej klasy.</p>
            </div>
            <div className="b2b-story-img" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
              <img src="/assets/ce_rohs.png" alt="Certyfikaty CE i RoHS" style={{ width: 'auto', maxWidth: '100%', maxHeight: '180px', objectFit: 'contain', mixBlendMode: 'multiply', boxShadow: 'none', borderRadius: 0 }} />
            </div>
          </div>

          {/* Row 5: Zaawansowane Zabezpieczenia */}
          <div className="b2b-story-row">
            <div className="b2b-story-text">
              <h2>Zabezpieczenia OVP, SCP, OTP, OLP</h2>
              <p>Każdy profesjonalny zasilacz instalacyjny Scharfer wyposażony jest w aktywny, wielopoziomowy system ochrony elektroniki, zapobiegający uszkodzeniom w przypadku awarii sieci elektrycznej.</p>
              <ul style={{ listStyleType: 'none', padding: 0, marginTop: '1rem' }}>
                <li style={{ marginBottom: '0.5rem' }}><strong>OVP (Over Voltage Protection)</strong> – automatyczne odcięcie przy skokach napięcia.</li>
                <li style={{ marginBottom: '0.5rem' }}><strong>SCP (Short Circuit Protection)</strong> – błyskawiczne zabezpieczenie przeciwzwarciowe.</li>
                <li style={{ marginBottom: '0.5rem' }}><strong>OTP (Over Temperature Protection)</strong> – ochrona termiczna przed przegrzaniem.</li>
                <li><strong>OLP (Over Load Protection)</strong> – zabezpieczenie przeciążeniowe przy zbyt wysokim poborze prądu.</li>
              </ul>
            </div>
            <div className="b2b-story-img">
              <img src="/assets/40012.png" alt="Zasilacz 12V 400W Scharfer" style={{ borderRadius: '8px' }} />
            </div>
          </div>

          {/* Row 6: Konstrukcja Termiczna */}
          <div className="b2b-story-row">
            <div className="b2b-story-text">
              <h2>Aluminium i Żywica Epoksydowa</h2>
              <p>Trwałość zasilacza 12V / 24V zależy od efektywnego odprowadzania ciepła. Zasilacze Scharfer zamknięte są w masywnej, aluminiowej obudowie, która pełni rolę radiatora.</p>
              <p>Wnętrze urządzenia jest w 100% zalane specjalistyczną żywicą przewodzącą ciepło. Eliminuje to puste przestrzenie izolacyjne, zapobiega wibracjom cewek i gwarantuje utrzymanie stabilnej temperatury pracy nawet przy maksymalnym obciążeniu. Każda jednostka przechodzi również rygorystyczne testy <strong>Burn-in</strong> przed opuszczeniem fabryki.</p>
            </div>
            <div className="b2b-story-img">
              <img src="/assets/sch3.webp" alt="Aluminiowa obudowa" style={{ borderRadius: '8px' }} />
            </div>
          </div>
        </div>
      </div>

      {/* Applications Section (Visual Sales Tool) */}
      <div className="applications-section" style={{ maxWidth: 'var(--max-width)', margin: '5rem auto 0 auto', padding: '0 1.5rem' }}>
        <div className="section-header text-center" style={{ marginBottom: '3rem', textAlign: 'center' }}>
          <h2 style={{ fontSize: '2.5rem', color: 'var(--c-heading)' }}>Gdzie sprawdzają się Zasilacze Scharfer?</h2>
          <p style={{ fontSize: '1.1rem', color: 'var(--c-text)', maxWidth: '700px', margin: '0 auto' }}>
            Niezawodność w każdej inwestycji. Zobacz, gdzie nasi dystrybutorzy z powodzeniem stosują technologię Scharfer.
          </p>
        </div>
        
        <div className="app-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
          {/* App 1: Domy */}
          <div className="app-card" style={{ borderRadius: '12px', overflow: 'hidden', boxShadow: 'var(--shadow-md)', transition: 'transform 0.3s ease' }}>
            <img src="/assets/app_domy_1783188239361.png" alt="Zasilacz LED zewnętrzny do domu" style={{ width: '100%', height: '250px', objectFit: 'cover', display: 'block' }} />
            <div className="app-content" style={{ padding: '1.5rem', background: 'var(--c-white)' }}>
              <h3 style={{ margin: '0 0 0.5rem', fontSize: '1.25rem' }}>Domy i Rezydencje</h3>
              <p style={{ margin: 0, color: 'var(--c-text)', fontSize: '0.95rem' }}>Zasilacz LED zewnętrzny do domu. Idealny do zasilania taśm LED na elewacji, podbitek i schodów. Stabilna praca na zewnątrz.</p>
            </div>
          </div>
          {/* App 2: Bloki mieszkalne */}
          <div className="app-card" style={{ borderRadius: '12px', overflow: 'hidden', boxShadow: 'var(--shadow-md)', transition: 'transform 0.3s ease' }}>
            <img src="/assets/app_bloki_1783188247720.png" alt="Wodoodporny zasilacz do taśm LED" style={{ width: '100%', height: '250px', objectFit: 'cover', display: 'block' }} />
            <div className="app-content" style={{ padding: '1.5rem', background: 'var(--c-white)' }}>
              <h3 style={{ margin: '0 0 0.5rem', fontSize: '1.25rem' }}>Bloki mieszkalne</h3>
              <p style={{ margin: 0, color: 'var(--c-text)', fontSize: '0.95rem' }}>Wodoodporny zasilacz do taśm LED i opraw. Niezawodne zasilanie oświetlenia w częściach wspólnych, na elewacjach i klatkach schodowych.</p>
            </div>
          </div>
          {/* App 3: Hale */}
          <div className="app-card" style={{ borderRadius: '12px', overflow: 'hidden', boxShadow: 'var(--shadow-md)', transition: 'transform 0.3s ease' }}>
            <img src="/assets/app_hale_v2_1783188623293.png" alt="Zasilacze przemysłowe LED 24V" style={{ width: '100%', height: '250px', objectFit: 'cover', display: 'block' }} />
            <div className="app-content" style={{ padding: '1.5rem', background: 'var(--c-white)' }}>
              <h3 style={{ margin: '0 0 0.5rem', fontSize: '1.25rem' }}>Hale i Magazyny</h3>
              <p style={{ margin: 0, color: 'var(--c-text)', fontSize: '0.95rem' }}>Zasilacze przemysłowe LED 24V. Zasilanie długich linii świetlnych i mocnych opraw w magazynach oraz na halach produkcyjnych.</p>
            </div>
          </div>
          {/* App 4: Obiekty sportowe */}
          <div className="app-card" style={{ borderRadius: '12px', overflow: 'hidden', boxShadow: 'var(--shadow-md)', transition: 'transform 0.3s ease' }}>
            <img src="/assets/app_sport_v2_1783188631467.png" alt="Zasilacze LED 12V i 24V dużej mocy" style={{ width: '100%', height: '250px', objectFit: 'cover', display: 'block' }} />
            <div className="app-content" style={{ padding: '1.5rem', background: 'var(--c-white)' }}>
              <h3 style={{ margin: '0 0 0.5rem', fontSize: '1.25rem' }}>Obiekty sportowe</h3>
              <p style={{ margin: 0, color: 'var(--c-text)', fontSize: '0.95rem' }}>Zasilacze LED 12V i 24V dużej mocy. Profesjonalne zasilanie naświetlaczy, projektorów i taśm led na orlikach i kortach.</p>
            </div>
          </div>
          
          {/* App 5: Ogrody i parki */}
          <div className="app-card" style={{ borderRadius: '12px', overflow: 'hidden', boxShadow: 'var(--shadow-md)', transition: 'transform 0.3s ease' }}>
            <img src="/assets/app_ogrod_v2_1783188615253.png" alt="Zasilacz LED hermetyczny IP67" style={{ width: '100%', height: '250px', objectFit: 'cover', display: 'block' }} />
            <div className="app-content" style={{ padding: '1.5rem', background: 'var(--c-white)' }}>
              <h3 style={{ margin: '0 0 0.5rem', fontSize: '1.25rem' }}>Ogrody & Parki</h3>
              <p style={{ margin: 0, color: 'var(--c-text)', fontSize: '0.95rem' }}>Zasilacz LED hermetyczny IP67. Gwarantowane bezpieczne zasilanie taśm ledowych w gruncie, w pobliżu wody i zraszaczy.</p>
            </div>
          </div>
          {/* App 6: Hotele */}
          <div className="app-card" style={{ borderRadius: '12px', overflow: 'hidden', boxShadow: 'var(--shadow-md)', transition: 'transform 0.3s ease' }}>
            <img src="/assets/app_hotel_1783188309904.png" alt="Zasilacze do taśm LED ze ściemniaczem" style={{ width: '100%', height: '250px', objectFit: 'cover', display: 'block' }} />
            <div className="app-content" style={{ padding: '1.5rem', background: 'var(--c-white)' }}>
              <h3 style={{ margin: '0 0 0.5rem', fontSize: '1.25rem' }}>Hotele & Gastro</h3>
              <p style={{ margin: 0, color: 'var(--c-text)', fontSize: '0.95rem' }}>Zasilacze do taśm LED współpracujące ze ściemniaczem. Zasilanie oświetlenia stref relaksu w hotelach bez irytującego piszczenia.</p>
            </div>
          </div>
          {/* App 7: Kina */}
          <div className="app-card" style={{ borderRadius: '12px', overflow: 'hidden', boxShadow: 'var(--shadow-md)', transition: 'transform 0.3s ease' }}>
            <img src="/assets/app_kina_v2_1783188608035.png" alt="Zasilacze LED 12V do pasków" style={{ width: '100%', height: '250px', objectFit: 'cover', display: 'block' }} />
            <div className="app-content" style={{ padding: '1.5rem', background: 'var(--c-white)' }}>
              <h3 style={{ margin: '0 0 0.5rem', fontSize: '1.25rem' }}>Kina & Kultura</h3>
              <p style={{ margin: 0, color: 'var(--c-text)', fontSize: '0.95rem' }}>Zasilacze LED 12V do pasków led. Niezawodne i bezpieczne zasilanie przygaszonego oświetlenia ciągów komunikacyjnych.</p>
            </div>
          </div>
          {/* App 8: Szkoły */}
          <div className="app-card" style={{ borderRadius: '12px', overflow: 'hidden', boxShadow: 'var(--shadow-md)', transition: 'transform 0.3s ease' }}>
            <img src="/assets/app_szkoly_1783188326372.png" alt="Zasilacze do opraw LED" style={{ width: '100%', height: '250px', objectFit: 'cover', display: 'block' }} />
            <div className="app-content" style={{ padding: '1.5rem', background: 'var(--c-white)' }}>
              <h3 style={{ margin: '0 0 0.5rem', fontSize: '1.25rem' }}>Szkoły & Edukacja</h3>
              <p style={{ margin: 0, color: 'var(--c-text)', fontSize: '0.95rem' }}>Wydajne zasilacze do opraw LED. Bezpieczne zasilanie oświetlenia klas szkolnych wyposażone w zabezpieczenia przeciwzwarciowe.</p>
            </div>
          </div>
          {/* App 9: Parkingi */}
          <div className="app-card" style={{ borderRadius: '12px', overflow: 'hidden', boxShadow: 'var(--shadow-md)', transition: 'transform 0.3s ease' }}>
            <img src="/assets/app_parkingi_v2_1783188598862.png" alt="Zasilacze LED zewnętrzne" style={{ width: '100%', height: '250px', objectFit: 'cover', display: 'block' }} />
            <div className="app-content" style={{ padding: '1.5rem', background: 'var(--c-white)' }}>
              <h3 style={{ margin: '0 0 0.5rem', fontSize: '1.25rem' }}>Parkingi Podziemne</h3>
              <p style={{ margin: 0, color: 'var(--c-text)', fontSize: '0.95rem' }}>Zasilacze LED zewnętrzne 24V. Zapewniają ciągłe zasilanie liniowych systemów oświetleniowych na zadaszonych parkingach.</p>
            </div>
          </div>
          {/* App 10: Garaże */}
          <div className="app-card" style={{ borderRadius: '12px', overflow: 'hidden', boxShadow: 'var(--shadow-md)', transition: 'transform 0.3s ease' }}>
            <img src="/assets/app_garaze_1783188344306.png" alt="Mocne zasilacze do taśm LED 24V" style={{ width: '100%', height: '250px', objectFit: 'cover', display: 'block' }} />
            <div className="app-content" style={{ padding: '1.5rem', background: 'var(--c-white)' }}>
              <h3 style={{ margin: '0 0 0.5rem', fontSize: '1.25rem' }}>Garaże & Warsztaty</h3>
              <p style={{ margin: 0, color: 'var(--c-text)', fontSize: '0.95rem' }}>Mocne zasilacze do taśm LED 24V. Idealne zasilanie mocnych systemów oświetlenia liniowego do pracy detalicznej.</p>
            </div>
          </div>

          {/* App 11: Wiaty i Stolarka */}
          <div className="app-card" style={{ borderRadius: '12px', overflow: 'hidden', boxShadow: 'var(--shadow-md)', transition: 'transform 0.3s ease' }}>
            <img src="/wiata_jezioro.png" alt="Oświetlenie wiat i drewnianej stolarki" style={{ width: '100%', height: '250px', objectFit: 'cover', display: 'block' }} />
            <div className="app-content" style={{ padding: '1.5rem', background: 'var(--c-white)' }}>
              <h3 style={{ margin: '0 0 0.5rem', fontSize: '1.25rem' }}>Wiaty & Stolarka</h3>
              <p style={{ margin: 0, color: 'var(--c-text)', fontSize: '0.95rem' }}>Zasilacze hermetyczne Scharfer idealnie sprawdzają się w konstrukcjach drewnianych ze względu na ochronę termiczną.</p>
            </div>
          </div>
          {/* App 12: Mosty */}
          <div className="app-card" style={{ borderRadius: '12px', overflow: 'hidden', boxShadow: 'var(--shadow-md)', transition: 'transform 0.3s ease' }}>
            <img src="/assets/app_mosty_1783188351515.png" alt="Zasilacz LED wodoszczelny" style={{ width: '100%', height: '250px', objectFit: 'cover', display: 'block' }} />
            <div className="app-content" style={{ padding: '1.5rem', background: 'var(--c-white)' }}>
              <h3 style={{ margin: '0 0 0.5rem', fontSize: '1.25rem' }}>Infrastruktura & Mosty</h3>
              <p style={{ margin: 0, color: 'var(--c-text)', fontSize: '0.95rem' }}>Zasilacz LED wodoszczelny i odporny na wibracje. Przemysłowe zasilanie oświetlenia konstrukcji stalowych i mostów.</p>
            </div>
          </div>
        </div>
      </div>

      {/* B2B Partnership Section */}
      <div className="container section-padding" style={{ maxWidth: 'var(--max-width)', margin: '4rem auto 0 auto', padding: '0 1.5rem' }}>
        <div className="partnership-section" style={{ display: 'flex', gap: '3rem', flexWrap: 'wrap', alignItems: 'center' }}>
          <div className="partnership-img" style={{ flex: 1, minWidth: '300px' }}>
            <img src="/assets/wspolpraca.webp" alt="Współpraca B2B Scharfer" style={{ width: '100%', borderRadius: '12px', boxShadow: '0 8px 24px rgba(0,0,0,0.05)' }} />
          </div>
          <div className="partnership-text" style={{ flex: 1, minWidth: '300px' }}>
            <h2 style={{ fontSize: '2.2rem', color: 'var(--c-heading)', marginBottom: '0.5rem', fontWeight: 800 }}>Zostań naszym partnerem biznesowym</h2>
            <p className="ps-subtitle" style={{ fontSize: '1.1rem', color: '#666', marginBottom: '2rem' }}>Budujemy długofalowe relacje oparte na zaufaniu i zyskach dla obu stron.</p>
            
            <div className="value-list" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div className="value-item">
                <h4 style={{ fontSize: '1.15rem', color: 'var(--c-heading)', fontWeight: 700, marginBottom: '0.25rem' }}>{t('valPrice')}</h4>
                <p style={{ color: 'var(--c-text)', fontSize: '0.95rem' }}>{t('valPriceDesc')}</p>
              </div>
              <div className="value-item">
                <h4 style={{ fontSize: '1.15rem', color: 'var(--c-heading)', fontWeight: 700, marginBottom: '0.25rem' }}>{t('valAvailability')}</h4>
                <p style={{ color: 'var(--c-text)', fontSize: '0.95rem' }}>{t('valAvailabilityDesc')}</p>
              </div>
              <div className="value-item">
                <h4 style={{ fontSize: '1.15rem', color: 'var(--c-heading)', fontWeight: 700, marginBottom: '0.25rem' }}>{t('valSupport')}</h4>
                <p style={{ color: 'var(--c-text)', fontSize: '0.95rem' }}>{t('valSupportDesc')}</p>
              </div>
              <div className="value-item">
                <h4 style={{ fontSize: '1.15rem', color: 'var(--c-heading)', fontWeight: 700, marginBottom: '0.25rem' }}>{t('valPartner')}</h4>
                <p style={{ color: 'var(--c-text)', fontSize: '0.95rem' }}>{t('valPartnerDesc')}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="faq-section section-padding bg-light" style={{ background: '#fafafa', borderTop: '1px solid var(--c-border)', borderBottom: '1px solid var(--c-border)', padding: '5rem 2rem', marginTop: '5rem' }}>
        <div className="container" style={{ maxWidth: '900px', margin: '0 auto' }}>
          <div className="text-center" style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <h2 className="section-title" style={{ fontSize: '2rem', color: 'var(--c-heading)', fontWeight: 800 }}>Często zadawane pytania (FAQ)</h2>
            <p className="section-subtitle" style={{ color: '#666' }}>Wszystko, co musisz wiedzieć o zasilaczach LED Scharfer</p>
          </div>
          <div className="faq-accordion" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {faqItems.map((item, idx) => (
              <div key={idx} className={`faq-item ${activeFaq === idx ? 'active' : ''}`} style={{ background: 'white', border: '1px solid var(--c-border)', borderRadius: '8px', overflow: 'hidden' }}>
                <button 
                  className="faq-question" 
                  onClick={() => toggleFaq(idx)}
                  style={{ width: '100%', padding: '1.2rem 1.5rem', background: 'none', border: 'none', textAlign: 'left', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '1.1rem', fontWeight: 600, color: 'var(--c-heading)', cursor: 'pointer' }}
                >
                  {item.q}
                  <span className="faq-icon" style={{ fontSize: '1.3rem', color: 'var(--c-red)' }}>
                    {activeFaq === idx ? '−' : '+'}
                  </span>
                </button>
                {activeFaq === idx && (
                  <div className="faq-answer" style={{ padding: '0 1.5rem 1.5rem', color: 'var(--c-text)', fontSize: '0.95rem', lineHeight: 1.6 }}>
                    <p style={{ margin: 0 }}>{item.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
