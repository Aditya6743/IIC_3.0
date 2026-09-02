import React, { useEffect, useRef } from 'react';

const SpotlightGridBackground: React.FC = () => {
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let glowX = mouseX;
    let glowY = mouseY;
    let rafId: number;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const animate = () => {
      // Smooth tracking for the ambient glow
      glowX += (mouseX - glowX) * 0.08;
      glowY += (mouseY - glowY) * 0.08;

      if (glowRef.current) {
        glowRef.current.style.transform = `translate(${glowX - 400}px, ${glowY - 400}px)`;
      }
      rafId = requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', onMouseMove);
    rafId = requestAnimationFrame(animate);
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      cancelAnimationFrame(rafId);
    };
  }, []);

  // Generate deterministic but random-looking beams so they don't jump on re-renders
  const verticalBeams = Array.from({ length: 25 }).map((_, i) => {
    // The background grid is 80px. We map each beam to an exact 80px multiple
    // (i * 7 + 3) % 45 gives pseudo-random grid line indices from 0 to 44 (covering up to 3600px screen width)
    const gridIndex = (i * 7 + 3) % 45;
    return {
      id: `v-${i}`,
      left: `calc(80px * ${gridIndex})`, 
      duration: (i % 5) + 6, // 6 to 10 seconds (slower and more graceful)
      delay: -((i * 1.7) % 15), // Negative delay starts the animation instantly mid-cycle
      color: i % 2 === 0 ? 'via-cyan-400' : 'via-emerald-400',
      shadow: i % 2 === 0 ? 'rgba(34,211,238,0.5)' : 'rgba(16,185,129,0.5)'
    };
  });

  const horizontalBeams = Array.from({ length: 20 }).map((_, i) => {
    // (i * 5 + 2) % 30 gives indices from 0 to 29 (covering up to 2400px screen height)
    const gridIndex = (i * 5 + 2) % 30;
    return {
      id: `h-${i}`,
      top: `calc(80px * ${gridIndex})`,
      duration: (i % 5) + 7, // 7 to 11 seconds
      delay: -((i * 2.1) % 15),
      color: i % 2 === 0 ? 'via-cyan-400' : 'via-purple-400',
      shadow: i % 2 === 0 ? 'rgba(34,211,238,0.5)' : 'rgba(168,85,247,0.5)'
    };
  });

  return (
    <div className="fixed inset-0 z-0 overflow-hidden bg-[#000000] pointer-events-none">
      
      {/* 1. Base Perspective Grid */}
      <div 
        className="absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage: `
            linear-gradient(to right, #ffffff 1px, transparent 1px), 
            linear-gradient(to bottom, #ffffff 1px, transparent 1px)
          `,
          backgroundSize: '80px 80px',
        }}
      />

      {/* 2. Top Edge Glow for depth */}
      <div className="absolute top-[-30%] left-[10%] right-[10%] h-[600px] bg-cyan-500/20 blur-[150px] rounded-full mix-blend-screen" />
      <div className="absolute top-[-20%] left-[30%] right-[30%] h-[400px] bg-emerald-500/10 blur-[120px] rounded-full mix-blend-screen" />

      {/* 3. Mouse-following ambient glow */}
      <div 
        ref={glowRef}
        className="absolute top-0 left-0 w-[800px] h-[800px] rounded-full blur-[150px] opacity-40 mix-blend-screen will-change-transform"
        style={{
          background: 'radial-gradient(circle, rgba(34,211,238,0.15) 0%, rgba(16,185,129,0.05) 50%, transparent 70%)',
        }}
      />

      
        {/* 4. Animated Vertical Data Streams */}
      {verticalBeams.map((beam) => (
        <div
          key={beam.id}
          className={`absolute top-[-200px] w-[1px] h-[200px] bg-gradient-to-b from-transparent ${beam.color} to-transparent`}
          style={{
            left: beam.left,
            animation: `shoot-down ${beam.duration}s linear infinite`,
            animationDelay: `${beam.delay}s`,
            boxShadow: `0 0 20px 2px ${beam.shadow}`,
            willChange: 'transform, opacity'
          }}
        />
      ))}

      {/* 5. Animated Horizontal Data Streams */}
      {horizontalBeams.map((beam) => (
        <div
          key={beam.id}
          className={`absolute left-[-300px] h-[1px] w-[300px] bg-gradient-to-r from-transparent ${beam.color} to-transparent`}
          style={{
            top: beam.top,
            animation: `shoot-right ${beam.duration}s linear infinite`,
            animationDelay: `${beam.delay}s`,
            boxShadow: `0 0 20px 2px ${beam.shadow}`,
            willChange: 'transform, opacity'
          }}
        />
      ))}

      
{/* 6. Deep Vignette Overlay (focuses attention to the center) */}
      <div 
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(circle at 50% 40%, transparent 20%, #000000 100%)'
        }}
      />

      {/* CSS Keyframes for the light beams */}
      <style>{`
        @keyframes shoot-down {
          0% { transform: translateY(-100px); opacity: 0; }
          10% { opacity: 1; }
          80% { opacity: 1; }
          100% { transform: translateY(110vh); opacity: 0; }
        }
        @keyframes shoot-right {
          0% { transform: translateX(-300px); opacity: 0; }
          10% { opacity: 1; }
          80% { opacity: 1; }
          100% { transform: translateX(110vw); opacity: 0; }
        }
      `}</style>
    </div>
  );
};

export default SpotlightGridBackground;
