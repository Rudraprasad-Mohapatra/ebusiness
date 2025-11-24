import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import ProductGrid from '../components/sections/ProductGrid';
import { fetchProducts } from '../utils/api';
import type { Product } from '../types';

const Products: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await fetchProducts();
        setProducts(data);
      } catch (error) {
        console.error('Failed to fetch products:', error);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  return (
    <div className="w-full">
      {/* Page Header */}
      <section className="w-full bg-linear-to-r from-blue-600 to-blue-800 px-4 py-8 sm:py-12 md:py-16">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-3 sm:mb-4">
              Our Products
            </h1>
            <p className="text-sm sm:text-base md:text-lg text-blue-100 max-w-2xl mx-auto">
              Explore our complete collection of handcrafted products designed with care and passion
            </p>
          </motion.div>
        </div>
      </section>

      {/* Products Section */}
      {loading ? (
        <section className="w-full bg-gray-50 px-4 py-16 sm:py-20 md:py-24">
          <div className="max-w-7xl mx-auto text-center">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
              className="inline-block w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full"
            ></motion.div>
            <p className="mt-4 text-gray-600 text-base sm:text-lg">Loading products...</p>
          </div>
        </section>
      ) : (
        <ProductGrid products={products} title="" />
      )}
    </div>
  );
};

export default Products;
