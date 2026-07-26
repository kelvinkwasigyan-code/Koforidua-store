'use client';

import React from 'react';
import { useCart } from '@/context/CartContext';
import Link from 'next/link';
import Image from 'next/image';
import { ShoppingBag, X, Plus, Minus, Trash2, ArrowRight, MessageCircle } from 'lucide-react';

const CartDrawer = () => {
  const { cart, isOpen, closeCart, removeFromCart, updateQuantity, subtotal } = useCart();

  if (!isOpen) return null;

  const [whatsappDisplayNumber, setWhatsappDisplayNumber] = React.useState('0547654736');
  const [formattedWaNumber, setFormattedWaNumber] = React.useState('233547654736');

  React.useEffect(() => {
    async function loadSettings() {
      const { fetchStoreSettings, formatWhatsAppNumber } = await import('@/lib/storeSettings');
      const s = await fetchStoreSettings();
      if (s.whatsappNumber) {
        setWhatsappDisplayNumber(s.whatsappNumber);
        setFormattedWaNumber(formatWhatsAppNumber(s.whatsappNumber));
      }
    }
    if (isOpen) {
      loadSettings();
    }
  }, [isOpen]);

  const handleWhatsAppCheckout = () => {
    if (cart.length === 0) return;

    let message = `Hello Joerich PHONES! I want to place an order:\n\n`;
    let total = 0;

    cart.forEach((item: any, index: number) => {
      const itemPrice = item.salePrice || item.price;
      const itemTotal = itemPrice * (item.quantity || 1);
      message += `${index + 1}. *${item.name}* (${item.quantity || 1}x) - GH₵ ${itemTotal.toLocaleString()}\n`;
      total += itemTotal;
    });

    message += `\n*Total Amount: GH₵ ${total.toLocaleString()}*\n\nPlease let me know about delivery/pickup options!`;

    const encodedMessage = encodeURIComponent(message);
    
    window.open(`https://wa.me/${formattedWaNumber}?text=${encodedMessage}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden font-sans">
      {/* Glass Backdrop */}
      <div
        className="fixed inset-0 bg-black/40 backdrop-blur-md transition-opacity"
        onClick={closeCart}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white/90 dark:bg-slate-900/90 backdrop-blur-3xl shadow-2xl border-l border-white/60 dark:border-white/10 flex flex-col justify-between">

          {/* Header */}
          <div className="p-5 border-b border-gray-200/80 dark:border-gray-800/80 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-2xl bg-red-600/10 text-red-600 flex items-center justify-center">
                <ShoppingBag size={18} />
              </div>
              <div>
                <h2 className="text-base font-extrabold text-gray-900 dark:text-white tracking-tight">Your Shopping Cart</h2>
                <span className="text-xs text-gray-500">{cart.length} item(s)</span>
              </div>
            </div>

            <button
              onClick={closeCart}
              className="w-8 h-8 rounded-full bg-gray-100 dark:bg-slate-800 text-gray-500 hover:text-gray-900 dark:hover:text-white flex items-center justify-center transition active:scale-95"
            >
              <X size={16} />
            </button>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {cart.length === 0 ? (
              <div className="text-center py-16 space-y-3">
                <div className="w-16 h-16 rounded-3xl bg-gray-100 dark:bg-slate-800 text-gray-400 flex items-center justify-center mx-auto">
                  <ShoppingBag size={32} />
                </div>
                <h3 className="text-base font-bold text-gray-900 dark:text-white">Your cart is empty</h3>
                <p className="text-xs text-gray-500 max-w-xs mx-auto">Add smartphones, accessories or audio devices to get started.</p>
              </div>
            ) : (
              cart.map((item) => {
                const effectivePrice = item.salePrice ?? item.price;
                return (
                  <div key={item.id} className="flex items-center gap-3 bg-white/60 dark:bg-slate-800/60 p-3 rounded-2xl border border-gray-200/60 dark:border-gray-700/60">
                    <div className="w-16 h-16 rounded-xl bg-gray-50 dark:bg-slate-900 p-1 flex-shrink-0 flex items-center justify-center relative overflow-hidden">
                      <Image
                        src={item.image || '/logo.jpg'}
                        alt={item.name}
                        width={56}
                        height={56}
                        className="object-contain"
                      />
                    </div>

                    <div className="flex-1 min-w-0">
                      <h4 className="text-xs font-extrabold text-gray-900 dark:text-white line-clamp-1">
                        {item.name}
                      </h4>
                      <p className="text-xs text-red-600 dark:text-red-400 font-extrabold mt-0.5">
                        GH₵{Number(effectivePrice).toLocaleString()}
                      </p>

                      {/* Quantity Controls */}
                      <div className="flex items-center gap-2 mt-2">
                        <div className="flex items-center bg-gray-100 dark:bg-slate-900 rounded-xl p-0.5 border border-gray-200/60 dark:border-gray-800">
                          <button
                            onClick={() => updateQuantity(item.id, -1)}
                            className="w-5 h-5 rounded-lg flex items-center justify-center text-xs font-bold text-gray-600 dark:text-gray-400 hover:bg-white dark:hover:bg-slate-800 transition"
                          >
                            <Minus size={12} />
                          </button>
                          <span className="w-6 text-center text-xs font-extrabold text-gray-800 dark:text-gray-200">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, 1)}
                            className="w-5 h-5 rounded-lg flex items-center justify-center text-xs font-bold text-gray-600 dark:text-gray-400 hover:bg-white dark:hover:bg-slate-800 transition"
                          >
                            <Plus size={12} />
                          </button>
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="p-2 text-gray-400 hover:text-red-600 transition"
                      title="Remove item"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                );
              })
            )}
          </div>

          {/* Footer / Checkout */}
          {cart.length > 0 && (
            <div className="p-5 border-t border-gray-200/80 dark:border-gray-800/80 bg-white/40 dark:bg-slate-900/40 backdrop-blur-xl space-y-3">
              <div className="flex justify-between items-center text-sm font-extrabold text-gray-900 dark:text-white">
                <span>Subtotal</span>
                <span className="text-base text-red-600 dark:text-red-400">GH₵{Number(subtotal).toLocaleString()}</span>
              </div>

              {/* 1-Click WhatsApp Order Button */}
              <button
                onClick={handleWhatsAppCheckout}
                className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs rounded-2xl shadow-lg shadow-emerald-600/30 transition flex items-center justify-center gap-2 active:scale-95"
              >
                <MessageCircle size={17} />
                <span>Order via WhatsApp ({whatsappDisplayNumber})</span>
              </button>

              {/* Web Checkout Link */}
              <Link
                href="/checkout"
                onClick={closeCart}
                className="w-full py-3 bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 text-white font-extrabold text-xs rounded-2xl shadow-lg shadow-red-600/25 transition flex items-center justify-center gap-2 active:scale-95"
              >
                <span>Proceed to Web Checkout</span>
                <ArrowRight size={15} />
              </Link>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default CartDrawer;
