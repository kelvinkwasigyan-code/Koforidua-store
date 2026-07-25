import Link from 'next/link';
import { ShieldCheck, Truck, Headphones, MapPin, Phone, Mail } from 'lucide-react';

export default function Footer() {
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
              <p className="text-[11px] text-gray-400">Call / WhatsApp: 0547654736</p>
            </div>
          </div>
        </div>

        {/* Reorganized Compact Columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 py-2">
          {/* About */}
          <div>
            <h3 className="font-bold text-base text-white mb-2">Joe Rich Phones</h3>
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
                <span>0547654736</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail size={14} className="text-red-500 shrink-0" />
                <span>support@joerichstore.com</span>
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
