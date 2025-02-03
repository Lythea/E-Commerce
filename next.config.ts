import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['localhost'], // Add other domains or paths as needed
  },
};

export default nextConfig;
