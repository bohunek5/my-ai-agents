const products = window.NAILBAR_PRODUCTS || [];
const productSpins = window.NAILBAR_PRODUCT_SPINS || {};
const page = document.body.dataset.page;

const storeText = {
  pl: {
    salon: "Salon NailBar",
    home: "Strona główna",
    shop: "Sklep on-line",
    shopShort: "Sklep",
    contact: "Kontakt",
    cart: "Koszyk",
    backShop: "Wróć do sklepu",
    freeShipping: "Darmowa dostawa od 250 zł",
    secureShopping: "Bezpieczne zakupy online",
    shopHero: "Sklep on-line",
    shopTitle: "Kosmetyki i perfumy",
    shopLead: "Produkty dostępne w salonie NailBar",
    categories: "Kategorie",
    allProducts: "Wszystkie produkty",
    perfumes: "Perfumy",
    face: "Do twarzy",
    body: "Do ciała",
    sizes: "Pojemności",
    storeName: "Sklep NailBar",
    search: "Szukaj",
    searchPlaceholder: "Nazwa produktu",
    sorting: "Sortowanie",
    defaultSort: "Domyślne",
    priceAsc: "Cena: rosnąco",
    priceDesc: "Cena: malejąco",
    nameSort: "Nazwa A-Z",
    resultCount: count => `Wyświetlono ${count} produktów`,
    new: "Nowość",
    view360: "Widok 360°",
    interactivePreview: "Interaktywny podgląd",
    close360: "Zamknij widok 360",
    rotateLeft: "Obróć w lewo",
    rotateRight: "Obróć w prawo",
    startRotate: "Uruchom obrót",
    dragRotate: "Przeciągnij, aby obrócić",
    product: "Produkt",
    productDescription: "Opis produktu",
    productDescriptionText: "Starannie wyselekcjonowany produkt z oferty NailBar. Idealny do codziennej pielęgnacji, prezentu albo uzupełnienia domowego rytuału beauty.",
    deliveryPickup: "Dostawa i odbiór",
    deliveryPickupText: "Możliwy odbiór w salonie NailBar oraz wygodna wysyłka kurierska. Dostępne formy dostawy i płatności zobaczysz podczas finalizacji zamówienia.",
    recommended: "Może Ci się spodobać",
    originalProduct: "Oryginalny produkt dostępny w sklepie NailBar. Wybierz wariant i dodaj go do koszyka.",
    variant: "Wariant",
    standard: "Standard",
    plusVariant: "Wariant +10 ml (+15,00 zł)",
    quantity: "Ilość",
    addToCart: "Dodaj do koszyka",
    goCart: "Przejdź do koszyka →",
    added: "Produkt dodany do koszyka",
    order: "Twoje zamówienie",
    emptyCartTitle: "Koszyk jest pusty",
    emptyCartText: "Dodaj produkty ze sklepu.",
    summary: "Podsumowanie",
    products: "Produkty",
    delivery: "Dostawa",
    free: "Gratis",
    total: "Razem",
    checkout: "Przejdź do kasy",
    orderData: "Dane zamówienia",
    checkoutTrail: "Finalizacja zamówienia",
    customerData: "Dane klienta",
    name: "Imię i nazwisko",
    email: "E-mail",
    phone: "Telefon",
    street: "Ulica i numer",
    zip: "Kod pocztowy",
    city: "Miasto",
    shipping: "Dostawa",
    courier: "Kurier InPost",
    pickup: "Odbiór w salonie NailBar",
    payment: "Płatność",
    onlinePayment: "Szybka płatność online",
    pickupPayment: "Płatność przy odbiorze",
    acceptRules: "Akceptuję regulamin sklepu i politykę prywatności.",
    orderPay: "Zamawiam i płacę",
    orderThanks: "Dziękujemy za zamówienie",
    orderThanksText: "Zamówienie zostało przyjęte. Formularz opłacenia zamówienia przyjdzie na podany adres e-mail.",
    footer: "NailBar Giżycko · perfumy, pielęgnacja i zestawy prezentowe",
    accessibility: "Dostępność",
    fontOn: "Standardowa czcionka",
    fontOff: "Powiększ czcionki",
    linksOn: "Usuń podkreślenie",
    linksOff: "Podkreśl linki",
    bwOn: "Wyłącz czarno-biały",
    bwOff: "Tryb czarno-biały",
    tour: "Spacer 360",
    navEU: "Projekty unijne",
    euTitleShort: "Unia Europejska"
  },
  en: {
    salon: "NailBar salon",
    home: "Home",
    shop: "Online shop",
    shopShort: "Shop",
    contact: "Contact",
    cart: "Cart",
    backShop: "Back to shop",
    freeShipping: "Free delivery from 250 PLN",
    secureShopping: "Secure online shopping",
    shopHero: "Online shop",
    shopTitle: "Cosmetics and perfumes",
    shopLead: "Products available at NailBar salon",
    categories: "Categories",
    allProducts: "All products",
    perfumes: "Perfumes",
    face: "Face care",
    body: "Body care",
    sizes: "Sizes",
    storeName: "NailBar shop",
    search: "Search",
    searchPlaceholder: "Product name",
    sorting: "Sorting",
    defaultSort: "Default",
    priceAsc: "Price: low to high",
    priceDesc: "Price: high to low",
    nameSort: "Name A-Z",
    resultCount: count => `Showing ${count} products`,
    new: "New",
    view360: "360° view",
    interactivePreview: "Interactive preview",
    close360: "Close 360 view",
    rotateLeft: "Rotate left",
    rotateRight: "Rotate right",
    startRotate: "Start rotation",
    dragRotate: "Drag to rotate",
    product: "Product",
    productDescription: "Product description",
    productDescriptionText: "A carefully selected product from the NailBar offer. Perfect for daily care, a gift or completing a home beauty ritual.",
    deliveryPickup: "Delivery and pickup",
    deliveryPickupText: "Pickup at NailBar salon and convenient courier delivery are available. Delivery and payment options are shown during checkout.",
    recommended: "You may also like",
    originalProduct: "Original product available in the NailBar shop. Choose a variant and add it to your cart.",
    variant: "Variant",
    standard: "Standard",
    plusVariant: "+10 ml variant (+15.00 PLN)",
    quantity: "Quantity",
    addToCart: "Add to cart",
    goCart: "Go to cart →",
    added: "Product added to cart",
    order: "Your order",
    emptyCartTitle: "Your cart is empty",
    emptyCartText: "Add products from the shop.",
    summary: "Summary",
    products: "Products",
    delivery: "Delivery",
    free: "Free",
    total: "Total",
    checkout: "Proceed to checkout",
    orderData: "Order details",
    checkoutTrail: "Checkout",
    customerData: "Customer details",
    name: "Full name",
    email: "E-mail",
    phone: "Phone",
    street: "Street and number",
    zip: "Postal code",
    city: "City",
    shipping: "Delivery",
    courier: "InPost courier",
    pickup: "Pickup at NailBar salon",
    payment: "Payment",
    onlinePayment: "Fast online payment",
    pickupPayment: "Payment on pickup",
    acceptRules: "I accept the shop rules and privacy policy.",
    orderPay: "Order and pay",
    orderThanks: "Thank you for your order",
    orderThanksText: "The order has been accepted. A payment form will be sent to the e-mail address provided.",
    footer: "NailBar Gizycko · perfumes, care and gift sets",
    accessibility: "Accessibility",
    fontOn: "Standard font",
    fontOff: "Increase font",
    linksOn: "Remove underline",
    linksOff: "Underline links",
    bwOn: "Disable black and white",
    bwOff: "Black and white mode",
    tour: "360° Tour",
    navEU: "EU Projects",
    euTitleShort: "European Union"
  },
  de: {
    salon: "NailBar Salon",
    home: "Startseite",
    shop: "Onlineshop",
    shopShort: "Shop",
    contact: "Kontakt",
    cart: "Warenkorb",
    backShop: "Zurück zum Shop",
    freeShipping: "Kostenloser Versand ab 250 PLN",
    secureShopping: "Sicher online einkaufen",
    shopHero: "Onlineshop",
    shopTitle: "Kosmetik und Parfums",
    shopLead: "Produkte erhältlich im NailBar Salon",
    categories: "Kategorien",
    allProducts: "Alle Produkte",
    perfumes: "Parfums",
    face: "Gesichtspflege",
    body: "Körperpflege",
    sizes: "Größen",
    storeName: "NailBar Shop",
    search: "Suchen",
    searchPlaceholder: "Produktname",
    sorting: "Sortierung",
    defaultSort: "Standard",
    priceAsc: "Preis: aufsteigend",
    priceDesc: "Preis: absteigend",
    nameSort: "Name A-Z",
    resultCount: count => `${count} Produkte angezeigt`,
    new: "Neu",
    view360: "360° Ansicht",
    interactivePreview: "Interaktive Vorschau",
    close360: "360 Ansicht schließen",
    rotateLeft: "Nach links drehen",
    rotateRight: "Nach rechts drehen",
    startRotate: "Drehung starten",
    dragRotate: "Ziehen, um zu drehen",
    product: "Produkt",
    productDescription: "Produktbeschreibung",
    productDescriptionText: "Ein sorgfältig ausgewähltes Produkt aus dem NailBar Angebot. Ideal für tägliche Pflege, als Geschenk oder zur Ergänzung eines Beauty-Rituals zuhause.",
    deliveryPickup: "Lieferung und Abholung",
    deliveryPickupText: "Abholung im NailBar Salon und bequeme Kurierlieferung sind möglich. Liefer- und Zahlungsarten siehst du im Checkout.",
    recommended: "Das könnte dir gefallen",
    originalProduct: "Originalprodukt aus dem NailBar Shop. Wähle eine Variante und lege sie in den Warenkorb.",
    variant: "Variante",
    standard: "Standard",
    plusVariant: "+10 ml Variante (+15,00 PLN)",
    quantity: "Menge",
    addToCart: "In den Warenkorb",
    goCart: "Zum Warenkorb →",
    added: "Produkt wurde in den Warenkorb gelegt",
    order: "Deine Bestellung",
    emptyCartTitle: "Der Warenkorb ist leer",
    emptyCartText: "Füge Produkte aus dem Shop hinzu.",
    summary: "Zusammenfassung",
    products: "Produkte",
    delivery: "Lieferung",
    free: "Gratis",
    total: "Gesamt",
    checkout: "Zur Kasse",
    orderData: "Bestelldaten",
    checkoutTrail: "Checkout",
    customerData: "Kundendaten",
    name: "Vor- und Nachname",
    email: "E-Mail",
    phone: "Telefon",
    street: "Straße und Hausnummer",
    zip: "Postleitzahl",
    city: "Stadt",
    shipping: "Lieferung",
    courier: "InPost Kurier",
    pickup: "Abholung im NailBar Salon",
    payment: "Zahlung",
    onlinePayment: "Schnelle Online-Zahlung",
    pickupPayment: "Zahlung bei Abholung",
    acceptRules: "Ich akzeptiere die Shop-Regeln und die Datenschutzerklärung.",
    orderPay: "Bestellen und bezahlen",
    orderThanks: "Danke für deine Bestellung",
    orderThanksText: "Die Bestellung wurde angenommen. Ein Zahlungsformular wird an die angegebene E-Mail-Adresse gesendet.",
    footer: "NailBar Gizycko · Parfums, Pflege und Geschenksets",
    accessibility: "Barrierefreiheit",
    fontOn: "Standardschrift",
    fontOff: "Schrift vergrößern",
    linksOn: "Unterstreichung entfernen",
    linksOff: "Links unterstreichen",
    bwOn: "Schwarz-Weiß deaktivieren",
    bwOff: "Schwarz-Weiß-Modus",
    tour: "360° Rundgang",
    navEU: "EU-Projekte",
    euTitleShort: "Europäische Union"
  }
};

