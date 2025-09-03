import React from 'react';
import { motion } from 'framer-motion';

interface LoadingSpinnerProps {
  size?: 'small' | 'medium' | 'large';
  text?: string;
  className?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ 
  size = 'medium', 
  text,
  className = ''
}) => {
  const sizeClasses = {
    small: 'w-4 h-4',
    medium: 'w-8 h-8',
    large: 'w-16 h-16'
  };

  const textSizes = {
    small: 'text-xs',
    medium: 'text-sm',
    large: 'text-base'
  };

  return (
    <div className={`flex flex-col items-center justify-center ${className}`}>
      {/* Main Spinner */}
      <motion.div
        className={`${sizeClasses[size]} relative`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        {/* Outer Ring */}
        <motion.div
          className={`${sizeClasses[size]} border-4 border-dark-600 border-t-primary-500 rounded-full`}
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        />
        
        {/* Inner Ring */}
        <motion.div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1/2 h-1/2 border-2 border-dark-700 border-b-secondary-500 rounded-full"
          animate={{ rotate: -360 }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
        />
        
        {/* Center Dot */}
        <motion.div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1 h-1 bg-primary-400 rounded-full"
          animate={{ scale: [1, 1.5, 1] }}
          transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>

      {/* Loading Text */}
      {text && (
        <motion.p
          className={`mt-4 text-dark-400 ${textSizes[size]} font-medium`}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <motion.span
            animate={{ opacity: [1, 0.5, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            {text}
          </motion.span>
        </motion.p>
      )}

      {/* Animated Dots */}
      <motion.div
        className="flex space-x-1 mt-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        {[0, 1, 2].map((index) => (
          <motion.div
            key={index}
            className="w-1 h-1 bg-primary-500 rounded-full"
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.3, 1, 0.3]
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
              delay: index * 0.2,
              ease: "easeInOut"
            }}
          />
        ))}
      </motion.div>
    </div>
  );
};

export default LoadingSpinner;
