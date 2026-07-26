'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ShoppingBag, Package, DollarSign, Clock, ArrowRight, Sparkles, Tag, CheckCircle2, Image as ImageIcon } from 'lucide-react';

interface RecentOrder {
  id: string;
  customerName: string;
  customerPhone: string;
  totalAmount: number;
  status: string;
  paymentMethod: string;
  createdAt: string;
}

interface RecentProduct {
  id: string;
  name: string;
  price: number;
  stockQuantity: number;
  condition: string;
  images: string[];
  category: { name: string };
  createdAt: string;
}

interface StatsData {
  totalSales: number;
  totalProducts: number;
  pendingOrders: number;
  recentOrders: RecentOrder[];
  recentProducts: RecentProduct[];
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
    <div className="space-y-8 font-sans">
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

      {/* Frosted Liquid Glass Metrics Cards Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        
        {/* Total Sales Revenue */}
        <div className="bg-white/60 dark:bg-slate-900/60 backdrop-blur-2xl border border-white/80 dark:border-white/10 p-6 sm:p-7 rounded-3xl shadow-[0_8px_32px_rgba(0,0,0,0.04)] relative overflow-hidden group hover:shadow-xl hover:border-emerald-500/40 transition-all duration-300">
          <div className="absolute top-0 right-0 w-36 h-36 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none group-hover:scale-150 transition-all duration-500" />
          <div className="flex items-center justify-between relative z-10">
            <div className="space-y-1">
              <span className="text-[11px] font-black text-gray-400 uppercase tracking-wider block">Total Sales Revenue</span>
              <p className="text-3xl sm:text-4xl font-black text-gray-900 dark:text-white mt-1 tracking-tight">
                {loading ? '...' : `GH₵ ${stats?.totalSales.toLocaleString() || '0'}`}
              </p>
              <span className="text-[11px] font-bold text-gray-500 dark:text-gray-400 block pt-0.5">Total shop earnings</span>
            </div>
            <div className="w-13 h-13 rounded-2xl bg-emerald-500/10 dark:bg-emerald-500/20 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0 shadow-inner">
              <DollarSign className="w-6 h-6" />
            </div>
          </div>
        </div>

        {/* Total Products */}
        <div className="bg-white/60 dark:bg-slate-900/60 backdrop-blur-2xl border border-white/80 dark:border-white/10 p-6 sm:p-7 rounded-3xl shadow-[0_8px_32px_rgba(0,0,0,0.04)] relative overflow-hidden group hover:shadow-xl hover:border-blue-500/40 transition-all duration-300">
          <div className="absolute top-0 right-0 w-36 h-36 bg-blue-500/10 rounded-full blur-2xl pointer-events-none group-hover:scale-150 transition-all duration-500" />
          <div className="flex items-center justify-between relative z-10">
            <div className="space-y-1">
              <span className="text-[11px] font-black text-gray-400 uppercase tracking-wider block">Total Products</span>
              <p className="text-3xl sm:text-4xl font-black text-gray-900 dark:text-white mt-1 tracking-tight">
                {loading ? '...' : stats?.totalProducts || 0}
              </p>
              <span className="text-[11px] font-bold text-gray-500 dark:text-gray-400 block pt-0.5">Active items catalog</span>
            </div>
            <div className="w-13 h-13 rounded-2xl bg-blue-500/10 dark:bg-blue-500/20 border border-blue-500/20 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0 shadow-inner">
              <ShoppingBag className="w-6 h-6" />
            </div>
          </div>
        </div>

        {/* Pending Orders */}
        <div className="bg-white/60 dark:bg-slate-900/60 backdrop-blur-2xl border border-white/80 dark:border-white/10 p-6 sm:p-7 rounded-3xl shadow-[0_8px_32px_rgba(0,0,0,0.04)] relative overflow-hidden group hover:shadow-xl hover:border-rose-500/40 transition-all duration-300">
          <div className="absolute top-0 right-0 w-36 h-36 bg-rose-500/10 rounded-full blur-2xl pointer-events-none group-hover:scale-150 transition-all duration-500" />
          <div className="flex items-center justify-between relative z-10">
            <div className="space-y-1">
              <span className="text-[11px] font-black text-gray-400 uppercase tracking-wider block">Pending Orders</span>
              <p className="text-3xl sm:text-4xl font-black text-rose-600 dark:text-rose-400 mt-1 tracking-tight">
                {loading ? '...' : stats?.pendingOrders || 0}
              </p>
              <span className="text-[11px] font-bold text-gray-500 dark:text-gray-400 block pt-0.5">Orders awaiting dispatch</span>
            </div>
            <div className="w-13 h-13 rounded-2xl bg-rose-500/10 dark:bg-rose-500/20 border border-rose-500/20 text-rose-600 dark:text-rose-400 flex items-center justify-center shrink-0 shadow-inner">
              <Clock className="w-6 h-6" />
            </div>
          </div>
        </div>
      </div>

