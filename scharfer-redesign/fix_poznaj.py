with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()

trust_html = """
                    <div class="hero-trust" style="margin-top: 3rem; justify-content: center;">
                        <div class="trust-item" style="background: var(--c-white); padding: 1rem 1.5rem; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.05);">
                            <span class="trust-val" style="display: block; font-size: 1.5rem; font-weight: 800; color: var(--c-primary); margin-bottom: 0.2rem;">7</span>
                            <span class="trust-lbl" style="font-size: 0.9rem; color: var(--c-text); font-weight: 500;">Lat Gwarancji</span>
                        </div>
                        <div class="trust-item" style="background: var(--c-white); padding: 1rem 1.5rem; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.05);">
                            <span class="trust-val" style="display: block; font-size: 1.5rem; font-weight: 800; color: var(--c-primary); margin-bottom: 0.2rem;">IP67</span>
                            <span class="trust-lbl" style="font-size: 0.9rem; color: var(--c-text); font-weight: 500;">Pełna Szczelność</span>
                        </div>
                        <div class="trust-item" style="background: var(--c-white); padding: 1rem 1.5rem; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.05);">
                            <span class="trust-val" style="display: block; font-size: 1.5rem; font-weight: 800; color: var(--c-primary); margin-bottom: 0.2rem;">100%</span>
                            <span class="trust-lbl" style="font-size: 0.9rem; color: var(--c-text); font-weight: 500;">Praca pod obciążeniem</span>
                        </div>
                        <div class="trust-item" style="background: var(--c-white); padding: 1rem 1.5rem; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.05);">
                            <span class="trust-val" style="display: block; font-size: 1.5rem; font-weight: 800; color: var(--c-primary); margin-bottom: 0.2rem;">24h</span>
                            <span class="trust-lbl" style="font-size: 0.9rem; color: var(--c-text); font-weight: 500;">Wysyłka</span>
                        </div>
                    </div>
"""

target = '<p style="font-size: 1.25rem; color: var(--c-text); line-height: 1.6;">Odkryj innowacje i zabezpieczenia, które sprawiają, że zasilacze Scharfer są najczęstszym wyborem profesjonalistów w branży oświetleniowej i B2B.</p>'
if target in html and 'hero-trust" style="margin-top: 3rem' not in html:
    html = html.replace(target, target + trust_html)

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(html)

print("Updated poznaj tab with trust blocks")
