import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AboutHero from "@/components/AboutHero";
import AboutContent from "@/components/AboutContent";

export default function About() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow" style={{ paddingTop: '100px' }}>
        <AboutHero />
        <AboutContent />
      </main>
      <Footer />
    </div>
  );
}

