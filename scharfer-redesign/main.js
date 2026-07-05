// Scharfer Redesign - Main JavaScript (White/Red Agency Theme)

// 1. Tab Switching Logic
function switchTab(tabId) {
    // Hide all sections
    document.querySelectorAll('.view-section').forEach(section => {
        section.classList.remove('active');
    });
    // Remove active class from all nav items
    document.querySelectorAll('.nav-item, .mobile-nav-item').forEach(item => {
        item.classList.remove('active');
    });

    // Show selected section
    const targetSection = document.getElementById(`${tabId}-tab`);
    if (targetSection) {
        targetSection.classList.add('active');
    }

    // Highlight selected nav items
    document.querySelectorAll(`[data-tab="${tabId}"]`).forEach(item => {
        item.classList.add('active');
    });

    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Setup Nav Listeners
document.querySelectorAll('.nav-item, .mobile-nav-item').forEach(item => {
    item.addEventListener('click', (e) => {
        e.preventDefault();
        const tabId = item.getAttribute('data-tab');
        switchTab(tabId);
        
        // Close mobile menu if open
        const mobileMenu = document.getElementById('mobile-drawer');
        if (mobileMenu && mobileMenu.classList.contains('open')) {
            mobileMenu.classList.remove('open');
        }
    });
});

// Logo click -> Home
document.getElementById('logo-btn').addEventListener('click', (e) => {
    e.preventDefault();
    switchTab('home');
});

// CTA Buttons -> Kontakt
document.getElementById('cta-distributor-btn').addEventListener('click', () => switchTab('kontakt'));
document.getElementById('drawer-cta-btn').addEventListener('click', () => {
    switchTab('kontakt');
    document.getElementById('mobile-drawer').classList.remove('open');
});
const exploreBtn = document.getElementById('explore-offer-btn');
if (exploreBtn) {
    exploreBtn.addEventListener('click', () => switchTab('oferta'));
}


// 2. Mobile Menu Toggle
const hamburgerBtn = document.getElementById('hamburger-menu-btn');
const mobileDrawer = document.getElementById('mobile-drawer');

hamburgerBtn.addEventListener('click', () => {
    mobileDrawer.classList.toggle('open');
});

// 3. Language Dropdown & Translation Logic
const langDropdown = document.querySelector('.language-dropdown');
const currentLangBtn = document.getElementById('lang-current-btn');
let currentLang = localStorage.getItem('scharfer_lang') || 'pl';

currentLangBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    langDropdown.classList.toggle('open');
});

document.addEventListener('click', () => {
    langDropdown.classList.remove('open');
});

