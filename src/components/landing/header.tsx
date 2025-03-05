import { IMAGES, PAGES } from "@/constants/constants";
import Image from "next/image";
import Link from "next/link";

const Header = () => {
  return (
    <header className="w-full flex items-center justify-between relative">
      <div className="flex items-center gap-2">
        <Link href={PAGES.home} className="flex items-center gap-2 font-medium">
          <div className="flex border p-1.5 shadow bg-white items-center justify-center rounded-md">
            <Image
              src={IMAGES.logo.src}
              width={IMAGES.logo.w}
              height={IMAGES.logo.h}
              alt="Logo"
              className="w-4 h-auto"
            />
          </div>
          <span className="hidden sm:inline-block">Willow</span>
        </Link>
      </div>

      <div className="sm:fixed sm:left-1/2 sm:transform sm:-translate-x-1/2 self-center w-fit bg-white border shadow py-2 text-sm px-6 rounded-full flex items-center justify-center gap-6">
        <Link href="" className="hover:underline">
          Home
        </Link>
        <Link href="" className="hover:underline whitespace-nowrap">
          More about Willow
        </Link>
        <Link href="" className="hover:underline whitespace-nowrap">
          Sign up
        </Link>
      </div>
    </header>
  );
};

export default Header;
