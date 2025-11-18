// Define TypeScript interfaces and types for the project

export interface Product {
  id: number;
  name: string;
  description: string;
  price: string;
  images: string;
  variants: string | null;
  brand: number;
}

export interface Testimonial {
  id: number;
  name: string;
  message: string;
  avatar: string;
}

export interface ContactFormValues {
  name: string;
  email: string;
  message: string;
}