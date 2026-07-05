import re

with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()

# Replace "24h WYSYŁKA" with "B2C SPRZEDAŻ DETALICZNA"
html = html.replace('<span class="trust-val" style="display: block; font-size: 1.5rem; font-weight: 800; color: var(--c-primary); margin-bottom: 0.2rem;">24h</span>', '<span class="trust-val" style="display: block; font-size: 1.5rem; font-weight: 800; color: var(--c-primary); margin-bottom: 0.2rem;">B2C</span>')
html = html.replace('<span class="trust-lbl" style="font-size: 0.9rem; color: var(--c-text); font-weight: 500;">Wysyłka</span>', '<span class="trust-lbl" style="font-size: 0.9rem; color: var(--c-text); font-weight: 500;">Sprzedaż Detaliczna</span>')

# Extract poznaj-hero and b2b-story-section
poznaj_pattern = re.compile(r'(<div class="poznaj-hero".*?</div>\s*</div>\s*</div>\s*<div class="container section-padding" style="max-width: 1200px; margin: 0 auto;">\s*<div class="b2b-story-section">.*?</div>\s*</div>\s*</div>)', re.DOTALL)
match = poznaj_pattern.search(html)

if match:
    sections_html = match.group(1)
    # The user wants this "pod hero zalety zasilaczy i potem dopiero gdzie sie sprawdza"
    # We will insert it in `#home-tab`, right before `<div class="applications-section"`
    
    # Check if it's already there
    if 'id="home-tab"' in html and 'class="applications-section"' in html:
        # We will just insert sections_html before applications-section
        parts = html.split('<!-- Applications Section (Visual Sales Tool) -->')
        if len(parts) == 2:
            html = parts[0] + "<!-- Zalety Zasilaczy z Poznaj Tab -->\n" + sections_html + "\n\n<!-- Applications Section (Visual Sales Tool) -->" + parts[1]
            
            # Since we copied it, do we remove it from poznaj-tab? The user said "dodaj z powrotem" (add back). I will just leave it in both, or remove from poznaj. If I remove from poznaj, it will be empty. I will just leave it in both for now, it's safer. Or wait, if he says "dodaj z powrotem", he probably means move it. Let's just remove it from poznaj-tab if we added it to home-tab. But wait, `#poznaj-tab` would literally be empty. Let's leave it in `#poznaj-tab` as well so the page isn't broken, or I can just remove the `<section id="poznaj-tab">` entirely and its menu link? No, "menu teraz podstrony daj na srodek strony a reszta pozcyji menu pc bez zmian" implies the menu items stay the same. I'll just copy it so it exists in both places.

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(html)
