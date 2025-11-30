import Link from 'next/link';
import Image from 'next/image';
import ScrollAnimation from './ScrollAnimation';

export default function AboutPreview() {
  return (
    <section 
      className="about-preview-modern py-16 bg-white"
    >
      <div className="container mx-auto px-4">
        <div className="about-preview-grid grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Image Section */}
          <ScrollAnimation animation="slideInLeft" delay={0.1} duration={0.7}>
            <div className="about-preview-image-wrapper order-2 lg:order-1">
            <div className="about-preview-image-container">
              <Image
                src="/assets/about-preview.png"
                alt="Our Craftsmanship"
                width={800}
                height={600}
                className="about-preview-image"
                quality={95}
                priority
                unoptimized
              />
            </div>
            </div>
          </ScrollAnimation>

          {/* Content Section */}
          <ScrollAnimation animation="slideInRight" delay={0.2} duration={0.7}>
            <div className="about-preview-content order-1 lg:order-2">
            <p 
              className="about-preview-subtitle"
            >
              Discover Our
            </p>
            <h2 className="about-preview-title">
              Our Craftsmanship
            </h2>
            <p className="about-preview-description">
              Each piece is meticulously handcrafted by our skilled artisans using only the finest materials. We believe in creating timeless accessories that can be cherished for generations.
            </p>
            <Link
              href="/about"
              className="about-preview-btn"
            >
              <span className="about-preview-btn-text">Learn More</span>
              <span className="about-preview-btn-fill"></span>
            </Link>
            </div>
          </ScrollAnimation>
        </div>
      </div>
    </section>
  );
}

