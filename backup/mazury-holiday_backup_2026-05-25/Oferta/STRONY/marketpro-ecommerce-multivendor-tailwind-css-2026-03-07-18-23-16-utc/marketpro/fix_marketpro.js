const fs = require('fs');
const path = require('path');
const glob = require('glob');

const srcDir = '/Users/karolbohdanowicz/my-ai-agents/mazury-holiday/Oferta/STRONY/marketpro-ecommerce-multivendor-tailwind-css-2026-03-07-18-23-16-utc/marketpro/src';

const dictionary = [
    // Switcher HTML overrides
    [
        '<a href="javascript:void(0)" class="selected-text text-white text-sm py-8">Eng</a>',
        '<a href="javascript:void(0)" class="selected-text text-white text-sm py-8 flex items-center gap-4"><img src="./images/thumbs/flag-pl.png" alt="PL" class="w-16 h-12 rounded-4 border border-gray-100"> PL</a>'
    ],
    [
        `<li>
                           <a href="javascript:void(0)"
                              class="hover-bg-gray-100 text-gray-500 text-xs py-6 px-16 flex items-center gap-8 rounded-none">
                           <img src="./images/thumbs/flag1.png" alt="Image"
                              class="w-16 h-12 rounded-4 border border-gray-100">
                           English
                           </a>
                        </li>`,
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
                        </li>`
    ],
    // Words and short phrases
    ['>Become A Seller<', '>Zostań Sprzedawcą<'],
    ['>About us<', '>O Nas<'],
    ['>Free Delivery<', '>Darmowa Dostawa<'],
    ['>Returns Policy<', '>Polityka Zwrotów<'],
    ['>Help Center<', '>Centrum Pomocy<'],
    ['>Call Center<', '>Infolinia<'],
    ['>Live Chat<', '>Czat na żywo<'],
    ['>My Account<', '>Moje Konto<'],
    ['>Contact Us<', '>Kontakt<'],
    ['>Contact<', '>Kontakt<'],
    ['>Home<', '>Strona Główna<'],
    ['>Shop<', '>Sklep<'],
    ['>Pages<', '>Strony<'],
    ['>Vendors<', '>Dostawcy<'],
    ['>Blog<', '>Blog<'],
    ['>Wishlist<', '>Ulubione<'],
    ['>Favorite<', '>Ulubione<'],
    ['>Compare<', '>Porównaj<'],
    ['>Cart<', '>Koszyk<'],
    ['>All Categories<', '>Wszystkie Kategorie<'],
    ['>Categories<', '>Kategorie<'],
    ['>New<', '>Nowość<'],
    ['>Daily Grocery<', '>Artykuły Spożywcze<'],
    ['>Everyday Fresh Meat<', '>Codziennie Świeże Mięso<'],
    ['>See the sales for accelerating delivery<', '>Odkryj wyprzedaż i natychmiastową dostawę<'],
    ['>Explore Shop<', '>Odwiedź Sklep<'],
    ['>Shop Now<', '>Kup Teraz<'],
    ['>Explore All<', '>Pokaż Wszystkie<'],
    ['>Top Selling Products<', '>Najczęściej Kupowane<'],
    ['>Trending Products<', '>Trendy<'],
    ['>Recent Adding<', '>Ostatnio Dodane<'],
    ['>Top Rated Products<', '>Najwyżej Oceniane<'],
    ['Add To Cart', 'Dodaj Do Koszyka'], // button text
    ['>Add<', '>Dodaj<'],
    ['>We Delivery on Next Day from 10:00 AM to 08:00 PM<', '>Dostarczamy Twoje zamówienia następnego dnia między 10:00 a 20:00<'],
    ['>Subscribe Newsletter<', '>Zapisz się do newslettera<'],
    ['>Subscribe<', '>Subskrybuj<'],
    ['placeholder="Search for a product or brand"', 'placeholder="Szukaj produktu lub marki"'],
    ['placeholder="Your email address"', 'placeholder="Twój adres e-mail"'],
    ['>Your Location<', '>Twoja Lokalizacja<'],
];

function fixLogos(content) {
    // Both regex to catch various patterns of logo issues
    return content.replace(/images\/logo\/prescot-logo/g, 'images/prescot-logo');
}

function run() {
    // 1. First, fix all logos in all html files
    const htmlFiles = glob.sync(`${srcDir}/*.html`);
    for (const file of htmlFiles) {
        let content = fs.readFileSync(file, 'utf8');
        let newContent = fixLogos(content);
        if (content !== newContent) {
            fs.writeFileSync(file, newContent);
            console.log(`Fixed logos in ${path.basename(file)}`);
        }
    }

    // 2. Restore index.html from index-en.html if it exists, otherwise backup index.html to index-en.html
    const indexFile = `${srcDir}/index.html`;
    const engFile = `${srcDir}/index-en.html`;

    if (!fs.existsSync(engFile)) {
        fs.copyFileSync(indexFile, engFile);
        console.log('Backed up index.html to index-en.html');
    }

    let plContent = fs.readFileSync(engFile, 'utf8');

    // Make sure English file has correct logo as well
    let engContent = fixLogos(plContent);
    fs.writeFileSync(engFile, engContent);
    plContent = engContent; // Start from clean English text for Polish translation

    // Apply translations
    for (const [en, pl] of dictionary) {
        // we use split and join to replace all occurrences
        plContent = plContent.split(en).join(pl);
    }

    // Do some case-insensitive replacements for "Categories" which appears differently formatted
    plContent = plContent.replace(/>\s*Categories\s*</g, '> Kategorie <');

    fs.writeFileSync(indexFile, plContent);
    console.log('Successfully generated Polish index.html from index-en.html!');
}

run();
