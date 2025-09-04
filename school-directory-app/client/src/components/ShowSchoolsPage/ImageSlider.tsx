import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, EffectFade } from 'swiper/modules';
import { motion, AnimatePresence } from 'framer-motion';
import apiService from '../../services/apiService';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

interface ImageSliderProps {
  images: string[];
  schoolName: string;
}

const ImageSlider: React.FC<ImageSliderProps> = ({ images, schoolName }) => {
  const [isLoading, setIsLoading] = useState<{ [key: string]: boolean }>({});
  const [hasError, setHasError] = useState<{ [key: string]: boolean }>({});
  const [isHovered, setIsHovered] = useState(false);

  // Handle image loading
  const handleImageLoad = (imageId: string) => {
    setIsLoading(prev => ({ ...prev, [imageId]: false }));
  };

  // Handle image error
  const handleImageError = (imageId: string) => {
    setIsLoading(prev => ({ ...prev, [imageId]: false }));
    setHasError(prev => ({ ...prev, [imageId]: true }));
  };

  // Set loading state when image starts loading
  const handleImageLoadStart = (imageId: string) => {
    setIsLoading(prev => ({ ...prev, [imageId]: true }));
  };

  if (!images || images.length === 0) {
    return (
      <div className="w-full h-full bg-gradient-to-br from-dark-700 to-dark-600 flex items-center justify-center">
        <div className="text-center text-dark-400">
          <div className="text-4xl mb-2">🏫</div>
          <p className="text-sm">No images available</p>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      className="relative w-full h-full group"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Swiper
        modules={[Navigation, Pagination, Autoplay, EffectFade]}
        spaceBetween={0}
        slidesPerView={1}
        navigation={{
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        }}
        pagination={{
          el: '.swiper-pagination',
          clickable: true,
          dynamicBullets: true,
        }}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        effect={images.length > 1 ? 'fade' : undefined}
        fadeEffect={{
          crossFade: true
        }}
        loop={images.length > 1}
        className="w-full h-full rounded-t-xl"
      >
        {images.map((imageId, index) => (
          <SwiperSlide key={`${imageId}-${index}`}>
            <div className="relative w-full h-full">
              {/* Loading Skeleton */}
              <AnimatePresence>
                {isLoading[imageId] && (
                  <motion.div
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 bg-gradient-to-r from-dark-700 via-dark-600 to-dark-700 bg-[length:200%_100%] animate-pulse"
                  >
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-dark-400 text-center">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500 mx-auto mb-2"></div>
                        <p className="text-sm">Loading image...</p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Error State */}
              {hasError[imageId] ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="w-full h-full bg-gradient-to-br from-dark-700 to-dark-600 flex items-center justify-center"
                >
                  <div className="text-center text-dark-400">
                    <div className="text-4xl mb-2">⚠️</div>
                    <p className="text-sm">Failed to load image</p>
                  </div>
                </motion.div>
              ) : (
                <motion.img
                  src={apiService.getImageUrl(imageId)}
                  alt={`${schoolName} - Image ${index + 1}`}
                  className="w-full h-full object-cover"
                  onLoadStart={() => handleImageLoadStart(imageId)}
                  onLoad={() => handleImageLoad(imageId)}
                  onError={() => handleImageError(imageId)}
                  initial={{ scale: 1.1 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  whileHover={{ scale: 1.05 }}
                  loading="lazy"
                  decoding="async"
                  fetchPriority={index === 0 ? "high" : "low"} // Prioritize first image
                />
              )}

              {/* Image Overlay on Hover */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-t from-dark-900/60 via-transparent to-transparent"
                initial={{ opacity: 0 }}
                animate={{ opacity: isHovered ? 1 : 0 }}
                transition={{ duration: 0.3 }}
              />

              {/* Image Index Indicator */}
              {images.length > 1 && (
                <motion.div
                  className="absolute top-3 right-3 bg-dark-900/80 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-full"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  {index + 1} / {images.length}
                </motion.div>
              )}
            </div>
          </SwiperSlide>
        ))}

        {/* Custom Navigation Buttons */}
        {images.length > 1 && (
          <>
            <motion.div
              className="swiper-button-prev"
              initial={{ opacity: 0, x: -20 }}
              animate={{ 
                opacity: isHovered ? 1 : 0.7, 
                x: isHovered ? 0 : -10 
              }}
              transition={{ duration: 0.3 }}
            />
            <motion.div
              className="swiper-button-next"
              initial={{ opacity: 0, x: 20 }}
              animate={{ 
                opacity: isHovered ? 1 : 0.7, 
                x: isHovered ? 0 : 10 
              }}
              transition={{ duration: 0.3 }}
            />
          </>
        )}

        {/* Custom Pagination */}
        {images.length > 1 && (
          <motion.div
            className="swiper-pagination"
            initial={{ opacity: 0, y: 20 }}
            animate={{ 
              opacity: isHovered ? 1 : 0.8, 
              y: isHovered ? 0 : 10 
            }}
            transition={{ duration: 0.3 }}
          />
        )}
      </Swiper>

      {/* Hover Overlay with Image Count */}
      <AnimatePresence>
        {isHovered && images.length > 1 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute bottom-3 left-3 bg-dark-900/90 backdrop-blur-sm text-white text-xs px-3 py-2 rounded-lg border border-dark-600/50"
          >
            <div className="flex items-center gap-2">
              <span>📸</span>
              <span>Slide to view {images.length} photos</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Loading Progress Bar (for multiple images) */}
      {images.length > 1 && Object.values(isLoading).some(loading => loading) && (
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-1 bg-dark-600"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="h-full bg-gradient-to-r from-primary-500 to-secondary-500"
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 2, ease: "easeInOut" }}
          />
        </motion.div>
      )}

      {/* Image Quality Indicators */}
      <motion.div
        className="absolute top-3 left-3 flex gap-1"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5 }}
      >
        {images.map((_, index) => (
          <div
            key={index}
            className="w-1.5 h-1.5 bg-primary-500 rounded-full opacity-60"
          />
        ))}
      </motion.div>
    </motion.div>
  );
};

export default ImageSlider;
