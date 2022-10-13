/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: [
      'links.papareact.com',
      'cdn.sanity.io',
      'a0.muscache.com',
      'lh3.googleusercontent.com',
    ],
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
    GOOGLE_ID:
      '8378541003-9f8u1jjve7ma9l8hgdssdbl22m8es9ol.apps.googleusercontent.com',
    GOOGLE_SECRET: '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',
    SANITY_API_TOKEN:
      'skUhO8qiHcnodqQ7OGy6HFtFjcdl9VpNOIJMchFmqPF3Ijoo9FNcP8MjFSVniD3pZH7qGNxKv30NtFNg1BcLLtJ6d7mS6aPtcYitE2qxA8BZjwRuCJup0B0Mzq6ccwMQ1XUlxV6V9BA4Vwoi2QRVFc8vnUW9Yxi3L0hUggOSaEU83KUcd4Ai',
      NEXTAUTH_SECRET :'bcJl/MwN8fi912dFJDxwZ57tSsv4LYM2v86H5tWMEQ4='
  },
};

module.exports = nextConfig;
