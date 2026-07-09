const axios = require('axios');
const fs = require('fs');

async function debugId(id) {
    const url = `https://engine37851.idobooking.com/index.php?module=modal-room&id=${id}`;
    console.log(`Fetching ${url}...`);
    try {
        const res = await axios.get(url, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
            }
        });
        console.log(`Status: ${res.status}`);
        fs.writeFileSync(`debug_id_${id}.html`, res.data);
        // Print title snippet
        const titleMatch = res.data.match(/<h[1-4][^>]*>(.*?)<\/h[1-4]>/i) || res.data.match(/class="modal-title"[^>]*>(.*?)<\/div>/i);
        if (titleMatch) {
            console.log(`Title for ${id}: ${titleMatch[1].trim()}`);
        } else {
            console.log(`No title found for ${id}`);
        }

        // Print description snippet to identify property
        const descMatch = res.data.match(/<div class="room-descr">([\s\S]*?)<\/div>/i);
        if (descMatch) {
            console.log(`Desc snippet for ${id}: ${descMatch[1].replace(/<[^>]+>/g, '').substring(0, 100).trim()}...`);
        }

    } catch (err) {
        console.error(`Error: ${err.message}`);
    }
}

// Check potential B304/B305 candidates
(async () => {
    await debugId(54);
    await debugId(55);
    await debugId(43);
    await debugId(44);
})();
