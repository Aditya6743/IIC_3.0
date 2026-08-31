import React, { useEffect } from 'react';
import { playHoverSound, playClickSound } from '../utils/audio';

const AudioProvider: React.FC = () => {
  useEffect(() => {
    let lastHovered: Element | null = null;

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      // Find the closest interactive element
      const interactiveEl = target.closest('a, button, [role="button"], input, select, summary, .interactive');
      
      if (interactiveEl && interactiveEl !== lastHovered) {
        playHoverSound();
        lastHovered = interactiveEl;
      } else if (!interactiveEl) {
        lastHovered = null;
      }
    };

    const handleMouseDown = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('a, button, [role="button"], input, select, summary, .interactive')) {
        playClickSound();
      }
    };

    // Use capturing phase for mouseover to ensure we catch it early
    window.addEventListener('mouseover', handleMouseOver, { passive: true });
    window.addEventListener('mousedown', handleMouseDown, { passive: true });

    return () => {
      window.removeEventListener('mouseover', handleMouseOver);
      window.removeEventListener('mousedown', handleMouseDown);
    };
  }, []);

  // This component doesn't render any DOM elements
  return null;
};

export default AudioProvider;
