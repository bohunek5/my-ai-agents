import os, re

files = [
    "src/app/(mobile)/mobile/page.tsx",
    "src/app/(desktop)/poznaj/page.tsx",
    "src/app/(desktop)/regulamin/page.tsx",
    "src/app/(desktop)/kontakt/page.tsx",
    "src/app/(desktop)/rodo/page.tsx",
    "src/app/(desktop)/oferta/page.tsx",
    "src/app/(desktop)/page.tsx",
    "src/components/Footer.tsx",
    "src/components/Header.tsx",
    "src/components/InteractiveDiagram.tsx"
]

for f in files:
    if os.path.exists(f):
        with open(f, "r", encoding="utf-8") as file:
            content = file.read()
        
        # Replace src="/ with src="/scharfer/
        # but avoid replacing src="/scharfer/
        content = re.sub(r'\bsrc="/(?!scharfer/)', 'src="/scharfer/', content)
        content = re.sub(r'\bsrc="wiata_jezioro.png"', 'src="/scharfer/wiata_jezioro.png"', content)
        
        with open(f, "w", encoding="utf-8") as file:
            file.write(content)
