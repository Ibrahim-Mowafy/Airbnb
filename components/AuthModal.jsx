import React, { useContext } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { BsFacebook } from 'react-icons/bs';
import { AiFillApple } from 'react-icons/ai';
import { MdClose } from 'react-icons/md';
import { ModalContext } from '../context/modal-context';

const Backdrop = ({ onCloseModal }) => {
  return (
    <div
      className="fixed top-0 left-0 h-[100vh] z-50 w-full bg-black opacity-70"
      onClick={onCloseModal}
    />
  );
};

const ModalOverlay = ({ onCloseModal }) => (
  <div className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-[51] bg-white p-2 rounded-lg w-[30rem]">
    <div className="flex flex-col">
      <header className="border-b py-2 px-2.5 flex items-center">
        <div
          className=" hover:bg-gray-200 rounded-full p-3 cursor-pointer transition-colors"
          onClick={onCloseModal}
        >
          <MdClose />
        </div>
        <h1 className="text-base font-semibold flex-grow text-center">
          Log in or sign up
        </h1>
      </header>
      <div className="p-6">
        <h3 className="font-semibold text-xl pb-5 ">Welcome to Airbnb</h3>
        <form>
          <div className="relative mb-3">
            <input
              type="email"
              id="email"
              className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border border-gray-400 appearance-none  focus:outline-none focus:ring-0 focus:border-black peer"
              placeholder=" "
            />
            <label
              htmlFor="email"
              className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2  peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
            >
              Email
            </label>
          </div>
          <div className="relative mb-3">
            <input
              type="password"
              id="password"
              className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border border-gray-400 appearance-none  focus:outline-none focus:ring-0 focus:border-black peer"
              placeholder=" "
            />
            <label
              htmlFor="password"
              className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2  peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
            >
              Password
            </label>
          </div>
          <div>
            <button className="button w-full py-2 rounded-lg bg-[#fd5b61] text-white active:bg-[#ff7075] font-semibold text-lg ">
              Continue
            </button>
          </div>
        </form>
        <div className="mt-4 text-sm  before:w-full before:h-[1px] before:bg-gray-200  after:w-full after:h-[1px] after:bg-gray-200  flex justify-center items-center">
          <span className="px-3 text-gray-400">or</span>
        </div>

        <div className="flex flex-col gap-y-2 mt-4">
          <button className="button w-full py-2 rounded-lg font-semibold text-base border border-gray-400">
            <div className="flex items-center justify-start ">
              <BsFacebook className="text-blue-700 text-xl" />
              <div className="flex-grow">Continue with Facebook</div>
            </div>
          </button>
          <button className="button w-full py-2 rounded-lg font-semibold text-base border border-gray-400">
            <div className="flex items-center justify-start ">
              <FcGoogle className="text-xl" />
              <div className="flex-grow">Continue with Google</div>
            </div>
          </button>
          <button className="button w-full py-2 rounded-lg font-semibold text-base border border-gray-400">
            <div className="flex items-center justify-start ">
              {/* <BsApple /> */}
              <AiFillApple className="text-xl" />
              <div className="flex-grow">Continue with Apple</div>
            </div>
          </button>
        </div>
      </div>
    </div>
  </div>
);

const AuthModal = () => {
  const closeModal = useContext(ModalContext).closeModal;
  const closeModalHandler = () => {
    closeModal();
  };
  return (
    <>
      <Backdrop onCloseModal={closeModalHandler} />
      <ModalOverlay onCloseModal={closeModalHandler} />
    </>
  );
};

export default AuthModal;
