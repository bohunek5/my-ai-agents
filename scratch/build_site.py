import os
import re

backup_dir = "/Users/karolbohdanowicz/Downloads/kopia mazuryaktywnie"

# Languages configuration
langs = {
    'pl': {
        'dir': '',
        'prefix': '',
        'menu': [
            ('index.html', 'Strona główna'),
            ('fleets.html', 'Czarter'),
            ('about.html', 'O nas'),
            ('rezerwacja.html', 'Rezerwacja'),
            ('contact.html', 'Kontakt')
        ],
        'mobile_nav': [
            ('index.html', 'fa-home', 'Główna'),
            ('fleets.html', 'fa-anchor', 'Czarter'),
            ('rezerwacja.html', 'fa-calendar-alt', 'Rezerwacja'),
            ('contact.html', 'fa-envelope', 'Kontakt')
        ]
    },
    'en': {
        'dir': 'en',
        'prefix': '../',
        'menu': [
            ('index.html', 'Home'),
            ('fleets.html', 'Charter'),
            ('about.html', 'About Us'),
            ('rezerwacja.html', 'Booking'),
            ('contact.html', 'Contact')
        ],
        'mobile_nav': [
            ('index.html', 'fa-home', 'Home'),
            ('fleets.html', 'fa-anchor', 'Charter'),
            ('rezerwacja.html', 'fa-calendar-alt', 'Booking'),
            ('contact.html', 'fa-envelope', 'Contact')
        ]
    },
    'de': {
        'dir': 'de',
        'prefix': '../',
        'menu': [
            ('index.html', 'Startseite'),
            ('fleets.html', 'Charter'),
            ('about.html', 'Über uns'),
            ('rezerwacja.html', 'Buchung'),
            ('contact.html', 'Kontakt')
        ],
        'mobile_nav': [
            ('index.html', 'fa-home', 'Startseite'),
            ('fleets.html', 'fa-anchor', 'Charter'),
            ('rezerwacja.html', 'fa-calendar-alt', 'Buchung'),
            ('contact.html', 'fa-envelope', 'Contact')
        ]
    }
}

# Clean translation content blocks
content_rezerwacja = {
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
}

content_fundusze = {
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
}

content_sukces = {
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
}

