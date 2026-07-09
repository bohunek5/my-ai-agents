const fs = require('fs');

const data = fs.readFileSync('src/data/stranda-apartments.ts', 'utf8');
const regex = /'([A-Z0-9]+)':\s*\{([\s\S]*?gallery:\s*\{[\s\S]*?\n\s*\})/g;
let match;
while ((match = regex.exec(data)) !== null) {
    const key = match[1];
    const content = match[2];
    if (content.toLowerCase().includes('widok na jezioro') || content.toLowerCase().includes('widokiem na jezioro')) {
        console.log(key + " HAS LAKE VIEW");
    } else {
        console.log(key + " NO VIEW");
    }
}
