import re

css_path = '/Users/karolbohdanowicz/my-ai-agents/scharfer-redesign/style.css'
with open(css_path, 'r', encoding='utf-8') as f:
    css = f.read()

# Make the product card elevate its z-index on hover so the zoomed image overlays siblings
if '.product-card:hover {' in css:
    css = re.sub(
        r'\.product-card:hover\s*\{[^}]*\}',
        '''.product-card:hover {
    box-shadow: 0 20px 50px rgba(0,0,0,0.12);
    transform: translateY(-8px);
    z-index: 10;
}''',
        css
    )

# Make the image zoom more pronounced and definitely pop out
if '.product-card:hover .product-image img {' in css:
    css = re.sub(
        r'\.product-card:hover \.product-image img\s*\{[^}]*\}',
        '''.product-card:hover .product-image img {
    transform: scale(1.15);
}''',
        css
    )

with open(css_path, 'w', encoding='utf-8') as f:
    f.write(css)
