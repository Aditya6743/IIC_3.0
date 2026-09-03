import re

with open('src/components/Navbar.tsx', 'r') as f:
    content = f.read()

# Make sure Framer Motion has layoutId if not imported
if "AnimatePresence" not in content:
    content = content.replace("import { motion } from 'framer-motion';", "import { motion, AnimatePresence } from 'framer-motion';")

# Add hoveredItem state
if "const [hoveredItem, setHoveredItem]" not in content:
    content = content.replace("const [isMenuOpen, setIsMenuOpen] = useState(false);", "const [isMenuOpen, setIsMenuOpen] = useState(false);\n  const [hoveredItem, setHoveredItem] = useState<string | null>(null);")

# Update Desktop Navigation Mapping
old_desktop_nav = '''          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-2">
            {navItems.map((item) => {
              const isActive =
                item.path.startsWith(location.pathname) && location.pathname !== '/';
              return (
                <button
                  key={item.name}
                  onClick={() => handleNavClick(item.path)}
                  className={cn(
                    'relative px-3 py-2 text-sm transition-all duration-300 rounded-md group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 font-medium tracking-wide',
                    isActive ? 'text-cyan-400' : 'text-gray-400 hover:text-white'
                  )}
                  aria-current={isActive ? 'page' : undefined}
                >
                  {item.name}
                  <span
                    className={cn(
                      'absolute -bottom-0 left-2 right-2 h-px bg-gradient-to-r from-cyan-400 to-emerald-400 transition-all duration-300',
                      isActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0'
                    )}
                    aria-hidden="true"
                  />
                </button>
              );
            })}'''

new_desktop_nav = '''          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-2" onMouseLeave={() => setHoveredItem(null)}>
            {navItems.map((item) => {
              const isActive = item.path.startsWith(location.pathname) && location.pathname !== '/';
              const isHovered = hoveredItem === item.name;
              
              return (
                <button
                  key={item.name}
                  onClick={() => handleNavClick(item.path)}
                  onMouseEnter={() => setHoveredItem(item.name)}
                  className={cn(
                    'relative px-4 py-2 text-sm transition-colors duration-300 rounded-full group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 font-medium tracking-wide',
                    isActive || isHovered ? 'text-white' : 'text-gray-400'
                  )}
                  aria-current={isActive ? 'page' : undefined}
                >
                  <span className="relative z-10">{item.name}</span>
                  
                  {/* Sliding Hover Pill */}
                  {isHovered && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 z-0 bg-white/10 rounded-full"
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                  
                  {/* Active Indicator Line */}
                  <span
                    className={cn(
                      'absolute -bottom-1 left-4 right-4 h-[2px] bg-gradient-to-r from-cyan-400 to-emerald-400 transition-all duration-300 rounded-full',
                      isActive ? 'opacity-100 translate-y-0 shadow-[0_0_8px_rgba(34,211,238,0.5)]' : 'opacity-0 translate-y-1'
                    )}
                    aria-hidden="true"
                  />
                </button>
              );
            })}'''

content = content.replace(old_desktop_nav, new_desktop_nav)

with open('src/components/Navbar.tsx', 'w') as f:
    f.write(content)
