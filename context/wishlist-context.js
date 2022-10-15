import { createContext, useEffect, useState } from 'react';

export const WishlistsContext = createContext({
  wishlist: [],
  addRoomToWishlist: (roomData) => {},
  removeRoomFromWishlist: (roomId) => {},
});

const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState([]);
  useEffect(() => {
    setWishlist(JSON.parse(localStorage.getItem('wishlist')));
  }, []);

  const addRoomToWishlist = (roomData) => {
    setWishlist((currentWishList) => {
      const roomIndex = currentWishList.findIndex(
        (curr) => curr._id === roomData._id
      );
      if (roomIndex !== -1) return currentWishList;
      let updatedList = [...currentWishList];
      updatedList.push(roomData);
      localStorage.setItem('wishlist', JSON.stringify(updatedList));
      return updatedList;
    });
  };

  const removeRoomFromWishlist = (roomId) => {
    setWishlist((currentWishList) => {
      const roomIndex = currentWishList.findIndex(
        (curr) => curr._id === roomId
      );
      if (roomIndex === -1) return currentWishList;
      let updatedList = [...currentWishList];
      updatedList.splice(roomIndex, 1);
      localStorage.setItem('wishlist', JSON.stringify(updatedList));
      return updatedList;
    });
  };

  return (
    <WishlistsContext.Provider
      value={{
        wishlist: wishlist,
        addRoomToWishlist: addRoomToWishlist,
        removeRoomFromWishlist: removeRoomFromWishlist,
      }}
    >
      {children}
    </WishlistsContext.Provider>
  );
};

export default WishlistProvider;
