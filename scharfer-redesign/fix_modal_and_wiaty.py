import re

# 1. Update main.js modal content
with open('main.js', 'r', encoding='utf-8') as f:
    js_content = f.read()

new_modal_html = """
    modal.innerHTML = `
        <div class="modal-content" style="max-width: 900px; max-height: 90vh; overflow-y: auto;">
            <span class="modal-close">&times;</span>
            
            <div class="modal-image-col">
                <img src="${p.img}" alt="${p.name}" style="cursor: zoom-in; transition: transform 0.3s ease; position: relative; z-index: 10; width: 100%; border-radius: 8px; box-shadow: 0 4px 15px rgba(0,0,0,0.05);" onclick="this.style.transform = this.style.transform === 'scale(1.8)' ? 'scale(1)' : 'scale(1.8)';">
            </div>
            
            <div class="modal-info-col">
                <h2 style="font-size: 1.8rem; margin-bottom: 0.5rem; color: var(--c-heading);">${p.name}</h2>
                <div class="modal-index" style="margin-bottom: 1.5rem; font-size: 1rem; color: #666; font-weight: 500;">EAN: ${p.ean || ''} <span style="margin-left: 1rem; color: var(--c-primary);">SKU: ${p.index}</span></div>
                
                <div class="product-specs-detailed">
                    <div class="spec-group" style="margin-bottom: 1.5rem;">
                        <h4 style="font-size: 0.95rem; color: var(--c-heading); margin-bottom: 0.8rem; text-transform: uppercase; letter-spacing: 0.05em; border-bottom: 1px solid #eee; padding-bottom: 0.5rem;">Podstawowe parametry</h4>
                        <table class="modal-specs-table" style="width: 100%; border-collapse: collapse; font-size: 0.95rem;">
                            <tbody>
                                <tr>
                                    <td style="padding: 0.5rem 0; color: #555; width: 45%; border-bottom: 1px solid #f5f5f5;">${voltageLabel}</td>
                                    <td style="padding: 0.5rem 0; font-weight: 600; border-bottom: 1px solid #f5f5f5;">${p.specs.voltage} DC</td>
                                </tr>
                                <tr>
                                    <td style="padding: 0.5rem 0; color: #555; border-bottom: 1px solid #f5f5f5;">${currentLabel}</td>
                                    <td style="padding: 0.5rem 0; font-weight: 600; border-bottom: 1px solid #f5f5f5;">${p.specs.current}</td>
                                </tr>
                                <tr>
                                    <td style="padding: 0.5rem 0; color: #555; border-bottom: 1px solid #f5f5f5;">Moc znamionowa</td>
                                    <td style="padding: 0.5rem 0; font-weight: 600; border-bottom: 1px solid #f5f5f5;">${p.name.split(' ')[1]}</td>
                                </tr>
                                <tr>
                                    <td style="padding: 0.5rem 0; color: #555; border-bottom: 1px solid #f5f5f5;">${dimLabel}</td>
                                    <td style="padding: 0.5rem 0; font-weight: 600; border-bottom: 1px solid #f5f5f5;">${p.specs.dim}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div class="spec-group" style="margin-bottom: 1.5rem;">
                        <h4 style="font-size: 0.95rem; color: var(--c-heading); margin-bottom: 0.8rem; text-transform: uppercase; letter-spacing: 0.05em; border-bottom: 1px solid #eee; padding-bottom: 0.5rem;">Cechy produktu</h4>
                        <ul style="list-style-type: none; padding: 0; margin: 0; font-size: 0.9rem; color: var(--c-text); line-height: 1.5;">
                            <li style="margin-bottom: 0.4rem; display: flex; align-items: flex-start; gap: 8px;"><span style="color: var(--c-primary); font-weight: bold;">•</span> Klasa szczelności IP67 (wewnętrzne i zewnętrzne)</li>
                            <li style="margin-bottom: 0.4rem; display: flex; align-items: flex-start; gap: 8px;"><span style="color: var(--c-primary); font-weight: bold;">•</span> 100% pełne obciążenie, 100% test wypalenia (Burn-in)</li>
                            <li style="margin-bottom: 0.4rem; display: flex; align-items: flex-start; gap: 8px;"><span style="color: var(--c-primary); font-weight: bold;">•</span> Wbudowany aktywny układ PFC, PF>0,98</li>
                            <li style="margin-bottom: 0.4rem; display: flex; align-items: flex-start; gap: 8px;"><span style="color: var(--c-primary); font-weight: bold;">•</span> Wysoka wydajność i stabilne napięcie</li>
                        </ul>
                    </div>
                    
                    <div class="spec-group" style="margin-bottom: 1.5rem;">
                        <h4 style="font-size: 0.95rem; color: var(--c-heading); margin-bottom: 0.8rem; text-transform: uppercase; letter-spacing: 0.05em; border-bottom: 1px solid #eee; padding-bottom: 0.5rem;">Zabezpieczenia</h4>
                        <ul style="list-style-type: none; padding: 0; margin: 0; font-size: 0.9rem; color: var(--c-text); line-height: 1.5;">
                            <li style="margin-bottom: 0.4rem; display: flex; align-items: flex-start; gap: 8px;"><span style="color: var(--c-primary); font-weight: bold;">•</span> <strong>OVP, SCP, OTP, OLP</strong></li>
                            <li style="margin-bottom: 0.4rem; display: flex; align-items: flex-start; gap: 8px;"><span style="color: var(--c-primary); font-weight: bold;">•</span> Przeciążenie: tryb nadmiernego spadku napięcia, autoodzyskiwanie</li>
                            <li style="margin-bottom: 0.4rem; display: flex; align-items: flex-start; gap: 8px;"><span style="color: var(--c-primary); font-weight: bold;">•</span> Zwarcie: tryb chwilowego wyłączenia, autoodzyskiwanie</li>
                        </ul>
                    </div>
                    
                    <div class="spec-group" style="margin-bottom: 1rem;">
                        <h4 style="font-size: 0.95rem; color: var(--c-heading); margin-bottom: 0.8rem; text-transform: uppercase; letter-spacing: 0.05em; border-bottom: 1px solid #eee; padding-bottom: 0.5rem;">Środowisko i Certyfikaty</h4>
                        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.5rem; font-size: 0.85rem; margin-bottom: 0.8rem;">
                            <div style="background: #f8f9fa; padding: 0.5rem 0.75rem; border-radius: 6px;"><strong>Temp. pracy:</strong> -30°C ~ +50°C</div>
                            <div style="background: #f8f9fa; padding: 0.5rem 0.75rem; border-radius: 6px;"><strong>Wilgotność:</strong> 20 ~ 95% RH</div>
                        </div>
                        <p style="font-size: 0.8rem; color: #888; line-height: 1.4; margin: 0;">
                            <strong>Certyfikaty:</strong> CE, RoHS, SELV<br>
                            <strong>Normy:</strong> EN 61347-2-13; EN 61347-1; EN 62493; EN 55015; EN 61547; EN 61000-3-2; EN 61000-3-3; 2014/35/EU; 2014/30/EU
                        </p>
                    </div>
                </div>
                
                <div class="modal-actions">
"""

