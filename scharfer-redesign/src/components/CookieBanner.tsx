'use client';
import { useState, useEffect } from 'react';

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  
  const [prefs, setPrefs] = useState({
    necessary: true,
    analytics: false,
    marketing: false
  });

  useEffect(() => {
    const accepted = localStorage.getItem('scharfer_cookies_accepted');
    if (!accepted) {
      setVisible(true);
    }
  }, []);

  const acceptAll = () => {
    localStorage.setItem('scharfer_cookies_accepted', 'all');
    setVisible(false);
  };
  
  const acceptNecessary = () => {
    localStorage.setItem('scharfer_cookies_accepted', 'necessary');
    setVisible(false);
  };
  
  const saveSettings = () => {
    localStorage.setItem('scharfer_cookies_accepted', JSON.stringify(prefs));
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="cookie-banner" id="cookie-banner" style={{ 
      position: 'fixed', bottom: '20px', right: '20px', left: 'auto', 
      width: '380px', maxWidth: 'calc(100vw - 40px)', 
      background: 'var(--card-bg)', border: '1px solid var(--c-border)', borderRadius: '12px', 
      padding: '24px', zIndex: 99999, boxShadow: '0 10px 40px rgba(0,0,0,0.15)' 
    }}>
      {!showSettings ? (
        <div className="cookie-inner" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <h3 style={{ margin: 0, fontSize: '1.1rem', color: 'var(--c-heading)' }}>Szanujemy Twoją prywatność</h3>
          <p style={{ margin: 0, fontSize: '0.85rem', color: '#666', lineHeight: '1.5' }}>
            Ta strona korzysta z plików cookies w celu poprawy komfortu użytkowania, analizy ruchu na stronie oraz w celach marketingowych. Możesz zaakceptować wszystkie pliki cookies lub dostosować swoje ustawienia.
            <a href="/rodo" style={{ color: 'var(--c-red)', fontWeight: 600, display: 'block', marginTop: '5px' }}>Więcej informacji w Polityce Prywatności</a>
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '8px' }}>
            <button onClick={acceptAll} style={{ 
              padding: '0.7rem 1rem', fontSize: '0.9rem', background: 'var(--c-red)', 
              color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 600, width: '100%',
              transition: 'background 0.2s'
            }}>
              Zaakceptuj wszystkie
            </button>
            <button onClick={acceptNecessary} style={{ 
              padding: '0.7rem 1rem', fontSize: '0.9rem', background: 'var(--c-light-gray)', 
              color: 'var(--c-text)', border: '1px solid var(--c-border)', borderRadius: '6px', cursor: 'pointer', fontWeight: 600, width: '100%'
            }}>
              Tylko niezbędne
            </button>
            <button onClick={() => setShowSettings(true)} style={{ 
              padding: '0.5rem', fontSize: '0.85rem', background: 'transparent', 
              color: '#666', border: 'none', cursor: 'pointer', textDecoration: 'underline'
            }}>
              Dostosuj ustawienia
            </button>
          </div>
        </div>
      ) : (
        <div className="cookie-settings" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <h3 style={{ margin: 0, fontSize: '1.1rem', color: 'var(--c-heading)' }}>Ustawienia Cookies</h3>
          <p style={{ margin: 0, fontSize: '0.85rem', color: '#666', lineHeight: '1.4' }}>
            Zarządzaj swoimi preferencjami. Niezbędne pliki cookies są wymagane do prawidłowego działania strony.
          </p>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <label style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '0.85rem', color: 'var(--c-text)', cursor: 'not-allowed' }}>
              <input type="checkbox" checked disabled style={{ marginTop: '3px' }} />
              <div>
                <strong style={{ display: 'block' }}>Niezbędne</strong>
                <span style={{ color: '#888', fontSize: '0.8rem' }}>Kluczowe dla działania witryny. Nie można ich wyłączyć.</span>
              </div>
            </label>
            
            <label style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '0.85rem', color: 'var(--c-text)', cursor: 'pointer' }}>
              <input type="checkbox" checked={prefs.analytics} onChange={e => setPrefs({...prefs, analytics: e.target.checked})} style={{ marginTop: '3px' }} />
              <div>
                <strong style={{ display: 'block' }}>Analityka i Statystyki</strong>
                <span style={{ color: '#888', fontSize: '0.8rem' }}>Pozwalają nam analizować ruch i ulepszać witrynę.</span>
              </div>
            </label>
            
            <label style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '0.85rem', color: 'var(--c-text)', cursor: 'pointer' }}>
              <input type="checkbox" checked={prefs.marketing} onChange={e => setPrefs({...prefs, marketing: e.target.checked})} style={{ marginTop: '3px' }} />
              <div>
                <strong style={{ display: 'block' }}>Marketing</strong>
                <span style={{ color: '#888', fontSize: '0.8rem' }}>Używane do dopasowania reklam do Twoich zainteresowań.</span>
              </div>
            </label>
          </div>
          
          <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
            <button onClick={saveSettings} style={{ 
              padding: '0.6rem', fontSize: '0.9rem', background: 'var(--c-red)', 
              color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 600, flex: 1
            }}>
              Zapisz
            </button>
            <button onClick={() => setShowSettings(false)} style={{ 
              padding: '0.6rem', fontSize: '0.9rem', background: 'var(--c-light-gray)', 
              color: 'var(--c-text)', border: '1px solid var(--c-border)', borderRadius: '6px', cursor: 'pointer', fontWeight: 600, flex: 1
            }}>
              Wróć
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
