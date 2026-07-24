/* empty css                 */import"./modulepreload-polyfill-Dezn_h7o.js";document.querySelectorAll(`.footer-col h3`).forEach(e=>{e.addEventListener(`click`,()=>{window.innerWidth<=768&&e.parentElement.classList.toggle(`active`)})});var e=new URLSearchParams(window.location.search),t=parseInt(e.get(`id`))||1,n=products.find(e=>e.id===t)||products[0];function r(e){let t=[],n=[];if(e.category===`Taśmy LED`)t=[{name:`Napięcie`,value:`24V DC`},{name:`Moc`,value:`10.6W/m`},{name:`Diody`,value:`180 LED/m`},{name:`CRI (Ra)`,value:`≥ 80`},{name:`Gwarancja`,value:`7 lat`}],n=e.title.includes(`4000K`)?[{label:`4000K`,desc:`Neutralna`,color:`#fff5e0`}]:e.title.includes(`3000K`)?[{label:`3000K`,desc:`Ciepła biel`,color:`#ffe0a0`}]:[{label:`3000K`,desc:`Ciepła biel`,color:`#ffe0a0`},{label:`4000K`,desc:`Neutralna`,color:`#fff5e0`}];else if(e.category===`Sterowniki LED`)t=[{name:`Napięcie`,value:`12V / 24V DC`},{name:`Zasięg`,value:`do 30m`},{name:`Częstotliwość`,value:`2.4GHz RF`},{name:`Prąd wyjściowy`,value:`12A max`},{name:`Gwarancja`,value:`5 lat`}],n=e.title.includes(`RGBCCT`)?[{label:`RGB+CCT`,desc:`16M kolorów + CCT`,color:`linear-gradient(to right, red, orange, yellow, green, blue, violet, white)`}]:e.title.includes(`RGBW`)?[{label:`RGB+W`,desc:`16M kolorów + biel`,color:`linear-gradient(to right, red, green, blue, white)`}]:e.title.includes(`RGB`)?[{label:`RGB`,desc:`16M kolorów`,color:`linear-gradient(to right, red, green, blue)`}]:e.title.includes(`CCT`)?[{label:`CCT`,desc:`Ciepła-Zimna biel`,color:`linear-gradient(to right, #ffe0a0, #dce8ff)`}]:[{label:`Mono`,desc:`Jednokolorowy`,color:`#fff`}];else if(e.category===`Zasilacze LED`){let n=e.title.match(/\d+W/)?e.title.match(/\d+W/)[0]:`18W`;t=[{name:`Napięcie wejściowe`,value:`200-240V AC`},{name:`Napięcie wyjściowe`,value:e.title.includes(`24V`)?`24V DC`:`12V DC`},{name:`Moc maksymalna`,value:n},{name:`Klasa szczelności`,value:`IP67 (wodoodporny)`},{name:`Gwarancja`,value:`7 lat`}]}else t=[{name:`Gwarancja`,value:`5 lat`}];return{specs:t,barwy:n}}document.title=`Prescot LED - ${n.title}`,document.getElementById(`pTitle`).textContent=n.title,document.getElementById(`pCategory`).textContent=n.category,document.getElementById(`pPrice`).innerHTML=`${n.price.toFixed(2)} zł <span class="price-unit">/ ${n.category===`Taśmy LED`?`metr`:`szt.`}</span>`,document.getElementById(`pDesc`).textContent=n.description;var i=document.getElementById(`productActionsBar`);if(i){i.innerHTML=``;let e=[];(n.category===`Taśmy LED`||n.category===`Sterowniki LED`)&&e.push(`
          <button class="product-action-item" onclick="document.getElementById('popupBarwa').style.display='flex'">
            <i class="ph ph-palette"></i>
            <span>Barwy światła</span>
          </button>
        `),n.has3D&&e.push(`
          <button class="product-action-item" id="actionBar3DBtn">
            <i class="ph ph-cube"></i>
            <span>Model 3D (AR)</span>
          </button>
        `),n.has360&&e.push(`
          <button class="product-action-item" id="actionBar360Btn">
            <i class="ph ph-arrows-clockwise"></i>
            <span>Widok 360°</span>
          </button>
        `),n.video&&e.push(`
          <button class="product-action-item" id="actionBarVideoBtn">
            <i class="ph ph-play-circle"></i>
            <span>Prezentacja wideo</span>
          </button>
        `),e.push(`
        <button class="product-action-item" id="actionBarAskBtn">
          <i class="ph ph-question"></i>
          <span>Zapytaj o produkt</span>
        </button>
      `),e.push(`
        <button class="product-action-item" id="actionBarShareBtn">
          <i class="ph ph-share-network"></i>
          <span>Udostępnij</span>
        </button>
      `),i.innerHTML=e.join(`<div class="product-action-divider"></div>`);let t=document.getElementById(`actionBar3DBtn`);t&&t.addEventListener(`click`,()=>{let e=document.getElementById(`trigger3D`);e&&e.click()});let r=document.getElementById(`actionBar360Btn`);r&&r.addEventListener(`click`,()=>{let e=document.getElementById(`trigger360`);e&&e.click()});let a=document.getElementById(`actionBarVideoBtn`);a&&a.addEventListener(`click`,()=>{let e=document.getElementById(`mainVideo`);j(),e&&(e.style.display=`block`,e.style.opacity=`1`,e.src=n.video,e.play().catch(e=>console.log(`Video play failed:`,e)));let t=document.querySelector(`.thumbnail.video-thumbnail-card`);t&&(document.querySelectorAll(`.thumbnail`).forEach(e=>e.classList.remove(`active`)),t.classList.add(`active`))});let o=document.getElementById(`actionBarAskBtn`);o&&o.addEventListener(`click`,()=>{let e=document.getElementById(`askQuestionTextarea`);e&&(e.value=`Dzień dobry, mam pytanie dotyczące produktu: ${n.title}. Chciałbym dowiedzieć się więcej o...`),document.getElementById(`popupZapytaj`).style.display=`flex`});let s=document.getElementById(`actionBarShareBtn`);s&&s.addEventListener(`click`,()=>{navigator.clipboard.writeText(window.location.href).then(()=>{let e=document.getElementById(`shareToast`);e&&(e.classList.add(`show`),setTimeout(()=>e.classList.remove(`show`),2e3))}).catch(e=>console.error(`Could not copy text: `,e))})}var a=document.getElementById(`deluxBadgeContainer`);a&&(n.title.toLowerCase().includes(`delux`)||n.description.toLowerCase().includes(`delux`)||n.title.toLowerCase().includes(`premium`)||n.description.toLowerCase().includes(`premium`)?a.style.display=`block`:a.style.display=`none`);var o=document.getElementById(`heroProductTitle`),s=document.getElementById(`heroProductCategory`);o&&(o.textContent=n.title),s&&(s.textContent=n.category);var c=document.getElementById(`breadcrumbCategory`);c&&(c.textContent=n.category,c.href=`shop.html?cat=${encodeURIComponent(n.category)}`);var l=document.getElementById(`breadcrumbTitle`);l&&(l.textContent=n.title);var u=document.getElementById(`breadcrumbMiniImg`);u&&(u.src=n.image);var d=document.getElementById(`breadcrumbMiniTitle`);d&&(d.textContent=n.title),document.getElementById(`descTab`).innerHTML=`
      <p style="font-size: 15px; line-height: 1.8; color: #555; margin-bottom: 30px;">${n.description}</p>
    `;var f=document.getElementById(`mainImg`);f.src=n.images[0],f.alt=n.title;var p=document.getElementById(`qvThumbnails`),m=document.createElement(`img`);if(m.className=`thumbnail active`,m.src=n.images[0],m.alt=`${n.title} - 1`,m.addEventListener(`click`,()=>{j(),f.style.display=`block`,f.src=n.images[0],document.querySelectorAll(`.thumbnail`).forEach(e=>e.classList.remove(`active`)),m.classList.add(`active`)}),p.appendChild(m),n.video){let e=document.createElement(`div`);e.className=`thumbnail video-thumbnail-card`,e.style.position=`relative`,e.style.cursor=`pointer`,e.innerHTML=`
        <img src="${n.images[0]}" style="width: 100%; height: 100%; object-fit: cover; opacity: 0.6; border-radius: inherit;">
        <div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); background: var(--primary-color); color: #fff; width: 22px; height: 22px;  display: flex; align-items: center; justify-content: center; font-size: 8px; box-shadow: 0 2px 6px rgba(0,0,0,0.2);">▶</div>
      `,e.addEventListener(`click`,()=>{j(),A&&(A.style.display=`block`,A.style.opacity=`1`,A.src=n.video,A.play().catch(e=>console.log(`Video thumb play failed:`,e))),document.querySelectorAll(`.thumbnail`).forEach(e=>e.classList.remove(`active`)),e.classList.add(`active`)}),p.appendChild(e)}n.images.slice(1).forEach((e,t)=>{let r=document.createElement(`img`);r.className=`thumbnail`,r.src=e,r.alt=`${n.title} - ${t+2}`,r.addEventListener(`click`,()=>{j(),f.style.display=`block`,f.src=e,document.querySelectorAll(`.thumbnail`).forEach(e=>e.classList.remove(`active`)),r.classList.add(`active`)}),p.appendChild(r)});var ee=document.getElementById(`pColors`);n.colors&&n.colors.length>0?n.colors.forEach((e,t)=>{let r=t===0?`active`:``,i=document.createElement(`div`);i.className=`color-swatch-dot ${r}`,i.style.backgroundColor=e,i.addEventListener(`click`,()=>{if(document.querySelectorAll(`.color-swatch-dot`).forEach(e=>e.classList.remove(`active`)),i.classList.add(`active`),n.variants){let t=n.variants.find(t=>t.color===e);t&&(document.getElementById(`pPrice`).innerHTML=`${t.price.toFixed(2)} zł <span class="price-unit">/ ${n.category===`Taśmy LED`?`metr`:`szt.`}</span>`,t.image&&(f.src=t.image))}}),ee.appendChild(i)}):document.getElementById(`colorContainer`).style.display=`none`;var te=document.getElementById(`pSizes`);n.sizes&&n.sizes.length>0?n.sizes.forEach((e,t)=>{let n=t===0?`active`:``,r=document.createElement(`div`);r.className=`size-swatch ${n}`,r.textContent=e,r.addEventListener(`click`,()=>{document.querySelectorAll(`.size-swatch`).forEach(e=>e.classList.remove(`active`)),r.classList.add(`active`)}),te.appendChild(r)}):document.getElementById(`sizeContainer`).style.display=`none`;var ne=document.getElementById(`productVariantsContainer`);n.variants&&n.variants.length>0&&n.variants[0].name&&(ne.innerHTML=`
        <h4 style="margin-bottom: 15px; font-size: 14px; font-weight: 600; text-transform: uppercase; letter-spacing: 1px; color: rgba(0,0,0,0.5);">Dostępne modele</h4>
        <div class="variants-grid">
          ${n.variants.map(e=>`
        <a href="product.html?id=${e.id}" class="variant-card ${e.id===t?`active`:``}">
          <div class="variant-card-img">
            <img src="${e.image}" alt="${e.name}">
            ${e.video?`<video src="${e.video}" loop muted playsinline autoplay class="variant-card-video"></video>`:``}
          </div>
          <span class="variant-card-label">${e.name}</span>
        </a>
      `).join(``)}
        </div>
      `);var h=document.getElementById(`btnParametry`),g=document.getElementById(`btnBarwa`),_=document.getElementById(`popupParametry`),v=document.getElementById(`popupBarwa`),y=document.querySelector(`#popupParametry .spec-table`),b=document.querySelector(`.spec-table-inline`),{specs:x}=r(n);if(y&&x.length>0&&(y.innerHTML=x.map(e=>`
        <tr><td>${e.name}</td><td><strong>${e.value}</strong></td></tr>
      `).join(``)),b&&x.length>0)b.innerHTML=x.map(e=>`
        <tr style="border-bottom: 1px solid #f5f5f5;">
          <td style="padding: 10px 0; color: #666; font-size: 13px;">${e.name}</td>
          <td style="padding: 10px 0; text-align: right; font-weight: 600; color: #1a1a1a; font-size: 13px;">${e.value}</td>
        </tr>
      `).join(``);else if(b){let e=b.closest(`.product-accordion`);e&&(e.style.display=`none`)}var S=document.querySelector(`#popupBarwa .color-temp-grid`);if(S){let{barwy:e}=r(n);e.length>0?(S.innerHTML=e.map(e=>`
          <div class="color-temp-option" style="background: ${e.color}; border: 1px solid #ddd; padding: 15px; border-radius: 8px; text-align: center;">
            <div class="ct-circle" style="background: #fff; border: 1px solid #ccc; width: 30px; height: 30px;  margin: 0 auto 10px;"></div>
            <span style="font-weight: 700; color: #1a1a1a; display: block; font-size: 14px;">${e.label}</span>
            <small style="color: #666; font-size: 11px; display: block; margin-top: 4px;">${e.desc}</small>
          </div>
        `).join(``),S.style.display=`grid`,S.style.gridTemplateColumns=`repeat(auto-fit, minmax(130px, 1fr))`,S.style.gap=`15px`):g&&(g.style.display=`none`)}h&&_&&h.addEventListener(`click`,()=>{_.style.display=`flex`}),g&&v&&g.addEventListener(`click`,()=>{v.style.display=`flex`}),document.querySelectorAll(`.product-popup-overlay`).forEach(e=>{e.addEventListener(`click`,t=>{t.target===e&&(e.style.display=`none`)})});var C=document.getElementById(`qtyInput`);document.getElementById(`qtyMinus`).addEventListener(`click`,()=>{let e=parseInt(C.value);e>1&&(C.value=e-1)}),document.getElementById(`qtyPlus`).addEventListener(`click`,()=>{C.value=parseInt(C.value)+1}),[`descTab`,`shippingTab`,`reviewsTab`].forEach(e=>{document.getElementById(`${e}Header`).addEventListener(`click`,t=>{document.querySelectorAll(`.tab-header`).forEach(e=>e.classList.remove(`active`)),document.querySelectorAll(`.tab-pane`).forEach(e=>e.classList.remove(`active`)),t.target.classList.add(`active`),document.getElementById(e).classList.add(`active`)})});var w=document.getElementById(`triggerImage`),T=document.getElementById(`trigger3D`),E=document.getElementById(`trigger360`),D=document.getElementById(`modelViewerContainer`),O=document.getElementById(`sixtyViewerContainer`),k=document.getElementById(`sixtyImg`),re=document.getElementById(`sixtyLoading`);if(n.has3D&&(T.style.display=`flex`),n.has360){E.style.display=`flex`;let e=n.images360Count||39,t=n.images360Pattern,r=0,i=[];for(let n=1;n<=e;n++){let a=t.replace(`{index}`,n),o=new Image;o.src=a,o.onload=()=>{r++,r===e&&(re.style.display=`none`)},i.push(o)}k.src=t.replace(`{index}`,1)}var A=document.getElementById(`mainVideo`);function j(){f.style.display=`none`,A&&(A.style.display=`none`,A.style.opacity=`0`,A.pause()),D.style.display=`none`,O.style.display=`none`,w.classList.remove(`active`),T.classList.remove(`active`),E.classList.remove(`active`),B()}n.video&&A&&A.addEventListener(`playing`,()=>{A.style.opacity=`1`}),w.addEventListener(`click`,()=>{j();let e=document.querySelector(`.thumbnail.active`);e&&e.classList.contains(`video-thumbnail-card`)?A&&(A.style.display=`block`,A.style.opacity=`1`,A.src=n.video,A.play().catch(e=>console.log(`Main video play failed:`,e))):f.style.display=`block`,w.classList.add(`active`)}),n.video&&A&&(A.src=n.video),T.addEventListener(`click`,()=>{j(),D.style.display=`block`,T.classList.add(`active`),D.querySelector(`model-viewer`)||(D.innerHTML=`
          <model-viewer 
            src="${n.modelSrc}" 
            poster="${n.posterSrc}" 
            camera-controls 
            ar 
            ar-modes="webxr scene-viewer quick-look" 
            style="width: 100%; height: 100%; min-height: 500px;" 
            alt="${n.title}">
          </model-viewer>
        `)}),E.addEventListener(`click`,()=>{j(),O.style.display=`flex`,E.classList.add(`active`)});var M=1,N=n.images360Count||39;function P(e){e<1&&(e=N),e>N&&(e=1),M=e,k.src=n.images360Pattern.replace(`{index}`,e)}var F=!1,I=0;O.addEventListener(`mousedown`,e=>{F=!0,I=e.clientX,B()}),window.addEventListener(`mousemove`,e=>{if(!F)return;let t=e.clientX-I;Math.abs(t)>12&&(P(t>0?M-1:M+1),I=e.clientX)}),window.addEventListener(`mouseup`,()=>{F=!1}),O.addEventListener(`touchstart`,e=>{F=!0,I=e.touches[0].clientX,B()}),O.addEventListener(`touchmove`,e=>{if(!F)return;let t=e.touches[0].clientX-I;Math.abs(t)>12&&(P(t>0?M-1:M+1),I=e.touches[0].clientX)}),O.addEventListener(`touchend`,()=>{F=!1});var ie=document.getElementById(`sixtyPrev`),ae=document.getElementById(`sixtyNext`),L=document.getElementById(`sixtyPlay`),R=document.getElementById(`sixtyPause`),z=null;ie.addEventListener(`click`,e=>{e.stopPropagation(),B(),P(M-1)}),ae.addEventListener(`click`,e=>{e.stopPropagation(),B(),P(M+1)}),L.addEventListener(`click`,e=>{e.stopPropagation(),oe()}),R.addEventListener(`click`,e=>{e.stopPropagation(),B()});function oe(){z||=(L.style.display=`none`,R.style.display=`flex`,setInterval(()=>{P(M+1)},70))}function B(){z&&=(clearInterval(z),null),L.style.display=`flex`,R.style.display=`none`}var V=document.getElementById(`mainHeader`),H=document.getElementById(`headerLogo`);!document.querySelector(`.page-hero, .mockup-hero-slider, .hero, .hero-section`)&&V&&(V.classList.add(`scrolled`),H&&(H.src=`images/logo-dark.png`),V.classList.add(`force-scrolled`)),window.addEventListener(`scroll`,()=>{V&&(V.classList.contains(`force-scrolled`)||(window.scrollY>50?(V.classList.add(`scrolled`),H&&(H.src=`images/logo-dark.png`)):(V.classList.remove(`scrolled`),H&&(H.src=`images/logo-white.png`))))});var U=document.getElementById(`headerSearchInput`),W=document.getElementById(`headerSearchBtn`);function G(){if(U){let e=U.value.trim();e&&(window.location.href=`shop.html?search=${encodeURIComponent(e)}`)}}U&&U.addEventListener(`keypress`,e=>{e.key===`Enter`&&G()}),W&&W.addEventListener(`click`,G);var K=document.getElementById(`recommendedGrid`);if(K){let e=products.filter(e=>e.id!==n.id&&e.category===n.category).slice(0,4);if(e.length<4){let t=products.filter(e=>e.id!==n.id&&e.category!==n.category).slice(0,4-e.length);e=[...e,...t]}e.forEach(e=>{let t=``;e.has3D?t=`
            <button class="action-btn-circle qv-3d-btn" data-id="${e.id}" aria-label="Podgląd 3D">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" style="display: block; margin: auto;"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>
            </button>
          `:e.has360&&(t=`
            <button class="action-btn-circle qv-360-btn" data-id="${e.id}" aria-label="Podgląd 360">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" style="display: block; margin: auto;"><path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67"/></svg>
            </button>
          `);let n=`
          <div class="mockup-product-card" data-id="${e.id}">
            <p class="mockup-product-category">${e.category}</p>
            <div class="mockup-product-media" style="position: relative; overflow: hidden;">
              <img src="${e.images[0]}" alt="${e.title}" class="mockup-product-img">
              ${e.video?`
                <video class="mockup-product-video" data-src="${e.video}" loop muted playsinline style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; object-fit: cover; opacity: 0; transition: opacity 0.3s ease; pointer-events: none;"></video>
              `:``}
              <div class="product-actions-hover">
                <button class="action-btn-circle qv-wishlist-btn" data-id="${e.id}" aria-label="Dodaj do listy życzeń">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" style="display: block; margin: auto;"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
                </button>
                <button class="action-btn-circle qv-eye-btn" data-id="${e.id}" aria-label="Szybki podgląd">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" style="display: block; margin: auto;"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                </button>
                ${t}
              </div>
            </div>
            <div class="mockup-product-info">
              <h3 class="mockup-product-title"><a href="product.html?id=${e.id}">${e.title}</a></h3>
              <p class="mockup-product-price">
                ${e.price.toFixed(2)} zł <span class="price-unit">/ ${e.category===`Taśmy LED`?`metr`:`szt.`}</span>
              </p>
              <button class="mockup-btn qv-add-cart-btn" data-id="${e.id}" style="width: 100%; margin-top: 12px; padding: 10px 20px !important; font-size: 11px !important;">
                Dodaj do koszyka
              </button>
            </div>
          </div>
        `;K.insertAdjacentHTML(`beforeend`,n)})}var q=document.getElementById(`stickyCartBar`),J=document.getElementById(`mainAddToCartBtn`);q&&J&&n&&(document.getElementById(`stickyCartImg`).src=n.images[0],document.getElementById(`stickyCartTitle`).textContent=n.title,document.getElementById(`stickyCartPrice`).textContent=n.price.toFixed(2)+` zł`,document.getElementById(`stickyAddToCartBtn`).addEventListener(`click`,()=>{J.click()}),window.addEventListener(`scroll`,()=>{J.getBoundingClientRect().bottom<0?q.classList.add(`active`):q.classList.remove(`active`)}));var Y=JSON.parse(localStorage.getItem(`sklepSC_recentlyViewed`))||[];n&&(Y=Y.filter(e=>e!==n.id),Y.unshift(n.id),Y.length>8&&Y.pop(),localStorage.setItem(`sklepSC_recentlyViewed`,JSON.stringify(Y)));var X=document.getElementById(`recentlyViewedGrid`);if(X){let e=Y.filter(e=>!n||e!==n.id).slice(0,4);e.length>0?e.map(e=>products.find(t=>t.id===e)).filter(e=>e).forEach(e=>{let t=``;e.has3D?t=`
              <button class="action-btn-circle qv-3d-btn" data-id="${e.id}" aria-label="Podgląd 3D">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" style="display: block; margin: auto;"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>
              </button>
            `:e.has360&&(t=`
              <button class="action-btn-circle qv-360-btn" data-id="${e.id}" aria-label="Podgląd 360">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" style="display: block; margin: auto;"><path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67"/></svg>
              </button>
            `);let n=`
            <div class="mockup-product-card" data-id="${e.id}">
              <p class="mockup-product-category">${e.category}</p>
              <div class="mockup-product-media" style="position: relative; overflow: hidden;">
                <img src="${e.images[0]}" alt="${e.title}" class="mockup-product-img">
                ${e.video?`
                  <video class="mockup-product-video" data-src="${e.video}" loop muted playsinline style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; object-fit: cover; opacity: 0; transition: opacity 0.3s ease; pointer-events: none;"></video>
                `:``}
                <div class="product-actions-hover">
                  <button class="action-btn-circle qv-wishlist-btn" data-id="${e.id}" aria-label="Dodaj do listy życzeń">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" style="display: block; margin: auto;"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
                </button>
                  <button class="action-btn-circle qv-eye-btn" data-id="${e.id}" aria-label="Szybki podgląd">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" style="display: block; margin: auto;"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                  </button>
                  ${t}
                </div>
              </div>
              <div class="mockup-product-info">
                <h3 class="mockup-product-title"><a href="product.html?id=${e.id}">${e.title}</a></h3>
                <p class="mockup-product-price">
                  ${e.price.toFixed(2)} zł <span class="price-unit">/ ${e.category===`Taśmy LED`?`metr`:`szt.`}</span>
                </p>
              <button class="mockup-btn qv-add-cart-btn" data-id="${e.id}" style="width: 100%; margin-top: 12px; padding: 10px 20px !important; font-size: 11px !important;">
                Dodaj do koszyka
              </button>
              </div>
            </div>
          `;X.insertAdjacentHTML(`beforeend`,n)}):X.parentElement.style.display=`none`}initSharedPopups();var se=document.getElementById(`menuToggle`),ce=document.getElementById(`mobileMenu`);se.addEventListener(`click`,()=>{ce.classList.toggle(`active`)});var Z=document.getElementById(`deliveryCountdown`),Q=document.getElementById(`estimatedDeliveryDate`);function $(){if(!Z||!Q)return;let e=new Date,t=new Date;t.setHours(18,0,0,0);let n,r=!0;e<t?n=t:(n=new Date(t),n.setDate(t.getDate()+1),r=!1);let i=n-e,a=Math.floor(i/(1e3*60*60)),o=Math.floor(i%(1e3*60*60)/(1e3*60)),s=Math.floor(i%(1e3*60)/1e3);Z.textContent=`${String(a).padStart(2,`0`)}g ${String(o).padStart(2,`0`)}m ${String(s).padStart(2,`0`)}s`;let c=new Date(e);r||c.setDate(c.getDate()+1),c.getDay()===0&&c.setDate(c.getDate()+1);let l=new Date(c);l.setDate(l.getDate()+1),l.getDay()===6?l.setDate(l.getDate()+2):l.getDay()===0&&l.setDate(l.getDate()+1);let u=l.toLocaleDateString(`pl-PL`,{weekday:`long`,day:`numeric`,month:`long`});Q.textContent=u.charAt(0).toUpperCase()+u.slice(1)}$(),setInterval($,1e3);