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
        <section className="py-8">
            <div className="flex items-center gap-4 overflow-x-auto px-4 pb-2 scrollbar-none snap-x snap-mandatory">
                {categories.map((cat, index) => (
                    <Link
                        key={index}
                        href={cat.href}
                        className="snap-center shrink-0 flex flex-col items-center min-w-[84px] group cursor-pointer"
                    >
                        {/* Glass Bubble Container */}
                        <div className="w-16 h-16 rounded-full bg-white border border-gray-200 p-2 flex items-center justify-center overflow-hidden shadow-sm group-hover:border-red-500 transition-colors">
                            <img
                                src={cat.image}
                                alt={cat.name}
                                className="w-full h-full object-contain"
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
