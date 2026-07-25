'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Product {
    id: string;
    title: string;
    category: string;
    price: number;
    stock: number;
    image: string;
    colors: string[];
}

const initialProducts: Product[] = [
    {
        id: '1',
        title: 'iPhone 15 Pro Max - 256GB',
        category: 'Smartphones',
        price: 14500,
        stock: 5,
        image: '/images/iphone.PNG',
        colors: ['#3a3b3c', '#e2e2e2', '#212a37'],
    },
    {
        id: '2',
        title: 'Curren Chronograph Leather Watch',
        category: 'Watches',
        price: 350,
        stock: 12,
        image: '/images/Watches.png',
        colors: ['#000000', '#8b4513'],
    },
];

export default function AdminProductsPage() {
    const [products, setProducts] = useState<Product[]>(initialProducts);
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Form State
    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('Smartphones');
    const [price, setPrice] = useState('');
    const [stock, setStock] = useState('');
    const [image, setImage] = useState('');

    const handleAddProduct = (e: React.FormEvent) => {
        e.preventDefault();
        if (!title || !price || !stock) return;

        const newProd: Product = {
            id: Date.now().toString(),
            title,
            category,
            price: parseFloat(price),
            stock: parseInt(stock, 10),
            image: image || '/images/placeholder.png',
            colors: ['#000000'],
        };

        setProducts([newProd, ...products]);
        setIsModalOpen(false);
        // Reset Form
        setTitle('');
        setPrice('');
        setStock('');
        setImage('');
    };

    const handleDelete = (id: string) => {
        setProducts(products.filter((p) => p.id !== id));
    };

    return (
        <div className="space-y-6">
            {/* Top Header & Actions */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl sm:text-3xl font-black text-gray-900 dark:text-white">
                        Product Inventory
                    </h1>
                    <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1">
                        Add, update, or remove items available on ERA.
                    </p>
                </div>

                <button
                    onClick={() => setIsModalOpen(true)}
                    className="px-5 py-3 bg-red-600 hover:bg-red-700 text-white font-bold text-sm rounded-2xl shadow-lg shadow-red-600/30 transition active:scale-95 flex items-center justify-center gap-2 self-start sm:self-auto"
                >
                    <span>+</span> Add New Product
                </button>
            </div>

            {/* Product Table Card */}
            <div className="bg-white/70 dark:bg-gray-900/70 backdrop-blur-xl border border-gray-200 dark:border-gray-800 rounded-3xl overflow-hidden shadow-sm">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm text-gray-600 dark:text-gray-300">
                        <thead className="bg-gray-100/50 dark:bg-gray-800/50 border-b border-gray-200 dark:border-gray-800 text-xs uppercase font-extrabold text-gray-500 dark:text-gray-400">
                            <tr>
                                <th className="py-4 px-6">Product</th>
                                <th className="py-4 px-6">Category</th>
                                <th className="py-4 px-6">Price</th>
                                <th className="py-4 px-6">Stock</th>
                                <th className="py-4 px-6 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
                            {products.map((product) => (
                                <tr key={product.id} className="hover:bg-gray-50/50 dark:hover:bg-gray-800/30 transition">
                                    <td className="py-4 px-6 flex items-center gap-3">
                                        <div className="w-12 h-12 rounded-xl bg-gray-100 dark:bg-gray-800 p-1 flex-shrink-0 flex items-center justify-center">
                                            <img src={product.image} alt={product.title} className="max-h-full max-w-full object-contain" />
                                        </div>
                                        <span className="font-semibold text-gray-900 dark:text-white line-clamp-1">
                                            {product.title}
                                        </span>
                                    </td>
                                    <td className="py-4 px-6 font-medium text-gray-500 dark:text-gray-400">
                                        {product.category}
                                    </td>
                                    <td className="py-4 px-6 font-bold text-gray-900 dark:text-white">
                                        GH₵ {Number(product.price).toLocaleString()}
                                    </td>
                                    <td className="py-4 px-6">
                                        <span className={`inline-block px-2.5 py-1 rounded-lg text-xs font-bold ${product.stock > 0
                                                ? 'bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-400'
                                                : 'bg-red-100 dark:bg-red-900/40 text-red-700 dark:text-red-400'
                                            }`}>
                                            {product.stock > 0 ? `${product.stock} in stock` : 'Out of Stock'}
                                        </span>
                                    </td>
                                    <td className="py-4 px-6 text-right">
                                        <button
                                            onClick={() => handleDelete(product.id)}
                                            className="px-3 py-1.5 text-xs font-bold text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/40 rounded-xl transition"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Slide-over Modal Form */}
            <AnimatePresence>
                {isModalOpen && (
                    <div className="fixed inset-0 z-50 flex justify-end">
                        {/* Overlay */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsModalOpen(false)}
                            className="fixed inset-0 bg-black/40 backdrop-blur-sm"
                        />

                        {/* Form Sheet */}
                        <motion.div
                            initial={{ x: '100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '100%' }}
                            transition={{ type: 'spring', damping: 28, stiffness: 300 }}
                            className="relative w-full max-w-md bg-white dark:bg-gray-900 h-full p-6 shadow-2xl z-10 overflow-y-auto flex flex-col justify-between"
                        >
                            <div>
                                <div className="flex items-center justify-between pb-4 border-b border-gray-200 dark:border-gray-800">
                                    <h2 className="text-xl font-extrabold text-gray-900 dark:text-white">
                                        New Product
                                    </h2>
                                    <button
                                        onClick={() => setIsModalOpen(false)}
                                        className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-white"
                                    >
                                        ✕
                                    </button>
                                </div>

                                <form onSubmit={handleAddProduct} id="productForm" className="mt-6 space-y-4">
                                    <div>
                                        <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 uppercase mb-1">
                                            Title
                                        </label>
                                        <input
                                            type="text"
                                            required
                                            placeholder="e.g. Curren Steel Watch"
                                            value={title}
                                            onChange={(e) => setTitle(e.target.value)}
                                            className="w-full px-4 py-3 rounded-2xl bg-gray-100 dark:bg-gray-800 border border-transparent focus:border-red-600 outline-none text-sm font-medium"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 uppercase mb-1">
                                            Category
                                        </label>
                                        <select
                                            value={category}
                                            onChange={(e) => setCategory(e.target.value)}
                                            className="w-full px-4 py-3 rounded-2xl bg-gray-100 dark:bg-gray-800 border border-transparent focus:border-red-600 outline-none text-sm font-medium"
                                        >
                                            <option value="Smartphones">Smartphones</option>
                                            <option value="Watches">Watches</option>
                                            <option value="Accessories">Accessories</option>
                                        </select>
                                    </div>

                                    <div className="grid grid-cols-2 gap-3">
                                        <div>
                                            <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 uppercase mb-1">
                                                Price (GH₵)
                                            </label>
                                            <input
                                                type="number"
                                                required
                                                placeholder="350"
                                                value={price}
                                                onChange={(e) => setPrice(e.target.value)}
                                                className="w-full px-4 py-3 rounded-2xl bg-gray-100 dark:bg-gray-800 border border-transparent focus:border-red-600 outline-none text-sm font-medium"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 uppercase mb-1">
                                                Stock
                                            </label>
                                            <input
                                                type="number"
                                                required
                                                placeholder="10"
                                                value={stock}
                                                onChange={(e) => setStock(e.target.value)}
                                                className="w-full px-4 py-3 rounded-2xl bg-gray-100 dark:bg-gray-800 border border-transparent focus:border-red-600 outline-none text-sm font-medium"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 uppercase mb-1">
                                            Image Path or URL
                                        </label>
                                        <input
                                            type="text"
                                            placeholder="/images/watch.png"
                                            value={image}
                                            onChange={(e) => setImage(e.target.value)}
                                            className="w-full px-4 py-3 rounded-2xl bg-gray-100 dark:bg-gray-800 border border-transparent focus:border-red-600 outline-none text-sm font-medium"
                                        />
                                    </div>
                                </form>
                            </div>

                            <div className="pt-4 border-t border-gray-200 dark:border-gray-800 flex gap-3">
                                <button
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    className="w-1/2 py-3 rounded-2xl bg-gray-100 dark:bg-gray-800 text-xs font-bold hover:bg-gray-200 transition"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    form="productForm"
                                    className="w-1/2 py-3 rounded-2xl bg-red-600 text-white text-xs font-bold shadow-lg shadow-red-600/30 hover:bg-red-700 transition"
                                >
                                    Save Product
                                </button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}
