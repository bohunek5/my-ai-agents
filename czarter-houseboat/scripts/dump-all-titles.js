const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');

const BASE_URL = 'https://engine37851.idobooking.com/index.php?module=modal-room&id=';

async function dumpTitles() {
    const stream = fs.createWriteStream('titles_dump.txt');
    const limit = 100; // Check likely range again
    const concurrency = 20;

    for (let i = 1; i <= limit; i += concurrency) {
        const promises = [];
        for (let j = 0; j < concurrency; j++) {
            const id = i + j;
            if (id > limit) break;
            promises.push(checkId(id, stream));
        }
        await Promise.all(promises);
    }
    stream.end();
}

async function checkId(id, stream) {
    try {
        const res = await axios.get(BASE_URL + id, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'
            },
            timeout: 5000
        });

        const $ = cheerio.load(res.data);
        let title = $('h1').text().trim() ||
            $('h2').text().trim() ||
            $('h3').text().trim() ||
            $('h4').text().trim() ||
            $('.modal-title').text().trim();

        if (title) {
            stream.write(`ID ${id}: ${title}\n`);
            // Also grab description preview to help identify
            const desc = $('.room-descr').text().replace(/\s+/g, ' ').substring(0, 100);
            stream.write(`   Desc: ${desc}\n`);
        }
    } catch (err) {
        // ignore
    }
}

dumpTitles();
