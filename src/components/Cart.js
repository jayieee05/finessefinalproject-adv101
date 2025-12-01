'use client';

import { useCart } from '@/contexts/CartContext';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect } from 'react';

export default function Cart() {
  const {
    cartItems,
    removeFromCart,
    updateQuantity,
    getTotalItems,
    getTotalPrice,
    isCartOpen,
    closeCart
  } = useCart();

  // Prevent body scroll when cart is open
  useEffect(() => {
    if (isCartOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isCartOpen]);

  const formatPrice = (priceValue) => {
    return new Intl.NumberFormat('en-PH', {
      style: 'currency',
      currency: 'PHP',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(priceValue);
  };

  return (
    <>
      {/* Overlay */}
      <div 
        className={`cart-overlay ${isCartOpen ? 'cart-open' : ''}`}
        onClick={closeCart}
        aria-hidden="true"
      />

      {/* Cart Sidebar */}
      <div className={`cart-sidebar ${isCartOpen ? 'cart-open' : ''}`}>
        {/* Cart Header */}
        <div className="cart-header">
          <h2 className="cart-title">Shopping Cart</h2>
          <button 
            className="cart-close-btn"
            onClick={closeCart}
            aria-label="Close cart"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Cart Items */}
        <div className="cart-content">
          {cartItems.length === 0 ? (
            <div className="cart-empty">
              <svg className="cart-empty-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <circle cx="9" cy="21" r="1" />
                <circle cx="20" cy="21" r="1" />
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
              </svg>
              <p className="cart-empty-text">Your cart is empty</p>
              <Link 
                href="/shop" 
                className="cart-empty-link"
                onClick={closeCart}
              >
                Continue Shopping
              </Link>
            </div>
          ) : (
            <>
              <div className="cart-items">
                {cartItems.map((item, index) => (
                  <div key={`${item.id}-${item.size}-${item.material}-${index}`} className="cart-item">
                    <Link 
                      href={`/product/${item.id}`}
                      className="cart-item-image-wrapper"
                      onClick={closeCart}
                    >
                      <Image
                        src={item.image}
                        alt={item.name}
                        width={80}
                        height={80}
                        className="cart-item-image"
                        unoptimized
                      />
                    </Link>
                    
                    <div className="cart-item-details">
                      <Link 
                        href={`/product/${item.id}`}
                        className="cart-item-name"
                        onClick={closeCart}
                      >
                        {item.name}
                      </Link>
                      
                      <div className="cart-item-options">
                        {item.size && (
                          <span className="cart-item-option">Size: {item.size}</span>
                        )}
                        {item.material && (
                          <span className="cart-item-option">Material: {item.material}</span>
                        )}
                      </div>
                      
                      <div className="cart-item-footer">
                        <div className="cart-item-quantity">
                          <button
                            className="cart-quantity-btn"
                            onClick={() => updateQuantity(item.id, item.quantity - 1, item.size, item.material)}
                            aria-label="Decrease quantity"
                          >
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <line x1="5" y1="12" x2="19" y2="12" />
                            </svg>
                          </button>
                          <span className="cart-quantity-value">{item.quantity}</span>
                          <button
                            className="cart-quantity-btn"
                            onClick={() => updateQuantity(item.id, item.quantity + 1, item.size, item.material)}
                            aria-label="Increase quantity"
                          >
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <line x1="12" y1="5" x2="12" y2="19" />
                              <line x1="5" y1="12" x2="19" y2="12" />
                            </svg>
                          </button>
                        </div>
                        
                        <div className="cart-item-price">
                          {formatPrice(item.priceValue * item.quantity)}
                        </div>
                      </div>
                    </div>
                    
                    <button
                      className="cart-item-remove"
                      onClick={() => removeFromCart(item.id, item.size, item.material)}
                      aria-label="Remove item"
                    >
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <line x1="18" y1="6" x2="6" y2="18" />
                        <line x1="6" y1="6" x2="18" y2="18" />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>

              {/* Cart Footer */}
              <div className="cart-footer">
                <div className="cart-total">
                  <span className="cart-total-label">Total:</span>
                  <span className="cart-total-price">{formatPrice(getTotalPrice())}</span>
                </div>
                
                <div className="cart-actions">
                  <Link
                    href="/shop"
                    className="cart-continue-shopping"
                    onClick={closeCart}
                  >
                    Continue Shopping
                  </Link>
                  <Link
                    href="/checkout"
                    className="cart-checkout-btn"
                    onClick={closeCart}
                  >
                    Checkout
                  </Link>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}

