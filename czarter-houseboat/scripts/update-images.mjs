import axios from 'axios';
import * as cheerio from 'cheerio';
import fs from 'fs';
import path from 'path';
import sharp from 'sharp';
import https from 'https';

// Base URL for iDoBooking
const BASE_URL = 'https://engine37851.idobooking.com';
const MAIN_PAGE_URL = `${BASE_URL}/index.php`;

// Absolute paths
const ROOT_DIR = '/Users/karolbohdanowicz/my-ai-agents/mazury-holiday';
const STRANDA_DATA_FILE = path.join(ROOT_DIR, 'src/data/stranda-apartments.ts');
const IMAGES_DIR = path.join(ROOT_DIR, 'public/images/stranda');

// Create an HTTPS agent to handle keep-alive and verify certs
const agent = new https.Agent({ keepAlive: true });
const axiosInstance = axios.create({
    httpsAgent: agent,
    headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
    }
});

// Helper: Download image as buffer
async function downloadImage(url) {
    try {
        const response = await axiosInstance.get(url, { responseType: 'arraybuffer' });
        return response.data;
    } catch (error) {
        console.error(`Failed to download ${url}: ${error.message}`);
        return null;
    }
}

// Helper: Convert buffer to WebP file
async function processImage(buffer, outputPath) {
    try {
        await sharp(buffer)
            .webp({ quality: 80 })
            .toFile(outputPath);
        return true;
    } catch (error) {
        console.error(`Failed to process image: ${error.message}`);
        return false;
    }
}

