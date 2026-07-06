'use client';
import { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { productsData, Product } from '@/data/scharferData';

export default function OfertaPage() {
  const { t } = useLanguage();
  const [filter, setFilter] = useState<'all' | '12V' | '24V'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeProduct, setActiveProduct] = useState<Product | null>(null);

  // Filter products
  const filteredProducts = productsData.filter(p => {
    const matchesFilter = filter === 'all' || p.specs.voltage === filter;
    const matchesSearch = searchQuery === '' || 
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      p.index.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.ean.includes(searchQuery);
    return matchesFilter && matchesSearch;
  });

  const products12v = filteredProducts.filter(p => p.specs.voltage === '12V');
  const products24v = filteredProducts.filter(p => p.specs.voltage === '24V');

  return (
    <div className="view-section active">
      {/* Structured SEO Data (JSON-LD Product Schema) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": productsData.map(p => ({
              "@type": "Product",
              "name": p.name,
              "image": `https://scharfer.com.pl/${p.img}`,
              "description": `Profesjonalny wodoodporny zasilacz LED Scharfer ${p.name} o napięciu wyjściowym ${p.specs.voltage} i klasie szczelności IP67. Posiada certyfikaty CE i RoHS oraz 7 lat gwarancji.`,
              "sku": p.index,
              "gtin13": p.ean,
              "brand": {
                "@type": "Brand",
                "name": "Scharfer"
              },
              "offers": {
                "@type": "AggregateOffer",
                "priceCurrency": "PLN",
                "lowPrice": "99.00",
                "highPrice": "499.00",
                "offerCount": "1",
                "seller": {
                  "@type": "Organization",
                  "name": "Prescot Sp. z o.o.",
                  "url": "https://scharfer.com.pl"
                }
              }
            }))
          })
        }}
      />
      {/* Unified Page Hero */}
      <div className="page-hero">
        <div className="page-hero-bg">
          <img src="/assets/scharfer_supplies_hero.png" alt={t('catalogTitle')} />
        </div>
        <div className="page-hero-overlay" />
        <div className="page-hero-content">
          <h1 className="page-hero-title">{t('catalogTitle')}</h1>
          <p className="page-hero-subtitle">
            {t('catalogSubtitle')}
          </p>
        </div>
      </div>

      {/* Expanded container to match header (1500px / var(--max-width)) */}
      <div className="container section-padding" style={{ maxWidth: 'var(--max-width)', margin: '0 auto', padding: '4rem var(--spacing-lg)' }}>
        {/* Filters */}
        <div className="catalog-filters" style={{ display: 'flex', flexWrap: 'wrap', gap: '1.5rem', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem' }}>
          <input 
            type="text" 
            className="search-input" 
            placeholder={t('searchPlaceholder')} 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{ padding: '0.8rem 1.2rem', border: '1px solid var(--c-border)', borderRadius: '8px', minWidth: '300px', fontSize: '0.95rem' }}
          />
          <div className="filter-group" style={{ display: 'flex', gap: '0.5rem' }}>
            <button className={`filter-btn ${filter === 'all' ? 'active' : ''}`} onClick={() => setFilter('all')}>{t('allProducts')}</button>
            <button className={`filter-btn ${filter === '12V' ? 'active' : ''}`} onClick={() => setFilter('12V')}>{t('only12V')}</button>
            <button className={`filter-btn ${filter === '24V' ? 'active' : ''}`} onClick={() => setFilter('24V')}>{t('only24V')}</button>
          </div>
        </div>

        {/* Catalog */}
        <div className="catalog-wrapper" style={{ padding: 0 }}>
          {products12v.length > 0 && (
            <div className="voltage-section" style={{ marginBottom: '4rem' }}>
              <h2 className="voltage-heading" style={{ fontSize: '1.8rem', color: 'var(--c-heading)', borderBottom: '2px solid var(--c-red)', paddingBottom: '0.5rem', marginBottom: '2rem', fontWeight: 800 }}>{t('heading12V')}</h2>
              <div className="products-grid">
                {products12v.map(p => (
                  <ProductCard key={p.index} product={p} onOpenModal={setActiveProduct} />
                ))}
              </div>
            </div>
          )}

          {products24v.length > 0 && (
            <div className="voltage-section" style={{ marginBottom: '2rem' }}>
              <h2 className="voltage-heading" style={{ fontSize: '1.8rem', color: 'var(--c-heading)', borderBottom: '2px solid var(--c-red)', paddingBottom: '0.5rem', marginBottom: '2rem', fontWeight: 800 }}>{t('heading24V')}</h2>
              <div className="products-grid">
                {products24v.map(p => (
                  <ProductCard key={p.index} product={p} onOpenModal={setActiveProduct} />
                ))}
              </div>
            </div>
          )}

          {filteredProducts.length === 0 && (
            <div style={{ textAlign: 'center', padding: '4rem 0', color: '#888' }}>
              <h3>{t('noResults')}</h3>
            </div>
          )}
        </div>
      </div>

      {/* Product Detail Modal */}
      {activeProduct && (
        <ProductModal product={activeProduct} onClose={() => setActiveProduct(null)} />
      )}
    </div>
  );
}

function ProductCard({ product, onOpenModal }: { product: Product; onOpenModal: (p: Product) => void; }) {
  const { t } = useLanguage();
  const powerMatch = product.name.match(/\d+W/);
  const powerText = powerMatch ? powerMatch[0] : '';

  const renderSymbolRed = (name: string) => {
    const symbolMatch = name.match(/SCH-[\d\-A]+/);
    const symbol = symbolMatch ? symbolMatch[0] : name.split(' ')[0];
    return <span style={{ color: 'var(--c-red)' }}>{symbol}</span>;
  };

  return (
    <div className="product-card" style={{ display: 'flex', flexDirection: 'column', height: '100%', padding: '1.2rem', position: 'relative', alignItems: 'stretch' }}>
      {/* Sleek horizontal badge row at the top (forced single line with warranty at the end) */}
      <div style={{ display: 'flex', gap: '0.3rem', flexWrap: 'nowrap', marginBottom: '1rem', zIndex: 5 }}>
        <span style={{ backgroundColor: 'var(--c-red)', color: 'white', padding: '0.15rem 0.4rem', fontSize: '0.65rem', fontWeight: 800, borderRadius: '4px', whiteSpace: 'nowrap' }}>{product.specs.voltage}</span>
        <span style={{ backgroundColor: '#1e293b', color: 'white', padding: '0.15rem 0.4rem', fontSize: '0.65rem', fontWeight: 800, borderRadius: '4px', whiteSpace: 'nowrap' }}>IP67</span>
        <span style={{ backgroundColor: '#f1f5f9', border: '1px solid #e2e8f0', color: '#475569', padding: '0.15rem 0.4rem', fontSize: '0.65rem', fontWeight: 800, borderRadius: '4px', whiteSpace: 'nowrap' }}>SELV</span>
        <span style={{ backgroundColor: '#f1f5f9', border: '1px solid #e2e8f0', color: '#475569', padding: '0.15rem 0.4rem', fontSize: '0.65rem', fontWeight: 800, borderRadius: '4px', whiteSpace: 'nowrap' }}>CE</span>
        <span style={{ backgroundColor: '#f1f5f9', border: '1px solid #e2e8f0', color: '#475569', padding: '0.15rem 0.4rem', fontSize: '0.65rem', fontWeight: 800, borderRadius: '4px', whiteSpace: 'nowrap' }}>RoHS</span>
        <span style={{ backgroundColor: 'white', border: '1px solid var(--c-red)', color: 'var(--c-red)', padding: '0.15rem 0.4rem', fontSize: '0.65rem', fontWeight: 800, borderRadius: '4px', whiteSpace: 'nowrap' }}>{t('specWarrantyValShort')}</span>
      </div>

      {/* Spacious centered image container with hover transition */}
      <div className="product-image" onClick={() => onOpenModal(product)} style={{ cursor: 'zoom-in', textAlign: 'center', padding: '0.5rem 0 1.2rem 0', display: 'flex', justifyContent: 'center', alignItems: 'center', height: '140px' }} title={t('techDetails')}>
        <img src={product.img} alt={product.name} style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain', transition: 'transform 0.3s ease' }} className="card-zasilacz-img" />
      </div>
      {/* Large Product Name */}
      <h3 className="product-name" style={{ fontSize: '1.2rem', fontWeight: 800, margin: '0 0 1rem 0', color: 'var(--c-heading)', textAlign: 'center' }}>
        {renderSymbolRed(product.name)}
      </h3>

      {/* Modern technology spec card ("ladnie w bloczku") - stretched to full card width */}
      <div style={{ background: '#f8fafc', border: '1px solid #f1f5f9', borderRadius: '10px', padding: '0.8rem 1rem', marginBottom: '1.2rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', borderBottom: '1px solid #e2e8f0', paddingBottom: '0.4rem', gap: '2px' }}>
          <span style={{ color: '#64748b', fontSize: '0.68rem', fontWeight: 800, letterSpacing: '0.05em', textTransform: 'uppercase' }}>{t('specPower')}</span>
          <span style={{ fontWeight: 800, color: 'var(--c-heading)', fontSize: '0.85rem' }}>{product.name.split(' ')[1] || 'MOC'}</span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', borderBottom: '1px solid #e2e8f0', paddingBottom: '0.4rem', gap: '2px' }}>
          <span style={{ color: '#64748b', fontSize: '0.68rem', fontWeight: 800, letterSpacing: '0.05em', textTransform: 'uppercase' }}>{t('specCurrent')}</span>
          <span style={{ fontWeight: 800, color: 'var(--c-heading)', fontSize: '0.85rem' }}>{product.specs.current}</span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', borderBottom: '1px solid #e2e8f0', paddingBottom: '0.4rem', gap: '2px' }}>
          <span style={{ color: '#64748b', fontSize: '0.68rem', fontWeight: 800, letterSpacing: '0.05em', textTransform: 'uppercase' }}>{t('specEan')}</span>
          <span style={{ fontWeight: 800, color: 'var(--c-heading)', fontSize: '0.85rem' }}>{product.ean}</span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: '2px' }}>
          <span style={{ color: '#64748b', fontSize: '0.68rem', fontWeight: 800, letterSpacing: '0.05em', textTransform: 'uppercase' }}>{t('specDim')}</span>
          <span style={{ fontWeight: 800, color: 'var(--c-heading)', fontSize: '0.85rem' }}>{product.specs.dim}</span>
        </div>
      </div>

      {/* Button with clean transitions (removed overriding inline color) */}
      <button onClick={() => onOpenModal(product)} className="btn-secondary" style={{ marginTop: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', padding: '0.8rem', fontSize: '0.85rem', fontWeight: 700 }}>
        {t('techDetails')}
      </button>
    </div>
  );
}


function ProductModal({ product, onClose }: { product: Product; onClose: () => void }) {
  const { t } = useLanguage();
  const [isZoomed, setIsZoomed] = useState(false);
  
  const renderSymbolRed = (name: string) => {
    const symbolMatch = name.match(/SCH-[\d\-A]+/);
    const symbol = symbolMatch ? symbolMatch[0] : name.split(' ')[0];
    return <span style={{ color: 'var(--c-red)' }}>{symbol}</span>;
  };

  return (
    <div className="product-modal active" id="product-modal" onClick={(e) => { if ((e.target as HTMLElement).id === 'product-modal') onClose(); }} style={{ display: 'flex', position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.6)', zIndex: 10000, alignItems: 'center', justifyContent: 'center' }}>
      <div className="modal-content" style={{ maxWidth: '1000px', maxHeight: '92vh', overflowY: 'auto', background: 'white', borderRadius: '16px', padding: '3.5rem', position: 'relative', display: 'flex', gap: '3.5rem', flexWrap: 'wrap', width: '95%', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)', border: '1px solid #eee' }}>
        <span className="modal-close" onClick={onClose} style={{ position: 'absolute', top: '20px', right: '25px', fontSize: '2.5rem', cursor: 'pointer', color: '#aaa', transition: 'color 0.2s', fontWeight: 300, lineHeight: 1 }} onMouseEnter={(e) => e.currentTarget.style.color = '#111'} onMouseLeave={(e) => e.currentTarget.style.color = '#aaa'}>&times;</span>
        
        {/* Expanded image container (minWidth: 360px) */}
        <div className="modal-image-col" style={{ flex: 1.2, minWidth: '360px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: '#fafafa', borderRadius: '12px', padding: '1.5rem', overflow: 'hidden' }}>
          <img 
            src={product.img} 
            alt={product.name} 
            onClick={() => setIsZoomed(true)}
            style={{ 
              maxWidth: '100%', 
              maxHeight: '320px', 
              objectFit: 'contain', 
              cursor: 'zoom-in', 
              transition: 'transform 0.3s ease',
              position: 'relative',
              zIndex: 10
            }} 
          />
        </div>
        
        <div className="modal-info-col" style={{ flex: 1.3, minWidth: '320px', display: 'flex', flexDirection: 'column' }}>
          <h2 style={{ fontSize: '2.2rem', fontWeight: 800, marginBottom: '1.5rem', color: 'var(--c-heading)', lineHeight: 1.15, fontFamily: 'Outfit, sans-serif' }}>{renderSymbolRed(product.name)}</h2>
          <table className="modal-specs-table" style={{ width: '100%', borderCollapse: 'collapse', fontSize: '1rem', marginBottom: '2.5rem' }}>
            <tbody>
              <tr style={{ borderBottom: '1px solid #f3f4f6' }}><td style={{ padding: '0.9rem 0', color: '#6b7280', fontWeight: 500 }}>{t('specVolt')}</td><td style={{ padding: '0.9rem 0', fontWeight: 700, color: 'var(--c-heading)' }}>{product.specs.voltage} DC</td></tr>
              <tr style={{ borderBottom: '1px solid #f3f4f6' }}><td style={{ padding: '0.9rem 0', color: '#6b7280', fontWeight: 500 }}>{t('specCurrent')}</td><td style={{ padding: '0.9rem 0', fontWeight: 700, color: 'var(--c-heading)' }}>{product.specs.current}</td></tr>
              <tr style={{ borderBottom: '1px solid #f3f4f6' }}><td style={{ padding: '0.9rem 0', color: '#6b7280', fontWeight: 500 }}>{t('specPowerNom')}</td><td style={{ padding: '0.9rem 0', fontWeight: 700, color: 'var(--c-heading)' }}>{product.name.match(/\d+W/) ? product.name.match(/\d+W/)?.[0] : ''}</td></tr>
              <tr style={{ borderBottom: '1px solid #f3f4f6' }}><td style={{ padding: '0.9rem 0', color: '#6b7280', fontWeight: 500 }}>{t('specEan')}</td><td style={{ padding: '0.9rem 0', fontWeight: 700, color: 'var(--c-heading)' }}>{product.ean}</td></tr>
              <tr style={{ borderBottom: '1px solid #f3f4f6' }}><td style={{ padding: '0.9rem 0', color: '#6b7280', fontWeight: 500 }}>{t('specDimFull')}</td><td style={{ padding: '0.9rem 0', fontWeight: 700, color: 'var(--c-heading)' }}>{product.specs.dim}</td></tr>
              <tr style={{ borderBottom: '1px solid #f3f4f6' }}><td style={{ padding: '0.9rem 0', color: '#6b7280', fontWeight: 500 }}>{t('specIp')}</td><td style={{ padding: '0.9rem 0', fontWeight: 800, color: 'var(--c-red)' }}>{t('specIpVal')}</td></tr>
              <tr style={{ borderBottom: '1px solid #f3f4f6' }}><td style={{ padding: '0.9rem 0', color: '#6b7280', fontWeight: 500 }}>{t('specProtect')}</td><td style={{ padding: '0.9rem 0', fontWeight: 600, color: '#10b981', fontSize: '0.9rem' }}>{t('specProtectVal')}</td></tr>
              <tr style={{ borderBottom: '1px solid #f3f4f6' }}><td style={{ padding: '0.9rem 0', color: '#6b7280', fontWeight: 500 }}>{t('specWarranty')}</td><td style={{ padding: '0.9rem 0', fontWeight: 800, color: 'var(--c-red)' }}>{t('specWarrantyVal')}</td></tr>
            </tbody>
          </table>

          <div className="modal-actions" style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
            {/* Bright red button background for full visibility */}
            <a href={product.pdf} target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', textDecoration: 'none', padding: '1.2rem', borderRadius: '8px', background: 'var(--c-red)', backgroundColor: 'var(--c-red)', color: 'white', fontWeight: 700, fontSize: '1.05rem', boxShadow: '0 4px 12px rgba(230,0,0,0.2)' }}>
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" style={{ width: '20px', height: '20px' }}>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              {t('downloadPdf')}
            </a>
            <button onClick={onClose} className="btn-secondary" style={{ padding: '1rem', borderRadius: '8px', fontWeight: 600, border: '1px solid #ddd', color: '#555' }}>
              {t('backToCatalog')}
            </button>
          </div>
        </div>
        {/* Lightbox full screen zoom overlay */}
        {isZoomed && (
          <div 
            className="product-lightbox"
            onClick={(e) => { e.stopPropagation(); setIsZoomed(false); }}
          >
            <img 
              src={product.img} 
              alt={product.name} 
              style={{ 
                maxWidth: '90%', 
                maxHeight: '90%', 
                objectFit: 'contain',
                boxShadow: '0 25px 60px rgba(0,0,0,0.6)',
                borderRadius: '8px'
              }} 
            />
            <span 
              onClick={() => setIsZoomed(false)}
              style={{ 
                position: 'absolute', 
                top: '25px', 
                right: '35px', 
                color: 'white', 
                fontSize: '3.5rem', 
                cursor: 'pointer', 
                fontWeight: 300,
                lineHeight: 1
              }}
            >
              &times;
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
