'use client';

import { useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import ScrollAnimation from './ScrollAnimation';

export default function ProductGrid({ 
  products, 
  searchQuery, 
  onSearchChange, 
  currentPage, 
  totalPages, 
  totalProducts,
  onPageChange 
}) {
  const productGridRef = useRef(null);
  const searchBarRef = useRef(null);
  const isInitialMount = useRef(true);

  // Additional scroll check after DOM updates (backup)
  useEffect(() => {
    // Skip scroll on initial mount
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }

    // Only scroll if we're not already at the top
    if (currentPage > 0 && window.scrollY > 200) {
      requestAnimationFrame(() => {
        const searchBar = searchBarRef.current || document.querySelector('.search-bar-modern');
        if (searchBar) {
          const elementPosition = searchBar.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - 120;
          
          // Only scroll if we're not already near the target
          if (Math.abs(window.scrollY - offsetPosition) > 50) {
            window.scrollTo({
              top: Math.max(0, offsetPosition),
              behavior: 'smooth'
            });
          }
        }
      });
    }
  }, [currentPage]);

  const handlePageChange = (page) => {
    // Scroll immediately before state update to prevent downward movement
    const searchBar = searchBarRef.current || document.querySelector('.search-bar-modern');
    if (searchBar) {
      const elementPosition = searchBar.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - 120;
      
      // Scroll immediately
      window.scrollTo({
        top: Math.max(0, offsetPosition),
        behavior: 'smooth'
      });
    }
    
    onPageChange(page);
  };

  return (
    <div className="shop-products-content-modern">
      {/* Search Bar */}
      <ScrollAnimation animation="fadeInUp" delay={0.1} duration={0.6}>
        <div className="search-bar-modern" ref={searchBarRef}>
          <svg className="search-icon" viewBox="0 0 24 24" fill="none" strokeWidth="2">
            <circle cx="11" cy="11" r="8"/>
            <path d="m21 21-4.35-4.35"/>
          </svg>
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="search-input-modern"
          />
        </div>
      </ScrollAnimation>

      {/* Product Count */}
      <ScrollAnimation animation="fadeInUp" delay={0.2} duration={0.6}>
        <div className="shop-header-modern">
          <div className="product-count-modern">
            <span className="product-count-number">{totalProducts}</span>
            <span className="product-count-text"> products found</span>
          </div>
        </div>
      </ScrollAnimation>

      {/* Product Grid */}
      <div className="product-grid-modern" ref={productGridRef}>
        {products.map((product, index) => (
          <ScrollAnimation 
            key={product.id} 
            animation="fadeInScale" 
            delay={0.3 + (index * 0.05)} 
            duration={0.5}
          >
            <div className="product-card-modern">
              <Link href={product.link} className="product-card-link">
                <div className="product-image-wrapper-modern">
                  <div className="product-image-overlay-modern"></div>
                  <Image
                    src={product.image}
                    alt={product.name}
                    width={300}
                    height={300}
                    className="product-image-modern"
                    unoptimized
                  />
                  <div className="product-hover-effect"></div>
                </div>
                <div className="product-info-modern">
                  <h3 className="product-name-modern">
                    {product.name}
                  </h3>
                  <p className="product-price-modern">
                    {product.price}
                  </p>
                  <span className="product-link-modern">
                    View Details →
                  </span>
                </div>
              </Link>
            </div>
          </ScrollAnimation>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="pagination pagination-responsive">
          <button
            className={`pagination-btn ${currentPage === 1 ? 'disabled' : ''}`}
            onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          
          <div className="page-numbers">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                className={`page-number ${currentPage === page ? 'active' : ''}`}
                onClick={() => handlePageChange(page)}
              >
                {page}
              </button>
            ))}
          </div>

          <button
            className={`pagination-btn ${currentPage === totalPages ? 'disabled' : ''}`}
            onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}

