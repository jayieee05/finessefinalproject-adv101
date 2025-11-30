import Link from 'next/link';
import Image from 'next/image';
import ScrollAnimation from './ScrollAnimation';

const categories = [
  {
    name: 'Rings',
    image: '/assets/category-rings.png',
    link: '/shop?category=rings'
  },
  {
    name: 'Necklaces',
    image: '/assets/category-necklaces.png',
    link: '/shop?category=necklaces'
  },
  {
    name: 'Earrings',
    image: '/assets/category-earrings.png',
    link: '/shop?category=earrings'
  },
  {
    name: 'Bracelets',
    image: '/assets/category-bracelets.png',
    link: '/shop?category=bracelets'
  }
];

export default function FeaturedCategories() {
  return (
    <section 
      className="featured-categories py-16" 
      style={{ 
        padding: 'clamp(4rem, 8vw, 10rem) clamp(1rem, 4vw, 2rem)',
        background: 'linear-gradient(180deg, #ffffff 0%, #fafafa 100%)'
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
            Explore Our
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
            Our Collections
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

        {/* Category Grid */}
        <ScrollAnimation animation="fadeInUp" delay={0.2}>
          <div className="category-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {categories.map((category, index) => (
              <ScrollAnimation 
                key={category.name}
                animation="fadeInScale" 
                delay={index * 0.1}
                duration={0.5}
              >
                <div className="category-card-modern text-center group relative">
              {/* Image Container */}
              <div className="category-image-wrapper mb-6">
                <Image
                  src={category.image}
                  alt={`${category.name} Collection`}
                  width={400}
                  height={400}
                  className="category-image"
                  unoptimized
                />
              </div>

              {/* Category Name */}
              <h3 className="category-name">
                {category.name}
              </h3>

              {/* CTA Button */}
              <Link
                href={category.link}
                className="category-btn"
              >
                <span className="category-btn-text">View Collection</span>
                <span className="category-btn-fill"></span>
              </Link>
                </div>
              </ScrollAnimation>
            ))}
          </div>
        </ScrollAnimation>
      </div>
    </section>
  );
}

