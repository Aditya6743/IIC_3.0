import re

with open('src/components/AboutContent.tsx', 'r') as f:
    about_content = f.read()

better_p = '''            The International Innovation Challenge (IIC) is an empowering platform for young minds to address real-world challenges. The event brings together exceptional talents in a 36-hour hackathon, allowing participants to brainstorm and devise impactful solutions under the mentorship of industry leaders. We will also feature a startup carnival and international conference to foster innovation and collaboration.
'''
old_p_pattern = re.compile(r'<p className="text-lg text-gray-400 max-w-3xl mx-auto leading-relaxed">.*?</p>', re.DOTALL)
about_content = old_p_pattern.sub(f'<p className="text-lg text-gray-400 max-w-4xl mx-auto leading-relaxed">{better_p}</p>', about_content)

with open('src/components/AboutContent.tsx', 'w') as f:
    f.write(about_content)

with open('src/components/About.tsx', 'r') as f:
    about_src = f.read()

# Remove the section header from About.tsx
old_header = r'''        \{\/\* Section Header \*\/\}
        <motion\.div.*?<\/motion\.div>'''
about_src = re.sub(old_header, '', about_src, flags=re.DOTALL)

# Remove the py-24 padding and id="about" so it fits nicely
about_src = about_src.replace('className="py-24 space-bg"', 'className="w-full"')
about_src = about_src.replace('id="about"', '')

with open('src/components/About.tsx', 'w') as f:
    f.write(about_src)

