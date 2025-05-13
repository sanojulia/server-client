import mongoose from 'mongoose';
import Products from './models/Products.js';
import process from 'process';

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// Sample product data from your mock
const sampleProducts = [
  {
    name: "Elegant Blouse",
    brand: "JUSA Pro",
    description: "Elevate your wardrobe with the timeless sophistication of the Elegant Blouse. Crafted in a soft and versatile beige hue, this blouse features a graceful design that complements any outfit. Its lightweight fabric offers exceptional comfort, making it perfect for both casual outings and formal occasions. With its impeccable tailoring and classic appeal, the Elegant Blouse is a must-have for anyone who values effortless elegance.",
    price: 89.99,
    originalPrice: 99.99,
    isSale: true,
    colors: ["Beige"],
    sizes: ["XS", "S", "M", "L"],
    type: "Blouses",
    isNew: true,
    isNewColletion: true,
    image: {
      main: '/images/women/d1-1.jpg',
      hover: '/images/women/d1-2.jpg'
    }
  },
  {
    name: "Printed Summer Blouse",
    brand: "JUSA Pro",
    price: 79,
    colors: ["Floral Print"],
    sizes: ["XS", "S", "M", "L"],
    type: "Blouses",
    image: {
      main: '/images/women/d2-1.jpg',
      hover: '/images/women/d2-2.jpg'
    }
  },
  {
    name: "Classic Cashmere Sweater",
    brand: "JUSA Pro",
    price: 69.99,
    originalPrice: 89.99,
    isSale: true,
    colors: ["Beige"],
    sizes: ["S", "M", "L", "XL"],
    type: "Sweaters",
    image: {
      main: '/images/women/j1-1.jpg',
      hover: '/images/women/j1-2.jpg'
    }
  }
];

// Create products
async function createProducts() {
  try {
    // Delete existing products
    await Products.deleteMany({});
    console.log('Deleted existing products');

    // Create new products
    const products = await Products.insertMany(sampleProducts);
    console.log(`Created ${products.length} products`);

    process.exit(0);
  } catch (error) {
    console.error('Error creating products:', error);
    process.exit(1);
  }
}

createProducts();
