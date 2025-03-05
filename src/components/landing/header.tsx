import { PAGES } from "@/constants/constants";
import Link from "next/link";
import Logo from "../general/logo";

const Header = () => {
  return (
    <header className="w-full flex items-center justify-between relative">
      <Logo />

      <div className="sm:fixed sm:left-1/2 sm:transform sm:-translate-x-1/2 self-center w-fit bg-white border shadow py-2 text-sm px-6 rounded-full flex items-center justify-center gap-6">
        <Link href={PAGES.home} className="hover:underline">
          Home
        </Link>
        <Link
          href={PAGES.more_about_willow}
          className="hover:underline whitespace-nowrap"
        >
          More about Willow
        </Link>
        <Link
          href={PAGES.auth.register}
          className="hover:underline whitespace-nowrap"
        >
          Sign up
        </Link>
      </div>
    </header>
  );
};

export default Header;
