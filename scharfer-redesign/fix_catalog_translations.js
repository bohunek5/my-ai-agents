const fs = require('fs');
let content = fs.readFileSync('src/data/scharferData.ts', 'utf-8');

const keysPL = `
    catalogTitle: "Katalog Zasilaczy Scharfer",
    catalogSubtitle: "Poznaj pełną ofertę profesjonalnych, wodoodpornych zasilaczy LED IP67. Filtruj po mocy, napięciu i wybierz zasilacz idealny do Twojej inwestycji.",
    only12V: "Tylko 12V",
    only24V: "Tylko 24V",
    heading12V: "Zasilacze Napięciowe 12V",
    heading24V: "Zasilacze Napięciowe 24V",
    noResults: "Brak wyników wyszukiwania.",
`;

const keysEN = `
    catalogTitle: "Scharfer Power Supply Catalog",
    catalogSubtitle: "Explore our full range of professional, waterproof IP67 LED power supplies. Filter by power, voltage and choose the perfect unit for your project.",
    only12V: "Only 12V",
    only24V: "Only 24V",
    heading12V: "12V Power Supplies",
    heading24V: "24V Power Supplies",
    noResults: "No search results found.",
`;

const keysDE = `
    catalogTitle: "Scharfer Netzteilkatalog",
    catalogSubtitle: "Entdecken Sie unser komplettes Sortiment an professionellen, wasserdichten IP67 LED-Netzteilen. Filtern Sie nach Leistung, Spannung und wählen Sie das perfekte Netzteil für Ihr Projekt.",
    only12V: "Nur 12V",
    only24V: "Nur 24V",
    heading12V: "12V Netzteile",
    heading24V: "24V Netzteile",
    noResults: "Keine Suchergebnisse gefunden.",
`;

const keysLT = `
    catalogTitle: "Scharfer Maitinimo Šaltinių Katalogas",
    catalogSubtitle: "Susipažinkite su mūsų pilnu profesionalių, vandeniui atsparių IP67 LED maitinimo šaltinių asortimentu. Filtruokite pagal galią, įtampą ir pasirinkite tobulą įrenginį savo projektui.",
    only12V: "Tik 12V",
    only24V: "Tik 24V",
    heading12V: "12V Maitinimo Šaltiniai",
    heading24V: "24V Maitinimo Šaltiniai",
    noResults: "Paieškos rezultatų nerasta.",
`;

// Insert PL (search for "allProducts:" and insert before it)
content = content.replace('    allProducts: "Wszystkie produkty",', keysPL + '    allProducts: "Wszystkie produkty",');

// Insert EN
content = content.replace('    allProducts: "All Products",', keysEN + '    allProducts: "All Products",');

// Insert DE
content = content.replace('    allProducts: "Alle Produkte",', keysDE + '    allProducts: "Alle Produkte",');

// Insert LT
content = content.replace('    allProducts: "Visi produktai",', keysLT + '    allProducts: "Visi produktai",');

fs.writeFileSync('src/data/scharferData.ts', content, 'utf-8');
console.log("Updated translations");

