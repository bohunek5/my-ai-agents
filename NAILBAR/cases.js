const cases = window.NAILBAR_CASES || [];
const page = document.body.dataset.page;

const caseText = {
  pl: {
    home: "Strona główna",
    cases: "Metamorfozy",
    shop: "Sklep",
    tour: "Spacer 360",
    navEU: "Projekty unijne",
    contact: "Kontakt",
    euTitleShort: "Unia Europejska",
    heroKicker: "Case studies NailBar",
    heroTitle: "Efekty i metamorfozy",
    heroLead: "Poznaj sposób pracy, etapy zabiegów i zalecenia przygotowywane dla klientek.",
    introKicker: "Indywidualne podejście",
    introTitle: "Każda metamorfoza zaczyna się od konsultacji",
    introText: "Poznaj sposób planowania usług, kolejne etapy zabiegów oraz pielęgnację, która pomaga utrzymać dopracowany efekt na dłużej.",
    all: "Wszystkie",
    fullCase: "Zobacz pełne case study →",
    ctaKicker: "Konsultacja",
    ctaTitle: "Nie wiesz, od czego zacząć?",
    ctaText: "Opowiedz nam o swoim celu. Dobierzemy usługę i realny plan dalszego działania.",
    ctaButton: "Przejdź do doradztwa",
    individualPlan: "Plan indywidualny",
    consultation: "Konsultacja przed zabiegiem",
    goalKicker: "Cel realizacji",
    goalTitle: "Od konsultacji do świadomego planu",
    important: "Ważne",
    importantText: "Plan usługi oraz możliwe efekty zawsze są ustalane indywidualnie. Opis nie stanowi gwarancji rezultatu ani porady medycznej.",
    consult: "Poproś o konsultację →",
    processKicker: "Przebieg",
    processTitle: "Etapy realizacji",
    resultKicker: "Efekt docelowy",
    resultTitle: "Co chcemy osiągnąć",
    careKicker: "Po wizycie",
    careTitle: "Zalecenia pielęgnacyjne",
    footer: "NailBar Giżycko · efekty i metamorfozy",
    fontOn: "Standardowa czcionka",
    fontOff: "Powiększ czcionki",
    linksOn: "Usuń podkreślenie",
    linksOff: "Podkreśl linki",
    bwOn: "Wyłącz czarno-biały",
    bwOff: "Tryb czarno-biały",
    
    // Terms & Conditions (regulamin.html)
    termsTitle: "Regulamin Salonu",
    termsUpdated: "Ostatnia aktualizacja: 6 czerwca 2026 r.",
    termsSec1Title: "1. Postanowienia ogólne",
    termsSec1Text: "Niniejszy regulamin określa zasady korzystania z usług świadczonych w salonie kosmetycznym NailBar z siedzibą w Giżycku. Klientki oraz Klienci przed przystąpieniem do zabiegu zobowiązani są do zapoznania się z poniższymi zasadami. Rozpoczęcie usługi jest jednoznaczne z akceptacją regulaminu.",
    termsSec2Title: "2. Rezerwacja i punktualność",
    termsSec2Item1: "Wizyty można rezerwować telefonicznie, osobiście w salonie oraz online za pośrednictwem platformy Booksy.",
    termsSec2Item2: "Prosimy o przybycie punktualnie na umówioną godzinę.",
    termsSec2Item3: "Spóźnienie powyżej 15 minut uprawnia stylistkę do ograniczenia zakresu wykonywanej usługi lub odmowy jej przeprowadzenia, przy zachowaniu pełnej opłaty za zarezerwowany czas.",
    termsSec3Title: "3. Zmiana i odwoływanie wizyt",
    termsSec3Item1: "W przypadku braku możliwości przybycia na wizytę, prosimy o jej odwołanie lub zmianę terminu minimum 24 godziny przed planowanym czasem rozpoczęcia.",
    termsSec3Item2: "W przypadku powtarzającego się niestawiania się na wizyty bez wcześniejszego uprzedzenia (tzw. \"no-show\"), salon zastrzega sobie prawo do odmowy kolejnych rezerwacji lub wymogu dokonania bezzwrotnego zadatku przy następnym zapisie.",
    termsSec4Title: "4. Zdrowie i kwestie bezpieczeństwa",
    termsSec4Item1: "Przed rozpoczęciem dowolnego zabiegu Klient ma obowiązek poinformować pracownika salonu o wszelkich przeciwwskazaniach zdrowotnych (np. alergiach, chorobach skóry i paznokci, cukrzycy, ciąży).",
    termsSec4Item2: "Salon zastrzega sobie prawo do odmowy wykonania stylizacji lub zabiegu w przypadku podejrzenia chorób dermatologicznych lub infekcji (np. grzybica, drożdżyca), w celach ochrony zdrowia Klienta oraz pracowników.",
    termsSec5Title: "5. Gwarancja i reklamacje",
    termsSec5Item1: "Na wykonaną stylizację paznokci udzielamy 5-dniowej gwarancji technicznej, obejmującej zapowietrzenia oraz odpryski powstałe bez wyraźnej przyczyny zewnętrznej.",
    termsSec5Item2: "Gwarancja nie obejmuje uszkodzeń o charakterze mechanicznym (złamania, pęknięcia, zadrapania, odpryski wynikające z uderzenia, działania silnych detergentów lub samodzielnej ingerencji Klienta).",
    termsSec5Item3: "W celu zgłoszenia reklamacji konieczna jest osobista wizyta w salonie w celu weryfikacji i oceny stanu stylizacji.",
    termsSec6Title: "6. Higiena i sterylizacja",
    termsSec6Text: "Dbamy o najwyższe standardy higieniczne. Wszystkie narzędzia metalowe wielokrotnego użytku są sterylizowane w certyfikowanym autoklawie medycznym i pakowane w jednorazowe pakiety otwierane przy Kliencie. Materiały takie jak pilniki, polerki czy patyczki są zawsze jednorazowe.",

    // Privacy Policy (polityka-prywatnosci.html)
    privacyTitle: "Polityka Prywatności i Cookies",
    privacyUpdated: "Ostatnia aktualizacja: 6 czerwca 2026 r.",
    privacySec1Title: "1. Kto zarządza Twoimi danymi?",
    privacySec1Text: "Administratorem danych osobowych zbieranych za pośrednictwem serwisu internetowego oraz w salonie stacjonarnym jest NailBar Małgorzata Marchelewicz z siedzibą w Giżycku (zwanym dalej \"Salonem\" lub \"Administratorem\"). W sprawach związanych z przetwarzaniem danych osobowych możesz skontaktować się z nami bezpośrednio w salonie lub drogą mailową.",
    privacySec2Title: "2. Jakie dane przetwarzamy i w jakim celu?",
    privacySec2Item1: "Rezerwacja wizyt (Booksy): Dane podawane przy rejestracji na wizytę (imię, numer telefonu, e-mail) są przetwarzane w celu realizacji umowy o świadczenie usług kosmetycznych oraz kontaktu w sprawie rezerwacji.",
    privacySec2Item2: "Formularz doradczy oraz chat: Dane podane dobrowolnie w formularzu (obszar zabiegu, cel, kontakt) są przetwarzane w celu udzielenia odpowiedzi, doboru odpowiedniej ścieżki pielęgnacyjnej oraz przygotowania konsultacji.",
    privacySec2Item3: "Newsletter: Adres e-mail podany w formularzu zapisu jest przetwarzany w celu wysyłki informacji o wolnych terminach, nowościach produktowych oraz ofertach specjalnych (podstawa: Twoja zgoda).",
    privacySec2Item4: "Sklep internetowy: Dane niezbędne do realizacji zamówień (imię, nazwisko, adres dostawy, telefon, szczegóły płatności) są przetwarzane w celu finalizacji transakcji, wysyłki towaru oraz spełnienia obowiązków podatkowo-rachunkowych.",
    privacySec3Title: "3. Pliki cookies (Ciasteczka)",
    privacySec3Text1: "Nasza strona korzysta z plików cookies. Są to małe pliki tekstowe zapisywane na Twoim urządzeniu. Dzielimy je na:",
    privacySec3Item1: "Niezbędne: Wymagane do podstawowego działania strony (np. pamiętanie zawartości koszyka w sklepie, obsługa sesji logowania).",
    privacySec3Item2: "Funkcjonalne: Zapamiętujące Twoje wybory (np. preferowany język witryny, stan włączenia trybu czarno-białego lub powiększenia czcionki).",
    privacySec3Item3: "Analityczne: Służące do anonimowej analizy ruchu na stronie i ulepszania naszej oferty.",
    privacySec3Item4: "Marketingowe: Pozwalające na dopasowanie komunikatów reklamowych w sieciach reklamowych (np. Meta, Google) do Twoich preferencji.",
    privacySec3Text2: "Możesz w każdej chwili zmienić swoje ustawienia cookies klikając w link \"Ustawienia plików cookies\" w stopce naszej strony lub konfigurując ustawienia swojej przeglądarki internetowej.",
    privacySec4Title: "4. Odbiorcy danych i okres przechowywania",
    privacySec4Text: "Twoje dane mogą być przekazywane wyłącznie zaufanym podmiotom wspierającym naszą działalność (np. system rezerwacji Booksy, operatorzy płatności online w sklepie, firmy kurierskie, biuro rachunkowe). Dane przechowujemy tylko przez okres niezbędny do realizacji celów (np. czas trwania zgody marketingowej, okres przedawnienia roszczeń lub wymogi podatkowe).",
    privacySec5Title: "5. Twoje prawa",
    privacySec5Text: "Zgodnie z RODO przysługuje Ci prawo do: wglądu w swoje dane, ich sprostowania, usunięcia (\"prawo do bycia zapomnianym\"), ograniczenia ich przetwarzania, przeniesienia danych, wniesienia sprzeciwu wobec przetwarzania oraz wycofania udzielonej zgody w dowolnym momencie (bez wpływu na zgodność z prawem przetwarzania przed jej wycofaniem)."
  },
  en: {
    home: "Home",
    cases: "Transformations",
    shop: "Shop",
    tour: "360° Tour",
    navEU: "EU Projects",
    contact: "Contact",
    euTitleShort: "European Union",
    heroKicker: "NailBar case studies",
    heroTitle: "Results and transformations",
    heroLead: "See the way we work, treatment stages and aftercare prepared for clients.",
    introKicker: "Individual approach",
    introTitle: "Every transformation starts with a consultation",
    introText: "Explore service planning, treatment stages and care that helps keep the refined effect longer.",
    all: "All",
    fullCase: "See full case study →",
    ctaKicker: "Consultation",
    ctaTitle: "Not sure where to start?",
    ctaText: "Tell us about your goal. We will select a service and a realistic action plan.",
    ctaButton: "Go to advice",
    individualPlan: "Individual plan",
    consultation: "Consultation before treatment",
    goalKicker: "Goal",
    goalTitle: "From consultation to a conscious plan",
    important: "Important",
    importantText: "The service plan and possible effects are always agreed individually. The description is not a result guarantee or medical advice.",
    consult: "Request a consultation →",
    processKicker: "Process",
    processTitle: "Implementation stages",
    resultKicker: "Target effect",
    resultTitle: "What we want to achieve",
    careKicker: "After the visit",
    careTitle: "Aftercare recommendations",
    footer: "NailBar Gizycko · results and transformations",
    fontOn: "Standard font",
    fontOff: "Increase font",
    linksOn: "Remove underline",
    linksOff: "Underline links",
    bwOn: "Disable black and white",
    bwOff: "Black and white mode",
    
    // Terms & Conditions (regulamin.html)
    termsTitle: "Salon Regulations",
    termsUpdated: "Last updated: June 6, 2026",
    termsSec1Title: "1. General provisions",
    termsSec1Text: "These regulations define the rules for using the services provided at the NailBar beauty salon based in Giżycko. Clients are required to read the following rules before starting the treatment. Starting the service is equivalent to accepting the regulations.",
    termsSec2Title: "2. Reservation and punctuality",
    termsSec2Item1: "Visits can be booked by phone, in person at the salon, and online via the Booksy platform.",
    termsSec2Item2: "Please arrive on time for your scheduled appointment.",
    termsSec2Item3: "Lateness of more than 15 minutes entitles the stylist to limit the scope of the service or refuse to perform it, while maintaining the full fee for the reserved time.",
    termsSec3Title: "3. Changing and canceling appointments",
    termsSec3Item1: "If you cannot attend your appointment, please cancel or change the date at least 24 hours before the scheduled start time.",
    termsSec3Item2: "In the event of repeated failure to show up for appointments without prior notice (so-called \"no-show\"), the salon reserves the right to refuse subsequent reservations or require a non-refundable deposit for the next booking.",
    termsSec4Title: "4. Health and safety issues",
    termsSec4Item1: "Before starting any treatment, the Client is obliged to inform the salon employee about any health contraindications (e.g. allergies, skin and nail diseases, diabetes, pregnancy).",
    termsSec4Item2: "The salon reserves the right to refuse styling or treatment in case of suspected dermatological diseases or infections (e.g. ringworm, candidiasis), in order to protect the health of the Client and employees.",
    termsSec5Title: "5. Warranty and complaints",
    termsSec5Item1: "We provide a 5-day technical warranty for the performed nail styling, covering air pockets and chips created without any clear external cause.",
    termsSec5Item2: "The warranty does not cover mechanical damage (breaks, cracks, scratches, chips resulting from impact, use of strong detergents or independent interference by the Client).",
    termsSec5Item3: "In order to submit a complaint, a personal visit to the salon is necessary to verify and assess the styling condition.",
    termsSec6Title: "6. Hygiene and sterilization",
    termsSec6Text: "We care about the highest hygienic standards. All reusable metal tools are sterilized in a certified medical autoclave and packed in disposable packages opened in front of the Client. Materials such as files, buffers or sticks are always disposable.",

    // Privacy Policy (polityka-prywatnosci.html)
    privacyTitle: "Privacy and Cookies Policy",
    privacyUpdated: "Last updated: June 6, 2026",
    privacySec1Title: "1. Who manages your data?",
    privacySec1Text: "The administrator of personal data collected through the website and in the physical salon is NailBar Małgorzata Marchelewicz based in Giżycko (hereinafter referred to as the \"Salon\" or \"Administrator\"). In matters related to the processing of personal data, you can contact us directly in the salon or by e-mail.",
    privacySec2Title: "2. What data do we process and for what purpose?",
    privacySec2Item1: "Booking appointments (Booksy): Data provided during registration for an appointment (name, phone number, e-mail) is processed to implement the contract for the provision of cosmetic services and contact regarding the booking.",
    privacySec2Item2: "Advisory form and chat: Data provided voluntarily in the form (treatment area, goal, contact) is processed in order to provide an answer, select the appropriate care path and prepare a consultation.",
    privacySec2Item3: "Newsletter: The e-mail address provided in the signup form is processed in order to send information about free dates, product news and special offers (basis: your consent).",
    privacySec2Item4: "Online store: Data necessary to process orders (first name, last name, delivery address, telephone, payment details) are processed in order to finalize transactions, ship goods and meet tax and accounting obligations.",
    privacySec3Title: "3. Cookies",
    privacySec3Text1: "Our website uses cookies. These are small text files saved on your device. We divide them into:",
    privacySec3Item1: "Necessary: Required for basic website operation (e.g. remembering the contents of the cart in the store, handling login sessions).",
    privacySec3Item2: "Functional: Remembering your choices (e.g. preferred website language, state of enabling black-and-white mode or font enlargement).",
    privacySec3Item3: "Analytical: Used for anonymous analysis of traffic on the page and improving our offer.",
    privacySec3Item4: "Marketing: Allowing us to adjust advertising messages in advertising networks (e.g. Meta, Google) to your preferences.",
    privacySec3Text2: "You can change your cookie settings at any time by clicking the \"Cookie settings\" link in the footer of our page or configuring your browser settings.",
    privacySec4Title: "4. Data recipients and storage period",
    privacySec4Text: "Your data may only be transferred to trusted entities supporting our operations (e.g. Booksy reservation system, online payment operators in the store, courier companies, accounting office). We store data only for the period necessary to achieve goals (e.g. duration of marketing consent, limitation period for claims or tax requirements).",
    privacySec5Title: "5. Your rights",
    privacySec5Text: "In accordance with GDPR, you have the right to: view your data, correct it, delete it (\"the right to be forgotten\"), limit its processing, transfer data, object to processing, and withdraw consent at any time (without affecting the lawfulness of processing before withdrawal)."
  },
  de: {
    home: "Startseite",
    cases: "Metamorphosen",
    shop: "Shop",
    tour: "360° Rundgang",
    navEU: "EU-Projekte",
    contact: "Kontakt",
    euTitleShort: "Europäische Union",
    heroKicker: "NailBar Fallstudien",
    heroTitle: "Ergebnisse und Metamorphosen",
    heroLead: "Lerne unsere Arbeitsweise, Behandlungsschritte und Empfehlungen für Kundinnen kennen.",
    introKicker: "Individueller Ansatz",
    introTitle: "Jede Metamorphose beginnt mit einer Beratung",
    introText: "Sieh, wie Leistungen geplant werden und welche Pflege hilft, das Ergebnis länger zu erhalten.",
    all: "Alle",
    fullCase: "Vollständige Fallstudie ansehen →",
    ctaKicker: "Beratung",
    ctaTitle: "Du weißt nicht, wo du anfangen sollst?",
    ctaText: "Erzähle uns von deinem Ziel. Wir wählen eine Leistung und einen realistischen Plan.",
    ctaButton: "Zur Beratung",
    individualPlan: "Individueller Plan",
    consultation: "Beratung vor der Behandlung",
    goalKicker: "Ziel",
    goalTitle: "Von der Beratung zum bewussten Plan",
    important: "Wichtig",
    importantText: "Serviceplan und mögliche Effekte werden immer individuell festgelegt. Die Beschreibung ist keine Ergebnisgarantie und keine medizinische Beratung.",
    consult: "Beratung anfragen →",
    processKicker: "Ablauf",
    processTitle: "Umsetzungsschritte",
    resultKicker: "Zieleffekt",
    resultTitle: "Was wir erreichen wollen",
    careKicker: "Nach dem Besuch",
    careTitle: "Pflegeempfehlungen",
    footer: "NailBar Gizycko · Ergebnisse und Metamorphosen",
    fontOn: "Standardschrift",
    fontOff: "Schrift vergrößern",
    linksOn: "Unterstreichung entfernen",
    linksOff: "Links unterstreichen",
    bwOn: "Schwarz-Weiß deaktivieren",
    bwOff: "Schwarz-Weiß-Modus",
    
    // Terms & Conditions (regulamin.html)
    termsTitle: "Salonordnung",
    termsUpdated: "Zuletzt aktualisiert: 6. Juni 2026",
    termsSec1Title: "1. Allgemeine Bestimmungen",
    termsSec1Text: "Diese Ordnung legt die Regeln für die Nutzung der Dienstleistungen im NailBar Kosmetiksalon mit Sitz in Giżycko fest. Kundinnen und Kunden sind verpflichtet, vor Behandlungsbeginn die folgenden Regeln zu lesen. Der Beginn der Dienstleistung entspricht der Annahme der Bedingungen.",
    termsSec2Title: "2. Reservierung und Pünktlichkeit",
    termsSec2Item1: "Termine können telefonisch, persönlich im Salon und online über die Booksy-Plattform gebucht werden.",
    termsSec2Item2: "Bitte erscheinen Sie pünktlich zu Ihrem vereinbarten Termin.",
    termsSec2Item3: "Eine Verspätung von mehr als 15 Minuten berechtigt die Stylistin, den Leistungsumfang einzuschränken oder die Durchführung zu verweigern, wobei die volle Gebühr für die reservierte Zeit einbehalten wird.",
    termsSec3Title: "3. Terminänderung und Stornierung",
    termsSec3Item1: "Wenn Sie Ihren Termin nicht wahrnehmen können, stornieren oder ändern Sie diesen bitte mindestens 24 Stunden vor dem geplanten Behandlungsbeginn.",
    termsSec3Item2: "Bei wiederholtem Nichterscheinen ohne vorherige Ankündigung behält sich der Salon das Recht vor, weitere Reservierungen abzulehnen oder eine nicht rückzahlbare Anzahlung für die nächste Buchung zu verlangen.",
    termsSec4Title: "4. Gesundheit und Sicherheit",
    termsSec4Item1: "Vor Beginn einer Behandlung ist der Kunde verpflichtet, den Mitarbeiter des Salons über gesundheitliche Kontraindikationen zu informieren (z.B. Allergien, Haut- und Nagelkrankheiten, Diabetes, Schwangerschaft).",
    termsSec4Item2: "Der Salon behält sich das Recht vor, das Styling oder die Behandlung bei Verdacht auf dermatologische Erkrankungen oder Infektionen (z.B. Pilzinfektionen) zum Schutz der Gesundheit des Kunden und der Mitarbeiter zu verweigern.",
    termsSec5Title: "5. Garantie und Reklamationen",
    termsSec5Item1: "Wir gewähren eine 5-tägige technische Garantie auf das ausgeführte Nagelstyling für Luftblasen und Absplitterungen ohne erkennbare äußere Ursache.",
    termsSec5Item2: "Die Garantie erstreckt sich nicht auf mechanische Schäden (Brüche, Risse, Kratzer, Absplitterungen durch Stöße, Verwendung starker Reinigungsmittel oder eigenmächtige Eingriffe des Kunden).",
    termsSec5Item3: "Zur Reklamationsabwicklung ist ein persönlicher Besuch im Salon zur Überprüfung und Beurteilung des Stylings erforderlich.",
    termsSec6Title: "6. Hygiene und Sterilisation",
    termsSec6Text: "Wir legen Wert auf höchste Hygienestandards. Alle wiederverwendbaren Metallwerkzeuge werden in einem zertifizierten medizinischen Autoklav sterilisiert und in Einwegverpackungen verpackt, die vor dem Kunden geöffnet werden. Materialien wie Feilen, Polierer oder Stäbchen sind immer Einwegartikel.",

    // Privacy Policy (polityka-prywatnosci.html)
    privacyTitle: "Datenschutz- und Cookie-Richtlinie",
    privacyUpdated: "Zuletzt aktualisiert: 6. Juni 2026",
    privacySec1Title: "1. Wer verwaltet Ihre Daten?",
    privacySec1Text: "Der Administrator der über die Website und im stationären Salon erhobenen personenbezogenen Daten ist NailBar Małgorzata Marchelewicz mit Sitz in Giżycko (im Folgenden \"Salon\" oder \"Administrator\" genannt). Bei Fragen im Zusammenhang mit der Verarbeitung personenbezogener Daten können Sie sich direkt im Salon oder per E-Mail an uns wenden.",
    privacySec2Title: "2. Welche Daten verarbeiten wir und zu welchem Zweck?",
    privacySec2Item1: "Terminbuchung (Booksy): Daten, die bei der Registrierung für einen Termin angegeben werden (Name, Telefonnummer, E-Mail), werden zur Abwicklung des Vertrages über die Erbringung von Kosmetikdienstleistungen und zur Kontaktaufnahme bezüglich der Buchung verarbeitet.",
    privacySec2Item2: "Beratungsformular und Chat: Freiwillig im Formular angegebene Daten (Behandlungsbereich, Ziel, Kontakt) werden verarbeitet, um eine Antwort zu geben, den passenden Pflegepfad auszuwählen und eine Beratung vorzubereiten.",
    privacySec2Item3: "Newsletter: Die im Anmeldeformular angegebene E-Mail-Adresse wird verarbeitet, um Informationen über freie Termine, Produktneuheiten und Sonderangebote zu versenden (Basis: Ihre Einwilligung).",
    privacySec2Item4: "Online-Shop: Für die Abwicklung von Bestellungen erforderliche Daten (Vorname, Nachname, Lieferadresse, Telefon, Zahlungsdetails) werden verarbeitet, um Transaktionen abzuschließen, Waren zu versenden und steuerliche und buchhalterische Pflichten zu erfüllen.",
    privacySec3Title: "3. Cookies",
    privacySec3Text1: "Unsere Website verwendet Cookies. Dies sind kleine Textdateien, die auf Ihrem Gerät gespeichert werden. Wir unterteilen sie in:",
    privacySec3Item1: "Notwendig: Erforderlich für den grundlegenden Betrieb der Website (z. B. Merken des Warenkorbinhalts im Shop, Abwicklung von Login-Sitzungen).",
    privacySec3Item2: "Funktional: Speichern Ihrer Entscheidungen (z. B. bevorzugte Website-Sprache, Zustand des Schwarz-Weiß-Modus oder der Schriftvergrößerung).",
    privacySec3Item3: "Analytisch: Dient zur anonymen Analyse des Verkehrs auf der Seite und zur Verbesserung unseres Angebots.",
    privacySec3Item4: "Marketing: Ermöglicht die Anpassung von Werbebotschaften in Werbenetzwerken (z. B. Meta, Google) an Ihre Vorlieben.",
    privacySec3Text2: "Sie können Ihre Cookie-Einstellungen jederzeit ändern, indem Sie auf den Link \"Cookie-Einstellungen\" in der Fußzeile unserer Seite klicken oder Ihre Browsereinstellungen konfigurieren.",
    privacySec4Title: "4. Empfänger der Daten und Speicherdauer",
    privacySec4Text: "Ihre Daten dürfen nur an vertrauenswürdige Stellen weitergegeben werden, die unsere Geschäftstätigkeit unterstützen (z. B. Reservierungssystem Booksy, Online-Zahlungsanbieter im Shop, Kurierunternehmen, Buchhaltungsbüro). Wir speichern Daten nur so lange, wie es zur Erreichung der Zwecke erforderlich ist (z. B. Dauer der Marketingeinwilligung, Verjährungsfrist für Ansprüche oder steuerliche Anforderungen).",
    privacySec5Title: "5. Ihre Rechte",
    privacySec5Text: "Gemäß der DSGVO haben Sie das Recht auf: Einsicht in Ihre Daten, deren Berichtigung, Löschung (\"Recht auf Vergessenwerden\"), Einschränkung der Verarbeitung, Datenübertragbarkeit, Widerspruch gegen die Verarbeitung und jederzeitigen Widerruf der Einwilligung (ohne Auswirkung auf die Rechtmäßigkeit der Verarbeitung vor dem Widerruf)."
  }
};

