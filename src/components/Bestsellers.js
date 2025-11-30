import Link from 'next/link';
import Image from 'next/image';
import ScrollAnimation from './ScrollAnimation';

const bestsellers = [
  {
    name: 'Ring Of Leaves',
    image: '/assets/products/product-1-large.jpg',
    price: '₱11,333',
    link: '/product/1'
  },
  {
    name: 'Ruby Pendant',
    image: '/assets/products/productN1.jpg',
    price: '₱14,166',
    link: '/product/16'
  },
  {
    name: 'Chained Cuff',
    image: '/assets/products/productB1.jpg',
    price: '₱11,333',
    link: '/product/6'
  },
  {
    name: 'Diamond Studs',
    image: '/assets/products/productE1.jpg',
    price: '₱11,333',
    link: '/product/11'
  }
];

export default function Bestsellers() {
  return (
    <section 
      className="bestsellers py-16" 
      style={{ 
        padding: 'clamp(4rem, 8vw, 8rem) 0',
        backgroundColor: 'var(--color-background-alt)'
      }}
    >
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <ScrollAnimation animation="fadeInUp" delay={0.1}>
          <div className="text-center mb-12 md:mb-16">
          <p 
            className="text-sm uppercase tracking-widest mb-4"
            style={{
              color: 'var(--color-primary)',
              fontSize: 'clamp(1rem, 2vw, 1.2rem)',
              letterSpacing: '0.3em',
              fontFamily: 'var(--font-montserrat)',
              fontWeight: '500',
              marginBottom: '1.5rem'
            }}
          >
            Featured Products
          </p>
          <h2 
            className="section-title text-4xl font-serif font-bold text-center" 
            style={{ 
              fontFamily: 'var(--font-cormorant-garamond)',
              fontSize: 'clamp(2.8rem, 5vw, 4.8rem)',
              color: 'var(--color-secondary)',
              marginBottom: '2rem',
              position: 'relative',
              paddingBottom: '2rem',
              lineHeight: '1.2'
            }}
          >
            Bestsellers
            <span 
              className="absolute bottom-0 left-1/2 transform -translate-x-1/2"
              style={{
                width: '8rem',
                height: '3px',
                background: 'linear-gradient(90deg, transparent, var(--color-primary), transparent)',
                borderRadius: '2px'
              }}
            ></span>
          </h2>
          </div>
        </ScrollAnimation>

        {/* Product Grid */}
        <ScrollAnimation animation="fadeInUp" delay={0.2}>
          <div className="product-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {bestsellers.map((product, index) => (
              <ScrollAnimation 
                key={product.name}
                animation="fadeInScale" 
                delay={index * 0.1}
                duration={0.5}
              >
                <div className="bestseller-card bg-white text-center group relative">
              {/* Product Image Container */}
              <div className="bestseller-image-wrapper mb-6">
                <Image
                  src={product.image}
                  alt={product.name}
                  width={300}
                  height={300}
                  className="bestseller-image"
                  unoptimized
                />
              </div>

              {/* Product Info */}
              <div className="text-center">
                <h3 className="bestseller-name">
                  {product.name}
                </h3>
                <p className="bestseller-price">
                  {product.price}
                </p>
                <Link
                  href={product.link}
                  className="bestseller-btn"
                >
                  <span className="bestseller-btn-text">View Details</span>
                  <span className="bestseller-btn-fill"></span>
                </Link>
              </div>
                </div>
              </ScrollAnimation>
            ))}
          </div>
        </ScrollAnimation>
      </div>
    </section>
  );
}

