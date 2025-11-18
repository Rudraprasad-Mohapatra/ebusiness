import React from 'react';
import Hero from '../components/sections/Hero.tsx';
import ProductGrid from '../components/sections/ProductGrid.tsx';
import { useEffect, useState } from 'react';
import { fetchProducts } from '../utils/api.ts';
import type { Product } from '../types';

const Home: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await fetchProducts();
        setProducts(data);
      } catch (error) {
        console.error('Failed to fetch products:', error);
      }
    };

    loadProducts();
  }, []);

  return (
    <div>
      <Hero />
      <ProductGrid products={products} />
    </div>
  );
};

export default Home;