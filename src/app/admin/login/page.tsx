'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Lock, Mail, ShieldCheck, ArrowRight } from 'lucide-react';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (res.ok) {
        router.push('/admin');
      } else {
        const data = await res.json();
        setError(data.error || 'Login failed');
      }
    } catch (err) {
      setError('Connection error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div 
      className="min-h-screen flex items-center justify-center px-4 font-sans relative overflow-hidden bg-cover bg-center bg-no-repeat bg-fixed"
      style={{ backgroundImage: "url('/store-background.jpg')" }}
    >
      {/* Ultra-Light Transparent Overlay */}
      <div className="absolute inset-0 bg-black/20 pointer-events-none" />

      {/* Soft Ambient Background Orbs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-red-500/10 dark:bg-red-600/15 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-rose-400/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-md w-full bg-white/90 dark:bg-slate-900/90 backdrop-blur-2xl border border-gray-200/80 dark:border-white/10 rounded-3xl shadow-xl p-8 relative z-10 space-y-6">
        
        {/* Header */}
        <div className="text-center space-y-2">
          <Link href="/" className="inline-flex items-center gap-1.5 font-[family-name:var(--font-outfit)] text-2xl mb-1">
            <span className="font-black tracking-tighter text-gray-900 dark:text-white">
              Joerich
            </span>
            <span className="font-bold tracking-[0.18em] text-red-600 text-xs uppercase bg-red-50 dark:bg-red-950/50 px-2 py-0.5 rounded-md border border-red-200/80 dark:border-red-900/50">
              CONSOLE
            </span>
          </Link>
          <h1 className="text-xl font-extrabold text-gray-900 dark:text-white tracking-tight">Admin Portal Access</h1>
          <p className="text-xs text-gray-500 dark:text-gray-400">Sign in to access Joel Arhin's Admin Console.</p>
        </div>

        {error && (
          <div className="bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900/50 text-red-600 dark:text-red-400 text-xs font-bold p-3.5 rounded-2xl text-center shadow-2xs">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-[11px] font-extrabold uppercase tracking-wider text-gray-600 dark:text-gray-400 mb-1.5">
              Email Address
            </label>
            <div className="relative">
              <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
              <input 
                type="email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                required
                className="w-full bg-gray-50/80 dark:bg-slate-800/80 border border-gray-200 dark:border-gray-700/80 text-gray-900 dark:text-white rounded-2xl pl-10 pr-4 py-3 text-sm focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600 transition"
                placeholder="admin@joerichphones.com"
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-extrabold uppercase tracking-wider text-gray-600 dark:text-gray-400 mb-1.5">
              Password
            </label>
            <div className="relative">
              <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
              <input 
                type="password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                required
                className="w-full bg-gray-50/80 dark:bg-slate-800/80 border border-gray-200 dark:border-gray-700/80 text-gray-900 dark:text-white rounded-2xl pl-10 pr-4 py-3 text-sm focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600 transition"
                placeholder="••••••••"
              />
            </div>
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 text-white font-extrabold text-sm py-3.5 rounded-2xl shadow-lg shadow-red-600/25 transition active:scale-95 flex items-center justify-center gap-2 disabled:opacity-50"
          >
            <span>{loading ? 'Authenticating...' : 'Access Dashboard'}</span>
            <ArrowRight size={16} />
          </button>
        </form>

        <div className="text-center pt-2">
          <Link href="/" className="text-xs font-bold text-gray-500 hover:text-red-600 transition">
            ← Return to Storefront
          </Link>
        </div>
      </div>
    </div>
  );
}
