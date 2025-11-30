'use client';

import { useEffect, useRef, useState } from 'react';

export default function ScrollAnimation({ 
  children, 
  animation = 'fadeInUp',
  delay = 0,
  duration = 0.6,
  threshold = 0.1
}) {
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef(null);

  useEffect(() => {
    // Check if element is already in view on mount
    const checkInitialVisibility = () => {
      if (elementRef.current) {
        const rect = elementRef.current.getBoundingClientRect();
        const isInView = rect.top < window.innerHeight && rect.bottom > 0;
        if (isInView) {
          // Small delay to ensure smooth animation on page load
          setTimeout(() => setIsVisible(true), 100);
        }
      }
    };

    // Check immediately and after a short delay
    checkInitialVisibility();
    const timeoutId = setTimeout(checkInitialVisibility, 200);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            // Optionally disconnect after first animation
            observer.disconnect();
          }
        });
      },
      {
        threshold: threshold,
        rootMargin: '0px 0px -50px 0px'
      }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      clearTimeout(timeoutId);
      if (elementRef.current) {
        observer.unobserve(elementRef.current);
      }
    };
  }, [threshold]);

  const getInitialTransform = () => {
    switch(animation) {
      case 'fadeInUp':
        return 'translateY(30px)';
      case 'fadeInScale':
        return 'scale(0.95)';
      case 'slideInLeft':
        return 'translateX(-30px)';
      case 'slideInRight':
        return 'translateX(30px)';
      case 'fadeIn':
        return 'none';
      default:
        return 'translateY(30px)';
    }
  };

  const getFinalTransform = () => {
    switch(animation) {
      case 'fadeInUp':
        return 'translateY(0)';
      case 'fadeInScale':
        return 'scale(1)';
      case 'slideInLeft':
      case 'slideInRight':
        return 'translateX(0)';
      case 'fadeIn':
        return 'none';
      default:
        return 'translateY(0)';
    }
  };

  return (
    <div
      ref={elementRef}
      className={`scroll-animate scroll-animate-${animation}`}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? getFinalTransform() : getInitialTransform(),
        transition: `opacity ${duration}s ease-out ${delay}s, transform ${duration}s cubic-bezier(0.4, 0, 0.2, 1) ${delay}s`,
        willChange: 'opacity, transform'
      }}
    >
      {children}
    </div>
  );
}

