import * as XLSX from 'xlsx';
import * as fs from 'fs';
import * as path from 'path';

const filePath = path.resolve(__dirname, '../../test_sales_data.xlsx');
try {
    const workbook = XLSX.readFile(filePath);
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    const data = XLSX.utils.sheet_to_json(sheet);
    console.log(JSON.stringify(data, null, 2));
} catch (error) {
    console.error("Error reading file:", error.message);
    if (error.code === 'ENOENT') {
        console.error("File not found at:", filePath);
        // Try looking in current dir just in case
        try {
            const wb2 = XLSX.readFile('test_sales_data.xlsx');
            const data2 = XLSX.utils.sheet_to_json(wb2.Sheets[wb2.SheetNames[0]]);
            console.log(JSON.stringify(data2, null, 2));
        } catch (e) {
            console.error("Also failed in current dir");
        }
    }
}
