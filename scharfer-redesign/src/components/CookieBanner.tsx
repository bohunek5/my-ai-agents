'use client';
import { useState, useEffect } from 'react';

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const accepted = localStorage.getItem('scharfer_cookies_accepted');
    if (!accepted) {
      setVisible(true);
    }
  }, []);

  const accept = () => {
    localStorage.setItem('scharfer_cookies_accepted', 'true');
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="cookie-banner" id="cookie-banner" style={{ position: 'fixed', bottom: '20px', right: '20px', left: 'auto', width: '320px', maxWidth: 'calc(100vw - 40px)', background: '#fff', border: '1px solid #eee', borderRadius: '12px', padding: '20px', zIndex: 9999, boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }}>
      <div className="cookie-inner" style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        <p style={{ margin: 0, fontSize: '0.85rem', color: '#666', lineHeight: '1.4' }}>
          Ta strona korzysta z plików cookies (ciasteczek), aby zapewnić Ci najlepsze doświadczenia z przeglądania.{' '}
          <a href="#" style={{ color: 'var(--c-primary)', fontWeight: 600, display: 'block', marginTop: '5px' }}>Polityka prywatności</a>
        </p>
        <button className="btn-primary small" id="cookie-accept-btn" onClick={accept} style={{ padding: '0.6rem 1rem', fontSize: '0.85rem', background: 'var(--c-primary)', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 600, width: '100%' }}>
          Akceptuję
        </button>
      </div>
    </div>
  );
}
