/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['links.papareact.com', 'cdn.sanity.io', 'a0.muscache.com'],
  },
  i18n: {
    locales: ['en'],
    defaultLocale: 'en',
  },
  env: {
    MAP_BOX_KEY:
      'pk.eyJ1IjoiYWhtZWQybW9oYW1lZCIsImEiOiJjbDhiaDluYXowcjFqM3BuM3FpdWhhdjM4In0.7H1O6fjUBySNQUXHloPK2A',
    STRIPE_PUBLISHABLE_KEY:
      'pk_test_51Lld0rCESh4YsU5s9g9q1dLELUMN9BBhWlobwau5Yady1Hh4nB0hEiLPg3MHeIHKH294Flqt90gqTQ6qn5DM892A005QAsoqVO',
    STRIPE_SECRET_KEY:
      'sk_test_51Lld0rCESh4YsU5sT1uyD30pNTDX5iqJJMgavbIfES6LXGJgQUTerW6aGQM2bntL7ymIOywoTH6f84cF9sYImwNC00VOYr0VfV',
  },
};

module.exports = nextConfig;
