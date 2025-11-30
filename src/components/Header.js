'use client';

import Link from 'next/link';
import Image from 'next/image';

export default function Header() {
  const logoVersion = 'v2';

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
          </div>
        </div>
      </div>
    </header>
  );
}

