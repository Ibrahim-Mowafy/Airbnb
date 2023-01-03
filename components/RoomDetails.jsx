import React, { useContext, useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { format } from 'date-fns';
import differenceInDays from 'date-fns/differenceInDays';
import { DateRange } from 'react-date-range';
import toast from 'react-hot-toast';
import { urlFor } from '../lib/client';
import MapContainer from './MapContainer';
import getStripe from '../lib/getStripe';
import Spinner from './spinner/Spinner';
import { Navigation, Pagination } from 'swiper';
import { placeOffers, thingsToKnow } from '../utils/constants';
import { Swiper, SwiperSlide } from 'swiper/react';
// icons
import { ShareIcon, HeartIcon } from '@heroicons/react/24/solid';
import { BsDoorOpen } from 'react-icons/bs';
import { MdOutlineEditCalendar } from 'react-icons/md';
import { FaSwimmingPool } from 'react-icons/fa';
import { WishlistsContext } from '../context/wishlist-context';

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
    title,
    discount,
    reviews,
    service_fee,
    hostedBy,
  } = roomData;
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [isCheckout, setIsCheckout] = useState(false);
  const [screenSize, setScreenSize] = useState(undefined);
  const checkoutDateRef = useRef();

  useEffect(() => {
    const handleResize = () => setScreenSize(window.innerWidth);
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

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

  const roomDetails = (
    <div className="w-full lg:w-[60%]">
      <div className="flex justify-between items-center border-b pb-5">
        <div>
          <h2 className="text-2xl">
            Room in boutique hotel hosted by {hostedBy.name}
          </h2>
          <p className="font-light text-xl">
            2 guests 1 bedroom 1 bed 1 private bath
          </p>
        </div>
        <div className="relative h-20 w-20 rounded-full overflow-hidden">
          <Image
            src={hostedBy.image || '/placeholderImage.jpg'}
            alt="Profile Picture"
            layout="fill"
            objectFit="cover"
            placeholder="blur"
            blurDataURL="/placeholderImage.jpg"
          />
        </div>
      </div>
      <div className="border-b py-5">
        <div className="flex gap-4 pb-3">
          <BsDoorOpen className="text-2xl" />
          <div>
            <h4 className="font-semibold text-lg">Self check-in</h4>
            <p className="text-gray-600 font-light text-md">
              You can check in with the doorman.
            </p>
          </div>
        </div>

        <div className="flex gap-4 pb-3">
          <FaSwimmingPool className="text-2xl" />
          <div>
            <h4 className="font-semibold text-lg">Dive right in</h4>
            <p className="text-gray-600 font-light text-md">
              This is one of the few places in the area with a pool.
            </p>
          </div>
        </div>
        <div className="flex gap-4 pb-3">
          <MdOutlineEditCalendar className="text-2xl" />
          <div>
            <h4 className="font-semibold text-lg">
              Free cancellation before Oct 22.
            </h4>
          </div>
        </div>
      </div>

      <div className="border-b py-5">
        <h3 className="text-2xl pb-3 font-semibold">About this space</h3>
        <p>{about}</p>
      </div>
      <div className="border-b py-5">
        <h3 className="text-2xl pb-3 font-semibold">What this place offers</h3>
        <div className="grid grid-cols-2">
          {placeOffers.map((offer) => (
            <div
              className="flex items-center gap-4 pb-3 text-2xl"
              key={offer.name}
            >
              {offer.icon}
              <p className="text-lg">{offer.name}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="py-5 overflow-x-scroll" ref={checkoutDateRef}>
        <h3 className="text-2xl pb-3 font-semibold">Select checkout date</h3>
        <p className="text-gray-500 pb-5">
          Add your travel dates for exact pricing
        </p>

        <DateRange
          ranges={[selectionRange]}
          minDate={new Date()}
          rangeColors={['#ff385c']}
          onChange={handleSelect}
          months={screenSize <= 800 ? 1 : 2}
          direction="horizontal"
        />
      </div>
    </div>
  );

  const checkoutCard = (
    <div className="hidden lg:block w-[40%] ml-20 py-5">
      <div className="w-full sticky top-32 pl-8 ">
        <div className="w-full border border-gray-200 rounded-xl shadow-xl p-6">
          <div className="flex justify-between items-center">
            <p>
              <span className="font-semibold text-2xl mr-1">
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
                className="button gradient-button w-full py-3 rounded-xl text-white font-semibold text-lg"
                onClick={handleReserve}
                disabled={isCheckout}
              >
                {!isCheckout ? ' Reserve' : <Spinner />}
              </button>
            ) : (
              <button
                className="button gradient-button w-full py-3 rounded-xl text-white font-semibold text-lg"
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
  );

  const roomImages = images?.map((image) => (
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
  ));

  const thingsToKnowContent = (
    <div className="grid grid-cols-3">
      {thingsToKnow.map((item) => (
        <div key={item.title}>
          <h4 className="font-semibold text-lg pb-2">{item.title}</h4>
          {item.content.map((itemContent) => (
            <div
              key={itemContent.name}
              className="flex items-center gap-2 pb-3"
            >
              {itemContent?.icon}
              <p>{itemContent.name}</p>
            </div>
          ))}
        </div>
      ))}
    </div>
  );

  const favoriteButton = (
    <>
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
    </>
  );

  const roomImagesCarousel = (
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
            height={150}
            width={300}
            objectFit="cover"
            placeholder="blur"
            blurDataURL="/placeholderImage.jpg"
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
  const checkoutFooter = (
    <section className="fixed lg:hidden bottom-0 w-full bg-white border-t py-5 z-10">
      <div className="px-6">
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <span>
              <span className="font-semibold mr-1">${price_per_night}</span>
              night
            </span>
            <span className="font-semibold">
              {format(new Date(startDate), 'MMM dd')} -{' '}
              {format(new Date(endDate), 'MMM dd')}
            </span>
          </div>
          {range > 0 ? (
            <button
              className="button gradient-button px-6 py-3 rounded-xl text-white font-semibold text-lg"
              onClick={handleReserve}
              disabled={isCheckout}
            >
              {!isCheckout ? ' Reserve' : <Spinner />}
            </button>
          ) : (
            <button
              className="button gradient-button px-6 py-3 rounded-xl text-white font-semibold text-lg"
              onClick={onScrollToCheckout}
            >
              Check availability
            </button>
          )}
        </div>
      </div>
    </section>
  );
  return (
    <>
      <section className="max-w-7xl mx-auto px-8 sm:px-16">
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
            {favoriteButton}
          </div>
        </div>
        <section className="hidden  w-full h-[28rem]  mt-5 rounded-xl  overflow-hidden md:grid grid-cols-4 grid-rows-2 gap-2">
          {roomImages}
        </section>
        <section className="block md:hidden mt-5 rounded-xl  overflow-hidden">
          {roomImagesCarousel}
        </section>

        <section className="w-full pt-8 flex">
          {/* Room Details */}
          {roomDetails}
          {/* Checkout Card */}
          {checkoutCard}
        </section>

        <div className="border-b border-t py-5 w-full">
          <h3 className="text-2xl pb-3 font-semibold">Where you will be</h3>
          <div className="w-full h-[28rem]">
            <MapContainer searchResults={[{ lat: lat, long: long }]} />
          </div>
        </div>
        <div className='py-5 w-full border-b"'>
          <h3 className="text-2xl pb-3 font-semibold">Things to know</h3>
          {thingsToKnowContent}
        </div>
      </section>
      {checkoutFooter}
    </>
  );
};

export default RoomDetails;