let storeLanguage = localStorage.getItem("nailbar-language") || "pl";
let renderShop = null;

const t = key => (storeText[storeLanguage] || storeText.pl)[key] || storeText.pl[key] || key;
const money = value => `${Number(value).toFixed(2).replace(".", ",")} zł`;
const getCart = () => {
  try { return JSON.parse(localStorage.getItem("nailbar-cart") || "[]"); }
  catch { return []; }
};
const shippingMethods = {
  inpost: { label: "Paczkomat InPost", price: 14.99 },
  courier: { label: "Kurier InPost", price: 17.99 },
  pickup: { label: "Odbiór w salonie NailBar", price: 0 }
};
const paymentMethods = {
  blik: "BLIK",
  card: "Karta",
  transfer: "Przelew online",
  pickup: "Przy odbiorze"
};
const parcelMachines = [
  { id: "GIZ01M", name: "Paczkomat InPost GIZ01M", address: "ul. Warszawska 17, Giżycko", hours: "24/7", distance: "0,6 km" },
  { id: "GIZ03N", name: "Paczkomat InPost GIZ03N", address: "ul. Smętka 12, Giżycko", hours: "24/7", distance: "1,1 km" },
  { id: "GIZ05A", name: "Paczkomat InPost GIZ05A", address: "al. 1 Maja 4, Giżycko", hours: "24/7", distance: "1,8 km" }
];
let selectedParcel = parcelMachines[0].id;
const saveCart = cart => { localStorage.setItem("nailbar-cart", JSON.stringify(cart)); updateCartCount(); };
const getProduct = id => products.find(product => product.id === Number(id));
const productUrl = product => `/product/#${product.id}`;

