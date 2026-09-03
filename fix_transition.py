import re

with open('src/components/PageTransition.tsx', 'r') as f:
    content = f.read()

old_variants = '''const pageVariants = {
  initial: { opacity: 0, y: 16 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.4, 0, 0.2, 1] },
  },
  exit: {
    opacity: 0,
    y: -16,
    transition: { duration: 0.3, ease: [0.4, 0, 1, 1] },
  },
};'''

new_variants = '''const pageVariants = {
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
};'''

content = content.replace(old_variants, new_variants)

with open('src/components/PageTransition.tsx', 'w') as f:
    f.write(content)
