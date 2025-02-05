import React from 'react';

export function CorporateServices() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Corporate Services</h1>
        <form className="bg-white shadow-lg rounded-lg p-8">
          <div className="space-y-6">
            <div>
              <label htmlFor="companyName" className="block text-sm font-medium text-gray-700">
                Company Name
              </label>
              <input
                type="text"
                id="companyName"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#FF6600] focus:ring-[#FF6600]"
              />
            </div>
            <div>
              <label htmlFor="contactPerson" className="block text-sm font-medium text-gray-700">
                Contact Person
              </label>
              <input
                type="text"
                id="contactPerson"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#FF6600] focus:ring-[#FF6600]"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                id="email"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#FF6600] focus:ring-[#FF6600]"
              />
            </div>
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                Phone
              </label>
              <input
                type="tel"
                id="phone"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#FF6600] focus:ring-[#FF6600]"
              />
            </div>
            <div>
              <label htmlFor="requirements" className="block text-sm font-medium text-gray-700">
                Requirements
              </label>
              <textarea
                id="requirements"
                rows={4}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#FF6600] focus:ring-[#FF6600]"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-[#FF6600] text-white py-3 px-6 rounded-lg font-medium hover:bg-[#e65c00] transition-colors"
            >
              Submit Inquiry
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}