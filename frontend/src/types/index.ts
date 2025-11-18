// Define TypeScript interfaces and types for the project

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
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