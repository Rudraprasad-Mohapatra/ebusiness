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

  // Use warm cream background with dark text for better contrast
  const footerBgColor = '#f5f1e8';
  const footerTextColor = '#1a4d2e';

  return (
    <footer 
      className="transition-colors duration-300 border-t-4"
      style={{
        backgroundColor: footerBgColor,
        borderColor: '#1a4d2e',
        fontFamily: brand?.font_family || 'inherit',
      }}
    >
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 sm:px-6 md:px-8 py-12 sm:py-16 md:py-20 max-w-7xl">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 sm:gap-10 md:gap-12">
          {/* Brand Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-center sm:text-left"
          >
            <h3 className="text-lg sm:text-xl font-bold mb-2" style={{ color: footerTextColor }}>{brand?.name || 'Radharaman Crafts'}</h3>
            <p className="text-sm sm:text-base" style={{ color: footerTextColor, opacity: 0.8 }}>{brand?.footer_text || 'Crafting quality products with tradition.'}</p>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-center sm:text-left"
          >
            <h4 className="text-base sm:text-lg font-bold mb-3" style={{ color: footerTextColor }}>Contact</h4>
            <div className="text-sm sm:text-base space-y-2">
              {brand?.contact_email && (
                <p>
                  📧 <a href={`mailto:${brand.contact_email}`} className="hover:opacity-70 transition-opacity" style={{ color: footerTextColor }}>
                    {brand.contact_email}
                  </a>
                </p>
              )}
              {brand?.contact_phone && (
                <p>
                  📞 <a href={`tel:${brand.contact_phone}`} className="hover:opacity-70 transition-opacity" style={{ color: footerTextColor }}>
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
            <h4 className="text-base sm:text-lg font-bold mb-3" style={{ color: footerTextColor }}>Quick Links</h4>
            <ul className="text-sm sm:text-base space-y-2">
              <li><a href="/" className="hover:opacity-70 transition-opacity" style={{ color: footerTextColor }}>Home</a></li>
              <li><a href="/products" className="hover:opacity-70 transition-opacity" style={{ color: footerTextColor }}>Products</a></li>
              <li><a href="/about" className="hover:opacity-70 transition-opacity" style={{ color: footerTextColor }}>About Us</a></li>
              <li><a href="/contact" className="hover:opacity-70 transition-opacity" style={{ color: footerTextColor }}>Contact</a></li>
            </ul>
          </motion.div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="border-t px-4 sm:px-6 md:px-8 py-6 sm:py-8 text-center" style={{ borderColor: '#1a4d2e' }}>
        <p className="text-sm sm:text-base" style={{ color: footerTextColor, opacity: 0.8 }}>
          &copy; {new Date().getFullYear()} {brand?.name || 'Radharaman Crafts'}. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;