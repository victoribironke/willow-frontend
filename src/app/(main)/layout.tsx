"use client";

import Logo from "@/components/general/logo";
import PageLoader from "@/components/general/page-loader";
import { Input } from "@/components/ui/input";
import { HEADER_LINKS, LOCAL_STORAGE_KEY, PAGES } from "@/constants/constants";
import { cn, getJwtExpiration } from "@/lib/utils";
import { useSetAtom } from "jotai";
import { Search, ShoppingCart, User } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { user_details } from "../atoms/atoms";
import { Toaster } from "react-hot-toast";
import AIChat from "@/components/main/ai-chat";

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const pathname = usePathname();
  const { push } = useRouter();
  const [loading, setLoading] = useState(true);
  const setUserDetails = useSetAtom(user_details);

  useEffect(() => {
    // localStorage.removeItem("willow_auth_data");

    if (pathname === PAGES.main.more_about_willow) {
      setLoading(false);
      return;
    }

    const data = localStorage.getItem(LOCAL_STORAGE_KEY);

    if (!data) {
      push(PAGES.auth.login);
      return;
    }

    if (JSON.parse(data).user.role === "SELLER") {
      push(PAGES.dashboard.home);
      return;
    }

    const { access_token, user } = JSON.parse(data);

    const date_ms = new Date().getTime();
    const expires_at = getJwtExpiration(access_token);

    if (!expires_at || date_ms >= expires_at) {
      localStorage.removeItem(LOCAL_STORAGE_KEY);
      push(PAGES.auth.login);
      return;
    }

    setUserDetails(user);
    setLoading(false);
  }, [push]);

  if (loading) return <PageLoader fullScreen />;

  return (
    <main className="w-full min-h-screen flex items-center flex-col relative pt-20">
      <Toaster />

      <header className="w-full bg-white border-b p-4 flex items-center justify-center fixed z-50 top-0">
        <div className="w-full max-w-screen-xl bg-re flex gap-4 items-center justify-between">
          {/* header content */}
          <Logo />

          <div className="flex items-center justify-center gap-6">
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
              <Input
                className="shadow-none"
                placeholder="Type to search..."
                onKeyUp={(e) => {
                  if (e.currentTarget.value && e.key === "Enter") {
                    push(PAGES.main.shop.search(e.currentTarget.value));
                  }
                }}
              />

              <Search
                className="absolute right-3 cursor-pointer text-muted-foreground"
                size={16}
                onClick={(e) => {
                  const input = e.currentTarget
                    .previousElementSibling as HTMLInputElement;

                  if (input.value) {
                    push(PAGES.main.shop.search(input.value));
                  }
                }}
              />
            </div>

            <Link href={PAGES.main.shop.cart}>
              <ShoppingCart
                size={20}
                className={pathname === PAGES.main.shop.cart ? "text-main" : ""}
              />
            </Link>

            <Link href={PAGES.main.shop.profile}>
              <User
                size={20}
                className={
                  pathname === PAGES.main.shop.profile ? "text-main" : ""
                }
              />
            </Link>
          </div>
        </div>
      </header>

      <div className="w-full bg-gray-100 min-h-[calc(100vh-4rem)] p-4 pb-10 flex items-center relative flex-col">
        <div className="w-full flex flex-col gap-8 max-w-[1280px] h-auto relative">
          {children}
        </div>

        {pathname !== PAGES.main.more_about_willow && <AIChat />}
      </div>

      <footer className="w-full bg-main/20">
        <div className="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
          <div className="md:flex md:justify-between">
            <div className="mb-6 md:mb- flex items-start flex-col">
              <Logo />

              <p className="text-gray-500 mt-2 max-w-xs">
                Provides centralized access for brands or products following
                sustainable practices.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3">
              <div>
                <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase">
                  SHOP
                </h2>
                <ul className="text-gray-500 font-medium">
                  <li className="mb-4">
                    <Link href="" className="hover:underline">
                      Featured
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase">
                  COMPANY
                </h2>
                <ul className="text-gray-500 dark:text-gray-400 font-medium">
                  <li className="mb-4">
                    <Link
                      href={PAGES.main.more_about_willow}
                      className="hover:underline"
                    >
                      More about Willow
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase">
                  SUPPORT
                </h2>
                <ul className="text-gray-500 font-medium">
                  <li className="mb-4">
                    <Link href="#" className="hover:underline">
                      Terms of use
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <hr className="my-6 border-gray-400 sm:mx-auto lg:my-8" />

          <div className="sm:flex sm:items-center sm:justify-center">
            <span className="text-sm text-gray-500 sm:text-center">
              Copyright © {new Date().getFullYear()}{" "}
              <Link href={PAGES.main.home} className="hover:underline">
                Willow™
              </Link>
              . All Rights Reserved.
            </span>
          </div>
        </div>
      </footer>
    </main>
  );
};

export default RootLayout;
