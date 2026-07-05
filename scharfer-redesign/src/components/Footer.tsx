'use client';
import { useLanguage } from '@/context/LanguageContext';
import Link from 'next/link';

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="site-footer" style={{ backgroundColor: '#ffffff', padding: '4rem 0 3rem 0', borderTop: '1px solid #e5e7eb' }}>
      <div className="footer-inner" style={{ maxWidth: 'var(--max-width)', margin: '0 auto', padding: '0 var(--spacing-lg)', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '3rem', alignItems: 'flex-start' }}>
        
        {/* Column 1: Scharfer Brand (Nothing underneath except a clean tagline) */}
        <div className="footer-col brand-col" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <img src="logo_scharfer.png" alt="Scharfer - Zasilacze LED" className="footer-logo" style={{ maxHeight: '35px', width: 'auto', alignSelf: 'flex-start', margin: 0 }} />
          <p style={{ color: '#6b7280', fontSize: '0.9rem', lineHeight: 1.6, margin: 0, maxWidth: '280px' }}>
            Profesjonalne, hermetyczne zasilacze LED w klasie IP67 stworzone z myślą o bezkompromisowej niezawodności.
          </p>
        </div>

        {/* Column 2: Prescot Sp. z o.o. (Address details) */}
        <div className="footer-col distributor-col" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Oficjalny Dystrybutor</span>
            <a href="https://prescot.com.pl" target="_blank" rel="noopener noreferrer" style={{ alignSelf: 'flex-start' }}>
              <img src="PRESCOT_logo.png" alt="PRESCOT LED" style={{ height: '22px', display: 'block' }} />
            </a>
          </div>
          <div style={{ color: '#4b5563', fontSize: '0.9rem', lineHeight: 1.6, margin: 0 }}>
            <strong style={{ color: 'var(--c-heading)' }}>Prescot Sp. z o.o.</strong><br />
            ul. Wileńska 1, 11-500 Giżycko<br />
            NIP: 8451939947
          </div>
        </div>

        {/* Column 3: Contact Details */}
        <div className="footer-col contact-col" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Wsparcie i Kontakt</span>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <div>
              <span style={{ display: 'block', color: '#6b7280', fontSize: '0.8rem', marginBottom: '0.2rem' }}>Dział handlowy B2B:</span>
              <a href="mailto:komponenty@prescot.pl" style={{ color: 'var(--c-red)', fontSize: '1.1rem', fontWeight: 700, textDecoration: 'none', transition: 'opacity 0.2s' }}>
                komponenty@prescot.pl
              </a>
            </div>
            <div>
              <span style={{ display: 'block', color: '#6b7280', fontSize: '0.8rem', marginBottom: '0.2rem' }}>Infolinia:</span>
              <a href="tel:+48877776482" style={{ color: 'var(--c-heading)', fontSize: '1rem', fontWeight: 600, textDecoration: 'none' }}>
                +48 87 777 64 82
              </a>
            </div>
          </div>
        </div>

        {/* Column 4: Quick Links & Legal */}
        <div className="footer-col links-col" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Nawigacja</span>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
            <Link href="/poznaj" style={{ color: '#4b5563', textDecoration: 'none', fontSize: '0.9rem', fontWeight: 500, transition: 'color 0.2s' }} className="footer-link">
              Poznaj technologię Scharfer
            </Link>
            <Link href="/oferta" style={{ color: '#4b5563', textDecoration: 'none', fontSize: '0.9rem', fontWeight: 500, transition: 'color 0.2s' }} className="footer-link">
              Katalog zasilaczy
            </Link>
            <Link href="/kontakt" style={{ color: '#4b5563', textDecoration: 'none', fontSize: '0.9rem', fontWeight: 500, transition: 'color 0.2s' }} className="footer-link">
              Kontakt B2B
            </Link>
            <div style={{ display: 'flex', gap: '1rem', marginTop: '0.4rem', paddingTop: '0.8rem', borderTop: '1px solid #f3f4f6' }}>
              <Link href="/regulamin" style={{ color: '#9ca3af', textDecoration: 'none', fontSize: '0.8rem', transition: 'color 0.2s' }} className="footer-link-sub">Regulamin</Link>
              <Link href="/rodo" style={{ color: '#9ca3af', textDecoration: 'none', fontSize: '0.8rem', transition: 'color 0.2s' }} className="footer-link-sub">RODO</Link>
            </div>
          </div>
        </div>

      </div>

      {/* Copyright Bar */}
      <div style={{ maxWidth: 'var(--max-width)', margin: '3rem auto 0 auto', padding: '1.5rem var(--spacing-lg) 0 var(--spacing-lg)', borderTop: '1px solid #f3f4f6', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <span style={{ fontSize: '0.8rem', color: '#9ca3af' }}>
          &copy; {new Date().getFullYear()} Scharfer. Wszelkie prawa zastrzeżone.
        </span>
        <span style={{ fontSize: '0.8rem', color: '#9ca3af' }}>
          Powered by <a href="https://prescot.pl" target="_blank" rel="noopener noreferrer" style={{ color: '#6b7280', textDecoration: 'none', fontWeight: 600 }}>PRESCOT LED</a>
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
