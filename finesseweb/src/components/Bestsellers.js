import Link from 'next/link';
import Image from 'next/image';

const bestsellers = [
  {
    name: 'Ring Of Leaves',
    image: '/products/product-1-large.jpg',
    price: '₱11,333',
    link: '/product/1'
  },
  {
    name: 'Ruby Pendant',
    image: '/products/productN1.jpg',
    price: '₱14,166',
    link: '/product/16'
  },
  {
    name: 'Chained Cuff',
    image: '/products/productB1.jpg',
    price: '₱11,333',
    link: '/product/6'
  },
  {
    name: 'Diamond Studs',
    image: '/products/productE1.jpg',
    price: '₱11,333',
    link: '/product/11'
  }
];

export default function Bestsellers() {
  return (
    <section 
      className="bestsellers py-16" 
      style={{ 
        padding: '8rem 0',
        backgroundColor: 'var(--color-background-alt)'
      }}
    >
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
          Bestsellers
          <span 
            className="absolute bottom-0 left-1/2 transform -translate-x-1/2"
            style={{
              width: '6rem',
              height: '2px',
              backgroundColor: 'var(--color-primary)'
            }}
          ></span>
        </h2>
        <div className="product-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {bestsellers.map((product) => (
            <div 
              key={product.name} 
              className="product-card bg-white overflow-hidden"
              style={{
                padding: '2rem',
                textAlign: 'center',
                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)'
              }}
            >
              <div className="overflow-hidden mb-4">
                <Image
                  src={product.image}
                  alt={product.name}
                  width={300}
                  height={300}
                  className="w-full h-auto object-cover"
                  style={{ marginBottom: '1.5rem' }}
                />
              </div>
              <div className="text-center">
                <h3 
                  className="text-xl font-serif font-semibold mb-2" 
                  style={{ 
                    fontFamily: 'var(--font-cormorant-garamond)',
                    fontSize: '1.8rem',
                    color: 'var(--color-secondary)',
                    marginBottom: '1rem'
                  }}
                >
                  {product.name}
                </h3>
                <p 
                  className="price text-lg font-semibold mb-4"
                  style={{
                    fontSize: '1.8rem',
                    color: 'var(--color-primary)',
                    fontWeight: '500',
                    marginBottom: '1.5rem'
                  }}
                >
                  {product.price}
                </p>
                <Link
                  href={product.link}
                  className="btn-secondary inline-block px-6 py-3 uppercase tracking-wider font-medium"
                  style={{
                    padding: '1.2rem 2.4rem',
                    fontSize: '1.4rem',
                    letterSpacing: '1px',
                    fontWeight: '500'
                  }}
                >
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

