'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { useAuth } from '@/contexts/AuthContext';

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
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const { signup, isAuthenticated } = useAuth();
  const router = useRouter();

  // Redirect if already logged in
  useEffect(() => {
    if (isAuthenticated()) {
      router.push('/');
    }
  }, [isAuthenticated, router]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess(false);

    // Validation
    if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
      setError('Please fill in all fields');
      return;
    }

    // Name validation
    if (formData.name.trim().length < 2) {
      setError('Name must be at least 2 characters long');
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError('Please enter a valid email address');
      return;
    }

    // Password validation
    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    
    if (!agreeToTerms) {
      setError('Please agree to the terms and conditions');
      return;
    }

    setIsLoading(true);

    try {
      const result = await signup(
        formData.name.trim(),
        formData.email.trim(),
        formData.password
      );
      
      if (result.success) {
        setSuccess(true);
        setIsLoading(false);
        // Show success message for 3 seconds before redirecting
        setTimeout(() => {
          router.push('/');
        }, 3000);
      } else {
        setError(result.error || 'Signup failed. Please try again.');
        setIsLoading(false);
      }
    } catch (err) {
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Loading Overlay */}
      {isLoading && (
        <div className="signup-loading-overlay">
          <div className="signup-loading-content">
            <div className="signup-loading-spinner">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10" strokeOpacity="0.25"/>
                <path d="M12 2 A10 10 0 0 1 22 12" strokeLinecap="round"/>
              </svg>
            </div>
            <p className="signup-loading-text">Creating your account...</p>
          </div>
        </div>
      )}

      {/* Success Greeting Modal */}
      {success && (
        <div className="signup-success-overlay">
          <div className="signup-success-modal">
            <div className="signup-success-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                <polyline points="22 4 12 14.01 9 11.01"/>
              </svg>
            </div>
            <h2 className="signup-success-title">Welcome to Finesse!</h2>
            <p className="signup-success-message">
              Your account has been created successfully, <strong>{formData.name.split(' ')[0]}</strong>!
            </p>
            <p className="signup-success-submessage">
              You're being redirected to the homepage...
            </p>
            <div className="signup-success-progress">
              <div className="signup-success-progress-bar"></div>
            </div>
          </div>
        </div>
      )}

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
                      disabled={isLoading || success}
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
                      disabled={isLoading || success}
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
                      disabled={isLoading || success}
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
                      disabled={isLoading || success}
                    />
                    <button
                      type="button"
                      className="login-password-toggle"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                    >
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
                      disabled={isLoading || success}
                    />
                    <span>I agree to the <Link href="/terms" className="login-forgot-link">Terms and Conditions</Link></span>
                  </label>
                </div>

                <button 
                  type="submit" 
                  className="login-submit-btn"
                  disabled={isLoading || success}
                >
                  {isLoading ? (
                    <>
                      <svg className="login-spinner" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="12" cy="12" r="10" strokeOpacity="0.25"/>
                        <path d="M12 2 A10 10 0 0 1 22 12" strokeLinecap="round"/>
                      </svg>
                      Creating account...
                    </>
                  ) : success ? (
                    'Account Created!'
                  ) : (
                    'Sign Up'
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

