import React from 'react';
import Map, { Marker, Popup } from 'react-map-gl';
import { getCenter } from 'geolib';

const MapContainer = ({ searchResults }) => {
  const coordinates = searchResults?.map((result) => ({
    longitude: result.long,
    latitude: result.lat,
  }));

  const center = getCenter(coordinates);

  return (
    <>
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
        {/* {searchResults?.map((result) => (
        <div key={result.long}>
          <Marker
          longitude={result.long}
            latitude={result.lat}
            offsetLeft={-20}
            offsetTop={-10}
            >
            <p
            role="img"
            className="cursor-pointer text-2xl animate-bounce"
            aria-label="push-pin"
            >
              📌
              </p>
              </Marker>
              </div>
            ))} */}
      </Map>

    </>
  );
};

export default MapContainer;
