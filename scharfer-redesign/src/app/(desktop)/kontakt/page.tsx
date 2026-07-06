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
  ];

  return (
    <div className="view-section active">
      {/* Unified Page Hero */}
      <div className="page-hero">
        <div className="page-hero-bg">
          <img src="/assets/kontakt_hero.png" alt="Biuro dystrybutora Scharfer" />
        </div>
        <div className="page-hero-overlay" />
        <div className="page-hero-content">
          <h1 className="page-hero-title">{t('contactTitle')}</h1>
          <p className="page-hero-subtitle">
            {t('contactHeroSubtitle')}
          </p>
        </div>
      </div>

      {/* Expanded container to match header (1500px / var(--max-width)) */}
      <div className="container" style={{ maxWidth: 'var(--max-width)', margin: '0 auto', padding: '4rem var(--spacing-lg)' }}>
        <div className="contact-grid" style={{ display: 'flex', gap: '3rem', flexWrap: 'wrap', justifyContent: 'center' }}>
          
          <div className="contact-form-container" style={{ flex: 1, minWidth: '350px', maxWidth: '800px' }}>
            <div className="form-card" style={{ background: 'var(--card-bg)', border: '1px solid var(--c-border)', borderRadius: '12px', padding: '2.5rem', boxShadow: 'var(--shadow-md)' }}>
              <h2 className="form-title" style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '1.5rem', color: 'var(--c-heading)' }}>{t('contactTitle')}</h2>
              <form onSubmit={(e) => { e.preventDefault(); alert(t('contactSuccess')); }} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
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
                  <input type="checkbox" id="rodo" required style={{ marginTop: '0.3rem' }} />
                  <label htmlFor="rodo" style={{ fontSize: '0.85rem', color: 'var(--c-text)', lineHeight: 1.5 }}>{t('formGdpr')}</label>
                </div>
                <button type="submit" className="btn-primary" style={{ padding: '1rem', borderRadius: '8px', fontWeight: 700, fontSize: '1.05rem', marginTop: '0.5rem', border: 'none', cursor: 'pointer', background: 'var(--c-red)', color: 'white' }}>{t('formSend')}</button>
              </form>
            </div>
          </div>

        </div>

        {/* FAQ Section */}
        <div className="faq-section section-padding bg-light" style={{ marginTop: '5rem', background: 'var(--card-bg)', borderRadius: '12px', padding: '3rem 2rem', border: '1px solid var(--c-border)' }}>
          <div className="text-center" style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <h2 className="section-title" style={{ fontSize: '2rem', color: 'var(--c-heading)', fontWeight: 800 }}>{t('faqSectionTitle')}</h2>
            <p className="section-subtitle" style={{ color: 'var(--c-text)' }}>{t('faqSectionDesc')}</p>
          </div>
          <div className="faq-accordion" style={{ maxWidth: '900px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {faqItems.map((item, idx) => (
              <div key={idx} className={`faq-item ${activeFaq === idx ? 'active' : ''}`} style={{ background: 'var(--card-bg)', border: '1px solid var(--c-border)', borderRadius: '8px', overflow: 'hidden' }}>
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
