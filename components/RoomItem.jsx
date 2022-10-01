import { HeartIcon, StarIcon } from '@heroicons/react/24/solid';
import Image from 'next/image';
import React, { useContext } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper';
import { urlFor } from '../lib/client';
import Link from 'next/link';
// import { WishlistsContext } from '../context/wishlist-context';

const RoomItem = ({
  roomData: { _id, rate, address, title, price_per_night, images },
}) => {
  // const toggleFav = useContext(WishlistsContext).toggleFavorite;

  // const toggleFavHandler = (e) => {
  //   toggleFav({ _id, rate, address, title, price_per_night, images });
  //   e.stopPropagation();
  // };

  return (
    <Link href={`/rooms/${_id}`}>
      <section className="room-item p-2 cursor-pointer relative">
        <div className="rounded-xl overflow-hidden relative">
          <Swiper
            navigation={true}
            modules={[Navigation, Pagination]}
            pagination={{ clickable: true }}
            slidesPerView={1}
          >
            {images?.map((image) => (
              <SwiperSlide key={image._key}>
                <Image
                  src={urlFor(image).url()}
                  alt="room"
                  layout="responsive"
                  height={300}
                  width={300}
                  objectFit="cover"
                />
              </SwiperSlide>
            ))}
          </Swiper>
          <div
            className="absolute top-5 right-5 z-10 cursor-pointer active:scale-105 transform transition"
            // onClick={toggleFavHandler}
          >
            <HeartIcon
              width={25}
              height={25}
              className="text-gray-600 stroke-white"
            />
          </div>
        </div>
        <div className="flex justify-between pt-2">
          <h4 className="font-semibold">{title}</h4>
          <div className="flex items-center text-md">
            <StarIcon width={15} height={15} />
            <span className="font-light">{rate}</span>
          </div>
        </div>
        <div className="text-gray-500 text-sm">{address}</div>
        <div className="text-gray-500 text-sm">Oct 18-23</div>
        <div>
          <span className="font-semibold text-sm">${price_per_night}</span>

          <span className="font-light ml-1">night</span>
        </div>
      </section>
    </Link>
  );
};

export default RoomItem;
