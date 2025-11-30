'use client';

import Link from 'next/link';

const categories = [
  { id: 'all', name: 'All Products' },
  { id: 'rings', name: 'Rings' },
  { id: 'necklaces', name: 'Necklaces' },
  { id: 'earrings', name: 'Earrings' },
  { id: 'bracelets', name: 'Bracelets' }
];

export default function ShopSidebar({ selectedCategory, onCategoryChange }) {
  return (
    <aside className="shop-sidebar">
      <div className="filter-section">
        <h3 
          className="filter-title"
          style={{
            fontFamily: 'var(--font-cormorant-garamond)',
            fontSize: '2.4rem',
            color: 'var(--color-secondary)',
            fontWeight: '600',
            marginBottom: '2rem',
            paddingBottom: '1rem',
            borderBottom: '1px solid var(--color-border)'
          }}
        >
          Categories
        </h3>
        <ul className="filter-list filter-list-responsive" style={{ listStyle: 'none', padding: 0 }}>
          {categories.map((category) => (
            <li key={category.id} style={{ marginBottom: '1rem' }}>
              <Link
                href={`/shop?category=${category.id}`}
                onClick={() => onCategoryChange(category.id)}
                className="filter-link"
                style={{
                  display: 'block',
                  padding: '0.8rem 1rem',
                  color: selectedCategory === category.id ? 'var(--color-primary)' : 'var(--color-text)',
                  fontFamily: 'var(--font-montserrat)',
                  fontSize: '1.5rem',
                  textDecoration: 'none',
                  transition: 'all 0.3s ease',
                  borderLeft: selectedCategory === category.id ? '3px solid var(--color-primary)' : '3px solid transparent',
                  backgroundColor: selectedCategory === category.id ? 'rgba(200, 169, 126, 0.1)' : 'transparent',
                  borderRadius: '4px'
                }}
                onMouseEnter={(e) => {
                  if (selectedCategory !== category.id) {
                    e.target.style.color = 'var(--color-primary)';
                    e.target.style.backgroundColor = 'rgba(200, 169, 126, 0.05)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (selectedCategory !== category.id) {
                    e.target.style.color = 'var(--color-text)';
                    e.target.style.backgroundColor = 'transparent';
                  }
                }}
              >
                {category.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}

