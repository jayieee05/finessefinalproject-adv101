import { Cormorant_Garamond, Montserrat } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/contexts/CartContext";
import { AuthProvider } from "@/contexts/AuthContext";
import Cart from "@/components/Cart";

const cormorantGaramond = Cormorant_Garamond({
  variable: "--font-cormorant-garamond",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
});

export const metadata = {
  title: "Finesse - High Quality Timeless Accessories",
  description: "Discover our collection of handcrafted jewelry pieces designed to last a lifetime",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${cormorantGaramond.variable} ${montserrat.variable} antialiased`}
      >
        <AuthProvider>
          <CartProvider>
            {children}
            <Cart />
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
