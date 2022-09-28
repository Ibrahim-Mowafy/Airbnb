export default {
  name: 'room',
  type: 'document',
  title: 'Room',
  fields: [
    {
      name: 'title',
      type: 'string',
      title: 'Title',
    },
    {
      name: 'country',
      type: 'string',
      title: 'Country',
    },
    {
      name: 'address',
      type: 'string',
      title: 'Address',
    },
    {
      name: 'price_per_night',
      type: 'number',
      title: 'Price per night',
    },
    {
      name: 'rate',
      type: 'number',
      title: 'Rate',
    },
    {
      title: 'Images of room',
      name: 'images',
      type: 'array',
      of: [{ type: 'image' }],
      options: { hotspot: true },
    },
    {
      name: 'lat',
      type: 'number',
      title: 'Latitude of the Room',
    },
    {
      name: 'long',
      type: 'number',
      title: 'Longitude of the Room',
    },
    {
      name: 'about',
      type: 'string',
      title: 'About',
    },
    {
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          {
            title: 'National parks',
            value: 'National parks',
          },
          {
            title: 'Beach',
            value: 'Beach',
          },
          {
            title: 'Islands',
            value: 'Islands',
          },
          {
            title: 'Windmills',
            value: 'Windmills',
          },
          {
            title: 'Tiny homes',
            value: 'Tiny homes',
          },
          {
            title: 'OMG!',
            value: 'OMG!',
          },
          {
            title: 'Amazing pools',
            value: 'Amazing pools',
          },
          {
            title: 'Arctic',
            value: 'Arctic',
          },
          {
            title: 'Design',
            value: 'Design',
          },
          {
            title: 'Shared homes',
            value: 'Shared homes',
          },
          {
            title: 'Caves',
            value: 'Caves',
          },
          {
            title: 'Amazing views',
            value: 'Amazing views',
          },
        ],
        layout: 'radio',
      },
    },
  ],
};
