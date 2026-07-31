'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import CategoryBar from '@/components/CategoryBar';
import ProductGrid from '@/components/store/ProductGrid';
import RecentlyViewedSection from '@/components/store/RecentlyViewedSection';
import { ArrowRight, Newspaper, MapPin, ChevronLeft, ChevronRight, ExternalLink, Radio } from 'lucide-react';

interface AppleNewsItem {
  title: string;
  link: string;
  pubDate: string;
  description: string;
  source: string;
  badge: string;
  badgeBg: string;
  gradient: string;
  orbColor: string;
  image?: string;
}

const fallbackSlides: AppleNewsItem[] = [
  {
    title: 'Apple introduces iPhone 16 Pro and iPhone 16 Pro Max',
    link: 'https://www.apple.com/newsroom/',
    pubDate: 'Latest Release',
    description: 'Featuring the A18 Pro chip, Camera Control, 48MP Fusion camera system, and a huge leap in battery life. In stock at Joerich Phones.',
    source: 'Official Apple Newsroom',
    badge: ' APPLE NEWSROOM • LATEST RELEASE',
    badgeBg: 'bg-red-950/60 border border-red-800/40 text-red-400',
    gradient: 'from-slate-950 via-slate-900 to-slate-950',
    orbColor: 'bg-red-600/10',
    image: '/iphones.PNG',
  },
  {
    title: 'Apple Watch Ultra 2 now available in Black Titanium',
    link: 'https://www.apple.com/newsroom/',
    pubDate: 'Wearable Tech',
    description: 'The ultimate sports and adventure watch features precision dual-frequency GPS, up to 36 hours battery life, and 3000 nits display.',
    source: 'Official Apple Newsroom',
    badge: ' APPLE NEWSROOM • WEARABLE TECH',
    badgeBg: 'bg-indigo-950/60 border border-indigo-800/40 text-indigo-400',
    gradient: 'from-slate-950 via-gray-950 to-slate-950',
    orbColor: 'bg-indigo-600/10',
    image: '/Watches.png',
  },
  {
    title: 'Apple Intelligence features expand across iOS & macOS',
    link: 'https://www.apple.com/newsroom/',
    pubDate: 'Press Release',
    description: 'Personal intelligence system that combines generative AI models with personal context to deliver useful, relevant assistance.',
    source: 'Official Apple Newsroom',
    badge: ' APPLE NEWSROOM • PRESS RELEASE',
    badgeBg: 'bg-rose-950/60 border border-rose-800/40 text-rose-400',
    gradient: 'from-slate-950 via-slate-900 to-slate-950',
    orbColor: 'bg-rose-600/10',
    image: '/tablet.PNG',
  },
];

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [newsSlides, setNewsSlides] = useState<AppleNewsItem[]>(fallbackSlides);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isLive, setIsLive] = useState(false);

  useEffect(() => {
    async function loadLiveAppleNews() {
      try {
        const res = await fetch('/api/apple-news');
        const data = await res.json();
        if (data.news && Array.isArray(data.news) && data.news.length > 0) {
          setNewsSlides(data.news);
          setIsLive(data.live ?? true);
        }
      } catch (err) {
        console.error('Failed to load live Apple News:', err);
      }
    }
    loadLiveAppleNews();
  }, []);

  useEffect(() => {
    if (newsSlides.length === 0) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % newsSlides.length);
    }, 5500);
    return () => clearInterval(timer);
  }, [newsSlides]);

  const slide = newsSlides[currentSlide] || fallbackSlides[0];

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-slate-950 flex flex-col justify-between font-sans">
      <div>
        {/* Category Bar */}
        <CategoryBar
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />

        {/* Minimal Sleek Apple Newsroom Banner Hero Carousel */}
        <div className="w-full max-w-7xl mx-auto my-3 px-4">
          <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-slate-900 via-black to-slate-950 border border-slate-800 dark:border-white/10 px-5 py-6 sm:px-8 sm:py-8 shadow-xl flex flex-col justify-between min-h-[200px] sm:min-h-[240px] transition-all duration-700 group">

            {/* Subtle Ambient Background Lighting */}
            <div className={`absolute top-0 right-0 w-72 h-72 ${slide.orbColor} rounded-full blur-[90px] pointer-events-none transition-colors duration-700`} />
            <div className="absolute -bottom-10 -left-10 w-72 h-72 bg-slate-800/20 rounded-full blur-[90px] pointer-events-none" />

            {/* Dynamic Product Background Image */}
            {slide.image && (
              <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
                <div className="absolute right-[-15%] sm:right-[5%] top-1/2 -translate-y-1/2 w-56 h-56 sm:w-80 sm:h-80 opacity-40 sm:opacity-70 transition-opacity duration-700">
                  <Image
                    src={slide.image}
                    alt="Apple Product"
                    fill
                    className="object-contain object-right transform group-hover:scale-105 transition-transform duration-1000"
                  />
                </div>
                {/* Fade gradient so text stays readable */}
                <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-950/60 to-transparent sm:w-2/3" />
              </div>
            )}

            {/* Top Row: News Tag & Location */}
            <div className="relative z-10 flex flex-wrap items-center justify-between gap-2 mb-1.5">
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-red-950/40 border border-red-800/30 text-red-400 rounded-full text-[10px] font-medium tracking-normal transition-colors duration-500">
                  <Newspaper size={11} /> {slide.badge}
                </span>

                {isLive && (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-emerald-950/40 text-emerald-400 border border-emerald-800/30 rounded-full text-[10px] font-normal animate-pulse">
                    <Radio size={9} /> Live Feed
                  </span>
                )}
              </div>

              <div className="inline-flex items-center gap-1 text-[10px] font-normal text-slate-400 bg-white/5 backdrop-blur-md px-2.5 py-0.5 rounded-full border border-white/5">
                <MapPin size={10} className="text-red-400" />
                <span>Koforidua, Accra Station</span>
              </div>
            </div>

            {/* Middle Row: Title & Description */}
            <div className="relative z-10 space-y-2 my-2 max-w-2xl">
              <h1 className="text-xl sm:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-400 tracking-tight leading-tight transition-all duration-500 line-clamp-2 drop-shadow-sm">
                {slide.title}
              </h1>

              <p className="text-xs sm:text-sm text-slate-400 font-normal leading-relaxed max-w-3xl transition-all duration-500 line-clamp-2">
                {slide.description}
              </p>
            </div>

            {/* Bottom Row: Actions & Minimal Indicator Dots */}
            <div className="relative z-10 pt-2.5 flex flex-wrap items-center justify-between gap-3 border-t border-slate-800/60">
              <div className="flex items-center gap-2.5">
                <Link
                  href="/products"
                  className="px-3.5 py-1.5 bg-red-600 hover:bg-red-700 text-white font-medium text-xs rounded-xl shadow-xs transition-all flex items-center gap-1.5 active:scale-95"
                >
                  <span>Explore Products</span>
                  <ArrowRight size={13} />
                </Link>

                <a
                  href={slide.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/5 hover:bg-white/10 text-slate-300 rounded-xl border border-white/10 text-xs font-normal transition"
                >
                  <span>Official Apple Press</span>
                  <ExternalLink size={12} className="text-slate-400" />
                </a>
              </div>

              {/* Minimalist Carousel Progress Dots */}
              <div className="flex items-center gap-1.5">
                {newsSlides.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentSlide(idx)}
                    className={`h-1 rounded-full transition-all duration-300 cursor-pointer ${currentSlide === idx ? 'w-5 bg-red-500' : 'w-1 bg-white/20 hover:bg-white/50'
                      }`}
                    aria-label={`Go to slide ${idx + 1}`}
                  />
                ))}
              </div>
            </div>

            {/* Left & Right Slide Navigation Arrow Buttons */}
            <button
              onClick={() => setCurrentSlide((prev) => (prev === 0 ? newsSlides.length - 1 : prev - 1))}
              className="absolute left-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 p-1.5 bg-slate-900/80 hover:bg-slate-900 text-slate-300 rounded-full transition-all text-xs z-20 border border-slate-700/60 active:scale-90 cursor-pointer"
              aria-label="Previous News Article"
            >
              <ChevronLeft size={15} />
            </button>
            <button
              onClick={() => setCurrentSlide((prev) => (prev + 1) % newsSlides.length)}
              className="absolute right-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 p-1.5 bg-slate-900/80 hover:bg-slate-900 text-slate-300 rounded-full transition-all text-xs z-20 border border-slate-700/60 active:scale-90 cursor-pointer"
              aria-label="Next News Article"
            >
              <ChevronRight size={15} />
            </button>

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