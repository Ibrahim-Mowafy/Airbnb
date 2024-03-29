import React, { useState } from 'react';
import { Header, Footer, MapContainer, RoomItem } from '../components';
import { useRouter } from 'next/router';
import { format } from 'date-fns';
import { client } from '../lib/client';
import Head from 'next/head';

const Search = ({ searchResults }) => {
  const router = useRouter();
  const [isHoverRoomItem, setIsHoverRoomItem] = useState(false);

  const { location, startDate, endDate, numberOfGuests } = router.query;
  const formattedStartDate = format(new Date(startDate), 'dd-MMMM-yy');
  const formattedEndDate = format(new Date(endDate), 'dd-MMMM-yy');
  const range = `${formattedStartDate} - ${formattedEndDate}`;

  if (searchResults.length === 0) {
    return (
      <>
        <Head>
          <title>
            {` Airbnb | ${location} - Vacation Rentals, Cabins, Beach Houses, Unique Homes Experiences`}
          </title>
        </Head>
        <Header />
        <main className="flex flex-col p-5 md:px-10 relative w-full h-full">
          <h1 className="text-3xl font-bold mt-2 mb-6">Search</h1>

          <p className="text-gray-500 max-w-lg">
            There is no result by this location {location}
          </p>
        </main>
      </>
    );
  }

  return (
    <>
      <Header
        placeholder={`${location} | ${range} | ${numberOfGuests} guests`}
      />
      <main className="flex pb-5  relative w-full h-full">
        <section className="flex-grow pt-14 px-6">
          <p className="text-xs">
            300+ Stays - {range} - for {numberOfGuests} number of guests
          </p>
          <h1 className="text-3xl font-semibold mt-2 mb-6">
            Stays in {location}
          </h1>
          <div className="hidden lg:inline-flex mb-5 space-x-3 text-gray-800 whitespace-nowrap">
            <p className="button">Cancelation Flexibility</p>
            <p className="button">Type of Place</p>
            <p className="button">Price</p>
            <p className="button">Rooms and Beds</p>
            <p className="button">More filter</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 ">
            {searchResults?.map((roomData) => (
              <>
                <div
                  onMouseEnter={() => {
                    setIsHoverRoomItem(roomData._id);
                  }}
                  onMouseLeave={() => {
                    setIsHoverRoomItem(false);
                  }}
                >
                  <RoomItem key={roomData._id} roomData={roomData} />
                </div>
              </>
            ))}
          </div>
        </section>
        <section className="flex-grow min-w-[50%] relative ">
          <div className="h-[100vh] sticky top-24">
            <MapContainer
              searchResults={searchResults}
              onHoverItems={isHoverRoomItem}
            />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Search;

export async function getServerSideProps({ query: { location } }) {
  const searchResults = await client.fetch(
    `*[_type == "room" && about match '${location}*' || address match '${location}*' || country match '${location}*' || title match '${location}*']`
  );
  return {
    props: {
      searchResults,
    },
  };
}
