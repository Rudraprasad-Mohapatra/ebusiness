import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import type { Brand } from '../types';
import { fetchBrand } from '../utils/api';

const About: React.FC = () => {
  const [brand, setBrand] = useState<Brand | null>(null);

  useEffect(() => {
    const loadBrand = async () => {
      const brandData = await fetchBrand();
      setBrand(brandData);
    };
    loadBrand();
  }, []);

  const backgroundStyle = brand?.background_image ? {
    backgroundImage: `url(${brand.background_image})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundAttachment: 'fixed',
  } : {};

  const headerStyle = brand ? {
    backgroundColor: brand.primary_color || '#1a4d2e',
  } : {};

  const footerBgColor = '#f5f1e8';
  const footerTextColor = '#1a4d2e';

  const accentStyle = brand ? {
    color: brand.primary_color || '#1a4d2e',
    borderColor: brand.primary_color || '#1a4d2e',
  } : {};

  return (
    <div className="w-full">
      {/* Page Header */}
      <section 
        className="w-full px-4 py-8 sm:py-12 md:py-16 text-white"
        style={headerStyle}
      >
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-3 sm:mb-4">
              About {brand?.name || 'Radharaman Crafts'}
            </h1>
            <p className="text-sm sm:text-base md:text-lg opacity-90 max-w-2xl mx-auto">
              {brand?.header_text || 'Discover our story and mission'}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Hero Section with Background */}
      {brand?.background_image && (
        <section 
          className="w-full h-64 sm:h-80 md:h-96 lg:h-[500px] relative overflow-hidden"
          style={backgroundStyle}
        >
          <div className="absolute inset-0 bg-opacity-40 flex items-center justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="text-center text-white px-4"
            >
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3">
                Tradition Meets Quality
              </h2>
              <p className="text-sm sm:text-base md:text-lg max-w-2xl">
                Crafted with care and excellence since day one
              </p>
            </motion.div>
          </div>
        </section>
      )}

      {/* Content Section */}
      <section className="w-full px-4 py-8 sm:py-12 md:py-16 lg:py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          {/* Brand Story */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-12 sm:mb-16"
          >
            <h2 
              className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6"
              style={accentStyle}
            >
              Our Story
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-gray-700 leading-relaxed mb-4">
              {brand?.about_text || `Welcome to ${brand?.name || 'Radharaman Crafts'}. We are dedicated to creating exceptional handcrafted products using traditional techniques and sustainable materials. Each product is carefully crafted with attention to detail and a commitment to quality.`}
            </p>
          </motion.div>

          {/* Mission & Values */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {/* Mission */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white p-6 sm:p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow"
            >
              <div 
                className="text-4xl mb-4"
                style={{ color: brand?.primary_color || '#3b82f6' }}
              >
                🎯
              </div>
              <h3 
                className="text-lg sm:text-xl font-bold mb-3"
                style={accentStyle}
              >
                Our Mission
              </h3>
              <p className="text-sm sm:text-base text-gray-600">
                To create sustainable, high-quality products that blend traditional craftsmanship with modern design.
              </p>
            </motion.div>

            {/* Values */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white p-6 sm:p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow"
            >
              <div 
                className="text-4xl mb-4"
                style={{ color: brand?.primary_color || '#3b82f6' }}
              >
                ✨
              </div>
              <h3 
                className="text-lg sm:text-xl font-bold mb-3"
                style={accentStyle}
              >
                Our Values
              </h3>
              <p className="text-sm sm:text-base text-gray-600">
                Quality, sustainability, and customer satisfaction are at the heart of everything we do.
              </p>
            </motion.div>

            {/* Commitment */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white p-6 sm:p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow"
            >
              <div 
                className="text-4xl mb-4"
                style={{ color: brand?.primary_color || '#3b82f6' }}
              >
                💚
              </div>
              <h3 
                className="text-lg sm:text-xl font-bold mb-3"
                style={accentStyle}
              >
                Our Commitment
              </h3>
              <p className="text-sm sm:text-base text-gray-600">
                We are committed to eco-friendly practices and creating products that benefit both our customers and the planet.
              </p>
            </motion.div>
          </div>

          {/* Why Choose Us */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="mt-12 sm:mt-16"
          >
            <h2 
              className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 sm:mb-8"
              style={accentStyle}
            >
              Why Choose Us?
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              {[
                '🌿 100% Eco-Friendly Materials',
                '✋ Handcrafted with Care',
                '🏆 Premium Quality Assurance',
                '🌍 Sustainable Practices',
                '💎 Unique & Exclusive Designs',
                '📦 Fast & Secure Shipping',
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 * index }}
                  className="flex items-center gap-3 p-3 sm:p-4 bg-white rounded-lg shadow-sm"
                >
                  <div className="text-xl shrink-0">{item.split(' ')[0]}</div>
                  <p className="text-sm sm:text-base text-gray-700">{item.substring(2)}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Contact CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="mt-12 sm:mt-16 text-center"
          >
            <p className="text-sm sm:text-base md:text-lg text-gray-700 mb-4 sm:mb-6">
              Have questions? We'd love to hear from you!
            </p>
            <a
              href="/contact"
              className="inline-block px-6 sm:px-8 py-3 sm:py-4 text-white font-bold rounded-lg transition-opacity hover:opacity-90 text-sm sm:text-base"
              style={{ backgroundColor: brand?.primary_color || '#3b82f6' }}
            >
              Get in Touch
            </a>
          </motion.div>
        </div>
      </section>

      {/* Brand Info Section */}
      <section 
        className="w-full px-4 py-12 sm:py-16 md:py-20 border-t-4"
        style={{ backgroundColor: footerBgColor, borderColor: '#1a4d2e' }}
      >
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8"
          >
            {/* About Brand */}
            <div>
              <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4" style={{ color: footerTextColor }}>About {brand?.name}</h3>
              <p className="text-sm sm:text-base leading-relaxed" style={{ color: footerTextColor, opacity: 0.85 }}>
                {brand?.footer_text || 'Crafting quality products with tradition. We believe in creating products that last, that matter, and that make a difference in people\'s lives.'}
              </p>
            </div>

            {/* Contact Info */}
            <div>
              <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4" style={{ color: footerTextColor }}>Get in Touch</h3>
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
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default About;