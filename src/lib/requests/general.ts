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
