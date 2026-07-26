'use client';

import { useSearchParams } from 'next/navigation';
import { CheckCircle2, Package, ArrowRight, Home } from 'lucide-react';
import Link from 'next/link';
import { Suspense } from 'react';

function SuccessContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get('orderId');

  return (
    <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 sm:p-12 text-center max-w-lg w-full relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-green-50 to-white -z-10" />
      
      <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm">
        <CheckCircle2 size={40} className="text-green-600" />
      </div>
      
      <h1 className="text-3xl font-black text-gray-900 tracking-tight mb-3">Order Confirmed!</h1>
      <p className="text-gray-500 mb-8 leading-relaxed">
        Thank you for shopping with Joe Rich Phones. Your order has been successfully placed and is being processed.
      </p>

      {orderId && (
        <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 mb-8">
          <p className="text-xs text-gray-500 uppercase font-bold tracking-wider mb-1">Order Reference</p>
          <p className="text-lg font-mono font-bold text-gray-900">{orderId}</p>
        </div>
      )}

      <div className="flex justify-center">
        <Link 
          href="/" 
          className="w-full bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 text-white font-extrabold py-3.5 rounded-2xl shadow-lg shadow-red-600/25 transition flex items-center justify-center gap-2 active:scale-95"
        >
          <Home size={18} />
          <span>Continue Shopping</span>
        </Link>
      </div>
    </div>
  );
}

export default function CheckoutSuccessPage() {
  return (
    <div className="min-h-[80vh] bg-gray-50 flex items-center justify-center p-4">
      <Suspense fallback={<div className="text-gray-500">Loading your receipt...</div>}>
        <SuccessContent />
      </Suspense>
    </div>
  );
}
