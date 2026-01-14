import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { fetchProductTypes, fetchBrand } from '../../utils/api';
import type { ProductType as ProductTypeType, Brand } from '../../types';
import { useNavigate } from 'react-router-dom';

const ProductType: React.FC = () => {
  const [productTypes, setProductTypes] = useState<ProductTypeType[]>([]);
  const [brand, setBrand] = useState<Brand | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const loadData = async () => {
      try {
        const [types, brandData] = await Promise.all([
          fetchProductTypes(),
          fetchBrand(),
        ]);
        setProductTypes(types);
        setBrand(brandData);
      } catch (error) {
        console.error('Failed to fetch data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  if (loading || productTypes.length === 0) {
    return null;
  }

  // Determine if there's a clearance item (typically the last one or one with special styling)
  const isClearance = (index: number) => {
    return index === productTypes.length - 1 && productTypes.length % 2 === 1;
  };

  const handleTypeClick = (typeId: number) => {
    navigate(`/products?type=${typeId}`);
  };

  return (
    <section className="w-full bg-white px-4 py-8 sm:py-12 md:py-16 lg:py-20">
      <div className="max-w-7xl mx-auto">
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-8 sm:mb-12 md:mb-16"
        >
          <h2
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-2 sm:mb-3"
            style={{ color: brand?.accent_color }}
          >
            Featured Categories
          </h2>
        </motion.div>

        {/* Product Types Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4 md:gap-6 lg:gap-8"
        >
          {productTypes.map((type, index) => {
            const isClearanceItem = isClearance(index);

            return (
              <motion.div
                key={type.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05, duration: 0.4 }}
                viewport={{ once: true }}
                whileHover={{ y: -8 }}
                onClick={() => handleTypeClick(type.id)}
                className="cursor-pointer"
              >
                {isClearanceItem ? (
                  // Clearance Item - Highlighted Circle
                  <div className="flex flex-col items-center group">
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 lg:w-32 lg:h-32 rounded-full flex items-center justify-center mb-3 sm:mb-4 transition-all duration-300 shadow-md hover:shadow-lg overflow-hidden"
                      style={{ backgroundColor: brand?.accent_color }}
                    >
                      <span className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white">
                        {type.name.charAt(0).toUpperCase()}
                      </span>
                    </motion.div>
                    <h3
                      className="text-center text-xs sm:text-sm md:text-base lg:text-lg font-bold leading-tight px-1"
                      style={{ color: brand?.accent_color }}
                    >
                      {type.name}
                    </h3>
                  </div>
                ) : (
                  // Regular Item - Light Gray Circle with Image
                  <div className="flex flex-col items-center group">
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 lg:w-32 lg:h-32 rounded-full flex items-center justify-center mb-3 sm:mb-4 bg-gray-100 group-hover:bg-gray-200 transition-all duration-300 shadow-sm group-hover:shadow-md overflow-hidden"
                    >
                      {(type as any).image ? (
                        <img
                          src={(type as any).image}
                          alt={type.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <span className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-600">
                          {type.name.charAt(0).toUpperCase()}
                        </span>
                      )}
                    </motion.div>
                    <h3 className="text-center text-xs sm:text-sm md:text-base lg:text-lg font-semibold text-gray-800 group-hover:text-gray-900 leading-tight px-1">
                      {type.name}
                    </h3>
                  </div>
                )}
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default ProductType;