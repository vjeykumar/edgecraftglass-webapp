# Backend Server with MongoDB Integration

This is a Node.js Express server with TypeScript and MongoDB integration using Mongoose.

## Features

- Express.js server with TypeScript
- MongoDB integration with Mongoose
- CORS enabled for frontend integration
- Error handling middleware
- Product CRUD operations
- Environment-based configuration

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (local installation or MongoDB Atlas)

## Installation

1. Navigate to the server directory:
   ```bash
   cd server
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   - Copy `.env.example` to `.env`
   - Update the MongoDB connection string in `.env`

## Environment Variables

Create a `.env` file in the server directory with the following variables:

```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/mydatabase
NODE_ENV=development
```

## Running the Server

### Development Mode
```bash
npm run dev
```

### Production Mode
```bash
npm run build
npm start
```

## API Endpoints

### Health Check
- **GET** `/api/health` - Check server status

### Products
- **GET** `/api/products` - Get all products
- **GET** `/api/products/:id` - Get product by ID
- **POST** `/api/products` - Create new product
- **PUT** `/api/products/:id` - Update product
- **DELETE** `/api/products/:id` - Delete product

### Example Product Object
```json
{
  "name": "Sample Product",
  "price": 29.99,
  "description": "A sample product description",
  "category": "Electronics",
  "imageUrl": "https://example.com/image.jpg",
  "inStock": true
}
```

## Testing the API

You can test the API using curl, Postman, or any REST client:

```bash
# Health check
curl http://localhost:5000/api/health

# Get all products
curl http://localhost:5000/api/products

# Create a new product
curl -X POST http://localhost:5000/api/products \
  -H "Content-Type: application/json" \
  -d '{"name":"Test Product","price":19.99,"description":"Test description","inStock":true}'
```

## Project Structure

```
server/
├── src/
│   ├── models/
│   │   └── Product.ts          # Product schema and model
│   ├── routes/
│   │   └── productRoutes.ts    # Product API routes
│   ├── middleware/
│   │   └── errorHandler.ts     # Error handling middleware
│   └── index.ts                # Main server file
├── package.json
├── tsconfig.json
├── .env
└── README.md
```

## Integration with Frontend

To integrate with your React frontend, update your API calls to point to:
- Base URL: `http://localhost:5000/api`
- Products endpoint: `http://localhost:5000/api/products`

Make sure to handle CORS if running on different ports (already configured in this server).
