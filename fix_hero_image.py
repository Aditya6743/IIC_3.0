import re

with open('src/components/Hero.tsx', 'r') as f:
    content = f.read()

# Add clip-path to crop out the baked-in purple lines from the image
old_img = r'''                  <motion\.img
                    src="/hero-iic\.png"
                    alt="IIC 3\.0 3D Logo"
                    className="relative w-full h-auto object-contain transition-\[filter\] duration-500 hover:brightness-110"'''

new_img = '''                  <motion.img
                    src="/hero-iic.png"
                    alt="IIC 3.0 3D Logo"
                    className="relative w-full h-auto object-contain transition-[filter] duration-500 hover:brightness-110"
                    style={{ transform: 'translateZ(60px)', clipPath: 'inset(0 15% 0 15%)' }}'''

# Remove the inline style from original since we just merged it
content = re.sub(old_img + r'\n                    animate=\{\{ y: \[0, -15, 0\] \}\}\n                    transition=\{\{ duration: 6, repeat: Infinity, ease: "easeInOut" \}\}\n                    style=\{\{ transform: \'translateZ\(60px\)\' \}\}',
                  new_img + '\n                    animate={{ y: [0, -15, 0] }}\n                    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}', content)


with open('src/components/Hero.tsx', 'w') as f:
    f.write(content)
