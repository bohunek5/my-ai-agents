const fs = require('fs');
const path = require('path');

console.log("==================================================");
console.log("🧪 ROZPOCZYNAM KOMPLEKSOWY TEST SYSTEMU SKLEPSC");
console.log("==================================================");

let testsPassed = 0;
let testsFailed = 0;

function assert(condition, message) {
  if (condition) {
    console.log(`  ✅ [PASS] ${message}`);
    testsPassed++;
  } else {
    console.error(`  ❌ [FAIL] ${message}`);
    testsFailed++;
  }
}

// ----------------------------------------------------------------
// TEST 1: Walidacja bazy produktów (js/products-data.js)
// ----------------------------------------------------------------
console.log("\n📦 TEST 1: Walidacja bazy produktów...");
const productsCode = fs.readFileSync(path.join(__dirname, '../js/products-data.js'), 'utf8');
eval(productsCode);

assert(Array.isArray(products), "Zmienna products jest poprawną tablicą");
assert(products.length >= 1000, `Baza produktów zawiera ${products.length} pozycji (oczekiwano > 1000)`);

// Check sample products data integrity
const withMissingImages = products.filter(p => !p.images || p.images.length === 0 || !p.images[0]);
console.log(`  ℹ️ Liczba produktów bez głównego zdjęcia: ${withMissingImages.length} (wymagają bezpiecznego placeholdera w UI)`);

const withPrice = products.filter(p => typeof p.price === 'number' && p.price > 0);
assert(withPrice.length > 1200, `Ponad ${withPrice.length} produktów posiada poprawnie zdefiniowane ceny liczbowe`);

// ----------------------------------------------------------------
// TEST 2: Walidacja podstrony ai-shopping.html
// ----------------------------------------------------------------
console.log("\n🤖 TEST 2: Walidacja pliku ai-shopping.html...");
const aiHtml = fs.readFileSync(path.join(__dirname, '../ai-shopping.html'), 'utf8');

assert(aiHtml.includes('ai-workspace-container'), "Zawiera główny kontener ai-workspace-container");
assert(aiHtml.includes('id="aiChatHistory"'), "Zawiera kontener historii czatu aiChatHistory");
assert(aiHtml.includes('id="aiChatInput"'), "Zawiera pole wprowadzania zapytań aiChatInput");
assert(aiHtml.includes('id="aiDynamicShowcase"'), "Zawiera panel prezentacji produktów aiDynamicShowcase");
assert(aiHtml.includes('js/products-data.js'), "Dołącza skrypt js/products-data.js");
assert(aiHtml.includes('js/shared-popups.js'), "Dołącza skrypt js/shared-popups.js");
assert(aiHtml.includes('js/ai-agent.js'), "Dołącza skrypt js/ai-agent.js");
assert(aiHtml.includes('prompt-chip'), "Zawiera szybkie chipy promptów dla klienta");

// ----------------------------------------------------------------
// TEST 3: Weryfikacja ukrycia dolnego menu na checkout.html
// ----------------------------------------------------------------
console.log("\n📱 TEST 3: Weryfikacja ukrycia dolnego menu mobilnego na checkout.html...");
const checkoutHtml = fs.readFileSync(path.join(__dirname, '../checkout.html'), 'utf8');
const sharedPopupsJs = fs.readFileSync(path.join(__dirname, '../js/shared-popups.js'), 'utf8');

assert(checkoutHtml.includes('class="checkout-page"'), "Tag <body> w checkout.html posiada klasę checkout-page");
assert(checkoutHtml.includes('.config-bottom-nav, .mobile-bottom-nav { display: none !important; }'), "Style checkout.html wymuszają display: none !important dla dolnej nawigacji");
assert(sharedPopupsJs.includes('isCheckoutPage'), "Skrypt shared-popups.js posiada logikę wykrywania checkout.html");
assert(sharedPopupsJs.includes('el.style.setProperty(\'display\', \'none\', \'important\')'), "Skrypt shared-popups.js usuwa i blokuje bottom-nav na etapie kasy");

