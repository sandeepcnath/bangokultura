import { Routes, Route } from 'react-router-dom';
import { Navigation } from './components/Navigation';
import { CartSidebar } from './components/CartSidebar';
import { HomePage } from './pages/HomePage';
import { NailArtPage } from './pages/NailArtPage';
import { PerfumesPage } from './pages/PerfumesPage';
import { ToysPage } from './pages/ToysPage';
import { NewArrivalsPage } from './pages/NewArrivalsPage';
import { CheckoutPage } from './pages/CheckoutPage';
import './App.css';

function App() {
  return (
    <div className="relative min-h-screen bg-cloud">
      {/* Grain Overlay */}
      <div className="grain-overlay" />
      
      {/* Navigation */}
      <Navigation />
      
      {/* Cart Sidebar - Accessible from any page */}
      <CartSidebar />
      
      {/* Page Routes */}
      <main className="relative">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/nail-art" element={<NailArtPage />} />
          <Route path="/perfumes" element={<PerfumesPage />} />
          <Route path="/toys" element={<ToysPage />} />
          <Route path="/new-arrivals" element={<NewArrivalsPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
