'use client';

import React from 'react';

export default function TrustBadges() {
    return (
        <section className="py-16 px-4 max-w-7xl mx-auto">
            {/* Main Glass Card */}
            <div className="backdrop-blur-2xl bg-white/40 border border-white/80 rounded-3xl p-8 sm:p-12 shadow-[0_8px_32px_rgba(0,0,0,0.04)] relative overflow-hidden">

                {/* Soft Red Ambient Glow */}
                <div className="absolute -top-24 -right-24 w-72 h-72 bg-red-400/20 rounded-full blur-3xl pointer-events-none" />
                <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-red-300/20 rounded-full blur-3xl pointer-events-none" />

                <div className="relative z-10 max-w-3xl mx-auto text-center space-y-6">

                    {/* Badge */}
                    <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold bg-red-500/10 text-red-600 border border-red-200/50 backdrop-blur-md">
                        About Us
                    </span>

                    {/* Heading */}
                    <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
                        Joe Rich Phones & Accessories
                    </h2>

                    {/* Description */}
                    <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                        Your trusted destination for genuine smartphones, tablets, smart wearables, and premium mobile accessories in Ghana. We bring you top-tier tech at competitive prices with fast, reliable delivery and seamless payment options.
                    </p>

                    {/* Feature Badges Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6">

                        <div className="backdrop-blur-md bg-white/60 border border-white/90 rounded-2xl p-4 shadow-sm text-center">
                            <div className="text-2xl mb-1">📱</div>
                            <h3 className="font-bold text-gray-800 text-sm">100% Authentic</h3>
                            <p className="text-xs text-gray-500 mt-0.5">Original brand devices</p>
                        </div>

                        <div className="backdrop-blur-md bg-white/60 border border-white/90 rounded-2xl p-4 shadow-sm text-center">
                            <div className="text-2xl mb-1">🚚</div>
                            <h3 className="font-bold text-gray-800 text-sm">Ghana-Wide Delivery</h3>
                            <p className="text-xs text-gray-500 mt-0.5">Fast & secure shipping</p>
                        </div>

                        <div className="backdrop-blur-md bg-white/60 border border-white/90 rounded-2xl p-4 shadow-sm text-center">
                            <div className="text-2xl mb-1">💳</div>
                            <h3 className="font-bold text-gray-800 text-sm">MoMo & Cards</h3>
                            <p className="text-xs text-gray-500 mt-0.5">Easy mobile payments</p>
                        </div>

                    </div>

                </div>
            </div>
        </section>
    );
}
