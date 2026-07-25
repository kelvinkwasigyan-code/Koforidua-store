'use client';

import React, { useState } from 'react';

export default function NewProductPage() {
    const [form, setForm] = useState({
        name: '',
        brand: 'Apple',
        os: 'iOS',
        description: '',
        price: '',
        salePrice: '',
        category: 'Smartphones',
        imageUrl: '',
    });
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setMessage('');

        try {
            const res = await fetch('/api/products', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(form),
            });

            if (res.ok) {
                setMessage('✅ Product added successfully!');
                setForm({
                    name: '',
                    brand: 'Apple',
                    os: 'iOS',
                    description: '',
                    price: '',
                    salePrice: '',
                    category: 'Smartphones',
                    imageUrl: '',
                });
            } else {
                setMessage('❌ Error adding product.');
            }
        } catch (err) {
            setMessage('❌ Network error.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto py-10 px-4">
            <h1 className="text-2xl font-bold mb-6 text-gray-900">Admin Portal: Add New Product</h1>

            {message && <p className="mb-4 text-sm font-medium">{message}</p>}

            <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-lg shadow border border-gray-200 text-gray-800">
                <div>
                    <label className="block text-sm font-semibold mb-1">Product Name</label>
                    <input
                        type="text"
                        required
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        className="w-full border p-2 rounded text-sm"
                        placeholder="e.g. iPhone 15 Pro Max"
                    />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-semibold mb-1">Brand</label>
                        <select
                            value={form.brand}
                            onChange={(e) => setForm({ ...form, brand: e.target.value })}
                            className="w-full border p-2 rounded text-sm"
                        >
                            <option>Apple</option>
                            <option>Samsung</option>
                            <option>Xiaomi</option>
                            <option>Generic</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-semibold mb-1">OS (Optional)</label>
                        <select
                            value={form.os || ''}
                            onChange={(e) => setForm({ ...form, os: e.target.value || '' })}
                            className="w-full border p-2 rounded text-sm"
                        >
                            <option value="">None</option>
                            <option value="iOS">iOS</option>
                            <option value="Android">Android</option>
                        </select>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-semibold mb-1">Regular Price (GHS)</label>
                        <input
                            type="number"
                            required
                            value={form.price}
                            onChange={(e) => setForm({ ...form, price: e.target.value })}
                            className="w-full border p-2 rounded text-sm"
                            placeholder="12000"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold mb-1">Sale Price (Optional)</label>
                        <input
                            type="number"
                            value={form.salePrice}
                            onChange={(e) => setForm({ ...form, salePrice: e.target.value })}
                            className="w-full border p-2 rounded text-sm"
                            placeholder="10500"
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-semibold mb-1">Category</label>
                    <select
                        value={form.category}
                        onChange={(e) => setForm({ ...form, category: e.target.value })}
                        className="w-full border p-2 rounded text-sm"
                    >
                        <option>Smartphones</option>
                        <option>Tablets</option>
                        <option>Covers & Cases</option>
                        <option>Chargers</option>
                        <option>Smart Watches</option>
                        <option>Audio</option>
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-semibold mb-1">Image URL</label>
                    <input
                        type="text"
                        required
                        value={form.imageUrl}
                        onChange={(e) => setForm({ ...form, imageUrl: e.target.value })}
                        className="w-full border p-2 rounded text-sm"
                        placeholder="/categories/phones.jpg or image link"
                    />
                </div>

                <div>
                    <label className="block text-sm font-semibold mb-1">Description</label>
                    <textarea
                        rows={3}
                        value={form.description}
                        onChange={(e) => setForm({ ...form, description: e.target.value })}
                        className="w-full border p-2 rounded text-sm"
                        placeholder="Short product details..."
                    />
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-indigo-600 text-white font-semibold py-2.5 rounded hover:bg-indigo-700 transition"
                >
                    {loading ? 'Saving...' : 'Upload Product'}
                </button>
            </form>
        </div>
    );
}
