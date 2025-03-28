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

export const formatDateTime = (dateString: string | Date) => {
  if (!dateString) return "";

  const date = new Date(dateString);

  return date.toLocaleString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
};

export const getUniqueNumber = () => Date.now();

export const convertTextFromUppercase = (str: string | undefined) => {
  if (!str) return "";

  return str
    .toLowerCase() // Convert the entire string to lowercase
    .split("_") // Split the string by underscores
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1)) // Capitalize the first letter of each word
    .join(" "); // Join the words with a space
};

export const convertToUpperUnderscoreFormat = (str: string) => {
  return str
    .toUpperCase() // Convert the entire string to uppercase
    .replace(/\s+/g, "_") // Replace spaces with underscores
    .replace(/_+/g, "_") // Replace multiple underscores with a single underscore
    .trim(); // Remove any leading or trailing whitespace
};

export const getRangeString = (number: number) => {
  if (number >= 0 && number <= 29) return "We avoid";
  else if (number >= 30 && number <= 49) return "Not good enough";
  else if (number >= 50 && number <= 69) return "It's a start";
  else if (number >= 70 && number <= 89) return "Good";
  else if (number >= 90 && number <= 100) return "Great";
  else return "Number out of range (1-100)";
};
