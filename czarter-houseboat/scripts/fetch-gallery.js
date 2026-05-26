const fs = require('fs');
const path = require('path');
const axios = require('axios');
const cheerio = require('cheerio');
const sharp = require('sharp');

// Define the properties and their IdoBooking IDs based on verified scan
const properties = [
    { id: 'A103', idoBookingId: '1', type: 'stranda' },
    { id: 'A104', idoBookingId: '2', type: 'stranda' },
    { id: 'A105', idoBookingId: '10', type: 'stranda' },
    { id: 'A204', idoBookingId: '12', type: 'stranda' },
    { id: 'A205', idoBookingId: '13', type: 'stranda' },
    { id: 'A302', idoBookingId: '42', type: 'stranda' },
    { id: 'A305', idoBookingId: '14', type: 'stranda' },
    { id: 'A306', idoBookingId: '15', type: 'stranda' },
    { id: 'A402', idoBookingId: '16', type: 'stranda' },
    { id: 'A403', idoBookingId: '17', type: 'stranda' },
    { id: 'B102', idoBookingId: '18', type: 'stranda' },
    { id: 'B106', idoBookingId: '22', type: 'stranda' },
    { id: 'B201', idoBookingId: '39', type: 'stranda' },
    { id: 'B202', idoBookingId: '38', type: 'stranda' },
    { id: 'B304', idoBookingId: '54', type: 'stranda' }, // Tentative
    { id: 'B305', idoBookingId: '55', type: 'stranda' }, // Tentative
    { id: 'B401', idoBookingId: '23', type: 'stranda' },
    { id: 'B402', idoBookingId: '24', type: 'stranda' },
    { id: 'B404', idoBookingId: '25', type: 'stranda' },
    { id: 'C301', idoBookingId: '40', type: 'stranda' },
    { id: 'C304', idoBookingId: '30', type: 'stranda' },
    { id: 'C403', idoBookingId: '29', type: 'stranda' },
    { id: 'C404', idoBookingId: '41', type: 'stranda' },
    // Fuleda IDs - seemingly correct in original file or scan
    { id: 'parter', idoBookingId: '26', type: 'fuleda' },
    { id: 'pietro', idoBookingId: '27', type: 'fuleda' },
    { id: 'pokoje', idoBookingId: '28', type: 'pokoje_fuleda' }
];

const BASE_URL = 'https://engine37851.idobooking.com';
const PUBLIC_DIR = path.join(__dirname, '../public/mazury-holiday/images');

async function fetchImages(property) {
    const url = `${BASE_URL}/index.php?module=modal-room&id=${property.idoBookingId}`;
    console.log(`Fetching ${property.id} (ID: ${property.idoBookingId})...`);

    try {
        const response = await axios.get(url, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
            }
        });
        const $ = cheerio.load(response.data);

        // Extract image URLs
        const imageUrls = [];
        // Look for images in the slider or gallery div
        // usually in <ul class="tinySlider"><li><a href="...">
        $('a[data-imagelightbox]').each((i, el) => {
            let href = $(el).attr('href');
            if (href) {
                if (href.startsWith('/')) {
                    href = BASE_URL + href;
                }
                if (!imageUrls.includes(href)) {
                    imageUrls.push(href);
                }
            }
        });

        // Fallback: look for generic images if slider not found
        if (imageUrls.length === 0) {
            $('img').each((i, el) => {
                let src = $(el).attr('src');
                if (src && src.includes('/images/objects/pictures/large')) {
                    if (src.startsWith('/')) src = BASE_URL + src;
                    if (!imageUrls.includes(src)) imageUrls.push(src);
                }
            });
        }

        console.log(`Found ${imageUrls.length} images for ${property.id}`);

        if (imageUrls.length === 0) {
            console.warn(`No images found for ${property.id} (ID: ${property.idoBookingId})`);
            return [];
        }

        // Create directory
        const dir = path.join(PUBLIC_DIR, property.type, property.id);
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }

        const savedImages = [];

        // Limit to 20 images to avoid overkill
        const limit = Math.min(imageUrls.length, 30);

        for (let i = 0; i < limit; i++) {
            const imgUrl = imageUrls[i];
            const imageName = `${property.id}_${i + 1}.webp`;
            const imagePath = path.join(dir, imageName);
            const publicPath = `/mazury-holiday/images/${property.type}/${property.id}/${imageName}`;

            // Check if exists to skip? 
            // User asked to "uzupelnij", so overwrite is safer to ensure correctness.

            try {
                const response = await axios({ url: imgUrl, responseType: 'arraybuffer' });
                await sharp(response.data)
                    .webp({ quality: 80 })
                    .toFile(imagePath);

                savedImages.push(publicPath);
                // console.log(`Saved: ${imageName}`);
            } catch (err) {
                console.error(`Failed to process image ${imgUrl}:`, err.message);
            }
        }
        console.log(`Saved ${savedImages.length} images for ${property.id}`);
        return savedImages;

    } catch (error) {
        console.error(`Error fetching property ${property.id}:`, error.message);
        return [];
    }
}

async function main() {
    const results = {};

    // Process sequentially to be nice to the server (or with small concurrency)
    for (const property of properties) {
        // Optional: Skip if already correct? No, user asked to update "all" in list.
        const images = await fetchImages(property);
        if (images.length > 0) {
            results[property.id] = {
                heroImage: images[0],
                images: images
            };
        }
    }

    // Save results to a json file
    fs.writeFileSync(path.join(__dirname, 'image_map.json'), JSON.stringify(results, null, 2));
    console.log('Done! Results saved to image_map.json');
}

main();
