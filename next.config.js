const nextConfig = {
  reactStrictMode: false,
  compiler: {
    styledComponents: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.cloudinary.com',
        port: '',

      }
    ]
  },
  async redirects() {
    return [
      {
        source: '/:path*',
        destination: '/',
        permanent: true,
      },
    ]
  },
};

module.exports = nextConfig;