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
          
          <div className="contact-info-card" style={{ flex: '1 1 400px', maxWidth: '600px', background: 'var(--card-bg)', borderRadius: '16px', overflow: 'hidden', border: '1px solid var(--c-border)', boxShadow: '0 4px 20px rgba(0,0,0,0.06)' }}>
            <div style={{ padding: '2.5rem', textAlign: 'center' }}>
              <span style={{ display: 'inline-block', fontSize: '0.8rem', background: 'var(--c-light-gray)', color: 'var(--c-heading)', border: '1px solid var(--c-border)', fontWeight: 800, padding: '4px 10px', borderRadius: '4px', textTransform: 'uppercase', marginBottom: '1.5rem', letterSpacing: '0.5px' }}>
                {t('officialDistributor')}
              </span>
              
              <div style={{ marginBottom: '1.5rem' }}>
                <img src="/PRESCOT_logo.png" alt="Prescot LED" style={{ height: '26px', display: 'block', margin: '0 auto' }} />
              </div>
              
              <h2 style={{ fontSize: '1.5rem', fontWeight: 800, margin: '0 0 0.5rem 0', color: 'var(--c-heading)' }}>
                PRESCOT SP. Z O.O.
              </h2>
              
              <p style={{ fontSize: '1rem', color: 'var(--c-text)', margin: '0 0 2rem 0', lineHeight: 1.5 }}>
                ul. Wileńska 1, 11-500 Giżycko<br />
                NIP: 8451939947
              </p>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2.5rem' }}>
                <a href="tel:+48877776482" style={{ background: 'var(--background)', color: 'var(--c-heading)', padding: '15px', borderRadius: '8px', fontSize: '1rem', fontWeight: 700, textDecoration: 'none', border: '1px solid var(--c-border)', transition: 'all 0.2s', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
                  <span style={{ fontSize: '1.2rem' }}>📞</span> +48 87 777 64 82
                </a>
                <a href="mailto:komponenty@prescot.pl" style={{ background: 'var(--background)', color: 'var(--c-heading)', padding: '15px', borderRadius: '8px', fontSize: '1rem', fontWeight: 700, textDecoration: 'none', border: '1px solid var(--c-border)', transition: 'all 0.2s', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
                  <span style={{ fontSize: '1.2rem' }}>✉️</span> komponenty@prescot.pl
                </a>
              </div>
            </div>
            
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2348.694662867049!2d21.758713212876618!3d54.03362147230008!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x46e1a49db25492d5%3A0xe97ab425264b3df3!2sWile%C5%84ska%201%2C%2011-500%20Gi%C5%BCycko!5e0!3m2!1spl!2spl!4v1700000000000!5m2!1spl!2spl" 
              width="100%" 
              height="300" 
              style={{ border: 0, display: 'block', borderTop: '1px solid var(--c-border)' }} 
              allowFullScreen 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade" 
              title="Mapa dojazdu do Prescot"
            />
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
                  <div className="faq-answer" style={{ padding: '1.2rem 1.5rem 1.5rem', borderTop: '1px solid var(--c-border)', color: 'var(--c-text)', fontSize: '0.95rem', lineHeight: 1.6 }}>
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
