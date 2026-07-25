'use client';

import React, { useState, useEffect } from 'react';
import { Package, Clock, CheckCircle2, MapPin, Phone, User, Calendar, CreditCard, ChevronDown } from 'lucide-react';
import Image from 'next/image';

interface OrderItem {
  id: string;
  quantity: number;
  price: string;
  product: {
    name: string;
    images: string[];
  };
}

interface Order {
  id: string;
  customerName: string;
  customerPhone: string;
  customerEmail: string | null;
  region: string;
  city: string;
  address: string | null;
  totalAmount: string;
  status: string;
  paymentMethod: string;
  paymentStatus: string;
  orderItems: OrderItem[];
  createdAt: string;
}

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  useEffect(() => {
    fetchOrders();
  }, []);

  async function fetchOrders() {
    try {
      const res = await fetch('/api/admin/orders');
      const data = await res.json();
      if (Array.isArray(data)) {
        setOrders(data);
      }
    } catch (err) {
      console.error('Failed to fetch orders:', err);
    } finally {
      setLoading(false);
    }
  }

  const handleStatusChange = async (orderId: string, newStatus: string) => {
    setUpdatingId(orderId);
    try {
      const res = await fetch(`/api/admin/orders/${orderId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });

      if (res.ok) {
        setOrders((prev) =>
          prev.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o))
        );
        if (selectedOrder && selectedOrder.id === orderId) {
          setSelectedOrder({ ...selectedOrder, status: newStatus });
        }
      } else {
        alert('Failed to update status');
      }
    } catch (err) {
      console.error('Status update error:', err);
    } finally {
      setUpdatingId(null);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'PENDING':
        return 'bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-400 border-amber-300';
      case 'PROCESSING':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-400 border-blue-300';
      case 'DISPATCHED':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900/40 dark:text-purple-400 border-purple-300';
      case 'DELIVERED':
        return 'bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-400 border-green-300';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-black text-gray-900 dark:text-white">
          Customer Orders
        </h1>
        <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1">
          Review placed orders, view customer info, and update order fulfillment statuses.
        </p>
      </div>

      {/* Orders Table Card */}
      <div className="bg-white/70 dark:bg-gray-900/70 backdrop-blur-xl border border-gray-200 dark:border-gray-800 rounded-3xl overflow-hidden shadow-sm">
        {loading ? (
          <div className="py-12 text-center text-sm text-gray-500">Loading customer orders...</div>
        ) : orders.length === 0 ? (
          <div className="py-12 text-center text-sm text-gray-400">No orders found in database.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-gray-600 dark:text-gray-300">
              <thead className="bg-gray-100/50 dark:bg-gray-800/50 border-b border-gray-200 dark:border-gray-800 text-xs uppercase font-extrabold text-gray-500 dark:text-gray-400">
                <tr>
                  <th className="py-4 px-6">Reference ID</th>
                  <th className="py-4 px-6">Customer Info</th>
                  <th className="py-4 px-6">Location</th>
                  <th className="py-4 px-6">Total Amount</th>
                  <th className="py-4 px-6">Status</th>
                  <th className="py-4 px-6 text-right">Details</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
                {orders.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50/50 dark:hover:bg-gray-800/30 transition">
                    <td className="py-4 px-6 font-mono text-xs font-bold text-gray-900 dark:text-white">
                      {order.id.substring(0, 10)}...
                    </td>
                    <td className="py-4 px-6">
                      <div className="font-bold text-gray-900 dark:text-white">{order.customerName}</div>
                      <div className="text-xs text-gray-500">{order.customerPhone}</div>
                    </td>
                    <td className="py-4 px-6 font-medium text-xs text-gray-500">
                      {order.city}, {order.region}
                    </td>
                    <td className="py-4 px-6 font-black text-gray-900 dark:text-white">
                      GH₵ {Number(order.totalAmount).toLocaleString()}
                    </td>
                    <td className="py-4 px-6">
                      <div className="relative inline-block">
                        <select
                          disabled={updatingId === order.id}
                          value={order.status}
                          onChange={(e) => handleStatusChange(order.id, e.target.value)}
                          className={`text-xs font-bold px-3 py-1.5 rounded-full border outline-none cursor-pointer transition ${getStatusBadge(
                            order.status
                          )}`}
                        >
                          <option value="PENDING">PENDING</option>
                          <option value="PROCESSING">PROCESSING</option>
                          <option value="DISPATCHED">DISPATCHED</option>
                          <option value="DELIVERED">DELIVERED</option>
                        </select>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-right">
                      <button
                        onClick={() => setSelectedOrder(order)}
                        className="px-3.5 py-1.5 text-xs font-bold bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-xl transition"
                      >
                        View Items
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Order Detail Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            onClick={() => setSelectedOrder(null)}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm"
          />

          <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-3xl p-6 sm:p-8 max-w-xl w-full relative z-10 shadow-2xl space-y-6">
            <div className="flex items-center justify-between border-b pb-4 dark:border-gray-800">
              <div>
                <span className="text-xs font-bold text-gray-400 uppercase">Order Details</span>
                <h3 className="text-lg font-mono font-bold text-gray-900 dark:text-white">{selectedOrder.id}</h3>
              </div>
              <button
                onClick={() => setSelectedOrder(null)}
                className="p-2 text-gray-400 hover:text-black dark:hover:text-white"
              >
                ✕
              </button>
            </div>

            {/* Customer Details Grid */}
            <div className="grid grid-cols-2 gap-4 bg-gray-50 dark:bg-gray-800/50 p-4 rounded-2xl text-xs">
              <div>
                <p className="text-gray-400 font-bold uppercase mb-1">Customer</p>
                <p className="font-bold text-gray-900 dark:text-white">{selectedOrder.customerName}</p>
                <p className="text-gray-500">{selectedOrder.customerPhone}</p>
              </div>
              <div>
                <p className="text-gray-400 font-bold uppercase mb-1">Address</p>
                <p className="font-bold text-gray-900 dark:text-white">{selectedOrder.address || selectedOrder.city}</p>
                <p className="text-gray-500">{selectedOrder.region}</p>
              </div>
            </div>

            {/* Order Items */}
            <div>
              <h4 className="font-bold text-sm text-gray-900 dark:text-white mb-3">Items Purchased</h4>
              <div className="space-y-3 max-h-56 overflow-y-auto">
                {selectedOrder.orderItems.map((item) => (
                  <div key={item.id} className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800/40 rounded-xl text-xs">
                    <div className="w-10 h-10 bg-white dark:bg-gray-800 rounded-lg p-1 border flex items-center justify-center shrink-0">
                      {item.product.images?.[0] ? (
                        <Image src={item.product.images[0]} alt={item.product.name} width={32} height={32} className="object-contain" />
                      ) : (
                        <Package className="w-4 h-4 text-gray-400" />
                      )}
                    </div>
                    <div className="flex-1">
                      <p className="font-bold text-gray-900 dark:text-white">{item.product.name}</p>
                      <p className="text-gray-400">Qty: {item.quantity}</p>
                    </div>
                    <div className="font-bold text-gray-900 dark:text-white">
                      GH₵ {Number(item.price).toLocaleString()}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-400 font-bold uppercase">Total Charged</p>
                <p className="text-xl font-black text-red-600">GH₵ {Number(selectedOrder.totalAmount).toLocaleString()}</p>
              </div>
              <button
                onClick={() => setSelectedOrder(null)}
                className="px-6 py-2.5 bg-gray-900 text-white dark:bg-white dark:text-gray-900 font-bold text-xs rounded-xl transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
