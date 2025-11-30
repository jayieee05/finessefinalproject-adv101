'use client';

import { useState, useEffect, useRef } from 'react';
import { useSearchParams } from 'next/navigation';
import ShopSidebar from './ShopSidebar';
import ProductGrid from './ProductGrid';

const products = [
  { id: 1, name: 'Ring Of Leaves', image: '/assets/products/product-1-large.jpg', price: '₱11,333', category: 'rings', link: '/product/1' },
  { id: 2, name: 'Simple Chain Ring', image: '/assets/products/product-2-large.jpg', price: '₱5,666', category: 'rings', link: '/product/2' },
  { id: 3, name: 'Tiara Ring', image: '/assets/products/product-3-large.jpg', price: '₱8,500', category: 'rings', link: '/product/3' },
  { id: 4, name: 'Rose Ring', image: '/assets/products/product-4-large.jpg', price: '₱5,666', category: 'rings', link: '/product/4' },
  { id: 5, name: 'Signet Ring', image: '/assets/products/product-5-large.jpg', price: '₱5,666', category: 'rings', link: '/product/5' },
  { id: 6, name: 'Chained Cuff', image: '/assets/products/productB1.jpg', price: '₱11,333', category: 'bracelets', link: '/product/6' },
  { id: 7, name: 'Thin Chain', image: '/assets/products/productB2.jpg', price: '₱5,100', category: 'bracelets', link: '/product/7' },
  { id: 8, name: 'Leafy Chain', image: '/assets/products/productB3.jpg', price: '₱5,100', category: 'bracelets', link: '/product/8' },
  { id: 9, name: 'Flora Chain', image: '/assets/products/productB4.jpg', price: '₱2,266', category: 'bracelets', link: '/product/9' },
  { id: 10, name: 'Arrow Cuff', image: '/assets/products/productB5.jpg', price: '₱2,833', category: 'bracelets', link: '/product/10' },
  { id: 11, name: 'Diamond Studs', image: '/assets/products/productE1.jpg', price: '₱11,333', category: 'earrings', link: '/product/11' },
  { id: 12, name: 'Mini Hoops', image: '/assets/products/productE2.jpg', price: '₱5,100', category: 'earrings', link: '/product/12' },
  { id: 13, name: 'Dangling Leaves', image: '/assets/products/productE3.jpg', price: '₱3,400', category: 'earrings', link: '/product/13' },
  { id: 14, name: 'Leaf Studs', image: '/assets/products/productE4.jpg', price: '₱2,266', category: 'earrings', link: '/product/14' },
  { id: 15, name: 'Chain Drops', image: '/assets/products/productE5.jpg', price: '₱2,266', category: 'earrings', link: '/product/15' },
  { id: 16, name: 'Ruby Pendant', image: '/assets/products/productN1.jpg', price: '₱14,166', category: 'necklaces', link: '/product/16' },
  { id: 17, name: 'Diamond Choker', image: '/assets/products/productN1.jpg', price: '₱17,000', category: 'necklaces', link: '/product/17' },
  { id: 18, name: 'Heart Drop', image: '/assets/products/productN1.jpg', price: '₱11,333', category: 'necklaces', link: '/product/18' },
  { id: 19, name: 'Leaf Pendant', image: '/assets/products/productN1.jpg', price: '₱5,100', category: 'necklaces', link: '/product/19' },
  { id: 20, name: 'Initial Pendant', image: '/assets/products/productN1.jpg', price: '₱5,666', category: 'necklaces', link: '/product/20' },
];

export default function ShopContent() {
  const searchParams = useSearchParams();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 12;
  const hasScrolledRef = useRef(false);
  const previousCategoryRef = useRef('all');

  useEffect(() => {
    const category = searchParams.get('category') || 'all';
    const categoryChanged = previousCategoryRef.current !== category;
    previousCategoryRef.current = category;
    
    setSelectedCategory(category);
    setCurrentPage(1);

    // Scroll to search bar when category changes (but not on initial mount)
    if (categoryChanged && hasScrolledRef.current) {
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          const searchBar = document.querySelector('.search-bar-modern');
          if (searchBar) {
            const elementPosition = searchBar.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - 120;
            
            window.scrollTo({
              top: Math.max(0, offsetPosition),
              behavior: 'smooth'
            });
          }
        });
      });
    } else {
      hasScrolledRef.current = true;
    }
  }, [searchParams]);

  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const startIndex = (currentPage - 1) * productsPerPage;
  const paginatedProducts = filteredProducts.slice(startIndex, startIndex + productsPerPage);

  return (
    <section className="shop-section py-12 shop-section-responsive">
      <div className="container mx-auto px-4 container-responsive">
        <div className="shop-grid shop-grid-responsive">
          <ShopSidebar 
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
          />
          <div className="shop-products">
            <ProductGrid
              products={paginatedProducts}
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              currentPage={currentPage}
              totalPages={totalPages}
              totalProducts={filteredProducts.length}
              onPageChange={setCurrentPage}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

