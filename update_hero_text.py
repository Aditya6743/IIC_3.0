import re

with open('src/components/Hero.tsx', 'r') as f:
    content = f.read()

# Add import
content = content.replace("import { Badge } from '@/components/ui/badge';", "import { Badge } from '@/components/ui/badge';\nimport SplitText from './SplitText';")

# Replace Innovation Unleashed
old_innovation = '''              {/* Innovation Unleashed follows */}
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: baseDelay + 0.3, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="text-4xl md:text-5xl lg:text-5xl xl:text-6xl text-transparent bg-clip-text bg-gradient-to-r from-gray-200 to-gray-500 font-light tracking-tight mt-3 block"
              >
                Innovation Unleashed
              </motion.span>'''

new_innovation = '''              {/* Innovation Unleashed follows */}
              <div className="mt-3 overflow-hidden">
                <SplitText 
                  text="Innovation Unleashed" 
                  delay={baseDelay + 0.3} 
                  staggerDelay={0.08}
                  className="text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-light tracking-tight"
                  wordClassName="text-transparent bg-clip-text bg-gradient-to-r from-gray-200 to-gray-500 pb-2"
                />
              </div>'''

content = content.replace(old_innovation, new_innovation)

# Replace paragraph
old_p = '''            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: baseDelay + 0.4, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="text-lg md:text-xl text-gray-400 mb-10 leading-relaxed max-w-lg font-light"
            >
              We're back with bigger impact and bolder innovation. Join the most
              anticipated technology conference and hackathon of 2026.
            </motion.p>'''

new_p = '''            <div className="text-lg md:text-xl text-gray-400 mb-10 leading-relaxed max-w-lg font-light">
              <SplitText 
                text="We're back with bigger impact and bolder innovation. Join the most anticipated technology conference and hackathon of 2026."
                delay={baseDelay + 0.5}
                staggerDelay={0.03}
              />
            </div>'''

content = content.replace(old_p, new_p)

with open('src/components/Hero.tsx', 'w') as f:
    f.write(content)
