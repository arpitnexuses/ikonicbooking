import React from 'react';
import { CheckCircle, Calendar, MapPin, Car } from 'lucide-react';
import type { BookingDetails } from '../../types';

interface BookingConfirmationProps {
  booking: BookingDetails;
}

export function BookingConfirmation({ booking }: BookingConfirmationProps) {
  return (
    <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-lg">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
          <CheckCircle className="w-8 h-8 text-green-500" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Booking Confirmed!</h2>
        <p className="text-gray-600">
          Your booking reference: <span className="font-semibold">IKN-{Date.now().toString(36).toUpperCase()}</span>
        </p>
      </div>

      <div className="space-y-6">
        <div className="border-b pb-6">
          <h3 className="text-lg font-semibold mb-4">Journey Details</h3>
          <div className="space-y-4">
            <div className="flex items-start">
              <Calendar className="w-5 h-5 text-gray-400 mt-1 mr-3" />
              <div>
                <p className="font-medium">Date & Time</p>
                <p className="text-gray-600">
                  {new Date(`${booking.date}T${booking.time}`).toLocaleString()}
                </p>
              </div>
            </div>
            <div className="flex items-start">
              <MapPin className="w-5 h-5 text-gray-400 mt-1 mr-3" />
              <div>
                <p className="font-medium">Pickup Location</p>
                <p className="text-gray-600">{booking.pickupLocation.address}</p>
                {booking.type === 'transfer' && booking.dropoffLocation && (
                  <>
                    <p className="font-medium mt-2">Drop-off Location</p>
                    <p className="text-gray-600">{booking.dropoffLocation.address}</p>
                  </>
                )}
              </div>
            </div>
            {booking.vehicle && (
              <div className="flex items-start">
                <Car className="w-5 h-5 text-gray-400 mt-1 mr-3" />
                <div>
                  <p className="font-medium">Vehicle</p>
                  <p className="text-gray-600">{booking.vehicle.name}</p>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="border-b pb-6">
          <h3 className="text-lg font-semibold mb-4">Payment Summary</h3>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-600">Service Type</span>
              <span className="font-medium">
                {booking.type === 'transfer' ? 'Transfer' : 'Hourly Service'}
              </span>
            </div>
            {booking.duration && (
              <div className="flex justify-between">
                <span className="text-gray-600">Duration</span>
                <span className="font-medium">{booking.duration} hours</span>
              </div>
            )}
            <div className="flex justify-between text-lg font-bold text-[#FF6600]">
              <span>Total Amount</span>
              <span>AED {booking.price.toFixed(2)}</span>
            </div>
          </div>
        </div>

        <div className="text-center space-y-4">
          <p className="text-gray-600">
            A confirmation email has been sent to your email address.
          </p>
          <button
            onClick={() => window.print()}
            className="text-[#FF6600] hover:text-[#e65c00] font-medium"
          >
            Download Receipt
          </button>
        </div>
      </div>
    </div>
  );
}