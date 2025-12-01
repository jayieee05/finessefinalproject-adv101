'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';
import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Header() {
  const logoVersion = 'v2';
  const { toggleCart, getTotalItems } = useCart();
  const { user, logout, isAuthenticated } = useAuth();
  const router = useRouter();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [cartIconClicked, setCartIconClicked] = useState(false);
  const userMenuRef = useRef(null);
  const cartItemCount = getTotalItems();

  const handleCartClick = () => {
    toggleCart();
    // Trigger animation
    setCartIconClicked(true);
    // Remove animation class after animation completes
    setTimeout(() => {
      setCartIconClicked(false);
    }, 600);
  };

  // Close user menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setShowUserMenu(false);
      }
    };

    if (showUserMenu) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showUserMenu]);

  const handleLogout = () => {
    logout();
    setShowUserMenu(false);
    router.push('/');
  };

  return (
    <header className="modern-header fixed top-0 left-0 w-full z-50 bg-white">
      <div className="container mx-auto px-4">
        <div className="header-content flex items-center justify-between relative">
          {/* Logo */}
          <div className="header-logo-wrapper flex-shrink-0">
            <Link href="/" className="header-logo-link">
              <Image 
                src={`/assets/logo.png?v=${logoVersion}`}
                alt="Finesse Logo" 
                width={100} 
                height={100}
                className="header-logo-img"
                unoptimized
                priority
              />
            </Link>
          </div>

          {/* Desktop Navigation - Centered */}
          <nav className="header-nav hidden lg:block absolute left-1/2 transform -translate-x-1/2">
            <ul className="nav-list flex items-center">
              <li>
                <Link href="/" className="nav-link-modern">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/shop" className="nav-link-modern">
                  Shop
                </Link>
              </li>
              <li>
                <Link href="/about" className="nav-link-modern">
                  About Us
                </Link>
              </li>
            </ul>
          </nav>

          {/* Right Side Actions */}
          <div className="header-actions flex items-center flex-shrink-0 ml-auto gap-4">
            {/* Cart Icon - Only show if user is authenticated */}
            {isAuthenticated() && (
              <button
                className={`header-cart-btn ${cartIconClicked ? 'cart-icon-clicked' : ''}`}
                onClick={handleCartClick}
                aria-label="Open shopping cart"
              >
                <svg className="header-cart-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="9" cy="21" r="1" />
                  <circle cx="20" cy="21" r="1" />
                  <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                </svg>
                {cartItemCount > 0 && (
                  <span className="header-cart-badge">{cartItemCount}</span>
                )}
              </button>
            )}

            {isAuthenticated() ? (
              <div className="header-user-menu" ref={userMenuRef}>
                <button
                  className="header-user-btn"
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  aria-label="User menu"
                >
                  <svg className="header-user-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                    <circle cx="12" cy="7" r="4"/>
                  </svg>
                  <span className="header-user-name hidden lg:inline">{user?.name?.split(' ')[0]}</span>
                </button>
                
                {showUserMenu && (
                  <div className="header-user-dropdown">
                    <div className="header-user-info">
                      <div className="header-user-avatar">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                          <circle cx="12" cy="7" r="4"/>
                        </svg>
                      </div>
                      <div className="header-user-details">
                        <p className="header-user-fullname">{user?.name}</p>
                        <p className="header-user-email">{user?.email}</p>
                      </div>
                    </div>
                    <div className="header-user-divider"></div>
                    <button
                      className="header-logout-btn"
                      onClick={handleLogout}
                    >
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
                        <polyline points="16 17 21 12 16 7"/>
                        <line x1="21" y1="12" x2="9" y2="12"/>
                      </svg>
                      <span>Logout</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link 
                  href="/login" 
                  className="header-login-link hidden md:block"
                >
                  LOGIN
                </Link>

                <Link 
                  href="/signup" 
                  className="header-signup-btn hidden md:block"
                >
                  <span>SIGNUP</span>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

