'use client';
import { useLanguage } from '@/context/LanguageContext';
import Link from 'next/link';

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="site-footer" style={{ backgroundColor: 'var(--background)', padding: '4rem 0 3rem 0' }}>
      <div className="footer-inner" style={{ maxWidth: 'var(--max-width)', margin: '0 auto', padding: '0 var(--spacing-lg)', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '3rem', alignItems: 'flex-start' }}>
        
        {/* Column 1: Scharfer Brand (Nothing underneath except a clean tagline) */}
        <div className="footer-col brand-col" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <img src="/logo_scharfer.png" alt="Scharfer - Zasilacze LED" className="footer-logo" style={{ maxHeight: '35px', width: 'auto', alignSelf: 'flex-start', margin: 0 }} />
          <p style={{ color: 'var(--c-text)', fontSize: '0.9rem', lineHeight: 1.6, margin: 0, maxWidth: '280px' }}>
            {t('footerTagline')}
          </p>
        </div>

        {/* Column 2: Prescot Sp. z o.o. (Address details) */}
        <div className="footer-col distributor-col" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--c-text)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{t('officialDistributor')}</span>
            <div style={{ alignSelf: 'flex-start' }}>
              <img src="/PRESCOT_logo.png" alt="PRESCOT LED" style={{ height: '22px', display: 'block' }} />
            </div>
          </div>
          <div style={{ color: 'var(--c-text)', fontSize: '0.9rem', lineHeight: 1.6, margin: 0 }}>
            <strong style={{ color: 'var(--c-heading)' }}>Prescot Sp. z o.o.</strong><br />
            ul. Wileńska 1, 11-500 Giżycko<br />
            NIP: 8451939947
          </div>
        </div>

        {/* Column 3: Contact Details */}
        <div className="footer-col contact-col" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <span style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--c-text)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{t('footerSupport')}</span>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <div>
              <span style={{ display: 'block', color: 'var(--c-text)', fontSize: '0.8rem', marginBottom: '0.2rem' }}>{t('footerB2bDept')}</span>
              <a href="mailto:komponenty@prescot.pl" style={{ color: 'var(--c-red)', fontSize: '1.1rem', fontWeight: 700, textDecoration: 'none', transition: 'opacity 0.2s' }}>
                komponenty@prescot.pl
              </a>
            </div>
            <div>
              <span style={{ display: 'block', color: 'var(--c-text)', fontSize: '0.8rem', marginBottom: '0.2rem' }}>{t('footerHotline')}</span>
              <a href="tel:+48877776482" style={{ color: 'var(--c-heading)', fontSize: '1rem', fontWeight: 600, textDecoration: 'none' }}>
                +48 87 777 64 82
              </a>
            </div>
          </div>
        </div>

        {/* Column 4: Quick Links & Legal */}
        <div className="footer-col links-col" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <span style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--c-text)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{t('footerNav')}</span>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
            <Link href="/poznaj" style={{ color: 'var(--c-text)', textDecoration: 'none', fontSize: '0.9rem', fontWeight: 500, transition: 'color 0.2s' }} className="footer-link">
              {t('footerNavPoznaj')}
            </Link>
            <Link href="/oferta" style={{ color: 'var(--c-text)', textDecoration: 'none', fontSize: '0.9rem', fontWeight: 500, transition: 'color 0.2s' }} className="footer-link">
              {t('footerNavOferta')}
            </Link>
            <Link href="/kontakt" style={{ color: 'var(--c-text)', textDecoration: 'none', fontSize: '0.9rem', fontWeight: 500, transition: 'color 0.2s' }} className="footer-link">
              {t('footerNavKontakt')}
            </Link>
            <div style={{ display: 'flex', gap: '1rem', marginTop: '0.4rem', paddingTop: '0.4rem' }}>
              <Link href="/regulamin" style={{ color: 'var(--c-text)', textDecoration: 'none', fontSize: '0.8rem', transition: 'color 0.2s' }} className="footer-link-sub">{t('footerRegulamin')}</Link>
              <Link href="/rodo" style={{ color: 'var(--c-text)', textDecoration: 'none', fontSize: '0.8rem', transition: 'color 0.2s' }} className="footer-link-sub">{t('footerRodo')}</Link>
            </div>
          </div>
        </div>

      </div>

      {/* Copyright Bar */}
      <div style={{ maxWidth: 'var(--max-width)', margin: '3rem auto 0 auto', padding: '1.5rem var(--spacing-lg) 0 var(--spacing-lg)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <span style={{ fontSize: '0.8rem', color: 'var(--c-text)' }}>
          &copy; {new Date().getFullYear()} {t('footerRights')}
        </span>
        <span style={{ fontSize: '0.8rem', color: 'var(--c-text)' }}>
          Powered by <a href="https://prescot.pl" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--c-text)', textDecoration: 'none', fontWeight: 600 }}>PRESCOT LED</a>
        </span>
      </div>

      {/* Hover effects */}
      <style jsx>{`
        :global(.footer-link:hover) {
          color: var(--c-red) !important;
        }
        :global(.footer-link-sub:hover) {
          color: var(--c-heading) !important;
        }
      `}</style>
    </footer>
  );
}
