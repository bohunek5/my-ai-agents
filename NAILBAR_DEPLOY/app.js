const $ = (selector, scope = document) => scope.querySelector(selector);
const $$ = (selector, scope = document) => [...scope.querySelectorAll(selector)];

const translations = {
  pl: {},
  en: {
    utility: "Beauty salon in Gizycko",
    navServices: "Services",
    navCases: "Case studies",
    navTour: "Virtual tour",
    navAdvice: "Advice",
    navShop: "Online shop",
    navContact: "Contact",
    book: "Book an appointment",
    heroEyebrow: "NailBar Gizycko",
    heroTitle: "Beauty refined in every detail",
    heroText: "Manicure, pedicure, cosmetology and care in a calm, professional salon.",
    seeSalon: "See the salon",
    servicesEyebrow: "Salon services",
    servicesTitle: "Treatments selected for you",
    servicesText: "We combine experience, proven technologies and individual advice.",
    service1Title: "Manicure and pedicure",
    service1Text: "Precise styling, care and a lasting finish.",
    service1Link: "Check available dates →",
    service2Title: "Cosmetology",
    service2Text: "Treatments matched to your skin needs and expected results.",
    service2Link: "Choose a treatment →",
    service3Title: "Body contouring",
    service3Text: "Modern therapies supporting effective body care.",
    service3Link: "See results →",
    casesEyebrow: "Case studies",
    casesTitle: "Results and transformations",
    casesText: "Expanded treatment paths with the goal, process, target effect and aftercare clearly described.",
    case1Tag: "Nail styling",
    case1Title: "Natural nail plate, elegant effect",
    case1Text: "Strengthening, smoothing and subtle styling tailored to everyday work.",
    case2Tag: "Care",
    case2Title: "Skin care plan",
    case2Text: "Diagnosis, a treatment series and simple home care matched to actual needs.",
    case3Tag: "Body contouring",
    case3Title: "Conscious body therapy",
    case3Text: "An individually planned schedule with regular progress monitoring.",
    caseLink: "See the process →",
    casesAll: "See all case studies",
    tourEyebrow: "Virtual tour",
    tourTitle: "See the salon before your visit",
    tourText: "Drag the view, use the arrows or start an automatic walk through the interior.",
    tourFullscreen: "Fullscreen",
    tourHint: "Drag or use arrow keys",
    adviceEyebrow: "Advisory section",
    adviceTitle: "Not sure which treatment to choose?",
    adviceText: "Answer a few questions. We will point you in the right direction and prepare a consultation.",
    adviceAreaLabel: "Area",
    adviceAreaPlaceholder: "Choose an area",
    adviceArea1: "Nails and hands",
    adviceArea2: "Face and skin",
    adviceArea3: "Body and silhouette",
    adviceArea4: "Make-up",
    adviceGoalLabel: "Main goal",
    adviceGoalPlaceholder: "Choose a goal",
    adviceGoal1: "Immediate effect",
    adviceGoal2: "Regular care",
    adviceGoal3: "Solve a specific issue",
    adviceGoal4: "Prepare for an event",
    adviceContactLabel: "Phone or e-mail",
    adviceContactPlaceholder: "How can we contact you?",
    adviceSubmit: "Request a recommendation",
    socialEyebrow: "Social wall",
    socialTitle: "From the salon and behind the scenes",
    socialText: "Selected photos from the salon, treatments and daily team work.",
    socialButton: "Follow on Instagram",
    newsletterEyebrow: "NailBar newsletter",
    newsletterTitle: "News and open dates without searching",
    newsletterText: "Leave your address and we will let you know about new launches, open dates and product premieres.",
    newsletterEmailLabel: "E-mail address",
    newsletterEmailPlaceholder: "Your e-mail address",
    newsletterConsent: "I agree to marketing contact and the privacy policy.",
    newsletterSubmit: "Sign me up",
    contactEyebrow: "NailBar Gizycko",
    contactTitle: "Book a visit or ask about a treatment",
    contactText: "Booksy is the fastest way. For consultations and products use the chat or advisory form.",
    contactBook: "Booksy booking",
    contactFacebook: "Facebook",
    footerText: "NailBar Gizycko. Beauty salon, advisory support and online shop.",
    accessibilityTitle: "Accessibility",
    accessibilityText: "Enable a simplified black-and-white version with stronger contrast across the site.",
    accessibilityFont: "Increase font size",
    accessibilityLinks: "Underline links",
    accessibilityToggle: "Enable black-and-white mode",
    chatLauncher: "Ask in chat",
    chatHead: "Online assistant",
    chatGreeting: "Good morning. We can help you choose a treatment, date or product.",
    chatQuick1: "Open dates",
    chatQuick2: "Treatment advice",
    chatQuick3: "Gift for her",
    chatQuick4: "Aftercare",
    chatInputLabel: "Message",
    chatPlaceholder: "Type your message..."
  },
  de: {
    utility: "Kosmetikstudio in Gizycko",
    navServices: "Leistungen",
    navCases: "Fallstudien",
    navTour: "Rundgang",
    navAdvice: "Beratung",
    navShop: "Onlineshop",
    navContact: "Kontakt",
    book: "Termin buchen",
    heroEyebrow: "NailBar Gizycko",
    heroTitle: "Schönheit bis ins Detail ausgearbeitet",
    heroText: "Maniküre, Pediküre, Kosmetologie und Pflege in einem ruhigen, professionellen Studio.",
    seeSalon: "Salon ansehen",
    servicesEyebrow: "Studioangebot",
    servicesTitle: "Behandlungen passend zu dir",
    servicesText: "Wir verbinden Erfahrung, bewährte Technologien und individuelle Beratung.",
    service1Title: "Maniküre und Pediküre",
    service1Text: "Präzises Styling, Pflege und ein langanhaltendes Ergebnis.",
    service1Link: "Termine prüfen →",
    service2Title: "Kosmetologie",
    service2Text: "Behandlungen abgestimmt auf Hautbedürfnisse und gewünschte Ergebnisse.",
    service2Link: "Behandlung wählen →",
    service3Title: "Körperformung",
    service3Text: "Moderne Therapien zur wirksamen Körperpflege.",
    service3Link: "Ergebnisse ansehen →",
    casesEyebrow: "Fallstudien",
    casesTitle: "Ergebnisse und Metamorphosen",
    casesText: "Ausgearbeitete Behandlungswege mit Ziel, Prozess, Ergebnis und Pflege nach dem Termin.",
    case1Tag: "Nagelstyling",
    case1Title: "Natürliche Nagelplatte, eleganter Effekt",
    case1Text: "Stärkung, Ausgleich und ein dezentes Styling für den Alltag.",
    case2Tag: "Pflege",
    case2Title: "Hautpflegeplan",
    case2Text: "Diagnose, Behandlungsserie und einfache Heimpflege nach echtem Bedarf.",
    case3Tag: "Körperformung",
    case3Title: "Bewusste Körpertherapie",
    case3Text: "Individuell geplanter Ablauf mit regelmäßiger Erfolgskontrolle.",
    caseLink: "Ablauf ansehen →",
    casesAll: "Alle Fallstudien ansehen",
    tourEyebrow: "Virtueller Rundgang",
    tourTitle: "Lerne den Salon vor deinem Besuch kennen",
    tourText: "Ziehe die Ansicht, nutze die Pfeile oder starte den automatischen Rundgang durch den Salon.",
    tourFullscreen: "Vollbild",
    tourHint: "Ziehen oder Pfeile nutzen",
    adviceEyebrow: "Beratungsbereich",
    adviceTitle: "Du weißt nicht, welche Behandlung passt?",
    adviceText: "Beantworte einige Fragen. Wir zeigen die passende Richtung und bereiten eine Beratung vor.",
    adviceAreaLabel: "Bereich",
    adviceAreaPlaceholder: "Bereich wählen",
    adviceArea1: "Nägel und Hände",
    adviceArea2: "Gesicht und Haut",
    adviceArea3: "Körper und Silhouette",
    adviceArea4: "Make-up",
    adviceGoalLabel: "Wichtigstes Ziel",
    adviceGoalPlaceholder: "Ziel wählen",
    adviceGoal1: "Soforteffekt",
    adviceGoal2: "Regelmäßige Pflege",
    adviceGoal3: "Konkretes Problem lösen",
    adviceGoal4: "Vorbereitung auf ein Ereignis",
    adviceContactLabel: "Telefon oder E-Mail",
    adviceContactPlaceholder: "Wie können wir dich kontaktieren?",
    adviceSubmit: "Empfehlung anfordern",
    socialEyebrow: "Social Wall",
    socialTitle: "Aus dem Salon und hinter den Kulissen",
    socialText: "Ausgewählte Bilder aus dem Salon, von Behandlungen und aus dem Alltag des Teams.",
    socialButton: "Auf Instagram folgen",
    newsletterEyebrow: "NailBar Newsletter",
    newsletterTitle: "Neuigkeiten und freie Termine ohne Suchen",
    newsletterText: "Hinterlasse deine Adresse und wir informieren über Neuheiten, freie Termine und Produktpremieren.",
    newsletterEmailLabel: "E-Mail-Adresse",
    newsletterEmailPlaceholder: "Deine E-Mail-Adresse",
    newsletterConsent: "Ich stimme Marketingkontakt und der Datenschutzerklärung zu.",
    newsletterSubmit: "Anmelden",
    contactEyebrow: "NailBar Gizycko",
    contactTitle: "Termin buchen oder nach einer Behandlung fragen",
    contactText: "Am einfachsten über Booksy. Für Beratung und Produkte nutze den Chat oder das Beratungsformular.",
    contactBook: "Booksy Buchung",
    contactFacebook: "Facebook",
    footerText: "NailBar Gizycko. Kosmetikstudio, Beratung und Onlineshop.",
    accessibilityTitle: "Barrierefreiheit",
    accessibilityText: "Aktiviere eine vereinfachte Schwarz-Weiß-Version mit stärkerem Kontrast auf der gesamten Seite.",
    accessibilityFont: "Schrift vergrößern",
    accessibilityLinks: "Links unterstreichen",
    accessibilityToggle: "Schwarz-Weiß-Modus aktivieren",
    chatLauncher: "Im Chat fragen",
    chatHead: "Online-Assistent",
    chatGreeting: "Guten Tag. Wir helfen bei der Wahl von Behandlung, Termin oder Produkt.",
    chatQuick1: "Freie Termine",
    chatQuick2: "Behandlungswahl",
    chatQuick3: "Geschenk für sie",
    chatQuick4: "Pflege danach",
    chatInputLabel: "Nachricht",
    chatPlaceholder: "Nachricht schreiben..."
  }
};

