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
      {/* Store Background Hero Showcase Banner */}
      <div className="relative rounded-3xl overflow-hidden border border-white/20 dark:border-white/10 shadow-xl shadow-slate-900/10 min-h-[160px] sm:min-h-[200px] flex items-end p-6 sm:p-8 group">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-700 group-hover:scale-105"
          style={{ backgroundImage: "url('/store-background.jpg')" }}
        />
        {/* Gradient Overlay for Text Readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent" />

        <div className="relative z-10 space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-red-600/80 backdrop-blur-md text-white rounded-full text-[10px] font-black uppercase tracking-wider shadow-md">
            <Sparkles size={13} /> Joerich Phones & Accessories Official Console
          </div>
          <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight leading-snug">
            Admin Dashboard Overview
          </h1>
          <p className="text-xs sm:text-sm text-gray-200 font-medium max-w-xl">
            Manage store inventory, track live customer orders, configure WhatsApp routing, and analyze business performance.
          </p>
        </div>
      </div>

      {/* High-Visibility Metrics Cards Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        
        {/* Total Sales Revenue */}
        <div className="bg-[#0F172A] border-2 border-emerald-500/30 p-6 sm:p-7 rounded-3xl shadow-xl relative overflow-hidden group hover:border-emerald-500/60 transition-all duration-300">
          <div className="absolute top-0 right-0 w-36 h-36 bg-emerald-500/15 rounded-full blur-2xl pointer-events-none group-hover:scale-150 transition-all duration-500" />
          <div className="flex items-center justify-between relative z-10">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-[11px] font-black uppercase tracking-wider">
                <DollarSign size={13} /> Sales Revenue
              </div>
              <p className="text-3xl sm:text-4xl font-black text-white mt-1 tracking-tight">
                {loading ? '...' : `GH₵ ${stats?.totalSales.toLocaleString() || '0'}`}
              </p>
              <span className="text-[11px] font-bold text-slate-400 block pt-0.5">Total completed shop sales</span>
            </div>
            <div className="w-14 h-14 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center shrink-0 shadow-lg shadow-emerald-500/10">
              <DollarSign className="w-7 h-7" />
            </div>
          </div>
        </div>

        {/* Total Products */}
        <div className="bg-[#0F172A] border-2 border-sky-500/30 p-6 sm:p-7 rounded-3xl shadow-xl relative overflow-hidden group hover:border-sky-500/60 transition-all duration-300">
          <div className="absolute top-0 right-0 w-36 h-36 bg-sky-500/15 rounded-full blur-2xl pointer-events-none group-hover:scale-150 transition-all duration-500" />
          <div className="flex items-center justify-between relative z-10">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-sky-500/15 border border-sky-500/30 text-sky-400 text-[11px] font-black uppercase tracking-wider">
                <ShoppingBag size={13} /> Active Inventory
              </div>
              <p className="text-3xl sm:text-4xl font-black text-white mt-1 tracking-tight">
                {loading ? '...' : stats?.totalProducts || 0}
              </p>
              <span className="text-[11px] font-bold text-slate-400 block pt-0.5">Total items in catalog</span>
            </div>
            <div className="w-14 h-14 rounded-2xl bg-sky-500/20 border border-sky-500/40 text-sky-400 flex items-center justify-center shrink-0 shadow-lg shadow-sky-500/10">
              <ShoppingBag className="w-7 h-7" />
            </div>
          </div>
        </div>

        {/* Pending Orders */}
        <div className="bg-[#0F172A] border-2 border-rose-500/40 p-6 sm:p-7 rounded-3xl shadow-xl relative overflow-hidden group hover:border-rose-500/70 transition-all duration-300">
          <div className="absolute top-0 right-0 w-36 h-36 bg-rose-500/20 rounded-full blur-2xl pointer-events-none group-hover:scale-150 transition-all duration-500" />
          <div className="flex items-center justify-between relative z-10">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-rose-500/20 border border-rose-500/40 text-rose-400 text-[11px] font-black uppercase tracking-wider">
                <Clock size={13} className="animate-spin-slow" /> Action Needed
              </div>
              <p className="text-3xl sm:text-4xl font-black text-rose-400 mt-1 tracking-tight">
                {loading ? '...' : stats?.pendingOrders || 0}
              </p>
              <span className="text-[11px] font-bold text-rose-300/80 block pt-0.5">Orders awaiting dispatch</span>
            </div>
            <div className="w-14 h-14 rounded-2xl bg-rose-500/25 border border-rose-500/50 text-rose-400 flex items-center justify-center shrink-0 shadow-lg shadow-rose-500/20">
              <Clock className="w-7 h-7" />
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
