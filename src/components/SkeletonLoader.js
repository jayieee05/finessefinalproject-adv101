'use client';

import { useState, useEffect } from 'react';

export default function SkeletonLoader({ 
  type = 'text',
  width,
  height,
  className = '',
  count = 1,
  rounded = false,
  circle = false,
  variant = 'default',
  delay = 0
}) {
  const [isVisible, setIsVisible] = useState(delay === 0);

  useEffect(() => {
    if (delay > 0) {
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, delay);
      return () => clearTimeout(timer);
    }
  }, [delay]);
  const getDefaultDimensions = () => {
    switch(type) {
      case 'text':
        return { width: '100%', height: '1rem' };
      case 'title':
        return { width: '60%', height: '2.5rem' };
      case 'heading':
        return { width: '70%', height: '2rem' };
      case 'paragraph':
        return { width: '100%', height: '1.2rem' };
      case 'avatar':
        return { width: '60px', height: '60px' };
      case 'image':
        return { width: '100%', height: '300px' };
      case 'button':
        return { width: '120px', height: '3rem' };
      case 'card':
        return { width: '100%', height: '200px' };
      case 'thumbnail':
        return { width: '100px', height: '100px' };
      default:
        return { width: width || '100%', height: height || '1rem' };
    }
  };

  const defaultDims = getDefaultDimensions();
  const skeletonClasses = `skeleton-loader skeleton-${type} ${rounded ? 'skeleton-rounded' : ''} ${circle ? 'skeleton-circle' : ''} skeleton-${variant} ${className}`.trim();
  
  const style = {
    width: width || defaultDims.width,
    height: height || defaultDims.height,
    opacity: isVisible ? 1 : 0,
    transition: 'opacity 0.3s ease-in-out'
  };

  if (count > 1) {
    return (
      <div className="skeleton-group">
        {[...Array(count)].map((_, index) => (
          <div
            key={index}
            className={skeletonClasses}
            style={{
              ...style,
              ...(index < count - 1 && { marginBottom: '0.8rem' }),
              transitionDelay: `${delay + (index * 50)}ms`
            }}
          />
        ))}
      </div>
    );
  }

  return (
    <div
      className={skeletonClasses}
      style={style}
      aria-label="Loading..."
      role="status"
    />
  );
}

