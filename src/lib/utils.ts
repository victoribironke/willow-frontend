import { jwtDecode } from "jwt-decode";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));

export const formatNumber = (n: number) => new Intl.NumberFormat().format(n);

export const validatePassword = (password: string) => {
  if (password.length < 8) {
    return {
      valid: false,
      reason: "Password must be at least 8 characters long.",
    };
  }

  if (!/[A-Z]/.test(password)) {
    return {
      valid: false,
      reason: "Password must contain at least 1 uppercase letter.",
    };
  }

  if (!/[a-z]/.test(password)) {
    return {
      valid: false,
      reason: "Password must contain at least 1 lowercase letter.",
    };
  }

  if (!/\d/.test(password)) {
    return {
      valid: false,
      reason: "Password must contain at least 1 number.",
    };
  }

  return {
    valid: true,
    reason: "Password meets all requirements.",
  };
};

export const validateEmail = (value: string) =>
  /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/.test(value);

export const getJwtExpiration = (token: string) => {
  try {
    const decoded = jwtDecode(token);

    if (!decoded.exp) {
      return null;
    }

    return new Date(decoded.exp * 1000).getTime();
  } catch (error) {
    console.error("Error decoding JWT:", error);
    return null;
  }
};
