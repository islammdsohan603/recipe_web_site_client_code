/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '/**',
      },
      // মূল ImgBB ডোমেন
      {
        protocol: 'https',
        hostname: 'i.ibb.co',
        pathname: '/**',
      },
      // নতুন ImgBB ডোমেন (অনেক সময় এই লিঙ্কে ছবি আপলোড হয়)
      {
        protocol: 'https',
        hostname: 'i.ibb.co.com',
        pathname: '/**',
      },
      // সাধারণ ImgBB লিঙ্ক সেফটি
      {
        protocol: 'https',
        hostname: 'ibb.co',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;