import os
import re

TARGET_FILE = "/Users/karolbohdanowicz/Downloads/kopia mazuryaktywnie/js/wcag-widget.js"

with open(TARGET_FILE, 'r', encoding='utf-8') as f:
    js_content = f.read()

# We need to make sure the panel is centered on both mobile and PC.
# The user said: "wcag kotku wez daj na srodek wkranu jak sie otweira a nie gdzies na krancu ...... tak samo mobilka zabko bo inaczej to jest nie czytelne i nic co wewnatrz nigdy nie opuszcza wlasnej ramki. a logika naciskania pozwala nie zapetlic ani nie zablokowac uzytkownika w maretwym punkcie nie dawaj ally by anty gravity tylko Strona przyjazna wszystkim"

# Let's completely replace the CSS injected by JS to ensure it's robust and centered.
new_css = """
        #wcag-toggle-btn {
            position: fixed;
            top: 20px;
            left: 50%;
            transform: translateX(-50%);
            z-index: 99999;
            background-color: #007bff;
            color: #fff;
            border: none;
            padding: 10px 15px;
            border-radius: 5px;
            cursor: pointer;
            box-shadow: 0 4px 6px rgba(0,0,0,0.3);
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
            font-weight: bold;
        }
        
        @media (max-width: 768px) {
            #wcag-toggle-btn {
                top: auto;
                bottom: 20px;
                width: 80%;
                max-width: 300px;
                text-align: center;
                display: block;
            }
        }

        #wcag-panel {
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            z-index: 100000;
            background: rgba(255, 255, 255, 0.95);
            backdrop-filter: blur(10px);
            border-radius: 12px;
            padding: 20px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.2);
            width: 90%;
            max-width: 400px;
            max-height: 90vh;
            overflow-y: auto;
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
            display: none;
            box-sizing: border-box;
        }

        #wcag-panel.wcag-active {
            display: block;
        }
        
        #wcag-panel h3 {
            margin-top: 0;
            margin-bottom: 20px;
            font-size: 20px;
            text-align: center;
            color: #333;
        }

        .wcag-controls {
            display: flex;
            flex-direction: column;
            gap: 15px;
        }

        .wcag-btn {
            background-color: #f0f0f5;
            border: 1px solid #ccc;
            padding: 12px;
            border-radius: 8px;
            cursor: pointer;
            font-size: 16px;
            transition: all 0.2s;
            color: #333;
            width: 100%;
            box-sizing: border-box;
            text-align: center;
        }

        .wcag-btn:hover {
            background-color: #e0e0e5;
        }

        .wcag-btn.active {
            background-color: #007bff;
            color: white;
            border-color: #0056b3;
        }

        .wcag-close {
            position: absolute;
            top: 10px;
            right: 15px;
            font-size: 24px;
            cursor: pointer;
            color: #666;
            background: none;
            border: none;
            padding: 0;
            line-height: 1;
        }
        
        .wcag-close:hover {
            color: #000;
        }

        .wcag-footer {
            margin-top: 20px;
            text-align: center;
            font-size: 12px;
            color: #888;
            border-top: 1px solid #eee;
            padding-top: 10px;
        }

        /* Accessibilty Classes */
        body.wcag-high-contrast {
            background-color: #000 !important;
            color: #fff !important;
        }
        body.wcag-high-contrast * {
            background-color: #000 !important;
            color: #ff0 !important;
            border-color: #fff !important;
        }
        body.wcag-large-text {
            font-size: 120% !important;
        }
        body.wcag-large-text * {
            font-size: 120% !important;
            line-height: 1.5 !important;
        }
        body.wcag-highlight-links a {
            background-color: #ff0 !important;
            color: #000 !important;
            text-decoration: underline !important;
        }
"""

# We need to replace the injectCSS part in the JS file.
# First, let's just rewrite the whole JS file to be safe and clean, since it's just a widget.

new_js = f"""
document.addEventListener('DOMContentLoaded', function() {{
    const style = document.createElement('style');
    style.innerHTML = `{new_css}`;
    document.head.appendChild(style);

    const toggleBtn = document.createElement('button');
    toggleBtn.id = 'wcag-toggle-btn';
    toggleBtn.setAttribute('aria-label', 'Otwórz panel dostępności');
    toggleBtn.innerHTML = '♿ Dostępność';
    document.body.appendChild(toggleBtn);

    const panel = document.createElement('div');
    panel.id = 'wcag-panel';
    panel.innerHTML = `
        <button class="wcag-close" aria-label="Zamknij panel dostępności">&times;</button>
        <h3>Opcje Dostępności</h3>
        <div class="wcag-controls">
            <button class="wcag-btn" id="wcag-contrast-btn">Wysoki Kontrast</button>
            <button class="wcag-btn" id="wcag-text-btn">Powiększ Tekst</button>
            <button class="wcag-btn" id="wcag-links-btn">Podświetl Linki</button>
            <button class="wcag-btn" id="wcag-reset-btn">Resetuj Ustawienia</button>
        </div>
        <div class="wcag-footer">Strona przyjazna wszystkim<br><a href="#" id="wcag-statement-link">Oświadczenie o dostępności</a></div>
    `;
    document.body.appendChild(panel);

    const closeBtn = panel.querySelector('.wcag-close');
    const contrastBtn = document.getElementById('wcag-contrast-btn');
    const textBtn = document.getElementById('wcag-text-btn');
    const linksBtn = document.getElementById('wcag-links-btn');
    const resetBtn = document.getElementById('wcag-reset-btn');

    toggleBtn.addEventListener('click', function() {{
        panel.classList.toggle('wcag-active');
    }});

    closeBtn.addEventListener('click', function() {{
        panel.classList.remove('wcag-active');
    }});

    // Toggle Contrast
    contrastBtn.addEventListener('click', function() {{
        document.body.classList.toggle('wcag-high-contrast');
        this.classList.toggle('active');
        localStorage.setItem('wcag-contrast', document.body.classList.contains('wcag-high-contrast'));
    }});

    // Toggle Text Size
    textBtn.addEventListener('click', function() {{
        document.body.classList.toggle('wcag-large-text');
        this.classList.toggle('active');
        localStorage.setItem('wcag-text', document.body.classList.contains('wcag-large-text'));
    }});

    // Toggle Links
    linksBtn.addEventListener('click', function() {{
        document.body.classList.toggle('wcag-highlight-links');
        this.classList.toggle('active');
        localStorage.setItem('wcag-links', document.body.classList.contains('wcag-highlight-links'));
    }});

    // Reset
    resetBtn.addEventListener('click', function() {{
        document.body.classList.remove('wcag-high-contrast', 'wcag-large-text', 'wcag-highlight-links');
        contrastBtn.classList.remove('active');
        textBtn.classList.remove('active');
        linksBtn.classList.remove('active');
        localStorage.clear();
    }});

    // Load saved settings
    if (localStorage.getItem('wcag-contrast') === 'true') {{
        document.body.classList.add('wcag-high-contrast');
        contrastBtn.classList.add('active');
    }}
    if (localStorage.getItem('wcag-text') === 'true') {{
        document.body.classList.add('wcag-large-text');
        textBtn.classList.add('active');
    }}
    if (localStorage.getItem('wcag-links') === 'true') {{
        document.body.classList.add('wcag-highlight-links');
        linksBtn.classList.add('active');
    }}
}});
"""

with open(TARGET_FILE, 'w', encoding='utf-8') as f:
    f.write(new_js)

print("WCAG widget JS updated successfully.")
