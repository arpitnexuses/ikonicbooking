import React, { createContext, useContext, useReducer } from 'react';
import type { BookingType, Location, Vehicle, BookingDetails } from '../types';

interface BookingState {
  type: BookingType;
  pickupLocation: Location | null;
  dropoffLocation: Location | null;
  date: string;
  time: string;
  selectedVehicle: Vehicle | null;
  duration: number | null;
  price: number | null;
  step: number;
  estimatedDistance: number | null;
  estimatedDuration: number | null;
}

type BookingAction =
  | { type: 'SET_BOOKING_TYPE'; payload: BookingType }
  | { type: 'SET_PICKUP_LOCATION'; payload: Location }
  | { type: 'SET_DROPOFF_LOCATION'; payload: Location }
  | { type: 'SET_DATE_TIME'; payload: { date: string; time: string } }
  | { type: 'SET_VEHICLE'; payload: Vehicle }
  | { type: 'SET_DURATION'; payload: number }
  | { type: 'SET_PRICE'; payload: number }
  | { type: 'SET_ROUTE_ESTIMATES'; payload: { distance: number; duration: number } }
  | { type: 'NEXT_STEP' }
  | { type: 'PREV_STEP' }
  | { type: 'RESET' };

const initialState: BookingState = {
  type: 'transfer',
  pickupLocation: null,
  dropoffLocation: null,
  date: '',
  time: '',
  selectedVehicle: null,
  duration: null,
  price: null,
  step: 0,
  estimatedDistance: null,
  estimatedDuration: null,
};

function bookingReducer(state: BookingState, action: BookingAction): BookingState {
  switch (action.type) {
    case 'SET_BOOKING_TYPE':
      return { ...state, type: action.payload };
    case 'SET_PICKUP_LOCATION':
      return { ...state, pickupLocation: action.payload };
    case 'SET_DROPOFF_LOCATION':
      return { ...state, dropoffLocation: action.payload };
    case 'SET_DATE_TIME':
      return { ...state, date: action.payload.date, time: action.payload.time };
    case 'SET_VEHICLE':
      return { ...state, selectedVehicle: action.payload };
    case 'SET_DURATION':
      return { ...state, duration: action.payload };
    case 'SET_PRICE':
      return { ...state, price: action.payload };
    case 'SET_ROUTE_ESTIMATES':
      return {
        ...state,
        estimatedDistance: action.payload.distance,
        estimatedDuration: action.payload.duration
      };
    case 'NEXT_STEP':
      return { ...state, step: Math.min(state.step + 1, 3) };
    case 'PREV_STEP':
      return { ...state, step: Math.max(state.step - 1, 0) };
    case 'RESET':
      return initialState;
    default:
      return state;
  }
}

const BookingContext = createContext<{
  state: BookingState;
  dispatch: React.Dispatch<BookingAction>;
} | null>(null);

export function BookingProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(bookingReducer, initialState);

  return (
    <BookingContext.Provider value={{ state, dispatch }}>
      {children}
    </BookingContext.Provider>
  );
}

export function useBooking() {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error('useBooking must be used within a BookingProvider');
  }
  return context;
}