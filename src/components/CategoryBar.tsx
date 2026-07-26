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
  { name: 'Speakers', image: '/speaker.PNG' },
  { name: 'Fragrance & Scalp Care', image: '/fragrance.PNG' },
  { name: 'Accessories', image: '/Covers.png' },
];

export default function CategoryBar({
  selectedCategory,
  onSelectCategory,
}: CategoryBarProps) {
  return (
    <section className="relative py-4 sm:py-6 overflow-hidden">
      {/* Ambient Background Orbs */}
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-red-400/10 rounded-full blur-[100px] pointer-events-none -translate-y-1/2 -translate-x-1/2" />
      <div className="absolute top-1/2 right-1/4 w-80 h-80 bg-orange-400/10 rounded-full blur-[100px] pointer-events-none -translate-y-1/2" />

      <div className="mx-auto max-w-7xl px-4 relative z-10">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-lg sm:text-xl font-extrabold text-gray-900 dark:text-white tracking-tight">
            Explore Categories
          </h2>
          {selectedCategory && (
            <button
              onClick={() => onSelectCategory(null)}
              className="text-xs font-bold text-red-600 hover:underline"
            >
              Clear Filter ({selectedCategory})
            </button>
          )}
        </div>

        {/* Floating Showcase Devices (No White Background Cards) */}
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-1 sm:gap-2 md:gap-3 items-start justify-items-center">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat.name;
            return (
              <button
                key={cat.name}
                onClick={() => onSelectCategory(isSelected ? null : cat.name)}
                className="group flex flex-col items-center gap-1.5 transition-all duration-300 w-full active:scale-95 cursor-pointer"
              >
                <div
                  className={`relative flex h-28 w-28 sm:h-36 sm:w-36 md:h-48 md:w-48 items-center justify-center transition-all duration-300 ${
                    isSelected
                      ? 'scale-110 drop-shadow-xl'
                      : 'group-hover:scale-110 group-hover:-translate-y-1.5 group-hover:drop-shadow-lg'
                  }`}
                >
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="relative z-10 h-full w-full object-contain drop-shadow-md transition-transform duration-300 ease-out"
                  />
                </div>
                <span
                  className={`text-center text-[12px] sm:text-xs font-bold tracking-tight line-clamp-2 transition-colors px-1 py-0.5 rounded-full ${
                    isSelected
                      ? 'text-red-600 dark:text-red-400 bg-red-500/10 border border-red-500/20 px-2.5'
                      : 'text-gray-700 dark:text-gray-300 group-hover:text-red-600 dark:group-hover:text-white'
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