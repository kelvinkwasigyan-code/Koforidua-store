'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { ShoppingBag, Package, DollarSign, Clock, ArrowRight } from 'lucide-react';

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
      case 'PENDING': return 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-400';
      case 'PROCESSING': return 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-400';
      case 'DISPATCHED': return 'bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-400';
      case 'DELIVERED': return 'bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl sm:text-3xl font-black text-gray-900 dark:text-white">
          Dashboard Overview
        </h1>
        <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1">
          Manage your products, track customer orders, and view live sales metrics.
        </p>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <div className="bg-white/70 dark:bg-gray-900/70 backdrop-blur-xl border border-gray-200 dark:border-gray-800 p-6 rounded-3xl shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Total Sales Revenue</span>
            <p className="text-2xl font-black text-gray-900 dark:text-white mt-1">
              {loading ? '...' : `GH₵ ${stats?.totalSales.toLocaleString() || '0'}`}
            </p>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-green-100 dark:bg-green-900/40 text-green-600 flex items-center justify-center">
            <DollarSign className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white/70 dark:bg-gray-900/70 backdrop-blur-xl border border-gray-200 dark:border-gray-800 p-6 rounded-3xl shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Total Products</span>
            <p className="text-2xl font-black text-gray-900 dark:text-white mt-1">
              {loading ? '...' : stats?.totalProducts || 0}
            </p>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-blue-100 dark:bg-blue-900/40 text-blue-600 flex items-center justify-center">
            <ShoppingBag className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white/70 dark:bg-gray-900/70 backdrop-blur-xl border border-gray-200 dark:border-gray-800 p-6 rounded-3xl shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Pending Orders</span>
            <p className="text-2xl font-black text-red-600 mt-1">
              {loading ? '...' : stats?.pendingOrders || 0}
            </p>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-red-100 dark:bg-red-900/40 text-red-600 flex items-center justify-center">
            <Clock className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Recent Orders Section */}
      <div className="bg-white/70 dark:bg-gray-900/70 backdrop-blur-xl border border-gray-200 dark:border-gray-800 rounded-3xl overflow-hidden shadow-sm p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-lg font-bold text-gray-900 dark:text-white">Recent Orders</h2>
            <p className="text-xs text-gray-500">Latest customer transactions placed through the store.</p>
          </div>
          <Link
            href="/admin/orders"
            className="text-xs font-bold text-red-600 hover:text-red-700 flex items-center gap-1 transition"
          >
            <span>View All Orders</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {loading ? (
          <div className="py-8 text-center text-sm text-gray-500">Loading metrics...</div>
        ) : !stats?.recentOrders || stats.recentOrders.length === 0 ? (
          <div className="py-8 text-center text-sm text-gray-400">No orders placed yet.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-gray-600 dark:text-gray-300">
              <thead className="bg-gray-100/50 dark:bg-gray-800/50 text-xs uppercase font-extrabold text-gray-500 border-b border-gray-200 dark:border-gray-800">
                <tr>
                  <th className="py-3 px-4">Order ID</th>
                  <th className="py-3 px-4">Customer</th>
                  <th className="py-3 px-4">Method</th>
                  <th className="py-3 px-4">Amount</th>
                  <th className="py-3 px-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
                {stats.recentOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50/50 dark:hover:bg-gray-800/30 transition">
                    <td className="py-3.5 px-4 font-mono text-xs font-bold text-gray-900 dark:text-white">
                      {order.id.substring(0, 8)}...
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="font-semibold text-gray-900 dark:text-white">{order.customerName}</div>
                      <div className="text-xs text-gray-400">{order.customerPhone}</div>
                    </td>
                    <td className="py-3.5 px-4 font-medium text-xs">
                      {order.paymentMethod}
                    </td>
                    <td className="py-3.5 px-4 font-bold text-gray-900 dark:text-white">
                      GH₵ {Number(order.totalAmount).toLocaleString()}
                    </td>
                    <td className="py-3.5 px-4">
                      <span className={`px-2.5 py-1 rounded-lg text-xs font-bold ${getStatusColor(order.status)}`}>
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
