import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { HiOutlineHome } from 'react-icons/hi';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Navigation } from 'swiper';

const categories = [
  {
    name: 'National parks',
    icon: <HiOutlineHome />,
  },
  {
    name: 'Beach',
    icon: <HiOutlineHome />,
  },
  {
    name: 'Islands',
    icon: <HiOutlineHome />,
  },
  {
    name: 'Windmills',
    icon: <HiOutlineHome />,
  },
  {
    name: 'Tiny homes',
    icon: <HiOutlineHome />,
  },
  {
    name: 'OMG!',
    icon: <HiOutlineHome />,
  },
  {
    name: 'Amazing pools',
    icon: <HiOutlineHome />,
  },
  {
    name: 'Arctic',
    icon: <HiOutlineHome />,
  },
  {
    name: 'Design',
    icon: <HiOutlineHome />,
  },
  {
    name: 'Shared homes',
    icon: <HiOutlineHome />,
  },
  {
    name: 'Caves',
    icon: <HiOutlineHome />,
  },
  {
    name: 'Amazing views',
    icon: <HiOutlineHome />,
  },
];

const Categories = () => {
  const router = useRouter();

  let { category: categorySelected } = router.query;
  if (!categorySelected) {
    categorySelected = categories[0].name;
  }

  const categoriesContent = categories.map((category) => (
    <SwiperSlide key={category.name}>
      <Link href={`/?category=${category.name}`}>
        <div
          className={`flex flex-col justify-center items-center cursor-pointer text-gray-500 hover:text-black transition hover:border-b-2 hover:border-gray-300 pb-2 active:scale-95  transform duration-150 ease-out  ${
            categorySelected === category.name
              ? 'text-black border-b-2 border-black pointer-events-none'
              : ''
          }`}
        >
          <span className="text-3xl ">{category.icon}</span>
          <span className="text-sm pt-0.5 text-center whitespace-nowrap">
            {category.name}
          </span>
        </div>
      </Link>
    </SwiperSlide>
  ));

  return (
    <section className="categories pt-8 sticky top-20 bg-white z-40 shadow-sm  w-full">
      <div className="mx-auto px-8 sm:px-16 ">
        <Swiper
          slidesPerView={10}
          spaceBetween={50}
          grabCursor={true}

          // modules={[Navigation]}
          // navigation={true}
        >
          {categoriesContent}
        </Swiper>
      </div>
    </section>
  );
};

export default Categories;
