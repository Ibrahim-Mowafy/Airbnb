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
        <meta name="theme-color" content="#ffffff"></meta>

        {/* <!-- Open Graph / Facebook --> */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://airbnp.vercel.app/" />
        <meta
          property="og:title"
          content="Vacation Homes & Condo Rentals - Airbnb"
        />
        <meta
          property="og:description"
          content="Find vacation rentals, cabins, beach houses, unique homes, and experiences worldwide - all made possible by hosts on Airbnb."
        />
        <meta
          property="og:image"
          content="https://airbnp.vercel.app/card_Image.jpg"
        />

        {/* <!-- Twitter --> */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://airbnp.vercel.app/" />
        <meta
          property="twitter:title"
          content="Vacation Homes & Condo Rentals - Airbnb"
        />
        <meta
          property="twitter:description"
          content="Find vacation rentals, cabins, beach houses, unique homes, and experiences worldwide - all made possible by hosts on Airbnb."
        />
        <meta
          property="twitter:image"
          content="https://airbnp.vercel.app/card_Image.jpg"
        />
        <meta name="author" content="Ibrahim Mowafy" />

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
