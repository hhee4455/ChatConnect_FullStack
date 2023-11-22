/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    swcPlugins: [["next-superjson-plugin", {}]],
  },
  images: {
    domains: [
      "k.kakaocdn.net",
      "res.cloudinary.com",
      "k.kakaocdn.net",
      "avatars.githubusercontent.com",
      "lh3.googleusercontent.com",
      "static.naver.net",
      "openapi.naver.com/v1/nid/me",
      "k.kakaocdn.net",
      "res.cloudinary.com",
      "ssl.pstatic.net",
    ],
  },
};

module.exports = nextConfig;