      {/* Grid Layout: Recently Added Products & Recent Orders */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Recently Added Items Section */}
        <div className="bg-white/60 dark:bg-slate-900/60 backdrop-blur-2xl border border-white/80 dark:border-white/10 rounded-3xl overflow-hidden shadow-[0_8px_32px_rgba(0,0,0,0.04)] p-6 sm:p-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-extrabold text-gray-900 dark:text-white flex items-center gap-2">
                <Package size={20} className="text-red-600" />
                <span>Recently Added Items</span>
              </h2>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">Latest inventory added to Joerich Phones.</p>
            </div>
            <Link
              href="/admin/products"
              className="px-3.5 py-1.5 bg-white/80 dark:bg-slate-800/80 hover:bg-white text-xs font-bold text-red-600 dark:text-red-400 rounded-xl border border-white/60 dark:border-white/10 flex items-center gap-1.5 transition shadow-2xs active:scale-95"
            >
              <span>Manage Products</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {loading ? (
            <div className="py-12 text-center text-sm font-semibold text-gray-400">Loading products...</div>
          ) : !stats?.recentProducts || stats.recentProducts.length === 0 ? (
            <div className="py-12 text-center text-sm font-semibold text-gray-400">No inventory products uploaded yet.</div>
          ) : (
            <div className="space-y-3">
              {stats.recentProducts.map((prod) => (
                <div
                  key={prod.id}
                  className="flex items-center justify-between p-3.5 rounded-2xl bg-white/80 dark:bg-slate-800/50 border border-gray-100 dark:border-slate-800 hover:border-red-500/30 transition duration-200"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-gray-100 dark:bg-slate-800 p-1 flex items-center justify-center shrink-0 border border-gray-200/60 dark:border-slate-700/60">
                      {prod.images && prod.images[0] ? (
                        <img src={prod.images[0]} alt={prod.name} className="w-full h-full object-contain mix-blend-multiply" />
                      ) : (
                        <ImageIcon className="text-gray-400 w-5 h-5" />
                      )}
                    </div>
                    <div>
                      <h4 className="font-extrabold text-sm text-gray-900 dark:text-white leading-tight">
                        {prod.name}
                      </h4>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-[10px] font-bold text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-slate-800 px-2 py-0.5 rounded-md border border-gray-200/50 dark:border-slate-700/50">
                          {prod.category?.name || 'Smartphones'}
                        </span>
                        <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-md border ${
                          prod.condition === 'USED' 
                            ? 'bg-amber-500/10 text-amber-600 border-amber-500/20' 
                            : 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20'
                        }`}>
                          {prod.condition === 'USED' ? 'Home Used' : 'Brand New'}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="text-right shrink-0">
                    <span className="font-black text-sm text-gray-900 dark:text-white block">
                      GH₵ {Number(prod.price).toLocaleString()}
                    </span>
                    <span className={`text-[10px] font-bold ${prod.stockQuantity > 0 ? 'text-emerald-600' : 'text-red-500'}`}>
                      {prod.stockQuantity > 0 ? 'In Stock' : 'Out of Stock'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Recent Orders Glass Table Section */}
        <div className="bg-white/60 dark:bg-slate-900/60 backdrop-blur-2xl border border-white/80 dark:border-white/10 rounded-3xl overflow-hidden shadow-[0_8px_32px_rgba(0,0,0,0.04)] p-6 sm:p-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-extrabold text-gray-900 dark:text-white flex items-center gap-2">
                <ShoppingBag size={20} className="text-red-600" />
                <span>Recent Orders</span>
              </h2>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">Latest customer transactions placed through the store.</p>
            </div>
            <Link
              href="/admin/orders"
              className="px-3.5 py-1.5 bg-white/80 dark:bg-slate-800/80 hover:bg-white text-xs font-bold text-red-600 dark:text-red-400 rounded-xl border border-white/60 dark:border-white/10 flex items-center gap-1.5 transition shadow-2xs active:scale-95"
            >
              <span>View All Orders</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {loading ? (
            <div className="py-12 text-center text-sm font-semibold text-gray-400">Loading orders...</div>
          ) : !stats?.recentOrders || stats.recentOrders.length === 0 ? (
            <div className="py-12 text-center text-sm font-semibold text-gray-400">No orders placed yet.</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-medium text-gray-600 dark:text-gray-300">
                <thead className="bg-gray-100/50 dark:bg-slate-800/50 text-[11px] uppercase font-bold tracking-wider text-gray-400 border-b border-gray-100 dark:border-gray-800">
                  <tr>
                    <th className="py-4 px-3">Order ID</th>
                    <th className="py-4 px-3">Customer</th>
                    <th className="py-4 px-3">Amount</th>
                    <th className="py-4 px-3">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-slate-800/60">
                  {stats.recentOrders.map((order) => (
                    <tr key={order.id} className="hover:bg-white/60 dark:hover:bg-slate-800/40 transition">
                      <td className="py-3.5 px-3 font-mono text-xs font-semibold text-gray-900 dark:text-white">
                        {order.id.substring(0, 8)}...
                      </td>
                      <td className="py-3.5 px-3">
                        <div className="font-semibold text-gray-900 dark:text-white">{order.customerName}</div>
                        <div className="text-[11px] text-gray-400 font-normal">{order.customerPhone}</div>
                      </td>
                      <td className="py-3.5 px-3 font-bold text-gray-900 dark:text-white text-sm">
                        GH₵ {Number(order.totalAmount).toLocaleString()}
                      </td>
                      <td className="py-3.5 px-3">
                        <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold ${getStatusColor(order.status)}`}>
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
    </div>
  );
}
