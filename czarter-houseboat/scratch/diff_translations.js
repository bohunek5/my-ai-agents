const fs = require('fs');
const ts = require('typescript');

const content = fs.readFileSync('src/lib/translations.ts', 'utf-8');
// This is complex, let's just use regex to extract the JSON-like structure or run it via esbuild to evaluate.
