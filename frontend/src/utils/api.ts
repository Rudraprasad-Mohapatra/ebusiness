import type { Product, Testimonial, ContactFormValues } from '../types';

const API_BASE_URL = 'http://localhost:8000/api';

export const fetchProducts = async (): Promise<Product[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/products/`);
    if (!response.ok) {
      throw new Error(`Failed to fetch products: ${response.statusText}`);
    }
    const data = await response.json();
    return Array.isArray(data) ? data : [data];
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
};

export const fetchTestimonials = async (): Promise<Testimonial[]> => {
  const response = await fetch(`${API_BASE_URL}/testimonials/`);
  if (!response.ok) {
    throw new Error('Failed to fetch testimonials');
  }
  return response.json();
};

export const submitContactForm = async (data: ContactFormValues): Promise<void> => {
  const response = await fetch(`${API_BASE_URL}/contact/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    throw new Error('Failed to submit contact form');
  }
};