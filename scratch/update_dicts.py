import os
import re

with open('build_site.py', 'r', encoding='utf-8') as f:
    text = f.read()

# We need to replace content_rezerwacja, content_fundusze, content_sukces.
# Since these dictionaries are massive, we can find their start and end.
def replace_dict(name, new_dict_code, text):
    start_idx = text.find(f"{name} = {{")
    if start_idx == -1: return text
    
    # find the matching closing brace for the dict.
    # We count '{' and '}'
    brace_count = 0
    end_idx = -1
    in_dict = False
    for i in range(start_idx, len(text)):
        if text[i] == '{':
            brace_count += 1
            in_dict = True
        elif text[i] == '}':
            brace_count -= 1
        
        if in_dict and brace_count == 0:
            end_idx = i
            break
            
    if end_idx != -1:
        return text[:start_idx] + new_dict_code + text[end_idx+1:]
    return text

apple_rezerwacja = """content_rezerwacja = {
    'pl': '''
    <style>
        .apple-container {
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
            width: 100%; max-width: 800px; margin: 40px auto; 
            background: #ffffff; padding: 40px; 
            border-radius: 24px; box-shadow: 0 10px 30px rgba(0,0,0,0.03); 
            border: 1px solid #e2e8f0;
        }
        .apple-title {
            color: #1d1d1f; font-weight: 700; margin-bottom: 25px; 
            font-size: 28px; letter-spacing: -0.5px;
        }
        .apple-label {
            display: block; font-weight: 600; margin-bottom: 8px; color: #1d1d1f; font-size: 15px;
        }
        .apple-input {
            width: 100%; height: 50px; background: #f8fafc; 
            border: 1px solid #cbd5e1; border-radius: 12px; 
            padding: 0 16px; font-weight: 500; font-size: 16px; color: #1d1d1f;
            transition: all 0.2s ease-in-out; box-sizing: border-box;
        }
        .apple-input:focus {
            background: #ffffff; border-color: #046bd2; 
            box-shadow: 0 0 0 4px rgba(4, 107, 210, 0.12); outline: none;
        }
        .apple-select {
            appearance: none;
            background-image: url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%231d1d1f%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.4-12.8z%22%2F%3E%3C%2Fsvg%3E");
            background-repeat: no-repeat; background-position: right 16px top 50%; background-size: 12px auto;
        }
        .apple-accordion {
            background: #f8fafc; border-radius: 16px; border: 1px solid #e2e8f0; overflow: hidden; margin-top: 10px;
        }
        .apple-accordion-summary {
            padding: 20px; font-weight: 600; color: #1d1d1f; cursor: pointer; display: flex; justify-content: space-between; align-items: center;
        }
        .apple-accordion-content {
            padding: 0 20px 20px; display: flex; flex-direction: column; gap: 15px;
        }
        .apple-btn {
            background: #0071e3; color: #ffffff; border: none; font-size: 17px; font-weight: 600; 
            padding: 16px; border-radius: 12px; cursor: pointer; margin-top: 25px; 
            transition: all 0.2s ease; width: 100%; box-shadow: 0 4px 14px rgba(0, 113, 227, 0.2);
        }
        .apple-btn:hover { background: #0077ED; transform: scale(0.99); }
        .apple-summary-box {
            background: #eff6ff; padding: 25px; border-radius: 16px; border: 1px solid #dbeafe; 
            display: flex; justify-content: space-between; align-items: center; margin-top: 25px;
        }
        @media (max-width: 576px) {
            .apple-container { padding: 20px; border-radius: 16px; border: none; box-shadow: none; margin: 10px auto; }
            .apple-summary-box { flex-direction: column; text-align: center; gap: 10px; }
            .apple-summary-box > div { text-align: center !important; }
        }
    </style>
    
    <div style="width: 100%; background: #f8fafc; padding: 60px 20px; text-align: center; border-bottom: 1px solid #e2e8f0;">
        <h1 style="font-family: -apple-system, BlinkMacSystemFont, sans-serif; font-size: 42px; font-weight: 800; color: #1d1d1f; margin: 0; letter-spacing: -1px;">Rezerwacja Online</h1>
        <p style="font-family: -apple-system, BlinkMacSystemFont, sans-serif; font-size: 18px; color: #64748b; margin-top: 15px; max-width: 600px; margin-left: auto; margin-right: auto;">Zarezerwuj swój wymarzony jacht na Mazurach. Szybko, bezpiecznie i wygodnie.</p>
    </div>

    <div class="apple-container">
        <h2 class="apple-title">Skonfiguruj swój czarter</h2>
        <form id="booking-form" onsubmit="handleBookingSubmit(event)" style="display: flex; flex-direction: column; gap: 20px;">
            <div>
                <label class="apple-label">Wybierz jacht / houseboat</label>
                <select id="yacht-select" class="apple-input apple-select" onchange="calculatePrice()">
                    <option value="stillo">Stillo 31 (Luksusowy houseboat) - 1 250 PLN / dzień</option>
                    <option value="sailora">Sailora (Komfortowy jacht) - 950 PLN / dzień</option>
                </select>
            </div>

            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 15px;">
                <div>
                    <label class="apple-label">Data od</label>
                    <input type="date" id="date-from" class="apple-input" onchange="calculatePrice()" required>
                </div>
                <div>
                    <label class="apple-label">Data do</label>
                    <input type="date" id="date-to" class="apple-input" onchange="calculatePrice()" required>
                </div>
            </div>

            <details class="apple-accordion" open>
                <summary class="apple-accordion-summary">
                    <span>Wybierz aktywne dodatki</span>
                    <svg width="14" height="9" viewBox="0 0 14 9" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 1L7 7L13 1" stroke="#1d1d1f" stroke-width="2" stroke-linecap="round"/></svg>
                </summary>
                <div class="apple-accordion-content">
                    <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 10px;">
                        <div><span style="font-weight: 600; display: block;">Deski SUP</span><span style="font-size: 13px; color: #86868b;">Dmuchana deska z wiosłem (max 4)</span></div>
                        <div style="display: flex; align-items: center; gap: 10px;"><span style="font-weight: 600; color: #0071e3;">50 PLN / d</span><input type="number" id="sup-count" min="0" max="4" value="0" onchange="calculatePrice()" class="apple-input" style="width: 70px; text-align: center; height: 40px; padding: 0;"></div>
                    </div>
                    <div style="height: 1px; background: #e2e8f0;"></div>
                    <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 10px;">
                        <div><span style="font-weight: 600; display: block;">Rowery tradycyjne</span><span style="font-size: 13px; color: #86868b;">Idealne na szlaki (max 6)</span></div>
                        <div style="display: flex; align-items: center; gap: 10px;"><span style="font-weight: 600; color: #0071e3;">40 PLN / d</span><input type="number" id="bike-count" min="0" max="6" value="0" onchange="calculatePrice()" class="apple-input" style="width: 70px; text-align: center; height: 40px; padding: 0;"></div>
                    </div>
                    <div style="height: 1px; background: #e2e8f0;"></div>
                    <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 10px;">
                        <div><span style="font-weight: 600; display: block;">Rowery elektryczne</span><span style="font-size: 13px; color: #86868b;">E-Bike turystyczne (max 4)</span></div>
                        <div style="display: flex; align-items: center; gap: 10px;"><span style="font-weight: 600; color: #0071e3;">80 PLN / d</span><input type="number" id="ebike-count" min="0" max="4" value="0" onchange="calculatePrice()" class="apple-input" style="width: 70px; text-align: center; height: 40px; padding: 0;"></div>
                    </div>
                </div>
            </details>

            <div class="apple-summary-box">
                <div>
                    <span style="font-weight: 700; font-size: 15px; color: #004b99; display: block; margin-bottom: 4px;">Podsumowanie wyceny</span>
                    <span id="days-info" style="font-size: 13px; color: #0071e3;">Wybierz daty czarteru...</span>
                </div>
                <div style="text-align: right;">
                    <span id="total-price" style="font-size: 28px; font-weight: 700; color: #004b99; letter-spacing: -0.5px;">0 PLN</span>
                </div>
            </div>

            <h2 class="apple-title" style="margin-top: 20px; font-size: 22px;">Dane kontaktowe</h2>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px;">
                <div style="grid-column: 1 / -1;">
                    <label class="apple-label">Imię i Nazwisko</label>
                    <input type="text" id="cust-name" required class="apple-input">
                </div>
                <div style="grid-column: 1 / -1;">
                    <label class="apple-label">E-mail</label>
                    <input type="email" id="cust-email" required class="apple-input">
                </div>
                <div style="grid-column: 1 / -1;">
                    <label class="apple-label">Telefon</label>
                    <input type="tel" id="cust-phone" required class="apple-input">
                </div>
            </div>

            <button type="submit" class="apple-btn">Zapłać i Rezerwuj Online (Stripe / Przelewy24)</button>
        </form>
    </div>
    
    <div id="payment-overlay" style="display: none; position: fixed; inset: 0; background: rgba(0,0,0,0.4); backdrop-filter: blur(10px); -webkit-backdrop-filter: blur(10px); z-index: 1000000; align-items: center; justify-content: center; color: #1d1d1f; font-family: -apple-system, BlinkMacSystemFont, sans-serif;">
        <div style="text-align: center; max-width: 320px; width: 90%; padding: 40px; background: #ffffff; border-radius: 24px; box-shadow: 0 20px 40px rgba(0,0,0,0.1);">
            <div style="width: 40px; height: 40px; border: 3px solid #e2e8f0; border-top-color: #0071e3; border-radius: 50%; animation: spin 1s linear infinite; margin: 0 auto 20px;"></div>
            <h3 style="font-size: 18px; font-weight: 600; margin-bottom: 8px;">Łączenie z bramką</h3>
            <p style="color: #86868b; font-size: 14px; margin: 0;">Przekierowywanie do bezpiecznej płatności...</p>
        </div>
    </div>
    <style>@keyframes spin { to { transform: rotate(360deg); } } details > summary { list-style: none; } details > summary::-webkit-details-marker { display: none; } details[open] summary svg { transform: rotate(180deg); }</style>
    <script>
        const today = new Date().toISOString().split('T')[0];
        document.getElementById('date-from').min = today;
        document.getElementById('date-to').min = today;

        const prices = JSON.parse(localStorage.getItem('wcag_prices') || '{}');
        const priceStillo = prices.stillo || 1250;
        const priceSailora = prices.sailora || 950;
        const priceSup = prices.sup || 50;
        const priceBike = prices.bike || 40;
        const priceEbike = prices.ebike || 80;

        document.querySelector('option[value="stillo"]').innerHTML = `Stillo 31 (Luksusowy houseboat) - ${priceStillo} PLN / dzień`;
        document.querySelector('option[value="sailora"]').innerHTML = `Sailora (Komfortowy jacht) - ${priceSailora} PLN / dzień`;

        function calculatePrice() {
            const yacht = document.getElementById('yacht-select').value;
            const dateFrom = document.getElementById('date-from').value;
            const dateTo = document.getElementById('date-to').value;
            const supCount = parseInt(document.getElementById('sup-count').value) || 0;
            const bikeCount = parseInt(document.getElementById('bike-count').value) || 0;
            const ebikeCount = parseInt(document.getElementById('ebike-count').value) || 0;

            if (!dateFrom || !dateTo) {
                document.getElementById('total-price').innerHTML = '0 PLN';
                document.getElementById('days-info').innerHTML = 'Wybierz daty czarteru...';
                return;
            }

            const d1 = new Date(dateFrom);
            const d2 = new Date(dateTo);
            const diffTime = Math.abs(d2 - d1);
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) || 1;

            if (d2 < d1) {
                document.getElementById('date-to').value = dateFrom;
                calculatePrice();
                return;
            }

            const dailyYachtRate = yacht === 'stillo' ? priceStillo : priceSailora;
            const totalBoat = dailyYachtRate * diffDays;
            const totalSup = priceSup * supCount * diffDays;
            const totalBike = priceBike * bikeCount * diffDays;
            const totalEbike = priceEbike * ebikeCount * diffDays;
            const grandTotal = totalBoat + totalSup + totalBike + totalEbike;

            document.getElementById('days-info').innerHTML = `Czarter: ${diffDays} dni | Jacht: ${totalBoat} PLN | Dodatki: ${totalSup + totalBike + totalEbike} PLN`;
            document.getElementById('total-price').innerHTML = `${grandTotal.toLocaleString()} PLN`;
            
            return { diffDays, grandTotal, yacht };
        }

        function handleBookingSubmit(event) {
            event.preventDefault();
            const calc = calculatePrice();
            if (!calc) return;
            
            document.getElementById('payment-overlay').style.display = 'flex';
            
            const reservation = {
                id: 'RES-' + Math.random().toString(36).substr(2, 6).toUpperCase(),
                date: new Date().toISOString(),
                yacht: calc.yacht,
                days: calc.diffDays,
                total: calc.grandTotal,
                name: document.getElementById('cust-name').value,
                email: document.getElementById('cust-email').value,
                phone: document.getElementById('cust-phone').value,
                dateFrom: document.getElementById('date-from').value,
                dateTo: document.getElementById('date-to').value,
                sup: parseInt(document.getElementById('sup-count').value) || 0,
                bike: parseInt(document.getElementById('bike-count').value) || 0,
                ebike: parseInt(document.getElementById('ebike-count').value) || 0,
                status: 'paid'
            };

            setTimeout(() => {
                let reservations = JSON.parse(localStorage.getItem('wcag_reservations') || '[]');
                reservations.push(reservation);
                localStorage.setItem('wcag_reservations', JSON.stringify(reservations));
                window.location.href = '{prefix}sukces.html?id=' + reservation.id + '&yacht=' + reservation.yacht + '&days=' + reservation.days + '&total=' + reservation.total + '&name=' + encodeURIComponent(reservation.name) + '&email=' + encodeURIComponent(reservation.email) + '&phone=' + encodeURIComponent(reservation.phone) + '&dateFrom=' + reservation.dateFrom + '&dateTo=' + reservation.dateTo + '&sup=' + reservation.sup + '&bike=' + reservation.bike + '&ebike=' + reservation.ebike;
            }, 1500);
        }
    </script>
    ''',
    'en': '''<div style="width: 100%; background: #f8fafc; padding: 60px 20px; text-align: center; border-bottom: 1px solid #e2e8f0;">
        <h1 style="font-family: -apple-system, BlinkMacSystemFont, sans-serif; font-size: 42px; font-weight: 800; color: #1d1d1f; margin: 0; letter-spacing: -1px;">Online Booking</h1>
        <p style="font-family: -apple-system, BlinkMacSystemFont, sans-serif; font-size: 18px; color: #64748b; margin-top: 15px; max-width: 600px; margin-left: auto; margin-right: auto;">Book your dream yacht in Masuria. Fast, safe and comfortable.</p>
    </div><div class="apple-container"><h2 class="apple-title">Switch to Polish version for full booking functionality.</h2></div>''',
    'de': '''<div style="width: 100%; background: #f8fafc; padding: 60px 20px; text-align: center; border-bottom: 1px solid #e2e8f0;">
        <h1 style="font-family: -apple-system, BlinkMacSystemFont, sans-serif; font-size: 42px; font-weight: 800; color: #1d1d1f; margin: 0; letter-spacing: -1px;">Online-Buchung</h1>
        <p style="font-family: -apple-system, BlinkMacSystemFont, sans-serif; font-size: 18px; color: #64748b; margin-top: 15px; max-width: 600px; margin-left: auto; margin-right: auto;">Buchen Sie Ihre Traumyacht in Masuren. Schnell, sicher und bequem.</p>
    </div><div class="apple-container"><h2 class="apple-title">Wechseln Sie zur polnischen Version für die volle Buchungsfunktion.</h2></div>'''
}"""

