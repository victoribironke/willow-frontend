import { PAGES } from "@/constants/constants";
import { redirect } from "next/navigation";

const Home = () => {
  redirect(PAGES.auth.login);
};

export default Home;
