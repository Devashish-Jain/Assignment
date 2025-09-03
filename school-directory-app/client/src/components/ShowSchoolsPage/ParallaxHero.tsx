import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';

const ParallaxHero: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Track scroll progress within this component
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  // Create different parallax speeds for layers
  const yBg = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const yMidground = useTransform(scrollYProgress, [0, 1], ["0%", "-30%"]);
  const yForeground = useTransform(scrollYProgress, [0, 1], ["0%", "-60%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.5, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.8]);

  return (
    <div ref={containerRef} className="relative h-screen overflow-hidden">
      {/* Background Layer - Slowest parallax */}
      <motion.div
        style={{ y: yBg }}
        className="absolute inset-0 parallax-bg"
      >
        {/* Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-dark-950 via-dark-900 to-dark-800" />
        
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          <motion.div
            className="absolute top-20 left-20 w-32 h-32 rounded-full bg-gradient-to-r from-primary-500/20 to-secondary-500/20 blur-2xl"
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "linear"
            }}
          />
          <motion.div
            className="absolute top-1/3 right-1/4 w-24 h-24 rounded-full bg-gradient-to-l from-secondary-500/30 to-primary-500/30 blur-xl"
            animate={{
              scale: [1, 0.8, 1],
              rotate: [360, 180, 0],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "linear"
            }}
          />
          <motion.div
            className="absolute bottom-1/3 left-1/3 w-20 h-20 rounded-full bg-gradient-to-r from-primary-400/25 to-secondary-400/25 blur-lg"
            animate={{
              scale: [0.8, 1.3, 0.8],
              rotate: [0, -180, -360],
            }}
            transition={{
              duration: 12,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        </div>

        {/* Grid Pattern Overlay */}
        <div 
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `
              linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '100px 100px'
          }}
        />
      </motion.div>

      {/* Midground Layer - Medium parallax */}
      <motion.div
        style={{ y: yMidground }}
        className="absolute inset-0 parallax-bg"
      >
        {/* Floating geometric shapes */}
        <div className="absolute inset-0">
          <motion.div
            className="absolute top-1/4 left-1/4 w-16 h-16 border-2 border-primary-500/30 rounded-lg transform rotate-45"
            animate={{
              rotate: [45, 225, 405],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div
            className="absolute top-2/3 right-1/3 w-12 h-12 border-2 border-secondary-500/40 rounded-full"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div
            className="absolute bottom-1/4 left-2/3 w-8 h-8 bg-gradient-to-r from-primary-500/20 to-secondary-500/20 transform rotate-12"
            animate={{
              rotate: [12, 192, 372],
              y: [0, -20, 0],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </div>
      </motion.div>

      {/* Foreground Content - Fastest parallax */}
      <motion.div
        style={{ y: yForeground, opacity, scale }}
        className="absolute inset-0 flex items-center justify-center parallax-bg"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="max-w-4xl mx-auto"
          >
            {/* Main Heading */}
            <motion.h1 
              className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-8 font-display"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
            >
              <motion.span 
                className="gradient-text block"
                animate={{ 
                  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                }}
                transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
              >
                Educational
              </motion.span>
              <motion.span 
                className="text-dark-100 block"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1, delay: 0.4 }}
              >
                Excellence
              </motion.span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p 
              className="text-xl sm:text-2xl md:text-3xl text-dark-300 mb-12 max-w-3xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.6 }}
            >
              Discover premier educational institutions across the nation. 
              Connect with schools that shape futures and build dreams.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div 
              className="flex flex-col sm:flex-row gap-6 justify-center items-center"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.8 }}
            >
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <button
                  onClick={() => {
                    document.querySelector('#schools-section')?.scrollIntoView({ 
                      behavior: 'smooth' 
                    });
                  }}
                  className="btn btn-primary px-8 py-4 text-lg font-semibold shadow-2xl"
                >
                  <span className="mr-2">🔍</span>
                  Explore Schools
                </button>
              </motion.div>

              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link
                  to="/add-school"
                  className="btn btn-outline px-8 py-4 text-lg font-semibold"
                >
                  <span className="mr-2">➕</span>
                  Add Your School
                </Link>
              </motion.div>
            </motion.div>

            {/* Floating Stats Preview */}
            <motion.div 
              className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1 }}
            >
              {[
                { label: 'Schools', icon: '🏫' },
                { label: 'Cities', icon: '🏙️' },
                { label: 'States', icon: '📍' },
                { label: 'Students', icon: '👥' },
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  className="glass rounded-xl p-4 text-center"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 1.2 + index * 0.1 }}
                  whileHover={{ 
                    scale: 1.05,
                    background: "rgba(255, 255, 255, 0.1)"
                  }}
                >
                  <div className="text-2xl mb-2">{stat.icon}</div>
                  <div className="text-sm text-dark-300">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 1.5 }}
      >
        <motion.div
          className="flex flex-col items-center cursor-pointer"
          onClick={() => {
            document.querySelector('#stats-section')?.scrollIntoView({ 
              behavior: 'smooth' 
            });
          }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <span className="text-dark-400 text-sm mb-2">Scroll to explore</span>
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="w-6 h-10 border-2 border-dark-400 rounded-full flex justify-center"
          >
            <motion.div
              animate={{ y: [0, 12, 0], opacity: [0, 1, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="w-1 h-3 bg-primary-500 rounded-full mt-2"
            />
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default ParallaxHero;
