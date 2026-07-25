'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Handle login logic here
    };

    return (
        <main className="min-h-[80vh] flex items-center justify-center px-4 py-12">
            <div className="w-full max-w-md backdrop-blur-2xl bg-white/40 border border-white/80 rounded-3xl p-8 shadow-[0_8px_32px_rgba(0,0,0,0.04)] relative overflow-hidden">

                {/* Glow accent */}
                <div className="absolute -top-16 -right-16 w-40 h-40 bg-red-400/20 rounded-full blur-2xl pointer-events-none" />

                <div className="text-center mb-6">
                    <h1 className="text-2xl font-extrabold text-gray-900">Welcome Back</h1>
                    <p className="text-xs text-gray-600 mt-1">Log in to your Joe Rich Phones account</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-xs font-semibold text-gray-700 mb-1">Email or Phone Number</label>
                        <input
                            type="text"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="e.g. 024XXXXXXX or name@email.com"
                            className="w-full bg-white/60 backdrop-blur-md text-xs px-4 py-3 rounded-2xl border border-white/90 focus:outline-none focus:border-red-400 shadow-inner"
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-semibold text-gray-700 mb-1">Password</label>
                        <input
                            type="password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="••••••••"
                            className="w-full bg-white/60 backdrop-blur-md text-xs px-4 py-3 rounded-2xl border border-white/90 focus:outline-none focus:border-red-400 shadow-inner"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full py-3 bg-red-500/90 hover:bg-red-600 text-white font-semibold rounded-full text-xs transition shadow-md hover:shadow-lg active:scale-95"
                    >
                        Log In
                    </button>
                </form>

                <div className="text-center mt-6 text-xs text-gray-600">
                    Don't have an account?{' '}
                    <Link href="/register" className="font-bold text-red-600 hover:underline">
                        Create Account
                    </Link>
                </div>

            </div>
        </main>
    );
}
