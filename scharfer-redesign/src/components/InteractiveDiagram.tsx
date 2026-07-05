'use client';
import { useState } from 'react';

interface Feature {
  title: string;
  desc: string;
  // Anchor on the text card
  x1: number;
  y1: number;
  // Hotspot on the zasilacz image
  x2: number;
  y2: number;
}

export default function InteractiveDiagram() {
  const [activeFeature, setActiveFeature] = useState<number | null>(null);

  const features: Feature[] = [
    // Left side features (0, 1, 2)
    {
      title: 'Aluminiowa Obudowa',
      desc: 'Masywny odlew aluminiowy działający jako pasywny radiator. Wyeliminowaliśmy wentylatory, gwarantując bezawaryjną i cichą pracę.',
      x1: 290,
      y1: 85,
      x2: 440,
      y2: 175
    },
    {
      title: '100% Mocy Znamionowej',
      desc: 'Pełne obciążenie bez spadków napięć. Kupując model 150W, otrzymujesz realne 150W stałego obciążenia w każdych warunkach.',
      x1: 290,
      y1: 260,
      x2: 390,
      y2: 215
    },
    {
      title: 'Cicha Praca (Brak piszczenia)',
      desc: 'Specjalny proces zalewania cewek i filtrów wejściowych eliminuje wibracje akustyczne i piszczenie przy ściemnianiu oświetlenia.',
      x1: 290,
      y1: 435,
      x2: 430,
      y2: 230
    },
    // Right side features (3, 4, 5, 6)
    {
      title: 'Klasa Szczelności IP67',
      desc: 'Wnętrze jest w 100% zalane żywicą epoksydową przewodzącą ciepło. Pełna ochrona przed ciągłym zanurzeniem w wodzie i pyłem.',
      x1: 710,
      y1: 65,
      x2: 580,
      y2: 205
    },
    {
      title: 'Zabezpieczenia SCP, OVP, OTP',
      desc: 'Aktywne systemy ochrony przed zwarciem, przepięciem i przegrzaniem z automatycznym powrotem do normalnej pracy po awarii.',
      x1: 710,
      y1: 185,
      x2: 620,
      y2: 230
    },
    {
      title: 'Aktywny Układ PFC (PF > 0.98)',
      desc: 'Kompensacja współczynnika mocy minimalizuje straty w sieci i eliminuje zakłócenia w domowych urządzeniach i systemach audio.',
      x1: 710,
      y1: 305,
      x2: 500,
      y2: 205
    },
    {
      title: '7 Lat Pełnej Gwarancji',
      desc: 'Bezwarunkowe wsparcie dla profesjonalistów i instalatorów. Ekspresowa wymiana wadliwego zasilacza na nowy z magazynu w Polsce.',
      x1: 710,
      y1: 425,
      x2: 460,
      y2: 195
    }
  ];

  return (
    <div style={{ position: 'relative', width: '100%', maxWidth: '1080px', height: '520px', margin: '0 auto', overflow: 'visible' }}>
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
                stroke={isActive ? 'var(--c-red)' : '#e5e7eb'} 
                strokeWidth={isActive ? '2' : '1'} 
                strokeDasharray={isActive ? 'none' : '3,3'}
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
                  strokeWidth="2.5"
                  strokeDasharray="400"
                  strokeDashoffset="400"
                  style={{
                    animation: 'drawSvgLine 0.4s cubic-bezier(0.4, 0, 0.2, 1) forwards'
                  }}
                />
              )}
            </g>
          );
        })}
      </svg>

      {/* Center Image */}
      <div 
        style={{ 
          position: 'absolute', 
          left: '50%', 
          top: '50%', 
          transform: 'translate(-50%, -50%)', 
          zIndex: 3, 
          width: '280px', // slightly smaller to give more space and prevent overlap
          textAlign: 'center'
        }}
      >
        <img 
          src="/assets/40012.png" 
          alt="Zasilacz Scharfer 12V 400W" 
          style={{ 
            width: '100%', 
            height: 'auto', 
            objectFit: 'contain', 
            filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.12))',
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
              width: '16px',
              height: '16px',
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
                border: '2px solid white',
                boxShadow: '0 0 10px rgba(230,0,0,0.5)',
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
                opacity: 0.4,
                zIndex: -1
              }}
            />
          </div>
        );
      })}

      {/* Left Column Features (Beautiful Static Cards) */}
      <div style={{ position: 'absolute', left: 0, top: 0, width: '270px', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', zIndex: 4 }}>
        {features.slice(0, 3).map((f, idx) => {
          const isActive = activeFeature === idx;
          return (
            <div 
              key={idx}
              onMouseEnter={() => setActiveFeature(idx)}
              onMouseLeave={() => setActiveFeature(null)}
              style={{
                background: 'white',
                border: isActive ? '1px solid var(--c-red)' : '1px solid #e5e7eb',
                boxShadow: isActive ? '0 10px 25px rgba(230,0,0,0.08)' : '0 4px 12px rgba(0,0,0,0.03)',
                borderRadius: '12px',
                padding: '1rem',
                cursor: 'pointer',
                textAlign: 'right',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                transform: isActive ? 'translateY(-3px)' : 'none',
                opacity: activeFeature === null || isActive ? 1 : 0.4
              }}
            >
              <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: isActive ? 'var(--c-red)' : 'var(--c-heading)', transition: 'color 0.2s', margin: '0 0 0.4rem 0' }}>{f.title}</h3>
              <p style={{ fontSize: '0.8rem', color: 'var(--c-text)', margin: 0, lineHeight: 1.45 }}>{f.desc}</p>
            </div>
          );
        })}
      </div>

      {/* Right Column Features (Beautiful Static Cards) */}
      <div style={{ position: 'absolute', right: 0, top: 0, width: '270px', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', zIndex: 4 }}>
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
                border: isActive ? '1px solid var(--c-red)' : '1px solid #e5e7eb',
                boxShadow: isActive ? '0 10px 25px rgba(230,0,0,0.08)' : '0 4px 12px rgba(0,0,0,0.03)',
                borderRadius: '12px',
                padding: '0.9rem 1rem',
                cursor: 'pointer',
                textAlign: 'left',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                transform: isActive ? 'translateY(-3px)' : 'none',
                opacity: activeFeature === null || isActive ? 1 : 0.4
              }}
            >
              <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: isActive ? 'var(--c-red)' : 'var(--c-heading)', transition: 'color 0.2s', margin: '0 0 0.4rem 0' }}>{f.title}</h3>
              <p style={{ fontSize: '0.8rem', color: 'var(--c-text)', margin: 0, lineHeight: 1.45 }}>{f.desc}</p>
            </div>
          );
        })}
      </div>

      {/* CSS Keyframe definition in inline style tag */}
      <style jsx global>{`
        @keyframes drawSvgLine {
          from {
            stroke-dashoffset: 400;
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
