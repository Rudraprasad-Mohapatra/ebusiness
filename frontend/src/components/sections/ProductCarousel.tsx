import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Product } from '../../types';

interface ProductCarouselProps {
  products: Product[];
  autoSwipeInterval?: number;
}

const ProductCarousel: React.FC<ProductCarouselProps> = ({ products, autoSwipeInterval = 5000 }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  if (products.length === 0) {
    return null;
  }

  // Start auto-swipe interval
  const startAutoSwipe = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prev) => (prev + 1) % products.length);
    }, autoSwipeInterval);
  };

  // Reset auto-swipe on manual interaction
  const resetAutoSwipe = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    startAutoSwipe();
  };

  useEffect(() => {
    startAutoSwipe();
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [products.length, autoSwipeInterval]);

  const paginate = (newDirection: number) => {
    setDirection(newDirection);
    setCurrentIndex((prev) => {
      let newIndex = prev + newDirection;
      if (newIndex < 0) newIndex = products.length - 1;
      if (newIndex >= products.length) newIndex = 0;
      return newIndex;
    });
    resetAutoSwipe();
  };

  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (dir: number) => ({
      zIndex: 0,
      x: dir < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  };

  const current = products[currentIndex];

  return (
    <div className="relative w-full h-full overflow-hidden bg-gray-100">
      <AnimatePresence initial={false} custom={direction} mode="wait">
        <motion.div
          key={currentIndex}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: 'spring', stiffness: 300, damping: 30 },
            opacity: { duration: 0.5 },
          }}
          className="absolute inset-0"
        >
          {/* Background Image Container */}
          <div className="w-full h-full relative bg-gray-200">
            <img
              src={current.images}
              alt={current.name}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Content - Mobile first responsive */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-3 sm:p-4 md:p-6 lg:p-8 bg-black/20 sm:bg-black/25 md:bg-black/30">
            {/* Product Name */}
            {/* <motion.h2
              initial={{ opacity: 0, y: -15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-center mb-2 sm:mb-3 md:mb-4 drop-shadow-2xl line-clamp-2"
            >
              {current.name}
            </motion.h2> */}

            {/* Product Description */}
            {/* <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="text-xs sm:text-sm md:text-base lg:text-lg text-center mb-3 sm:mb-4 md:mb-6 max-w-xs sm:max-w-sm md:max-w-2xl drop-shadow-2xl line-clamp-2 sm:line-clamp-3"
            >
              {current.short_description || current.description || 'Premium handcrafted product'}
            </motion.p> */}

            {/* Price - COMMENTED OUT */}
            {/* <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="flex flex-col items-center"
            >
              <span className="text-xs sm:text-sm text-gray-100 mb-1 drop-shadow-lg">Starting at</span>
              <p className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold drop-shadow-2xl">
                ${parseFloat(current.price).toFixed(2)}
              </p>
            </motion.div> */}
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Left Arrow Button - Mobile optimized */}
      <button
        onClick={() => paginate(-1)}
        className="absolute left-2 sm:left-3 md:left-4 top-1/2 transform -translate-y-1/2 z-10 bg-white bg-opacity-60 hover:bg-opacity-80 text-black rounded-full p-1.5 sm:p-2 md:p-3 lg:p-4 transition-all hover:scale-110 active:scale-95"
        aria-label="Previous product"
        title="Previous"
      >
        <svg
          className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 lg:w-7 lg:h-7"
          fill="none"
          stroke="currentColor"
          strokeWidth={2.5}
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      {/* Right Arrow Button - Mobile optimized */}
      <button
        onClick={() => paginate(1)}
        className="absolute right-2 sm:right-3 md:right-4 top-1/2 transform -translate-y-1/2 z-10 bg-white bg-opacity-60 hover:bg-opacity-80 text-black rounded-full p-1.5 sm:p-2 md:p-3 lg:p-4 transition-all hover:scale-110 active:scale-95"
        aria-label="Next product"
        title="Next"
      >
        <svg
          className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 lg:w-7 lg:h-7"
          fill="none"
          stroke="currentColor"
          strokeWidth={2.5}
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Indicators - Mobile responsive */}
      <div className="absolute bottom-3 sm:bottom-4 md:bottom-6 left-1/2 transform -translate-x-1/2 z-10 flex gap-1.5 sm:gap-2">
        {products.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setDirection(index > currentIndex ? 1 : -1);
              setCurrentIndex(index);
              resetAutoSwipe();
            }}
            className={`rounded-full transition-all duration-300 ${
              index === currentIndex
                ? 'bg-white w-6 sm:w-8 md:w-10 h-2 sm:h-2.5 md:h-3'
                : 'bg-white bg-opacity-50 w-1.5 sm:w-2 md:w-3 h-1.5 sm:h-2 md:h-2.5 hover:bg-opacity-75'
            }`}
            aria-label={`Go to product ${index + 1}`}
            title={`Product ${index + 1}`}
          />
        ))}
      </div>

      {/* Counter Badge - Mobile responsive */}
      <div className="absolute top-3 sm:top-4 md:top-6 right-3 sm:right-4 md:right-6 bg-black bg-opacity-60 text-white px-2.5 sm:px-3 md:px-4 py-1 sm:py-1.5 rounded-full text-xs sm:text-sm md:text-base font-semibold">
        {currentIndex + 1} / {products.length}
      </div>
    </div>
  );
};

export default ProductCarousel;
