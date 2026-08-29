/**
 * Prescot LED — AI Shopping Assistant & Conversational Filters
 * Inteligentny doradca zakupowy LED z pełną znajomością bazy produktów Prescot & zasilaczy Scharfer
 */

document.addEventListener('DOMContentLoaded', async () => {
  const chatHistory = document.querySelector('.chat-history');
  const chatInput = document.getElementById('aiChatInput');
  const sendButton = document.querySelector('.ai-input-area button, #aiSendBtn');
  const inputArea = document.querySelector('.ai-input-area');
  const quickChips = document.querySelectorAll('.prompt-chip, .ai-quick-chip');
  const resultsContainer = document.getElementById('aiDynamicShowcase');

  if (!chatHistory || !chatInput || !sendButton) return;

  chatInput.addEventListener('focus', () => inputArea?.classList.add('focused'));
  chatInput.addEventListener('blur', () => inputArea?.classList.remove('focused'));

  // --- Catalog Repository ---
  let catalog = [];
  
  function loadCatalog() {
    if (typeof products !== 'undefined' && Array.isArray(products) && products.length > 0) {
      return products;
    }
    if (typeof defaultProducts !== 'undefined' && Array.isArray(defaultProducts) && defaultProducts.length > 0) {
      return defaultProducts;
    }
    try {
      const stored = localStorage.getItem('sklepSC_products');
      if (stored) return JSON.parse(stored);
    } catch (e) {
      console.warn('Cannot parse local products', e);
    }
    return [];
  }

  catalog = loadCatalog();

  // Retry loading if products-data.js loads async
  if (catalog.length === 0) {
    let retries = 0;
    const checkInterval = setInterval(() => {
      catalog = loadCatalog();
      retries++;
      if (catalog.length > 0 || retries > 10) {
        clearInterval(checkInterval);
        initCatalogIndexes();
      }
    }, 200);
  }

  // --- Specialized Catalog Subsets ---
  let tapeProducts = [];
  let psuProducts = [];
  let controllerProducts = [];
  let profileProducts = [];
  let accessoryProducts = [];

  function initCatalogIndexes() {
    if (!catalog.length) return;
    
    tapeProducts = catalog.filter(p => {
      const cat = (p.category || '').toLowerCase();
      const title = (p.title || '').toLowerCase();
      return cat.includes('taśm') || cat.includes('tasm') || title.includes('taśma') || title.includes('tasma') || title.includes('cob') || title.includes('smd');
    });

    psuProducts = catalog.filter(p => {
      const cat = (p.category || '').toLowerCase();
      const title = (p.title || '').toLowerCase();
      return cat.includes('zasilacz') || title.includes('zasilacz') || title.includes('scharfer') || title.includes('psu');
    });

    controllerProducts = catalog.filter(p => {
      const cat = (p.category || '').toLowerCase();
      const title = (p.title || '').toLowerCase();
      return cat.includes('sterownik') || title.includes('sterownik') || title.includes('pilot') || title.includes('ściemniacz') || title.includes('dimmer') || title.includes('tuya') || title.includes('zigbee');
    });

    profileProducts = catalog.filter(p => {
      const cat = (p.category || '').toLowerCase();
      const title = (p.title || '').toLowerCase();
      return title.includes('profil') || (cat.includes('akcesoria') && title.includes('profil'));
    });

    accessoryProducts = catalog.filter(p => {
      const cat = (p.category || '').toLowerCase();
      const title = (p.title || '').toLowerCase();
      return cat.includes('akcesoria') || title.includes('złączk') || title.includes('włącznik') || title.includes('zaślepk') || title.includes('klosz');
    });
  }

  initCatalogIndexes();

  // --- Context Manager & State Machine ---
  let aiSessionState = {
    application: null,    // 'kitchen', 'living', 'bathroom', 'stairs', 'bedroom', 'outdoor', 'commercial'
    intensity: null,      // 'strong', 'functional', 'decorative'
    technology: 'auto',   // 'cob', 'smd', 'auto'
    light: null,          // 'warm', 'neutral', 'cold', 'cct', 'rgb', 'rgbw'
    length: null,         // number in meters
    environment: 'dry',   // 'dry', 'damp', 'outdoor'
    control: null,        // 'dimmer', 'touchless', 'tuya', 'rf', 'none'
    voltage: 'auto',      // '12', '24', 'auto'
    warranty: null,
    lastProposedItems: [],
    awaitingClarification: null,
    pendingLength: null
  };

  function resetSession() {
    aiSessionState = {
      application: null,
      intensity: null,
      technology: 'auto',
      light: null,
      length: null,
      environment: 'dry',
      control: null,
      voltage: 'auto',
      warranty: null,
      lastProposedItems: [],
      awaitingClarification: null,
      pendingLength: null
    };
  }

  // --- NLP & Intent Extractor ---
  function updateIntent(text) {
    const lower = text.toLowerCase();
    
    function isNegated(keyword) {
      const regex = new RegExp(`(?:nie\\s+|bez\\s+|oprócz\\s+|zamiast\\s+)(?:[\\wąęłńóśźż]+\\s+){0,2}${keyword}`, 'i');
      return regex.test(lower);
    }

    // Length parsing (e.g. "5m", "5 metrów", "12.5 m", "ok. 4 metry")
    const lengthMatch = lower.match(/(\d+(?:[.,]\d+)?)\s*(?:m|metr|metrow|metrów|mb)/);
    if (lengthMatch && !isNegated('m')) {
      aiSessionState.length = parseFloat(lengthMatch[1].replace(',', '.'));
      aiSessionState.pendingLength = null;
    } else {
      const numberMatch = lower.match(/(?:\b|^)(\d+(?:[.,]\d+)?)(?:\b|$)/);
      if (numberMatch && !aiSessionState.length) {
        const num = parseFloat(numberMatch[1].replace(',', '.'));
        if (num > 0 && num <= 100 && num !== 12 && num !== 24 && num !== 48 && num !== 230 && num !== 7 && num !== 2700 && num !== 3000 && num !== 4000 && num !== 6000) {
          aiSessionState.pendingLength = num;
        }
      }
    }

    // Application Intent
    if (/kuchni|blat|szafk|podszafk/i.test(lower) && !isNegated('kuchni')) {
      aiSessionState.application = 'kitchen';
      if (!aiSessionState.technology || aiSessionState.technology === 'auto') aiSessionState.technology = 'cob';
    } else if (/salon|sufit|wnęk|karton|g-k|korytarz/i.test(lower) && !isNegated('salon')) {
      aiSessionState.application = 'living';
    } else if (/schod|stopni/i.test(lower) && !isNegated('schod')) {
      aiSessionState.application = 'stairs';
    } else if (/łazienk|lazienk|wann|prysznic|basen/i.test(lower) && !isNegated('lazienk')) {
      aiSessionState.application = 'bathroom';
      aiSessionState.environment = 'damp';
    } else if (/zewnątrz|zewnetrz|ogród|taras|elewacj|balkon/i.test(lower) && !isNegated('taras')) {
      aiSessionState.application = 'outdoor';
      aiSessionState.environment = 'outdoor';
    } else if (/sypialn|łóżko|lozk|zagłow/i.test(lower) && !isNegated('sypialn')) {
      aiSessionState.application = 'bedroom';
    } else if (/biuro|sklep|komercyj|gabinet/i.test(lower) && !isNegated('biuro')) {
      aiSessionState.application = 'commercial';
    }

    // Light Color Intent
    if (/ciepł|ciepl|warm|3000k|2700k/i.test(lower) && !isNegated('ciepł')) aiSessionState.light = 'warm';
    else if (/zimn|chłod|cold|6000k|6500k/i.test(lower) && !isNegated('zimn')) aiSessionState.light = 'cold';
    else if (/neutral|dzien|natural|4000k|4500k/i.test(lower) && !isNegated('neutral')) aiSessionState.light = 'neutral';
    else if (/cct|regulowan|dwukolor/i.test(lower) && !isNegated('cct')) aiSessionState.light = 'cct';
    else if (/rgbw/i.test(lower) && !isNegated('rgbw')) aiSessionState.light = 'rgbw';
    else if (/rgb|kolor|kolorow/i.test(lower) && !isNegated('rgb')) aiSessionState.light = 'rgb';

    // Technology Intent
    if (/cob|linia|gładk|kropek|bezpunkt|jednolit/i.test(lower)) {
      aiSessionState.technology = isNegated('cob') || isNegated('kropek') ? 'smd' : 'cob';
    } else if (/smd|2835|5050/i.test(lower) && !isNegated('smd')) {
      aiSessionState.technology = 'smd';
    }

    // Voltage Intent
    if (/24v/i.test(lower) && !isNegated('24v')) aiSessionState.voltage = '24';
    else if (/12v/i.test(lower) && !isNegated('12v')) aiSessionState.voltage = '12';
    else if (/48v/i.test(lower) && !isNegated('48v')) aiSessionState.voltage = '48';
    else if (/230v/i.test(lower) && !isNegated('230v')) aiSessionState.voltage = '230';
    else if (aiSessionState.length && aiSessionState.length >= 10) aiSessionState.voltage = '24';

    // Control Intent
    if (/bezdotyk|zbliżeniow|machnięcie|gest/i.test(lower)) aiSessionState.control = 'touchless';
    else if (/tuya|wifi|wi-fi|zigbee|smart|aplikacj|telefon/i.test(lower)) aiSessionState.control = 'tuya';
    else if (/pilot|radiow|rf|ściemniacz/i.test(lower)) aiSessionState.control = 'rf';

    const wantsToBuy = /dodaj|kup|zamów|biorę|zapakuj|dorzuć|wrzuć do koszyka/i.test(lower);
    const wantsReset = /zacznijmy od nowa|reset|od nowa|usuń|wyczyść/i.test(lower);

    if (aiSessionState.awaitingClarification && aiSessionState.awaitingClarification !== 'confirm_length') {
      aiSessionState.awaitingClarification = null;
    }

    return { wantsToBuy, wantsReset };
  }

  // --- Helper Utilities ---
  function formatPrice(value) {
    return new Intl.NumberFormat('pl-PL', { style: 'currency', currency: 'PLN' }).format(Number(value) || 0);
  }

  function getProductImage(product) {
    if (product && Array.isArray(product.images) && product.images.length > 0 && product.images[0]) {
      return product.images[0];
    }
    return 'images/okladka-produkty.webp';
  }

  function updateCartBadge() {
    const cart = JSON.parse(localStorage.getItem('prescot_cart') || '[]');
    const count = cart.reduce((total, item) => total + Number(item.qty || item.quantity || 0), 0);
    const badge = document.getElementById('cartBadge');
    if (badge) badge.textContent = String(count);
  }

  function cartRecord(product, quantity = 1) {
    return {
      id: product.id,
      title: product.title,
      price: Number(product.price) || 0,
      compareAtPrice: Number(product.compareAtPrice) || Number(product.price) || 0,
      image: getProductImage(product),
      qty: Number(quantity) || 1,
      category: product.category || 'Produkt LED',
      kod_handlowy: product.kod_handlowy || product.kod_katalogowy || ''
    };
  }

  function addItemsToCart(items) {
    const cart = JSON.parse(localStorage.getItem('prescot_cart') || '[]');
    items.forEach((item) => {
      const existing = cart.find((entry) => String(entry.id) === String(item.id));
      if (existing) {
        existing.qty = Number(existing.qty || existing.quantity || 0) + Number(item.qty || 1);
      } else {
        cart.push(item);
      }
    });
    localStorage.setItem('prescot_cart', JSON.stringify(cart));
    updateCartBadge();
    window.dispatchEvent(new Event('storage'));
    if (typeof window.openCartDrawer === 'function') {
      window.openCartDrawer();
    }
  }

  // --- DOM Chat Renderers ---
  function scrollToBottom() {
    if (!chatHistory) return;
    chatHistory.scrollTo({
      top: chatHistory.scrollHeight,
      behavior: 'smooth'
    });
  }

  function addMessageBubble(isUser = false) {
    const msg = document.createElement('div');
    msg.className = `chat-message ${isUser ? 'user' : 'ai'}`;
    
    let avatar = isUser 
      ? `<div class="avatar avatar-user"><i class="ph ph-user"></i></div>`
      : `<div class="avatar avatar-ai"><img src="images/prescot-pattern.png" alt="Prescot AI"></div>`;

    const bubble = document.createElement('div');
    bubble.className = 'message-bubble';

    msg.innerHTML = avatar;
    msg.appendChild(bubble);
    chatHistory.appendChild(msg);
    scrollToBottom();
    return bubble;
  }

  function parseMarkdown(text) {
    return text
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/\n/g, '<br>');
  }

  async function streamText(bubble, text, onComplete) {
    let index = 0;
    bubble.innerHTML = '';
    const speed = Math.max(4, 16 - Math.floor(text.length / 80));
    
    const interval = setInterval(() => {
      const chunk = text.substr(index, Math.floor(Math.random() * 3) + 2);
      bubble.textContent += chunk; 
      index += chunk.length;
      scrollToBottom();
      
      if (index >= text.length) {
        clearInterval(interval);
        bubble.innerHTML = parseMarkdown(text);
        if (onComplete) onComplete();
      }
    }, speed);
  }

  // --- Perfect Product Card Generator (Zero "Placków", Zero pustych pól) ---
  function renderProductCardHTML(p, quantity = 1, customBadge = '') {
    const img = getProductImage(p);
    const stockNum = Number.parseFloat(String(p.stock || '10').replace(',', '.'));
    const isAvailable = stockNum > 0;
    const hasDiscount = Number(p.compareAtPrice) > Number(p.price);
    const discountPercent = hasDiscount ? Math.round((1 - Number(p.price) / Number(p.compareAtPrice)) * 100) : 0;
    const isTape = (p.category || '').toLowerCase().includes('taśm') || (p.title || '').toLowerCase().includes('taśma') || (p.title || '').toLowerCase().includes('cob');
    const unit = isTape ? 'metr' : 'szt.';
    const code = p.kod_handlowy || p.kod_katalogowy || p.attributes?.Kod_produktu || '';
    
    return `
      <div class="ai-product-card mockup-product-card" data-id="${p.id}">
        <div class="mockup-product-media">
          <div class="catalog-product-badges">
            <span class="catalog-stock-badge ${isAvailable ? 'is-available' : 'is-unavailable'}">
              ${isAvailable ? 'Dostępny' : 'Na zamówienie'}
            </span>
            ${customBadge ? `<span class="catalog-custom-badge">${customBadge}</span>` : ''}
            ${discountPercent > 0 ? `<span class="catalog-sale-badge">−${discountPercent}%</span>` : ''}
          </div>
          <img src="${img}" alt="${p.title}" class="mockup-product-img" loading="lazy" onerror="this.onerror=null;this.src='images/okladka-produkty.webp'">
        </div>
        <div class="mockup-product-info">
          <div class="catalog-product-meta">
            <span class="product-category-tag">${p.category || 'Prescot LED'}</span>
            ${code ? `<small class="product-sku-code">${code}</small>` : ''}
          </div>
          <h4 class="mockup-product-title">
            <a href="product.html?id=${p.id}" target="_blank" title="${p.title}">${p.title}</a>
          </h4>
          <div class="mockup-product-pricing">
            <span class="catalog-current-price">${formatPrice(p.price)}</span>
            ${hasDiscount ? `<del class="catalog-old-price">${formatPrice(p.compareAtPrice)}</del>` : ''}
            <span class="price-unit">/ ${unit} ${quantity > 1 ? `(x${quantity})` : ''}</span>
          </div>
          <div class="catalog-card-actions">
            <button class="add-to-cart-btn qv-add-cart-btn" type="button" data-id="${p.id}" data-qty="${quantity}" aria-label="Dodaj do koszyka">
              <span class="btn-slide-wrap">
                <span class="btn-txt-default"><i class="ph ph-shopping-cart-simple"></i> Dodaj do koszyka</span>
                <span class="btn-txt-hover"><i class="ph ph-check"></i> Dodaj teraz!</span>
              </span>
            </button>
            <a class="buy-it-now-btn" href="product.html?id=${p.id}" aria-label="Zobacz szczegóły">
              <span class="btn-slide-wrap">
                <span class="btn-txt-default">Szczegóły</span>
                <span class="btn-txt-hover">Zobacz parametry</span>
              </span>
            </a>
          </div>
        </div>
      </div>
    `;
  }

  function renderProductsInBubble(aiBubble, productsList, isBought, headerText) {
    if (!productsList || productsList.length === 0) return;

    let html = `
      <div class="ai-product-results-wrap">
        <div class="ai-results-header">
          <i class="ph ph-sparkle"></i>
          <span>${headerText}</span>
        </div>
        <div class="ai-products-grid">
    `;

    productsList.forEach(item => {
      const prod = item.product || item;
      const qty = item.qty || 1;
      const badge = item.badge || '';
      html += renderProductCardHTML(prod, qty, badge);
    });

    html += `</div></div>`;

    const container = document.createElement('div');
    container.innerHTML = html;

    // Attach click events to card buttons
    container.querySelectorAll('.qv-add-cart-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const pid = btn.dataset.id;
        const pqty = Number(btn.dataset.qty) || 1;
        const targetItem = productsList.find(x => String(x.id || x.product?.id) === String(pid));
        if (targetItem) {
          const productObj = targetItem.product || targetItem;
          addItemsToCart([cartRecord(productObj, pqty)]);
          btn.innerHTML = `<span style="color: #22c55e;">✓ Dodano!</span>`;
          setTimeout(() => {
            btn.innerHTML = `<span class="btn-slide-wrap"><span class="btn-txt-default"><i class="ph ph-shopping-cart-simple"></i> Dodaj do koszyka</span><span class="btn-txt-hover"><i class="ph ph-check"></i> Dodaj teraz!</span></span>`;
          }, 2000);
        }
      });
    });

    aiBubble.appendChild(container);

    // If set was recommended, offer single button to buy complete set
    if (productsList.length > 1 && !isBought) {
      const totalPrice = productsList.reduce((sum, item) => sum + (Number((item.product || item).price) * (item.qty || 1)), 0);
      const setCta = document.createElement('div');
      setCta.className = 'ai-set-summary-bar';
      setCta.innerHTML = `
        <div class="set-total-info">
          <span>Kompletny zestaw (${productsList.length} elementy):</span>
          <strong>${formatPrice(totalPrice)}</strong>
        </div>
        <button class="add-complete-set-btn" type="button">
          <i class="ph ph-shopping-bag"></i> Dodaj cały zestaw do koszyka
        </button>
      `;

      setCta.querySelector('.add-complete-set-btn').addEventListener('click', () => {
        const cartItems = productsList.map(item => cartRecord(item.product || item, item.qty || 1));
        addItemsToCart(cartItems);
        setCta.innerHTML = `<div class="set-success-msg">✓ Kompletny zestaw został pomyślnie dodany do koszyka!</div>`;
      });

      aiBubble.appendChild(setCta);
    }

    // Sync with side showcase if present on page
    if (resultsContainer) {
      updateSideShowcase(productsList, headerText);
    }

    scrollToBottom();
  }

  function updateSideShowcase(productsList, title) {
    if (!resultsContainer) return;
    let gridHTML = `
      <div class="showcase-header">
        <h3><i class="ph ph-lightbulb-filament"></i> ${title}</h3>
        <span class="showcase-count">${productsList.length} ${productsList.length === 1 ? 'pozycja' : 'pozycje'}</span>
      </div>
      <div class="showcase-grid">
    `;
    productsList.forEach(item => {
      gridHTML += renderProductCardHTML(item.product || item, item.qty || 1, item.badge || '');
    });
    gridHTML += `</div>`;
    resultsContainer.innerHTML = gridHTML;

    resultsContainer.querySelectorAll('.qv-add-cart-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const pid = btn.dataset.id;
        const pqty = Number(btn.dataset.qty) || 1;
        const targetItem = productsList.find(x => String(x.id || x.product?.id) === String(pid));
        if (targetItem) {
          addItemsToCart([cartRecord(targetItem.product || targetItem, pqty)]);
        }
      });
    });
  }

  // --- Expert Recommendation & Matching Engine ---
  function findBestMatchingTape(state) {
    if (!tapeProducts.length) return catalog[0] || null;

    let pool = [...tapeProducts];

    // 1. Filter by technology (COB vs SMD)
    if (state.technology === 'cob') {
      const cobFiltered = pool.filter(p => (p.title || '').toLowerCase().includes('cob') || (p.category || '').toLowerCase().includes('cob'));
      if (cobFiltered.length) pool = cobFiltered;
    } else if (state.technology === 'smd') {
      const smdFiltered = pool.filter(p => !(p.title || '').toLowerCase().includes('cob'));
      if (smdFiltered.length) pool = smdFiltered;
    }

    // 2. Filter by light color
    if (state.light) {
      const colorMap = {
        warm: /3000k|2700k|ciepł|ww/i,
        neutral: /4000k|4500k|neutral|nw/i,
        cold: /6000k|6500k|zimn|cw/i,
        cct: /cct|regulowan/i,
        rgbw: /rgbw/i,
        rgb: /rgb/i
      };
      const regex = colorMap[state.light];
      if (regex) {
        const colorFiltered = pool.filter(p => regex.test(p.title) || regex.test(p.description || ''));
        if (colorFiltered.length) pool = colorFiltered;
      }
    }

    // 3. Filter by Voltage
    if (state.voltage !== 'auto') {
      const vRegex = new RegExp(`${state.voltage}v`, 'i');
      const vFiltered = pool.filter(p => vRegex.test(p.title) || vRegex.test(p.attributes?.['Napięcie Wyjściowe'] || ''));
      if (vFiltered.length) pool = vFiltered;
    } else if (state.length && state.length >= 10) {
      // Default to 24V for long runs
      const v24 = pool.filter(p => /24v/i.test(p.title));
      if (v24.length) pool = v24;
    }

    // 4. Filter by IP rating if damp/outdoor
    if (state.environment === 'damp' || state.environment === 'outdoor') {
      const ipFiltered = pool.filter(p => /ip65|ip67|ip68|hermet/i.test(p.title) || /ip65|ip67|ip68/i.test(p.description || ''));
      if (ipFiltered.length) pool = ipFiltered;
    }

    return pool[0] || tapeProducts[0];
  }

  function findMatchingPowerSupply(voltage, totalWattage) {
    if (!psuProducts.length) return null;

    // Power needed with 20% safety margin
    const targetWatts = Math.ceil(totalWattage * 1.2);
    const v = String(voltage || '24').replace(/\D/g, '');

    const matchingVoltage = psuProducts.filter(p => {
      const title = (p.title || '').toLowerCase();
      const attr = JSON.stringify(p.attributes || {}).toLowerCase();
      return title.includes(`${v}v`) || attr.includes(`${v}v`);
    });

    const candidatePool = matchingVoltage.length > 0 ? matchingVoltage : psuProducts;

    // Parse wattage from title
    const withWattage = candidatePool.map(p => {
      const match = (p.title || '').match(/(\d+)\s*w/i);
      const watts = match ? parseInt(match[1], 10) : 100;
      return { product: p, watts };
    });

    // Find smallest PSU that is >= targetWatts
    const valid = withWattage.filter(x => x.watts >= targetWatts).sort((a, b) => a.watts - b.watts);
    if (valid.length > 0) return valid[0].product;

    // Fallback to highest available
    const sortedDesc = withWattage.sort((a, b) => b.watts - a.watts);
    return sortedDesc[0]?.product || null;
  }

  function findMatchingProfile(appType) {
    if (!profileProducts.length) return null;
    if (appType === 'kitchen') {
      const podszafkowy = profileProducts.find(p => /podszafk|nawierzchniow|płaski/i.test(p.title));
      return podszafkowy || profileProducts[0];
    }
    if (appType === 'stairs') {
      const schodowy = profileProducts.find(p => /kątow|narożn|schod/i.test(p.title));
      return schodowy || profileProducts[0];
    }
    if (appType === 'living') {
      const sufitowy = profileProducts.find(p => /wpuszczan|g-k|architektoniczn/i.test(p.title));
      return sufitowy || profileProducts[0];
    }
    return profileProducts[0];
  }

  function findMatchingController(controlType, lightColor) {
    if (!controllerProducts.length) return null;
    if (controlType === 'touchless') {
      const touchless = accessoryProducts.find(p => /bezdotyk|zbliżeniow|włącznik/i.test(p.title)) ||
                        controllerProducts.find(p => /bezdotyk|zbliżeniow/i.test(p.title));
      if (touchless) return touchless;
    }
    if (controlType === 'tuya') {
      const tuya = controllerProducts.find(p => /tuya|wifi|zigbee|smart/i.test(p.title));
      if (tuya) return tuya;
    }
    if (lightColor === 'cct') {
      const cctCtrl = controllerProducts.find(p => /cct/i.test(p.title));
      if (cctCtrl) return cctCtrl;
    }
    if (lightColor === 'rgb' || lightColor === 'rgbw') {
      const rgbCtrl = controllerProducts.find(p => /rgb/i.test(p.title));
      if (rgbCtrl) return rgbCtrl;
    }
    // Default Mono RF Dimmer
    const monoCtrl = controllerProducts.find(p => /mono|ściemniacz|pilot/i.test(p.title));
    return monoCtrl || controllerProducts[0];
  }

  // --- Main Conversational Flow Handler ---
  async function processUserInput(text) {
    if (!text || !text.trim()) return;

    const userBubble = addMessageBubble(true);
    userBubble.textContent = text;
    chatInput.value = '';

    const aiBubble = addMessageBubble(false);
    aiBubble.innerHTML = `<div class="typing-indicator"><span></span><span></span><span></span></div>`;

    await new Promise(r => setTimeout(r, 400 + Math.random() * 300));

    const { wantsToBuy, wantsReset } = updateIntent(text);

    if (wantsReset) {
      resetSession();
      streamText(aiBubble, "Zrozumiałem! Kontekst został zresetowany. O czym porozmawiamy? Do jakiego pomieszczenia potrzebujesz oświetlenia LED?");
      return;
    }

    const lowerText = text.toLowerCase();

    // Friendly greetings
    if (/^(cześć|czesc|witaj|hej|siema|dzień dobry|witam)[\s!.]*$/i.test(lowerText.trim())) {
      streamText(aiBubble, "Cześć! Jestem Twoim inteligentnym doradcą Prescot LED. Dobiorę dla Ciebie kompletny system oświetlenia (taśmę, zasilacz Scharfer, profil i sterowanie) lub pomogę przefiltrować produkty z naszej bazy.\n\nOpowiedz mi o swoim projekcie, np. **'Szukam taśmy COB pod szafki kuchenne 4 metry'**.");
      return;
    }

    // Thank you
    if (/^(dzięki|dzieki|dziekuje|dziękuję|super|ekstra)[\s!.]*$/i.test(lowerText.trim())) {
      streamText(aiBubble, "Z przyjemnością! Jeśli chcesz coś zmienić w parametrach lub dobrać oświetlenie do kolejnego pomieszczenia, po prostu napisz.");
      return;
    }

    // Naked Buy Action for previous set
    if (wantsToBuy && aiSessionState.lastProposedItems.length > 0) {
      addItemsToCart(aiSessionState.lastProposedItems);
      streamText(aiBubble, "Zrobione! **Dodałem zaproponowany zestaw do Twojego koszyka.** Chcesz dobrać coś jeszcze, czy przechodzimy do kasy?", () => {
        renderProductsInBubble(aiBubble, aiSessionState.lastProposedItems, true, "Produkty w Twoim koszyku:");
        aiSessionState.lastProposedItems = [];
      });
      return;
    }

    // State Machine Clarifications
    if (aiSessionState.application) {
      // 1. Missing length
      if (!aiSessionState.length) {
        if (aiSessionState.pendingLength) {
          aiSessionState.length = aiSessionState.pendingLength;
          aiSessionState.pendingLength = null;
        } else {
          aiSessionState.awaitingClarification = 'length';
          const appNames = {
            kitchen: 'kuchni (pod szafki / blat)',
            living: 'salonu / wnęki sufitowej',
            bathroom: 'łazienki',
            stairs: 'schodów',
            bedroom: 'sypialni',
            outdoor: 'oświetlenia zewnętrznego',
            commercial: 'biura / lokalu'
          };
          streamText(aiBubble, `Świetnie, projektujemy oświetlenie do **${appNames[aiSessionState.application] || 'Twojego projektu'}**. Ile dokładnie **metrów** taśmy będziesz potrzebować? (np. 3m, 5m, 12m)`);
          return;
        }
      }

      // 2. Missing light color
      if (!aiSessionState.light) {
        aiSessionState.awaitingClarification = 'light';
        streamText(aiBubble, `Mamy zanotowane **${aiSessionState.length}m** taśmy. Jaką **barwę światła** preferujesz?\n\n- **Neutralna 4000K** (najpopularniejsza, dzienna)\n- **Ciepła 3000K** (przytulna, nastrojowa)\n- **Zimna 6000K** (nowoczesna, laboratoryjna)\n- **CCT** (płynna regulacja ciepła-zimna)\n- **RGB / RGBW** (kolorowa z pilotem/WiFi)`);
        return;
      }

      // 3. Complete Recommendation Set Generation
      const tape = findBestMatchingTape(aiSessionState);
      if (tape) {
        const tapePowerMatch = (tape.title || '').match(/(\d+(?:[.,]\d+)?)\s*w\s*\/?\s*m/i) || (tape.title || '').match(/(\d+)\s*w/i);
        const powerPerMeter = tapePowerMatch ? parseFloat(tapePowerMatch[1].replace(',', '.')) : 10;
        const totalTapePower = Math.ceil(powerPerMeter * (aiSessionState.length || 5));
        const tapeVoltage = /12v/i.test(tape.title) ? '12' : '24';

        const psu = findMatchingPowerSupply(tapeVoltage, totalTapePower);
        const profile = findMatchingProfile(aiSessionState.application);
        const controller = findMatchingController(aiSessionState.control, aiSessionState.light);

        let proposedList = [];

        // 1. Tape with calculated quantity
        const rollLength = 5; // standard roll
        const rollsNeeded = Math.max(1, Math.ceil(aiSessionState.length / rollLength));
        proposedList.push({
          product: tape,
          qty: rollsNeeded,
          badge: `${aiSessionState.length}m (${rollsNeeded}x ${rollLength}m)`
        });

        // 2. Power Supply
        if (psu) {
          const psuWatts = (psu.title.match(/(\d+)\s*w/i)?.[1] || totalTapePower);
          proposedList.push({
            product: psu,
            qty: 1,
            badge: `Zasilacz ${psuWatts}W (Zapas: +20%)`
          });
        }

        // 3. Profile
        if (profile) {
          const profilesNeeded = Math.ceil(aiSessionState.length / 2); // 2m profiles
          proposedList.push({
            product: profile,
            qty: profilesNeeded,
            badge: `Profil aluminiowy (${profilesNeeded}x 2m)`
          });
        }

        // 4. Controller / Switch
        if (controller) {
          proposedList.push({
            product: controller,
            qty: 1,
            badge: 'Dopasowane sterowanie'
          });
        }

        aiSessionState.lastProposedItems = proposedList.map(item => cartRecord(item.product, item.qty));

        let summaryText = `Dobrałem dla Ciebie **kompletny i bezpieczny zestaw oświetlenia LED** do ${aiSessionState.application === 'kitchen' ? 'kuchni' : 'Twojego projektu'} (${aiSessionState.length}m):\n\n` +
          `1. **Taśma LED ${tape.title}** (${tapeVoltage}V, ${powerPerMeter}W/m) — idealna gęstość i brak spadków napięcia.\n` +
          (psu ? `2. **Zasilacz Scharfer ${psu.title}** — z 7-letnią gwarancją i zapasem mocy na poziomie ${Math.ceil(totalTapePower * 1.2)}W.\n` : '') +
          (profile ? `3. **Profil aluminiowy z kloszem** — zapewnia odprowadzanie ciepła i idealny montaż.\n` : '') +
          (controller ? `4. **Sterownik / włącznik ${controller.title}** — wygodna kontrola światła.` : '');

        if (wantsToBuy) {
          addItemsToCart(aiSessionState.lastProposedItems);
          summaryText += `\n\n**Zrozumiałem polecenie — dodałem cały zestaw od razu do Twojego koszyka!**`;
        }

        streamText(aiBubble, summaryText, () => {
          renderProductsInBubble(aiBubble, proposedList, wantsToBuy, "Rekomendowany kompletny zestaw:");
        });
        return;
      }
    }

    // --- Search / Conversational Filter Mode across 1323 Products ---
    const searchClean = lowerText
      .replace(/[.,!?]/g, ' ')
      .replace(/taśmy|tasmę|tasme|tasm/g, 'taśma')
      .replace(/zasilacze|zasilaczy/g, 'zasilacz')
      .replace(/profile|profili/g, 'profil')
      .replace(/sterowniki|sterowników/g, 'sterownik')
      .trim();

    const stopWords = ['do', 'na', 'w', 'o', 'z', 'i', 'a', 'oraz', 'potrzebuje', 'szukam', 'poszukuję', 'chcę', 'kupić', 'proszę', 'potrzebuję', 'dla', 'jakie', 'jaki'];
    const keywords = searchClean.split(/\s+/).filter(w => w.length > 1 && !stopWords.includes(w));

    if (keywords.length > 0) {
      const scored = catalog.map(p => {
        const titleNorm = (p.title || '').toLowerCase();
        const catNorm = (p.category || '').toLowerCase();
        const descNorm = (p.description || '').toLowerCase();
        const attrNorm = JSON.stringify(p.attributes || {}).toLowerCase();
        let score = 0;

        keywords.forEach(k => {
          if (titleNorm.includes(k)) score += 5;
          if (catNorm.includes(k)) score += 2;
          if (attrNorm.includes(k)) score += 2;
          if (descNorm.includes(k)) score += 1;
        });

        // Exact spec matching bonus (e.g. "24v", "60w", "cob", "4000k", "ip65")
        keywords.forEach(k => {
          if (/^\d+(v|w|k)$/.test(k)) {
            if (titleNorm.includes(k)) score += 8;
          }
        });

        return { product: p, score };
      }).filter(x => x.score > 0).sort((a, b) => b.score - a.score).slice(0, 8);

      if (scored.length > 0) {
        const matched = scored.map(x => x.product);
        aiSessionState.lastProposedItems = matched.map(p => cartRecord(p, 1));

        const msg = wantsToBuy
          ? `Znalazłem **${matched.length}** produktów najlepiej pasujących do zapytania i **dodałem je do Twojego koszyka!**`
          : `Przeszukałem bazę produktów Prescot LED i znalazłem **${matched.length}** najlepiej dopasowanych pozycji:`;

        if (wantsToBuy) addItemsToCart(aiSessionState.lastProposedItems);

        streamText(aiBubble, msg, () => {
          renderProductsInBubble(aiBubble, matched, wantsToBuy, "Znalezione produkty w katalogu Prescot:");
        });
        return;
      }
    }

    // Fallback if completely unmatched
    streamText(aiBubble, "Nie znalazłem w bazie dokładnego odpowiednika dla tego sformułowania. Możesz zapytać np. o:\n\n- **'Taśma COB 24V neutralna 4000K'**\n- **'Zasilacz Scharfer 24V 60W ultra slim'**\n- **'Sterownik LED Mono z pilotem RF'**\n- Lub opisać swoje pomieszczenie (kuchnia, salon, łazienka) z wymiarami!");
  }

  // --- Event Listeners ---
  sendButton.addEventListener('click', () => processUserInput(chatInput.value));
  chatInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      processUserInput(chatInput.value);
    }
  });

  // Quick Prompt Chips
  quickChips.forEach(chip => {
    chip.addEventListener('click', () => {
      const prompt = chip.dataset.prompt || chip.textContent.trim();
      if (prompt) {
        chatInput.value = prompt;
        processUserInput(prompt);
      }
    });
  });

  // Initial greeting
  if (chatHistory.children.length === 0) {
    const welcome = addMessageBubble(false);
    welcome.innerHTML = parseMarkdown("Cześć! Jestem **Asystentem Doradczym Prescot LED**. 💡\n\nOpowiedz mi o swoim projekcie (np. *'Potrzebuję 4m taśmy COB pod szafki w kuchni'* lub *'Szukam zasilacza 24V 100W'*), a dobiorę dla Ciebie idealny zestaw z naszej bazy!");
  }
});
