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
    <section className="relative py-4 sm:py-6 overflow-hidden font-sans">
      {/* Ambient Background Orbs */}
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-red-400/10 rounded-full blur-[100px] pointer-events-none -translate-y-1/2 -translate-x-1/2" />
      <div className="absolute top-1/2 right-1/4 w-80 h-80 bg-orange-400/10 rounded-full blur-[100px] pointer-events-none -translate-y-1/2" />

      <div className="mx-auto max-w-7xl px-4 relative z-10">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-base sm:text-xl font-extrabold text-gray-900 dark:text-white tracking-tight">
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

        {/* Generously Spaced Responsive Grid / Horizontal Scroll */}
        <div className="flex overflow-x-auto md:grid md:grid-cols-6 gap-4 sm:gap-6 items-start justify-between pb-2 scrollbar-none snap-x snap-mandatory">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat.name;
            return (
              <button
                key={cat.name}
                onClick={() => onSelectCategory(isSelected ? null : cat.name)}
                className="group flex-shrink-0 w-24 sm:w-28 md:w-auto flex flex-col items-center gap-2 transition-all duration-300 active:scale-95 cursor-pointer snap-center"
              >
                {/* Proportioned Image Frame with Extra Breathing Room */}
                <div
                  className={`relative flex h-20 w-20 sm:h-24 sm:w-24 md:h-32 md:w-32 items-center justify-center p-1 transition-all duration-300 ${
                    isSelected
                      ? 'scale-110 drop-shadow-xl'
                      : 'group-hover:scale-108 group-hover:-translate-y-1 group-hover:drop-shadow-lg'
                  }`}
                >
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="relative z-10 max-h-full max-w-full object-contain drop-shadow-md transition-transform duration-300 ease-out"
                  />
                </div>

                <span
                  className={`text-center text-[11px] sm:text-xs font-extrabold tracking-tight leading-tight line-clamp-2 transition-colors px-2 py-0.5 rounded-full ${
                    isSelected
                      ? 'text-red-600 dark:text-red-400 bg-red-500/10 border border-red-500/20'
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