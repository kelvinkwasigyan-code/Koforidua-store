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
    { label: 'Track', href: '/track', icon: Package },
  ];

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-xl border-t border-gray-200/80 shadow-lg px-3 py-2 flex items-center justify-around">
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = pathname === item.href;
        return (
          <Link
            key={item.label}
            href={item.href}
            className={`flex flex-col items-center gap-0.5 py-1 px-3 rounded-xl transition-all relative ${
              isActive ? 'text-red-600 font-bold scale-105' : 'text-gray-500 hover:text-gray-900 font-medium'
            }`}
          >
            <div className="relative">
              <Icon size={20} className={isActive ? 'stroke-[2.5px]' : 'stroke-2'} />
              {Boolean(item.badge && item.badge > 0) && (
                <span className="absolute -top-1.5 -right-2 bg-red-600 text-white text-[9px] font-black w-4 h-4 rounded-full flex items-center justify-center border border-white">
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
        className="flex flex-col items-center gap-0.5 py-1 px-3 rounded-xl transition-all relative text-gray-500 hover:text-gray-900 font-medium active:scale-95"
      >
        <div className="relative">
          <ShoppingBag size={20} className="stroke-2" />
          {totalCartItems > 0 && (
            <span className="absolute -top-1.5 -right-2 bg-red-600 text-white text-[9px] font-black w-4 h-4 rounded-full flex items-center justify-center border border-white">
              {totalCartItems}
            </span>
          )}
        </div>
        <span className="text-[10px] tracking-tight">Cart</span>
      </button>
    </div>
  );
}
