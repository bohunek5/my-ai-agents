import React, { useState } from 'react';
import { Power, Globe, Download, Upload, Monitor, Smartphone, Laptop, Cpu } from 'lucide-react';

const g = (s) => s; // passthrough style helper

export default function Hero() {
    const [active, setActive] = useState(false);

    return (
        <section style={{
            position: 'relative', paddingTop: '160px', paddingBottom: '80px',
            padding: '160px 24px 80px', overflow: 'hidden',
            minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center'
        }}>
            {/* Background glows */}
            <div style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', width: '100%', height: '800px', background: 'radial-gradient(circle at 50% 50%, rgba(59,130,246,0.12) 0%, transparent 70%)', pointerEvents: 'none' }} />
            <div style={{ position: 'absolute', top: '-160px', left: '-160px', width: '384px', height: '384px', background: 'rgba(59,130,246,0.15)', borderRadius: '50%', filter: 'blur(120px)', pointerEvents: 'none' }} />
            <div style={{ position: 'absolute', top: '50%', right: '-160px', width: '384px', height: '384px', background: 'rgba(59,130,246,0.08)', borderRadius: '50%', filter: 'blur(120px)', pointerEvents: 'none' }} />

            {/* Hero text */}
            <div style={{ textAlign: 'center', maxWidth: '896px', position: 'relative', zIndex: 10, paddingTop: '60px' }}>
                <span style={{ color: '#3b82f6', fontWeight: 600, fontSize: '12px', letterSpacing: '0.2em', textTransform: 'uppercase', display: 'block', marginBottom: '20px' }}>
                    Protect Your Online World, Anywhere, Anytime 🌍
                </span>
                <h1 style={{ fontFamily: 'Outfit, sans-serif', fontSize: 'clamp(48px, 8vw, 80px)', fontWeight: 700, lineHeight: 1.05, letterSpacing: '-0.03em', marginBottom: '32px' }}>
                    Experience Internet Freedom<br />
                    <span style={{ background: 'linear-gradient(90deg, #fff 0%, rgba(255,255,255,0.5) 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                        With Linx
                    </span>
                </h1>
                <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: '18px', maxWidth: '600px', margin: '0 auto 48px', lineHeight: 1.7 }}>
                    Safeguard your digital footprint, access restricted content, and browse anonymously with our advanced encryption technology.
                </p>

                <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '80px' }}>
                    <button style={{
                        padding: '14px 32px', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.1)',
                        background: 'rgba(255,255,255,0.05)', color: '#fff', fontSize: '14px', fontWeight: 600,
                        cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', transition: 'all 0.2s'
                    }}>
                        Download Now <Download size={18} />
                    </button>
                    <button style={{
                        padding: '14px 40px', borderRadius: '16px', border: 'none',
                        background: '#3b82f6', color: '#fff', fontSize: '14px', fontWeight: 700,
                        cursor: 'pointer', boxShadow: '0 0 40px -8px rgba(59,130,246,0.7)', transition: 'all 0.2s'
                    }}>
                        Get Premium ✨
                    </button>
                </div>
            </div>

            {/* VPN Dashboard Card */}
            <div style={{ position: 'relative', width: '100%', maxWidth: '480px', zIndex: 10 }}>
                <div style={{
                    background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.15)',
                    backdropFilter: 'blur(20px)', borderRadius: '28px', overflow: 'hidden',
                    boxShadow: '0 60px 100px -20px rgba(0,0,20,0.8), 0 0 0 1px rgba(255,255,255,0.05)'
                }}>
                    {/* Title bar */}
                    <div style={{ background: 'rgba(255,255,255,0.04)', borderBottom: '1px solid rgba(255,255,255,0.08)', padding: '14px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            {['#ef4444', '#eab308', '#22c55e'].map((c, i) => (
                                <div key={i} style={{ width: 10, height: 10, borderRadius: '50%', background: c + '80' }} />
                            ))}
                            <span style={{ marginLeft: '8px', fontSize: '11px', fontWeight: 500, color: 'rgba(255,255,255,0.3)' }}>Linx VPN — Desktop v2.4</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                            <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#22c55e', animation: 'pulse 2s infinite' }} />
                            <span style={{ fontSize: '10px', fontWeight: 700, color: '#22c55e', letterSpacing: '0.1em' }}>CONNECTED</span>
                        </div>
                    </div>

                    {/* Card body */}
                    <div style={{ padding: '40px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        {/* Location */}
                        <div style={{
                            display: 'flex', alignItems: 'center', gap: '10px',
                            background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)',
                            borderRadius: '999px', padding: '8px 20px', marginBottom: '40px'
                        }}>
                            <Globe size={14} color="#3b82f6" />
                            <span style={{ fontSize: '12px', fontWeight: 600 }}>New Jersey, United States</span>
                            <span style={{ fontSize: '10px', color: 'rgba(255,255,255,0.3)' }}>65.132.21.12</span>
                        </div>

                        {/* Timer */}
                        <div style={{ position: 'relative', marginBottom: '48px', textAlign: 'center' }}>
                            <div style={{
                                position: 'absolute', inset: '-32px',
                                background: 'radial-gradient(circle, rgba(59,130,246,0.2) 0%, transparent 70%)',
                                borderRadius: '50%'
                            }} />
                            <div style={{ fontFamily: 'Outfit, sans-serif', fontSize: '52px', fontWeight: 700, letterSpacing: '-0.04em', lineHeight: 1, position: 'relative' }}>
                                03:21:37
                            </div>
                            <div style={{ fontSize: '10px', color: 'rgba(255,255,255,0.35)', letterSpacing: '0.25em', textTransform: 'uppercase', marginTop: '8px', fontWeight: 600 }}>
                                Connecting Time
                            </div>
                        </div>

                        {/* Power button */}
                        <button
                            onClick={() => setActive(!active)}
                            style={{
                                width: '80px', height: '80px', borderRadius: '50%', border: 'none',
                                background: active ? '#22c55e' : '#3b82f6',
                                boxShadow: active
                                    ? '0 0 50px -5px rgba(34,197,94,0.7)'
                                    : '0 0 50px -5px rgba(59,130,246,0.7)',
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                cursor: 'pointer', marginBottom: '40px',
                                transition: 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
                                transform: active ? 'scale(1.05)' : 'scale(1)'
                            }}
                        >
                            <Power size={36} color="white" />
                        </button>

                        {/* Stats */}
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px', width: '100%', borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '32px' }}>
                            {[
                                { icon: Download, label: 'Download', value: '245 MB/s', color: '#3b82f6' },
                                { icon: Upload, label: 'Upload', value: '17.8 MB/s', color: '#60a5fa' }
                            ].map(({ icon: Icon, label, value, color }) => (
                                <div key={label} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                    <div style={{ padding: '10px', background: 'rgba(59,130,246,0.1)', borderRadius: '12px' }}>
                                        <Icon size={16} color={color} />
                                    </div>
                                    <div>
                                        <div style={{ fontSize: '9px', color: 'rgba(255,255,255,0.35)', textTransform: 'uppercase', letterSpacing: '0.15em', fontWeight: 700, marginBottom: '2px' }}>{label}</div>
                                        <div style={{ fontSize: '14px', fontWeight: 700 }}>{value}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Orbiting device icons */}
                {[
                    { Icon: Monitor, top: '-20px', left: '50%', transform: 'translateX(-50%)' },
                    { Icon: Smartphone, top: '20%', right: '-28px' },
                    { Icon: Laptop, bottom: '20%', right: '-28px' },
                    { Icon: Cpu, top: '20%', left: '-28px' },
                    { Icon: Monitor, bottom: '20%', left: '-28px' },
                ].map(({ Icon, ...pos }, i) => (
                    <div key={i} style={{
                        position: 'absolute', ...pos,
                        background: 'rgba(255,255,255,0.03)',
                        border: '1px solid rgba(255,255,255,0.08)',
                        backdropFilter: 'blur(12px)',
                        borderRadius: '14px', padding: '10px',
                        boxShadow: '0 8px 32px rgba(0,0,0,0.4)'
                    }}>
                        <Icon size={20} color="rgba(255,255,255,0.3)" />
                    </div>
                ))}
            </div>

            {/* Device platforms */}
            <div style={{ marginTop: '64px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px', color: 'rgba(255,255,255,0.3)', fontSize: '12px', fontWeight: 600, letterSpacing: '0.1em' }}>
                <div style={{ display: 'flex', gap: '32px' }}>
                    {[{ Icon: Monitor, label: 'Windows' }, { Icon: Laptop, label: 'macOS' }, { Icon: Smartphone, label: 'Android' }, { Icon: Cpu, label: 'iOS' }].map(({ Icon, label }) => (
                        <div key={label} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', opacity: 0.5, transition: 'opacity 0.2s', cursor: 'pointer' }}
                            onMouseEnter={e => e.currentTarget.style.opacity = 1}
                            onMouseLeave={e => e.currentTarget.style.opacity = 0.5}
                        >
                            <Icon size={28} />
                            <span style={{ fontSize: '10px' }}>{label}</span>
                        </div>
                    ))}
                </div>
                <div style={{ fontSize: '13px', marginTop: '8px', color: 'rgba(255,255,255,0.2)' }}>Stay Secure on All Devices 🔒</div>
                <h2 style={{ fontFamily: 'Outfit, sans-serif', fontSize: '28px', fontWeight: 700, color: '#fff', textAlign: 'center', maxWidth: '400px' }}>
                    Guard Your Privacy On Every Device
                </h2>
                <p style={{ color: 'rgba(255,255,255,0.35)', fontSize: '14px', textAlign: 'center', maxWidth: '340px', lineHeight: 1.7 }}>
                    Enjoy seamless security and privacy across all platforms, ensuring your online safety no matter which device you use.
                </p>
            </div>
        </section>
    );
}
