import type { Product, ContactFormValues, Brand } from '../types';

const API_BASE_URL = 'https://zany-fortnight-q59wgw4qw4v2x7vx-8000.app.github.dev/api';

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