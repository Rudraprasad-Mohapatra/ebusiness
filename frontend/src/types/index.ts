// Define TypeScript interfaces and types for the project

export interface Brand {
  id: number;
  name: string;
  slug: string;
  logo: string;
  primary_color: string;
  secondary_color: string;
  accent_color: string;
  font_family: string;
  header_text: string;
  footer_text: string;
  about_text?: string;
  background_image?: string;
  contact_email: string;
  contact_phone: string;
  facebook_url?: string;
  instagram_url?: string;
  twitter_url?: string;
  linkedin_url?: string;
  whatsapp_url?: string;
  address?: string;
}

export interface Product {
  id: number;
  name: string;
  description?: string;
  short_description?: string;
  model_name?: string;
  details?: string;
  price: string;
  images: string;
  variants: Record<string, unknown> | null;
  brand: Brand | number;
  is_trending?: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface ProductType {
  id: number;
  name: string;
  image: string;
  description: string;
  created_at: string;
  updated_at: string;
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