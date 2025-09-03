import React from 'react';
import { motion } from 'framer-motion';
import CountUp from 'react-countup';

interface StatsSectionProps {
  stats: {
    totalSchools: number;
    totalCities: number;
    totalStates: number;
    totalImages: number;
  };
}

const StatsSection: React.FC<StatsSectionProps> = ({ stats }) => {
  const statsData = [
    {
      id: 'schools',
      icon: '🏫',
      value: stats.totalSchools,
      label: 'Schools Registered',
      suffix: '',
      description: 'Educational institutions in our directory'
    },
    {
      id: 'cities',
      icon: '🏙️',
      value: stats.totalCities,
      label: 'Cities Covered',
      suffix: '',
      description: 'Urban centers with registered schools'
    },
    {
      id: 'states',
      icon: '📍',
      value: stats.totalStates,
      label: 'States Reached',
      suffix: '',
      description: 'Geographic coverage across regions'
    },
    {
      id: 'images',
      icon: '📸',
      value: stats.totalImages,
      label: 'Photos Shared',
      suffix: '+',
      description: 'Visual content showcasing facilities'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <section id="stats-section" className="py-20 bg-gradient-to-b from-dark-950 to-dark-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          {/* Section Header */}
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold gradient-text font-display mb-6">
              Directory Statistics
            </h2>
            <p className="text-xl text-dark-300 max-w-3xl mx-auto">
              Our growing network of educational excellence spans across the nation, 
              connecting students and families with quality institutions.
            </p>
          </motion.div>

          {/* Stats Grid */}
          <motion.div
            variants={containerVariants}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {statsData.map((stat, index) => (
              <motion.div
                key={stat.id}
                variants={itemVariants}
                whileHover={{ 
                  scale: 1.05,
                  transition: { duration: 0.2 }
                }}
                className="relative group"
              >
                <div className="card card-hover p-8 text-center h-full bg-gradient-to-br from-dark-800/50 to-dark-700/30 hover:from-dark-700/60 hover:to-dark-600/40 transition-all duration-300">
                  {/* Icon */}
                  <motion.div
                    className="text-6xl mb-4 group-hover:scale-110 transition-transform duration-300"
                    whileHover={{ rotate: [0, -10, 10, 0] }}
                    transition={{ duration: 0.5 }}
                  >
                    {stat.icon}
                  </motion.div>

                  {/* Counter */}
                  <div className="mb-4">
                    <motion.div
                      className="text-4xl sm:text-5xl font-bold gradient-text font-display"
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ 
                        type: "spring", 
                        stiffness: 300, 
                        damping: 20,
                        delay: index * 0.1 
                      }}
                    >
                      <CountUp
                        end={stat.value}
                        duration={2.5}
                        enableScrollSpy
                        scrollSpyOnce
                        suffix={stat.suffix}
                        preserveValue
                      />
                    </motion.div>
                  </div>

                  {/* Label */}
                  <h3 className="text-lg sm:text-xl font-semibold text-dark-200 mb-2 group-hover:text-primary-400 transition-colors duration-300">
                    {stat.label}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-dark-400 group-hover:text-dark-300 transition-colors duration-300">
                    {stat.description}
                  </p>

                  {/* Hover Effect Overlay */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-primary-500/5 to-secondary-500/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                    initial={false}
                    whileHover={{ opacity: 0.1 }}
                  />

                  {/* Corner Accent */}
                  <div className="absolute top-3 right-3 w-2 h-2 bg-primary-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                {/* Floating Background Element */}
                <motion.div
                  className="absolute -top-4 -left-4 w-8 h-8 bg-gradient-to-br from-primary-500/20 to-secondary-500/20 rounded-full blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  animate={{
                    scale: [1, 1.2, 1],
                    rotate: [0, 180, 360],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                />
              </motion.div>
            ))}
          </motion.div>

          {/* Additional Info */}
          <motion.div
            variants={itemVariants}
            className="text-center mt-16"
          >
            <div className="glass rounded-2xl p-8 max-w-4xl mx-auto">
              <motion.div
                className="flex flex-col md:flex-row items-center justify-center gap-8"
                variants={containerVariants}
              >
                <motion.div variants={itemVariants} className="flex items-center gap-4">
                  <div className="text-3xl">🎯</div>
                  <div className="text-left">
                    <div className="text-lg font-semibold text-primary-400">Quality Focused</div>
                    <div className="text-dark-300 text-sm">Vetted educational institutions</div>
                  </div>
                </motion.div>

                <motion.div 
                  variants={itemVariants}
                  className="hidden md:block w-px h-12 bg-gradient-to-b from-transparent via-dark-600 to-transparent"
                />

                <motion.div variants={itemVariants} className="flex items-center gap-4">
                  <div className="text-3xl">🌟</div>
                  <div className="text-left">
                    <div className="text-lg font-semibold text-secondary-400">Comprehensive</div>
                    <div className="text-dark-300 text-sm">Detailed school information</div>
                  </div>
                </motion.div>

                <motion.div 
                  variants={itemVariants}
                  className="hidden md:block w-px h-12 bg-gradient-to-b from-transparent via-dark-600 to-transparent"
                />

                <motion.div variants={itemVariants} className="flex items-center gap-4">
                  <div className="text-3xl">🚀</div>
                  <div className="text-left">
                    <div className="text-lg font-semibold text-primary-400">Growing Network</div>
                    <div className="text-dark-300 text-sm">Expanding daily reach</div>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default StatsSection;
