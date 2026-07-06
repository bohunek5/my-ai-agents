with open('src/components/Header.tsx', 'r') as f:
    c = f.read()

c = c.replace(
"""          <div className="distributor-badge" style={{ fontSize: '12px', fontWeight: 600, color: 'var(--c-text)', textTransform: 'uppercase', borderLeft: '2px solid var(--c-border)', paddingLeft: '8px' }}>
            <span style={{ display: 'block', fontSize: '9px', color: 'var(--c-text)', opacity: 0.7, marginBottom: '2px' }}>{t('officialDistributor')}</span>
            <a href="https://prescot.pl" target="_blank" rel="noopener noreferrer">
              <img src="/PRESCOT_logo.png" alt="PRESCOT LED" style={{ height: '18px', marginTop: '2px' }} />
            </a>
          </div>""",
"""          <div className="distributor-badge" style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', fontWeight: 600, color: 'var(--c-text)', textTransform: 'uppercase', borderLeft: '2px solid var(--c-border)', paddingLeft: '8px' }}>
            <span style={{ fontSize: '9px', color: 'var(--c-text)', opacity: 0.7 }}>{t('officialDistributor')}</span>
            <a href="https://prescot.pl" target="_blank" rel="noopener noreferrer" style={{ display: 'flex' }}>
              <img src="/PRESCOT_logo.png" alt="PRESCOT LED" style={{ height: '18px' }} />
            </a>
          </div>"""
)

with open('src/components/Header.tsx', 'w') as f:
    f.write(c)

with open('src/app/(mobile)/mobile/page.tsx', 'r') as f:
    c = f.read()

c = c.replace(
"""        <div className="distributor-badge" style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', marginRight: '14px' }}>
          <span style={{ fontSize: '0.4rem', textTransform: 'uppercase', letterSpacing: '0.5px', color: '#888', marginBottom: '2px', fontWeight: 600 }}>Oficjalny dystrybutor:</span>
          <a href="https://prescot.pl" target="_blank" rel="noopener noreferrer">
            <img src="/PRESCOT_logo.png" alt="PRESCOT LED" style={{ height: '9px', marginTop: '2px' }} className="prescot-logo-distributor" />
          </a>
        </div>""",
"""        <div className="distributor-badge" style={{ display: 'flex', alignItems: 'center', gap: '6px', marginRight: '14px' }}>
          <span style={{ fontSize: '0.4rem', textTransform: 'uppercase', letterSpacing: '0.5px', color: '#888', fontWeight: 600 }}>Oficjalny dystrybutor:</span>
          <a href="https://prescot.pl" target="_blank" rel="noopener noreferrer" style={{ display: 'flex' }}>
            <img src="/PRESCOT_logo.png" alt="PRESCOT LED" style={{ height: '9px' }} className="prescot-logo-distributor" />
          </a>
        </div>"""
)

with open('src/app/(mobile)/mobile/page.tsx', 'w') as f:
    f.write(c)

