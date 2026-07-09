const scrape = require('website-scraper').default;

const options = {
  urls: ['https://sternicy.com/'],
  directory: '/Users/karolbohdanowicz/my-ai-agents/scratch/sternicy_scrape_dir',
  recursive: true,
  maxRecursiveDepth: 3,
  request: {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36'
    }
  }
};

console.log("Starting scrape...");
scrape(options).then((result) => {
    console.log("Scraping completed.");
}).catch((err) => {
    console.error("Error scraping:", err);
});
