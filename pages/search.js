import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useRouter } from 'next/router';
import { format } from 'date-fns';
import InfoCard from '../components/InfoCard';

const Search = ({ searchResults }) => {
  const router = useRouter();
  const { location, startDate, endDate, numberOfGuests } = router.query;
  // !there is a issue here in date
  const formattedStartDate = format(new Date(startDate), 'dd-MMMM-yy');
  const formattedEndDate = format(new Date(endDate), 'dd-MMMM-yy');
  const range = `${formattedStartDate} - ${formattedEndDate}`;
  return (
    <div>
      <Header
        placeholder={`${location} | ${range} | ${numberOfGuests} guests`}
      />
      <main className="flex pb-5">
        <section className=" flex-grow pt-14 px-6">
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
          <div className="flex flex-col">
            {searchResults?.map(
              ({ img, location, title, description, star, price, total }) => (
                <InfoCard
                  key={title}
                  img={img}
                  location={location}
                  title={title}
                  description={description}
                  star={star}
                  price={price}
                  total={total}
                />
              )
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Search;

export async function getServerSideProps() {
  const response = await fetch('https://www.jsonkeeper.com/b/5NPS');
  const searchResults = await response.json();

  return {
    props: {
      searchResults,
    },
  };
}
