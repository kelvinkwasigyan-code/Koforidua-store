'use client';

import React, { useState, useMemo } from 'react';
import ProductCard from '@/components/store/ProductCard';
import { useCart } from '@/store/CartContext';

// Sample Catalog Data
const initialProducts = [
    {
        id: '1',
        name: 'Apple iPhone 14 Pro',
        brand: 'Apple',
        category: 'Smartphones',
        price: 11800,
        originalPrice: 12500,
        inStock: true,
        stockQuantity: 2,
        condition: 'Brand New (Sealed)',
        imageUrl: '/images/iphone14pro.png',
    },
    {
        id: '2',
        name: 'Apple iPhone 17 Pro Max',
        brand: 'Apple',
        category: 'Smartphones',
        price: 17200,
        originalPrice: 18500,
        inStock: true,
        stockQuantity: 5,
        condition: 'Brand New (Sealed)',
        imageUrl: '/images/iphone17promax.png',
    },
    {
        id: '3',
        name: 'Samsung Galaxy S24 Ultra',
        brand: 'Android',
        category: 'Smartphones',
        price: 16500,
        inStock: true,
        stockQuantity: 4,
        condition: 'Brand New (Sealed)',
        imageUrl: '/images/s24ultra.png',
    },
    {
        id: '4',
        name: 'Xiaomi Redmi Note 13 Pro',
        brand: 'Android',
        category: 'Smartphones',
        price: 3800,
        inStock: false,
        stockQuantity: 0,
        condition: 'Slightly Used',
        imageUrl: '/images/redmi13pro.png',
    },
];

const brandFilters = ['All', 'Apple', 'Android'];

export default function AllProductsPage() {
    const [selectedBrand, setSelectedBrand] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');
    const [sortBy, setSortBy] = useState<'default' | 'low-high' | 'high-low'>('default');

    // Filter & Sort Logic
    const filteredProducts = useMemo(() => {
        return initialProducts
            .filter((product) => {
                const matchesBrand =
                    selectedBrand === 'All' ||
                    product.brand.toLowerCase() === selectedBrand.toLowerCase();
                const matchesSearch = product.name
                    .toLowerCase()
                    .includes(searchQuery.toLowerCase());
                return matchesBrand && matchesSearch;
            })
            .sort((a, b) => {
                if (sortBy === 'low-high') return a.price - b.price;
                if (sortBy === 'high-low') return b.price - a.price;
                return 0;
            });
    }, [selectedBrand, searchQuery, sortBy]);

    return (
        <main className="min-h-screen py-10 px-4 max-w-7xl mx-auto space-y-8">

            {/* Header Banner */}
            <div className="backdrop-blur-2xl bg-white/40 border border-white/80 rounded-3xl p-6 sm:p-10 shadow-[0_8px_32px_rgba(0,0,0,0.03)] text-center relative overflow-hidden">
                <div className="absolute -top-12 -left-12 w-48 h-48 bg-red-400/20 rounded-full blur-2xl pointer-events-none" />
                <h1 className="text-2xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
                    All Products & Devices
                </h1>
                <p className="text-xs sm:text-sm text-gray-600 mt-2 max-w-lg mx-auto">
                    Explore authentic mobile devices and accessories available for fast delivery across Ghana.
                </p>
            </div>

            {/* Controls Bar (Search, Brand Filter, Sort) */}
            <div className="backdrop-blur-xl bg-white/50 border border-white/80 rounded-2xl p-4 shadow-sm flex flex-wrap items-center justify-between gap-4">

                {/* Search Input */}
                <div className="w-full sm:w-72">
                    <input
                        type="text"
                        placeholder="Search catalog..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full bg-white/60 backdrop-blur-md text-xs px-4 py-2.5 rounded-full border border-white/90 focus:outline-none focus:border-red-400 focus:bg-white shadow-inner"
                    />
                </div>

                {/* Brand Filter Pills */}
                <div className="flex items-center space-x-2">
                    {brandFilters.map((brand) => (
                        <button
                            key={brand}
                            onClick={() => setSelectedBrand(brand)}
                            className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 border ${selectedBrand === brand
                                    ? 'bg-gray-900 text-white border-gray-900 shadow-sm'
                                    : 'bg-white/60 text-gray-700 border-white/90 hover:bg-white/90'
                                }`}
                        >
                            {brand}
                        </button>
                    ))}
                </div>

                {/* Sort Dropdown */}
                <div className="flex items-center space-x-2 text-xs">
                    <label className="text-gray-500 font-medium">Sort by:</label>
                    <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value as any)}
                        className="bg-white/60 backdrop-blur-md text-xs px-3 py-1.5 rounded-full border border-white/90 focus:outline-none font-semibold text-gray-800"
                    >
                        <option value="default">Featured</option>
                        <option value="low-high">Price: Low to High</option>
                        <option value="high-low">Price: High to Low</option>
                    </select>
                </div>

            </div>

            {/* Products Grid */}
            {filteredProducts.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {filteredProducts.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            ) : (
                <div className="text-center py-20 backdrop-blur-xl bg-white/30 rounded-3xl border border-white/60">
                    <p className="text-gray-500 text-sm font-medium">No products match your criteria.</p>
                </div>
            )}

        </main>
    );
}
