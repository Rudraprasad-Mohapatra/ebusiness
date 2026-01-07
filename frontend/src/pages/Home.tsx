import React from "react";
import Hero from "../components/sections/Hero.tsx";
import ProductGrid from "../components/sections/ProductGrid.tsx";
import { useEffect, useState } from "react";
import { fetchBrand, fetchProducts } from "../utils/api.ts";
import type { Product, Brand } from "../types";

const Home: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [brand, setBrand] = useState<Brand | null>(null);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await fetchProducts();
        setProducts(data);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      }
    };

    loadProducts();
  }, []);

  useEffect(() => {
    const loadBrand = async () => {
      const brandData = await fetchBrand();
      setBrand(brandData);
    };
    loadBrand();
  }, []);

  return (
    <div>
      <Hero />
      <ProductGrid products={products} brand={brand} />
    </div>
  );
};

export default Home;
