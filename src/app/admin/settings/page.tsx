'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ExternalLink, Store, ShoppingBag, MapPin, Phone, Mail, RotateCcw, ShieldCheck, CheckCircle2, LogOut } from 'lucide-react';

export default function AdminSettingsPage() {
  const router = useRouter();
  const [storeName, setStoreName] = useState('Joerich Phones');
  const [phone, setPhone] = useState('0547654736');
  const [location, setLocation] = useState('Koforidua, Accra Station');
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [restoringDefaults, setRestoringDefaults] = useState(false);

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  const handleRestoreDefaults = async () => {
    setRestoringDefaults(true);
    try {
      await fetch('/api/admin/restore-defaults');
      alert('Default showcase products restored successfully!');
    } catch (e) {
      console.error(e);
    } finally {
      setRestoringDefaults(false);
    }
  };

  const handleSignOut = () => {
    localStorage.removeItem('joerich_user');
    localStorage.removeItem('admin_session');
    router.push('/');
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Header Title */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-gray-900 dark:text-white tracking-tight">Admin Portal Settings</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Manage store preferences and redirect to the customer portal.</p>
        </div>
        <button
          onClick={handleSignOut}
          className="px-5 py-2.5 bg-red-50 hover:bg-red-100 text-red-600 dark:bg-red-950/40 dark:hover:bg-red-900/50 dark:text-red-400 font-extrabold text-xs rounded-2xl transition border border-red-200 dark:border-red-900 flex items-center gap-2 active:scale-95 shrink-0"
        >
          <LogOut size={16} />
          <span>Sign Out to Dashboard</span>
        </button>
      </div>

      {/* PROMINENT CUSTOMER SHOP PORTAL REDIRECT CARD */}
      <div className="bg-gradient-to-r from-red-600 via-red-500 to-rose-600 rounded-3xl p-6 sm:p-8 text-white shadow-xl shadow-red-600/20 relative overflow-hidden flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="relative z-10 max-w-xl space-y-2">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-white">
            <Store size={14} /> Customer Portal Switch
          </div>
          <h2 className="text-2xl sm:text-3xl font-black tracking-tight">Visit Customer Shop Front</h2>
          <p className="text-white/90 text-sm leading-relaxed">
            Redirect to your live customer-facing storefront to view available devices, test the shopping cart, wishlist, and customer checkout experience.
          </p>
        </div>

        <div className="relative z-10 flex flex-col sm:flex-row items-center gap-3 shrink-0 w-full md:w-auto">
          <Link
            href="/"
            className="w-full sm:w-auto px-6 py-3.5 bg-white hover:bg-gray-100 text-red-600 font-extrabold text-sm rounded-2xl transition shadow-lg flex items-center justify-center gap-2 active:scale-95"
          >
            <ShoppingBag size={18} /> Open Live Shop Portal
          </Link>
          <Link
            href="/products"
            className="w-full sm:w-auto px-5 py-3.5 bg-red-700/60 hover:bg-red-800/80 text-white font-bold text-sm rounded-2xl transition border border-white/20 flex items-center justify-center gap-2 active:scale-95"
          >
            <span>Browse Products</span>
            <ExternalLink size={16} />
          </Link>
        </div>
      </div>

      {/* Saved Notification */}
      {savedSuccess && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl text-emerald-700 text-xs font-bold flex items-center gap-2 animate-fade-in">
          <CheckCircle2 size={18} className="text-emerald-600 shrink-0" />
          <span>Settings saved successfully!</span>
        </div>
      )}

      {/* Store Information Form */}
      <div className="bg-white dark:bg-gray-900 rounded-3xl border border-gray-200 dark:border-gray-800 p-6 sm:p-8 shadow-sm space-y-6">
        <div className="border-b border-gray-100 dark:border-gray-800 pb-4">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white">General Store Information</h3>
          <p className="text-xs text-gray-500 mt-0.5">Primary contact details shown to customers in the store footer.</p>
        </div>

        <form onSubmit={handleSaveSettings} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-2">Store Name</label>
            <div className="relative flex items-center">
              <Store size={16} className="absolute left-3.5 text-gray-400" />
              <input
                type="text"
                value={storeName}
                onChange={(e) => setStoreName(e.target.value)}
                className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl pl-10 pr-4 py-3 text-xs font-semibold text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-2">Customer Service Phone</label>
            <div className="relative flex items-center">
              <Phone size={16} className="absolute left-3.5 text-gray-400" />
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl pl-10 pr-4 py-3 text-xs font-semibold text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>
          </div>

          <div className="md:col-span-2">
            <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-2">Store Location</label>
            <div className="relative flex items-center">
              <MapPin size={16} className="absolute left-3.5 text-gray-400" />
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl pl-10 pr-4 py-3 text-xs font-semibold text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>
          </div>

          <div className="md:col-span-2 flex items-center justify-end gap-3 pt-2">
            <button
              type="submit"
              className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-bold text-xs rounded-2xl shadow-lg shadow-red-600/30 transition active:scale-95"
            >
              Save Store Info
            </button>
          </div>
        </form>
      </div>

      {/* Maintenance & Data Actions */}
      <div className="bg-white dark:bg-gray-900 rounded-3xl border border-gray-200 dark:border-gray-800 p-6 sm:p-8 shadow-sm space-y-4">
        <div className="border-b border-gray-100 dark:border-gray-800 pb-4">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white">Database Maintenance</h3>
          <p className="text-xs text-gray-500 mt-0.5">Quick data operations for sample inventory management.</p>
        </div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-2xl border border-gray-200/60 dark:border-gray-700/60">
          <div>
            <h4 className="text-sm font-bold text-gray-900 dark:text-white">Restore Showcase Products</h4>
            <p className="text-xs text-gray-500 mt-0.5">Reset database with official showcase devices (iPhone 16 Pro Max, Apple Watch, iPad Pro, etc.).</p>
          </div>
          <button
            onClick={handleRestoreDefaults}
            disabled={restoringDefaults}
            className="px-4 py-2.5 bg-gray-900 hover:bg-black dark:bg-gray-700 dark:hover:bg-gray-600 text-white text-xs font-bold rounded-xl transition flex items-center gap-2 active:scale-95 shrink-0"
          >
            <RotateCcw size={14} />
            <span>{restoringDefaults ? 'Restoring...' : 'Restore Showcase Inventory'}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
