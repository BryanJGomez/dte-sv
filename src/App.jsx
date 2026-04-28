// src/App.jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { InvoiceProvider } from './context/InvoiceContext';
import Navbar from './components/ui/Navbar';
import CatalogPage from './pages/CatalogPage';
import CheckoutPage from './pages/CheckoutPage';
import ConfirmationPage from './pages/ConfirmationPage';
import HistoryPage from './pages/HistoryPage';

const App = () => (
  <BrowserRouter>
    <CartProvider>
      <InvoiceProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={<CatalogPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/confirmacion" element={<ConfirmationPage />} />
          <Route path="/historial" element={<HistoryPage />} />
        </Routes>
      </InvoiceProvider>
    </CartProvider>
  </BrowserRouter>
);

export default App;
