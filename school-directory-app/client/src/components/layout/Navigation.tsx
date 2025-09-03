import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const Navigation: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  // Handle scroll effect for navigation background
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  const navItems = [
    { path: '/schools', label: 'Schools Directory', icon: '🏫' },
    { path: '/add-school', label: 'Add School', icon: '➕' }
  ];

  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-dark-900/95 backdrop-blur-md border-b border-dark-700/50 shadow-lg' 
          : 'bg-transparent'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Link
              to="/schools"
              className="flex items-center space-x-3 text-xl sm:text-2xl font-bold gradient-text hover:scale-105 transition-transform duration-200"
            >
              <span className="text-2xl sm:text-3xl">🎓</span>
              <span className="hidden sm:block font-display">School Directory</span>
              <span className="sm:hidden font-display">Schools</span>
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <motion.div
            className="hidden md:flex items-center space-x-8"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            {navItems.map((item, index) => (
              <motion.div
                key={item.path}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + index * 0.1 }}
              >
                <Link
                  to={item.path}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 relative group ${
                    location.pathname === item.path
                      ? 'text-primary-400 bg-primary-500/10'
                      : 'text-dark-300 hover:text-primary-400 hover:bg-dark-800/50'
                  }`}
                >
                  <span>{item.icon}</span>
                  <span>{item.label}</span>
                  {location.pathname === item.path && (
                    <motion.div
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-primary-500 to-secondary-500"
                      layoutId="activeNavItem"
                      initial={false}
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </Link>
              </motion.div>
            ))}
          </motion.div>

          {/* Mobile Menu Button */}
          <motion.div
            className="md:hidden"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="relative w-10 h-10 rounded-lg bg-dark-800 border border-dark-700 flex items-center justify-center hover:border-primary-500 transition-colors duration-200"
              aria-label="Toggle mobile menu"
            >
              <motion.div
                className="w-6 h-5 relative flex flex-col justify-center"
                animate={isMobileMenuOpen ? "open" : "closed"}
              >
                <motion.span
                  className="absolute w-full h-0.5 bg-current transform-gpu"
                  variants={{
                    closed: { rotate: 0, y: -8 },
                    open: { rotate: 45, y: 0 }
                  }}
                  transition={{ duration: 0.3 }}
                />
                <motion.span
                  className="absolute w-full h-0.5 bg-current transform-gpu"
                  variants={{
                    closed: { opacity: 1 },
                    open: { opacity: 0 }
                  }}
                  transition={{ duration: 0.3 }}
                />
                <motion.span
                  className="absolute w-full h-0.5 bg-current transform-gpu"
                  variants={{
                    closed: { rotate: 0, y: 8 },
                    open: { rotate: -45, y: 0 }
                  }}
                  transition={{ duration: 0.3 }}
                />
              </motion.div>
            </button>
          </motion.div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="md:hidden bg-dark-900/95 backdrop-blur-md border-t border-dark-700/50"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="px-4 py-4 space-y-2">
              {navItems.map((item, index) => (
                <motion.div
                  key={item.path}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link
                    to={item.path}
                    className={`flex items-center space-x-3 px-4 py-3 rounded-lg font-medium transition-all duration-200 ${
                      location.pathname === item.path
                        ? 'text-primary-400 bg-primary-500/10 border-l-4 border-primary-500'
                        : 'text-dark-300 hover:text-primary-400 hover:bg-dark-800/50'
                    }`}
                  >
                    <span className="text-xl">{item.icon}</span>
                    <span>{item.label}</span>
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navigation;
