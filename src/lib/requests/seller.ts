import { ENDPOINTS } from "@/constants/constants";
import { verifyAuthState } from "../auth";

export const getSellerDetails = async (userId: string) => {
  try {
    const req = await fetch(ENDPOINTS.get_details(userId), {
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
