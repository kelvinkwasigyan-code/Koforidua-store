'use client';

import { useState } from 'react';
import Link from 'next/link';
import CategoryBar from '@/components/CategoryBar';
import ProductGrid from '@/components/store/ProductGrid';
import RecentlyViewedSection from '@/components/store/RecentlyViewedSection';
import { ArrowRight, Sparkles, ShieldCheck, MapPin } from 'lucide-react';

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-slate-950 flex flex-col justify-between">
      <div>
        {/* Category Bar */}
        <CategoryBar
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />

        {/* Compact Stretched Apple Glass Hero Banner */}
        <div className="w-full max-w-7xl mx-auto my-2 px-4">
          <div className="relative rounded-2xl overflow-hidden bg-gradient-to-r from-slate-900 via-gray-900 to-red-950 px-5 py-3 sm:px-8 sm:py-3.5 border border-white/10 shadow-[0_8px_24px_rgba(0,0,0,0.12)] flex flex-col sm:flex-row items-center justify-between gap-3">

            {/* Ambient Background Glowing Spheres */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-red-600/20 rounded-full blur-[80px] pointer-events-none" />
            <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-rose-600/15 rounded-full blur-[80px] pointer-events-none" />

            <div className="relative z-10 max-w-xl space-y-1.5 text-center sm:text-left">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-red-500/20 border border-red-500/30 rounded-full text-[10px] font-bold text-red-400 uppercase tracking-wider">
                <Sparkles size={11} /> Genuine Products Guaranteed
              </div>

              <h1 className="text-lg sm:text-2xl font-extrabold text-white tracking-tight leading-snug">
                Experience Next-Gen Technology at <span className="text-red-500">Joerich Phones</span>
              </h1>

              <p className="text-[11px] sm:text-xs text-gray-300 font-medium leading-normal">
                Your trusted store in Koforidua for authentic Apple iPhones, Tablets, Watches & Accessories.
              </p>

              <div className="pt-1 flex flex-wrap items-center justify-center sm:justify-start gap-2">
                <Link
                  href="/products"
                  className="px-3.5 py-1.5 bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 text-white font-extrabold text-[11px] rounded-xl shadow-md shadow-red-600/20 transition-all flex items-center gap-1.5 active:scale-95"
                >
                  <span>Explore All</span>
                  <ArrowRight size={13} />
                </Link>

                <div className="inline-flex items-center gap-1 text-[10px] font-semibold text-gray-400 bg-white/10 backdrop-blur-md px-2.5 py-1.5 rounded-xl border border-white/10">
                  <MapPin size={11} className="text-red-400" />
                  <span>Koforidua, Accra Station</span>
                </div>
              </div>
            </div>

            {/* Showcase Visual Badge */}
            <div className="relative z-10 hidden md:flex flex-col items-center justify-center bg-white/10 backdrop-blur-2xl p-3 rounded-2xl border border-white/15 shadow-md text-center space-y-1 shrink-0 w-48">
              <div className="w-8 h-8 rounded-xl bg-red-600/20 text-red-400 flex items-center justify-center">
                <ShieldCheck size={18} />
              </div>
              <h4 className="text-xs font-bold text-white">Official Warranty</h4>
              <p className="text-[10px] text-gray-300 font-medium">100% Original Products with store support.</p>
            </div>
          </div>
        </div>

        {/* Section Title & Display All Controls */}
        <section className="mx-auto mt-8 flex max-w-7xl items-center justify-between px-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight">
              {selectedCategory ? selectedCategory : 'Available Products'}
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Explore authentic devices & original accessories
            </p>
          </div>

          <Link
            href="/products"
            className="rounded-2xl border border-gray-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl px-4 py-2 text-xs font-bold text-gray-700 dark:text-gray-200 hover:bg-gray-50 transition-colors shadow-2xs"
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