"use client";

import { PAGES } from "@/constants/constants";
import Link from "next/link";
import Logo from "../general/logo";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

const Header = () => {
  const pathname = usePathname();

  return (
    <header className="w-full flex items-center justify-between relative">
      <Logo />

      <div className="sm:fixed sm:left-1/2 sm:transform sm:-translate-x-1/2 self-center w-fit bg-white border shadow py-2 text-sm px-6 rounded-full flex items-center justify-center gap-6">
        <Link
          href={PAGES.home}
          className={cn(
            "hover:text-main font-medium",
            pathname === PAGES.home ? "text-black" : "text-muted-foreground"
          )}
        >
          Home
        </Link>
        <Link
          href={PAGES.more_about_willow}
          className={cn(
            "hover:text-main whitespace-nowrap font-medium",
            pathname === PAGES.more_about_willow
              ? "text-black"
              : "text-muted-foreground"
          )}
        >
          More about Willow
        </Link>
        <Link
          href={PAGES.auth.register}
          className={cn(
            "hover:text-main whitespace-nowrap font-medium",
            pathname === PAGES.auth.register
              ? "text-black"
              : "text-muted-foreground"
          )}
        >
          Sign up
        </Link>
      </div>
    </header>
  );
};

export default Header;