const uiMessages = {
  pl: {
    newsletterSaved: "Dziękujemy. Zapis został przyjęty.",
    adviceSaved: "Dziękujemy. Zapisaliśmy zgłoszenie i wrócimy z rekomendacją.",
    fontOn: "Przywróć standardową czcionkę",
    fontOff: "Powiększ czcionki",
    linksOn: "Usuń podkreślenie linków",
    linksOff: "Podkreśl linki",
    accessOn: "Wyłącz tryb czarno-biały",
    accessOff: "Włącz tryb czarno-biały",
    play: "Uruchom automatyczny obrót",
    pause: "Zatrzymaj automatyczny obrót",
    slots: "Najszybciej sprawdzisz terminy w Booksy. Jeśli chcesz, napisz dzień i godzinę, a podpowiem, jaki zabieg najlepiej wtedy zarezerwować.",
    treatment: "Napisz, czy chodzi o paznokcie, twarz czy ciało oraz jaki efekt chcesz osiągnąć. Na tej podstawie wskażę najlepszy kierunek wizyty.",
    gift: "Na prezent najlepiej sprawdzają się perfumy 15 ml i 50 ml oraz gotowe zestawy. Mogę podpowiedzieć wariant bardziej elegancki, codzienny albo premium.",
    aftercare: "Po zabiegu najważniejsze są delikatne oczyszczanie, regularne nawilżanie i unikanie drażniących kosmetyków przez pierwsze dni. Jeśli napiszesz po jakim zabiegu, podam dokładne zalecenia.",
    products: "W sklepie znajdziesz 100 produktów: perfumy, zestawy prezentowe oraz pielęgnację twarzy i ciała.",
    default: "Dziękuję. Zostaw wiadomość, a przygotujemy konkretną rekomendację lub kontakt zwrotny."
  },
  en: {
    newsletterSaved: "Thank you. Your sign-up has been saved.",
    adviceSaved: "Thank you. We saved your request and will come back with a recommendation.",
    fontOn: "Restore standard font size",
    fontOff: "Increase font size",
    linksOn: "Remove underlined links",
    linksOff: "Underline links",
    accessOn: "Disable black-and-white mode",
    accessOff: "Enable black-and-white mode",
    play: "Start automatic rotation",
    pause: "Stop automatic rotation",
    slots: "The fastest way to check dates is Booksy. If you send a preferred day and time, I can suggest which treatment fits that slot best.",
    treatment: "Tell me whether it is about nails, face or body and what effect you want. Based on that I will suggest the best visit direction.",
    gift: "For gifts, 15 ml and 50 ml perfumes as well as ready sets work best. I can suggest an elegant, everyday or premium option.",
    aftercare: "After a treatment, gentle cleansing, regular hydration and avoiding irritating cosmetics for the first days matter most. If you tell me which treatment it was, I will give exact recommendations.",
    products: "The shop includes 100 products: perfumes, gift sets and face and body care.",
    default: "Thank you. Leave your message and we will prepare a specific recommendation or follow-up."
  },
  de: {
    newsletterSaved: "Danke. Deine Anmeldung wurde gespeichert.",
    adviceSaved: "Danke. Wir haben die Anfrage gespeichert und melden uns mit einer Empfehlung zurück.",
    fontOn: "Standardschrift wiederherstellen",
    fontOff: "Schrift vergrößern",
    linksOn: "Link-Unterstreichung entfernen",
    linksOff: "Links unterstreichen",
    accessOn: "Schwarz-Weiß-Modus deaktivieren",
    accessOff: "Schwarz-Weiß-Modus aktivieren",
    play: "Automatische Drehung starten",
    pause: "Automatische Drehung stoppen",
    slots: "Freie Termine prüfst du am schnellsten in Booksy. Wenn du Tag und Uhrzeit schreibst, schlage ich den passenden Behandlungstyp vor.",
    treatment: "Schreibe bitte, ob es um Nägel, Gesicht oder Körper geht und welchen Effekt du erreichen willst. Darauf basierend schlage ich die beste Richtung vor.",
    gift: "Als Geschenk funktionieren 15-ml- und 50-ml-Parfums sowie fertige Sets am besten. Ich kann eine elegante, alltägliche oder Premium-Option empfehlen.",
    aftercare: "Nach der Behandlung sind sanfte Reinigung, regelmäßige Feuchtigkeitspflege und der Verzicht auf reizende Kosmetik in den ersten Tagen am wichtigsten. Wenn du die Behandlung nennst, gebe ich genaue Hinweise.",
    products: "Im Shop findest du 100 Produkte: Parfums, Geschenksets sowie Gesichts- und Körperpflege.",
    default: "Danke. Hinterlasse deine Nachricht, dann bereiten wir eine konkrete Empfehlung oder Rückmeldung vor."
  }
};

