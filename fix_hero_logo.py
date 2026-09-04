import re

with open('src/components/Hero.tsx', 'r') as f:
    content = f.read()

# Update Hero Logo wrapper to have hover effect
old_wrapper = '''<motion.div
                  animate={{ rotateY: flipDegrees }}
                  transition={{ duration: 1.2, type: "spring", stiffness: 60, damping: 15 }}
                  onDoubleClick={() => setFlipDegrees(prev => prev + 360)}
                  style={{ transformStyle: 'preserve-3d' }}
                >'''

new_wrapper = '''<motion.div
                  animate={{ rotateY: flipDegrees }}
                  transition={{ duration: 1.2, type: "spring", stiffness: 60, damping: 15 }}
                  onDoubleClick={() => setFlipDegrees(prev => prev + 360)}
                  whileHover={{ scale: 1.05 }}
                  style={{ transformStyle: 'preserve-3d', cursor: 'grab' }}
                  whileTap={{ cursor: 'grabbing', scale: 0.95 }}
                >'''
content = content.replace(old_wrapper, new_wrapper)

# Update the Image drop-shadow
old_img = 'className="w-full h-auto object-contain drop-shadow-[0_20px_50px_rgba(34,211,238,0.3)]"'
new_img = 'className="w-full h-auto object-contain drop-shadow-[0_20px_50px_rgba(34,211,238,0.4)] transition-all duration-500 hover:drop-shadow-[0_20px_60px_rgba(34,211,238,0.7)] hover:brightness-110"'
content = content.replace(old_img, new_img)

with open('src/components/Hero.tsx', 'w') as f:
    f.write(content)

