const fs = require('fs');
let content = fs.readFileSync('src/data/scharferData.ts', 'utf-8');

// PL
content = content.replace(`
    officialDistributor: "Oficjalny dystrybutor",
    contactAbout: "O nas",
    contactAboutDesc: "Jesteśmy oficjalnym dystrybutorem zasilaczy Scharfer w Polsce. Oferujemy pełne wsparcie B2B.",
    contactData: "Dane kontaktowe",
    formGdpr: "Wyrażam zgodę na przetwarzanie moich danych osobowych w celu obsługi zapytania.",
    faqSectionTitle: "Najczęściej zadawane pytania",
    faqSectionDesc: "Rozwiej swoje wątpliwości na temat zasilaczy Scharfer",
    contactTitle: "Skontaktuj się z nami",`, `    contactTitle: "Skontaktuj się z nami",`);

// EN
content = content.replace(`
    officialDistributor: "Official Distributor",
    contactAbout: "About Us",
    contactAboutDesc: "We are the official distributor of Scharfer power supplies. We offer full B2B support.",
    contactData: "Contact Details",
    formGdpr: "I consent to the processing of my personal data to handle the inquiry.",
    faqSectionTitle: "Frequently Asked Questions",
    faqSectionDesc: "Clear your doubts about Scharfer power supplies",
    contactTitle: "Contact Us",`, `    contactTitle: "Contact Us",`);

// DE
content = content.replace(`
    officialDistributor: "Offizieller Händler",
    contactAbout: "Über uns",
    contactAboutDesc: "Wir sind der offizielle Distributor für Scharfer-Netzteile. Wir bieten vollen B2B-Support.",
    contactData: "Kontaktdaten",
    formGdpr: "Ich stimme der Verarbeitung meiner personenbezogenen Daten zur Bearbeitung der Anfrage zu.",
    faqSectionTitle: "Häufig gestellte Fragen",
    faqSectionDesc: "Klären Sie Ihre Zweifel an Scharfer-Netzteilen",
    contactTitle: "Kontaktiere uns",`, `    contactTitle: "Kontaktiere uns",`);

// LT
content = content.replace(`
    officialDistributor: "Oficialus platintojas",
    contactAbout: "Apie mus",
    contactAboutDesc: "Esame oficialus „Scharfer“ maitinimo šaltinių platintojas. Siūlome visapusišką B2B palaikymą.",
    contactData: "Kontaktiniai duomenys",
    formGdpr: "Sutinku, kad mano asmens duomenys būtų tvarkomi užklausai apdoroti.",
    faqSectionTitle: "Dažnai užduodami klausimai",
    faqSectionDesc: "Išsklaidykite savo abejones dėl „Scharfer“ maitinimo šaltinių",
    contactTitle: "Susisiekite su mumis",`, `    contactTitle: "Susisiekite su mumis",`);

// Now insert ONLY what's missing
const keysPL = `
    officialDistributor: "Oficjalny dystrybutor",
    contactAbout: "O nas",
    contactAboutDesc: "Jesteśmy oficjalnym dystrybutorem zasilaczy Scharfer w Polsce. Oferujemy pełne wsparcie B2B.",
    contactData: "Dane kontaktowe",
    faqSectionTitle: "Najczęściej zadawane pytania",
    faqSectionDesc: "Rozwiej swoje wątpliwości na temat zasilaczy Scharfer",
`;
content = content.replace('    contactTitle: "Skontaktuj się z nami",', keysPL + '    contactTitle: "Skontaktuj się z nami",');

const keysEN = `
    officialDistributor: "Official Distributor",
    contactAbout: "About Us",
    contactAboutDesc: "We are the official distributor of Scharfer power supplies. We offer full B2B support.",
    contactData: "Contact Details",
    faqSectionTitle: "Frequently Asked Questions",
    faqSectionDesc: "Clear your doubts about Scharfer power supplies",
`;
content = content.replace('    contactTitle: "Contact Us",', keysEN + '    contactTitle: "Contact Us",');

const keysDE = `
    officialDistributor: "Offizieller Händler",
    contactAbout: "Über uns",
    contactAboutDesc: "Wir sind der offizielle Distributor für Scharfer-Netzteile. Wir bieten vollen B2B-Support.",
    contactData: "Kontaktdaten",
    faqSectionTitle: "Häufig gestellte Fragen",
    faqSectionDesc: "Klären Sie Ihre Zweifel an Scharfer-Netzteilen",
`;
content = content.replace('    contactTitle: "Kontaktiere uns",', keysDE + '    contactTitle: "Kontaktiere uns",');

const keysLT = `
    officialDistributor: "Oficialus platintojas",
    contactAbout: "Apie mus",
    contactAboutDesc: "Esame oficialus „Scharfer“ maitinimo šaltinių platintojas. Siūlome visapusišką B2B palaikymą.",
    contactData: "Kontaktiniai duomenys",
    faqSectionTitle: "Dažnai užduodami klausimai",
    faqSectionDesc: "Išsklaidykite savo abejones dėl „Scharfer“ maitinimo šaltinių",
`;
content = content.replace('    contactTitle: "Susisiekite su mumis",', keysLT + '    contactTitle: "Susisiekite su mumis",');

fs.writeFileSync('src/data/scharferData.ts', content, 'utf-8');
