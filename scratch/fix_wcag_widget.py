import re

filepath = "/Users/karolbohdanowicz/Downloads/kopia mazuryaktywnie/js/wcag-widget.js"

with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Fix branding texts
content = content.replace("Strona przyjazna wszystkim ♿", "Strona przyjazna wszystkim")
content = content.replace("ally by anty gravity", "Strona przyjazna wszystkim")
content = content.replace("A11y by Antigravity", "Strona przyjazna wszystkim")

# 2. Fix CSS to ensure it's centered and doesn't bleed out
css_to_replace = """        @media (max-width: 576px) {
            .ally-panel {
                width: 95%;
                max-width: 100vw;
                max-height: 85vh;
                border-radius: 16px;
                margin: 0;
                box-sizing: border-box;
            }"""

new_css = """        @media (max-width: 576px) {
            .ally-panel {
                width: 95%;
                max-width: 95vw;
                max-height: 85vh;
                border-radius: 16px;
                margin: 0;
                box-sizing: border-box;
                top: 50% !important;
                left: 50% !important;
                transform: translate(-50%, -50%) !important;
            }
            .ally-body {
                overflow-y: auto !important;
                overflow-x: hidden !important;
                max-height: calc(85vh - 60px) !important;
            }
            .ally-struct-item {
                white-space: normal !important;
                word-wrap: break-word !important;
            }
            .ally-segment-btn {
                white-space: normal !important;
                padding: 10px !important;
                height: auto !important;
                min-height: 40px !important;
            }"""

if css_to_replace in content:
    content = content.replace(css_to_replace, new_css)
else:
    print("Could not find the exact CSS to replace, trying regex...")
    content = re.sub(r'@media \(max-width: 576px\) \{\s*\.ally-panel \{.*?\n\s*\}', new_css, content, flags=re.DOTALL)

with open(filepath, 'w', encoding='utf-8') as f:
    f.write(content)

print("Modified wcag-widget.js successfully!")
