'use client';
import { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';

export default function PoznajPage() {
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

      {/* Expanded container to match header (1500px / var(--max-width)) */}
      <div className="container section-padding" style={{ maxWidth: 'var(--max-width)', margin: '0 auto', padding: '4rem var(--spacing-lg)' }}>
        {/* 7 lat, 100%, IP67 trust items in a beautiful horizontal container under the hero */}
        <div className="hero-trust" style={{ display: 'flex', gap: '3rem', justifyContent: 'center', marginBottom: '5rem', borderBottom: '1px solid var(--c-border)', paddingBottom: '3rem' }}>
          <div className="trust-item" style={{ textAlign: 'center' }}>
            <span className="trust-val" style={{ display: 'block', fontSize: '3rem', fontWeight: 800, color: 'var(--c-red)', marginBottom: '0.5rem' }}>7</span>
            <span className="trust-lbl" style={{ fontSize: '0.9rem', color: 'var(--c-text)', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 600 }}>Lat Gwarancji</span>
          </div>
          <div className="trust-item" style={{ textAlign: 'center' }}>
            <span className="trust-val" style={{ display: 'block', fontSize: '3rem', fontWeight: 800, color: 'var(--c-red)', marginBottom: '0.5rem' }}>IP67</span>
            <span className="trust-lbl" style={{ fontSize: '0.9rem', color: 'var(--c-text)', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 600 }}>Pełna Szczelność</span>
          </div>
          <div className="trust-item" style={{ textAlign: 'center' }}>
            <span className="trust-val" style={{ display: 'block', fontSize: '3rem', fontWeight: 800, color: 'var(--c-red)', marginBottom: '0.5rem' }}>100%</span>
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

          {/* Row 6: Konstrukcja Termiczna */}
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

        {/* FAQ Section (Replacing Wspolpraca/B2B section) */}
        <div className="faq-section section-padding bg-light" style={{ marginTop: '6rem', background: '#fafafa', borderRadius: '12px', padding: '3rem 2rem', border: '1px solid var(--c-border)' }}>
          <div className="text-center" style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <h2 className="section-title" style={{ fontSize: '2rem', color: 'var(--c-heading)', fontWeight: 800 }}>Często zadawane pytania (FAQ)</h2>
            <p className="section-subtitle" style={{ color: '#666' }}>Wszystko, co musisz wiedzieć o zasilaczach LED Scharfer</p>
          </div>
          <div className="faq-accordion" style={{ maxWidth: '900px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
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