function applyTranslations(lang) {
    currentLang = lang;
    localStorage.setItem('scharfer_lang', lang);
    const flagEmojis = { pl: '🇵🇱', en: '🇬🇧', de: '🇩🇪', lt: '🇱🇹' };
    const emoji = flagEmojis[lang] || lang.toUpperCase();
    const langText = lang.toUpperCase();
    currentLangBtn.innerHTML = `<span style="font-size: 1.1rem;">${emoji}</span> <span style="font-size: 0.85rem; font-weight: 500;">${langText}</span> <svg width="8" height="5" viewBox="0 0 10 6" fill="none" style="opacity: 0.5;"><path d="M1 1L5 5L9 1" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
    
    if (typeof translations === 'undefined' || !translations[lang]) return;

    const t = translations[lang];

    // Text translations
    document.querySelectorAll('[data-t]').forEach(el => {
        const key = el.getAttribute('data-t');
        if (t[key]) {
            if (el.tagName === 'H1' && key === 'heroTitle') {
                // Special case to preserve the span formatting in hero
                el.innerHTML = t[key].replace(/(Bezkompromisowa jakość\.|Uncompromising quality\.|Kompromisslose Qualität\.|Bekompomisė kokybė\.)/, '<span>$1</span>');
            } else {
                el.textContent = t[key];
            }
        }
    });

    // Placeholder translations
    document.querySelectorAll('[data-t-placeholder]').forEach(el => {
        const key = el.getAttribute('data-t-placeholder');
        if (t[key]) {
            el.setAttribute('placeholder', t[key]);
        }
    });

    renderProducts(); // Re-render products to update translation of "View Specs", etc.
}

document.querySelectorAll('.lang-menu button').forEach(btn => {
    btn.addEventListener('click', (e) => {
        const lang = e.target.getAttribute('data-lang');
        applyTranslations(lang);
    });
});


// 4. Products Data & Rendering
const productsData = [
    // 12V
    { index: '32000', name: 'SCH-18-12 18W', specs: { voltage: '12V', current: '1.5A', dim: '133×34×22 mm' }, ean: '5905475360008', pdf: 'https://scharfer.com.pl/wp-content/uploads/2024/02/SCH-18.pdf', img: 'assets/products/1218.png' },
    { index: '32000A', name: 'SCH-20-12 20W', specs: { voltage: '12V', current: '1.66A', dim: '133×34×22 mm' }, ean: '5905475360039', pdf: 'https://scharfer.com.pl/wp-content/uploads/2024/02/SCH-20.pdf', img: 'assets/products/1220.png' },
    { index: '32001', name: 'SCH-30-12 30W', specs: { voltage: '12V', current: '2.5A', dim: '133×34×22 mm' }, ean: '5905475360046', pdf: 'https://scharfer.com.pl/wp-content/uploads/2024/02/SCH-30.pdf', img: 'assets/products/1230.png' },
    { index: '32001A', name: 'SCH-45-12 45W', specs: { voltage: '12V', current: '3.75A', dim: '163×43×32 mm' }, ean: '5905475360077', pdf: 'https://scharfer.com.pl/wp-content/uploads/2024/02/SCH-45.pdf', img: 'assets/products/1245.png' },
    { index: '32002', name: 'SCH-60-12 60W', specs: { voltage: '12V', current: '5A', dim: '163×43×32 mm' }, ean: '5905475360084', pdf: 'https://scharfer.com.pl/wp-content/uploads/2024/02/SCH-60.pdf', img: 'assets/products/1260.png' },
    { index: '32003', name: 'SCH-100-12 100W', specs: { voltage: '12V', current: '8.3A', dim: '190×52×37 mm' }, ean: '5905475360114', pdf: 'https://scharfer.com.pl/wp-content/uploads/2024/02/SCH-100.pdf', img: 'assets/products/12100.png' },
    { index: '32004', name: 'SCH-150-12 150W', specs: { voltage: '12V', current: '12.5A', dim: '202×58×32 mm' }, ean: '5905475360121', pdf: 'https://scharfer.com.pl/wp-content/uploads/2024/02/SCH-150.pdf', img: 'assets/products/12150.png' },
    { index: '32005', name: 'SCH-200-12 200W', specs: { voltage: '12V', current: '16.7A', dim: '243×65×40 mm' }, ean: '5905475360145', pdf: 'https://scharfer.com.pl/wp-content/uploads/2024/02/SCH-200.pdf', img: 'assets/products/12200.png' },
    { index: '32006', name: 'SCH-300-12 300W', specs: { voltage: '12V', current: '25A', dim: '260×82×45 mm' }, ean: '5905475360176', pdf: 'https://scharfer.com.pl/wp-content/uploads/2024/02/SCH-300.pdf', img: 'assets/products/12300.png' },
    { index: '32007', name: 'SCH-400-12 400W', specs: { voltage: '12V', current: '33.3A', dim: '260×82×45 mm' }, ean: '5905475364433', pdf: 'https://scharfer.com.pl/wp-content/uploads/2024/09/SCH-400.pdf', img: 'assets/products/12400.png' },
    // 24V
    { index: '32100', name: 'SCH-18-24 18W', specs: { voltage: '24V', current: '0.75A', dim: '133×34×22 mm' }, ean: '5905475360015', pdf: 'https://scharfer.com.pl/wp-content/uploads/2024/02/SCH-18.pdf', img: 'assets/products/2418.png' },
    { index: '32100A', name: 'SCH-20-24 20W', specs: { voltage: '24V', current: '0.83A', dim: '133×34×22 mm' }, ean: '5905475360022', pdf: 'https://scharfer.com.pl/wp-content/uploads/2024/02/SCH-20.pdf', img: 'assets/products/2420.png' },
    { index: '32101', name: 'SCH-30-24 30W', specs: { voltage: '24V', current: '1.25A', dim: '133×34×22 mm' }, ean: '5905475360053', pdf: 'https://scharfer.com.pl/wp-content/uploads/2024/02/SCH-30.pdf', img: 'assets/products/2430.png' },
    { index: '32101A', name: 'SCH-45-24 45W', specs: { voltage: '24V', current: '1.87A', dim: '163×43×32 mm' }, ean: '5905475360060', pdf: 'https://scharfer.com.pl/wp-content/uploads/2024/02/SCH-45.pdf', img: 'assets/products/2445.png' },
    { index: '32102', name: 'SCH-60-24 60W', specs: { voltage: '24V', current: '2.5A', dim: '163×43×32 mm' }, ean: '5905475360091', pdf: 'https://scharfer.com.pl/wp-content/uploads/2024/02/SCH-60.pdf', img: 'assets/products/2460.png' },
    { index: '32103', name: 'SCH-100-24 100W', specs: { voltage: '24V', current: '4.2A', dim: '190×52×37 mm' }, ean: '5905475360107', pdf: 'https://scharfer.com.pl/wp-content/uploads/2024/02/SCH-100.pdf', img: 'assets/products/24100.png' },
    { index: '32104', name: 'SCH-150-24 150W', specs: { voltage: '24V', current: '6.25A', dim: '202×58×32 mm' }, ean: '5905475360138', pdf: 'https://scharfer.com.pl/wp-content/uploads/2024/02/SCH-150.pdf', img: 'assets/products/24150.png' },
    { index: '32105', name: 'SCH-200-24 200W', specs: { voltage: '24V', current: '8.3A', dim: '243×65×40 mm' }, ean: '5905475360152', pdf: 'https://scharfer.com.pl/wp-content/uploads/2024/02/SCH-200.pdf', img: 'assets/products/24200.png' },
    { index: '32106', name: 'SCH-300-24 300W', specs: { voltage: '24V', current: '12.5A', dim: '260×82×45 mm' }, ean: '5905475360169', pdf: 'https://scharfer.com.pl/wp-content/uploads/2024/02/SCH-300.pdf', img: 'assets/products/24300.png' },
    { index: '32107', name: 'SCH-400-24 400W', specs: { voltage: '24V', current: '16.7A', dim: '260×82×45 mm' }, ean: '5905475364440', pdf: 'https://scharfer.com.pl/wp-content/uploads/2024/09/SCH-400.pdf', img: 'assets/products/24400.png' }
];

let currentFilter = 'all';
let currentSearch = '';

function renderProducts() {
    const container12 = document.getElementById('products-12v-container');
    const container24 = document.getElementById('products-24v-container');
    const group12 = document.getElementById('group-12V');
    const group24 = document.getElementById('group-24V');

    container12.innerHTML = '';
    container24.innerHTML = '';

    let has12 = false;
    let has24 = false;

    // Get translations for specs
    const t = translations[currentLang] || translations['pl'];

    productsData.forEach(p => {
        // Filter logic
        if (currentFilter !== 'all' && p.specs.voltage !== currentFilter) return;
        
        if (currentSearch) {
            const term = currentSearch.toLowerCase();
            if (!p.name.toLowerCase().includes(term) && !p.index.toLowerCase().includes(term)) {
                return;
            }
        }

        const powerMatch = p.name.match(/\d+W/);
        const powerText = powerMatch ? powerMatch[0] : '';

        const html = `
            <div class="product-card">
                <div class="product-badges">
                    ${powerText ? `<span class="badge" style="background-color: var(--c-primary); color: var(--c-white); border-color: var(--c-primary); font-weight: 700;">${powerText}</span>` : ''}
                    <span class="badge badge-ip67">IP67</span>
                    <span class="badge">Gwarancja 7 Lat</span>
                </div>
                <div class="product-image" onclick="openProductModal('${p.index}')" style="cursor: zoom-in;" title="Zobacz szczegóły techniczne">
                    <img src="${p.img}" alt="${p.name} - ${p.index}" loading="lazy">
                </div>
                <div class="product-index">EAN: ${p.ean || ''}</div>
                <h3 class="product-name">${p.name}</h3>

                <div class="product-specs">
                    <div class="spec-line">
                        <span class="spec-label">${t.specVoltage || 'Napięcie'}</span>
                        <span class="spec-value">${p.specs.voltage} DC</span>
                    </div>
                    <div class="spec-line">
                        <span class="spec-label">${t.specCurrent || 'Prąd wyjściowy'}</span>
                        <span class="spec-value">${p.specs.current}</span>
                    </div>
                    <div class="spec-line">
                        <span class="spec-label">${t.specDim || 'Wymiary'}</span>
                        <span class="spec-value">${p.specs.dim}</span>
                    </div>
                    <div class="spec-line">
                        <span class="spec-label">Zabezpieczenia</span>
                        <span class="spec-value">OVP, SCP, OTP, OLP</span>
                    </div>
                </div>
                
                <a href="${p.pdf}" target="_blank" class="btn-primary" style="margin-top: auto; display: flex; align-items: center; justify-content: center; gap: 0.5rem; width: 100%; text-decoration: none;">
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" style="width: 18px; height: 18px;">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path>
                    </svg>
                    Pobierz kartę (PDF)
                </a>
            </div>
        `;

        if (p.specs.voltage === '12V') {
            container12.innerHTML += html;
            has12 = true;
        } else {
            container24.innerHTML += html;
            has24 = true;
        }
    });

    group12.style.display = has12 ? 'block' : 'none';
    group24.style.display = has24 ? 'block' : 'none';
}

// Search and Filter Listeners
document.getElementById('catalog-search').addEventListener('input', (e) => {
    currentSearch = e.target.value;
    renderProducts();
});

document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        e.target.classList.add('active');
        currentFilter = e.target.getAttribute('data-filter');
        renderProducts();
    });
});


// 5. FAQ Accordion Logic
document.querySelectorAll('.faq-question').forEach(button => {
    button.addEventListener('click', () => {
        const faqItem = button.parentElement;
        const isActive = faqItem.classList.contains('active');
        
        // Close all other items
        document.querySelectorAll('.faq-item').forEach(item => {
            item.classList.remove('active');
        });

        // Toggle current item
        if (!isActive) {
            faqItem.classList.add('active');
        }
    });
});


// 6. Cookie Banner Logic
const cookieBanner = document.getElementById('cookie-banner');
const cookieAccept = document.getElementById('cookie-accept-btn');

if (!localStorage.getItem('scharfer_cookies_accepted')) {
    setTimeout(() => {
        cookieBanner.classList.add('show');
    }, 1500);
}

cookieAccept.addEventListener('click', () => {
    localStorage.setItem('scharfer_cookies_accepted', 'true');
    cookieBanner.classList.remove('show');
});


// 7. Form Handling
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        // Simulate sending
        const btn = contactForm.querySelector('button[type="submit"]');
        const originalText = btn.innerText;
        btn.innerText = 'Wysyłanie...';
        btn.disabled = true;

        setTimeout(() => {
            btn.innerText = originalText;
            btn.disabled = false;
            document.getElementById('form-success-banner').style.display = 'block';
            contactForm.reset();
            
            setTimeout(() => {
                document.getElementById('form-success-banner').style.display = 'none';
            }, 5000);
        }, 1500);
    });
}


// Initialization
document.addEventListener('DOMContentLoaded', () => {
    applyTranslations(currentLang);
    
    // Hash routing on load
    if (window.location.hash) {
        const tab = window.location.hash.substring(1); // remove '#'
        if (['home', 'oferta', 'poznaj', 'kontakt'].includes(tab)) {
            switchTab(tab);
        } else {
            switchTab('home');
        }
    } else {
        switchTab('home');
    }
});

// 8. Rich Product Modal Logic
function openProductModal(index) {
    const p = productsData.find(item => item.index === index);
    if (!p) return;

    let modal = document.getElementById('product-modal');
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'product-modal';
        document.body.appendChild(modal);
        
        modal.addEventListener('click', (e) => {
            if (e.target.id === 'product-modal' || e.target.classList.contains('modal-close')) {
                modal.classList.remove('active');
            }
        });
    }

    const t = typeof translations !== 'undefined' ? (translations[currentLang] || translations['pl']) : {};
    const voltageLabel = t.specVoltage || 'Napięcie wyjściowe';
    const currentLabel = t.specCurrent || 'Prąd wyjściowy';
    const dimLabel = t.specDim || 'Wymiary';

    modal.innerHTML = `
        <div class="modal-content" style="max-width: 900px; max-height: 90vh; overflow-y: auto;">
            <span class="modal-close">&times;</span>
            
            <div class="modal-image-col">
                <img src="${p.img}" alt="${p.name}" style="cursor: zoom-in; transition: transform 0.3s ease; position: relative; z-index: 10; width: 100%; border-radius: 8px; box-shadow: 0 4px 15px rgba(0,0,0,0.05);" onclick="this.style.transform = this.style.transform === 'scale(1.8)' ? 'scale(1)' : 'scale(1.8)';">
            </div>
            
            <div class="modal-info-col">
                <h2 style="font-size: 1.8rem; margin-bottom: 0.5rem; color: var(--c-heading);">${p.name}</h2>
                <div class="modal-index" style="margin-bottom: 1.5rem; font-size: 1rem; color: #666; font-weight: 500;">EAN: ${p.ean || ''} <span style="margin-left: 1rem; color: var(--c-primary);">SKU: ${p.index}</span></div>
                
                <div class="product-specs-detailed">
                    <div class="spec-group" style="margin-bottom: 1.5rem;">
                        <h4 style="font-size: 0.95rem; color: var(--c-heading); margin-bottom: 0.8rem; text-transform: uppercase; letter-spacing: 0.05em; border-bottom: none; opacity: 0.7; font-weight: 700; padding-bottom: 0.5rem;">Podstawowe parametry</h4>
                        <table class="modal-specs-table" style="width: 100%; border-collapse: collapse; font-size: 0.95rem;">
                            <tbody>
                                <tr>
                                    <td style="padding: 0.5rem 0; color: #555; width: 45%; border-bottom: 1px solid transparent; padding: 0.7rem 0;">${voltageLabel}</td>
                                    <td style="padding: 0.5rem 0; font-weight: 600; border-bottom: 1px solid transparent; padding: 0.7rem 0;">${p.specs.voltage} DC</td>
                                </tr>
                                <tr>
                                    <td style="padding: 0.5rem 0; color: #555; border-bottom: 1px solid transparent; padding: 0.7rem 0;">${currentLabel}</td>
                                    <td style="padding: 0.5rem 0; font-weight: 600; border-bottom: 1px solid transparent; padding: 0.7rem 0;">${p.specs.current}</td>
                                </tr>
                                <tr>
                                    <td style="padding: 0.5rem 0; color: #555; border-bottom: 1px solid transparent; padding: 0.7rem 0;">Moc znamionowa</td>
                                    <td style="padding: 0.5rem 0; font-weight: 600; border-bottom: 1px solid transparent; padding: 0.7rem 0;">${p.name.split(' ')[1]}</td>
                                </tr>
                                <tr>
                                    <td style="padding: 0.5rem 0; color: #555; border-bottom: 1px solid transparent; padding: 0.7rem 0;">${dimLabel}</td>
                                    <td style="padding: 0.5rem 0; font-weight: 600; border-bottom: 1px solid transparent; padding: 0.7rem 0;">${p.specs.dim}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div class="spec-group" style="margin-bottom: 1.5rem;">
                        <h4 style="font-size: 0.95rem; color: var(--c-heading); margin-bottom: 0.8rem; text-transform: uppercase; letter-spacing: 0.05em; border-bottom: none; opacity: 0.7; font-weight: 700; padding-bottom: 0.5rem;">Cechy produktu</h4>
                        <ul style="list-style-type: none; padding: 0; margin: 0; font-size: 0.9rem; color: var(--c-text); line-height: 1.5;">
                            <li style="margin-bottom: 0.4rem; display: flex; align-items: flex-start; gap: 8px;"><span style="color: var(--c-primary); font-weight: bold;">•</span> Klasa szczelności IP67 (wewnętrzne i zewnętrzne)</li>
                            <li style="margin-bottom: 0.4rem; display: flex; align-items: flex-start; gap: 8px;"><span style="color: var(--c-primary); font-weight: bold;">•</span> 100% pełne obciążenie, 100% test wypalenia (Burn-in)</li>
                            <li style="margin-bottom: 0.4rem; display: flex; align-items: flex-start; gap: 8px;"><span style="color: var(--c-primary); font-weight: bold;">•</span> Wbudowany aktywny układ PFC, PF>0,98</li>
                            <li style="margin-bottom: 0.4rem; display: flex; align-items: flex-start; gap: 8px;"><span style="color: var(--c-primary); font-weight: bold;">•</span> Wysoka wydajność i stabilne napięcie</li>
                        </ul>
                    </div>
                    
                    <div class="spec-group" style="margin-bottom: 1.5rem;">
                        <h4 style="font-size: 0.95rem; color: var(--c-heading); margin-bottom: 0.8rem; text-transform: uppercase; letter-spacing: 0.05em; border-bottom: none; opacity: 0.7; font-weight: 700; padding-bottom: 0.5rem;">Zabezpieczenia</h4>
                        <ul style="list-style-type: none; padding: 0; margin: 0; font-size: 0.9rem; color: var(--c-text); line-height: 1.5;">
                            <li style="margin-bottom: 0.4rem; display: flex; align-items: flex-start; gap: 8px;"><span style="color: var(--c-primary); font-weight: bold;">•</span> <strong>OVP, SCP, OTP, OLP</strong></li>
                            <li style="margin-bottom: 0.4rem; display: flex; align-items: flex-start; gap: 8px;"><span style="color: var(--c-primary); font-weight: bold;">•</span> Przeciążenie: tryb nadmiernego spadku napięcia, autoodzyskiwanie</li>
                            <li style="margin-bottom: 0.4rem; display: flex; align-items: flex-start; gap: 8px;"><span style="color: var(--c-primary); font-weight: bold;">•</span> Zwarcie: tryb chwilowego wyłączenia, autoodzyskiwanie</li>
                        </ul>
                    </div>
                    
                    <div class="spec-group" style="margin-bottom: 1rem;">
                        <h4 style="font-size: 0.95rem; color: var(--c-heading); margin-bottom: 0.8rem; text-transform: uppercase; letter-spacing: 0.05em; border-bottom: none; opacity: 0.7; font-weight: 700; padding-bottom: 0.5rem;">Środowisko i Certyfikaty</h4>
                        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.5rem; font-size: 0.85rem; margin-bottom: 0.8rem;">
                            <div style="background: #f8f9fa; padding: 0.5rem 0.75rem; border-radius: 6px;"><strong>Temp. pracy:</strong> -30°C ~ +50°C</div>
                            <div style="background: #f8f9fa; padding: 0.5rem 0.75rem; border-radius: 6px;"><strong>Wilgotność:</strong> 20 ~ 95% RH</div>
                        </div>
                        <p style="font-size: 0.8rem; color: #888; line-height: 1.4; margin: 0;">
                            <strong>Certyfikaty:</strong> CE, RoHS, SELV<br>
                            <strong>Normy:</strong> EN 61347-2-13; EN 61347-1; EN 62493; EN 55015; EN 61547; EN 61000-3-2; EN 61000-3-3; 2014/35/EU; 2014/30/EU
                        </p>
                    </div>
                </div>
                
                <div class="modal-actions">
                    <a href="${p.pdf}" target="_blank" class="btn-primary btn-download-pdf">
                        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" style="width: 20px; height: 20px; margin-right: 8px; vertical-align: middle;">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path>
                        </svg>
                        Pobierz Pełną Kartę Katalogową
                    </a>
                </div>
            </div>
        </div>
    `;
    
    // Slight delay to allow DOM to render before adding transition class
    setTimeout(() => {
        modal.classList.add('active');
    }, 10);
}

// Scroll to top button logic
document.addEventListener('scroll', () => {
    const scrollBtn = document.getElementById('scrollToTop');
    if (scrollBtn) {
        if (window.scrollY > 500) {
            scrollBtn.classList.add('visible');
        } else {
            scrollBtn.classList.remove('visible');
        }
    }
});
