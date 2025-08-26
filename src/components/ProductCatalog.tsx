import React, { useState } from 'react';
import { ProductCard } from './ProductCard';
import { Search, Filter } from 'lucide-react';

export interface Product {
  id: string;
  name: string;
  category: string;
  description: string;
  basePrice: number;
  image: string;
  specifications: string[];
}

const products: Product[] = [
  {
    id: '1',
    name: 'Mirror Glass',
    category: 'Mirrors',
    description: 'High-quality silvered mirror glass with crystal-clear reflection',
    basePrice: 15,
    image: 'https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcR0xuTm3nya1am22OBQu4HnqxBuzBkj0gAfX_1oisEeU-jAI8zO5kgl1VfxEeOuO5iFxIv7KB3ADVLaadeqLrdPrV-vPF4RQ3tmTy4Se8BabHONmkSC65sb',
    specifications: ['6mm thickness', 'Silvered backing', 'Polished edges', 'Moisture resistant']
  },
  {
    id: '2',
    name: 'Window Glass',
    category: 'Windows',
    description: 'Clear float glass perfect for windows and architectural applications',
    basePrice: 12,
    image: 'https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcRrw5_gwa6OVI2IC9AdD7rz6H8uRdqxhHsjpEjD0pNThx9y0d-euvJZvaGGioSkxLaVaSbQkW89V1OuAovEUgz-dGZLTW52',
    specifications: ['4mm thickness', 'Float glass', 'UV protection', 'Thermal resistant']
  },
  {
    id: '3',
    name: 'Tempered Glass',
    category: 'Safety',
    description: 'Heat-treated safety glass with enhanced strength and durability',
    basePrice: 25,
    image: 'https://www.vsomglass.com/wp-content/uploads/2021/09/8mm-ultra-clear-tempered-glass-vsom-products.jpg',
    specifications: ['8mm thickness', 'Safety certified', 'Heat resistant', 'Shatterproof']
  },
  {
    id: '4',
    name: 'Frosted Glass',
    category: 'Decorative',
    description: 'Elegant frosted glass for privacy and decorative applications',
    basePrice: 18,
    image: 'https://d3kjluh73b9h9o.cloudfront.net/optimized/4X/d/c/9/dc994a79ac1318f516f8a325898d30b34df65d0d_2_690x459.jpeg',
    specifications: ['5mm thickness', 'Acid etched', 'Privacy glass', 'Easy to clean']
  },
  {
    id: '5',
    name: 'Laminated Glass',
    category: 'Safety',
    description: 'Multi-layer safety glass with interlayer for enhanced security',
    basePrice: 30,
    image: 'https://www.meandmyglass.co.uk/wp-content/uploads/2022/11/laminated-glass.jpg',
    specifications: ['6.38mm thickness', 'PVB interlayer', 'Security glass', 'Sound dampening']
  },
  {
    id: '6',
    name: 'Tinted Glass',
    category: 'Decorative',
    description: 'Colored glass available in various tints for aesthetic appeal',
    basePrice: 20,
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS4kPuylIFMN0mGNrlBVJlxX83Du-Iv_tpu7Q&s',
    specifications: ['5mm thickness', 'Color options', 'UV filtering', 'Fade resistant']
  }
];

interface ProductCatalogProps {
  onProductClick: (product: Product) => void;
}

export const ProductCatalog: React.FC<ProductCatalogProps> = ({ onProductClick }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', ...Array.from(new Set(products.map(p => p.category)))];

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Glass Products</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Choose from our premium selection of glass products and customize them to your exact requirements
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div className="flex items-center space-x-2">
          <Filter className="h-5 w-5 text-gray-400" />
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map(product => (
          <ProductCard
            key={product.id}
            product={product}
            onProductClick={onProductClick}
          />
        ))}
      </div>
    </div>
  );
};