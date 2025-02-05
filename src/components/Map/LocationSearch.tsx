import React, { useState } from 'react';
import { MapPin } from 'lucide-react';
import type { Location } from '../../types';

// Demo locations data
const DEMO_LOCATIONS = [
  {
    address: 'Dubai Mall, Downtown Dubai, UAE',
    placeId: 'demo-1',
    coordinates: { lat: 25.1972, lng: 55.2744 }
  },
  {
    address: 'Mall of the Emirates, Al Barsha, Dubai, UAE',
    placeId: 'demo-2',
    coordinates: { lat: 25.1181, lng: 55.2008 }
  },
  {
    address: 'Burj Khalifa, Downtown Dubai, UAE',
    placeId: 'demo-3',
    coordinates: { lat: 25.1972, lng: 55.2744 }
  },
  {
    address: 'Dubai Marina Mall, Dubai Marina, UAE',
    placeId: 'demo-4',
    coordinates: { lat: 25.0775, lng: 55.1402 }
  },
  {
    address: 'Abu Dhabi Mall, Abu Dhabi, UAE',
    placeId: 'demo-5',
    coordinates: { lat: 24.4949, lng: 54.3705 }
  }
] as const;

interface LocationSearchProps {
  placeholder: string;
  onLocationSelect: (location: Location) => void;
}

export function LocationSearch({ placeholder, onLocationSelect }: LocationSearchProps) {
  const [searchValue, setSearchValue] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);

  const filteredLocations = DEMO_LOCATIONS.filter(location =>
    location.address.toLowerCase().includes(searchValue.toLowerCase())
  );

  const handleLocationSelect = (location: typeof DEMO_LOCATIONS[number]) => {
    setSearchValue(location.address);
    setShowDropdown(false);
    onLocationSelect(location);
  };

  return (
    <div className="relative">
      <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
      <input
        type="text"
        value={searchValue}
        onChange={(e) => {
          setSearchValue(e.target.value);
          setShowDropdown(true);
        }}
        onFocus={() => setShowDropdown(true)}
        placeholder={placeholder}
        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-[#FF6600] focus:border-[#FF6600]"
      />
      
      {showDropdown && filteredLocations.length > 0 && (
        <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-auto">
          {filteredLocations.map((location) => (
            <div
              key={location.placeId}
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => handleLocationSelect(location)}
            >
              {location.address}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}