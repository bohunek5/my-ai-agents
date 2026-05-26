const fs = require('fs');

let content = fs.readFileSync('src/lib/translations.ts', 'utf8');

const regexMap = {
    'hero.bookOnlineBtn': { en: 'Book Online', de: 'Online Buchen' },
    'skorupki.bookBtn': { en: 'Book Stay', de: 'Aufenthalt Buchen' },
    'fuledaPage.bookBtn': { en: 'Book Stay', de: 'Aufenthalt Buchen' },
    'skorupki.expandGallery': { en: 'See more photos', de: 'Mehr Fotos ansehen' },
    'skorupki.collapseGallery': { en: 'Collapse gallery', de: 'Galerie einklappen' },
    'fuledaPage.expandGallery': { en: 'See more photos', de: 'Mehr Fotos ansehen' },
    'fuledaPage.collapseGallery': { en: 'Collapse gallery', de: 'Galerie einklappen' },
    'kisajnoPage.expandGallery': { en: 'See more photos', de: 'Mehr Fotos ansehen' },
    'kisajnoPage.collapseGallery': { en: 'Collapse gallery', de: 'Galerie einklappen' },
    'kisajnoPage.bookBtn': { en: 'Book Stay', de: 'Aufenthalt Buchen' },
    'stranda.expandGallery': { en: 'See more photos', de: 'Mehr Fotos ansehen' },
    'stranda.collapseGallery': { en: 'Collapse gallery', de: 'Galerie einklappen' },
    'stranda.bookBtn': { en: 'Book Stay', de: 'Aufenthalt Buchen' },
    'mikolajkiPage.bookBtn': { en: 'Book Stay', de: 'Aufenthalt Buchen' },
    'details.bookBtn': { en: 'Book Stay', de: 'Aufenthalt Buchen' },
    'details.expandGallery': { en: 'See more photos', de: 'Mehr Fotos ansehen' },
    'details.collapseGallery': { en: 'Collapse gallery', de: 'Galerie einklappen' },
};

// We will literally just inject these using string replacements or ast

const ts = require('typescript');
const sourceFile = ts.createSourceFile('translations.ts', content, ts.ScriptTarget.Latest, true);

// Or even simpler: let's dump the content, edit it in Python.
