import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'ac.goit.global',
        pathname: '/car-rental-task/**',
      },
    ],
  },
  reactCompiler: true,
};

export default nextConfig;
