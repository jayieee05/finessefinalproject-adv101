'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

// Product data - in a real app, this would come from an API
const products = {
  1: {
    id: 1,
    name: 'Ring Of Leaves',
    image: '/assets/products/product-1-large.jpg',
    price: '₱11,333',
    priceValue: 11333,
    category: 'rings',
    description: 'A graceful ring with tiny, detailed leaves wrapping softly around the band. It\'s a beautiful piece that brings a touch of nature-inspired charm to your everyday style.',
    rating: 4.5,
    reviewCount: 45,
    material: 'Gold',
    tags: ['Minimalist', 'Stackable', 'Everyday'],
    sizes: [5, 6, 7, 8, 9],
    defaultSize: 7
  },
  2: {
    id: 2,
    name: 'Simple Chain Ring',
    image: '/assets/products/product-2-large.jpg',
    price: '₱5,666',
    priceValue: 5666,
    category: 'rings',
    description: 'A simple and elegant chain ring perfect for everyday wear.',
    rating: 4.3,
    reviewCount: 32,
    material: 'Gold',
    tags: ['Minimalist', 'Simple', 'Everyday'],
    sizes: [5, 6, 7, 8, 9],
    defaultSize: 7
  },
  3: {
    id: 3,
    name: 'Tiara Ring',
    image: '/assets/products/product-3-large.jpg',
    price: '₱8,500',
    priceValue: 8500,
    category: 'rings',
    description: 'An elegant tiara-inspired ring that adds sophistication to any look.',
    rating: 4.7,
    reviewCount: 28,
    material: 'Gold',
    tags: ['Elegant', 'Statement', 'Formal'],
    sizes: [5, 6, 7, 8, 9],
    defaultSize: 7
  },
  4: {
    id: 4,
    name: 'Rose Ring',
    image: '/assets/products/product-4-large.jpg',
    price: '₱5,666',
    priceValue: 5666,
    category: 'rings',
    description: 'A delicate ring featuring a beautiful rose design.',
    rating: 4.4,
    reviewCount: 41,
    material: 'Gold',
    tags: ['Delicate', 'Floral', 'Romantic'],
    sizes: [5, 6, 7, 8, 9],
    defaultSize: 7
  },
  5: {
    id: 5,
    name: 'Signet Ring',
    image: '/assets/products/product-5-large.jpg',
    price: '₱5,666',
    priceValue: 5666,
    category: 'rings',
    description: 'A classic signet ring with timeless appeal.',
    rating: 4.6,
    reviewCount: 19,
    material: 'Gold',
    tags: ['Classic', 'Timeless', 'Formal'],
    sizes: [5, 6, 7, 8, 9],
    defaultSize: 7
  }
};

