'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import { getWishlist } from '@/lib/wishlist';
import { ShoppingCart, User, Search, Menu, RefreshCw, Heart } from 'lucide-react';
import MobileMenu from './MobileMenu';

export const navLinks = [
  { name: 'Home', href: '/' },
  { name: 'New Arrivals', href: '/new-arrivals' },
  { name: 'Home Used', href: '/home-used' },
];

export default function Header() {
  const pathname = usePathname();
  const { cart, openCart } = useCart();
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  const [wishlistCount, setWishlistCount] = useState(0);

  useEffect(() => {
    setWishlistCount(getWishlist().length);
    const handleWishlist = () => setWishlistCount(getWishlist().length);
    window.addEventListener('wishlistUpdated', handleWishlist);
    return () => window.removeEventListener('wishlistUpdated', handleWishlist);
  }, []);

  if (pathname?.startsWith('/admin')) {
    return null;
  }

  return (
    <>
      <header className="sticky top-0 z-40 bg-white/70 dark:bg-slate-900/70 backdrop-blur-3xl border-b border-white/60 dark:border-white/10 shadow-[0_4px_30px_rgba(0,0,0,0.03)]">
        {/* Top Announcement Bar */}
        <div className="bg-gradient-to-r from-red-600 via-rose-600 to-red-600 backdrop-blur-md text-white text-xs py-1.5 px-4 font-medium flex items-center justify-between shadow-xs">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5">
              <svg className="w-3.5 h-3.5 fill-white drop-shadow-sm" viewBox="0 0 384 512">
                <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 24 184.5 15.6 245.9c-15.6 102.5 45.4 207 98.4 207 26.6 0 46.1-15.6 77.2-15.6 30 0 45.9 15.6 77.2 15.6 42.6 0 78.4-44.1 98.4-87.9-53.7-21.7-87.1-66.7-88.1-122zM218.4 97.4c26.1-33 13.9-66.2 12.2-70.4-33.1 3.5-62.5 23.3-76.7 51.5-12.7 24.5-9.3 60.1 14.6 65.6 2.2 45.3 47.9 31.9 49.9 28.3z" />
              </svg>
              <svg className="w-4 h-4 fill-green-400 drop-shadow-sm" viewBox="0 0 576 512">
                <path d="M420.55,301.93a24,24,0,1,1,24-24,24,24,0,0,1-24,24m-265.1,0a24,24,0,1,1,24-24,24,24,0,0,1-24,24m273.7-144.48,47.94-83a10,10,0,1,0-17.27-10h0l-48.54,84.07a301.25,301.25,0,0,0-246.56,0L116.18,64.45a10,10,0,1,0-17.27,10h0l48,83.24C64.06,204.62,9.39,285,1.5,373.11h573c-7.9-88.13-62.57-168.49-145.35-215.66" />
              </svg>
              <span className="font-medium tracking-wide text-white/95">Premium Devices & Accessories</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <a 
              href="https://wa.me/233547654736" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:underline font-bold tracking-wide transition text-white flex items-center gap-1.5"
            >
              <svg className="w-4 h-4 fill-green-400 drop-shadow-sm" viewBox="0 0 448 512">
                <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7 .9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z" />
              </svg>
              Contact on WhatsApp
            </a>
          </div>
        </div>

        {/* Main Navigation Bar */}
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
          
          {/* Left: Hamburger Button & Official Joerich Brand */}
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setIsMenuOpen(true)}
              className="p-2 text-gray-700 dark:text-gray-200 hover:text-red-600 rounded-xl hover:bg-white/60 dark:hover:bg-slate-800/60 transition-colors"
              title="Open Menu"
            >
              <Menu size={24} />
            </button>

            <Link href="/" className="flex items-center gap-2.5 group shrink-0">
              <Image 
                src="/logo.jpg"
                alt="Joe Rich Phones Logo" 
                width={40} 
                height={40} 
                className="object-contain rounded-xl shadow-xs"
              />
              <div className="font-[family-name:var(--font-outfit)] text-2xl sm:text-3xl flex items-center gap-2">
                <span className="font-black tracking-tighter bg-gradient-to-r from-gray-950 via-red-600 to-red-500 bg-clip-text text-transparent">
                  Joerich
                </span>
                <div className="flex flex-col items-center justify-center leading-none">
                  <span className="font-bold tracking-[0.18em] text-red-600 text-xs sm:text-sm uppercase bg-red-50/90 dark:bg-red-950/50 px-2 py-0.5 rounded-md border border-red-200/80 dark:border-red-900/80 shadow-2xs">
                    PHONES
                  </span>
                  <span className="text-[9px] sm:text-[10px] font-extrabold tracking-wider text-gray-500 dark:text-gray-400 mt-1 uppercase whitespace-nowrap">
                    & Accessories
                  </span>
                </div>
              </div>
            </Link>
          </div>

          {/* Search Bar */}
          <div className="flex-1 max-w-md hidden md:flex items-center relative">
            <Search className="absolute left-3.5 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search smartphones, watches, accessories..."
              className="w-full bg-white/60 dark:bg-slate-800/60 backdrop-blur-xl border border-white/80 dark:border-white/10 rounded-full py-2.5 pl-10 pr-4 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-red-500/80 transition-all shadow-inner"
            />
          </div>

          {/* Quick Actions & Profile/Cart Links */}
          <div className="flex items-center gap-2 sm:gap-3 text-sm font-medium">
            {/* Mobile Search Icon Toggle */}
            <button
              onClick={() => setIsMobileSearchOpen(!isMobileSearchOpen)}
              className="md:hidden p-2 text-gray-700 hover:text-red-600 transition-colors rounded-full hover:bg-gray-100 flex items-center"
              title="Search"
            >
              <Search size={20} />
            </button>

            <Link 
              href="/swap-sell" 
              className="hidden lg:flex items-center gap-1.5 bg-red-50 text-red-600 px-3 py-1.5 rounded-full text-xs font-bold border border-red-200 hover:bg-red-100 transition-colors"
            >
              <RefreshCw size={14} />
              <span>Swap / Sell</span>
            </Link>

            <Link 
              href="/wishlist" 
              className="relative p-2 text-gray-700 hover:text-red-600 transition-colors rounded-full hover:bg-gray-100 flex items-center"
              title="Wishlist"
            >
              <Heart size={20} />
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-600 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center border-2 border-white">
                  {wishlistCount}
                </span>
              )}
            </Link>

            <button 
              onClick={openCart}
              className="relative p-2 text-gray-700 hover:text-red-600 transition-colors rounded-full hover:bg-gray-100 flex items-center"
              title="View Cart"
            >
              <ShoppingCart size={22} />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-600 text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-white">
                  {totalItems}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Search Bar Expansion */}
        {isMobileSearchOpen && (
          <div className="md:hidden px-4 pb-3 pt-1 border-t border-gray-100 bg-white shadow-inner">
            <div className="relative flex items-center">
              <Search className="absolute left-3 text-gray-400" size={18} />
              <input
                type="text"
                placeholder="Search smartphones, watches, accessories..."
                autoFocus
                className="w-full bg-gray-100 border border-gray-200 rounded-full py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
              />
              <button 
                onClick={() => setIsMobileSearchOpen(false)}
                className="ml-2 text-xs font-bold text-gray-500 hover:text-gray-900 px-2 py-1"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* Secondary Desktop Navigation */}
        <div className="hidden md:flex justify-center max-w-7xl mx-auto px-4 pb-3 items-center gap-8 text-sm font-bold text-gray-700">
          {navLinks.map((link) => (
            <Link key={link.name} href={link.href} className="hover:text-red-600 transition-colors">
              {link.name}
            </Link>
          ))}
        </div>
      </header>

      {/* Slide-out Mobile Menu Drawer */}
      <MobileMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </>
  );
}
