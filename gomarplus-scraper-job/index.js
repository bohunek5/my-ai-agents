const scrape = require('website-scraper').default;

const site = 'https://gomarplus.pl/';

const options = {
    urls: [site],
    directory: '/Users/karolbohdanowicz/my-ai-agents/gomarplus-backup',
    recursive: true,
    maxRecursiveDepth: 3,
    request: {
        headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
        }
    }
};

console.log(`Starting to scrape ${site}...`);
scrape(options).then((result) => {
    console.log("Successfully downloaded site");
}).catch((err) => {
    console.error("Error downloading site", err);
});
