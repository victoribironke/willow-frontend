import {
  ChartNoAxesColumn,
  MessageCircleMore,
  MonitorUp,
  Package,
  ShoppingBag,
  Table2,
  User,
} from "lucide-react";

export const BASE_URL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3000"
    : "https://willow-frontend.vercel.app";

export const BACKEND_URL = "https://willow-backend.onrender.com/api/v1";

export const PAGES = {
  main: {
    home: "/",
    more_about_willow: "/more-about-willow",
    shop: {
      home: "/shop",
      chats: "/shop/chats",
      cart: "/shop/cart",
      orders: "/shop/orders",
      profile: "/shop/profile",
      wishlist: "/shop/wishlist",
      order: (id: string) => `/shop/orders/${id}`,
      seller: (id: string) => `/shop/seller/${id}`,
      product: (id: string) => `/shop/product/${id}`,
      search: (term: string) => `/shop/search/${term}`,
    },
  },

  dashboard: {
    home: "/dashboard",
    chat: "/dashboard/chat",
    analytics: "/dashboard/analytics",
    list_product: "/dashboard/list-product",
    products: "/dashboard/products",
    orders: "/dashboard/orders",
    profile: "/dashboard/profile",
    order: (id: string) => `/dashboard/orders/${id}`,
    product: (id: string) => `/dashboard/products/${id}`,
  },

  auth: {
    login: "/auth/login",
    register: "/auth/register",
    forgot_password: "/auth/forgot-password",
    reset_password: "/auth/reset-password",
  },
};

export const IMAGES = {
  shop_image: { src: "/shop.jpeg", w: 1080, h: 721 },
  mail: { src: "/mail.png", w: 122, h: 144 },
  logo: { src: "/logo.svg", w: 24, h: 26 },

  more_about_willow: {
    one: { src: "/more-about-willow/one.jpeg", w: 735, h: 490 },
    two: { src: "/more-about-willow/two.jpeg", w: 2730, h: 4096 },
    three: { src: "/more-about-willow/three.jpeg", w: 736, h: 1075 },
    four: { src: "/more-about-willow/four.jpeg", w: 736, h: 920 },
    five: { src: "/more-about-willow/five.jpeg", w: 736, h: 732 },
    six: { src: "/more-about-willow/six.jpeg", w: 736, h: 1104 },
    seven: { src: "/more-about-willow/seven.jpeg", w: 736, h: 1104 },
    eight: { src: "/more-about-willow/eight.jpeg", w: 600, h: 400 },
    nine: { src: "/more-about-willow/nine.jpeg", w: 736, h: 736 },
  },
};

export const ENDPOINTS = {
  // AUTH
  register_user: BACKEND_URL + "/users/register",
  login_user: BACKEND_URL + "/auth/login",
  forgot_password: BACKEND_URL + "/auth/forgot-password",
  reset_password: (token: string) =>
    BACKEND_URL + `/auth/password-reset?resetToken=${token}`,
  verify_otp: BACKEND_URL + "/auth/verify-account",
  resend_otp: BACKEND_URL + "/auth/resend-otp",

  // CUSTOMERS
  get_cart: (uid: string) => BACKEND_URL + `/customers/${uid}/cart`,
  update_cart: (uid: string, pid: string) =>
    BACKEND_URL + `/customers/${uid}/cart/${pid}`,
  update_liked_products: (uid: string, pid: string) =>
    BACKEND_URL + `/customers/${uid}/liked-products/${pid}`,
  post_review: (uid: string, pid: string) =>
    BACKEND_URL + `/customers/${uid}/products/${pid}/reviews`,
  delete_review: (uid: string, pid: string, rid: string) =>
    BACKEND_URL + `/customers/${uid}/products/${pid}/reviews/${rid}`,
  get_orders: (uid: string) => BACKEND_URL + `/customers/${uid}/orders`,
  get_order: (uid: string, oid: string) =>
    BACKEND_URL + `/customers/${uid}/orders/${oid}`,

  // SELLER
  get_seller_details: (uid: string) => BACKEND_URL + `/sellers/${uid}`,
  get_seller_products: (uid: string) =>
    BACKEND_URL + `/sellers/${uid}/products`,
  get_seller_orders: (uid: string) => BACKEND_URL + `/sellers/${uid}/orders`,
  get_seller_order: (uid: string, oid: string) =>
    BACKEND_URL + `/sellers/${uid}/orders/${oid}`,
};

export const IMAGE_TIPS = [
  "Center the product in the frame.",
  "Use high-resolution images.",
  "Shoot in natural lighting.",
  "Use a simple, uncluttered background.",
  "Include eco labels or certifications if visible.",
  "Show the ingredients/material section, if applicable.",
  "Ensure the image is properly oriented.",
  "Avoid heavy editing or filters.",
];

export const SIDEBAR_ITEMS = (pathname: string) => [
  {
    title: "Dashboard",
    icon: Table2,
    isActive: pathname === PAGES.dashboard.home,
    link: PAGES.dashboard.home,
  },
  {
    title: "Chat",
    icon: MessageCircleMore,
    isActive: pathname === PAGES.dashboard.chat,
    link: PAGES.dashboard.chat,
  },
  {
    title: "Analytics",
    icon: ChartNoAxesColumn,
    isActive: pathname === PAGES.dashboard.analytics,
    link: PAGES.dashboard.analytics,
  },
  {
    title: "List product",
    icon: MonitorUp,
    isActive: pathname === PAGES.dashboard.list_product,
    link: PAGES.dashboard.list_product,
  },
  {
    title: "Products",
    icon: Package,
    isActive:
      pathname === PAGES.dashboard.products ||
      pathname.includes("/dashboard/product"),
    link: PAGES.dashboard.products,
  },
  {
    title: "Orders",
    icon: ShoppingBag,
    isActive:
      pathname === PAGES.dashboard.orders ||
      pathname.includes("/dashboard/orders"),
    link: PAGES.dashboard.orders,
  },
  {
    title: "Profile",
    icon: User,
    isActive: pathname === PAGES.dashboard.profile,
    link: PAGES.dashboard.profile,
  },
];

export const HEADER_LINKS = (pathname: string) => [
  {
    title: "Shop",
    isActive: pathname === PAGES.main.shop.home,
    link: PAGES.main.shop.home,
  },
  {
    title: "Chats",
    isActive: pathname === PAGES.main.shop.chats,
    link: PAGES.main.shop.chats,
  },
  {
    title: "Wishlist",
    isActive: pathname === PAGES.main.shop.wishlist,
    link: PAGES.main.shop.wishlist,
  },
  {
    title: "Orders",
    isActive: pathname === PAGES.main.shop.orders,
    link: PAGES.main.shop.orders,
  },
];

export const SUSTAINABILITY_FEATURES = ["Reusable", "Energy efficient"].sort();
