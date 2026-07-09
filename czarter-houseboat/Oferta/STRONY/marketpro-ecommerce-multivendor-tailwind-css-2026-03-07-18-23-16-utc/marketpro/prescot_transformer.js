#!/usr/bin/env node
/**
 * MarketPro → Prescot Transformer
 * 
 * Tasks:
 *  1. Copy logo files from src/images/logo/ → src/images/ (fix path)
 *  2. Copy prescot favicon svg to src/images/logo/favicon.svg
 *  3. Build full Polish translation of index.html from index-en.html
 *  4. Fix language switcher: PL default, ENG button → index-en.html
 *  5. Fix all HTML files logo paths (logo/ → root of images)
 */

const fs = require('fs');
const path = require('path');

const SRC = '/Users/karolbohdanowicz/my-ai-agents/mazury-holiday/Oferta/STRONY/marketpro-ecommerce-multivendor-tailwind-css-2026-03-07-18-23-16-utc/marketpro/src';
const PRESCOT_FAVICON_SRC = '/Users/karolbohdanowicz/my-ai-agents/prescot-sales-portal/public/favicon.svg';

// ─────────────────────────────────────────────────────────────────────────────
// STEP 1: Copy logo SVG files from logo/ → images/ so they are served correctly
// ─────────────────────────────────────────────────────────────────────────────
function copyLogos() {
    const logoSrc = path.join(SRC, 'images', 'logo', 'prescot-logo.svg');
    const logoWhiteSrc = path.join(SRC, 'images', 'logo', 'prescot-logo-white.svg');
    const logoDst = path.join(SRC, 'images', 'prescot-logo.svg');
    const logoWhiteDst = path.join(SRC, 'images', 'prescot-logo-white.svg');

    if (fs.existsSync(logoSrc)) {
        fs.copyFileSync(logoSrc, logoDst);
        console.log('✅ Copied prescot-logo.svg → images/');
    }
    if (fs.existsSync(logoWhiteSrc)) {
        fs.copyFileSync(logoWhiteSrc, logoWhiteDst);
        console.log('✅ Copied prescot-logo-white.svg → images/');
    }
}

// ─────────────────────────────────────────────────────────────────────────────
// STEP 2: Copy Prescot SVG favicon
// ─────────────────────────────────────────────────────────────────────────────
function copyFavicon() {
    const dst = path.join(SRC, 'images', 'logo', 'prescot-favicon.svg');
    if (fs.existsSync(PRESCOT_FAVICON_SRC)) {
        fs.copyFileSync(PRESCOT_FAVICON_SRC, dst);
        console.log('✅ Copied prescot favicon.svg → images/logo/');
    } else {
        console.warn('⚠️  Prescot favicon not found at:', PRESCOT_FAVICON_SRC);
    }
}

// ─────────────────────────────────────────────────────────────────────────────
// STEP 3: Fix ALL html files logo paths (images/logo/ → images/)
// ─────────────────────────────────────────────────────────────────────────────
function fixAllLogoPaths() {
    const htmlFiles = fs.readdirSync(SRC).filter(f => f.endsWith('.html'));
    let count = 0;
    for (const file of htmlFiles) {
        const filePath = path.join(SRC, file);
        let content = fs.readFileSync(filePath, 'utf8');
        const newContent = content
            .replace(/\.\/images\/logo\/prescot-logo-white\.svg/g, './images/prescot-logo-white.svg')
            .replace(/\.\/images\/logo\/prescot-logo\.svg/g, './images/prescot-logo.svg');
        if (content !== newContent) {
            fs.writeFileSync(filePath, newContent);
            count++;
        }
    }
    console.log(`✅ Fixed logo paths in ${count} HTML files`);
}

// ─────────────────────────────────────────────────────────────────────────────
// STEP 4: Fix favicon to use Prescot SVG in all HTML files
// ─────────────────────────────────────────────────────────────────────────────
function fixFaviconInAllHtml() {
    const htmlFiles = fs.readdirSync(SRC).filter(f => f.endsWith('.html'));
    let count = 0;
    for (const file of htmlFiles) {
        const filePath = path.join(SRC, file);
        let content = fs.readFileSync(filePath, 'utf8');
        const newContent = content.replace(
            /<link rel="shortcut icon" href="[^"]*">/g,
            '<link rel="shortcut icon" href="./images/logo/prescot-favicon.svg" type="image/svg+xml">'
        );
        if (content !== newContent) {
            fs.writeFileSync(filePath, newContent);
            count++;
        }
    }
    console.log(`✅ Updated favicon in ${count} HTML files`);
}

