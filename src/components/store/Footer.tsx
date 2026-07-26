'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ShieldCheck, Truck, Headphones, MapPin, Phone, Mail } from 'lucide-react';

export default function Footer() {
  const pathname = usePathname();

  if (pathname?.startsWith('/admin')) {
    return null;
  }

  return (
    <footer className="bg-gray-900 text-gray-300 py-8 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 space-y-6">
        
        {/* Compact Trust Badges */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pb-6 border-b border-gray-800/80">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-red-600/10 text-red-500 rounded-lg">
              <Truck size={18} />
            </div>
            <div>
              <h4 className="font-bold text-white text-xs">Nationwide Delivery</h4>
              <p className="text-[11px] text-gray-400">Fast delivery across Ghana</p>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-red-600/10 text-red-500 rounded-lg">
              <ShieldCheck size={18} />
            </div>
            <div>
              <h4 className="font-bold text-white text-xs">100% Authentic</h4>
              <p className="text-[11px] text-gray-400">Original devices & accessories</p>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-red-600/10 text-red-500 rounded-lg">
              <Headphones size={18} />
            </div>
            <div>
              <h4 className="font-bold text-white text-xs">24/7 Customer Support</h4>
              <p className="text-[11px] text-gray-400">
                <a href="tel:0547654736" className="text-white font-bold hover:text-red-400 underline transition">Call: 0547654736</a>
                <span className="mx-1.5 text-gray-600">|</span>
                <a href="https://wa.me/233547654736" target="_blank" rel="noreferrer" className="text-emerald-400 font-bold hover:text-emerald-300 underline transition">WhatsApp</a>
              </p>
            </div>
          </div>
        </div>

        {/* Reorganized Compact Columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 py-2">
          {/* About */}
          <div>
            <h3 className="font-[family-name:var(--font-outfit)] text-xl text-white mb-2 tracking-tight flex items-center gap-2">
              <span className="font-black tracking-tighter text-white">Joerich</span>
              <span className="font-bold tracking-[0.18em] text-red-500 text-xs uppercase bg-red-950/40 px-2 py-0.5 rounded-md border border-red-500/30">
                PHONES
              </span>
            </h3>
            <p className="text-xs text-gray-400 leading-relaxed">
              Your trusted store in Ghana for authentic smartphones, smartwatches, and original accessories.
            </p>
          </div>

          {/* Categories */}
          <div>
            <h4 className="font-bold text-white mb-2 text-xs uppercase tracking-wider">Top Categories</h4>
            <div className="flex flex-wrap gap-x-4 gap-y-1.5 text-xs text-gray-400">
              <Link href="/products" className="hover:text-red-500 transition-colors">Smartphones</Link>
              <Link href="/products" className="hover:text-red-500 transition-colors">Tablets & iPads</Link>
              <Link href="/products" className="hover:text-red-500 transition-colors">Smart Watches</Link>
              <Link href="/products" className="hover:text-red-500 transition-colors">Speakers</Link>
              <Link href="/products" className="hover:text-red-500 transition-colors">Chargers</Link>
            </div>
          </div>

          {/* Contact Us */}
          <div>
            <h4 className="font-bold text-white mb-2 text-xs uppercase tracking-wider">Contact Us</h4>
            <div className="space-y-1.5 text-xs text-gray-400">
              <div className="flex items-start gap-2">
                <MapPin size={14} className="text-red-500 shrink-0 mt-0.5" />
                <span>Koforidua, Accra Station</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone size={14} className="text-red-500 shrink-0" />
                <a href="tel:0547654736" className="text-white hover:text-red-400 font-bold underline transition">0547654736</a>
              </div>
              <div className="flex items-center gap-2">
                <Mail size={14} className="text-red-500 shrink-0" />
                <a href="mailto:support@joerichstore.com" className="hover:text-white transition-colors">support@joerichstore.com</a>
              </div>
            </div>
          </div>
        </div>

        {/* Clean Single Copyright Line */}
        <div className="pt-4 border-t border-gray-800/80 text-center text-xs text-gray-500">
          © {new Date().getFullYear()} Joe Rich Phones & Accessories. All rights reserved.
        </div>

      </div>
    </footer>
  );
}
