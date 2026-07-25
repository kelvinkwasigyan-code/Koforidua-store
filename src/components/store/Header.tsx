'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useCart } from '@/store/CartContext';
import ThemeToggle from '@/components/ThemeToggle';

export default function Header() {
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);
    const { openCart, cartCount } = useCart();

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setIsUserMenuOpen(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const phoneNumber = process.env.NEXT_PUBLIC_STORE_PHONE || "+233241234567";

    return (
        <header className="sticky top-0 z-50 backdrop-blur-2xl bg-white/40 border-b border-white/60 shadow-[0_4px_30px_rgba(0,0,0,0.03)] transition-all">
            {/* Top Banner - Translucent Light Red Glass */}
            <div className="backdrop-blur-md bg-red-500/85 text-white text-xs py-1.5 px-4 text-center font-medium shadow-inner flex items-center justify-between max-w-7xl mx-auto">
                <span>🚚 Delivery available across Ghana</span>
                <span>📞 Call/Order: <a href={`tel:${phoneNumber}`} className="underline font-bold">{phoneNumber}</a></span>
            </div>

            {/* Main Glass Navbar */}
            <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between gap-4">
                {/* Brand Logo */}
                <Link href="/" className="font-bold text-lg sm:text-xl text-red-600 tracking-tight shrink-0">
                    Joe Rich Phones & Accessories
                </Link>

                {/* Glass Search Input */}
                <div className="flex-1 max-w-md hidden md:block">
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Search products, brands, categories..."
                            className="w-full bg-white/40 backdrop-blur-lg text-sm pl-9 pr-4 py-2 rounded-full border border-white/80 focus:border-red-400 focus:bg-white/70 focus:outline-none transition-all placeholder:text-gray-500 shadow-inner"
                        />
                        <svg
                            className="w-4 h-4 text-red-500 absolute left-3 top-2.5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </div>
                </div>

                {/* Right Actions */}
                <div className="flex items-center space-x-3">

                    <ThemeToggle />

                    {/* Profile Dropdown */}
                    <div className="relative" ref={menuRef}>
                        <button
                            onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                            className="p-2 text-gray-700 hover:text-red-600 hover:bg-white/50 backdrop-blur-sm rounded-full transition-all border border-transparent hover:border-white/60"
                            aria-label="User Account"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                        </button>

                        {/* Glass Popover Menu */}
                        {isUserMenuOpen && (
                            <div className="absolute right-0 mt-2 w-48 backdrop-blur-2xl bg-white/70 rounded-2xl shadow-2xl border border-white/80 p-4 z-50">
                                <div className="flex flex-col space-y-3 text-center">
                                    <Link
                                        href="/login"
                                        onClick={() => setIsUserMenuOpen(false)}
                                        className="w-full bg-red-500/90 hover:bg-red-600 text-white font-semibold py-2.5 px-4 rounded-full text-sm transition shadow-md"
                                    >
                                        Log In
                                    </Link>
                                    <Link
                                        href="/register"
                                        onClick={() => setIsUserMenuOpen(false)}
                                        className="w-full text-gray-700 hover:text-red-600 font-medium text-xs transition py-1"
                                    >
                                        Create Account
                                    </Link>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Glass Cart Button */}
                    <button
                        onClick={openCart}
                        className="flex items-center space-x-2 bg-white/50 hover:bg-white/80 backdrop-blur-md text-red-700 px-3.5 py-1.5 rounded-full text-xs font-semibold transition border border-white/80 shadow-sm"
                    >
                        <span>🛒</span>
                        <span className="bg-red-500 text-white rounded-full px-2 py-0.5 text-[11px] font-bold">
                            {cartCount}
                        </span>
                    </button>

                </div>
            </div>
        </header>
    );
}
