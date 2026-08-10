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
      setIsScrolled(window.scrollY > 60);
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
    { name: 'About', path: '/home#about' },
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
          ? 'py-2 glass-surface border-b border-pink-500/20 shadow-glass'
          : 'py-4 bg-transparent'
      )}
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex justify-between items-center">

          {/* Logo Section */}
          <div className="flex items-center space-x-3">
            <Link
              to="/"
              className="flex items-center space-x-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-400 rounded"
              aria-label="IIC Home"
            >
              <img
                alt="MUJ Logo"
                src="/muj-logo.png"
                width="120"
                className="transition-opacity duration-300 hover:opacity-90"
              />
            </Link>

            {/* Gradient Separator */}
            <div
              className="w-px h-7 bg-gradient-to-b from-pink-400 to-cyan-400 opacity-50"
              aria-hidden="true"
            />

            <Link
              to="/"
              className="flex items-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-400 rounded"
              aria-label="IIC Home"
            >
              <img
                alt="IIC Logo"
                src="/iic-logo.png"
                width="90"
                className="transition-opacity duration-300 hover:opacity-90"
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => {
              const isActive =
                item.path.startsWith(location.pathname) && location.pathname !== '/';
              return (
                <button
                  key={item.name}
                  onClick={() => handleNavClick(item.path)}
                  className={cn(
                    'relative px-3 py-2 text-sm font-medium transition-all duration-300 rounded-md group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-400',
                    isActive ? 'text-pink-400' : 'text-gray-300 hover:text-white'
                  )}
                  aria-current={isActive ? 'page' : undefined}
                >
                  {item.name}
                  <span
                    className={cn(
                      'absolute -bottom-0.5 left-0 h-0.5 bg-gradient-to-r from-pink-400 to-cyan-400 transition-all duration-300 rounded-full',
                      isActive ? 'w-full' : 'w-0 group-hover:w-full'
                    )}
                    aria-hidden="true"
                  />
                </button>
              );
            })}

            <div className="ml-3">
              <Button
                variant="neon"
                size="sm"
                onClick={() =>
                  window.open(
                    'https://unstop.com/hackathons/international-innovation-challenge-20-manipal-university-mu-jaipur-1527559',
                    '_blank',
                    'noopener,noreferrer'
                  )
                }
              >
                <Zap size={15} aria-hidden="true" />
                Submit
              </Button>
            </div>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden text-white p-2 glass-surface rounded-lg border border-pink-500/20 hover:border-pink-400/50 transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-400"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
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
                  <X size={22} />
                </motion.div>
              ) : (
                <motion.div
                  key="open"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Menu size={22} />
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
              initial={{ opacity: 0, height: 0, y: -10 }}
              animate={{ opacity: 1, height: 'auto', y: 0 }}
              exit={{ opacity: 0, height: 0, y: -10 }}
              transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
              className="md:hidden overflow-hidden mt-3"
            >
              <div className="glass-surface rounded-xl border border-pink-500/20 p-3 space-y-1">
                {navItems.map((item, idx) => (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.05, duration: 0.25 }}
                  >
                    <button
                      onClick={() => handleNavClick(item.path)}
                      className="block w-full text-left px-4 py-3 text-gray-300 hover:text-white hover:bg-pink-500/10 rounded-lg transition-all duration-200 font-medium text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-400"
                    >
                      {item.name}
                    </button>
                  </motion.div>
                ))}

                <motion.div
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: navItems.length * 0.05, duration: 0.25 }}
                  className="pt-2 px-1"
                >
                  <Button
                    variant="neon"
                    size="default"
                    className="w-full"
                    onClick={() =>
                      window.open(
                        'https://unstop.com/hackathons/international-innovation-challenge-20-manipal-university-mu-jaipur-1527559',
                        '_blank',
                        'noopener,noreferrer'
                      )
                    }
                  >
                    <Zap size={16} aria-hidden="true" />
                    Submit Project
                  </Button>
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
