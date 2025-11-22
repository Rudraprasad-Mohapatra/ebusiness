import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import ProductCarousel from './ProductCarousel';
import { fetchTrendingProducts } from '../../utils/api';
import type { Product } from '../../types';

const Hero: React.FC = () => {
  const [trendingProducts, setTrendingProducts] = useState<Product[]>([]);

  useEffect(() => {
    const loadTrendingProducts = async () => {
      try {
        const data = await fetchTrendingProducts();
        setTrendingProducts(data);
      } catch (error) {
        console.error('Failed to fetch trending products:', error);
      }
    };

    loadTrendingProducts();
  }, []);

  return (
    <div className="w-full bg-gray-50">
      {/* Welcome Section */}
      <section className="w-full px-4 py-8 sm:py-12 md:py-16 lg:py-20">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-3 sm:mb-4 md:mb-6">
              Welcome to Radharaman Crafts
            </h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-600 max-w-3xl mx-auto px-2"
            >
              Discover the finest handcrafted products made with love and passion
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Trending Products Carousel Section */}
      {trendingProducts.length > 0 && (
        <section className="w-full px-4 py-8 sm:py-12 md:py-16 lg:py-20 bg-white">
          <div className="max-w-6xl mx-auto">
            <motion.h2
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 text-center mb-6 sm:mb-8 md:mb-10"
            >
              Trending Products
            </motion.h2>
            
            {/* Carousel Container */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="w-full"
            >
              <div className="w-full h-64 sm:h-72 md:h-96 lg:h-[500px] rounded-lg overflow-hidden shadow-lg">
                <ProductCarousel products={trendingProducts} autoSwipeInterval={5000} />
              </div>
            </motion.div>

            {/* Optional: Additional context text */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="text-center text-gray-600 text-sm sm:text-base md:text-lg mt-6 sm:mt-8"
            >
              Explore our most popular and trending handcrafted items
            </motion.p>
          </div>
        </section>
      )}
    </div>
  );
};

export default Hero;