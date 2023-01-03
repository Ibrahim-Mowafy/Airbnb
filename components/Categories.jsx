import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { categories } from '../utils/constants';

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
          className={`flex flex-col justify-center items-center cursor-pointer filter-custom  hover:text-black transition-all hover:border-b-2 hover:border-gray-300 pb-2 active:scale-95 hover:filter-none  transform duration-150 ease-out  ${
            categorySelected === category.name
              ? '!filter-none  border-b-2 border-black pointer-events-none'
              : ''
          }`}
        >
          <span className="text-3xl">
            <Image
              src={category.icon}
              alt={category.name}
              width={25}
              height={25}
            />
          </span>
          <span className="text-xs font-semibold pt-0.5 text-center whitespace-nowrap">
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
          // slidesPerView={12}
          spaceBetween={40}
          grabCursor={true}
          breakpoints={{
            // when window width is >= 640px
            320: {
              width: 320,
              slidesPerView: 3,
            },
            // when window width is >= 768px
            768: {
              width: 768,
              slidesPerView: 7,
            },
          }}
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