let language = localStorage.getItem("nailbar-language") || "pl";
const originalText = new Map();
let fontToggle = null;
let linksToggle = null;
let accessToggle = null;

function rememberOriginals() {
  $$("[data-i18n]").forEach(element => originalText.set(`text:${element.dataset.i18n}`, element.textContent));
  $$("[data-i18n-placeholder]").forEach(element => originalText.set(`placeholder:${element.dataset.i18nPlaceholder}`, element.getAttribute("placeholder") || ""));
}

function dictionary() {
  return translations[language] || translations.pl;
}

function messageSet() {
  return uiMessages[language] || uiMessages.pl;
}

function translateValue(key, fallback = "") {
  if (language === "pl") return fallback;
  return dictionary()[key] || fallback;
}

function applyLanguage() {
  document.documentElement.lang = language;
  $$("[data-i18n]").forEach(element => {
    const key = element.dataset.i18n;
    const fallback = originalText.get(`text:${key}`) || element.textContent;
    element.textContent = translateValue(key, fallback);
  });
  $$("[data-i18n-placeholder]").forEach(element => {
    const key = element.dataset.i18nPlaceholder;
    const fallback = originalText.get(`placeholder:${key}`) || element.getAttribute("placeholder") || "";
    element.setAttribute("placeholder", translateValue(key, fallback));
  });
  $$(".lang-button").forEach(button => {
    const active = button.dataset.language === language;
    button.classList.toggle("active", active);
    button.setAttribute("aria-pressed", String(active));
  });
  updateAccessibilityButton();
}

