'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
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
  features?: any;
  category: Category;
}

export default function ProductGrid({ selectedCategory, condition }: { selectedCategory?: string | null, condition?: string }) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();

  useEffect(() => {
    async function fetchProducts() {
      try {
        const url = condition ? `/api/products?condition=${condition}` : '/api/products';
        const res = await fetch(url);
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
  }, [condition]);

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
            className="border rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow bg-white flex flex-col group relative"
          >
            <Link href={`/products/${product.id}`} className="block flex-grow relative">
              {/* Hover Color Pill Overlay */}
              {product.features?.colors && Array.isArray(product.features.colors) && product.features.colors.length > 0 && (
                <div className="absolute top-3 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:translate-y-0 -translate-y-2 pointer-events-none z-10">
                  <div className="bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-full shadow-lg border border-gray-200/80 flex items-center gap-1.5 whitespace-nowrap">
                    <span className="text-[10px] font-black text-gray-500 uppercase tracking-wider mr-0.5">Colors:</span>
                    {product.features.colors.slice(0, 4).map((c: any, idx: number) => (
                      <span
                        key={idx}
                        className="w-3 h-3 rounded-full border border-black/10 shadow-2xs inline-block"
                        style={{ backgroundColor: c.hex }}
                        title={c.name}
                      />
                    ))}
                    {product.features.colors.length > 4 && (
                      <span className="text-[10px] font-bold text-gray-400">+{product.features.colors.length - 4}</span>
                    )}
                  </div>
                </div>
              )}

              <div className="h-48 w-full overflow-hidden bg-gray-100 flex items-center justify-center relative">
                <img
                  src={product.images[0] || '/file.svg'}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="px-4 pt-4 flex flex-col">
                <span className="text-xs text-red-600 font-semibold uppercase tracking-wider mb-1">
                  {product.category?.name}
                </span>
                <h3 className="font-semibold text-lg text-gray-900 line-clamp-1 group-hover:text-red-600 transition-colors">{product.name}</h3>
                <p className="text-gray-500 text-sm mt-1 line-clamp-2">{product.description}</p>
              </div>
            </Link>
            
            <div className="p-4 flex items-center justify-between mt-auto">
              <span className="text-xl font-bold text-gray-900">
                GH₵{Number(product.price).toFixed(2)}
              </span>
              <button 
                onClick={(e) => {
                  e.preventDefault();
                  addToCart(product);
                }}
                className="bg-red-600 text-white px-3 py-1.5 rounded-lg text-sm font-medium hover:bg-red-700 transition-colors active:scale-95"
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}