'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FiUser, FiMail, FiLock, FiEye, FiEyeOff } from 'react-icons/fi';
import toast, { Toaster } from 'react-hot-toast';
import { authClient } from '@/lib/auth-client';

export default function RegisterPage() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match!');
      return;
    }

    setLoading(true);

    try {
      const { data, error } = await authClient.signUp.email({
        name: formData.fullName,
        email: formData.email,
        password: formData.password,
        callbackURL: '/auth/login',
      });

      if (error) {
        toast.error(error.message || error.statusText || 'Registration failed. Please try again.');
        setLoading(false);
        return;
      }

      toast.success('Account created successfully! Redirecting...');

      setTimeout(() => {
        router.push('/auth/login');
      }, 1500);

    } catch (error) {
      toast.error(error?.message || 'Something went wrong. Please try again.');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex items-center justify-center px-4 py-12">
      <Toaster position="top-center" toastOptions={{ style: { background: '#27272a', color: '#fff' } }} />

      <div className="w-full max-w-md space-y-8 bg-zinc-900/60 p-8 rounded-2xl border border-zinc-800 backdrop-blur-sm">
        
        <div className="text-center space-y-3">
          <Link href="/" className="inline-block">
            <div className="w-8 h-8 rotate-45 border-2 border-zinc-100 flex items-center justify-center overflow-hidden mx-auto mb-2">
              <div className="w-1/2 h-full bg-zinc-100 mr-auto" />
            </div>
          </Link>
          <h2 className="text-2xl font-bold tracking-wide text-white">Create an Account</h2>
          <p className="text-sm text-zinc-400">Join us to start exploring our collections</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-1">
            <label className="text-xs font-medium text-zinc-400">Full Name</label>
            <div className="relative flex items-center bg-zinc-800 rounded-lg overflow-hidden border border-zinc-700/50 focus-within:border-zinc-500 transition-colors">
              <FiUser className="w-5 h-5 text-zinc-400 ml-3.5 shrink-0" />
              <input
                type="text"
                name="fullName"
                required
                value={formData.fullName}
                onChange={handleChange}
                placeholder="John Doe"
                className="w-full bg-transparent px-3 py-3 text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-medium text-zinc-400">Email Address</label>
            <div className="relative flex items-center bg-zinc-800 rounded-lg overflow-hidden border border-zinc-700/50 focus-within:border-zinc-500 transition-colors">
              <FiMail className="w-5 h-5 text-zinc-400 ml-3.5 shrink-0" />
              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                placeholder="you@example.com"
                className="w-full bg-transparent px-3 py-3 text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-medium text-zinc-400">Password</label>
            <div className="relative flex items-center bg-zinc-800 rounded-lg overflow-hidden border border-zinc-700/50 focus-within:border-zinc-500 transition-colors">
              <FiLock className="w-5 h-5 text-zinc-400 ml-3.5 shrink-0" />
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                required
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                className="w-full bg-transparent px-3 py-3 text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="pr-3.5 text-zinc-400 hover:text-zinc-200 focus:outline-none"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <FiEyeOff className="w-5 h-5" /> : <FiEye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-medium text-zinc-400">Confirm Password</label>
            <div className="relative flex items-center bg-zinc-800 rounded-lg overflow-hidden border border-zinc-700/50 focus-within:border-zinc-500 transition-colors">
              <FiLock className="w-5 h-5 text-zinc-400 ml-3.5 shrink-0" />
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                name="confirmPassword"
                required
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="••••••••"
                className="w-full bg-transparent px-3 py-3 text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="pr-3.5 text-zinc-400 hover:text-zinc-200 focus:outline-none"
                aria-label={showConfirmPassword ? 'Hide confirm password' : 'Show confirm password'}
              >
                {showConfirmPassword ? <FiEyeOff className="w-5 h-5" /> : <FiEye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-full bg-zinc-100 text-zinc-950 font-medium text-sm hover:bg-zinc-200 transition-colors duration-200 mt-2 disabled:opacity-50"
          >
            {loading ? 'Creating Account...' : 'Create Account'}
          </button>
        </form>

        <p className="text-center text-xs text-zinc-400">
          Already have an account?{' '}
          <Link href="/auth/login" className="text-zinc-200 font-medium underline underline-offset-4 hover:text-white">
            Log in
          </Link>
        </p>

      </div>
    </div>
  );
}