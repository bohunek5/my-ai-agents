const fs = require('fs');
const content = fs.readFileSync('src/data/stranda-apartments.ts', 'utf8');

const startIndex = content.indexOf('export const strandaApartments: Record<string, Apartment> = {');
if (startIndex === -1) {
    console.log("Could not find start");
    process.exit(1);
}
const startOfObj = startIndex + 'export const strandaApartments: Record<string, Apartment> = {'.length;
const endOfObj = content.lastIndexOf('};');

const header = content.substring(0, startOfObj) + '\n';
const body = content.substring(startOfObj, endOfObj);
const footer = '\n' + content.substring(endOfObj);

const blocks = body.split(/\n    '([A-Za-z0-9_ -]+)': \{/);
const apartments = {};

const badKeys = [
    "C_Studio", "C_1_Sypialnia", "C_2_Sypialnie", 
    "C Studio", "C 1-Sypialnia", "C 2-Sypialnie", "C 2-Sypialni"
];

for (let i = 1; i < blocks.length; i += 2) {
    const key = blocks[i];
    let val = "{" + blocks[i+1].trimEnd();
    if (val.endsWith(",")) {
        val = val.slice(0, -1);
    }
    
    if (badKeys.includes(key)) continue;
    
    // Naturally deduplicate by keeping the last encountered version of the key
    apartments[key] = val;
}

function replaceGallery(block, idoId) {
    const imgDir = '/Users/karolbohdanowicz/my-ai-agents/mazury-holiday/public/images/stranda/';
    let files = [];
    try {
        const allFiles = fs.readdirSync(imgDir);
        files = allFiles.filter(f => f.startsWith(`ido_${idoId}_`) && f.endsWith('.jpg'));
        files.sort((a, b) => parseInt(a.split('_')[2]) - parseInt(b.split('_')[2]));
    } catch (e) {
        console.log(`Error reading dir for ${idoId}: ${e.message}`);
    }
    
    if (files.length === 0) {
        console.log(`No images found for idoId ${idoId}`);
        return block;
    }
    
    const hero = `getAssetPath("/images/stranda/${files[0]}")`;
    const imagesArr = files.map(f => `getAssetPath("/images/stranda/${f}")`).join(',\n                ');
    
    const newGallery = `gallery: {
            heroImage: ${hero},
            images: [
                ${imagesArr}
            ]
        }`;
        
    return block.replace(/gallery:\s*\{[\s\S]*?\}/, newGallery);
}

function replaceTitle(block, title) {
    let replaced = block.replace(/title:\s*`[^`]+`/, `title: \`${title}\``);
    replaced = replaced.replace(/title:\s*'[^']+'/, `title: \`${title}\``);
    return replaced;
}

// Map IDO to apartments that have C_Generic
const mappings = {
    'B304': '44', 'B305': '44',
    'C304': '30', 'C301': '40', 
    'B402': '24', 'C404': '41', 
    'A302': '42', 'C402': '46',
    'C403': '41', 'C_1BEDROOM': '44',
    'C_2BEDROOM': '43', 'C_STUDIO': '32'
};

for (const [key, ido] of Object.entries(mappings)) {
    if (apartments[key]) {
        apartments[key] = replaceGallery(apartments[key], ido);
    }
}

if (apartments['C_1BEDROOM']) apartments['C_1BEDROOM'] = replaceTitle(apartments['C_1BEDROOM'], 'C z jedną sypialnią');
if (apartments['C_2BEDROOM']) apartments['C_2BEDROOM'] = replaceTitle(apartments['C_2BEDROOM'], 'C z dwoma sypialniami');
if (apartments['C_STUDIO']) apartments['C_STUDIO'] = replaceTitle(apartments['C_STUDIO'], 'C Studio');

let newBody = "";
const keys = Object.keys(apartments);
for (let i = 0; i < keys.length; i++) {
    const k = keys[i];
    newBody += `    '${k}': ${apartments[k]}${i === keys.length - 1 ? '' : ',\n\n'}`;
}

fs.writeFileSync('src/data/stranda-apartments.ts', header + newBody + footer);
console.log("Fixed stranda-apartments.ts");
