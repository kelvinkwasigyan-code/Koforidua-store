'use client';

import { useState } from 'react';
import Header from '@/components/store/Header';
import Footer from '@/components/store/Footer';
import { Search, Package, MapPin, Calendar, Clock, CheckCircle2 } from 'lucide-react';
import Image from 'next/image';

interface OrderItem {
    id: string;
    quantity: number;
    price: string;
    product: {
        name: string;
        images: string[];
    }
}

interface Order {
    id: string;
    customerName: string;
    status: string;
    totalAmount: string;
    createdAt: string;
    address: string | null;
    city: string;
    region: string;
    orderItems: OrderItem[];
}

export default function TrackOrderPage() {
    const [orderId, setOrderId] = useState('');
    const [order, setOrder] = useState<Order | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSearch = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!orderId.trim()) return;

        setLoading(true);
        setError('');
        setOrder(null);

        try {
            const res = await fetch(`/api/orders/${orderId}`);
            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error || 'Failed to fetch order');
            }

            setOrder(data);
        } catch (err: any) {
            setError(err.message || 'An error occurred while tracking the order.');
        } finally {
            setLoading(false);
        }
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'PENDING': return 'text-amber-500 bg-amber-50 border-amber-200';
            case 'PROCESSING': return 'text-blue-500 bg-blue-50 border-blue-200';
            case 'DISPATCHED': return 'text-indigo-500 bg-indigo-50 border-indigo-200';
            case 'DELIVERED': return 'text-green-600 bg-green-50 border-green-200';
            default: return 'text-gray-500 bg-gray-50 border-gray-200';
        }
    };

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'PENDING': return <Clock className="w-5 h-5" />;
            case 'PROCESSING': return <Package className="w-5 h-5" />;
            case 'DISPATCHED': return <MapPin className="w-5 h-5" />;
            case 'DELIVERED': return <CheckCircle2 className="w-5 h-5" />;
            default: return <Package className="w-5 h-5" />;
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col justify-between">
            <main className="flex-1 w-full max-w-3xl mx-auto px-4 py-12">
                <div className="text-center mb-10">
                    <h1 className="text-3xl font-black text-gray-900 mb-3">Track Your Order</h1>
                    <p className="text-gray-500">Enter your order reference ID below to see the current status.</p>
                </div>

                {/* Search Box */}
                <form onSubmit={handleSearch} className="bg-white p-4 rounded-3xl shadow-sm border border-gray-200 flex flex-col sm:flex-row gap-3 mb-10">
                    <div className="relative flex-1">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                            type="text"
                            placeholder="e.g. cm0v..."
                            value={orderId}
                            onChange={(e) => setOrderId(e.target.value)}
                            className="w-full bg-gray-50 border border-transparent focus:border-red-500 focus:bg-white rounded-2xl py-3.5 pl-12 pr-4 outline-none transition-all"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={loading}
                        className="bg-red-600 hover:bg-red-700 text-white font-bold py-3.5 px-8 rounded-2xl transition disabled:opacity-70 shadow-lg shadow-red-600/20"
                    >
                        {loading ? 'Searching...' : 'Track'}
                    </button>
                </form>

                {error && (
                    <div className="bg-red-50 text-red-600 p-4 rounded-2xl border border-red-100 text-center font-medium mb-8">
                        {error}
                    </div>
                )}

                {order && (
                    <div className="bg-white rounded-3xl border border-gray-200 overflow-hidden shadow-sm">
                        <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50">
                            <div>
                                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Order Status</p>
                                <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full border text-sm font-bold ${getStatusColor(order.status)}`}>
                                    {getStatusIcon(order.status)}
                                    {order.status}
                                </div>
                            </div>
                            <div className="text-right">
                                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Total Amount</p>
                                <p className="text-lg font-black text-gray-900">GH₵ {Number(order.totalAmount).toLocaleString()}</p>
                            </div>
                        </div>

                        <div className="p-6">
                            <h3 className="font-bold text-gray-900 mb-4">Items Ordered</h3>
                            <div className="space-y-4">
                                {order.orderItems.map((item) => (
                                    <div key={item.id} className="flex items-center gap-4 p-3 bg-gray-50 rounded-2xl">
                                        <div className="w-16 h-16 bg-white rounded-xl p-2 border flex items-center justify-center shrink-0">
                                            {item.product.images?.[0] ? (
                                                <Image 
                                                    src={item.product.images[0]} 
                                                    alt={item.product.name}
                                                    width={50}
                                                    height={50}
                                                    className="object-contain"
                                                />
                                            ) : (
                                                <Package className="text-gray-300" />
                                            )}
                                        </div>
                                        <div className="flex-1">
                                            <p className="font-bold text-gray-900 text-sm">{item.product.name}</p>
                                            <p className="text-gray-500 text-sm">Qty: {item.quantity}</p>
                                        </div>
                                        <div className="font-bold text-gray-900">
                                            GH₵ {Number(item.price).toLocaleString()}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="p-6 border-t border-gray-100 bg-gray-50 grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <p className="text-xs font-normal text-gray-400 uppercase tracking-wider mb-1">Delivery Details</p>
                                <p className="text-sm font-bold text-gray-900">{order.customerName}</p>
                                <p className="text-sm font-bold text-gray-900">{order.address || order.city}, {order.region}</p>
                            </div>
                            <div>
                                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Date Ordered</p>
                                <div className="flex items-center gap-2 text-sm text-gray-900 font-medium">
                                    <Calendar className="w-4 h-4 text-gray-400" />
                                    {new Date(order.createdAt).toLocaleDateString('en-US', { 
                                        year: 'numeric', 
                                        month: 'long', 
                                        day: 'numeric' 
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
}
