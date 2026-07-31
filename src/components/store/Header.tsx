'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import { getWishlist } from '@/lib/wishlist';
import { ShoppingCart, User, Menu, RefreshCw, Heart, Search } from 'lucide-react';
import MobileMenu from './MobileMenu';
import TopBar from './TopBar';

export const navLinks = [
    { name: 'Dashboard', href: '/' },
    { name: 'New Arrivals', href: '/new-arrivals' },
    { name: 'Home Used', href: '/home-used' },
    { name: 'Store Location', href: '/store-location' },
];

export default function Header() {
    const pathname = usePathname();
    const router = useRouter();
    const { cart, openCart } = useCart();
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [wishlistCount, setWishlistCount] = useState(0);
    const [searchQuery, setSearchQuery] = useState('');
    const [user, setUser] = useState<any>(null);

    useEffect(() => {
        setWishlistCount(getWishlist().length);
        const handleWishlist = () => setWishlistCount(getWishlist().length);
        window.addEventListener('wishlistUpdated', handleWishlist);
        
        // Dynamically fetch user from supabase
        import('@/utils/supabase/client').then(({ createClient }) => {
            const supabase = createClient();
            supabase.auth.getUser().then(({ data }) => setUser(data?.user || null));
        });

        return () => window.removeEventListener('wishlistUpdated', handleWishlist);
    }, []);

    if (pathname?.startsWith('/admin')) {
        return null;
    }

    return (
        <>
            <header className="sticky top-0 z-40 bg-white/70 dark:bg-slate-900/70 backdrop-blur-3xl border-b border-white/60 dark:border-white/10 shadow-[0_4px_30px_rgba(0,0,0,0.03)]">
                {/* Top Announcement Bar / TopBar */}
                <TopBar />

                {/* Main Navigation Bar */}
                <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-4">

                    {/* Left: Hamburger Button & Official Joerich Brand */}
                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => setIsMenuOpen(true)}
                            className="p-2 text-gray-700 dark:text-gray-200 hover:text-red-600 rounded-xl hover:bg-white/60 dark:hover:bg-slate-800/60 transition-colors"
                            title="Open Menu"
                        >
                            <Menu size={24} />
                        </button>

                        <Link href="/" className="flex items-center gap-2.5 group shrink-0">
                            <Image
                                src="/logo.jpg"
                                alt="Joe Rich Phones Logo"
                                width={40}
                                height={40}
                                priority
                                sizes="40px"
                                className="object-contain rounded-xl shadow-xs"
                            />
                            <div className="font-[family-name:var(--font-outfit)] text-xl sm:text-3xl flex items-center gap-1.5 sm:gap-2">
                                <span className="font-black tracking-tighter bg-gradient-to-r from-gray-950 via-red-600 to-red-500 bg-clip-text text-transparent">
                                    Joerich
                                </span>
                                <div className="flex flex-col items-center justify-center leading-none">
                                    <span className="font-bold tracking-[0.18em] text-red-600 text-xs sm:text-sm uppercase bg-red-50/90 dark:bg-red-950/50 px-2 py-0.5 rounded-md border border-red-200/80 dark:border-red-900/80 shadow-2xs">
                                        PHONES
                                    </span>
                                    <span className="text-[9px] sm:text-[10px] font-extrabold tracking-wider text-gray-500 dark:text-gray-400 mt-1 uppercase whitespace-nowrap">
                                        & Accessories
                                    </span>
                                </div>
                            </div>
                        </Link>
                    </div>

                    {/* Search Bar */}
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            if (searchQuery.trim()) {
                                router.push(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
                            }
                        }}
                        className="flex-1 max-w-md hidden md:flex items-center relative"
                    >
                        <Search className="absolute left-3.5 text-gray-400" size={18} />
                        <input
                            type="text"
                            placeholder="Search smartphones, watches, accessories..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full bg-white/60 dark:bg-slate-800/60 backdrop-blur-xl border border-white/80 dark:border-white/10 rounded-full py-2.5 pl-10 pr-4 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-red-500/80 transition-all shadow-inner"
                        />
                    </form>

                    {/* Quick Actions & Profile/Cart Links */}
                    <div className="flex items-center gap-2 sm:gap-3 text-sm font-medium">
                        <Link
                            href="/swap-sell"
                            className="flex items-center gap-1 bg-white/40 dark:bg-slate-900/40 backdrop-blur-xl text-red-600 dark:text-red-400 px-2.5 sm:px-3.5 py-1.5 rounded-full text-[11px] sm:text-xs font-bold border border-red-500/30 dark:border-red-500/20 shadow-2xs hover:bg-white/60 dark:hover:bg-slate-900/60 transition-all duration-300 active:scale-95 shrink-0"
                        >
                            <RefreshCw size={13} />
                            <span>Swap / Sell</span>
                        </Link>



                        <button
                            onClick={openCart}
                            className="relative p-2 text-gray-700 hover:text-red-600 transition-colors rounded-full hover:bg-gray-100 flex items-center"
                            title="View Cart"
                        >
                            <ShoppingCart size={22} />
                            {totalItems > 0 && (
                                <span className="absolute -top-1 -right-1 bg-red-600 text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-white">
                                    {totalItems}
                                </span>
                            )}
                        </button>
                    </div>
                </div>

                {/* Mobile Navigation Tab Bar (Home, New Arrivals, Home Used, All Products) */}
                <div className="md:hidden flex items-center justify-between px-3 py-2 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-t border-gray-100 dark:border-slate-800 overflow-x-auto scrollbar-none shadow-2xs w-full">
                    <nav className="flex items-center gap-2 whitespace-nowrap text-xs w-full">
                        <div className="flex items-center gap-2">
                            {navLinks.filter(link => link.name !== 'Store Location').map((link) => {
                                const isActive = pathname === link.href;
                                return (
                                    <Link
                                        key={link.name}
                                        href={link.href}
                                        className={`px-3.5 py-1.5 rounded-full font-extrabold transition-all duration-200 ${isActive
                                            ? 'bg-red-600 text-white shadow-xs'
                                            : 'bg-gray-100 dark:bg-slate-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200'
                                            }`}
                                    >
                                        {link.name}
                                    </Link>
                                );
                            })}

                        </div>
                    </nav>
                </div>

                {/* Secondary Desktop Navigation */}
                <div className="hidden md:flex justify-center max-w-7xl mx-auto px-4 pb-3 items-center gap-8 text-sm font-bold text-gray-700">
                    {navLinks.map((link) => (
                        <Link key={link.name} href={link.href} className="hover:text-red-600 transition-colors">
                            {link.name}
                        </Link>
                    ))}
                </div>
            </header>

            {/* Slide-out Mobile Menu Drawer */}
            <MobileMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
        </>
    );
}
