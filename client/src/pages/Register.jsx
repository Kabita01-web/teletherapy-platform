import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Eye, EyeOff, AlertCircle } from 'lucide-react';

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
    <div className="min-h-screen flex items-center justify-center bg-background py-12 px-4 sm:px-6 lg:px-8 font-body-md text-text-primary">
      <div className="max-w-md w-full bg-surface p-8 rounded-2xl shadow-sm border border-outline my-8">
        <div className="text-center mb-8">
          <Link to="/" className="text-2xl font-headline-md text-primary tracking-tight">
            Teletherapy
          </Link>
          <h2 className="mt-6 text-3xl font-headline-lg text-text-primary">
            Create an account
          </h2>
          <p className="mt-2 text-text-secondary font-body-md">
            Join us to start your journey
          </p>
        </div>

        {error && (
          <div className="mb-6 p-4 rounded-lg bg-error-container text-on-error-container flex items-start">
            <AlertCircle className="w-5 h-5 mr-3 mt-0.5 flex-shrink-0" />
            <span className="text-sm font-medium">{error}</span>
          </div>
        )}

        <form className="space-y-5" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-text-primary mb-1.5">
              Full Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="appearance-none block w-full px-4 py-3 border border-outline rounded-lg placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-colors sm:text-sm bg-surface"
              placeholder="John Doe"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-text-primary mb-1.5">
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
              className="appearance-none block w-full px-4 py-3 border border-outline rounded-lg placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-colors sm:text-sm bg-surface"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-text-primary mb-1.5">
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
                className="appearance-none block w-full px-4 py-3 border border-outline rounded-lg placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-colors sm:text-sm bg-surface pr-10"
                placeholder="••••••••"
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-text-muted hover:text-text-primary"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>
          </div>

          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-text-primary mb-1.5">
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
                className="appearance-none block w-full px-4 py-3 border border-outline rounded-lg placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-colors sm:text-sm bg-surface pr-10"
                placeholder="••••••••"
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-text-muted hover:text-text-primary"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-text-primary mb-3">
              I am a...
            </label>
            <div className="grid grid-cols-2 gap-4">
              <label
                className={`cursor-pointer flex items-center justify-center px-4 py-3 border rounded-lg text-sm font-medium transition-colors ${
                  role === 'client'
                    ? 'border-primary bg-primary/5 text-primary'
                    : 'border-outline text-text-secondary hover:bg-surface-container'
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
                className={`cursor-pointer flex items-center justify-center px-4 py-3 border rounded-lg text-sm font-medium transition-colors ${
                  role === 'therapist'
                    ? 'border-primary bg-primary/5 text-primary'
                    : 'border-outline text-text-secondary hover:bg-surface-container'
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
                className="h-4 w-4 text-primary focus:ring-primary border-outline rounded mt-0.5"
              />
            </div>
            <div className="ml-3 text-sm">
              <label htmlFor="terms" className="text-text-secondary">
                I agree to the{' '}
                <Link to="/terms" className="font-medium text-primary hover:text-primary-container">
                  Terms & Conditions
                </Link>{' '}
                and{' '}
                <Link to="/privacy" className="font-medium text-primary hover:text-primary-container">
                  Privacy Policy
                </Link>
              </label>
            </div>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-on-primary bg-primary hover:bg-primary-container focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors ${
                isLoading ? 'opacity-75 cursor-not-allowed' : ''
              }`}
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-on-primary border-t-transparent rounded-full animate-spin"></div>
              ) : (
                'Create Account'
              )}
            </button>
          </div>
        </form>

        <div className="mt-8 text-center">
          <p className="text-sm text-text-secondary">
            Already have an account?{' '}
            <Link to="/login" className="font-medium text-primary hover:text-primary-container transition-colors">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
