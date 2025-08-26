import { useState } from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { LoginScreen } from './components/LoginScreen';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ProductCatalog } from './components/ProductCatalog';
import { ProductDetails } from './components/ProductDetails';
import { GiftProducts } from './components/GiftProducts';
import { Cart } from './components/Cart';
import { CustomerFeedback } from './components/CustomerFeedback';
import { Footer } from './components/Footer';
import { CartProvider } from './contexts/CartContext';
import { Product } from './components/ProductCatalog';
import CustomCursor from './components/CustomCursor'; // added

function AppContent() {
  const { isAuthenticated, login } = useAuth();
  const [activeSection, setActiveSection] = useState<'products' | 'gifts' | 'cart' | 'feedback'>('products');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  if (!isAuthenticated) {
    return <LoginScreen onLogin={login} />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <CustomCursor /> {/* added cursor here */}
      <Header 
        activeSection={activeSection} 
        setActiveSection={setActiveSection}
        onBackToProducts={() => setSelectedProduct(null)}
        showBackButton={!!selectedProduct}
      />
      {!selectedProduct && <Hero />}
      
      <main className="container mx-auto px-4 py-8">
        {selectedProduct ? (
          <ProductDetails 
            product={selectedProduct} 
            onBack={() => setSelectedProduct(null)} 
          />
        ) : (
          <>
            {activeSection === 'products' && <ProductCatalog onProductClick={setSelectedProduct} />}
            {activeSection === 'feedback' && <CustomerFeedback />}
          </>
        )}
        {activeSection === 'gifts' && <GiftProducts />}
        {activeSection === 'cart' && <Cart />}
      </main>
      
      <Footer />
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <AppContent />
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