# Hidden client-side CMS Admin Panel
content_admin = """
<!DOCTYPE html>
<html lang="pl">
<head>
    <meta charset="utf-8"/>
    <meta name="viewport" content="width=device-width, initial-scale=1"/>
    <title>CMS Panel Administracyjny | Mazury Aktywnie</title>
    <link href="css/main.min.css" rel="stylesheet"/>
    <style>
        body { font-family: sans-serif; background: #f8fafc; color: #1e293b; padding: 40px 20px; }
        .container { max-width: 1200px; margin: 0 auto; }
        .card { background: #ffffff; padding: 25px; border-radius: 12px; box-shadow: 0 4px 10px rgba(0,0,0,0.05); border: 1px solid #e2e8f0; margin-bottom: 30px; }
        .btn { background: #046bd2; color: white; padding: 10px 20px; border-radius: 6px; border: none; font-weight: bold; cursor: pointer; text-decoration: none; }
        .btn:hover { background: #045cb4; }
        table { width: 100%; border-collapse: collapse; margin-top: 15px; }
        th, td { text-align: left; padding: 12px; border-bottom: 1px solid #e2e8f0; }
        th { background: #f1f5f9; font-weight: 600; }
        .status-paid { background: #dcfce7; color: #166534; padding: 4px 8px; border-radius: 4px; font-weight: bold; font-size: 12px; }
        .grid-inputs { display: grid; grid-template-cols: repeat(auto-fit, minmax(200px, 1fr)); gap: 15px; margin-top: 15px; }
        .input-group { display: flex; flex-direction: column; gap: 5px; }
        input, select { height: 40px; border: 1px solid #cbd5e1; border-radius: 6px; padding: 0 10px; }
    </style>
</head>
<body>
    <div class="container">
        <!-- Login Screen -->
        <div id="login-screen" class="card" style="max-width: 400px; margin: 100px auto; text-align: center;">
            <h2 style="font-weight: bold; color: #046bd2; margin-bottom: 20px;">Logowanie CMS</h2>
            <form onsubmit="handleLogin(event)">
                <input type="password" id="passcode" placeholder="Wpisz kod dostępu" required style="width: 100%; margin-bottom: 15px; text-align: center;">
                <button type="submit" class="btn" style="width: 100%;">Zaloguj się</button>
            </form>
            <p style="font-size: 12px; color: #64748b; margin-top: 15px;">Domyślny kod dostępu to: <strong>admin123</strong></p>
        </div>

        <!-- Dashboard -->
        <div id="dashboard" style="display: none;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 30px;">
                <h1 style="font-size: 28px; font-weight: bold; color: #046bd2; margin: 0;">CMS Panel Administracyjny</h1>
                <div>
                    <a href="{prefix}index.html" class="btn" style="background: #64748b; margin-right: 10px;">Podgląd Strony</a>
                    <button onclick="handleLogout()" class="btn" style="background: #ef4444;">Wyloguj</button>
                </div>
            </div>

            <!-- Price settings -->
            <div class="card">
                <h2 style="font-size: 18px; font-weight: bold; margin-bottom: 10px; color: #1e293b; border-bottom: 1px solid #e2e8f0; padding-bottom: 10px;">Modyfikacja Cennika (Zarządzanie Treścią)</h2>
                <form onsubmit="savePrices(event)" class="grid-inputs">
                    <div class="input-group">
                        <label>Stillo 31 (PLN / dzień)</label>
                        <input type="number" id="price-stillo">
                    </div>
                    <div class="input-group">
                        <label>Sailora (PLN / dzień)</label>
                        <input type="number" id="price-sailora">
                    </div>
                    <div class="input-group">
                        <label>Deska SUP (PLN / dzień)</label>
                        <input type="number" id="price-sup">
                    </div>
                    <div class="input-group">
                        <label>Rower tradycyjny (PLN / dzień)</label>
                        <input type="number" id="price-bike">
                    </div>
                    <div class="input-group">
                        <label>E-Bike (PLN / dzień)</label>
                        <input type="number" id="price-ebike">
                    </div>
                    <button type="submit" class="btn" style="align-self: flex-end; height: 40px;">Zapisz Cennik</button>
                </form>
            </div>

            <!-- Reservations list -->
            <div class="card">
                <h2 style="font-size: 18px; font-weight: bold; margin-bottom: 10px; color: #1e293b; border-bottom: 1px solid #e2e8f0; padding-bottom: 10px;">Rezerwacje Klientów</h2>
                <div style="overflow-x: auto;">
                    <table>
                        <thead>
                            <tr>
                                <th>Kod</th>
                                <th>Klient</th>
                                <th>Jacht</th>
                                <th>Od - Do (Dni)</th>
                                <th>SUP/Rowery/E-Bike</th>
                                <th>Suma</th>
                                <th>Status</th>
                                <th>Data</th>
                                <th>Akcja</th>
                            </tr>
                        </thead>
                        <tbody id="reservations-table">
                            <!-- Filled dynamically -->
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>

    <script>
        // Default Mock Data if empty
        const defaultReservations = [
            {
                id: 'MA-91823',
                yacht: 'Stillo 31',
                dateFrom: '2026-07-15',
                dateTo: '2026-07-22',
                days: 7,
                sup: 2,
                bike: 2,
                ebike: 0,
                name: 'Jan Kowalski',
                email: 'jan@kowalski.pl',
                phone: '+48 600 700 800',
                total: 10010,
                status: 'Opłacona',
                dateCreated: '2026-07-09'
            },
            {
                id: 'MA-48172',
                yacht: 'Sailora',
                dateFrom: '2026-08-01',
                dateTo: '2026-08-05',
                days: 4,
                sup: 0,
                bike: 0,
                ebike: 2,
                name: 'Anna Nowak',
                email: 'anna@nowak.com',
                phone: '+48 501 502 503',
                total: 4440,
                status: 'Opłacona',
                dateCreated: '2026-07-08'
            }
        ];

        if (!localStorage.getItem('wcag_reservations')) {
            localStorage.setItem('wcag_reservations', JSON.stringify(defaultReservations));
        }

        // Login check
        if (sessionStorage.getItem('cms_logged_in') === 'true') {
            showDashboard();
        }

        function handleLogin(e) {
            e.preventDefault();
            const pass = document.getElementById('passcode').value;
            if (pass === 'admin123') {
                sessionStorage.setItem('cms_logged_in', 'true');
                showDashboard();
            } else {
                alert('Błędny kod dostępu!');
            }
        }

        function handleLogout() {
            sessionStorage.removeItem('cms_logged_in');
            window.location.reload();
        }

        function showDashboard() {
            document.getElementById('login-screen').style.display = 'none';
            document.getElementById('dashboard').style.display = 'block';
            loadPrices();
            loadReservations();
        }

        function loadPrices() {
            const prices = JSON.parse(localStorage.getItem('wcag_prices') || '{}');
            document.getElementById('price-stillo').value = prices.stillo || 1250;
            document.getElementById('price-sailora').value = prices.sailora || 950;
            document.getElementById('price-sup').value = prices.sup || 50;
            document.getElementById('price-bike').value = prices.bike || 40;
            document.getElementById('price-ebike').value = prices.ebike || 80;
        }

        function savePrices(e) {
            e.preventDefault();
            const prices = {
                stillo: parseInt(document.getElementById('price-stillo').value) || 1250,
                sailora: parseInt(document.getElementById('price-sailora').value) || 950,
                sup: parseInt(document.getElementById('price-sup').value) || 50,
                bike: parseInt(document.getElementById('price-bike').value) || 40,
                ebike: parseInt(document.getElementById('price-ebike').value) || 80
            };
            localStorage.setItem('wcag_prices', JSON.stringify(prices));
            alert('Cennik zapisany pomyślnie!');
        }

        function loadReservations() {
            const list = JSON.parse(localStorage.getItem('wcag_reservations') || '[]');
            const tbody = document.getElementById('reservations-table');
            tbody.innerHTML = '';

            list.reverse().forEach((res, index) => {
                const tr = document.createElement('tr');
                tr.innerHTML = `
                    <td style="font-weight: 700; color: #046bd2;">${res.id}</td>
                    <td>
                        <strong>${res.name}</strong><br>
                        <span style="font-size: 12px; color: #64748b;">${res.email} | ${res.phone}</span>
                    </td>
                    <td>${res.yacht}</td>
                    <td>${res.dateFrom} do ${res.dateTo} (${res.days} d.)</td>
                    <td>SUP: ${res.sup} | Rower: ${res.bike} | E-Bike: ${res.ebike}</td>
                    <td style="font-weight: bold; color: #1e3a8a;">${parseInt(res.total).toLocaleString()} PLN</td>
                    <td><span class="status-paid">${res.status}</span></td>
                    <td>${res.dateCreated}</td>
                    <td>
                        <button onclick="deleteReservation(${index})" style="background: #ef4444; color: white; border: none; padding: 5px 10px; border-radius: 4px; font-weight: bold; cursor: pointer; font-size: 11px;">Usuń</button>
                    </td>
                `;
                tbody.appendChild(tr);
            });
        }

        function deleteReservation(revIndex) {
            if (confirm('Czy na pewno chcesz usunąć tę rezerwację?')) {
                let list = JSON.parse(localStorage.getItem('wcag_reservations') || '[]');
                list.reverse(); // Match display order
                list.splice(revIndex, 1);
                list.reverse(); // Restore original order
                localStorage.setItem('wcag_reservations', JSON.stringify(list));
                loadReservations();
            }
        }
    </script>
</body>
</html>
"""

