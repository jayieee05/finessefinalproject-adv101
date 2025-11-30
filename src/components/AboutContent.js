import Image from 'next/image';
import ScrollAnimation from './ScrollAnimation';

export default function AboutContent() {
  return (
    <>
      {/* Our Story Section */}
      <section className="about-section-modern about-section-story">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="about-grid-modern">
            <ScrollAnimation animation="fadeInUp" delay={0.1} duration={0.8}>
              <div className="about-content-modern">
                <div className="about-content-inner">
                  <span className="about-section-label">Our Journey</span>
                  <h2 className="about-section-title-modern">Our Story</h2>
                  <div className="about-text-modern">
                    <p>
                      Finesse was brought to life by three passionate minds Rachel
                      Paragas, Michelle Capitan, and Jay Marc Torrefranca with a
                      shared vision to create a jewelry brand that blends elegance,
                      simplicity, and modern style. What started as a school project
                      turned into a meaningful venture, built on creativity,
                      dedication, and teamwork.
                    </p>
                    <p>
                      Each piece in our collection is thoughtfully designed to elevate
                      everyday looks, making style more personal and accessible.
                      Finesse represents our journey from ideas and sketches to
                      polished designs and our goal to bring beauty and confidence to
                      others through our creations.
                    </p>
                  </div>
                </div>
              </div>
            </ScrollAnimation>
            <ScrollAnimation animation="fadeInUp" delay={0.3} duration={0.8}>
              <div className="about-image-modern">
                <div className="about-image-container-modern">
                  <div className="about-image-overlay"></div>
                  <Image
                    src="/assets/about-story.jpg"
                    alt="Our Story"
                    width={600}
                    height={400}
                    className="about-img-modern"
                    priority
                  />
                </div>
              </div>
            </ScrollAnimation>
          </div>
        </div>
      </section>

      {/* Who We Are Section */}
      <section className="about-section-modern about-section-who">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="about-grid-modern about-grid-reverse-modern">
            <ScrollAnimation animation="fadeInUp" delay={0.1} duration={0.8}>
              <div className="about-image-modern">
                <div className="about-image-container-modern">
                  <div className="about-image-overlay"></div>
                  <Image
                    src="/assets/about-craft.jpg"
                    alt="Our Craft"
                    width={600}
                    height={400}
                    className="about-img-modern"
                  />
                </div>
              </div>
            </ScrollAnimation>
            <ScrollAnimation animation="fadeInUp" delay={0.3} duration={0.8}>
              <div className="about-content-modern">
                <div className="about-content-inner">
                  <span className="about-section-label">Meet the Team</span>
                  <h2 className="about-section-title-modern">Who We Are?</h2>
                  <div className="about-text-modern">
                    <p>
                      We are Finesse a jewelry brand founded by Rachel, Michelle, and
                      Jay Marc, three BSIT students with a passion for creativity,
                      innovation, and fashion. We focus on crafting high-quality,
                      stylish accessories that reflect elegance and individuality.
                    </p>
                    <p>
                      Our team believes in clean design, attention to detail, and
                      making every piece feel special. Finesse isn't just about
                      jewelry it's about expressing who you are, with confidence and
                      class.
                    </p>
                  </div>
                </div>
              </div>
            </ScrollAnimation>
          </div>
        </div>
      </section>
    </>
  );
}

