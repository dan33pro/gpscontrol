/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    API_URL: process.env.API_URL,
    API_VERSION: process.env.API_VERSION,
  },
}

const dotenv = require('dotenv');
dotenv.config();

module.exports = nextConfig
