import Link from 'next/link';

export default function Hero() {
  return (
    <section 
      className="hero relative min-h-[80vh] flex items-center justify-center text-center"
      style={{ 
        marginTop: '8rem',
        backgroundImage: 'url(/assets/hero-bg.svg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed',
        position: 'relative'
      }}
    >
      <div className="absolute inset-0 bg-black opacity-40"></div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="hero-content text-center max-w-3xl mx-auto">
          <h1 
            className="text-5xl md:text-6xl font-serif font-bold mb-6 text-white" 
            style={{ 
              fontFamily: 'var(--font-cormorant-garamond)',
              fontSize: '5.6rem',
              marginBottom: '2rem'
            }}
          >
            High Quality Timeless Accessories
          </h1>
          <p 
            className="text-xl md:text-2xl mb-8 text-white" 
            style={{ 
              fontSize: '2rem',
              marginBottom: '3rem'
            }}
          >
            Discover our collection of handcrafted jewelry pieces designed to last a lifetime
          </p>
          <Link 
            href="/shop" 
            className="btn-primary inline-block px-8 py-4 text-white uppercase tracking-wider font-medium"
            style={{ 
              padding: '1.2rem 2.4rem',
              fontSize: '1.4rem',
              letterSpacing: '1px',
              fontWeight: '500'
            }}
          >
            Shop Now
          </Link>
        </div>
      </div>
    </section>
  );
}

