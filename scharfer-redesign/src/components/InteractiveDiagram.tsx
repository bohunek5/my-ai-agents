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
      desc: 'Masywny odlew aluminiowy działający jako pasywny radiator. Wyeliminowaliśmy wentylatory, gwarantując cichą bezawaryjną pracę na lata.',
      x1: 300,
      y1: 90,
      x2: 440,
      y2: 175
    },
    {
      title: '100% Mocy Znamionowej',
      desc: 'Pełne obciążenie bez spadków napięć. Kupując zasilacz 150W, otrzymujesz realne 150W stałego obciążenia w każdych warunkach termicznych.',
      x1: 300,
      y1: 210,
      x2: 400,
      y2: 215
    },
    {
      title: 'Cicha Praca (Brak piszczenia)',
      desc: 'Specjalny proces zalewania cewek i filtrów wejściowych eliminuje wibracje akustyczne i piszczenie zasilacza przy ściemnianiu.',
      x1: 300,
      y1: 330,
      x2: 430,
      y2: 210
    },
    // Right side features (3, 4, 5, 6)
    {
      title: 'Klasa Szczelności IP67',
      desc: 'Wnętrze jest w 100% zalane żywicą epoksydową przewodzącą ciepło. Pełna ochrona przed ciągłym zanurzeniem w wodzie, deszczem i kurzem.',
      x1: 700,
      y1: 90,
      x2: 580,
      y2: 205
    },
    {
      title: 'Zabezpieczenia SCP, OVP, OTP',
      desc: 'Aktywne systemy ochrony przed zwarciem, przepięciem i przegrzaniem z automatycznym powrotem do normalnej pracy po usunięciu usterki.',
      x1: 700,
      y1: 200,
      x2: 620,
      y2: 230
    },
    {
      title: 'Aktywny Układ PFC (PF > 0.98)',
      desc: 'Kompensacja współczynnika mocy minimalizuje straty w sieci i eliminuje zakłócenia w urządzeniach domowych oraz systemach audio-video.',
      x1: 700,
      y1: 290,
      x2: 500,
      y2: 200
    },
    {
      title: '7 Lat Pełnej Gwarancji',
      desc: 'Bezwarunkowe wsparcie dla profesjonalistów i instalatorów. Ekspresowa wymiana wadliwego zasilacza na nowy bezpośrednio z magazynu w Polsce.',
      x1: 700,
      y1: 370,
      x2: 460,
      y2: 195
    }
  ];

  return (
    <div style={{ position: 'relative', width: '100%', maxWidth: '1080px', height: '480px', margin: '0 auto' }}>
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
          width: '340px',
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
            transition: 'transform 0.4s ease'
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

      {/* Left Column Features */}
      <div style={{ position: 'absolute', left: 0, top: 0, width: '280px', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', zIndex: 4, padding: '10px 0' }}>
        {features.slice(0, 3).map((f, idx) => {
          const isActive = activeFeature === idx;
          return (
            <div 
              key={idx}
              onMouseEnter={() => setActiveFeature(idx)}
              onMouseLeave={() => setActiveFeature(null)}
              style={{
                background: isActive ? 'white' : 'transparent',
                border: isActive ? '1px solid #eee' : '1px solid transparent',
                boxShadow: isActive ? '0 10px 20px rgba(0,0,0,0.04)' : 'none',
                borderRadius: '8px',
                padding: '0.8rem',
                cursor: 'pointer',
                textAlign: 'right',
                transition: 'all 0.3s ease',
                opacity: activeFeature === null || isActive ? 1 : 0.3
              }}
            >
              <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: isActive ? 'var(--c-red)' : 'var(--c-heading)', transition: 'color 0.2s', margin: '0 0 0.3rem 0' }}>{f.title}</h3>
              <div style={{ 
                maxHeight: isActive ? '100px' : '0px', 
                overflow: 'hidden', 
                transition: 'all 0.3s ease-in-out',
                opacity: isActive ? 1 : 0
              }}>
                <p style={{ fontSize: '0.82rem', color: 'var(--c-text)', margin: 0, lineHeight: 1.4 }}>{f.desc}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Right Column Features */}
      <div style={{ position: 'absolute', right: 0, top: 0, width: '280px', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', zIndex: 4, padding: '10px 0' }}>
        {features.slice(3).map((f, idx) => {
          const realIdx = idx + 3;
          const isActive = activeFeature === realIdx;
          return (
            <div 
              key={realIdx}
              onMouseEnter={() => setActiveFeature(realIdx)}
              onMouseLeave={() => setActiveFeature(null)}
              style={{
                background: isActive ? 'white' : 'transparent',
                border: isActive ? '1px solid #eee' : '1px solid transparent',
                boxShadow: isActive ? '0 10px 20px rgba(0,0,0,0.04)' : 'none',
                borderRadius: '8px',
                padding: '0.8rem',
                cursor: 'pointer',
                textAlign: 'left',
                transition: 'all 0.3s ease',
                opacity: activeFeature === null || isActive ? 1 : 0.3
              }}
            >
              <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: isActive ? 'var(--c-red)' : 'var(--c-heading)', transition: 'color 0.2s', margin: '0 0 0.3rem 0' }}>{f.title}</h3>
              <div style={{ 
                maxHeight: isActive ? '100px' : '0px', 
                overflow: 'hidden', 
                transition: 'all 0.3s ease-in-out',
                opacity: isActive ? 1 : 0
              }}>
                <p style={{ fontSize: '0.82rem', color: 'var(--c-text)', margin: 0, lineHeight: 1.4 }}>{f.desc}</p>
              </div>
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
