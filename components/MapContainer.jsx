import React, { useState } from 'react';
import Map, { Marker, Popup } from 'react-map-gl';
import { getCenter } from 'geolib';
import 'mapbox-gl/dist/mapbox-gl.css';
import { HomeIcon, HeartIcon } from '@heroicons/react/24/solid';

const MapContainer = ({ searchResults, onHoverItems, addHeart }) => {
  const [selectedLocation, setSelectedLocation] = useState({});
  const activeClassMarker = 'scale-110 !bg-black text-white';

  if (searchResults.length === 0) return;

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
        zoom: 4,
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
                className={`cursor-pointer text-sm bg-gray-100 flex items-center font-semibold py-0.5 px-2 rounded-xl hover:scale-110 transition transform duration-150 ease-out active:bg-black active:text-white ${
                  onHoverItems === result._id ? activeClassMarker : ''
                }`}
                onClick={() => {
                  setSelectedLocation(result);
                }}
              >
                ${result.price_per_night}
                {addHeart && (
                  <span className="ml-1">
                    <HeartIcon width={15} className="text-red-600" />
                  </span>
                )}
              </p>
            ) : (
              <div className="bg-[#ff708a7d] rounded-full w-32 h-32 flex items-center justify-center">
                <div className="bg-accent w-12 h-12 rounded-full flex items-center justify-center">
                  <HomeIcon color="white" className="w-7" />
                </div>
              </div>

              /* <div className='flex'>
                <div className="animate-ping relative bg-[#fd5b605e] rounded-full w-28 h-28 inline-flex items-center justify-center"></div>
                <div className="absolute top-[50%] right-[50%] translate-x-[50%] translate-y-[-50%] bg-[#fd5b61] w-12 h-12 rounded-full inline-flex items-center justify-center">
                  <HomeIcon color="white" className="w-7" />
                </div>
              </div> */
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
