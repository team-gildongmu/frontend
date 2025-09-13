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
  async rewrites() {
    const apiBase = process.env.NEXT_PUBLIC_BASE_URL || "";

    if (apiBase) {
      const dest = apiBase.replace(/\/$/, "");

      return [
        {
          source: "/api/auth/refresh", // 토큰 갱신만 프록시
          destination: `${dest}/auth/refresh`,
        },
      ];
    }

    console.log(
      "⚠️ Next.js Config - No API Base URL found, no proxy configured"
    );
    return [];
  },
};

module.exports = nextConfig;
