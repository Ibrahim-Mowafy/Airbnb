import Head from 'next/head';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

import RoomDetails from '../../components/RoomDetails';

const details = () => {
  return (
    <>
      <Head>
        {/* // todo: adding head in page to adding description and title */}
      </Head>
      <Header />
      <main className="max-w-7xl mx-auto px-8 sm:px-16">
        <RoomDetails />
      </main>
      <Footer />
    </>
  );
};

export default details;