rememberOriginals();
$$(".lang-button").forEach(button => button.addEventListener("click", () => {
  language = button.dataset.language;
  localStorage.setItem("nailbar-language", language);
  applyLanguage();
}));
applyLanguage();

$("#menuToggle").addEventListener("click", event => {
  const open = $("#navLinks").classList.toggle("open");
  event.currentTarget.setAttribute("aria-expanded", String(open));
});
$$(".nav-links a").forEach(link => link.addEventListener("click", () => $("#navLinks").classList.remove("open")));

const accessPanel = $("#accessibilityPanel");
fontToggle = $("[data-access='font']");
linksToggle = $("[data-access='links']");
accessToggle = $("[data-access='bw']");
$("#accessibilityOpen").addEventListener("click", () => { accessPanel.hidden = false; });
$("#accessibilityClose").addEventListener("click", () => { accessPanel.hidden = true; });

function updateAccessibilityButton() {
  const messages = messageSet();
  if (fontToggle) {
    const fontActive = document.body.classList.contains("a11y-large");
    fontToggle.textContent = fontActive ? messages.fontOn : messages.fontOff;
    fontToggle.classList.toggle("active", fontActive);
  }
  if (linksToggle) {
    const linksActive = document.body.classList.contains("a11y-links");
    linksToggle.textContent = linksActive ? messages.linksOn : messages.linksOff;
    linksToggle.classList.toggle("active", linksActive);
  }
  if (!accessToggle) return;
  const bwActive = document.body.classList.contains("a11y-bw");
  accessToggle.textContent = bwActive ? messages.accessOn : messages.accessOff;
  accessToggle.classList.toggle("active", bwActive);
}

