import React, { useCallback, useEffect, useState } from 'react';
import { GoogleMap, DirectionsRenderer } from '@react-google-maps/api';
import { useGoogleMaps } from '../../utils/googleMaps';
import { useBooking } from '../../contexts/BookingContext';
import type { Location } from '../../types';

interface RouteMapProps {
  pickupLocation: Location;
  dropoffLocation: Location;
}

const containerStyle = {
  width: '100%',
  height: '400px'
};

const defaultCenter = {
  lat: 25.2048,
  lng: 55.2708
};

export function RouteMap({ pickupLocation, dropoffLocation }: RouteMapProps) {
  const [directions, setDirections] = useState<google.maps.DirectionsResult | null>(null);
  const { dispatch } = useBooking();
  const isGoogleMapsReady = useGoogleMaps();

  const calculateRoute = useCallback(() => {
    if (!isGoogleMapsReady || !window.google) return;

    const directionsService = new google.maps.DirectionsService();

    directionsService.route(
      {
        origin: pickupLocation.coordinates,
        destination: dropoffLocation.coordinates,
        travelMode: google.maps.TravelMode.DRIVING,
      },
      (result, status) => {
        if (status === google.maps.DirectionsStatus.OK && result) {
          setDirections(result);
          
          const route = result.routes[0];
          if (route && route.legs[0]) {
            const distance = route.legs[0].distance?.value || 0; // in meters
            const duration = route.legs[0].duration?.value || 0; // in seconds
            dispatch({
              type: 'SET_ROUTE_ESTIMATES',
              payload: {
                distance: distance / 1000, // convert to km
                duration: duration / 60 // convert to minutes
              }
            });
          }
        }
      }
    );
  }, [pickupLocation, dropoffLocation, dispatch, isGoogleMapsReady]);

  useEffect(() => {
    if (pickupLocation && dropoffLocation) {
      calculateRoute();
    }
  }, [pickupLocation, dropoffLocation, calculateRoute]);

  if (!isGoogleMapsReady) return null;

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={defaultCenter}
      zoom={11}
      options={{
        styles: [
          {
            featureType: 'poi',
            elementType: 'labels',
            stylers: [{ visibility: 'off' }]
          }
        ]
      }}
    >
      {directions && <DirectionsRenderer directions={directions} />}
    </GoogleMap>
  );
}