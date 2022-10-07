import React, { useContext, useState, useRef } from 'react';
import { ShareIcon, HeartIcon } from '@heroicons/react/24/solid';
import Image from 'next/image';
import { urlFor } from '../lib/client';
import { format } from 'date-fns';
import differenceInDays from 'date-fns/differenceInDays';

import { DateRange } from 'react-date-range';

import MapContainer from './MapContainer';
import getStripe from '../lib/getStripe';
import { WishlistsContext } from '../context/wishlist-context';
import toast from 'react-hot-toast';
import Spinner from './spinner/Spinner';

const RoomDetails = ({ roomData }) => {
  const {
    _id,
    about,
    address,
    country,
    images,
    lat,
    long,
    price_per_night,
    rate,
    title,
    discount,
    reviews,
    service_fee,
  } = roomData;
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [isCheckout, setIsCheckout] = useState(false);
  const checkoutDateRef = useRef();

  const formattedStartDate = format(new Date(startDate), 'dd/MM/yyyy');
  const formattedEndDate = format(new Date(endDate), 'dd/MM/yyyy');
  const range = differenceInDays(endDate, startDate);

  const { addRoomToWishlist, removeRoomFromWishlist, wishlist } =
    useContext(WishlistsContext);
  const isFav = !!wishlist.find((curr) => curr._id === _id);
  const [isFavorite, setIsFavorite] = useState(isFav);

  const addToWishlistHandler = (e) => {
    e.stopPropagation();
    addRoomToWishlist(roomData);
    setIsFavorite(true);
    toast(`${title} saved to your wishlist`, {
      icon: '❤️',
    });
  };
  const removeFromWishlistHandler = (e) => {
    e.stopPropagation();
    removeRoomFromWishlist(_id);
    setIsFavorite(false);
    toast(`${title} removed form your wishlist`, {
      icon: '❤️',
    });
  };

  const total = parseInt(
    price_per_night * range -
      discount * (price_per_night * range) +
      service_fee,
    10
  );
  const handleReserve = async () => {
    setIsCheckout(true);
    const stript = await getStripe();
    const response = await fetch('/api/stripe', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        checkoutDetails: {
          image: urlFor(images[0]).url(),
          total: total,
          title: title,
          address: address,
        },
      }),
    });

    if (response.status === 500) return;
    const data = await response.json();
    stript.redirectToCheckout({ sessionId: data.id });
  };

  const handleSelect = (ranges) => {
    setStartDate(ranges.selection.startDate);
    setEndDate(ranges.selection.endDate);
  };
  const onScrollToCheckout = () => {
    checkoutDateRef.current.scrollIntoView();
  };

  const selectionRange = {
    startDate: startDate,
    endDate: endDate,
    key: 'selection',
  };

  return (
    <>
      <h1 className="text-3xl font-semibold pt-5">{title}</h1>
      <div className="flex items-center justify-between pt-2">
        <p>
          {reviews} review . {country}
        </p>
        <div className="flex items-center space-x-2">
          <div className="flex cursor-pointer hover:bg-gray-100 p-1">
            <ShareIcon width={20} className="mr-2" />
            Share
          </div>
          {!isFavorite && (
            <div
              className="flex cursor-pointer hover:bg-gray-100 p-1"
              onClick={addToWishlistHandler}
            >
              <HeartIcon
                width={20}
                className="mr-2 text-transparent stroke-black "
              />
              Save
            </div>
          )}
          {isFavorite && (
            <div
              className="flex cursor-pointer hover:bg-gray-100 p-1"
              onClick={removeFromWishlistHandler}
            >
              <HeartIcon width={20} className="mr-2 text-red-500 " />
              Save
            </div>
          )}
        </div>
      </div>
      <section className="w-full h-[28rem]  mt-5 rounded-xl  overflow-hidden grid grid-cols-4 grid-rows-2 gap-2">
        {images?.map((image) => (
          <div
            className="relative cursor-pointer hover:opacity-90 transition-opacity first:col-span-2 first:row-span-2"
            key={image._key}
          >
            <Image
              src={urlFor(image).url()}
              alt="places"
              layout="fill"
              objectFit="cover"
              placeholder="blur"
              blurDataURL="/placeholderImage.jpg"
            />
          </div>
        ))}
      </section>
      <section className="w-full pt-8 flex">
        <div className="w-[60%]">
          <div className="flex justify-between items-center border-b pb-5">
            <div>
              <h2 className="text-2xl">
                Room in boutique hotel hosted by Mikail
              </h2>
              <p className="font-light text-xl">
                2 guests 1 bedroom 1 bed 1 private bath
              </p>
            </div>
            <div className="relative h-20 w-20">
              <Image
                src="/placeholderImage.jpg"
                alt="Profile Picture"
                layout="fill"
                objectFit="cover"
                className="rounded-full"
              />
            </div>
          </div>

          <div className="border-b py-5">
            <div className="flex items-center gap-2 pb-3">
              <div className="relative h-10 w-10">
                <Image
                  src="/placeholderImage.jpg"
                  alt="Profile Picture"
                  layout="fill"
                  objectFit="cover"
                  className="rounded-full"
                />
              </div>
              <div>
                <h4 className="font-semibold text-lg">Dedicated workspace</h4>
                <p className="text-gray-600 font-light text-md">
                  A private room with wifi that well-suited for working.
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 pb-3">
              <div className="relative h-10 w-10">
                <Image
                  src="/placeholderImage.jpg"
                  alt="Profile Picture"
                  layout="fill"
                  objectFit="cover"
                  className="rounded-full"
                />
              </div>
              <div>
                <h4 className="font-semibold text-lg">Dedicated workspace</h4>
                <p className="text-gray-600 font-light text-md">
                  A private room with wifi that well-suited for working.
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 pb-3">
              <div className="relative h-10 w-10">
                <Image
                  src="/placeholderImage.jpg"
                  alt="Profile Picture"
                  layout="fill"
                  objectFit="cover"
                  className="rounded-full"
                />
              </div>
              <div>
                <h4 className="font-semibold text-lg">Dedicated workspace</h4>
                <p className="text-gray-600 font-light text-md">
                  A private room with wifi that well-suited for working.
                </p>
              </div>
            </div>
          </div>

          <div className="border-b py-5">
            <h3 className="text-2xl pb-3 font-semibold">About this space</h3>
            <p>{about}</p>
          </div>
          <div className="border-b py-5">
            <h3 className="text-2xl pb-3 font-semibold">
              What this place offers
            </h3>
            <div className="grid grid-cols-2">
              <div className="flex items-center gap-4 pb-2">
                <div className="relative w-10 h-10">
                  <Image
                    src="/placeholderImage.jpg"
                    alt="Profile Picture"
                    layout="fill"
                    objectFit="cover"
                    className="rounded-full"
                  />
                </div>
                <p className="text-lg">Valley view</p>
              </div>
              <div className="flex items-center gap-4 pb-2">
                <div className="relative w-10 h-10">
                  <Image
                    src="/placeholderImage.jpg"
                    alt="Profile Picture"
                    layout="fill"
                    objectFit="cover"
                    className="rounded-full"
                  />
                </div>
                <p className="text-lg">Valley view</p>
              </div>
              <div className="flex items-center gap-4 pb-2">
                <div className="relative w-10 h-10">
                  <Image
                    src="/placeholderImage.jpg"
                    alt="Profile Picture"
                    layout="fill"
                    objectFit="cover"
                    className="rounded-full"
                  />
                </div>
                <p className="text-lg">Valley view</p>
              </div>
              <div className="flex items-center gap-4 pb-2">
                <div className="relative w-10 h-10">
                  <Image
                    src="/placeholderImage.jpg"
                    alt="Profile Picture"
                    layout="fill"
                    objectFit="cover"
                    className="rounded-full"
                  />
                </div>
                <p className="text-lg">Valley view</p>
              </div>
              <div className="flex items-center gap-4 pb-2">
                <div className="relative w-10 h-10">
                  <Image
                    src="/placeholderImage.jpg"
                    alt="Profile Picture"
                    layout="fill"
                    objectFit="cover"
                    className="rounded-full"
                  />
                </div>
                <p className="text-lg">Valley view</p>
              </div>
            </div>
          </div>
          <div className="py-5" ref={checkoutDateRef}>
            <h3 className="text-2xl pb-3 font-semibold">
              Select checkout date
            </h3>
            <p className="text-gray-500 pb-5">
              Add your travel dates for exact pricing
            </p>

            <DateRange
              ranges={[selectionRange]}
              minDate={new Date()}
              rangeColors={['#fd5b61']}
              onChange={handleSelect}
              months={2}
              direction="horizontal"
            />
          </div>
        </div>
        <div className="w-[40%] ml-20 py-5">
          <div className="w-full sticky top-32 pl-8 ">
            <div className="w-full border border-gray-200 rounded-xl shadow-xl p-6">
              <div className="flex justify-between items-center">
                <p>
                  <span className="font-semibold text-2xl">
                    ${price_per_night}
                  </span>
                  night
                </p>
                <span className="text-gray-600 ">{reviews} reviews</span>
              </div>
              <div
                className="grid grid-cols-2 py-3 cursor-pointer"
                onClick={onScrollToCheckout}
              >
                <div className="border rounded-tl-xl text-lg p-3">
                  {formattedStartDate}
                </div>
                <div className="border rounded-tr-xl text-lg p-3">
                  {formattedEndDate}
                </div>
                <div className="col-span-2 border rounded-b-xl text-lg p-3">
                  1 guests
                </div>
              </div>
              <div>
                {range > 0 ? (
                  <button
                    className="button w-full py-3 rounded-xl bg-[#fd5b61] text-white active:bg-[#ff7075] font-semibold text-lg"
                    onClick={handleReserve}
                    disabled={isCheckout}
                  >
                    {!isCheckout ? ' Reserve' : <Spinner />}
                  </button>
                ) : (
                  <button
                    className="button w-full py-3 rounded-xl bg-[#fd5b61] text-white active:bg-[#ff7075] font-semibold text-lg"
                    onClick={onScrollToCheckout}
                  >
                    Check availability
                  </button>
                )}
              </div>
              {range > 0 && (
                <>
                  <p className="text-center pt-3 text-sm">
                    You wont be charged yet
                  </p>
                  <div className="border-b pb-3">
                    <div className="flex justify-between py-2">
                      <p className="text-md">
                        ${price_per_night} x {range} nights
                      </p>
                      <p className="text-md">${price_per_night * range}</p>
                    </div>
                    <div className="flex justify-between py-2">
                      <p className="text-md">Discount</p>
                      <p className="text-md text-green-600 font-semibold">
                        -${parseInt(discount * (price_per_night * range), 10)}
                      </p>
                    </div>
                    <div className="flex justify-between py-2">
                      <p className="text-md">Service fee</p>
                      <p className="text-md">${service_fee}</p>
                    </div>
                  </div>
                  <div className="flex justify-between pt-4">
                    <p className="font-semibold text-lg">Total before taxes</p>
                    <p className="font-semibold text-lg">${total}</p>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </section>
      <div className="border-b border-t py-5 w-full">
        <h3 className="text-2xl pb-3 font-semibold">Where you will be</h3>
        <div className="w-full h-[28rem]">
          <MapContainer searchResults={[{ lat: lat, long: long }]} />
        </div>
      </div>
      <div className='py-5 w-full border-b"'>
        <h3 className="text-2xl pb-3 font-semibold">Things to know</h3>

        <div className="grid grid-cols-3">
          <div>
            <h4 className="font-semibold text-lg pb-2">House rules</h4>

            <div className="flex items-center gap-2 pb-3">
              <div className="relative h-10 w-10">
                <Image
                  src="/placeholderImage.jpg"
                  alt="Profile Picture"
                  layout="fill"
                  objectFit="cover"
                  className="rounded-full"
                />
              </div>
              <div>
                <p>A private room with wifi that</p>
              </div>
            </div>
          </div>
          <div>
            <h4 className="font-semibold text-lg pb-2">House rules</h4>

            <div className="flex items-center gap-2 pb-3">
              <div className="relative h-10 w-10">
                <Image
                  src="/placeholderImage.jpg"
                  alt="Profile Picture"
                  layout="fill"
                  objectFit="cover"
                  className="rounded-full"
                />
              </div>
              <div>
                <p>A private room with wifi that</p>
              </div>
            </div>
          </div>
          <div>
            <h4 className="font-semibold text-lg pb-2">House rules</h4>

            <div className="flex items-center gap-2 pb-3">
              <div className="relative h-10 w-10">
                <Image
                  src="/placeholderImage.jpg"
                  alt="Profile Picture"
                  layout="fill"
                  objectFit="cover"
                  className="rounded-full"
                />
              </div>
              <div>
                <p>A private room with wifi that</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RoomDetails;
