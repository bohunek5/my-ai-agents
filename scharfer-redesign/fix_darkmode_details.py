import os
import re

def fix_header():
    path = "src/components/Header.tsx"
    with open(path, 'r') as f:
        content = f.read()

    # Retail button background and border
    content = content.replace("border: '1px solid #eaeaea'", "border: '1px solid var(--c-border)'")
    content = content.replace("background: '#fafafa'", "background: 'var(--card-bg)'")
    
    # Distributor badge padding left (move it a bit more to the left on mobile? user said "ciutke w lewo")
    # By reducing paddingLeft, we move it left relative to its container, or we add margin-right.
    content = content.replace("paddingLeft: '15px'", "paddingLeft: '10px'")
    content = content.replace("paddingLeft: '20px'", "paddingLeft: '12px'")

    with open(path, 'w') as f:
        f.write(content)

def fix_theme_toggle():
    path = "src/components/ThemeToggle.tsx"
    with open(path, 'r') as f:
        content = f.read()
    
    # Border color
    content = content.replace("border: 1px solid rgba(0,0,0,0.1);", "border: 1px solid var(--c-border);")
    
    with open(path, 'w') as f:
        f.write(content)

def fix_wcag_menu():
    path = "src/components/WcagMenu.tsx"
    if os.path.exists(path):
        with open(path, 'r') as f:
            content = f.read()
        content = content.replace("border: 1px solid rgba(0,0,0,0.1);", "border: 1px solid var(--c-border);")
        with open(path, 'w') as f:
            f.write(content)

fix_header()
fix_theme_toggle()
fix_wcag_menu()
print("Done fixing dark mode details")
