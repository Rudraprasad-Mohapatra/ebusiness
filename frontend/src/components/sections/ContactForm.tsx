import React, { useState } from 'react';
import { motion } from 'framer-motion';
import type { ContactFormValues } from '../../types';
import { submitContactForm } from '../../utils/api';

const ContactForm: React.FC = () => {
  const [formValues, setFormValues] = useState<ContactFormValues>({
    name: '',
    email: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage('');
    try {
      await submitContactForm(formValues);
      setSuccessMessage('Thank you for reaching out! We will get back to you soon.');
      setFormValues({ name: '', email: '', message: '' });
      setTimeout(() => setSuccessMessage(''), 5000);
    } catch (error) {
      console.error('Failed to submit contact form:', error);
      setErrorMessage('Failed to send message. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Success Message */}
        {successMessage && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-green-50 border-2 border-green-200 text-green-800 px-4 sm:px-6 py-3 sm:py-4 rounded-lg text-sm sm:text-base"
          >
            ✓ {successMessage}
          </motion.div>
        )}

        {/* Error Message */}
        {errorMessage && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-red-50 border-2 border-red-200 text-red-800 px-4 sm:px-6 py-3 sm:py-4 rounded-lg text-sm sm:text-base"
          >
            ✗ {errorMessage}
          </motion.div>
        )}

        {/* Name Field */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <label htmlFor="name" className="block text-sm sm:text-base font-semibold text-gray-900 mb-2">
            Full Name *
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formValues.name}
            onChange={handleChange}
            placeholder="Enter your name"
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none transition-colors text-base"
            required
          />
        </motion.div>

        {/* Email Field */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <label htmlFor="email" className="block text-sm sm:text-base font-semibold text-gray-900 mb-2">
            Email Address *
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formValues.email}
            onChange={handleChange}
            placeholder="Enter your email"
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none transition-colors text-base"
            required
          />
        </motion.div>

        {/* Message Field */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <label htmlFor="message" className="block text-sm sm:text-base font-semibold text-gray-900 mb-2">
            Message *
          </label>
          <textarea
            id="message"
            name="message"
            value={formValues.message}
            onChange={handleChange}
            placeholder="Tell us more about your inquiry..."
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none transition-colors text-base resize-none"
            rows={6}
            required
          />
        </motion.div>

        {/* Submit Button */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-bold py-3 sm:py-4 rounded-lg transition-colors text-base sm:text-lg"
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                  className="w-5 h-5 border-2 border-white border-t-transparent rounded-full mr-2"
                ></motion.div>
                Sending...
              </span>
            ) : (
              '📧 Send Message'
            )}
          </button>
        </motion.div>

        {/* Form Info */}
        <p className="text-xs sm:text-sm text-gray-600 text-center">
          We typically respond within 24-48 hours during business days.
        </p>
      </form>
    </motion.div>
  );
};

export default ContactForm;
