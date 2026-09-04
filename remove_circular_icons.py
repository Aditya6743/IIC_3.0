import os
import glob
import re

files_to_check = glob.glob('src/components/**/*.tsx', recursive=True)

pattern = re.compile(r'<div className="inline-block p-3 bg-gradient.*?</div>\s*', re.DOTALL)

for file in files_to_check:
    with open(file, 'r') as f:
        content = f.read()
    
    if pattern.search(content):
        new_content = pattern.sub('', content)
        with open(file, 'w') as f:
            f.write(new_content)
        print(f"Removed icons from {file}")

