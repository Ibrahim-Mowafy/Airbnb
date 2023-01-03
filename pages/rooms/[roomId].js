import Head from 'next/head';
import { Header, Footer, RoomDetails } from '../../components';
import { client } from '../../lib/client';

const details = ({ roomDetails }) => {
  return (
    <>
      <Head>
        <title>{roomDetails.title + '- Airbnb'}</title>
      </Head>
      <Header />
      <main>
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
    `*[_type == "room" && _id == '${roomId}'][0]{
      ...,hostedBy->{
        name,image
      }
    }`
  );

  return {
    props: { roomDetails: roomDetailsResponse },
  };
}
