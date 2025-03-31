import { ENDPOINTS } from "@/constants/constants";
import { Product } from "@/interfaces/general";

export const getProducts = async () => {
  try {
    const req = await fetch(ENDPOINTS.get_products, {
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

export const getLastViewedProducts = async (userId: string) => {
  try {
    const req = await fetch(ENDPOINTS.get_last_viewed_products(userId), {
      headers: {
        "Content-Type": "application/json",
        accept: "application/json",
      },
      credentials: "include",
    });
    const res = await req.json();

    if (res.status !== "success")
      return { data: null, error: res.message + "." };

    return {
      data: res.data
        .sort((a: any, b: any) => (a.weight > b.weight ? 1 : -1))
        .map((d: any) => d.product) as Product[],
      error: null,
    };
  } catch (e) {
    console.log(e);
    return { data: null, error: "A server error occured." };
  }
};

export const getProduct = async (productId: string) => {
  try {
    const req = await fetch(ENDPOINTS.get_product(productId), {
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
