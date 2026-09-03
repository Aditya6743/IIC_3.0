import re

with open('src/components/Timeline.tsx', 'r') as f:
    content = f.read()

old_spotlight = '''// 3D Magical Spotlight Card
const SpotlightCard: React.FC<{ children: React.ReactNode; isDay2: boolean; className?: string; isLeft: boolean }> = ({ children, isDay2, className = "", isLeft }) => {
  const divRef = useRef<HTMLDivElement>(null);
  const [isFocused, setIsFocused] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const opacity = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!divRef.current || isFocused) return;
    const rect = divRef.current.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const color = isDay2 ? 'rgba(34, 211, 238, 0.4)' : 'rgba(16, 185, 129, 0.4)'; // Cyan or Emerald

  return (
    <motion.div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsFocused(true)}
      onMouseLeave={() => setIsFocused(false)}
      whileHover={{ scale: 1.03, y: -5 }}
      transition={{ type: "spring", stiffness: 400, damping: 30 }}
      className={`relative overflow-hidden rounded-2xl bg-black/40 backdrop-blur-xl border border-white/10 group ${className} hover:border-cyan-500/50 transition-colors duration-500`}
      style={{
        boxShadow: isFocused ? `0 20px 50px -10px ${isDay2 ? 'rgba(34,211,238,0.4)' : 'rgba(16,185,129,0.4)'}` : '0 10px 30px -10px rgba(0,0,0,0.5)'
      }}
    >
      {/* Spotlight Effect */}
      <div
        className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition duration-500 group-hover:opacity-100"
        style={{
          background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, ${color}, transparent 40%)`,
        }}
      />
      
      {/* Cyber Scanline Background */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPgo8cmVjdCB3aWR0aD0iNCIgaGVpZ2h0PSI0IiBmaWxsPSIjZmZmIiBmaWxsLW9wYWNpdHk9IjAuMDIiLz4KPC9zdmc+')] opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
      
      <div className="relative z-10 p-5 sm:p-7">
        {children}
      </div>
    </motion.div>
  );
};'''

new_spotlight = '''// 3D Magical Spotlight Tilt Card
const SpotlightCard: React.FC<{ children: React.ReactNode; isDay2: boolean; className?: string; isLeft: boolean }> = ({ children, isDay2, className = "", isLeft }) => {
  const divRef = useRef<HTMLDivElement>(null);
  const [isFocused, setIsFocused] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  // 3D Tilt state
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });
  
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["12deg", "-12deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-12deg", "12deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!divRef.current) return;
    const rect = divRef.current.getBoundingClientRect();
    
    // Spotlight position
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    
    // Tilt calculations (-0.5 to 0.5)
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = (mouseX / width) - 0.5;
    const yPct = (mouseY / height) - 0.5;
    
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    setIsFocused(false);
    x.set(0);
    y.set(0);
  };

  const color = isDay2 ? 'rgba(34, 211, 238, 0.4)' : 'rgba(16, 185, 129, 0.4)';

  return (
    <motion.div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsFocused(true)}
      onMouseLeave={handleMouseLeave}
      whileHover={{ scale: 1.05 }}
      transition={{ type: "spring", stiffness: 400, damping: 30 }}
      className={`relative rounded-2xl bg-black/60 backdrop-blur-xl border border-white/10 group ${className} hover:border-white/30 transition-colors duration-500`}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
        boxShadow: isFocused ? `0 30px 60px -12px ${isDay2 ? 'rgba(34,211,238,0.3)' : 'rgba(16,185,129,0.3)'}` : '0 10px 30px -10px rgba(0,0,0,0.5)'
      }}
    >
      {/* Spotlight Effect */}
      <div
        className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition duration-500 group-hover:opacity-100 overflow-hidden"
        style={{
          background: `radial-gradient(800px circle at ${position.x}px ${position.y}px, ${color}, transparent 40%)`,
          transform: "translateZ(1px)",
        }}
      />
      
      {/* Cyber Scanline Background */}
      <div 
        className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPgo8cmVjdCB3aWR0aD0iNCIgaGVpZ2h0PSI0IiBmaWxsPSIjZmZmIiBmaWxsLW9wYWNpdHk9IjAuMDIiLz4KPC9zdmc+')] opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-2xl overflow-hidden" 
        style={{ transform: "translateZ(1px)" }} 
      />
      
      <div 
        className="relative z-10 p-5 sm:p-7"
        style={{ transform: "translateZ(30px)" }}
      >
        {children}
      </div>
    </motion.div>
  );
};'''

if old_spotlight in content:
    content = content.replace(old_spotlight, new_spotlight)
    with open('src/components/Timeline.tsx', 'w') as f:
        f.write(content)
    print("Successfully replaced SpotlightCard!")
else:
    print("WARNING: Could not find old_spotlight block!")

