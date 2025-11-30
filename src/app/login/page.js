'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Login attempt:', { email, password, rememberMe });
    // Add your login logic here
    alert('Login functionality will be implemented here');
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
                      onChange={(e) => setEmail(e.target.value)}
                      className="login-input"
                      placeholder="Enter your email"
                      required
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
                      onChange={(e) => setPassword(e.target.value)}
                      className="login-input"
                      placeholder="Enter your password"
                      required
                    />
                    <button
                      type="button"
                      className="login-password-toggle"
                      onClick={() => setShowPassword(!showPassword)}
                      aria-label={showPassword ? "Hide password" : "Show password"}
                    >
                      {showPassword ? (
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                          <circle cx="12" cy="12" r="3"/>
                        </svg>
                      ) : (
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/>
                          <line x1="1" y1="1" x2="23" y2="23"/>
                        </svg>
                      )}
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

                <button type="submit" className="login-submit-btn">
                  Log In
                </button>
              </form>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

