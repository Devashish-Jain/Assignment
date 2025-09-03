import { useEffect } from 'react';
import Lenis from '@studio-freight/lenis';

/**
 * Custom hook to initialize and manage Lenis smooth scrolling
 * This provides the high-end, fluid scrolling experience seen in premium websites
 */
export const useSmoothScroll = () => {
  useEffect(() => {
    // Initialize Lenis with optimal settings for smooth scrolling
    const lenis = new Lenis({
      lerp: 0.1, // Linear interpolation factor (0-1, lower = smoother but slower)
      duration: 1.2, // Scroll duration
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Custom easing function
      direction: 'vertical', // Scroll direction
      gestureDirection: 'vertical', // Gesture direction
      smooth: true,
      smoothTouch: false, // Disable smooth scrolling on touch devices for better performance
      touchMultiplier: 2,
      infinite: false,
    });

    // Animation frame function for Lenis
    const raf = (time: number) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };

    // Start the animation loop
    requestAnimationFrame(raf);

    // Cleanup function
    return () => {
      lenis.destroy();
    };
  }, []);
};
