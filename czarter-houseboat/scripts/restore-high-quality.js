const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const ORIGINALS_DIR = 'public/images/originals';
const TARGET_DIR = 'public/images';
const QUALITY = 90;
const MAX_WIDTH = 3840; // 4K quality for headers

async function restore() {
    if (!fs.existsSync(ORIGINALS_DIR)) return;

    const files = fs.readdirSync(ORIGINALS_DIR);
    for (const file of files) {
        const ext = path.extname(file).toLowerCase();
        if (['.jpg', '.jpeg', '.png'].includes(ext)) {
            const sourcePath = path.join(ORIGINALS_DIR, file);
            const targetPath = path.join(TARGET_DIR, file.replace(/\.(jpg|jpeg|png)$/i, '.webp'));

            console.log(`Processing ${file}...`);
            await sharp(sourcePath)
                .webp({ quality: QUALITY, effort: 6 })
                .resize(MAX_WIDTH, null, { withoutEnlargement: true, fit: 'inside' })
                .toFile(targetPath);
            console.log(`Saved high-quality webp to ${targetPath}`);
        }
    }
}

restore().then(() => console.log('Restore complete'));
