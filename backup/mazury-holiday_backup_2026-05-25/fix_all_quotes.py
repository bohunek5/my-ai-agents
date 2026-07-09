import glob

for fpath in glob.glob('src/data/*-data.ts'):
    with open(fpath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    lines = content.split('\n')
    for i in range(len(lines)):
        if "description: '" in lines[i]:
            lines[i] = lines[i].replace("description: '", "description: `")
        elif 'description: "' in lines[i]:
            lines[i] = lines[i].replace('description: "', "description: `")
        
        if "'," in lines[i] and 'gallery:' in lines[i+1] if i+1 < len(lines) else False:
            lines[i] = lines[i].replace("',", "`,\n")
        if '",' in lines[i] and 'gallery:' in lines[i+1] if i+1 < len(lines) else False:
            lines[i] = lines[i].replace('",', "`,\n")
            
    # For multiline strings, the closing quote might be on the line just before gallery: {
    # Let's do a more robust approach
    content = '\n'.join(lines)
    
    # Just to be sure the closing quote before gallery is changed to backtick
    content = content.replace("',\n        gallery:", "`,\n        gallery:")
    content = content.replace('",\n        gallery:', "`,\n        gallery:")
    content = content.replace("',\n    gallery:", "`,\n    gallery:")
    content = content.replace('",\n    gallery:', "`,\n    gallery:")

    with open(fpath, 'w', encoding='utf-8') as f:
        f.write(content)

