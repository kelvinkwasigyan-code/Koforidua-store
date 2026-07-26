'use client';

import { useState } from 'react';
import ProductGrid from '@/components/store/ProductGrid';
import { Sparkles, Package } from 'lucide-react';

const categories = [
  'Smartphones',
  'Accessories',
  'Watches',
  'Speakers',
  'Fragrance & Scalp Care',
  'Tablets',
];

export default function NewArrivalsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-950 flex flex-col justify-between font-sans">
      <main className="flex-1 w-full pb-24 pt-6 md:pt-8">
        {/* Simple Text Category Filter Pills */}
        <div className="max-w-7xl mx-auto px-4 mb-8">
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
            <button
              onClick={() => setSelectedCategory(null)}
              className={`px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-extrabold transition-all border shadow-xs cursor-pointer ${
                selectedCategory === null
                  ? 'bg-red-600 text-white border-red-600 shadow-md scale-105'
                  : 'bg-white dark:bg-slate-900 text-gray-800 dark:text-gray-200 border-gray-200/80 dark:border-slate-800 hover:border-red-500/40 hover:bg-gray-50 dark:hover:bg-slate-800'
              }`}
            >
              All New Arrivals
            </button>

            {categories.map((catName) => {
              const isSelected = selectedCategory === catName;
              return (
                <button
                  key={catName}
                  onClick={() => setSelectedCategory(isSelected ? null : catName)}
                  className={`px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-extrabold transition-all border shadow-xs flex items-center gap-1.5 cursor-pointer ${
                    isSelected
                      ? 'bg-red-600 text-white border-red-600 shadow-md scale-105'
                      : 'bg-white dark:bg-slate-900 text-gray-800 dark:text-gray-200 border-gray-200/80 dark:border-slate-800 hover:border-red-500/40 hover:bg-gray-50 dark:hover:bg-slate-800'
                  }`}
                >
                  <span>{catName}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Newly Uploaded Product Grid */}
        <div className="max-w-7xl mx-auto px-4">
          <ProductGrid selectedCategory={selectedCategory} onlyUploaded={true} />
        </div>

      </main>
    </div>
  );
}
