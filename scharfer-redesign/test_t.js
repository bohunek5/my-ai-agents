const fs = require('fs');
const content = fs.readFileSync('src/data/scharferData.ts', 'utf-8');

// just extract the object
const transStr = content.split('export const translations = ')[1].split(';')[0];
// Use eval to load it, but we have to replace typescript types if any. 
// It's mostly just a JS object.
let translations;
eval('translations = ' + transStr);

const lang = 'lt';
const t = (key) => {
    const dict = translations[lang] || translations['pl'];
    return dict[key] || translations['pl'][key] || key;
};

console.log("feature1Title:", t('feature1Title'));
console.log("techNoComp:", t('techNoComp'));
console.log("diagramTitle:", t('diagramTitle'));

