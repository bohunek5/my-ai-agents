// 1. Language Dropdown
const langBtn = document.getElementById('lang-btn');
const langDropdown = document.getElementById('lang-dropdown');

langBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    langDropdown.classList.toggle('active');
});
document.addEventListener('click', () => {
    langDropdown.classList.remove('active');
});

const flags = { 'pl': '🇵🇱', 'en': '🇬🇧', 'de': '🇩🇪', 'lt': '🇱🇹' };
const translations = {
    'pl': {
        heroTitle: 'Zasilacze stworzone dla instalatorów.',
        heroSubtitle: 'Moc, która nie zawodzi. Ochrona IP67 i gwarancja niezawodności.',
        offerTitle: 'Nasze Zasilacze',
        badgeCompact: 'Kompaktowy',
        badgePopular: 'Popularny',
        badgePro: 'Pro',
        btnOrderB2B: 'ZAMÓW B2B',
        whereToUseTitle: 'Gdzie użyć?',
        useGarden: 'Oświetlenie ogrodowe',
        useBathroom: 'Łazienki i wilgotne strefy',
        useFacade: 'Iluminacje elewacji',
        usePool: 'Okolice basenów',
        faqTitle: 'FAQ',
        navHome: 'Główna',
        navOferta: 'Zasilacze',
        navPoznaj: 'Dlaczego?',
        navKontakt: 'Kontakt'
    },
    'en': {
        heroTitle: 'Power supplies built for installers.',
        heroSubtitle: 'Power that does not fail. IP67 protection and reliability guarantee.',
        offerTitle: 'Our Products',
        badgeCompact: 'Compact',
        badgePopular: 'Popular',
        badgePro: 'Pro',
        btnOrderB2B: 'ORDER B2B',
        whereToUseTitle: 'Where to use?',
        useGarden: 'Garden lighting',
        useBathroom: 'Bathrooms and wet zones',
        useFacade: 'Facade illuminations',
        usePool: 'Pool areas',
        faqTitle: 'FAQ',
        navHome: 'Home',
        navOferta: 'Products',
        navPoznaj: 'Dlaczego?',
        navKontakt: 'Contact'
    },
    'de': {
        heroTitle: 'Netzteile für Installateure gemacht.',
        heroSubtitle: 'Leistung, die nicht versagt. IP67-Schutz und Zuverlässigkeitsgarantie.',
        offerTitle: 'Unsere Netzteile',
        badgeCompact: 'Kompakt',
        badgePopular: 'Beliebt',
        badgePro: 'Pro',
        btnOrderB2B: 'B2B BESTELLEN',
        whereToUseTitle: 'Wo anwenden?',
        useGarden: 'Gartenbeleuchtung',
        useBathroom: 'Badezimmer',
        useFacade: 'Fassadenbeleuchtung',
        usePool: 'Poolbereiche',
        faqTitle: 'FAQ',
        navHome: 'Start',
        navOferta: 'Produkte',
        navPoznaj: 'Dlaczego?',
        navKontakt: 'Kontakt'
    },
    'lt': {
        heroTitle: 'Maitinimo šaltiniai, sukurti montuotojams.',
        heroSubtitle: 'Galia, kuri nenuvilia. IP67 apsauga ir patikimumo garantija.',
        offerTitle: 'Mūsų produktai',
        badgeCompact: 'Kompaktiškas',
        badgePopular: 'Populiarus',
        badgePro: 'Pro',
        btnOrderB2B: 'UŽSAKYTI B2B',
        whereToUseTitle: 'Kur naudoti?',
        useGarden: 'Sodo apšvietimas',
        useBathroom: 'Vonios kambariai',
        useFacade: 'Fasadų apšvietimas',
        usePool: 'Baseinų zonos',
        faqTitle: 'DUK',
        navHome: 'Pagrindinis',
        navOferta: 'Produktai',
        navPoznaj: 'Dlaczego?',
        navKontakt: 'Kontaktai'
    }
};

langDropdown.querySelectorAll('button').forEach(btn => {
    btn.addEventListener('click', () => {
        const lang = btn.getAttribute('data-lang');
        langBtn.innerText = flags[lang];
        
        const dict = translations[lang] || translations['pl'];
        document.querySelectorAll('[data-t]').forEach(el => {
            const key = el.getAttribute('data-t');
            if(dict[key]) {
                if(el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
                    el.placeholder = dict[key];
                } else {
                    el.innerText = dict[key];
                }
            }
        });
        langDropdown.classList.remove('active');
    });
});

// 2. Navigation (App View Switching)
window.switchTab = function(tabId) {
    // hide all
    document.querySelectorAll('.view-section').forEach(sec => sec.classList.remove('active'));
    // show target
    const target = document.getElementById(tabId);
    if(target) target.classList.add('active');
    // update nav icons
    document.querySelectorAll('.nav-item').forEach(item => {
        if(item.getAttribute('data-target') === tabId) {
            item.classList.add('active');
        } else {
            item.classList.remove('active');
        }
    });
};

document.querySelectorAll('.nav-item').forEach(item => {
    item.addEventListener('click', () => {
        switchTab(item.getAttribute('data-target'));
    });
});

// 3. FAQ Accordion
document.querySelectorAll('.faq-head').forEach(head => {
    head.addEventListener('click', () => {
        const parent = head.parentElement;
        parent.classList.toggle('active');
    });
});
