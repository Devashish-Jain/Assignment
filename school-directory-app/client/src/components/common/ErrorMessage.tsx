import React from 'react';
import { motion } from 'framer-motion';

interface ErrorMessageProps {
  message: string;
  onRetry?: () => void;
  className?: string;
  showIcon?: boolean;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({
  message,
  onRetry,
  className = '',
  showIcon = true
}) => {
  const containerVariants = {
    initial: { opacity: 0, scale: 0.9 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.9 }
  };

  const iconVariants = {
    initial: { rotate: -10, scale: 0 },
    animate: { 
      rotate: 0, 
      scale: 1,
      transition: { 
        type: "spring", 
        stiffness: 300, 
        damping: 20,
        delay: 0.1 
      }
    }
  };

  const buttonVariants = {
    initial: { opacity: 0, y: 10 },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: { delay: 0.3 }
    }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className={`bg-red-500/10 border border-red-500/30 rounded-xl p-6 text-center ${className}`}
    >
      {/* Error Icon */}
      {showIcon && (
        <motion.div
          variants={iconVariants}
          className="text-4xl mb-4"
        >
          ⚠️
        </motion.div>
      )}

      {/* Error Title */}
      <motion.h3
        className="text-lg font-semibold text-red-400 mb-2"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        Something went wrong
      </motion.h3>

      {/* Error Message */}
      <motion.p
        className="text-dark-300 text-sm mb-6 max-w-md mx-auto leading-relaxed"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25 }}
      >
        {message}
      </motion.p>

      {/* Retry Button */}
      {onRetry && (
        <motion.div
          variants={buttonVariants}
          className="flex flex-col sm:flex-row gap-3 items-center justify-center"
        >
          <motion.button
            onClick={onRetry}
            className="btn btn-outline px-6 py-3 text-sm border-red-500/50 text-red-400 hover:bg-red-500/10 hover:border-red-400"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="mr-2">🔄</span>
            Try Again
          </motion.button>
          
          <motion.button
            onClick={() => window.location.reload()}
            className="btn btn-primary px-6 py-3 text-sm"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="mr-2">↻</span>
            Refresh Page
          </motion.button>
        </motion.div>
      )}

      {/* Animated Background */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-red-500/5 to-orange-500/5 rounded-xl opacity-0 pointer-events-none"
        animate={{ opacity: [0, 0.5, 0] }}
        transition={{ duration: 3, repeat: Infinity }}
      />

      {/* Floating Error Indicators */}
      <div className="absolute top-2 right-2 flex space-x-1">
        {[0, 1, 2].map((index) => (
          <motion.div
            key={index}
            className="w-1 h-1 bg-red-500 rounded-full"
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.3, 1, 0.3]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: index * 0.3,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      {/* Corner Decoration */}
      <motion.div
        className="absolute bottom-2 left-2 w-2 h-2 bg-red-500/30 rounded-full"
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
      />
    </motion.div>
  );
};

export default ErrorMessage;
