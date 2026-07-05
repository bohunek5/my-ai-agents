'use client';
import { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';

export default function KontaktPage() {
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
      {/* Kontakt Hero with generated neutral background image and white overlay */}
      <div className="kontakt-hero" style={{ position: 'relative', overflow: 'hidden', padding: '6rem 2rem', borderBottom: '1px solid var(--c-border)' }}>
        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: -1 }}>
          <img src="/assets/kontakt_hero.png" alt="Biuro dystrybutora Scharfer" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(255, 255, 255, 0.85)' }} />
        </div>
        <div className="container" style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', alignItems: 'center', gap: '4rem', flexWrap: 'wrap' }}>
          <div style={{ flex: 1.2, minWidth: '300px', position: 'relative', zIndex: 2 }}>
            <h1 style={{ fontSize: '3.5rem', color: 'var(--c-heading)', marginBottom: '1.5rem', lineHeight: '1.1', fontWeight: 800, fontFamily: 'Outfit, sans-serif' }}>
              Skontaktuj się z nami
            </h1>
            <p style={{ fontSize: '1.25rem', color: 'var(--c-text)', lineHeight: 1.6 }}>
              Chcesz zostać naszym dystrybutorem? Masz pytania techniczne dotyczące zasilaczy LED? Napisz do nas, a nasz zespół ekspertów odpowie niezwłocznie.
            </p>
          </div>
          <div style={{ flex: 0.8, minWidth: '300px', position: 'relative', zIndex: 2, textAlign: 'center' }}>
            <img src="/assets/kontakt_hero.png" alt="Kontakt B2B" style={{ maxWidth: '100%', borderRadius: '12px', boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }} />
          </div>
        </div>
      </div>

      <div className="container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '4rem 1.5rem' }}>
        <div className="contact-grid" style={{ display: 'flex', gap: '3rem', flexWrap: 'wrap' }}>
          
          <div className="contact-details" style={{ flex: 1, minWidth: '300px' }}>
            <div className="details-card" style={{ background: 'white', border: '1px solid var(--c-border)', borderRadius: '12px', padding: '2.5rem', boxShadow: 'var(--shadow-md)' }}>
              <h2 className="details-title" style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '10px', color: 'var(--c-heading)' }}>Oficjalny Dystrybutor</h2>
              <img src="/PRESCOT_logo.png" alt="Prescot LED" style={{ height: '35px', marginBottom: '20px' }} />
              <div className="contact-line" style={{ marginBottom: '1.5rem' }}>
                <strong style={{ display: 'block', fontSize: '1rem', color: 'var(--c-heading)', marginBottom: '0.25rem' }}>O nas:</strong>
                <p style={{ fontSize: '1rem', fontWeight: 400, lineHeight: 1.5, color: 'var(--c-text)', margin: 0 }}>Jesteśmy autoryzowanym przedstawicielem Scharfer. Oferujemy pełne wsparcie B2B oraz atrakcyjne rabaty hurtowe.</p>
              </div>
              <div className="contact-line">
                <strong style={{ display: 'block', fontSize: '1rem', color: 'var(--c-heading)', marginBottom: '0.25rem' }}>Dane kontaktowe:</strong>
                <div style={{ fontSize: '1rem', color: 'var(--c-heading)', fontWeight: 500, lineHeight: 1.6 }}>
                  <strong>PRESCOT SP. Z O.O.</strong><br />
                  ul. Wileńska 1, 11-500 Giżycko<br />
                  NIP: 8451939947<br />
                  Tel.: +48 87 777 64 82
                </div>
              </div>
            </div>
          </div>

          <div className="contact-form-container" style={{ flex: 1.5, minWidth: '350px' }}>
            <div className="form-card" style={{ background: 'white', border: '1px solid var(--c-border)', borderRadius: '12px', padding: '2.5rem', boxShadow: 'var(--shadow-md)' }}>
              <h2 className="form-title" style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '1.5rem', color: 'var(--c-heading)' }}>Kontakt B2B</h2>
              <form onSubmit={(e) => { e.preventDefault(); alert('Formularz został wysłany. Skontaktujemy się z Tobą w ciągu 24h.'); }} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                <div className="form-group" style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                  <label htmlFor="name" style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--c-heading)' }}>{t('formName')}</label>
                  <input type="text" id="name" required style={{ padding: '0.8rem', border: '1px solid var(--c-border)', borderRadius: '6px', fontSize: '0.95rem' }} />
                </div>
                <div className="form-group" style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                  <label htmlFor="email" style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--c-heading)' }}>{t('formEmail')}</label>
                  <input type="email" id="email" required style={{ padding: '0.8rem', border: '1px solid var(--c-border)', borderRadius: '6px', fontSize: '0.95rem' }} />
                </div>
                <div className="form-group" style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                  <label htmlFor="message" style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--c-heading)' }}>{t('formMsg')}</label>
                  <textarea id="message" rows={5} required style={{ padding: '0.8rem', border: '1px solid var(--c-border)', borderRadius: '6px', fontSize: '0.95rem', resize: 'vertical' }}></textarea>
                </div>
                <div className="form-checkbox" style={{ display: 'flex', gap: '0.5rem', alignItems: 'flex-start' }}>
                  <input type="checkbox" id="gdpr" required style={{ marginTop: '0.2rem' }} />
                  <label htmlFor="gdpr" style={{ fontSize: '0.8rem', color: '#666', lineHeight: 1.4 }}>{t('formGdpr')}</label>
                </div>
                <button type="submit" className="btn-primary" style={{ padding: '1rem', border: 'none', background: 'var(--c-primary)', color: 'white', borderRadius: '6px', fontSize: '1rem', fontWeight: 600, cursor: 'pointer' }}>
                  {t('formSend')}
                </button>
              </form>
            </div>
          </div>

        </div>

        {/* FAQ Section */}
        <div className="faq-section section-padding bg-light" style={{ marginTop: '5rem', background: '#fafafa', borderRadius: '12px', padding: '3rem 2rem', border: '1px solid var(--c-border)' }}>
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
                  <span className="faq-icon" style={{ fontSize: '1.3rem', color: 'var(--c-primary)' }}>
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
