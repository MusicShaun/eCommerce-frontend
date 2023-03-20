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
        source: '/Men/men',
        destination: '/men',
        permanent: true,
      },
      {
        source: '/women/women',
        destination: '/women',
        permanent: true,
      },

    ]
  },
};

module.exports = nextConfig;