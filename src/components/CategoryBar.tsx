'use client';

import React, { useRef, useState, useEffect } from 'react';
import { ChevronRight, ChevronLeft } from 'lucide-react';

interface CategoryBarProps {
  selectedCategory: string | null;
  onSelectCategory: (category: string | null) => void;
}

const categories = [
  { name: 'Smartphones', image: '/iphones.PNG' },
  { name: 'Accessories', image: '/Covers.png' },
  { name: 'Watches', image: '/Watches.png' },
  { name: 'Speakers', image: '/speaker.PNG' },
  { name: 'Fragrance & Scalp Care', image: '/fragrance.PNG' },
  { name: 'Tablets', image: '/tablet.PNG' },
];

export default function CategoryBar({
  selectedCategory,
  onSelectCategory,
}: CategoryBarProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 10);
      setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 10);
    }
  };

  useEffect(() => {
    checkScroll();
    const el = scrollRef.current;
    if (el) {
      el.addEventListener('scroll', checkScroll);
      window.addEventListener('resize', checkScroll);
    }
    return () => {
      if (el) el.removeEventListener('scroll', checkScroll);
      window.removeEventListener('resize', checkScroll);
    };
  }, []);

  const handleScroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const targetLeft = direction === 'left' ? 0 : scrollRef.current.scrollWidth;
      scrollRef.current.scrollTo({ left: targetLeft, behavior: 'smooth' });
    }
  };

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

        {/* Floating Direction Buttons for Mobile Horizontal Scroll */}
        <div className="relative">
          {/* Scroll Left Button */}
          {canScrollLeft && (
            <button
              onClick={() => handleScroll('left')}
              className="md:hidden absolute left-0.5 top-1/2 -translate-y-1/2 z-30 w-6 h-6 rounded-full bg-black text-white shadow-md border border-white/40 flex items-center justify-center active:scale-90 transition-all"
              aria-label="Scroll Categories Left"
            >
              <ChevronLeft size={14} />
            </button>
          )}

          {/* Floating Pulse Scroll Right Button (Mobile Hint) */}
          {canScrollRight && (
            <button
              onClick={() => handleScroll('right')}
              className="md:hidden absolute right-0.5 top-1/2 -translate-y-1/2 z-30 w-6 h-6 rounded-full bg-black text-white shadow-md border border-white/40 flex items-center justify-center animate-pulse active:scale-90 transition-all cursor-pointer"
              aria-label="Scroll Categories Right"
              title="Scroll to see more categories"
            >
              <ChevronRight size={14} />
            </button>
          )}

          {/* Generously Spaced Responsive Grid / Horizontal Scroll */}
          <div 
            ref={scrollRef}
            className="flex overflow-x-auto md:grid md:grid-cols-6 gap-5 sm:gap-8 items-start justify-between pb-3 scrollbar-none snap-x snap-mandatory px-1"
          >
            {categories.map((cat) => {
              const isSelected = selectedCategory === cat.name;
              return (
                <button
                  key={cat.name}
                  onClick={() => onSelectCategory(isSelected ? null : cat.name)}
                  className="group flex-shrink-0 w-28 sm:w-36 md:w-auto flex flex-col items-center gap-2.5 transition-all duration-300 active:scale-95 cursor-pointer snap-center"
                >
                  {/* Large Proportioned Image Frame */}
                  <div
                    className={`relative flex h-28 w-28 sm:h-36 sm:w-36 md:h-44 md:w-44 items-center justify-center p-1 transition-all duration-300 ${
                      isSelected
                        ? 'scale-110 drop-shadow-2xl'
                        : 'group-hover:scale-108 group-hover:-translate-y-1 group-hover:drop-shadow-xl'
                    }`}
                  >
                    <img
                      src={cat.image}
                      alt={cat.name}
                      className="relative z-10 w-full h-full object-contain drop-shadow-md transition-transform duration-300 ease-out"
                    />
                  </div>

                  <span
                    className={`text-center text-xs sm:text-sm font-extrabold tracking-tight leading-tight line-clamp-2 transition-colors px-2.5 py-0.5 rounded-full ${
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
      </div>
    </section>
  );
}