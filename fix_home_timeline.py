import re

with open('src/pages/Home.tsx', 'r') as f:
    home_content = f.read()

home_content = home_content.replace("import Prizes from '../components/Prizes';", "import Timeline from '../components/Timeline';\nimport Prizes from '../components/Prizes';")
home_content = home_content.replace("<Prizes />", "<Timeline />\n      <Prizes />")

with open('src/pages/Home.tsx', 'w') as f:
    f.write(home_content)