let caseLanguage = localStorage.getItem("nailbar-language") || "pl";
let renderCaseList = null;

const c = key => (caseText[caseLanguage] || caseText.pl)[key] || caseText.pl[key] || key;
const caseUrl = item => `/case/#${item.id}`;

function getVal(item, field) {
  const obj = item[field];
  if (typeof obj === "object" && obj !== null) {
    return obj[caseLanguage] || obj.pl || "";
  }
  return obj || "";
}

function initCaseUtilities() {
  const header = document.querySelector(".case-header");
  if (!header || document.querySelector(".case-utilities")) return;
  const controls = document.createElement("div");
  controls.className = "case-utilities";
  controls.innerHTML = `<div class="case-language" aria-label="Wybór języka">
    <button type="button" data-case-language="pl">PL</button>
    <button type="button" data-case-language="en">EN</button>
    <button type="button" data-case-language="de">DE</button>
  </div>
  <button type="button" data-case-access="font">A+</button>
  <button type="button" data-case-access="links">U</button>
  <button type="button" data-case-access="bw">BW</button>`;
  header.append(controls);
  controls.querySelectorAll("[data-case-language]").forEach(button => button.addEventListener("click", () => {
    caseLanguage = button.dataset.caseLanguage;
    localStorage.setItem("nailbar-language", caseLanguage);
    applyCaseLanguage();
    // Sync other modules
    if (typeof applyLanguage === "function") {
      language = caseLanguage;
      applyLanguage();
    }
  }));
  controls.querySelector("[data-case-access='font']").addEventListener("click", () => toggleAccess("a11y-large", "nailbar-a11y-font"));
  controls.querySelector("[data-case-access='links']").addEventListener("click", () => toggleAccess("a11y-links", "nailbar-a11y-links"));
  controls.querySelector("[data-case-access='bw']").addEventListener("click", () => toggleAccess("a11y-bw", "nailbar-a11y-bw"));
}

