import React from 'react';
import { motion } from 'framer-motion';
import Button from '../common/Button';

const Hero: React.FC = () => {
  return (
    <section className="bg-cover bg-center h-screen flex items-center justify-center" style={{ backgroundImage: 'url(/src/assets/images/hero-bg.jpg)' }}>
      <div className="text-center text-white">
        <motion.h1
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-6xl font-bold mb-4"
        >
          Welcome to Radharaman Crafts
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-lg md:text-xl mb-6"
        >
          Discover the finest handcrafted products made with love.
        </motion.p>
        <Button label="Shop Now" onClick={() => alert('Shop Now clicked!')} className="bg-blue-600 hover:bg-blue-700" />
      </div>
    </section>
  );
};

export default Hero;