import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Product from './models/Product';

dotenv.config();

const sampleProducts = [
  {
    name: "Wireless Headphones",
    price: 99.99,
    description: "High-quality wireless headphones with noise cancellation",
    category: "Electronics",
    inStock: true
  },
  {
    name: "Smart Watch",
    price: 249.99,
    description: "Feature-rich smartwatch with health monitoring",
    category: "Electronics",
    inStock: true
  },
  {
    name: "Coffee Maker",
    price: 79.99,
    description: "Programmable coffee maker with thermal carafe",
    category: "Home & Kitchen",
    inStock: true
  },
  {
    name: "Yoga Mat",
    price: 29.99,
    description: "Non-slip yoga mat for all types of yoga practice",
    category: "Sports & Fitness",
    inStock: true
  },
  {
    name: "Bluetooth Speaker",
    price: 59.99,
    description: "Portable Bluetooth speaker with excellent sound quality",
    category: "Electronics",
    inStock: false
  }
];

const seedDatabase = async () => {
  try {
    const mongoURI = process.env.MONGODB_URI as string;
    await mongoose.connect(mongoURI);
    console.log('Connected to MongoDB');

    // Clear existing products
    await Product.deleteMany({});
    console.log('Cleared existing products');

    // Insert sample products
    const createdProducts = await Product.insertMany(sampleProducts);
    console.log(`Created ${createdProducts.length} sample products`);

    console.log('Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();
