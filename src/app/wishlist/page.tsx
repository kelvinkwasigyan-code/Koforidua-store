'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { getWishlist } from '@/lib/wishlist';
import WishlistButton from '@/components/store/WishlistButton';

export default function WishlistPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWishlistProducts = async () => {
      const ids = getWishlist();
      if (ids.length === 0) {
        setProducts([]);
        setLoading(false);
        return;
      }

      try {
        const res = await fetch(`/api/products?ids=${ids.join(',')}`);
        const data = await res.json();
        setProducts(Array.isArray(data) ? data : data.products || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchWishlistProducts();
    window.addEventListener('wishlistUpdated', fetchWishlistProducts);
    return () => window.removeEventListener('wishlistUpdated', fetchWishlistProducts);
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-black mb-6 text-gray-900">My Wishlist ❤️</h1>

      {loading ? (
        <p className="text-gray-500 font-medium py-8">Loading saved items...</p>
      ) : products.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 mb-4 font-medium">Your wishlist is currently empty.</p>
          <Link href="/" className="bg-red-600 hover:bg-red-700 text-white px-6 py-2.5 rounded-xl font-bold transition shadow-sm">
            Explore Store
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {products.map((product) => (
            <div key={product.id} className="border p-3 rounded-xl bg-white shadow-sm relative group hover:shadow-md transition">
              <div className="absolute top-2 right-2 z-10">
                <WishlistButton productId={product.id} />
              </div>
              <Link href={`/products/${product.id}`}>
                <img src={product.images?.[0] || '/file.svg'} alt={product.name} className="h-36 w-full object-contain mb-2 group-hover:scale-105 transition-transform duration-300" />
                <h3 className="font-semibold text-sm truncate text-gray-900 group-hover:text-red-600 transition-colors">{product.name}</h3>
                <p className="text-red-600 font-bold text-sm mt-1">GH₵ {Number(product.price).toLocaleString()}</p>
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
