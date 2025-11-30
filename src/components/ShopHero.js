import ScrollAnimation from './ScrollAnimation';

export default function ShopHero() {
  return (
    <section className="shop-hero-modern">
      <div className="shop-hero-background">
        <div className="shop-hero-bg-image"></div>
        <div className="shop-hero-pattern"></div>
        <div className="shop-hero-gradient"></div>
      </div>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="shop-hero-content-modern">
          <ScrollAnimation animation="fadeInUp" delay={0.2} duration={0.8}>
            <span className="shop-hero-badge">Our Collection</span>
          </ScrollAnimation>
          <ScrollAnimation animation="fadeInUp" delay={0.4} duration={0.8}>
            <h1 className="shop-hero-title-modern">
              Discover Timeless Elegance
            </h1>
          </ScrollAnimation>
          <ScrollAnimation animation="fadeInUp" delay={0.6} duration={0.8}>
            <p className="shop-hero-subtitle-modern">
              Handcrafted jewelry pieces designed to last a lifetime
            </p>
          </ScrollAnimation>
        </div>
      </div>
    </section>
  );
}

