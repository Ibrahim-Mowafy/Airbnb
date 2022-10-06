import React, { useContext, useState } from 'react';
import Header from '../components/Header';
import MapContainer from '../components/MapContainer';
import RoomItem from '../components/RoomItem';
import { WishlistsContext } from '../context/wishlist-context';

// todo: adding head in page to adding description and title

const wishlists = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const wishlists = useContext(WishlistsContext).wishlist;
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [isHoverRoomItem, setIsHoverRoomItem] = useState(false);

  return (
    <>
      <Header />
      <main className="flex pb-5  relative w-full h-full">
        <section className="flex-grow pt-14 px-6">
          <h1 className="text-3xl font-semibold mt-2 mb-6">Wishlist</h1>

          <div className="grid grid-cols-1 sm:grid-cols-2 ">
            {wishlists?.map((roomData) => (
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
              searchResults={wishlists}
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
