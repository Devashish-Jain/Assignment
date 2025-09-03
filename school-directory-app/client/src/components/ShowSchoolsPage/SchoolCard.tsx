import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { School, formatIndianPhoneForDisplay } from '../../services/apiService';
import ImageSlider from './ImageSlider';

interface SchoolCardProps {
  school: School;
}

const SchoolCard: React.FC<SchoolCardProps> = ({ school }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  
  // Animation variants
  const cardVariants = {
    initial: { 
      opacity: 0, 
      y: 50 
    },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    },
    whileInView: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const contentVariants = {
    collapsed: { 
      height: 'auto',
      transition: { duration: 0.3 }
    },
    expanded: { 
      height: 'auto',
      transition: { duration: 0.3 }
    }
  };

  return (
    <motion.div
      variants={cardVariants}
      initial="initial"
      whileInView="whileInView"
      viewport={{ once: true, amount: 0.2 }}
      className="group"
      whileHover={{ 
        scale: 1.02,
        y: -5,
        transition: { duration: 0.3, ease: "easeOut" }
      }}
    >
      <div className="card card-hover h-full overflow-hidden bg-gradient-to-br from-dark-800/60 to-dark-700/40 backdrop-blur-sm border border-dark-600/50 hover:border-primary-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-primary-500/10">
        {/* Image Slider Section */}
        <div className="relative h-48 sm:h-56 overflow-hidden">
          {school.images && school.images.length > 0 ? (
            <ImageSlider images={school.images} schoolName={school.name} />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-dark-700 to-dark-600 flex items-center justify-center">
              <div className="text-center text-dark-400">
                <div className="text-4xl mb-2">🏫</div>
                <p className="text-sm">No images available</p>
              </div>
            </div>
          )}
          
          {/* Image Count Badge */}
          {school.images && school.images.length > 0 && (
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
              className="absolute top-3 left-3 bg-dark-900/80 backdrop-blur-sm text-dark-100 text-xs px-2 py-1 rounded-full border border-dark-600/50"
            >
              📸 {school.images.length} photo{school.images.length !== 1 ? 's' : ''}
            </motion.div>
          )}

          {/* Gradient Overlay */}
          <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-dark-800/80 to-transparent pointer-events-none" />
        </div>

        {/* Content Section */}
        <motion.div
          variants={contentVariants}
          animate={isExpanded ? "expanded" : "collapsed"}
          className="p-6"
        >
          {/* School Name */}
          <motion.h3
            className="text-xl sm:text-2xl font-bold text-dark-100 mb-3 line-clamp-2 group-hover:text-primary-400 transition-colors duration-300"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            {school.name}
          </motion.h3>

          {/* Location */}
          <motion.div
            className="flex items-start gap-2 mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <span className="text-primary-500 mt-0.5 flex-shrink-0">📍</span>
            <div className="min-w-0">
              <p className="text-dark-300 text-sm line-clamp-2">
                {school.address}
              </p>
              <p className="text-dark-400 text-sm mt-1">
                {school.city}, {school.state}
              </p>
            </div>
          </motion.div>

          {/* Contact Information */}
          <motion.div
            className="space-y-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="flex items-center gap-2 text-sm">
              <span className="text-secondary-500">📞</span>
              <a
                href={`tel:${school.contact}`}
                className="text-dark-300 hover:text-primary-400 transition-colors duration-200"
              >
                {formatIndianPhoneForDisplay(school.contact)}
              </a>
            </div>
            
            <div className="flex items-center gap-2 text-sm">
              <span className="text-secondary-500">✉️</span>
              <a
                href={`mailto:${school.email_id}`}
                className="text-dark-300 hover:text-primary-400 transition-colors duration-200 truncate"
              >
                {school.email_id}
              </a>
            </div>
          </motion.div>

          {/* Expand/Collapse Button */}
          <motion.div
            className="mt-6 pt-4 border-t border-dark-600/50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="flex items-center justify-between w-full text-left text-sm text-dark-400 hover:text-primary-400 transition-colors duration-200 group/btn"
            >
              <span>
                {isExpanded ? 'Show less details' : 'View more details'}
              </span>
              <motion.span
                animate={{ rotate: isExpanded ? 180 : 0 }}
                transition={{ duration: 0.3 }}
                className="group-hover/btn:text-primary-400 transition-colors duration-200"
              >
                ▼
              </motion.span>
            </button>
          </motion.div>

          {/* Extended Information (shown when expanded) */}
          <motion.div
            initial={false}
            animate={{
              height: isExpanded ? 'auto' : 0,
              opacity: isExpanded ? 1 : 0,
              marginTop: isExpanded ? 16 : 0
            }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="space-y-3">
              {/* Added Date */}
              <div className="text-xs text-dark-400">
                <span className="font-medium">Added:</span>{' '}
                {new Date(school.created_at).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2 pt-2">
                <button className="flex-1 btn btn-outline py-2 text-xs hover:scale-105 transition-transform duration-200">
                  <span className="mr-1">🔗</span>
                  Visit Website
                </button>
                <button className="flex-1 btn btn-primary py-2 text-xs hover:scale-105 transition-transform duration-200">
                  <span className="mr-1">📍</span>
                  Get Directions
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Hover Glow Effect */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-primary-500/5 to-secondary-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-xl"
          initial={false}
        />

        {/* Corner Decorations */}
        <div className="absolute top-2 right-2 w-2 h-2 bg-primary-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="absolute bottom-2 left-2 w-2 h-2 bg-secondary-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Animated Border */}
        <motion.div
          className="absolute inset-0 rounded-xl border-2 border-transparent"
          whileHover={{
            borderImage: "linear-gradient(45deg, rgba(59, 130, 246, 0.5), rgba(147, 51, 234, 0.5), rgba(59, 130, 246, 0.5)) 1",
          }}
          transition={{ duration: 0.3 }}
        />
      </div>
    </motion.div>
  );
};

export default SchoolCard;