if (localStorage.getItem("nailbar-a11y-font") === "1") {
  document.body.classList.add("a11y-large");
}
if (localStorage.getItem("nailbar-a11y-links") === "1") {
  document.body.classList.add("a11y-links");
}
if (localStorage.getItem("nailbar-a11y-bw") === "1") {
  document.body.classList.add("a11y-bw");
}
updateAccessibilityButton();

fontToggle?.addEventListener("click", () => {
  document.body.classList.toggle("a11y-large");
  localStorage.setItem("nailbar-a11y-font", document.body.classList.contains("a11y-large") ? "1" : "0");
  updateAccessibilityButton();
});

linksToggle?.addEventListener("click", () => {
  document.body.classList.toggle("a11y-links");
  localStorage.setItem("nailbar-a11y-links", document.body.classList.contains("a11y-links") ? "1" : "0");
  updateAccessibilityButton();
});

accessToggle?.addEventListener("click", () => {
  document.body.classList.toggle("a11y-bw");
  localStorage.setItem("nailbar-a11y-bw", document.body.classList.contains("a11y-bw") ? "1" : "0");
  updateAccessibilityButton();
});

const tourImages = Array.from({ length: 31 }, (_, index) => `assets/tour/${103463 + index}_8.webp`);
let tourIndex = 0;
let tourTimer = null;
let dragStartX = null;
let dragStartIndex = 0;
let lastDragIndex = 0;

tourImages.forEach(src => {
  const image = new Image();
  image.src = src;
});

function showTour(index) {
  tourIndex = (index + tourImages.length) % tourImages.length;
  $("#tourImage").src = tourImages[tourIndex];
  $("#tourCounter").textContent = `${tourIndex + 1} / ${tourImages.length}`;
  $("#tourScrubber").value = tourIndex;
}

function stopTour() {
  clearInterval(tourTimer);
  tourTimer = null;
  $("#tourPlay").textContent = "▶";
  $("#tourPlay").setAttribute("aria-label", messageSet().play);
}

function toggleTour() {
  if (tourTimer) {
    stopTour();
    return;
  }
  $("#tourPlay").textContent = "❚❚";
  $("#tourPlay").setAttribute("aria-label", messageSet().pause);
  tourTimer = setInterval(() => showTour(tourIndex + 1), 650);
}

