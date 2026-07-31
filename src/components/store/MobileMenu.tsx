'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useTheme } from 'next-themes';
import { X, Settings, MessageCircle, Music, Globe, Moon, Sun } from 'lucide-react';
import { navLinks } from './Header';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex">
      {/* Backdrop overlay */}
      <div
        className="fixed inset-0 bg-black/50 transition-opacity"
        onClick={onClose}
      />

      {/* Sliding Drawer Panel */}
      <div className="relative w-4/5 max-w-sm bg-white h-full shadow-2xl z-10 flex flex-col justify-between overflow-y-auto">

        {/* Top Header & Close Button */}
        <div>
          <div className="flex items-center justify-between p-4 border-b">
            <div className="font-[family-name:var(--font-outfit)] text-xl flex items-center gap-1.5">
              <span className="font-black tracking-tighter bg-gradient-to-r from-gray-950 via-red-600 to-red-500 bg-clip-text text-transparent">
                Joerich
              </span>
              <div className="flex flex-col items-center justify-center leading-none">
                <span className="font-bold tracking-[0.18em] text-red-600 text-xs uppercase bg-red-50 px-1.5 py-0.5 rounded-md border border-red-200/80">
                  PHONES
                </span>
                <span className="text-[8px] font-extrabold tracking-wider text-gray-500 dark:text-gray-400 mt-0.5 uppercase whitespace-nowrap">
                  & Accessories
                </span>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-gray-500 hover:text-black rounded-full hover:bg-gray-100 transition-colors"
            >
              <X size={22} />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="flex flex-col py-2">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={onClose}
                className="px-6 py-3.5 text-gray-800 hover:bg-red-50 hover:text-red-600 font-medium border-b border-gray-100 transition-colors"
              >
                {link.name}
              </Link>
            ))}

            <Link
              href="/swap-sell"
              onClick={onClose}
              className="mx-4 my-3 px-4 py-3 bg-red-500/10 text-red-600 dark:text-red-400 font-extrabold text-xs rounded-2xl border border-red-500/20 backdrop-blur-xl flex items-center justify-between shadow-2xs active:scale-95 transition-all"
            >
              <div className="flex items-center gap-2">
                <span className="text-sm">🔄</span>
                <span>Swap / Sell Device</span>
              </div>
              <span className="text-[9px] uppercase tracking-widest font-black px-2 py-0.5 bg-red-600 text-white rounded-md">
                Instant
              </span>
            </Link>

            <Link
              href="/wishlist"
              onClick={onClose}
              className="px-6 py-3.5 text-gray-800 dark:text-gray-200 hover:bg-red-50 hover:text-red-600 font-medium border-b border-gray-100 dark:border-slate-800 transition-colors flex items-center gap-2"
            >
              <span className="text-red-500 font-bold">❤️</span>
              <span>My Wishlist</span>
            </Link>
          </nav>
        </div>

        {/* Bottom Section: Theme & Social Media */}
        <div className="p-6 bg-gray-50 dark:bg-slate-900 border-t dark:border-slate-800">
          
          {/* Theme Toggle */}
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-bold text-gray-700 dark:text-gray-300">Appearance</span>
            {mounted && (
              <button
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                className="flex items-center gap-2 px-3 py-1.5 bg-gray-200 dark:bg-slate-800 rounded-full text-gray-700 dark:text-gray-300 transition-colors"
              >
                {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
                <span className="text-xs font-semibold">{theme === 'dark' ? 'Light Mode' : 'Dark Mode'}</span>
              </button>
            )}
          </div>

          {/* Social Media Links Row */}
          <div className="flex items-center justify-around text-gray-600 pt-2 border-t border-gray-200">
            <a href="https://wa.me/233547654736" target="_blank" rel="noreferrer" className="p-2 hover:text-green-600 transition-colors" title="WhatsApp">
              <MessageCircle size={20} />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer" className="p-2 hover:text-pink-600 transition-colors" title="Instagram">
              <svg className="w-5 h-5 fill-none stroke-current stroke-2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
              </svg>
            </a>
            <a href="https://tiktok.com" target="_blank" rel="noreferrer" className="p-2 hover:text-black transition-colors" title="TikTok">
              <Music size={20} />
            </a>
            <a href="https://facebook.com" target="_blank" rel="noreferrer" className="p-2 hover:text-blue-600 transition-colors" title="Facebook">
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
            </a>
          </div>
        </div>

      </div>
    </div>
  );
}
