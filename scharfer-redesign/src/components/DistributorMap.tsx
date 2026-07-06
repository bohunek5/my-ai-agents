'use client';
import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';

// Dynamically import the map component so it doesn't break SSR
const MapContent = dynamic(() => import('./MapContent'), {
  ssr: false,
  loading: () => <div style={{ height: '600px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f8f9fa' }}>Wczytywanie mapy...</div>
});

export default function DistributorMap() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  // Simple hardcoded password for now
  const CORRECT_PASSWORD = 'mapa';

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === CORRECT_PASSWORD) {
      setIsAuthenticated(true);
      setError(false);
    } else {
      setError(true);
    }
  };

  if (!isAuthenticated) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
        <div style={{ background: '#fff', padding: '3rem', borderRadius: '8px', boxShadow: '0 4px 20px rgba(0,0,0,0.08)', textAlign: 'center', maxWidth: '400px', width: '100%' }}>
          <h1 style={{ color: 'var(--c-heading)', fontSize: '1.5rem', marginBottom: '1rem', fontWeight: 800 }}>Wewnętrzna Mapa Dystrybutorów</h1>
          <p style={{ color: 'var(--c-text)', fontSize: '0.9rem', marginBottom: '2rem' }}>Strona zahasłowana. Podaj hasło dostępu (domyślne: mapa).</p>
          
          <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Hasło"
              style={{ padding: '0.8rem', borderRadius: '4px', border: '1px solid var(--c-border)', fontSize: '1rem' }}
            />
            {error && <p style={{ color: 'var(--c-red)', fontSize: '0.8rem', margin: 0 }}>Nieprawidłowe hasło</p>}
            <button 
              type="submit"
              className="btn-primary"
              style={{ width: '100%' }}
            >
              Zaloguj się
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
      <h1 style={{ color: 'var(--c-heading)', fontSize: '2rem', marginBottom: '0.5rem', fontWeight: 800 }}>Mapa Dystrybutorów Scharfer</h1>
      <p style={{ color: 'var(--c-text)', marginBottom: '2rem' }}>Lista autoryzowanych punktów, w których dostępny jest nasz sprzęt.</p>
      
      <div style={{ borderRadius: '8px', overflow: 'hidden', boxShadow: '0 4px 20px rgba(0,0,0,0.1)', height: '600px' }}>
        <MapContent />
      </div>
    </div>
  );
}
