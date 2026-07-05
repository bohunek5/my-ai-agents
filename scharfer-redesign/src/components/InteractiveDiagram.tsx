'use client';
import { useState, useEffect } from 'react';

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
    // Left side features (0, 1, 2)
    {
      title: 'Aluminiowa Obudowa',
      desc: 'Masywny odlew aluminiowy działający jako radiator. Całkowicie wyeliminowaliśmy wentylatory, gwarantując cichą pracę.',
      x1: 300,
      y1: 90,
      x2: 510,
      y2: 195,
      mobileLeft: '25.0%',
      mobileTop: '28.75%'
    },
    {
      title: '100% Mocy Znamionowej',
      desc: 'Zaprojektowany do ciągłej pracy przy pełnym obciążeniu. Kupując model 150W, otrzymujesz realne 150W bez ugięć napięcia.',
      x1: 300,
      y1: 260,
      x2: 460,
      y2: 250,
      mobileLeft: '18.42%',
      mobileTop: '42.5%'
    },
    {
      title: 'Cicha Praca (Brak piszczenia)',
      desc: 'Wnętrze w 100% zalane żywicą epoksydową tłumi drgania cewek i filtrów. Zachowuje bezwzględną ciszę przy ściemnianiu.',
      x1: 300,
      y1: 430,
      x2: 540,
      y2: 295,
      mobileLeft: '28.94%',
      mobileTop: '53.75%'
    },
    // Right side features (3, 4, 5, 6)
    {
      title: 'Klasa Szczelności IP67',
      desc: 'Hermetycznie zalana konstrukcja zapobiega wnikaniu wody i kurzu. Może bezpiecznie pracować w trudnych warunkach zewnętrznych.',
      x1: 1100,
      y1: 65,
      x2: 650,
      y2: 265,
      mobileLeft: '43.42%',
      mobileTop: '46.25%'
    },
    {
      title: 'Zabezpieczenia SCP, OVP, OTP',
      desc: 'Aktywna ochrona podłączonego oświetlenia przed skokami napięcia, zwarciem sieci oraz przegrzaniem z auto-restartem.',
      x1: 1100,
      y1: 195,
      x2: 730,
      y2: 305,
      mobileLeft: '53.94%',
      mobileTop: '56.25%'
    },
    {
      title: 'Aktywny Układ PFC (PF > 0.98)',
      desc: 'Kompensacja współczynnika mocy minimalizuje straty energetyczne i skutecznie eliminuje zakłócenia w sieci elektrycznej.',
      x1: 1100,
      y1: 325,
      x2: 790,
      y2: 335,
      mobileLeft: '61.84%',
      mobileTop: '63.75%'
    },
    {
      title: '7 Lat Pełnej Gwarancji',
      desc: 'Pełna ochrona dystrybutora. W przypadku usterki gwarantujemy natychmiastową wymianę na nowy produkt bezpośrednio z magazynu.',
      x1: 1100,
      y1: 455,
      x2: 730,
      y2: 330,
      mobileLeft: '53.94%',
      mobileTop: '62.5%'
    }
  ];

  if (!mounted) {
    return (
      <div style={{ width: '100%', height: '240px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <img src="/assets/40012.png" alt="Zasilacz Scharfer" style={{ maxWidth: '85%', maxHeight: '120px', objectFit: 'contain', opacity: 0.3 }} />
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
          marginBottom: '20px'
        }}>
          
          <div style={{ position: 'relative', width: '100%', display: 'block' }}>
            <img 
              src="/assets/40012.png" 
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
            src="/assets/40012.png" 
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

