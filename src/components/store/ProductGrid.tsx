'use client';

import { useEffect, useState, useMemo } from 'react';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { Star, Heart, ArrowUpDown, Search, SlidersHorizontal } from 'lucide-react';
import { getWishlist, toggleWishlist } from '@/lib/wishlist';
import { getProductMetadata } from '@/utils/deviceParser';

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
  condition: string;
  features?: any;
  category: Category;
  averageRating?: number;
  reviewCount?: number;
  createdAt?: string;
}

function getProductImage(product: Product): string {
  if (product.images && product.images.length > 0 && product.images[0] && product.images[0] !== '/file.svg' && product.images[0] !== '/placeholder.png') {
    return product.images[0];
  }
  const cat = (product.category?.name || '').toLowerCase();
  const name = (product.name || '').toLowerCase();

  if (name.includes('17 pro') || name.includes('17pro')) return '/iphones-default/iphone-17-pro-colors.png';
  if (name.includes('iphone 17') || name.includes('17')) return '/iphones-default/iphone-17-colors.png';
  if (name.includes('16 pro') || name.includes('16pro')) return '/showcase_iphone16pro.png';
  if (name.includes('ultra 2') || name.includes('apple watch')) return '/showcase_smartwatch.png';
  if (cat.includes('phone') || cat.includes('iphone') || cat.includes('smartphone') || name.includes('iphone') || name.includes('galaxy') || name.includes('pixel')) return '/iphones.PNG';
  if (cat.includes('tablet') || cat.includes('ipad') || name.includes('ipad')) return '/tablet.PNG';
  if (cat.includes('watch') || name.includes('watch')) return '/Watches.png';
  if (cat.includes('speaker') || name.includes('speaker') || name.includes('airpods') || name.includes('audio')) return '/speaker.PNG';
  if (cat.includes('fragrance') || cat.includes('scalp') || cat.includes('care')) return '/fragrance.PNG';
  return '/Covers.png';
}

function getPhoneReleaseRank(name: string): number {
  const n = (name || '').toLowerCase();
  if (n.includes('iphone 17') || n.includes('iphone17') || n.includes('17 pro') || n.includes('17pro')) {
    return 170 + (n.includes('pro max') ? 4 : n.includes('pro') ? 3 : n.includes('plus') ? 2 : 1);
  }
  if (n.includes('iphone 16') || n.includes('iphone16') || n.includes('16 pro') || n.includes('16pro')) {
    return 160 + (n.includes('pro max') ? 4 : n.includes('pro') ? 3 : n.includes('plus') ? 2 : 1);
  }
  if (n.includes('iphone 15') || n.includes('iphone15')) {
    return 150 + (n.includes('pro max') ? 4 : n.includes('pro') ? 3 : n.includes('plus') ? 2 : 1);
  }
  if (n.includes('iphone 14') || n.includes('iphone14')) {
    return 140 + (n.includes('pro max') ? 4 : n.includes('pro') ? 3 : n.includes('plus') ? 2 : 1);
  }
  if (n.includes('iphone 13') || n.includes('iphone13')) {
    return 130 + (n.includes('pro max') ? 4 : n.includes('pro') ? 3 : n.includes('mini') ? 2 : 1);
  }
  if (n.includes('iphone 12') || n.includes('iphone12')) {
    return 120 + (n.includes('pro max') ? 4 : n.includes('pro') ? 3 : n.includes('mini') ? 2 : 1);
  }
  if (n.includes('iphone 11') || n.includes('iphone11')) {
    return 110 + (n.includes('pro max') ? 4 : n.includes('pro') ? 3 : 1);
  }
  if (n.includes('xs max')) return 104;
  if (n.includes('xs')) return 103;
  if (n.includes('xr')) return 102;
  if (n.includes('iphone x')) return 101;
  if (n.includes('se 3') || n.includes('se')) return 90;
  return 0;
}