// ─────────────────────────────────────────────────────────────────────────────
// STEP 5: Build Polish index.html with comprehensive translation dictionary
// ─────────────────────────────────────────────────────────────────────────────
const TRANSLATIONS = [
    // === HEAD ===
    ['<html lang="en"', '<html lang="pl"'],
    ['MarketPro - E-commerce HTML5 Tailwind CSS Template', 'Prescot Shop - Sklep Internetowy'],

    // === TOP HEADER LINKS ===
    ['>Become A Seller<', '>Zostań Sprzedawcą<'],
    ['>About us<', '>O Nas<'],
    ['>Free Delivery<', '>Darmowa Dostawa<'],
    ['>Returns Policy<', '>Polityka Zwrotów<'],
    ['>Help Center<', '>Centrum Pomocy<'],
    ['>Call Center<', '>Infolinia<'],
    ['>Live Chat<', '>Czat na żywo<'],
    ['>My Account<', '>Moje Konto<'],

    // === LANGUAGE SWITCHER ===
    // Replace "Eng" selected text with "PL" + flag
    [
        '<a href="javascript:void(0)" class="selected-text text-white text-sm py-8">Eng</a>',
        '<a href="javascript:void(0)" class="selected-text text-white text-sm py-8 flex items-center gap-4"><img src="./images/thumbs/flag-pl.png" alt="PL" class="w-16 h-12 rounded-4"> PL</a>'
    ],
    // Remove the Japanese, French, German, Bangladesh, SK options from the switcher dropdown — replace with simple EN/PL
    // We do this by replacing the entire ul content of the language selector
    [
        `<li>
                           <a href="index-en.html"
                              class="hover-bg-gray-100 text-gray-500 text-xs py-6 px-16 flex items-center gap-8 rounded-none">
                           <img src="./images/thumbs/flag1.png" alt="Image"
                              class="w-16 h-12 rounded-4 border border-gray-100">
                           English
                           </a>
                        </li>
                        <li>
                           <a href="index.html"
                              class="hover-bg-gray-100 text-gray-500 text-xs py-6 px-16 flex items-center gap-8 rounded-none">
                           <img src="./images/thumbs/flag-pl.png" alt="PL"
                              class="w-16 h-12 rounded-4 border border-gray-100">
                           Polski
                           </a>
                        </li>`,
        `<li>
                           <a href="index-en.html"
                              class="hover-bg-gray-100 text-gray-500 text-xs py-6 px-16 flex items-center gap-8 rounded-none">
                           <img src="./images/thumbs/flag1.png" alt="EN"
                              class="w-16 h-12 rounded-4 border border-gray-100">
                           English
                           </a>
                        </li>
                        <li>
                           <a href="index.html"
                              class="hover-bg-gray-100 text-gray-500 text-xs py-6 px-16 flex items-center gap-8 rounded-none">
                           <img src="./images/thumbs/flag-pl.png" alt="PL"
                              class="w-16 h-12 rounded-4 border border-gray-100">
                           Polski
                           </a>
                        </li>`
    ],
    // Currency: Dolar americański (USD) rename simply
    ['>USD<', '>PLN<'],
    ['>Dolar amerykański<', '>Złoty<'],

    // === NAVIGATION ===
    // Mobile + Desktop nav items
    ['>Home<', '>Strona Główna<'],
    ['>Home\n                            Grocery', '>Strona główna\n                            Spożywcze'],
    ['>Home\n                            Electronics', '>Strona główna\n                            Elektronika'],
    ['>Home\n                            Fashion', '>Strona główna\n                            Moda'],
    ['>Home\n                                  Grocery', '>Strona główna\n                                  Spożywcze'],
    ['>Home\n                                  Electronics', '>Strona główna\n                                  Elektronika'],
    ['>Home\n                                  Fashion', '>Strona główna\n                                  Moda'],
    ['>Shop<', '>Sklep<'],
    ['>Shop Details<', '>Szczegóły Produktu<'],
    ['>Shop Details\n                            Two', '>Szczegóły Produktu 2'],
    ['>Shop Details\n                                  Two', '>Szczegóły Produktu 2'],
    // ['>Shop\u003c', '\u003eSklep\u003c']  -- same as above
    ['>Pages<', '>Strony<'],
    ['>Cart<', '>Koszyk<'],
    ['>Wishlist<', '>Ulubione<'],
    ['> Wishlist<', '> Ulubione<'],
    ['>Checkout <', '>Zamówienie <'],
    ['>Checkout<', '>Zamówienie<'],
    ['> Checkout <', '> Zamówienie <'],
    ['> Become\n                            Seller', '> Zostań Sprzedawcą'],
    ['> Become\n                                  Seller', '> Zostań Sprzedawcą'],
    ['>Account<', '>Konto<'],
    ['> Account<', '> Konto<'],
    ['>Vendors<', '>Dostawcy<'],
    ['> Vendors <', '> Dostawcy <'],
    ['> Vendor Details\n                            ', '> Szczegóły Dostawcy\n                            '],
    ['> Vendor Details\n                                  ', '> Szczegóły Dostawcy\n                                  '],
    ['> Vendor\n                                  Details ', '> Szczegóły Dostawcy '],
    ['> Vendors\n                            Two', '> Dostawcy Dwa'],
    ['> Vendors\n                                  Two', '> Dostawcy Dwa'],
    ['> Vendors Two\n                                  Details', '> Dostawcy Dwa - Szczegóły'],
    ['> Vendors Two\n                            Details', '> Dostawcy Dwa - Szczegóły'],
    ['>Blog<', '>Blog<'],
    ['> Blog\n                            Details', '> Szczegóły Bloga'],
    ['> Blog\n                                  Details', '> Szczegóły Bloga'],
    ['>Contact Us<', '>Kontakt<'],

    // === SEARCH ===
    ['>All Categories<', '>Wszystkie Kategorie<'],
    ['placeholder="Search for a product or brand"', 'placeholder="Szukaj produktu lub marki"'],
    ['>Your Location<', '>Twoja Lokalizacja<'],
    ['<option value="1" selected disabled>All Categories</option>', '<option value="1" selected disabled>Wszystkie Kategorie</option>'],
    // Category options
    ['<option value="1">Grocery</option>', '<option value="1">Spożywcze</option>'],
    ['<option value="1">Breakfast & Dairy</option>', '<option value="1">Śniadanie i Przetwory Mleczne</option>'],
    ['<option value="1">Vegetables</option>', '<option value="1">Warzywa</option>'],
    ['<option value="1">Milks and Dairies</option>', '<option value="1">Mleko i Nabiał</option>'],
    ['<option value="1">Pet Foods & Toy</option>', '<option value="1">Karma dla Zwierząt</option>'],
    ['<option value="1">Breads & Bakery</option>', '<option value="1">Pieczywo</option>'],
    ['<option value="1">Fresh Seafood</option>', '<option value="1">Świeże Owoce Morza</option>'],
    ['<option value="1">Fronzen Foods</option>', '<option value="1">Mrożonki</option>'],
    ['<option value="1">Noodles & Rice</option>', '<option value="1">Makaron i Ryż</option>'],
    ['<option value="1">Ice Cream</option>', '<option value="1">Lody</option>'],
    // Location options
    ['<option value="1">Alabama</option>', '<option value="1">Warszawa</option>'],
    ['<option value="1">Alaska</option>', '<option value="1">Kraków</option>'],
    ['<option value="1">Arizona</option>', '<option value="1">Wrocław</option>'],
    ['<option value="1">Delaware</option>', '<option value="1">Poznań</option>'],
    ['<option value="1">Florida</option>', '<option value="1">Gdańsk</option>'],
    ['<option value="1">Georgia</option>', '<option value="1">Łódź</option>'],
    ['<option value="1">Hawaii</option>', '<option value="1">Katowice</option>'],
    ['<option value="1">Indiana</option>', '<option value="1">Lublin</option>'],
    ['<option value="1">Marzland</option>', '<option value="1">Szczecin</option>'],
    ['<option value="1">Nevada</option>', '<option value="1">Rzeszów</option>'],
    ['<option value="1">New Jersey</option>', '<option value="1">Bydgoszcz</option>'],
    ['<option value="1">New Mexico</option>', '<option value="1">Toruń</option>'],
    ['<option value="1">New York</option>', '<option value="1">Gdynia</option>'],

    // === HEADER MIDDLE CART/WISHLIST ===
    ['>Wishlist<', '>Ulubione<'],
    ['>Cart<', '>Koszyk<'],

    // === CATEGORY DROPDOWN ITEMS (sidebar categories) ===
    ['>Vegetables & Fruit<', '>Warzywa i Owoce<'],
    ['Vegetables &amp; Fruit', 'Warzywa i Owoce'],
    ['>Beverages<', '>Napoje<'],
    ['Beverages', 'Napoje'],
    ['>Meats & Seafood<', '>Mięso i Owoce Morza<'],
    ['Meats &amp; Seafood', 'Mięso i Owoce Morza'],
    ['>Breakfast & Dairy<', '>Śniadanie i Nabiał<'],
    ['Breakfast &amp; Dairy', 'Śniadanie i Nabiał'],
    ['>Frozen Foods<', '>Mrożonki<'],
    ['Frozen Foods', 'Mrożonki'],
    ['>Biscuits & Snacks<', '>Krakersy i Przekąski<'],
    ['Biscuits &amp; Snacks', 'Krakersy i Przekąski'],
    ['>Grocery & Staples<', '>Artykuły Spożywcze<'],
    ['Grocery &amp; Staples', 'Artykuły Spożywcze'],
    // Subcategory items
    ['Potato &amp; Tomato', 'Ziemniaki i Pomidory'],
    ['Cucumber &amp; Capsicum', 'Ogórek i Papryka'],
    ['>Leafy Vegetables<', '>Warzywa Liściaste<'],
    ['>Root Vegetables<', '>Warzywa Korzeniowe<'],
    ['Beans &amp; Okra', 'Fasola i Okra'],
    ['Cabbage &amp; Cauliflower', 'Kapusta i Kalafior'],
    ['Gourd &amp; Drumstick', 'Dynia i Banannik'],
    ['>Specialty<', '>Specjały<'],
    ['Soda &amp; Cocktail Mix', 'Napoje Gazowane i Drinki'],
    [' Sports &amp; Energy Drinks', ' Napoje Energetyczne'],
    [' Non Alcoholic Drinks', ' Napoje Bezalkoholowe'],
    [' Packaged Water ', ' Woda Butelkowana '],
    [' Spring Water', ' Woda Źródlana'],
    [' Flavoured Water ', ' Woda Smakowa '],
    [' Fresh Meat ', ' Świeże Mięso '],
    [' Frozen Meat', ' Mrożone Mięso'],
    [' Marinated Meat', ' Mięso Marynowane'],
    ['Fresh &amp; Frozen Meat', 'Świeże i Mrożone Mięso'],
    [' Oats &amp; Porridge', ' Owsianka'],
    [' Kids Cereal', ' Płatki dla Dzieci'],
    [' Muesli', ' Musli'],
    [' Flakes', ' Płatki'],
    [' Granola &amp; Cereal Bars', ' Batoniki Musli'],
    [' Instant Noodles ', ' Makaron Instant '],
    [' Instant Noodles\u003c', ' Makaron Instant\u003c'],
    [' Hakka Noodles', ' Makaron Ryżowy'],
    [' Cup Noodles', ' Zupki Chińskie'],
    [' Vermicelli', ' Wermiszel'],
    [' Instant Pasta', ' Makaron Instant'],
    [' Salted Biscuits ', ' Krakersy Słone '],
    [' Marie, Health, Digestive', ' Herbatniki i Ciastka'],
    [' Cream Biscuits &amp; Wafers ', ' Wafle i Ciastka Kremowe '],
    ['Glucose &amp; Milk biscuits', 'Ciastka Mleczne'],
    ['>Cookies<', '>Ciasteczka<'],
    ['Lemon, Ginger &amp; Garlic ', 'Cytryna, Imbir i Czosnek '],
    [' Indian &amp; Exotic Herbs', ' Zioła i Przyprawy'],
    [' Orangic Vegetables', ' Bio Warzywa'],
    ['Orangic Fruits ', 'Bio Owoce '],
    [' Orangic Dry Fruits', ' Bio Suszone Owoce'],
    [' Orangic Dals &amp; pulses', ' Bio Rośliny Strączkowe'],
    [' Orangic Millet &amp; Flours', ' Bio Kasze i Mąki'],

    // === HERO SECTION ===
    // Fix the garbled Ollama translation with correct Polish
    ['>Dziennik kupiecki<', '>Sklep Spożywczy<'],
    ['>See the sales for accelerating delivery<', '>Odkryj oferty z błyskawiczną dostawą<'],
    ['>Explore Shop<', '>Odkryj Sklep<'],
    ['>Shop Now<', '>Kup Teraz<'],
    ['> Shop Now<', '> Kup Teraz<'],
    ['>Shop now<', '>Kup Teraz<'],
    ['>Explore All<', '>Pokaż Wszystko<'],

    // === COMMON LABELS ===
    ['>New<', '>Nowość<'],
    ['>Hot<', '>Gorące<'],
    ['>Sale<', '>Promocja<'],
    ['>% Off<', '>% Zniżki<'],
    ['>Add To Cart<', '>Dodaj do Koszyka<'],
    ['>Add<', '>Dodaj<'],
    ['>Quick View<', '>Podgląd<'],
    ['>Compare<', '>Porównaj<'],
    ['>Wishlist<', '>Ulubione<'],
    ['Add To Cart', 'Dodaj do Koszyka'],

    // === PRODUCT SECTIONS ===
    ['>Daily Grocery<', '>Codzienne Zakupy<'],
    ['>Everyday Fresh Meat<', '>Codziennie Świeże Mięso<'],
    ['>Top Selling Products<', '>Najczęściej Kupowane<'],
    ['>Trending Products<', '>Trendy<'],
    ['>Recent Adding<', '>Ostatnio Dodane<'],
    ['>Top Rated Products<', '>Najwyżej Oceniane<'],

    // === DELIVERY / PROMO SECTION ===
    ['>We Delivery on Next Day from 10:00 AM to 08:00 PM<', '>Dostarczamy zamówienia następnego dnia w godzinach 10:00–20:00<'],
    ['We Delivery', 'Dostarczamy'],

    // === FOOTER ===
    ['>Customer Support<', '>Wsparcie Klienta<'],
    ['>Help Center<', '>Centrum Pomocy<'],
    ['>Contact Us<', '>Kontakt<'],
    ['>Contact<', '>Kontakt<'],
    ['>Privacy Policy<', '>Polityka Prywatności<'],
    ['>Terms & Conditions<', '>Regulamin<'],
    ['Terms &amp; Conditions', 'Regulamin'],
    ['>Refund Policy<', '>Polityka Zwrotów<'],
    ['>Accessibility<', '>Dostępność<'],
    ['>Quick Links<', '>Szybkie Linki<'],
    ['>About<', '>O Nas<'],
    ['>About Us<', '>O Nas<'],
    ['>Careers<', '>Kariera<'],
    ['>Blog<', '>Blog<'],
    ['>FAQs<', '>FAQ<'],
    ['>Sitemap<', '>Mapa Strony<'],
    ['>Newsletter<', '>Newsletter<'],
    ['>Subscribe Newsletter<', '>Zapisz Się<'],
    ['placeholder="Your email address"', 'placeholder="Twój adres e-mail"'],
    ['>Subscribe<', '>Subskrybuj<'],
    ['>Enter Email Address<', '>Wpisz Adres E-mail<'],
    ['>All Rights Reserved<', '>Wszelkie Prawa Zastrzeżone<'],
    ['>Secure Payments<', '>Bezpieczne Płatności<'],
    ['copyright', 'Prawa autorskie'],
    //  Misc
    ['>Location<', '>Lokalizacja<'],
    ['>Phone<', '>Telefon<'],
    ['>Support Line<', '>Linia Wsparcia<'],
    ['>Email<', '>E-mail<'],
    ['>Register<', '>Rejestracja<'],
    ['>Sign In<', '>Zaloguj się<'],
    ['>Log In<', '>Zaloguj się<'],
    ['>Sign Up<', '>Zarejestruj się<'],
];

