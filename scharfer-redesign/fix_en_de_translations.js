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

// Insert EN
content = content.replace('trustLoadFull: "Full Load Operation",', 'trustLoadFull: "Full Load Operation",\n' + featuresEN);

// Insert DE
content = content.replace('trustLoadFull: "100% Dauerlast",', 'trustLoadFull: "100% Dauerlast",\n' + featuresDE);

fs.writeFileSync('src/data/scharferData.ts', content, 'utf-8');
console.log("Updated EN and DE features");