function productName(product) {
  if (!product) return "";
  let name = product.name;
  if (storeLanguage === "en") {
    name = name.replace("Zestaw prezentowy", "Gift set");
    name = name.replace("Zestaw", "Set");
    name = name.replace("balsam do ust", "lip balm");
  } else if (storeLanguage === "de") {
    name = name.replace("Zestaw prezentowy", "Geschenkset");
    name = name.replace("Zestaw", "Set");
    name = name.replace("balsam do ust", "Lippenbalsam");
  }
  return name;
}

function categoryLabel(category) {
  if (category === "Perfumy") return t("perfumes");
  if (category === "Pielęgnacja twarzy") return t("face");
  if (category === "Pielęgnacja ciała") return t("body");
  return category;
}

function updateCartCount() {
  const count = getCart().reduce((sum, item) => sum + item.quantity, 0);
  document.querySelectorAll("[data-cart-count]").forEach(element => element.textContent = count);
}

function toast(text) {
  const node = document.createElement("div");
  node.className = "toast";
  node.textContent = text;
  document.body.append(node);
  setTimeout(() => node.remove(), 2200);
}

function addToCart(id, quantity = 1, variant = "Standard") {
  const cart = getCart();
  const key = `${id}-${variant}`;
  const existing = cart.find(item => item.key === key);
  if (existing) existing.quantity += quantity;
  else cart.push({ key, id: Number(id), quantity, variant });
  saveCart(cart);
  toast(t("added"));
}

function productCard(product) {
  const spinButton = productSpins[product.id] ? `<button class="spin-open" type="button" data-product-spin="${product.id}" aria-label="${t("view360")} ${productName(product)}">↻ ${t("view360")}</button>` : "";
  const newBadge = product.id > 300 ? `<span class="new-badge">${t("new")}</span>` : "";
  return `<article class="store-product"><a class="store-product-image" href="${productUrl(product)}"><img loading="lazy" src="${product.image}" alt="${productName(product)}"></a>${newBadge}${spinButton}<div class="store-product-info"><span>${categoryLabel(product.category)}</span><h3><a href="${productUrl(product)}">${productName(product)}</a></h3><p class="price">${money(product.price)}</p></div></article>`;
}

