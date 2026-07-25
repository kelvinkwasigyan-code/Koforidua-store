'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { User, Search, ShoppingBag, Phone, Zap, Menu } from 'lucide-react';
import MobileMenu from './MobileMenu';

export default function Header() {
  const { cartCount, openCart } = useCart();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 flex flex-col">
      {/* Top Banner - Brand Theme & Glassy */}
      <div className="bg-red-600/90 backdrop-blur-md text-white text-xs py-2 px-4 flex items-center justify-between border-b border-red-500/50">
        <div className="max-w-7xl mx-auto w-full flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5 opacity-90">
              {/* Apple Icon */}
              <svg className="w-3.5 h-3.5 fill-black drop-shadow-sm" viewBox="0 0 384 512">
                <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 24 184.5 15.6 245.9c-15.6 102.5 45.4 207 98.4 207 26.6 0 46.1-15.6 77.2-15.6 30 0 45.9 15.6 77.2 15.6 42.6 0 78.4-44.1 98.4-87.9-53.7-21.7-87.1-66.7-88.1-122zM218.4 97.4c26.1-33 13.9-66.2 12.2-70.4-33.1 3.5-62.5 23.3-76.7 51.5-12.7 24.5-9.3 60.1 14.6 65.6 2.2 45.3 47.9 31.9 49.9 28.3z" />
              </svg>
              {/* Android Icon */}
              <svg className="w-4 h-4 fill-green-400 drop-shadow-sm" viewBox="0 0 576 512">
                <path d="M420.55,301.93a24,24,0,1,1,24-24,24,24,0,0,1-24,24m-265.1,0a24,24,0,1,1,24-24,24,24,0,0,1-24,24m273.7-144.48,47.94-83a10,10,0,1,0-17.27-10h0l-48.54,84.07a301.25,301.25,0,0,0-246.56,0L116.18,64.45a10,10,0,1,0-17.27,10h0l48,83.24C64.06,204.62,9.39,285,1.5,373.11h573c-7.9-88.13-62.57-168.49-145.35-215.66" />
              </svg>
            </div>
            <span className="font-semibold tracking-wide">Premium Apple/Android Devices & Original Accessories</span>
          </div>
          <div className="hidden sm:flex items-center gap-4 font-medium opacity-90">
            <a href="tel:0547654736" className="flex items-center gap-1.5 hover:text-white transition-colors">
              <Phone size={12} />
              <span>054 765 4736</span>
            </a>
            <span className="w-px h-3 bg-red-400"></span>
            <Link href="/support" className="hover:text-white transition-colors">Help Center</Link>
          </div>
        </div>
      </div>

      {/* Main Header area - Glassmorphism */}
      <div className="bg-white/80 backdrop-blur-xl border-b border-gray-200/50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:py-5 flex items-center gap-4 sm:gap-6 justify-between">
          
          {/* Mobile Hamburger Menu Toggle */}
          <button 
            onClick={() => setIsMenuOpen(true)}
            className="p-2 lg:hidden text-gray-700 hover:text-black hover:bg-gray-100 rounded-full transition-colors"
            aria-label="Open mobile menu"
          >
            <Menu size={22} />
          </button>

          {/* Logo */}
          <Link href="/" className="flex flex-col shrink-0 group">
            <h1 className="font-black text-2xl sm:text-3xl tracking-tighter">
              <span className="text-gray-900 group-hover:text-gray-700 transition-colors">JOE</span>
              <span className="text-red-600">RICH</span>
            </h1>
            <span className="text-[9px] sm:text-[10px] text-gray-500 font-bold tracking-[0.2em] uppercase mt-0.5">
              Phones & Accessories
            </span>
          </Link>

          {/* Search Bar - Center */}
          <div className="hidden md:flex flex-1 max-w-2xl mx-8 relative group">
            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
              <Search size={18} className="text-gray-400 group-focus-within:text-red-500 transition-colors" />
            </div>
            <input 
              type="text" 
              placeholder="Search for smartphones, watches, cases..." 
              className="w-full bg-gray-100/80 hover:bg-gray-100 focus:bg-white text-sm text-gray-900 rounded-full pl-12 pr-6 py-3.5 border border-transparent focus:border-red-500 focus:ring-4 focus:ring-red-500/10 transition-all outline-none"
            />
            <button className="absolute inset-y-1.5 right-1.5 bg-red-600 hover:bg-red-700 text-white text-xs font-bold px-5 rounded-full shadow-sm transition-colors">
              Search
            </button>
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-2 sm:gap-4 shrink-0">
            <Link 
              href="/admin" 
              className="flex items-center gap-2 p-2 sm:px-4 sm:py-2.5 rounded-full hover:bg-gray-100 text-gray-700 transition-colors"
            >
              <User size={20} strokeWidth={2} />
              <span className="text-sm font-semibold hidden lg:block">Account</span>
            </Link>
            
            <button 
              onClick={openCart} 
              className="flex items-center gap-2 p-2 sm:px-4 sm:py-2.5 rounded-full bg-red-50 hover:bg-red-100 text-red-600 transition-colors relative"
            >
              <ShoppingBag size={20} strokeWidth={2} />
              <span className="text-sm font-bold hidden sm:block">Cart</span>
              
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 sm:-top-1 sm:-right-1 bg-red-600 text-white text-[10px] font-extrabold w-5 h-5 flex items-center justify-center rounded-full shadow-sm border-2 border-white">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Secondary Navigation (Links) */}
        <nav className="hidden lg:flex items-center justify-center gap-8 py-3 text-sm font-bold text-gray-600 border-t border-gray-100">
          {[
            { name: 'Home', href: '/' },
            { name: 'New Arrivals', href: '/#new' },
            { name: 'Home Used', href: '/#home-used' },
            { name: 'Swap / Sell', href: '/swap-sell' },
            { name: 'Track Order', href: '/track' },
          ].map((link) => (
            <Link 
              key={link.name} 
              href={link.href} 
              className="hover:text-red-600 transition-colors"
            >
              {link.name}
            </Link>
          ))}
        </nav>
      </div>

      {/* Mobile Drawer */}
      <MobileMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </header>
  );
}
