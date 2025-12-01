'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SkeletonLoader from '@/components/SkeletonLoader';
import { useCart } from '@/contexts/CartContext';

export default function ProductDetail() {
  const params = useParams();
  const router = useRouter();
  const productId = parseInt(params.id);
  const { addToCart, openCart } = useCart();

  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [selectedSize, setSelectedSize] = useState(7);
  const [selectedMaterial, setSelectedMaterial] = useState('Gold');
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(`/api/products?id=${productId}`);
        
        if (!response.ok) {
          throw new Error('Product not found');
        }
        
        const productData = await response.json();
        setProduct(productData);
        setSelectedSize(productData.defaultSize || 7);
        
        // Fetch related products
        const relatedResponse = await fetch(`/api/products?category=${productData.category}`);
        if (relatedResponse.ok) {
          const allProducts = await relatedResponse.json();
          const related = allProducts
            .filter(p => p.id !== productData.id)
            .slice(0, 4);
          setRelatedProducts(related);
        }
      } catch (err) {
        setError(err.message);
        setTimeout(() => {
          router.push('/shop');
        }, 2000);
      } finally {
        setIsLoading(false);
      }
    };

    if (productId) {
      fetchProduct();
    }
  }, [productId, router]);

  if (error) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow" style={{ paddingTop: '100px', padding: '4rem 2rem', textAlign: 'center' }}>
          <p style={{ fontSize: '1.6rem', color: 'var(--color-text-light)' }}>{error}</p>
          <p style={{ fontSize: '1.4rem', color: 'var(--color-text-light)', marginTop: '1rem' }}>Redirecting to shop...</p>
        </main>
        <Footer />
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow" style={{ paddingTop: '100px' }}>
          {/* Breadcrumbs Skeleton */}
          <div className="breadcrumbs">
            <div className="container">
              <SkeletonLoader type="text" width="300px" height="20px" delay={0} />
            </div>
          </div>

          {/* Product Detail Skeleton */}
          <section className="product-detail">
            <div className="container">
              <div className="product-detail-grid">
                <div className="product-gallery">
                  <SkeletonLoader type="image" height="600px" className="skeleton-product-image" delay={0} />
                </div>
                <div className="product-info">
                  <SkeletonLoader type="text" width="60%" height="40px" className="skeleton-title" delay={100} />
                  <SkeletonLoader type="text" width="30%" height="35px" className="skeleton-price" delay={150} />
                  <SkeletonLoader type="text" width="150px" height="25px" className="skeleton-rating" delay={200} />
                  <SkeletonLoader type="text" count={3} className="skeleton-description" delay={250} />
                  <SkeletonLoader type="text" width="100px" height="30px" className="skeleton-label" delay={300} />
                  <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
                    <SkeletonLoader type="button" width="60px" height="40px" delay={350} />
                    <SkeletonLoader type="button" width="60px" height="40px" delay={400} />
                    <SkeletonLoader type="button" width="60px" height="40px" delay={450} />
                  </div>
                  <SkeletonLoader type="button" width="200px" height="50px" className="skeleton-add-cart" delay={500} />
                </div>
              </div>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    );
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
    if (!product) return;
    
    addToCart(product, {
      quantity,
      size: selectedSize,
      material: selectedMaterial
    });
    
    // Open cart to show the added item
    openCart();
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
        {relatedProducts.length > 0 && (
          <section className="related-products">
            <div className="container">
              <h2 className="section-title">You May Also Like</h2>
              <div className="product-grid">
                {relatedProducts.map((relatedProduct) => (
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
        )}
      </main>
      <Footer />
    </div>
  );
}

