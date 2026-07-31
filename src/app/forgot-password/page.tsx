import Link from 'next/link';
import { ArrowRight, KeyRound } from 'lucide-react';
import { requestPasswordReset } from '../login/actions';

export default async function ForgotPasswordPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string, message?: string }>;
}) {
  const { error, message } = await searchParams;

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        
        {/* Brand Logo/Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-3xl bg-gray-900 text-white shadow-xl shadow-gray-900/30 mb-6">
            <KeyRound size={32} />
          </div>
          <h1 className="text-3xl font-black tracking-tight text-gray-900">
            Reset Password
          </h1>
          <p className="text-sm font-medium text-gray-500 mt-2">
            Enter your email to receive a reset link
          </p>
        </div>

        {/* Forgot Password Card */}
        <div className="bg-white/70 backdrop-blur-xl p-8 rounded-3xl shadow-xl shadow-gray-200/50 border border-white">
          <form action={requestPasswordReset} className="space-y-5">
            {error && (
              <div className="bg-red-50 text-red-600 p-4 rounded-xl text-sm font-bold text-center border border-red-100">
                {error}
              </div>
            )}
            
            {message && (
              <div className="bg-green-50 text-green-700 p-4 rounded-xl text-sm font-bold text-center border border-green-200">
                {message}
              </div>
            )}

            <div>
              <label className="block text-xs font-black text-gray-400 uppercase tracking-wider mb-2">
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                placeholder="admin@joerich.com"
                className="w-full px-5 py-4 bg-gray-50/50 border border-gray-200 rounded-2xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all placeholder:text-gray-400"
              />
            </div>

            <button
              type="submit"
              className="w-full mt-6 bg-gray-900 hover:bg-black text-white font-bold py-4 rounded-2xl transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 flex items-center justify-center gap-2 group"
            >
              <span>Send Reset Link</span>
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </form>
        </div>

        {/* Footer */}
        <div className="text-center mt-8 space-y-4">
          <p className="text-sm font-medium text-gray-500">
            Remembered your password?{' '}
            <Link href="/login" className="text-red-600 font-bold hover:underline">
              Sign In
            </Link>
          </p>
          <Link href="/" className="inline-flex items-center text-xs font-bold text-gray-400 hover:text-gray-600 transition gap-1">
            <ArrowRight size={14} className="rotate-180" /> Back to Store
          </Link>
        </div>
      </div>
    </div>
  );
}
