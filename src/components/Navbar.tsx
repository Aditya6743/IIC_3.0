import React, { useState, useEffect } from 'react';
import { Menu, X, Zap } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  const handleNavClick = (path: string) => {
    const [route, section] = path.split('#');

    if (location.pathname !== route && route !== '') {
      navigate(path);
    } else if (section) {
      const element = document.getElementById(section);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else if (route === '' || route === location.pathname) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    setIsMenuOpen(false);
  };

  const navItems = [
    // { name: 'About', path: '/home#about' },
    { name: 'Problem Statements', path: '/problem-statements' },
    { name: 'Judges & Mentors', path: '/judges-mentors' },
    { name: 'Guests', path: '/guests' },
    { name: 'Sponsors', path: '/sponsors' },
    { name: 'Gallery', path: '/gallery' },
  ];

  return (
    <nav
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
        isScrolled
          ? 'py-3 bg-[#02080b]/70 backdrop-blur-lg border-b border-white/5'
          : 'py-5 bg-transparent'
      )}
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="container mx-auto px-6 lg:px-8">
        <div className="flex justify-between items-center">

          {/* Logo Section */}
          <div className="flex items-center space-x-4">
            <Link
              to="/"
              className="flex items-center space-x-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 rounded"
              aria-label="IIC Home"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
              <img
                alt="MUJ Logo"
                src="/muj-logo.png"
                width="120"
                className="transition-opacity duration-300 hover:opacity-90 grayscale brightness-200 contrast-125 opacity-80 hover:opacity-100"
              />
            </Link>

            {/* Subtle Separator */}
            <div
              className="w-px h-6 bg-white/10"
              aria-hidden="true"
            />

            <Link
              to="/"
              className="flex items-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 rounded"
              aria-label="IIC Home"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
              <img
                alt="IIC 3.0 Logo"
                src="/iic-3.0-logo.png"
                width="130"
                className="transition-all duration-300 hover:opacity-90 drop-shadow-[0_0_15px_rgba(34,211,238,0.3)] hover:drop-shadow-[0_0_20px_rgba(34,211,238,0.6)]"
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
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
            })}

            <div className="ml-4">
              <button
                className="px-5 py-2 text-sm font-semibold tracking-wide text-cyan-950 bg-cyan-400 rounded-full hover:bg-cyan-300 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 focus:ring-offset-[#02080b]"
                onClick={() =>
                  window.open(
                    'https://docs.google.com/forms/d/1r6umjVOO-wcnGa-XwrCkjcvPk2f8rcAo1msmgnfnCz0/edit',
                    '_blank',
                    'noopener,noreferrer'
                  )
                }
              >
                Submit Project
              </button>
            </div>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden text-gray-300 p-2 hover:bg-white/5 rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isMenuOpen}
          >
            <AnimatePresence mode="wait" initial={false}>
              {isMenuOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <X size={24} />
                </motion.div>
              ) : (
                <motion.div
                  key="open"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Menu size={24} />
                </motion.div>
              )}
            </AnimatePresence>
          </button>
        </div>

        {/* Mobile Navigation Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              id="mobile-menu"
              key="mobile-menu"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
              className="md:hidden overflow-hidden mt-4"
            >
              <div className="bg-[#031015]/90 backdrop-blur-xl rounded-2xl border border-white/5 p-4 space-y-1 shadow-2xl">
                {navItems.map((item, idx) => (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.05, duration: 0.2 }}
                  >
                    <button
                      onClick={() => handleNavClick(item.path)}
                      className="block w-full text-left px-4 py-3 text-gray-300 hover:text-white hover:bg-white/5 rounded-xl transition-colors font-medium text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
                    >
                      {item.name}
                    </button>
                  </motion.div>
                ))}

                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: navItems.length * 0.05, duration: 0.2 }}
                  className="pt-4 pb-2"
                >
                  <button
                    className="w-full px-5 py-3 text-sm font-semibold tracking-wide text-cyan-950 bg-cyan-400 rounded-xl hover:bg-cyan-300 transition-colors focus:outline-none focus:ring-2 focus:ring-cyan-500"
                    onClick={() =>
                      window.open(
                        'https://docs.google.com/forms/d/1r6umjVOO-wcnGa-XwrCkjcvPk2f8rcAo1msmgnfnCz0/edit',
                        '_blank',
                        'noopener,noreferrer'
                      )
                    }
                  >
                    Submit Project
                  </button>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};

export default Navbar;
