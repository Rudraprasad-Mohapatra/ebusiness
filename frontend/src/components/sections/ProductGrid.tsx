import React from 'react';
import { motion } from 'framer-motion';
import ProductCard from './ProductCard.tsx';
import type { Product, Brand } from '../../types';

interface ProductGridProps {
  products: Product[];
  title?: string;
  brand?: Brand | null;
}

const ProductGrid: React.FC<ProductGridProps> = ({ products, title = 'Our Products',brand }) => {
  return (
    <section className="w-full bg-gray-50 px-4 py-8 sm:py-12 md:py-16 lg:py-20">
      <div className="max-w-7xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 md:mb-8 text-center"
          style={{color: brand?.accent_color}}
        >
          {title}
        </motion.h2>

        {products.length === 0 ? (
          <div className="text-center py-12 sm:py-16">
            <p className="text-gray-600 text-base sm:text-lg md:text-xl">No products available at the moment.</p>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5 md:gap-6 lg:gap-7"
          >
            {products.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05, duration: 0.4 }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default ProductGrid;