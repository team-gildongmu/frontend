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
    const isDev = process.env.NODE_ENV === "development";
    const apiBase = process.env.NEXT_PUBLIC_BASE_URL || "";
    if (isDev && apiBase) {
      const dest = apiBase.replace(/\/$/, "");
      return [
        {
          source: "/api/:path*",
          destination: `${dest}/:path*`,
        },
      ];
    }
    return [];
  },
};

module.exports = nextConfig;