function buildPolishPage() {
    const enPath = path.join(SRC, 'index-en.html');
    let content = fs.readFileSync(enPath, 'utf8');

    // Apply all dictionary translations in order
    for (const [en, pl] of TRANSLATIONS) {
        content = content.split(en).join(pl);
    }

    fs.writeFileSync(path.join(SRC, 'index.html'), content);
    console.log('✅ Built Polish index.html');
}

// ─────────────────────────────────────────────────────────────────────────────
// STEP 6: Ensure index-en.html also has the proper language switcher
//         (shows ENG as selected, but has PL button)
// ─────────────────────────────────────────────────────────────────────────────
function fixEnglishSwitcher() {
    const enPath = path.join(SRC, 'index-en.html');
    let content = fs.readFileSync(enPath, 'utf8');

    // Already has the correct links added in index-en.html by prior script — just ensure selected lang is Eng
    // Make sure the main button says "Eng" with UK flag
    content = content.replace(
        /<a href="javascript:void\(0\)" class="selected-text text-white text-sm py-8 flex items-center gap-4">.*?<\/a>/s,
        '<a href="javascript:void(0)" class="selected-text text-white text-sm py-8 flex items-center gap-4"><img src="./images/thumbs/flag1.png" alt="EN" class="w-16 h-12 rounded-4"> EN</a>'
    );

    fs.writeFileSync(enPath, content);
    console.log('✅ Fixed English switcher in index-en.html');
}

// ─────────────────────────────────────────────────────────────────────────────
// MAIN
// ─────────────────────────────────────────────────────────────────────────────
console.log('\n🚀 Starting Prescot MarketPro Transformer...\n');
copyLogos();
copyFavicon();
fixAllLogoPaths();
fixFaviconInAllHtml();
fixEnglishSwitcher();
buildPolishPage();
console.log('\n🎉 All done! Ready to rebuild.');
