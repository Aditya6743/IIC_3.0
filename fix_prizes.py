import re

with open('src/components/Prizes.tsx', 'r') as f:
    content = f.read()

# Add needed imports
if 'useMotionValue' not in content:
    content = content.replace("import { motion, useInView } from 'framer-motion';", "import { motion, useInView, useMotionValue, useSpring, useTransform } from 'framer-motion';\nimport { useState } from 'react';")

# Extract the PrizeCard component
prize_card_comp = '''const InteractivePrizeCard = ({ prize, index, isInView }: any) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };
  
  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      whileHover={{ y: -15, scale: 1.02 }}
      className={`${prize.order} ${prize.scale} transition-all duration-300 relative group`}
      variants={fadeUp}
      initial="initial"
      animate={isInView ? 'animate' : 'initial'}
      transition={{ duration: 0.5, delay: 0.15 + index * 0.1 }}
    >
      <Card
        className={`relative overflow-hidden text-center p-8 border ${prize.borderColor} bg-black/40 backdrop-blur-xl h-full transition-all duration-300 ${prize.featured ? 'shadow-[0_0_30px_rgba(255,165,0,0.2)]' : 'hover:shadow-glass-hover'}`}
      >
        {/* Holographic Glare Effect */}
        <motion.div 
          className="pointer-events-none absolute -inset-px opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20 mix-blend-screen"
          style={{
            background: useTransform(
              [mouseX, mouseY],
              ([x, y]) => `radial-gradient(400px circle at ${x}px ${y}px, rgba(255,255,255,0.15), transparent 40%)`
            )
          }}
        />
        
        {/* Background gradient tint */}
        <div
          className={`absolute inset-0 bg-gradient-to-br ${prize.gradient} opacity-5 group-hover:opacity-15 transition-opacity duration-500`}
          aria-hidden="true"
        />

        {/* Featured badge */}
        {prize.featured && (
          <div className="absolute -top-1 left-1/2 -translate-x-1/2 z-30">
            <span className="inline-flex items-center gap-1 px-3 py-1 text-xs font-semibold bg-gradient-to-r from-yellow-400 to-orange-500 text-black rounded-full shadow-[0_0_15px_rgba(255,165,0,0.5)]">
              <Zap size={10} aria-hidden="true" />
              Top Prize
            </span>
          </div>
        )}

        <CardContent className="p-0 relative z-10 flex flex-col items-center">
          <div className="inline-flex items-center justify-center bg-gradient-to-br from-white/5 to-white/10 p-5 rounded-full mb-5 transition-transform duration-500 group-hover:scale-110 group-hover:shadow-[0_0_20px_rgba(255,255,255,0.1)]">
            {prize.icon}
          </div>
          <h3 className="text-lg font-bold text-gray-300 mb-2">
            {prize.position}
          </h3>
          <div className="text-5xl font-black bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400 mb-3 group-hover:from-white group-hover:to-white transition-colors duration-300">
            {prize.prize}
          </div>
          <p className="text-sm font-medium text-gray-400 uppercase tracking-widest">
            {prize.description}
          </p>
        </CardContent>
      </Card>
    </motion.div>
  );
};
'''

# Replace the mapping
old_map = '''        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto items-end">
          {prizes.map((prize, index) => (
            <motion.div
              key={index}
              className={`${prize.order} ${prize.scale} transition-transform duration-300`}
              variants={fadeUp}
              initial="initial"
              animate={isInView ? 'animate' : 'initial'}
              transition={{ duration: 0.55, delay: 0.15 + index * 0.12 }}
            >
              <Card
                className={`relative overflow-hidden text-center p-8 group border ${prize.borderColor} transition-all duration-300 ${prize.featured ? 'shadow-glass-hover' : ''}`}
              >
                {/* Background gradient tint */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${prize.gradient} opacity-5 group-hover:opacity-10 transition-opacity duration-300`}
                  aria-hidden="true"
                />

                {/* Featured badge */}
                {prize.featured && (
                  <div className="absolute -top-1 left-1/2 -translate-x-1/2">
                    <span className="inline-flex items-center gap-1 px-3 py-1 text-xs font-semibold bg-gradient-to-r from-yellow-400 to-orange-500 text-black rounded-full">
                      <Zap size={10} aria-hidden="true" />
                      Top Prize
                    </span>
                  </div>
                )}

                <CardContent className="p-0 relative z-10">
                  <div className="inline-flex items-center justify-center bg-gradient-to-br from-white/5 to-white/10 p-5 rounded-full mb-5 transition-transform duration-300 group-hover:scale-110">
                    {prize.icon}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-300 mb-2">
                    {prize.position}
                  </h3>
                  <div className="text-5xl font-bold gradient-text mb-2">
                    {prize.prize}
                  </div>
                  <p className="text-sm text-gray-400 capitalize">
                    {prize.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>'''

new_map = '''        {/* Prize Podium */}
        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto items-end">
          {prizes.map((prize, index) => (
            <InteractivePrizeCard key={index} prize={prize} index={index} isInView={isInView} />
          ))}
        </div>'''

# Insert the component just above the Prizes default export
content = content.replace('const Prizes: React.FC = () => {', prize_card_comp + '\nconst Prizes: React.FC = () => {')
# Replace the mapping
content = content.replace(old_map, new_map)
# Fix the regex or exact replacement issue if any by doing a smart replace for the map block
import re
content = re.sub(r'<div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto items-end">[\s\S]*?</div>\s*</div>\s*</section>', new_map + '\n      </div>\n    </section>', content)


with open('src/components/Prizes.tsx', 'w') as f:
    f.write(content)
