with open('main.js', 'r', encoding='utf-8') as f:
    js_content = f.read()

old_html = """                <div class="product-index">SKU: ${p.index}</div>
                <h3 class="product-name">${p.name}</h3>

                <div class="product-specs">
                    <div class="spec-line">
                        <span class="spec-label">${t.specVoltage || 'Napięcie'}</span>
                        <span class="spec-value">${p.specs.voltage} DC</span>
                    </div>
                    <div class="spec-line">
                        <span class="spec-label">${t.specCurrent || 'Prąd wyjściowy'}</span>
                        <span class="spec-value">${p.specs.current}</span>
                    </div>
                    <div class="spec-line">
                        <span class="spec-label">${t.specDim || 'Wymiary'}</span>
                        <span class="spec-value">${p.specs.dim}</span>
                    </div>
                    <div class="spec-line">
                        <span class="spec-label">Zabezpieczenia</span>
                        <span class="spec-value">OVP, SCP, OTP, OLP</span>
                    </div>
                </div>
                
                <button class="btn-primary" onclick="openProductModal('${p.index}')" style="margin-top: auto; display: flex; align-items: center; justify-content: center; gap: 0.5rem; width: 100%;">
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" style="width: 18px; height: 18px;">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                    </svg>
                    Pobierz kartę (PDF)
                </a>"""

new_html = """                <div class="product-index">EAN: ${p.ean || ''}</div>
                <h3 class="product-name">${p.name}</h3>

                <div class="product-specs">
                    <div class="spec-line">
                        <span class="spec-label">${t.specVoltage || 'Napięcie'}</span>
                        <span class="spec-value">${p.specs.voltage} DC</span>
                    </div>
                    <div class="spec-line">
                        <span class="spec-label">${t.specCurrent || 'Prąd wyjściowy'}</span>
                        <span class="spec-value">${p.specs.current}</span>
                    </div>
                    <div class="spec-line">
                        <span class="spec-label">${t.specDim || 'Wymiary'}</span>
                        <span class="spec-value">${p.specs.dim}</span>
                    </div>
                    <div class="spec-line">
                        <span class="spec-label">Zabezpieczenia</span>
                        <span class="spec-value">OVP, SCP, OTP, OLP</span>
                    </div>
                </div>
                
                <a href="${p.pdf}" target="_blank" class="btn-primary" style="margin-top: auto; display: flex; align-items: center; justify-content: center; gap: 0.5rem; width: 100%; text-decoration: none;">
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" style="width: 18px; height: 18px;">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path>
                    </svg>
                    Pobierz kartę (PDF)
                </a>"""

js_content = js_content.replace(old_html, new_html)

with open('main.js', 'w', encoding='utf-8') as f:
    f.write(js_content)

print("Updated main.js")
