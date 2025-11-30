import Image from 'next/image';

export default function AboutContent() {
  return (
    <>
      {/* Our Story Section */}
      <section className="about-section about-section-responsive">
        <div className="container mx-auto px-4">
          <div className="about-grid about-grid-responsive">
            <div className="about-content about-content-responsive">
              <h2 className="about-section-title">Our Story</h2>
              <div className="about-text">
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
            <div className="about-image about-image-responsive">
              <div className="about-image-wrapper">
                <Image
                  src="/assets/about-story.jpg"
                  alt="Our Story"
                  width={600}
                  height={400}
                  className="about-img"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Who We Are Section */}
      <section className="about-section about-section-alt about-section-responsive">
        <div className="container mx-auto px-4">
          <div className="about-grid about-grid-reverse about-grid-responsive">
            <div className="about-image about-image-responsive">
              <div className="about-image-wrapper">
                <Image
                  src="/assets/about-craft.jpg"
                  alt="Our Craft"
                  width={600}
                  height={400}
                  className="about-img"
                />
              </div>
            </div>
            <div className="about-content about-content-responsive">
              <h2 className="about-section-title">Who We Are?</h2>
              <div className="about-text">
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
        </div>
      </section>
    </>
  );
}

