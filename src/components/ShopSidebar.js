'use client';

import Link from 'next/link';
import ScrollAnimation from './ScrollAnimation';

const categories = [
  { id: 'all', name: 'All Products' },
  { id: 'rings', name: 'Rings' },
  { id: 'necklaces', name: 'Necklaces' },
  { id: 'earrings', name: 'Earrings' },
  { id: 'bracelets', name: 'Bracelets' }
];

export default function ShopSidebar({ selectedCategory, onCategoryChange }) {
  return (
    <aside className="shop-sidebar-modern">
      <div className="filter-section-modern">
        <ScrollAnimation animation="fadeInUp" delay={0.1} duration={0.6}>
          <h3 className="filter-title-modern">
            Categories
          </h3>
        </ScrollAnimation>
        <ul className="filter-list-modern">
          {categories.map((category) => (
            <li key={category.id}>
              <Link
                href={`/shop?category=${category.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  onCategoryChange(category.id);
                  // Update URL without scrolling
                  window.history.pushState({}, '', `/shop?category=${category.id}`);
                }}
                className={`filter-link-modern ${selectedCategory === category.id ? 'active' : ''}`}
              >
                <span className="filter-link-text">{category.name}</span>
                {selectedCategory === category.id && (
                  <span className="filter-link-indicator"></span>
                )}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}

