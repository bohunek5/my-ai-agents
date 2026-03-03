const fs = require('fs');
const { glob } = require('glob');
const path = require('path');
const cheerio = require('cheerio');

const directories = [
    '/Users/karolbohdanowicz/my-ai-agents/gomarplus-backup-headless/**/*.html',
    '/Users/karolbohdanowicz/my-ai-agents/gomarplus-backup-full/**/*.html'
];

async function run() {
    for (const directory of directories) {
        const files = await glob(directory);
        let processed = 0;

        for (const file of files) {
            let html = fs.readFileSync(file, 'utf8');
            const $ = cheerio.load(html);
            let modified = false;

            // Target elements that have the problem
            $('.object-link').each((i, el) => {
                const $el = $(el);

                // Find any link within this component
                let linkObj = $el.find('a[href]').first();
                if ($el.is('a[href]')) {
                    linkObj = $el;
                }

                let link = linkObj.attr('href');

                if (link && link !== '#') {
                    // Remove object-link class since it triggers broken custom JS click interception
                    $el.removeClass('object-link');

                    // Add generic class just in case we need it later
                    $el.addClass('fixed-link-container');

                    link = link.replace(/'/g, "\\'");

                    // We simply set an inline onclick which will navigate relatively
                    $el.attr('onclick', `window.location.href='${link}'`);

                    // Make it obvious it's clickable
                    if (!$el.attr('style') || !$el.attr('style').includes('cursor:')) {
                        const style = $el.attr('style') || '';
                        $el.attr('style', style + (style && !style.endsWith(';') ? ';' : '') + 'cursor: pointer;');
                    }

                    modified = true;
                }
            });

            if (modified) {
                fs.writeFileSync(file, $.html(), 'utf8');
                processed++;
            }
        }
        console.log(`Processed and fixed links in ${processed} HTML files in ${directory}`);
    }
}

run().catch(console.error);
