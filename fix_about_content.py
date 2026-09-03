import re

with open('src/components/AboutContent.tsx', 'r') as f:
    about_content = f.read()

# Remove Timeline import and section
about_content = about_content.replace("import Timeline from './Timeline';\n", "")

old_timeline_block = r'''        \{\/\* Timeline Section \*\/\}
        <div className="mt-12">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight uppercase">Hackathon Schedule<\/h2>
            <div className="w-24 h-1 bg-gradient-to-r from-cyan-500 to-emerald-500 mx-auto mt-6 rounded-full" \/>
          <\/div>
          
          <Timeline \/>
        <\/div>'''

about_content = re.sub(old_timeline_block, '', about_content, flags=re.DOTALL)

with open('src/components/AboutContent.tsx', 'w') as f:
    f.write(about_content)
