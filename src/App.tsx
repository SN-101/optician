import React, { useState } from 'react';
import { LanguageProvider } from './contexts/LanguageContext';
import { WishlistProvider } from './contexts/WishlistContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { ProductsPage } from './pages/ProductsPage';
import { BookingPage } from './pages/BookingPage';
import { AboutPage } from './pages/AboutPage';
import { WishlistPage } from './pages/WishlistPage';
import { TryOnModal } from './components/TryOnModal';
import { Product } from './data/products';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedProductForBooking, setSelectedProductForBooking] = useState<string | undefined>();
  const [tryOnModalOpen, setTryOnModalOpen] = useState(false);
  const [tryOnProduct, setTryOnProduct] = useState<Product | null>(null);

  const handleNavigate = (page: string, productId?: string) => {
    setCurrentPage(page);
    if (page === 'booking' && productId) {
      setSelectedProductForBooking(productId);
    } else {
      setSelectedProductForBooking(undefined);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleTryOn = (product: Product) => {
    setTryOnProduct(product);
    setTryOnModalOpen(true);
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage onNavigate={handleNavigate} />;
      case 'products':
        return <ProductsPage onNavigate={handleNavigate} onTryOn={handleTryOn} />;
      case 'booking':
        return <BookingPage selectedProductId={selectedProductForBooking} />;
      case 'about':
        return <AboutPage />;
      case 'wishlist':
        return <WishlistPage onNavigate={handleNavigate} onTryOn={handleTryOn} />;
      default:
        return <HomePage onNavigate={handleNavigate} />;
    }
  };

  return (
    <LanguageProvider>
      <WishlistProvider>
        <div className="min-h-screen flex flex-col">
          <Navbar currentPage={currentPage} onNavigate={handleNavigate} />
          <main className="flex-grow">
            {renderPage()}
          </main>
          <Footer />
          <TryOnModal
            isOpen={tryOnModalOpen}
            onClose={() => {
              setTryOnModalOpen(false);
              setTryOnProduct(null);
            }}
            product={tryOnProduct}
          />
        </div>
      </WishlistProvider>
    </LanguageProvider>
  );
}

export default App;
