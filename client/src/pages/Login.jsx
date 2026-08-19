import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import { useAuth } from "../contexts/AuthContext";
import { Eye, EyeOff, AlertCircle } from "lucide-react";

/**
 * Restyled to match the rest of the site: same surface/primary tokens as
 * Navbar/Hero/About (bg-surface-container-low, border-surface-variant,
 * etc. instead of the old bg-background/border-outline set), the
 * Fraunces/Plus Jakarta Sans type pairing, the same brand mark used in
 * Navbar, and the pill-shaped buttons used everywhere else on the site.
 * Logic (useAuth, state, handleSubmit) is untouched.
 */

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    const result = await login(email, password);

    if (result.success) {
      // Typically we'd check the role and redirect accordingly
      // For now, let's redirect to a dashboard
      navigate("/");
    } else {
      setError(result.error);
    }
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-surface-container-low bg-noise py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        className="max-w-md w-full bg-surface-container-lowest p-8 rounded-3xl shadow-sm border border-surface-variant"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                className="w-4 h-4 text-white"
                stroke="currentColor"
                strokeWidth={2.5}
              >
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
            Welcome <span className="italic text-primary">back</span>
          </h2>
          <p className="mt-2 text-body-md font-['Plus_Jakarta_Sans',sans-serif] text-text-muted">
            Please enter your details to sign in
          </p>
        </div>

        {error && (
          <div className="mb-6 p-4 rounded-xl bg-error-container text-on-error-container flex items-start">
            <AlertCircle className="w-5 h-5 mr-3 mt-0.5 flex-shrink-0" />
            <span className="text-body-sm font-['Plus_Jakarta_Sans',sans-serif] font-medium">
              {error}
            </span>
          </div>
        )}

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="email"
              className="block text-body-sm font-['Plus_Jakarta_Sans',sans-serif] font-medium text-on-surface mb-1.5"
            >
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
            <label
              htmlFor="password"
              className="block text-body-sm font-['Plus_Jakarta_Sans',sans-serif] font-medium text-on-surface mb-1.5"
            >
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
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
                {showPassword ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="h-4 w-4 text-primary focus:ring-primary border-surface-variant rounded"
              />
              <label
                htmlFor="remember-me"
                className="ml-2 block text-body-sm font-['Plus_Jakarta_Sans',sans-serif] text-text-muted"
              >
                Remember me
              </label>
            </div>

            <div className="text-body-sm">
              <Link
                to="/forgot-password"
                className="font-['Plus_Jakarta_Sans',sans-serif] font-semibold text-primary hover:text-primary-container transition-colors"
              >
                Forgot password?
              </Link>
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full flex justify-center py-3.5 px-4 rounded-full text-label-md font-['Plus_Jakarta_Sans',sans-serif] font-semibold text-on-primary bg-primary hover:bg-primary-container hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary shadow-sm transition-all duration-300 ${
                isLoading
                  ? "opacity-75 cursor-not-allowed hover:translate-y-0"
                  : ""
              }`}
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-on-primary border-t-transparent rounded-full animate-spin" />
              ) : (
                "Sign in"
              )}
            </button>
          </div>
        </form>

        <div className="mt-8 text-center">
          <p className="text-body-sm font-['Plus_Jakarta_Sans',sans-serif] text-text-muted">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="font-semibold text-primary hover:text-primary-container transition-colors"
            >
              Sign up for free
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
