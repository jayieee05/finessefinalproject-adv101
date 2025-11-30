'use client';

import Link from 'next/link';
import Image from 'next/image';

export default function ProductGrid({ 
  products, 
  searchQuery, 
  onSearchChange, 
  currentPage, 
  totalPages, 
  totalProducts,
  onPageChange 
}) {
  return (
    <div className="shop-products-content">
      {/* Search Bar */}
      <div className="search-bar search-bar-responsive">
        <input
          type="text"
          placeholder="Search products..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="search-input"
        />
      </div>

      {/* Product Count */}
      <div className="shop-header shop-header-responsive">
        <div className="product-count">
          <span className="product-count-number">{totalProducts}</span> products
        </div>
      </div>

      {/* Product Grid */}
      <div className="product-grid product-grid-responsive">
        {products.map((product) => (
          <div 
            key={product.id} 
            className="product-card shop-product-card bg-white overflow-hidden"
          >
            <div className="product-image-wrapper">
              <Image
                src={product.image}
                alt={product.name}
                width={300}
                height={300}
                className="product-image"
              />
            </div>
            <div className="product-info">
              <h3 className="product-name">
                {product.name}
              </h3>
              <p className="product-price">
                {product.price}
              </p>
              <Link
                href={product.link}
                className="product-link btn-secondary"
              >
                View Details
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="pagination pagination-responsive">
          <button
            className={`pagination-btn ${currentPage === 1 ? 'disabled' : ''}`}
            onClick={() => onPageChange(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          
          <div className="page-numbers">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                className={`page-number ${currentPage === page ? 'active' : ''}`}
                onClick={() => onPageChange(page)}
              >
                {page}
              </button>
            ))}
          </div>

          <button
            className={`pagination-btn ${currentPage === totalPages ? 'disabled' : ''}`}
            onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}

