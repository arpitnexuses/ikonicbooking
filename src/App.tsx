import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Header } from './components/Header';
import { HomePage } from './pages/HomePage/HomePage';
import { CorporateServices } from './pages/CorporateServices/CorporateServices';
import { AboutUs } from './pages/AboutUs/AboutUs';
import { PaymentPage } from './pages/Payment/PaymentPage';
import { BookingConfirmationPage } from './pages/BookingConfirmation/BookingConfirmationPage';
import { BookingProvider } from './contexts/BookingContext';

function App() {
  return (
    <BookingProvider>
      <div className="min-h-screen bg-gray-50">
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/corporate" element={<CorporateServices />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/payment" element={<PaymentPage />} />
          <Route path="/booking-confirmation" element={<BookingConfirmationPage />} />
        </Routes>
      </div>
    </BookingProvider>
  );
}

export default App;