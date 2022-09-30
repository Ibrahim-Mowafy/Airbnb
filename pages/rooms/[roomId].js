import Head from 'next/head';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

import RoomDetails from '../../components/RoomDetails';
import { client } from '../../lib/client';

const details = ({ roomDetails }) => {
  return (
    <>
      <Head>
        {/* // todo: adding head in page to adding description and title */}
      </Head>
      <Header />
      <main className="max-w-7xl mx-auto px-8 sm:px-16">
        <RoomDetails roomData={roomDetails} />
      </main>
      <Footer />
    </>
  );
};

export default details;

export async function getServerSideProps({ query }) {
  const roomId = query.roomId;
  const roomDetailsResponse = await client.fetch(
    `*[_type == "room" && _id == '${roomId}'][0]`
  );

  return {
    props: { roomDetails: roomDetailsResponse },
  };
}
