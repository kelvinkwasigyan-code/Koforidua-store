'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Footer() {
  const pathname = usePathname();

  if (pathname?.startsWith('/admin')) {
    return null;
  }

  return (
    <footer className="bg-gray-900 text-gray-300 pt-8 pb-28 md:py-8 px-4 mt-16 font-sans border-t border-gray-800">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center text-center md:text-left gap-5 sm:gap-4 text-sm">
        <div className="space-y-1">
          <p className="font-extrabold text-white text-base tracking-tight">Joerich Phones</p>
          <p className="text-gray-400 text-xs">Quality devices and accessories delivered to you across Ghana.</p>
        </div>
        
        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-xs font-medium">
          <Link href="/terms" className="hover:text-white transition-colors">Terms & Conditions</Link>
          <span className="hidden sm:inline text-gray-700">•</span>
          <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
          <span className="hidden sm:inline text-gray-700">•</span>
          <Link href="/returns" className="hover:text-white transition-colors">Returns & Warranty</Link>
        </div>

        <div>
          <p className="text-gray-500 text-xs font-medium">&copy; {new Date().getFullYear()} Joerich Phones. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
