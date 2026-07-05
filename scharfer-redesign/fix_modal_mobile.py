import re

css_path = '/Users/karolbohdanowicz/my-ai-agents/scharfer-redesign/style.css'
with open(css_path, 'r', encoding='utf-8') as f:
    css = f.read()

# Fix mobile modal padding
if '@media (max-width: 768px) {\n    .modal-content {' in css:
    css = css.replace(
'''@media (max-width: 768px) {
    .modal-content {
    background: var(--c-white);
    border-radius: 16px;
    padding: 2.5rem;
    box-shadow: 0 20px 50px rgba(0,0,0,0.15);
}''',
'''@media (max-width: 768px) {
    .modal-content {
        padding: 1.5rem;
        border-radius: 12px;
    }'''
    )

with open(css_path, 'w', encoding='utf-8') as f:
    f.write(css)
