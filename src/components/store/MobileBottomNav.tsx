'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import { getWishlist } from '@/lib/wishlist';
import { Home, Grid, Heart, ShoppingBag, Package } from 'lucide-react';

export default function MobileBottomNav() {
  const pathname = usePathname();
  const { cart, openCart } = useCart();
  const [wishlistCount, setWishlistCount] = useState(0);

  const totalCartItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  useEffect(() => {
    setWishlistCount(getWishlist().length);
    const handleWishlist = () => setWishlistCount(getWishlist().length);
    window.addEventListener('wishlistUpdated', handleWishlist);
    return () => window.removeEventListener('wishlistUpdated', handleWishlist);
  }, []);

  // Hide on admin routes
  if (pathname?.startsWith('/admin')) {
    return null;
  }

  const navItems = [
    { label: 'Home', href: '/', icon: Home },
    { label: 'Shop', href: '/products', icon: Grid },
    { label: 'Wishlist', href: '/wishlist', icon: Heart, badge: wishlistCount },
  ];

  return (
    <div className="md:hidden fixed bottom-3 left-4 right-4 z-40 bg-white/75 dark:bg-slate-900/75 backdrop-blur-3xl border border-white/80 dark:border-white/10 shadow-[0_12px_40px_rgba(0,0,0,0.15)] rounded-3xl px-3 py-2 flex items-center justify-around">
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = pathname === item.href;
        return (
          <Link
            key={item.label}
            href={item.href}
            className={`flex flex-col items-center gap-0.5 py-1 px-3 rounded-2xl transition-all relative ${
              isActive 
                ? 'text-red-600 font-extrabold scale-105 bg-red-500/10' 
                : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white font-medium'
            }`}
          >
            <div className="relative">
              <Icon size={20} className={isActive ? 'stroke-[2.5px] text-red-600' : 'stroke-2'} />
              {Boolean(item.badge && item.badge > 0) && (
                <span className="absolute -top-1.5 -right-2 bg-gradient-to-r from-red-600 to-rose-600 text-white text-[9px] font-black w-4 h-4 rounded-full flex items-center justify-center shadow-xs">
                  {item.badge}
                </span>
              )}
            </div>
            <span className="text-[10px] tracking-tight">{item.label}</span>
          </Link>
        );
      })}

      {/* Cart Quick Button */}
      <button
        onClick={openCart}
        className="flex flex-col items-center gap-0.5 py-1 px-3 rounded-2xl transition-all relative text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white font-medium active:scale-95"
      >
        <div className="relative">
          <ShoppingBag size={20} className="stroke-2" />
          {totalCartItems > 0 && (
            <span className="absolute -top-1.5 -right-2 bg-gradient-to-r from-red-600 to-rose-600 text-white text-[9px] font-black w-4 h-4 rounded-full flex items-center justify-center shadow-xs">
              {totalCartItems}
            </span>
          )}
        </div>
        <span className="text-[10px] tracking-tight">Cart</span>
      </button>
    </div>
  );
}
