import glob

for fpath in glob.glob('src/data/*-data.ts'):
    with open(fpath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # We want to replace description: ' with description: `
    # and ', \n gallery: with `, \n gallery:
    
    # A simpler way: Find `description:` and then the first `'` or `"`. Replace with \`
    # Then find `gallery: {` and walk back to the last `'` or `"` and replace with \`
    # Let's just use a more robust regex
    import re
    
    pattern = re.compile(r'description:\s*([\'"])(.*?)\1,\s*gallery:', re.DOTALL)
    
    def repl(m):
        desc = m.group(2).replace('`', '')
        return f'description: `{desc}`,\n        gallery:'
        
    new_content = pattern.sub(repl, content)
    
    if new_content != content:
        with open(fpath, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print(f'Fixed quotes in {fpath}')