export default function ProductDetail() {
  const params = useParams();
  const router = useRouter();
  const productId = parseInt(params.id);
  const product = products[productId];

  const [selectedSize, setSelectedSize] = useState(product?.defaultSize || 7);
  const [selectedMaterial, setSelectedMaterial] = useState('Gold');
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');

  useEffect(() => {
    if (!product) {
      router.push('/shop');
    }
  }, [product, router]);

  if (!product) {
    return null;
  }

  const handleIncreaseQuantity = () => {
    if (quantity < 10) {
      setQuantity(quantity + 1);
    }
  };

  const handleDecreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleAddToCart = () => {
    // Add to cart logic here
    console.log('Added to cart:', {
      productId: product.id,
      name: product.name,
      price: product.priceValue,
      quantity,
      size: selectedSize,
      material: selectedMaterial
    });
    alert(`${product.name} added to cart!`);
  };

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

    return (
      <>
        {[...Array(fullStars)].map((_, i) => (
          <span key={i} className="star filled">★</span>
        ))}
        {hasHalfStar && <span className="star half">★</span>}
        {[...Array(emptyStars)].map((_, i) => (
          <span key={i} className="star">★</span>
        ))}
      </>
    );
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow" style={{ paddingTop: '100px' }}>
        {/* Breadcrumbs */}
        <div className="breadcrumbs">
          <div className="container">
            <ul>
              <li><Link href="/">Home</Link></li>
              <li><Link href="/shop">Shop</Link></li>
              <li><Link href={`/shop?category=${product.category}`}>{product.category.charAt(0).toUpperCase() + product.category.slice(1)}</Link></li>
              <li>{product.name}</li>
            </ul>
          </div>
        </div>

        {/* Product Detail Section */}
        <section className="product-detail">
          <div className="container">
            <div className="product-detail-grid">
              <div className="product-gallery">
                <div className="main-image">
                  <Image
                    src={product.image}
                    alt={product.name}
                    width={600}
                    height={600}
                    className="product-main-image"
                    unoptimized
                  />
                </div>
              </div>
              <div className="product-info">
                <h1>{product.name}</h1>
                <p className="product-price">{product.price}</p>
                <div className="product-rating">
                  <div className="stars">
                    {renderStars(product.rating)}
                  </div>
                  <span className="rating-count">{product.reviewCount} reviews</span>
                </div>
                <div className="product-description">
                  <p>{product.description}</p>
                </div>
                <div className="product-options">
                  <div className="option-group">
                    <label>Size</label>
                    <div className="option-buttons">
                      {product.sizes.map((size) => (
                        <button
                          key={size}
                          className={`option-btn ${selectedSize === size ? 'active' : ''}`}
                          onClick={() => setSelectedSize(size)}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="option-group">
                    <label>Material</label>
                    <div className="option-buttons">
                      <button
                        className={`option-btn ${selectedMaterial === 'Gold' ? 'active' : ''}`}
                        onClick={() => setSelectedMaterial('Gold')}
                      >
                        Gold
                      </button>
                    </div>
                  </div>
                </div>
                <div className="product-actions">
                  <div className="quantity-selector">
                    <button onClick={handleDecreaseQuantity}>-</button>
                    <input
                      type="number"
                      value={quantity}
                      min="1"
                      max="10"
                      readOnly
                    />
                    <button onClick={handleIncreaseQuantity}>+</button>
                  </div>
                  <button className="btn-primary add-to-cart-btn" onClick={handleAddToCart}>
                    Add to Cart
                  </button>
                </div>
                <div className="product-meta">
                  <div className="meta-item">
                    <span className="meta-label">Categories:</span>
                    <span className="meta-value">{product.category.charAt(0).toUpperCase() + product.category.slice(1)}</span>
                  </div>
                  <div className="meta-item">
                    <span className="meta-label">Tags:</span>
                    <span className="meta-value">{product.tags.join(', ')}</span>
                  </div>
                </div>
                <div className="product-shipping">
                  <p>
                    <Image src="/assets/shipping-icon.svg" alt="Shipping" width={20} height={20} style={{ marginRight: '8px' }} />
                    Free shipping on orders over ₱100
                  </p>
                  <p>
                    <Image src="/assets/returns-icon.svg" alt="Returns" width={20} height={20} style={{ marginRight: '8px' }} />
                    30-day returns policy
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Product Tabs */}
        <section className="product-tabs">
          <div className="container">
            <div className="tabs">
              <button
                className={`tab-btn ${activeTab === 'description' ? 'active' : ''}`}
                onClick={() => setActiveTab('description')}
              >
                Description
              </button>
              <button
                className={`tab-btn ${activeTab === 'details' ? 'active' : ''}`}
                onClick={() => setActiveTab('details')}
              >
                Details & Care
              </button>
              <button
                className={`tab-btn ${activeTab === 'reviews' ? 'active' : ''}`}
                onClick={() => setActiveTab('reviews')}
              >
                Reviews ({product.reviewCount})
              </button>
            </div>
            <div className="tab-content">
              {activeTab === 'description' && (
                <div className="tab-pane active">
                  <p>{product.description}</p>
                </div>
              )}
              {activeTab === 'details' && (
                <div className="tab-pane active">
                  <h3>Materials</h3>
                  <p>{product.material}</p>
                  <h3>Care Instructions</h3>
                  <ul>
                    <li>Store in the provided jewelry box when not in use</li>
                    <li>Remove before swimming, showering, or exercising</li>
                    <li>Clean with a soft polishing cloth</li>
                    <li>Avoid contact with harsh chemicals</li>
                  </ul>
                </div>
              )}
              {activeTab === 'reviews' && (
                <div className="tab-pane active">
                  <div className="review-summary">
                    <div className="average-rating">
                      <span className="rating-number">{product.rating}</span>
                      <div className="stars">
                        {renderStars(product.rating)}
                      </div>
                      <span className="rating-count">Based on {product.reviewCount} reviews</span>
                    </div>
                    <div className="rating-breakdown">
                      <div className="rating-bar">
                        <span className="rating-level">5 stars</span>
                        <div className="progress-bar">
                          <div className="progress" style={{ width: '75%' }}></div>
                        </div>
                        <span className="rating-percent">75%</span>
                      </div>
                      <div className="rating-bar">
                        <span className="rating-level">4 stars</span>
                        <div className="progress-bar">
                          <div className="progress" style={{ width: '15%' }}></div>
                        </div>
                        <span className="rating-percent">15%</span>
                      </div>
                      <div className="rating-bar">
                        <span className="rating-level">3 stars</span>
                        <div className="progress-bar">
                          <div className="progress" style={{ width: '7%' }}></div>
                        </div>
                        <span className="rating-percent">7%</span>
                      </div>
                      <div className="rating-bar">
                        <span className="rating-level">2 stars</span>
                        <div className="progress-bar">
                          <div className="progress" style={{ width: '2%' }}></div>
                        </div>
                        <span className="rating-percent">2%</span>
                      </div>
                      <div className="rating-bar">
                        <span className="rating-level">1 star</span>
                        <div className="progress-bar">
                          <div className="progress" style={{ width: '1%' }}></div>
                        </div>
                        <span className="rating-percent">1%</span>
                      </div>
                    </div>
                  </div>
                  <div className="review-list">
                    {/* Reviews will be dynamically loaded here */}
                  </div>
                  <button className="btn-secondary">Load More Reviews</button>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Related Products */}
        <section className="related-products">
          <div className="container">
            <h2 className="section-title">You May Also Like</h2>
            <div className="product-grid">
              {Object.values(products)
                .filter(p => p.id !== product.id && p.category === product.category)
                .slice(0, 4)
                .map((relatedProduct) => (
                  <div key={relatedProduct.id} className="product-card">
                    <Image
                      src={relatedProduct.image}
                      alt={relatedProduct.name}
                      width={300}
                      height={300}
                      className="product-card-image"
                      unoptimized
                    />
                    <h3>{relatedProduct.name}</h3>
                    <p className="price">{relatedProduct.price}</p>
                    <Link href={`/product/${relatedProduct.id}`} className="btn-secondary">
                      View Details
                    </Link>
                  </div>
                ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

