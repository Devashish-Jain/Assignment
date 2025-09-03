import React, { useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface SearchBarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  isSearching: boolean;
  resultsCount: number;
}

const SearchBar: React.FC<SearchBarProps> = ({
  searchQuery,
  onSearchChange,
  isSearching,
  resultsCount
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  // Focus input when component mounts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Focus search on Ctrl/Cmd + K
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        inputRef.current?.focus();
      }
      
      // Clear search on Escape
      if (e.key === 'Escape' && document.activeElement === inputRef.current) {
        onSearchChange('');
        inputRef.current?.blur();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onSearchChange]);

  const handleClearSearch = () => {
    onSearchChange('');
    inputRef.current?.focus();
  };

  // Animation variants
  const containerVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 }
  };

  const resultsVariants = {
    initial: { opacity: 0, height: 0, marginTop: 0 },
    animate: { opacity: 1, height: 'auto', marginTop: 8 },
    exit: { opacity: 0, height: 0, marginTop: 0 }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="w-full max-w-2xl mx-auto"
    >
      {/* Main Search Input */}
      <div className="relative group">
        {/* Background Glow Effect */}
        <motion.div
          className="absolute -inset-1 bg-gradient-to-r from-primary-500/20 to-secondary-500/20 rounded-2xl blur-lg opacity-0 group-focus-within:opacity-100 transition-opacity duration-500"
          initial={false}
        />
        
        {/* Search Input Container */}
        <div className="relative bg-dark-800/80 backdrop-blur-sm border border-dark-600/50 rounded-2xl shadow-2xl focus-within:border-primary-500/50 transition-all duration-300 overflow-hidden">
          {/* Search Icon */}
          <div className="absolute left-6 top-1/2 transform -translate-y-1/2 text-dark-400 group-focus-within:text-primary-500 transition-colors duration-300">
            <motion.div
              animate={isSearching ? { rotate: 360 } : { rotate: 0 }}
              transition={{ duration: 1, repeat: isSearching ? Infinity : 0, ease: "linear" }}
            >
              {isSearching ? '⏳' : '🔍'}
            </motion.div>
          </div>

          {/* Input Field */}
          <input
            ref={inputRef}
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search schools by name, city, or state..."
            className="w-full pl-16 pr-20 py-5 bg-transparent text-dark-100 placeholder-dark-400 text-lg focus:outline-none"
          />

          {/* Keyboard Shortcut Hint */}
          <AnimatePresence>
            {!searchQuery && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="absolute right-6 top-1/2 transform -translate-y-1/2"
              >
                <div className="flex items-center gap-1 text-dark-500 text-sm">
                  <span className="hidden sm:inline">Press</span>
                  <kbd className="hidden sm:inline-flex items-center px-2 py-1 bg-dark-700 border border-dark-600 rounded text-xs font-mono">
                    ⌘K
                  </kbd>
                  <span className="hidden sm:inline">to focus</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Clear Button */}
          <AnimatePresence>
            {searchQuery && (
              <motion.button
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0 }}
                onClick={handleClearSearch}
                className="absolute right-6 top-1/2 transform -translate-y-1/2 w-8 h-8 bg-dark-600 hover:bg-primary-500 rounded-full flex items-center justify-center text-dark-300 hover:text-white transition-all duration-200"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                ×
              </motion.button>
            )}
          </AnimatePresence>

          {/* Loading Bar */}
          <AnimatePresence>
            {isSearching && (
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                exit={{ scaleX: 0 }}
                className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-primary-500 to-secondary-500 origin-left"
                transition={{ duration: 0.3 }}
              />
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Search Results Summary */}
      <AnimatePresence>
        {searchQuery && (
          <motion.div
            variants={resultsVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="flex items-center justify-between px-4"
          >
            <div className="flex items-center gap-2 text-sm text-dark-400">
              <motion.span
                animate={isSearching ? { opacity: [1, 0.5, 1] } : { opacity: 1 }}
                transition={{ duration: 1.5, repeat: isSearching ? Infinity : 0 }}
              >
                {isSearching ? 'Searching...' : `Found ${resultsCount} result${resultsCount !== 1 ? 's' : ''}`}
              </motion.span>
              {searchQuery && !isSearching && (
                <span className="text-primary-400 font-medium">
                  for "{searchQuery}"
                </span>
              )}
            </div>

            {/* Quick Actions */}
            <div className="flex items-center gap-2 text-xs">
              <motion.button
                onClick={handleClearSearch}
                className="text-dark-500 hover:text-primary-400 transition-colors duration-200"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Clear
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Search Suggestions/Tips */}
      <AnimatePresence>
        {!searchQuery && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-6 text-center"
          >
            <div className="inline-flex flex-wrap items-center justify-center gap-2 text-sm">
              <span className="text-dark-500">Try searching for:</span>
              {['Harvard', 'New York', 'California', 'Elementary'].map((suggestion, index) => (
                <motion.button
                  key={suggestion}
                  onClick={() => onSearchChange(suggestion)}
                  className="px-3 py-1 bg-dark-800/50 hover:bg-primary-500/20 text-dark-300 hover:text-primary-400 rounded-full border border-dark-700/50 hover:border-primary-500/50 transition-all duration-200"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + index * 0.05 }}
                >
                  {suggestion}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Search Help */}
      <AnimatePresence>
        {searchQuery && resultsCount === 0 && !isSearching && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="mt-6 p-4 bg-dark-800/30 rounded-xl border border-dark-700/50"
          >
            <div className="text-center text-dark-400">
              <div className="text-2xl mb-2">🔍</div>
              <p className="text-sm mb-2">No schools found matching your search.</p>
              <div className="text-xs text-dark-500">
                <p>Tips:</p>
                <ul className="mt-1 space-y-1">
                  <li>• Try different keywords or spellings</li>
                  <li>• Search by school name, city, or state</li>
                  <li>• Use partial words (e.g., "Elem" for Elementary)</li>
                </ul>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default SearchBar;
