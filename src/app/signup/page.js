'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function SignupPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }
    
    if (!agreeToTerms) {
      alert('Please agree to the terms and conditions');
      return;
    }
    
    console.log('Signup attempt:', formData);
    // Add your signup logic here
    alert('Signup functionality will be implemented here');
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
                Join us and discover timeless elegance in every piece.
              </p>
            </div>
            
            {/* Decorative Background Elements */}
            <div className="login-welcome-pattern"></div>
            <div className="login-welcome-squares"></div>
            <div className="login-welcome-chevrons"></div>
          </div>

          {/* Right Section - Signup Form */}
          <div className="login-form-section">
            {/* Decorative Background Elements */}
            <div className="login-form-chevrons"></div>
            
            <div className="login-form-card">
              <h2 className="login-form-title">Sign Up</h2>
              
              <p className="login-signup-prompt">
                Already have an account?{' '}
                <Link href="/login" className="login-signup-link">
                  Log In
                </Link>
              </p>

              <form onSubmit={handleSubmit} className="login-form">
                <div className="login-input-group">
                  <label htmlFor="name" className="login-label">
                    Full Name
                  </label>
                  <div className="login-input-wrapper">
                    <svg className="login-input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                      <circle cx="12" cy="7" r="4"/>
                    </svg>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="login-input"
                      placeholder="Enter your full name"
                      required
                    />
                  </div>
                </div>

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
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
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
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
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

                <div className="login-input-group">
                  <label htmlFor="confirmPassword" className="login-label">
                    Confirm Password
                  </label>
                  <div className="login-input-wrapper">
                    <svg className="login-input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                      <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                    </svg>
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      id="confirmPassword"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      className="login-input"
                      placeholder="Confirm your password"
                      required
                    />
                    <button
                      type="button"
                      className="login-password-toggle"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                    >
                      {showConfirmPassword ? (
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
                      checked={agreeToTerms}
                      onChange={(e) => setAgreeToTerms(e.target.checked)}
                      className="login-checkbox"
                      required
                    />
                    <span>I agree to the <Link href="/terms" className="login-forgot-link">Terms and Conditions</Link></span>
                  </label>
                </div>

                <button type="submit" className="login-submit-btn">
                  Sign Up
                </button>
              </form>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

