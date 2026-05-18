/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: {
      allowedOrigins: [
        "localhost:3000",
        "eclipsefm.vercel.app",
        "www.eclipsefm.cl",
        "eclipsefm.cl",
      ],
    },
  },
};

module.exports = nextConfig;
