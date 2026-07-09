const fs = require('fs');
const path = require('path');

const targetFile = path.join(__dirname, '../src/data/stranda-apartments.ts');

let content = fs.readFileSync(targetFile, 'utf8');

// Extract B402 gallery
const b402Match = content.match(/'B402':\s*\{[\s\S]*?(gallery:\s*\{[\s\S]*?\})/);
if (!b402Match) {
    console.error('Could not find B402 gallery');
    process.exit(1);
}
let donorGallery = b402Match[1];

// Clean up indentation if needed?
// The extracted string includes `gallery: { ... }`.

// Update B304
// Find B304 block
const b304Regex = /('B304':\s*\{[\s\S]*?)(gallery:\s*\{[\s\S]*?\})/;
const b304Match = content.match(b304Regex);

if (b304Match) {
    // b304Match[1] is content before gallery
    // b304Match[2] is the empty gallery

    // We replace valid match[2] with donorGallery
    // But we need to use string replacement on file content to be safe
    // Or just `content.replace(b304Match[0], b304Match[1] + donorGallery)`?
    // b304Match[0] is the whole block (Start...Gallery).
    // Yes.

    // Safety check: verify match[2] is indeed empty or small
    if (b304Match[2].length < 200) {
        content = content.replace(b304Match[0], b304Match[1] + donorGallery);
        console.log('Updated B304 gallery with B402 data');
    } else {
        console.warn('B304 gallery seems already populated? Skipping.');
    }
} else {
    console.warn('B304 block not found');
}

// Update B305
// Need to re-read or match on updated content?
// Regex matches on `content` string. Since B304 is before B305 or after?
// Order doesn't matter if matches are unique.
// But `content` changed.
// So I should construct regex on NEW content.

const b305Regex = /('B305':\s*\{[\s\S]*?)(gallery:\s*\{[\s\S]*?\})/;
const b305Match = content.match(b305Regex);

if (b305Match) {
    if (b305Match[2].length < 200) {
        content = content.replace(b305Match[0], b305Match[1] + donorGallery);
        console.log('Updated B305 gallery with B402 data');
    } else {
        console.warn('B305 gallery seems already populated? Skipping.');
    }
} else {
    console.warn('B305 block not found');
}

fs.writeFileSync(targetFile, content, 'utf8');
