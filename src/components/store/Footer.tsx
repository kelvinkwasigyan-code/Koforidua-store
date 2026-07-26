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
    <footer className="bg-gray-900 text-gray-300 pt-8 pb-28 md:py-10 px-4 mt-16 font-sans border-t border-gray-800">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Main Footer Row */}
        <div className="flex flex-col md:flex-row justify-between items-center text-center md:text-left gap-5 sm:gap-4 text-sm pb-6 border-b border-gray-800/80">
          <div className="space-y-1">
            <p className="font-extrabold text-white text-lg tracking-tight">Joerich Phones & Accessories</p>
            <p className="text-gray-400 text-xs">Quality authentic devices and accessories delivered across Ghana.</p>
          </div>
          
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-xs font-semibold">
            <Link href="/terms" className="hover:text-white transition-colors">Terms & Conditions</Link>
            <span className="hidden sm:inline text-gray-700">•</span>
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <span className="hidden sm:inline text-gray-700">•</span>
            <Link href="/returns" className="hover:text-white transition-colors">Returns & Warranty</Link>
          </div>
        </div>

        {/* Social Media Connect Section */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-1">
          <div className="flex items-center gap-2">
            <span className="text-xs font-extrabold text-gray-400 uppercase tracking-wider">Connect With Us:</span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-xs font-bold">
            {/* WhatsApp */}
            <a 
              href="https://wa.me/233547654736" 
              target="_blank" 
              rel="noopener noreferrer"
              className="px-3 py-1.5 rounded-full bg-emerald-600/20 hover:bg-emerald-600 text-emerald-400 hover:text-white border border-emerald-500/30 transition-all duration-200"
            >
              WhatsApp
            </a>

            {/* Instagram */}
            <a 
              href="https://instagram.com/joerichphones" 
              target="_blank" 
              rel="noopener noreferrer"
              className="px-3 py-1.5 rounded-full bg-pink-600/20 hover:bg-pink-600 text-pink-400 hover:text-white border border-pink-500/30 transition-all duration-200"
            >
              Instagram
            </a>

            {/* TikTok */}
            <a 
              href="https://tiktok.com/@joelarhin" 
              target="_blank" 
              rel="noopener noreferrer"
              className="px-3 py-1.5 rounded-full bg-cyan-600/20 hover:bg-cyan-500 text-cyan-300 hover:text-white border border-cyan-400/30 transition-all duration-200"
            >
              TikTok
            </a>

            {/* YouTube */}
            <a 
              href="https://youtube.com/@OfficialJoerich" 
              target="_blank" 
              rel="noopener noreferrer"
              className="px-3 py-1.5 rounded-full bg-red-600/20 hover:bg-red-600 text-red-400 hover:text-white border border-red-500/30 transition-all duration-200"
            >
              YouTube
            </a>

            {/* Spotify */}
            <a 
              href="https://open.spotify.com/artist/6qoQGthgDcW7vjvphhya0P?si=1Ikq7Or6RG-xAmI-T4VC1w" 
              target="_blank" 
              rel="noopener noreferrer"
              className="px-3 py-1.5 rounded-full bg-emerald-950 hover:bg-emerald-900 text-emerald-400 border border-emerald-500/40 transition-all duration-200"
            >
              Spotify
            </a>
          </div>

          <p className="text-gray-500 text-xs font-medium">
            &copy; {new Date().getFullYear()} Joerich Phones & Accessories. All rights reserved.
          </p>
        </div>

      </div>
    </footer>
  );
}
