const fs = require('fs');
const path = require('path');

const imageMapPath = path.join(__dirname, 'image_map.json');
const targetFile = path.join(__dirname, '../src/data/stranda-apartments.ts');
// backup already created

const imageMap = JSON.parse(fs.readFileSync(imageMapPath, 'utf8'));

// Correct ID mapping to update the file
const idMap = {
    'A103': '1',
    'A104': '2',
    'A105': '10',
    'A204': '12',
    'A205': '13',
    'A302': '42',
    'A305': '14',
    'A306': '15',
    'A402': '16',
    'A403': '17',
    'B102': '18',
    'B106': '22',
    'B201': '39',
    'B202': '38',
    'B304': '54',
    'B305': '55',
    'B401': '23',
    'B402': '24',
    'B404': '25',
    'C301': '40',
    'C304': '30',
    'C403': '29',
    'C404': '41',
    'parter': '26',
    'pietro': '27',
    'pokoje': '28'
};

let content = fs.readFileSync(targetFile, 'utf8');
const allKeys = new Set([...Object.keys(imageMap), ...Object.keys(idMap)]);

allKeys.forEach(aptId => {
    // 1. Update Gallery
    if (imageMap[aptId] && imageMap[aptId].images.length > 0) {
        // Reuse previous logic - it worked well for Gallery
        const galleryData = imageMap[aptId];
        const newImages = galleryData.images.map(img => `                "${img}"`).join(',\n');

        const galleryString = `gallery: {
            "heroImage": "${galleryData.heroImage}",
            "images": [
${newImages}
            ]
        }`;

        const startRegex = new RegExp(`'${aptId}':\\s*\\{`, 'g');
        const startMatch = startRegex.exec(content);

        if (startMatch) {
            const startIndex = startMatch.index + startMatch[0].length;
            const contentAfter = content.slice(startIndex);
            const galleryMatch = contentAfter.match(/gallery:\s*\{[\s\S]*?\}/);

            if (galleryMatch && galleryMatch.index < 4000) {
                const interveningText = contentAfter.slice(0, galleryMatch.index);
                if (!interveningText.match(/'[A-Z]\d+':\s*\{/)) {

                    // Check if gallery is DIFFERENT (optimization)
                    const fullOriginal = galleryMatch[0];
                    // Normalize strings to compare? No, just overwrite to be safe.

                    const absoluteStartIndex = startIndex + galleryMatch.index;
                    const absoluteEndIndex = absoluteStartIndex + fullOriginal.length;

                    const before = content.slice(0, absoluteStartIndex);
                    const after = content.slice(absoluteEndIndex);

                    content = before + galleryString + after;
                    console.log(`Updated gallery for ${aptId}`);
                }
            }
        }
    }

    // 2. Update idoBookingId AND icalUrl
    if (idMap[aptId]) {
        const newId = idMap[aptId];
        const startRegex = new RegExp(`'${aptId}':\\s*\\{`, 'g');
        const startMatchAgain = startRegex.exec(content);
        if (startMatchAgain) {
            const startIndex = startMatchAgain.index + startMatchAgain[0].length;
            const contentAfter = content.slice(startIndex);

            // Check for safety first
            const idMatch = contentAfter.match(/idoBookingId:\s*'(\d+)'/);
            const icalMatch = contentAfter.match(/icalUrl:\s*'([^']+)'/);

            // We need to ensure we don't cross into next block
            // Let's find the next key pattern
            const nextKeyMatch = contentAfter.match(/'[A-Z]\d+':\s*\{/);
            const safeBoundary = nextKeyMatch ? nextKeyMatch.index : contentAfter.length;

            // Update ID
            if (idMatch && idMatch.index < safeBoundary) {
                const oldId = idMatch[1];
                if (oldId !== newId) {
                    const absoluteStartIndex = startIndex + idMatch.index;
                    const absoluteEndIndex = absoluteStartIndex + idMatch[0].length;

                    const replacement = `idoBookingId: '${newId}'`;
                    const before = content.slice(0, absoluteStartIndex);
                    const after = content.slice(absoluteEndIndex);

                    content = before + replacement + after;
                    console.log(`Updated idoBookingId for ${aptId}: ${oldId} -> ${newId}`);

                    // RE-READ content for icalUrl because indices shifted
                    // It's easier to restart the loop for this file or just re-slice
                    // But simpler: just update `contentAfter` variable? No, `content` changed.
                    // So we must handle icalUrl in a fresh pass or calculate offset.
                }
            }

            // Update iCal - Need to re-find start because content might have changed above
            const startLinkRegex = new RegExp(`'${aptId}':\\s*\\{`, 'g');
            const startLinkMatch = startLinkRegex.exec(content);
            if (startLinkMatch) {
                const linkStartIndex = startLinkMatch.index + startLinkMatch[0].length;
                const linkContentAfter = content.slice(linkStartIndex);
                const linkNextKeyMatch = linkContentAfter.match(/'[A-Z]\d+':\s*\{/);
                const linkSafeBoundary = linkNextKeyMatch ? linkNextKeyMatch.index : linkContentAfter.length;

                const linkMatch = linkContentAfter.match(/icalUrl:\s*'([^']+)'/);
                if (linkMatch && linkMatch.index < linkSafeBoundary) {
                    const oldUrl = linkMatch[1];
                    // Check if URL contains itemid/OLD_ID
                    if (oldUrl.includes(`itemid/`)) {
                        // Extract current ID in URL
                        const urlIdMatch = oldUrl.match(/itemid\/(\d+)\//);
                        if (urlIdMatch) {
                            const urlId = urlIdMatch[1];
                            if (urlId !== newId) {
                                const newUrl = oldUrl.replace(`itemid/${urlId}/`, `itemid/${newId}/`);

                                const absoluteStartIndex = linkStartIndex + linkMatch.index;
                                const absoluteEndIndex = absoluteStartIndex + linkMatch[0].length;

                                const replacement = `icalUrl: '${newUrl}'`;
                                const before = content.slice(0, absoluteStartIndex);
                                const after = content.slice(absoluteEndIndex);

                                content = before + replacement + after;
                                console.log(`Updated icalUrl for ${aptId}: ${urlId} -> ${newId}`);
                            }
                        }
                    }
                }
            }
        }
    }
});

fs.writeFileSync(targetFile, content, 'utf8');
console.log('Update complete.');
