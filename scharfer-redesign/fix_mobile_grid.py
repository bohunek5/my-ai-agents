import re

css_path = '/Users/karolbohdanowicz/my-ai-agents/scharfer-redesign/style.css'
with open(css_path, 'r', encoding='utf-8') as f:
    css = f.read()

# Add responsive grid for products if missing
responsive_css = '''
@media (max-width: 1200px) {
    .products-grid { grid-template-columns: repeat(3, 1fr); gap: 1.5rem; }
}
@media (max-width: 900px) {
    .products-grid { grid-template-columns: repeat(2, 1fr); gap: 1.5rem; }
}
@media (max-width: 600px) {
    .products-grid { grid-template-columns: 1fr; gap: 1rem; }
}
'''
if '@media (max-width: 1200px)' not in css:
    css += responsive_css

with open(css_path, 'w', encoding='utf-8') as f:
    f.write(css)
