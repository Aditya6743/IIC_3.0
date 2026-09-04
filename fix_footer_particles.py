import re

with open('src/components/Footer.tsx', 'r') as f:
    content = f.read()

old_particles = '''const FooterParticles = () => {
  const particles = Array.from({ length: 80 });
  return (
    <div className="absolute inset-0 z-[5] overflow-hidden pointer-events-none">
      <style>{`
        @keyframes twinkle-particle {
          0%, 100% { opacity: 0; transform: scale(0.8); }
          50% { opacity: var(--max-opacity); transform: scale(var(--max-scale)); }
        }
      `}</style>
      {particles.map((_, i) => {
        const isCyan = Math.random() > 0.5;
        const color = isCyan ? "#22d3ee" : "#10b981";
        const size = Math.random() * 3 + 1.5;
        return (
          <div
            key={`fp-${i}`}
            className="absolute rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${size}px`,
              height: `${size}px`,
              backgroundColor: color,
              boxShadow: `0 0 ${size * 3}px ${size}px ${isCyan ? "rgba(34,211,238,0.5)" : "rgba(16,185,129,0.5)"}`,
              "--max-opacity": Math.random() * 0.6 + 0.4,
              "--max-scale": Math.random() + 1,
              animation: `twinkle-particle ${3 + Math.random() * 4}s ease-in-out ${Math.random() * 2}s infinite`,
              willChange: "opacity, transform"
            } as React.CSSProperties}
          />
        );
      })}
    </div>
  );
};'''

new_particles = '''const FooterParticles = () => {
  const particles = Array.from({ length: 80 });
  return (
    <div className="absolute inset-0 z-[5] overflow-hidden pointer-events-none">
      <style>{`
        @keyframes twinkle-particle {
          0%, 100% { opacity: 0; transform: scale(0.8); }
          50% { opacity: var(--max-opacity); transform: scale(var(--max-scale)); }
        }
      `}</style>
      {particles.map((_, i) => {
        const r1 = random(i * 7 + 10);
        const r2 = random(i * 11 + 20);
        const r3 = random(i * 13 + 30);
        const r4 = random(i * 17 + 40);
        const r5 = random(i * 19 + 50);
        const r6 = random(i * 23 + 60);
        const r7 = random(i * 29 + 70);
        const r8 = random(i * 31 + 80);
        
        const isCyan = r1 > 0.5;
        const color = isCyan ? "#22d3ee" : "#10b981";
        const size = r2 * 3 + 1.5;
        return (
          <div
            key={`fp-${i}`}
            className="absolute rounded-full"
            style={{
              left: `${r3 * 100}%`,
              top: `${r4 * 100}%`,
              width: `${size}px`,
              height: `${size}px`,
              backgroundColor: color,
              boxShadow: `0 0 ${size * 3}px ${size}px ${isCyan ? "rgba(34,211,238,0.5)" : "rgba(16,185,129,0.5)"}`,
              "--max-opacity": r5 * 0.6 + 0.4,
              "--max-scale": r6 + 1,
              animation: `twinkle-particle ${3 + r7 * 4}s ease-in-out ${r8 * 2}s infinite`,
              willChange: "opacity, transform"
            } as React.CSSProperties}
          />
        );
      })}
    </div>
  );
};'''

content = content.replace(old_particles, new_particles)

with open('src/components/Footer.tsx', 'w') as f:
    f.write(content)
print("Replaced successfully")
