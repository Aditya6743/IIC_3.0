import re

with open('src/components/Footer.tsx', 'r') as f:
    content = f.read()

# 1. Remove Github
content = re.sub(r"  \{ href: 'https://github\.com/[^']+', icon: <Github size=\{18\} />, label: 'GitHub' \},\n", "", content)

# 2. Change email
content = content.replace('contact@iicmuj.com', 'iic.manipal@gmail.com')

# 3. Add Phone Numbers
old_location = r'''              <div className="flex items-start gap-3 group">
                <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center shrink-0">
                  <MapPin size={14} className="opacity-70 group-hover:opacity-100 transition-opacity group-hover:text-emerald-400" />
                </div>
                <span className="font-light tracking-wide leading-relaxed pt-1 group-hover:text-gray-300 transition-colors">
                  Manipal University Jaipur,<br />Dehmi Kalan, Rajasthan
                </span>
              </div>'''

new_contacts = '''              <div className="flex flex-col gap-4">
                <div className="flex items-start gap-3 group">
                  <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="opacity-70 group-hover:opacity-100 transition-opacity group-hover:text-cyan-400"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                  </div>
                  <div className="font-light tracking-wide leading-relaxed pt-1 group-hover:text-gray-300 transition-colors">
                    Keshav Anand: <a href="tel:7970466554" className="hover:text-cyan-400">7970466554</a><br />
                    Sarath Mohanraj: <a href="tel:8903244085" className="hover:text-cyan-400">8903244085</a>
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3 group">
                <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center shrink-0">
                  <MapPin size={14} className="opacity-70 group-hover:opacity-100 transition-opacity group-hover:text-emerald-400" />
                </div>
                <span className="font-light tracking-wide leading-relaxed pt-1 group-hover:text-gray-300 transition-colors">
                  Manipal University Jaipur,<br />Dehmi Kalan, Rajasthan
                </span>
              </div>'''

content = content.replace(old_location, new_contacts)

# Remove Github icon import if needed, but TS might warn if it's unused. Just leave it or strip it.
content = content.replace(", Github", "")

with open('src/components/Footer.tsx', 'w') as f:
    f.write(content)

