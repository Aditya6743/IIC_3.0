import re

with open('src/components/Timeline.tsx', 'r') as f:
    content = f.read()

# Add the Section Header to Timeline.tsx
old_return = '''  return (
    <section className="relative w-full py-20 overflow-hidden" ref={containerRef}>
      <div className="container mx-auto px-4 md:px-8 max-w-6xl">
        <div className="relative">'''

new_return = '''  return (
    <section className="relative w-full py-20 overflow-hidden" ref={containerRef} id="schedule">
      <div className="text-center mb-16 relative z-10">
        <h2 className="text-3xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-200 to-gray-500 tracking-tight uppercase">Hackathon Schedule</h2>
        <div className="w-24 h-1 bg-gradient-to-r from-cyan-500 to-emerald-500 mx-auto mt-6 rounded-full shadow-[0_0_15px_rgba(34,211,238,0.5)]" />
      </div>
      
      <div className="container mx-auto px-4 md:px-8 max-w-6xl">
        <div className="relative">'''

content = content.replace(old_return, new_return)

with open('src/components/Timeline.tsx', 'w') as f:
    f.write(content)

