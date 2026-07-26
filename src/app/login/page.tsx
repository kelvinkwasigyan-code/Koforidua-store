'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Lock, Mail, Phone, User, Eye, EyeOff, ShieldCheck, ArrowRight, CheckCircle2 } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');

  // Form States
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');

  const handleAuthSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      if (mode === 'login') {
        // Save session
        const sessionUser = {
          name: identifier.includes('@') ? identifier.split('@')[0] : 'Customer',
          identifier,
          isLoggedIn: true,
        };
        localStorage.setItem('joerich_user', JSON.stringify(sessionUser));
        setSuccessMsg('Welcome back! Logging you in...');
        setTimeout(() => router.push('/'), 1200);
      } else {
        const sessionUser = {
          name: fullName || 'Customer',
          phone,
          identifier: phone,
          isLoggedIn: true,
        };
        localStorage.setItem('joerich_user', JSON.stringify(sessionUser));
        setSuccessMsg('Account created successfully! Welcome to Joerich Phones.');
        setTimeout(() => router.push('/'), 1200);
      }
    }, 800);
  };

  return (
    <main className="min-h-[85vh] bg-gradient-to-b from-gray-50 via-white to-gray-100 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md bg-white/80 backdrop-blur-2xl border border-gray-200/80 rounded-3xl p-8 shadow-xl relative overflow-hidden">

        {/* Ambient Glows */}
        <div className="absolute -top-20 -right-20 w-48 h-48 bg-red-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-20 -left-20 w-48 h-48 bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Brand Header */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-1.5 font-[family-name:var(--font-outfit)] text-2xl mb-2">
            <span className="font-black tracking-tighter bg-gradient-to-r from-gray-950 via-red-600 to-red-500 bg-clip-text text-transparent">
              Joerich
            </span>
            <span className="font-bold tracking-[0.18em] text-red-600 text-xs uppercase bg-red-50 px-2 py-0.5 rounded-md border border-red-200/80">
              PHONES
            </span>
          </Link>
          <p className="text-xs font-medium text-gray-500 mt-1">
            {mode === 'login' ? 'Access your account & track orders' : 'Join Joerich Phones for exclusive deals'}
          </p>
        </div>

        {/* Mode Tab Switcher */}
        <div className="bg-gray-100 p-1 rounded-2xl flex items-center mb-6 border border-gray-200/60">
          <button
            type="button"
            onClick={() => { setMode('login'); setSuccessMsg(''); }}
            className={`flex-1 py-2.5 text-xs font-extrabold rounded-xl transition-all ${
              mode === 'login'
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-500 hover:text-gray-900'
            }`}
          >
            Log In
          </button>
          <button
            type="button"
            onClick={() => { setMode('register'); setSuccessMsg(''); }}
            className={`flex-1 py-2.5 text-xs font-extrabold rounded-xl transition-all ${
              mode === 'register'
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-500 hover:text-gray-900'
            }`}
          >
            Sign Up
          </button>
        </div>

        {/* Success Alert */}
        {successMsg && (
          <div className="mb-5 p-3.5 bg-emerald-50 border border-emerald-200 rounded-2xl text-emerald-700 text-xs font-bold flex items-center gap-2 animate-fade-in">
            <CheckCircle2 size={16} className="text-emerald-600 shrink-0" />
            <span>{successMsg}</span>
          </div>
        )}

        <form onSubmit={handleAuthSubmit} className="space-y-4">
          {mode === 'register' && (
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1.5">Full Name</label>
              <div className="relative flex items-center">
                <User size={16} className="absolute left-3.5 text-gray-400" />
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="e.g. Kwame Mensah"
                  className="w-full bg-gray-50/80 text-xs pl-10 pr-4 py-3 rounded-2xl border border-gray-200 focus:outline-none focus:border-red-500 focus:bg-white transition-all font-medium"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1.5">
              {mode === 'login' ? 'Email or Phone Number' : 'Phone Number'}
            </label>
            <div className="relative flex items-center">
              {mode === 'login' ? (
                <Mail size={16} className="absolute left-3.5 text-gray-400" />
              ) : (
                <Phone size={16} className="absolute left-3.5 text-gray-400" />
              )}
              <input
                type="text"
                required
                value={mode === 'login' ? identifier : phone}
                onChange={(e) => mode === 'login' ? setIdentifier(e.target.value) : setPhone(e.target.value)}
                placeholder={mode === 'login' ? 'e.g. 0547654736 or name@email.com' : '054 XXX XXXX'}
                className="w-full bg-gray-50/80 text-xs pl-10 pr-4 py-3 rounded-2xl border border-gray-200 focus:outline-none focus:border-red-500 focus:bg-white transition-all font-medium"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1.5">Password</label>
            <div className="relative flex items-center">
              <Lock size={16} className="absolute left-3.5 text-gray-400" />
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-gray-50/80 text-xs pl-10 pr-10 py-3 rounded-2xl border border-gray-200 focus:outline-none focus:border-red-500 focus:bg-white transition-all font-medium"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 bg-red-600 hover:bg-red-700 text-white font-extrabold rounded-2xl text-sm transition shadow-lg shadow-red-600/30 flex items-center justify-center gap-2 active:scale-95 disabled:opacity-50"
          >
            {loading ? (
              <span>Processing...</span>
            ) : (
              <>
                <span>{mode === 'login' ? 'Log In to Account' : 'Create Account'}</span>
                <ArrowRight size={16} />
              </>
            )}
          </button>
        </form>

        {/* Footer Admin Link */}
        <div className="mt-8 pt-4 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500">
          <span>Are you an Administrator?</span>
          <Link href="/admin" className="font-bold text-red-600 hover:underline flex items-center gap-1">
            <ShieldCheck size={14} /> Admin Portal
          </Link>
        </div>

      </div>
    </main>
  );
}
