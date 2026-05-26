const axios = require('axios');
const cheerio = require('cheerio');

const BASE_URL = 'https://engine37851.idobooking.com/index.php?module=modal-room&id=';

async function scanIds() {
    const limit = 200; // Check IDs 1 to 200
    const concurrency = 20;

    for (let i = 1; i <= limit; i += concurrency) {
        const promises = [];
        for (let j = 0; j < concurrency; j++) {
            const id = i + j;
            if (id > limit) break;
            promises.push(checkId(id));
        }
        await Promise.all(promises);
    }
}

async function checkId(id) {
    try {
        const res = await axios.get(BASE_URL + id, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
            },
            timeout: 5000
        });

        const $ = cheerio.load(res.data);
        // Try multiple selectors for title
        let title = $('h1').text().trim() ||
            $('h2').text().trim() ||
            $('h3').text().trim() ||
            $('h4').text().trim() ||
            $('.modal-title').text().trim() ||
            $('.room_name').text().trim();

        if (title && !title.includes('przykładowa oferta')) {
            // Clean up title for better matching
            const cleanTitle = title.replace(/\s+/g, ' ');
            // We are looking for specific apartments
            if (cleanTitle.includes('A104') ||
                cleanTitle.includes('B304') ||
                cleanTitle.includes('B305') ||
                cleanTitle.includes('S4') || // Maybe Stranda 4?
                cleanTitle.includes('S5')
            ) {
                console.log(`MATCH FOUND -> ID ${id}: "${cleanTitle}"`);
            } else {
                if (id < 60) {
                    console.log(`ID ${id}: "${cleanTitle}"`); // Log all small IDs to be safe
                }
            }
        }
    } catch (err) {
        // console.log(`ID ${id}: Error ${err.message}`);
    }
}

scanIds();
