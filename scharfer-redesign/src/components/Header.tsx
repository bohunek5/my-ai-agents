'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { useLanguage } from '@/context/LanguageContext';

export default function Header() {
  const pathname = usePathname();
  const { lang, setLang, t } = useLanguage();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const flagEmojis: Record<string, string> = { pl: '🇵🇱', en: '🇬🇧', de: '🇩🇪', lt: '🇱🇹' };

  // Helper to determine if link is active
  const isActive = (path: string) => {
    if (path === '/' && pathname === '/') return 'active';
    if (path !== '/' && pathname.startsWith(path)) return 'active';
    return '';
  };

  return (
    <header className="site-header">
      <div className="header-inner">
        <div className="logo-wrapper" style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <Link href="/" className="logo-link" id="logo-btn">
            <img src="/logo_scharfer.png" alt="Scharfer - Zasilacze LED" className="logo-img" />
          </Link>
          <div className="distributor-badge" style={{ fontSize: '12px', fontWeight: 600, color: '#555', textTransform: 'uppercase', borderLeft: '2px solid #eee', paddingLeft: '15px' }}>
            <span style={{ display: 'block', fontSize: '9px', color: '#999', marginBottom: '2px' }}>Oficjalny dystrybutor</span>
            <a href="https://prescot.pl" target="_blank" rel="noopener noreferrer">
              <img src="/PRESCOT_logo.png" alt="PRESCOT LED" style={{ height: '18px', marginTop: '2px' }} />
            </a>
          </div>
        </div>
        
        <nav className="main-nav">
          <Link href="/" className={`nav-item ${isActive('/')}`} data-t="navHome">{t('navHome')}</Link>
          <Link href="/poznaj" className={`nav-item ${isActive('/poznaj')}`} data-t="navPoznaj">{t('navPoznaj')}</Link>
          <Link href="/oferta" className={`nav-item ${isActive('/oferta')}`} data-t="navOferta">{t('navOferta')}</Link>
          <Link href="/kontakt" className={`nav-item ${isActive('/kontakt')}`} data-t="navKontakt">{t('navKontakt')}</Link>
        </nav>
        
        <div className="header-actions" style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
          {/* Language Dropdown */}
          <div className={`language-dropdown ${dropdownOpen ? 'open' : ''}`} style={{ position: 'relative' }}>
            <button className="lang-btn" id="lang-current-btn" onClick={() => setDropdownOpen(!dropdownOpen)} style={{ opacity: 0.7, fontSize: '1rem', padding: '0.2rem', border: 'none', background: 'transparent', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px', transition: 'opacity 0.2s' }}>
              <span style={{ fontSize: '1.1rem' }}>{flagEmojis[lang]}</span> 
              <span style={{ fontSize: '0.85rem', fontWeight: 500 }}>{lang.toUpperCase()}</span> 
              <svg width="8" height="5" viewBox="0 0 10 6" fill="none" style={{ opacity: 0.5 }}>
                <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            {dropdownOpen && (
              <div className="lang-menu" id="lang-dropdown" style={{ display: 'flex', flexDirection: 'column' }}>
                {(['pl', 'en', 'de', 'lt'] as const).map(l => (
                  <button key={l} onClick={() => { setLang(l); setDropdownOpen(false); }} style={{ fontSize: '1rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <span style={{ fontSize: '1.1rem' }}>{flagEmojis[l]}</span> {l.toUpperCase()}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Retail link */}
          <a href="https://www.prescot.com.pl/pl/c/Zasilacze-LED-Scharfer/580" target="_blank" rel="noopener noreferrer" className="retail-btn" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', padding: '0.4rem 0.8rem', border: '1px solid #eaeaea', background: '#fafafa', color: '#444', textDecoration: 'none', borderRadius: '6px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)', transition: 'all 0.3s ease', whiteSpace: 'nowrap' }}>
            <span style={{ fontSize: '0.82rem', fontWeight: 500, display: 'flex', alignItems: 'center', gap: '4px' }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="9" cy="21" r="1" />
                <circle cx="20" cy="21" r="1" />
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
              </svg>
              Zakup B2C
            </span>
            <span style={{ fontSize: '0.65rem', color: '#888', borderLeft: '1px solid #ddd', paddingLeft: '8px' }}>www.prescot.com.pl</span>
          </a>
        </div>
      </div>
    </header>
  );
}
