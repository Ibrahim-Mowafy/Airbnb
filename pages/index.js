import Head from 'next/head';
import Header from '../components/Header';
import Footer from '../components/Footer';
import RoomItem from '../components/RoomItem';
import Categories from '../components/Categories';
import { client } from '../lib/client';
import { Toaster } from 'react-hot-toast';

export default function Home({ exploreRooms }) {
  return (
    <>
      <Head>
        <title>Airbnb</title>
        <meta
          name="description"
          content="Find vacation rentals, cabins, beach houses, unique homes and experiences around the world - all made possible by hosts on Airbnb."
        />
        <meta
          content="width=device-width, initial-scale=1, viewport-fit=cover"
          name="viewport"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/* Header */}
      <Header />
      {/* Banner */}
      {/* <Banner /> */}
      {/* Categories */}
      <Categories />

      <main className="mx-auto px-8 sm:px-16 pt-5 grid xl:grid-cols-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 ">
        {exploreRooms?.map((roomData) => (
          <RoomItem key={roomData._id} roomData={roomData} />
        ))}
      </main>

      <Footer />
    </>
  );
}

export async function getServerSideProps({ query: { category } }) {
  if (!category) {
    category = 'National parks';
  }
  const exploreRooms = await client.fetch(
    `*[_type == "room" && category match '${category}*']`
  );

  return {
    props: { exploreRooms: exploreRooms },
  };
}
