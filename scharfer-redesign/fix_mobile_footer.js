const fs = require('fs');
const file = 'src/app/(mobile)/mobile/page.tsx';
let content = fs.readFileSync(file, 'utf8');

// Replace the span with links
content = content.replace(
  /<span onClick=\{onOpenRegulamin\} style=\{\{ color: '#9ca3af', fontSize: '0.78rem', fontWeight: 600, cursor: 'pointer', textDecoration: 'underline' \}\}>Regulamin<\/span>/g,
  '<a href="/regulamin" style={{ color: "#9ca3af", fontSize: "0.78rem", fontWeight: 600, textDecoration: "underline" }}>Regulamin</a>'
);
content = content.replace(
  /<span onClick=\{onOpenRodo\} style=\{\{ color: '#9ca3af', fontSize: '0.78rem', fontWeight: 600, cursor: 'pointer', textDecoration: 'underline' \}\}>RODO<\/span>/g,
  '<a href="/rodo" style={{ color: "#9ca3af", fontSize: "0.78rem", fontWeight: 600, textDecoration: "underline" }}>RODO</a>'
);

// Remove the modals block
content = content.replace(/\{\/\* Mobile Regulamin Modal \*\/\}.*?(?=\{\/\* Mobile Footer \*\/\})/s, '');

// The Mobile Footer comment might not be there, let's use a simpler replace
content = content.replace(/\{\/\* Mobile Regulamin Modal \*\/\}.*?\}\s*\)\s*\}/s, '  </div>\n  );\n}');

fs.writeFileSync(file, content);
