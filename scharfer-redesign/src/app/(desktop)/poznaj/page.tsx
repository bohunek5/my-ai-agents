'use client';
import { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import InteractiveDiagram from '@/components/InteractiveDiagram';

export default function PoznajPage() {
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
          <img src="/assets/scharfer_estate_night.png" alt="Scharfer oświetlenie osiedla" />
        </div>
        <div className="page-hero-overlay" />
        <div className="page-hero-content">
          <h1 className="page-hero-title">{t('diagramTitle')}</h1>
          <p className="page-hero-subtitle">
            {t('techDesc')}
          </p>
        </div>
      </div>

      {/* Expanded container (1500px) */}
      <div className="container section-padding" style={{ maxWidth: 'var(--max-width)', margin: '0 auto', padding: '4rem var(--spacing-lg) 0 var(--spacing-lg)' }}>
        
        {/* Interactive diagram representing why Scharfer */}
        <div style={{ marginBottom: '4rem' }}>
          <div className="text-center" style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <h2 style={{ fontSize: '2.2rem', color: 'var(--c-heading)', fontWeight: 800, fontFamily: 'Outfit, sans-serif' }}>
              {t('diagramTitle') || "Budowa i innowacje Scharfer"}
            </h2>
            <p style={{ fontSize: '1.1rem', color: '#666', maxWidth: '700px', margin: '0.5rem auto 0' }}>
              {t('diagramSubtitle') || "Najedź na poszczególne elementy zasilacza, aby poznać jego unikalne parametry techniczne i przewagi."}
            </p>
          </div>
          <InteractiveDiagram />
        </div>

        {/* 7 lat, 100%, IP67 trust items */}
        <div className="hero-trust" style={{ display: 'flex', gap: '3rem', justifyContent: 'center', marginBottom: '5rem', borderBottom: '1px solid var(--c-border)', paddingBottom: '3rem' }}>
          <div className="trust-item" style={{ textAlign: 'center' }}>
            <span className="trust-val" style={{ display: 'block', fontSize: '3rem', fontWeight: 800, color: 'var(--c-red)', marginBottom: '0.5rem' }}>{t('trust7Years')}</span>
            <span className="trust-lbl" style={{ fontSize: '0.9rem', color: 'var(--c-text)', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 600 }}>{t('trustWarranty')}</span>
          </div>
          <div className="trust-item" style={{ textAlign: 'center' }}>
            <span className="trust-val" style={{ display: 'block', fontSize: '3rem', fontWeight: 800, color: 'var(--c-red)', marginBottom: '0.5rem' }}>{t('trustIP67')}</span>
            <span className="trust-lbl" style={{ fontSize: '0.9rem', color: 'var(--c-text)', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 600 }}>{t('trustTightnessFull')}</span>
          </div>
          <div className="trust-item" style={{ textAlign: 'center' }}>
            <span className="trust-val" style={{ display: 'block', fontSize: '3rem', fontWeight: 800, color: 'var(--c-red)', marginBottom: '0.5rem' }}>{t('trust100')}</span>
            <span className="trust-lbl" style={{ fontSize: '0.9rem', color: 'var(--c-text)', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 600 }}>{t('trustLoadFull')}</span>
          </div>
        </div>

        <h2 style={{ fontSize: '2.2rem', color: 'var(--c-heading)', marginBottom: '3rem', fontWeight: 800, textAlign: 'center', fontFamily: 'Outfit, sans-serif' }}>
          {t('detailedTech')}
        </h2>

        <div className="b2b-story-section" style={{ padding: 0 }}>
          {/* Row 1: Gwarancja */}
          <div className="b2b-story-row">
            <div className="b2b-story-text">
              <h2>{t('story1Title')}</h2>
              <p>{t('story1P1')}</p>
              <p>{t('story1P2')}</p>
            </div>
            <div className="b2b-story-img">
              <img src="/assets/sch1.webp" alt="7 lat gwarancji Scharfer" style={{ borderRadius: '8px' }} />
            </div>
          </div>

          {/* Row 2: IP67 */}
          <div className="b2b-story-row">
            <div className="b2b-story-text">
              <h2>{t('story2Title')}</h2>
              <p>{t('story2P1')}</p>
              <p>{t('story2P2')}</p>
            </div>
            <div className="b2b-story-img">
              <img src="/assets/sch2.webp" alt="Wodoodporność IP67" style={{ borderRadius: '8px' }} />
            </div>
          </div>

          {/* Row 3: Konstrukcja Termiczna */}
          <div className="b2b-story-row">
            <div className="b2b-story-text">
              <h2>{t('story6Title')}</h2>
              <p>{t('story6P1')}</p>
              <p dangerouslySetInnerHTML={{ __html: t('story6P2') }} />
            </div>
            <div className="b2b-story-img">
              <img src="/assets/sch3.webp" alt="Aluminiowa obudowa i odprowadzanie ciepła" style={{ borderRadius: '8px' }} />
            </div>
          </div>

          {/* Row 4: 100% Obciążenia */}
          <div className="b2b-story-row">
            <div className="b2b-story-text">
              <h2>{t('story3Title')}</h2>
              <p>{t('story3P1')}</p>
              <p>{t('story3P2')}</p>
            </div>
            <div className="b2b-story-img">
              <img src="/assets/sch4.webp" alt="100% obciążenia" style={{ borderRadius: '8px' }} />
            </div>
          </div>

          {/* Row 5: Zaawansowane Zabezpieczenia */}
          <div className="b2b-story-row">
            <div className="b2b-story-text">
              <h2>{t('story5Title')}</h2>
              <p>{t('story5P1')}</p>
              <ul style={{ listStyleType: 'none', padding: 0, marginTop: '1rem' }}>
                <li style={{ marginBottom: '0.5rem' }} dangerouslySetInnerHTML={{ __html: t('story5L1') }} />
                <li style={{ marginBottom: '0.5rem' }} dangerouslySetInnerHTML={{ __html: t('story5L2') }} />
                <li style={{ marginBottom: '0.5rem' }} dangerouslySetInnerHTML={{ __html: t('story5L3') }} />
                <li dangerouslySetInnerHTML={{ __html: t('story5L4') }} />
              </ul>
            </div>
            <div className="b2b-story-img">
              <img src="/assets/40012.png" alt="Zasilacz 12V 400W Scharfer" style={{ borderRadius: '8px' }} />
            </div>
          </div>
          
          {/* Row 6: Zgodność i Bezpieczeństwo */}
          <div className="b2b-story-row">
            <div className="b2b-story-text">
              <h2>{t('story4Title')}</h2>
              <p dangerouslySetInnerHTML={{ __html: t('story4P1') }} />
              <p>{t('story4P2')}</p>
            </div>
            <div className="b2b-story-img" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
              <img src="/assets/ce_rohs.png" alt="Certyfikaty CE i RoHS" style={{ width: 'auto', maxWidth: '100%', maxHeight: '180px', objectFit: 'contain', mixBlendMode: 'multiply', boxShadow: 'none', borderRadius: 0 }} />
            </div>
          </div>
        </div>

        {/* Applications Section (4 4 4 Uklad) */}
        <div className="applications-section" style={{ margin: '6rem auto 0 auto', padding: '0', borderTop: '1px solid var(--c-border)', paddingTop: '4rem' }}>
          <div className="section-header text-center" style={{ marginBottom: '3rem', textAlign: 'center' }}>
            <h2 style={{ fontSize: '2.2rem', color: 'var(--c-heading)', fontWeight: 800, fontFamily: 'Outfit, sans-serif' }}>{t('appTitle')}</h2>
            <p style={{ fontSize: '1.1rem', color: 'var(--c-text)', maxWidth: '700px', margin: '0.5rem auto 0' }}>
              {t('appSubtitle')}
            </p>
          </div>
          
          <div className="app-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.5rem' }}>
            {/* App 1: Domy */}
            <div className="app-card" style={{ borderRadius: '12px', overflow: 'hidden', boxShadow: 'var(--shadow-md)', transition: 'transform 0.3s ease' }}>
              <img src="/assets/app_domy_1783188239361.png" alt="Zasilacz LED zewnętrzny do domu" style={{ width: '100%', height: '200px', objectFit: 'cover', display: 'block' }} />
              <div className="app-content" style={{ padding: '1.5rem', background: 'var(--c-white)' }}>
                <h3 style={{ margin: '0 0 0.5rem', fontSize: '1.2rem', fontWeight: 700 }}>{t('app1Title')}</h3>
                <p style={{ margin: 0, color: 'var(--c-text)', fontSize: '0.9rem', lineHeight: 1.5 }}>{t('app1Desc')}</p>
              </div>
            </div>
            {/* App 2: Bloki mieszkalne */}
            <div className="app-card" style={{ borderRadius: '12px', overflow: 'hidden', boxShadow: 'var(--shadow-md)', transition: 'transform 0.3s ease' }}>
              <img src="/assets/app_bloki_1783188247720.png" alt="Wodoodporny zasilacz do taśm LED" style={{ width: '100%', height: '200px', objectFit: 'cover', display: 'block' }} />
              <div className="app-content" style={{ padding: '1.5rem', background: 'var(--c-white)' }}>
                <h3 style={{ margin: '0 0 0.5rem', fontSize: '1.2rem', fontWeight: 700 }}>{t('app2Title')}</h3>
                <p style={{ margin: 0, color: 'var(--c-text)', fontSize: '0.9rem', lineHeight: 1.5 }}>{t('app2Desc')}</p>
              </div>
            </div>
            {/* App 3: Hale */}
            <div className="app-card" style={{ borderRadius: '12px', overflow: 'hidden', boxShadow: 'var(--shadow-md)', transition: 'transform 0.3s ease' }}>
              <img src="/assets/app_hale_v2_1783188623293.png" alt="Zasilacze przemysłowe LED 24V" style={{ width: '100%', height: '200px', objectFit: 'cover', display: 'block' }} />
              <div className="app-content" style={{ padding: '1.5rem', background: 'var(--c-white)' }}>
                <h3 style={{ margin: '0 0 0.5rem', fontSize: '1.2rem', fontWeight: 700 }}>{t('app3Title')}</h3>
                <p style={{ margin: 0, color: 'var(--c-text)', fontSize: '0.9rem', lineHeight: 1.5 }}>{t('app3Desc')}</p>
              </div>
            </div>
            {/* App 4: Obiekty sportowe */}
            <div className="app-card" style={{ borderRadius: '12px', overflow: 'hidden', boxShadow: 'var(--shadow-md)', transition: 'transform 0.3s ease' }}>
              <img src="/assets/app_sport_v2_1783188631467.png" alt="Zasilacze LED 12V i 24V dużej mocy" style={{ width: '100%', height: '200px', objectFit: 'cover', display: 'block' }} />
              <div className="app-content" style={{ padding: '1.5rem', background: 'var(--c-white)' }}>
                <h3 style={{ margin: '0 0 0.5rem', fontSize: '1.2rem', fontWeight: 700 }}>{t('app4Title')}</h3>
                <p style={{ margin: 0, color: 'var(--c-text)', fontSize: '0.9rem', lineHeight: 1.5 }}>{t('app4Desc')}</p>
              </div>
            </div>
            
            {/* App 5: Ogrody i parki */}
            <div className="app-card" style={{ borderRadius: '12px', overflow: 'hidden', boxShadow: 'var(--shadow-md)', transition: 'transform 0.3s ease' }}>
              <img src="/assets/app_ogrod_v2_1783188615253.png" alt="Zasilacz LED hermetyczny IP67" style={{ width: '100%', height: '200px', objectFit: 'cover', display: 'block' }} />
              <div className="app-content" style={{ padding: '1.5rem', background: 'var(--c-white)' }}>
                <h3 style={{ margin: '0 0 0.5rem', fontSize: '1.2rem', fontWeight: 700 }}>{t('app5Title')}</h3>
                <p style={{ margin: 0, color: 'var(--c-text)', fontSize: '0.9rem', lineHeight: 1.5 }}>{t('app5Desc')}</p>
              </div>
            </div>
            {/* App 6: Hotele */}
            <div className="app-card" style={{ borderRadius: '12px', overflow: 'hidden', boxShadow: 'var(--shadow-md)', transition: 'transform 0.3s ease' }}>
              <img src="/assets/app_hotel_1783188309904.png" alt="Zasilacze do taśm LED ze ściemniaczem" style={{ width: '100%', height: '200px', objectFit: 'cover', display: 'block' }} />
              <div className="app-content" style={{ padding: '1.5rem', background: 'var(--c-white)' }}>
                <h3 style={{ margin: '0 0 0.5rem', fontSize: '1.2rem', fontWeight: 700 }}>{t('app6Title')}</h3>
                <p style={{ margin: 0, color: 'var(--c-text)', fontSize: '0.9rem', lineHeight: 1.5 }}>{t('app6Desc')}</p>
              </div>
            </div>
            {/* App 7: Kina */}
            <div className="app-card" style={{ borderRadius: '12px', overflow: 'hidden', boxShadow: 'var(--shadow-md)', transition: 'transform 0.3s ease' }}>
              <img src="/assets/app_kina_v2_1783188608035.png" alt="Zasilacze LED 12V do pasków" style={{ width: '100%', height: '200px', objectFit: 'cover', display: 'block' }} />
              <div className="app-content" style={{ padding: '1.5rem', background: 'var(--c-white)' }}>
                <h3 style={{ margin: '0 0 0.5rem', fontSize: '1.2rem', fontWeight: 700 }}>{t('app7Title')}</h3>
                <p style={{ margin: 0, color: 'var(--c-text)', fontSize: '0.9rem', lineHeight: 1.5 }}>{t('app7Desc')}</p>
              </div>
            </div>
            {/* App 8: Szkoły */}
            <div className="app-card" style={{ borderRadius: '12px', overflow: 'hidden', boxShadow: 'var(--shadow-md)', transition: 'transform 0.3s ease' }}>
              <img src="/assets/app_szkoly_1783188326372.png" alt="Zasilacze do opraw LED" style={{ width: '100%', height: '200px', objectFit: 'cover', display: 'block' }} />
              <div className="app-content" style={{ padding: '1.5rem', background: 'var(--c-white)' }}>
                <h3 style={{ margin: '0 0 0.5rem', fontSize: '1.2rem', fontWeight: 700 }}>{t('app8Title')}</h3>
                <p style={{ margin: 0, color: 'var(--c-text)', fontSize: '0.9rem', lineHeight: 1.5 }}>{t('app8Desc')}</p>
              </div>
            </div>
            
            {/* App 9: Parkingi */}
            <div className="app-card" style={{ borderRadius: '12px', overflow: 'hidden', boxShadow: 'var(--shadow-md)', transition: 'transform 0.3s ease' }}>
              <img src="/assets/app_parkingi_v2_1783188598862.png" alt="Zasilacze LED zewnętrzne" style={{ width: '100%', height: '200px', objectFit: 'cover', display: 'block' }} />
              <div className="app-content" style={{ padding: '1.5rem', background: 'var(--c-white)' }}>
                <h3 style={{ margin: '0 0 0.5rem', fontSize: '1.2rem', fontWeight: 700 }}>{t('app9Title')}</h3>
                <p style={{ margin: 0, color: 'var(--c-text)', fontSize: '0.9rem', lineHeight: 1.5 }}>{t('app9Desc')}</p>
              </div>
            </div>
            {/* App 10: Garaże */}
            <div className="app-card" style={{ borderRadius: '12px', overflow: 'hidden', boxShadow: 'var(--shadow-md)', transition: 'transform 0.3s ease' }}>
              <img src="/assets/app_garaze_1783188344306.png" alt="Mocne zasilacze do taśm LED 24V" style={{ width: '100%', height: '200px', objectFit: 'cover', display: 'block' }} />
              <div className="app-content" style={{ padding: '1.5rem', background: 'var(--c-white)' }}>
                <h3 style={{ margin: '0 0 0.5rem', fontSize: '1.2rem', fontWeight: 700 }}>{t('app10Title')}</h3>
                <p style={{ margin: 0, color: 'var(--c-text)', fontSize: '0.9rem', lineHeight: 1.5 }}>{t('app10Desc')}</p>
              </div>
            </div>
            {/* App 11: Wiaty i Stolarka */}
            <div className="app-card" style={{ borderRadius: '12px', overflow: 'hidden', boxShadow: 'var(--shadow-md)', transition: 'transform 0.3s ease' }}>
              <img src="/wiata_jezioro.png" alt="Oświetlenie wiat i drewnianej stolarki" style={{ width: '100%', height: '200px', objectFit: 'cover', display: 'block' }} />
              <div className="app-content" style={{ padding: '1.5rem', background: 'var(--c-white)' }}>
                <h3 style={{ margin: '0 0 0.5rem', fontSize: '1.2rem', fontWeight: 700 }}>{t('app11Title')}</h3>
                <p style={{ margin: 0, color: 'var(--c-text)', fontSize: '0.9rem', lineHeight: 1.5 }}>{t('app11Desc')}</p>
              </div>
            </div>
            {/* App 12: Mosty */}
            <div className="app-card" style={{ borderRadius: '12px', overflow: 'hidden', boxShadow: 'var(--shadow-md)', transition: 'transform 0.3s ease' }}>
              <img src="/assets/app_mosty_1783188351515.png" alt="Zasilacz LED wodoszczelny" style={{ width: '100%', height: '200px', objectFit: 'cover', display: 'block' }} />
              <div className="app-content" style={{ padding: '1.5rem', background: 'var(--c-white)' }}>
                <h3 style={{ margin: '0 0 0.5rem', fontSize: '1.2rem', fontWeight: 700 }}>{t('app12Title')}</h3>
                <p style={{ margin: 0, color: 'var(--c-text)', fontSize: '0.9rem', lineHeight: 1.5 }}>{t('app12Desc')}</p>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="faq-section section-padding bg-light" style={{ marginTop: '6rem', background: '#fafafa', borderRadius: '12px', padding: '3rem 2rem', border: '1px solid var(--c-border)' }}>
          <div className="text-center" style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <h2 className="section-title" style={{ fontSize: '2rem', color: 'var(--c-heading)', fontWeight: 800 }}>{t('faqTitle')}</h2>
            <p className="section-subtitle" style={{ color: '#666' }}>{t('faqSubtitle')}</p>
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
