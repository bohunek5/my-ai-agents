import React from 'react';
import { Shield } from 'lucide-react';

export default function Navbar() {
    return (
        <nav style={{
            position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
            display: 'flex', justifyContent: 'center', padding: '24px'
        }}>
            <div style={{
                width: '100%', maxWidth: '1152px',
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.1)',
                backdropFilter: 'blur(20px)',
                borderRadius: '16px',
                padding: '12px 20px',
                display: 'flex', alignItems: 'center', justifyContent: 'space-between'
            }}>
                {/* Logo */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: '20px' }}>
                    <div style={{ width: 32, height: 32, borderRadius: 8, background: '#3b82f6', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Shield size={18} color="white" />
                    </div>
                    <span>Linx</span>
                </div>

                {/* Nav links */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '32px', fontSize: '14px', fontWeight: 500, color: 'rgba(255,255,255,0.6)' }}>
                    {['Features', 'Server', 'Resources', 'Pricing'].map(l => (
                        <a key={l} href={`#${l.toLowerCase()}`} style={{ color: 'inherit', textDecoration: 'none', transition: 'color 0.2s' }}
                            onMouseEnter={e => e.target.style.color = '#fff'}
                            onMouseLeave={e => e.target.style.color = 'rgba(255,255,255,0.6)'}
                        >{l}</a>
                    ))}
                </div>

                {/* CTA */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <button style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.6)', fontSize: '14px', fontWeight: 500, cursor: 'pointer', padding: '8px 16px' }}>Sign In</button>
                    <button style={{
                        background: '#3b82f6', border: 'none', color: '#fff', fontSize: '14px',
                        fontWeight: 600, cursor: 'pointer', padding: '10px 24px', borderRadius: '12px',
                        boxShadow: '0 0 30px -5px rgba(59,130,246,0.6)', transition: 'background 0.2s'
                    }}>Get Premium ✨</button>
                </div>
            </div>
        </nav>
    );
}
