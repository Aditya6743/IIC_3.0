import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const MatrixEasterEgg: React.FC = () => {
  const [active, setActive] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const keysRef = useRef<string[]>([]);

  // Key sequence listener for "hack"
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore if user is typing in an input or textarea
      if (
        document.activeElement?.tagName === 'INPUT' ||
        document.activeElement?.tagName === 'TEXTAREA'
      ) {
        return;
      }

      keysRef.current.push(e.key.toLowerCase());
      
      // Keep only the last 4 keys
      if (keysRef.current.length > 4) {
        keysRef.current.shift();
      }
      
      // Check for the "hack" sequence
      if (keysRef.current.join('') === 'hack') {
        setActive(true);
        keysRef.current = []; // reset
      }
      
      // Allow escape to close it
      if (e.key === 'Escape' && active) {
        setActive(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [active]);

  // Matrix Rain Canvas Effect
  useEffect(() => {
    if (!active || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const setCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    setCanvasSize();

    const chars = '01';
    const fontSize = 18;
    let columns = canvas.width / fontSize;
    let drops: number[] = [];

    // Initialize drops
    for (let x = 0; x < columns; x++) {
      drops[x] = Math.random() * -100; // Random negative start to make it look organic
    }

    const draw = () => {
      // Translucent black to create the fading trail effect
      ctx.fillStyle = 'rgba(0, 0, 0, 0.08)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.font = `${fontSize}px monospace`;
      
      for (let i = 0; i < drops.length; i++) {
        // Randomly choose 0 or 1
        const text = chars.charAt(Math.floor(Math.random() * chars.length));
        
        // Randomly make some characters white for the leading edge
        if (Math.random() > 0.95) {
          ctx.fillStyle = '#fff';
        } else {
          ctx.fillStyle = '#0f0'; // Cyber green
        }

        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        // Reset drop to top randomly when it hits bottom
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    };

    const interval = setInterval(draw, 33);

    const handleResize = () => {
      setCanvasSize();
      columns = canvas.width / fontSize;
      // Adjust drops array if screen resized
      const newDrops = [];
      for (let x = 0; x < columns; x++) {
        newDrops[x] = drops[x] !== undefined ? drops[x] : 0;
      }
      drops = newDrops;
    };
    window.addEventListener('resize', handleResize);

    return () => {
      clearInterval(interval);
      window.removeEventListener('resize', handleResize);
    };
  }, [active]);

  return (
    <AnimatePresence>
      {active && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="fixed inset-0 z-[99999] pointer-events-auto bg-black cursor-crosshair"
          onClick={() => setActive(false)}
        >
          <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
          
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.5, type: 'spring' }}
              className="bg-black/80 border border-green-500/50 p-6 rounded-lg shadow-[0_0_30px_rgba(0,255,0,0.2)] backdrop-blur-sm text-center"
            >
              <h2 className="text-green-500 font-mono text-3xl md:text-4xl font-bold mb-2 tracking-widest drop-shadow-[0_0_10px_rgba(0,255,0,0.8)]">
                SYSTEM COMPROMISED
              </h2>
              <p className="text-green-400/70 font-mono text-sm tracking-widest">
                PRESS ESC OR CLICK ANYWHERE TO ABORT
              </p>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MatrixEasterEgg;
