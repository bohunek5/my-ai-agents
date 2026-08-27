(() => {
  'use strict';
  const csrf = document.querySelector('meta[name="p24-admin-csrf"]')?.content || '';
  const nativeValueSetter = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'value')?.set;

  const request = async (body) => {
    const response = await fetch('/payments/admin-api.php', body ? {
      method: 'POST',
      headers: {'Content-Type': 'application/json', 'Accept': 'application/json', 'X-CSRF-Token': csrf},
      credentials: 'same-origin',
      body: JSON.stringify(body),
    } : {credentials: 'same-origin', cache: 'no-store'});
    const result = await response.json();
    if (!response.ok || !result.ok) throw new Error(result.message || 'Operacja nie powiodła się.');
    return result;
  };

  const setInput = (input, value) => {
    if (!input || !nativeValueSetter) return;
    nativeValueSetter.call(input, String(value));
    input.dispatchEvent(new Event('input', {bubbles: true}));
    input.dispatchEvent(new Event('change', {bubbles: true}));
  };

  const rangeReason = (range) => {
    if (range.reason) return range.reason;
    if (range.status === 'booked') return 'Opłacona rezerwacja P24';
    if (range.status === 'held') return 'Płatność w toku';
    return 'Blokada administratora';
  };

  const syncBlockedStorage = (ranges) => {
    localStorage.setItem('blocked_dates', JSON.stringify(ranges.map((range) => ({
      from: range.from,
      to: range.to,
      status: range.status || 'blocked',
      reason: rangeReason(range),
    }))));
  };

  const syncServerOrders = async () => {
    try {
      const result = await request();
      const orders = Array.isArray(result.orders) ? result.orders : [];
      const ranges = Array.isArray(result.blocked_ranges) ? result.blocked_ranges : [];
      const serialized = JSON.stringify(orders);
      localStorage.setItem('mazury_bookings', serialized);
      syncBlockedStorage(ranges);
      const fingerprint = String(serialized.length) + ':' + orders.map((order) => `${order.id}:${order.status}`).join('|');
      if (sessionStorage.getItem('server_orders_fingerprint') !== fingerprint) {
        sessionStorage.setItem('server_orders_fingerprint', fingerprint);
        window.location.reload();
      }
    } catch (_) {}
  };

  let wired = false;
  let gatewayWired = false;
  let blockedWired = false;
  let manualBlockedRanges = [];

  const escapeHtml = (value) => String(value || '').replace(/[&<>'"]/g, (char) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;'
  })[char]);

  const normalizeManualRange = (range) => ({
    from: String(range.from || ''),
    to: String(range.to || ''),
    reason: String(range.reason || 'Blokada administratora'),
  });

  const wireBlockedRanges = async () => {
    if (blockedWired || document.getElementById('p24-blocked-ranges-panel')) return;
    const root = document.querySelector('main') || document.body;
    if (!root) return;
    blockedWired = true;

    const panel = document.createElement('section');
    panel.id = 'p24-blocked-ranges-panel';
    panel.style.cssText = 'margin:24px auto;padding:22px;border:1px solid #dce5ef;border-radius:18px;background:#fff;box-shadow:0 16px 38px rgba(23,34,51,.08);max-width:1120px;color:#172033';
    panel.innerHTML = `
      <div style="display:flex;justify-content:space-between;gap:16px;align-items:flex-start;flex-wrap:wrap">
        <div>
          <h2 style="margin:0;font-size:20px;font-weight:900">Blokady kalendarza</h2>
          <p style="margin:6px 0 0;color:#667085;font-size:13px">Te terminy są zapisywane na serwerze i od razu blokują publiczny kalendarz rezerwacji.</p>
        </div>
        <button type="button" data-p24-refresh-blocks style="border:1px solid #b9c7d8;background:#f8fafc;color:#172033;border-radius:12px;padding:10px 13px;font-weight:800;cursor:pointer">Odśwież</button>
      </div>
      <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(180px,1fr));gap:12px;margin-top:18px">
        <label style="font-size:12px;font-weight:800;text-transform:uppercase;color:#667085">Od<input data-p24-block-from type="date" style="margin-top:6px;width:100%;padding:12px;border:1px solid #cfd8e3;border-radius:12px;font:inherit"></label>
        <label style="font-size:12px;font-weight:800;text-transform:uppercase;color:#667085">Do<input data-p24-block-to type="date" style="margin-top:6px;width:100%;padding:12px;border:1px solid #cfd8e3;border-radius:12px;font:inherit"></label>
        <label style="font-size:12px;font-weight:800;text-transform:uppercase;color:#667085">Opis<input data-p24-block-reason type="text" maxlength="90" placeholder="np. serwis / rezerwacja tel." style="margin-top:6px;width:100%;padding:12px;border:1px solid #cfd8e3;border-radius:12px;font:inherit"></label>
        <button type="button" data-p24-add-block style="align-self:end;border:0;background:#1769cc;color:#fff;border-radius:12px;padding:13px 15px;font-weight:900;cursor:pointer">Dodaj blokadę</button>
      </div>
      <div data-p24-block-message style="margin-top:12px;font-size:13px;color:#667085"></div>
      <div data-p24-block-list style="display:grid;gap:10px;margin-top:16px"></div>
    `;
    root.prepend(panel);

    const fromInput = panel.querySelector('[data-p24-block-from]');
    const toInput = panel.querySelector('[data-p24-block-to]');
    const reasonInput = panel.querySelector('[data-p24-block-reason]');
    const list = panel.querySelector('[data-p24-block-list]');
    const message = panel.querySelector('[data-p24-block-message]');

    const setMessage = (text, color = '#667085') => {
      message.textContent = text;
      message.style.color = color;
    };

    const render = () => {
      if (!manualBlockedRanges.length) {
        list.innerHTML = '<div style="padding:14px;border:1px dashed #cfd8e3;border-radius:12px;color:#667085">Brak ręcznych blokad zapisanych na serwerze.</div>';
        return;
      }
      list.innerHTML = manualBlockedRanges.map((range, index) => `
        <div style="display:flex;justify-content:space-between;align-items:center;gap:12px;padding:13px 14px;border:1px solid #e5ebf2;border-radius:12px;background:#f8fafc">
          <div style="min-width:0">
            <strong style="display:block">${escapeHtml(range.from)} - ${escapeHtml(range.to)}</strong>
            <span style="display:block;margin-top:3px;color:#667085;font-size:13px">${escapeHtml(range.reason || 'Blokada administratora')}</span>
          </div>
          <button type="button" data-p24-remove-block="${index}" style="border:1px solid #e0a3a3;background:#fff5f5;color:#b42318;border-radius:10px;padding:9px 11px;font-weight:800;cursor:pointer">Usuń</button>
        </div>
      `).join('');
    };

    const load = async () => {
      setMessage('Wczytywanie blokad...');
      const result = await request();
      manualBlockedRanges = Array.isArray(result.manual_blocked_ranges)
        ? result.manual_blocked_ranges.map(normalizeManualRange)
        : [];
      syncBlockedStorage(Array.isArray(result.blocked_ranges) ? result.blocked_ranges : []);
      render();
      setMessage('Blokady są zsynchronizowane z serwerem.');
    };

    const save = async () => {
      setMessage('Zapisywanie blokad...');
      const result = await request({action: 'save_blocked_ranges', blocked_ranges: manualBlockedRanges});
      manualBlockedRanges = Array.isArray(result.manual_blocked_ranges)
        ? result.manual_blocked_ranges.map(normalizeManualRange)
        : [];
      syncBlockedStorage(Array.isArray(result.blocked_ranges) ? result.blocked_ranges : []);
      render();
      setMessage(result.message || 'Blokady zostały zapisane.', '#087f5b');
    };

    panel.querySelector('[data-p24-add-block]').addEventListener('click', async () => {
      const from = fromInput.value;
      const to = toInput.value;
      if (!from || !to) {
        setMessage('Wybierz datę początkową i końcową.', '#b42318');
        return;
      }
      if (to < from) {
        setMessage('Data końcowa nie może być wcześniejsza niż początkowa.', '#b42318');
        return;
      }
      manualBlockedRanges.push({
        from,
        to,
        reason: reasonInput.value.trim() || 'Blokada administratora',
      });
      fromInput.value = '';
      toInput.value = '';
      reasonInput.value = '';
      try {
        await save();
      } catch (error) {
        manualBlockedRanges.pop();
        render();
        setMessage(error.message, '#b42318');
      }
    });

    panel.querySelector('[data-p24-refresh-blocks]').addEventListener('click', () => {
      load().catch((error) => setMessage(error.message, '#b42318'));
    });

    list.addEventListener('click', async (event) => {
      const button = event.target.closest('[data-p24-remove-block]');
      if (!button) return;
      const index = Number.parseInt(button.getAttribute('data-p24-remove-block'), 10);
      if (!Number.isInteger(index) || index < 0 || index >= manualBlockedRanges.length) return;
      const removed = manualBlockedRanges.splice(index, 1);
      render();
      try {
        await save();
      } catch (error) {
        manualBlockedRanges.splice(index, 0, removed[0]);
        render();
        setMessage(error.message, '#b42318');
      }
    });

    load().catch((error) => setMessage(error.message, '#b42318'));
  };

  const wireGateway = async () => {
    if (gatewayWired) return;
    const heading = [...document.querySelectorAll('h2, h3')].find((node) => /Konfiguracja Bramek Płatności Online/i.test(node.textContent || ''));
    const section = heading?.closest('div[class*="rounded"]') || heading?.parentElement?.parentElement;
    if (!section) return;
    gatewayWired = true;
    let gateway = {enabled: false, merchant_id: 0};
    try { gateway = (await request()).gateway || gateway; } catch (_) {}
    const statusText = gateway.enabled ? 'Połączenie serwerowe aktywne' : 'Oczekuje na potwierdzenie danych P24';
    const statusColor = gateway.enabled ? '#087f5b' : '#b26a00';
    section.innerHTML = `
      <h2 class="text-xl font-black text-gray-900 dark:text-white">Przelewy24 — połączenie serwerowe</h2>
      <p class="text-sm text-gray-500 dark:text-gray-400 mt-2">Dane dostępowe są przechowywane poza stroną i nie są widoczne w przeglądarce.</p>
      <div style="margin-top:20px;padding:18px;border:1px solid #e6e9ef;border-radius:18px;background:#f8fafc">
        <div style="font-weight:800;color:${statusColor}">${statusText}</div>
        <div style="margin-top:8px;font-size:13px;color:#697386">Merchant ID: ${gateway.merchant_id > 0 ? gateway.merchant_id : 'niepotwierdzony'}</div>
        <div style="margin-top:6px;font-size:13px;color:#697386">Stripe: wyłączony — płatności obsługuje wyłącznie Przelewy24.</div>
      </div>`;
  };
  const wirePricing = async () => {
    if (wired) return;
    const heading = [...document.querySelectorAll('h2, h3')].find((node) => /Konfiguracja Cennika/i.test(node.textContent || ''));
    const form = heading?.parentElement?.parentElement?.querySelector('form') || heading?.closest('div')?.querySelector('form');
    if (!form) return;
    const inputs = [...form.querySelectorAll('input[type="number"]')];
    if (inputs.length < 5) return;
    wired = true;

    try {
      const {prices} = await request();
      [prices.boat, prices.sup, prices.bike, prices.ebike, prices.deposit].forEach((value, index) => setInput(inputs[index], value));
    } catch (error) {
      alert(error.message);
    }

    form.addEventListener('submit', async (event) => {
      event.preventDefault();
      event.stopImmediatePropagation();
      const values = inputs.map((input) => Number.parseInt(input.value, 10));
      try {
        const {prices} = await request({
          action: 'save_prices',
          prices: {boat: values[0], sup: values[1], bike: values[2], ebike: values[3], deposit: values[4]},
        });
        Object.entries(prices).forEach(([key, value]) => localStorage.setItem(`price_${key}`, String(value)));
        alert('Cennik zapisany na serwerze. Nowe płatności będą liczone według tych cen.');
      } catch (error) {
        alert(error.message);
      }
    }, true);

    const mailButton = document.createElement('button');
    mailButton.type = 'button';
    mailButton.textContent = 'Wyślij test na kontakt@mazuryaktywnie.com.pl';
    mailButton.className = 'w-full py-3 border border-blue-500 text-blue-600 dark:text-blue-300 font-bold rounded-xl cursor-pointer';
    mailButton.addEventListener('click', async () => {
      mailButton.disabled = true;
      try {
        const result = await request({action: 'test_mail'});
        alert(result.message + ' Sprawdź Odebrane i Spam.');
      } catch (error) {
        alert(error.message);
      } finally {
        mailButton.disabled = false;
      }
    });
    form.appendChild(mailButton);

    const passwordButton = document.createElement('button');
    passwordButton.type = 'button';
    passwordButton.textContent = 'Zmień hasło panelu administratora';
    passwordButton.className = 'w-full py-3 border border-gray-400 text-gray-700 dark:text-gray-200 font-bold rounded-xl cursor-pointer';
    passwordButton.addEventListener('click', async () => {
      const password = window.prompt('Podaj nowe hasło (minimum 12 znaków):');
      if (!password) return;
      const repeat = window.prompt('Powtórz nowe hasło:');
      if (password !== repeat) {
        alert('Hasła nie są identyczne.');
        return;
      }
      try {
        const result = await request({action: 'change_password', password});
        alert(result.message);
      } catch (error) {
        alert(error.message);
      }
    });
    form.appendChild(passwordButton);
  };

  document.addEventListener('click', (event) => {
    const button = event.target.closest('button');
    if (button && /Wyloguj/i.test(button.textContent || '')) {
      event.preventDefault();
      event.stopImmediatePropagation();
      window.location.assign('/admin/?logout=1');
    }
  }, true);

  new MutationObserver(() => { wirePricing(); wireGateway(); wireBlockedRanges(); }).observe(document.documentElement, {childList: true, subtree: true});
  wirePricing();
  wireGateway();
  wireBlockedRanges();
  syncServerOrders();
})();
