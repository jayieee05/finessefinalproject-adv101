'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';

export default function Footer() {
  const [email, setEmail] = useState('');

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    console.log('Newsletter subscription:', email);
    setEmail('');
    alert('Thank you for subscribing!');
  };

  return (
    <footer 
      className="text-white py-12"
      style={{
        backgroundColor: 'var(--color-secondary)',
        color: 'var(--color-background)',
        padding: '6rem 0 3rem'
      }}
    >
      <div className="container mx-auto px-4">
        <div className="footer-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8" style={{ gap: '4rem', marginBottom: '4rem' }}>
          {/* Footer Logo */}
          <div className="footer-logo">
            <Image
              src="/assets/logo.png"
              alt="Logo"
              width={200}
              height={80}
              className="h-auto mb-4"
              style={{ width: '200px', height: 'auto', marginBottom: '20px' }}
            />
          </div>

          {/* Shop Links */}
          <div className="footer-links">
            <h4 
              className="text-lg font-semibold mb-4"
              style={{
                color: 'var(--color-background)',
                marginBottom: '2rem',
                fontSize: '2rem',
                fontFamily: 'var(--font-cormorant-garamond)'
              }}
            >
              Shop
            </h4>
            <ul className="space-y-2">
              <li style={{ marginBottom: '1rem' }}>
                <Link 
                  href="/shop?category=rings" 
                  className="footer-link"
                  style={{ color: 'rgba(255, 255, 255, 0.7)' }}
                >
                  Rings
                </Link>
              </li>
              <li style={{ marginBottom: '1rem' }}>
                <Link 
                  href="/shop?category=necklaces" 
                  className="footer-link"
                  style={{ color: 'rgba(255, 255, 255, 0.7)' }}
                >
                  Necklaces
                </Link>
              </li>
              <li style={{ marginBottom: '1rem' }}>
                <Link 
                  href="/shop?category=earrings" 
                  className="footer-link"
                  style={{ color: 'rgba(255, 255, 255, 0.7)' }}
                >
                  Earrings
                </Link>
              </li>
              <li style={{ marginBottom: '1rem' }}>
                <Link 
                  href="/shop?category=bracelets" 
                  className="footer-link"
                  style={{ color: 'rgba(255, 255, 255, 0.7)' }}
                >
                  Bracelets
                </Link>
              </li>
            </ul>
          </div>

          {/* Company Links */}
          <div className="footer-links">
            <h4 
              className="text-lg font-semibold mb-4"
              style={{
                color: 'var(--color-background)',
                marginBottom: '2rem',
                fontSize: '2rem',
                fontFamily: 'var(--font-cormorant-garamond)'
              }}
            >
              Company
            </h4>
            <ul className="space-y-2">
              <li style={{ marginBottom: '1rem' }}>
                <Link 
                  href="/about" 
                  className="footer-link"
                  style={{ color: 'rgba(255, 255, 255, 0.7)' }}
                >
                  About Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="footer-newsletter">
            <h4 
              className="text-lg font-semibold mb-4"
              style={{
                color: 'var(--color-background)',
                marginBottom: '2rem',
                fontSize: '2rem',
                fontFamily: 'var(--font-cormorant-garamond)'
              }}
            >
              Stay Updated
            </h4>
            <p 
              className="mb-4 text-sm"
              style={{
                marginBottom: '2rem',
                color: 'rgba(255, 255, 255, 0.7)',
                fontSize: '1.4rem'
              }}
            >
              Subscribe to our newsletter for exclusive offers and updates
            </p>
            <form onSubmit={handleNewsletterSubmit} className="flex flex-col">
              <input
                type="email"
                placeholder="Your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="px-4 py-3 mb-2"
                style={{
                  padding: '1.2rem',
                  border: 'none',
                  fontFamily: 'var(--font-montserrat)',
                  fontSize: '1.4rem'
                }}
              />
              <button
                type="submit"
                className="btn-primary px-6 py-3 font-medium"
                style={{
                  padding: '0 2rem',
                  fontSize: '1.4rem',
                  fontWeight: '500',
                  border: 'none',
                  cursor: 'pointer'
                }}
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Footer Bottom */}
        <div 
          className="footer-bottom pt-8 flex flex-col md:flex-row justify-between items-center"
          style={{
            paddingTop: '3rem',
            borderTop: '1px solid rgba(255, 255, 255, 0.1)'
          }}
        >
          <div className="social-icons flex space-x-4 mb-4 md:mb-0" style={{ gap: '2rem' }}>
            <a
              href="https://www.instagram.com/the.finesse_mc/"
              target="_blank"
              rel="noopener noreferrer"
              className="social-icon flex items-center justify-center"
              style={{
                width: '4rem',
                height: '4rem',
                borderRadius: '50%',
                backgroundColor: 'rgba(255, 255, 255, 0.1)'
              }}
            >
              <Image
                src="/assets/instagram.svg"
                alt="Instagram"
                width={20}
                height={20}
                className="filter invert"
              />
            </a>
            <a
              href="https://www.facebook.com/profile.php?id=100093146019011"
              target="_blank"
              rel="noopener noreferrer"
              className="social-icon flex items-center justify-center"
              style={{
                width: '4rem',
                height: '4rem',
                borderRadius: '50%',
                backgroundColor: 'rgba(255, 255, 255, 0.1)'
              }}
            >
              <Image
                src="/assets/facebook.svg"
                alt="Facebook"
                width={20}
                height={20}
                className="filter invert"
              />
            </a>
          </div>
          <p 
            className="copyright text-sm"
            style={{
              color: 'rgba(255, 255, 255, 0.7)',
              marginBottom: '0',
              fontSize: '1.4rem'
            }}
          >
            © 2025 Finesse Collection. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

