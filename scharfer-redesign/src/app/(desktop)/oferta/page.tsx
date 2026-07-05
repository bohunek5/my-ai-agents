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
      {/* Oferta Hero */}
      <div className="oferta-hero" style={{ background: 'linear-gradient(135deg, var(--c-white) 0%, #eef2f6 100%)', padding: '6rem 2rem', borderBottom: '1px solid var(--c-border)', position: 'relative', overflow: 'hidden' }}>
        <div className="container" style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', alignItems: 'center', gap: '4rem', flexWrap: 'wrap', flexDirection: 'row-reverse' }}>
          <div style={{ flex: 1, minWidth: '300px', position: 'relative', zIndex: 2 }}>
            <h1 style={{ fontSize: '3rem', color: 'var(--c-heading)', marginBottom: '1rem', lineHeight: '1.2', fontWeight: 800 }}>Katalog Zasilaczy LED</h1>
            <p style={{ fontSize: '1.25rem', color: 'var(--c-text)', lineHeight: 1.6 }}>Niezawodne zasilacze napięciowe LED 12V i 24V. Wybierz rozwiązanie idealnie dopasowane do Twojego projektu, gwarantujące stabilność i bezpieczeństwo na lata.</p>
          </div>
          <div style={{ flex: 1, minWidth: '300px', position: 'relative', zIndex: 2, textAlign: 'center' }}>
            <img src="/assets/30024.png" alt="Zasilacze LED" style={{ maxWidth: '100%', borderRadius: '12px', boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }} />
          </div>
        </div>
      </div>

      <div className="container section-padding" style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem 1.5rem' }}>
        {/* Filters */}
        <div className="catalog-filters" style={{ display: 'flex', flexWrap: 'wrap', gap: '1.5rem', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
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

      <a href={product.pdf} target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ marginTop: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', textDecoration: 'none', padding: '0.8rem', fontSize: '0.85rem' }}>
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" style={{ width: '18px', height: '18px' }}>
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
        </svg>
        {downloadLabel}
      </a>
    </div>
  );
}

function ProductModal({ product, onClose }: { product: Product; onClose: () => void }) {
  return (
    <div className="product-modal active" id="product-modal" onClick={(e) => { if ((e.target as HTMLElement).id === 'product-modal') onClose(); }} style={{ display: 'flex', position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', zIndex: 10000, alignItems: 'center', justifyContent: 'center' }}>
      <div className="modal-content" style={{ maxWidth: '900px', maxHeight: '90vh', overflowY: 'auto', background: 'white', borderRadius: '12px', padding: '2rem', position: 'relative', display: 'flex', gap: '2rem', flexWrap: 'wrap', width: '90%' }}>
        <span className="modal-close" onClick={onClose} style={{ position: 'absolute', top: '15px', right: '20px', fontSize: '2rem', cursor: 'pointer', color: '#888' }}>&times;</span>
        
        <div className="modal-image-col" style={{ flex: 1, minWidth: '250px', textAlign: 'center' }}>
          <img src={product.img} alt={product.name} style={{ maxWidth: '100%', maxHeight: '250px', objectFit: 'contain' }} />
        </div>
        
        <div className="modal-info-col" style={{ flex: 1, minWidth: '300px' }}>
          <div className="modal-index" style={{ marginBottom: '1.5rem', fontSize: '1rem', color: '#666', fontWeight: 500 }}>
            EAN: {product.ean} <span style={{ marginLeft: '1rem', color: 'var(--c-primary)' }}>SKU: {product.index}</span>
          </div>
          <h2 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '1.5rem', color: 'var(--c-heading)' }}>{product.name}</h2>
          
          <table className="modal-specs-table" style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.95rem', marginBottom: '2rem' }}>
            <tbody>
              <tr style={{ borderBottom: '1px solid #f0f0f0' }}><td style={{ padding: '0.8rem 0', color: '#888' }}>Klasa szczelności</td><td style={{ padding: '0.8rem 0', fontWeight: 600 }}>IP67 (Wodoodporny)</td></tr>
              <tr style={{ borderBottom: '1px solid #f0f0f0' }}><td style={{ padding: '0.8rem 0', color: '#888' }}>Napięcie wyjściowe</td><td style={{ padding: '0.8rem 0', fontWeight: 600 }}>{product.specs.voltage} DC</td></tr>
              <tr style={{ borderBottom: '1px solid #f0f0f0' }}><td style={{ padding: '0.8rem 0', color: '#888' }}>Prąd wyjściowy</td><td style={{ padding: '0.8rem 0', fontWeight: 600 }}>{product.specs.current}</td></tr>
              <tr style={{ borderBottom: '1px solid #f0f0f0' }}><td style={{ padding: '0.8rem 0', color: '#888' }}>Wymiary obudowy</td><td style={{ padding: '0.8rem 0', fontWeight: 600 }}>{product.specs.dim}</td></tr>
              <tr style={{ borderBottom: '1px solid #f0f0f0' }}><td style={{ padding: '0.8rem 0', color: '#888' }}>Zabezpieczenia</td><td style={{ padding: '0.8rem 0', fontWeight: 600 }}>Przeciążeniowe (OLP), Przeciwzwarciowe (SCP), Nadnapięciowe (OVP), Termiczne (OTP)</td></tr>
              <tr style={{ borderBottom: '1px solid #f0f0f0' }}><td style={{ padding: '0.8rem 0', color: '#888' }}>Gwarancja</td><td style={{ padding: '0.8rem 0', fontWeight: 600, color: 'var(--c-primary)' }}>7 Lat (Pełna, producenta)</td></tr>
            </tbody>
          </table>

          <div className="modal-actions" style={{ display: 'flex', gap: '1rem' }}>
            <a href={product.pdf} target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none', padding: '0.8rem 1.5rem', borderRadius: '4px', background: 'var(--c-primary)', color: 'white', fontWeight: 600 }}>
              Pobierz Kartę Katalogową PDF
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
