import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import type { Brand } from '../../types';
import { fetchBrand } from '../../utils/api';

const Header: React.FC = () => {
  const [brand, setBrand] = useState<Brand | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadBrand = async () => {
      setIsLoading(true);
      const brandData = await fetchBrand();
      setBrand(brandData);
      setIsLoading(false);
    };
    loadBrand();
  }, []);

  const headerStyle = brand ? {
    backgroundColor: brand.primary_color,
    fontFamily: brand.font_family || 'inherit',
  } : {};

  return (
    <header 
      className="shadow-lg sticky top-0 z-50 transition-colors duration-300"
      style={headerStyle}
    >
      <div className="container mx-auto px-3 sm:px-4 py-2 sm:py-3 flex items-center justify-between max-w-7xl">
        {/* Logo Section */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-2 sm:gap-3"
        >
          {!isLoading && brand?.logo && (
            <img 
              src={brand.logo} 
              alt={brand.name}
              className="h-10 sm:h-12 w-auto object-contain"
            />
          )}
          <Link 
            to="/" 
            className="text-lg sm:text-2xl font-bold text-white hover:opacity-80 transition-opacity"
          >
            {brand?.name || 'Radharaman Crafts'}
          </Link>
        </motion.div>

        {/* Navigation */}
        <nav className="shrink-0">
          <ul className="flex gap-2 sm:gap-4 md:gap-6 text-xs sm:text-sm md:text-base">
            <li>
              <Link 
                to="/about" 
                className="text-white hover:opacity-80 transition-opacity font-medium"
              >
                About
              </Link>
            </li>
            <li>
              <Link 
                to="/products" 
                className="text-white hover:opacity-80 transition-opacity font-medium"
              >
                Products
              </Link>
            </li>
            <li>
              <Link 
                to="/contact" 
                className="text-white hover:opacity-80 transition-opacity font-medium"
              >
                Contact
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;