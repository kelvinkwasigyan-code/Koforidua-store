'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import { ShieldCheck, Truck, CreditCard, Banknote, Loader2, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';

export default function CheckoutPage() {
  const router = useRouter();
  const { cart, subtotal, clearCart } = useCart();
  
  const [formData, setFormData] = useState({
    customerName: '',
    customerPhone: '',
    customerEmail: '',
    region: 'Greater Accra',
    city: '',
    address: '',
    paymentMethod: 'MOMO',
  });
  
  const [isProcessing, setIsProcessing] = useState(false);
  const [momoState, setMomoState] = useState<'idle' | 'awaiting' | 'success'>('idle');
  const [error, setError] = useState<string | null>(null);

  // Hardcode a flat delivery fee for simplicity
  const deliveryFee = 30;
  const totalAmount = subtotal + deliveryFee;

  // Redirect to home if cart is empty
  useEffect(() => {
    if (cart.length === 0 && !isProcessing && momoState === 'idle') {
      router.push('/');
    }
  }, [cart.length, router, isProcessing, momoState]);

  if (cart.length === 0 && momoState === 'idle') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white p-8 rounded-2xl shadow-sm max-w-md w-full text-center">
          <h2 className="text-2xl font-bold mb-2">Your cart is empty</h2>
          <p className="text-gray-500 mb-6">Add some items before checking out.</p>
          <Link href="/" className="bg-red-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-red-700 transition">
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const processOrder = async () => {
    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          totalAmount,
          cartItems: cart.map(item => ({
            productId: item.id,
            quantity: item.quantity,
            price: item.salePrice || item.price,
          })),
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to place order');

      clearCart();
      router.push(`/checkout/success?orderId=${data.orderId}`);
    } catch (err: any) {
      setError(err.message);
      setIsProcessing(false);
      setMomoState('idle');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    setError(null);

    if (formData.paymentMethod === 'MOMO') {
      // Trigger Mock MoMo Flow
      setMomoState('awaiting');
      
      // Simulate waiting for user to approve on their phone (4 seconds)
      setTimeout(() => {
        setMomoState('success');
        
        // After showing success for 1.5s, process the order
        setTimeout(() => {
          processOrder();
        }, 1500);
      }, 4000);
      
    } else {
      // Cash on Delivery
      await processOrder();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-3xl font-black text-gray-900 tracking-tight mb-8">Checkout</h1>
        
        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column - Details */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Contact Info */}
            <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-gray-100">
              <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-gray-900 text-white text-xs flex items-center justify-center">1</span>
                Contact Details
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Full Name *</label>
                  <input required type="text" name="customerName" value={formData.customerName} onChange={handleInputChange} className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-red-500 outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Phone (WhatsApp) *</label>
                  <input required type="tel" name="customerPhone" value={formData.customerPhone} onChange={handleInputChange} placeholder="0547654736" className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-red-500 outline-none" />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Email Address (Optional)</label>
                  <input type="email" name="customerEmail" value={formData.customerEmail} onChange={handleInputChange} className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-red-500 outline-none" />
                </div>
              </div>
            </div>

            {/* Delivery Info */}
            <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-gray-100">
              <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-gray-900 text-white text-xs flex items-center justify-center">2</span>
                Delivery Address
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Region *</label>
                  <select required name="region" value={formData.region} onChange={handleInputChange} className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-red-500 outline-none bg-white">
                    <option value="Greater Accra">Greater Accra</option>
                    <option value="Ashanti">Ashanti</option>
                    <option value="Eastern">Eastern</option>
                    <option value="Central">Central</option>
                    <option value="Western">Western</option>
                    <option value="Other">Other Region</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">City / Town *</label>
                  <input required type="text" name="city" value={formData.city} onChange={handleInputChange} placeholder="e.g. Koforidua" className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-red-500 outline-none" />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Street Address or GhanaPost GPS *</label>
                  <input required type="text" name="address" value={formData.address} onChange={handleInputChange} placeholder="e.g. EN-123-4567, Main Street" className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-red-500 outline-none" />
                </div>
              </div>
            </div>

            {/* Payment Method */}
            <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-gray-100">
              <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-gray-900 text-white text-xs flex items-center justify-center">3</span>
                Payment Method
              </h2>
              <div className="space-y-3">
                <label className={`flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all ${formData.paymentMethod === 'MOMO' ? 'border-red-600 bg-red-50/50' : 'border-gray-200 hover:border-red-300'}`}>
                  <input type="radio" name="paymentMethod" value="MOMO" checked={formData.paymentMethod === 'MOMO'} onChange={handleInputChange} className="w-5 h-5 text-red-600 focus:ring-red-500" />
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-900">Mobile Money (MoMo)</h3>
                    <p className="text-sm text-gray-500">Pay securely via MTN, Telecel, or AT</p>
                  </div>
                  <CreditCard className={formData.paymentMethod === 'MOMO' ? 'text-red-600' : 'text-gray-400'} />
                </label>
                
                <label className={`flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all ${formData.paymentMethod === 'COD' ? 'border-red-600 bg-red-50/50' : 'border-gray-200 hover:border-red-300'}`}>
                  <input type="radio" name="paymentMethod" value="COD" checked={formData.paymentMethod === 'COD'} onChange={handleInputChange} className="w-5 h-5 text-red-600 focus:ring-red-500" />
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-900">Cash on Delivery</h3>
                    <p className="text-sm text-gray-500">Pay when your order arrives</p>
                  </div>
                  <Banknote className={formData.paymentMethod === 'COD' ? 'text-red-600' : 'text-gray-400'} />
                </label>
              </div>
            </div>

          </div>

          {/* Right Column - Order Summary */}
          <div className="lg:col-span-5 sticky top-24">
            <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-gray-100">
              <h2 className="text-xl font-bold mb-6">Order Summary</h2>
              
              <div className="space-y-4 mb-6 max-h-64 overflow-y-auto pr-2">
                {cart.map((item) => (
                  <div key={item.id} className="flex gap-4">
                    <div className="w-16 h-16 bg-gray-100 rounded-lg shrink-0 p-1 flex items-center justify-center">
                      <img src={item.image} alt={item.name} className="w-full h-full object-contain" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-sm text-gray-900 line-clamp-2">{item.name}</h4>
                      <p className="text-gray-500 text-xs mt-1">Qty: {item.quantity}</p>
                    </div>
                    <div className="font-bold text-sm text-gray-900 text-right">
                      GH₵{((item.salePrice || item.price) * item.quantity).toFixed(2)}
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t border-gray-100 pt-4 space-y-3 mb-6">
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Subtotal</span>
                  <span>GH₵{subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Delivery Fee</span>
                  <span>GH₵{deliveryFee.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-lg font-black text-gray-900 pt-2 border-t border-gray-100">
                  <span>Total</span>
                  <span className="text-red-600">GH₵{totalAmount.toFixed(2)}</span>
                </div>
              </div>

              {error && (
                <div className="mb-4 p-3 bg-red-50 text-red-600 text-sm rounded-lg">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={isProcessing}
                className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-4 rounded-xl transition shadow-sm flex items-center justify-center gap-2 disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                {isProcessing ? (
                  <>
                    <Loader2 size={20} className="animate-spin" />
                    <span>Processing...</span>
                  </>
                ) : (
                  <>
                    <ShieldCheck size={20} />
                    <span>Place Order • GH₵{totalAmount.toFixed(2)}</span>
                  </>
                )}
              </button>
              
              <div className="mt-4 flex items-center justify-center gap-2 text-xs text-gray-500 font-medium">
                <Truck size={14} /> Fast delivery across Ghana
              </div>
            </div>
          </div>
        </form>
      </div>

      {/* Mock MoMo Interactive Overlay */}
      {momoState !== 'idle' && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl shadow-2xl p-8 w-full max-w-sm text-center transform transition-all animate-in zoom-in-95 duration-200">
            {momoState === 'awaiting' ? (
              <>
                <div className="w-20 h-20 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Loader2 size={32} className="text-yellow-600 animate-spin" />
                </div>
                <h3 className="text-2xl font-black text-gray-900 mb-2">Awaiting Authorization</h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-6">
                  Please approve the transaction of <strong className="text-gray-900">GH₵{totalAmount.toFixed(2)}</strong> on your phone <br/>({formData.customerPhone}).
                </p>
                <div className="text-xs text-gray-400">Do not close this window.</div>
              </>
            ) : (
              <>
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle2 size={40} className="text-green-600" />
                </div>
                <h3 className="text-2xl font-black text-gray-900 mb-2">Payment Successful!</h3>
                <p className="text-gray-500 text-sm mb-6">Your transaction has been approved.</p>
                <div className="flex justify-center">
                  <Loader2 size={20} className="text-gray-300 animate-spin" />
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