function spinStage(product, compact = false) {
  const frames = productSpins[product.id] || [];
  return `<div class="product-spin-stage${compact ? " compact" : ""}" tabindex="0" data-spin-stage data-product-id="${product.id}" data-frame="0" aria-label="${t("view360")} ${productName(product)}">
    <img class="spin-frame" src="${frames[0] || product.image}" alt="${productName(product)}" draggable="false">
    <span class="spin-angle">0°</span>
    <span class="spin-hint">${t("dragRotate")}</span>
  </div>`;
}

function setSpinFrame(stage, frame) {
  const frames = productSpins[stage.dataset.productId] || [];
  if (!frames.length) return;
  const normalized = ((Math.round(frame) % frames.length) + frames.length) % frames.length;
  stage.dataset.frame = String(normalized);
  stage.querySelector(".spin-frame").src = frames[normalized];
  const angleLabel = stage.querySelector(".spin-angle");
  if (angleLabel) angleLabel.textContent = `${Math.round(normalized / frames.length * 360)}°`;
  const range = stage.closest(".spin-viewer")?.querySelector("[data-spin-range]");
  if (range) range.value = normalized;
}

function setupSpinStage(stage) {
  if (!stage) return;
  let startX = null;
  let startFrame = 0;
  stage.addEventListener("pointerdown", event => {
    startX = event.clientX;
    startFrame = Number(stage.dataset.frame || 0);
    stage.setPointerCapture(event.pointerId);
    stage.classList.add("dragging");
  });
  stage.addEventListener("pointermove", event => {
    if (startX === null) return;
    setSpinFrame(stage, startFrame + (event.clientX - startX) / 12);
  });
  const stop = () => { startX = null; stage.classList.remove("dragging"); };
  stage.addEventListener("pointerup", stop);
  stage.addEventListener("pointercancel", stop);
  stage.addEventListener("keydown", event => {
    if (!["ArrowLeft", "ArrowRight"].includes(event.key)) return;
    event.preventDefault();
    setSpinFrame(stage, Number(stage.dataset.frame || 0) + (event.key === "ArrowRight" ? 1 : -1));
  });
}

function ensureSpinDialog() {
  let dialog = document.querySelector("#productSpinDialog");
  if (dialog) return dialog;
  dialog = document.createElement("dialog");
  dialog.id = "productSpinDialog";
  dialog.className = "spin-dialog";
  dialog.addEventListener("click", event => { if (event.target === dialog) dialog.close(); });
  document.body.append(dialog);
  return dialog;
}

function openProductSpin(product) {
  const frames = productSpins[product.id];
  if (!frames?.length) return;
  frames.forEach(src => { const image = new Image(); image.src = src; });
  const dialog = ensureSpinDialog();
  dialog.innerHTML = `<div class="spin-dialog-head"><div><span>${t("interactivePreview")}</span><strong>${productName(product)}</strong></div><button type="button" data-spin-close aria-label="${t("close360")}">×</button></div>
    <div class="spin-viewer">${spinStage(product)}
      <div class="spin-controls"><button type="button" data-spin-left aria-label="${t("rotateLeft")}">←</button><button type="button" data-spin-play aria-label="${t("startRotate")}">▶</button><input type="range" min="0" max="${frames.length - 1}" value="0" data-spin-range aria-label="${t("view360")}"><button type="button" data-spin-right aria-label="${t("rotateRight")}">→</button></div>
    </div>`;
  const stage = dialog.querySelector("[data-spin-stage]");
  let timer = null;
  const stop = () => { clearInterval(timer); timer = null; dialog.querySelector("[data-spin-play]").textContent = "▶"; };
  setupSpinStage(stage);
  dialog.querySelector("[data-spin-close]").addEventListener("click", () => dialog.close());
  dialog.querySelector("[data-spin-left]").addEventListener("click", () => { stop(); setSpinFrame(stage, Number(stage.dataset.frame) - 1); });
  dialog.querySelector("[data-spin-right]").addEventListener("click", () => { stop(); setSpinFrame(stage, Number(stage.dataset.frame) + 1); });
  dialog.querySelector("[data-spin-range]").addEventListener("input", event => { stop(); setSpinFrame(stage, Number(event.target.value)); });
  dialog.querySelector("[data-spin-play]").addEventListener("click", event => {
    if (timer) { stop(); return; }
    event.currentTarget.textContent = "❚❚";
    timer = setInterval(() => setSpinFrame(stage, Number(stage.dataset.frame) + 1), 85);
  });
  dialog.addEventListener("close", stop, { once: true });
  dialog.showModal();
}

document.addEventListener("click", event => {
  const button = event.target.closest("[data-product-spin]");
  if (!button) return;
  const product = getProduct(button.dataset.productSpin);
  if (product) openProductSpin(product);
});

