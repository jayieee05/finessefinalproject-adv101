import Link from 'next/link';

export default function Hero() {
  return (
    <section 
      className="hero relative min-h-[90vh] flex items-center justify-center text-center overflow-hidden"
      style={{ 
        marginTop: '6.5rem',
        backgroundImage: 'url(/assets/hero-bg.svg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center center',
        backgroundRepeat: 'no-repeat',
        position: 'relative',
        width: '100%',
        backgroundColor: '#1a1a1a'
      }}
    >
      {/* Modern Gradient Overlay */}
      <div 
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(135deg, rgba(0, 0, 0, 0.6) 0%, rgba(0, 0, 0, 0.4) 50%, rgba(0, 0, 0, 0.5) 100%)'
        }}
      ></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="hero-content text-center max-w-4xl mx-auto">
          {/* Subtitle */}
          <p 
            className="text-sm md:text-base mb-4 text-white/90 uppercase tracking-[0.2em] font-medium"
            style={{ 
              fontSize: '1.2rem',
              marginBottom: '1.5rem',
              letterSpacing: '0.3em',
              fontFamily: 'var(--font-montserrat)',
              opacity: 0.9
            }}
          >
            Crafted with Excellence
          </p>
          
          {/* Main Heading */}
          <h1 
            className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold mb-6 text-white" 
            style={{ 
              fontFamily: 'var(--font-cormorant-garamond)',
              fontSize: 'clamp(4rem, 8vw, 7.2rem)',
              marginBottom: '2.5rem',
              color: '#ffffff',
              lineHeight: '1.1',
              letterSpacing: '-0.02em',
              textShadow: '0 4px 20px rgba(0, 0, 0, 0.3)'
            }}
          >
            High Quality Timeless Accessories
          </h1>
          
          {/* Description */}
          <p 
            className="text-lg md:text-xl lg:text-2xl mb-10 text-white/95 max-w-2xl mx-auto leading-relaxed" 
            style={{ 
              fontSize: 'clamp(1.6rem, 2.5vw, 2.2rem)',
              marginBottom: '3.5rem',
              lineHeight: '1.7',
              opacity: 0.95,
              fontFamily: 'var(--font-montserrat)',
              fontWeight: '300'
            }}
          >
            Discover our collection of handcrafted jewelry pieces designed to last a lifetime
          </p>
          
          {/* CTA Button */}
          <Link 
            href="/shop" 
            className="btn-primary inline-block px-10 py-4 text-white uppercase tracking-wider font-medium rounded-sm relative overflow-hidden group"
            style={{ 
              padding: '1.4rem 3.2rem',
              fontSize: '1.5rem',
              letterSpacing: '0.15em',
              fontWeight: '600',
              fontFamily: 'var(--font-montserrat)',
              borderRadius: '2px',
              boxShadow: '0 8px 24px rgba(200, 169, 126, 0.3)',
              transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)'
            }}
          >
            <span className="relative z-10">Shop Now</span>
            <span 
              className="absolute inset-0 bg-gradient-to-r from-amber-600 to-amber-500 opacity-0 group-hover:opacity-100 transition-opacity duration-400"
              style={{
                background: 'linear-gradient(135deg, var(--color-primary-dark) 0%, var(--color-primary) 100%)'
              }}
            ></span>
          </Link>
        </div>
      </div>
      
    </section>
  );
}

