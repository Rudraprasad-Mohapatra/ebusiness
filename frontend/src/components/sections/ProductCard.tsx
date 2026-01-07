import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { fetchBrand } from '../../utils/api';
import type { Product, Brand } from '../../types';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const navigate = useNavigate();
  const [brand, setBrand] = useState<Brand | null>(null);

  useEffect(() => {
    const loadBrand = async () => {
      const brandData = await fetchBrand();
      setBrand(brandData);
    };
    loadBrand();
  }, []);

  const accentColor = brand?.primary_color || '#1a4d2e';

  const handleClick = () => {
    navigate(`/products/${product.id}`);
  };

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.98 }}
      onClick={handleClick}
      className="bg-white shadow-md hover:shadow-xl rounded-lg overflow-hidden cursor-pointer transition-all h-full flex flex-col"
    >
      {/* Image Container */}
      <div className="relative w-full aspect-square bg-gray-200 overflow-hidden">
        <img 
          src={product.images} 
          alt={product.name} 
          className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
        />
        {/* {product.is_trending && (
          <div className="absolute top-2 right-2 bg-red-500 text-white px-3 py-1 rounded-full text-xs sm:text-sm font-bold">
            Trending
          </div>
        )} */}
      </div>

      {/* Content */}
      <div className="p-3 sm:p-4 md:p-5 flex flex-col grow">
        <h3 className="text-base sm:text-lg md:text-xl font-bold text-gray-900 mb-2 line-clamp-2">
          {product.name}
        </h3>
        
        <p className="text-xs sm:text-sm text-gray-600 mb-3 line-clamp-2 grow">
          {product.short_description || product.description || 'Premium handcrafted product'}
        </p>

        <div className="flex items-center justify-end">
          <button
            className="text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded text-xs sm:text-sm transition-all"
            style={{ backgroundColor: accentColor }}
            onClick={(e) => {
              e.stopPropagation();
              handleClick();
            }}
          >
            View
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;