'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useCart } from '@/context/CartContext';

interface ProductCardProps {
    product: {
        id: string;
        name: string;
        brand: string;
        price: number;
        originalPrice?: number;
        inStock: boolean;
        stockQuantity: number;
        condition: string;
        imageUrl: string;
    };
}

export default function ProductCard({ product }: ProductCardProps) {
    const { addToCart } = useCart();

    return (
        <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: '-50px' }}
            whileTap={{ scale: 0.96 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            className="backdrop-blur-xl bg-white/60 dark:bg-gray-900/60 border border-white/80 dark:border-white/10 rounded-3xl p-4 shadow-sm hover:shadow-xl transition-shadow flex flex-col justify-between"
        >
            <div className="relative aspect-square w-full mb-3 overflow-hidden rounded-2xl bg-gray-50/50 dark:bg-gray-800/50">
                <motion.img
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    src={product.imageUrl}
                    alt={product.name}
                    className="w-full h-full object-contain p-3"
                />
            </div>

            <h3 className="text-sm font-semibold line-clamp-2 text-gray-800 dark:text-gray-200">
                {product.name}
            </h3>
            <p className="text-base font-extrabold text-red-600 mt-1">
                GH₵ {Number(product.price).toLocaleString()}
            </p>

            <motion.button
                whileTap={{ scale: 0.92 }}
                onClick={() => addToCart(product)}
                disabled={!product.inStock}
                className="mt-3 w-full py-2.5 bg-red-500 hover:bg-red-600 text-white font-bold text-xs rounded-xl transition shadow-md disabled:bg-gray-400"
            >
                {product.inStock ? 'Add to Cart' : 'Sold Out'}
            </motion.button>
        </motion.div>
    );
}
