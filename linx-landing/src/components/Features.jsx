import React from 'react';
import { Shield, Zap, ShieldCheck, Globe, Search, Ghost } from 'lucide-react';

const card = {
    background: 'rgba(255,255,255,0.03)',
    border: '1px solid rgba(255,255,255,0.1)',
    backdropFilter: 'blur(20px)',
    borderRadius: '24px',
    padding: '32px',
};

const benefits = [
    { icon: Ghost, title: "Access Content Safely", desc: "Bypass geo-blocks and censored content with our lightning fast servers worldwide." },
    { icon: Globe, title: "Change Your IP Address", desc: "Hide your identity and browse like you are anywhere else in seconds." },
    { icon: ShieldCheck, title: "Protect iOS Devices", desc: "Military-grade encryption for all your mobile and portable devices." }
];

export default function Features() {
    return (
        <div id="features" style={{ padding: '128px 24px' }}>
            <div style={{ maxWidth: '1280px', margin: '0 auto' }}>

                {/* Benefits */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '80px', alignItems: 'center', marginBottom: '160px' }}>
                    <div>
                        <span style={{ background: 'rgba(59,130,246,0.1)', color: '#3b82f6', padding: '6px 14px', borderRadius: '999px', fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.15em', display: 'inline-block', marginBottom: '24px' }}>
                            Advantages of VPN 🔥
                        </span>
                        <h2 style={{ fontFamily: 'Outfit, sans-serif', fontSize: 'clamp(32px, 5vw, 48px)', fontWeight: 700, lineHeight: 1.15, marginBottom: '24px' }}>
                            What are The Benefits <br />Of Using a VPN?
                        </h2>
                        <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: '16px', lineHeight: 1.7, marginBottom: '48px' }}>
                            Gain the upper hand online with a VPN. Enjoy enhanced privacy, security, and freedom while browsing the web.
                        </p>
                        <button style={{ background: '#3b82f6', border: 'none', color: '#fff', padding: '14px 32px', borderRadius: '16px', fontWeight: 700, fontSize: '14px', cursor: 'pointer', boxShadow: '0 0 30px -5px rgba(59,130,246,0.6)' }}>
                            Learn More →
                        </button>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                        {benefits.map((b, i) => (
                            <div key={i} style={{ ...card, display: 'flex', alignItems: 'flex-start', gap: '20px' }}>
                                <div style={{ padding: '14px', background: 'rgba(59,130,246,0.1)', borderRadius: '16px', flexShrink: 0 }}>
                                    <b.icon size={28} color="#3b82f6" />
                                </div>
                                <div>
                                    <h3 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '8px' }}>{b.title}</h3>
                                    <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '13px', lineHeight: 1.7 }}>{b.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Stats bar */}
                <div style={{ ...card, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '0', marginBottom: '160px', textAlign: 'center', padding: '48px' }}>
                    {[['120+', 'Countries'], ['2,000+', 'Servers'], ['200+', 'Locations']].map(([num, label]) => (
                        <div key={label} style={{ padding: '20px', borderRight: '1px solid rgba(255,255,255,0.07)' }}>
                            <div style={{ fontFamily: 'Outfit, sans-serif', fontSize: '40px', fontWeight: 700, marginBottom: '6px' }}>{num}</div>
                            <div style={{ color: 'rgba(255,255,255,0.35)', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.2em', fontWeight: 700 }}>{label}</div>
                        </div>
                    ))}
                    <div style={{ padding: '20px', display: 'flex', alignItems: 'center' }}>
                        <p style={{ color: 'rgba(255,255,255,0.25)', fontSize: '12px', lineHeight: 1.7, textAlign: 'left' }}>
                            Select from over 1000 high-speed VPN servers and experience reliable, lightning-fast connections wherever you go.
                        </p>
                    </div>
                </div>

                {/* Advanced Features */}
                <div style={{ textAlign: 'center', marginBottom: '64px' }}>
                    <span style={{ color: '#3b82f6', fontWeight: 700, fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.3em', display: 'block', marginBottom: '16px' }}>The Most Valuable Features 🚀</span>
                    <h2 style={{ fontFamily: 'Outfit, sans-serif', fontSize: 'clamp(32px, 5vw, 48px)', fontWeight: 700, lineHeight: 1.2, marginBottom: '24px' }}>
                        Advanced Features <br />Offered By Linx
                    </h2>
                    <button style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', color: '#fff', padding: '10px 24px', borderRadius: '999px', fontSize: '12px', fontWeight: 700, cursor: 'pointer' }}>More Features →</button>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
                    {/* Fast Connections */}
                    <div style={{ ...card, display: 'flex', flexDirection: 'column', gap: '20px' }}>
                        <div style={{ padding: '12px', background: 'rgba(59,130,246,0.1)', borderRadius: '14px', width: 'fit-content' }}>
                            <Zap size={22} color="#3b82f6" />
                        </div>
                        <h3 style={{ fontSize: '22px', fontWeight: 700 }}>Fast And Reliable Connections</h3>
                        <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '13px', lineHeight: 1.7 }}>Experience lightning-fast connection speeds and reliable performance with our optimized server network.</p>
                        {/* Speed gauge */}
                        <div style={{ background: 'rgba(255,255,255,0.05)', borderRadius: '20px', padding: '24px', textAlign: 'center', border: '1px solid rgba(255,255,255,0.08)' }}>
                            <svg width="120" height="120" style={{ transform: 'rotate(-90deg)' }}>
                                <circle cx="60" cy="60" r="50" fill="transparent" stroke="rgba(255,255,255,0.05)" strokeWidth="8" />
                                <circle cx="60" cy="60" r="50" fill="transparent" stroke="#3b82f6" strokeWidth="8" strokeDasharray="314" strokeDashoffset="100" strokeLinecap="round" />
                            </svg>
                            <div style={{ marginTop: '-90px', marginBottom: '60px', position: 'relative', zIndex: 1 }}>
                                <div style={{ fontSize: '28px', fontWeight: 700, fontFamily: 'Outfit, sans-serif' }}>27.10</div>
                                <div style={{ fontSize: '10px', color: 'rgba(255,255,255,0.3)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.15em' }}>mb/s</div>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', fontSize: '10px', fontWeight: 700, color: '#22c55e', textTransform: 'uppercase' }}>
                                <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#22c55e' }} /> Connected
                            </div>
                        </div>
                    </div>

                    {/* Ad Blocker */}
                    <div style={{ ...card, display: 'flex', flexDirection: 'column', gap: '20px' }}>
                        <div style={{ padding: '12px', background: 'rgba(59,130,246,0.1)', borderRadius: '14px', width: 'fit-content' }}>
                            <Shield size={22} color="#3b82f6" />
                        </div>
                        <h3 style={{ fontSize: '22px', fontWeight: 700 }}>Ad Blocker & Virus Protection</h3>
                        <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '13px', lineHeight: 1.7 }}>Protect yourself from online threats with our built-in ad blocker and malware protection features.</p>
                        {[
                            { name: 'Ad Blocker', active: true, icon: Search },
                            { name: 'Antivirus', active: false, icon: ShieldCheck }
                        ].map(({ name, active, icon: Icon }) => (
                            <div key={name} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 16px', background: 'rgba(255,255,255,0.04)', borderRadius: '14px', border: '1px solid rgba(255,255,255,0.06)', opacity: active ? 1 : 0.5 }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                    <Icon size={16} color="#3b82f6" />
                                    <span style={{ fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em' }}>{name}</span>
                                </div>
                                <div style={{ width: 32, height: 16, borderRadius: '999px', background: active ? '#3b82f6' : 'rgba(255,255,255,0.1)', position: 'relative', transition: 'background 0.3s' }}>
                                    <div style={{ position: 'absolute', top: 2, left: active ? 'auto' : 2, right: active ? 2 : 'auto', width: 12, height: 12, borderRadius: '50%', background: '#fff', transition: 'all 0.3s' }} />
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Server Switching */}
                    <div style={{ ...card, display: 'flex', flexDirection: 'column', gap: '20px' }}>
                        <div style={{ padding: '12px', background: 'rgba(59,130,246,0.1)', borderRadius: '14px', width: 'fit-content' }}>
                            <Globe size={22} color="#3b82f6" />
                        </div>
                        <h3 style={{ fontSize: '22px', fontWeight: 700 }}>Easy Server Switching</h3>
                        <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '13px', lineHeight: 1.7 }}>Enjoy unlimited bandwidth and server switching, allowing you to browse, stream, and download without limits.</p>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                            {[
                                { city: 'New Jersey', ip: '65.132.x.x', color: 'rgba(255,255,255,0.04)', label: 'Disconnect', labelBg: 'rgba(255,255,255,0.08)' },
                                { city: 'Munich', ip: '12.123.x.x', color: 'rgba(59,130,246,0.1)', label: 'Connect', labelBg: '#3b82f6', border: '1px solid rgba(59,130,246,0.3)' }
                            ].map(({ city, ip, color, label, labelBg, border }) => (
                                <div key={city} style={{ background: color, borderRadius: '16px', padding: '16px', textAlign: 'center', border: border || '1px solid rgba(255,255,255,0.06)' }}>
                                    <Globe size={20} color="#3b82f6" style={{ marginBottom: '8px' }} />
                                    <div style={{ fontSize: '13px', fontWeight: 700, marginBottom: '4px' }}>{city}</div>
                                    <div style={{ fontSize: '10px', color: 'rgba(255,255,255,0.3)', marginBottom: '12px' }}>{ip}</div>
                                    <button style={{ background: labelBg, border: 'none', color: '#fff', padding: '6px 14px', borderRadius: '8px', fontSize: '11px', fontWeight: 700, cursor: 'pointer', width: '100%' }}>{label}</button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
