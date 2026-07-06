'use client';
import { useState, useRef, useEffect } from 'react';
import { useAccessibility } from '@/context/AccessibilityContext';
import { useLanguage } from '@/context/LanguageContext';

export default function WcagMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const { 
    fontSizeMultiplier, increaseFontSize, decreaseFontSize,
    isHighContrastLinks, toggleHighContrastLinks,
    isDyslexicFont, toggleDyslexicFont,
    isReading, readPage, stopReading
  } = useAccessibility();
  const { t } = useLanguage();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="wcag-menu-container" ref={menuRef} style={{ position: 'relative' }}>
      <button 
        className="wcag-toggle-btn" 
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Opcje ułatwień dostępu"
        title="Ułatwienia dostępu (WCAG)"
      >
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          width="24" 
          height="24" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="1.5" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        >
          <circle cx="16" cy="4" r="1"></circle>
          <path d="m18 19 1-7-6 1"></path>
          <path d="m5 8 3-3 5.5 3-2.36 3.5"></path>
          <path d="M4.24 14.5a5 5 0 0 0 6.88 6"></path>
          <path d="M13.76 17.5a5 5 0 0 0-6.88-6"></path>
        </svg>
      </button>

      {isOpen && (
        <div className="wcag-dropdown">
          <div className="wcag-dropdown-header">Ułatwienia dostępu</div>
          
          <div className="wcag-dropdown-item">
            <span className="wcag-item-label">Rozmiar tekstu</span>
            <div className="wcag-btn-group">
              <button onClick={decreaseFontSize} disabled={fontSizeMultiplier <= 1.0}>A-</button>
              <span className="wcag-multiplier">{Math.round(fontSizeMultiplier * 100)}%</span>
              <button onClick={increaseFontSize} disabled={fontSizeMultiplier >= 1.6}>A+</button>
            </div>
          </div>

          <button className={`wcag-dropdown-btn ${isHighContrastLinks ? 'active' : ''}`} onClick={toggleHighContrastLinks}>
            Podświetl linki
          </button>
          
          <button className={`wcag-dropdown-btn ${isDyslexicFont ? 'active' : ''}`} onClick={toggleDyslexicFont}>
            Czcionka dla dyslektyków
          </button>

          <button className="wcag-dropdown-btn wcag-read-btn" onClick={isReading ? stopReading : readPage}>
            {isReading ? 'Zatrzymaj czytanie' : 'Czytaj na głos'}
          </button>
        </div>
      )}

      <style jsx>{`
        .wcag-toggle-btn {
          background: transparent;
          border: 1px solid rgba(0,0,0,0.1);
          color: var(--c-heading);
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 8px;
          border-radius: 50%;
          transition: all 0.3s ease;
        }
        .wcag-toggle-btn:hover {
          background-color: var(--c-light-gray);
          color: var(--c-red);
          transform: scale(1.05);
        }
        .wcag-dropdown {
          position: absolute;
          top: 100%;
          right: 0;
          margin-top: 8px;
          background: var(--c-white);
          border: 1px solid var(--c-border);
          border-radius: 8px;
          box-shadow: 0 10px 25px rgba(0,0,0,0.1);
          width: 260px;
          padding: 12px;
          z-index: 1000;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .wcag-dropdown-header {
          font-size: 0.9rem;
          font-weight: 700;
          color: var(--c-heading);
          padding-bottom: 8px;
          border-bottom: 1px solid var(--c-border);
          margin-bottom: 4px;
        }
        .wcag-dropdown-item {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }
        .wcag-item-label {
          font-size: 0.85rem;
          color: var(--c-text);
          font-weight: 500;
        }
        .wcag-btn-group {
          display: flex;
          align-items: center;
          justify-content: space-between;
          background: var(--c-light-gray);
          border-radius: 6px;
          padding: 4px;
        }
        .wcag-btn-group button {
          background: var(--c-white);
          border: 1px solid var(--c-border);
          border-radius: 4px;
          width: 36px;
          height: 30px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          cursor: pointer;
          color: var(--c-heading);
        }
        .wcag-btn-group button:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }
        .wcag-multiplier {
          font-size: 0.85rem;
          font-weight: 600;
          color: var(--c-text);
        }
        .wcag-dropdown-btn {
          background: var(--c-light-gray);
          border: 1px solid transparent;
          padding: 10px;
          border-radius: 6px;
          text-align: left;
          font-size: 0.9rem;
          font-weight: 500;
          color: var(--c-heading);
          cursor: pointer;
          transition: all 0.2s;
        }
        .wcag-dropdown-btn:hover {
          background: var(--c-border);
        }
        .wcag-dropdown-btn.active {
          background: var(--c-red-light);
          border: 1px solid var(--c-red);
          color: var(--c-red);
        }
        .wcag-read-btn {
          background: var(--c-heading);
          color: var(--c-white);
          text-align: center;
          font-weight: 600;
        }
        .wcag-read-btn:hover {
          background: var(--c-black);
        }
      `}</style>
    </div>
  );
}
