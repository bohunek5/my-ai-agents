const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const images = [
    'public/images/stranda/B201/B201_1.webp',
    'public/images/stranda/B201/B201_19.webp',
    'public/images/stranda/B201/B201_20.webp'
];

async function rotateImage(relativePath) {
    // Resolve absolute path
    const fullPath = path.resolve(__dirname, '..', relativePath);

    try {
        if (!fs.existsSync(fullPath)) {
            console.error(`File not found: ${fullPath}`);
            return;
        }

        console.log(`Processing ${fullPath}...`);

        // Read into buffer to close file handle immediately
        const buffer = await sharp(fullPath)
            .rotate(90) // 90 degrees clockwise
            .toBuffer();

        // Write back to file
        fs.writeFileSync(fullPath, buffer);
        console.log(`Rotated ${relativePath} successfully.`);
    } catch (err) {
        console.error(`Error rotating ${relativePath}:`, err);
    }
}

async function main() {
    for (const img of images) {
        await rotateImage(img);
    }
}

main();
