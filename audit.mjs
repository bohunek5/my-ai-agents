import fs from 'fs';
import path from 'path';

const dataDir = path.join(process.cwd(), 'src/data');
const files = fs.readdirSync(dataDir).filter(f => f.endsWith('.ts') && f !== 'mock-data.ts' && !f.includes('reviews'));

console.log("=== AUDIT LOKALIZACJI ===");

let hasErrors = false;

for (const file of files) {
  const content = fs.readFileSync(path.join(dataDir, file), 'utf8');
  
  // Extract apartment definitions (roughly) by matching block structures.
  // Since they are TS objects, let's use some regexes to check presence.
  
  console.log(`\n📄 File: ${file}`);
  
  // Check idoBookingId
  const idoMatches = [...content.matchAll(/idoBookingId:\s*['"]([^'"]+)['"]/g)];
  if (idoMatches.length === 0) {
    console.log("  ❌ Brak idoBookingId");
    hasErrors = true;
  } else {
    console.log(`  ✅ idoBookingId: ${idoMatches.map(m => m[1]).join(', ')}`);
  }
  
  // Check icalUrl
  const icalMatches = [...content.matchAll(/icalUrl:\s*['"]([^'"]+)['"]/g)];
  if (icalMatches.length === 0) {
    console.log("  ❌ Brak icalUrl");
    hasErrors = true;
  } else {
    console.log(`  ✅ icalUrl: ${icalMatches.map(m => m[1].substring(0,30) + '...').join(', ')}`);
  }

  // Check duplicated images
  const srcMatches = [...content.matchAll(/src:\s*['"]([^'"]+)['"]/g)].map(m => m[1]);
  const uniqueSrcs = new Set(srcMatches);
  if (srcMatches.length !== uniqueSrcs.size) {
    console.log(`  ❌ Zduplikowane zdjęcia! (Total: ${srcMatches.length}, Unique: ${uniqueSrcs.size})`);
    hasErrors = true;
    
    // find which are duplicated
    const counts = {};
    for (const src of srcMatches) {
      counts[src] = (counts[src] || 0) + 1;
    }
    for (const [src, count] of Object.entries(counts)) {
      if (count > 1) {
        console.log(`     - ${src} (x${count})`);
      }
    }
  } else if (srcMatches.length > 0) {
    console.log(`  ✅ Zdjęcia: ${srcMatches.length} (brak duplikatów)`);
  } else {
    console.log("  ⚠️ Brak zdjęć (gallery empty or missing)");
  }
}

if (!hasErrors) {
  console.log("\n🎉 Wszystko wygląda OK (brak duplikatów, kalendarze ustawione)!");
}
