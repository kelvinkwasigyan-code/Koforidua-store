'use client';

import React from 'react';

interface CategoryBarProps {
  selectedCategory: string | null;
  onSelectCategory: (category: string | null) => void;
}

const categories = [
  { name: 'Smartphones', image: '/iphones.PNG' },
  { name: 'Tablets', image: '/tablet.PNG' },
  { name: 'Watches', image: '/Watches.png' },
  { name: 'Accessories', image: '/Covers.png' },
  { name: 'Fragrance & Scalp Care', image: '/fragrance.PNG' },
];

export default function CategoryBar({
  selectedCategory,
  onSelectCategory,
}: CategoryBarProps) {
  return (
    <section className="relative py-8 overflow-hidden">
      {/* Ambient Background Orbs for Glass Interaction */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-red-400/20 rounded-full blur-[100px] pointer-events-none -translate-y-1/2 -translate-x-1/2" />
      <div className="absolute top-1/2 right-1/4 w-80 h-80 bg-orange-400/20 rounded-full blur-[100px] pointer-events-none -translate-y-1/2" />

      <div className="mx-auto max-w-7xl px-4 relative z-10">
        <div className="mb-6">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight">
            Explore Categories
          </h2>
        </div>

        <div className="flex items-center gap-4 sm:gap-6 overflow-x-auto pb-6 snap-x snap-mandatory [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat.name;
            return (
              <button
                key={cat.name}
                onClick={() => onSelectCategory(isSelected ? null : cat.name)}
                className="snap-start shrink-0 group flex flex-col items-center gap-4 transition-all duration-300 active:scale-95"
              >
                <div
                  className={`relative flex h-36 w-36 md:h-[220px] md:w-[220px] items-center justify-center transition-all duration-500 ${
                    isSelected ? 'scale-110 drop-shadow-md' : 'group-hover:scale-110 group-hover:-translate-y-2 group-hover:drop-shadow-xl'
                  }`}
                >
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="relative z-10 h-full w-full object-contain drop-shadow-sm transition-transform duration-500 ease-out"
                  />
                </div>
                <span
                  className={`text-center text-[13px] md:text-base font-bold tracking-tight transition-colors mt-1 ${
                    isSelected ? 'text-red-600' : 'text-gray-600 group-hover:text-gray-900'
                  }`}
                >
                  {cat.name}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}