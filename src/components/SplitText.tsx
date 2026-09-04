import React from 'react';
import { motion } from 'framer-motion';

interface SplitTextProps {
  text: string;
  delay?: number;
  className?: string;
  staggerDelay?: number;
  wordClassName?: string;
}

const SplitText: React.FC<SplitTextProps> = ({ 
  text, 
  delay = 0, 
  className = "", 
  staggerDelay = 0.05,
  wordClassName = ""
}) => {
  const words = text.split(" ");

  const wordVariants = {
    hidden: { opacity: 0, y: 20, filter: 'blur(8px)' },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: {
        delay: delay + (i * staggerDelay),
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1]
      }
    }),
  };

  return (
    <div className={`flex flex-wrap ${className}`}>
      {words.map((word, i) => (
        <motion.span
          key={`${word}-${i}`}
          custom={i}
          variants={wordVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className={`mr-[0.3em] inline-block ${wordClassName}`}
        >
          {word}
        </motion.span>
      ))}
    </div>
  );
};

export default SplitText;