$("#tourPlay").setAttribute("aria-label", messageSet().play);
$("#tourPrev").addEventListener("click", () => { stopTour(); showTour(tourIndex - 1); });
$("#tourNext").addEventListener("click", () => { stopTour(); showTour(tourIndex + 1); });
$("#tourPlay").addEventListener("click", toggleTour);
$("#tourFullscreen").addEventListener("click", () => $("#tourViewer").requestFullscreen?.());
$("#tourScrubber").addEventListener("input", event => { stopTour(); showTour(Number(event.target.value)); });
$("#tourViewer").addEventListener("pointerdown", event => {
  if (event.target === $("#tourScrubber")) return;
  stopTour();
  dragStartX = event.clientX;
  dragStartIndex = tourIndex;
  lastDragIndex = tourIndex;
  $("#tourViewer").setPointerCapture(event.pointerId);
  $("#tourViewer").classList.add("dragging");
});
$("#tourViewer").addEventListener("pointermove", event => {
  if (dragStartX === null) return;
  const frameOffset = Math.round((dragStartX - event.clientX) / 16);
  const nextIndex = dragStartIndex + frameOffset;
  if (nextIndex !== lastDragIndex) {
    lastDragIndex = nextIndex;
    showTour(nextIndex);
  }
});
function endTourDrag() {
  dragStartX = null;
  $("#tourViewer").classList.remove("dragging");
}
$("#tourViewer").addEventListener("pointerup", endTourDrag);
$("#tourViewer").addEventListener("pointercancel", endTourDrag);
$("#tourViewer").addEventListener("keydown", event => {
  if (event.key === "ArrowLeft") { event.preventDefault(); stopTour(); showTour(tourIndex - 1); }
  if (event.key === "ArrowRight") { event.preventDefault(); stopTour(); showTour(tourIndex + 1); }
  if (event.key === " ") { event.preventDefault(); toggleTour(); }
});

const socialImages = ["103471", "103474", "103478", "103482", "103486", "103489"].map(id => `assets/tour/${id}_8.webp`);
$("#socialGrid").innerHTML = socialImages.map((src, index) => `<a href="https://www.instagram.com/nailbar_manicure.pedicure.spa" target="_blank" rel="noopener" aria-label="Post NailBar ${index + 1}"><img loading="lazy" src="${src}" alt="NailBar - zdjęcie z salonu"></a>`).join("");

$("#newsletterForm").addEventListener("submit", event => {
  event.preventDefault();
  localStorage.setItem("nailbar-newsletter", $("#newsletterEmail").value);
  $("#newsletterStatus").textContent = messageSet().newsletterSaved;
  event.currentTarget.reset();
});

$("#adviceForm").addEventListener("submit", event => {
  event.preventDefault();
  localStorage.setItem("nailbar-advice", JSON.stringify(Object.fromEntries(new FormData(event.currentTarget))));
  $("#adviceStatus").textContent = messageSet().adviceSaved;
  event.currentTarget.reset();
});

const chatPanel = $("#chatPanel");
function toggleChat(forceClose = false) {
  chatPanel.hidden = forceClose ? true : !chatPanel.hidden;
  $("#chatLauncher").setAttribute("aria-expanded", String(!chatPanel.hidden));
  if (!chatPanel.hidden) $("#chatInput").focus();
}

$("#chatLauncher").addEventListener("click", () => toggleChat(false));
$("#chatClose").addEventListener("click", () => toggleChat(true));

function appendChat(text, who = "user") {
  const bubble = document.createElement("p");
  bubble.className = `chat-bubble ${who}`;
  bubble.textContent = text;
  $("#chatMessages").append(bubble);
  $("#chatMessages").scrollTop = $("#chatMessages").scrollHeight;
}

function botReply(text, replyKey = "") {
  const lower = text.toLowerCase();
  const messages = messageSet();
  let reply = messages.default;
  if (replyKey === "slots" || lower.includes("termin")) reply = messages.slots;
  else if (replyKey === "treatment" || lower.includes("zabieg") || lower.includes("dobór")) reply = messages.treatment;
  else if (replyKey === "gift") reply = messages.gift;
  else if (replyKey === "aftercare" || lower.includes("pielęgn")) reply = messages.aftercare;
  else if (lower.includes("produkt") || lower.includes("shop")) reply = messages.products;
  setTimeout(() => appendChat(reply, "bot"), 320);
}

$("#chatForm").addEventListener("submit", event => {
  event.preventDefault();
  const input = $("#chatInput");
  appendChat(input.value);
  botReply(input.value);
  input.value = "";
});

$$(".quick-replies button").forEach(button => button.addEventListener("click", () => {
  const label = button.textContent;
  appendChat(label);
  botReply(label, button.dataset.quickReply);
}));
