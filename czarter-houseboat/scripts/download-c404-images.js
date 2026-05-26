const fs = require('fs');
const path = require('path');
const https = require('https');
const sharp = require('sharp');

const imageUrls = [
    "https://engine37851.idobooking.com/images/objects/pictures/large/1/4/836.jpg",
    "https://engine37851.idobooking.com/images/objects/pictures/large/1/4/567.jpg",
    "https://engine37851.idobooking.com/images/objects/pictures/large/1/4/832.jpg",
    "https://engine37851.idobooking.com/images/objects/pictures/large/1/4/555.jpg",
    "https://engine37851.idobooking.com/images/objects/pictures/large/1/4/556.jpg",
    "https://engine37851.idobooking.com/images/objects/pictures/large/1/4/561.jpg",
    "https://engine37851.idobooking.com/images/objects/pictures/large/1/4/562.jpg",
    "https://engine37851.idobooking.com/images/objects/pictures/large/1/4/563.jpg",
    "https://engine37851.idobooking.com/images/objects/pictures/large/1/4/565.jpg",
    "https://engine37851.idobooking.com/images/objects/pictures/large/1/4/568.jpg",
    "https://engine37851.idobooking.com/images/objects/pictures/large/1/4/823.jpg",
    "https://engine37851.idobooking.com/images/objects/pictures/large/1/4/824.jpg",
    "https://engine37851.idobooking.com/images/objects/pictures/large/1/4/825.jpg",
    "https://engine37851.idobooking.com/images/objects/pictures/large/1/4/827.jpg",
    "https://engine37851.idobooking.com/images/objects/pictures/large/1/4/826.jpg",
    "https://engine37851.idobooking.com/images/objects/pictures/large/1/4/828.jpg",
    "https://engine37851.idobooking.com/images/objects/pictures/large/1/4/829.jpg",
    "https://engine37851.idobooking.com/images/objects/pictures/large/1/4/830.jpg",
    "https://engine37851.idobooking.com/images/objects/pictures/large/1/4/831.jpg",
    "https://engine37851.idobooking.com/images/objects/pictures/large/1/4/833.jpg",
    "https://engine37851.idobooking.com/images/objects/pictures/large/1/4/834.jpg"
];

const outputDir = path.join(__dirname, '..', 'public', 'images', 'stranda', 'C404');

if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
}

async function downloadAndConvert() {
    const paths = [];
    for (let i = 0; i < imageUrls.length; i++) {
        const url = imageUrls[i];
        const filename = `C404_${i + 1}.webp`;
        const outputPath = path.join(outputDir, filename);

        console.log(`Downloading ${url}...`);

        try {
            const buffer = await new Promise((resolve, reject) => {
                https.get(url, (res) => {
                    if (res.statusCode !== 200) {
                        reject(new Error(`Failed to download ${url}: Status ${res.statusCode}`));
                        return;
                    }
                    const data = [];
                    res.on('data', (chunk) => data.push(chunk));
                    res.on('end', () => resolve(Buffer.concat(data)));
                    res.on('error', reject);
                });
            });

            await sharp(buffer)
                .webp({ quality: 90 })
                .toFile(outputPath);

            console.log(`Saved to ${outputPath}`);
            paths.push(`/mazury-holiday/images/stranda/C404/${filename}`);
        } catch (err) {
            console.error(`Error processing ${url}:`, err);
        }
    }

    console.log('--- ALL PATHS ---');
    console.log(JSON.stringify(paths, null, 2));
}

downloadAndConvert();
