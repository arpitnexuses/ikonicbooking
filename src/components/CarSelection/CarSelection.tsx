import React, { useState } from 'react';
import { Car, Users, Star, Check, Shield, Clock, ArrowRight, Calendar, Phone, Mail, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import type { Vehicle } from '../../types';

interface CarSelectionProps {
  vehicles: Vehicle[];
  selectedVehicle: Vehicle | null;
  onSelect: (vehicle: Vehicle) => void;
}

export function CarSelection({ vehicles, selectedVehicle, onSelect }: CarSelectionProps) {
  const navigate = useNavigate();
  const [bookingForm, setBookingForm] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    time: '',
    notes: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setBookingForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleNextClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!selectedVehicle) return;

    // Validate required fields
    if (!bookingForm.name || !bookingForm.email || !bookingForm.phone || !bookingForm.date || !bookingForm.time) {
      alert('Please fill in all required fields');
      return;
    }

    try {
      // Calculate estimated price (this is a demo calculation)
      const estimatedPrice = selectedVehicle.pricePerKm * 10; // Assuming 10km distance for demo
      
      const bookingData = {
        vehicle: selectedVehicle,
        ...bookingForm,
        price: estimatedPrice,
      };

      // Navigate to payment with booking details
      navigate('/payment', { 
        state: { 
          booking: bookingData 
        },
        replace: true  // This ensures we replace the current route
      });
    } catch (error) {
      console.error('Navigation error:', error);
      alert('There was an error processing your booking. Please try again.');
    }
  };

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-semibold text-gray-900">Select Your Vehicle</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {vehicles.map((vehicle) => (
          <div
            key={vehicle.id}
            onClick={() => onSelect(vehicle)}
            className={`bg-white rounded-lg shadow-lg overflow-hidden transition-all cursor-pointer ${
              selectedVehicle?.id === vehicle.id
                ? 'ring-2 ring-[#FF6600]'
                : 'hover:shadow-xl hover:scale-[1.02]'
            }`}
          >
            <div className="aspect-w-16 aspect-h-9">
              <img
                src={vehicle.imageUrl}
                alt={vehicle.name}
                className="w-full h-full object-cover"
              />
            </div>
            
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-semibold mb-2">{vehicle.name}</h3>
                  <div className="flex items-center text-gray-600">
                    <Users className="w-5 h-5 mr-2" />
                    <span>Up to {vehicle.capacity} passengers</span>
                  </div>
                </div>
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-5 h-5 text-yellow-400 fill-current"
                    />
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="flex items-center text-gray-600">
                  <Shield className="w-5 h-5 mr-2 text-[#FF6600]" />
                  <span>Safety Features</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Clock className="w-5 h-5 mr-2 text-[#FF6600]" />
                  <span>24/7 Available</span>
                </div>
              </div>

              <div className="border-t pt-4 mb-6">
                <h4 className="font-medium mb-3">Premium Features:</h4>
                <div className="grid grid-cols-1 gap-2">
                  {vehicle.features.map((feature, index) => (
                    <div key={index} className="flex items-center text-gray-600">
                      <Check className="w-4 h-4 mr-2 text-[#FF6600]" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="border-t pt-4">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm text-gray-500">Starting from</p>
                    <div className="space-y-1">
                      <p className="text-lg font-bold text-[#FF6600]">
                        AED {vehicle.pricePerKm}/km
                      </p>
                      <p className="text-sm text-gray-500">
                        or AED {vehicle.pricePerHour}/hour
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelect(vehicle);
                    }}
                    className={`px-6 py-2 rounded-lg font-medium ${
                      selectedVehicle?.id === vehicle.id
                        ? 'bg-[#FF6600] text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    } transition-colors`}
                  >
                    {selectedVehicle?.id === vehicle.id ? 'Selected' : 'Select'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Booking Form Section */}
      {selectedVehicle && (
        <div className="mt-12 bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-xl font-semibold mb-6">Booking Details</h3>
          <form onSubmit={(e) => e.preventDefault()} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name *
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    name="name"
                    value={bookingForm.name}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-[#FF6600] focus:border-[#FF6600]"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number *
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <input
                    type="tel"
                    name="phone"
                    value={bookingForm.phone}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-[#FF6600] focus:border-[#FF6600]"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email *
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <input
                    type="email"
                    name="email"
                    value={bookingForm.email}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-[#FF6600] focus:border-[#FF6600]"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Date *
                </label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <input
                    type="date"
                    name="date"
                    value={bookingForm.date}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-[#FF6600] focus:border-[#FF6600]"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Time *
                </label>
                <div className="relative">
                  <Clock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <input
                    type="time"
                    name="time"
                    value={bookingForm.time}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-[#FF6600] focus:border-[#FF6600]"
                    required
                  />
                </div>
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Special Notes (Optional)
                </label>
                <textarea
                  name="notes"
                  value={bookingForm.notes}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#FF6600] focus:border-[#FF6600]"
                  rows={3}
                />
              </div>
            </div>

            <div className="mt-8 flex justify-end">
              <button
                onClick={handleNextClick}
                className="bg-[#FF6600] text-white px-8 py-3 rounded-lg font-medium hover:bg-[#e65c00] transition-colors flex items-center space-x-2"
              >
                <span>Continue to Payment</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}