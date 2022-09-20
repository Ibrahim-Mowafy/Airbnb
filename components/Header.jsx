import Image from 'next/image';
import React, { useState } from 'react';
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

const Header = ({ placeholder }) => {
  const [searchInput, setSearchInput] = useState('');
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [numberOfGuests, setNumberOfGuests] = useState(1);
  const router = useRouter();

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
    router.push({
      pathname: '/search',
      query: {
        location: searchInput,
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString(),
        numberOfGuests: numberOfGuests,
      },
    });
  };

  return (
    <header className="sticky top-0 z-50 grid grid-cols-3 bg-white shadow-md p-5 md:px-10">
      <div
        onClick={() => router.push('/')}
        className="relative flex items-center h-10 cursor-pointer my-auto"
      >
        <Image
          src="https://links.papareact.com/qd3"
          alt="Airbnb Logo"
          layout="fill"
          objectFit="contain"
          objectPosition="left"
        />
      </div>

      <div className="flex items-center md:border-2 rounded-full py-2 md:shadow-sm md:pr-2">
        <input
          className="flex-grow pl-5 bg-transparent outline-none text-sm text-gray-600 placeholder-gray-400"
          type="text"
          placeholder={placeholder || 'Start your Search'}
          value={searchInput}
          onChange={searchInputChangeHandler}
        />
        <MagnifyingGlassIcon className="hidden md:inline-flex h-8 bg-red-400 text-white rounded-full p-2 cursor-pointer" />
      </div>
      <div className="flex items-center justify-end space-x-4 text-gray-600">
        <p className="hidden md:inline-block cursor-pointer">Become a Host</p>
        <GlobeAltIcon className="h-6 cursor-pointer" />
        <div className="flex items-center space-x-2 border-2 p-2 rounded-full cursor-pointer">
          <Bars3Icon className="h-6" />
          <UserCircleIcon className="h-6" />
        </div>
      </div>

      {searchInput && (
        <div className="flex flex-col col-span-3 mx-auto mt-4">
          <DateRangePicker
            ranges={[selectionRange]}
            minDate={new Date()}
            rangeColors={['#fd5b61']}
            onChange={handleSelect}
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
              className="w-12 pl-2 text-xl outline-none text-red-400"
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
            <button onClick={onSearch} className="flex-grow text-red-400">
              Search
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
