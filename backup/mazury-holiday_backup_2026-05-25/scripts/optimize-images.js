#!/usr/bin/env node

/**
 * Image Optimization Script
 * Kompresuje zdjęcia zachowując wysoką jakość
 * - Konwertuje do WebP (mniejszy rozmiar, lepsza jakość niż JPG)
 * - Optymalizuje PNG i JPG
 * - Tworzy backup oryginalnych plików
 */

const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

// Konfiguracja
const CONFIG = {
    // Foldery do skanowania
    imageDirs: [
        'public/images',
        'Oferta'
    ],
    // Formaty do optymalizacji
    supportedFormats: ['.jpg', '.jpeg', '.png', '.webp'],
    // Jakość kompresji (80-90 = świetna jakość, mały rozmiar)
    quality: 85,
    // Czy tworzyć backup?
    createBackup: true,
    // Folder na backup
    backupDir: 'public/images/originals',
    // Maksymalna szerokość (dla bardzo dużych zdjęć)
    maxWidth: 1920,
    maxHeight: 1920
};

// Kolory dla konsoli
const colors = {
    reset: '\x1b[0m',
    green: '\x1b[32m',
    yellow: '\x1b[33m',
    blue: '\x1b[34m',
    red: '\x1b[31m'
};

// Statystyki
const stats = {
    processed: 0,
    skipped: 0,
    errors: 0,
    savedBytes: 0,
    originalBytes: 0
};

/**
 * Formatuje bajty do czytelnej formy
 */
function formatBytes(bytes) {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
}

/**
 * Sprawdza czy plik już jest zoptymalizowany
 */
function isAlreadyOptimized(filePath) {
    const ext = path.extname(filePath).toLowerCase();
    const backupPath = path.join(CONFIG.backupDir, path.basename(filePath));

    // Jeśli nie ma backupu, na pewno nie jest zoptymalizowany
    if (!fs.existsSync(backupPath)) return false;

    // Jeśli to JPG/PNG, sprawdź czy istnieje już WebP
    if (ext === '.jpg' || ext === '.jpeg' || ext === '.png') {
        const webpPath = filePath.replace(/\.[^.]+$/, '.webp');
        return fs.existsSync(webpPath);
    }

    return true;
}

/**
 * Optymalizuje pojedynczy plik
 */
async function optimizeImage(filePath) {
    const ext = path.extname(filePath).toLowerCase();

    if (!CONFIG.supportedFormats.includes(ext)) {
        return;
    }

    // Sprawdź czy już zoptymalizowany
    if (isAlreadyOptimized(filePath)) {
        console.log(`${colors.yellow}⏭️  Pominięto (już zoptymalizowany):${colors.reset} ${path.basename(filePath)}`);
        stats.skipped++;
        return;
    }

    try {
        const originalSize = fs.statSync(filePath).size;
        stats.originalBytes += originalSize;

        // Backup oryginalnego pliku
        if (CONFIG.createBackup) {
            const backupPath = path.join(CONFIG.backupDir, path.basename(filePath));
            if (!fs.existsSync(CONFIG.backupDir)) {
                fs.mkdirSync(CONFIG.backupDir, { recursive: true });
            }
            fs.copyFileSync(filePath, backupPath);
        }

        // Załaduj obraz
        let image = sharp(filePath);
        const metadata = await image.metadata();

        // Zmniejsz rozmiar jeśli za duży
        if (metadata.width > CONFIG.maxWidth || metadata.height > CONFIG.maxHeight) {
            image = image.resize(CONFIG.maxWidth, CONFIG.maxHeight, {
                fit: 'inside',
                withoutEnlargement: true
            });
        }

        // Optymalizuj w zależności od formatu
        if (ext === '.webp') {
            // WebP - już dobry format, tylko lekka rekompreska
            await image
                .webp({ quality: CONFIG.quality })
                .toFile(filePath + '.tmp');

            // Zastąp oryginalny plik zoptymalizowanym
            fs.unlinkSync(filePath);
            fs.renameSync(filePath + '.tmp', filePath);
        } else {
            // Inne formaty (JPG, PNG) - konwertuj do WebP (lepszy format)
            const webpPath = filePath.replace(/\.(jpg|jpeg|png)$/i, '.webp');
            await image
                .webp({ quality: CONFIG.quality })
                .toFile(webpPath);

            // Usuń stary plik, zostaw WebP
            fs.unlinkSync(filePath);

            const newSize = fs.statSync(webpPath).size;
            const saved = originalSize - newSize;
            const percent = ((saved / originalSize) * 100).toFixed(1);

            stats.savedBytes += saved;
            stats.processed++;

            console.log(`${colors.green}✅ ${path.basename(filePath)} → ${path.basename(webpPath)}${colors.reset}`);
            console.log(`   ${formatBytes(originalSize)} → ${formatBytes(newSize)} (oszczędność: ${percent}%)`);
            return;
        }

        const newSize = fs.statSync(filePath).size;
        const saved = originalSize - newSize;

        if (saved > 0) {
            const percent = ((saved / originalSize) * 100).toFixed(1);
            stats.savedBytes += saved;
            console.log(`${colors.green}✅ ${path.basename(filePath)}${colors.reset}`);
            console.log(`   ${formatBytes(originalSize)} → ${formatBytes(newSize)} (oszczędność: ${percent}%)`);
        } else {
            console.log(`${colors.blue}ℹ️  ${path.basename(filePath)} (już optymalny)${colors.reset}`);
        }

        stats.processed++;

    } catch (error) {
        console.error(`${colors.red}❌ Błąd przy ${filePath}:${colors.reset}`, error.message);
        stats.errors++;
    }
}

/**
 * Przeszukuje katalog rekurencyjnie
 */
async function processDirectory(dir) {
    if (!fs.existsSync(dir)) {
        console.log(`${colors.yellow}⚠️  Katalog nie istnieje: ${dir}${colors.reset}`);
        return;
    }

    const files = fs.readdirSync(dir);

    for (const file of files) {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);

        if (stat.isDirectory()) {
            // Pomiń folder backupów
            if (filePath !== CONFIG.backupDir) {
                await processDirectory(filePath);
            }
        } else if (stat.isFile()) {
            await optimizeImage(filePath);
        }
    }
}

/**
 * Main
 */
async function main() {
    console.log(`${colors.blue}🖼️  Optymalizacja obrazów${colors.reset}\n`);
    console.log(`Jakość: ${CONFIG.quality}%`);
    console.log(`Backup: ${CONFIG.createBackup ? 'TAK' : 'NIE'}\n`);

    const startTime = Date.now();

    for (const dir of CONFIG.imageDirs) {
        console.log(`${colors.blue}📁 Skanowanie: ${dir}${colors.reset}`);
        await processDirectory(dir);
        console.log('');
    }

    const duration = ((Date.now() - startTime) / 1000).toFixed(1);
    const totalPercent = stats.originalBytes > 0
        ? ((stats.savedBytes / stats.originalBytes) * 100).toFixed(1)
        : 0;

    console.log(`${colors.green}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${colors.reset}`);
    console.log(`${colors.green}✨ Zakończono!${colors.reset}\n`);
    console.log(`Przetworzone: ${stats.processed}`);
    console.log(`Pominięte: ${stats.skipped}`);
    console.log(`Błędy: ${stats.errors}`);
    console.log(`Zaoszczędzono: ${formatBytes(stats.savedBytes)} (${totalPercent}%)`);
    console.log(`Czas: ${duration}s`);
}

// Uruchom
main().catch(console.error);
