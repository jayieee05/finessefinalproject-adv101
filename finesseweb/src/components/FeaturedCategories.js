import Link from 'next/link';
import Image from 'next/image';

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
    <section className="featured-categories py-16 bg-white" style={{ padding: '8rem 2rem' }}>
      <div className="container mx-auto px-4">
        <h2 
          className="section-title text-4xl font-serif font-bold text-center mb-12" 
          style={{ 
            fontFamily: 'var(--font-cormorant-garamond)',
            fontSize: '3.6rem',
            color: 'var(--color-secondary)',
            marginBottom: '4rem',
            position: 'relative',
            paddingBottom: '1.5rem'
          }}
        >
          Our Collections
          <span 
            className="absolute bottom-0 left-1/2 transform -translate-x-1/2"
            style={{
              width: '6rem',
              height: '2px',
              backgroundColor: 'var(--color-primary)'
            }}
          ></span>
        </h2>
        <div className="category-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category) => (
            <div 
              key={category.name} 
              className="category-card text-center"
              style={{
                border: '1px solid #ddd',
                padding: '1.5rem',
                borderRadius: '8px',
                transition: 'transform 0.3s'
              }}
            >
              <div className="mb-4 overflow-hidden">
                <Image
                  src={category.image}
                  alt={`${category.name} Collection`}
                  width={300}
                  height={300}
                  className="w-full h-auto object-cover"
                  style={{ marginBottom: '2rem' }}
                />
              </div>
              <h3 
                className="text-2xl font-serif font-semibold mb-4" 
                style={{ 
                  fontFamily: 'var(--font-cormorant-garamond)',
                  fontSize: '2.4rem',
                  color: 'var(--color-secondary)',
                  marginBottom: '1.5rem'
                }}
              >
                {category.name}
              </h3>
              <Link
                href={category.link}
                className="btn-secondary inline-block px-6 py-3 uppercase tracking-wider font-medium"
                style={{
                  padding: '1.2rem 2.4rem',
                  fontSize: '1.4rem',
                  letterSpacing: '1px',
                  fontWeight: '500'
                }}
              >
                View Collection
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

