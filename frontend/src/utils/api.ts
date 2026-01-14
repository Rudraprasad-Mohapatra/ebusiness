import type { Product, ContactFormValues, Brand, ProductType, Testimonial } from '../types';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8001/api';

export const fetchBrand = async (slug: string = 'radharaman-craft'): Promise<Brand | null> => {
  try {
    const response = await fetch(`${API_BASE_URL}/products/brand/${slug}/`);
    if (!response.ok) {
      throw new Error(`Failed to fetch brand: ${response.statusText}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching brand:', error);
    return null;
  }
};

export const fetchProducts = async (typeId?: number): Promise<Product[]> => {
  try {
    const url = typeId 
      ? `${API_BASE_URL}/products/?type=${typeId}`
      : `${API_BASE_URL}/products/`;
    const response = await fetch(url);
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

export const fetchTrendingProducts = async (): Promise<Product[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/products/trending/`);
    if (!response.ok) {
      throw new Error(`Failed to fetch trending products: ${response.statusText}`);
    }
    const data = await response.json();
    return Array.isArray(data) ? data : [data];
  } catch (error) {
    console.error('Error fetching trending products:', error);
    return [];
  }
};

export const fetchProductTypes = async (): Promise<ProductType[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/products/product-types/`);
    if (!response.ok) {
      throw new Error(`Failed to fetch product types`);
    }
    const data = await response.json();
    return Array.isArray(data) ? data : [data];
  } catch (error) {
    console.error('Error fetching product types:', error);
    return [];
  }
};

export const fetchTestimonials = async (): Promise<Testimonial[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/contact/testimonials/`);
    if (!response.ok) {
      throw new Error(`Failed to fetch testimonials`);
    }
    const data = await response.json();
    return Array.isArray(data) ? data : [data];
  } catch (error) {
    console.error('Error fetching testimonials:', error);
    return [];
  }
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