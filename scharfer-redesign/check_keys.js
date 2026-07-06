const fs = require('fs');
const ts = fs.readFileSync('src/data/scharferData.ts', 'utf-8');

function extractKeys(lang) {
    const startIdx = ts.indexOf(`${lang}: {`);
    if (startIdx === -1) return [];
    
    let depth = 0;
    let endIdx = -1;
    for (let i = startIdx + lang.length + 2; i < ts.length; i++) {
        if (ts[i] === '{') depth++;
        if (ts[i] === '}') {
            depth--;
            if (depth === 0) {
                endIdx = i;
                break;
            }
        }
    }
    const block = ts.substring(startIdx, endIdx);
    return Array.from(block.matchAll(/([a-zA-Z0-9_]+)\s*:/g)).map(m => m[1]);
}

const plKeys = extractKeys('pl');
const enKeys = extractKeys('en');

const missingInPl = enKeys.filter(k => !plKeys.includes(k));
console.log("Missing in PL:", missingInPl);
