const scrape = require('website-scraper').default;

const site = 'https://gomarplus.pl/';

const options = {
    urls: [site],
    directory: '/Users/karolbohdanowicz/my-ai-agents/gomarplus-backup-full',
    recursive: true,
    maxRecursiveDepth: null, // Scrape indefinitely
    maxDepth: null,          // Infinite depth
    request: {
        headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
        }
    },
    urlFilter: function (url) {
        if (url.startsWith('https://gomarplus.pl') || url.startsWith('http://gomarplus.pl')) {
            return true;
        }
        // Still want to allow google fonts, jsdelivr, etc ? 
        // Usually standard website scraper only follows HTML links if urlFilter returns true.
        // So if you reject an external domain, it won't be downloaded.
        return false;
    }
};

class SaveExternalAssetsPlugin {
    apply(registerAction) {
        registerAction('afterResponse', async ({ response }) => {
            return response;
        });
        registerAction('beforeRequest', async ({ resource, requestOptions }) => {
            // Let it request everything
            return { requestOptions };
        });
    }
}

options.plugins = [];

console.log(`Starting to full scrape ${site}... this might take a while`);
scrape(options).then((result) => {
    console.log("Successfully downloaded site end to end.");
}).catch((err) => {
    console.error("Error downloading site", err);
});
