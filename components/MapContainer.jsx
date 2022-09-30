import React, { useState } from 'react';
import Map, { Marker, Popup } from 'react-map-gl';
import { getCenter } from 'geolib';
import 'mapbox-gl/dist/mapbox-gl.css';
import { HomeIcon } from '@heroicons/react/24/solid';

const MapContainer = ({ searchResults }) => {
  const [selectedLocation, setSelectedLocation] = useState({});

  const coordinates = searchResults?.map((result) => ({
    longitude: result.long,
    latitude: result.lat,
  }));

  const center = getCenter(coordinates);

  return (
    <Map
      initialViewState={{
        longitude: center.longitude,
        latitude: center.latitude,
        zoom: 8,
      }}
      style={{ width: '100%', height: '100%' }}
      mapStyle="mapbox://styles/ahmed2mohamed/cl8bjaxqj001v14mtj812crm8"
      mapboxAccessToken={process.env.MAP_BOX_KEY}
    >
      {searchResults?.map((result) => (
        <div key={result.long}>
          <Marker
            longitude={result.long}
            latitude={result.lat}
            offset={[-20, -10]}
          >
            {result.price_per_night ? (
              <p
                className="cursor-pointer text-sm bg-gray-100 font-semibold py-0.5 px-2 rounded-xl hover:scale-110 transition transform ease-out active:bg-black active:text-white "
                onClick={() => {
                  setSelectedLocation(result);
                }}
              >
                ${result.price_per_night}
              </p>
            ) : (
              <div className="bg-[#fd5b605e] rounded-full w-24 h-24 flex items-center justify-center">
                <div className="bg-[#fd5b61] w-12 h-12 rounded-full flex items-center justify-center">
                  <HomeIcon color="white" className="w-8" />
                </div>
              </div>
            )}
          </Marker>
          {/* {selectedLocation.long === result.long ? (
            <Popup
              onClose={() => setSelectedLocation({})}
              closeOnClick={true}
              latitude={result.lat}
              longitude={result.long}
            >
              <p className="bg-red-500">A7a</p>
            </Popup>
          ) : (
            false
          )} */}
        </div>
      ))}
    </Map>
  );
};

export default MapContainer;
