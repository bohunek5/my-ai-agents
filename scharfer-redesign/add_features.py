import json

data_file = "/Users/karolbohdanowicz/my-ai-agents/scharfer-redesign/src/data/scharferData.ts"

with open(data_file, 'r') as f:
    content = f.read()

import re

# Need to extract the translations dict from content
# It's better to just do another sed-like replacement or use node script to mutate

node_script = """
const fs = require('fs');
const path = '/Users/karolbohdanowicz/my-ai-agents/scharfer-redesign/src/data/scharferData.ts';

let content = fs.readFileSync(path, 'utf8');

// The file exports translations. We can use regex to inject new keys.
const pl_inject = `
    feature1Title: 'Aluminiowa Obudowa',
    feature1Desc: 'Masywny odlew aluminiowy działający jako radiator. Całkowicie wyeliminowaliśmy wentylatory, gwarantując cichą pracę.',
    feature2Title: '100% Mocy Znamionowej',
    feature2Desc: 'Zaprojektowany do ciągłej pracy przy pełnym obciążeniu. Kupując model 150W, otrzymujesz realne 150W bez ugięć napięcia.',
    feature3Title: 'Cicha Praca (Brak piszczenia)',
    feature3Desc: 'Wnętrze w 100% zalane żywicą epoksydową tłumi drgania cewek i filtrów. Zachowuje bezwzględną ciszę przy ściemnianiu.',
    feature4Title: 'Klasa Szczelności IP67',
    feature4Desc: 'Hermetycznie zalana konstrukcja zapobiega wnikaniu wody i kurzu. Może bezpiecznie pracować w trudnych warunkach zewnętrznych.',
    feature5Title: 'Zabezpieczenia SCP, OVP, OTP',
    feature5Desc: 'Aktywna ochrona podłączonego oświetlenia przed skokami napięcia, zwarciem sieci oraz przegrzaniem z auto-restartem.',
    feature6Title: 'Aktywny Układ PFC (PF > 0.98)',
    feature6Desc: 'Kompensacja współczynnika mocy minimalizuje straty energetyczne i skutecznie eliminuje zakłócenia w sieci elektrycznej.',
    feature7Title: '7 Lat Pełnej Gwarancji',
    feature7Desc: 'Pełna ochrona dystrybutora. W przypadku usterki gwarantujemy natychmiastową wymianę na nowy produkt bezpośrednio z magazynu.',
`;

const en_inject = `
    feature1Title: 'Aluminum Casing',
    feature1Desc: 'Massive die-cast aluminum acting as a heatsink. We completely eliminated fans, ensuring quiet operation.',
    feature2Title: '100% Rated Power',
    feature2Desc: 'Designed for continuous operation at full load. Buying a 150W model, you get a real 150W with no voltage drops.',
    feature3Title: 'Quiet Operation (No whining)',
    feature3Desc: 'The interior is 100% potted with epoxy resin, dampening coil and filter vibrations. Keeps absolute silence when dimming.',
    feature4Title: 'IP67 Tightness Class',
    feature4Desc: 'Hermetically potted design prevents water and dust ingress. Can safely operate in harsh outdoor conditions.',
    feature5Title: 'SCP, OVP, OTP Protections',
    feature5Desc: 'Active protection of connected lighting against voltage surges, short circuits, and overheating with auto-restart.',
    feature6Title: 'Active PFC (PF > 0.98)',
    feature6Desc: 'Power factor compensation minimizes energy losses and effectively eliminates electrical network disturbances.',
    feature7Title: '7 Years Full Warranty',
    feature7Desc: 'Full distributor protection. In case of failure, we guarantee an immediate replacement directly from the warehouse.',
`;

const de_inject = `
    feature1Title: 'Aluminiumgehäuse',
    feature1Desc: 'Massiver Aluminiumdruckguss als Kühlkörper. Wir haben Lüfter komplett eliminiert und garantieren einen leisen Betrieb.',
    feature2Title: '100% Nennleistung',
    feature2Desc: 'Für den Dauerbetrieb unter Volllast ausgelegt. Wenn Sie ein 150-W-Modell kaufen, erhalten Sie echte 150 W ohne Spannungsabfall.',
    feature3Title: 'Leiser Betrieb (kein Summen)',
    feature3Desc: 'Der Innenraum ist zu 100 % mit Epoxidharz vergossen, was Spulen- und Filtervibrationen dämpft. Bleibt beim Dimmen absolut leise.',
    feature4Title: 'IP67 Schutzklasse',
    feature4Desc: 'Das hermetisch vergossene Design verhindert das Eindringen von Wasser und Staub. Sicherer Betrieb unter rauen Außenbedingungen.',
    feature5Title: 'SCP, OVP, OTP Schutz',
    feature5Desc: 'Aktiver Schutz der angeschlossenen Beleuchtung vor Überspannung, Kurzschluss und Überhitzung mit automatischem Neustart.',
    feature6Title: 'Aktive PFC (PF > 0.98)',
    feature6Desc: 'Die Blindleistungskompensation minimiert Energieverluste und eliminiert effektiv Störungen im Stromnetz.',
    feature7Title: '7 Jahre volle Garantie',
    feature7Desc: 'Voller Händlerschutz. Im Fehlerfall garantieren wir einen sofortigen Austausch direkt ab Lager.',
`;

const lt_inject = `
    feature1Title: 'Aliuminio Korpusas',
    feature1Desc: 'Masyvus aliuminio liejimas veikia kaip radiatorius. Visiškai atsisakėme ventiliatorių, užtikrindami tylų veikimą.',
    feature2Title: '100% Vardinė Galia',
    feature2Desc: 'Sukurta nuolatiniam darbui pilna apkrova. Pirkdami 150W modelį, gaunate realius 150W be įtampos kritimų.',
    feature3Title: 'Tylus Veikimas (Be spengimo)',
    feature3Desc: 'Viduje 100% užpildyta epoksidine derva, slopinančia ritių ir filtrų vibracijas. Išlaiko absoliučią tylą pritemdant.',
    feature4Title: 'IP67 Apsaugos Klasė',
    feature4Desc: 'Hermetiška konstrukcija apsaugo nuo vandens ir dulkių. Gali saugiai veikti atšiauriomis lauko sąlygomis.',
    feature5Title: 'SCP, OVP, OTP Apsaugos',
    feature5Desc: 'Aktyvi prijungto apšvietimo apsauga nuo įtampos šuolių, trumpųjų jungimų ir perkaitimo su automatiniu paleidimu.',
    feature6Title: 'Aktyvus PFC (PF > 0.98)',
    feature6Desc: 'Galios faktoriaus kompensavimas sumažina energijos nuostolius ir efektyviai pašalina elektros tinklo trikdžius.',
    feature7Title: '7 Metų Pilna Garantija',
    feature7Desc: 'Pilna platintojo apsauga. Gedimo atveju garantuojame greitą pakeitimą nauju produktu tiesiai iš sandėlio.',
`;

content = content.replace(/'contactError': '.*?'\n  \},/g, match => match.slice(0, -2) + ",\\n" + pl_inject + "  },");
content = content.replace(/'contactError': '.*?'\n  \}\n\}/g, match => match.slice(0, -3) + ",\\n" + lt_inject + "  }\n}");

fs.writeFileSync(path, content);
"""

with open('update_data.js', 'w') as f:
    f.write(node_script)

