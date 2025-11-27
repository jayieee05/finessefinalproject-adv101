import Link from 'next/link';
import Image from 'next/image';

export default function AboutPreview() {
  return (
    <section 
      className="about-preview py-16 bg-white"
      style={{ padding: '8rem 0' }}
    >
      <div className="container mx-auto px-4">
        <div className="about-grid grid grid-cols-1 md:grid-cols-2 gap-12 items-center" style={{ gap: '5rem' }}>
          <div className="about-image">
            <Image
              src="/assets/about-preview.png"
              alt="Our Craftsmanship"
              width={600}
              height={600}
              className="w-full h-auto"
            />
          </div>
          <div className="about-content">
            <h2 
              className="text-4xl font-serif font-bold mb-6" 
              style={{ 
                fontFamily: 'var(--font-cormorant-garamond)',
                fontSize: '3.6rem',
                color: 'var(--color-secondary)',
                marginBottom: '2rem'
              }}
            >
              Our Craftsmanship
            </h2>
            <p 
              className="text-lg mb-8 leading-relaxed"
              style={{
                fontSize: '1.6rem',
                color: 'var(--color-text)',
                marginBottom: '1.5rem',
                lineHeight: '1.6'
              }}
            >
              Each piece is meticulously handcrafted by our skilled artisans using only the finest materials. We believe in creating timeless accessories that can be cherished for generations.
            </p>
            <Link
              href="/about"
              className="btn-primary inline-block px-8 py-4 text-white uppercase tracking-wider font-medium"
              style={{
                padding: '1.2rem 2.4rem',
                fontSize: '1.4rem',
                letterSpacing: '1px',
                fontWeight: '500'
              }}
            >
              Learn More
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