function toggleAccess(className, storageKey) {
  document.body.classList.toggle(className);
  localStorage.setItem(storageKey, document.body.classList.contains(className) ? "1" : "0");
  updateCaseControls();
}

function restoreAccess() {
  if (localStorage.getItem("nailbar-a11y-font") === "1") document.body.classList.add("a11y-large");
  if (localStorage.getItem("nailbar-a11y-links") === "1") document.body.classList.add("a11y-links");
  if (localStorage.getItem("nailbar-a11y-bw") === "1") document.body.classList.add("a11y-bw");
}

function updateCaseControls() {
  document.querySelectorAll("[data-case-language]").forEach(button => {
    button.classList.toggle("active", button.dataset.caseLanguage === caseLanguage);
  });
  const font = document.querySelector("[data-case-access='font']");
  const links = document.querySelector("[data-case-access='links']");
  const bw = document.querySelector("[data-case-access='bw']");
  if (font) { font.textContent = document.body.classList.contains("a11y-large") ? c("fontOn") : c("fontOff"); font.classList.toggle("active", document.body.classList.contains("a11y-large")); }
  if (links) { links.textContent = document.body.classList.contains("a11y-links") ? c("linksOn") : c("linksOff"); links.classList.toggle("active", document.body.classList.contains("a11y-links")); }
  if (bw) { bw.textContent = document.body.classList.contains("a11y-bw") ? c("bwOn") : c("bwOff"); bw.classList.toggle("active", document.body.classList.contains("a11y-bw")); }
}

