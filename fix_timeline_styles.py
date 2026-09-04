import re

with open('src/components/Timeline.tsx', 'r') as f:
    content = f.read()

# Fix ScheduleEvent mapping
content = content.replace("isDay2={dayIndex === 1}", "isDay2={dayIndex === 2}")

# Fix Header Styling logic
content = content.replace("dayIndex === 1 ? 'bg-cyan-500' : 'bg-emerald-500'", "dayIndex === 2 ? 'bg-cyan-500' : 'bg-emerald-500'")
content = content.replace("dayIndex === 1 ? 'bg-cyan-950/80 border-cyan-500/50 shadow-cyan-900/50' : 'bg-emerald-950/80 border-emerald-500/50 shadow-emerald-900/50'", "dayIndex === 2 ? 'bg-cyan-950/80 border-cyan-500/50 shadow-cyan-900/50' : 'bg-emerald-950/80 border-emerald-500/50 shadow-emerald-900/50'")
content = content.replace("dayIndex === 1 ? 'bg-[linear-gradient(45deg,rgba(34,211,238,0.5),transparent)]' : 'bg-[linear-gradient(45deg,rgba(16,185,129,0.5),transparent)]'", "dayIndex === 2 ? 'bg-[linear-gradient(45deg,rgba(34,211,238,0.5),transparent)]' : 'bg-[linear-gradient(45deg,rgba(16,185,129,0.5),transparent)]'")
content = content.replace("dayIndex === 1 ? 'text-cyan-400 drop-shadow-[0_0_10px_rgba(34,211,238,0.8)]' : 'text-emerald-400 drop-shadow-[0_0_10px_rgba(16,185,129,0.8)]'", "dayIndex === 2 ? 'text-cyan-400 drop-shadow-[0_0_10px_rgba(34,211,238,0.8)]' : 'text-emerald-400 drop-shadow-[0_0_10px_rgba(16,185,129,0.8)]'")
content = content.replace("dayIndex === 1 ? 'bg-cyan-300' : 'bg-emerald-300'", "dayIndex === 2 ? 'bg-cyan-300' : 'bg-emerald-300'")

with open('src/components/Timeline.tsx', 'w') as f:
    f.write(content)
