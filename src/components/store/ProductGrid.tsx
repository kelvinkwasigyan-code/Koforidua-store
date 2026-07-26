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
            className="bg-white/60 dark:bg-slate-900/60 backdrop-blur-2xl border border-white/80 dark:border-white/10 rounded-3xl overflow-hidden shadow-[0_8px_32px_rgba(0,0,0,0.04)] hover:shadow-[0_16px_48px_rgba(0,0,0,0.12)] hover:-translate-y-1.5 transition-all duration-300 flex flex-col group relative"
          >
            <Link href={`/products/${product.id}`} className="block flex-grow relative">
              <div className="h-52 w-full overflow-hidden bg-white/40 dark:bg-slate-800/40 backdrop-blur-md flex items-center justify-center relative">
                <span className={`absolute top-3 left-3 z-10 text-[10px] font-black px-2.5 py-0.5 rounded-full backdrop-blur-xl border shadow-2xs ${
                  product.condition === 'USED'
                    ? 'bg-amber-500/90 text-white border-amber-300'
                    : 'bg-emerald-600/90 text-white border-emerald-400'
                }`}>
                  {product.condition === 'USED' ? 'Home Used' : 'Brand New'}
                </span>

                {/* Hover Color Pill Overlay (Floating Under Phone Image) */}
                {product.features?.colors && Array.isArray(product.features.colors) && product.features.colors.length > 0 && (
                  <div className="absolute bottom-2 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:translate-y-0 translate-y-2 pointer-events-none z-20">
                    <div className="bg-white/95 dark:bg-slate-800/95 backdrop-blur-xl px-3 py-1 rounded-full shadow-lg border border-white/80 dark:border-white/10 flex items-center gap-1.5 whitespace-nowrap">
                      <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mr-0.5">Colors:</span>
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

                <button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    toggleWishlist(product.id);
                  }}
                  className="absolute top-3 right-3 z-10 p-2.5 rounded-full bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl shadow-xs border border-white/80 dark:border-white/10 hover:bg-white transition active:scale-90"
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
                  className="w-full h-full object-contain p-4 group-hover:scale-108 transition-transform duration-500 ease-out"
                />
              </div>
              <div className="px-5 pt-4 flex flex-col">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[11px] text-red-600 font-extrabold uppercase tracking-wider bg-red-50/80 dark:bg-red-950/40 px-2.5 py-0.5 rounded-full border border-red-200/60 dark:border-red-900/60">
                    {product.category?.name}
                  </span>
                  <div className="flex items-center gap-1 text-[11px] font-extrabold text-amber-600 bg-amber-50 dark:bg-amber-950/40 px-2 py-0.5 rounded-full border border-amber-200/60 dark:border-amber-900/60">
                    <Star size={11} className="fill-amber-400 text-amber-400" />
                    <span>{product.averageRating || 5.0}</span>
                    {product.reviewCount && product.reviewCount > 0 ? (
                      <span className="text-gray-400 font-normal">({product.reviewCount})</span>
                    ) : null}
                  </div>
                </div>
                <h3 className="font-extrabold text-base text-gray-900 dark:text-white line-clamp-1 group-hover:text-red-600 transition-colors">{product.name}</h3>
                <p className="text-gray-500 dark:text-gray-400 text-xs mt-1 line-clamp-2 leading-relaxed">{product.description}</p>
              </div>
            </Link>
            
            <div className="p-5 flex items-center justify-between mt-auto border-t border-gray-100/60 dark:border-slate-800/60">
              <span className="text-xl font-black text-gray-900 dark:text-white tracking-tight">
                GH₵{Number(product.price).toLocaleString()}
              </span>
              <button 
                onClick={(e) => {
                  e.preventDefault();
                  addToCart(product);
                }}
                className="bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 text-white px-4 py-2 rounded-2xl text-xs font-black transition-all shadow-md shadow-red-600/25 active:scale-95"
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