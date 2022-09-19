import Image from 'next/image';
import React from 'react';

const LargeCard = ({ img, title, description, buttonText }) => {
  return (
    <section className="relative py-16 cursor-pointer">
      <div className="relative min-w-[300px] h-96">
        <Image
          src={img}
          alt={title}
          layout="fill"
          objectFit="cover"
          className="rounded-2xl"
        />
      </div>
      <div className="absolute top-32 left-12">
        <h3 className="text-4xl mb-3 w-64">{title}</h3>
        <p>{description}</p>
        <button className="text-sm text-white bg-gray-900 px-4 py-2 rounded-lg mt-5">
          {buttonText}
        </button>
      </div>
    </section>
  );
};

export default LargeCard;
