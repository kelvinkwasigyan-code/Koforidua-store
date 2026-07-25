'use client';

import React, { useState } from 'react';
import { createProduct } from '@/app/actions/product';

export default function NewProductPage() {
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

    const handleSubmit = async (formData: FormData) => {
        setLoading(true);
        setMessage('');
        try {
            await createProduct(formData);
            setMessage('✅ Product added successfully!');
        } catch (err) {
            setMessage('❌ Error adding product.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto py-10 px-4">
            <h1 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Admin Portal: Add New Product</h1>

            {message && <p className="mb-4 text-sm font-medium">{message}</p>}

            <form action={handleSubmit} className="space-y-4 bg-white dark:bg-gray-900 p-6 rounded-lg shadow border border-gray-200 dark:border-gray-800 text-gray-800 dark:text-gray-200">
                <div>
                    <label className="block text-sm font-semibold mb-1">Product Name</label>
                    <input
                        type="text"
                        name="name"
                        required
                        className="w-full border p-2 rounded text-sm dark:bg-gray-800"
                        placeholder="e.g. iPhone 15 Pro Max"
                    />
                </div>

                <div>
                    <label className="block text-sm font-semibold mb-1">Price (GHS)</label>
                    <input
                        type="number"
                        name="price"
                        step="0.01"
                        required
                        className="w-full border p-2 rounded text-sm dark:bg-gray-800"
                        placeholder="12000"
                    />
                </div>

                <div>
                    <label className="block text-sm font-semibold mb-1">Category ID</label>
                    <input
                        type="text"
                        name="categoryId"
                        required
                        className="w-full border p-2 rounded text-sm dark:bg-gray-800"
                        placeholder="Category ID"
                    />
                </div>

                <div>
                    <label className="block text-sm font-semibold mb-1">Image URL</label>
                    <input
                        type="text"
                        name="imageUrl"
                        className="w-full border p-2 rounded text-sm dark:bg-gray-800"
                        placeholder="/images/product.png"
                    />
                </div>

                <div>
                    <label className="block text-sm font-semibold mb-1">Description</label>
                    <textarea
                        name="description"
                        rows={3}
                        className="w-full border p-2 rounded text-sm dark:bg-gray-800"
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
