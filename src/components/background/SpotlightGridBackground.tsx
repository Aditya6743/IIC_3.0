import React, { useEffect, useRef, useCallback } from 'react';
import Particles from 'react-tsparticles';
import { loadFull } from 'tsparticles';
import type { Engine } from 'tsparticles-engine';

const SpotlightGridBackground: React.FC = () => {
  const spotlightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // 1. Update the main circular spotlight (reduced size)
      if (spotlightRef.current) {
        const x = e.clientX - 140;
        const y = e.clientY - 140;
        spotlightRef.current.style.transform = `translate(${x}px, ${y}px)`;
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const particlesInit = useCallback(async (engine: Engine) => {
    await loadFull(engine);
  }, []);

  return (
    <div className="fixed inset-0 w-full h-full z-0 overflow-hidden pointer-events-auto bg-[#030f14]">
      
      {/* 
        The Spotlight 
        A very soft radial gradient tracking the mouse.
      */}
      <div
        ref={spotlightRef}
        className="absolute top-0 left-0 w-[280px] h-[280px] rounded-full pointer-events-none will-change-transform z-[1]"
        style={{
          background: 'radial-gradient(circle, rgba(14, 165, 233, 0.08) 0%, rgba(217, 70, 239, 0.02) 40%, transparent 70%)',
          transform: 'translate(-140px, -140px)', // Initial hidden state
          transition: 'opacity 0.3s ease',
        }}
      />

      {/* 
        The Container 
      */}
      <div className="absolute inset-0 w-full h-full z-[2]">
        {/* 
          Constellation Particles layered on top of the background
        */}
        <div className="absolute inset-0 pointer-events-auto">
          <Particles
            id="tsparticles-grid"
            init={particlesInit}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
            }}
            options={{
              fullScreen: { enable: false },
              background: {
                color: {
                  value: 'transparent',
                },
              },
              fpsLimit: 120,
              interactivity: {
                events: {
                  onClick: {
                    enable: true,
                    mode: 'push',
                  },
                  onHover: {
                    enable: true,
                    mode: ['grab', 'slow'],
                  },
                  resize: true,
                },
                modes: {
                  grab: {
                    distance: 160,
                    links: {
                      opacity: 0.6,
                      color: '#ff1493', // Pink matching theme
                    },
                  },
                  slow: {
                    factor: 3,
                    radius: 150,
                  },
                  push: {
                    quantity: 3,
                  },
                },
              },
              particles: {
                color: {
                  value: '#00ffff', // Cyan matching theme
                },
                links: {
                  color: '#a855f7', // Purple matching theme
                  distance: 160,
                  enable: true,
                  opacity: 0.35,
                  width: 1.2,
                },
                collisions: {
                  enable: false,
                },
                move: {
                  direction: 'none',
                  enable: true,
                  outModes: {
                    default: 'bounce',
                  },
                  random: true,
                  speed: 0.8,
                  straight: false,
                },
                number: {
                  density: {
                    enable: true,
                    area: 1200,
                  },
                  value: 60,
                },
                opacity: {
                  value: 0.5,
                },
                shape: {
                  type: 'circle',
                },
                size: {
                  value: { min: 1, max: 2.5 },
                },
              },
              detectRetina: true,
            }}
          />
        </div>
      </div>

      {/* Soft vignette overlay to fade the edges into darkness */}
      <div 
        className="absolute inset-0 pointer-events-none z-[4]"
        style={{
          background: 'radial-gradient(circle at center, transparent 40%, #030f14 100%)'
        }}
      />
    </div>
  );
};

export default SpotlightGridBackground;
