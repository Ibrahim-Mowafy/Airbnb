/* eslint-disable react-hooks/rules-of-hooks */
import Head from 'next/head';
import React, { useContext, useState } from 'react';
import { Header, MapContainer, RoomItem } from '../components';
import { WishlistsContext } from '../context/wishlist-context';
import { ModalContext } from '../context/modal-context';
import { useSession } from 'next-auth/react';

const wishlists = () => {
  const { wishlist } = useContext(WishlistsContext);
  const [isHoverRoomItem, setIsHoverRoomItem] = useState(false);
  const { data: session } = useSession();
  const { openModal } = useContext(ModalContext);

  if (!session) {
    return (
      <>
        <Head>
          <title>{'Your list . Wishlist - Airbnb'}</title>
        </Head>
        <Header />
        <main className="flex flex-col p-5 md:px-10 relative w-full h-full">
          <h1 className="text-3xl font-bold mt-2 mb-6">Wishlist</h1>

          <h3 className="text-2xl font-semibold">
            Log in to view your wishlists
          </h3>
          <p className="text-gray-500 mt-5 max-w-lg">
            {"You can create, view, or edit wishlists once you've logged in."}
          </p>
          <div>
            <button
              className="gradient-button button py-2 px-5 rounded-lg mt-5 text-white  font-semibold text-lg "
              onClick={openModal}
            >
              Log in
            </button>
          </div>
        </main>
      </>
    );
  }

  if (session && wishlist.length === 0) {
    return (
      <>
        <Head>
          <title>{'Your list . Wishlist - Airbnb'}</title>
        </Head>
        <Header />
        <main className="flex flex-col p-5 md:px-10 relative w-full h-full">
          <h1 className="text-3xl font-bold mt-2 mb-6">Wishlist</h1>

          <h3 className="text-2xl font-semibold">Create your first wishlist</h3>
          <p className="text-gray-500 mt-5 max-w-lg">
            As you search, tap the heart icon to save your favorite places to
            stay or things to do to a wishlist.
          </p>
        </main>
      </>
    );
  }

  return (
    <>
      <Head>
        <title>{'Your list . Wishlist - Airbnb'}</title>
      </Head>
      <Header />
      <main className="flex pb-5  relative w-full h-full">
        <section className="flex-grow pt-14 px-6">
          <h1 className="text-3xl font-semibold mt-2 mb-6">Wishlist</h1>

          <div className="grid grid-cols-1 sm:grid-cols-2 ">
            {wishlist?.map((roomData) => (
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
              searchResults={wishlist}
              onHoverItems={isHoverRoomItem}
              addHeart={true}
            />
          </div>
        </section>
      </main>
    </>
  );
};

export default wishlists;
