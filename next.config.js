/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
    swcPlugins: [["next-superjson-plugin", {}]],
  },
  images: {
    domains: [
      "k.kakaocdn.net",
      "res.cloudinary.com",
      "avatars.githubusercontent.com",
      "lh3.googleusercontent.com",
      "static.naver.net",
      "openapi.naver.com/v1/nid/me",
      "k.kakaocdn.net",
    ],
  },
};

module.exports = nextConfig;
