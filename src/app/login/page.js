'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { useAuth } from '@/contexts/AuthContext';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const { login, isAuthenticated } = useAuth();
  const router = useRouter();

  // Redirect if already logged in
  useEffect(() => {
    if (isAuthenticated()) {
      router.push('/');
    }
  }, [isAuthenticated, router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Basic validation
    if (!email || !password) {
      setError('Please fill in all fields');
      setIsLoading(false);
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address');
      setIsLoading(false);
      return;
    }

    try {
      const result = await login(email, password, rememberMe);
      
      if (result.success) {
        // Redirect to home page
        router.push('/');
      } else {
        setError(result.error || 'Login failed. Please try again.');
      }
    } catch (err) {
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <main className="login-page-container">
        <div className="login-page-wrapper">
          {/* Left Section - Welcome Message */}
          <div className="login-welcome-section">
            <div className="login-welcome-content">
              <Link href="/" className="login-logo-link">
                <Image
                  src="/assets/logo.png"
                  alt="Finesse Logo"
                  width={180}
                  height={72}
                  className="login-logo"
                  unoptimized
                />
              </Link>
              
              <h1 className="login-welcome-title">
                Hello, <span className="login-welcome-accent">welcome!</span>
              </h1>
              
              <p className="login-welcome-tagline">
                Crafting timeless elegance, one piece at a time.
              </p>
            </div>
            
            {/* Decorative Background Elements */}
            <div className="login-welcome-pattern"></div>
            <div className="login-welcome-squares"></div>
            <div className="login-welcome-chevrons"></div>
          </div>

          {/* Right Section - Login Form */}
          <div className="login-form-section">
            {/* Decorative Background Elements */}
            <div className="login-form-chevrons"></div>
            
            <div className="login-form-card">
              <h2 className="login-form-title">Log In</h2>
              
              <p className="login-signup-prompt">
                Don't have an account?{' '}
                <Link href="/signup" className="login-signup-link">
                  Sign Up
                </Link>
              </p>

              <form onSubmit={handleSubmit} className="login-form">
                {error && (
                  <div className="login-error-message">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="10"/>
                      <line x1="12" y1="8" x2="12" y2="12"/>
                      <line x1="12" y1="16" x2="12.01" y2="16"/>
                    </svg>
                    <span>{error}</span>
                  </div>
                )}

                <div className="login-input-group">
                  <label htmlFor="email" className="login-label">
                    Email Address
                  </label>
                  <div className="login-input-wrapper">
                    <svg className="login-input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                      <polyline points="22,6 12,13 2,6"/>
                    </svg>
                    <input
                      type="email"
                      id="email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        setError('');
                      }}
                      className="login-input"
                      placeholder="Enter your email"
                      required
                      disabled={isLoading}
                    />
                  </div>
                </div>

                <div className="login-input-group">
                  <label htmlFor="password" className="login-label">
                    Password
                  </label>
                  <div className="login-input-wrapper">
                    <svg className="login-input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                      <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                    </svg>
                    <input
                      type={showPassword ? "text" : "password"}
                      id="password"
                      value={password}
                      onChange={(e) => {
                        setPassword(e.target.value);
                        setError('');
                      }}
                      className="login-input"
                      placeholder="Enter your password"
                      required
                      disabled={isLoading}
                    />
                    <button
                      type="button"
                      className="login-password-toggle"
                      onClick={() => setShowPassword(!showPassword)}
                      aria-label={showPassword ? "Hide password" : "Show password"}
                    >
                    </button>
                  </div>
                </div>

                <div className="login-options">
                  <label className="login-checkbox-label">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="login-checkbox"
                    />
                    <span>Remember me</span>
                  </label>
                  
                  <Link href="/forgot-password" className="login-forgot-link">
                    Forgot password?
                  </Link>
                </div>

                <button 
                  type="submit" 
                  className="login-submit-btn"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <svg className="login-spinner" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="12" cy="12" r="10" strokeOpacity="0.25"/>
                        <path d="M12 2 A10 10 0 0 1 22 12" strokeLinecap="round"/>
                      </svg>
                      Logging in...
                    </>
                  ) : (
                    'Log In'
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

