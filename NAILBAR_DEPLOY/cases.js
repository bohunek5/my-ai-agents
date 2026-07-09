const cases = window.NAILBAR_CASES || [];
const page = document.body.dataset.page;

const caseText = {
  pl: {
    home: "Strona główna",
    cases: "Efekty i metamorfozy",
    shop: "Sklep",
    contact: "Kontakt",
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
    bwOff: "Tryb czarno-biały"
  },
  en: {
    home: "Home",
    cases: "Results and transformations",
    shop: "Shop",
    contact: "Contact",
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
    bwOff: "Black and white mode"
  },
  de: {
    home: "Startseite",
    cases: "Ergebnisse und Metamorphosen",
    shop: "Shop",
    contact: "Kontakt",
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
    bwOff: "Schwarz-Weiß-Modus"
  }
};

let caseLanguage = localStorage.getItem("nailbar-language") || "pl";
let renderCaseList = null;

const c = key => (caseText[caseLanguage] || caseText.pl)[key] || caseText.pl[key] || key;
const caseUrl = item => `/case/#${item.id}`;

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
  if (nav[3]) nav[3].textContent = c("contact");
  setText("footer p", c("footer"));
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
  const categories = ["Wszystkie", ...new Set(cases.map(item => item.category))];
  let active = "Wszystkie";
  function label(category) {
    return category === "Wszystkie" ? c("all") : category;
  }
  function render() {
    const visible = active === "Wszystkie" ? cases : cases.filter(item => item.category === active);
    filters.innerHTML = categories.map(category => `<button type="button" class="${category === active ? "active" : ""}" data-category="${category}">${label(category)}</button>`).join("");
    grid.innerHTML = visible.map(item => `<article class="case-card"><img src="${item.cover}" alt="${item.title}"><div><span>${item.category}</span><h3>${item.title}</h3><p>${item.lead}</p><a href="${caseUrl(item)}">${c("fullCase")}</a></div></article>`).join("");
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
  document.title = `${item.title} | NailBar`;
  document.querySelector("#caseDetail").innerHTML = `
    <section class="detail-hero"><img src="${item.cover}" alt="${item.title}"><div class="detail-copy"><p class="eyebrow">${item.category}</p><h1>${item.title}</h1><p>${item.lead}</p><div class="detail-meta"><span>${item.duration}</span><span>${c("individualPlan")}</span><span>${c("consultation")}</span></div></div></section>
    <article class="case-content"><div class="case-overview"><div><p class="eyebrow">${c("goalKicker")}</p><h2>${c("goalTitle")}</h2><p>${item.goal}</p></div><aside><strong>${c("important")}</strong><p>${c("importantText")}</p><a href="/#doradztwo">${c("consult")}</a></aside></div>
    <p class="eyebrow">${c("processKicker")}</p><h2>${c("processTitle")}</h2><div class="steps">${item.process.map(step => `<div class="step">${step}</div>`).join("")}</div>
    <div class="case-gallery">${item.gallery.map((image,index) => `<img src="${image}" alt="${item.category} - ilustracja realizacji ${index+1}">`).join("")}</div>
    <div class="result-care"><div><p class="eyebrow">${c("resultKicker")}</p><h2>${c("resultTitle")}</h2><p>${item.result}</p></div><div><p class="eyebrow">${c("careKicker")}</p><h2>${c("careTitle")}</h2><ul>${item.care.map(point => `<li>${point}</li>`).join("")}</ul></div></div></article>`;
}

restoreAccess();
initCaseUtilities();
initCasesList();
renderCaseDetail();
applyCaseLanguage();
