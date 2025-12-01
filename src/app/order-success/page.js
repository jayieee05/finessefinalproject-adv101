'use client';

import Link from 'next/link';
import ScrollAnimation from '@/components/ScrollAnimation';

export default function OrderSuccessPage() {

  return (
    <div className="min-h-screen flex items-center justify-center order-success-container">
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
    </div>
  );
}

