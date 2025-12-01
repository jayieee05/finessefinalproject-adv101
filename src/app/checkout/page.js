'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import Header from '@/components/Header';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';
import ScrollAnimation from '@/components/ScrollAnimation';

export default function CheckoutPage() {
  const router = useRouter();
  const { cartItems, getTotalPrice, getTotalItems, clearCart } = useCart();
  const { user, isAuthenticated } = useAuth();
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);

  const [shippingInfo, setShippingInfo] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
    country: 'Philippines'
  });

  // Populate user info when user is available
  useEffect(() => {
    if (user) {
      setShippingInfo(prev => ({
        ...prev,
        fullName: user.name || '',
        email: user.email || ''
      }));
    }
  }, [user]);

  const [paymentInfo, setPaymentInfo] = useState({
    gcashNumber: '',
    gcashName: '',
    paymentMethod: 'gcash'
  });

  // Redirect if not authenticated or cart is empty (but not if order is placed)
  useEffect(() => {
    if (orderPlaced) {
      return; // Don't redirect if order is placed
    }
    if (!isAuthenticated()) {
      router.push('/login');
      return;
    }
    if (cartItems.length === 0) {
      router.push('/shop');
    }
  }, [isAuthenticated, cartItems.length, router, orderPlaced]);

  const handleShippingChange = (e) => {
    setShippingInfo({
      ...shippingInfo,
      [e.target.name]: e.target.value
    });
  };

  const handlePaymentChange = (e) => {
    const { name, value } = e.target;
    setPaymentInfo({
      ...paymentInfo,
      [name]: value
    });
  };

  const formatGCashNumber = (value) => {
    const v = value.replace(/\D/g, '');
    if (v.length > 0 && v.length <= 11) {
      if (v.length <= 4) {
        return v;
      } else if (v.length <= 7) {
        return v.substring(0, 4) + ' ' + v.substring(4);
      } else {
        return v.substring(0, 4) + ' ' + v.substring(4, 7) + ' ' + v.substring(7, 11);
      }
    }
    return v.substring(0, 11);
  };

  const handleGCashNumberChange = (e) => {
    const formatted = formatGCashNumber(e.target.value);
    setPaymentInfo({
      ...paymentInfo,
      gcashNumber: formatted
    });
  };

  const calculateSubtotal = () => {
    return getTotalPrice();
  };

  const calculateShipping = () => {
    return 150; // Fixed shipping fee
  };

  const calculateTotal = () => {
    return calculateSubtotal() + calculateShipping();
  };

  const formatPrice = (priceValue) => {
    return new Intl.NumberFormat('en-PH', {
      style: 'currency',
      currency: 'PHP',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(priceValue);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validation
    if (!shippingInfo.fullName || !shippingInfo.email || !shippingInfo.phone || 
        !shippingInfo.address || !shippingInfo.city || !shippingInfo.postalCode) {
      alert('Please fill in all shipping information');
      return;
    }

    if (paymentInfo.paymentMethod === 'gcash') {
      if (!paymentInfo.gcashNumber || !paymentInfo.gcashName) {
        alert('Please fill in all GCash payment information');
        return;
      }
      // Validate GCash number (should be 11 digits)
      const cleanNumber = paymentInfo.gcashNumber.replace(/\D/g, '');
      if (cleanNumber.length !== 11 || !cleanNumber.startsWith('09')) {
        alert('Please enter a valid GCash mobile number (09XX XXX XXXX)');
        return;
      }
    }

    setIsProcessing(true);

    // Simulate order processing
    setTimeout(() => {
      setIsProcessing(false);
      setOrderPlaced(true);
      clearCart();
    }, 2000);
  };

  if (orderPlaced) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow order-success-container">
          <div className="checkout-success-container">
            <ScrollAnimation animation="fadeInUp" delay={0.2} duration={0.8}>
              <div className="checkout-success-content">
                <div className="checkout-success-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                    <polyline points="22 4 12 14.01 9 11.01"/>
                  </svg>
                </div>
                <h1 className="checkout-success-title">Order Placed Successfully!</h1>
                <p className="checkout-success-message">
                  Thank you for your purchase. Your order has been confirmed and will be processed shortly.
                </p>
                <p className="checkout-success-submessage">
                  You will receive an email confirmation shortly.
                </p>
                <div className="checkout-success-actions">
                  <Link href="/shop" className="checkout-success-btn-primary">
                    Continue Shopping
                  </Link>
                  <Link href="/" className="checkout-success-btn-secondary">
                    Back to Home
                  </Link>
                </div>
              </div>
            </ScrollAnimation>
          </div>
        </main>
      </div>
    );
  }

  if (!isAuthenticated() || cartItems.length === 0) {
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow checkout-main" style={{ paddingTop: '100px' }}>
        <div className="checkout-container">
          <div className="checkout-wrapper">
            {/* Breadcrumbs */}
            <ScrollAnimation animation="fadeInUp" delay={0.1} duration={0.6}>
              <div className="checkout-breadcrumbs">
                <Link href="/shop" className="checkout-breadcrumb-link">Shop</Link>
                <span className="checkout-breadcrumb-separator">/</span>
                <Link href="/cart" className="checkout-breadcrumb-link">Cart</Link>
                <span className="checkout-breadcrumb-separator">/</span>
                <span className="checkout-breadcrumb-current">Checkout</span>
              </div>
            </ScrollAnimation>

            <div className="checkout-grid">
              {/* Left Column - Forms */}
              <div className="checkout-forms">
                {/* Shipping Information */}
                <ScrollAnimation animation="fadeInUp" delay={0.2} duration={0.6}>
                  <div className="checkout-section">
                    <h2 className="checkout-section-title">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                        <circle cx="12" cy="10" r="3"/>
                      </svg>
                      Shipping Information
                    </h2>
                    <form className="checkout-form">
                      <div className="checkout-form-row">
                        <div className="checkout-form-group">
                          <label htmlFor="fullName" className="checkout-label">Full Name</label>
                          <input
                            type="text"
                            id="fullName"
                            name="fullName"
                            value={shippingInfo.fullName}
                            onChange={handleShippingChange}
                            className="checkout-input"
                            placeholder="Enter your full name"
                            required
                          />
                        </div>
                        <div className="checkout-form-group">
                          <label htmlFor="email" className="checkout-label">Email Address</label>
                          <input
                            type="email"
                            id="email"
                            name="email"
                            value={shippingInfo.email}
                            onChange={handleShippingChange}
                            className="checkout-input"
                            placeholder="Enter your email"
                            required
                          />
                        </div>
                      </div>
                      <div className="checkout-form-row">
                        <div className="checkout-form-group">
                          <label htmlFor="phone" className="checkout-label">Phone Number</label>
                          <input
                            type="tel"
                            id="phone"
                            name="phone"
                            value={shippingInfo.phone}
                            onChange={handleShippingChange}
                            className="checkout-input"
                            placeholder="09XX XXX XXXX"
                            required
                          />
                        </div>
                        <div className="checkout-form-group">
                          <label htmlFor="postalCode" className="checkout-label">Postal Code</label>
                          <input
                            type="text"
                            id="postalCode"
                            name="postalCode"
                            value={shippingInfo.postalCode}
                            onChange={handleShippingChange}
                            className="checkout-input"
                            placeholder="Enter postal code"
                            required
                          />
                        </div>
                      </div>
                      <div className="checkout-form-group">
                        <label htmlFor="address" className="checkout-label">Street Address</label>
                        <input
                          type="text"
                          id="address"
                          name="address"
                          value={shippingInfo.address}
                          onChange={handleShippingChange}
                          className="checkout-input"
                          placeholder="Enter your street address"
                          required
                        />
                      </div>
                      <div className="checkout-form-row">
                        <div className="checkout-form-group">
                          <label htmlFor="city" className="checkout-label">City</label>
                          <input
                            type="text"
                            id="city"
                            name="city"
                            value={shippingInfo.city}
                            onChange={handleShippingChange}
                            className="checkout-input"
                            placeholder="Enter your city"
                            required
                          />
                        </div>
                        <div className="checkout-form-group">
                          <label htmlFor="country" className="checkout-label">Country</label>
                          <input
                            type="text"
                            id="country"
                            name="country"
                            value={shippingInfo.country}
                            onChange={handleShippingChange}
                            className="checkout-input"
                            required
                          />
                        </div>
                      </div>
                    </form>
                  </div>
                </ScrollAnimation>

                {/* Payment Information */}
                <ScrollAnimation animation="fadeInUp" delay={0.3} duration={0.6}>
                  <div className="checkout-section">
                    <h2 className="checkout-section-title">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                      </svg>
                      Payment Information
                    </h2>
                    <form className="checkout-form">
                      <div className="checkout-form-group">
                        <label className="checkout-label">Payment Method</label>
                        <div className="checkout-payment-methods">
                          <label className="checkout-payment-method">
                            <input
                              type="radio"
                              name="paymentMethod"
                              value="gcash"
                              checked={paymentInfo.paymentMethod === 'gcash'}
                              onChange={handlePaymentChange}
                            />
                            <span>GCash</span>
                          </label>
                          <label className="checkout-payment-method">
                            <input
                              type="radio"
                              name="paymentMethod"
                              value="cod"
                              checked={paymentInfo.paymentMethod === 'cod'}
                              onChange={handlePaymentChange}
                            />
                            <span>Cash on Delivery</span>
                          </label>
                        </div>
                      </div>

                      <div className="checkout-payment-content">
                        {paymentInfo.paymentMethod === 'gcash' && (
                          <div className="checkout-payment-section checkout-payment-gcash">
                            <div className="checkout-gcash-notice">
                              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                              </svg>
                              <p>Pay securely with GCash. Enter your registered GCash mobile number.</p>
                            </div>
                            <div className="checkout-form-group">
                              <label htmlFor="gcashNumber" className="checkout-label">GCash Mobile Number</label>
                              <input
                                type="tel"
                                id="gcashNumber"
                                name="gcashNumber"
                                value={paymentInfo.gcashNumber}
                                onChange={handleGCashNumberChange}
                                className="checkout-input"
                                placeholder="09XX XXX XXXX"
                                maxLength="13"
                                required
                              />
                              <p className="checkout-input-hint">Enter your 11-digit GCash mobile number</p>
                            </div>
                            <div className="checkout-form-group">
                              <label htmlFor="gcashName" className="checkout-label">Account Name</label>
                              <input
                                type="text"
                                id="gcashName"
                                name="gcashName"
                                value={paymentInfo.gcashName}
                                onChange={handlePaymentChange}
                                className="checkout-input"
                                placeholder="Name registered with GCash"
                                required
                              />
                            </div>
                          </div>
                        )}

                        {paymentInfo.paymentMethod === 'cod' && (
                          <div className="checkout-payment-section checkout-payment-cod">
                            <div className="checkout-cod-notice">
                              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <circle cx="12" cy="12" r="10"/>
                                <line x1="12" y1="8" x2="12" y2="12"/>
                                <line x1="12" y1="16" x2="12.01" y2="16"/>
                              </svg>
                              <p>You will pay in cash when the order is delivered.</p>
                            </div>
                          </div>
                        )}
                      </div>
                    </form>
                  </div>
                </ScrollAnimation>
              </div>

              {/* Right Column - Order Summary */}
              <ScrollAnimation animation="fadeInUp" delay={0.4} duration={0.6}>
                <div className="checkout-summary">
                  <h2 className="checkout-summary-title">Order Summary</h2>
                  
                  <div className="checkout-items">
                    {cartItems.map((item, index) => (
                      <div key={`${item.id}-${item.size}-${item.material}-${index}`} className="checkout-item">
                        <Link href={`/product/${item.id}`} className="checkout-item-image-wrapper">
                          <Image
                            src={item.image}
                            alt={item.name}
                            width={80}
                            height={80}
                            className="checkout-item-image"
                            unoptimized
                          />
                        </Link>
                        <div className="checkout-item-details">
                          <Link href={`/product/${item.id}`} className="checkout-item-name">
                            {item.name}
                          </Link>
                          <div className="checkout-item-options">
                            {item.size && <span>Size: {item.size}</span>}
                            {item.material && <span>Material: {item.material}</span>}
                          </div>
                          <div className="checkout-item-footer">
                            <span className="checkout-item-quantity">Qty: {item.quantity}</span>
                            <span className="checkout-item-price">{formatPrice(item.priceValue * item.quantity)}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="checkout-summary-divider"></div>

                  <div className="checkout-summary-totals">
                    <div className="checkout-summary-row">
                      <span>Subtotal</span>
                      <span>{formatPrice(calculateSubtotal())}</span>
                    </div>
                    <div className="checkout-summary-row">
                      <span>Shipping</span>
                      <span>{formatPrice(calculateShipping())}</span>
                    </div>
                    <div className="checkout-summary-divider"></div>
                    <div className="checkout-summary-total">
                      <span>Total</span>
                      <span>{formatPrice(calculateTotal())}</span>
                    </div>
                  </div>

                  <form onSubmit={handleSubmit} className="checkout-place-order-form">
                    <button
                      type="submit"
                      className="checkout-place-order-btn"
                      disabled={isProcessing}
                    >
                      {isProcessing ? (
                        <>
                          <svg className="checkout-spinner" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <circle cx="12" cy="12" r="10" strokeOpacity="0.25"/>
                            <path d="M12 2 A10 10 0 0 1 22 12" strokeLinecap="round"/>
                          </svg>
                          Processing...
                        </>
                      ) : (
                        'Place Order'
                      )}
                    </button>
                  </form>

                  <Link href="/shop" className="checkout-continue-shopping">
                    Continue Shopping
                  </Link>
                </div>
              </ScrollAnimation>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

