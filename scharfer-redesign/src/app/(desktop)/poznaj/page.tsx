'use client';
import { useLanguage } from '@/context/LanguageContext';

export default function PoznajPage() {
  const { t } = useLanguage();

  return (
    <div className="view-section active">
      {/* Unified Page Hero */}
      <div className="page-hero">
        <div className="page-hero-bg">
          <img src="/assets/scharfer_hotel.png" alt="Scharfer w hotelach" />
        </div>
        <div className="page-hero-overlay" />
        <div className="page-hero-content">
          <h1 className="page-hero-title">Technologia bez kompromisów</h1>
          <p className="page-hero-subtitle">
            Odkryj innowacje i zabezpieczenia, które sprawiają, że zasilacze Scharfer są najczęstszym wyborem profesjonalistów w branży oświetleniowej i B2B.
          </p>
        </div>
      </div>

      {/* Main content area containing detailed advantages */}
      <div className="container section-padding" style={{ maxWidth: '1200px', margin: '0 auto', padding: '4rem 1.5rem' }}>
        {/* 7 lat, 100%, IP67 trust items in a beautiful horizontal container under the hero */}
        <div className="hero-trust" style={{ display: 'flex', gap: '3rem', justifyContent: 'center', marginBottom: '5rem', borderBottom: '1px solid var(--c-border)', paddingBottom: '3rem' }}>
          <div className="trust-item" style={{ textAlign: 'center' }}>
            <span className="trust-val" style={{ display: 'block', fontSize: '3rem', fontWeight: 800, color: 'var(--c-primary)', marginBottom: '0.5rem' }}>7</span>
            <span className="trust-lbl" style={{ fontSize: '0.9rem', color: 'var(--c-text)', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 600 }}>Lat Gwarancji</span>
          </div>
          <div className="trust-item" style={{ textAlign: 'center' }}>
            <span className="trust-val" style={{ display: 'block', fontSize: '3rem', fontWeight: 800, color: 'var(--c-primary)', marginBottom: '0.5rem' }}>IP67</span>
            <span className="trust-lbl" style={{ fontSize: '0.9rem', color: 'var(--c-text)', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 600 }}>Pełna Szczelność</span>
          </div>
          <div className="trust-item" style={{ textAlign: 'center' }}>
            <span className="trust-val" style={{ display: 'block', fontSize: '3rem', fontWeight: 800, color: 'var(--c-primary)', marginBottom: '0.5rem' }}>100%</span>
            <span className="trust-lbl" style={{ fontSize: '0.9rem', color: 'var(--c-text)', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 600 }}>Praca pod obciążeniem</span>
          </div>
        </div>

        <h2 style={{ fontSize: '2.2rem', color: 'var(--c-heading)', marginBottom: '3rem', fontWeight: 800, textAlign: 'center', fontFamily: 'Outfit, sans-serif' }}>
          Dlaczego warto wybrać zasilacze Scharfer?
        </h2>

        <div className="b2b-story-section" style={{ padding: 0 }}>
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

          {/* Row 6: Konstruknia Termiczna */}
          <div className="b2b-story-row">
            <div className="b2b-story-text">
              <h2>Aluminium i Żywica Epoksydowa</h2>
              <p>Trwałość zasilacza 12V / 24V zależy od efektywnego odprowadzania ciepła. Zasilacze Scharfer zamknięte są w masywnej, aluminiowej obudowie, która pełni rolę radiatora.</p>
              <p>Wnętrze urządzenia jest w 100% zalane specjalistyczną żywicą przewodzącą ciepło. Eliminuje to puste przestrzenie izolacyjne, zapobiega wibracjom cewek i gwarantuje utrzymanie stabilnej temperatury pracy nawet przy maksymalnym obciążeniu. Każda jednostka przechodzi również rygorystyczne testy <strong>Burn-in</strong> przed opuszczeniem fabryki.</p>
            </div>
            <div className="b2b-story-img">
              <img src="/assets/sch3.webp" alt="Aluminiowa obudowa i odprowadzanie ciepła" style={{ borderRadius: '8px' }} />
            </div>
          </div>
        </div>

        {/* B2B Partnership Value Props */}
        <div className="partnership-section" style={{ display: 'flex', gap: '3rem', flexWrap: 'wrap', marginTop: '6rem', alignItems: 'center' }}>
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
    </div>
  );
}
