import re

with open('src/components/Footer.tsx', 'r') as f:
    content = f.read()

old_links = r'''const quickLinks = \[
  \{ name: 'About', path: '/about' \},
  \{ name: 'Prizes', path: '/prizes' \},
  \{ name: 'Sponsors', path: '/sponsors' \},
  \{ name: 'FAQ', path: '/faq' \},
  \{ name: 'Gallery', path: '/gallery' \},
\];'''

new_links = '''const quickLinks = [
  { name: 'About', path: '/about' },
  { name: 'Sponsors', path: '/sponsors' },
  { name: 'Problem Statements', path: '/problem-statements' },
  { name: 'Judges & Mentors', path: '/judges-mentors' },
  { name: 'Gallery', path: '/gallery' },
];'''

content = re.sub(old_links, new_links, content)

with open('src/components/Footer.tsx', 'w') as f:
    f.write(content)
