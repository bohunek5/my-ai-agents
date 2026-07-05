'use client';
import { useLanguage } from '@/context/LanguageContext';

export default function PoznajPage() {
  const { t } = useLanguage();

  return (
    <div className="view-section active">
      {/* Poznaj Hero */}
      <div className="poznaj-hero" style={{ background: 'linear-gradient(135deg, var(--c-white) 0%, #eef2f6 100%)', padding: '6rem 2rem', borderBottom: '1px solid var(--c-border)', position: 'relative', overflow: 'hidden' }}>
        <div className="container" style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', alignItems: 'center', gap: '4rem', flexWrap: 'wrap' }}>
          <div style={{ flex: 1, minWidth: '300px', position: 'relative', zIndex: 2 }}>
            <h1 style={{ fontSize: '3rem', color: 'var(--c-heading)', marginBottom: '1rem', lineHeight: '1.2', fontWeight: 800 }}>Technologia bez kompromisów</h1>
            <p style={{ fontSize: '1.25rem', color: 'var(--c-text)', lineHeight: 1.6 }}>Odkryj innowacje i zabezpieczenia, które sprawiają, że zasilacze Scharfer są najczęstszym wyborem profesjonalistów w branży oświetleniowej i B2B.</p>
            <div className="hero-trust" style={{ marginTop: '3rem', justifyContent: 'flex-start', flexWrap: 'wrap', gap: '1rem' }}>
              <div className="trust-item" style={{ background: 'var(--c-white)', padding: '1rem 1.5rem', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}>
                <span className="trust-val" style={{ display: 'block', fontSize: '1.5rem', fontWeight: 800, color: 'var(--c-primary)', marginBottom: '0.2rem' }}>7</span>
                <span className="trust-lbl" style={{ fontSize: '0.9rem', color: 'var(--c-text)', fontWeight: 500 }}>Lat Gwarancji</span>
              </div>
              <div className="trust-item" style={{ background: 'var(--c-white)', padding: '1rem 1.5rem', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}>
                <span className="trust-val" style={{ display: 'block', fontSize: '1.5rem', fontWeight: 800, color: 'var(--c-primary)', marginBottom: '0.2rem' }}>IP67</span>
                <span className="trust-lbl" style={{ fontSize: '0.9rem', color: 'var(--c-text)', fontWeight: 500 }}>Pełna Szczelność</span>
              </div>
              <div className="trust-item" style={{ background: 'var(--c-white)', padding: '1rem 1.5rem', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}>
                <span className="trust-val" style={{ display: 'block', fontSize: '1.5rem', fontWeight: 800, color: 'var(--c-primary)', marginBottom: '0.2rem' }}>100%</span>
                <span className="trust-lbl" style={{ fontSize: '0.9rem', color: 'var(--c-text)', fontWeight: 500 }}>Praca pod obciążeniem</span>
              </div>
            </div>
          </div>
          <div style={{ flex: 1, minWidth: '300px', position: 'relative', zIndex: 2, textAlign: 'center' }}>
            <img src="/assets/scharfer3.jpg" alt="Zasilacze Scharfer" style={{ maxWidth: '100%', borderRadius: '12px', boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }} />
          </div>
        </div>
      </div>

      <div className="container section-padding" style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Value Proposition B2B */}
        <div className="partnership-section" style={{ display: 'flex', gap: '3rem', flexWrap: 'wrap', marginTop: '3rem' }}>
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
