import re

with open('src/components/Footer.tsx', 'r') as f:
    content = f.read()

# Replace the logo rendering block
old_logo_block = r'''            <Link to="/" className="inline-block group mb-6 relative z-10" onClick=\{\(\) => window\.scrollTo\(0, 0\)\}>
              <motion\.div
                className="p-4 bg-white/\[0\.02\] border border-white/5 rounded-2xl group-hover:bg-white/\[0\.05\] group-hover:border-cyan-500/30 transition-all duration-500"
                whileHover=\{\{ scale: 1\.05 \}\}
                transition=\{\{ type: "spring", stiffness: 400, damping: 10 \}\}
              >
                <img
                  alt="IIC 3\.0 Logo"
                  src="/iic-3\.0-logo\.png"
                  width="180"
                  className="opacity-90 drop-shadow-\[0_0_20px_rgba\(34,211,238,0\.3\)\] transition-all duration-500 group-hover:drop-shadow-\[0_0_25px_rgba\(34,211,238,0\.6\)\] group-hover:opacity-100"
                />
              </motion\.div>
            </Link>'''

new_logo_block = '''            <Link to="/" className="inline-block group mb-8 relative z-10" onClick={() => window.scrollTo(0, 0)}>
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <img
                  alt="IIC 3.0 Logo"
                  src="/iic-3.0-logo.png"
                  width="180"
                  className="opacity-90 drop-shadow-[0_0_15px_rgba(34,211,238,0.3)] transition-all duration-500 group-hover:drop-shadow-[0_0_30px_rgba(34,211,238,0.7)] group-hover:opacity-100 group-hover:brightness-110"
                  style={{ clipPath: 'inset(0 10% 0 10%)' }}
                />
              </motion.div>
            </Link>'''

content = re.sub(old_logo_block, new_logo_block, content)

with open('src/components/Footer.tsx', 'w') as f:
    f.write(content)
