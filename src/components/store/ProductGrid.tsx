'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { Star, Heart } from 'lucide-react';
import { getWishlist, toggleWishlist } from '@/lib/wishlist';

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
  averageRating?: number;
  reviewCount?: number;
}

function getProductImage(product: Product): string {
  if (product.images && product.images.length > 0 && product.images[0] && product.images[0] !== '/file.svg' && product.images[0] !== '/placeholder.png') {
    return product.images[0];
  }
  const cat = (product.category?.name || '').toLowerCase();
  const name = (product.name || '').toLowerCase();
  
  if (name.includes('16 pro') || name.includes('16pro')) return '/showcase_iphone16pro.png';
  if (name.includes('ultra 2') || name.includes('apple watch')) return '/showcase_smartwatch.png';
  if (cat.includes('phone') || cat.includes('iphone') || cat.includes('smartphone') || name.includes('iphone') || name.includes('galaxy') || name.includes('pixel')) return '/iphones.PNG';
  if (cat.includes('tablet') || cat.includes('ipad') || name.includes('ipad')) return '/tablet.PNG';
  if (cat.includes('watch') || name.includes('watch')) return '/Watches.png';
  if (cat.includes('speaker') || name.includes('speaker') || name.includes('airpods') || name.includes('audio')) return '/speaker.PNG';
  if (cat.includes('fragrance') || cat.includes('scalp') || cat.includes('care')) return '/fragrance.PNG';
  return '/Covers.png';
}

export default function ProductGrid({ selectedCategory, condition }: { selectedCategory?: string | null, condition?: string }) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const { addToCart } = useCart();

  useEffect(() => {
    setWishlist(getWishlist());
    const handleWishlistUpdate = () => setWishlist(getWishlist());
    window.addEventListener('wishlistUpdated', handleWishlistUpdate);
    return () => window.removeEventListener('wishlistUpdated', handleWishlistUpdate);
  }, []);

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
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    toggleWishlist(product.id);
                  }}
                  className="absolute top-3 right-3 z-10 p-2 rounded-full bg-white/80 backdrop-blur-md shadow-sm border border-gray-200/60 hover:bg-white transition active:scale-90"
                  title="Wishlist"
                >
                  <Heart
                    size={16}
                    className={wishlist.includes(product.id) ? 'fill-red-500 text-red-500' : 'text-gray-500 hover:text-red-500'}
                  />
                </button>
                <img
                  src={getProductImage(product)}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="px-4 pt-4 flex flex-col">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs text-red-600 font-semibold uppercase tracking-wider">
                    {product.category?.name}
                  </span>
                  <div className="flex items-center gap-1 text-[11px] font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200/60">
                    <Star size={11} className="fill-amber-400 text-amber-400" />
                    <span>{product.averageRating || 5.0}</span>
                    {product.reviewCount && product.reviewCount > 0 ? (
                      <span className="text-gray-400 font-normal">({product.reviewCount})</span>
                    ) : null}
                  </div>
                </div>
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