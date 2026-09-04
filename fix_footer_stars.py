import re

with open('src/components/Footer.tsx', 'r') as f:
    content = f.read()

old_sparkles = '''const Sparkles = () => {
  const sparkles = Array.from({ length: 60 });
  return (
    <div className="absolute top-0 left-0 right-0 h-0 z-20 overflow-visible pointer-events-none">
      {sparkles.map((_, i) => {
        const isCyan = Math.random() > 0.4;
        const color = isCyan ? '#22d3ee' : '#10b981'; // cyan-400 or emerald-500
        const shadow = isCyan ? 'rgba(34,211,238,0.8)' : 'rgba(16,185,129,0.8)';
        const size = Math.random() * 3 + 1.5; // 1px to 3px
        return (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: '0px',
              width: `${size}px`,
              height: `${size}px`,
              backgroundColor: color,
              boxShadow: `0 0 ${size * 4}px ${size}px ${shadow}`
            }}
            initial={{ opacity: 0, y: 0, scale: 0 }}
            animate={{
              opacity: [0, 1, 0],
              scale: [0, 1.2, 0],
              y: [0, Math.random() * -30 - 10], // Float up between 10px and 40px
              x: [0, (Math.random() - 0.5) * 20] // Drift left or right slightly
            }}
            transition={{
              duration: Math.random() * 2 + 1.5, // 1.5s to 3.5s
              repeat: Infinity,
              delay: Math.random() * 4,
              ease: "easeOut"
            }}
          />
        );
      })}
    </div>
  );
};'''

new_sparkles = '''// Simple seeded random function to keep stars deterministic
const random = (seed: number) => {
  const x = Math.sin(seed * 12.9898 + 78.233) * 43758.5453;
  return x - Math.floor(x);
};

const Sparkles = () => {
  const sparkles = Array.from({ length: 60 });
  return (
    <div className="absolute top-0 left-0 right-0 h-0 z-20 overflow-visible pointer-events-none">
      {sparkles.map((_, i) => {
        // Use deterministic random values based on the index `i`
        const r1 = random(i);
        const r2 = random(i + 100);
        const r3 = random(i + 200);
        const r4 = random(i + 300);
        const r5 = random(i + 400);

        const isCyan = r1 > 0.4;
        const color = isCyan ? '#22d3ee' : '#10b981'; // cyan-400 or emerald-500
        const shadow = isCyan ? 'rgba(34,211,238,0.8)' : 'rgba(16,185,129,0.8)';
        const size = r2 * 3 + 1.5; // 1px to 4.5px
        return (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              left: `${r3 * 100}%`,
              top: '0px',
              width: `${size}px`,
              height: `${size}px`,
              backgroundColor: color,
              boxShadow: `0 0 ${size * 4}px ${size}px ${shadow}`
            }}
            initial={{ opacity: 0, y: 0, scale: 0 }}
            animate={{
              opacity: [0, 1, 0],
              scale: [0, 1.2, 0],
              y: [0, r4 * -30 - 10], // Float up between 10px and 40px
              x: [0, (r5 - 0.5) * 20] // Drift left or right slightly
            }}
            transition={{
              duration: random(i + 500) * 2 + 1.5, // 1.5s to 3.5s
              repeat: Infinity,
              delay: random(i + 600) * 4,
              ease: "easeOut"
            }}
          />
        );
      })}
    </div>
  );
};'''

if old_sparkles in content:
    content = content.replace(old_sparkles, new_sparkles)
    with open('src/components/Footer.tsx', 'w') as f:
        f.write(content)
    print("Replaced successfully")
else:
    print("ERROR: Did not match old sparkles string")
