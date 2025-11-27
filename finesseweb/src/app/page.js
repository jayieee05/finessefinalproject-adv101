import Header from "@/components/Header";
import Hero from "@/components/Hero";
import FeaturedCategories from "@/components/FeaturedCategories";
import Bestsellers from "@/components/Bestsellers";
import AboutPreview from "@/components/AboutPreview";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <Hero />
        <FeaturedCategories />
        <Bestsellers />
        <AboutPreview />
      </main>
      <Footer />
    </div>
  );
}
