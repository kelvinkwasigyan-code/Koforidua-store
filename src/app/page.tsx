'use client';

import { useState } from 'react';
import CategoryBar from '@/components/CategoryBar';
import ProductGrid from '@/components/store/ProductGrid';

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  return (
    <main className="min-h-screen bg-gray-50 flex flex-col justify-between">
      <div>
        {/* Category Bar */}
        <CategoryBar
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />

        {/* Section Title & Display All Controls */}
        <section className="mx-auto mt-8 flex max-w-7xl items-center justify-between px-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              {selectedCategory ? selectedCategory : 'Featured Products'}
            </h2>
            <p className="text-sm text-gray-500">
              Explore authentic devices & original accessories
            </p>
          </div>

          <button
            onClick={() => setSelectedCategory(null)}
            className={`rounded-lg border px-4 py-2 text-sm font-semibold transition-colors ${
              selectedCategory === null
                ? 'border-red-200 bg-red-50 text-red-600'
                : 'border-gray-200 bg-white text-gray-700 hover:bg-gray-50'
            }`}
          >
            Display All
          </button>
        </section>

        {/* Database Product Grid */}
        <ProductGrid selectedCategory={selectedCategory} />
      </div>
    </main>
  );
}