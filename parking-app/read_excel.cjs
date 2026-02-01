const XLSX = require('xlsx');
const path = require('path');

// Try multiple paths
const pathsToCheck = [
    path.resolve(__dirname, '../../test_sales_data.xlsx'),
    path.resolve(__dirname, '../test_sales_data.xlsx'),
    path.resolve(__dirname, 'test_sales_data.xlsx'),
    '/Users/karolbohdanowicz/my-ai-agents/test_sales_data.xlsx'
];

let data = null;

for (const p of pathsToCheck) {
    try {
        const workbook = XLSX.readFile(p);
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        data = XLSX.utils.sheet_to_json(sheet);
        console.log(JSON.stringify(data, null, 2));
        break;
    } catch (e) {
        // Continue
    }
}

if (!data) {
    console.error("Could not find or read file in any checked path.");
    // Output empty array to valid JSON parses
    console.log("[]");
}
