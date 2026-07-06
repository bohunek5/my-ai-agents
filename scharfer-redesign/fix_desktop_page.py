file_path = 'src/app/(desktop)/page.tsx'
with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Add id to poznaj-hero
content = content.replace('<div className="poznaj-hero"', '<div id="technologie" className="poznaj-hero"')

# The arrow should be added after the hero-trust div
# Let's find the end of the hero-trust div.
trust_str = """
              <div className="trust-item" style={{ display: 'flex', flexDirection: 'column' }}>
                <span className="trust-val" style={{ color: 'var(--c-red)', fontSize: '2rem', fontWeight: 900, lineHeight: 1 }}>{t('trust100')}</span>
                <span className="trust-lbl" style={{ color: '#1e293b', fontSize: '0.8rem', fontWeight: 800, textTransform: 'uppercase', marginTop: '8px', letterSpacing: '1px' }}>{t('trustLoadFull')}</span>
              </div>
            </div>"""

arrow_str = """
              <div className="trust-item" style={{ display: 'flex', flexDirection: 'column' }}>
                <span className="trust-val" style={{ color: 'var(--c-red)', fontSize: '2rem', fontWeight: 900, lineHeight: 1 }}>{t('trust100')}</span>
                <span className="trust-lbl" style={{ color: '#1e293b', fontSize: '0.8rem', fontWeight: 800, textTransform: 'uppercase', marginTop: '8px', letterSpacing: '1px' }}>{t('trustLoadFull')}</span>
              </div>
            </div>

            {/* Scroll down indicator arrow for PC */}
            <div style={{ marginTop: '40px', display: 'flex', justifyContent: 'center', cursor: 'pointer' }} onClick={() => document.getElementById('technologie')?.scrollIntoView({ behavior: 'smooth' })}>
              <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="#e60000" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.2))', animation: 'bounce 2s infinite' }}>
                <path d="M12 5v14M19 12l-7 7-7-7" />
              </svg>
            </div>
"""

content = content.replace(trust_str, arrow_str)

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)