async function run() {
    console.log('Starting image update process...');

    let apartmentMap = {
        // Hardcoded map based on browser inspection & stranda-apartments.ts patterns
        'A103': '1',
        'A104': '2',
        'A105': '10',
        'A204': '12',
        'A205': '13',
        'A302': '42',
        'A305': '14',
        'A306': '15',
        'A402': '17', // Deduced
        'A403': '17', // Deduced 
        'B102': '18',
        'B103': '19', // Deduced
        'B201': '38', // Deduced from B202 being 38? No, let's trust scraping if possible.
        'B202': '38',
        'B304': '22', // Deduced
        'B305': '23',
        'B401': '23',
        'B402': '24',
        'B404': '25',
        'C301': '40',
        'C304': '30',
        'C403': '46', // Deduced
        'C404': '41'
    };

    // Try scraping to enrich/override map with live data
    try {
        console.log(`Fetching main page to verify IDs: ${MAIN_PAGE_URL}`);
        const mainResponse = await axiosInstance.get(MAIN_PAGE_URL);
        const $main = cheerio.load(mainResponse.data);

        let scrapedCount = 0;
        $main('.room-item, .item').each((_, el) => {
            const name = $main(el).find('.room-name-h2, .room-name-container, h2').text().trim();
            let id = $main(el).attr('data-id') || $main(el).attr('id')?.replace('room_', '');

            if (!id) {
                const link = $main(el).find('a[href*="modal-room"]').attr('href');
                if (link) {
                    const match = link.match(/id=(\d+)/);
                    if (match) id = match[1];
                }
            }

            if (name && id) {
                const codeMatch = name.match(/\b([ABC]\d{3})\b/);
                if (codeMatch) {
                    if (apartmentMap[codeMatch[1]] !== id) {
                        // console.log(`Scraped update: ${codeMatch[1]} -> ${id}`);
                    }
                    apartmentMap[codeMatch[1]] = id;
                    scrapedCount++;
                }
            }
        });
        console.log(`Scraped IDs for ${scrapedCount} apartments.`);
    } catch (e) {
        console.warn("Scraping main page failed, using hardcoded map only.");
    }

    // Read existing TS file
    let fileContent = fs.readFileSync(STRANDA_DATA_FILE, 'utf-8');

    // Process unique IDs only (avoid duplicate work if map has duplicates)
    // Actually, map keys are unique (Apartment Codes).

    for (const [code, id] of Object.entries(apartmentMap)) {
        if (!fileContent.includes(`'${code}':`)) {
            // console.warn(`Apartment ${code} not in stranda-apartments.ts. Skipping.`);
            continue;
        }

        console.log(`\nProcessing ${code} (ID: ${id})...`);

        // Create directory
        const targetDir = path.join(IMAGES_DIR, `${code}_images`);
        if (!fs.existsSync(targetDir)) {
            fs.mkdirSync(targetDir, { recursive: true });
        }

        // Fetch detail page
        const detailUrl = `${BASE_URL}/index.php?module=modal-room&id=${id}`;

        let imageUrls = [];
        try {
            const detailRes = await axiosInstance.get(detailUrl);
            const $ = cheerio.load(detailRes.data); // Use $ for local context

            // Extract images
            // Try standard gallery links
            $('a[data-fancybox="gallery"], .gallery-item a').each((_, el) => {
                const url = $(el).attr('href');
                if (url && !imageUrls.includes(url)) imageUrls.push(url);
            });

            // Fallback: search Scripts for 'big' images
            if (imageUrls.length === 0) {
                const scripts = $('script').map((i, el) => $(el).html()).get().join('\n');
                const matches = scripts.match(/https?:\/\/[^"']+\/big\/[^"']+\.(jpg|jpeg|png)/g);
                if (matches) {
                    matches.forEach(m => {
                        if (!imageUrls.includes(m)) imageUrls.push(m);
                    });
                }
            }
        } catch (e) {
            console.error(`Failed to fetch details for ${code}: ${e.message}`);
            continue;
        }

        // Normalize URLs
        imageUrls = imageUrls.map(url => url.startsWith('http') ? url : `${BASE_URL}${url.startsWith('/') ? '' : '/'}${url}`);

        if (imageUrls.length === 0) {
            console.warn(`No images found for ${code}.`);
            continue;
        }

        console.log(`Found ${imageUrls.length} images.`);

        // Download and convert
        const newWebpPaths = [];
        let heroImagePath = '';

        // Process all images found
        for (let i = 0; i < imageUrls.length; i++) {
            const url = imageUrls[i];
            // Use a clean, consistent naming scheme
            const filename = `img_${code}_${i + 1}.webp`;
            const absolutePath = path.join(targetDir, filename);
            // Use relative path for the app
            const webPath = `/mazury-holiday/images/stranda/${code}_images/${filename}`;

            process.stdout.write(`.`); // progress dot
            try {
                const buffer = await downloadImage(url);
                if (buffer) {
                    const success = await processImage(buffer, absolutePath);
                    if (success) {
                        newWebpPaths.push(webPath);
                        if (i === 0) heroImagePath = webPath;
                    }
                }
            } catch (err) {
                // ignore
            }
        }
        console.log(" Done.");

        if (newWebpPaths.length === 0) continue;

        // Construct new gallery object string
        const newGalleryContent = `gallery: {
            "heroImage": "${heroImagePath}",
            "images": [
${newWebpPaths.map(p => `                        "${p}"`).join(',\n')}
            ]
}`;

        // Replace in file content
        const apartmentStartRegex = new RegExp(`'${code}':\\s*\\{[\\s\\S]*?`, 'g');
        let matchCheck = apartmentStartRegex.exec(fileContent);
        // Reset regular expression index because we're using it in a loop on potentially modified content?
        // Actually, safer to just use string indexOf.

        const apKeyIndex = fileContent.indexOf(`'${code}':`);

        if (apKeyIndex !== -1) {
            const galleryStartIndex = fileContent.indexOf('gallery: {', apKeyIndex);

            if (galleryStartIndex !== -1) {
                let braceCount = 1;
                let currentIndex = galleryStartIndex + 'gallery: {'.length;
                while (braceCount > 0 && currentIndex < fileContent.length) {
                    if (fileContent[currentIndex] === '{') braceCount++;
                    else if (fileContent[currentIndex] === '}') braceCount--;
                    currentIndex++;
                }
                const galleryEnd = currentIndex;

                const before = fileContent.substring(0, galleryStartIndex);
                const after = fileContent.substring(galleryEnd);
                fileContent = before + newGalleryContent + after;
            }
        }
    }

    // 4. Write back to file
    fs.writeFileSync(STRANDA_DATA_FILE, fileContent);
    console.log('Successfully updated stranda-apartments.ts');
}

run();