apple_sukces = """content_sukces = {
    'pl': '''
    <div style="width: 100%; background: #f8fafc; padding: 60px 20px; text-align: center; border-bottom: 1px solid #e2e8f0;">
        <h1 style="font-family: -apple-system, BlinkMacSystemFont, sans-serif; font-size: 42px; font-weight: 800; color: #1d1d1f; margin: 0; letter-spacing: -1px;">Rezerwacja opłacona</h1>
    </div>
    <div style="width: 100%; max-width: 600px; margin: 40px auto; background: #ffffff; padding: 40px; border-radius: 24px; box-shadow: 0 10px 30px rgba(0,0,0,0.03); border: 1px solid #e2e8f0; font-family: -apple-system, BlinkMacSystemFont, sans-serif; text-align: center;">
        <div style="font-size: 60px; color: #22c55e; margin-bottom: 20px;">✅</div>
        <h2 style="color: #1d1d1f; font-weight: 700; margin-bottom: 10px; font-size: 24px; letter-spacing: -0.5px;">Sukces!</h2>
        <p style="color: #64748b; margin-bottom: 30px; font-size: 16px;">Twoja rezerwacja została potwierdzona i opłacona online.</p>

        <div id="booking-details" style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 16px; padding: 20px; text-align: left; margin-bottom: 30px; display: flex; flex-direction: column; gap: 10px; font-size: 15px; color: #334155;">
            <!-- Filled dynamically -->
        </div>

        <a href="{prefix}index.html" style="display: inline-block; background: #0071e3; color: white; padding: 16px 30px; border-radius: 12px; font-weight: 600; font-size: 16px; text-decoration: none; transition: all 0.2s; box-shadow: 0 4px 14px rgba(0, 113, 227, 0.2); width: 100%; box-sizing: border-box;">
            Wróć na stronę główną
        </a>
    </div>
    <script>
        const params = new URLSearchParams(window.location.search);
        let html = `
            <div><strong>Numer Rezerwacji:</strong> <span style="font-weight: 700; color: #046bd2;">${params.get('id')}</span></div>
            <div><strong>Wybrany jacht:</strong> ${params.get('yacht')}</div>
            <div><strong>Termin:</strong> ${params.get('dateFrom')} do ${params.get('dateTo')} (${params.get('days')} dni)</div>
            <div><strong>SUP:</strong> ${params.get('sup')} szt.</div>
            <div><strong>Rowery tradycyjne:</strong> ${params.get('bike')} szt.</div>
            <div><strong>Rowery elektryczne:</strong> ${params.get('ebike')} szt.</div>
            <div><strong>Klient:</strong> ${params.get('name')}</div>
            <div><strong>Email / Telefon:</strong> ${params.get('email')} / ${params.get('phone')}</div>
            <div style="border-top: 1px solid #e2e8f0; padding-top: 15px; margin-top: 10px; font-size: 17px;"><strong>Opłacona kwota:</strong> <span style="font-weight: 800; color: #22c55e;">${parseInt(params.get('total')).toLocaleString()} PLN</span></div>
        `;
        if (params.get('id')) { document.getElementById('booking-details').innerHTML = html; }
        else { document.getElementById('booking-details').innerHTML = "Brak szczegółów rezerwacji."; }
    </script>
    ''',
    'en': '''<div style="width: 100%; max-width: 600px; margin: 40px auto; text-align: center; font-family: sans-serif;"><h1>Success</h1><a href="{prefix}index.html">Go to Homepage</a></div>''',
    'de': '''<div style="width: 100%; max-width: 600px; margin: 40px auto; text-align: center; font-family: sans-serif;"><h1>Erfolg</h1><a href="{prefix}index.html">Zurück zur Startseite</a></div>'''
}"""

