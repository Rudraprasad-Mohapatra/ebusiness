import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useSearchParams } from 'react-router-dom';
import ProductGrid from '../components/sections/ProductGrid';
import { fetchProducts, fetchBrand } from '../utils/api';
import type { Product, Brand } from '../types';

const Products: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [brand, setBrand] = useState<Brand | null>(null);
  const [loading, setLoading] = useState(true);
  const [searchParams] = useSearchParams();
  const typeId = searchParams.get('type');

  useEffect(() => {
    const loadData = async () => {
      try {
        const typeIdNum = typeId ? parseInt(typeId, 10) : undefined;
        const [productsData, brandData] = await Promise.all([
          fetchProducts(typeIdNum),
          fetchBrand(),
        ]);
        setProducts(productsData);
        setBrand(brandData);
      } catch (error) {
        console.error('Failed to fetch data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [typeId]);


  return (
    <div className="w-full">
      {/* Page Header */}
      <section className="w-full px-4 py-8 sm:py-12 md:py-16 text-white" style={{backgroundColor: brand?.secondary_color}}>
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-3 sm:mb-4"
            style={{color: brand?.accent_color}}
            >
              Our Products
            </h1>
            <p className="text-sm sm:text-base md:text-lg opacity-90 max-w-2xl mx-auto" style={{color: brand?.accent_color}}>
              {brand?.header_text}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Products Section */}
      {loading ? (
        <section className="w-full px-4 py-16 sm:py-20 md:py-24" style={{ backgroundColor: '#f5f1e8' }}>
          <div className="max-w-7xl mx-auto text-center">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
              className="inline-block w-12 h-12 border-4 border-gray-300 rounded-full"
              style={{borderTopColor: brand?.accent_color}}
            ></motion.div>
            <p className="mt-4 text-gray-700 text-base sm:text-lg">Loading products...</p>
          </div>
        </section>
      ) : (
        <ProductGrid products={products} title="" brand={brand} />
      )}
    </div>
  );
};

export default Products;
