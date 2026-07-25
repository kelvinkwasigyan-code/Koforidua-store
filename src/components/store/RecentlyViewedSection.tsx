'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function RecentlyViewedSection() {
  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    try {
      const ids = JSON.parse(localStorage.getItem('recentlyViewed') || '[]');
      if (!Array.isArray(ids) || ids.length === 0) return;

      fetch(`/api/products?ids=${ids.join(',')}`)
        .then((res) => res.json())
        .then((data) => setProducts(Array.isArray(data) ? data : data.products || []))
        .catch(() => {});
    } catch (e) {
      console.error(e);
    }
  }, []);

  if (products.length === 0) return null;

  return (
    <section className="max-w-7xl mx-auto px-4 py-8">
      <h2 className="text-xl font-black mb-4 text-gray-900 tracking-tight">Recently Viewed</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
        {products.map((product) => (
          <Link 
            key={product.id} 
            href={`/products/${product.id}`} 
            className="group border border-gray-200/80 p-3 rounded-2xl bg-white shadow-xs hover:shadow-lg hover:border-red-200 transition-all duration-300 flex flex-col justify-between"
          >
            <div className="h-32 w-full bg-gray-50 rounded-xl overflow-hidden mb-2 flex items-center justify-center p-2">
              <img 
                src={product.images?.[0] || '/file.svg'} 
                alt={product.name} 
                className="h-full w-full object-contain group-hover:scale-105 transition-transform duration-300" 
              />
            </div>
            <div>
              <h3 className="font-bold text-xs text-gray-900 truncate group-hover:text-red-600 transition-colors">
                {product.name}
              </h3>
              <p className="text-red-600 font-black text-sm mt-0.5">
                GH₵ {Number(product.price).toLocaleString()}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
