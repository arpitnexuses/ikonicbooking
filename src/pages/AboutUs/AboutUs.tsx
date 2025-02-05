import React from 'react';
import { Car, Clock, Shield } from 'lucide-react';

export function AboutUs() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Elevating Luxury Travel with Unmatched Service
          </h1>
          <p className="text-xl text-gray-600">
            At Ikonic Limousine, your time is our priority. We deliver precision, comfort, and reliability to transform every journey.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
          <div className="text-center">
            <div className="bg-[#FF6600] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Car className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Premium Fleet</h3>
            <p className="text-gray-600">
              Luxury vehicles maintained to the highest standards for your comfort and safety.
            </p>
          </div>

          <div className="text-center">
            <div className="bg-[#FF6600] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Clock className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Punctual Service</h3>
            <p className="text-gray-600">
              Professional chauffeurs ensuring timely arrivals and departures.
            </p>
          </div>

          <div className="text-center">
            <div className="bg-[#FF6600] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Safety First</h3>
            <p className="text-gray-600">
              Comprehensive safety measures and trained professionals for peace of mind.
            </p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Contact Information</h2>
          <div className="space-y-4">
            <p>
              <strong>Address:</strong> Office 608, Jumeirah Lakes Tower, Cluster X2, Dubai
            </p>
            <p>
              <strong>Support:</strong>{' '}
              <a href="mailto:support@ikoniclimousine.com" className="text-[#FF6600]">
                support@ikoniclimousine.com
              </a>
            </p>
            <p>
              <strong>Phone:</strong>{' '}
              <a href="tel:+97144498900" className="text-[#FF6600]">
                +971 44 498900
              </a>
              {' / '}
              <a href="tel:+971521296105" className="text-[#FF6600]">
                +971 52 129 6105
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}