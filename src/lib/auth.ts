import { PAGES } from "@/constants/constants";
import { redirect } from "next/navigation";

export const logOut = () => {
  localStorage.removeItem("willow_auth_data");

  redirect(PAGES.auth.login);
};
