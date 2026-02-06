import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Testimonial, Brand } from '../../types';

interface TestimonialSliderProps {
  testimonials: Testimonial[];
  brand?: Brand | null;
  title?: string;
}

const TestimonialSlider: React.FC<TestimonialSliderProps> = ({ 
  testimonials, 
  brand,
  title = 'What Our Customers Say'
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);
  const [imageErrors, setImageErrors] = useState<Set<number>>(new Set());

  const handleImageError = (index: number) => {
    setImageErrors(prev => new Set(prev).add(index));
  };

  // Fallback avatar with initials
  const getFallbackAvatar = (name: string) => {
    const initials = name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
    
    return initials;
  };

  useEffect(() => {
    if (!autoPlay || testimonials.length === 0) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [testimonials.length, autoPlay]);

  if (testimonials.length === 0) {
    return null;
  }

  const currentTestimonial = testimonials[currentIndex];

  const goToPrevious = () => {
    setAutoPlay(false);
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setAutoPlay(false);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  const goToSlide = (index: number) => {
    setAutoPlay(false);
    setCurrentIndex(index);
  };

  // Resume autoplay after 10 seconds of inactivity
  useEffect(() => {
    if (!autoPlay) {
      const timer = setTimeout(() => setAutoPlay(true), 10000);
      return () => clearTimeout(timer);
    }
  }, [autoPlay]);

  return (
    <section className="w-full px-4 py-8 sm:py-12 md:py-16 lg:py-20" style={{ backgroundColor: '#f5f1e8' }}>
      <div className="max-w-5xl mx-auto">
        {/* Title */}
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-8 sm:mb-12 md:mb-16 text-center"
          style={{ color: brand?.accent_color }}
        >
          {title}
        </motion.h2>

        {/* Carousel Container */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          viewport={{ once: true }}
          className="relative"
        >
          {/* Testimonial Card with Animation */}
          <div className="bg-white rounded-lg shadow-xl overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.5 }}
                className="p-6 sm:p-8 md:p-12 lg:p-16 text-center"
              >
                {/* Avatar */}
                <div className="flex justify-center mb-6 md:mb-8">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="relative p-8"
                    // style={{ width: '80px', height: '80px' }}
                  >
                    {currentTestimonial.avatar && !imageErrors.has(currentIndex) ? (
                      <img
                        src={currentTestimonial.avatar}
                        alt={currentTestimonial.name}
                        className="w-full h-full object-cover border-4 shadow-lg"
                        style={{ borderColor: brand?.accent_color }}
                        onError={() => handleImageError(currentIndex)}
                      />
                    ) : (
                      <div
                        className="w-full h-full rounded-full border-4 flex items-center justify-center shadow-lg font-bold text-lg sm:text-xl md:text-2xl"
                        style={{
                          borderColor: brand?.accent_color,
                          backgroundColor: brand?.primary_color || '#1a4d2e',
                          color: 'white',
                        }}
                      >
                        {getFallbackAvatar(currentTestimonial.name)}
                      </div>
                    )}
                  </motion.div>
                </div>

                {/* Message */}
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-700 italic mb-6 md:mb-8 leading-relaxed max-w-3xl mx-auto"
                >
                  "{currentTestimonial.message}"
                </motion.p>

                {/* Name & Title */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  <p className="text-lg sm:text-xl md:text-2xl font-bold" style={{ color: brand?.accent_color }}>
                    {currentTestimonial.name}
                  </p>
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center justify-between mt-8 md:mt-10 gap-4">
            {/* Previous Button */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={goToPrevious}
              className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-full shadow-md hover:shadow-lg transition-all"
              style={{ backgroundColor: brand?.accent_color || '#ff6b35', color: 'white' }}
              aria-label="Previous testimonial"
            >
              <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </motion.button>

            {/* Dots Indicator */}
            <div className="flex justify-center gap-2 sm:gap-3 flex-wrap">
              {testimonials.map((_, index) => (
                <motion.button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className="rounded-full transition-all"
                  style={{
                    width: index === currentIndex ? '32px' : '10px',
                    height: '10px',
                    backgroundColor: index === currentIndex ? brand?.accent_color || '#ff6b35' : '#d1d5db',
                  }}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>

            {/* Next Button */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={goToNext}
              className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-full shadow-md hover:shadow-lg transition-all"
              style={{ backgroundColor: brand?.accent_color || '#ff6b35', color: 'white' }}
              aria-label="Next testimonial"
            >
              <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </motion.button>
          </div>

          {/* Auto-play Indicator */}
          {autoPlay && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center mt-4 text-xs sm:text-sm"
              style={{ color: brand?.accent_color }}
            >
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default TestimonialSlider;