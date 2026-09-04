import re

with open('src/components/Hero.tsx', 'r') as f:
    content = f.read()

# Replace the img drop-shadow and insert a background glow div
old_img = '''<motion.img
                    src="/hero-iic.png"
                    alt="IIC 3.0 3D Logo"
                    className="w-full h-auto object-contain drop-shadow-[0_20px_50px_rgba(34,211,238,0.4)] transition-[filter] duration-500 hover:drop-shadow-[0_20px_60px_rgba(34,211,238,0.7)] hover:brightness-110"
                    animate={{ y: [0, -15, 0] }}
                    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                    style={{ transform: 'translateZ(60px)' }}
                  />'''

new_img = '''{/* Dedicated hardware-accelerated glow (avoids drop-shadow flickering) */}
                  <div className="absolute inset-0 w-full h-full bg-cyan-400/20 blur-[60px] rounded-full transition-opacity duration-500 opacity-50 group-hover:opacity-100" style={{ transform: 'translateZ(20px)' }} />
                  
                  {/* Continuous Float Animation */}
                  <motion.img
                    src="/hero-iic.png"
                    alt="IIC 3.0 3D Logo"
                    className="relative w-full h-auto object-contain transition-[filter] duration-500 hover:brightness-110"
                    animate={{ y: [0, -15, 0] }}
                    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                    style={{ transform: 'translateZ(60px)' }}
                  />'''

content = content.replace(old_img, new_img)

# Also add 'group' to the wrapper so hover works
content = content.replace("whileTap={{ cursor: 'grabbing', scale: 0.95 }}", "whileTap={{ cursor: 'grabbing', scale: 0.95 }}\n                  className=\"group relative\"")


with open('src/components/Hero.tsx', 'w') as f:
    f.write(content)
