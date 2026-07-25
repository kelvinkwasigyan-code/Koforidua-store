'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export default function RegisterPage() {
    const [formData, setFormData] = useState({
        fullName: '',
        phone: '',
        password: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Handle registration logic here
    };

    return (
        <main className="min-h-[80vh] flex items-center justify-center px-4 py-12">
            <div className="w-full max-w-md backdrop-blur-2xl bg-white/40 border border-white/80 rounded-3xl p-8 shadow-[0_8px_32px_rgba(0,0,0,0.04)] relative overflow-hidden">

                {/* Glow accent */}
                <div className="absolute -bottom-16 -left-16 w-40 h-40 bg-red-300/20 rounded-full blur-2xl pointer-events-none" />

                <div className="text-center mb-6">
                    <h1 className="text-2xl font-extrabold text-gray-900">Create Account</h1>
                    <p className="text-xs text-gray-600 mt-1">Join Joe Rich Phones & Accessories</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-xs font-semibold text-gray-700 mb-1">Full Name</label>
                        <input
                            type="text"
                            required
                            placeholder="e.g. Kwame Mensah"
                            value={formData.fullName}
                            onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                            className="w-full bg-white/60 backdrop-blur-md text-xs px-4 py-3 rounded-2xl border border-white/90 focus:outline-none focus:border-red-400 shadow-inner"
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-semibold text-gray-700 mb-1">Phone Number</label>
                        <input
                            type="tel"
                            required
                            placeholder="024 XXX XXXX"
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            className="w-full bg-white/60 backdrop-blur-md text-xs px-4 py-3 rounded-2xl border border-white/90 focus:outline-none focus:border-red-400 shadow-inner"
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-semibold text-gray-700 mb-1">Password</label>
                        <input
                            type="password"
                            required
                            placeholder="••••••••"
                            value={formData.password}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            className="w-full bg-white/60 backdrop-blur-md text-xs px-4 py-3 rounded-2xl border border-white/90 focus:outline-none focus:border-red-400 shadow-inner"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full py-3 bg-red-500/90 hover:bg-red-600 text-white font-semibold rounded-full text-xs transition shadow-md hover:shadow-lg active:scale-95"
                    >
                        Create Account
                    </button>
                </form>

                <div className="text-center mt-6 text-xs text-gray-600">
                    Already have an account?{' '}
                    <Link href="/login" className="font-bold text-red-600 hover:underline">
                        Log In
                    </Link>
                </div>

            </div>
        </main>
    );
}
