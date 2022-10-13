import sanityClient from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

export const client = sanityClient({
  projectId: '4znttck5',
  dataset: 'production',
  apiVersion: '2022-03-10',
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
  ignoreBrowserTokenWarning: true,
});

const builder = imageUrlBuilder(client);

export const urlFor = (source) => builder.image(source);
