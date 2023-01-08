/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    MAPBOX_ACCESS_TOKEN: process.env.MAPBOX_ACCESS_TOKEN,
    PLATERECOGNIZER_TOKEN : process.env.PLATERECOGNIZER_TOKEN
  }
}

module.exports = nextConfig
