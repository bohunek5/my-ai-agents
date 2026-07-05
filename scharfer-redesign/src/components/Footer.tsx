'use client';
import { useLanguage } from '@/context/LanguageContext';

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="site-footer" style={{ backgroundColor: '#ffffff', padding: '2rem 0', borderTop: '1px solid #eaeaea' }}>
      <div className="footer-inner" style={{ maxWidth: 'var(--max-width)', margin: '0 auto', padding: '0 var(--spacing-lg)', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'flex-start', gap: '2rem' }}>
        
        <div className="footer-col brand-col" style={{ flex: 1, minWidth: '300px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <img src="/logo_scharfer.png" alt="Scharfer - Zasilacze LED" className="footer-logo" style={{ maxHeight: '32px', margin: 0 }} />
            <div style={{ fontSize: '12px', fontWeight: 600, color: '#111', textTransform: 'uppercase', borderLeft: '2px solid #eaeaea', paddingLeft: '15px' }}>
              <span style={{ display: 'block', fontSize: '9px', color: '#777', marginBottom: '2px' }}>Oficjalny dystrybutor</span>
              <a href="https://prescot.com.pl" target="_blank" rel="noopener noreferrer">
                <img src="/PRESCOT_logo.png" alt="PRESCOT LED" style={{ height: '16px', marginTop: '2px' }} />
              </a>
            </div>
          </div>
          <div style={{ color: '#6B7280', fontSize: '0.85rem', lineHeight: 1.5, marginTop: '5px' }}>
            <strong>Prescot Sp. z o.o.</strong><br />
            ul. Wileńska 1, 11-500 Giżycko<br />
            NIP: 8451939947
          </div>
        </div>

        <div className="footer-col email-col" style={{ flex: 1, minWidth: '250px' }}>
          <span style={{ display: 'block', color: '#6B7280', fontSize: '0.85rem', marginBottom: '0.4rem' }}>Kontakt (Dystrybutor):</span>
          <a href="mailto:biuro@prescot.pl" style={{ color: 'var(--c-heading)', fontSize: '1.15rem', fontWeight: 600, textDecoration: 'none' }}>biuro@prescot.pl</a>
          <span style={{ display: 'block', marginTop: '5px', fontWeight: 500, color: '#444', fontSize: '0.95rem' }}>tel. +48 87 777 64 82</span>
        </div>

        <div className="footer-col links-col" style={{ flex: 1, minWidth: '200px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <a href="#" style={{ color: '#6B7280', textDecoration: 'none', fontSize: '0.9rem', transition: 'color 0.2s' }}>Regulamin</a>
          <a href="#" style={{ color: '#6B7280', textDecoration: 'none', fontSize: '0.9rem', transition: 'color 0.2s' }}>RODO</a>
          <a href="https://prescot.pl" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--c-heading)', fontWeight: 600, textDecoration: 'none', fontSize: '0.9rem', transition: 'color 0.2s', marginTop: '5px' }}>Poznaj PRESCOT LED &rarr;</a>
        </div>

      </div>
    </footer>
  );
}
