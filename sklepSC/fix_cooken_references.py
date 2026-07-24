import os

base_dir = '/Users/karolbohdanowicz/my-ai-agents/scratch/cooken-offline'

replacements = [
    # (file_path, old_str, new_str)
    ('product.html', '<title>Cooken - Produkt</title>', '<title>Prescot LED - Produkt</title>'),
    ('product.html', '/* Cooken Clean Product Layout Override */', '/* Prescot LED Clean Product Layout Override */'),
    ('product.html', '<div class="product-brand" id="pCategory">COOKEN LINE</div>', '<div class="product-brand" id="pCategory">PRESCOT LED</div>'),
    ('package.json', '"name": "cooken-offline"', '"name": "prescot-store"'),
    ('package-lock.json', '"name": "cooken-offline"', '"name": "prescot-store"'),
    ('cart.html', "'cooken_cart'", "'prescot_cart'"),
    ('checkout.html', "'cooken_cart'", "'prescot_cart'"),
    ('account.html', "'cooken_logged_in'", "'prescot_logged_in'"),
]

for rel_path, old_s, new_s in replacements:
    full_p = os.path.join(base_dir, rel_path)
    if os.path.exists(full_p):
        with open(full_p, 'r', encoding='utf-8') as f:
            content = f.read()
        if old_s in content:
            new_content = content.replace(old_s, new_s)
            with open(full_p, 'w', encoding='utf-8') as f:
                f.write(new_content)
            print(f"Updated {rel_path}: replaced '{old_s[:30]}...' with '{new_s[:30]}...'")

# Fix js/shared-popups.js
js_path = os.path.join(base_dir, 'js/shared-popups.js')
if os.path.exists(js_path):
    with open(js_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    js_replacements = [
        ('cooken_cart', 'prescot_cart'),
        ('cooken_wishlist', 'prescot_wishlist'),
        ('cooken_logged_in', 'prescot_logged_in'),
        ('cooken_news_subscribed', 'prescot_news_subscribed'),
        ("window.location.pathname === '/cooken-offline/'", "window.location.pathname.includes('/prescot')"),
        ("window.location.pathname === '/cooken-offline/index.html'", "window.location.pathname.includes('index.html')"),
    ]
    for old_k, new_k in js_replacements:
        content = content.replace(old_k, new_k)
        
    with open(js_path, 'w', encoding='utf-8') as f:
        f.write(content)
    print("Updated js/shared-popups.js: replaced all cooken_* keys and path checks.")