function initStoreUtilities() {
  const top = document.querySelector(".store-top");
  if (!top || document.querySelector(".store-utilities")) return;
  const controls = document.createElement("div");
  controls.className = "store-utilities";
  controls.innerHTML = `<div class="store-language" aria-label="Wybór języka">
    <button type="button" data-store-language="pl">PL</button>
    <button type="button" data-store-language="en">EN</button>
    <button type="button" data-store-language="de">DE</button>
  </div>
  <button class="store-a11y" type="button" data-store-access="font">A+</button>
  <button class="store-a11y" type="button" data-store-access="links">U</button>
  <button class="store-a11y" type="button" data-store-access="bw">BW</button>`;
  top.append(controls);
  controls.querySelectorAll("[data-store-language]").forEach(button => button.addEventListener("click", () => {
    storeLanguage = button.dataset.storeLanguage;
    localStorage.setItem("nailbar-language", storeLanguage);
    applyStoreLanguage();
    // Sync other modules
    if (typeof applyLanguage === "function") {
      language = storeLanguage;
      applyLanguage();
    }
  }));
  controls.querySelector("[data-store-access='font']").addEventListener("click", () => toggleAccess("a11y-large", "nailbar-a11y-font"));
  controls.querySelector("[data-store-access='links']").addEventListener("click", () => toggleAccess("a11y-links", "nailbar-a11y-links"));
  controls.querySelector("[data-store-access='bw']").addEventListener("click", () => toggleAccess("a11y-bw", "nailbar-a11y-bw"));
}

function toggleAccess(className, storageKey) {
  document.body.classList.toggle(className);
  localStorage.setItem(storageKey, document.body.classList.contains(className) ? "1" : "0");
  updateAccessButtons();
}

function restoreAccess() {
  if (localStorage.getItem("nailbar-a11y-font") === "1") document.body.classList.add("a11y-large");
  if (localStorage.getItem("nailbar-a11y-links") === "1") document.body.classList.add("a11y-links");
  if (localStorage.getItem("nailbar-a11y-bw") === "1") document.body.classList.add("a11y-bw");
}

function updateAccessButtons() {
  document.querySelectorAll("[data-store-language]").forEach(button => {
    button.classList.toggle("active", button.dataset.storeLanguage === storeLanguage);
  });
  const font = document.querySelector("[data-store-access='font']");
  const links = document.querySelector("[data-store-access='links']");
  const bw = document.querySelector("[data-store-access='bw']");
  if (font) { font.textContent = document.body.classList.contains("a11y-large") ? t("fontOn") : t("fontOff"); font.classList.toggle("active", document.body.classList.contains("a11y-large")); }
  if (links) { links.textContent = document.body.classList.contains("a11y-links") ? t("linksOn") : t("linksOff"); links.classList.toggle("active", document.body.classList.contains("a11y-links")); }
  if (bw) { bw.textContent = document.body.classList.contains("a11y-bw") ? t("bwOn") : t("bwOff"); bw.classList.toggle("active", document.body.classList.contains("a11y-bw")); }
}

function setText(selector, value) {
  const element = document.querySelector(selector);
  if (element) element.textContent = value;
}

function applyStoreLanguage() {
  document.documentElement.lang = storeLanguage;
  setText(".store-top > span", page === "checkout" ? t("secureShopping") : t("freeShipping"));
  setText(".store-top > a", t("salon"));
  const cartLink = document.querySelector(".cart-link");
  if (cartLink) cartLink.innerHTML = `${t("cart")} <strong data-cart-count>0</strong>`;
  
  const euLinkText = document.querySelector(".store-eu-link span:last-child");
  if (euLinkText) euLinkText.textContent = t("euTitleShort");

  if (!document.querySelector(".site-footer")) {
    setText("footer p", t("footer"));
  }
  if (page === "shop") applyShopStaticText();
  if (page === "product") applyProductStaticText();
  if (page === "cart") applyCartStaticText();
  if (page === "checkout") applyCheckoutStaticText();
  updateAccessButtons();
  updateCartCount();
  if (renderShop) renderShop();
}

function applyShopStaticText() {
  setText(".store-hero p", t("shopHero"));
  setText(".store-hero h1", t("shopTitle"));
  setText(".store-hero span", t("shopLead"));
  setText(".breadcrumb strong", t("shopShort"));
  const headings = document.querySelectorAll(".filters h2");
  if (headings[0]) headings[0].textContent = t("categories");
  if (headings[1]) headings[1].textContent = t("sizes");
  setText(".products-toolbar p", t("storeName"));
  setText("#productsTitle", t("allProducts"));
  const labels = document.querySelectorAll(".products-toolbar label");
  if (labels[0]) labels[0].childNodes[0].textContent = t("search");
  if (labels[1]) labels[1].childNodes[0].textContent = t("sorting");
  const search = document.querySelector("#storeSearch");
  if (search) search.placeholder = t("searchPlaceholder");
  const sort = document.querySelector("#storeSort");
  if (sort) {
    sort.options[0].textContent = t("defaultSort");
    sort.options[1].textContent = t("priceAsc");
    sort.options[2].textContent = t("priceDesc");
    sort.options[3].textContent = t("nameSort");
  }
}

