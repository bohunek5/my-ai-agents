import React from 'react';
import { Check, Shield, Search, Bell, Globe, Ghost, Zap, ShieldCheck } from 'lucide-react';

const card = {
    background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)',
    backdropFilter: 'blur(20px)', borderRadius: '24px', padding: '32px',
};

export default function Pricing() {
    return (
        <section id="pricing" style={{ padding: '128px 24px', position: 'relative' }}>
            <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 50% 50%, rgba(59,130,246,0.04), transparent 70%)', pointerEvents: 'none' }} />

            <div style={{ maxWidth: '1152px', margin: '0 auto', position: 'relative' }}>

                {/* Security section */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '64px', alignItems: 'center', marginBottom: '80px' }}>
                    <div>
                        <span style={{ color: '#3b82f6', fontWeight: 700, fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.25em', display: 'block', marginBottom: '16px' }}>
                            Empowering Your Digital Defenses 🛡️
                        </span>
                        <h2 style={{ fontFamily: 'Outfit, sans-serif', fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 700, lineHeight: 1.2, marginBottom: '24px' }}>
                            Take Your Online Security To New Heights
                        </h2>
                        <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '16px', lineHeight: 1.7, marginBottom: '40px' }}>
                            Elevate your online security to unprecedented levels with our cutting-edge solutions.
                        </p>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                            {[{ I: Shield, l: "VPN" }, { I: ShieldCheck, l: "Antivirus" }, { I: Search, l: "Search" }, { I: Bell, l: "Alert" }, { I: Globe, l: "Alternative ID" }, { I: Ghost, l: "CleanWeb" }].map(({ I, l }) => (
                                <div key={l} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 14px', background: 'rgba(255,255,255,0.04)', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.05)', opacity: 0.75 }}>
                                    <I size={14} color="#3b82f6" />
                                    <span style={{ fontSize: '10px', textTransform: 'uppercase', fontWeight: 700, letterSpacing: '0.12em' }}>{l}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Pricing card */}
                    <div style={{ ...card, border: '1px solid rgba(59,130,246,0.4)', boxShadow: '0 0 80px -20px rgba(59,130,246,0.25)', padding: 0, overflow: 'hidden' }}>
                        <div style={{ padding: '40px', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '32px' }}>
                                <div style={{ background: 'rgba(59,130,246,0.15)', border: '1px solid rgba(59,130,246,0.2)', color: '#3b82f6', fontSize: '10px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.2em', padding: '6px 14px', borderRadius: '999px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                                    <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#3b82f6', animation: 'pulse 2s infinite' }} /> Premium
                                </div>
                                <span style={{ fontSize: '10px', fontWeight: 700, textTransform: 'uppercase', background: 'rgba(255,255,255,0.06)', padding: '6px 12px', borderRadius: '8px' }}>Monthly</span>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginBottom: '32px' }}>
                                <span style={{ fontFamily: 'Outfit, sans-serif', fontSize: '64px', fontWeight: 700, lineHeight: 1 }}>$20</span>
                                <span style={{ color: 'rgba(255,255,255,0.35)', fontWeight: 700, fontSize: '13px', textTransform: 'uppercase', letterSpacing: '0.15em' }}>usd</span>
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                                {['Connection speed up to 6730 Mbps', 'Malware scan for downloads', 'Alerts about leaked credentials', 'Tracker and ad blocker'].map(f => (
                                    <div key={f} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                        <div style={{ padding: '3px', background: 'rgba(34,197,94,0.15)', borderRadius: '50%', flexShrink: 0 }}>
                                            <Check size={12} color="#22c55e" />
                                        </div>
                                        <span style={{ fontSize: '13px', color: 'rgba(255,255,255,0.65)', fontWeight: 500 }}>{f}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div style={{ padding: '32px 40px' }}>
                            <button style={{ width: '100%', background: '#3b82f6', border: 'none', color: '#fff', padding: '18px', borderRadius: '16px', fontWeight: 700, fontSize: '13px', textTransform: 'uppercase', letterSpacing: '0.2em', cursor: 'pointer', boxShadow: '0 0 40px -8px rgba(59,130,246,0.7)' }}>
                                Go Premium Now!
                            </button>
                        </div>
                    </div>
                </div>

                {/* Compare section */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px', marginTop: '80px' }}>
                    <div style={{ ...card, display: 'flex', alignItems: 'flex-start', gap: '20px', border: '1px solid rgba(59,130,246,0.2)' }}>
                        <div style={{ padding: '14px', background: 'rgba(59,130,246,0.15)', borderRadius: '14px', flexShrink: 0 }}>
                            <Shield size={24} color="#3b82f6" />
                        </div>
                        <div>
                            <h4 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '8px' }}>Linx VPN</h4>
                            <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '13px', lineHeight: 1.7 }}>Premium VPNs typically employ the latest encryption protocols, ensuring that your data remains protected from prying eyes and potential threats.</p>
                        </div>
                    </div>
                    <div style={{ ...card, display: 'flex', alignItems: 'flex-start', gap: '20px', opacity: 0.4, filter: 'grayscale(1)' }}>
                        <div style={{ padding: '14px', background: 'rgba(255,255,255,0.05)', borderRadius: '14px', flexShrink: 0 }}>
                            <Ghost size={24} color="rgba(255,255,255,0.2)" />
                        </div>
                        <div>
                            <h4 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '8px', color: 'rgba(255,255,255,0.4)' }}>Others VPN</h4>
                            <p style={{ color: 'rgba(255,255,255,0.25)', fontSize: '13px', lineHeight: 1.7 }}>One major disadvantage is the lack of robust security features. Free VPNs may not offer the same level of encryption and data protection as premium services.</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
