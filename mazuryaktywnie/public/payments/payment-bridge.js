(() => {
  'use strict';

  let reservedRanges = [];

  const dateFromButton = (button) => {
    const label = button.getAttribute('aria-label') || '';
    const months = {
      stycznia: 0, lutego: 1, marca: 2, kwietnia: 3, maja: 4, czerwca: 5,
      lipca: 6, sierpnia: 7, września: 8, października: 9, listopada: 10, grudnia: 11,
      january: 0, february: 1, march: 2, april: 3, may: 4, june: 5,
      july: 6, august: 7, september: 8, october: 9, november: 10, december: 11,
    };
    const match = label.toLowerCase().match(/(\d{1,2})\s+([a-ząćęłńóśźż]+)\s+(\d{4})/i);
    if (!match || months[match[2]] === undefined) return null;
    const day = String(Number(match[1])).padStart(2, '0');
    const month = String(months[match[2]] + 1).padStart(2, '0');
    return `${match[3]}-${month}-${day}`;
  };

  const applyAvailability = () => {
    if (!reservedRanges.length) return;
    document.querySelectorAll('[role="grid"] button').forEach((button) => {
      const date = dateFromButton(button);
      if (!date) return;
      const reserved = reservedRanges.find((range) => date >= range.from && date <= range.to);
      if (!reserved) return;
      button.disabled = true;
      button.setAttribute('aria-disabled', 'true');
      button.setAttribute('title', reserved.status === 'blocked' ? (reserved.reason || 'Termin zablokowany') : 'Termin zarezerwowany');
      button.classList.add('p24-reserved-day');
    });
  };

  const renameHeading = (heading, text) => {
    if (!heading) return;
    const textChild = [...heading.children].find((child) => /\d\.\s*Wybierz/.test(child.textContent || ''));
    if (textChild && textChild.textContent !== text) textChild.textContent = text;
  };

  const putCalendarFirst = () => {
    const headings = [...document.querySelectorAll('h2')];
    const boat = headings.find((node) => /Wybierz jacht Stillo 31/.test(node.textContent || ''));
    const addons = headings.find((node) => /Wybierz opcje dodatkowe/.test(node.textContent || ''));
    const calendar = headings.find((node) => /Wybierz termin czarteru/.test(node.textContent || ''));
    if (!boat || !addons || !calendar) return;
    let common = calendar.parentElement;
    while (common && !(common.contains(boat) && common.contains(addons))) common = common.parentElement;
    if (!common) return;
    const directChild = (node) => {
      let child = node;
      while (child.parentElement && child.parentElement !== common) child = child.parentElement;
      return child;
    };
    const calendarSection = directChild(calendar);
    const boatSection = directChild(boat);
    if (calendarSection !== boatSection && calendarSection.nextElementSibling !== boatSection) {
      common.insertBefore(calendarSection, boatSection);
    }
    renameHeading(calendar, '1. Wybierz termin czarteru');
    renameHeading(boat, '2. Wybierz jacht Stillo 31');
    renameHeading(addons, '3. Wybierz opcje dodatkowe');
  };

  fetch('/payments/availability.php', {cache: 'no-store'})
    .then((response) => response.json())
    .then((result) => {
      reservedRanges = Array.isArray(result.ranges) ? result.ranges : [];
      applyAvailability();
    })
    .catch(() => {});

  const findPayButton = () => [...document.querySelectorAll('button')].find((button) =>
    /Zarezerwuj i zapłać online|Book and pay online/i.test(button.textContent || '')
  );

  const countFrom = (text, pattern) => {
    const match = text.match(pattern);
    return match ? Number.parseInt(match[1], 10) : 0;
  };

  const bookingFromSummary = () => {
    const button = findPayButton();
    const summary = button && button.closest('div[class*="sticky"]');
    if (!summary) throw new Error('Nie udało się odczytać podsumowania rezerwacji.');

    const text = summary.innerText || '';
    const dates = text.match(/\b\d{2}\.\d{2}\.\d{4}\b/g) || [];
    if (dates.length < 2) throw new Error('Najpierw wybierz datę rozpoczęcia i zakończenia.');

    return {
      startDate: dates[0],
      endDate: dates[1],
      sup: countFrom(text, /SUP boards\s*\((\d+)x\)/i),
      bike: countFrom(text, /Rowery tradycyjne\s*\((\d+)x\)/i),
      ebike: countFrom(text, /E-bikes\s*\((\d+)x\)/i),
    };
  };

  const escapeHtml = (value) => String(value || '').replace(/[&<>'"]/g, (char) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;'
  })[char]);

  const upgradeDialog = (cardInput) => {
    const overlay = cardInput.closest('[role="dialog"]');
    const panel = overlay && overlay.firstElementChild;
    if (!overlay || !panel || overlay.dataset.p24Upgraded === 'true') return;
    overlay.dataset.p24Upgraded = 'true';

    let booking;
    try { booking = bookingFromSummary(); }
    catch (error) { booking = { error: error.message }; }

    const originalClose = panel.querySelector('button[aria-label*="Zamknij"]');
    if (!originalClose) return;
    const name = panel.querySelector('#card-name')?.value || '';
    const email = panel.querySelector('#client-email')?.value || '';
    const phone = panel.querySelector('#client-phone')?.value || '';
    const amount = [...panel.querySelectorAll('span')].find((span) => /PLN/.test(span.textContent || ''))?.textContent?.trim() || '';

    const content = document.createElement('div');
    content.className = 'space-y-5';
    content.innerHTML = `
        <div>
          <h3 class="text-xl font-black text-gray-900 dark:text-white">Bezpieczna płatność Przelewy24</h3>
          <p class="text-xs text-gray-500 mt-1">Za chwilę przejdziesz na szyfrowaną stronę operatora płatności.</p>
        </div>
        <div class="bg-gray-50 dark:bg-gray-900 p-4 rounded-2xl flex justify-between items-center text-sm font-semibold border border-gray-100 dark:border-gray-800">
          <span class="text-gray-500">Kwota do zapłaty:</span><strong class="text-lg text-blue-600 dark:text-blue-400">${escapeHtml(amount)}</strong>
        </div>
        <div class="p24-safe-note"><strong>Nie podawaj tutaj danych karty.</strong> BLIK, przelew lub kartę wybierzesz bezpośrednio w Przelewy24.</div>
        <form id="p24-form" class="space-y-4" novalidate>
          <div class="p24-field"><label for="p24-name">Imię i nazwisko</label><input id="p24-name" name="name" autocomplete="name" maxlength="40" required value="${escapeHtml(name)}"></div>
          <div class="p24-grid">
            <div class="p24-field"><label for="p24-email">E-mail</label><input id="p24-email" name="email" type="email" autocomplete="email" maxlength="50" required value="${escapeHtml(email)}"></div>
            <div class="p24-field"><label for="p24-phone">Telefon</label><input id="p24-phone" name="phone" type="tel" autocomplete="tel" maxlength="20" required value="${escapeHtml(phone)}"></div>
          </div>
          <label class="p24-terms"><input name="terms" type="checkbox" required><span>Akceptuję <a href="/polityka-prywatnosci/" target="_blank" rel="noopener">Regulamin i Politykę Prywatności</a> oraz <a href="/rodo/" target="_blank" rel="noopener">Klauzulę RODO</a>.</span></label>
          <div id="p24-error" class="p24-error" role="alert"></div>
          <button class="p24-submit" type="submit">Przejdź do Przelewy24</button>
        </form>
      `;

    // Keep React's real close button mounted so its original event handler survives.
    [...panel.children].forEach((child) => {
      if (child !== originalClose) child.remove();
    });
    originalClose.id = 'p24-close';
    originalClose.setAttribute('aria-label', 'Zamknij płatność');
    panel.appendChild(content);

    const closeDialog = () => {
      if (overlay.isConnected) originalClose.click();
    };
    overlay.addEventListener('click', (event) => {
      if (event.target === overlay) closeDialog();
    });
    const handleEscape = (event) => {
      if (event.key === 'Escape') closeDialog();
    };
    document.addEventListener('keydown', handleEscape);
    const cleanupObserver = new MutationObserver(() => {
      if (!overlay.isConnected) {
        document.removeEventListener('keydown', handleEscape);
        cleanupObserver.disconnect();
      }
    });
    cleanupObserver.observe(document.body, { childList: true, subtree: true });

    const form = panel.querySelector('#p24-form');
    form.addEventListener('submit', async (event) => {
      event.preventDefault();
      const submit = form.querySelector('button[type="submit"]');
      const errorBox = form.querySelector('#p24-error');
      errorBox.dataset.visible = 'false';
      if (!form.reportValidity()) return;
      if (booking.error) {
        errorBox.textContent = booking.error;
        errorBox.dataset.visible = 'true';
        return;
      }

      const fields = new FormData(form);
      const payload = {
        ...booking,
        name: fields.get('name'),
        email: fields.get('email'),
        phone: fields.get('phone'),
        terms: fields.get('terms') === 'on',
      };
      submit.disabled = true;
      submit.textContent = 'Łączenie z Przelewy24…';
      try {
        const response = await fetch('/payments/start.php', {
          method: 'POST',
          headers: {'Content-Type': 'application/json', 'Accept': 'application/json'},
          credentials: 'same-origin',
          body: JSON.stringify(payload),
        });
        const result = await response.json();
        if (!response.ok || !result.redirect_url) throw new Error(result.message || 'Nie udało się uruchomić płatności.');
        window.location.assign(result.redirect_url);
      } catch (error) {
        errorBox.textContent = error.message || 'Nie udało się połączyć z Przelewy24. Spróbuj ponownie.';
        errorBox.dataset.visible = 'true';
        submit.disabled = false;
        submit.textContent = 'Przejdź do Przelewy24';
      }
    });
  };

  const observer = new MutationObserver(() => {
    putCalendarFirst();
    applyAvailability();
    const cardInput = document.getElementById('card-number');
    if (cardInput) upgradeDialog(cardInput);
  });
  observer.observe(document.documentElement, {childList: true, subtree: true});
  putCalendarFirst();
})();
