import glob
import re

for fpath in glob.glob('src/data/*-data.ts'):
    with open(fpath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Match description wrapped in single or double quotes
    # The dotall will match everything up to the first occurrence of ", gallery:" or similar
    pattern = re.compile(r'(description:\s*)([\'"])(.*?)([\'"],\s*gallery:)', re.DOTALL)
    
    def repl(m):
        desc = m.group(3).replace('`', '') # remove backticks just in case
        return m.group(1) + '`' + desc + '`,\n        gallery:'
        
    new_content = pattern.sub(repl, content)
    
    if new_content != content:
        with open(fpath, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print(f'Fixed quotes in {fpath}')
