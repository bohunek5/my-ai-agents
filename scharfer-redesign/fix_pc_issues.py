import re

# --- Fix index.html ---
html_path = '/Users/karolbohdanowicz/my-ai-agents/scharfer-redesign/index.html'
with open(html_path, 'r', encoding='utf-8') as f:
    html = f.read()

# Remove distributor-badge in header
distributor_badge_pattern = r'<div class="distributor-badge" style="[^"]+">\s*<span[^>]*>Oficjalny dystrybutor</span>\s*<img[^>]*>\s*</div>'
html = re.sub(distributor_badge_pattern, '', html)

with open(html_path, 'w', encoding='utf-8') as f:
    f.write(html)

# --- Fix style.css ---
css_path = '/Users/karolbohdanowicz/my-ai-agents/scharfer-redesign/style.css'
with open(css_path, 'r', encoding='utf-8') as f:
    css = f.read()

# Fix grid to 5 columns
if '.products-grid {' in css:
    css = re.sub(
        r'\.products-grid\s*\{[^}]*\}',
        '''.products-grid {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 1.5rem;
}''',
        css
    )

# Fix product card styles
if '.product-card {' in css:
    css = re.sub(
        r'\.product-card\s*\{[^}]*\}',
        '''.product-card {
    background: var(--c-white);
    border: none;
    border-radius: 12px;
    padding: 1.5rem 1rem 1rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
    overflow: visible;
    box-shadow: 0 4px 20px rgba(0,0,0,0.06);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    z-index: 1;
}''',
        css
    )

# Fix modal styling (make it look cleaner)
if '.modal-content {' in css:
    css = re.sub(
        r'\.modal-content\s*\{[^}]*\}',
        '''.modal-content {
    background: var(--c-white);
    border-radius: 16px;
    padding: 2.5rem;
    box-shadow: 0 20px 50px rgba(0,0,0,0.15);
}''',
        css
    )

with open(css_path, 'w', encoding='utf-8') as f:
    f.write(css)

# --- Fix main.js ---
js_path = '/Users/karolbohdanowicz/my-ai-agents/scharfer-redesign/main.js'
with open(js_path, 'r', encoding='utf-8') as f:
    js = f.read()

# Fix the zooming overflowing by updating z-index on the parent card
zoom_replace_old = '''onclick="this.style.transform = this.style.transform === 'scale(2.5)' ? 'scale(1)' : 'scale(2.5)';">'''
# Account for maybe it was 3.5 already? Let's check both
js = js.replace(
    '''onclick="this.style.transform = this.style.transform === 'scale(3.5)' ? 'scale(1)' : 'scale(3.5)';">''',
    '''onclick="let c = this.closest('.product-card'); if(this.style.transform === 'scale(3.5)') { this.style.transform = 'scale(1)'; if(c) c.style.zIndex = '1'; } else { this.style.transform = 'scale(3.5)'; if(c) c.style.zIndex = '100'; }">'''
)
js = js.replace(
    '''onclick="this.style.transform = this.style.transform === 'scale(2.5)' ? 'scale(1)' : 'scale(2.5)';">''',
    '''onclick="let c = this.closest('.product-card'); if(this.style.transform === 'scale(3.5)') { this.style.transform = 'scale(1)'; if(c) c.style.zIndex = '1'; } else { this.style.transform = 'scale(3.5)'; if(c) c.style.zIndex = '100'; }">'''
)

# Improve modal look: remove borders on the table inside modal, make headers sleeker
js = js.replace('border-bottom: 1px solid #f5f5f5;', 'border-bottom: 1px solid transparent; padding: 0.7rem 0;')
js = js.replace('border-bottom: 1px solid #eee;', 'border-bottom: none; opacity: 0.7; font-weight: 700;')

with open(js_path, 'w', encoding='utf-8') as f:
    f.write(js)
