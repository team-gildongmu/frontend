/** @type {import('next').NextConfig} */
const nextConfig = {
  compiler: {
    styledComponents: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**", // 모든 https 도메인 허용 (개발용)
        port: "",
        pathname: "/**",
      },
    ],
  },
};

module.exports = nextConfig;
