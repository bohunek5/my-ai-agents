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
      p.index.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const products12v = filteredProducts.filter(p => p.specs.voltage === '12V');
  const products24v = filteredProducts.filter(p => p.specs.voltage === '24V');

  return (
    <div className="view-section active">
      {/* Unified Page Hero */}
      <div className="page-hero">
        <div className="page-hero-bg">
          <img src="/assets/scharfer_city_night.png" alt="Zasilacze oświetlenia miejskiego" />
        </div>
        <div className="page-hero-overlay" />
        <div className="page-hero-content">
          <h1 className="page-hero-title">Katalog Zasilaczy LED</h1>
          <p className="page-hero-subtitle">
            Niezawodne zasilacze napięciowe LED 12V i 24V w klasie szczelności IP67. Wybierz rozwiązanie idealnie dopasowane do Twojego projektu.
          </p>
        </div>
      </div>

      <div className="container section-padding" style={{ maxWidth: '1200px', margin: '0 auto', padding: '4rem 1.5rem' }}>
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
            <button className={`filter-btn ${filter === '12V' ? 'active' : ''}`} onClick={() => setFilter('12V')}>Tylko 12V</button>
            <button className={`filter-btn ${filter === '24V' ? 'active' : ''}`} onClick={() => setFilter('24V')}>Tylko 24V</button>
          </div>
        </div>

        {/* Catalog */}
        <div className="catalog-wrapper">
          {products12v.length > 0 && (
            <div className="voltage-section" style={{ marginBottom: '4rem' }}>
              <h2 className="voltage-heading" style={{ fontSize: '1.8rem', color: 'var(--c-heading)', borderBottom: '2px solid var(--c-primary)', paddingBottom: '0.5rem', marginBottom: '2rem', fontWeight: 800 }}>Zasilacze LED Scharfer 12V</h2>
              <div className="products-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '2rem' }}>
                {products12v.map(p => (
                  <ProductCard key={p.index} product={p} onOpenModal={setActiveProduct} downloadLabel={t('downloadPdf')} />
                ))}
              </div>
            </div>
          )}

          {products24v.length > 0 && (
            <div className="voltage-section" style={{ marginBottom: '2rem' }}>
              <h2 className="voltage-heading" style={{ fontSize: '1.8rem', color: 'var(--c-heading)', borderBottom: '2px solid var(--c-primary)', paddingBottom: '0.5rem', marginBottom: '2rem', fontWeight: 800 }}>Zasilacze LED Scharfer 24V</h2>
              <div className="products-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '2rem' }}>
                {products24v.map(p => (
                  <ProductCard key={p.index} product={p} onOpenModal={setActiveProduct} downloadLabel={t('downloadPdf')} />
                ))}
              </div>
            </div>
          )}

          {filteredProducts.length === 0 && (
            <div style={{ textAlign: 'center', padding: '4rem 0', color: '#888' }}>
              <h3>Brak wyników spełniających kryteria wyszukiwania.</h3>
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

function ProductCard({ product, onOpenModal, downloadLabel }: { product: Product; onOpenModal: (p: Product) => void; downloadLabel: string }) {
  const powerMatch = product.name.match(/\d+W/);
  const powerText = powerMatch ? powerMatch[0] : '';

  return (
    <div className="product-card" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <div className="product-badges">
        {powerText && <span className="badge" style={{ backgroundColor: 'var(--c-primary)', color: 'white', fontWeight: 700 }}>{powerText}</span>}
        <span className="badge badge-ip67">IP67</span>
        <span className="badge">Gwarancja 7 Lat</span>
      </div>
      <div className="product-image" onClick={() => onOpenModal(product)} style={{ cursor: 'zoom-in', textAlign: 'center', padding: '1rem 0' }} title="Zobacz szczegóły techniczne">
        <img src={product.img} alt={product.name} style={{ maxWidth: '100%', maxHeight: '160px', objectFit: 'contain' }} />
      </div>
      <div className="product-index">EAN: {product.ean}</div>
      <h3 className="product-name" style={{ fontSize: '1.2rem', margin: '0.5rem 0', color: 'var(--c-heading)', fontWeight: 700 }}>{product.name}</h3>

      <div className="product-specs" style={{ fontSize: '0.85rem', marginBottom: '1.5rem' }}>
        <div className="spec-line" style={{ display: 'flex', justifyContent: 'space-between', padding: '0.3rem 0', borderBottom: '1px solid #f0f0f0' }}>
          <span className="spec-label" style={{ color: '#888' }}>Napięcie</span>
          <span className="spec-value" style={{ fontWeight: 600 }}>{product.specs.voltage} DC</span>
        </div>
        <div className="spec-line" style={{ display: 'flex', justifyContent: 'space-between', padding: '0.3rem 0', borderBottom: '1px solid #f0f0f0' }}>
          <span className="spec-label" style={{ color: '#888' }}>Prąd wyjściowy</span>
          <span className="spec-value" style={{ fontWeight: 600 }}>{product.specs.current}</span>
        </div>
        <div className="spec-line" style={{ display: 'flex', justifyContent: 'space-between', padding: '0.3rem 0', borderBottom: '1px solid #f0f0f0' }}>
          <span className="spec-label" style={{ color: '#888' }}>Wymiary</span>
          <span className="spec-value" style={{ fontWeight: 600 }}>{product.specs.dim}</span>
        </div>
      </div>

      <button onClick={() => onOpenModal(product)} className="btn-secondary" style={{ marginTop: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', padding: '0.8rem', fontSize: '0.85rem' }}>
        Szczegóły techniczne
      </button>
    </div>
  );
}

function ProductModal({ product, onClose }: { product: Product; onClose: () => void }) {
  return (
    <div className="product-modal active" id="product-modal" onClick={(e) => { if ((e.target as HTMLElement).id === 'product-modal') onClose(); }} style={{ display: 'flex', position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.6)', zIndex: 10000, alignItems: 'center', justifyContent: 'center' }}>
      <div className="modal-content" style={{ maxWidth: '900px', maxHeight: '92vh', overflowY: 'auto', background: 'white', borderRadius: '16px', padding: '3rem', position: 'relative', display: 'flex', gap: '3rem', flexWrap: 'wrap', width: '92%', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)', border: '1px solid #eee' }}>
        <span className="modal-close" onClick={onClose} style={{ position: 'absolute', top: '20px', right: '25px', fontSize: '2.5rem', cursor: 'pointer', color: '#aaa', transition: 'color 0.2s', fontWeight: 300, lineHeight: 1 }} onMouseEnter={(e) => e.currentTarget.style.color = '#111'} onMouseLeave={(e) => e.currentTarget.style.color = '#aaa'}>&times;</span>
        
        <div className="modal-image-col" style={{ flex: 1, minWidth: '280px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: '#fafafa', borderRadius: '12px', padding: '2rem' }}>
          <img src={product.img} alt={product.name} style={{ maxWidth: '100%', maxHeight: '280px', objectFit: 'contain' }} />
          <div style={{ marginTop: '1.5rem', background: '#e1f5fe', color: '#0288d1', fontSize: '0.78rem', fontWeight: 700, padding: '4px 10px', borderRadius: '20px', textTransform: 'uppercase' }}>Klasa Szczelności IP67</div>
        </div>
        
        <div className="modal-info-col" style={{ flex: 1.3, minWidth: '320px', display: 'flex', flexDirection: 'column' }}>
          <div className="modal-index" style={{ marginBottom: '1rem', fontSize: '0.95rem', color: '#888', fontWeight: 600 }}>
            EAN: {product.ean} <span style={{ marginLeft: '1.5rem', color: 'var(--c-primary)' }}>INDEX: {product.index}</span>
          </div>
          <h2 style={{ fontSize: '2.2rem', fontWeight: 800, marginBottom: '1.5rem', color: 'var(--c-heading)', lineHeight: 1.15, fontFamily: 'Outfit, sans-serif' }}>{product.name}</h2>
          
          <table className="modal-specs-table" style={{ width: '100%', borderCollapse: 'collapse', fontSize: '1rem', marginBottom: '2.5rem' }}>
            <tbody>
              <tr style={{ borderBottom: '1px solid #f3f4f6' }}><td style={{ padding: '0.9rem 0', color: '#6b7280', fontWeight: 500 }}>Napięcie wyjściowe</td><td style={{ padding: '0.9rem 0', fontWeight: 700, color: 'var(--c-heading)' }}>{product.specs.voltage} DC</td></tr>
              <tr style={{ borderBottom: '1px solid #f3f4f6' }}><td style={{ padding: '0.9rem 0', color: '#6b7280', fontWeight: 500 }}>Prąd wyjściowy</td><td style={{ padding: '0.9rem 0', fontWeight: 700, color: 'var(--c-heading)' }}>{product.specs.current}</td></tr>
              <tr style={{ borderBottom: '1px solid #f3f4f6' }}><td style={{ padding: '0.9rem 0', color: '#6b7280', fontWeight: 500 }}>Moc znamionowa</td><td style={{ padding: '0.9rem 0', fontWeight: 700, color: 'var(--c-heading)' }}>{product.name.match(/\d+W/) ? product.name.match(/\d+W/)?.[0] : ''}</td></tr>
              <tr style={{ borderBottom: '1px solid #f3f4f6' }}><td style={{ padding: '0.9rem 0', color: '#6b7280', fontWeight: 500 }}>Wymiary (dł. x szer. x wys.)</td><td style={{ padding: '0.9rem 0', fontWeight: 700, color: 'var(--c-heading)' }}>{product.specs.dim}</td></tr>
              <tr style={{ borderBottom: '1px solid #f3f4f6' }}><td style={{ padding: '0.9rem 0', color: '#6b7280', fontWeight: 500 }}>Aktywne zabezpieczenia</td><td style={{ padding: '0.9rem 0', fontWeight: 600, color: '#10b981', fontSize: '0.9rem' }}>Nadnapięciowe (OVP), Przeciwzwarciowe (SCP), Termiczne (OTP), Przeciążeniowe (OLP)</td></tr>
              <tr style={{ borderBottom: '1px solid #f3f4f6' }}><td style={{ padding: '0.9rem 0', color: '#6b7280', fontWeight: 500 }}>Gwarancja producenta</td><td style={{ padding: '0.9rem 0', fontWeight: 800, color: 'var(--c-primary)' }}>7 Lat (Pełna, realizowana w Polsce)</td></tr>
            </tbody>
          </table>

          <div className="modal-actions" style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
            <a href={product.pdf} target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', textDecoration: 'none', padding: '1.2rem', borderRadius: '8px', background: 'var(--c-primary)', color: 'white', fontWeight: 700, fontSize: '1.05rem', boxShadow: '0 4px 12px rgba(230,0,0,0.2)' }}>
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" style={{ width: '20px', height: '20px' }}>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              Pobierz Kartę Katalogową PDF
            </a>
            <button onClick={onClose} className="btn-secondary" style={{ padding: '1rem', borderRadius: '8px', fontWeight: 600, border: '1px solid #ddd', color: '#555' }}>
              Powrót do katalogu
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
