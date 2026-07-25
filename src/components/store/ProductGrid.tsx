'use client';

import { useEffect, useState } from 'react';
import { useCart } from '@/context/CartContext';

interface Category {
  id: string;
  name: string;
}

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  stockQuantity: number;
  images: string[];
  category: Category;
}

export default function ProductGrid({ selectedCategory }: { selectedCategory?: string | null }) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();

  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await fetch('/api/products');
        const data = await res.json();
        if (Array.isArray(data)) {
          setProducts(data);
        }
      } catch (err) {
        console.error('Failed to load products:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);

  const filteredProducts = selectedCategory
    ? products.filter((p) => p.category?.name.toLowerCase() === selectedCategory.toLowerCase())
    : products;

  if (loading) {
    return <div className="text-center py-20 text-gray-500">Loading products...</div>;
  }

  if (filteredProducts.length === 0) {
    return (
      <div className="text-center py-20 text-gray-500">
        No products found in {selectedCategory || 'store'}.
      </div>
    );
  }

  return (
    <section className="max-w-7xl mx-auto px-4 py-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredProducts.map((product) => (
          <div 
            key={product.id} 
            className="border rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow bg-white flex flex-col"
          >
            <div className="h-48 w-full overflow-hidden bg-gray-100 flex items-center justify-center">
              <img
                src={product.images[0] || '/file.svg'}
                alt={product.name}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="p-4 flex flex-col flex-grow">
              <span className="text-xs text-red-600 font-semibold uppercase tracking-wider mb-1">
                {product.category?.name}
              </span>
              <h3 className="font-semibold text-lg text-gray-900 line-clamp-1">{product.name}</h3>
              <p className="text-gray-500 text-sm mt-1 line-clamp-2 flex-grow">{product.description}</p>
              
              <div className="mt-4 flex items-center justify-between">
                <span className="text-xl font-bold text-gray-900">
                  GH₵{Number(product.price).toFixed(2)}
                </span>
                <button 
                  onClick={() => addToCart(product)}
                  className="bg-red-600 text-white px-3 py-1.5 rounded-lg text-sm font-medium hover:bg-red-700 transition-colors active:scale-95"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}