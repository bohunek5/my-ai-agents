const scrape = require('website-scraper').default;
const PuppeteerPlugin = require('website-scraper-puppeteer').default;

const site = 'https://gomarplus.pl/';

const options = {
    urls: [site],
    directory: '/Users/karolbohdanowicz/my-ai-agents/gomarplus-backup-headless',
    recursive: true,
    maxRecursiveDepth: null, // Scrape indefinitely
    filenameGenerator: 'bySiteStructure',
    request: {
        headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
        }
    },
    plugins: [
        new PuppeteerPlugin({
            launchOptions: {
                args: ['--no-sandbox', '--disable-setuid-sandbox'],
                ignoreHTTPSErrors: true
            },
            scrollToBottom: {
                timeout: 10000,
                viewportN: 10
            }
        })
    ]
};

console.log(`Starting headless full scrape ${site}... this might take a considerable amount of time`);
scrape(options).then((result) => {
    console.log("Successfully downloaded site end to end.");
}).catch((err) => {
    console.error("Error downloading site", err);
});
