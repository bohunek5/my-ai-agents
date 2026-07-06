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
    <div className="cookie-banner" id="cookie-banner" style={{ position: 'fixed', bottom: 0, left: 0, right: 0, background: '#fff', borderTop: '1px solid #eee', padding: '15px 20px', zIndex: 9999, boxShadow: '0 -4px 15px rgba(0,0,0,0.05)' }}>
      <div className="cookie-inner" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '15px', maxWidth: 'var(--max-width)', margin: '0 auto' }}>
        <p style={{ margin: 0, fontSize: '0.85rem', color: '#666' }}>
          Ta strona korzysta z plików cookies (ciasteczek), aby zapewnić Ci najlepsze doświadczenia z przeglądania.{' '}
          <a href="#" style={{ color: 'var(--c-primary)', fontWeight: 600 }}>Dowiedz się więcej w Polityce prywatności</a>
        </p>
        <button className="btn-primary small" id="cookie-accept-btn" onClick={accept} style={{ padding: '0.5rem 1rem', fontSize: '0.8rem', background: 'var(--c-primary)', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 600 }}>
          Akceptuję
        </button>
      </div>
    </div>
  );
}
