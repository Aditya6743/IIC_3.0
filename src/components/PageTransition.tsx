import React from 'react';
import { motion } from 'framer-motion';

const pageVariants = {
  initial: { opacity: 0, filter: 'blur(10px)', scale: 0.98 },
  animate: {
    opacity: 1,
    filter: 'blur(0px)',
    scale: 1,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }, // Ultra smooth Expo Out
  },
  exit: {
    opacity: 0,
    filter: 'blur(5px)',
    scale: 1.02,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
  },
};

interface PageTransitionProps {
  children: React.ReactNode;
}

const PageTransition: React.FC<PageTransitionProps> = ({ children }) => (
  <motion.div
    variants={pageVariants}
    initial="initial"
    animate="animate"
    exit="exit"
    style={{ width: '100%' }}
  >
    {children}
  </motion.div>
);

export default PageTransition;
