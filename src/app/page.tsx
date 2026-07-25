'use client';

import { useState } from 'react';
import Link from 'next/link';
import CategoryBar from '@/components/CategoryBar';
import ProductGrid from '@/components/store/ProductGrid';
import RecentlyViewedSection from '@/components/store/RecentlyViewedSection';

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

        {/* Promo Video Banner */}
        <div className="w-full max-w-4xl mx-auto my-6 px-4">
          <div className="rounded-3xl overflow-hidden shadow-xl border border-gray-200/60 bg-black">
            <video 
              src="/Promo-video.mp4" 
              autoPlay 
              loop 
              muted 
              playsInline
              className="w-full h-auto object-cover max-h-[450px]"
            />
          </div>
        </div>

        {/* Section Title & Display All Controls */}
        <section className="mx-auto mt-8 flex max-w-7xl items-center justify-between px-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              {selectedCategory ? selectedCategory : 'Available Products'}
            </h2>
            <p className="text-sm text-gray-500">
              Explore authentic devices & original accessories
            </p>
          </div>

          <Link
            href="/products"
            className="rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Display All
          </Link>
        </section>

        {/* Database Product Grid */}
        <ProductGrid selectedCategory={selectedCategory} />

        {/* Recently Viewed Section */}
        <RecentlyViewedSection />
      </div>
    </main>
  );
}