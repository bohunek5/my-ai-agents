import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const faqs = [
    { q: "How Do I Choose The Right VPN Service For Me?", a: "Consider factors such as server locations, speed, security features, privacy policy, customer support, and compatibility with your devices and operating systems when choosing a VPN service." },
    { q: "Can I Use A VPN On All My Devices?", a: "Yes! Linx supports Windows, macOS, iOS, Android, and Linux. You can connect up to 10 devices simultaneously with a single Premium account." },
    { q: "Can I Access Restricted Content With A VPN?", a: "Absolutely. By connecting to a server in a different country, you can bypass geographical restrictions on streaming services, websites, and social media." },
    { q: "Is Using A VPN Legal?", a: "In most countries, using a VPN is completely legal. However, using a VPN to commit illegal acts remains illegal regardless of whether you're using a VPN." },
    { q: "What Is A VPN, And How Does It Work?", a: "A VPN (Virtual Private Network) creates a secure tunnel between your device and the internet. It encrypts your data and hides your IP address, ensuring privacy." }
];

function FAQItem({ question, answer }) {
    const [open, setOpen] = useState(false);
    return (
        <div style={{ background: 'rgba(255,255,255,0.03)', border: `1px solid ${open ? 'rgba(59,130,246,0.4)' : 'rgba(255,255,255,0.08)'}`, borderRadius: '16px', overflow: 'hidden', transition: 'border 0.3s' }}>
            <button onClick={() => setOpen(!open)} style={{ width: '100%', padding: '20px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'none', border: 'none', color: '#fff', cursor: 'pointer', textAlign: 'left', gap: '16px' }}>
                <span style={{ fontWeight: 700, fontSize: '15px', flex: 1 }}>{question}</span>
                <div style={{ padding: '4px', background: open ? 'rgba(59,130,246,0.15)' : 'rgba(255,255,255,0.05)', borderRadius: '8px', transform: open ? 'rotate(180deg)' : 'rotate(0)', transition: 'all 0.3s', flexShrink: 0 }}>
                    <ChevronDown size={18} color={open ? '#3b82f6' : 'rgba(255,255,255,0.35)'} />
                </div>
            </button>
            <div style={{ maxHeight: open ? '200px' : '0', overflow: 'hidden', transition: 'max-height 0.35s ease', willChange: 'max-height' }}>
                <div style={{ padding: '0 24px 20px', color: 'rgba(255,255,255,0.4)', fontSize: '14px', lineHeight: 1.75, borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '16px' }}>
                    {answer}
                </div>
            </div>
        </div>
    );
}

export default function FAQ() {
    return (
        <section style={{ padding: '128px 24px' }}>
            <div style={{ maxWidth: '1152px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '80px' }}>
                <div>
                    <h2 style={{ fontFamily: 'Outfit, sans-serif', fontSize: 'clamp(32px, 5vw, 48px)', fontWeight: 700, lineHeight: 1.2, marginBottom: '32px' }}>Frequently Asked Question</h2>
                    <button style={{ background: '#3b82f6', border: 'none', color: '#fff', padding: '12px 28px', borderRadius: '999px', fontWeight: 700, fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.15em', cursor: 'pointer' }}>
                        More Questions →
                    </button>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {faqs.map((f, i) => <FAQItem key={i} question={f.q} answer={f.a} />)}
                </div>
            </div>
        </section>
    );
}
