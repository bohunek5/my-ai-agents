'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { useLanguage } from '@/context/LanguageContext';

import WcagMenu from '@/components/WcagMenu';
import ThemeToggle from '@/components/ThemeToggle';

export default function Header() {
  const pathname = usePathname();
  const { lang, setLang, t } = useLanguage();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const flagCodes: Record<string, string> = { pl: 'pl', en: 'gb', de: 'de', lt: 'lt' };

  // Helper to determine if link is active
  const isActive = (path: string) => {
    if (path === '/' && pathname === '/') return 'active';
    if (path !== '/' && pathname.startsWith(path)) return 'active';
    return '';
  };

  return (
    <header className="site-header">
      <div className="header-inner">
        <div className="logo-wrapper" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <Link href="/" className="logo-link" id="logo-btn">
            <img src="/logo_scharfer.png" alt="Scharfer - Zasilacze LED" className="logo-img" />
          </Link>
          <div className="distributor-badge" style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'center', gap: '2px', borderLeft: '2px solid var(--c-border)', paddingLeft: '12px' }}>
            <span style={{ fontSize: '9px', fontWeight: 700, color: 'var(--c-text)', opacity: 0.8, textTransform: 'uppercase', letterSpacing: '0.5px', lineHeight: 1 }}>{t('officialDistributor')}</span>
            <a href="https://prescot.pl" target="_blank" rel="noopener noreferrer" style={{ display: 'flex' }}>
              <img src="/PRESCOT_logo.png" alt="PRESCOT LED" style={{ height: '16px' }} />
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
          {/* Accessibility Tools */}
          <WcagMenu />
          <ThemeToggle />

          {/* Language Switcher */}
          <div className="language-switcher" style={{ position: 'relative' }}>
            <button
              className="lang-btn"
              id="lang-current-btn"
              onClick={() => setDropdownOpen(!dropdownOpen)}
              style={{
                opacity: dropdownOpen ? 1 : 0.8,
                fontSize: '1rem',
                padding: '6px 10px',
                border: '1px solid rgba(0,0,0,0.1)',
                background: dropdownOpen ? 'var(--c-light-gray)' : 'transparent',
                borderRadius: '20px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => { e.currentTarget.style.opacity = '1'; e.currentTarget.style.background = 'var(--c-light-gray)'; }}
              onMouseLeave={(e) => { if (!dropdownOpen) { e.currentTarget.style.opacity = '0.8'; e.currentTarget.style.background = 'transparent'; } }}
            >
              <img src={`https://flagcdn.com/w20/${flagCodes[lang]}.png`} alt={lang} style={{ width: '20px', height: '15px', objectFit: 'cover', borderRadius: '2px' }} />
              <span style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--c-black)' }}>{lang.toUpperCase()}</span>
              <svg width="8" height="5" viewBox="0 0 10 6" fill="none" style={{ opacity: 0.5, transform: dropdownOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }}>
                <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            {dropdownOpen && (
              <div
                className="lang-menu"
                id="lang-dropdown"
                style={{
                  position: 'absolute',
                  top: '100%',
                  right: 0,
                  marginTop: '8px',
                  background: 'var(--card-bg)',
                  boxShadow: '0 10px 25px -5px rgba(0,0,0,0.1), 0 8px 10px -6px rgba(0,0,0,0.1)',
                  borderRadius: '12px',
                  overflow: 'hidden',
                  zIndex: 100,
                  minWidth: '130px',
                  border: '1px solid #f3f4f6',
                  display: 'flex',
                  flexDirection: 'column'
                }}
              >
                {(['pl', 'en', 'de', 'lt'] as const).map(l => (
                  <button
                    key={l}
                    onClick={() => { setLang(l); setDropdownOpen(false); }}
                    style={{
                      fontSize: '0.95rem',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                      width: '100%',
                      padding: '10px 16px',
                      border: 'none',
                      background: lang === l ? 'var(--c-red-light)' : 'var(--card-bg)',
                      color: lang === l ? 'var(--c-red)' : 'var(--c-text)',
                      textAlign: 'left',
                      fontWeight: lang === l ? 600 : 500,
                      cursor: 'pointer',
                      transition: 'background 0.2s'
                    }}
                    onMouseEnter={(e) => { if (lang !== l) e.currentTarget.style.background = 'var(--c-light-gray)'; }}
                    onMouseLeave={(e) => { if (lang !== l) e.currentTarget.style.background = 'var(--card-bg)'; }}
                  >
                    <img src={`https://flagcdn.com/w20/${flagCodes[l]}.png`} alt={l} style={{ width: '20px', height: '15px', objectFit: 'cover', borderRadius: '2px' }} /> {l.toUpperCase()}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Retail link */}
          <a href="https://www.prescot.com.pl/pl/c/Zasilacze-LED-Scharfer/580" target="_blank" rel="noopener noreferrer" className="retail-btn" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', padding: '0.4rem 0.8rem', border: 'none', background: 'var(--c-red)', color: '#FFFFFF', textDecoration: 'none', borderRadius: '6px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)', transition: 'all 0.3s ease', whiteSpace: 'nowrap' }}>
            <span style={{ fontSize: '0.82rem', fontWeight: 500, display: 'flex', alignItems: 'center', gap: '4px' }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="9" cy="21" r="1" />
                <circle cx="20" cy="21" r="1" />
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
              </svg>
              {t('navB2c')}
            </span>
            <span style={{ fontSize: '0.65rem', color: 'rgba(255, 255, 255, 0.8)', borderLeft: '1px solid rgba(255, 255, 255, 0.3)', paddingLeft: '8px' }}>www.prescot.com.pl</span>
          </a>
        </div>
      </div>
    </header>
  );
}
