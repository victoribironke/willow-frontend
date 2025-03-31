import { ENDPOINTS } from "@/constants/constants";
import {
  ApprovalStatus,
  Conversation,
  OrderItem,
  Product,
  Seller,
} from "@/interfaces/general";

export const getSellerDetails = async (userId: string, customerId?: string) => {
  try {
    const req = await fetch(ENDPOINTS.get_seller_details(userId, customerId), {
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
      data: res.data as { user: Seller; conversationId: string },
      error: null,
    };
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
      body: d, // Send FormData directly
      headers: {
        // Do not set Content-Type; let the browser handle it
        accept: "application/json", // Accept JSON response
      },
      credentials: "include", // Include credentials for CORS
    });

    const res = await req.json();

    // Check if the response indicates success
    if (res.status !== "success") {
      return { data: null, error: res.message + "." };
    }

    // Return success message
    return { data: "Successfully updated profile.", error: null };
  } catch (e) {
    console.log(e);
    return { data: null, error: "A server error occurred." };
  }
};

export const createProduct = async (userId: string, d: FormData) => {
  try {
    const req = await fetch(ENDPOINTS.create_product(userId), {
      method: "POST",
      body: d, // Send FormData directly
      // Remove the Content-Type header
      headers: {
        accept: "application/json", // Keep only the accept header
      },
      credentials: "include",
    });

    const res = await req.json();

    if (res.status !== "success")
      return { data: null, error: res.message + "." };

    return { data: res, error: null };
  } catch (e) {
    console.log(e);
    return { data: null, error: "A server error occurred." };
  }
};

export const deleteProduct = async (userId: string, productId: string) => {
  try {
    const req = await fetch(ENDPOINTS.delete_product(userId, productId), {
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

    return { data: "Product deleted successfully.", error: null };
  } catch (e) {
    console.log(e);
    return { data: null, error: "A server error occured." };
  }
};

export const searchProducts = async (
  userId: string,
  text: string,
  filter: ApprovalStatus
) => {
  try {
    const req = await fetch(
      ENDPOINTS.search_seller_products(userId, text, filter),
      {
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

    return { data: res.data as Product[], error: null };
  } catch (e) {
    console.log(e);
    return { data: null, error: "A server error occured." };
  }
};

export const getConversations = async (userId: string) => {
  try {
    const req = await fetch(ENDPOINTS.get_seller_conversations(userId), {
      headers: {
        "Content-Type": "application/json",
        accept: "application/json",
      },
      credentials: "include",
    });
    const res = await req.json();

    if (res.status !== "success")
      return { data: null, error: res.message + "." };

    return { data: res.data as Conversation[], error: null };
  } catch (e) {
    console.log(e);
    return { data: null, error: "A server error occured." };
  }
};

export const getConversation = async (
  userId: string,
  conversationId: string
) => {
  try {
    const req = await fetch(
      ENDPOINTS.get_seller_conversation(userId, conversationId),
      {
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

    return { data: res.data as Conversation, error: null };
  } catch (e) {
    console.log(e);
    return { data: null, error: "A server error occured." };
  }
};

export const updateOrderStatus = async (
  userId: string,
  orderId: string,
  d: any
) => {
  try {
    const req = await fetch(ENDPOINTS.update_order_status(userId, orderId), {
      method: "PATCH",
      body: JSON.stringify(d),
      headers: {
        "Content-Type": "application/json",
        accept: "application/json",
      },
      credentials: "include",
    });
    const res = await req.json();

    if (res.status !== "success")
      return { data: null, error: res.message + "." };

    return { data: "Order status updated successfully.", error: null };
  } catch (e) {
    console.log(e);
    return { data: null, error: "A server error occured." };
  }
};
