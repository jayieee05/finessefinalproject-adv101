import ScrollAnimation from './ScrollAnimation';

export default function AboutHero() {
  return (
    <section className="about-hero-modern">
      <div className="about-hero-background">
        <div className="about-hero-bg-image"></div>
        <div className="about-hero-pattern"></div>
        <div className="about-hero-gradient"></div>
      </div>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="about-hero-content-modern">
          <ScrollAnimation animation="fadeInUp" delay={0.1} duration={0.8}>
            <div className="about-hero-badge">
              <span className="about-hero-badge-text">Our Journey</span>
            </div>
          </ScrollAnimation>
          <ScrollAnimation animation="fadeInUp" delay={0.3} duration={0.8}>
            <h1 className="about-hero-title-modern">
              <span className="about-hero-title-line">About Us</span>
            </h1>
          </ScrollAnimation>
          <ScrollAnimation animation="fadeInUp" delay={0.5} duration={0.8}>
            <div className="about-hero-divider">
              <div className="about-hero-divider-line"></div>
              <div className="about-hero-divider-icon">✦</div>
              <div className="about-hero-divider-line"></div>
            </div>
          </ScrollAnimation>
          <ScrollAnimation animation="fadeInUp" delay={0.7} duration={0.8}>
            <p className="about-hero-subtitle">
              Crafting timeless elegance with passion and precision
            </p>
          </ScrollAnimation>
        </div>
      </div>
    </section>
  );
}

