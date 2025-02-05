import React from 'react';
import { CheckCircle, Home } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

export function BookingConfirmationPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const booking = location.state?.booking;

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-2xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-lg p-8 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-green-500" />
          </div>
          
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Booking Confirmed!
          </h1>
          
          <p className="text-lg text-gray-600 mb-8">
            Thank you for your booking. Your luxury ride has been confirmed.
          </p>

          {booking && (
            <div className="bg-gray-50 rounded-lg p-6 mb-8 text-left">
              <h2 className="text-xl font-semibold mb-4">Booking Details</h2>
              <div className="space-y-3">
                <p><span className="font-medium">Name:</span> {booking.name}</p>
                <p><span className="font-medium">Vehicle:</span> {booking.vehicle.name}</p>
                <p><span className="font-medium">Date:</span> {booking.date}</p>
                <p><span className="font-medium">Time:</span> {booking.time}</p>
                <p><span className="font-medium">Amount Paid:</span> AED {booking.price.toFixed(2)}</p>
              </div>
            </div>
          )}

          <button
            onClick={() => {
              navigate('/');
              window.location.reload();
            }}
            className="bg-[#FF6600] text-white px-8 py-3 rounded-lg font-medium hover:bg-[#e65c00] transition-colors flex items-center justify-center space-x-2 w-full"
          >
            <Home className="w-5 h-5" href='/'/>
            <span>Return to Home</span>
          </button>
        </div>
      </div>
    </div>
  );
} 