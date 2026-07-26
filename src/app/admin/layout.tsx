'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Smartphone, Tag, ShoppingBag, Settings, Store, LogOut, Menu, X } from 'lucide-react';

interface AdminLayoutProps {
    children: React.ReactNode;
}

const navItems = [
    { label: 'Dashboard', href: '/admin', icon: LayoutDashboard },
    { label: 'Products', href: '/admin/products', icon: Smartphone },
    { label: 'Categories', href: '/admin/categories', icon: Tag },
    { label: 'Orders', href: '/admin/orders', icon: ShoppingBag },
    { label: 'Settings', href: '/admin/settings', icon: Settings },
];

export default function AdminLayout({ children }: AdminLayoutProps) {
    const pathname = usePathname();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    return (
        <div className="min-h-screen bg-slate-100 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col md:flex-row relative overflow-hidden font-sans">

            {/* Apple Ambient Glass Light Spheres */}
            <div className="fixed -top-32 -left-32 w-96 h-96 bg-red-500/15 dark:bg-red-600/20 rounded-full blur-[120px] pointer-events-none z-0 animate-pulse" />
            <div className="fixed top-1/3 -right-32 w-96 h-96 bg-indigo-500/15 dark:bg-indigo-600/20 rounded-full blur-[120px] pointer-events-none z-0" />
            <div className="fixed -bottom-32 left-1/3 w-96 h-96 bg-rose-500/15 dark:bg-rose-600/20 rounded-full blur-[120px] pointer-events-none z-0" />

            {/* Mobile Top Navigation Glass Bar */}
            <header className="md:hidden sticky top-0 z-40 flex items-center justify-between px-4 py-3 bg-white/70 dark:bg-slate-900/70 backdrop-blur-2xl border-b border-white/50 dark:border-white/10 shadow-sm">
                <Link href="/admin" className="font-[family-name:var(--font-outfit)] font-black text-lg text-gray-900 dark:text-white tracking-tight flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-600 shadow-sm shadow-red-500" />
                    <span>Joerich Admin</span>
                </Link>
                <button
                    onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                    className="p-2 rounded-2xl bg-white/60 dark:bg-slate-800/60 border border-white/60 dark:border-white/10 text-gray-700 dark:text-gray-200 transition active:scale-95"
                    aria-label="Toggle Navigation"
                >
                    {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
                </button>
            </header>

            {/* Mobile Overlay Backdrop */}
            {isSidebarOpen && (
                <div
                    onClick={() => setIsSidebarOpen(false)}
                    className="fixed inset-0 z-40 bg-black/30 backdrop-blur-md md:hidden transition-all"
                />
            )}

            {/* Apple Glass Sidebar Navigation */}
            <aside
                className={`fixed md:sticky top-0 left-0 z-50 h-screen w-64 bg-white/60 dark:bg-slate-900/60 backdrop-blur-3xl border-r border-white/60 dark:border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.04)] flex flex-col justify-between p-5 transition-transform duration-300 md:translate-x-0 ${
                    isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
                }`}
            >
                <div>
                    {/* Brand Heading */}
                    <div className="hidden md:flex items-center gap-2.5 pb-6 border-b border-gray-200/60 dark:border-gray-800/60">
                        <div className="w-3 h-3 rounded-full bg-red-600 shadow-md shadow-red-500/50" />
                        <h1 className="font-[family-name:var(--font-outfit)] font-black text-xl tracking-tight text-gray-900 dark:text-white">
                            Joerich <span className="text-red-600 font-bold text-xs uppercase bg-red-50 dark:bg-red-950/50 px-2 py-0.5 rounded-md border border-red-200/60 dark:border-red-900/60">Admin</span>
                        </h1>
                    </div>

                    {/* Navigation Items */}
                    <nav className="mt-6 space-y-1.5">
                        {navItems.map((item) => {
                            const isActive = pathname === item.href;
                            const IconComponent = item.icon;
                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    onClick={() => setIsSidebarOpen(false)}
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
                        onClick={() => {
                            localStorage.removeItem('joerich_user');
                            localStorage.removeItem('admin_session');
                            window.location.href = '/';
                        }}
                        className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-bold text-gray-500 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-white/60 dark:hover:bg-slate-800/60 rounded-xl transition border border-transparent hover:border-white/40"
                    >
                        <LogOut size={14} />
                        <span>Sign Out</span>
                    </button>
                </div>
            </aside>

            {/* Main Admin Content Canvas with Frosted Glass Container */}
            <main className="flex-1 p-4 sm:p-8 max-w-7xl mx-auto w-full overflow-y-auto relative z-10">
                {children}
            </main>

        </div>
    );
}
