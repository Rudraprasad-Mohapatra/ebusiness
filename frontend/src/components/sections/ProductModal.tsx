import React from 'react';
import { motion } from 'framer-motion';
import type { Product } from '../../types';

interface ProductModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}

const ProductModal: React.FC<ProductModalProps> = ({ product, isOpen, onClose }) => {
  if (!isOpen || !product) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="bg-white rounded-lg p-6 w-full max-w-lg relative"
      >
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
          onClick={onClose}
        >
          &times;
        </button>
        <img src={product.images} alt={product.name} className="w-full h-64 object-cover rounded" />
        <h2 className="text-2xl font-bold mt-4">{product.name}</h2>
        <p className="text-gray-600 mt-2">{product.description}</p>
        {/* Price - COMMENTED OUT */}
        {/* <p className="text-blue-500 font-bold mt-4 text-lg">${parseFloat(product.price).toFixed(2)}</p> */}
      </motion.div>
    </div>
  );
};

export default ProductModal;