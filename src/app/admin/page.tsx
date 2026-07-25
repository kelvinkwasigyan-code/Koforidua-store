'use client';

import React from 'react';

export default function AdminDashboard() {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl sm:text-3xl font-black text-gray-900 dark:text-white">
                    Dashboard Overview
                </h1>
                <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1">
                    Manage your products, track orders, and view sales stats.
                </p>
            </div>

            {/* Metrics Row */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-white/60 dark:bg-gray-900/60 backdrop-blur-xl border border-gray-200 dark:border-gray-800 p-5 rounded-3xl shadow-sm">
                    <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Total Sales</span>
                    <p className="text-2xl font-black text-gray-900 dark:text-white mt-2">GH₵ 12,450</p>
                </div>

                <div className="bg-white/60 dark:bg-gray-900/60 backdrop-blur-xl border border-gray-200 dark:border-gray-800 p-5 rounded-3xl shadow-sm">
                    <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Total Products</span>
                    <p className="text-2xl font-black text-gray-900 dark:text-white mt-2">28</p>
                </div>

                <div className="bg-white/60 dark:bg-gray-900/60 backdrop-blur-xl border border-gray-200 dark:border-gray-800 p-5 rounded-3xl shadow-sm">
                    <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Pending Orders</span>
                    <p className="text-2xl font-black text-red-600 mt-2">4</p>
                </div>
            </div>
        </div>
    );
}
