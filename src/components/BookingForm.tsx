import React, { useEffect, useRef } from 'react';
import { Calendar, Clock } from 'lucide-react';
import { LocationSearch } from './Map/LocationSearch';
import { CarSelection } from './CarSelection/CarSelection';
import { PassengerDetailsForm } from './PassengerDetails/PassengerDetailsForm';
import { JourneySummary } from './BookingSummary/JourneySummary';
import { BookingSteps } from './BookingSteps/BookingSteps';
import { useBooking } from '../contexts/BookingContext';
import { vehicles } from '../data/vehicles';
import type { BookingType, Location, Vehicle } from '../types';

export function BookingForm() {
  const { state, dispatch } = useBooking();
  const [bookingType, setBookingType] = React.useState<BookingType>('transfer');
  const formRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Try multiple scroll methods to ensure it works
    window.scrollTo(0, 0);
    document.documentElement.scrollTo(0, 0);
    document.body.scrollTo(0, 0);
    formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, [state.step]);

  const handlePickupSelect = (location: Location) => {
    dispatch({ type: 'SET_PICKUP_LOCATION', payload: location });
  };

  const handleDropoffSelect = (location: Location) => {
    dispatch({ type: 'SET_DROPOFF_LOCATION', payload: location });
  };

  const handleVehicleSelect = (vehicle: Vehicle) => {
    const basePrice = bookingType === 'transfer' 
      ? vehicle.pricePerKm * (state.estimatedDistance || 10)
      : vehicle.pricePerHour * 4; // Minimum 4 hours for hourly bookings
    
    dispatch({ type: 'SET_VEHICLE', payload: vehicle });
    dispatch({ type: 'SET_PRICE', payload: basePrice });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (state.pickupLocation && (bookingType === 'hourly' || state.dropoffLocation)) {
      if (bookingType === 'hourly') {
        dispatch({ type: 'SET_DURATION', payload: 4 }); // Minimum 4 hours
      }
      dispatch({ type: 'NEXT_STEP' });
    }
  };

  const handlePassengerDetailsSubmit = (data: {
    name: string;
    email: string;
    phone: string;
    notes: string;
  }) => {
    // In a real app, you would save this data
    console.log('Passenger details:', data);
    dispatch({ type: 'NEXT_STEP' });
  };

  const renderStepContent = () => {
    switch (state.step) {
      case 0:
        return (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex mb-6 border-b">
              <button
                type="button"
                className={`flex-1 py-3 text-center font-medium ${
                  bookingType === 'transfer'
                    ? 'text-[#FF6600] border-b-2 border-[#FF6600]'
                    : 'text-gray-500'
                }`}
                onClick={() => {
                  setBookingType('transfer');
                  dispatch({ type: 'SET_BOOKING_TYPE', payload: 'transfer' });
                }}
              >
                Transfer
              </button>
              <button
                type="button"
                className={`flex-1 py-3 text-center font-medium ${
                  bookingType === 'hourly'
                    ? 'text-[#FF6600] border-b-2 border-[#FF6600]'
                    : 'text-gray-500'
                }`}
                onClick={() => {
                  setBookingType('hourly');
                  dispatch({ type: 'SET_BOOKING_TYPE', payload: 'hourly' });
                }}
              >
                Hourly/Full-Day
              </button>
            </div>

            <div className="space-y-4">
              <LocationSearch
                placeholder="Pickup Location"
                onLocationSelect={handlePickupSelect}
              />

              {bookingType === 'transfer' && (
                <LocationSearch
                  placeholder="Drop-off Location"
                  onLocationSelect={handleDropoffSelect}
                />
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="relative">
                  <Calendar className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <input
                    type="date"
                    value={state.date}
                    onChange={(e) => dispatch({
                      type: 'SET_DATE_TIME',
                      payload: { date: e.target.value, time: state.time }
                    })}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-[#FF6600] focus:border-[#FF6600]"
                    required
                  />
                </div>
                <div className="relative">
                  <Clock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <input
                    type="time"
                    value={state.time}
                    onChange={(e) => dispatch({
                      type: 'SET_DATE_TIME',
                      payload: { date: state.date, time: e.target.value }
                    })}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-[#FF6600] focus:border-[#FF6600]"
                    required
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-[#FF6600] text-white py-3 px-6 rounded-lg font-medium hover:bg-[#e65c00] transition-colors"
            >
              Get My Price
            </button>
          </form>
        );

      case 1:
        return (
          <CarSelection
            vehicles={vehicles}
            selectedVehicle={state.selectedVehicle}
            onSelect={handleVehicleSelect}
          />
        );

      case 2:
        return (
          <PassengerDetailsForm
            onSubmit={handlePassengerDetailsSubmit}
            onBack={() => dispatch({ type: 'PREV_STEP' })}
          />
        );

      case 3:
        if (!state.selectedVehicle || !state.pickupLocation) return null;
        return (
          <JourneySummary
            booking={{
              type: bookingType,
              pickupLocation: state.pickupLocation,
              dropoffLocation: state.dropoffLocation || undefined,
              date: state.date,
              time: state.time,
              vehicle: state.selectedVehicle,
              duration: state.duration ?? undefined,
              price: state.price || 0,
              estimatedDistance: state.estimatedDistance ?? undefined,
              estimatedDuration: state.estimatedDuration ?? undefined
            }}
            onProceed={() => {
              window.location.href = '/payment';
              setTimeout(() => {
                window.location.reload();
              }, 100);
            }}
            onBack={() => dispatch({ type: 'PREV_STEP' })}
          />
        );

      default:
        return null;
    }
  };

  return (
    <div ref={formRef} className="bg-white rounded-lg shadow-xl p-6 max-w-4xl mx-auto">
      <BookingSteps />
      {renderStepContent()}
    </div>
  );
}