function setText(selector, value) {
  const element = document.querySelector(selector);
  if (element) element.textContent = value;
}

function applyCaseLanguage() {
  document.documentElement.lang = caseLanguage;
  const nav = document.querySelectorAll(".case-header nav a");
  if (nav[0]) nav[0].textContent = c("home");
  if (nav[1]) nav[1].textContent = c("cases");
  if (nav[2]) nav[2].textContent = c("shop");
  if (nav[3]) nav[3].textContent = c("tour");
  if (nav[4]) nav[4].textContent = c("navEU");
  if (nav[5]) nav[5].textContent = c("contact");
  
  const euLinkText = document.querySelector(".case-eu-link span:last-child");
  if (euLinkText) euLinkText.textContent = c("euTitleShort");

  if (!document.querySelector(".site-footer")) {
    setText("footer p", c("footer"));
  }

  // Apply generic data-i18n elements on the page (like legal pages)
  document.querySelectorAll("[data-i18n]").forEach(element => {
    const key = element.dataset.i18n;
    if (caseText.pl && caseText.pl[key] !== undefined) {
      element.textContent = c(key);
    }
  });

  if (page === "cases") {
    setText(".cases-hero p", c("heroKicker"));
    setText(".cases-hero h1", c("heroTitle"));
    setText(".cases-hero span", c("heroLead"));
    setText(".cases-intro .eyebrow", c("introKicker"));
    setText(".cases-intro h2", c("introTitle"));
    const intro = document.querySelector(".cases-intro > p");
    if (intro) intro.textContent = c("introText");
    setText(".case-cta .eyebrow", c("ctaKicker"));
    setText(".case-cta h2", c("ctaTitle"));
    const ctaText = document.querySelector(".case-cta p:not(.eyebrow)");
    if (ctaText) ctaText.textContent = c("ctaText");
    const ctaButton = document.querySelector(".case-cta a");
    if (ctaButton) ctaButton.textContent = c("ctaButton");
    if (renderCaseList) renderCaseList();
  }
  if (page === "case") renderCaseDetail();
  updateCaseControls();
}

