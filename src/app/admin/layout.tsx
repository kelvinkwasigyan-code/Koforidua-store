'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface AdminLayoutProps {
    children: React.ReactNode;
}

const navItems = [
    { label: 'Dashboard', href: '/admin', icon: '📊' },
    { label: 'Products', href: '/admin/products', icon: '📱' },
    { label: 'Categories', href: '/admin/categories', icon: '🏷️' },
    { label: 'Orders', href: '/admin/orders', icon: '📦' },
    { label: 'Settings', href: '/admin/settings', icon: '⚙️' },
];

export default function AdminLayout({ children }: AdminLayoutProps) {
    const pathname = usePathname();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100 flex flex-col md:flex-row">

            {/* Mobile Top Navigation Header */}
            <header className="md:hidden sticky top-0 z-40 flex items-center justify-between px-4 py-3 bg-white/60 dark:bg-gray-900/60 backdrop-blur-xl border-b border-gray-200 dark:border-gray-800">
                <span className="font-extrabold text-lg text-red-600 dark:text-red-500">
                    Admin Portal
                </span>
                <button
                    onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                    className="p-2 rounded-xl bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition"
                    aria-label="Toggle Navigation"
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isSidebarOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
                    </svg>
                </button>
            </header>

            {/* Mobile Overlay Backdrop */}
            {isSidebarOpen && (
                <div
                    onClick={() => setIsSidebarOpen(false)}
                    className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm md:hidden"
                />
            )}

            {/* Sidebar Navigation */}
            <aside
                className={`fixed md:sticky top-0 left-0 z-50 h-screen w-64 bg-white/70 dark:bg-gray-900/70 backdrop-blur-2xl border-r border-gray-200 dark:border-gray-800 flex flex-col justify-between p-5 transition-transform duration-300 md:translate-x-0 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
                    }`}
            >
                <div>
                    {/* Brand Heading */}
                    <div className="hidden md:flex items-center gap-2 pb-6 border-b border-gray-200 dark:border-gray-800">
                        <div className="w-3 h-3 rounded-full bg-red-600" />
                        <h1 className="font-black text-xl tracking-tight text-gray-900 dark:text-white">
                            ERA Admin
                        </h1>
                    </div>

                    {/* Navigation Items */}
                    <nav className="mt-6 space-y-1">
                        {navItems.map((item) => {
                            const isActive = pathname === item.href;
                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    onClick={() => setIsSidebarOpen(false)}
                                    className={`flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-semibold transition-all ${isActive
                                            ? 'bg-red-600 text-white shadow-lg shadow-red-600/30'
                                            : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800/60 hover:text-gray-900 dark:hover:text-white'
                                        }`}
                                >
                                    <span className="text-base">{item.icon}</span>
                                    <span>{item.label}</span>
                                </Link>
                            );
                        })}
                    </nav>
                </div>

                {/* Store Quick Link & Exit */}
                <div className="pt-4 border-t border-gray-200 dark:border-gray-800 space-y-2">
                    <Link
                        href="/"
                        className="flex items-center gap-2 px-4 py-2.5 text-xs font-semibold text-gray-500 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-500 transition"
                    >
                        <span>↗</span> Back to Live Store
                    </Link>
                </div>
            </aside>

            {/* Main Admin Content Canvas */}
            <main className="flex-1 p-4 sm:p-8 max-w-7xl mx-auto w-full overflow-y-auto">
                {children}
            </main>

        </div>
    );
}
