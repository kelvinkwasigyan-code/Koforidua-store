'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import CategoryBar from '@/components/CategoryBar';
import ProductGrid from '@/components/store/ProductGrid';
import RecentlyViewedSection from '@/components/store/RecentlyViewedSection';
import { ArrowRight, Newspaper, MapPin, ChevronLeft, ChevronRight, Store, ShieldCheck, RefreshCw } from 'lucide-react';

interface InfoSlide {
  title: string;
  subtitle: string;
  badge: string;
  badgeBg: string;
  badgeIcon: any;
  gradient: string;
  orbColor: string;
  image?: string;
  actionText: string;
  actionLink: string;
}

const infoSlides: InfoSlide[] = [
  {
    title: 'Premium Devices & Original Accessories',
    subtitle: 'Shop the latest smartphones, wearables, and authentic accessories with complete peace of mind. In stock now at Joerich Phones.',
    badge: 'NEW ARRIVALS • IN STOCK',
    badgeBg: 'bg-red-950/60 border border-red-800/40 text-red-400',
    badgeIcon: Store,
    gradient: 'from-slate-950 via-slate-900 to-slate-950',
    orbColor: 'bg-red-600/10',
    image: '/info-1.jpg',
    actionText: 'Explore Products',
    actionLink: '/products'
  },
  {
    title: 'Nationwide Delivery & Secure Payments',
    subtitle: 'Enjoy fast, reliable delivery anywhere in Ghana. We accept secure Mobile Money and Cash on Delivery options.',
    badge: 'GUARANTEED SERVICE',
    badgeBg: 'bg-emerald-950/60 border border-emerald-800/40 text-emerald-400',
    badgeIcon: ShieldCheck,
    gradient: 'from-slate-950 via-gray-950 to-slate-950',
    orbColor: 'bg-emerald-600/10',
    image: '/info-2.jpg',
    actionText: 'View Store Location',
    actionLink: '/store-location'
  },
  {
    title: 'Swap, Buy & Sell Your Devices Today',
    subtitle: 'Upgrade your phone easily! Trade in your old device for a brand new one or sell it to us for instant cash.',
    badge: 'TRADE-IN PROGRAM',
    badgeBg: 'bg-indigo-950/60 border border-indigo-800/40 text-indigo-400',
    badgeIcon: RefreshCw,
    gradient: 'from-slate-950 via-slate-900 to-slate-950',
    orbColor: 'bg-indigo-600/10',
    image: '/info-3.jpg',
    actionText: 'Learn How to Swap',
    actionLink: '/swap-sell'
  },
];

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % infoSlides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const slide = infoSlides[currentSlide];

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-slate-950 flex flex-col justify-between font-sans">
      <div>
        {/* Category Bar */}
        <CategoryBar
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />

        {/* Store Information Banner Hero Carousel */}
        <div className="w-full max-w-7xl mx-auto my-3 px-4">
          <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-slate-900 via-black to-slate-950 border border-slate-800 dark:border-white/10 px-5 py-6 sm:px-8 sm:py-8 shadow-xl flex flex-col justify-between min-h-[220px] sm:min-h-[260px] transition-all duration-700 group">

            {/* Subtle Ambient Background Lighting */}
            <div className={`absolute top-0 right-0 w-72 h-72 ${slide.orbColor} rounded-full blur-3xl opacity-60 pointer-events-none transition-colors duration-700 transform-gpu`} />
            <div className="absolute -bottom-10 -left-10 w-72 h-72 bg-slate-800/30 rounded-full blur-3xl pointer-events-none transform-gpu" />

            {/* Dynamic Product Background Image */}
            {slide.image && (
              <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
                <div className="absolute right-[-15%] sm:right-[5%] top-1/2 -translate-y-1/2 w-56 h-56 sm:w-80 sm:h-80 opacity-40 sm:opacity-80 transition-opacity duration-700 transform-gpu">
                  <Image
                    src={slide.image}
                    alt="Store Feature"
                    fill
                    sizes="(max-width: 768px) 50vw, 33vw"
                    className="object-contain object-right transform group-hover:scale-105 transition-transform duration-1000"
                  />
                </div>
                {/* Fade gradient so text stays readable */}
                <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-950/60 to-transparent sm:w-2/3 transform-gpu" />
              </div>
            )}

            {/* Top Row: Info Tag & Location */}
            <div className="relative z-10 flex flex-wrap items-center justify-between gap-2 mb-1.5">
              <div className="flex items-center gap-2">
                <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 ${slide.badgeBg} rounded-full text-[10px] font-bold tracking-normal transition-colors duration-500`}>
                  <slide.badgeIcon size={11} /> {slide.badge}
                </span>
              </div>

              <div className="inline-flex items-center gap-1 text-[10px] font-bold text-slate-400 bg-white/5 backdrop-blur-md px-2.5 py-0.5 rounded-full border border-white/5">
                <MapPin size={10} className="text-red-400" />
                <span>Koforidua, Accra Station</span>
              </div>
            </div>

            {/* Middle Row: Title & Description */}
            <div className="relative z-10 space-y-2 my-2 max-w-2xl">
              <h1 className="text-xl sm:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-300 tracking-tight leading-tight transition-all duration-500 line-clamp-2 drop-shadow-sm">
                {slide.title}
              </h1>

              <p className="text-xs sm:text-sm text-slate-300 font-medium leading-relaxed max-w-3xl transition-all duration-500 line-clamp-2">
                {slide.subtitle}
              </p>
            </div>

            {/* Bottom Row: Actions & Minimal Indicator Dots */}
            <div className="relative z-10 pt-4 flex flex-wrap items-center justify-between gap-3 border-t border-slate-800/60">
              <div className="flex items-center gap-2.5">
                <Link
                  href={slide.actionLink}
                  className="px-4 py-1.5 bg-red-600 hover:bg-red-700 text-white font-bold text-xs rounded-xl shadow-xs transition-all flex items-center gap-1.5 active:scale-95"
                >
                  <span>{slide.actionText}</span>
                  <ArrowRight size={13} />
                </Link>
              </div>

              {/* Minimalist Carousel Progress Dots */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setCurrentSlide((prev) => (prev === 0 ? infoSlides.length - 1 : prev - 1))}
                  className="p-1 rounded-full bg-white/5 hover:bg-white/10 text-slate-300 transition border border-white/5 mr-1"
                >
                  <ChevronLeft size={12} />
                </button>
                {infoSlides.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentSlide(idx)}
                    className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                      currentSlide === idx ? 'w-6 bg-red-500' : 'w-1.5 bg-white/20 hover:bg-white/50'
                    }`}
                    aria-label={`Go to slide ${idx + 1}`}
                  />
                ))}
                <button
                  onClick={() => setCurrentSlide((prev) => (prev + 1) % infoSlides.length)}
                  className="p-1 rounded-full bg-white/5 hover:bg-white/10 text-slate-300 transition border border-white/5 ml-1"
                >
                  <ChevronRight size={12} />
                </button>
              </div>
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