file_path = 'src/app/(mobile)/mobile/page.tsx'
with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Add id to poznaj-hero
content = content.replace('<div className="poznaj-hero" style={{ background: \'linear-gradient(135deg, var(--c-white) 0%, #eef2f6 100%)\', padding: \'3rem 1rem\'', '<div id="technologie" className="poznaj-hero" style={{ background: \'linear-gradient(135deg, var(--c-white) 0%, #eef2f6 100%)\', padding: \'3rem 1rem\'')

old_arrow = """                  {/* Scroll down indicator arrow */}
                  <div style={{ marginTop: '30px', display: 'flex', justifyContent: 'center' }}>"""
new_arrow = """                  {/* Scroll down indicator arrow */}
                  <div style={{ marginTop: '30px', display: 'flex', justifyContent: 'center', cursor: 'pointer' }} onClick={() => document.getElementById('technologie')?.scrollIntoView({ behavior: 'smooth' })}>"""
content = content.replace(old_arrow, new_arrow)

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)

