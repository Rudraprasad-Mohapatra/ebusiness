import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import ContactForm from '../components/sections/ContactForm';
import { fetchBrand } from '../utils/api';
import type { Brand } from '../types';

const Contact: React.FC = () => {
  const [brand, setBrand] = useState<Brand | null>(null);

  useEffect(() => {
    const loadBrand = async () => {
      const brandData = await fetchBrand();
      setBrand(brandData);
    };
    loadBrand();
  }, []);

  const headerStyle = brand ? {
    backgroundColor: brand?.secondary_color || '#1a4d2e',
  } : {};

  return (
    <div className="w-full">
      {/* Page Header */}
      <section className="w-full px-4 py-8 sm:py-12 md:py-16 text-white" style={headerStyle}>
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-3 sm:mb-4" style={{color: brand?.accent_color}}>
              Get in Touch
            </h1>
            <p className="text-sm sm:text-base md:text-lg opacity-90 max-w-2xl mx-auto" style={{color: brand?.accent_color}}>
              Have questions about our products? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Content */}
      <section className="w-full px-4 py-8 sm:py-12 md:py-16 lg:py-20">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <ContactForm />
          </motion.div>
        </div>
      </section>

      {/* Footer CTA Section */}
      {/* <section className="w-full px-4 py-12 sm:py-16 md:py-20 border-t-4" style={{ backgroundColor: footerBgColor, borderColor: brand?.accent_color }}>
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4" style={{ color: footerTextColor }}>
              Other Ways to Reach Us
            </h2>
            <p className="text-base sm:text-lg mb-8" style={{ color: footerTextColor, opacity: 0.85 }}>
              {brand ? (
                <>
                  <span>📧 {brand.contact_email}</span>
                  <span className="mx-4">•</span>
                  <span>📞 {brand.contact_phone}</span>
                </>
              ) : (
                'Contact information will be loaded from your brand settings'
              )}
            </p>
          </motion.div>
        </div>
      </section> */}
    </div>
  );
};

export default Contact;
