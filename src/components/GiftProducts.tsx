import React, { useState } from 'react';
import { Gift, Heart, Star } from 'lucide-react';
import { useCart } from '../contexts/CartContext';

interface GiftProduct {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  rating: number;
  popular: boolean;
}

const giftProducts: GiftProduct[] = [
  {
    id: 'gift-1',
    name: 'Mirror Gift Set',
    description: 'Custom engraved mirror with elegant gift packaging',
    price: 89.99,
    image: 'https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcT73qpCebHsafKTuNLPV02OaaFqDqYJcnokfioagG5ZdR9UG7-OB_5HZ7ru2k2o6HlUkw3aDC-1LxkiLIM2lBKpc16splDHFW4-NQM0wV0',
    rating: 4.8,
    popular: true
  },
  {
    id: 'gift-2',
    name: 'Decorative Glass Panels',
    description: 'Artistic frosted glass panels perfect for home decor',
    price: 129.99,
    image: 'https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcSKkl-XFDlSfs5i5HtvCeJQHPEpLnELgoPKL0yCpJnMXVlSe14KH7Nh0iM7Vc9QaYZYBbmCv4qDXlZd5sOgyIPQjBx40DxqpCDbnBkk2_il',
    rating: 4.6,
    popular: false
  },
  {
    id: 'gift-3',
    name: 'Premium Glass Photo Frame',
    description: 'Elegant beveled glass frame with premium finish',
    price: 45.99,
    image: 'https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcT-PR7_FO5X_6BfLI0O1fIrxT4Lx5H4n3CX9NB00jA9FwMfQXtJtsf2LmVTHqhAypTWVnJt3CFY_XCuwLLfQZnF4hwm2ecv-ueSGKgWnv0',
    rating: 4.7,
    popular: true
  },
  {
    id: 'gift-4',
    name: 'Glass Coaster Set',
    description: 'Set of 6 tempered glass coasters with gift box',
    price: 34.99,
    image: 'https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcSlKxmFjJy3R409gxoWxQ74m1AzE_-HlkwsAed5IEn11H3PE1lxUtxQ2K1ZIKILM3wrbXF356ykNNpcZl3iG3G9S78vigcLlkBiHCSeyrI',
    rating: 4.5,
    popular: false
  },
  {
    id: 'gift-5',
    name: 'Stained Glass Window Art',
    description: 'Handcrafted stained glass art piece',
    price: 199.99,
    image: 'https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcRfhbEzPh65eSEC4MM87RcxxFd-iB-XUK295DnLsP8iDfZ0zE83zltnmNYhSC-oRnte4GD1ajdGgMHtNcYndH17ZEhYpunRGwyDkaKlCGRKcN-Dqc7KkPPE',
    rating: 4.9,
    popular: true
  },
  {
    id: 'gift-6',
    name: 'Glass Candle Holders',
    description: 'Set of 3 elegant glass candle holders',
    price: 59.99,
    image: 'https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcSia08qWfcjw8JfQXIMq45HrMQQIytDxuf3VMj-S9oK8XKxsILGaz1S2RLF0g-qYTb1FNU3zi1HYDcc4LZXLV0w2AUfk483WoeazVoq7QCx6c8ZQ-XfaJPf',
    rating: 4.4,
    popular: false
  }
];

export const GiftProducts: React.FC = () => {
  const [selectedProduct, setSelectedProduct] = useState<GiftProduct | null>(null);
  const { addToCart } = useCart();

  const handleAddToCart = (product: GiftProduct) => {
    addToCart({
      id: `${product.id}-${Date.now()}`,
      name: product.name,
      price: product.price,
      quantity: 1,
      customization: {
        type: 'gift',
        description: product.description
      }
    });
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${i < Math.floor(rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
      />
    ));
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <div className="flex items-center justify-center space-x-2 mb-4">
          <Gift className="h-8 w-8 text-pink-600" />
          <h2 className="text-3xl font-bold text-gray-800">Glass Gift Products</h2>
        </div>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Discover our curated collection of glass gifts perfect for any occasion
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {giftProducts.map(product => (
          <div
            key={product.id}
            className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
          >
            <div className="relative h-48 overflow-hidden">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
              />
              {product.popular && (
                <div className="absolute top-4 left-4 bg-pink-500 text-white px-3 py-1 rounded-full text-sm font-medium flex items-center space-x-1">
                  <Heart className="h-3 w-3" />
                  <span>Popular</span>
                </div>
              )}
            </div>
            
            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">{product.name}</h3>
              <p className="text-gray-600 mb-4 line-clamp-2">{product.description}</p>
              
              <div className="flex items-center space-x-2 mb-4">
                <div className="flex items-center">
                  {renderStars(product.rating)}
                </div>
                <span className="text-gray-500 text-sm">({product.rating})</span>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="text-2xl font-bold text-gray-800">
                  ₹{product.price}
                </div>
                
                <button
                  onClick={() => handleAddToCart(product)}
                  className="bg-pink-600 hover:bg-pink-700 text-white px-4 py-2 rounded-lg transition-colors duration-200 flex items-center space-x-2"
                >
                  <Gift className="h-4 w-4" />
                  <span>Add to Cart</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};