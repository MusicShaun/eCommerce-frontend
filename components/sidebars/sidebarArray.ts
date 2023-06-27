import details from '@/public/account_details.webp'
import welcome from '@/public/account_welcome.webp'
import orders from '@/public/account_orders.webp'
import history from '@/public/account_history.webp'
import wishlist from '@/public/account_wishlist.webp'


export const stack2Data = [
  [
    { img: welcome, alt: 'Welcome Image', link: '/user/MyAccount', label: 'Welcome' },
  ],
  [
    { img: details, alt: 'Details Image', link: '/user/PersonalDetails', label: 'Personal Details' },
  ],
  [
    { img: orders, alt: 'Orders Image', link: '/user/MyOrders', label: 'My Orders' },
    { img: wishlist, alt: 'Wishlist Image', link: '/user/WishList', label: 'Wishlist' },
    { img: history, alt: 'History Image', link: '/user/PurchaseHistory', label: 'Purchase History' },
  ],
];