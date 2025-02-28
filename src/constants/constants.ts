export const BASE_URL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3000"
    : "https://willow-frontend.vercel.app";

export const BACKEND_URL = "https://willow-backend.onrender.com/api/v1";

export const PAGES = {
  dashboard: { home: "/dashboard" },

  auth: {
    login: "/auth/login",
    register: "/auth/register",
    forgot_password: "/auth/forgot-password",
  },
};

export const IMAGES = {
  auth_image: { src: "/auth-image.png", w: 1024, h: 512 },
  mail: { src: "/mail.png", w: 122, h: 144 },
};

export const ENDPOINTS = {
  register_user: BACKEND_URL + "/users/register",
  login_user: BACKEND_URL + "/auth/login",
  forgot_password: BACKEND_URL + "/auth/forgot-password",
  verify_otp: BACKEND_URL + "/auth/verify-account",
};
