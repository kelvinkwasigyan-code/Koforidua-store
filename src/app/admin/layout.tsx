'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Smartphone, Tag, ShoppingBag, Settings, Store, LogOut, Menu, X } from 'lucide-react';

interface AdminLayoutProps {
    children: React.ReactNode;
}

const mainNavItems = [
    { label: 'Dashboard', href: '/admin', icon: LayoutDashboard },
    { label: 'Products', href: '/admin/products', icon: Smartphone },
    { label: 'Categories', href: '/admin/categories', icon: Tag },
    { label: 'Orders', href: '/admin/orders', icon: ShoppingBag },
];

const allNavItems = [
    ...mainNavItems,
    { label: 'Settings', href: '/admin/settings', icon: Settings },
];

export default function AdminLayout({ children }: AdminLayoutProps) {
    const pathname = usePathname();
    const [isRightMenuOpen, setIsRightMenuOpen] = useState(false);

    // Bypass admin sidebar layout for login route
    if (pathname === '/admin/login') {
        return <>{children}</>;
    }

    const handleSignOut = () => {
        localStorage.removeItem('joerich_user');
        localStorage.removeItem('admin_session');
        window.location.href = '/admin/login';
    };

    return (
        <div 
            className="min-h-screen bg-slate-900 text-slate-900 dark:text-slate-100 flex flex-col md:flex-row relative overflow-hidden font-sans bg-cover bg-center bg-no-repeat bg-fixed"
            style={{ backgroundImage: "url('/store-background.jpg')" }}
        >
            {/* Ultra-Light Transparent Overlay for Maximum Image Clarity */}
            <div className="absolute inset-0 bg-black/15 pointer-events-none z-0" />

            {/* Apple Ambient Glass Light Spheres */}
            <div className="fixed -top-32 -left-32 w-96 h-96 bg-red-500/15 dark:bg-red-600/20 rounded-full blur-[120px] pointer-events-none z-0 animate-pulse" />
            <div className="fixed top-1/3 -right-32 w-96 h-96 bg-indigo-500/15 dark:bg-indigo-600/20 rounded-full blur-[120px] pointer-events-none z-0" />
            <div className="fixed -bottom-32 left-1/3 w-96 h-96 bg-rose-500/15 dark:bg-rose-600/20 rounded-full blur-[120px] pointer-events-none z-0" />

            {/* Mobile Header Bar */}
            <header className="md:hidden sticky top-0 z-40 flex items-center justify-between px-4 py-3 bg-white/80 dark:bg-slate-900/80 backdrop-blur-2xl border-b border-gray-200/80 dark:border-white/10 shadow-xs">
                <Link href="/admin" className="font-[family-name:var(--font-outfit)] font-black text-xs sm:text-base text-gray-900 dark:text-white tracking-tight flex items-center gap-2 truncate">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-600 shadow-sm shadow-red-500 shrink-0" />
                    <span className="truncate">Joerich Phones & Accessories</span>
                </Link>
                
                {/* Menu Toggle Button (Triggers Right Side Drawer) */}
                <button
                    onClick={() => setIsRightMenuOpen(!isRightMenuOpen)}
                    className="p-2 rounded-2xl bg-gray-100 dark:bg-slate-800 border border-gray-200 dark:border-white/10 text-gray-800 dark:text-gray-200 transition active:scale-95 flex items-center gap-1.5 text-xs font-bold"
                    aria-label="Open Right Menu"
                >
                    <Menu size={18} />
                    <span className="text-[11px]">Menu</span>
                </button>
            </header>

            {/* Mobile Page Navigation Tab Bar (Dashboard, Products, Categories, Orders) */}
            <div className="md:hidden sticky top-[53px] z-30 bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl border-b border-gray-200/60 dark:border-slate-800 px-3 py-2 overflow-x-auto scrollbar-none shadow-xs">
                <nav className="flex items-center gap-2 whitespace-nowrap min-w-max">
                    {mainNavItems.map((item) => {
                        const isActive = pathname === item.href;
                        const IconComponent = item.icon;
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-extrabold transition-all duration-200 ${
                                    isActive
                                        ? 'bg-gradient-to-r from-red-600 to-rose-600 text-white shadow-md shadow-red-600/25 scale-[1.02]'
                                        : 'bg-gray-100/80 dark:bg-slate-800/80 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-slate-700 border border-gray-200/60 dark:border-slate-700/60'
                                }`}
                            >
                                <IconComponent size={15} className={isActive ? 'text-white' : 'text-gray-500 dark:text-gray-400'} />
                                <span>{item.label}</span>
                            </Link>
                        );
                    })}
                </nav>
            </div>

            {/* Mobile Right-Side Slide-Over Menu Backdrop */}
            {isRightMenuOpen && (
                <div
                    onClick={() => setIsRightMenuOpen(false)}
                    className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm md:hidden transition-all duration-300"
                />
            )}

            {/* Mobile Right-Side Slide-Over Drawer Menu */}
            <div
                className={`fixed top-0 right-0 z-50 h-screen w-72 bg-white/95 dark:bg-slate-900/95 backdrop-blur-3xl border-l border-gray-200 dark:border-white/10 shadow-2xl flex flex-col justify-between p-6 transition-transform duration-300 ease-in-out md:hidden ${
                    isRightMenuOpen ? 'translate-x-0' : 'translate-x-full'
                }`}
            >
                <div className="space-y-6">
                    {/* Header */}
                    <div className="flex items-center justify-between pb-4 border-b border-gray-200/80 dark:border-slate-800">
                        <div className="flex items-center gap-2">
                            <span className="w-2.5 h-2.5 rounded-full bg-red-600 shadow-sm" />
                            <h3 className="font-extrabold text-sm text-gray-900 dark:text-white uppercase tracking-wider">
                                Admin Menu
                            </h3>
                        </div>
                        <button
                            onClick={() => setIsRightMenuOpen(false)}
                            className="p-1.5 rounded-xl bg-gray-100 dark:bg-slate-800 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition"
                        >
                            <X size={18} />
                        </button>
                    </div>

                    {/* Quick Settings Link */}
                    <div className="space-y-2">
                        <span className="text-[10px] font-black uppercase tracking-wider text-gray-400 block px-1">
                            Control Panel
                        </span>
                        <Link
                            href="/admin/settings"
                            onClick={() => setIsRightMenuOpen(false)}
                            className={`flex items-center gap-3 px-4 py-3 rounded-2xl text-xs font-extrabold transition-all duration-200 ${
                                pathname === '/admin/settings'
                                    ? 'bg-gradient-to-r from-red-600 to-rose-600 text-white shadow-md'
                                    : 'bg-gray-100/80 dark:bg-slate-800/80 text-gray-800 dark:text-gray-200 hover:bg-gray-200 border border-gray-200/60 dark:border-slate-700/60'
                            }`}
                        >
                            <Settings size={18} className={pathname === '/admin/settings' ? 'text-white' : 'text-gray-500'} />
                            <span>Settings & Security</span>
                        </Link>
                    </div>
                </div>

                {/* Return to Live Store & Sign Out Action Section */}
                <div className="pt-6 border-t border-gray-200/80 dark:border-slate-800 space-y-3">
                    <Link
                        href="/"
                        onClick={() => setIsRightMenuOpen(false)}
                        className="flex items-center justify-center gap-2.5 px-4 py-3.5 text-xs font-extrabold text-white bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 rounded-2xl transition shadow-lg shadow-red-600/25 active:scale-95 border border-white/20"
                    >
                        <Store size={18} />
                        <span>Return to Live Store</span>
                    </Link>

                    <button
                        onClick={handleSignOut}
                        className="w-full flex items-center justify-center gap-2 px-4.5 py-3 text-xs font-extrabold text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950/40 hover:bg-red-100 dark:hover:bg-red-900/50 rounded-2xl transition border border-red-200 dark:border-red-900/50 active:scale-95"
                    >
                        <LogOut size={16} />
                        <span>Sign Out</span>
                    </button>
                </div>
            </div>

            {/* Desktop Apple Glass Sidebar Navigation */}
            <aside className="hidden md:flex sticky top-0 left-0 z-50 h-screen w-64 bg-white/60 dark:bg-slate-900/60 backdrop-blur-3xl border-r border-white/60 dark:border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.04)] flex-col justify-between p-5 shrink-0">
                <div>
                    {/* Brand Heading */}
                    <div className="flex items-center gap-2.5 pb-6 border-b border-gray-200/60 dark:border-gray-800/60">
                        <div className="w-3 h-3 rounded-full bg-red-600 shadow-md shadow-red-500/50" />
                        <h1 className="font-[family-name:var(--font-outfit)] font-black text-lg tracking-tight text-gray-900 dark:text-white">
                            Welcome, <span className="text-red-600 font-extrabold">Joel Arhin</span>
                        </h1>
                    </div>

                    {/* Navigation Items */}
                    <nav className="mt-6 space-y-1.5">
                        {allNavItems.map((item) => {
                            const isActive = pathname === item.href;
                            const IconComponent = item.icon;
                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className={`flex items-center gap-3 px-4 py-3 rounded-2xl text-xs font-extrabold transition-all duration-200 ${
                                        isActive
                                            ? 'bg-gradient-to-r from-red-600 to-rose-600 text-white shadow-lg shadow-red-600/30 scale-[1.02]'
                                            : 'text-gray-600 dark:text-gray-400 hover:bg-white/80 dark:hover:bg-slate-800/80 hover:text-gray-900 dark:hover:text-white border border-transparent hover:border-white/60 dark:hover:border-white/10'
                                    }`}
                                >
                                    <IconComponent size={18} className={isActive ? 'text-white' : 'text-gray-400 group-hover:text-gray-900'} />
                                    <span>{item.label}</span>
                                </Link>
                            );
                        })}
                    </nav>
                </div>

                {/* Store Quick Link & Sign Out */}
                <div className="pt-4 border-t border-gray-200/60 dark:border-gray-800/60 space-y-2">
                    <Link
                        href="/"
                        className="flex items-center justify-center gap-2 px-4 py-3 text-xs font-extrabold text-white bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 rounded-2xl transition shadow-lg shadow-red-600/25 active:scale-95 border border-white/20"
                    >
                        <Store size={16} />
                        <span>Return to Live Store</span>
                    </Link>
                    <button
                        onClick={handleSignOut}
                        className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-bold text-gray-500 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-white/60 dark:hover:bg-slate-800/60 rounded-xl transition border border-transparent hover:border-white/40"
                    >
                        <LogOut size={14} />
                        <span>Sign Out</span>
                    </button>
                </div>
            </aside>

            {/* Main Admin Content Canvas */}
            <main className="flex-1 p-4 sm:p-8 max-w-7xl mx-auto w-full overflow-y-auto relative z-10">
                {children}
            </main>

        </div>
    );
}
