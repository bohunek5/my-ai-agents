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
              <span style={{ color: 'var(--c-red)' }}>{t('heroWarranty')}</span><br/>
              {t('heroPower')}<br/>
              {t('heroReal')}<span style={{ color: 'var(--c-red)' }}>{t('hero100')}</span>{t('heroLoad')}
            </h1>
            <p className="hero-subtitle" style={{ fontWeight: 800, color: 'var(--c-heading)' }}>
              {t('heroSubtitlePc')}
            </p>
            <div className="hero-actions">
              <Link href="/oferta" className="btn-primary large" style={{ textDecoration: 'none', display: 'inline-block' }}>
                {t('exploreOffer')}
              </Link>
              <Link href="/kontakt" className="btn-secondary large" style={{ textDecoration: 'none', display: 'inline-block' }}>
                {t('b2bCoop')}
              </Link>
            </div>
            <div className="hero-trust" style={{ display: 'flex', gap: '3rem', marginTop: '1.5rem', flexWrap: 'wrap' }}>
              <div className="trust-item" style={{ display: 'flex', flexDirection: 'column' }}>
                <span className="trust-val" style={{ color: 'var(--c-red)', fontSize: '2rem', fontWeight: 900, lineHeight: 1 }}>{t('trust7Years')}</span>
                <span className="trust-lbl" style={{ color: '#1e293b', fontSize: '0.8rem', fontWeight: 800, textTransform: 'uppercase', marginTop: '8px', letterSpacing: '1px' }}>{t('trustWarranty')}</span>
              </div>
              <div className="trust-item" style={{ display: 'flex', flexDirection: 'column' }}>
                <span className="trust-val" style={{ color: 'var(--c-red)', fontSize: '2rem', fontWeight: 900, lineHeight: 1 }}>{t('trustIP67')}</span>
                <span className="trust-lbl" style={{ color: '#1e293b', fontSize: '0.8rem', fontWeight: 800, textTransform: 'uppercase', marginTop: '8px', letterSpacing: '1px' }}>{t('trustTightnessFull')}</span>
              </div>
              <div className="trust-item" style={{ display: 'flex', flexDirection: 'column' }}>
                <span className="trust-val" style={{ color: 'var(--c-red)', fontSize: '2rem', fontWeight: 900, lineHeight: 1 }}>{t('trust100')}</span>
                <span className="trust-lbl" style={{ color: '#1e293b', fontSize: '0.8rem', fontWeight: 800, textTransform: 'uppercase', marginTop: '8px', letterSpacing: '1px' }}>{t('trustLoadFull')}</span>
              </div>
            </div>

            {/* Scroll down indicator arrow for PC */}
            <div style={{ marginTop: '40px', display: 'flex', justifyContent: 'center', cursor: 'pointer' }} onClick={() => document.getElementById('technologie')?.scrollIntoView({ behavior: 'smooth' })}>
              <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="#e60000" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.2))', animation: 'bounce 2s infinite' }}>
                <path d="M12 5v14M19 12l-7 7-7-7" />
              </svg>
            </div>

          </div>
        </div>
      </div>

      {/* Technology Intro Block */}
      <div id="technologie" className="poznaj-hero" style={{ background: 'linear-gradient(135deg, var(--c-white) 0%, #eef2f6 100%)', padding: '6rem 2rem', textAlign: 'center', borderBottom: '1px solid var(--c-border)' }}>
        <div className="container" style={{ maxWidth: 'var(--max-width)', margin: '0 auto' }}>
          <h2 style={{ fontSize: '3rem', color: 'var(--c-heading)', marginBottom: '1rem', fontWeight: 800, fontFamily: 'Outfit, sans-serif' }}>
            {t('techNoComp')}
          </h2>
          <p style={{ fontSize: '1.25rem', color: 'var(--c-text)', lineHeight: 1.6, maxWidth: '800px', margin: '0 auto' }}>
            {t('techDesc')}
          </p>
        </div>
      </div>

      {/* Budowa zasilacza - interaktywny diagram */}
      <div className="section-padding bg-light" style={{ padding: '4rem 2rem 0rem 2rem', background: '#fafafa', overflow: 'hidden' }}>
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
              <p>{t('story6P2')}</p>
            </div>
            <div className="b2b-story-img">
              <img src="/assets/sch3.webp" alt="Aluminiowa obudowa" style={{ borderRadius: '8px' }} />
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
                <li style={{ marginBottom: '0.5rem' }}>{t('story5L1')}</li>
                <li style={{ marginBottom: '0.5rem' }}>{t('story5L2')}</li>
                <li style={{ marginBottom: '0.5rem' }}>{t('story5L3')}</li>
                <li>{t('story5L4')}</li>
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
              <p>{t('story4P1')}</p>
              <p>{t('story4P2')}</p>
            </div>
            <div className="b2b-story-img" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
              <img src="/assets/ce_rohs.png" alt="Certyfikaty CE i RoHS" style={{ width: 'auto', maxWidth: '100%', maxHeight: '180px', objectFit: 'contain', mixBlendMode: 'multiply', boxShadow: 'none', borderRadius: 0 }} />
            </div>
          </div>
        </div>
      </div>

      {/* Applications Section (Visual Sales Tool) */}
      <div className="applications-section" style={{ maxWidth: 'var(--max-width)', margin: '5rem auto 0 auto', padding: '0 1.5rem' }}>
        <div className="section-header text-center" style={{ marginBottom: '3rem', textAlign: 'center' }}>
          <h2 style={{ fontSize: '2.5rem', color: 'var(--c-heading)', fontFamily: 'Outfit, sans-serif', fontWeight: 800 }}>{t('appTitle')}</h2>
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

      {/* B2B Partnership Section */}
      <div className="container section-padding" style={{ maxWidth: 'var(--max-width)', margin: '4rem auto 0 auto', padding: '0 1.5rem' }}>
        <div className="partnership-section" style={{ display: 'flex', gap: '3rem', flexWrap: 'wrap', alignItems: 'center' }}>
          <div className="partnership-img" style={{ flex: 1, minWidth: '300px' }}>
            <img src="/assets/scharfer_partnership.webp" alt="{t('b2bCoop')} Scharfer" style={{ width: '100%', borderRadius: '12px', boxShadow: '0 8px 24px rgba(0,0,0,0.05)' }} />
          </div>
          <div className="partnership-text" style={{ flex: 1, minWidth: '300px' }}>
            <h2 style={{ fontSize: '2.2rem', color: 'var(--c-heading)', marginBottom: '0.5rem', fontWeight: 800 }}>{t('b2bTitle')}</h2>
            <p className="ps-subtitle" style={{ fontSize: '1.1rem', color: '#666', marginBottom: '2rem' }}>{t('b2bSubtitle')}</p>
            
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
            <h2 className="section-title" style={{ fontSize: '2rem', color: 'var(--c-heading)', fontWeight: 800 }}>{t('faqTitle')}</h2>
            <p className="section-subtitle" style={{ color: '#666' }}>{t('faqSubtitle')}</p>
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
