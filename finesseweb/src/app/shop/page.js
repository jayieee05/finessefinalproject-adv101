import { Suspense } from 'react';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ShopHero from "@/components/ShopHero";
import ShopContent from "@/components/ShopContent";

export default function Shop() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow" style={{ paddingTop: '100px' }}>
        <ShopHero />
        <Suspense fallback={<div style={{ padding: '2rem', textAlign: 'center' }}>Loading...</div>}>
          <ShopContent />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}

