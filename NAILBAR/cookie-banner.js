(function() {
  const css = `
    .cookie-banner {
      position: fixed;
      bottom: 20px;
      left: 20px;
      right: 20px;
      max-width: 500px;
      background: rgba(33, 29, 27, 0.96);
      color: #fff;
      padding: 24px;
      border: 1px solid #c5a059;
      border-radius: 8px;
      box-shadow: 0 10px 30px rgba(0,0,0,0.3);
      z-index: 10000;
      font-family: Arial, sans-serif;
      line-height: 1.5;
      font-size: 14px;
      backdrop-filter: blur(10px);
      transition: transform 0.4s ease, opacity 0.4s ease;
      transform: translateY(150%);
      opacity: 0;
    }
    .cookie-banner.show {
      transform: translateY(0);
      opacity: 1;
    }
    .cookie-banner h3 {
      margin: 0 0 10px 0;
      font-size: 18px;
      color: #c5a059;
      font-weight: bold;
    }
    .cookie-banner p {
      margin: 0 0 20px 0;
      color: #d4ceca;
      font-size: 13px;
    }
    .cookie-banner p a {
      color: #c5a059;
      text-decoration: underline;
    }
    .cookie-btn-group {
      display: flex;
      gap: 10px;
      flex-wrap: wrap;
    }
    .cookie-btn {
      padding: 10px 16px;
      border: 1px solid #c5a059;
      background: transparent;
      color: #fff;
      cursor: pointer;
      font-weight: bold;
      font-size: 12px;
      border-radius: 4px;
      transition: background 0.2s, color 0.2s;
    }
    .cookie-btn.primary {
      background: #c5a059;
      color: #211d1b;
    }
    .cookie-btn:hover {
      background: rgba(197, 160, 89, 0.2);
    }
    .cookie-btn.primary:hover {
      background: #b38f4d;
      color: #211d1b;
    }
    .cookie-modal .cookie-btn {
      color: #211d1b;
    }
    .cookie-modal .cookie-btn.primary {
      color: #211d1b;
      background: #c5a059;
    }
    .cookie-modal .cookie-btn:not(.primary):hover {
      background: rgba(33, 29, 27, 0.05);
    }
    
    /* Footer Links Styling */
    footer p, footer {
      color: #fff !important;
    }
    .legal-footer-links {
      margin-top: 15px;
      display: flex;
      gap: 15px;
      flex-wrap: wrap;
      font-size: 11px;
    }
    .legal-footer-links a {
      color: #a8a09a !important;
      text-decoration: none !important;
      font-weight: normal !important;
      opacity: 0.85;
      transition: opacity 0.2s, color 0.2s;
    }
    .legal-footer-links a:hover {
      color: #c5a059 !important;
      text-decoration: underline !important;
      opacity: 1;
    }
    
    /* Preferences Modal */
    .cookie-modal-overlay {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0,0,0,0.65);
      z-index: 10001;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 20px;
      opacity: 0;
      pointer-events: none;
      transition: opacity 0.3s ease;
    }
    .cookie-modal-overlay.open {
      opacity: 1;
      pointer-events: auto;
    }
    .cookie-modal {
      background: #fff;
      color: #211d1b;
      width: 100%;
      max-width: 550px;
      border-radius: 8px;
      border: 1px solid #c5a059;
      box-shadow: 0 15px 40px rgba(0,0,0,0.4);
      display: flex;
      flex-direction: column;
      max-height: 90vh;
      font-family: Arial, sans-serif;
    }
    .cookie-modal-header {
      padding: 20px;
      border-bottom: 1px solid #eee;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .cookie-modal-header h3 {
      margin: 0;
      font-size: 20px;
      color: #211d1b;
    }
    .cookie-modal-close {
      background: none;
      border: none;
      font-size: 24px;
      cursor: pointer;
      color: #716a65;
    }
    .cookie-modal-body {
      padding: 20px;
      overflow-y: auto;
      flex-grow: 1;
    }
    .cookie-option {
      margin-bottom: 20px;
      padding-bottom: 15px;
      border-bottom: 1px solid #f5f5f5;
    }
    .cookie-option:last-child {
      border-bottom: none;
      margin-bottom: 0;
      padding-bottom: 0;
    }
    .cookie-option-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 6px;
    }
    .cookie-option-title {
      font-weight: bold;
      font-size: 14px;
    }
    .cookie-option-desc {
      font-size: 12px;
      color: #716a65;
      line-height: 1.4;
    }
    
    /* Toggle Switch */
    .cookie-switch {
      position: relative;
      display: inline-block;
      width: 44px;
      height: 24px;
    }
    .cookie-switch input {
      opacity: 0;
      width: 0;
      height: 0;
    }
    .cookie-slider {
      position: absolute;
      cursor: pointer;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: #ccc;
      transition: .4s;
      border-radius: 24px;
    }
    .cookie-slider:before {
      position: absolute;
      content: "";
      height: 16px;
      width: 16px;
      left: 4px;
      bottom: 4px;
      background-color: white;
      transition: .4s;
      border-radius: 50%;
    }
    input:checked + .cookie-slider {
      background-color: #c5a059;
    }
    input:disabled + .cookie-slider {
      opacity: 0.6;
      cursor: not-allowed;
    }
    input:checked + .cookie-slider:before {
      transform: translateX(20px);
    }
    .cookie-modal-footer {
      padding: 20px;
      border-top: 1px solid #eee;
      display: flex;
      justify-content: flex-end;
      gap: 10px;
    }
    
    @media (max-width: 600px) {
      .cookie-banner {
        left: 10px;
        right: 10px;
        bottom: 10px;
        padding: 16px;
      }
      .cookie-btn {
        flex-grow: 1;
        text-align: center;
      }
    }
  `;

  // Inject styles
  const styleEl = document.createElement('style');
  styleEl.textContent = css;
  document.head.appendChild(styleEl);

  const consentKey = 'nailbar-cookie-consent';

  function getConsent() {
    try {
      const stored = localStorage.getItem(consentKey);
      return stored ? JSON.parse(stored) : null;
    } catch (e) {
      return null;
    }
  }

  function saveConsent(consent) {
    try {
      localStorage.setItem(consentKey, JSON.stringify(consent));
      window.dispatchEvent(new CustomEvent('cookieConsentChanged', { detail: consent }));
    } catch (e) {}
  }

  const cookieTranslations = {
    pl: {
      bannerTitle: "Pliki cookies i prywatność",
      bannerText: "Strona NailBar korzysta z plików cookies w celu poprawnego działania sklepu, analizy ruchu oraz marketingu. Szczegóły znajdziesz w <a href=\"/polityka-prywatnosci.html\">Polityce Prywatności</a>.",
      acceptAll: "Akceptuj wszystkie",
      rejectAll: "Tylko niezbędne",
      customize: "Ustawienia",
      modalTitle: "Ustawienia prywatności i cookies",
      cookieEssentialTitle: "Niezbędne pliki cookies",
      cookieEssentialDesc: "Umożliwiają poprawne poruszanie się po serwisie, działanie koszyka oraz realizację płatności. Bez nich strona nie będzie działać prawidłowo.",
      cookieFunctionalTitle: "Funkcjonalne pliki cookies",
      cookieFunctionalDesc: "Służą do zapamiętywania Twoich ustawień, takich jak preferowany język witryny, rozmiar czcionek czy stan koszyka między wizytami.",
      cookieAnalyticalTitle: "Analityczne pliki cookies",
      cookieAnalyticalDesc: "Pozwalają nam mierzyć ruch na stronie, badać popularność poszczególnych usług oraz optymalizować działanie serwisu.",
      cookieMarketingTitle: "Marketingowe pliki cookies",
      cookieMarketingDesc: "Umożliwiają dopasowywanie reklam i komunikatów promocyjnych do Twoich zainteresowań poza naszą witryną (np. w social media).",
      savePrefs: "Zapisz preferencje",
      acceptAllModal: "Zaakceptuj wszystkie"
    },
    en: {
      bannerTitle: "Cookies and privacy",
      bannerText: "The NailBar website uses cookies for proper store operation, traffic analysis and marketing. Details can be found in the <a href=\"/polityka-prywatnosci.html\">Privacy Policy</a>.",
      acceptAll: "Accept all",
      rejectAll: "Necessary only",
      customize: "Settings",
      modalTitle: "Privacy and cookies settings",
      cookieEssentialTitle: "Necessary cookies",
      cookieEssentialDesc: "Enable correct navigation on the website, cart operation and payment processing. Without them, the site will not function properly.",
      cookieFunctionalTitle: "Functional cookies",
      cookieFunctionalDesc: "Used to remember your settings, such as preferred site language, font size or cart state between visits.",
      cookieAnalyticalTitle: "Analytical cookies",
      cookieAnalyticalDesc: "Allow us to measure website traffic, study the popularity of individual services and optimize site performance.",
      cookieMarketingTitle: "Marketing cookies",
      cookieMarketingDesc: "Enable tailoring ads and promotional messages to your interests outside our website (e.g., in social media).",
      savePrefs: "Save preferences",
      acceptAllModal: "Accept all"
    },
    de: {
      bannerTitle: "Cookies und Datenschutz",
      bannerText: "Die NailBar-Website verwendet Cookies für den ordnungsgemäßen Shop-Betrieb, die Verkehrsanalyse und das Marketing. Details finden Sie in der <a href=\"/polityka-prywatnosci.html\">Datenschutzerklärung</a>.",
      acceptAll: "Alle akzeptieren",
      rejectAll: "Nur notwendige",
      customize: "Einstellungen",
      modalTitle: "Datenschutz- und Cookie-Einstellungen",
      cookieEssentialTitle: "Notwendige Cookies",
      cookieEssentialDesc: "Ermöglichen die korrekte Navigation auf der Website, den Warenkorb-Betrieb und die Zahlungsabwicklung. Ohne sie funktioniert die Seite nicht richtig.",
      cookieFunctionalTitle: "Funktionale Cookies",
      cookieFunctionalDesc: "Dienen zum Speichern Ihrer Einstellungen wie bevorzugte Website-Sprache, Schriftgröße oder Warenkorb-Status zwischen Besuchen.",
      cookieAnalyticalTitle: "Analytische Cookies",
      cookieAnalyticalDesc: "Ermöglichen uns, den Website-Verkehr zu messen, die Beliebtheit einzelner Dienste zu untersuchen und die Leistung der Website zu optimieren.",
      cookieMarketingTitle: "Marketing-Cookies",
      cookieMarketingDesc: "Ermöglichen die Anpassung von Anzeigen und Werbebotschaften an Ihre Interessen außerhalb unserer Website (z. B. in sozialen Medien).",
      savePrefs: "Einstellungen speichern",
      acceptAllModal: "Alle akzeptieren"
    }
  };

  function getLang() {
    return localStorage.getItem('nailbar-language') || 'pl';
  }

  function t(key) {
    const l = getLang();
    return (cookieTranslations[l] || cookieTranslations.pl)[key] || cookieTranslations.pl[key] || '';
  }

  function showBanner() {
    const banner = document.createElement('div');
    banner.className = 'cookie-banner';
    banner.innerHTML = `
      <h3>${t('bannerTitle')}</h3>
      <p>${t('bannerText')}</p>
      <div class="cookie-btn-group">
        <button class="cookie-btn primary" id="acceptAllCookies">${t('acceptAll')}</button>
        <button class="cookie-btn" id="rejectAllCookies">${t('rejectAll')}</button>
        <button class="cookie-btn" id="customizeCookies">${t('customize')}</button>
      </div>
    `;
    document.body.appendChild(banner);

    setTimeout(() => banner.classList.add('show'), 100);

    document.getElementById('acceptAllCookies').onclick = function() {
      saveConsent({ essential: true, functional: true, analytical: true, marketing: true });
      banner.classList.remove('show');
      setTimeout(() => banner.remove(), 400);
    };

    document.getElementById('rejectAllCookies').onclick = function() {
      saveConsent({ essential: true, functional: false, analytical: false, marketing: false });
      banner.classList.remove('show');
      setTimeout(() => banner.remove(), 400);
    };

    document.getElementById('customizeCookies').onclick = function() {
      openModal();
    };
  }

  function openModal() {
    const activeConsent = getConsent() || { essential: true, functional: true, analytical: true, marketing: true };
    
    const existing = document.querySelector('.cookie-modal-overlay');
    if (existing) existing.remove();

    const overlay = document.createElement('div');
    overlay.className = 'cookie-modal-overlay';
    overlay.innerHTML = `
      <div class="cookie-modal">
        <div class="cookie-modal-header">
          <h3>${t('modalTitle')}</h3>
          <button class="cookie-modal-close" id="closeCookieModal">&times;</button>
        </div>
        <div class="cookie-modal-body">
          <div class="cookie-option">
            <div class="cookie-option-header">
              <span class="cookie-option-title">${t('cookieEssentialTitle')}</span>
              <label class="cookie-switch">
                <input type="checkbox" checked disabled>
                <span class="cookie-slider"></span>
              </label>
            </div>
            <div class="cookie-option-desc">${t('cookieEssentialDesc')}</div>
          </div>
          <div class="cookie-option">
            <div class="cookie-option-header">
              <span class="cookie-option-title">${t('cookieFunctionalTitle')}</span>
              <label class="cookie-switch">
                <input type="checkbox" id="cookieOptFunc" ${activeConsent.functional ? 'checked' : ''}>
                <span class="cookie-slider"></span>
              </label>
            </div>
            <div class="cookie-option-desc">${t('cookieFunctionalDesc')}</div>
          </div>
          <div class="cookie-option">
            <div class="cookie-option-header">
              <span class="cookie-option-title">${t('cookieAnalyticalTitle')}</span>
              <label class="cookie-switch">
                <input type="checkbox" id="cookieOptAnal" ${activeConsent.analytical ? 'checked' : ''}>
                <span class="cookie-slider"></span>
              </label>
            </div>
            <div class="cookie-option-desc">${t('cookieAnalyticalDesc')}</div>
          </div>
          <div class="cookie-option">
            <div class="cookie-option-header">
              <span class="cookie-option-title">${t('cookieMarketingTitle')}</span>
              <label class="cookie-switch">
                <input type="checkbox" id="cookieOptMark" ${activeConsent.marketing ? 'checked' : ''}>
                <span class="cookie-slider"></span>
              </label>
            </div>
            <div class="cookie-option-desc">${t('cookieMarketingDesc')}</div>
          </div>
        </div>
        <div class="cookie-modal-footer">
          <button class="cookie-btn" id="saveCookiePrefs">${t('savePrefs')}</button>
          <button class="cookie-btn primary" id="acceptAllModal">${t('acceptAllModal')}</button>
        </div>
      </div>
    `;

    document.body.appendChild(overlay);
    setTimeout(() => overlay.classList.add('open'), 50);

    const banner = document.querySelector('.cookie-banner');

    function closeModal() {
      overlay.classList.remove('open');
      setTimeout(() => overlay.remove(), 300);
    }

    document.getElementById('closeCookieModal').onclick = closeModal;
    
    document.getElementById('saveCookiePrefs').onclick = function() {
      const consent = {
        essential: true,
        functional: document.getElementById('cookieOptFunc').checked,
        analytical: document.getElementById('cookieOptAnal').checked,
        marketing: document.getElementById('cookieOptMark').checked
      };
      saveConsent(consent);
      closeModal();
      if (banner) {
        banner.classList.remove('show');
        setTimeout(() => banner.remove(), 400);
      }
    };

    document.getElementById('acceptAllModal').onclick = function() {
      saveConsent({ essential: true, functional: true, analytical: true, marketing: true });
      closeModal();
      if (banner) {
        banner.classList.remove('show');
        setTimeout(() => banner.remove(), 400);
      }
    };
  }

  function bindSettingsTrigger() {
    const link = document.getElementById('cookieSettingsBtn');
    if (link) {
      link.onclick = function(e) {
        e.preventDefault();
        openModal();
      };
    }
  }

  window.addEventListener('nailbar-language-changed', () => {
    const banner = document.querySelector('.cookie-banner');
    if (banner && banner.classList.contains('show')) {
      banner.remove();
      showBanner();
    }
    const overlay = document.querySelector('.cookie-modal-overlay');
    if (overlay && overlay.classList.contains('open')) {
      overlay.remove();
      openModal();
    }
  });

  window.addEventListener('DOMContentLoaded', () => {
    if (!getConsent()) {
      showBanner();
    }
    bindSettingsTrigger();
    setTimeout(bindSettingsTrigger, 500);
  });
})();
