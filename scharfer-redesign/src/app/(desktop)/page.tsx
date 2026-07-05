'use client';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';

export default function HomePage() {
  const { t } = useLanguage();

  return (
    <div className="view-section active" style={{ animation: 'none' }}>
      {/* Hero Section */}
      <div className="hero">
        <div className="hero-bg" style={{ overflow: 'hidden', position: 'absolute', top: 0, left: 0, width: 100 + '%', height: 100 + '%', zIndex: -1 }}>
          <iframe 
            src="https://www.youtube.com/embed/2Ofm-Rvbz9A?autoplay=1&mute=1&loop=1&playlist=2Ofm-Rvbz9A&controls=0&showinfo=0&autohide=1&start=2" 
            style={{ width: '100vw', height: '56.25vw', minHeight: '100vh', minWidth: '177.77vh', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', pointerEvents: 'none', border: 'none' }} 
            allow="autoplay; encrypted-media" 
            allowFullScreen
          />
          <div className="hero-overlay" style={{ background: 'rgba(255, 255, 255, 0.85)', position: 'absolute', top: 0, left: 0, width: 100 + '%', height: 100 + '%' }} />
        </div>
        <div className="hero-container">
          <div className="hero-content">
            <h1 className="hero-title" style={{ display: 'block' }}>
              <span>7 Lat gwarancji.</span> Stabilne Zasilanie. Prawdziwe <span>100%</span> mocy.
            </h1>
            <p className="hero-subtitle">
              Koniec z piszczeniem, awariami i spadkami napięć. Wodoodporne zasilacze 12V i 24V (IP67) stworzone do pracy pod pełnym obciążeniem. 7 lat gwarancji. Instalujesz i zapominasz.
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
                <span className="trust-val">7</span>
                <span className="trust-lbl">Lat Gwarancji</span>
              </div>
              <div className="trust-item">
                <span className="trust-val">IP67</span>
                <span className="trust-lbl">Pełna Szczelność</span>
              </div>
              <div className="trust-item">
                <span className="trust-val">100%</span>
                <span className="trust-lbl">Praca pod obciążeniem</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Technology / Story Section */}
      <div className="poznaj-hero" style={{ background: 'linear-gradient(135deg, var(--c-white) 0%, #eef2f6 100%)', padding: '6rem 2rem', textAlign: 'center', borderBottom: '1px solid var(--c-border)' }}>
        <div className="container" style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '3rem', color: 'var(--c-heading)', marginBottom: '1rem', fontWeight: 800, fontFamily: 'Outfit, sans-serif' }}>
            Technologia bez kompromisów
          </h2>
          <p style={{ fontSize: '1.25rem', color: 'var(--c-text)', lineHeight: 1.6 }}>
            Odkryj innowacje i zabezpieczenia, które sprawiają, że zasilacze Scharfer są najczęstszym wyborem profesjonalistów w branży oświetleniowej i B2B.
          </p>
        </div>
      </div>

      <div className="container section-padding" style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div className="b2b-story-section">
          {/* Row 1: Gwarancja */}
          <div className="b2b-story-row">
            <div className="b2b-story-text">
              <h2>7 Lat Pełnej Gwarancji</h2>
              <p>Zaufanie to podstawa w branży B2B. Zasilacze Scharfer są projektowane tak, aby przetrwać najcięższe warunki pracy. Dlatego każdy nasz produkt objęty jest bezwarunkową, 7-letnią gwarancją producenta.</p>
              <p>Jasne warunki współpracy B2B: w przypadku usterki gwarantujemy ekspresową wymianę na nowy model bezpośrednio z naszego magazynu w Polsce. Buduj swoją renomę instalatorską na niezawodności.</p>
            </div>
            <div className="b2b-story-img">
              <img src="/assets/sch1.webp" alt="7 lat gwarancji Scharfer" />
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
              <img src="/assets/sch2.webp" alt="Wodoodporność IP67" />
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
              <img src="/assets/sch4.webp" alt="100% obciążenia" />
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
              <img src="/assets/40012.png" alt="Zasilacz 12V 400W Scharfer" />
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
              <img src="/assets/sch3.webp" alt="Aluminiowa obudowa i odprowadzanie ciepła" />
            </div>
          </div>
        </div>
      </div>

      {/* Applications Section (Visual Sales Tool) */}
      <div className="applications-section" style={{ maxWidth: '1200px', margin: '5rem auto', padding: '0 1.5rem' }}>
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
          {/* App 5: Wiaty i Stolarka */}
          <div className="app-card" style={{ borderRadius: '12px', overflow: 'hidden', boxShadow: 'var(--shadow-md)', transition: 'transform 0.3s ease' }}>
            <img src="/wiata_jezioro.png" alt="Oświetlenie wiat i drewnianej stolarki" style={{ width: '100%', height: '250px', objectFit: 'cover', display: 'block' }} />
            <div className="app-content" style={{ padding: '1.5rem', background: 'var(--c-white)' }}>
              <h3 style={{ margin: '0 0 0.5rem', fontSize: '1.25rem' }}>Wiaty i Stolarka Drewniana</h3>
              <p style={{ margin: 0, color: 'var(--c-text)', fontSize: '0.95rem' }}>Zasilacze hermetyczne Scharfer idealnie sprawdzają się w konstrukcjach drewnianych (wiaty, altany, pergole) ze względu na wysoką odporność na wilgoć, zabezpieczenia termiczne i pełną szczelność.</p>
            </div>
          </div>
          {/* App 6: Mosty */}
          <div className="app-card" style={{ borderRadius: '12px', overflow: 'hidden', boxShadow: 'var(--shadow-md)', transition: 'transform 0.3s ease' }}>
            <img src="/assets/app_mosty_1783188351515.png" alt="Zasilacz LED wodoszczelny" style={{ width: '100%', height: '250px', objectFit: 'cover', display: 'block' }} />
            <div className="app-content" style={{ padding: '1.5rem', background: 'var(--c-white)' }}>
              <h3 style={{ margin: '0 0 0.5rem', fontSize: '1.25rem' }}>Infrastruktura i Mosty</h3>
              <p style={{ margin: 0, color: 'var(--c-text)', fontSize: '0.95rem' }}>Zasilacz LED wodoszczelny i odporny na wibracje. Przemysłowe zasilanie oświetlenia konstrukcji stalowych i mostów.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
