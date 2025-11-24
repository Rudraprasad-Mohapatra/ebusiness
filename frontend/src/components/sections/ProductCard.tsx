import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import type { Product } from '../../types';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const navigate = useNavigate();

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
        {product.is_trending && (
          <div className="absolute top-2 right-2 bg-red-500 text-white px-3 py-1 rounded-full text-xs sm:text-sm font-bold">
            Trending
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-3 sm:p-4 md:p-5 flex flex-col grow">
        <h3 className="text-base sm:text-lg md:text-xl font-bold text-gray-900 mb-2 line-clamp-2">
          {product.name}
        </h3>
        
        <p className="text-xs sm:text-sm text-gray-600 mb-3 line-clamp-2 grow">
          {product.short_description || product.description || 'Premium handcrafted product'}
        </p>

        <div className="flex items-center justify-between">
          <p className="text-lg sm:text-xl md:text-2xl font-bold text-blue-600">
            ${parseFloat(product.price).toFixed(2)}
          </p>
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded text-xs sm:text-sm transition-colors"
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