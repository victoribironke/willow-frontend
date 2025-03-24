import { ENDPOINTS } from "@/constants/constants";
import { Cart, NewReview } from "@/interfaces/general";

export const removeItemFromCart = async (userId: string, productId: string) => {
  try {
    const req = await fetch(ENDPOINTS.update_cart(userId, productId), {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        accept: "application/json",
      },
      credentials: "include",
    });
    const res = await req.json();

    if (res.status !== "success")
      return { data: null, error: res.message + "." };

    return { data: res.data.message + ".", error: null };
  } catch (e) {
    console.log(e);
    return { data: null, error: "A server error occured." };
  }
};

export const addItemToCart = async (
  userId: string,
  productId: string,
  quantity: number
) => {
  try {
    const req = await fetch(ENDPOINTS.update_cart(userId, productId), {
      method: "PUT",
      body: JSON.stringify({ quantity }),
      headers: {
        "Content-Type": "application/json",
        accept: "application/json",
      },
      credentials: "include",
    });
    const res = await req.json();

    if (res.status !== "success")
      return { data: null, error: res.message + "." };

    return { data: "Cart updated.", error: null };
  } catch (e) {
    console.log(e);
    return { data: null, error: "A server error occured." };
  }
};

export const removeItemFromLikedProducts = async (
  userId: string,
  productId: string
) => {
  try {
    const req = await fetch(
      ENDPOINTS.update_liked_products(userId, productId),
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          accept: "application/json",
        },
        credentials: "include",
      }
    );
    const res = await req.json();

    if (res.status !== "success")
      return { data: null, error: res.message + "." };

    return { data: res.data.message + ".", error: null };
  } catch (e) {
    console.log(e);
    return { data: null, error: "A server error occured." };
  }
};

export const addItemToLikedProducts = async (
  userId: string,
  productId: string
) => {
  try {
    const req = await fetch(
      ENDPOINTS.update_liked_products(userId, productId),
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          accept: "application/json",
        },
        credentials: "include",
      }
    );
    const res = await req.json();

    if (res.status !== "success")
      return { data: null, error: res.message + "." };

    return { data: "Cart updated.", error: null };
  } catch (e) {
    console.log(e);
    return { data: null, error: "A server error occured." };
  }
};

export const postReview = async (
  userId: string,
  productId: string,
  review: NewReview
) => {
  try {
    const req = await fetch(ENDPOINTS.post_review(userId, productId), {
      method: "POST",
      body: JSON.stringify(review),
      headers: {
        "Content-Type": "application/json",
        accept: "application/json",
      },
      credentials: "include",
    });
    const res = await req.json();

    if (res.status !== "success")
      return { data: null, error: res.message + "." };

    return { data: "Review added successfully.", error: null };
  } catch (e) {
    console.log(e);
    return { data: null, error: "A server error occured." };
  }
};

export const deleteReview = async (
  userId: string,
  productId: string,
  reviewId: string
) => {
  try {
    const req = await fetch(
      ENDPOINTS.delete_review(userId, productId, reviewId),
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          accept: "application/json",
        },
        credentials: "include",
      }
    );
    const res = await req.json();

    if (res.status !== "success")
      return { data: null, error: res.message + "." };

    return { data: "Review deleted successfully.", error: null };
  } catch (e) {
    console.log(e);
    return { data: null, error: "A server error occured." };
  }
};

export const getCart = async (userId: string) => {
  try {
    const req = await fetch(ENDPOINTS.get_cart(userId), {
      headers: {
        "Content-Type": "application/json",
        accept: "application/json",
      },
      credentials: "include",
    });
    const res = await req.json();

    if (res.status !== "success")
      return { data: null, error: res.message + "." };

    return { data: res.data.cartItems as Cart[], error: null };
  } catch (e) {
    console.log(e);
    return { data: null, error: "A server error occured." };
  }
};

export const getOrders = async (userId: string) => {
  try {
    const req = await fetch(ENDPOINTS.get_orders(userId), {
      headers: {
        "Content-Type": "application/json",
        accept: "application/json",
      },
      credentials: "include",
    });
    const res = await req.json();

    if (res.status !== "success")
      return { data: null, error: res.message + "." };

    return { data: res.data, error: null };
  } catch (e) {
    console.log(e);
    return { data: null, error: "A server error occured." };
  }
};

export const getOrder = async (userId: string, orderId: string) => {
  try {
    const req = await fetch(ENDPOINTS.get_order(userId, orderId), {
      headers: {
        "Content-Type": "application/json",
        accept: "application/json",
      },
      credentials: "include",
    });
    const res = await req.json();

    if (res.status !== "success")
      return { data: null, error: res.message + "." };

    return { data: res.data, error: null };
  } catch (e) {
    console.log(e);
    return { data: null, error: "A server error occured." };
  }
};
