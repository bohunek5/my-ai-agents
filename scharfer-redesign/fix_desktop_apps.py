import re

with open('src/app/(desktop)/page.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

# Replace titles and descriptions for apps 1 to 12
for i in range(1, 13):
    # Regex to find the h3 and p inside app-content
    # The title might be hardcoded, we want to replace the text inside <h3...>...</h3> with {t('app{i}Title')}
    h3_pattern = re.compile(r'(<h3[^>]*>)(.*?)(</h3>)', re.DOTALL)
    p_pattern = re.compile(r'(<p[^>]*>)(.*?)(</p>)', re.DOTALL)
    
    # But wait, there are other h3 and p in the file.
    # Let's match the block for each app.
    # We can match ` {/* App X: ... */}` to find the block
    app_pattern = re.compile(rf'(<!-- App {i}:|{{/\* App {i}:).*?(</div>\s*</div>)', re.DOTALL)
    
    def replacer(match):
        block = match.group(0)
        block = h3_pattern.sub(rf'\1{{t(\'app{i}Title\')}}\3', block, count=1)
        block = p_pattern.sub(rf'\1{{t(\'app{i}Desc\')}}\3', block, count=1)
        return block
        
    content = app_pattern.sub(replacer, content)

with open('src/app/(desktop)/page.tsx', 'w', encoding='utf-8') as f:
    f.write(content)

print("Done replacing app1-12 in desktop page.tsx")
