import Link from 'next/link';
import { ArrowRight, LockKeyhole } from 'lucide-react';
import { updatePassword } from '../login/actions';
import { redirect } from 'next/navigation';

export default async function ResetPasswordPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string, token?: string }>;
}) {
  const { error, token } = await searchParams;

  // Wait, Supabase reset flow:
  // When a user clicks the recovery link, Supabase redirects them to the app.
  // The session is usually set in the URL hash, which the client needs to read, or the server reads the code in `/auth/callback`.
  // If we are using a custom link `reset-password?token=...`, we might need to handle it.
  // For now, we will assume standard session exists or token is passed.

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        
        {/* Brand Logo/Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-3xl bg-red-600 text-white shadow-xl shadow-red-600/30 mb-6">
            <LockKeyhole size={32} />
          </div>
          <h1 className="text-3xl font-black tracking-tight text-gray-900">
            Set New Password
          </h1>
          <p className="text-sm font-medium text-gray-500 mt-2">
            Please enter your new password below
          </p>
        </div>

        {/* Reset Password Card */}
        <div className="bg-white/70 backdrop-blur-xl p-8 rounded-3xl shadow-xl shadow-gray-200/50 border border-white">
          <form className="space-y-5">
            {error && (
              <div className="bg-red-50 text-red-600 p-4 rounded-xl text-sm font-bold text-center border border-red-100">
                {error}
              </div>
            )}

            <input type="hidden" name="token" value={token || ''} />

            <div>
              <label className="block text-xs font-black text-gray-400 uppercase tracking-wider mb-2">
                New Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                placeholder="••••••••"
                minLength={6}
                className="w-full px-5 py-4 bg-gray-50/50 border border-gray-200 rounded-2xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent transition-all placeholder:text-gray-400"
              />
            </div>

            <div>
              <label className="block text-xs font-black text-gray-400 uppercase tracking-wider mb-2">
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                required
                placeholder="••••••••"
                minLength={6}
                className="w-full px-5 py-4 bg-gray-50/50 border border-gray-200 rounded-2xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent transition-all placeholder:text-gray-400"
              />
            </div>

            <button
              formAction={updatePassword}
              className="w-full mt-6 bg-red-600 hover:bg-red-700 text-white font-bold py-4 rounded-2xl transition-all shadow-lg shadow-red-600/30 hover:shadow-xl hover:-translate-y-0.5 flex items-center justify-center gap-2 group"
            >
              <span>Update Password</span>
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
