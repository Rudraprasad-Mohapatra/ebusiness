import React from "react";
import Hero from "../components/sections/Hero.tsx";
import { useEffect, useState } from "react";
import { fetchBrand, fetchTestimonials } from "../utils/api.ts";
import type { Brand, Testimonial } from "../types";
import ProductType from "../components/sections/ProductType.tsx";
import TestimonialSlider from "../components/sections/TestimonialSlider.tsx";

const Home: React.FC = () => {
  const [brand, setBrand] = useState<Brand | null>(null);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);

  useEffect(() => {
    const loadBrand = async () => {
      const brandData = await fetchBrand();
      setBrand(brandData);
    };
    loadBrand();
  }, []);

  useEffect(() => {
    const loadTestimonials = async () => {
      try {
        const data = await fetchTestimonials();
        console.log('Testimonials loaded:', data);
        setTestimonials(data);
      } catch (error) {
        console.error("Failed to fetch testimonials:", error);
      }
    };

    loadTestimonials();
  }, []);

  return (
    <div>
      <Hero />
      <ProductType />
      {/* <ProductGrid products={products} brand={brand} /> */}
      {testimonials.length > 0 && <TestimonialSlider testimonials={testimonials} brand={brand} />}
    </div>
  );
};

export default Home;
