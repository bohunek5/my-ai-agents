import"./modulepreload-polyfill-Dezn_h7o.js";/* empty css                 */document.querySelectorAll(`.footer-col h3`).forEach(e=>{e.addEventListener(`click`,()=>{window.innerWidth<=768&&e.parentElement.classList.toggle(`active`)})});var e=document.getElementById(`mainHeader`),t=document.getElementById(`headerLogo`);!document.querySelector(`.page-hero, .mockup-hero-slider, .hero, .hero-section`)&&e&&(e.classList.add(`scrolled`),t&&(t.src=`images/logo-dark.png`),e.classList.add(`force-scrolled`)),window.addEventListener(`scroll`,()=>{e&&(e.classList.contains(`force-scrolled`)||(window.scrollY>50?(e.classList.add(`scrolled`),t&&(t.src=`images/logo-dark.png`)):(e.classList.remove(`scrolled`),t&&(t.src=`images/logo-white.png`))))});var n=document.getElementById(`headerSearchInput`),r=document.getElementById(`headerSearchBtn`);function i(){if(n){let e=n.value.trim();e&&(window.location.href=`shop.html?search=${encodeURIComponent(e)}`)}}n&&n.addEventListener(`keypress`,e=>{e.key===`Enter`&&i()}),r&&r.addEventListener(`click`,i),initSharedPopups();var a=JSON.parse(localStorage.getItem(`prescot_cart`))||[],o=document.getElementById(`cartTableBody`),s=document.getElementById(`cartLayout`);function c(){o.innerHTML=``;let e=0;if(a.length===0){s.innerHTML=`<div style="text-align: center; padding: 100px 0; width: 100%; color: #999;">
          <h2>Twój koszyk jest pusty</h2>
          <p style="margin-top: 15px; margin-bottom: 30px;">Dodaj produkty ze sklepu, aby zrealizować zamówienie.</p>
          <a href="shop.html" style="padding: 15px 40px; background: #1a1a1a; color: #fff; text-decoration: none; font-weight: 600; text-transform: uppercase; font-size: 12px; letter-spacing: 2px;">Wróć do sklepu</a>
        </div>`;return}a.forEach((t,n)=>{let r=t.price*t.qty;e+=r;let i=`
          <tr class="cart-item-row" data-index="${n}">
            <td data-label="Produkt">
              <div class="cart-product-cell">
                <img src="${t.image}" alt="${t.title}" class="cart-product-img">
                <div class="cart-product-details">
                  <h4>${t.title}</h4>
                  <p>Kolor: ${t.color?`<span style="display:inline-block; width:10px; height:10px; border-radius:50%; background:${t.color}; margin-left:5px; vertical-align:middle;"></span>`:`Domyślny`}</p>
                  <p>Rozmiar: ${t.size||`Domyślny`}</p>
                </div>
              </div>
            </td>
             <td data-label="Cena" class="cart-price-cell">${t.price.toFixed(2)} zł</td>
            <td data-label="Ilość">
              <div class="quantity-selector">
                <button class="quantity-btn page-qty-minus" data-index="${n}">-</button>
                <input type="text" class="quantity-input" value="${t.qty}" readonly>
                <button class="quantity-btn page-qty-plus" data-index="${n}">+</button>
              </div>
            </td>
            <td data-label="Suma" class="cart-total-cell">${r.toFixed(2)} zł</td>
          </tr>
        `;o.insertAdjacentHTML(`beforeend`,i)}),document.getElementById(`subtotalPrice`).textContent=`${e.toFixed(2)} zł`,document.getElementById(`totalPrice`).textContent=`${e.toFixed(2)} zł`,document.querySelectorAll(`.page-qty-minus`).forEach(e=>{e.addEventListener(`click`,e=>{let t=parseInt(e.target.dataset.index);a[t].qty--,a[t].qty<=0&&a.splice(t,1),l()})}),document.querySelectorAll(`.page-qty-plus`).forEach(e=>{e.addEventListener(`click`,e=>{let t=parseInt(e.target.dataset.index);a[t].qty++,l()})})}function l(){localStorage.setItem(`prescot_cart`,JSON.stringify(a)),c(),document.getElementById(`cartDrawerItems`)&&window.location.reload()}document.getElementById(`cartCheckoutBtn`).addEventListener(`click`,()=>{window.location.href=`checkout.html`}),c();var u=document.getElementById(`menuToggle`),d=document.getElementById(`mobileMenu`);u.addEventListener(`click`,()=>{d.classList.toggle(`active`)});