def extract_header_footer(html_content):
    # Split by </header>
    parts = html_content.split('</header>')
    if len(parts) < 2:
        return None, None
    header = parts[0] + '</header>'
    
    # Split by <footer id="colophon"
    parts_footer = parts[1].split('<footer id="colophon"')
    if len(parts_footer) < 2:
        return None, None
    
    footer = '<footer id="colophon"' + parts_footer[1]
    return header, footer

def cleanup_old_ea11y(content):
    # 1. Remove script containing onSkipLinkClick
    content = re.sub(
        r'<script>\s*const onSkipLinkClick =.*?</script>',
        '',
        content,
        flags=re.DOTALL | re.IGNORECASE
    )
    # 2. Remove skip-to-content navigation container
    content = re.sub(
        r'<nav aria-label="Skip to content navigation">.*?</nav>',
        '',
        content,
        flags=re.DOTALL | re.IGNORECASE
    )
    # 3. Remove skip links link
    content = re.sub(
        r'<a class="skip-link screen-reader-text".*?>\s*Przejdź do treści</a>',
        '',
        content,
        flags=re.DOTALL | re.IGNORECASE
    )
    # 4. Remove stylesheets
    content = re.sub(
        r'<link[^>]*?id="ea11y-widget-fonts-css"[^>]*>',
        '',
        content,
        flags=re.IGNORECASE
    )
    content = re.sub(
        r'<link[^>]*?id="ea11y-skip-link-css"[^>]*>',
        '',
        content,
        flags=re.IGNORECASE
    )
    # 5. Remove script variables and config block
    content = re.sub(
        r'<script[^>]*?id="ea11y-widget-js-extra"[^>]*>.*?</script>',
        '',
        content,
        flags=re.DOTALL | re.IGNORECASE
    )
    # 6. Remove widget.js script import
    content = re.sub(
        r'<script[^>]*?id="ea11y-widget-js"[^>]*>.*?</script>',
        '',
        content,
        flags=re.DOTALL | re.IGNORECASE
    )
    # 7. Remove custom-a11y-theme stylesheet
    content = re.sub(
        r'<link[^>]*?href="[^"]*?custom-a11y-theme\.css"[^>]*>',
        '',
        content,
        flags=re.IGNORECASE
    )
    # 8. Remove custom-a11y-widget script import
    content = re.sub(
        r'<script[^>]*?src="[^"]*?custom-a11y-widget\.js"[^>]*>.*?</script>',
        '',
        content,
        flags=re.DOTALL | re.IGNORECASE
    )
    return content

