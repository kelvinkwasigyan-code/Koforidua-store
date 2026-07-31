'use client';

import React from 'react';

export default function TopBar() {
  return (
    <div className="bg-gradient-to-r from-red-600 via-rose-600 to-red-600 text-white text-xs sm:text-sm py-1 px-2 sm:px-4 flex justify-between items-center font-sans shadow-xs">
      <div className="flex items-center gap-2">
        <svg className="w-3.5 h-3.5 fill-white drop-shadow-sm" viewBox="0 0 384 512">
          <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 24 184.5 15.6 245.9c-15.6 102.5 45.4 207 98.4 207 26.6 0 46.1-15.6 77.2-15.6 30 0 45.9 15.6 77.2 15.6 42.6 0 78.4-44.1 98.4-87.9-53.7-21.7-87.1-66.7-88.1-122zM218.4 97.4c26.1-33 13.9-66.2 12.2-70.4-33.1 3.5-62.5 23.3-76.7 51.5-12.7 24.5-9.3 60.1 14.6 65.6 2.2 45.3 47.9 31.9 49.9 28.3z" />
        </svg>
        <span className="font-bold tracking-wide text-white/95 text-[11px] sm:text-xs">
          Devices & Accessories
        </span>
      </div>

      <a 
        href="https://wa.me/233547654736" 
        target="_blank" 
        rel="noopener noreferrer"
        className="px-3 py-1 bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold rounded-full border border-emerald-400/40 shadow-xs transition-all flex items-center gap-1.5 text-xs hover:scale-105 active:scale-95"
      >
        <svg className="w-3.5 h-3.5 fill-white" viewBox="0 0 448 512">
          <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7 .9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z" />
        </svg>
        <span>Contact on WhatsApp</span>
      </a>
    </div>
  );
}
