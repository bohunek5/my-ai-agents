const fs = require('fs');
let content = fs.readFileSync('src/data/scharferData.ts', 'utf-8');

const featuresEN = `
    feature1Title: "Copper Wires",
    feature1Desc: "100% copper prevents voltage loss and overheating.",
    feature2Title: "Aluminum Housing",
    feature2Desc: "Acts as a heatsink, effectively dissipating heat.",
    feature3Title: "Epoxy Resin",
    feature3Desc: "Dampens coil vibrations and guarantees stable temperature.",
    feature4Title: "CE & RoHS Certificates",
    feature4Desc: "Tested and safe according to European standards.",
    feature5Title: "IP67 Protection",
    feature5Desc: "Total resistance to water and dust in harsh conditions.",
    feature6Title: "Complete Protections",
    feature6Desc: "OVP, SCP, OTP and OLP protect your installation.",
    feature7Title: "Real 100% Power",
    feature7Desc: "The power supply handles full load continuously.",
    diagramTitle: "Scharfer Structure & Innovations",
    diagramSubtitle: "Hover over the components of the power supply to discover its unique technical parameters and advantages.",
`;

const featuresDE = `
    feature1Title: "Kupferkabel",
    feature1Desc: "100% Kupfer verhindert Spannungsverlust und Überhitzung.",
    feature2Title: "Aluminiumgehäuse",
    feature2Desc: "Dient als Kühlkörper und leitet die Wärme effektiv ab.",
    feature3Title: "Epoxidharz",
    feature3Desc: "Dämpft Spulenvibrationen und garantiert stabile Temperatur.",
    feature4Title: "CE & RoHS Zertifikate",
    feature4Desc: "Geprüft und sicher nach europäischen Standards.",
    feature5Title: "IP67 Schutz",
    feature5Desc: "Absolute Beständigkeit gegen Wasser und Staub.",
    feature6Title: "Kompletter Schutz",
    feature6Desc: "OVP, SCP, OTP und OLP schützen Ihre Installation.",
    feature7Title: "Echte 100% Leistung",
    feature7Desc: "Das Netzteil bewältigt Dauer-Volllast problemlos.",
    diagramTitle: "Scharfer Aufbau & Innovationen",
    diagramSubtitle: "Fahren Sie über die Bauteile des Netzteils, um seine einzigartigen technischen Parameter und Vorteile zu entdecken.",
`;

const featuresLT = `
    feature1Title: "Variniai laidai",
    feature1Desc: "100% varis apsaugo nuo įtampos kritimo ir perkaitimo.",
    feature2Title: "Aliuminio korpusas",
    feature2Desc: "Veikia kaip radiatorius, efektyviai išsklaido šilumą.",
    feature3Title: "Epoksidinė derva",
    feature3Desc: "Slopina ričių vibraciją ir garantuoja stabilią temperatūrą.",
    feature4Title: "CE ir RoHS sertifikatai",
    feature4Desc: "Išbandyti ir saugūs pagal Europos standartus.",
    feature5Title: "IP67 apsauga",
    feature5Desc: "Visiškas atsparumas vandeniui ir dulkėms.",
    feature6Title: "Pilna apsauga",
    feature6Desc: "OVP, SCP, OTP ir OLP apsaugo jūsų instaliaciją.",
    feature7Title: "Tikra 100% galia",
    feature7Desc: "Maitinimo šaltinis atlaiko pilną apkrovą nuolat.",
    diagramTitle: "Scharfer Struktūra ir Inovacijos",
    diagramSubtitle: "Užveskite pelę ant maitinimo šaltinio komponentų, kad atrastumėte jo unikalius techninius parametrus ir privalumus.",
`;

const featuresPL = `
    diagramTitle: "Budowa i innowacje Scharfer",
    diagramSubtitle: "Najedź na poszczególne elementy zasilacza, aby poznać jego unikalne parametry techniczne i przewagi.",
`;

// Insert PL
content = content.replace('feature7Desc: "Zasilacz radzi sobie z pełnym obciążeniem.",', 'feature7Desc: "Zasilacz radzi sobie z pełnym obciążeniem.",' + featuresPL);

// Insert EN
content = content.replace('trustLoadFull: "FULL LOAD OPERATION",', 'trustLoadFull: "FULL LOAD OPERATION",' + featuresEN);

// Insert DE
content = content.replace('trustLoadFull: "VOLLLASTBETRIEB",', 'trustLoadFull: "VOLLLASTBETRIEB",' + featuresDE);

// Insert LT
content = content.replace('trustLoadFull: "100% Apkrova",', 'trustLoadFull: "100% Apkrova",' + featuresLT);

fs.writeFileSync('src/data/scharferData.ts', content, 'utf-8');

