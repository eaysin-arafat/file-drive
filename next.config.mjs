/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "giant-whale-756.convex.cloud",
      },
    ],
  },
};

export default nextConfig;
