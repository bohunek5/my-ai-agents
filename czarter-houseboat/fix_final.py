import re

files = [
    'src/data/kisajno-data.ts',
    'src/data/mikolajki-data.ts',
    'src/data/fuleda-data.ts',
    'src/data/cottages-data.ts',
    'src/data/pokoje-fuleda-data.ts'
]

for fpath in files:
    with open(fpath, 'r', encoding='utf-8') as f:
        content = f.read()
        
    # We want to replace ANY `description: ... ,` where ... is wrapped in ' or " or ` but broken
    # Since we know the fields after description:
    # kisajno, mikolajki -> amenities: [
    # fuleda (both), pokoje-fuleda, cottages -> gallery: {
    
    # A safer way is to find "description: " and the next field like "amenities:" or "gallery:"
    
    import re
    # Fix Kisajno
    if 'kisajno' in fpath or 'mikolajki' in fpath:
        content = re.sub(r'(description:\s*[`\'"]).*?(\",\n\s*amenities:)', r'\1' + r'OFERTA_DESC\2', content, flags=re.DOTALL)
        # Wait, the content is already broken, I'll just manually fix it
        pass

