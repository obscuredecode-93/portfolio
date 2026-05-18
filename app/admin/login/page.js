'use client';

import { useState, Suspense } from 'react';
import { signIn } from 'next-auth/react';
import { useSearchParams } from 'next/navigation';

// useSearchParams() must be in a component wrapped by <Suspense> in Next.js 15.
function LoginForm() {
  const searchParams = useSearchParams();
  const isError = searchParams.get('error') === 'CredentialsSignin';

  const [email, setEmail]       = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading]   = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    await signIn('credentials', {
      email,
      password,
      callbackUrl: '/admin/projects',
    });
    setLoading(false);
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="glass rounded-2xl p-10 w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold gradient-text mb-2">Admin Access</h1>
          <p className="text-white/50 text-sm">Portfolio management dashboard</p>
        </div>

        {/* Error */}
        {isError && (
          <div className="mb-6 px-4 py-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-sm text-center">
            Invalid credentials. Please try again.
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-white/70 text-sm mb-2 font-medium">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full glass rounded-lg px-4 py-3 text-white placeholder-white/30 text-sm
                         focus:outline-none focus:border-cyan/50 focus:ring-1 focus:ring-cyan/30
                         border-transparent transition"
              placeholder="admin@example.com"
            />
          </div>

          <div>
            <label className="block text-white/70 text-sm mb-2 font-medium">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full glass rounded-lg px-4 py-3 text-white placeholder-white/30 text-sm
                         focus:outline-none focus:border-cyan/50 focus:ring-1 focus:ring-cyan/30
                         border-transparent transition"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full btn-primary text-center disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Signing in…' : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  );
}

// Suspense wrapper required by Next.js 15 for any component using useSearchParams().
export default function AdminLogin() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="glass rounded-2xl p-10 w-full max-w-md animate-pulse">
          <div className="skeleton h-8 w-40 mx-auto rounded mb-4" />
          <div className="skeleton h-4 w-32 mx-auto rounded" />
        </div>
      </div>
    }>
      <LoginForm />
    </Suspense>
  );
}
