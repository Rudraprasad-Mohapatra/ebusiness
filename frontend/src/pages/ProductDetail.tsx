import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import ProductCarousel from '../components/sections/ProductCarousel';
import { fetchProducts, fetchBrand } from '../utils/api';
import type { Product, Brand } from '../types';

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const [brand, setBrand] = useState<Brand | null>(null);
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [productsData, brandData] = await Promise.all([
          fetchProducts(),
          fetchBrand(),
        ]);
        setAllProducts(productsData);
        setBrand(brandData);
        const found = productsData.find((p) => p.id === parseInt(id || '0'));
        if (found) {
          setProduct(found);
        }
      } catch (error) {
        console.error('Failed to fetch data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [id]);

  const handleOrderClick = () => {
    navigate('/contact');
  };

  const accentColor = brand?.primary_color || '#1a4d2e';

  if (loading) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
          className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full"
        ></motion.div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center">
        <div className="text-center px-4">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4" style={{color: brand?.accent_color}}
          >
            Product Not Found
          </h1>
          <p className="text-gray-600 mb-6" style={{color: brand?.accent_color}}
          >The product you're looking for doesn't exist.</p>
          <button
            onClick={() => navigate('/products')}
            className="text-white px-6 py-2 rounded-lg transition-colors"
            style={{color: brand?.accent_color}}
          >
            Back to Products
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* Breadcrumb Navigation */}
      <section className="w-full px-4 py-3 sm:py-4" style={{ backgroundColor: brand?.secondary_color, borderBottom: '1px solid #ddd' }}>
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center space-x-2 text-sm sm:text-base">
            <button
              onClick={() => navigate('/')}
              className="transition-colors duration-200"
              style={{color: brand?.accent_color}}
            >
              Home
            </button>
            <span style={{color: brand?.accent_color}}>/</span>
            <button
              onClick={() => navigate('/products')}
              className="transition-colors duration-200"
              style={{color: brand?.accent_color}}
            >
              Products
            </button>
            <span style={{color: brand?.accent_color}}>/</span>
            <span style={{color: brand?.accent_color}}>{product?.name}</span>
          </div>
        </div>
      </section>

      {/* Product Detail Section */}
      <section className="w-full px-4 py-8 sm:py-12 md:py-16 lg:py-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {/* Product Image/Carousel */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="md:col-span-1 lg:col-span-2"
            >
              <div className="sticky top-4 h-64 sm:h-80 md:h-96 lg:h-[500px] rounded-lg overflow-hidden shadow-lg border border-gray-200">
                <img
                  src={product.images}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>

            {/* Product Information */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="md:col-span-1"
            >
              {/* Trending Badge */}
              {/* {product.is_trending && (
                <div className="inline-block bg-red-500 text-white px-4 py-1 rounded-full text-xs sm:text-sm font-bold mb-4">
                  🔥 Trending
                </div>
              )} */}

              {/* Product Name */}
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 sm:mb-3" style={{color: brand?.accent_color}}>
                {product.name}
              </h1>

              {/* Model Number */}
              {product.model_name && (
                <p className="text-sm sm:text-base mb-4" style={{color: brand?.accent_color}}>
                  <span className="font-semibold" style={{color: brand?.accent_color}}>Model:</span> {product.model_name}
                </p>
              )}

              {/* Rating - COMMENTED OUT */}
              {/* <div className="flex items-center space-x-2 mb-6">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <span key={i}>⭐</span>
                  ))}
                </div>
                <span className="text-gray-600 text-sm sm:text-base">(48 reviews)</span>
              </div> */}

              {/* Price - COMMENTED OUT */}
              {/* <div className="p-4 rounded-lg mb-6" style={{ backgroundColor: '#f5f1e8' }}>
                <p className="text-gray-600 text-sm mb-2">Price</p>
                <p className="text-3xl sm:text-4xl md:text-5xl font-bold" style={{ color: accentColor }}>
                  ${parseFloat(product.price).toFixed(2)}
                </p>
              </div> */}

              {/* Description */}
              <div className="mb-6">
                <h3 className="text-lg sm:text-xl font-bold mb-3" style={{color: brand?.accent_color}}>Description</h3>
                <p className="text-sm sm:text-base leading-relaxed" style={{color: brand?.accent_color}}>
                  {product.short_description}
                </p>
              </div>

              {/* Details */}
              {product.details && (
                <div className="mb-6">
                  <h3 className="text-lg sm:text-xl font-bold mb-3" style={{color: brand?.accent_color}}>Details</h3>
                  <p className="text-sm sm:text-base leading-relaxed whitespace-pre-line" style={{color: brand?.accent_color}}>
                    {product.details}
                  </p>
                </div>
              )}

              {/* Variants */}
              {product.variants && Object.keys(product.variants).length > 0 && (
                <div className="mb-6">
                  <h3 className="text-lg sm:text-xl font-bold mb-3" style={{color: brand?.accent_color}}>Available Options</h3>
                  {Object.entries(product.variants).map(([key, values]) => (
                    <div key={key} className="mb-4">
                      <p className="text-sm sm:text-base mb-2 capitalize font-semibold" style={{color: brand?.accent_color}}>
                        {key}:
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {Array.isArray(values) &&
                          values.map((option: unknown, idx: number) => (
                            <button
                              key={idx}
                              className="border border-gray-300 px-4 py-2 rounded hover:border-blue-600 hover:bg-blue-50 transition-colors text-sm"
                            >
                              {String(option)}
                            </button>
                          ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={handleOrderClick}
                  className="flex-1 text-white font-bold py-3 rounded-lg transition-colors text-base sm:text-lg hover:opacity-90"
                  style={{ backgroundColor: brand?.accent_color, color: brand?.secondary_color }}
                >
                  📞 Order for Details
                </button>
                <button
                  onClick={() => navigate('/products')}
                  className="flex-1 font-bold py-3 rounded-lg transition-colors text-base sm:text-lg"
                  style={{ backgroundColor: brand?.accent_color, color: brand?.secondary_color }}
                >
                  ← Back to Products
                </button>
              </div>
            </motion.div>
          </div>

          {/* Related Products Carousel */}
          {allProducts.length > 1 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="mt-12 sm:mt-16 md:mt-20"
            >
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 sm:mb-8" style={{color: brand?.accent_color}}>
                Related Products
              </h2>
              <div className="h-64 sm:h-72 md:h-96 rounded-lg overflow-hidden shadow-lg">
                <ProductCarousel 
                  products={allProducts.filter(p => p.id !== product.id).slice(0, 5)} 
                  autoSwipeInterval={4000}
                />
              </div>
            </motion.div>
          )}
        </div>
      </section>
    </div>
  );
};

export default ProductDetail;
