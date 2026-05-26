const fs = require('fs');
const content = fs.readFileSync('src/lib/translations.ts', 'utf8');

// Find pl.hero
const plHeroMatch = content.match(/pl:\s*\{.*?hero:\s*\{([^}]+)\}/s);
if (plHeroMatch) console.log("PL HERO:", plHeroMatch[1]);

// Find en.hero
const enHeroMatch = content.match(/en:\s*\{.*?hero:\s*\{([^}]+)\}/s);
if (enHeroMatch) console.log("EN HERO:", enHeroMatch[1]);

// Find de.hero
const deHeroMatch = content.match(/de:\s*\{.*?hero:\s*\{([^}]+)\}/s);
if (deHeroMatch) console.log("DE HERO:", deHeroMatch[1]);

