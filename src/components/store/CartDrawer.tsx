'use client';

import React from 'react';
import { useCart } from '@/store/CartContext';

const CartDrawer = () => {
    const { cart, isOpen, closeCart, removeFromCart, updateQuantity, subtotal } = useCart();

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 overflow-hidden">
            {/* Backdrop */}
            <div
                className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
                onClick={closeCart}
            />

            <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
                <div className="w-screen max-w-md bg-white shadow-xl flex flex-col justify-between">

                    {/* Header */}
                    <div className="p-4 sm:p-6 border-b border-gray-200 flex items-center justify-between">
                        <h2 className="text-lg font-bold text-gray-900">Your Shopping Cart</h2>
                        <button
                            onClick={closeCart}
                            className="text-gray-400 hover:text-gray-600 p-1 text-xl font-bold"
                        >
                            ✕
                        </button>
                    </div>

                    {/* Cart Items List */}
                    <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
                        {cart.length === 0 ? (
                            <div className="text-center py-12 text-gray-500">
                                <p className="text-4xl mb-2">🛍️</p>
                                <p className="font-medium">Your cart is empty.</p>
                            </div>
                        ) : (
                            cart.map((item) => {
                                const effectivePrice = item.salePrice ?? item.price;
                                return (
                                    <div key={item.id} className="flex items-center space-x-4 border-b pb-4">
                                        <img
                                            src={item.imageUrl}
                                            alt={item.name}
                                            className="w-16 h-16 object-contain bg-gray-50 rounded border p-1"
                                        />
                                        <div className="flex-1">
                                            <h4 className="text-sm font-semibold text-gray-900 line-clamp-1">
                                                {item.name}
                                            </h4>
                                            <p className="text-xs text-indigo-600 font-bold mt-0.5">
                                                GH₵{effectivePrice.toLocaleString()}
                                            </p>

                                            {/* Quantity Controls */}
                                            <div className="flex items-center space-x-2 mt-2">
                                                <button
                                                    onClick={() => updateQuantity(item.id, -1)}
                                                    className="w-6 h-6 border rounded flex items-center justify-center text-xs font-bold text-gray-600 hover:bg-gray-100"
                                                >
                                                    -
                                                </button>
                                                <span className="text-xs font-semibold text-gray-800">
                                                    {item.quantity}
                                                </span>
                                                <button
                                                    onClick={() => updateQuantity(item.id, 1)}
                                                    className="w-6 h-6 border rounded flex items-center justify-center text-xs font-bold text-gray-600 hover:bg-gray-100"
                                                >
                                                    +
                                                </button>
                                            </div>
                                        </div>

                                        <button
                                            onClick={() => removeFromCart(item.id)}
                                            className="text-xs text-red-500 hover:text-red-700 font-medium"
                                        >
                                            Remove
                                        </button>
                                    </div>
                                );
                            })
                        )}
                    </div>

                    {/* Footer / Checkout */}
                    {cart.length > 0 && (
                        <div className="p-4 sm:p-6 border-t border-gray-200 bg-gray-50 space-y-4">
                            <div className="flex justify-between text-base font-bold text-gray-900">
                                <span>Subtotal</span>
                                <span>GH₵{subtotal.toLocaleString()}</span>
                            </div>
                            <p className="text-xs text-gray-500">Shipping and taxes calculated at checkout.</p>
                            <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 rounded-lg text-sm transition">
                                Proceed to Checkout
                            </button>
                        </div>
                    )}

                </div>
            </div>
        </div>
    );
};

export default CartDrawer;
