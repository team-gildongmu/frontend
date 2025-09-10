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
    console.log('🔧 Next.js Config - API Base URL:', apiBase);
    
    if (apiBase) {
      const dest = apiBase.replace(/\/$/, "");
      console.log('🔧 Next.js Config - Proxy destination:', dest);
      return [
        {
          source: "/api/:path*",
          destination: `${dest}/:path*`,
        },
      ];
    }
    
    console.log('⚠️ Next.js Config - No API Base URL found, no proxy configured');
    return [];
  },
};

module.exports = nextConfig;
