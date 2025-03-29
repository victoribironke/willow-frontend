import { ApprovalStatus } from "@/interfaces/general";
import {
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

export const LOCAL_STORAGE_KEY = "willow";

export const BACKEND_URL = "https://willow-backend-1.onrender.com/api/v1";

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
      search: (text?: string) => `/shop/search?text=${text}`,
    },
  },

  dashboard: {
    home: "/dashboard",
    chats: "/dashboard/chats",
    analytics: "/dashboard/analytics",
    list_product: "/dashboard/list-product",
    products: "/dashboard/products",
    orders: "/dashboard/orders",
    profile: "/dashboard/profile",
    chat: (id: string) => `/dashboard/chats/${id}`,
    order: (id: string) => `/dashboard/orders/${id}`,
    product: (id: string) => `/dashboard/products/${id}`,
    search: (text?: string, status?: string) =>
      `/dashboard/search?text=${text}&status=${status}`,
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

  get_products: BACKEND_URL + "/products",
  get_product: (pid: string) => BACKEND_URL + `/products/${pid}`,
  search_customer_products: (text: string) =>
    BACKEND_URL + `/products/search?text=${text}`,

  // CUSTOMERS
  get_cart: (uid: string) => BACKEND_URL + `/customers/${uid}/cart`,
  checkout: (uid: string) => BACKEND_URL + `/customers/${uid}/cart/checkout`,
  get_liked_products: (uid: string) =>
    BACKEND_URL + `/customers/${uid}/liked-products`,
  get_customer_recommendations: (uid: string) =>
    BACKEND_URL + `/customers/${uid}/recommendations`,
  get_customer_details: (uid: string) => BACKEND_URL + `/customers/${uid}`,
  update_customer_details: (uid: string) =>
    BACKEND_URL + `/customers/${uid}/update-profile`,
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
  create_product: (uid: string) => BACKEND_URL + `/sellers/${uid}/products`,
  delete_product: (uid: string, pid: string) =>
    BACKEND_URL + `/sellers/${uid}/products/${pid}`,
  get_seller_product: (uid: string, pid: string) =>
    BACKEND_URL + `/sellers/${uid}/products/${pid}`,
  get_seller_orders: (uid: string) => BACKEND_URL + `/sellers/${uid}/orders`,
  get_seller_order: (uid: string, oid: string) =>
    BACKEND_URL + `/sellers/${uid}/orders/${oid}`,
  update_seller_profile: (uid: string) =>
    BACKEND_URL + `/sellers/${uid}/update-profile`,
  search_seller_products: (uid: string, text: string, filter: ApprovalStatus) =>
    BACKEND_URL +
    `/sellers/${uid}/catalogue/search?text=${text}&approvalStatus=${filter}`,
  get_seller_conversations: (uid: string) =>
    BACKEND_URL + `/sellers/${uid}/conversations`,
  get_seller_conversation: (uid: string, cid: string) =>
    BACKEND_URL + `/sellers/${uid}/conversations/${cid}`,
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
    isActive:
      pathname === PAGES.dashboard.chats ||
      pathname.includes(PAGES.dashboard.chats),
    link: PAGES.dashboard.chats,
  },
  // {
  //   title: "Analytics",
  //   icon: ChartNoAxesColumn,
  //   isActive: pathname === PAGES.dashboard.analytics,
  //   link: PAGES.dashboard.analytics,
  // },
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
      pathname.includes(PAGES.dashboard.products),
    link: PAGES.dashboard.products,
  },
  {
    title: "Orders",
    icon: ShoppingBag,
    isActive:
      pathname === PAGES.dashboard.orders ||
      pathname.includes(PAGES.dashboard.orders),
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

export const SUSTAINABILITY_FEATURES = [
  "BIODEGRADABLE",
  "COMPOSTABLE",
  "REUSABLE",
  "RECYCLED_MATERIALS",
  "WATER_EFFICIENT",
  "SOLAR_POWERED",
  "MINIMAL_CARBON_FOOTPRINT",
  "ENERGY_EFFICIENT",
  "ZERO_WASTE",
  "PLASTIC_FREE",
  "REPAIRABLE_DESIGN",
  "UPCYCLED",
  "CARBON_OFFSET",
  "ORGANIC_MATERIALS",
  "FAIR_TRADE",
  "VEGAN",
  "NON_TOXIC",
  "REGENERATIVE_AGRICULTURE",
  "SLOW_PRODUCTION",
  "WASTE_REDUCING_DESIGN",
  "CIRCULAR_DESIGN",
  "WILDLIFE_FRIENDLY",
  "DURABLE_DESIGN",
  "LOW_EMISSION_PRODUCTION",
  "CHEMICAL_FREE",
  "CRUELTY_FREE",
  "TREE_FREE",
  "ETHICALLY_SOURCED",
  "RENEWABLE_ENERGY_USED",
  "SOCIALLY_RESPONSIBLE",
]
  .sort()
  .map((a) => a.split("_").join(" "));

export const PACKAGING = [
  "UNKNOWN_PACKAGING",
  "PLASTIC_BAG",
  "PLASTIC_FREE",
  "BIODEGRADABLE",
  "RECYCLED_PAPER",
  "RECYCLED_CARDBOARD",
  "REUSABLE_PACKAGING",
  "COMPOSTABLE_PACKAGING",
  "MINIMAL_PACKAGING",
  "GLASS_CONTAINER",
  "METAL_CONTAINER",
  "RECYCLED_PLASTIC",
  "PLASTIC_CONTAINER",
  "PAPERBOARD_BOX",
  "BAMBOO_PACKAGING",
  "ALUMINUM_CONTAINER",
  "OTHER",
].map((a) => a.split("_").join(" "));

export const SOURCING = ["LOCALLY_SOURCED", "INTERNATIONALLY_SOURCED"]
  .sort()
  .map((a) => a.split("_").join(" "));
