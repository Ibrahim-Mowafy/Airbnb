import Image from 'next/image';
import React, { useContext, useEffect, useState } from 'react';
import {
  MagnifyingGlassIcon,
  UserCircleIcon,
  Bars3Icon,
  UsersIcon,
} from '@heroicons/react/24/solid';
import { GlobeAltIcon } from '@heroicons/react/24/outline';
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { DateRangePicker } from 'react-date-range';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { ModalContext } from '../context/modal-context';
import AuthModal from './AuthModal';
import { signOut, useSession } from 'next-auth/react';

const Header = ({ placeholder }) => {
  const [searchInput, setSearchInput] = useState('');
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [numberOfGuests, setNumberOfGuests] = useState(1);
  const [showDropDownMenu, setShowDropDownMenu] = useState(false);
  const [screenSize, setScreenSize] = useState(undefined);
  const router = useRouter();
  const { isModalOpened, openModal } = useContext(ModalContext);
  const { data: session } = useSession();

  useEffect(() => {
    const handleResize = () => setScreenSize(window.innerWidth);

    window.addEventListener('resize', handleResize);

    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleSelect = (ranges) => {
    setStartDate(ranges.selection.startDate);
    setEndDate(ranges.selection.endDate);
  };

  const selectionRange = {
    startDate: startDate,
    endDate: endDate,
    key: 'selection',
  };

  const searchInputChangeHandler = (event) => {
    const searchEnteredValue = event.target.value;
    setSearchInput(searchEnteredValue);
  };

  const numberOfGuestsChangeHandler = (event) => {
    const numberGustsEnteredValue = event.target.value;
    setNumberOfGuests(numberGustsEnteredValue);
  };

  const resetInputHandler = () => {
    setSearchInput('');
  };

  const onSearch = () => {
    if (!searchInput) return;
    router.push({
      pathname: '/search',
      query: {
        location: searchInput,
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString(),
        numberOfGuests: numberOfGuests,
      },
    });
    resetInputHandler();
  };

  return (
    <>
      <header className="sticky top-0 z-50 grid grid-cols-3 bg-white shadow-sm p-5 px-8 sm:px-16">
        <div
          onClick={() => router.push('/')}
          className="relative flex items-center h-10 cursor-pointer my-auto"
        >
          {screenSize <= 900 ? (
            <Image
              src="/airbnb-icon.svg"
              alt="Airbnb Logo"
              layout="fill"
              objectFit="contain"
              objectPosition="left"
              priority
            />
          ) : (
            <Image
              src="/airbnb-logo.svg"
              alt="Airbnb Logo"
              layout="fill"
              objectFit="contain"
              objectPosition="left"
              priority
            />
          )}
        </div>

        <div className="flex items-center md:border-2 rounded-full py-2 md:shadow-sm md:pr-2">
          <input
            className="flex-grow pl-5 bg-transparent outline-none text-sm text-gray-600 placeholder-gray-400"
            type="text"
            placeholder={placeholder || 'Start your Search'}
            value={searchInput}
            onChange={searchInputChangeHandler}
          />
          <MagnifyingGlassIcon
            className="hidden md:inline-flex h-8 bg-accent text-white rounded-full p-2 cursor-pointer"
            onClick={onSearch}
          />
        </div>
        <div className="flex items-center justify-end space-x-4 text-gray-600">
          <p className="hidden md:inline-block cursor-pointer">Become a Host</p>
          <GlobeAltIcon className="h-6 cursor-pointer" />
          <div
            className="relative flex items-center space-x-2 border-2 p-1  rounded-full cursor-pointer hover:shadow-md transition-all"
            onClick={() => {
              setShowDropDownMenu((prevState) => !prevState);
            }}
          >
            <Bars3Icon className="h-6" />
            {session && (
              <div className="relative h-8 w-8">
                <Image
                  className="rounded-full"
                  layout="fill"
                  src={session.user.image}
                  alt={session.user.name}
                />
              </div>
            )}
            {!session && <UserCircleIcon className="h-8" />}
            {showDropDownMenu && (
              <>
                <div className="absolute right-0 top-14 rounded-xl text-base  bg-white w-64 z-50 shadow-2xl py-2 border cursor-pointer">
                  <ul className="flex flex-col border-b font-semibold">
                    {!session && (
                      <>
                        <li
                          className="p-3 px-5 hover:bg-gray-100 transition"
                          onClick={openModal}
                        >
                          Log in
                        </li>
                        <li
                          className="p-3 px-5 hover:bg-gray-100 transition"
                          onClick={openModal}
                        >
                          Sign up
                        </li>
                      </>
                    )}
                    {session && (
                      <>
                        <li className="p-3 px-5 hover:bg-gray-100 transition">
                          Messages
                        </li>
                        <li className="p-3 px-5 hover:bg-gray-100 transition">
                          Notification
                        </li>
                        <li className="p-3 px-5 hover:bg-gray-100 transition">
                          Trips
                        </li>
                        <Link href={'/wishlists'}>
                          <li className="p-3 px-5 hover:bg-gray-100 transition">
                            Wishlists
                          </li>
                        </Link>
                      </>
                    )}
                  </ul>
                  <ul className="flex flex-col border-b">
                    <li className="p-3 px-5 hover:bg-gray-100 transition">
                      Host an experience
                    </li>
                    <li className="p-3 px-5 hover:bg-gray-100 transition">
                      Host your home
                    </li>
                  </ul>
                  <ul className="flex flex-col">
                    <li className="p-3 px-5 hover:bg-gray-100 transition">
                      Help
                    </li>
                    {session && (
                      <>
                        <li className="p-3 px-5 hover:bg-gray-100 transition">
                          Account
                        </li>
                        <li
                          className="p-3 px-5 hover:bg-gray-100 transition"
                          onClick={signOut}
                        >
                          Logout
                        </li>
                      </>
                    )}
                  </ul>
                </div>
                <div className="top-0 left-0 fixed h-[100vh] w-[100vw] z-40 cursor-auto bg-transparent"></div>
              </>
            )}
          </div>
        </div>

        {searchInput && (
          <div className="flex flex-col col-span-3 mx-auto mt-4">
            <DateRangePicker
              ranges={[selectionRange]}
              minDate={new Date()}
              rangeColors={['#ff385c']}
              onChange={handleSelect}
              months={2}
              direction="horizontal"
            />
            <div className="flex items-center border-b mb-4">
              <h2 className="text-2xl flex-grow font-semibold">
                Number of Guests
              </h2>
              <UsersIcon className="h-5" />
              <input
                value={numberOfGuests}
                onChange={numberOfGuestsChangeHandler}
                type="number"
                className="w-12 pl-2 text-xl outline-none text-accent"
                min={1}
              />
            </div>

            <div className="flex">
              <button
                onClick={resetInputHandler}
                className="flex-grow text-gray-500"
              >
                Cancel
              </button>
              <button onClick={onSearch} className="flex-grow text-accent">
                Search
              </button>
            </div>
          </div>
        )}
      </header>
      {isModalOpened && <AuthModal />}
    </>
  );
};

export default Header;
