import React from 'react';
import { MapPin, Calendar, Clock, Car } from 'lucide-react';
import { RouteMap } from '../Map/RouteMap';
import type { BookingDetails } from '../../types';

interface JourneySummaryProps {
  booking: BookingDetails;
  onProceed: () => void;
  onBack: () => void;
}

export function JourneySummary({ booking, onProceed, onBack }: JourneySummaryProps) {
  return (
    <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
      {booking.type === 'transfer' && booking.dropoffLocation && (
        <div className="h-[400px]">
          <RouteMap
            pickupLocation={booking.pickupLocation}
            dropoffLocation={booking.dropoffLocation}
          />
        </div>
      )}

      <div className="p-6">
        <h2 className="text-2xl font-semibold mb-6">Journey Summary</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="flex items-start space-x-3">
              <MapPin className="w-5 h-5 text-[#FF6600] mt-1" />
              <div>
                <p className="font-medium">Pickup Location</p>
                <p className="text-gray-600">{booking.pickupLocation.address}</p>
              </div>
            </div>

            {booking.type === 'transfer' && booking.dropoffLocation && (
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-[#FF6600] mt-1" />
                <div>
                  <p className="font-medium">Drop-off Location</p>
                  <p className="text-gray-600">{booking.dropoffLocation.address}</p>
                </div>
              </div>
            )}

            <div className="flex items-start space-x-3">
              <Calendar className="w-5 h-5 text-[#FF6600] mt-1" />
              <div>
                <p className="font-medium">Date</p>
                <p className="text-gray-600">
                  {new Date(booking.date).toLocaleDateString()}
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <Clock className="w-5 h-5 text-[#FF6600] mt-1" />
              <div>
                <p className="font-medium">Time</p>
                <p className="text-gray-600">
                  {new Date(`2000-01-01T${booking.time}`).toLocaleTimeString()}
                </p>
              </div>
            </div>
          </div>

          {booking.vehicle && (
            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="flex items-start space-x-3 mb-4">
                <Car className="w-5 h-5 text-[#FF6600] mt-1" />
                <div>
                  <p className="font-medium">Selected Vehicle</p>
                  <p className="text-gray-600">{booking.vehicle.name}</p>
                </div>
              </div>

              <div className="space-y-3">
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

                <div className="pt-3 border-t">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Total Amount</span>
                    <span className="text-2xl font-bold text-[#FF6600]">
                      AED {booking.price.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="flex justify-between mt-8">
          <button
            onClick={onBack}
            className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Back
          </button>
          <button
            onClick={onProceed}
            className="px-6 py-2 bg-[#FF6600] text-white rounded-lg hover:bg-[#e65c00] transition-colors"
          >
            Proceed to Payment
          </button>
        </div>
      </div>
    </div>
  );
}