const Product = require('../models/Product');
const pool = require('../config/database');

// Product data to seed
const products = [
  {
    name: 'Ring Of Leaves',
    image: '/assets/products/product-1-large.jpg',
    price: '₱11,333',
    priceValue: 11333,
    category: 'rings',
    description: 'A graceful ring with tiny, detailed leaves wrapping softly around the band. It\'s a beautiful piece that brings a touch of nature-inspired charm to your everyday style.',
    rating: 4.5,
    reviewCount: 45,
    material: 'Gold',
    tags: ['Minimalist', 'Stackable', 'Everyday'],
    sizes: [5, 6, 7, 8, 9],
    defaultSize: 7,
    stock: 10
  },
  {
    name: 'Simple Chain Ring',
    image: '/assets/products/product-2-large.jpg',
    price: '₱5,666',
    priceValue: 5666,
    category: 'rings',
    description: 'A simple and elegant chain ring perfect for everyday wear.',
    rating: 4.3,
    reviewCount: 32,
    material: 'Gold',
    tags: ['Minimalist', 'Simple', 'Everyday'],
    sizes: [5, 6, 7, 8, 9],
    defaultSize: 7,
    stock: 15
  },
  {
    name: 'Tiara Ring',
    image: '/assets/products/product-3-large.jpg',
    price: '₱8,500',
    priceValue: 8500,
    category: 'rings',
    description: 'An elegant tiara-inspired ring that adds sophistication to any look.',
    rating: 4.7,
    reviewCount: 28,
    material: 'Gold',
    tags: ['Elegant', 'Statement', 'Formal'],
    sizes: [5, 6, 7, 8, 9],
    defaultSize: 7,
    stock: 8
  },
  {
    name: 'Rose Ring',
    image: '/assets/products/product-4-large.jpg',
    price: '₱5,666',
    priceValue: 5666,
    category: 'rings',
    description: 'A delicate ring featuring a beautiful rose design.',
    rating: 4.4,
    reviewCount: 41,
    material: 'Gold',
    tags: ['Delicate', 'Floral', 'Romantic'],
    sizes: [5, 6, 7, 8, 9],
    defaultSize: 7,
    stock: 12
  },
  {
    name: 'Signet Ring',
    image: '/assets/products/product-5-large.jpg',
    price: '₱5,666',
    priceValue: 5666,
    category: 'rings',
    description: 'A classic signet ring with timeless appeal.',
    rating: 4.6,
    reviewCount: 19,
    material: 'Gold',
    tags: ['Classic', 'Timeless', 'Formal'],
    sizes: [5, 6, 7, 8, 9],
    defaultSize: 7,
    stock: 10
  },
  {
    name: 'Chained Cuff',
    image: '/assets/products/productB1.jpg',
    price: '₱11,333',
    priceValue: 11333,
    category: 'bracelets',
    description: 'A bold chained cuff bracelet that makes a statement.',
    rating: 4.5,
    reviewCount: 38,
    material: 'Gold',
    tags: ['Bold', 'Statement', 'Modern'],
    sizes: ['One Size'],
    defaultSize: 'One Size',
    stock: 7
  },
  {
    name: 'Thin Chain',
    image: '/assets/products/productB2.jpg',
    price: '₱5,100',
    priceValue: 5100,
    category: 'bracelets',
    description: 'A delicate thin chain bracelet for everyday elegance.',
    rating: 4.2,
    reviewCount: 29,
    material: 'Gold',
    tags: ['Delicate', 'Minimalist', 'Everyday'],
    sizes: ['One Size'],
    defaultSize: 'One Size',
    stock: 15
  },
  {
    name: 'Leafy Chain',
    image: '/assets/products/productB3.jpg',
    price: '₱5,100',
    priceValue: 5100,
    category: 'bracelets',
    description: 'A nature-inspired bracelet with leaf motifs.',
    rating: 4.3,
    reviewCount: 35,
    material: 'Gold',
    tags: ['Nature', 'Delicate', 'Elegant'],
    sizes: ['One Size'],
    defaultSize: 'One Size',
    stock: 12
  },
  {
    name: 'Flora Chain',
    image: '/assets/products/productB4.jpg',
    price: '₱2,266',
    priceValue: 2266,
    category: 'bracelets',
    description: 'A floral-inspired chain bracelet with delicate details.',
    rating: 4.1,
    reviewCount: 22,
    material: 'Gold',
    tags: ['Floral', 'Delicate', 'Feminine'],
    sizes: ['One Size'],
    defaultSize: 'One Size',
    stock: 18
  },
  {
    name: 'Arrow Cuff',
    image: '/assets/products/productB5.jpg',
    price: '₱2,833',
    priceValue: 2833,
    category: 'bracelets',
    description: 'A modern arrow-inspired cuff bracelet.',
    rating: 4.0,
    reviewCount: 18,
    material: 'Gold',
    tags: ['Modern', 'Geometric', 'Bold'],
    sizes: ['One Size'],
    defaultSize: 'One Size',
    stock: 10
  },
  {
    name: 'Diamond Studs',
    image: '/assets/products/productE1.jpg',
    price: '₱11,333',
    priceValue: 11333,
    category: 'earrings',
    description: 'Classic diamond stud earrings for timeless elegance.',
    rating: 4.8,
    reviewCount: 52,
    material: 'Gold',
    tags: ['Classic', 'Elegant', 'Formal'],
    sizes: ['One Size'],
    defaultSize: 'One Size',
    stock: 6
  },
  {
    name: 'Mini Hoops',
    image: '/assets/products/productE2.jpg',
    price: '₱5,100',
    priceValue: 5100,
    category: 'earrings',
    description: 'Delicate mini hoop earrings perfect for everyday wear.',
    rating: 4.4,
    reviewCount: 41,
    material: 'Gold',
    tags: ['Minimalist', 'Everyday', 'Versatile'],
    sizes: ['One Size'],
    defaultSize: 'One Size',
    stock: 14
  },
  {
    name: 'Dangling Leaves',
    image: '/assets/products/productE3.jpg',
    price: '₱3,400',
    priceValue: 3400,
    category: 'earrings',
    description: 'Elegant dangling earrings with leaf-inspired design.',
    rating: 4.3,
    reviewCount: 27,
    material: 'Gold',
    tags: ['Nature', 'Elegant', 'Statement'],
    sizes: ['One Size'],
    defaultSize: 'One Size',
    stock: 11
  },
  {
    name: 'Leaf Studs',
    image: '/assets/products/productE4.jpg',
    price: '₱2,266',
    priceValue: 2266,
    category: 'earrings',
    description: 'Delicate leaf-shaped stud earrings.',
    rating: 4.2,
    reviewCount: 33,
    material: 'Gold',
    tags: ['Nature', 'Delicate', 'Minimalist'],
    sizes: ['One Size'],
    defaultSize: 'One Size',
    stock: 16
  },
  {
    name: 'Chain Drops',
    image: '/assets/products/productE5.jpg',
    price: '₱2,266',
    priceValue: 2266,
    category: 'earrings',
    description: 'Modern chain drop earrings with contemporary appeal.',
    rating: 4.1,
    reviewCount: 19,
    material: 'Gold',
    tags: ['Modern', 'Geometric', 'Statement'],
    sizes: ['One Size'],
    defaultSize: 'One Size',
    stock: 13
  },
  {
    name: 'Ruby Pendant',
    image: '/assets/products/productN1.jpg',
    price: '₱14,166',
    priceValue: 14166,
    category: 'necklaces',
    description: 'A stunning ruby pendant necklace that exudes elegance.',
    rating: 4.7,
    reviewCount: 48,
    material: 'Gold',
    tags: ['Elegant', 'Luxury', 'Statement'],
    sizes: ['One Size'],
    defaultSize: 'One Size',
    stock: 5
  },
  {
    name: 'Diamond Choker',
    image: '/assets/products/productN1.jpg',
    price: '₱17,000',
    priceValue: 17000,
    category: 'necklaces',
    description: 'A luxurious diamond choker for special occasions.',
    rating: 4.9,
    reviewCount: 56,
    material: 'Gold',
    tags: ['Luxury', 'Formal', 'Statement'],
    sizes: ['One Size'],
    defaultSize: 'One Size',
    stock: 4
  },
  {
    name: 'Heart Drop',
    image: '/assets/products/productN1.jpg',
    price: '₱11,333',
    priceValue: 11333,
    category: 'necklaces',
    description: 'A romantic heart-shaped pendant necklace.',
    rating: 4.5,
    reviewCount: 39,
    material: 'Gold',
    tags: ['Romantic', 'Elegant', 'Sentimental'],
    sizes: ['One Size'],
    defaultSize: 'One Size',
    stock: 9
  },
  {
    name: 'Leaf Pendant',
    image: '/assets/products/productN1.jpg',
    price: '₱5,100',
    priceValue: 5100,
    category: 'necklaces',
    description: 'A delicate leaf pendant necklace with nature-inspired charm.',
    rating: 4.3,
    reviewCount: 31,
    material: 'Gold',
    tags: ['Nature', 'Delicate', 'Elegant'],
    sizes: ['One Size'],
    defaultSize: 'One Size',
    stock: 12
  },
  {
    name: 'Initial Pendant',
    image: '/assets/products/productN1.jpg',
    price: '₱5,666',
    priceValue: 5666,
    category: 'necklaces',
    description: 'A personalized initial pendant necklace.',
    rating: 4.4,
    reviewCount: 44,
    material: 'Gold',
    tags: ['Personalized', 'Sentimental', 'Elegant'],
    sizes: ['One Size'],
    defaultSize: 'One Size',
    stock: 10
  }
];

async function seedDatabase() {
  try {
    console.log('🌱 Starting database seeding...');

    // Check if products already exist
    const existingProducts = await Product.findAll();
    if (existingProducts.length > 0) {
      console.log('⚠️  Products already exist in database. Skipping seed.');
      console.log(`   Found ${existingProducts.length} existing products.`);
      return;
    }

    // Insert products
    for (const product of products) {
      await Product.create(product);
      console.log(`✅ Added: ${product.name}`);
    }

    console.log(`\n🎉 Successfully seeded ${products.length} products!`);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    throw error;
  } finally {
    // Close database connection
    await pool.end();
    process.exit(0);
  }
}

// Run seed if called directly
if (require.main === module) {
  seedDatabase();
}

module.exports = { seedDatabase, products };


