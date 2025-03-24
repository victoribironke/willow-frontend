import { ENDPOINTS } from "@/constants/constants";
import {
  OrderItem,
  Product,
  Seller,
  UpdateProfile,
} from "@/interfaces/general";

export const getSellerDetails = async (userId: string) => {
  try {
    const req = await fetch(ENDPOINTS.get_seller_details(userId), {
      headers: {
        "Content-Type": "application/json",
        accept: "application/json",
      },
      credentials: "include",
    });
    const res = await req.json();

    if (res.status !== "success")
      return { data: null, error: res.message + "." };

    return { data: res.data as Seller, error: null };
  } catch (e) {
    console.log(e);
    return { data: null, error: "A server error occured." };
  }
};

export const getSellerOrders = async (userId: string) => {
  try {
    const req = await fetch(ENDPOINTS.get_seller_orders(userId), {
      headers: {
        "Content-Type": "application/json",
        accept: "application/json",
      },
      credentials: "include",
    });
    const res = await req.json();

    if (res.status !== "success")
      return { data: null, error: res.message + "." };

    return { data: res.data as OrderItem[], error: null };
  } catch (e) {
    console.log(e);
    return { data: null, error: "A server error occured." };
  }
};

export const getSellerOrder = async (userId: string, orderId: string) => {
  try {
    const req = await fetch(ENDPOINTS.get_seller_order(userId, orderId), {
      headers: {
        "Content-Type": "application/json",
        accept: "application/json",
      },
      credentials: "include",
    });
    const res = await req.json();

    if (res.status !== "success")
      return { data: null, error: res.message + "." };

    return { data: res.data as OrderItem, error: null };
  } catch (e) {
    console.log(e);
    return { data: null, error: "A server error occured." };
  }
};

export const getSellerProducts = async (userId: string) => {
  try {
    const req = await fetch(ENDPOINTS.get_seller_products(userId), {
      headers: {
        "Content-Type": "application/json",
        accept: "application/json",
      },
      credentials: "include",
    });
    const res = await req.json();

    if (res.status !== "success")
      return { data: null, error: res.message + "." };

    return { data: res.data as Product[], error: null };
  } catch (e) {
    console.log(e);
    return { data: null, error: "A server error occured." };
  }
};

export const getSellerProduct = async (userId: string, productId: string) => {
  try {
    const req = await fetch(ENDPOINTS.get_seller_product(userId, productId), {
      headers: {
        "Content-Type": "application/json",
        accept: "application/json",
      },
      credentials: "include",
    });
    const res = await req.json();

    if (res.status !== "success")
      return { data: null, error: res.message + "." };

    return { data: res.data as Product, error: null };
  } catch (e) {
    console.log(e);
    return { data: null, error: "A server error occured." };
  }
};

export const updateSellerProfile = async (userId: string, d: FormData) => {
  try {
    const req = await fetch(ENDPOINTS.update_seller_profile(userId), {
      method: "PATCH",
      body: d,
      headers: {
        "Content-Type": "application/json",
        accept: "application/json",
      },
      credentials: "include",
    });
    const res = await req.json();

    if (res.status !== "success")
      return { data: null, error: res.message + "." };

    return { data: "Successfully updated profile.", error: null };
  } catch (e) {
    console.log(e);
    return { data: null, error: "A server error occured." };
  }
};
