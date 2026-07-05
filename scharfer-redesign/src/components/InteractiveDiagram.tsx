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

  // Layout bounds: width = 1400px, height = 700px
  // Left column width = 320px (bounds: 0px to 320px). x1 anchor at 330px.
  // Right column width = 320px (bounds: 1080px to 1400px). x1 anchor at 1070px.
  // Central area width = 760px (bounds: 320px to 1080px). Center is at 700px.
  // Central Zasilacz image width = 580px (centered around 700px, so spans 410px to 990px).
  // Hotspot coordinates are carefully chosen to lie physically on the large tilted zasilacz image.
  const features: Feature[] = [
    // Left side features (0, 1, 2)
    {
      title: 'Aluminiowa Obudowa',
      desc: 'Masywny odlew aluminiowy działający jako radiator. Całkowicie wyeliminowaliśmy wentylatory, gwarantując bezawaryjną i bezgłośną pracę.',
      x1: 330,
      y1: 110,
      x2: 600,
      y2: 320
    },
    {
      title: '100% Mocy Znamionowej',
      desc: 'Zaprojektowany do ciągłej pracy przy pełnym zadeklarowanym obciążeniu. Kupując zasilacz 150W, otrzymujesz realne 150W bez ugięć napięcia.',
      x1: 330,
      y1: 330,
      x2: 660,
      y2: 345
    },
    {
      title: 'Cicha Praca (Brak piszczenia)',
      desc: 'Wnętrze w 100% zalane żywicą epoksydową tłumi drgania cewek i filtrów. Zasilacz zachowuje bezwzględną ciszę, także przy ściemnianiu oświetlenia.',
      x1: 330,
      y1: 550,
      x2: 520,
      y2: 320
    },
    // Right side features (3, 4, 5, 6)
    {
      title: 'Klasa Szczelności IP67',
      desc: 'Hermetycznie zalana konstrukcja zapobiega wnikaniu wody, wilgoci i kurzu. Zasilacz może bezpiecznie pracować w najtrudniejszych warunkach zewnętrznych.',
      x1: 1070,
      y1: 80,
      x2: 780,
      y2: 350
    },
    {
      title: 'Zabezpieczenia SCP, OVP, OTP',
      desc: 'Aktywna i wielopoziomowa ochrona podłączonego oświetlenia LED przed skokami napięcia, zwarciem sieci oraz przegrzaniem z auto-restartem.',
      x1: 1070,
      y1: 230,
      x2: 860,
      y2: 395
    },
    {
      title: 'Aktywny Układ PFC (PF > 0.98)',
      desc: 'Kompensacja współczynnika mocy minimalizuje straty energetyczne i skutecznie eliminuje zakłócenia w systemach audio-video i domowym AGD.',
      x1: 1070,
      y1: 380,
      x2: 460,
      y2: 290
    },
    {
      title: '7 Lat Pełnej Gwarancji',
      desc: 'Pełna, bezwarunkowa 7-letnia ochrona dystrybutora. W przypadku usterki gwarantujemy natychmiastową wymianę na nowy produkt z magazynu w Polsce.',
      x1: 1070,
      y1: 530,
      x2: 720,
      y2: 330
    }
  ];

  return (
    <div style={{ width: '100%', overflowX: 'auto', paddingBottom: '20px', WebkitOverflowScrolling: 'touch' }}>
      <div style={{ position: 'relative', width: '1400px', height: '660px', margin: '0 auto', overflow: 'visible' }}>
        
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
                {/* Static subtle connecting line */}
                <line 
                  x1={f.x1} 
                  y1={f.y1} 
                  x2={f.x2} 
                  y2={f.y2} 
                  stroke={isActive ? 'var(--c-red)' : '#eaeaea'} 
                  strokeWidth={isActive ? '2.5' : '1.5'} 
                  strokeDasharray={isActive ? 'none' : '4,4'}
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
                    strokeWidth="3.5"
                    strokeDasharray="600"
                    strokeDashoffset="600"
                    style={{
                      animation: 'drawSvgLine 0.45s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards'
                    }}
                  />
                )}
              </g>
            );
          })}
        </svg>

        {/* Center Zasilacz Image - HUGE (580px width) */}
        <div 
          style={{ 
            position: 'absolute', 
            left: '700px', 
            top: '330px', 
            transform: 'translate(-50%, -50%)', 
            zIndex: 3, 
            width: '580px', 
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
              filter: 'drop-shadow(0 25px 50px rgba(0,0,0,0.18))'
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
                width: '24px',
                height: '24px',
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
                  border: '3px solid white',
                  boxShadow: '0 0 15px rgba(230,0,0,0.6)',
                  transition: 'all 0.3s ease',
                  transform: isActive ? 'scale(1.3)' : 'scale(1)'
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
                  opacity: 0.5,
                  zIndex: -1
                }}
              />
            </div>
          );
        })}

        {/* Left Column Features (Beautiful white cards with shadow and border transitions) */}
        <div style={{ position: 'absolute', left: 0, top: 10, width: '320px', height: '640px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', zIndex: 4 }}>
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
                  boxShadow: isActive ? '0 15px 35px rgba(230,0,0,0.09)' : '0 6px 18px rgba(0,0,0,0.04)',
                  borderRadius: '14px',
                  padding: '1.2rem',
                  cursor: 'pointer',
                  textAlign: 'right',
                  transition: 'all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                  transform: isActive ? 'translateY(-4px)' : 'none',
                  opacity: activeFeature === null || isActive ? 1 : 0.4
                }}
              >
                <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: isActive ? 'var(--c-red)' : 'var(--c-heading)', transition: 'color 0.2s', margin: '0 0 0.5rem 0' }}>{f.title}</h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--c-text)', margin: 0, lineHeight: 1.5 }}>{f.desc}</p>
              </div>
            );
          })}
        </div>

        {/* Right Column Features (Beautiful white cards with shadow and border transitions) */}
        <div style={{ position: 'absolute', right: 0, top: 10, width: '320px', height: '640px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', zIndex: 4 }}>
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
                  boxShadow: isActive ? '0 15px 35px rgba(230,0,0,0.09)' : '0 6px 18px rgba(0,0,0,0.04)',
                  borderRadius: '14px',
                  padding: '1.1rem 1.2rem',
                  cursor: 'pointer',
                  textAlign: 'left',
                  transition: 'all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                  transform: isActive ? 'translateY(-4px)' : 'none',
                  opacity: activeFeature === null || isActive ? 1 : 0.4
                }}
              >
                <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: isActive ? 'var(--c-red)' : 'var(--c-heading)', transition: 'color 0.2s', margin: '0 0 0.5rem 0' }}>{f.title}</h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--c-text)', margin: 0, lineHeight: 1.5 }}>{f.desc}</p>
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
            transform: scale(2.6);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}
