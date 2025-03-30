import { ENDPOINTS, LOCAL_STORAGE_KEY } from "@/constants/constants";
import { NewUser, WillowAuthData } from "@/interfaces/general";
import { getSellerDetails } from "./seller";
import { getCustomerDetails } from "./customer";

export const registerUser = async (data: NewUser) => {
  try {
    const req = await fetch(ENDPOINTS.register_user, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        accept: "application/json",
      },
      credentials: "include",
    });
    const res = await req.json();

    if (res.status !== "success")
      return { data: null, error: res.message + "." };

    return { data: res.message + ".", error: null };
  } catch (e) {
    console.log(e);
    return { data: null, error: "A server error occured." };
  }
};

export const verifyOtp = async (email: string, otp: string) => {
  try {
    const req = await fetch(ENDPOINTS.verify_otp, {
      method: "PATCH",
      body: JSON.stringify({
        email,
        otp,
      }),
      headers: {
        "Content-Type": "application/json",
        accept: "application/json",
      },
      credentials: "include",
    });
    const res = await req.json();

    if (res.status !== "success")
      return { data: null, error: res.message + "." };

    const authData: Partial<WillowAuthData> = {
      access_token: res.data.accessToken,
      user: res.data.user,
      seller: null,
      customer: null,
    };

    if (res.data.user.role === "SELLER") {
      const { data } = await getSellerDetails(res.data.user.id);

      authData.seller = data?.user;
    } else {
      const { data } = await getCustomerDetails(res.data.user.id);

      authData.customer = data;
    }

    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(authData));

    return { data: res.data.user, error: null };
  } catch (e) {
    console.log(e);
    return { data: null, error: "A server error occured." };
  }
};

export const loginUser = async (email: string, password: string) => {
  try {
    const req = await fetch(ENDPOINTS.login_user, {
      method: "POST",
      body: JSON.stringify({
        email,
        password,
      }),
      headers: {
        "Content-Type": "application/json",
        accept: "application/json",
      },
      credentials: "include",
    });
    const res = await req.json();

    if (res.status !== "success")
      return { data: null, error: res.message + "." };

    // console.log(res);

    const authData: Partial<WillowAuthData> = {
      access_token: res.data.accessToken,
      user: res.data.user,
      seller: null,
      customer: null,
    };

    if (res.data.user.role === "SELLER") {
      const { data } = await getSellerDetails(res.data.user.id);

      authData.seller = data?.user;
    } else {
      const { data } = await getCustomerDetails(res.data.user.id);

      authData.customer = data;
    }

    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(authData));

    return { data: res.data.user, error: null };
  } catch (e) {
    console.log(e);
    return { data: null, error: "A server error occured." };
  }
};

export const sendPasswordResetLink = async (email: string) => {
  try {
    const req = await fetch(ENDPOINTS.forgot_password, {
      method: "POST",
      body: JSON.stringify({
        email,
      }),
      headers: {
        "Content-Type": "application/json",
        accept: "application/json",
      },
    });
    const res = await req.json();

    if (res.status !== "success")
      return { data: null, error: res.message + "." };

    return { data: res.message + ".", error: null };
  } catch (e) {
    console.log(e);
    return { data: null, error: "A server error occured." };
  }
};

export const resetPassword = async (password: string, token: string) => {
  try {
    const req = await fetch(ENDPOINTS.reset_password(token), {
      method: "PATCH",
      body: JSON.stringify({
        newPassword: password,
        confirmNewPassword: password,
      }),
      headers: {
        "Content-Type": "application/json",
        accept: "application/json",
      },
    });
    const res = await req.json();

    if (res.status !== "success")
      return { data: null, error: res.message + "." };

    return { data: res.message + ".", error: null };
  } catch (e) {
    console.log(e);
    return { data: null, error: "A server error occured." };
  }
};

export const resendOtp = async (email: string) => {
  try {
    const req = await fetch(ENDPOINTS.resend_otp, {
      method: "POST",
      body: JSON.stringify({
        email,
      }),
      headers: {
        "Content-Type": "application/json",
        accept: "application/json",
      },
      credentials: "include",
    });
    const res = await req.json();

    if (res.status !== "success")
      return { data: null, error: res.message + "." };

    return { data: res.message + ".", error: null };
  } catch (e) {
    console.log(e);
    return { data: null, error: "A server error occured." };
  }
};
