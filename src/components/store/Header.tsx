'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '@/context/CartContext';
import { ShoppingCart, User, Search, Menu, PhoneCall, RefreshCw } from 'lucide-react';
import MobileMenu from './MobileMenu';

export const navLinks = [
  { name: 'Home', href: '/' },
  { name: 'New Arrivals', href: '/new-arrivals' },
  { name: 'Home Used', href: '/home-used' },
  { name: 'Track Order', href: '/track' },
];

export default function Header() {
  const { cart } = useCart();
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-xl border-b border-gray-200/50 shadow-sm">
        {/* Top Announcement Bar */}
        <div className="bg-red-600/90 backdrop-blur-md text-white text-xs py-1.5 px-4 font-medium flex items-center justify-between">
          <div className="hidden lg:flex items-center gap-2">
            <div className="flex items-center gap-1.5">
              {/* Apple Icon */}
              <svg className="w-3.5 h-3.5 fill-black drop-shadow-sm" viewBox="0 0 384 512">
                <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 24 184.5 15.6 245.9c-15.6 102.5 45.4 207 98.4 207 26.6 0 46.1-15.6 77.2-15.6 30 0 45.9 15.6 77.2 15.6 42.6 0 78.4-44.1 98.4-87.9-53.7-21.7-87.1-66.7-88.1-122zM218.4 97.4c26.1-33 13.9-66.2 12.2-70.4-33.1 3.5-62.5 23.3-76.7 51.5-12.7 24.5-9.3 60.1 14.6 65.6 2.2 45.3 47.9 31.9 49.9 28.3z" />
              </svg>
              {/* Android Icon */}
              <svg className="w-4 h-4 fill-green-400 drop-shadow-sm" viewBox="0 0 576 512">
                <path d="M420.55,301.93a24,24,0,1,1,24-24,24,24,0,0,1-24,24m-265.1,0a24,24,0,1,1,24-24,24,24,0,0,1-24,24m273.7-144.48,47.94-83a10,10,0,1,0-17.27-10h0l-48.54,84.07a301.25,301.25,0,0,0-246.56,0L116.18,64.45a10,10,0,1,0-17.27,10h0l48,83.24C64.06,204.62,9.39,285,1.5,373.11h573c-7.9-88.13-62.57-168.49-145.35-215.66" />
              </svg>
            </div>
            <span className="font-semibold tracking-wide text-white/95">Premium Apple/Android Devices & Original Accessories</span>
          </div>

          <div className="flex items-center justify-center gap-3 w-full lg:w-auto">
            <span className="flex items-center gap-1">
              <PhoneCall size={13} /> Delivery across Ghana | 0547654736
            </span>
            <span className="hidden sm:inline bg-red-700 px-2 py-0.5 rounded-md font-bold tracking-wide">
              BUY | SELL | SWAP
            </span>
          </div>
        </div>

        {/* Main Navigation Bar */}
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
          
          {/* Left: Hamburger Button & Official Joerich Brand */}
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setIsMenuOpen(true)}
              className="p-2 text-gray-700 hover:text-red-600 rounded-lg hover:bg-gray-100 transition-colors"
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
                className="object-contain rounded-lg"
              />
              <div className="flex flex-col">
                <span className="font-black text-lg sm:text-xl text-gray-900 leading-none tracking-tight group-hover:text-red-600 transition-colors">
                  Joe Rich <span className="text-red-600">Phones</span>
                </span>
              </div>
            </Link>
          </div>

          {/* Search Bar */}
          <div className="flex-1 max-w-md hidden md:flex items-center relative">
            <Search className="absolute left-3 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search smartphones, watches, accessories..."
              className="w-full bg-gray-100 border border-gray-200 rounded-full py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-red-500 transition-all"
            />
          </div>

          {/* Quick Actions & Profile/Cart Links */}
          <div className="flex items-center gap-2 sm:gap-3 text-sm font-medium">
            <Link 
              href="/swap-sell" 
              className="hidden lg:flex items-center gap-1.5 bg-red-50 text-red-600 px-3 py-1.5 rounded-full text-xs font-bold border border-red-200 hover:bg-red-100 transition-colors"
            >
              <RefreshCw size={14} />
              <span>Swap / Sell</span>
            </Link>

            <Link 
              href="/admin" 
              className="p-2 text-gray-700 hover:text-red-600 transition-colors rounded-full hover:bg-gray-100 flex items-center"
              title="Profile / Dashboard"
            >
              <User size={20} />
            </Link>

            <Link 
              href="/cart" 
              className="relative p-2 text-gray-700 hover:text-red-600 transition-colors rounded-full hover:bg-gray-100 flex items-center"
              title="View Cart"
            >
              <ShoppingCart size={22} />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-600 text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-white">
                  {totalItems}
                </span>
              )}
            </Link>
          </div>
        </div>

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
