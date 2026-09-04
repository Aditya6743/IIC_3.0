import re

with open('src/components/Timeline.tsx', 'r') as f:
    content = f.read()

# Add Check to imports
if 'Check,' not in content and 'Check ' not in content:
    content = content.replace("import { MapPin, Mic, Users, FileText, Coffee, Key, Gavel, Trophy, Code, MessageSquare, Award, Megaphone } from 'lucide-react';", "import { MapPin, Mic, Users, FileText, Coffee, Key, Gavel, Trophy, Code, MessageSquare, Award, Megaphone, Check } from 'lucide-react';")

# Add completed flag to Online Phase events
old_online = '''    events: [
      { time: "Aug 28", title: "Registration & PPT", venue: "Online", icon: FileText },
      { time: "Aug 30", title: "Shortlisting Results", venue: "Online", icon: Megaphone },
    ]'''

new_online = '''    events: [
      { time: "Aug 28", title: "Registration & PPT", venue: "Online", icon: FileText, completed: true },
      { time: "Aug 30", title: "Shortlisting Results", venue: "Online", icon: Megaphone, completed: true },
    ]'''

content = content.replace(old_online, new_online)

# Update Node rendering in ScheduleEvent
old_node = '''      {/* Node / Glowing Orb */}
      <motion.div 
        initial={{ scale: 0, opacity: 0 }}
        animate={isInView ? { scale: 1, opacity: 1 } : {}}
        transition={{ delay: 0.1, type: "spring", stiffness: 300, damping: 15 }}
        className={`absolute left-[37px] md:left-1/2 -translate-x-1/2 w-5 h-5 rounded-full border-[3px] border-black z-20 ${colorConfig.bg} ${colorConfig.glow}`}
      >
        <div className={`absolute inset-0 rounded-full animate-ping opacity-60 ${colorConfig.bg}`} />
        <div className={`absolute inset-0 -m-2 rounded-full blur-[8px] opacity-50 ${colorConfig.bg}`} />
      </motion.div>'''

new_node = '''      {/* Node / Glowing Orb */}
      <motion.div 
        initial={{ scale: 0, opacity: 0 }}
        animate={isInView ? { scale: 1, opacity: 1 } : {}}
        transition={{ delay: 0.1, type: "spring", stiffness: 300, damping: 15 }}
        className={`absolute left-[37px] md:left-1/2 -translate-x-1/2 w-6 h-6 rounded-full border-[3px] border-black z-20 flex items-center justify-center ${colorConfig.bg} ${colorConfig.glow}`}
      >
        {event.completed ? (
          <Check className="w-3.5 h-3.5 text-black" strokeWidth={4} />
        ) : (
          <div className={`absolute inset-0 rounded-full animate-ping opacity-60 ${colorConfig.bg}`} />
        )}
        <div className={`absolute inset-0 -m-2 rounded-full blur-[8px] pointer-events-none opacity-50 ${colorConfig.bg}`} />
      </motion.div>'''

content = content.replace(old_node, new_node)

with open('src/components/Timeline.tsx', 'w') as f:
    f.write(content)
