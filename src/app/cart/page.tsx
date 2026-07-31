'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '@/context/CartContext';
import { ShoppingBag, Trash2, Plus, Minus, ArrowRight, ShieldCheck } from 'lucide-react';

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, subtotal } = useCart();

  if (cart.length === 0) {
    return (
      <div className="min-h-[70vh] bg-gray-50 flex flex-col items-center justify-center p-4">
        <div className="bg-white rounded-3xl border border-gray-200 p-10 max-w-md w-full text-center shadow-sm space-y-4">
          <div className="w-16 h-16 bg-red-50 text-red-600 rounded-full flex items-center justify-center mx-auto">
            <ShoppingBag size={32} />
          </div>
          <h1 className="text-2xl font-black text-gray-900">Your Shopping Cart is Empty</h1>
          <p className="text-sm text-gray-500">
            Looks like you haven't added any devices or accessories to your cart yet.
          </p>
          <Link
            href="/products"
            className="inline-flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white font-bold px-6 py-3.5 rounded-2xl text-sm shadow-lg shadow-red-600/30 transition active:scale-95 w-full"
          >
            Start Shopping <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50/50 py-12">
      <div className="max-w-5xl mx-auto px-4">
        <h1 className="text-3xl font-black text-gray-900 mb-8">Shopping Cart</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items List */}
          <div className="lg:col-span-2 space-y-4">
            {cart.map((item) => (
              <div
                key={`${item.id}-${item.selectedColor?.name || ''}-${item.selectedStorage || ''}`}
                className="bg-white p-4 sm:p-5 rounded-3xl border border-gray-200/80 shadow-sm flex gap-4 items-center"
              >
                <div className="w-20 h-20 bg-gray-50 rounded-2xl p-2 border border-gray-100 flex items-center justify-center shrink-0">
                  <Image
                    src={item.image || '/file.svg'}
                    alt={item.name}
                    width={64}
                    height={64}
                    className="object-contain max-h-full"
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-gray-900 text-sm sm:text-base truncate">{item.name}</h3>
                  <div className="flex flex-wrap gap-2 mt-1 text-xs text-gray-500">
                    {item.selectedColor && (
                      <span className="inline-flex items-center gap-1 bg-gray-100 px-2 py-0.5 rounded-md font-semibold">
                        <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.selectedColor.hex }} />
                        {item.selectedColor.name}
                      </span>
                    )}
                    {item.selectedStorage && (
                      <span className="bg-gray-100 px-2 py-0.5 rounded-md font-semibold text-gray-700">
                        {item.selectedStorage}
                      </span>
                    )}
                  </div>
                  <div className="font-black text-gray-900 text-sm sm:text-base mt-2">
                    GH₵ {Number(item.price).toLocaleString()}
                  </div>
                </div>

                <div className="flex flex-col items-end justify-between gap-3">
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-gray-400 hover:text-red-600 transition-colors p-1"
                    title="Remove item"
                  >
                    <Trash2 size={18} />
                  </button>

                  <div className="flex items-center border border-gray-200 rounded-xl bg-gray-50 p-1 gap-2">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="p-1 text-gray-600 hover:text-black rounded-lg transition"
                    >
                      <Minus size={14} />
                    </button>
                    <span className="text-xs font-bold w-4 text-center">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="p-1 text-gray-600 hover:text-black rounded-lg transition"
                    >
                      <Plus size={14} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary Sidebar */}
          <div className="bg-white p-6 rounded-3xl border border-gray-200/80 shadow-sm h-fit space-y-6">
            <h2 className="font-black text-lg text-gray-900 border-b pb-4">Order Summary</h2>

            <div className="space-y-3 text-sm">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal</span>
                <span className="font-bold text-gray-900">GH₵ {subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Delivery</span>
                <span className="text-xs text-green-600 font-bold bg-green-50 px-2 py-0.5 rounded-md">Calculated at Checkout</span>
              </div>
            </div>

            <div className="border-t pt-4 flex justify-between items-center text-lg font-black text-gray-900">
              <span>Total</span>
              <span className="text-red-600">GH₵ {subtotal.toLocaleString()}</span>
            </div>

            <Link
              href="/checkout"
              className="w-full py-4 bg-red-600 hover:bg-red-700 text-white font-bold rounded-2xl text-sm shadow-lg shadow-red-600/30 flex items-center justify-center gap-2 transition active:scale-95"
            >
              Proceed to Checkout <ArrowRight size={18} />
            </Link>

            <div className="flex items-center gap-2 text-xs text-gray-400 justify-center">
              <ShieldCheck size={16} className="text-green-600" />
              <span>Secure Payment & Fast Ghana Delivery</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
