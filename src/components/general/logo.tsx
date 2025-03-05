import { IMAGES, PAGES } from "@/constants/constants";
import Image from "next/image";
import Link from "next/link";

const Logo = () => {
  return (
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
  );
};

export default Logo;
