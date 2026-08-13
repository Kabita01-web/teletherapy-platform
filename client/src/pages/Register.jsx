import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { useAuth } from '../contexts/AuthContext';
import { Eye, EyeOff, AlertCircle } from 'lucide-react';

/**
 * Restyled to match Login.jsx and the rest of the site — same tokens,
 * type pairing, brand mark, and pill buttons. Logic (useAuth, state,
 * handleSubmit) is untouched.
 */

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState('client');
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      return setError('Passwords do not match');
    }

    if (!acceptTerms) {
      return setError('You must accept the Terms & Conditions');
    }

    setIsLoading(true);

    const result = await register(name, email, password, role);

    if (result.success) {
      // Typically we'd redirect to an onboarding page or dashboard
      navigate('/dashboard');
    } else {
      setError(result.error);
    }
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-surface-container-low bg-noise py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        className="max-w-md w-full bg-surface-container-lowest p-8 rounded-3xl shadow-sm border border-surface-variant my-8"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
              <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4 text-white" stroke="currentColor" strokeWidth={2.5}>
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
            </div>
            <span className="text-[22px] font-['Fraunces',serif] font-semibold text-primary leading-none tracking-tight">
              Inner Balance
            </span>
          </Link>
          <h2 className="mt-6 text-headline-lg font-['Fraunces',serif] font-medium text-on-background tracking-tight">
            Create an <span className="italic text-primary">account</span>
          </h2>
          <p className="mt-2 text-body-md font-['Plus_Jakarta_Sans',sans-serif] text-text-muted">
            Join us to start your journey
          </p>
        </div>

        {error && (
          <div className="mb-6 p-4 rounded-xl bg-error-container text-on-error-container flex items-start">
            <AlertCircle className="w-5 h-5 mr-3 mt-0.5 flex-shrink-0" />
            <span className="text-body-sm font-['Plus_Jakarta_Sans',sans-serif] font-medium">{error}</span>
          </div>
        )}

        <form className="space-y-5" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name" className="block text-body-sm font-['Plus_Jakarta_Sans',sans-serif] font-medium text-on-surface mb-1.5">
              Full Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="appearance-none block w-full px-4 py-3 border border-surface-variant rounded-xl placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-colors text-body-sm font-['Plus_Jakarta_Sans',sans-serif] bg-surface text-on-surface"
              placeholder="John Doe"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-body-sm font-['Plus_Jakarta_Sans',sans-serif] font-medium text-on-surface mb-1.5">
              Email Address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="appearance-none block w-full px-4 py-3 border border-surface-variant rounded-xl placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-colors text-body-sm font-['Plus_Jakarta_Sans',sans-serif] bg-surface text-on-surface"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-body-sm font-['Plus_Jakarta_Sans',sans-serif] font-medium text-on-surface mb-1.5">
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="appearance-none block w-full px-4 py-3 border border-surface-variant rounded-xl placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-colors text-body-sm font-['Plus_Jakarta_Sans',sans-serif] bg-surface text-on-surface pr-10"
                placeholder="••••••••"
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-text-muted hover:text-on-surface transition-colors"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>
          </div>

          <div>
            <label htmlFor="confirmPassword" className="block text-body-sm font-['Plus_Jakarta_Sans',sans-serif] font-medium text-on-surface mb-1.5">
              Confirm Password
            </label>
            <div className="relative">
              <input
                id="confirmPassword"
                name="confirmPassword"
                type={showConfirmPassword ? 'text' : 'password'}
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="appearance-none block w-full px-4 py-3 border border-surface-variant rounded-xl placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-colors text-body-sm font-['Plus_Jakarta_Sans',sans-serif] bg-surface text-on-surface pr-10"
                placeholder="••••••••"
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-text-muted hover:text-on-surface transition-colors"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>
          </div>

          <div>
            <label className="block text-body-sm font-['Plus_Jakarta_Sans',sans-serif] font-medium text-on-surface mb-3">
              I am a...
            </label>
            <div className="grid grid-cols-2 gap-4">
              <label
                className={`cursor-pointer flex items-center justify-center px-4 py-3 border rounded-xl text-body-sm font-['Plus_Jakarta_Sans',sans-serif] font-medium transition-colors ${
                  role === 'client'
                    ? 'border-primary bg-primary/5 text-primary'
                    : 'border-surface-variant text-text-muted hover:bg-surface-container'
                }`}
              >
                <input
                  type="radio"
                  name="role"
                  value="client"
                  checked={role === 'client'}
                  onChange={(e) => setRole(e.target.value)}
                  className="sr-only"
                />
                Client
              </label>
              <label
                className={`cursor-pointer flex items-center justify-center px-4 py-3 border rounded-xl text-body-sm font-['Plus_Jakarta_Sans',sans-serif] font-medium transition-colors ${
                  role === 'therapist'
                    ? 'border-primary bg-primary/5 text-primary'
                    : 'border-surface-variant text-text-muted hover:bg-surface-container'
                }`}
              >
                <input
                  type="radio"
                  name="role"
                  value="therapist"
                  checked={role === 'therapist'}
                  onChange={(e) => setRole(e.target.value)}
                  className="sr-only"
                />
                Therapist
              </label>
            </div>
          </div>

          <div className="flex items-start mt-6">
            <div className="flex items-center h-5">
              <input
                id="terms"
                name="terms"
                type="checkbox"
                checked={acceptTerms}
                onChange={(e) => setAcceptTerms(e.target.checked)}
                className="h-4 w-4 text-primary focus:ring-primary border-surface-variant rounded mt-0.5"
              />
            </div>
            <div className="ml-3 text-body-sm font-['Plus_Jakarta_Sans',sans-serif]">
              <label htmlFor="terms" className="text-text-muted">
                I agree to the{' '}
                <Link to="/terms" className="font-semibold text-primary hover:text-primary-container">
                  Terms & Conditions
                </Link>{' '}
                and{' '}
                <Link to="/privacy" className="font-semibold text-primary hover:text-primary-container">
                  Privacy Policy
                </Link>
              </label>
            </div>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full flex justify-center py-3.5 px-4 rounded-full text-label-md font-['Plus_Jakarta_Sans',sans-serif] font-semibold text-on-primary bg-primary hover:bg-primary-container hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary shadow-sm transition-all duration-300 ${
                isLoading ? 'opacity-75 cursor-not-allowed hover:translate-y-0' : ''
              }`}
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-on-primary border-t-transparent rounded-full animate-spin" />
              ) : (
                'Create Account'
              )}
            </button>
          </div>
        </form>

        <div className="mt-8 text-center">
          <p className="text-body-sm font-['Plus_Jakarta_Sans',sans-serif] text-text-muted">
            Already have an account?{' '}
            <Link to="/login" className="font-semibold text-primary hover:text-primary-container transition-colors">
              Sign in
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}