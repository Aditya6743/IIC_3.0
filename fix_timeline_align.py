import re

with open('src/components/Timeline.tsx', 'r') as f:
    content = f.read()

# Fix the alignment of the time and icon row for left/right alternates
old_row = '''<div className="flex items-center gap-3 mb-3">
            {!isLeft && <Icon className={`w-5 h-5 ${iconColor}`} />}
            <div className={`inline-block px-3 py-1 rounded-full text-xs font-bold tracking-wider border ${bgBadge}`}>
              {event.time}
            </div>
            {isLeft && <Icon className={`w-5 h-5 ${iconColor} hidden md:block`} />}
            {isLeft && <Icon className={`w-5 h-5 ${iconColor} md:hidden`} />}
          </div>'''

new_row = '''<div className={`flex items-center gap-3 mb-3 ${isLeft ? 'md:flex-row-reverse' : ''}`}>
            <Icon className={`w-5 h-5 ${iconColor}`} />
            <div className={`inline-block px-3 py-1 rounded-full text-xs font-bold tracking-wider border ${bgBadge}`}>
              {event.time}
            </div>
          </div>'''

content = content.replace(old_row, new_row)

with open('src/components/Timeline.tsx', 'w') as f:
    f.write(content)
