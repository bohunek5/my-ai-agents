import re
import os

with open('build_site.py', 'r', encoding='utf-8') as f:
    content = f.read()

# Helper to find and replace the content dictionary
def replace_content_dict(content, dict_name, new_dict_code):
    pattern = rf'{dict_name}\s*=\s*\{{.*?^\}}'
    return re.sub(pattern, new_dict_code, content, flags=re.MULTILINE | re.DOTALL)

# Rezerwacja Apple Style (PL)
rezerwacja_pl = """
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
            transition: all 0.2s ease-in-out;
            box-sizing: border-box;
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
            background: #f8fafc; border-radius: 16px; border: 1px solid #e2e8f0; overflow: hidden;
            margin-top: 10px;
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
    </style>
    <div class="elementor-element elementor-element-3a64cb1 e-con-full e-flex e-con e-parent" data-e-type="container" data-element_type="container" data-id="3a64cb1">
        <div class="elementor-element elementor-element-2ee0fa03 e-flex e-con-boxed e-con e-child" data-e-type="container" data-element_type="container" data-id="2ee0fa03" data-settings='{"background_background":"classic"}'>
            <div class="e-con-inner">
                <div class="elementor-element elementor-element-5adc88e1 e-con-full e-flex e-con e-child" data-e-type="container" data-element_type="container" data-id="5adc88e1">
                    <div class="elementor-element elementor-element-11ea3f84 elementor-widget elementor-widget-heading" data-e-type="widget" data-element_type="widget" data-id="11ea3f84" data-widget_type="heading.default">
                        <h1 class="elementor-heading-title elementor-size-default" style="font-family: -apple-system, BlinkMacSystemFont, sans-serif; font-weight: 700; letter-spacing: -1px;">Rezerwacja Online</h1>
                    </div>
                </div>
            </div>
        </div>
    </div>
    
    <div class="apple-container">
        <h2 class="apple-title">Skonfiguruj swój czarter</h2>
        <form id="booking-form" onsubmit="handleBookingSubmit(event)" style="display: flex; flex-direction: column; gap: 20px;">
            <div>
                <label class="apple-label">Wybierz jacht / houseboat</label>
                <select id="yacht-select" class="apple-input apple-select" onchange="calculatePrice()">
                    <option value="stillo" data-price="1250">Stillo 31 (Luksusowy houseboat) - 1 250 PLN / dzień</option>
                    <option value="sailora" data-price="950">Sailora (Komfortowy jacht) - 950 PLN / dzień</option>
                </select>
            </div>

            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px;">
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
                    <div style="display: flex; justify-content: space-between; align-items: center;">
                        <div><span style="font-weight: 600; display: block;">Deski SUP</span><span style="font-size: 13px; color: #86868b;">Dmuchana deska z wiosłem (max 4)</span></div>
                        <div style="display: flex; align-items: center; gap: 10px;"><span style="font-weight: 600; color: #0071e3;">50 PLN / dzień</span><input type="number" id="sup-count" min="0" max="4" value="0" onchange="calculatePrice()" class="apple-input" style="width: 70px; text-align: center; height: 40px;"></div>
                    </div>
                    <div style="height: 1px; background: #e2e8f0;"></div>
                    <div style="display: flex; justify-content: space-between; align-items: center;">
                        <div><span style="font-weight: 600; display: block;">Rowery tradycyjne</span><span style="font-size: 13px; color: #86868b;">Idealne na szlaki (max 6)</span></div>
                        <div style="display: flex; align-items: center; gap: 10px;"><span style="font-weight: 600; color: #0071e3;">40 PLN / dzień</span><input type="number" id="bike-count" min="0" max="6" value="0" onchange="calculatePrice()" class="apple-input" style="width: 70px; text-align: center; height: 40px;"></div>
                    </div>
                    <div style="height: 1px; background: #e2e8f0;"></div>
                    <div style="display: flex; justify-content: space-between; align-items: center;">
                        <div><span style="font-weight: 600; display: block;">Rowery elektryczne</span><span style="font-size: 13px; color: #86868b;">E-Bike turystyczne (max 4)</span></div>
                        <div style="display: flex; align-items: center; gap: 10px;"><span style="font-weight: 600; color: #0071e3;">80 PLN / dzień</span><input type="number" id="ebike-count" min="0" max="4" value="0" onchange="calculatePrice()" class="apple-input" style="width: 70px; text-align: center; height: 40px;"></div>
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
                <div style="grid-column: span 2;">
                    <label class="apple-label">Imię i Nazwisko</label>
                    <input type="text" id="cust-name" required class="apple-input">
                </div>
                <div>
                    <label class="apple-label">E-mail</label>
                    <input type="email" id="cust-email" required class="apple-input">
                </div>
                <div>
                    <label class="apple-label">Telefon</label>
                    <input type="tel" id="cust-phone" required class="apple-input">
                </div>
            </div>

            <button type="submit" class="apple-btn">Zapłać i Rezerwuj Online (Stripe / Przelewy24)</button>
        </form>
    </div>
    
    <!-- Payment Overlay Simulation -->
    <div id="payment-overlay" style="display: none; position: fixed; inset: 0; background: rgba(0,0,0,0.4); backdrop-filter: blur(10px); -webkit-backdrop-filter: blur(10px); z-index: 1000000; align-items: center; justify-content: center; color: #1d1d1f; font-family: -apple-system, BlinkMacSystemFont, sans-serif;">
        <div style="text-align: center; max-width: 320px; width: 90%; padding: 40px; background: #ffffff; border-radius: 24px; box-shadow: 0 20px 40px rgba(0,0,0,0.1);">
            <div style="width: 40px; height: 40px; border: 3px solid #e2e8f0; border-top-color: #0071e3; border-radius: 50%; animation: spin 1s linear infinite; margin: 0 auto 20px;"></div>
            <h3 style="font-size: 18px; font-weight: 600; margin-bottom: 8px;">Łączenie z bramką</h3>
            <p style="color: #86868b; font-size: 14px; margin: 0;">Przekierowywanie do bezpiecznej płatności...</p>
        </div>
    </div>
    <style>@keyframes spin { to { transform: rotate(360deg); } } details > summary { list-style: none; } details > summary::-webkit-details-marker { display: none; } details[open] summary svg { transform: rotate(180deg); }</style>
    <script>
        // Set min dates to today
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
                status: 'paid'
            };

            setTimeout(() => {
                let reservations = JSON.parse(localStorage.getItem('wcag_reservations') || '[]');
                reservations.push(reservation);
                localStorage.setItem('wcag_reservations', JSON.stringify(reservations));
                window.location.href = 'sukces.html';
            }, 1500);
        }
    </script>
    '''
"""

# Now replace content_rezerwacja completely
new_dict_code = f"content_rezerwacja = {{{rezerwacja_pl},\n    'en': content_rezerwacja['en'],\n    'de': content_rezerwacja['de']\n}}"
# Wait, I don't have content_rezerwacja['en'] available during regex replacement.
# I'll just replace the whole dict with a modified one in memory using exec, or simple string splitting.

EOF