apple_fundusze = """content_fundusze = {
    'pl': '''
    <div style="width: 100%; background: #f8fafc; padding: 60px 20px; text-align: center; border-bottom: 1px solid #e2e8f0;">
        <h1 style="font-family: -apple-system, BlinkMacSystemFont, sans-serif; font-size: 42px; font-weight: 800; color: #1d1d1f; margin: 0; letter-spacing: -1px;">Fundusze Europejskie</h1>
        <p style="font-family: -apple-system, BlinkMacSystemFont, sans-serif; font-size: 18px; color: #64748b; margin-top: 15px; max-width: 600px; margin-left: auto; margin-right: auto;">Projekty współfinansowane ze środków UE</p>
    </div>
    <div style="width: 100%; max-width: 900px; margin: 40px auto; background: #ffffff; padding: 40px; border-radius: 24px; box-shadow: 0 10px 30px rgba(0,0,0,0.03); border: 1px solid #e2e8f0; font-family: -apple-system, BlinkMacSystemFont, sans-serif;">
        <div style="text-align: center; margin-bottom: 40px;">
            <img src="images/assets/stopka_loga.png" alt="Logotypy Funduszy Europejskich i Unii Europejskiej" style="max-width: 100%; height: auto; border-radius: 16px; border: 1px solid #e2e8f0; padding: 20px; box-shadow: 0 4px 15px rgba(0,0,0,0.02);">
        </div>
        <p style="font-size: 18px; line-height: 1.6; color: #1d1d1f; font-weight: 500; text-align: center; margin-bottom: 40px;">
            Firma <strong>Damian Nietrzeba</strong> realizuje projekt dofinansowany z Funduszy Europejskich:<br>
            <strong style="color: #0071e3; display: inline-block; margin-top: 10px; font-size: 22px;">„Wdrożenie nowej oferty przez firmę Damian Nietrzeba”</strong>
        </p>
        
        <div style="background: #f8fafc; padding: 30px; border-radius: 16px; border: 1px solid #e2e8f0; color: #334155; line-height: 1.6;">
            <div style="margin-bottom: 15px;"><strong style="color: #1d1d1f;">Program:</strong> Program Regionalny Fundusze Europejskie dla Warmii i Mazur 2021 – 2027</div>
            <div style="margin-bottom: 15px;"><strong style="color: #1d1d1f;">Współfinansowanie:</strong> Europejski Fundusz Rozwoju Regionalnego</div>
            <div style="margin-bottom: 15px;"><strong style="color: #1d1d1f;">Priorytet 1:</strong> Gospodarka</div>
            <div style="margin-bottom: 15px;"><strong style="color: #1d1d1f;">Działanie 1.9:</strong> Konkurencyjne i innowacyjne MŚP</div>
            <div style="margin-bottom: 15px;"><strong style="color: #1d1d1f;">Tytuł projektu:</strong> Wdrożenie nowej oferty przez firmę Damian Nietrzeba</div>
            
            <h3 style="color: #1d1d1f; font-size: 20px; margin-top: 30px; margin-bottom: 15px; font-weight: 700;">Cel projektu</h3>
            <p>Wdrożenie kompleksowej, zintegrowanej oferty aktywnego spędzania czasu na wodzie oraz na lądzie, a także zwiększenie dostępności usług turystycznych na Warmii i Mazurach poprzez pełną obsługę rezerwacyjną online oraz zgodność serwisu ze standardem WCAG 2.1 AA.</p>
            
            <h3 style="color: #1d1d1f; font-size: 20px; margin-top: 30px; margin-bottom: 15px; font-weight: 700;">Grupy docelowe</h3>
            <ul style="padding-left: 20px; margin-bottom: 30px;">
                <li style="margin-bottom: 8px;">Turyści indywidualni poszukujący aktywnego wypoczynku w regionie Wielkich Jezior Mazurskich,</li>
                <li style="margin-bottom: 8px;">Rodziny z dziećmi potrzebujące zintegrowanych form rekreacji wodnej i lądowej,</li>
                <li style="margin-bottom: 8px;">Osoby z niepełnosprawnościami oraz seniorzy – dzięki wdrożeniu rozwiązań cyfrowych spełniających wymogi dostępności WCAG 2.1 AA,</li>
                <li style="margin-bottom: 8px;">Firmy i grupy zorganizowane poszukujące pakietów czarterowo-rowerowych.</li>
            </ul>
            
            <div style="display: flex; flex-wrap: wrap; gap: 20px; margin-top: 30px; border-top: 1px solid #e2e8f0; padding-top: 20px;">
                <div style="flex: 1; min-width: 250px;">
                    <span style="display: block; font-size: 14px; color: #64748b;">Wartość projektu (całkowita):</span>
                    <span style="font-size: 24px; font-weight: 700; color: #1d1d1f; letter-spacing: -0.5px;">659 078,74 PLN</span>
                </div>
                <div style="flex: 1; min-width: 250px;">
                    <span style="display: block; font-size: 14px; color: #64748b;">Wysokość wkładu z Funduszy Europejskich:</span>
                    <span style="font-size: 24px; font-weight: 700; color: #0071e3; letter-spacing: -0.5px;">401 230,81 PLN</span>
                </div>
            </div>
        </div>
    </div>
    ''',
    'en': '''<div style="width: 100%; max-width: 900px; margin: 40px auto; text-align: center; font-family: sans-serif;"><h1>EU Funds</h1><p>Project co-financed by the European Regional Development Fund.</p></div>''',
    'de': '''<div style="width: 100%; max-width: 900px; margin: 40px auto; text-align: center; font-family: sans-serif;"><h1>EU-Fonds</h1><p>Das Projekt wird vom Europäischen Fonds für regionale Entwicklung kofinanziert.</p></div>'''
}"""

text = replace_dict("content_rezerwacja", apple_rezerwacja, text)
text = replace_dict("content_sukces", apple_sukces, text)
text = replace_dict("content_fundusze", apple_fundusze, text)

# We should also ensure the bottom unijnymi rzeczami are injected on all pages in the footer.
# "to co masz plik stopka z unijnymi rzeczami to ma byc na podstronach nad stopka wszedzie i nacisniecie teog przenisie na podstrone fundusze ue oraz na belkach menu ma tego nie byc."
# So I should remove the EU menu item from the top menu, and instead inject a banner above the footer.
# Wait, let's just write this to build_site.py first.
with open('build_site.py', 'w', encoding='utf-8') as f:
    f.write(text)

print("Updated build_site.py successfully.")
