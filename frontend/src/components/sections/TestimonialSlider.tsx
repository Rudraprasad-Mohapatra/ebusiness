import React from 'react';
import { motion } from 'framer-motion';
import type { Testimonial } from '../../types';

interface TestimonialSliderProps {
  testimonials: Testimonial[];
}

const TestimonialSlider: React.FC<TestimonialSliderProps> = ({ testimonials }) => {
  return (
    <section className="py-8 bg-gray-100">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold mb-6 text-center">What Our Customers Say</h2>
        <div className="overflow-hidden relative">
          <motion.div
            className="flex space-x-4"
            initial={{ x: 0 }}
            animate={{ x: '-100%' }}
            transition={{ repeat: Infinity, duration: 10, ease: 'linear' }}
          >
            {testimonials.map((testimonial) => (
              <div
                key={testimonial.id}
                className="bg-white shadow-md rounded-lg p-4 w-80 shrink-0"
              >
                <p className="text-gray-600 italic">"{testimonial.message}"</p>
                <div className="mt-4 flex items-center">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-10 h-10 rounded-full mr-3"
                  />
                  <span className="font-bold text-gray-800">{testimonial.name}</span>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialSlider;