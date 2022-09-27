import { HeartIcon, StarIcon } from '@heroicons/react/24/solid';
import Image from 'next/image';
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import PlaceHolderImage from '../assets/pexels-jonathan-borba-2983101.jpg';
import { Navigation } from 'swiper';

const RoomItem = () => {
  return (
    <section className="room-item p-2">
      <div className="rounded-xl overflow-hidden relative">
        <Swiper navigation={true} modules={[Navigation]} slidesPerView={1}>
          <SwiperSlide>
            <Image
              src={PlaceHolderImage}
              alt="room"
              layout="responsive"
              height={300}
              width={300}
              objectFit="cover"
            />
          </SwiperSlide>
          <SwiperSlide>
            <Image
              src={PlaceHolderImage}
              alt="room"
              layout="responsive"
              height={300}
              width={300}
              objectFit="cover"
            />
          </SwiperSlide>
          <SwiperSlide>
            <Image
              src={PlaceHolderImage}
              alt="room"
              layout="responsive"
              height={300}
              width={300}
              objectFit="cover"
            />
          </SwiperSlide>
          <SwiperSlide>
            <Image
              src={PlaceHolderImage}
              alt="Room Image"
              layout="responsive"
              height={300}
              width={300}
              objectFit="cover"
            />
          </SwiperSlide>
        </Swiper>
        <div className="absolute top-5 right-5 z-10 cursor-pointer active:scale-105 transform transition">
          <HeartIcon
            width={25}
            height={25}
            className="text-gray-600 stroke-white"
          />
        </div>
      </div>
      <div className="flex justify-between pt-2">
        <h4 className="font-semibold">Turkey</h4>
        <div className="flex items-center text-md">
          <StarIcon width={15} height={15} />
          <span className="font-light">4.9</span>
        </div>
      </div>
      <div className="text-gray-500 text-sm">Villa Ravina da eşsiz deniz</div>
      <div className="text-gray-500 text-sm">Oct 18-23</div>
      <div>
        <span className="font-semibold text-sm">$115</span>

        <span className="font-light ml-1">night</span>
      </div>
    </section>
  );
};

export default RoomItem;
