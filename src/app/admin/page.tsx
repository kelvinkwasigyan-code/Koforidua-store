'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { ShoppingBag, Package, DollarSign, Clock, ArrowRight, TrendingUp, Sparkles } from 'lucide-react';

interface RecentOrder {
  id: string;
  customerName: string;
  customerPhone: string;
  totalAmount: number;
  status: string;
  paymentMethod: string;
  createdAt: string;
}

interface StatsData {
  totalSales: number;
  totalProducts: number;
  pendingOrders: number;
  recentOrders: RecentOrder[];
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<StatsData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      try {
        const res = await fetch('/api/admin/stats');
        const data = await res.json();
        if (res.ok) {
          setStats(data);
        }
      } catch (err) {
        console.error('Failed to load admin stats:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchStats();
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'PENDING': return 'bg-amber-500/10 text-amber-600 border border-amber-500/20';
      case 'PROCESSING': return 'bg-blue-500/10 text-blue-600 border border-blue-500/20';
      case 'DISPATCHED': return 'bg-purple-500/10 text-purple-600 border border-purple-500/20';
      case 'DELIVERED': return 'bg-emerald-500/10 text-emerald-600 border border-emerald-500/20';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-red-500/10 border border-red-500/20 rounded-full text-[11px] font-semibold text-red-600 uppercase tracking-wider mb-2">
            <Sparkles size={13} /> Joel Arhin's Console
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white tracking-tight">
            Dashboard Overview
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1">
            Manage your store inventory, track customer orders, and analyze live store metrics.
          </p>
        </div>
      </div>

      {/* Metrics Row - Frosted Glass Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {/* Sales Revenue */}
        <div className="bg-white/60 dark:bg-slate-900/60 backdrop-blur-2xl border border-white/80 dark:border-white/10 p-6 rounded-3xl shadow-[0_8px_32px_rgba(0,0,0,0.04)] relative overflow-hidden group hover:shadow-xl transition-all duration-300">
          <div className="absolute -top-12 -right-12 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none group-hover:scale-150 transition-all duration-500" />
          <div className="flex items-center justify-between relative z-10">
            <div>
              <span className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider">Total Sales Revenue</span>
              <p className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mt-1.5 tracking-tight">
                {loading ? '...' : `GH₵ ${stats?.totalSales.toLocaleString() || '0'}`}
              </p>
            </div>
            <div className="w-13 h-13 rounded-2xl bg-emerald-500/10 dark:bg-emerald-500/20 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0 shadow-inner">
              <DollarSign className="w-6 h-6" />
            </div>
          </div>
        </div>

        {/* Total Products */}
        <div className="bg-white/60 dark:bg-slate-900/60 backdrop-blur-2xl border border-white/80 dark:border-white/10 p-6 rounded-3xl shadow-[0_8px_32px_rgba(0,0,0,0.04)] relative overflow-hidden group hover:shadow-xl transition-all duration-300">
          <div className="absolute -top-12 -right-12 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl pointer-events-none group-hover:scale-150 transition-all duration-500" />
          <div className="flex items-center justify-between relative z-10">
            <div>
              <span className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider">Total Products</span>
              <p className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mt-1.5 tracking-tight">
                {loading ? '...' : stats?.totalProducts || 0}
              </p>
            </div>
            <div className="w-13 h-13 rounded-2xl bg-blue-500/10 dark:bg-blue-500/20 border border-blue-500/20 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0 shadow-inner">
              <ShoppingBag className="w-6 h-6" />
            </div>
          </div>
        </div>

        {/* Pending Orders */}
        <div className="bg-white/60 dark:bg-slate-900/60 backdrop-blur-2xl border border-white/80 dark:border-white/10 p-6 rounded-3xl shadow-[0_8px_32px_rgba(0,0,0,0.04)] relative overflow-hidden group hover:shadow-xl transition-all duration-300">
          <div className="absolute -top-12 -right-12 w-32 h-32 bg-red-500/10 rounded-full blur-2xl pointer-events-none group-hover:scale-150 transition-all duration-500" />
          <div className="flex items-center justify-between relative z-10">
            <div>
              <span className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider">Pending Orders</span>
              <p className="text-2xl sm:text-3xl font-bold text-red-600 dark:text-red-500 mt-1.5 tracking-tight">
                {loading ? '...' : stats?.pendingOrders || 0}
              </p>
            </div>
            <div className="w-13 h-13 rounded-2xl bg-red-500/10 dark:bg-red-500/20 border border-red-500/20 text-red-600 dark:text-red-400 flex items-center justify-center shrink-0 shadow-inner">
              <Clock className="w-6 h-6" />
            </div>
          </div>
        </div>
      </div>

      {/* Recent Orders Glass Table Section */}
      <div className="bg-white/60 dark:bg-slate-900/60 backdrop-blur-2xl border border-white/80 dark:border-white/10 rounded-3xl overflow-hidden shadow-[0_8px_32px_rgba(0,0,0,0.04)] p-6 sm:p-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Recent Orders</h2>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">Latest customer transactions placed through the store.</p>
          </div>
          <Link
            href="/admin/orders"
            className="px-4 py-2 bg-white/80 dark:bg-slate-800/80 hover:bg-white text-xs font-semibold text-red-600 dark:text-red-400 rounded-xl border border-white/60 dark:border-white/10 flex items-center gap-1.5 transition shadow-xs active:scale-95"
          >
            <span>View All Orders</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {loading ? (
          <div className="py-12 text-center text-sm font-semibold text-gray-400">Loading metrics...</div>
        ) : !stats?.recentOrders || stats.recentOrders.length === 0 ? (
          <div className="py-12 text-center text-sm font-semibold text-gray-400">No orders placed yet.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-medium text-gray-600 dark:text-gray-300">
              <thead className="bg-gray-100/50 dark:bg-slate-800/50 text-[11px] uppercase font-bold tracking-wider text-gray-400 border-b border-gray-100 dark:border-gray-800">
                <tr>
                  <th className="py-4 px-4">Order ID</th>
                  <th className="py-4 px-4">Customer</th>
                  <th className="py-4 px-4">Method</th>
                  <th className="py-4 px-4">Amount</th>
                  <th className="py-4 px-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-slate-800/60">
                {stats.recentOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-white/60 dark:hover:bg-slate-800/40 transition">
                    <td className="py-4 px-4 font-mono text-xs font-semibold text-gray-900 dark:text-white">
                      {order.id.substring(0, 8)}...
                    </td>
                    <td className="py-4 px-4">
                      <div className="font-semibold text-gray-900 dark:text-white">{order.customerName}</div>
                      <div className="text-[11px] text-gray-400 font-normal">{order.customerPhone}</div>
                    </td>
                    <td className="py-4 px-4 font-semibold text-xs">
                      {order.paymentMethod}
                    </td>
                    <td className="py-4 px-4 font-bold text-gray-900 dark:text-white text-sm">
                      GH₵ {Number(order.totalAmount).toLocaleString()}
                    </td>
                    <td className="py-4 px-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(order.status)}`}>
                        {order.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
