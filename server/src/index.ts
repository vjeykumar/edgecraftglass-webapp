import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import productRoutes from './routes/productRoutes';
import { errorHandler } from './middleware/errorHandler';

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Health Check Endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Server is running' });
});

// Use Product Routes
app.use('/api/products', productRoutes);

// Global Error Handling Middleware
app.use(errorHandler);

// Connect to MongoDB and Start Server
const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGODB_URI as string;
    await mongoose.connect(mongoURI);
    console.log('Connected to MongoDB');
    
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
      console.log(`Health check: http://localhost:${port}/api/health`);
      console.log(`Products API: http://localhost:${port}/api/products`);
    });
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1);
  }
};

// Handle graceful shutdown
process.on('SIGINT', async () => {
  console.log('\nShutting down gracefully...');
  await mongoose.connection.close();
  process.exit(0);
});

connectDB();
