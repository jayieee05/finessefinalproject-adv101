'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const logoVersion = 'v2';

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-white shadow-sm" style={{ boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)' }}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-4 relative">
          {/* Logo */}
          <div className="logo flex-shrink-0">
            <Link href="/" className="header-logo">
              <Image 
                src={`/assets/logo.png?v=${logoVersion}`}
                alt="Finesse Logo" 
                width={80} 
                height={80}
                className="header-logo-img"
                unoptimized
                priority
              />
            </Link>
          </div>

          {/* Navigation - Absolutely Centered */}
          <nav className="hidden md:block absolute left-1/2 transform -translate-x-1/2">
            <ul className="flex space-x-12">
              <li>
                <Link 
                  href="/" 
                  className="nav-link text-sm uppercase tracking-wider" 
                  style={{ color: 'var(--color-text)', fontSize: '1.4rem' }}
                >
                  Home
                </Link>
              </li>
              <li>
                <Link 
                  href="/shop" 
                  className="nav-link text-sm uppercase tracking-wider" 
                  style={{ color: 'var(--color-text)', fontSize: '1.4rem' }}
                >
                  Shop
                </Link>
              </li>
              <li>
                <Link 
                  href="/about" 
                  className="nav-link text-sm uppercase tracking-wider" 
                  style={{ color: 'var(--color-text)', fontSize: '1.4rem' }}
                >
                  About Us
                </Link>
              </li>
            </ul>
          </nav>

          {/* Login and Signup Buttons */}
          <div className="flex items-center space-x-4 flex-shrink-0 ml-auto">
            <Link 
              href="/login" 
              className="login-link uppercase font-medium transition-colors hidden md:block"
              style={{ 
                color: 'var(--color-text)', 
                fontSize: '1.4rem',
                fontFamily: 'var(--font-montserrat)'
              }}
            >
              LOGIN
            </Link>

            <Link 
              href="/signup" 
              className="signup-btn uppercase font-medium rounded-lg px-6 py-2 text-white transition-colors hidden md:block"
              style={{ 
                backgroundColor: 'var(--color-secondary)',
                fontSize: '1.4rem',
                fontFamily: 'var(--font-montserrat)',
                padding: '0.8rem 2.4rem'
              }}
            >
              SIGNUP
            </Link>

            {/* Mobile Menu Button */}
            <button
              className={`mobile-menu-btn md:hidden flex flex-col space-y-1 ${isMenuOpen ? 'active' : ''}`}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <span className="block w-6 h-0.5" style={{ backgroundColor: 'var(--color-text)' }}></span>
              <span className="block w-6 h-0.5" style={{ backgroundColor: 'var(--color-text)' }}></span>
              <span className="block w-6 h-0.5" style={{ backgroundColor: 'var(--color-text)' }}></span>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <nav 
            className="mobile-menu md:hidden py-4 border-t" 
            style={{ borderColor: 'var(--color-border)' }}
          >
            <ul className="flex flex-col space-y-4">
              <li>
                <Link 
                  href="/" 
                  className="mobile-nav-link text-sm uppercase tracking-wider" 
                  style={{ color: 'var(--color-text)', fontSize: '1.4rem' }}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Home
                </Link>
              </li>
              <li>
                <Link 
                  href="/shop" 
                  className="mobile-nav-link text-sm uppercase tracking-wider" 
                  style={{ color: 'var(--color-text)', fontSize: '1.4rem' }}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Shop
                </Link>
              </li>
              <li>
                <Link 
                  href="/about" 
                  className="mobile-nav-link text-sm uppercase tracking-wider" 
                  style={{ color: 'var(--color-text)', fontSize: '1.4rem' }}
                  onClick={() => setIsMenuOpen(false)}
                >
                  About Us
                </Link>
              </li>
              <li className="pt-4 border-t" style={{ borderColor: 'var(--color-border)' }}>
                <Link 
                  href="/login" 
                  className="mobile-nav-link text-sm uppercase tracking-wider block mb-2" 
                  style={{ color: 'var(--color-text)', fontSize: '1.4rem' }}
                  onClick={() => setIsMenuOpen(false)}
                >
                  LOGIN
                </Link>
                <Link 
                  href="/signup" 
                  className="signup-btn uppercase font-medium rounded-lg px-6 py-2 text-white transition-colors inline-block text-center w-full"
                  style={{ 
                    backgroundColor: 'var(--color-secondary)',
                    fontSize: '1.4rem',
                    fontFamily: 'var(--font-montserrat)',
                    padding: '0.8rem 2.4rem'
                  }}
                  onClick={() => setIsMenuOpen(false)}
                >
                  SIGNUP
                </Link>
              </li>
            </ul>
          </nav>
        )}
      </div>
    </header>
  );
}