export default function ProductGrid({ selectedCategory, condition }: { selectedCategory?: string | null, condition?: string }) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const { addToCart } = useCart();

  // Sorting & Filtering state
  const [sortOption, setSortOption] = useState<string>('newest');
  const [conditionFilter, setConditionFilter] = useState<string>(condition || 'ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');

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

  // Compute filtered & sorted product list
  const processedProducts = useMemo(() => {
    let result = [...products];

    // 1. Category Filter
    if (selectedCategory) {
      result = result.filter((p) => p.category?.name.toLowerCase() === selectedCategory.toLowerCase());
    }

    // 2. Condition Filter
    if (conditionFilter !== 'ALL') {
      result = result.filter((p) => p.condition === conditionFilter);
    }

    // 3. Search Query Filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          (p.category?.name || '').toLowerCase().includes(q)
      );
    }

    // 4. Sorting logic - Default orders newest phone releases first
    switch (sortOption) {
      case 'price_asc':
        result.sort((a, b) => Number(a.price) - Number(b.price));
        break;
      case 'price_desc':
        result.sort((a, b) => Number(b.price) - Number(a.price));
        break;
      case 'name_asc':
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'newest':
      default:
        result.sort((a, b) => {
          const rankDiff = getPhoneReleaseRank(b.name) - getPhoneReleaseRank(a.name);
          if (rankDiff !== 0) return rankDiff;
          return new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime();
        });
        break;
    }

    return result;
  }, [products, selectedCategory, conditionFilter, searchQuery, sortOption]);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center text-sm font-semibold text-gray-500">
        Loading products...
      </div>
    );
  }

  return (
    <section className="max-w-7xl mx-auto px-4 py-4 space-y-6">

      {/* Customer Filter & Sorting Toolbar */}
      <div className="bg-white/60 dark:bg-slate-900/60 backdrop-blur-2xl border border-white/80 dark:border-white/10 p-3.5 sm:p-4 rounded-3xl shadow-[0_8px_32px_rgba(0,0,0,0.04)] flex flex-col md:flex-row items-center justify-between gap-4">

        {/* Search Input */}
        <div className="relative w-full md:w-72">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search devices..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-xs font-semibold rounded-2xl bg-white/80 dark:bg-slate-800/80 border border-gray-200/80 dark:border-gray-700/80 focus:border-red-500 outline-none transition text-gray-800 dark:text-gray-200"
          />
        </div>

        {/* Condition Filter Pills & Sort Selector */}
        <div className="flex flex-wrap items-center justify-between sm:justify-end gap-3 w-full md:w-auto">

          {/* Condition Filter Pills */}
          {!condition && (
            <div className="flex items-center gap-1 bg-gray-100/80 dark:bg-slate-800/80 p-1 rounded-2xl border border-gray-200/60 dark:border-gray-700/60">
              <button
                onClick={() => setConditionFilter('ALL')}
                className={`px-3 py-1 text-[11px] font-extrabold rounded-xl transition-all ${conditionFilter === 'ALL'
                  ? 'bg-red-600 text-white shadow-xs'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900'
                  }`}
              >
                All
              </button>
              <button
                onClick={() => setConditionFilter('NEW')}
                className={`px-3 py-1 text-[11px] font-extrabold rounded-xl transition-all ${conditionFilter === 'NEW'
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'text-gray-600 dark:text-gray-400 hover:text-emerald-600'
                  }`}
              >
                Brand New
              </button>
              <button
                onClick={() => setConditionFilter('USED')}
                className={`px-3 py-1 text-[11px] font-extrabold rounded-xl transition-all ${conditionFilter === 'USED'
                  ? 'bg-amber-600 text-white shadow-xs'
                  : 'text-gray-600 dark:text-gray-400 hover:text-amber-600'
                  }`}
              >
                Home Used
              </button>
            </div>
          )}

          {/* Sort Dropdown */}
          <div className="flex items-center gap-2 bg-white/80 dark:bg-slate-800/80 px-3 py-1.5 rounded-2xl border border-gray-200/80 dark:border-gray-700/80">
            <ArrowUpDown size={14} className="text-red-500" />
            <select
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
              className="bg-transparent text-xs font-bold text-gray-700 dark:text-gray-200 outline-none cursor-pointer"
            >
              <option value="newest">Sort: Newest</option>
              <option value="price_asc">Price: Low to High</option>
              <option value="price_desc">Price: High to Low</option>
              <option value="name_asc">Name: A - Z</option>
            </select>
          </div>
        </div>
      </div>

      {/* No Products Found Alert */}
      {processedProducts.length === 0 ? (
        <div className="text-center py-16 bg-white/40 dark:bg-slate-900/40 rounded-3xl border border-dashed border-gray-300 dark:border-gray-800 space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-gray-100 dark:bg-slate-800 text-gray-400 flex items-center justify-center mx-auto">
            <SlidersHorizontal size={22} />
          </div>
          <h3 className="text-sm font-bold text-gray-900 dark:text-white">No matching products found</h3>
          <p className="text-xs text-gray-500">Try adjusting your search keywords or filter selection.</p>
        </div>
      ) : (
        /* Product Cards Grid */
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {processedProducts.map((product) => {
            const meta = getProductMetadata(product.name);
            return (
              <div
                key={product.id}
                className="bg-white dark:bg-slate-900 border border-gray-200/80 dark:border-slate-800 rounded-3xl overflow-hidden shadow-xs hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col group relative"
              >
                <Link href={`/products/${product.id}`} className="block flex-grow relative">
                  <div className="h-40 sm:h-48 w-full overflow-hidden bg-gray-50 dark:bg-slate-800/50 flex items-center justify-center relative p-2.5">
                    <span className={`absolute top-2.5 left-2.5 z-10 text-[9px] font-extrabold px-2 py-0.5 rounded-full border shadow-2xs ${product.condition === 'USED'
                      ? 'bg-amber-500 text-white border-amber-600'
                      : 'bg-emerald-600 text-white border-emerald-700'
                      }`}>
                      {product.condition === 'USED' ? 'Home Used' : 'Brand New'}
                    </span>

                    {/* Hover Color Pill Overlay */}
                    {product.features?.colors && Array.isArray(product.features.colors) && product.features.colors.length > 0 && (
                      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:translate-y-0 translate-y-2 pointer-events-none z-20">
                        <div className="bg-white/95 dark:bg-slate-800/95 backdrop-blur-xl px-3 py-1 rounded-full shadow-md border border-gray-200 dark:border-white/10 flex items-center gap-1.5 whitespace-nowrap">
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
                        const updated = toggleWishlist(product.id);
                        setWishlist(updated);
                      }}
                      className="absolute top-2.5 right-2.5 z-10 p-1.5 rounded-full bg-white/80 dark:bg-slate-900/80 border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:text-red-600 transition shadow-2xs"
                    >
                      <Heart
                        size={14}
                        className={wishlist.includes(product.id) ? 'fill-red-600 text-red-600' : ''}
                      />
                    </button>

                    <img
                      src={getProductImage(product)}
                      alt={product.name}
                      className="h-32 sm:h-40 w-auto max-w-full object-contain transition-transform duration-500 group-hover:scale-108 group-hover:-translate-y-1"
                    />
                  </div>
                </Link>

                {/* Product Info */}
                <div className="p-4 sm:p-5 flex flex-col justify-between flex-grow space-y-3">
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[10px] font-black text-red-600 dark:text-red-400 uppercase tracking-wider bg-red-50 dark:bg-red-950/60 px-2 py-0.5 rounded-md border border-red-100 dark:border-red-900/50">
                        {product.category?.name || 'Smartphones'}
                      </span>
                    </div>

                    <Link href={`/products/${product.id}`} className="block mt-1.5">
                      <h3 className="text-sm font-bold text-gray-900 dark:text-white line-clamp-1 group-hover:text-red-600 transition-colors">
                        {product.name}
                      </h3>
                    </Link>
                  </div>

                  <div className="pt-2.5 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between">
                    <div>
                      <span className="text-base font-extrabold text-gray-900 dark:text-white">
                        GH₵{Number(product.price).toLocaleString()}
                      </span>
                    </div>

                    <button
                      onClick={() => {
                        addToCart({
                          id: product.id,
                          name: product.name,
                          price: product.price,
                          image: getProductImage(product),
                          quantity: 1,
                        });
                      }}
                      className="px-3.5 py-1.5 bg-red-600 hover:bg-red-700 text-white font-bold text-xs rounded-xl shadow-md shadow-red-600/20 transition active:scale-95 flex items-center gap-1.5"
                    >
                      <span>Add to Cart</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}