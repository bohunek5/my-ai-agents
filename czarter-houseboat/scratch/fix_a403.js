const fs = require('fs');

// Fix stranda-apartments.ts
let content = fs.readFileSync('src/data/stranda-apartments.ts', 'utf8');

// The B404 gallery and idobooking id needs to be moved to A403.
const b404Regex = /'B404': \{[\s\S]*?icalUrl:[^\n]*\n    \},/g;
const b404Match = content.match(b404Regex);
if (b404Match) {
    content = content.replace(b404Regex, '');
}

const galleryAndIdo = `gallery: {
            heroImage: getAssetPath("/images/stranda/ido_25_1.jpg"),
            images: [
                getAssetPath("/images/stranda/ido_25_1.jpg"),
                getAssetPath("/images/stranda/ido_25_2.jpg"),
                getAssetPath("/images/stranda/ido_25_3.jpg"),
                getAssetPath("/images/stranda/ido_25_4.jpg"),
                getAssetPath("/images/stranda/ido_25_5.jpg"),
                getAssetPath("/images/stranda/ido_25_6.jpg"),
                getAssetPath("/images/stranda/ido_25_7.jpg"),
                getAssetPath("/images/stranda/ido_25_8.jpg"),
                getAssetPath("/images/stranda/ido_25_9.jpg"),
                getAssetPath("/images/stranda/ido_25_10.jpg"),
                getAssetPath("/images/stranda/ido_25_11.jpg"),
                getAssetPath("/images/stranda/ido_25_12.jpg"),
                getAssetPath("/images/stranda/ido_25_13.jpg"),
                getAssetPath("/images/stranda/ido_25_14.jpg"),
                getAssetPath("/images/stranda/ido_25_15.jpg"),
                getAssetPath("/images/stranda/ido_25_16.jpg"),
                getAssetPath("/images/stranda/ido_25_17.jpg"),
                getAssetPath("/images/stranda/ido_25_18.jpg"),
                getAssetPath("/images/stranda/ido_25_19.jpg"),
                getAssetPath("/images/stranda/ido_25_20.jpg")
            ]
        },
        idoBookingId: '25',
        icalUrl: 'https://client37851.idosell.com/panel/offer/icalexport/itemid/25/key/da39a3ee5e6b4b0d3255bfef95601890afd80709'`;

const a403Regex = /(gallery:\s*\{[\s\S]*?images:\s*\[[\s\S]*?\]\n\s*\},(?:[\s\S]*?idoBookingId:\s*'[^']*',\s*\n)?\s*icalUrl:\s*'[^']*')/;
content = content.replace(a403Regex, galleryAndIdo);

fs.writeFileSync('src/data/stranda-apartments.ts', content, 'utf8');

// Fix translations.ts
let transContent = fs.readFileSync('src/lib/translations.ts', 'utf8');
transContent = transContent.replace(/\s*B404:\s*"[^"]*",/g, '');
fs.writeFileSync('src/lib/translations.ts', transContent, 'utf8');

console.log("Fixed A403 and removed B404");