function applyProductStaticText() {
  setText("#productBreadcrumb", document.querySelector("#productBreadcrumb")?.textContent || t("product"));
  const desc = document.querySelectorAll(".product-description > div");
  if (desc[0]) { desc[0].querySelector("h2").textContent = t("productDescription"); desc[0].querySelector("p").textContent = t("productDescriptionText"); }
  if (desc[1]) { desc[1].querySelector("h2").textContent = t("deliveryPickup"); desc[1].querySelector("p").textContent = t("deliveryPickupText"); }
  setText(".recommended h2", t("recommended"));
}

function applyCartStaticText() {
  setText(".store-kicker", t("order"));
  setText(".cart-page h1", t("cart"));
  setText(".breadcrumb strong", t("cart"));
}

function applyCheckoutStaticText() {
  setText(".breadcrumb strong", t("checkoutTrail"));
  setText(".store-kicker", t("checkoutTrail"));
  setText(".checkout-form h1", t("orderData"));
  const legends = document.querySelectorAll(".checkout-form legend");
  if (legends[0]) legends[0].textContent = t("customerData");
  if (legends[1]) legends[1].textContent = t("shipping");
  if (legends[2]) legends[2].textContent = t("payment");
  const labels = document.querySelectorAll(".form-grid label");
  [t("name"), t("email"), t("phone"), t("street"), t("zip"), t("city")].forEach((label, index) => {
    if (labels[index]) labels[index].childNodes[0].textContent = label;
  });
}

function initShop() {
  const grid = document.querySelector("#storeGrid");
  if (!grid) return;
  let category = "Wszystkie", query = "", sort = "default";
  const filterLabels = {
    "Wszystkie": "allProducts",
    "Perfumy": "perfumes",
    "Pielęgnacja twarzy": "face",
    "Pielęgnacja ciała": "body"
  };
  document.querySelectorAll(".filter").forEach(button => {
    button.addEventListener("click", () => {
      category = button.dataset.category;
      document.querySelectorAll(".filter").forEach(item => item.classList.toggle("active", item === button));
      render();
    });
  });
  document.querySelector("#storeSearch").addEventListener("input", event => { query = event.target.value; render(); });
  document.querySelector("#storeSort").addEventListener("change", event => { sort = event.target.value; render(); });
  function render() {
    document.querySelectorAll(".filter").forEach(button => {
      const amount = button.dataset.category === "Wszystkie" ? products.length : products.filter(product => product.category === button.dataset.category).length;
      button.innerHTML = `${t(filterLabels[button.dataset.category] || "allProducts")} <span>${amount}</span>`;
    });
    let visible = products.filter(product => (category === "Wszystkie" || product.category === category) && product.name.toLowerCase().includes(query.toLowerCase()));
    if (sort === "price-asc") visible.sort((a, b) => a.price - b.price);
    if (sort === "price-desc") visible.sort((a, b) => b.price - a.price);
    if (sort === "name") visible.sort((a, b) => a.name.localeCompare(b.name, "pl"));
    grid.innerHTML = visible.map(productCard).join("");
    document.querySelector("#resultCount").textContent = t("resultCount")(visible.length);
  }
  renderShop = render;
  render();
}

function initProduct() {
  const detail = document.querySelector("#productDetail");
  if (!detail) return;
  const id = location.hash.slice(1) || new URLSearchParams(location.search).get("id");
  const product = getProduct(id) || products[0];
  document.title = `${productName(product)} | NailBar`;
  document.querySelector("#productBreadcrumb").textContent = productName(product);
  const hasSpin = Boolean(productSpins[product.id]);
  const gallery = hasSpin ? `${spinStage(product, true)}<button class="product-spin-button" type="button" data-product-spin="${product.id}">↻ ${t("view360")}</button>` : `<img src="${product.image}" alt="${productName(product)}">`;
  detail.innerHTML = `<div class="product-gallery">${gallery}</div><div class="product-copy"><p class="category">${categoryLabel(product.category)}</p><h1>${productName(product)}</h1><p class="price" id="detailPrice">${money(product.price)}</p><p>${t("originalProduct")}</p><label class="variant-select">${t("variant")}<select id="variant"><option value="Standard" data-extra="0">${t("standard")}</option><option value="+10 ml" data-extra="15">${t("plusVariant")}</option></select></label><div class="buy-row"><input id="quantity" type="number" min="1" value="1" aria-label="${t("quantity")}"><button class="primary-button" id="addProduct" type="button">${t("addToCart")}</button></div><p><a href="/cart/">${t("goCart")}</a></p></div>`;
  if (hasSpin) setupSpinStage(detail.querySelector("[data-spin-stage]"));
  const variant = document.querySelector("#variant");
  variant.addEventListener("change", () => document.querySelector("#detailPrice").textContent = money(product.price + Number(variant.selectedOptions[0].dataset.extra)));
  document.querySelector("#addProduct").addEventListener("click", () => addToCart(product.id, Number(document.querySelector("#quantity").value), variant.value));
  document.querySelector("#recommendedGrid").innerHTML = products.filter(item => item.id !== product.id && item.category === product.category).slice(0, 4).map(productCard).join("");
}