old_modal_regex = re.compile(r'modal\.innerHTML = `[\s\S]*?<div class="modal-actions">')
js_content_updated = old_modal_regex.sub(new_modal_html.strip(), js_content)

with open('main.js', 'w', encoding='utf-8') as f:
    f.write(js_content_updated)

# 2. Add Wiaty to index.html and update the EAN string for product cards (EAN is empty in current product-card HTML)
with open('index.html', 'r', encoding='utf-8') as f:
    html_content = f.read()

wiaty_html = """
                    <!-- App 12: Wiaty i Stolarka -->
                    <div class="app-card" style="border-radius: 12px; overflow: hidden; box-shadow: var(--shadow-md); transition: transform 0.3s ease;">
                        <img src="wiata_jezioro.png" alt="Oświetlenie wiat i drewnianej stolarki" style="width: 100%; height: 250px; object-fit: cover; display: block;">
                        <div class="app-content" style="padding: 1.5rem; background: var(--c-white);">
                            <h3 style="margin: 0 0 0.5rem; font-size: 1.25rem;">Wiaty i Stolarka Drewniana</h3>
                            <p style="margin: 0; color: var(--c-text); font-size: 0.95rem;">Zasilacze hermetyczne Scharfer idealnie sprawdzają się w konstrukcjach drewnianych (wiaty, altany, pergole) ze względu na wysoką odporność na wilgoć, zabezpieczenia termiczne i pełną szczelność.</p>
                        </div>
                    </div>
"""

# Append it before the closing tag of app-grid
html_content = html_content.replace('<!-- App 11: Mosty -->', wiaty_html + '<!-- App 11: Mosty -->')

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(html_content)

print("Updates applied.")
