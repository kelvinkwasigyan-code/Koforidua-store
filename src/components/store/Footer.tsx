import Link from 'next/link';
import { ShieldCheck, Truck, Clock, Headphones, Award, MapPin, Phone, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 pt-16 pb-12 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4">
        
        {/* Top Trust Badges Strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pb-12 border-b border-gray-800">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-red-600/10 text-red-500 rounded-xl">
              <Truck size={24} />
            </div>
            <div>
              <h4 className="font-semibold text-white text-sm">Nationwide Delivery</h4>
              <p className="text-xs text-gray-400">Fast delivery across Ghana</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-3 bg-red-600/10 text-red-500 rounded-xl">
              <ShieldCheck size={24} />
            </div>
            <div>
              <h4 className="font-semibold text-white text-sm">100% Authentic</h4>
              <p className="text-xs text-gray-400">Original devices & accessories</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-3 bg-red-600/10 text-red-500 rounded-xl">
              <Award size={24} />
            </div>
            <div>
              <h4 className="font-semibold text-white text-sm">Registered Vendor</h4>
              <p className="text-xs text-gray-400">Verified online merchant (Jumia)</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-3 bg-red-600/10 text-red-500 rounded-xl">
              <Headphones size={24} />
            </div>
            <div>
              <h4 className="font-semibold text-white text-sm">24/7 Support</h4>
              <p className="text-xs text-gray-400">Call / WhatsApp: 0547654736</p>
            </div>
          </div>
        </div>

        {/* Main Footer Links Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 py-12 border-b border-gray-800">
          
          {/* About Column */}
          <div>
            <h3 className="font-bold text-lg text-white mb-4">Joe Rich Phones</h3>
            <p className="text-xs text-gray-400 leading-relaxed mb-4">
              Your trusted destination for premium smartphones, luxury watches, original accessories, and expert tech solutions. Delivering quality straight to your doorstep across Ghana.
            </p>
            <div className="inline-flex items-center gap-1.5 text-xs text-white bg-red-600 px-3 py-1.5 rounded-full font-bold shadow-sm">
              <Award size={14} />
              <span>Verified Ghana Shop</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-white mb-4 text-sm uppercase tracking-wider">Quick Links</h4>
            <ul className="space-y-2 text-xs">
              <li><Link href="/" className="hover:text-red-500 transition-colors">Home</Link></li>
              <li><Link href="/#new" className="hover:text-red-500 transition-colors">New Arrivals</Link></li>
              <li><Link href="/#home-used" className="hover:text-red-500 transition-colors">Home Used Devices</Link></li>
              <li><Link href="/swap-sell" className="hover:text-red-500 transition-colors">Swap / Sell Phone</Link></li>
              <li><Link href="/track" className="hover:text-red-500 transition-colors">Track Your Order</Link></li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="font-semibold text-white mb-4 text-sm uppercase tracking-wider">Top Categories</h4>
            <ul className="space-y-2 text-xs">
              <li><span className="text-gray-400 hover:text-white cursor-pointer">Smartphones (iPhones & Samsung)</span></li>
              <li><span className="text-gray-400 hover:text-white cursor-pointer">Tablets & iPads</span></li>
              <li><span className="text-gray-400 hover:text-white cursor-pointer">Luxury & Smart Watches</span></li>
              <li><span className="text-gray-400 hover:text-white cursor-pointer">Chargers & Covers</span></li>
              <li><span className="text-gray-400 hover:text-white cursor-pointer">Fragrance & Scalp Care</span></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-semibold text-white mb-4 text-sm uppercase tracking-wider">Get In Touch</h4>
            <ul className="space-y-3 text-xs text-gray-400">
              <li className="flex items-start gap-2">
                <MapPin size={16} className="text-red-500 shrink-0 mt-0.5" />
                <span>Koforidua, Eastern Region, Ghana</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone size={16} className="text-red-500 shrink-0" />
                <span>0547654736</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail size={16} className="text-red-500 shrink-0" />
                <span>support@joerichstore.com</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Copyright Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-500 gap-4">
          <p>© {new Date().getFullYear()} Joe Rich Phones & Accessories. All rights reserved.</p>
          <p>Powered by Next.js & Tailwind CSS</p>
        </div>

      </div>
    </footer>
  );
}
