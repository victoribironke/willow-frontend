import { PAGES } from "@/constants/constants";
import { log } from "console";
import { redirect } from "next/navigation";
import { getJwtExpiration } from "./utils";

export const logOut = () => {
  localStorage.removeItem("willow_auth_data");

  redirect(PAGES.auth.login);
};

export const verifyAuthState = () => {
  const data = localStorage.getItem("willow_auth_data");

  if (!data) logOut();

  const { access_token } = JSON.parse(data as string);

  const date_ms = new Date().getTime();
  const expires_at = getJwtExpiration(access_token);

  if (!expires_at || date_ms >= expires_at) logOut();
};
