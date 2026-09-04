with open('src/components/ProblemStatementsContent.tsx', 'r') as f:
    content = f.read()

old_div = '''            <div className="px-6 py-4 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-sm">
              <img src="/doa-rajasthan.png" alt="Department of Agriculture, Government of Rajasthan" className="h-16 md:h-20 object-contain drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]" />
            </div>'''

new_div = '''            <div className="px-10 py-6 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-sm">
              <img src="/doa-rajasthan.png" alt="Department of Agriculture, Government of Rajasthan" className="h-28 md:h-36 object-contain drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]" />
            </div>'''

content = content.replace(old_div, new_div)

with open('src/components/ProblemStatementsContent.tsx', 'w') as f:
    f.write(content)
