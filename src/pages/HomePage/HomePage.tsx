import React from 'react';
import { Users, Check } from 'lucide-react';
import { BookingForm } from '../../components/BookingForm';
import { useBooking } from '../../contexts/BookingContext';
import { vehicles } from '../../data/vehicles';

export function HomePage() {
  const { dispatch } = useBooking();

  return (
    <div className="min-h-screen bg-gray-50">
      <main>
        {/* Hero Section */}
        <div 
          className="relative py-20 px-4 sm:px-6 lg:px-8"
          style={{
            backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url("https://images.unsplash.com/photo-1631486360642-ee16c6b4a0f6?auto=format&fit=crop&q=80")',
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        >
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                Luxury Chauffeur Service in Dubai
              </h1>
              <p className="text-xl text-white">
                Experience premium transportation with professional chauffeurs
              </p>
            </div>
            
            <BookingForm />
          </div>
        </div>

        {/* Fleet Showcase */}
        <div className="bg-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900">Our Luxury Fleet</h2>
              <p className="mt-4 text-lg text-gray-600">Choose from our selection of premium vehicles</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {vehicles.map((vehicle) => (
                <div key={vehicle.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
                  <div className="aspect-w-16 aspect-h-9">
                    <img
                      src={vehicle.imageUrl}
                      alt={vehicle.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-2">{vehicle.name}</h3>
                    <div className="flex items-center text-gray-600 mb-2">
                      <Users className="w-4 h-4 mr-2" />
                      <span>Up to {vehicle.capacity} passengers</span>
                    </div>
                    <div className="space-y-2 mb-4">
                      {vehicle.features.slice(0, 3).map((feature, index) => (
                        <div key={index} className="flex items-center text-gray-600">
                          <Check className="w-4 h-4 mr-2 text-[#FF6600]" />
                          <span className="text-sm">{feature}</span>
                        </div>
                      ))}
                    </div>
                    <div className="pt-4 border-t">
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="text-sm text-gray-500">Starting from</p>
                          <p className="text-lg font-bold text-[#FF6600]">
                            AED {vehicle.pricePerKm}/km
                          </p>
                        </div>
                        <button
                          onClick={() => {
                            dispatch({ type: 'SET_VEHICLE', payload: vehicle });
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                          }}
                          className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                        >
                          Select
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}