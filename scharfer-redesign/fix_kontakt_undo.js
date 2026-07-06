const fs = require('fs');

let content = fs.readFileSync('src/data/scharferData.ts', 'utf-8');

// Replace the duplicated block for PL
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
    contactTitle: "Skontaktuj się z nami",`;
const newKeysPL = `
    officialDistributor: "Oficjalny dystrybutor",
    contactAbout: "O nas",
    contactAboutDesc: "Jesteśmy oficjalnym dystrybutorem zasilaczy Scharfer w Polsce. Oferujemy pełne wsparcie B2B.",
    contactData: "Dane kontaktowe",
    formGdpr: "Wyrażam zgodę na przetwarzanie moich danych osobowych w celu obsługi zapytania.",
    faqSectionTitle: "Najczęściej zadawane pytania",
    faqSectionDesc: "Rozwiej swoje wątpliwości na temat zasilaczy Scharfer",
    contactTitle: "Skontaktuj się z nami",`;

content = content.replace(keysPL, newKeysPL);

// EN
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
    contactTitle: "Contact Us",`;
const newKeysEN = `
    officialDistributor: "Official Distributor",
    contactAbout: "About Us",
    contactAboutDesc: "We are the official distributor of Scharfer power supplies. We offer full B2B support.",
    contactData: "Contact Details",
    formGdpr: "I consent to the processing of my personal data to handle the inquiry.",
    faqSectionTitle: "Frequently Asked Questions",
    faqSectionDesc: "Clear your doubts about Scharfer power supplies",
    contactTitle: "Contact Us",`;

content = content.replace(keysEN, newKeysEN);

// DE
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
    contactTitle: "Kontaktiere uns",`;
const newKeysDE = `
    officialDistributor: "Offizieller Händler",
    contactAbout: "Über uns",
    contactAboutDesc: "Wir sind der offizielle Distributor für Scharfer-Netzteile. Wir bieten vollen B2B-Support.",
    contactData: "Kontaktdaten",
    formGdpr: "Ich stimme der Verarbeitung meiner personenbezogenen Daten zur Bearbeitung der Anfrage zu.",
    faqSectionTitle: "Häufig gestellte Fragen",
    faqSectionDesc: "Klären Sie Ihre Zweifel an Scharfer-Netzteilen",
    contactTitle: "Kontaktiere uns",`;

content = content.replace(keysDE, newKeysDE);

// LT
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
    contactTitle: "Susisiekite su mumis",`;
const newKeysLT = `
    officialDistributor: "Oficialus platintojas",
    contactAbout: "Apie mus",
    contactAboutDesc: "Esame oficialus „Scharfer“ maitinimo šaltinių platintojas. Siūlome visapusišką B2B palaikymą.",
    contactData: "Kontaktiniai duomenys",
    formGdpr: "Sutinku, kad mano asmens duomenys būtų tvarkomi užklausai apdoroti.",
    faqSectionTitle: "Dažnai užduodami klausimai",
    faqSectionDesc: "Išsklaidykite savo abejones dėl „Scharfer“ maitinimo šaltinių",
    contactTitle: "Susisiekite su mumis",`;

content = content.replace(keysLT, newKeysLT);

fs.writeFileSync('src/data/scharferData.ts', content, 'utf-8');
console.log("Fixed duplicated keys");
