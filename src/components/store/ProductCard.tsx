'use client';

import React from 'react';
import { useCart } from '@/store/CartContext';

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

    // Format currency consistently to GHS (e.g., GHS 11,800.00)
    const formattedPrice = new Intl.NumberFormat('en-GH', {
        style: 'currency',
        currency: 'GHS',
        maximumFractionDigits: 0,
    }).format(product.price);

    const formattedOriginalPrice = product.originalPrice
        ? new Intl.NumberFormat('en-GH', {
            style: 'currency',
            currency: 'GHS',
            maximumFractionDigits: 0,
        }).format(product.originalPrice)
        : null;

    return (
        <div className="group relative backdrop-blur-xl bg-white/50 border border-white/80 rounded-3xl p-4 shadow-[0_8px_30px_rgba(0,0,0,0.04)] hover:shadow-lg hover:bg-white/70 transition-all duration-300 flex flex-col justify-between">

            {/* Top Badges (Condition & Sale/Stock) */}
            <div className="flex items-center justify-between gap-2 mb-3 z-10">
                {/* Condition Tag */}
                <span className="px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wide uppercase backdrop-blur-md bg-gray-900/80 text-white shadow-sm">
                    {product.condition}
                </span>

                {/* Stock Status Badge */}
                {product.inStock ? (
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-bold backdrop-blur-md bg-emerald-500/15 text-emerald-700 border border-emerald-300/40">
                        {product.stockQuantity <= 3 ? `Only ${product.stockQuantity} Left` : 'In Stock'}
                    </span>
                ) : (
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-bold backdrop-blur-md bg-rose-500/15 text-rose-700 border border-rose-300/40">
                        Out of Stock
                    </span>
                )}
            </div>

            {/* Image Container */}
            <div className="relative w-full h-48 rounded-2xl bg-gradient-to-b from-white/80 to-red-50/30 p-4 flex items-center justify-center overflow-hidden border border-white/60">
                <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="max-h-full object-contain group-hover:scale-105 transition-transform duration-300"
                />
            </div>

            {/* Product Details */}
            <div className="mt-4 space-y-1.5">
                <p className="text-[11px] font-bold tracking-wider text-red-600 uppercase">
                    {product.brand}
                </p>
                <h3 className="font-bold text-gray-900 text-sm line-clamp-1 group-hover:text-red-600 transition">
                    {product.name}
                </h3>

                {/* Price Display (GHS) */}
                <div className="flex items-baseline gap-2 pt-1">
                    <span className="text-base font-extrabold text-gray-900">
                        {formattedPrice}
                    </span>
                    {formattedOriginalPrice && (
                        <span className="text-xs text-gray-400 line-through font-medium">
                            {formattedOriginalPrice}
                        </span>
                    )}
                </div>
            </div>

            {/* Add To Cart / Action Button */}
            <button
                onClick={() => addToCart(product)}
                disabled={!product.inStock}
                className={`w-full mt-4 py-2.5 px-4 rounded-full text-xs font-semibold shadow-sm transition-all duration-200 ${product.inStock
                        ? 'bg-red-500/90 hover:bg-red-600 text-white hover:shadow-md active:scale-95'
                        : 'bg-gray-200/80 text-gray-400 cursor-not-allowed'
                    }`}
            >
                {product.inStock ? 'Add to Cart' : 'Sold Out'}
            </button>

        </div>
    );
}
