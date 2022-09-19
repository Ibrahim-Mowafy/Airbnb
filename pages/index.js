import Head from 'next/head';
import Header from '../components/Header';
import Banner from '../components/Banner';
import SmallCard from '../components/SmallCard';
import MediumCard from '../components/MediumCard';
import LargeCard from '../components/LargeCard';
import Footer from '../components/Footer';

const DUMMY_EXPLORE = [
  {
    img: 'https://images.pexels.com/photos/10511470/pexels-photo-10511470.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    location: 'London',
    distance: '45-minute drive',
  },
  {
    img: 'https://images.pexels.com/photos/10511470/pexels-photo-10511470.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    location: 'Manchester',
    distance: '45-minute drive',
  },
  {
    img: 'https://images.pexels.com/photos/10511470/pexels-photo-10511470.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    location: 'Liverpool',
    distance: '45-minute drive',
  },
  {
    img: 'https://images.pexels.com/photos/10511470/pexels-photo-10511470.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    location: 'York',
    distance: '45-minute drive',
  },
  {
    img: 'https://images.pexels.com/photos/10511470/pexels-photo-10511470.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    location: 'Cardiff',
    distance: '45-minute drive',
  },
  {
    img: 'https://images.pexels.com/photos/10511470/pexels-photo-10511470.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    location: 'Birkenhead',
    distance: '45-minute drive',
  },
  {
    img: 'https://images.pexels.com/photos/10511470/pexels-photo-10511470.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    location: 'Newquay',
    distance: '45-minute drive',
  },
  {
    img: 'https://images.pexels.com/photos/10511470/pexels-photo-10511470.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    location: 'Hove',
    distance: '45-minute drive',
  },
];
const DUMMY_CARD_DATA = [
  {
    img: 'https://images.pexels.com/photos/10511470/pexels-photo-10511470.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    title: 'Outdoor getaways',
  },
  {
    img: 'https://images.pexels.com/photos/10511470/pexels-photo-10511470.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    title: 'Unique stays',
  },
  {
    img: 'https://images.pexels.com/photos/10511470/pexels-photo-10511470.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    title: 'Entries Home',
  },
  {
    img: 'https://images.pexels.com/photos/10511470/pexels-photo-10511470.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    title: 'Pet allowed',
  },
];

export default function Home({ exploreData, cardsData }) {
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
      <Banner />
      <main className="max-w-7xl mx-auto px-8 sm:px-16">
        <section className="pt-6">
          <h2 className="text-4xl font-semibold pb-5">Explore Nearby</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {exploreData?.map(({ location, img, distance }) => (
              <SmallCard
                key={location}
                img={img}
                distance={distance}
                location={location}
              />
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-4xl font-semibold py-8">Live Anywhere</h2>
          <div className="flex space-x-3 overflow-x-scroll scrollbar-hide p-3 -ml-3">
            {cardsData?.map(({ img, title }) => (
              <MediumCard key={title} img={img} title={title} />
            ))}
          </div>
        </section>

        <LargeCard
          img="https://images.pexels.com/photos/10511470/pexels-photo-10511470.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          title="The Greatest Outdoors"
          description="Wishlists curated by Airbnb"
          buttonText="Get Inspired"
        />
      </main>
      <Footer />
    </>
  );
}

export async function getStaticProps() {
  return {
    props: { exploreData: DUMMY_EXPLORE, cardsData: DUMMY_CARD_DATA },
  };
}
