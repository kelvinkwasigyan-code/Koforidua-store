'use client';

import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '@/context/CartContext';
import { Filter, SlidersHorizontal, ChevronDown, Check, X, Star } from 'lucide-react';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  stockQuantity: number;
  images: string[];
  condition: string;
  category: {
    name: string;
  };
  createdAt: string;
  averageRating?: number;
  reviewCount?: number;
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

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();

  // Filters State
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedConditions, setSelectedConditions] = useState<string[]>([]);
  const [minPrice, setMinPrice] = useState<string>('');
  const [maxPrice, setMaxPrice] = useState<string>('');

  // Sort State
  const [sortOption, setSortOption] = useState<string>('newest');

  // Mobile Filter Drawer State
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

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

  // Category choices including explicit iPhones, Android, Tablets, Chargers, Speakers, and AirPods
  const availableCategories = useMemo(() => {
    const defaultCats = ['iPhones', 'Android', 'Tablets', 'Chargers', 'Speakers', 'AirPods', 'Smartphones', 'Watches'];
    const dbCats = products.map(p => p.category?.name).filter(Boolean);
    const combined = new Set([...defaultCats, ...dbCats]);
    return Array.from(combined).filter(c => {
      const lc = c.toLowerCase();
      return lc !== 'laptops' && lc !== 'laptop' && !lc.includes('accessor');
    });
  }, [products]);

  // Condition options
  const availableConditions = [
    { label: 'Brand New', value: 'NEW' },
    { label: 'Home Used', value: 'USED' },
  ];

  // Filter and sort logic
  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Category Filter
    if (selectedCategories.length > 0) {
      result = result.filter((p) => {
        const catName = (p.category?.name || '').toLowerCase();
        const prodName = (p.name || '').toLowerCase();

        return selectedCategories.some((selectedCat) => {
          const sc = selectedCat.toLowerCase();
          if (sc === 'iphones') {
            return prodName.includes('iphone') || catName.includes('iphone');
          }
          if (sc === 'android') {
            return (
              (catName.includes('smartphone') || catName.includes('phone')) && !prodName.includes('iphone')
            ) || prodName.includes('samsung') || prodName.includes('android') || prodName.includes('pixel');
          }
          if (sc === 'tablets') {
            return catName.includes('tablet') || prodName.includes('ipad') || prodName.includes('tab');
          }
          if (sc === 'chargers') {
            return prodName.includes('charger') || prodName.includes('adapter') || prodName.includes('cable') || catName.includes('charger');
          }
          if (sc === 'speakers') {
            return prodName.includes('speaker') || prodName.includes('jbl') || catName.includes('speaker');
          }
          if (sc === 'airpods') {
            return prodName.includes('airpod') || prodName.includes('earbud') || prodName.includes('headphone') || catName.includes('airpod');
          }
          return catName === sc;
        });
      });
    }

    // Condition Filter
    if (selectedConditions.length > 0) {
      result = result.filter(p => selectedConditions.includes(p.condition));
    }

    // Price Filter
    if (minPrice && !isNaN(Number(minPrice))) {
      result = result.filter(p => p.price >= Number(minPrice));
    }
    if (maxPrice && !isNaN(Number(maxPrice))) {
      result = result.filter(p => p.price <= Number(maxPrice));
    }

    // Sort Logic - Default orders newest phone releases first
    switch (sortOption) {
      case 'price_asc':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price_desc':
        result.sort((a, b) => b.price - a.price);
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
  }, [products, selectedCategories, selectedConditions, minPrice, maxPrice, sortOption]);

  const toggleCategory = (cat: string) => {
    setSelectedCategories(prev =>
      prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]
    );
  };

  const toggleCondition = (cond: string) => {
    setSelectedConditions(prev =>
      prev.includes(cond) ? prev.filter(c => c !== cond) : [...prev, cond]
    );
  };

  const clearFilters = () => {
    setSelectedCategories([]);
    setSelectedConditions([]);
    setMinPrice('');
    setMaxPrice('');
  };

  // Sidebar Filter UI
  const FilterSidebar = () => (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="font-black text-lg text-gray-900 flex items-center gap-2">
          <Filter size={18} className="text-red-600" /> Filters
        </h2>
        {(selectedCategories.length > 0 || selectedConditions.length > 0 || minPrice || maxPrice) && (
          <button onClick={clearFilters} className="text-xs text-red-600 font-bold hover:underline">
            Clear All
          </button>
        )}
      </div>

      {/* Categories */}
      {availableCategories.length > 0 && (
        <div className="space-y-3">
          <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider">Category</h3>
          <div className="space-y-2">
            {availableCategories.map(cat => (
              <label
                key={cat}
                onClick={() => toggleCategory(cat)}
                className="flex items-center gap-3 cursor-pointer group select-none"
              >
                <div className={`w-5 h-5 rounded-md border flex items-center justify-center transition-colors ${selectedCategories.includes(cat)
                    ? 'bg-red-600 border-red-600 text-white'
                    : 'bg-white border-gray-300 group-hover:border-red-400'
                  }`}>
                  {selectedCategories.includes(cat) && <Check size={14} strokeWidth={3} />}
                </div>
                <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900">{cat}</span>
              </label>
            ))}
          </div>
        </div>
      )}

      <hr className="border-gray-200" />

      {/* Conditions */}
      <div className="space-y-3">
        <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider">Condition</h3>
        <div className="space-y-2">
          {availableConditions.map(cond => (
            <label
              key={cond.value}
              onClick={() => toggleCondition(cond.value)}
              className="flex items-center gap-3 cursor-pointer group select-none"
            >
              <div className={`w-5 h-5 rounded-md border flex items-center justify-center transition-colors ${selectedConditions.includes(cond.value)
                  ? 'bg-red-600 border-red-600 text-white'
                  : 'bg-white border-gray-300 group-hover:border-red-400'
                }`}>
                {selectedConditions.includes(cond.value) && <Check size={14} strokeWidth={3} />}
              </div>
              <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900">{cond.label}</span>
            </label>
          ))}
        </div>
      </div>

      <hr className="border-gray-200" />

      {/* Price Range */}
      <div className="space-y-3">
        <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider">Price (GH₵)</h3>
        <div className="flex items-center gap-2">
          <input
            type="number"
            placeholder="Min"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            className="w-full px-3 py-2 rounded-lg bg-gray-50 border border-gray-200 text-sm focus:border-red-500 outline-none transition-colors"
          />
          <span className="text-gray-400">-</span>
          <input
            type="number"
            placeholder="Max"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            className="w-full px-3 py-2 rounded-lg bg-gray-50 border border-gray-200 text-sm focus:border-red-500 outline-none transition-colors"
          />
        </div>
      </div>
    </div>
  );

  return (
    <main className="min-h-screen bg-gray-50/50 pb-20 pt-6">
      <div className="max-w-7xl mx-auto px-4">

        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-black text-gray-900 tracking-tight">All Products</h1>
            <p className="text-sm text-gray-500 mt-1">Explore our full catalog of premium devices and accessories.</p>
          </div>

          <div className="flex items-center gap-3">
            {/* Mobile Filter Toggle */}
            <button
              onClick={() => setIsMobileFilterOpen(true)}
              className="md:hidden flex items-center gap-2 bg-white border border-gray-200 px-4 py-2 rounded-xl text-sm font-bold text-gray-700 shadow-sm"
            >
              <SlidersHorizontal size={16} /> Filters
            </button>

            {/* Sort Dropdown */}
            <div className="relative group shrink-0">
              <select
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
                className="appearance-none bg-white border border-gray-200 px-4 py-2 pr-10 rounded-xl text-sm font-bold text-gray-700 shadow-sm outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all cursor-pointer"
              >
                <option value="newest">Newest Arrivals</option>
                <option value="price_asc">Price: Low to High</option>
                <option value="price_desc">Price: High to Low</option>
              </select>
              <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Desktop Sidebar */}
          <aside className="hidden md:block w-64 shrink-0">
            <div className="sticky top-24 bg-white p-6 rounded-3xl border border-gray-200 shadow-sm">
              <FilterSidebar />
            </div>
          </aside>

          {/* Main Product Grid */}
          <div className="flex-1">
            {loading ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {[...Array(8)].map((_, i) => (
                  <div key={i} className="bg-gray-200 animate-pulse aspect-[3/4] rounded-3xl"></div>
                ))}
              </div>
            ) : filteredProducts.length === 0 ? (
              <div className="bg-white rounded-3xl border border-gray-200 p-12 text-center flex flex-col items-center justify-center">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                  <Filter size={24} className="text-gray-400" />
                </div>
                <h3 className="text-lg font-bold text-gray-900">No products found</h3>
                <p className="text-sm text-gray-500 mt-1 max-w-sm">Try adjusting your filters or search criteria to find what you're looking for.</p>
                <button
                  onClick={clearFilters}
                  className="mt-6 bg-red-50 text-red-600 px-6 py-2 rounded-xl text-sm font-bold hover:bg-red-100 transition-colors"
                >
                  Clear all filters
                </button>
              </div>
            ) : (
              <div>
                <p className="text-xs font-bold text-gray-500 mb-4">{filteredProducts.length} product{filteredProducts.length !== 1 && 's'} showing</p>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6">
                  {filteredProducts.map((product) => (
                    <div
                      key={product.id}
                      className="bg-white dark:bg-slate-900 border border-gray-200/80 dark:border-slate-800 rounded-3xl overflow-hidden shadow-xs hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col group relative"
                    >
                      <Link href={`/products/${product.id}`} className="block flex-grow relative">
                        <div className="h-40 sm:h-48 w-full overflow-hidden bg-gray-50 dark:bg-slate-800/50 flex items-center justify-center relative p-2.5">
                          <span className={`absolute top-2.5 left-2.5 z-10 text-[9px] sm:text-[10px] font-extrabold px-2 py-0.5 rounded-full border shadow-2xs ${product.condition === 'USED'
                              ? 'bg-amber-500 text-white border-amber-600'
                              : 'bg-emerald-600 text-white border-emerald-700'
                            }`}>
                            {product.condition === 'USED' ? 'Home Used' : 'Brand New'}
                          </span>

                          <img
                            src={getProductImage(product)}
                            alt={product.name}
                            className="h-32 sm:h-40 w-auto max-w-full object-contain transition-transform duration-500 group-hover:scale-108 group-hover:-translate-y-1"
                          />

                          {product.stockQuantity === 0 && (
                            <div className="absolute inset-0 bg-white/70 dark:bg-slate-900/70 backdrop-blur-xs flex items-center justify-center">
                              <span className="bg-black text-white text-[10px] font-bold px-3 py-1 rounded-full">
                                Out of Stock
                              </span>
                            </div>
                          )}
                        </div>
                      </Link>

                      <div className="p-3.5 sm:p-5 flex flex-col justify-between flex-grow space-y-2.5">
                        <div>
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-[9px] sm:text-[10px] font-black text-red-600 dark:text-red-400 uppercase tracking-wider bg-red-50 dark:bg-red-950/60 px-2 py-0.5 rounded-md border border-red-100 dark:border-red-900/50">
                              {product.category?.name || 'Smartphones'}
                            </span>
                          </div>

                          <Link href={`/products/${product.id}`} className="block mt-1">
                            <h3 className="text-xs sm:text-sm font-bold text-gray-900 dark:text-white line-clamp-1 group-hover:text-red-600 transition-colors">
                              {product.name}
                            </h3>
                          </Link>
                        </div>

                        <div className="pt-2 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between gap-1">
                          <span className="text-sm sm:text-base font-extrabold text-gray-900 dark:text-white">
                            GH₵{Number(product.price).toLocaleString()}
                          </span>

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
                            className="px-2.5 sm:px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white font-bold text-[10px] sm:text-xs rounded-xl shadow-md shadow-red-600/20 transition active:scale-95 shrink-0"
                          >
                            Add to Cart
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Filter Drawer */}
      {isMobileFilterOpen && (
        <div className="fixed inset-0 z-50 md:hidden flex justify-end">
          <div className="fixed inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setIsMobileFilterOpen(false)}></div>
          <div className="relative w-[280px] bg-white h-full shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
            <div className="p-4 border-b flex items-center justify-between bg-gray-50">
              <h2 className="font-black text-lg text-gray-900">Filters</h2>
              <button onClick={() => setIsMobileFilterOpen(false)} className="p-2 text-gray-500 hover:text-black bg-white rounded-full border">
                <X size={20} />
              </button>
            </div>
            <div className="p-6 flex-1 overflow-y-auto">
              <FilterSidebar />
            </div>
            <div className="p-4 border-t bg-white">
              <button
                onClick={() => setIsMobileFilterOpen(false)}
                className="w-full bg-red-600 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-red-600/30 active:scale-95 transition-transform"
              >
                Show {filteredProducts.length} Results
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
