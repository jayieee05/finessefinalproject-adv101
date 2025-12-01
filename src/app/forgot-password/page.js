'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Basic validation
    if (!email) {
      setError('Please enter your email address');
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
      // Simulate API call for password reset
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Check if email exists in localStorage (for demo purposes)
      const users = JSON.parse(localStorage.getItem('finesse_users') || '[]');
      const userExists = users.some(u => u.email === email);
      
      if (userExists) {
        setSuccess(true);
      } else {
        // Still show success for security (don't reveal if email exists)
        setSuccess(true);
      }
    } catch (err) {
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <main className="login-page-container" style={{ paddingTop: '0' }}>
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
                Forgot your <span className="login-welcome-accent">password?</span>
              </h1>
              
              <p className="login-welcome-tagline">
                Don't worry, we'll help you reset it. Enter your email address and we'll send you instructions.
              </p>
            </div>
            
            {/* Decorative Background Elements */}
            <div className="login-welcome-pattern"></div>
            <div className="login-welcome-squares"></div>
            <div className="login-welcome-chevrons"></div>
          </div>

          {/* Right Section - Forgot Password Form */}
          <div className="login-form-section">
            {/* Decorative Background Elements */}
            <div className="login-form-chevrons"></div>
            
            <div className="login-form-card">
              <h2 className="login-form-title">Reset Password</h2>
              
              <p className="login-signup-prompt">
                Remember your password?{' '}
                <Link href="/login" className="login-signup-link">
                  Log In
                </Link>
              </p>

              {success ? (
                <div className="forgot-password-success">
                  <div className="forgot-password-success-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                      <polyline points="22 4 12 14.01 9 11.01"/>
                    </svg>
                  </div>
                  <h3 className="forgot-password-success-title">Check Your Email</h3>
                  <p className="forgot-password-success-message">
                    We've sent password reset instructions to <strong>{email}</strong>
                  </p>
                  <p className="forgot-password-success-submessage">
                    Please check your email inbox and follow the instructions to reset your password.
                  </p>
                  <div className="forgot-password-success-actions">
                    <Link href="/login" className="login-submit-btn">
                      Back to Login
                    </Link>
                    <button
                      type="button"
                      onClick={() => {
                        setSuccess(false);
                        setEmail('');
                      }}
                      className="forgot-password-resend-btn"
                    >
                      Resend Email
                    </button>
                  </div>
                </div>
              ) : (
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
                        placeholder="Enter your email address"
                        required
                        disabled={isLoading}
                      />
                    </div>
                    <p className="forgot-password-hint">
                      Enter the email address associated with your account
                    </p>
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
                        Sending...
                      </>
                    ) : (
                      'Send Reset Instructions'
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

