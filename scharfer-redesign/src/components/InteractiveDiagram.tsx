'use client';
import { useState, useEffect } from 'react';
import { useLanguage } from '@/context/LanguageContext';

interface Feature {
  title: string;
  desc: string;
  // Anchor on the text card (connecting point)
  x1: number;
  y1: number;
  // Hotspot on the zasilacz image
  x2: number;
  y2: number;
  // Mobile percentage position
  mobileLeft: string;
  mobileTop: string;
}

export default function InteractiveDiagram({ forceMobile = false }: { forceMobile?: boolean }) {
  const { t } = useLanguage();
  const [activeFeature, setActiveFeature] = useState<number | null>(null);
  const [mounted, setMounted] = useState(forceMobile);
  const [isMobile, setIsMobile] = useState(forceMobile);

  useEffect(() => {
    setMounted(true);
    if (forceMobile) return;
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Layout bounds: width = 1400px, height = 540px
  const features: Feature[] = [
    {
      title: t('feature1Title'),
      desc: t('feature1Desc'),
      x1: 300, y1: 90, x2: 440, y2: 240,
      mobileLeft: '25.0%', mobileTop: '21%'
    },
    {
      title: t('feature2Title'),
      desc: t('feature2Desc'),
      x1: 300, y1: 260, x2: 460, y2: 250,
      mobileLeft: '24.5%', mobileTop: '42.5%'
    },
    {
      title: t('feature3Title'),
      desc: t('feature3Desc'),
      x1: 300, y1: 430, x2: 540, y2: 295,
      mobileLeft: '78%', mobileTop: '75%'
    },
    {
      title: t('feature4Title'),
      desc: t('feature4Desc'),
      x1: 1100, y1: 65, x2: 650, y2: 265,
      mobileLeft: '50%', mobileTop: '65%'
    },
    {
      title: t('feature5Title'),
      desc: t('feature5Desc'),
      x1: 1100, y1: 195, x2: 730, y2: 305,
      mobileLeft: '48%', mobileTop: '26%'
    },
    {
      title: t('feature6Title'),
      desc: t('feature6Desc'),
      x1: 1100, y1: 325, x2: 790, y2: 335,
      mobileLeft: '78%', mobileTop: '58%'
    },
    {
      title: t('feature7Title'),
      desc: t('feature7Desc'),
      x1: 1100, y1: 455, x2: 730, y2: 330,
      mobileLeft: '43%', mobileTop: '62%'
    }
  ];

  if (!mounted) {
    return (
      <div style={{ width: '100%', height: '240px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <img src="/scharfer/assets/40012.png" alt="Zasilacz Scharfer" style={{ maxWidth: '85%', maxHeight: '120px', objectFit: 'contain', opacity: 0.3 }} />
      </div>
    );
  }

  // Render Mobile Version
  if (isMobile) {
    return (
      <div style={{ width: '100%', padding: '10px 15px', boxSizing: 'border-box' }}>
        {/* Proportional scaled drawing container */}
        <div style={{ 
          position: 'relative', 
          width: '100%', 
          aspectRatio: '760 / 260',
          background: 'transparent', 
          marginBottom: '20px',
        }}>
          {/* Zasilacz image scaled properly */}
          <img 
            src="/scharfer/assets/40012.png" 
            alt="Zasilacz Scharfer" 
            style={{ 
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '100%', 
              height: 'auto', 
              display: 'block',
              filter: 'drop-shadow(0 12px 24px rgba(0,0,0,0.15))',
              pointerEvents: 'none'
            }} 
          />

          {/* Render numbered hotspots exactly proportionally to PC */}
          {features.map((f, idx) => {
            if (idx === 6) return null; // Skip if needed, but PC has it, let's keep all
            // PC Image width=760, centered at x=700 (so left=320)
            // PC Image center y=280, we use a 260px high slice centered at 280 (so top=150)
            const leftPct = ((f.x2 - 320) / 760) * 100;
            const topPct = ((f.y2 - 150) / 260) * 100;
            return (
              <div 
                key={idx}
                style={{
                  position: 'absolute',
                  left: `${leftPct}%`,
                  top: `${topPct}%`,
                  width: '28px',
                  height: '28px',
                  transform: 'translate(-50%, -50%)',
                  zIndex: 10,
                  background: 'var(--c-red)',
                  color: 'white',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '0.85rem',
                  fontWeight: 900,
                  border: '2px solid white',
                  boxShadow: '0 3px 8px rgba(220,38,38,0.6)'
                }}
              >
                {idx + 1}
              </div>
            );
          })}
        </div>

        {/* Feature descriptions list (bloczki) */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {features.map((f, idx) => (
            <div key={idx} style={{ background: 'white', border: '1px solid #f1f5f9', borderRadius: '10px', padding: '15px', display: 'flex', gap: '15px', boxShadow: '0 2px 8px rgba(0,0,0,0.02)' }}>
              <div style={{ flexShrink: 0, width: '28px', height: '28px', background: 'var(--c-red)', color: 'white', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.9rem', fontWeight: 800 }}>
                {idx + 1}
              </div>
              <div>
                <h4 style={{ fontSize: '0.95rem', fontWeight: 800, color: 'var(--c-heading)', margin: '0 0 4px 0', fontFamily: 'Outfit, sans-serif' }}>
                  {f.title}
                </h4>
                <p style={{ fontSize: '0.8rem', color: 'var(--c-text)', margin: 0, lineHeight: 1.45 }}>
                  {f.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Render Mobile Version
  if (isMobile) {
    return (
      <div style={{ width: '100%', padding: '10px 5px', boxSizing: 'border-box' }}>
        {/* Hotspots container over zasilacz image */}
        <div style={{ 
          position: 'relative', 
          width: '100%', 
          background: 'transparent', 
          borderRadius: '12px', 
          padding: '24px 12px', 
          boxSizing: 'border-box', 
          border: '1px solid #e5e7eb', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          marginBottom: '20px',
          transform: 'scale(1.2)',
          transformOrigin: 'center'
        }}>
          
          <div style={{ position: 'relative', width: '100%', display: 'block' }}>
            <img 
              src="/scharfer/assets/40012.png" 
              alt="Zasilacz Scharfer" 
              style={{ 
                width: '100%', 
                height: 'auto', 
                display: 'block',
                filter: 'drop-shadow(0 12px 24px rgba(0,0,0,0.15))',
                pointerEvents: 'none'
              }} 
            />

            {/* Render numbered hotspots */}
            {features.map((f, idx) => (
              <div 
                key={idx}
                style={{
                  position: 'absolute',
                  left: f.mobileLeft,
                  top: f.mobileTop,
                  width: '24px',
                  height: '24px',
                  transform: 'translate(-50%, -50%)',
                  zIndex: 10,
                  background: 'var(--c-red)',
                  color: 'white',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '0.75rem',
                  fontWeight: 800,
                  border: '2px solid white',
                  boxShadow: '0 2px 6px rgba(230,0,0,0.4)'
                }}
              >
                {idx + 1}
              </div>
            ))}
          </div>
        </div>

        {/* Feature descriptions list */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {features.map((f, idx) => (
            <div key={idx} style={{ background: 'white', border: '1px solid #f1f5f9', borderRadius: '10px', padding: '15px', display: 'flex', gap: '15px', boxShadow: '0 2px 8px rgba(0,0,0,0.02)' }}>
              <div style={{ flexShrink: 0, width: '28px', height: '28px', background: 'var(--c-red)', color: 'white', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.9rem', fontWeight: 800 }}>
                {idx + 1}
              </div>
              <div>
                <h4 style={{ fontSize: '0.95rem', fontWeight: 800, color: 'var(--c-heading)', margin: '0 0 4px 0', fontFamily: 'Outfit, sans-serif' }}>
                  {f.title}
                </h4>
                <p style={{ fontSize: '0.8rem', color: 'var(--c-text)', margin: 0, lineHeight: 1.45 }}>
                  {f.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Render Desktop Version (Original Width)
  return (
    <div style={{ width: '100%', overflowX: 'auto', paddingBottom: '10px', WebkitOverflowScrolling: 'touch' }}>
      <div style={{ position: 'relative', width: '1400px', height: '540px', margin: '0 auto', overflow: 'visible' }}>
        
        {/* Background SVG for lines */}
        <svg 
          style={{ 
            position: 'absolute', 
            top: 0, 
            left: 0, 
            width: '100%', 
            height: '100%', 
            zIndex: 4, 
            pointerEvents: 'none' 
          }}
        >
          {features.map((f, idx) => {
            if (idx === 6) return null; // No arrow line for Gwarancja card
            const isActive = activeFeature === idx;
            return (
              <line 
                key={idx}
                x1={f.x1} 
                y1={f.y1} 
                x2={f.x2} 
                y2={f.y2} 
                stroke={isActive ? 'var(--c-red)' : '#e5e7eb'} 
                strokeWidth={isActive ? '2.5' : '1.5'} 
                style={{ transition: 'all 0.25s cubic-bezier(0.25, 0.46, 0.45, 0.94)' }}
              />
            );
          })}
        </svg>

        {/* Center Zasilacz Image */}
        <div 
          style={{ 
            position: 'absolute', 
            left: '700px', 
            top: '280px', 
            transform: 'translate(-50%, -50%)', 
            zIndex: 3, 
            width: '760px', 
            textAlign: 'center',
            pointerEvents: 'none'
          }}
        >
          <img 
            src="/scharfer/assets/40012.png" 
            alt="Zasilacz Scharfer 12V 400W" 
            style={{ 
              width: '100%', 
              height: 'auto', 
              objectFit: 'contain', 
              filter: 'drop-shadow(0 25px 60px rgba(0,0,0,0.16))'
            }} 
          />
        </div>

        {/* Pulsing Hotspots on the zasilacz */}
        {features.map((f, idx) => {
          if (idx === 6) return null;
          const isActive = activeFeature === idx;
          return (
            <div 
              key={idx}
              onMouseEnter={() => setActiveFeature(idx)}
              onMouseLeave={() => setActiveFeature(null)}
              style={{
                position: 'absolute',
                left: `${f.x2}px`,
                top: `${f.y2}px`,
                width: '20px',
                height: '20px',
                transform: 'translate(-50%, -50%)',
                zIndex: 10,
                cursor: 'pointer'
              }}
            >
              <div 
                style={{
                  width: '100%',
                  height: '100%',
                  borderRadius: '50%',
                  background: 'var(--c-red)',
                  border: '2.5px solid white',
                  boxShadow: '0 0 12px rgba(230,0,0,0.6)',
                  transition: 'all 0.3s ease',
                  transform: isActive ? 'scale(1.25)' : 'scale(1)'
                }}
              />
              <div 
                className="ping-animation"
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  borderRadius: '50%',
                  background: 'var(--c-red)',
                  opacity: 0.45,
                  zIndex: -1
                }}
              />
            </div>
          );
        })}

        {/* Left Column Features */}
        <div style={{ position: 'absolute', left: 0, top: 10, width: '290px', height: '510px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', zIndex: 5 }}>
          {features.slice(0, 3).map((f, idx) => {
            const isActive = activeFeature === idx;
            return (
              <div 
                key={idx}
                onMouseEnter={() => setActiveFeature(idx)}
                onMouseLeave={() => setActiveFeature(null)}
                style={{
                  background: 'white',
                  border: isActive ? '1.5px solid var(--c-red)' : '1.5px solid #e5e7eb',
                  boxShadow: isActive ? '0 12px 25px rgba(230,0,0,0.07)' : '0 4px 12px rgba(0,0,0,0.03)',
                  borderRadius: '12px',
                  padding: '0.75rem 0.9rem',
                  cursor: 'pointer',
                  textAlign: 'right',
                  transition: 'all 0.25s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                  transform: isActive ? 'translateX(-8px)' : 'none',
                  opacity: activeFeature === null || isActive ? 1 : 0.45
                }}
              >
                <h3 style={{ fontSize: '1rem', fontWeight: 800, color: isActive ? 'var(--c-red)' : 'var(--c-heading)', transition: 'color 0.2s', margin: '0 0 0.3rem 0' }}>{f.title}</h3>
                <p style={{ fontSize: '0.78rem', color: 'var(--c-text)', margin: 0, lineHeight: 1.45 }}>{f.desc}</p>
              </div>
            );
          })}
        </div>

        {/* Right Column Features */}
        <div style={{ position: 'absolute', right: 0, top: 10, width: '290px', height: '510px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', zIndex: 5 }}>
          {features.slice(3).map((f, idx) => {
            const realIdx = idx + 3;
            const isActive = activeFeature === realIdx;
            return (
              <div 
                key={realIdx}
                onMouseEnter={() => realIdx !== 6 ? setActiveFeature(realIdx) : undefined}
                onMouseLeave={() => realIdx !== 6 ? setActiveFeature(null) : undefined}
                style={{
                  background: 'white',
                  border: isActive ? '1.5px solid var(--c-red)' : '1.5px solid #e5e7eb',
                  boxShadow: isActive ? '0 12px 25px rgba(230,0,0,0.07)' : '0 4px 12px rgba(0,0,0,0.03)',
                  borderRadius: '12px',
                  padding: '0.75rem 0.9rem',
                  cursor: realIdx !== 6 ? 'pointer' : 'default',
                  textAlign: 'left',
                  transition: 'all 0.25s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                  transform: isActive ? 'translateX(8px)' : 'none',
                  opacity: activeFeature === null || isActive || realIdx === 6 ? 1 : 0.45
                }}
              >
                <h3 style={{ fontSize: '1rem', fontWeight: 800, color: isActive ? 'var(--c-red)' : 'var(--c-heading)', transition: 'color 0.2s', margin: '0 0 0.3rem 0' }}>{f.title}</h3>
                <p style={{ fontSize: '0.78rem', color: 'var(--c-text)', margin: 0, lineHeight: 1.45 }}>{f.desc}</p>
              </div>
            );
          })}
        </div>

      </div>

      {/* CSS Keyframe definition */}
      <style jsx global>{`
        .ping-animation {
          animation: pulsePing 2s infinite ease-out;
        }
        @keyframes pulsePing {
          0% {
            transform: scale(0.8);
            opacity: 0.5;
          }
          100% {
            transform: scale(2.4);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}

