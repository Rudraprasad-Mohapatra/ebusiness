import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import type { Brand } from '../../types';
import { fetchBrand } from '../../utils/api';

const Footer: React.FC = () => {
  const [brand, setBrand] = useState<Brand | null>(null);

  useEffect(() => {
    const loadBrand = async () => {
      const brandData = await fetchBrand();
      setBrand(brandData);
    };
    loadBrand();
  }, []);

  const footerStyle = brand ? {
    backgroundColor: brand.secondary_color,
    fontFamily: brand.font_family || 'inherit',
  } : {};

  return (
    <footer 
      className="text-white transition-colors duration-300"
      style={footerStyle}
    >
      {/* Main Footer Content */}
      <div className="container mx-auto px-3 sm:px-4 py-8 sm:py-12 max-w-7xl">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
          {/* Brand Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-center sm:text-left"
          >
            <h3 className="text-lg sm:text-xl font-bold mb-2">{brand?.name || 'Radharaman Crafts'}</h3>
            <p className="text-xs sm:text-sm opacity-90">{brand?.footer_text || 'Crafting quality products with tradition.'}</p>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-center sm:text-left"
          >
            <h4 className="text-base sm:text-lg font-bold mb-3">Contact</h4>
            <div className="text-xs sm:text-sm space-y-2">
              {brand?.contact_email && (
                <p>
                  📧 <a href={`mailto:${brand.contact_email}`} className="hover:opacity-80 transition-opacity">
                    {brand.contact_email}
                  </a>
                </p>
              )}
              {brand?.contact_phone && (
                <p>
                  📞 <a href={`tel:${brand.contact_phone}`} className="hover:opacity-80 transition-opacity">
                    {brand.contact_phone}
                  </a>
                </p>
              )}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-center sm:text-left"
          >
            <h4 className="text-base sm:text-lg font-bold mb-3">Quick Links</h4>
            <ul className="text-xs sm:text-sm space-y-2">
              <li><a href="/" className="hover:opacity-80 transition-opacity">Home</a></li>
              <li><a href="/products" className="hover:opacity-80 transition-opacity">Products</a></li>
              <li><a href="/about" className="hover:opacity-80 transition-opacity">About Us</a></li>
              <li><a href="/contact" className="hover:opacity-80 transition-opacity">Contact</a></li>
            </ul>
          </motion.div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="border-t border-white border-opacity-20 px-3 sm:px-4 py-4 sm:py-6 text-center">
        <p className="text-xs sm:text-sm opacity-90">
          &copy; {new Date().getFullYear()} {brand?.name || 'Radharaman Crafts'}. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;