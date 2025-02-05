import type { Vehicle } from '../types';

export const vehicles: Vehicle[] = [
  {
    id: 'mercedes-s-class',
    name: 'Mercedes-Benz S-Class',
    type: 'Sedan',
    capacity: 3,
    imageUrl: 'https://images.unsplash.com/photo-1626668893632-6f3a4466d22f?auto=format&fit=crop&q=80',
    pricePerKm: 5,
    pricePerHour: 250,
    features: [
      'Premium leather interior',
      'Climate control',
      'Privacy glass',
      'Wi-Fi connectivity',
      'Refreshments'
    ]
  },
  {
    id: 'bmw-7',
    name: 'BMW 7 Series',
    type: 'Sedan',
    capacity: 3,
    imageUrl: 'https://images.unsplash.com/photo-1556189250-72ba954cfc2b?auto=format&fit=crop&q=80',
    pricePerKm: 4.5,
    pricePerHour: 230,
    features: [
      'Executive seating',
      'Ambient lighting',
      'Entertainment system',
      'USB charging',
      'Bottled water'
    ]
  },
  {
    id: 'range-rover',
    name: 'Range Rover Autobiography',
    type: 'SUV',
    capacity: 5,
    imageUrl: 'https://cdn-nexlink.s3.us-east-2.amazonaws.com/20220705111314_Range-Rover-1_3dc6571e-fcb4-4695-8e43-686dd8ddd15a.jpg',
    pricePerKm: 6,
    pricePerHour: 300,
    features: [
      'Panoramic roof',
      'Premium sound system',
      'Extended legroom',
      'Wireless charging',
      'Premium refreshments'
    ]
  },
  {
    id: 'mercedes-v',
    name: 'Mercedes-Benz V-Class',
    type: 'Luxury',
    capacity: 7,
    imageUrl: 'https://images.unsplash.com/photo-1617469767053-d3b523a0b982?auto=format&fit=crop&q=80',
    pricePerKm: 7,
    pricePerHour: 350,
    features: [
      'Conference seating',
      'Built-in tables',
      'Premium entertainment',
      'Executive comfort',
      'Mini refrigerator'
    ]
  }
];