function cartTotals(cart, shipping = 14.99) {
  const subtotal = cart.reduce((sum, item) => {
    const product = getProduct(item.id);
    return sum + (product ? product.price + (item.variant === "+10 ml" ? 15 : 0) : 0) * item.quantity;
  }, 0);
  const delivery = subtotal === 0 || subtotal >= 250 ? 0 : shipping;
  return { subtotal, shipping: delivery, total: subtotal + delivery };
}

function renderCart() {
  const items = document.querySelector("#cartItems");
  if (!items) return;
  const cart = getCart();
  if (!cart.length) {
    items.innerHTML = `<div class="empty-cart"><h2>${t("emptyCartTitle")}</h2><p>${t("emptyCartText")}</p><a class="primary-button" href="/shop/">${t("shop")}</a></div>`;
    document.querySelector("#cartSummary").innerHTML = "";
    return;
  }
  items.innerHTML = cart.map(item => {
    const product = getProduct(item.id);
    if (!product) return "";
    const price = product.price + (item.variant === "+10 ml" ? 15 : 0);
    return `<article class="cart-item"><img src="${product.image}" alt="${productName(product)}"><div><h3><a href="${productUrl(product)}">${productName(product)}</a></h3><p>${t("variant")}: ${item.variant}</p><p class="price">${money(price)}</p></div><input class="cart-qty" data-key="${item.key}" type="number" min="1" value="${item.quantity}" aria-label="${t("quantity")}"><strong class="price">${money(price * item.quantity)}</strong><button class="remove-item" data-key="${item.key}" aria-label="Usuń produkt">×</button></article>`;
  }).join("");
  document.querySelectorAll(".cart-qty").forEach(input => input.addEventListener("change", () => {
    const cartItems = getCart();
    const item = cartItems.find(entry => entry.key === input.dataset.key);
    if (item) item.quantity = Math.max(1, Number(input.value));
    saveCart(cartItems);
    renderCart();
  }));
  document.querySelectorAll(".remove-item").forEach(button => button.addEventListener("click", () => {
    saveCart(getCart().filter(item => item.key !== button.dataset.key));
    renderCart();
  }));
  const totals = cartTotals(cart);
  document.querySelector("#cartSummary").innerHTML = `<h2>${t("summary")}</h2><div class="summary-line"><span>${t("products")}</span><strong>${money(totals.subtotal)}</strong></div><div class="summary-line"><span>${t("delivery")}</span><strong>${totals.shipping ? money(totals.shipping) : t("free")}</strong></div><div class="summary-line summary-total"><span>${t("total")}</span><strong>${money(totals.total)}</strong></div><a class="primary-button" href="/checkout/">${t("checkout")}</a><small>${t("freeShipping")}.</small>`;
}

