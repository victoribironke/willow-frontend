import { PAGES } from "@/constants/constants";
import { redirect } from "next/navigation";

export const logOut = () => {
  localStorage.removeItem("spotify_auth_data"); // this should change

  redirect(PAGES.auth.login);
};
