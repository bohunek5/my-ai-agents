import sys
import re

def resolve_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    pattern = re.compile(r'<<<<<<< HEAD\n.*?\n=======\n(.*?)>>>>>>> [^\n]*\n?', re.DOTALL)
    
    new_content = pattern.sub(r'\1', content)
    
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(new_content)

files = [
    'src/app/apartamenty/kisajno/page.tsx',
    'src/app/apartamenty/stranda/[id]/ApartmentDetailClient.tsx',
    'src/app/czarter/page.tsx',
    'src/app/domki/page.tsx',
    'src/app/kontakt/page.tsx',
    'src/components/CharterSection.tsx',
    'src/components/Footer.tsx',
    'src/components/Hero.tsx',
    'src/lib/translations.ts',
    'src/utils/aiAssistantEngine.ts'
]

for file in files:
    resolve_file(file)
