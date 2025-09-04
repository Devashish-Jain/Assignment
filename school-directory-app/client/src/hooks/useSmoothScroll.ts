import { useEffect } from 'react';
import Lenis from 'lenis';

/**
 * Custom hook to initialize and manage Lenis smooth scrolling
 * This provides the high-end, fluid scrolling experience seen in premium websites
 */
export const useSmoothScroll = () => {
  useEffect(() => {
    // Initialize Lenis with basic settings for smooth scrolling
    const lenis = new Lenis({
      lerp: 0.1, // Linear interpolation factor (0-1, lower = smoother but slower)
      duration: 1.2, // Scroll duration
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Custom easing function
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