function initCheckout() {
  const summary = document.querySelector("#checkoutSummary");
  if (!summary) return;
  const form = document.querySelector("#checkoutForm");
  form.setAttribute("novalidate", "novalidate");
  const parcelPicker = document.querySelector("#parcelPicker");
  const parcelList = document.querySelector("#parcelList");

  function shippingValue() {
    return form.querySelector("[name='shipping']:checked")?.value || "inpost";
  }

  function paymentValue() {
    return form.querySelector("[name='payment']:checked")?.value || "blik";
  }

  function renderParcels() {
    if (!parcelList) return;
    parcelList.innerHTML = parcelMachines.map(parcel => `<button class="parcel-row${parcel.id === selectedParcel ? " active" : ""}" type="button" data-parcel="${parcel.id}">
      <span><strong>${parcel.name}</strong><small>${parcel.address}</small></span>
      <span><strong>${parcel.distance}</strong><small>${parcel.hours}</small></span>
    </button>`).join("");
    document.querySelectorAll("[data-parcel]").forEach(button => {
      button.classList.toggle("active", button.dataset.parcel === selectedParcel);
      button.addEventListener("click", () => {
        selectedParcel = button.dataset.parcel;
        renderParcels();
        renderSummary();
      });
    });
  }

  function renderSummary() {
    const cart = getCart();
    const method = shippingMethods[shippingValue()] || shippingMethods.inpost;
    const totals = cartTotals(cart, method.price);
    const parcel = parcelMachines.find(item => item.id === selectedParcel);
    if (parcelPicker) parcelPicker.hidden = shippingValue() !== "inpost";
    document.querySelectorAll(".payment-card").forEach(card => {
      const input = card.querySelector("input");
      const disabled = input.value === "pickup" && shippingValue() !== "pickup";
      input.disabled = disabled;
      card.classList.toggle("disabled", disabled);
      if (disabled && input.checked) form.querySelector("[name='payment'][value='blik']").checked = true;
    });
    if (!cart.length) {
      summary.innerHTML = `<h2>${t("emptyCartTitle")}</h2><p>${t("emptyCartText")}</p><a class="primary-button" href="/shop/">${t("shop")}</a>`;
      return;
    }
    const destination = shippingValue() === "inpost" && parcel ? `<div class="summary-box"><span>Paczkomat</span><strong>${parcel.id}</strong><small>${parcel.address}</small></div>` : "";
    const paymentLabel = paymentMethods[paymentValue()] || paymentValue();
    summary.innerHTML = `<h2>Podsumowanie</h2><div class="summary-section"><h3>Produkty</h3>${cart.map(item => {
      const product = getProduct(item.id);
      if (!product) return "";
      const price = product.price + (item.variant === "+10 ml" ? 15 : 0);
      return `<div class="summary-item"><img src="${product.image}" alt="${productName(product)}"><span><strong>${productName(product)}</strong><small>${item.variant} · ${item.quantity} szt.</small></span><strong>${money(price * item.quantity)}</strong></div>`;
    }).join("")}</div><div class="summary-section"><h3>Forma dostawy</h3><div class="summary-line"><span>${method.label}</span><strong>${totals.shipping ? money(totals.shipping) : t("free")}</strong></div>${destination}</div><div class="summary-section"><h3>Płatność</h3><div class="summary-line"><span>Formularz opłacenia</span><strong>e-mail</strong></div><small>Po przyjęciu zamówienia formularz płatności zostanie wysłany na podany adres e-mail.</small></div><div class="summary-line"><span>Produkty</span><strong>${money(totals.subtotal)}</strong></div><div class="summary-line"><span>Dostawa</span><strong>${totals.shipping ? money(totals.shipping) : t("free")}</strong></div><div class="summary-line summary-total"><span>${t("total")}</span><strong>${money(totals.total)}</strong></div><p class="checkout-error" id="checkoutError" aria-live="polite" hidden></p><button class="primary-button" type="submit">Złóż zamówienie</button><small>${t("freeShipping")}.</small>`;
  }

  function setCheckoutError(message, target) {
    const error = document.querySelector("#checkoutError");
    if (error) {
      error.textContent = message;
      error.hidden = false;
    }
    if (target) {
      target.classList.add("invalid");
      target.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }

  function clearCheckoutErrors() {
    document.querySelectorAll(".invalid").forEach(node => node.classList.remove("invalid"));
    const error = document.querySelector("#checkoutError");
    if (error) {
      error.textContent = "";
      error.hidden = true;
    }
  }

  function validateCheckout() {
    clearCheckoutErrors();
    const firstInvalidInput = [...form.querySelectorAll("input[required], select[required], textarea[required]")].find(input => {
      if (input.type === "radio") return !form.querySelector(`[name="${input.name}"]:checked`);
      if (input.type === "checkbox") return !input.checked;
      return !input.value.trim();
    });
    if (!firstInvalidInput) return true;
    const target = firstInvalidInput.closest(".choice") || firstInvalidInput.closest("label") || firstInvalidInput.closest("fieldset");
    const isTerms = firstInvalidInput.type === "checkbox" && firstInvalidInput.closest(".checkout-final");
    setCheckoutError(isTerms ? "Zaakceptuj regulamin i politykę prywatności, żeby przejść do płatności." : "Uzupełnij wymagane dane zamówienia.", target);
    firstInvalidInput.focus({ preventScroll: true });
    return false;
  }

  renderParcels();
  renderSummary();
  form.querySelectorAll("[name='shipping'], [name='payment']").forEach(input => input.addEventListener("change", renderSummary));
  form.addEventListener("submit", event => {
    event.preventDefault();
    if (!validateCheckout()) return;
    const cart = getCart();
    const method = shippingMethods[shippingValue()] || shippingMethods.inpost;
    const totals = cartTotals(cart, method.price);
    const orderId = `NB/${new Date().getFullYear()}/${String(Date.now()).slice(-6)}`;
    const customerEmail = form.querySelector('[name="email"]')?.value.trim() || "podany adres e-mail";
    const shippingLabel = method.label;
    const parcel = parcelMachines.find(item => item.id === selectedParcel);
    const shippingDetail = shippingValue() === "inpost" && parcel ? `${parcel.id}, ${parcel.address}` : shippingLabel;
    summary.innerHTML = `<div class="payment-loader" role="status" aria-live="polite"><span class="loader-ring"></span><h2>Przyjmujemy zamówienie</h2><p>Za chwilę pokażemy potwierdzenie. Formularz opłacenia zamówienia trafi na: ${customerEmail}.</p><strong>${money(totals.total)}</strong></div>`;
    form.classList.add("checkout-processing");
    setTimeout(() => {
      localStorage.removeItem("nailbar-cart");
      updateCartCount();
      form.classList.remove("checkout-processing");
      form.innerHTML = `<div class="checkout-complete"><p class="store-kicker">Zamówienie przyjęte</p><h1>${t("orderThanks")}</h1><p>${t("orderThanksText")}</p><div class="payment-status"><span>Numer zamówienia</span><strong>${orderId}</strong></div><div class="payment-status"><span>Do zapłaty</span><strong>${money(totals.total)}</strong></div><div class="payment-status"><span>Forma dostawy</span><strong>${shippingLabel}</strong></div><div class="payment-status"><span>Szczegóły dostawy</span><strong>${shippingDetail}</strong></div><div class="payment-status"><span>Formularz płatności</span><strong>${customerEmail}</strong></div><p class="checkout-note">Na podany adres e-mail przyjdzie formularz opłacenia zamówienia. Zamówienie zostanie przekazane do realizacji po opłaceniu.</p><a class="primary-button" href="/shop/">${t("backShop")}</a></div>`;
    }, 1400);
  });
}

restoreAccess();
initStoreUtilities();
initShop();
initProduct();
renderCart();
initCheckout();
applyStoreLanguage();
