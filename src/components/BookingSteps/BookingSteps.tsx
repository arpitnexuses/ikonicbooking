import React from 'react';
import { MapPin, Calendar, CreditCard, CheckCircle } from 'lucide-react';
import { useBooking } from '../../contexts/BookingContext';

const steps = [
  { icon: MapPin, label: 'Route' },
  { icon: Calendar, label: 'Details' },
  { icon: CreditCard, label: 'Payment' },
  { icon: CheckCircle, label: 'Confirmation' },
];

export function BookingSteps() {
  const { state } = useBooking();
  const currentStep = state.step;

  return (
    <div className="py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav aria-label="Progress">
          <ol className="flex items-center justify-center">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isActive = index <= currentStep;
              const isCompleted = index < currentStep;

              return (
                <li key={step.label} className="relative md:flex-1">
                  {index !== 0 && (
                    <div className="absolute inset-0 flex items-center" aria-hidden="true">
                      <div
                        className={`h-0.5 w-full ${
                          isCompleted ? 'bg-[#FF6600]' : 'bg-gray-200'
                        }`}
                      />
                    </div>
                  )}
                  <div
                    className={`relative flex flex-col items-center group ${
                      index !== steps.length - 1 ? 'pr-8 md:pr-16' : ''
                    }`}
                  >
                    <span
                      className={`h-10 w-10 rounded-full flex items-center justify-center ${
                        isActive
                          ? 'bg-[#FF6600] text-white'
                          : 'bg-gray-100 text-gray-400'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                    </span>
                    <span
                      className={`mt-2 text-sm font-medium ${
                        isActive ? 'text-[#FF6600]' : 'text-gray-500'
                      }`}
                    >
                      {step.label}
                    </span>
                  </div>
                </li>
              );
            })}
          </ol>
        </nav>
      </div>
    </div>
  );
}