def replace_logo_images(content):
    # Match any img tag pointing to logo.png
    logo_pattern = r'<img[^>]*?src="[^"]*?logo\.png"[^>]*>'
    logo_html = '<span class="site-logo-text"><span class="logo-main">MAZURY</span> <span class="logo-sub">AKTYWNIE</span></span>'
    content = re.sub(logo_pattern, logo_html, content, flags=re.IGNORECASE)
    return content

def process_file(file_path, lang_key, filename):
    lang_info = langs[lang_key]
    prefix = lang_info['prefix']
    
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    # Clean up old ea11y widgets completely
    content = cleanup_old_ea11y(content)

    # Replace logo image with text logo
    content = replace_logo_images(content)

    # Ingrate FontAwesome if missing for universal access icon
    if 'cdnjs.cloudflare.com/ajax/libs/font-awesome' not in content:
        fa_link = '\n<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"/>\n</head>'
        content = content.replace('</head>', fa_link)

    # Ingest WCAG Script, Font and CSS Style Injection
    font_script_style = ""
    if 'fonts.googleapis.com' not in content:
        font_script_style += '<link rel="preconnect" href="https://fonts.googleapis.com">\n<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>\n<link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;600&display=swap" rel="stylesheet">\n'
    if 'wcag-widget.js' not in content:
        font_script_style += f'<script src="{prefix}js/wcag-widget.js" defer></script>\n'
    
    custom_menu_css = """
<style>
    @media (min-width: 922px) {
        .elementor-177 .elementor-element.elementor-element-32c3f305 .elementskit-navbar-nav > li > a {
            font-size: 15px !important;
            padding: 0 8px !important;
        }
        .elementskit-navbar-nav {
            display: flex !important;
            flex-direction: row !important;
            align-items: center !important;
            flex-wrap: nowrap !important;
        }
    }
    .elementskit-nav-identity-panel {
        display: flex !important;
        align-items: center !important;
        justify-content: space-between !important;
        padding: 15px 20px !important;
    }
    .site-logo-text {
        white-space: nowrap !important;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif !important;
        font-weight: 800;
        font-size: 24px;
        letter-spacing: -0.5px;
        color: #0f172a;
    }
    .logo-sub {
        color: #046bd2;
        font-weight: 600;
    }
    /* Modern Top Menu */
    @media (min-width: 922px) {
        .elementskit-navbar-nav > li > a {
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif !important;
            font-weight: 500 !important;
            color: #334155 !important;
            transition: color 0.2s ease !important;
        }
        .elementskit-navbar-nav > li > a:hover {
            color: #046bd2 !important;
        }
    }
</style>
"""
    font_script_style += custom_menu_css
    content = content.replace('</head>', font_script_style + '</head>')

    # Main Navigation Menu Generation
    menu_html = ""
    for page_file, label in lang_info['menu']:
        active_class = " active" if page_file == filename else ""
        link_href = page_file if prefix == '' else (page_file if page_file.startswith('http') else prefix + page_file)
        
        if page_file == 'rezerwacja.html' or page_file == 'fundusze.html':
            if lang_key != 'pl':
                link_href = page_file

        menu_html += f'<li class="menu-item nav-item{active_class}"><a class="ekit-menu-nav-link menu-link" href="{link_href}">{label}</a></li>\n'
    
    # Add Dostępność (WCAG/Ally) button directly to the header menu
    accessibility_labels = {
        'pl': 'Dostępność',
        'en': 'Accessibility',
        'de': 'Barrierefreiheit'
    }
    menu_html += f'<li class="menu-item nav-item"><a class="ekit-menu-nav-link menu-link wcag-menu-toggle" href="#" style="cursor:pointer; display:inline-flex; align-items:center; gap:5px;"><svg class="ally-icon" style="width:16px;height:16px;fill:currentColor;vertical-align:middle;" viewBox="0 0 24 24"><path d="M12 2c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2zm9 7h-6v13h-2v-6h-2v6H9V9H3V7h18v2z"/></svg>{accessibility_labels[lang_key]}</a></li>\n'

    # Add flags
    menu_html += '<li class="menu-item nav-item" style="display: inline-flex !important; flex-direction: row !important; flex-wrap: nowrap !important; align-items: center !important; gap: 8px !important; margin-left: 15px !important; vertical-align: middle !important;">'
    
    pl_href = filename if lang_key == 'pl' else '../' + filename
    menu_html += f'<a href="{pl_href}" style="font-weight: bold; color: inherit; text-decoration: none; display: inline-flex !important; align-items: center !important;"><img alt="PL" src="https://flagcdn.com/w40/pl.png" style="border-radius:2px; vertical-align: middle; min-width: 24px; max-width: 24px;" width="24"/></a>'
    
    en_href = ('en/' + filename) if lang_key == 'pl' else (filename if lang_key == 'en' else '../en/' + filename)
    menu_html += f'<a href="{en_href}" style="font-weight: bold; color: inherit; text-decoration: none; display: inline-flex !important; align-items: center !important;"><img alt="EN" src="https://flagcdn.com/w40/gb.png" style="border-radius:2px; vertical-align: middle; min-width: 24px; max-width: 24px;" width="24"/></a>'
    
    de_href = ('de/' + filename) if lang_key == 'pl' else (filename if lang_key == 'de' else '../de/' + filename)
    menu_html += f'<a href="{de_href}" style="font-weight: bold; color: inherit; text-decoration: none; display: inline-flex !important; align-items: center !important;"><img alt="DE" src="https://flagcdn.com/w40/de.png" style="border-radius:2px; vertical-align: middle; min-width: 24px; max-width: 24px;" width="24"/></a>'
    menu_html += '</li>'

    # Pure string menu replacement (robust)
    start_menu = '<ul class="elementskit-navbar-nav elementskit-menu-po-left submenu-click-on-icon" id="menu-main-navigation">'
    if start_menu in content:
        parts = content.split(start_menu, 1)
        subparts = parts[1].split('</ul>', 1)
        content = parts[0] + start_menu + menu_html + '</ul>' + subparts[1]

    # Bottom Mobile Nav Bar Generation
    mob_nav_html_inner = ""
    for page_file, icon_class, label in lang_info['mobile_nav']:
        link_href = page_file if prefix == '' else (page_file if page_file.startswith('http') else prefix + page_file)
        if page_file in ['rezerwacja.html', 'fundusze.html'] and lang_key != 'pl':
            link_href = page_file
        
        mob_nav_html_inner += f'<a class="mobile-nav-item" href="{link_href}"><i class="fas {icon_class}"></i><span>{label}</span></a>'

    # Append custom WCAG toggle to mobile bottom nav
    mob_nav_html_inner += f'<a class="mobile-nav-item wcag-menu-toggle" href="#" style="cursor:pointer;"><i class="fas fa-universal-access"></i><span>{accessibility_labels[lang_key]}</span></a>'

    start_mob = '<nav id="mobile-bottom-nav">'
    if start_mob in content:
        parts = content.split(start_mob, 1)
        subparts = parts[1].split('</nav>', 1)
        content = parts[0] + start_mob + mob_nav_html_inner + '</nav>' + subparts[1]

    # Lookback Link Replacement for "Rezerwuj teraz", "Book now", "Jetzt buchen" buttons
    lines = content.split('\n')
    for i, line in enumerate(lines):
        if 'elementor-button-text' in line and any(term in line.lower() for term in ['rezerwuj teraz', 'book now', 'jetzt buchen']):
            # Search upwards for the nearest <a> tag
            for j in range(i - 1, max(-1, i - 15), -1):
                if '<a ' in lines[j] and 'href=' in lines[j]:
                    lines[j] = re.sub(r'href="[^"]*"', f'href="{prefix}rezerwacja.html"', lines[j])
                    break
    content = '\n'.join(lines)

    
    # 1. Replace footer menu list with fully functional localized navigation
    footer_menu_pl = f"""<ul class="elementor-icon-list-items">
<li class="elementor-icon-list-item"><a href="{prefix}about.html"><span class="elementor-icon-list-text">O nas</span></a></li>
<li class="elementor-icon-list-item"><a href="{prefix}fleets.html"><span class="elementor-icon-list-text">Czarter</span></a></li>
<li class="elementor-icon-list-item"><a href="{prefix}rezerwacja.html"><span class="elementor-icon-list-text">Rezerwacja</span></a></li>
<li class="elementor-icon-list-item"><a href="{prefix}fundusze.html"><span class="elementor-icon-list-text">Fundusze UE</span></a></li>
<li class="elementor-icon-list-item"><a href="{prefix}contact.html"><span class="elementor-icon-list-text">Kontakt</span></a></li>
</ul>"""

    footer_menu_en = f"""<ul class="elementor-icon-list-items">
<li class="elementor-icon-list-item"><a href="{prefix}about.html"><span class="elementor-icon-list-text">About Us</span></a></li>
<li class="elementor-icon-list-item"><a href="{prefix}fleets.html"><span class="elementor-icon-list-text">Charter</span></a></li>
<li class="elementor-icon-list-item"><a href="{prefix}rezerwacja.html"><span class="elementor-icon-list-text">Booking</span></a></li>
<li class="elementor-icon-list-item"><a href="{prefix}fundusze.html"><span class="elementor-icon-list-text">EU Funds</span></a></li>
<li class="elementor-icon-list-item"><a href="{prefix}contact.html"><span class="elementor-icon-list-text">Contact</span></a></li>
</ul>"""

    footer_menu_de = f"""<ul class="elementor-icon-list-items">
<li class="elementor-icon-list-item"><a href="{prefix}about.html"><span class="elementor-icon-list-text">Über uns</span></a></li>
<li class="elementor-icon-list-item"><a href="{prefix}fleets.html"><span class="elementor-icon-list-text">Charter</span></a></li>
<li class="elementor-icon-list-item"><a href="{prefix}rezerwacja.html"><span class="elementor-icon-list-text">Buchung</span></a></li>
<li class="elementor-icon-list-item"><a href="{prefix}fundusze.html"><span class="elementor-icon-list-text">EU-Mittel</span></a></li>
<li class="elementor-icon-list-item"><a href="{prefix}contact.html"><span class="elementor-icon-list-text">Kontakt</span></a></li>
</ul>"""

    if '<footer id="colophon"' in content:
        parts_colophon = content.split('<footer id="colophon"', 1)
        footer_part = parts_colophon[1]
        
        f_menu = footer_menu_pl
        if lang_key == 'en':
            f_menu = footer_menu_en
        elif lang_key == 'de':
            f_menu = footer_menu_de
            
        footer_part_new = re.sub(
            r'<ul class="elementor-icon-list-items">.*?</ul>',
            f_menu,
            footer_part,
            count=1,
            flags=re.DOTALL
        )
        content = parts_colophon[0] + '<footer id="colophon"' + footer_part_new

    # 2. Inject EU Banner above the footer on all pages except index.html
    if filename != 'index.html' and 'eu-footer-banner' not in content:
        eu_titles = {
            'pl': 'Fundusze Europejskie - Rzeczpospolita Polska - Unia Europejska',
            'en': 'European Funds - Republic of Poland - European Union',
            'de': 'Europäische Fonds - Republik Polen - Europäische Union'
        }
        eu_title = eu_titles.get(lang_key, eu_titles['pl'])
        
        eu_banner = f"""
        <div class="eu-footer-banner" style="background-color: #ffffff; padding: 30px 20px; text-align: center; border-top: 1px solid #e2e8f0; border-bottom: 1px solid #e2e8f0; margin-top: 40px; margin-bottom: 0;">
            <div style="max-width: 1100px; margin: 0 auto;">
                <a href="{prefix}fundusze.html" style="display: block; transition: transform 0.2s ease-in-out;" onmouseover="this.style.transform='scale(1.02)'" onmouseout="this.style.transform='scale(1)'">
                    <img src="{prefix}images/assets/stopka_loga.png" alt="{eu_title}" style="max-width: 100%; height: auto; display: inline-block;">
                </a>
            </div>
        </div>
        """
        if '<footer id="colophon"' in content:
            content = content.replace('<footer id="colophon"', eu_banner + '\n<footer id="colophon"')

    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(content)
        
    print(f"Processed: {file_path}")

