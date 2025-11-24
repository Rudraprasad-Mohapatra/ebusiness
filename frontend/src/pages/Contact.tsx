import React from 'react';
import { motion } from 'framer-motion';
import ContactForm from '../components/sections/ContactForm';

const Contact: React.FC = () => {
  return (
    <div className="w-full">
      {/* Page Header */}
      <section className="w-full bg-linear-to-r from-blue-600 to-blue-800 px-4 py-8 sm:py-12 md:py-16">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-3 sm:mb-4">
              Get in Touch
            </h1>
            <p className="text-sm sm:text-base md:text-lg text-blue-100 max-w-2xl mx-auto">
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
    </div>
  );
};

export default Contact;