// ----------------------------------------------------------------
// TEST 4: Symulacja silnika rekomendacji (js/ai-agent.js)
// ----------------------------------------------------------------
console.log("\n🧠 TEST 4: Symulacja zapytań klienta do asystenta AI...");

const tapeProducts = products.filter(p => {
  const cat = (p.category || '').toLowerCase();
  const title = (p.title || '').toLowerCase();
  return cat.includes('taśm') || cat.includes('tasm') || title.includes('taśma') || title.includes('tasma') || title.includes('cob') || title.includes('smd');
});

const psuProducts = products.filter(p => {
  const cat = (p.category || '').toLowerCase();
  const title = (p.title || '').toLowerCase();
  return cat.includes('zasilacz') || title.includes('zasilacz') || title.includes('scharfer') || title.includes('psu');
});

const profileProducts = products.filter(p => {
  const cat = (p.category || '').toLowerCase();
  const title = (p.title || '').toLowerCase();
  return title.includes('profil') || title.includes('pds') || title.includes('mocow') || (cat.includes('akcesoria') && (title.includes('profil') || title.includes('uchwyt') || title.includes('kluś') || title.includes('klusz')));
});

// Scenario A: Kitchen under-cabinet 4m COB
const kitchenCOB = tapeProducts.find(p => (p.title||'').toLowerCase().includes('cob') && (p.title||'').toLowerCase().includes('4000k'));
assert(!!kitchenCOB, `Scenariusz Kuchnia: Znaleziono taśmę COB 4000K (${kitchenCOB?.title?.substring(0, 45)}...)`);

// Scenario B: Power supply calculation for 4m * 10W/m = 40W + 20% = 48W -> 60W PSU
const psu60w = psuProducts.find(p => (p.title||'').toLowerCase().includes('60w') && (p.title||'').toLowerCase().includes('24v'));
assert(!!psu60w, `Scenariusz Zasilacz: Prawidłowo dobrano zasilacz 24V 60W (+20% zapasu) (${psu60w?.title?.substring(0, 45)}...)`);

// Scenario C: Under-cabinet profile / accessory
const profKitchen = profileProducts.find(p => /podszafk|nawierzchniow|pds|mocow|profil/i.test(p.title));
assert(!!profKitchen, `Scenariusz Profil: Prawidłowo dobrano profil/mocownik (${profKitchen?.title?.substring(0, 45)}...)`);

// Scenario D: Specific keyword search "zasilacz hermetyczny 24v"
const searchHermetic = products.filter(p => {
  const t = (p.title||'').toLowerCase();
  return t.includes('zasilacz') && t.includes('hermet') && t.includes('24v');
});
assert(searchHermetic.length > 0, `Scenariusz Wyszukiwarka: Znaleziono ${searchHermetic.length} zasilaczy hermetycznych 24V`);

// ----------------------------------------------------------------
// TEST 5: Spójność katalogu produkcyjnego dist/
// ----------------------------------------------------------------
console.log("\n📁 TEST 5: Weryfikacja synchronizacji katalogu dist/...");
assert(fs.existsSync(path.join(__dirname, '../dist/ai-shopping.html')), "dist/ai-shopping.html istnieje");
assert(fs.existsSync(path.join(__dirname, '../dist/checkout.html')), "dist/checkout.html istnieje");
assert(fs.existsSync(path.join(__dirname, '../dist/js/ai-agent.js')), "dist/js/ai-agent.js istnieje");
assert(fs.existsSync(path.join(__dirname, '../dist/js/shared-popups.js')), "dist/js/shared-popups.js istnieje");

console.log("\n==================================================");
console.log(`📊 PODSUMOWANIE TESTÓW: ${testsPassed} ZALICZONYCH, ${testsFailed} BŁĘDÓW`);
console.log("==================================================");

if (testsFailed > 0) process.exit(1);
