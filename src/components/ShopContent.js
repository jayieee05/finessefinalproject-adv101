'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import ShopSidebar from './ShopSidebar';
import ProductGrid from './ProductGrid';

const products = [
  { id: 1, name: 'Ring Of Leaves', image: '/products/product-1-large.jpg', price: '₱11,333', category: 'rings', link: '/product/1' },
  { id: 2, name: 'Simple Chain Ring', image: '/products/product-2-large.jpg', price: '₱5,666', category: 'rings', link: '/product/2' },
  { id: 3, name: 'Tiara Ring', image: '/products/product-3-large.jpg', price: '₱8,500', category: 'rings', link: '/product/3' },
  { id: 4, name: 'Rose Ring', image: '/products/product-4-large.jpg', price: '₱5,666', category: 'rings', link: '/product/4' },
  { id: 5, name: 'Signet Ring', image: '/products/product-5-large.jpg', price: '₱5,666', category: 'rings', link: '/product/5' },
  { id: 6, name: 'Chained Cuff', image: '/products/productB1.jpg', price: '₱11,333', category: 'bracelets', link: '/product/6' },
  { id: 7, name: 'Thin Chain', image: '/products/productB2.jpg', price: '₱5,100', category: 'bracelets', link: '/product/7' },
  { id: 8, name: 'Leafy Chain', image: '/products/productB3.jpg', price: '₱5,100', category: 'bracelets', link: '/product/8' },
  { id: 9, name: 'Flora Chain', image: '/products/productB4.jpg', price: '₱2,266', category: 'bracelets', link: '/product/9' },
  { id: 10, name: 'Arrow Cuff', image: '/products/productB5.jpg', price: '₱2,833', category: 'bracelets', link: '/product/10' },
  { id: 11, name: 'Diamond Studs', image: '/products/productE1.jpg', price: '₱11,333', category: 'earrings', link: '/product/11' },
  { id: 12, name: 'Mini Hoops', image: '/products/productE2.jpg', price: '₱5,100', category: 'earrings', link: '/product/12' },
  { id: 13, name: 'Dangling Leaves', image: '/products/productE3.jpg', price: '₱3,400', category: 'earrings', link: '/product/13' },
  { id: 14, name: 'Leaf Studs', image: '/products/productE4.jpg', price: '₱2,266', category: 'earrings', link: '/product/14' },
  { id: 15, name: 'Chain Drops', image: '/products/productE5.jpg', price: '₱2,266', category: 'earrings', link: '/product/15' },
  { id: 16, name: 'Ruby Pendant', image: '/products/productN1.jpg', price: '₱14,166', category: 'necklaces', link: '/product/16' },
  { id: 17, name: 'Diamond Choker', image: '/products/productN2.jpg', price: '₱17,000', category: 'necklaces', link: '/product/17' },
  { id: 18, name: 'Heart Drop', image: '/products/productN3.jpg', price: '₱11,333', category: 'necklaces', link: '/product/18' },
  { id: 19, name: 'Leaf Pendant', image: '/products/productN4.jpg', price: '₱5,100', category: 'necklaces', link: '/product/19' },
  { id: 20, name: 'Initial Pendant', image: '/products/productN5.jpg', price: '₱5,666', category: 'necklaces', link: '/product/20' },
];

export default function ShopContent() {
  const searchParams = useSearchParams();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 12;

  useEffect(() => {
    const category = searchParams.get('category') || 'all';
    setSelectedCategory(category);
    setCurrentPage(1);
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

