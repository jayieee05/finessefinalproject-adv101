import Header from "@/components/Header";
import ScrollAnimation from "@/components/ScrollAnimation";

export default function TermsPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow" style={{ paddingTop: '100px' }}>
        <div className="terms-container">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <ScrollAnimation animation="fadeInUp" delay={0.1} duration={0.8}>
              <div className="terms-header">
                <h1 className="terms-title">Terms and Conditions</h1>
                <p className="terms-subtitle">Last Updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
              </div>
            </ScrollAnimation>

            <div className="terms-content">
              <ScrollAnimation animation="fadeInUp" delay={0.2} duration={0.8}>
                <section className="terms-section">
                  <h2 className="terms-section-title">1. Acceptance of Terms</h2>
                  <p className="terms-text">
                    By accessing and using the Finesse website, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
                  </p>
                </section>
              </ScrollAnimation>

              <ScrollAnimation animation="fadeInUp" delay={0.3} duration={0.8}>
                <section className="terms-section">
                  <h2 className="terms-section-title">2. Use License</h2>
                  <p className="terms-text">
                    Permission is granted to temporarily download one copy of the materials on Finesse's website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
                  </p>
                  <ul className="terms-list">
                    <li>Modify or copy the materials</li>
                    <li>Use the materials for any commercial purpose or for any public display</li>
                    <li>Attempt to reverse engineer any software contained on Finesse's website</li>
                    <li>Remove any copyright or other proprietary notations from the materials</li>
                  </ul>
                </section>
              </ScrollAnimation>

              <ScrollAnimation animation="fadeInUp" delay={0.4} duration={0.8}>
                <section className="terms-section">
                  <h2 className="terms-section-title">3. Product Information</h2>
                  <p className="terms-text">
                    We strive to provide accurate product descriptions, images, and pricing. However, we do not warrant that product descriptions or other content on this site is accurate, complete, reliable, current, or error-free. If a product offered by us is not as described, your sole remedy is to return it in unused condition.
                  </p>
                </section>
              </ScrollAnimation>

              <ScrollAnimation animation="fadeInUp" delay={0.5} duration={0.8}>
                <section className="terms-section">
                  <h2 className="terms-section-title">4. Pricing and Payment</h2>
                  <p className="terms-text">
                    All prices are displayed in Philippine Peso (PHP) unless otherwise stated. We reserve the right to change prices at any time without prior notice. Payment must be made through the methods specified on our checkout page, including GCash and Cash on Delivery options.
                  </p>
                </section>
              </ScrollAnimation>

              <ScrollAnimation animation="fadeInUp" delay={0.6} duration={0.8}>
                <section className="terms-section">
                  <h2 className="terms-section-title">5. Orders and Shipping</h2>
                  <p className="terms-text">
                    When you place an order, you are making an offer to purchase products at the prices stated. We reserve the right to accept or reject your order. Shipping costs and estimated delivery times are provided at checkout. We are not responsible for delays caused by shipping carriers or customs.
                  </p>
                </section>
              </ScrollAnimation>

              <ScrollAnimation animation="fadeInUp" delay={0.7} duration={0.8}>
                <section className="terms-section">
                  <h2 className="terms-section-title">6. Returns and Refunds</h2>
                  <p className="terms-text">
                    We accept returns within 14 days of delivery for items in their original condition. Custom or personalized items may not be eligible for return. Refunds will be processed to the original payment method within 5-10 business days after we receive and inspect the returned item.
                  </p>
                </section>
              </ScrollAnimation>

              <ScrollAnimation animation="fadeInUp" delay={0.8} duration={0.8}>
                <section className="terms-section">
                  <h2 className="terms-section-title">7. User Accounts</h2>
                  <p className="terms-text">
                    You are responsible for maintaining the confidentiality of your account and password. You agree to accept responsibility for all activities that occur under your account. You must notify us immediately of any unauthorized use of your account.
                  </p>
                </section>
              </ScrollAnimation>

              <ScrollAnimation animation="fadeInUp" delay={0.9} duration={0.8}>
                <section className="terms-section">
                  <h2 className="terms-section-title">8. Privacy Policy</h2>
                  <p className="terms-text">
                    Your use of our website is also governed by our Privacy Policy. Please review our Privacy Policy to understand our practices regarding the collection and use of your personal information.
                  </p>
                </section>
              </ScrollAnimation>

              <ScrollAnimation animation="fadeInUp" delay={1.0} duration={0.8}>
                <section className="terms-section">
                  <h2 className="terms-section-title">9. Intellectual Property</h2>
                  <p className="terms-text">
                    All content on this website, including text, graphics, logos, images, and software, is the property of Finesse or its content suppliers and is protected by international copyright laws. You may not reproduce, distribute, or create derivative works from any content without our express written permission.
                  </p>
                </section>
              </ScrollAnimation>

              <ScrollAnimation animation="fadeInUp" delay={1.1} duration={0.8}>
                <section className="terms-section">
                  <h2 className="terms-section-title">10. Limitation of Liability</h2>
                  <p className="terms-text">
                    In no event shall Finesse or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on Finesse's website, even if Finesse or a Finesse authorized representative has been notified orally or in writing of the possibility of such damage.
                  </p>
                </section>
              </ScrollAnimation>

              <ScrollAnimation animation="fadeInUp" delay={1.2} duration={0.8}>
                <section className="terms-section">
                  <h2 className="terms-section-title">11. Revisions and Errata</h2>
                  <p className="terms-text">
                    The materials appearing on Finesse's website could include technical, typographical, or photographic errors. Finesse does not warrant that any of the materials on its website are accurate, complete, or current. Finesse may make changes to the materials contained on its website at any time without notice.
                  </p>
                </section>
              </ScrollAnimation>

              <ScrollAnimation animation="fadeInUp" delay={1.3} duration={0.8}>
                <section className="terms-section">
                  <h2 className="terms-section-title">12. Governing Law</h2>
                  <p className="terms-text">
                    These terms and conditions are governed by and construed in accordance with the laws of the Philippines. Any disputes relating to these terms and conditions shall be subject to the exclusive jurisdiction of the courts of the Philippines.
                  </p>
                </section>
              </ScrollAnimation>

              <ScrollAnimation animation="fadeInUp" delay={1.4} duration={0.8}>
                <section className="terms-section">
                  <h2 className="terms-section-title">13. Contact Information</h2>
                  <p className="terms-text">
                    If you have any questions about these Terms and Conditions, please contact us at:
                  </p>
                  <div className="terms-contact">
                    <p><strong>Email:</strong> support@finesse.com</p>
                    <p><strong>Phone:</strong> +63 XXX XXX XXXX</p>
                    <p><strong>Address:</strong> [Your Business Address], Philippines</p>
                  </div>
                </section>
              </ScrollAnimation>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

