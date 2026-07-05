'use client';
import { useState } from 'react';

interface Feature {
  title: string;
  desc: string;
  // Anchor on the text card (connecting point)
  x1: number;
  y1: number;
  // Hotspot on the zasilacz image
  x2: number;
  y2: number;
}

export default function InteractiveDiagram() {
  const [activeFeature, setActiveFeature] = useState<number | null>(null);

  // Layout bounds: width = 1400px, height = 580px
  // Left column width = 290px (bounds: 0px to 290px). x1 anchor at 300px.
  // Right column width = 290px (bounds: 1110px to 1400px). x1 anchor at 1100px.
  // Center is at x = 700px.
  // Zasilacz image width = 760px (centered around 700px, top 290px).
  // Hotspots are precisely mapped along the slanted zasilacz body from top-left (430, 210) to bottom-right (820, 360).
  const features: Feature[] = [
    // Left side features (0, 1, 2)
    {
      title: 'Aluminiowa Obudowa',
      desc: 'Masywny odlew aluminiowy działający jako radiator. Całkowicie wyeliminowaliśmy wentylatory, gwarantując cichą pracę.',
      x1: 300,
      y1: 90,
      x2: 470,
      y2: 230
    },
    {
      title: '100% Mocy Znamionowej',
      desc: 'Zaprojektowany do ciągłej pracy przy pełnym obciążeniu. Kupując model 150W, otrzymujesz realne 150W bez ugięć napięcia.',
      x1: 300,
      y1: 260,
      x2: 580,
      y2: 270
    },
    {
      title: 'Cicha Praca (Brak piszczenia)',
      desc: 'Wnętrze w 100% zalane żywicą epoksydową tłumi drgania cewek i filtrów. Zachowuje bezwzględną ciszę przy ściemnianiu.',
      x1: 300,
      y1: 430,
      x2: 530,
      y2: 250
    },
    // Right side features (3, 4, 5, 6)
    {
      title: 'Klasa Szczelności IP67',
      desc: 'Hermetycznie zalana konstrukcja zapobiega wnikaniu wody i kurzu. Może bezpiecznie pracować w trudnych warunkach zewnętrznych.',
      x1: 1100,
      y1: 65,
      x2: 680,
      y2: 310
    },
    {
      title: 'Zabezpieczenia SCP, OVP, OTP',
      desc: 'Aktywna ochrona podłączonego oświetlenia przed skokami napięcia, zwarciem sieci oraz przegrzaniem z auto-restartem.',
      x1: 1100,
      y1: 195,
      x2: 820,
      y2: 360
    },
    {
      title: 'Aktywny Układ PFC (PF > 0.98)',
      desc: 'Kompensacja współczynnika mocy minimalizuje straty energetyczne i skutecznie eliminuje zakłócenia w sieci elektrycznej.',
      x1: 1100,
      y1: 325,
      x2: 430,
      y2: 210
    },
    {
      title: '7 Lat Pełnej Gwarancji',
      desc: 'Pełna ochrona dystrybutora. W przypadku usterki gwarantujemy natychmiastową wymianę na nowy produkt bezpośrednio z magazynu.',
      x1: 1100,
      y1: 455,
      x2: 630,
      y2: 290
    }
  ];

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
            zIndex: 2, 
            pointerEvents: 'none' 
          }}
        >
          {features.map((f, idx) => {
            const isActive = activeFeature === idx;
            return (
              <g key={idx}>
                {/* Delicate dashed connecting line visible by default */}
                <line 
                  x1={f.x1} 
                  y1={f.y1} 
                  x2={f.x2} 
                  y2={f.y2} 
                  stroke={isActive ? 'var(--c-red)' : '#d1d5db'} 
                  strokeWidth={isActive ? '2.5' : '1'} 
                  strokeDasharray={isActive ? 'none' : '3,4'}
                  style={{ transition: 'all 0.3s ease' }}
                />
                {/* Animated drawing overlay line */}
                {isActive && (
                  <line 
                    x1={f.x1} 
                    y1={f.y1} 
                    x2={f.x2} 
                    y2={f.y2} 
                    stroke="var(--c-red)" 
                    strokeWidth="3"
                    strokeDasharray="600"
                    strokeDashoffset="600"
                    style={{
                      animation: 'drawSvgLine 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards'
                    }}
                  />
                )}
              </g>
            );
          })}
        </svg>

        {/* Center Zasilacz Image - HUGE (760px width) */}
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

        {/* Left Column Features (Smaller compact cards with tighter padding and fonts) */}
        <div style={{ position: 'absolute', left: 0, top: 10, width: '290px', height: '510px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', zIndex: 4 }}>
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
                  transform: isActive ? 'translateY(-3px)' : 'none',
                  opacity: activeFeature === null || isActive ? 1 : 0.45
                }}
              >
                <h3 style={{ fontSize: '1rem', fontWeight: 800, color: isActive ? 'var(--c-red)' : 'var(--c-heading)', transition: 'color 0.2s', margin: '0 0 0.3rem 0' }}>{f.title}</h3>
                <p style={{ fontSize: '0.78rem', color: 'var(--c-text)', margin: 0, lineHeight: 1.45 }}>{f.desc}</p>
              </div>
            );
          })}
        </div>

        {/* Right Column Features (Smaller compact cards with tighter padding and fonts) */}
        <div style={{ position: 'absolute', right: 0, top: 10, width: '290px', height: '510px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', zIndex: 4 }}>
          {features.slice(3).map((f, idx) => {
            const realIdx = idx + 3;
            const isActive = activeFeature === realIdx;
            return (
              <div 
                key={realIdx}
                onMouseEnter={() => setActiveFeature(realIdx)}
                onMouseLeave={() => setActiveFeature(null)}
                style={{
                  background: 'white',
                  border: isActive ? '1.5px solid var(--c-red)' : '1.5px solid #e5e7eb',
                  boxShadow: isActive ? '0 12px 25px rgba(230,0,0,0.07)' : '0 4px 12px rgba(0,0,0,0.03)',
                  borderRadius: '12px',
                  padding: '0.75rem 0.9rem',
                  cursor: 'pointer',
                  textAlign: 'left',
                  transition: 'all 0.25s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                  transform: isActive ? 'translateY(-3px)' : 'none',
                  opacity: activeFeature === null || isActive ? 1 : 0.45
                }}
              >
                <h3 style={{ fontSize: '1rem', fontWeight: 800, color: isActive ? 'var(--c-red)' : 'var(--c-heading)', transition: 'color 0.2s', margin: '0 0 0.3rem 0' }}>{f.title}</h3>
                <p style={{ fontSize: '0.78rem', color: 'var(--c-text)', margin: 0, lineHeight: 1.45 }}>{f.desc}</p>
              </div>
            );
          })}
        </div>

      </div>

      {/* CSS Keyframe definition in inline style tag */}
      <style jsx global>{`
        @keyframes drawSvgLine {
          from {
            stroke-dashoffset: 600;
          }
          to {
            stroke-dashoffset: 0;
          }
        }
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
