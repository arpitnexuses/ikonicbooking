import React, { useState } from 'react';
import { CreditCard, Lock, Car, MapPin, Calendar } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import type { BookingDetails } from '../../types';

export function PaymentForm() {
  const navigate = useNavigate();
  const location = useLocation();
  const booking = location.state?.booking;

  // Redirect if no booking data
  if (!booking) {
    navigate('/car-selection');
    return null;
  }

  const [isProcessing, setIsProcessing] = useState(false);
  const [formData, setFormData] = useState({
    cardNumber: '',
    expiry: '',
    cvc: '',
    name: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    let formattedValue = value;

    if (name === 'cardNumber') {
      formattedValue = formatCardNumber(value);
    } else if (name === 'expiry') {
      formattedValue = formatExpiry(value);
    } else if (name === 'cvc') {
      formattedValue = value.replace(/\D/g, '').slice(0, 3);
    }

    setFormData(prev => ({
      ...prev,
      [name]: formattedValue
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      // Navigate to confirmation page with booking details
      navigate('/booking-confirmation', { 
        state: { booking },
        replace: true 
      });
    }, 2000);
  };

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || '';
    const parts = [];

    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }

    return parts.length ? parts.join(' ') : value;
  };

  const formatExpiry = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    if (v.length >= 2) {
      return v.slice(0, 2) + '/' + v.slice(2, 4);
    }
    return v;
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-lg">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">Payment Details</h2>
        <Lock className="text-gray-400" />
      </div>

      {/* Booking Summary */}
      <div className="mb-6 bg-gray-50 p-3 rounded-lg">
        <h3 className="text-base font-semibold mb-2">Booking Summary</h3>
        <div className="space-y-1">
          <div className="flex items-center text-gray-600 text-sm">
            <Car className="w-4 h-4 mr-2 text-[#FF6600]" />
            <span>{booking.vehicle.name}</span>
          </div>
          <div className="flex items-center text-gray-600 text-sm">
            <MapPin className="w-4 h-4 mr-2 text-[#FF6600]" />
            <div className="flex-1">
              <p>From: {booking.pickupLocation}</p>
              <p>To: {booking.dropoffLocation}</p>
            </div>
          </div>
          <div className="flex items-center text-gray-600 text-sm">
            <Calendar className="w-4 h-4 mr-2 text-[#FF6600]" />
            <span>{booking.date} at {booking.time}</span>
          </div>
        </div>
      </div>

      <div className="mb-4">
        <div className="flex justify-between items-center">
          <span className="text-gray-600">Amount to Pay</span>
          <span className="text-xl font-bold text-[#FF6600]">
            AED {booking.price.toFixed(2)}
          </span>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Cardholder Name
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="John Doe"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-[#FF6600] focus:border-[#FF6600]"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Card Number
          </label>
          <div className="relative">
            <CreditCard className="absolute left-3 top-2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              name="cardNumber"
              value={formData.cardNumber}
              onChange={handleInputChange}
              maxLength={19}
              placeholder="1234 5678 9012 3456"
              className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-[#FF6600] focus:border-[#FF6600]"
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Expiry Date
            </label>
            <input
              type="text"
              name="expiry"
              value={formData.expiry}
              onChange={handleInputChange}
              maxLength={5}
              placeholder="MM/YY"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-[#FF6600] focus:border-[#FF6600]"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              CVC
            </label>
            <input
              type="text"
              name="cvc"
              value={formData.cvc}
              onChange={handleInputChange}
              maxLength={3}
              placeholder="123"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-[#FF6600] focus:border-[#FF6600]"
              required
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={isProcessing}
          className={`w-full bg-[#FF6600] text-white py-2 px-6 rounded-lg font-medium 
            ${isProcessing ? 'opacity-75 cursor-not-allowed' : 'hover:bg-[#e65c00]'} 
            transition-colors`}
        >
          {isProcessing ? 'Processing...' : 'Pay Now'}
        </button>
      </form>

      <div className="mt-4 text-center text-xs text-gray-500">
        <Lock className="inline-block w-3 h-3 mr-1" />
        Your payment information is secure
      </div>
    </div>
  );
}