import re

with open('src/components/Timeline.tsx', 'r') as f:
    content = f.read()

# 1. Update Imports
if 'Megaphone' not in content:
    content = content.replace("import { MapPin, Mic, Users, FileText, Coffee, Key, Gavel, Trophy, Code, MessageSquare, Award } from 'lucide-react';", "import { MapPin, Mic, Users, FileText, Coffee, Key, Gavel, Trophy, Code, MessageSquare, Award, Megaphone } from 'lucide-react';")

# 2. Add Online Round to Schedule Data
old_schedule_data = '''const scheduleData = [
  {
    day: "Day 1",
    date: "SEPTEMBER 08",'''

new_schedule_data = '''const scheduleData = [
  {
    day: "Online Phase",
    date: "COMPLETED",
    events: [
      { time: "Aug 28", title: "Registration & PPT", venue: "Online", icon: FileText },
      { time: "Aug 30", title: "Shortlisting Results", venue: "Online", icon: Megaphone },
    ]
  },
  {
    day: "Day 1",
    date: "SEPTEMBER 08",'''

content = content.replace(old_schedule_data, new_schedule_data)

# 3. Fix Alignment (Centers exactly at 37px on mobile, 50% on desktop)
# Node/Glowing Orb
content = content.replace("left-[27px] md:left-1/2 w-5 h-5 md:-translate-x-1/2", "left-[37px] md:left-1/2 -translate-x-1/2 w-5 h-5")

# Main Background Track
content = content.replace("left-[27px] md:left-1/2 top-0 bottom-0 w-[4px] bg-white/[0.03] md:-translate-x-1/2", "left-[37px] md:left-1/2 -translate-x-1/2 top-0 bottom-0 w-[4px] bg-white/[0.03]")

# Glowing Track
content = content.replace("left-[27px] md:left-1/2 top-0 bottom-0 w-[4px] bg-gradient-to-b from-emerald-500 via-cyan-500 to-cyan-400 md:-translate-x-1/2", "left-[37px] md:left-1/2 -translate-x-1/2 top-0 bottom-0 w-[4px] bg-gradient-to-b from-emerald-500 via-cyan-500 to-cyan-400")

# Subtle Leading Edge
content = content.replace("left-[27px] md:left-1/2 w-3 h-8 md:-translate-x-1/2 -translate-y-full", "left-[37px] md:left-1/2 -translate-x-1/2 w-3 h-8 -translate-y-full")


# 4. Fix styling conditional logic for the new phase
# Currently isDay2 = dayIndex === 1. Now Day 1 is dayIndex === 1, Day 2 is dayIndex === 2, Online is dayIndex === 0.
# The previous styling logic was:
# if (isDay2) cyan else emerald.
# Let's update `Timeline` map and `ScheduleEvent` props.

with open('src/components/Timeline.tsx', 'w') as f:
    f.write(content)
