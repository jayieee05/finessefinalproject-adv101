'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';

export default function Footer() {
  const [email, setEmail] = useState('');
  const router = useRouter();
  const pathname = usePathname();

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    console.log('Newsletter subscription:', email);
    setEmail('');
    alert('Thank you for subscribing!');
  };

  const handleCategoryClick = (e, category) => {
    const categoryPath = `/shop?category=${category.toLowerCase()}`;
    
    // If already on shop page, prevent default and handle scroll
    if (pathname === '/shop') {
      e.preventDefault();
      
      // Update URL without navigation
      window.history.pushState({}, '', categoryPath);
      
      // Scroll to search bar immediately
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          const searchBar = document.querySelector('.search-bar-modern');
          if (searchBar) {
            const elementPosition = searchBar.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - 120;
            
            window.scrollTo({
              top: Math.max(0, offsetPosition),
              behavior: 'smooth'
            });
          }
        });
      });
      
      // Trigger a custom event to update the category in ShopContent
      window.dispatchEvent(new PopStateEvent('popstate'));
    } else {
      // If not on shop page, navigate normally and scroll after navigation
      router.push(categoryPath);
      
      // Wait for navigation to complete, then scroll
      setTimeout(() => {
        const searchBar = document.querySelector('.search-bar-modern');
        if (searchBar) {
          const elementPosition = searchBar.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - 120;
          
          window.scrollTo({
            top: Math.max(0, offsetPosition),
            behavior: 'smooth'
          });
        }
      }, 100);
    }
  };

  return (
    <footer 
      className="text-white py-12 relative overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, var(--color-secondary) 0%, #2a2118 100%)',
        color: 'var(--color-background)',
        padding: '8rem 0 4rem',
        position: 'relative'
      }}
    >
      {/* Decorative Top Border */}
      <div 
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background: 'linear-gradient(90deg, transparent 0%, var(--color-primary) 50%, transparent 100%)',
          height: '2px'
        }}
      ></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="footer-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8" style={{ gap: '5rem', marginBottom: '5rem' }}>
          {/* Footer Logo */}
          <div className="footer-logo">
            <Link href="/" className="inline-block transition-transform duration-300 hover:scale-105">
              <Image
                src="/assets/logo.png"
                alt="Finesse Logo"
                width={220}
                height={88}
                className="h-auto mb-6"
                style={{ width: '220px', height: 'auto', marginBottom: '2.5rem', filter: 'brightness(1.1)' }}
                unoptimized
              />
            </Link>
            <p 
              className="text-sm leading-relaxed"
              style={{
                color: 'rgba(255, 255, 255, 0.7)',
                fontSize: '1.4rem',
                lineHeight: '1.8',
                fontFamily: 'var(--font-montserrat)',
                fontWeight: '300',
                maxWidth: '280px'
              }}
            >
              Crafting timeless elegance, one piece at a time.
            </p>
          </div>

          {/* Shop Links */}
          <div className="footer-links">
            <h4 
              className="text-lg font-semibold mb-6 relative"
              style={{
                color: 'var(--color-background)',
                marginBottom: '2.5rem',
                fontSize: '2.2rem',
                fontFamily: 'var(--font-cormorant-garamond)',
                fontWeight: '600',
                letterSpacing: '0.5px'
              }}
            >
              Shop
              <span 
                className="absolute bottom-0 left-0 h-0.5"
                style={{
                  width: '3rem',
                  height: '2px',
                  backgroundColor: 'var(--color-primary)',
                  marginTop: '1rem'
                }}
              ></span>
            </h4>
            <ul className="space-y-3">
              {['Rings', 'Necklaces', 'Earrings', 'Bracelets'].map((item, index) => (
                <li key={item} style={{ marginBottom: '1.2rem' }}>
                  <Link 
                    href={`/shop?category=${item.toLowerCase()}`}
                    onClick={(e) => handleCategoryClick(e, item)}
                    className="footer-link inline-block relative group"
                    style={{ 
                      color: 'rgba(255, 255, 255, 0.75)',
                      fontSize: '1.5rem',
                      fontFamily: 'var(--font-montserrat)',
                      fontWeight: '400',
                      transition: 'all 0.3s ease',
                      paddingLeft: '0'
                    }}
                  >
                    <span className="relative z-10">{item}</span>
                    <span 
                      className="absolute left-0 bottom-0 w-0 h-0.5 bg-gradient-to-r from-transparent via-var(--color-primary) to-transparent group-hover:w-full transition-all duration-300"
                      style={{
                        backgroundColor: 'var(--color-primary)',
                        height: '2px'
                      }}
                    ></span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div className="footer-links">
            <h4 
              className="text-lg font-semibold mb-6 relative"
              style={{
                color: 'var(--color-background)',
                marginBottom: '2.5rem',
                fontSize: '2.2rem',
                fontFamily: 'var(--font-cormorant-garamond)',
                fontWeight: '600',
                letterSpacing: '0.5px'
              }}
            >
              Company
              <span 
                className="absolute bottom-0 left-0 h-0.5"
                style={{
                  width: '3rem',
                  height: '2px',
                  backgroundColor: 'var(--color-primary)',
                  marginTop: '1rem'
                }}
              ></span>
            </h4>
            <ul className="space-y-3">
              <li style={{ marginBottom: '1.2rem' }}>
                <Link 
                  href="/about" 
                  className="footer-link inline-block relative group"
                  style={{ 
                    color: 'rgba(255, 255, 255, 0.75)',
                    fontSize: '1.5rem',
                    fontFamily: 'var(--font-montserrat)',
                    fontWeight: '400',
                    transition: 'all 0.3s ease'
                  }}
                >
                  <span className="relative z-10">About Us</span>
                  <span 
                    className="absolute left-0 bottom-0 w-0 h-0.5 bg-gradient-to-r from-transparent via-var(--color-primary) to-transparent group-hover:w-full transition-all duration-300"
                    style={{
                      backgroundColor: 'var(--color-primary)',
                      height: '2px'
                    }}
                  ></span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="footer-newsletter">
            <h4 
              className="footer-newsletter-title relative mb-4"
              style={{
                color: 'var(--color-background)',
                marginBottom: '1.5rem',
                fontSize: '2.4rem',
                fontFamily: 'var(--font-cormorant-garamond)',
                fontWeight: '600',
                letterSpacing: '0.3px',
                lineHeight: '1.3'
              }}
            >
              Stay Updated
              <span 
                className="absolute bottom-0 left-0 h-0.5"
                style={{
                  width: '3rem',
                  height: '2px',
                  backgroundColor: 'var(--color-primary)',
                  marginTop: '1rem'
                }}
              ></span>
            </h4>
            <p 
              className="footer-newsletter-description"
              style={{
                marginBottom: '2.5rem',
                color: 'rgba(255, 255, 255, 0.8)',
                fontSize: '1.5rem',
                lineHeight: '1.7',
                fontFamily: 'var(--font-montserrat)',
                fontWeight: '300'
              }}
            >
              Subscribe to our newsletter for exclusive offers and updates
            </p>
            <form onSubmit={handleNewsletterSubmit} className="newsletter-form">
              <div className="newsletter-input-wrapper">
                <input
                  type="email"
                  placeholder="Your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="newsletter-input"
                />
              </div>
              <button
                type="submit"
                className="newsletter-submit-btn"
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
            paddingTop: '4rem',
            borderTop: '1px solid rgba(255, 255, 255, 0.15)',
            marginTop: '2rem'
          }}
        >
          <div className="social-icons flex space-x-4 mb-6 md:mb-0" style={{ gap: '1.5rem' }}>
            <a
              href="https://www.instagram.com/the.finesse_mc/"
              target="_blank"
              rel="noopener noreferrer"
              className="social-icon-instagram flex items-center justify-center group relative"
              style={{
                width: '4.5rem',
                height: '4.5rem',
                borderRadius: '50%',
                background: 'rgba(255, 255, 255, 0.1)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                backdropFilter: 'blur(10px)',
                padding: '0.8rem'
              }}
            >
              <Image
                src="/assets/instagram.svg"
                alt="Instagram"
                width={28}
                height={28}
                className="transition-transform duration-300 group-hover:scale-110"
                style={{ transition: 'transform 0.3s ease', filter: 'none' }}
                unoptimized
              />
            </a>
            <a
              href="https://www.facebook.com/profile.php?id=100093146019011"
              target="_blank"
              rel="noopener noreferrer"
              className="social-icon-facebook flex items-center justify-center group relative"
              style={{
                width: '4.5rem',
                height: '4.5rem',
                borderRadius: '50%',
                background: 'rgba(255, 255, 255, 0.1)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                backdropFilter: 'blur(10px)',
                padding: '0.8rem'
              }}
            >
              <Image
                src="/assets/facebook.svg"
                alt="Facebook"
                width={28}
                height={28}
                className="transition-transform duration-300 group-hover:scale-110"
                style={{ transition: 'transform 0.3s ease', filter: 'none' }}
                unoptimized
              />
            </a>
          </div>
          <p 
            className="copyright text-sm"
            style={{
              color: 'rgba(255, 255, 255, 0.7)',
              marginBottom: '0',
              fontSize: '1.4rem',
              fontFamily: 'var(--font-montserrat)',
              fontWeight: '300',
              letterSpacing: '0.3px'
            }}
          >
            © 2025 Finesse Collection. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

