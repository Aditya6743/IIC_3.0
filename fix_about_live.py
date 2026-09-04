import re

with open('src/components/AboutContent.tsx', 'r') as f:
    content = f.read()

badge = r'''          <div className="inline-flex items-center space-x-2 bg-white/5 border border-white/10 rounded-full px-4 py-1\.5 mb-6">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            <span className="text-sm font-medium tracking-wider text-gray-300 uppercase">Live Schedule</span>
          </div>'''

content = re.sub(badge, '', content)

with open('src/components/AboutContent.tsx', 'w') as f:
    f.write(content)
