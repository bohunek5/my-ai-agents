with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()

hero_html = """
        <div class="oferta-hero" style="background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%); padding: 4rem 2rem; text-align: center; color: white;">
            <div class="container" style="max-width: 800px; margin: 0 auto;">
                <h1 style="font-size: 2.5rem; margin-bottom: 1rem; color: white;">Pełna Oferta Zasilaczy Scharfer</h1>
                <p style="font-size: 1.1rem; color: #cbd5e1; line-height: 1.6;">Niezawodne zasilacze napięciowe LED 12V i 24V. Wybierz rozwiązanie idealnie dopasowane do Twojego projektu, gwarantujące stabilność i bezpieczeństwo na lata.</p>
            </div>
        </div>
"""

target = '<section id="oferta-tab" class="view-section">'
if target in html and 'class="oferta-hero"' not in html:
    html = html.replace(target, target + '\n' + hero_html)

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(html)

print("Updated oferta tab with hero")
