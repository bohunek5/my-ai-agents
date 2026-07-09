#!/usr/bin/env node

const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

async function compressImage(inputPath, outputPath) {
    try {
        const info = await sharp(inputPath)
            .resize(1920, 1920, {
                fit: 'inside',
                withoutEnlargement: true
            })
            .jpeg({
                quality: 85,
                progressive: true,
                mozjpeg: true
            })
            .toFile(outputPath + '.tmp');

        // Replace original with compressed
        fs.renameSync(outputPath + '.tmp', outputPath);

        const originalSize = fs.statSync(inputPath).size;
        const newSize = info.size;
        const savings = ((originalSize - newSize) / originalSize * 100).toFixed(2);

        console.log(`✓ ${path.basename(inputPath)}: ${(originalSize / 1024 / 1024).toFixed(2)}MB → ${(newSize / 1024 / 1024).toFixed(2)}MB (${savings}% smaller)`);

        return { originalSize, newSize };
    } catch (error) {
        console.error(`✗ Error compressing ${inputPath}:`, error.message);
        return null;
    }
}

async function compressDirectory(directory) {
    const files = fs.readdirSync(directory);
    let totalOriginal = 0;
    let totalNew = 0;

    for (const file of files) {
        const filePath = path.join(directory, file);
        const stat = fs.statSync(filePath);

        if (stat.isDirectory()) {
            const result = await compressDirectory(filePath);
            totalOriginal += result.totalOriginal;
            totalNew += result.totalNew;
        } else if (/\.(jpg|jpeg|png)$/i.test(file)) {
            const result = await compressImage(filePath, filePath);
            if (result) {
                totalOriginal += result.originalSize;
                totalNew += result.newSize;
            }
        }
    }

    return { totalOriginal, totalNew };
}

async function main() {
    const targetDirs = [
        path.join(__dirname, '../public/images'),
        path.join(__dirname, '../public/apartments')
    ];

    console.log('🖼️  Starting image compression...\n');

    let totalOriginal = 0;
    let totalNew = 0;

    for (const dir of targetDirs) {
        if (fs.existsSync(dir)) {
            console.log(`📂 Processing: ${path.basename(dir)}`);
            const result = await compressDirectory(dir);
            totalOriginal += result.totalOriginal;
            totalNew += result.totalNew;
        }
    }

    const totalSavings = ((totalOriginal - totalNew) / totalOriginal * 100).toFixed(2);

    console.log('\n✅ Compression complete!');
    console.log(`📊 Total: ${(result.totalOriginal / 1024 / 1024).toFixed(2)}MB → ${(result.totalNew / 1024 / 1024).toFixed(2)}MB`);
    console.log(`💾 Saved: ${((result.totalOriginal - result.totalNew) / 1024 / 1024).toFixed(2)}MB (${totalSavings}%)`);
}

main().catch(console.error);
