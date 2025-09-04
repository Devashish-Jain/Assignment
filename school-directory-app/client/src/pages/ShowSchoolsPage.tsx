import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { motion, AnimatePresence } from 'framer-motion';
import apiService from '../services/apiService';
import ParallaxHero from '../components/ShowSchoolsPage/ParallaxHero';
import StatsSection from '../components/ShowSchoolsPage/StatsSection';
import SearchBar from '../components/ShowSchoolsPage/SearchBar';
import SchoolCard from '../components/ShowSchoolsPage/SchoolCard';
import LoadingSpinner from '../components/common/LoadingSpinner';
import ErrorMessage from '../components/common/ErrorMessage';

const ShowSchoolsPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  // Fetch schools or search results based on query
  const {
    data: schools = [],
    isLoading,
    isError,
    error,
    refetch
  } = useQuery({
    queryKey: ['schools', searchQuery],
    queryFn: async () => {
      setIsSearching(true);
      try {
        if (searchQuery.trim()) {
          return await apiService.searchSchools(searchQuery);
        } else {
          return await apiService.getAllSchools();
        }
      } finally {
        setIsSearching(false);
      }
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });

  // Animation variants
  const pageVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 }
  };

  const containerVariants = {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const gridVariants = {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    initial: { opacity: 0, y: 50 },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  // Calculate statistics
  const stats = {
    totalSchools: schools.length,
    totalCities: new Set(schools.map(school => school.city.toLowerCase())).size,
    totalStates: new Set(schools.map(school => school.state.toLowerCase())).size,
    totalImages: schools.reduce((total, school) => total + (school.images?.length || 0), 0)
  };

  return (
    <motion.div
      className="min-h-screen"
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      {/* Parallax Hero Section */}
      <ParallaxHero />
      
      {/* Stats Section */}
      <StatsSection stats={stats} isLoading={isLoading} />

      {/* Main Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div
          variants={containerVariants}
          initial="initial"
          animate="animate"
        >
          {/* Search Section */}
          <motion.div variants={itemVariants} className="mb-12">
            <div className="max-w-2xl mx-auto text-center mb-8">
              <h2 className="text-3xl sm:text-4xl font-bold gradient-text font-display mb-4">
                Discover Schools
              </h2>
              <p className="text-dark-300 text-lg">
                Search through our comprehensive directory of educational institutions
              </p>
            </div>
            
            <SearchBar
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              isSearching={isSearching}
              resultsCount={schools.length}
            />
          </motion.div>

          {/* Schools Grid */}
          <motion.div variants={itemVariants}>
            {isLoading ? (
              <div className="flex justify-center items-center py-20">
                <LoadingSpinner size="large" />
              </div>
            ) : isError ? (
              <div className="max-w-md mx-auto py-20">
                <ErrorMessage
                  message={error?.message || 'Failed to load schools'}
                  onRetry={() => refetch()}
                />
              </div>
            ) : schools.length === 0 ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-20"
              >
                <div className="text-6xl mb-6">🏫</div>
                <h3 className="text-2xl font-bold text-dark-300 mb-4">
                  {searchQuery ? `No schools found for "${searchQuery}"` : 'No schools available'}
                </h3>
                <p className="text-dark-400 mb-8">
                  {searchQuery 
                    ? 'Try adjusting your search terms or browse all schools.' 
                    : 'Be the first to add a school to our directory!'}
                </p>
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="btn btn-outline px-6 py-3 mr-4"
                  >
                    Clear Search
                  </button>
                )}
                <button
                  onClick={() => window.location.href = '/add-school'}
                  className="btn btn-primary px-6 py-3"
                >
                  Add New School
                </button>
              </motion.div>
            ) : (
              <>
                {/* Results Header */}
                <motion.div variants={itemVariants} className="mb-8">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                      <h3 className="text-xl font-semibold text-dark-200">
                        {searchQuery ? 'Search Results' : 'All Schools'}
                      </h3>
                      <p className="text-dark-400">
                        {searchQuery 
                          ? `Found ${schools.length} schools matching "${searchQuery}"`
                          : `Showing all ${schools.length} schools in our directory`}
                      </p>
                    </div>
                    
                    {searchQuery && (
                      <button
                        onClick={() => setSearchQuery('')}
                        className="btn btn-outline px-4 py-2 text-sm"
                      >
                        Clear Search
                      </button>
                    )}
                  </div>
                </motion.div>

                {/* Schools Grid */}
                <motion.div
                  variants={gridVariants}
                  initial="initial"
                  animate="animate"
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                >
                  <AnimatePresence mode="popLayout">
                    {schools.map((school, index) => (
                      <motion.div
                        key={school.id}
                        variants={itemVariants}
                        layout
                        initial="initial"
                        animate="animate"
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{ 
                          duration: 0.6,
                          delay: index * 0.05,
                          ease: "easeOut"
                        }}
                      >
                        <SchoolCard school={school} />
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </motion.div>

                {/* Load More Button (if needed for pagination in the future) */}
                {schools.length > 0 && (
                  <motion.div
                    variants={itemVariants}
                    className="text-center mt-12"
                  >
                    <p className="text-dark-400 text-sm">
                      Showing all available schools • {schools.length} total
                    </p>
                  </motion.div>
                )}
              </>
            )}
          </motion.div>
        </motion.div>
      </div>

      {/* Background Decorative Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
        <motion.div
          className="absolute top-1/4 -left-20 w-72 h-72 bg-gradient-to-r from-primary-500/5 to-secondary-500/5 rounded-full blur-3xl"
          animate={{
            x: [0, 100, 0],
            y: [0, -50, 0],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        <motion.div
          className="absolute bottom-1/4 -right-20 w-96 h-96 bg-gradient-to-l from-secondary-500/5 to-primary-500/5 rounded-full blur-3xl"
          animate={{
            x: [0, -100, 0],
            y: [0, 50, 0],
            rotate: [360, 180, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      </div>
    </motion.div>
  );
};

export default ShowSchoolsPage;
