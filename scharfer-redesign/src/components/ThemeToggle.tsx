'use client';
import { useAccessibility } from '@/context/AccessibilityContext';

export default function ThemeToggle() {
  const { isDarkMode, toggleDarkMode } = useAccessibility();

  return (
    <button
      className="theme-toggle-btn"
      onClick={toggleDarkMode}
      aria-label="Przełącz motyw jasny/ciemny"
      title="Przełącz motyw"
    >
      <div className={`icon-container ${isDarkMode ? 'dark' : 'light'}`}>
        {/* Sun Icon */}
        <svg
          className="sun-icon"
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
          <circle cx="12" cy="12" r="4"></circle>
          <path d="M12 2v2"></path>
          <path d="M12 20v2"></path>
          <path d="m4.93 4.93 1.41 1.41"></path>
          <path d="m17.66 17.66 1.41 1.41"></path>
          <path d="M2 12h2"></path>
          <path d="M20 12h2"></path>
          <path d="m6.34 17.66-1.41 1.41"></path>
          <path d="m19.07 4.93-1.41 1.41"></path>
        </svg>

        {/* Moon Icon */}
        <svg
          className="moon-icon"
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
          <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path>
        </svg>
      </div>

      <style jsx>{`
        .theme-toggle-btn {
          background: transparent;
          border: 1px solid var(--c-border);
          color: var(--c-heading);
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 8px;
          border-radius: 50%;
          transition: all 0.3s ease;
          overflow: hidden;
        }
        .theme-toggle-btn:hover {
          background-color: var(--c-light-gray);
          color: var(--c-red);
          transform: scale(1.05);
        }
        .icon-container {
          position: relative;
          width: 24px;
          height: 24px;
        }
        .sun-icon, .moon-icon {
          position: absolute;
          top: 0;
          left: 0;
          transition: transform 0.4s ease, opacity 0.4s ease;
        }
        .light .sun-icon {
          transform: rotate(0deg) scale(1);
          opacity: 1;
        }
        .light .moon-icon {
          transform: rotate(-90deg) scale(0.5);
          opacity: 0;
        }
        .dark .sun-icon {
          transform: rotate(90deg) scale(0.5);
          opacity: 0;
        }
        .dark .moon-icon {
          transform: rotate(0deg) scale(1);
          opacity: 1;
        }
      `}</style>
    </button>
  );
}
