export const BASE_URL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3000"
    : "https://willow-frontend.vercel.app";

export const PAGES = {
  dashboard: { home: "/dashboard" },

  auth: {
    login: "/auth/login",
    register: "/auth/register",
    forgot_password: "/auth/forgot-password",
  },
};

export const IMAGES = {
  auth_image: "/auth-image.png",
};
