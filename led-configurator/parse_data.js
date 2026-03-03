const fs = require('fs');
const path = require('path');

const inputFile = '../prescot_data.txt';
const outputFile = 'products.json';

try {
    const content = fs.readFileSync(path.join(__dirname, inputFile), 'utf8');

    // Simple regex parser for XML data
    const products = [];

    // The structure seems to be repeated <cat>, <name>, <desc> elements without a root element
    // So we split by <cat> to find product boundaries roughly

    // Actually, let's try a regex for each item block if possible
    // Assuming a structure like: <cat>...</cat>\n<name>...</name>\n<desc>...</desc>
    const itemRegex = /<cat><!\[CDATA\[(.*?)\]\]><\/cat>\s*<name><!\[CDATA\[(.*?)\]\]><\/name>\s*<desc><!\[CDATA\[(.*?)\]\]><\/desc>/gs;

    let match;
    while ((match = itemRegex.exec(content)) !== null) {
        const displayCategory = match[1].trim();
        const name = match[2].trim();
        const description = match[3].trim();

        const product = {
            category: displayCategory,
            name: name,
            description: description,
            // Extract specs from name
            specs: extractSpecs(name),
            type: determineType(name)
        };

        products.push(product);
    }

    console.log(`Found ${products.length} products.`);
    fs.writeFileSync(path.join(__dirname, outputFile), JSON.stringify(products, null, 2));

} catch (err) {
    console.error('Error processing file:', err);
}

function determineType(name) {
    const lower = name.toLowerCase();
    if (lower.includes('taśma') || lower.includes('strip')) return 'led_strip';
    if (lower.includes('zasilacz')) return 'power_supply';
    if (lower.includes('profil')) return 'profile';
    if (lower.includes('sterownik') || lower.includes('kontroler')) return 'controller';
    return 'accessory';
}

function extractSpecs(name) {
    const specs = {};
    const lower = name.toLowerCase();

    // Voltage
    const voltageMatch = name.match(/(\d+)V/);
    if (voltageMatch) specs.voltage = parseInt(voltageMatch[1]);

    // Power
    const powerMatch = name.match(/(\d+(?:,\d+)?)W(?:\/m)?/);
    // This is tricky, might match total W or W/m. 
    // For strips, usually W/m is not explicitly in title always, often total wattage for roll.
    // Let's look for W/m specifically first
    const powerPerMeterMatch = name.match(/(\d+(?:,\d+)?)\s*W\/m/);
    if (powerPerMeterMatch) {
        specs.powerPerMeter = parseFloat(powerPerMeterMatch[1].replace(',', '.'));
    } else {
        // Fallback for total power
        const totalPowerMatch = name.match(/(\d+(?:,\d+)?)\s*W(?!\/)/);
        if (totalPowerMatch) specs.totalPower = parseFloat(totalPowerMatch[1].replace(',', '.'));
    }

    // IP Rating
    const ipMatch = name.match(/IP(\d+)/);
    if (ipMatch) specs.ip = parseInt(ipMatch[1]);
    else specs.ip = 20; // Default

    // Color Temp
    const kelvinMatch = name.match(/(\d{3,4})K/);
    if (kelvinMatch) specs.kelvin = parseInt(kelvinMatch[1]);

    // LED Density
    const ledMatch = name.match(/(\d+)\s*LED(?:\/m)?/);
    if (ledMatch) specs.ledsPerMeter = parseInt(ledMatch[1]);

    // Width (rarely in title, but let's try mm)
    const widthMatch = name.match(/(\d+)mm/);
    if (widthMatch) specs.widthMm = parseInt(widthMatch[1]);

    return specs;
}
