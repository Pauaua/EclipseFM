/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: {
      allowedOrigins: [
        "localhost:3000",
        "eclipsefm.vercel.app",
        "www.radioeclipsefm.cl",
        "radioeclipsefm.cl",
      ],
    },
  },
};

module.exports = nextConfig;
