import React from 'react';
import ContactForm from '../components/sections/ContactForm';

const Contact: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold">Contact Us</h1>
      <ContactForm />
    </div>
  );
};

export default Contact;