/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',           // ← 정적 사이트용 export 설정 추가
  compiler: {
    styledComponents: true,
  },
};

module.exports = nextConfig;
