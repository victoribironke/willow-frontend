"use client";

import Logo from "@/components/general/logo";
import { Input } from "@/components/ui/input";
import { HEADER_LINKS } from "@/constants/constants";
import { cn } from "@/lib/utils";
import { Search, ShoppingCart, User } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const pathname = usePathname();

  return (
    <main className="w-full min-h-screen flex items-center flex-col relative pt-20">
      <header className="w-full bg-white border-b p-4 flex items-center justify-center fixed z-50 top-0">
        <div className="w-full max-w-[1280px] bg-re flex gap-4 items-center justify-between">
          {/* header content */}
          <Logo />

          <div className="flex items-center justify-center gap-4">
            {HEADER_LINKS(pathname).map((h, i) => (
              <Link
                href={h.link}
                className={cn(
                  "hover:text-main font-medium",
                  h.isActive ? "text-black" : "text-muted-foreground"
                )}
                key={i}
              >
                {h.title}
              </Link>
            ))}
          </div>

          <div className="flex items-center justify-center gap-4">
            <div className="w-full relative flex items-center justify-center">
              <Input className="shadow-none" placeholder="Type to search..." />

              <Search
                className="absolute right-3 cursor-pointer text-muted-foreground"
                size={16}
              />
            </div>

            <ShoppingCart size={25} />
            <User size={25} />
          </div>
        </div>
      </header>

      <div className="w-full bg-gray-100 min-h-[calc(100vh-4rem)] p-4 pb-10 flex items-center flex-col">
        <div className="w-full flex flex-col gap-8 max-w-[1280px] h-auto relative">
          {children}
        </div>
      </div>

      <footer className="w-full bg-white border-b p-4 flex items-center justify-center">
        <div className="w-full max-w-[1280px] flex gap-4 items-center justify-between">
          {/* header content */}
        </div>
      </footer>
    </main>
  );
};

export default RootLayout;
