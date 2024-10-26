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
    forebase_apiKey: "AIzaSyA-YH6zRsMgbSVFxE_I25vjYvKnmo246To",
    firebase_authDomain: "alefast-9806f.firebaseapp.com",
    firebase_projectId: "alefast-9806f",
    firebase_storageBucket: "alefast-9806f.appspot.com",
    firebase_messagingSenderId: "140682582534",
    firebase_appId: "1:140682582534:web:1fcf1ed79896ddd4134187",
    firebase_measurementId: "G-H7BME37J2V",
  },
};
