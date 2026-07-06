const fs = require('fs');
const files = [
  'src/app/(desktop)/poznaj/page.tsx',
  'src/app/(mobile)/mobile/page.tsx',
  'src/app/(desktop)/kontakt/page.tsx'
];

for (const f of files) {
  if (fs.existsSync(f)) {
    let content = fs.readFileSync(f, 'utf-8');
    content = content.replace(/faqQ(\d+)/g, 'faq$1Q');
    content = content.replace(/faqA(\d+)/g, 'faq$1A');
    fs.writeFileSync(f, content, 'utf-8');
  }
}
console.log("Fixed faq keys in files");
