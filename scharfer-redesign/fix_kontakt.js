const fs = require('fs');

// 1. Fix kontakt/page.tsx
let pageContent = fs.readFileSync('src/app/(desktop)/kontakt/page.tsx', 'utf-8');
pageContent = pageContent.replace(/faqQ(\d+)/g, 'faq$1Q');
pageContent = pageContent.replace(/faqA(\d+)/g, 'faq$1A');
fs.writeFileSync('src/app/(desktop)/kontakt/page.tsx', pageContent, 'utf-8');

// 2. Add keys to scharferData.ts
let content = fs.readFileSync('src/data/scharferData.ts', 'utf-8');

const keysPL = `
    officialDistributor: "Oficjalny dystrybutor",
    contactAbout: "O nas",
    contactAboutDesc: "Jesteśmy oficjalnym dystrybutorem zasilaczy Scharfer w Polsce. Oferujemy pełne wsparcie B2B.",
    contactData: "Dane kontaktowe",
    formName: "Imię i nazwisko / Firma",
    formEmail: "Adres e-mail",
    formMsg: "Treść wiadomości",
    formGdpr: "Wyrażam zgodę na przetwarzanie moich danych osobowych w celu obsługi zapytania.",
    formSend: "Wyślij wiadomość",
    faqSectionTitle: "Najczęściej zadawane pytania",
    faqSectionDesc: "Rozwiej swoje wątpliwości na temat zasilaczy Scharfer",
`;

const keysEN = `
    officialDistributor: "Official Distributor",
    contactAbout: "About Us",
    contactAboutDesc: "We are the official distributor of Scharfer power supplies. We offer full B2B support.",
    contactData: "Contact Details",
    formName: "Name / Company",
    formEmail: "Email address",
    formMsg: "Message content",
    formGdpr: "I consent to the processing of my personal data to handle the inquiry.",
    formSend: "Send message",
    faqSectionTitle: "Frequently Asked Questions",
    faqSectionDesc: "Clear your doubts about Scharfer power supplies",
`;

const keysDE = `
    officialDistributor: "Offizieller Händler",
    contactAbout: "Über uns",
    contactAboutDesc: "Wir sind der offizielle Distributor für Scharfer-Netzteile. Wir bieten vollen B2B-Support.",
    contactData: "Kontaktdaten",
    formName: "Name / Unternehmen",
    formEmail: "E-Mail-Adresse",
    formMsg: "Nachricht",
    formGdpr: "Ich stimme der Verarbeitung meiner personenbezogenen Daten zur Bearbeitung der Anfrage zu.",
    formSend: "Nachricht senden",
    faqSectionTitle: "Häufig gestellte Fragen",
    faqSectionDesc: "Klären Sie Ihre Zweifel an Scharfer-Netzteilen",
`;

const keysLT = `
    officialDistributor: "Oficialus platintojas",
    contactAbout: "Apie mus",
    contactAboutDesc: "Esame oficialus „Scharfer“ maitinimo šaltinių platintojas. Siūlome visapusišką B2B palaikymą.",
    contactData: "Kontaktiniai duomenys",
    formName: "Vardas / Įmonė",
    formEmail: "El. pašto adresas",
    formMsg: "Žinutės tekstas",
    formGdpr: "Sutinku, kad mano asmens duomenys būtų tvarkomi užklausai apdoroti.",
    formSend: "Siųsti žinutę",
    faqSectionTitle: "Dažnai užduodami klausimai",
    faqSectionDesc: "Išsklaidykite savo abejones dėl „Scharfer“ maitinimo šaltinių",
`;

// Insert PL
content = content.replace('    contactTitle: "Skontaktuj się z nami",', keysPL + '    contactTitle: "Skontaktuj się z nami",');

// Insert EN
content = content.replace('    contactTitle: "Contact Us",', keysEN + '    contactTitle: "Contact Us",');

// Insert DE
content = content.replace('    contactTitle: "Kontaktiere uns",', keysDE + '    contactTitle: "Kontaktiere uns",');

// Insert LT
content = content.replace('    contactTitle: "Susisiekite su mumis",', keysLT + '    contactTitle: "Susisiekite su mumis",');

fs.writeFileSync('src/data/scharferData.ts', content, 'utf-8');
console.log("Updated kontakt keys");
