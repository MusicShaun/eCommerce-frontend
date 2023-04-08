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
        source: '/register',
        destination: '/login/LoginWrapper',
        permanent: true,
      },
      {
        source: '/login',
        destination: '/login/LoginWrapper',
        permanent: true,
      },
      {
        source: '/men',
        destination: '/men/Men',
        permanent: true,
      },
      {
        source: '/women',
        destination: '/women/Women',
        permanent: true,
      },
      {
        source: '/wishlist',
        destination: '/user/Wishlist',
        permanent: true,
      },
      {
        source: '/cart',
        destination: '/user/Cart',
        permanent: true,
      },
      {
        source: '/account',
        destination: '/user/MyAccount',
        permanent: true,
      },
      {
        source: '/userlanding',
        destination: '/user/UserLanding',
        permanent: true,
      },
      {
        source: '/userlanding',
        destination: '/user/UserLanding',
        permanent: true,
      },
      {
        source: '/myorders',
        destination: '/user/MyOrders',
        permanent: true,
      },
      {
        source: '/personaldetails',
        destination: '/user/PersonalDetails',
        permanent: true,
      },
      {
        source: '/purchasehistory',
        destination: '/user/PurchaseHistory',
        permanent: true,
      },
      {
        source: '/search',
        destination: '/user/ProductSearch',
        permanent: true,
      },
      {
        source: '/forgotpassword',
        destination: '/login/ForgotPassword',
        permanent: true,
      },
      {
        source: '/resetpassword',
        destination: '/login/RestPassword',
        permanent: true,
      },


    ]
  },
};

module.exports = nextConfig;

