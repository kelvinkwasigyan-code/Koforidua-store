'use client';

import React from 'react';
import Link from 'next/link';

const categories = [
    { name: 'Smartphones', image: '/images/smartphones.png', href: '#smartphones' },
    { name: 'Tablets', image: '/images/tablets.png', href: '#tablets' },
    { name: 'Smart Watches', image: '/images/watches.png', href: '#watches' },
    { name: 'Covers & Cases', image: '/images/covers.png', href: '#covers' },
    { name: 'Chargers', image: '/images/chargers.png', href: '#chargers' },
    { name: 'Hair & Scalp Care', image: '/images/haircare.png', href: '#hair-care' },
];

export default function CategoryRow() {
    return (
        <section className="py-8 px-4 max-w-7xl mx-auto">
            <div className="flex items-center justify-start sm:justify-center gap-6 overflow-x-auto pb-4 scrollbar-none">
                {categories.map((cat, index) => (
                    <Link
                        key={index}
                        href={cat.href}
                        className="flex flex-col items-center min-w-[84px] group cursor-pointer"
                    >
                        {/* Glass Bubble Container */}
                        <div className="relative w-16 h-16 rounded-full backdrop-blur-xl bg-white/60 dark:bg-gray-800/60 border border-white/80 dark:border-white/10 shadow-sm flex items-center justify-center p-2.5 group-hover:scale-110 group-hover:bg-red-500/10 transition-all duration-300">
                            <img
                                src={cat.image}
                                alt={cat.name}
                                className="w-full h-full object-contain filter drop-shadow-sm"
                            />
                        </div>

                        {/* Label */}
                        <span className="text-xs font-semibold text-gray-700 dark:text-gray-300 mt-2 text-center group-hover:text-red-600 transition">
                            {cat.name}
                        </span>
                    </Link>
                ))}
            </div>
        </section>
    );
}
