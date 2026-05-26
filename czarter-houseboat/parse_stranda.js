const fs = require('fs');

// Read titles_dump.txt
const titles = fs.readFileSync('titles_dump.txt', 'utf8').split('\n').filter(Boolean);
const order = [];
for (const line of titles) {
    if (line.includes('Stranda')) {
        const idMatch = line.match(/ID (\d+):/);
        if (idMatch) {
            order.push(idMatch[1]);
        }
    }
}
console.log("Expected IDO ID Order:", order);

const data = fs.readFileSync('src/data/stranda-apartments.ts', 'utf8');
const regex = /'([A-Z0-9]+)':\s*\{[\s\S]*?idoBookingId:\s*'(\d+)'/g;
let match;
const localIdsToKey = {};
while ((match = regex.exec(data)) !== null) {
    localIdsToKey[match[2]] = match[1];
}

const finalKeys = [];
for (const id of order) {
    if (localIdsToKey[id]) {
        finalKeys.push(localIdsToKey[id]);
        delete localIdsToKey[id];
    }
}

// Add the remaining ones at the end just in case
for (const id in localIdsToKey) {
    finalKeys.push(localIdsToKey[id]);
}

console.log("Ordered Keys:", finalKeys.join(', '));
