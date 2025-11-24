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

  const headerBgColor = brand?.primary_color || '#1a4d2e';
  const headerStyle = brand ? {
    backgroundColor: headerBgColor,
    fontFamily: brand.font_family || 'inherit',
  } : {};

  return (
    <header 
      className="shadow-xl sticky top-0 z-50 transition-all duration-300"
      style={headerStyle}
    >
      <div className="container mx-auto px-4 sm:px-6 md:px-8 py-3 sm:py-4 md:py-5 flex items-center justify-between max-w-7xl">
        {/* Logo Section */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-3 sm:gap-4 shrink-0"
        >
          {!isLoading && brand?.logo && (
            <img 
              src={brand.logo} 
              alt={brand.name}
              className="h-12 sm:h-14 md:h-16 w-auto object-contain drop-shadow-lg"
            />
          )}
          <Link 
            to="/" 
            className="text-sm sm:text-lg md:text-2xl font-bold text-white hover:text-gray-100 transition-colors duration-200 line-clamp-1 md:line-clamp-none"
          >
            {brand?.name || 'Radharaman'}
          </Link>
        </motion.div>

        {/* Navigation */}
        <nav className="shrink-0 hidden sm:block">
          <ul className="flex gap-6 md:gap-8 text-sm md:text-base">
            <li>
              <Link 
                to="/about" 
                className="text-white hover:text-gray-100 transition-colors duration-200 font-medium px-2 py-2"
              >
                About
              </Link>
            </li>
            <li>
              <Link 
                to="/products" 
                className="text-white hover:text-gray-100 transition-colors duration-200 font-medium px-2 py-2"
              >
                Products
              </Link>
            </li>
            <li>
              <Link 
                to="/contact" 
                className="text-white hover:text-gray-100 transition-colors duration-200 font-medium px-2 py-2"
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