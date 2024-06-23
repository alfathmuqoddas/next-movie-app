/** @type {import('next').NextConfig} */

module.exports = {
  reactStrictMode: true,
  output: "standalone",
  /* images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "image.tmdb.org",
        port: "",
        pathname: "/t/p/**",
      },
      {
        protocol: "https",
        hostname: "via.placeholder.com",
        port: "",
        pathname: "/**",
      },
    ],
  }, */
  env: {
    API_KEY: "403829fffc80d8184aa974d631a475c5",
  },
};
