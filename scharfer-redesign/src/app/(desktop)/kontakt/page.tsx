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
      q: t('faqQ1'),
      a: t('faqA1')
    },
    {
      q: t('faqQ2'),
      a: t('faqA2')
    },
    {
      q: t('faqQ3'),
      a: t('faqA3')
    },
    {
      q: t('faqQ4'),
      a: t('faqA4')
    },
    {
      q: t('faqQ5'),
      a: t('faqA5')
    },
    {
      q: t('faqQ6'),
      a: t('faqA6')
    }
  ];

  return (
    <div className="view-section active">
      {/* Unified Page Hero */}
      <div className="page-hero">
        <div className="page-hero-bg">
          <img src="/scharfer/assets/kontakt_hero.png" alt="Biuro dystrybutora Scharfer" />
        </div>
        <div className="page-hero-overlay" />
        <div className="page-hero-content">
          <h1 className="page-hero-title">{t('contactTitle')}</h1>
          <p className="page-hero-subtitle">
            Chcesz zostać naszym dystrybutorem? Masz pytania techniczne dotyczące zasilaczy LED? Napisz do nas, a nasz zespół ekspertów odpowie niezwłocznie.
          </p>
        </div>
      </div>

      {/* Expanded container to match header (1500px / var(--max-width)) */}
      <div className="container" style={{ maxWidth: 'var(--max-width)', margin: '0 auto', padding: '4rem var(--spacing-lg)' }}>
        <div className="contact-grid" style={{ display: 'flex', gap: '3rem', flexWrap: 'wrap' }}>
          
          <div className="contact-details" style={{ flex: 1, minWidth: '300px' }}>
            <div className="details-card" style={{ background: 'white', border: '1px solid var(--c-border)', borderRadius: '12px', padding: '2.5rem', boxShadow: 'var(--shadow-md)' }}>
              <h2 className="details-title" style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '10px', color: 'var(--c-heading)' }}>{t('officialDistributor')}</h2>
              <img src="/scharfer/PRESCOT_logo.png" alt="Prescot LED" style={{ height: '35px', marginBottom: '20px' }} />
              <div className="contact-line" style={{ marginBottom: '1.5rem' }}>
                <strong style={{ display: 'block', fontSize: '1rem', color: 'var(--c-heading)', marginBottom: '0.25rem' }}>{t('contactAbout')}</strong>
                <p style={{ fontSize: '1rem', fontWeight: 400, lineHeight: 1.5, color: 'var(--c-text)', margin: 0 }}>{t('contactAboutDesc')}</p>
              </div>
              <div className="contact-line">
                <strong style={{ display: 'block', fontSize: '1rem', color: 'var(--c-heading)', marginBottom: '0.25rem' }}>{t('contactData')}</strong>
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
              <h2 className="form-title" style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '1.5rem', color: 'var(--c-heading)' }}>{t('navContact')}</h2>
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
                <button type="submit" className="btn-primary" style={{ padding: '1rem', border: 'none', background: 'var(--c-red)', color: 'white', borderRadius: '6px', fontSize: '1rem', fontWeight: 600, cursor: 'pointer' }}>
                  {t('formSend')}
                </button>
              </form>
            </div>
          </div>

        </div>

        {/* FAQ Section */}
        <div className="faq-section section-padding bg-light" style={{ marginTop: '5rem', background: '#fafafa', borderRadius: '12px', padding: '3rem 2rem', border: '1px solid var(--c-border)' }}>
          <div className="text-center" style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <h2 className="section-title" style={{ fontSize: '2rem', color: 'var(--c-heading)', fontWeight: 800 }}>{t('faqSectionTitle')}</h2>
            <p className="section-subtitle" style={{ color: '#666' }}>{t('faqSectionDesc')}</p>
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
