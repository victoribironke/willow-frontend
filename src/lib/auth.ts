import { LOCAL_STORAGE_KEY, PAGES, ws } from "@/constants/constants";
import { redirect } from "next/navigation";
import { getJwtExpiration } from "./utils";

export const logOut = () => {
  localStorage.removeItem(LOCAL_STORAGE_KEY);

  ws.close(1000, "Logged out!");

  redirect(PAGES.auth.login);
};

export const verifyAuthState = () => {
  const data = localStorage.getItem(LOCAL_STORAGE_KEY);

  if (!data) logOut();

  const { access_token } = JSON.parse(data as string);

  const date_ms = new Date().getTime();
  const expires_at = getJwtExpiration(access_token);

  if (!expires_at || date_ms >= expires_at) logOut();
};