function initCasesList() {
  const grid = document.querySelector("#casesGrid");
  const filters = document.querySelector("#caseFilters");
  if (!grid || !filters) return;
  const categories = ["Wszystkie", ...new Set(cases.map(item => getVal(item, "category")))];
  let active = "Wszystkie";
  function label(category) {
    return category === "Wszystkie" ? c("all") : category;
  }
  function render() {
    const visible = active === "Wszystkie" ? cases : cases.filter(item => getVal(item, "category") === active);
    filters.innerHTML = categories.map(category => `<button type="button" class="${category === active ? "active" : ""}" data-category="${category}">${label(category)}</button>`).join("");
    grid.innerHTML = visible.map(item => `<article class="case-card"><img src="${item.cover}" alt="${getVal(item, "title")}"><div><span>${getVal(item, "category")}</span><h3>${getVal(item, "title")}</h3><p>${getVal(item, "lead")}</p><a href="${caseUrl(item)}">${c("fullCase")}</a></div></article>`).join("");
  }
  filters.addEventListener("click", event => {
    const button = event.target.closest("button");
    if (!button) return;
    active = button.dataset.category;
    render();
  });
  renderCaseList = render;
  render();
}

function renderCaseDetail() {
  if (page !== "case") return;
  const item = cases.find(entry => entry.id === location.hash.slice(1)) || cases[0];
  document.title = `${getVal(item, "title")} | NailBar`;
  document.querySelector("#caseDetail").innerHTML = `
    <section class="detail-hero"><img src="${item.cover}" alt="${getVal(item, "title")}"><div class="detail-copy"><p class="eyebrow">${getVal(item, "category")}</p><h1>${getVal(item, "title")}</h1><p>${getVal(item, "lead")}</p><div class="detail-meta"><span>${getVal(item, "duration")}</span><span>${c("individualPlan")}</span><span>${c("consultation")}</span></div></div></section>
    <article class="case-content"><div class="case-overview"><div><p class="eyebrow">${c("goalKicker")}</p><h2>${c("goalTitle")}</h2><p>${getVal(item, "goal")}</p></div><aside><strong>${c("important")}</strong><p>${c("importantText")}</p><a href="/#doradztwo">${c("consult")}</a></aside></div>
    <p class="eyebrow">${c("processKicker")}</p><h2>${c("processTitle")}</h2><div class="steps">${getVal(item, "process").map(step => `<div class="step">${step}</div>`).join("")}</div>
    <div class="case-gallery">${item.gallery.map((image,index) => `<img src="${image}" alt="${getVal(item, "category")} - ilustracja realizacji ${index+1}">`).join("")}</div>
    <div class="result-care"><div><p class="eyebrow">${c("resultKicker")}</p><h2>${c("resultTitle")}</h2><p>${getVal(item, "result")}</p></div><div><p class="eyebrow">${c("careKicker")}</p><h2>${c("careTitle")}</h2><ul>${getVal(item, "care").map(point => `<li>${point}</li>`).join("")}</ul></div></div></article>`;
}

restoreAccess();
initCaseUtilities();
initCasesList();
renderCaseDetail();
applyCaseLanguage();