def main():
    contact_path = os.path.join(backup_dir, 'contact.html')
    with open(contact_path, 'r', encoding='utf-8') as f:
        contact_html = f.read()
    
    header, footer = extract_header_footer(contact_html)
    if not header or not footer:
        print("Error: Could not extract header or footer from contact.html")
        return

    about_path = os.path.join(backup_dir, 'about.html')
    with open(about_path, 'r', encoding='utf-8') as f:
        about_html = f.read()
    about_header, about_footer = extract_header_footer(about_html)

    # Create new pages (rezerwacja, fundusze, sukces)
    for lang_key, lang_info in langs.items():
        sub_dir = os.path.join(backup_dir, lang_info['dir'])
        prefix = lang_info['prefix']
        
        if lang_key == 'pl':
            cur_header, cur_footer = header, footer
            cur_about_header, cur_about_footer = about_header, about_footer
        else:
            c_path = os.path.join(sub_dir, 'contact.html')
            a_path = os.path.join(sub_dir, 'about.html')
            
            with open(c_path, 'r', encoding='utf-8') as f:
                c_html = f.read()
            cur_header, cur_footer = extract_header_footer(c_html)
            
            with open(a_path, 'r', encoding='utf-8') as f:
                a_html = f.read()
            cur_about_header, cur_about_footer = extract_header_footer(a_html)

        def set_title(html, title):
            return re.sub(r'<title>.*?</title>', f'<title>{title}</title>', html)

                # 1. Create rezerwacja.html
        titles_rezerwacja = {
            'pl': 'Rezerwacja Online – Mazury Aktywnie',
            'en': 'Online Booking – Mazury Aktywnie',
            'de': 'Online-Buchung – Mazury Aktywnie'
        }
        rezerwacja_body = content_rezerwacja[lang_key].replace('{prefix}', prefix)
        rezerwacja_html = set_title(cur_header + rezerwacja_body + cur_footer, titles_rezerwacja[lang_key])
        
        rezerwacja_file = os.path.join(sub_dir, 'rezerwacja.html')
        with open(rezerwacja_file, 'w', encoding='utf-8') as f:
            f.write(rezerwacja_html)
        print(f"Created: {rezerwacja_file}")

        # 2. Create fundusze.html
        titles_fundusze = {
            'pl': 'Fundusze Europejskie – Mazury Aktywnie',
            'en': 'European Funds – Mazury Aktywnie',
            'de': 'Europäische Fonds – Mazury Aktywnie'
        }
        fundusze_body = content_fundusze[lang_key].replace('{prefix}', prefix)
        fundusze_html = set_title(cur_about_header + fundusze_body + cur_about_footer, titles_fundusze[lang_key])
        
        fundusze_file = os.path.join(sub_dir, 'fundusze.html')
        with open(fundusze_file, 'w', encoding='utf-8') as f:
            f.write(fundusze_html)
        print(f"Created: {fundusze_file}")

        # 3. Create sukses.html
        titles_sukces = {
            'pl': 'Rezerwacja Potwierdzona – Mazury Aktywnie',
            'en': 'Booking Confirmed – Mazury Aktywnie',
            'de': 'Buchung bestätigt – Mazury Aktywnie'
        }
        sukces_body = content_sukces[lang_key].replace('{prefix}', prefix)
        sukces_html = set_title(cur_header + sukces_body + cur_footer, titles_sukces[lang_key])
        
        sukces_file = os.path.join(sub_dir, 'sukces.html')
        with open(sukces_file, 'w', encoding='utf-8') as f:
            f.write(sukces_html)
        print(f"Created: {sukces_file}")

    # 4. Create admin.html at Polish root level
    admin_file = os.path.join(backup_dir, 'admin.html')
    with open(admin_file, 'w', encoding='utf-8') as f:
        f.write(content_admin)
    print(f"Created admin: {admin_file}")

    # 5. Process all HTML files to inject menus, mobile navs, clean old widgets and apply logo replacements
    for lang_key, lang_info in langs.items():
        sub_dir = os.path.join(backup_dir, lang_info['dir'])
        for file in os.listdir(sub_dir):
            if file.endswith('.html') and file != 'embed.html':
                process_file(os.path.join(sub_dir, file), lang_key, file)

if __name__ == "__main__":
    main()
