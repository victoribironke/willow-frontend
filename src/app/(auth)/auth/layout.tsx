"use client";

import { Suspense, useEffect } from "react";
import { LOCAL_STORAGE_KEY, PAGES } from "@/constants/constants";
import { usePathname, useRouter } from "next/navigation";
import Logo from "@/components/general/logo";
import VerticalImageCarousel from "@/components/auth/vertical-image-carousel";
import { user_details } from "@/app/atoms/atoms";
import { useSetAtom } from "jotai";

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const { push } = useRouter();
  const pathname = usePathname();
  const setUserDetails = useSetAtom(user_details);

  useEffect(() => {
    // localStorage.removeItem("willow_auth_data");

    const data = localStorage.getItem(LOCAL_STORAGE_KEY);

    if (data && pathname === PAGES.auth.login) {
      const d = JSON.parse(data);

      setUserDetails(d.user);

      push(
        d.user.role === "SELLER" ? PAGES.dashboard.home : PAGES.main.shop.home
      );
    }
  }, [pathname]);

  return (
    <Suspense>
      <div className="w-full grid min-h-svh lg:grid-cols-2">
        <div className="flex flex-col gap-4 p-6 md:p-10">
          <Logo />

          <div className="flex flex-1 items-center justify-center">
            <div className="w-full max-w-sm">{children}</div>
          </div>
        </div>

        {/* <div className="relative hidden bg-muted lg:block">
            <Image
              src={IMAGES.auth_image.src}
              width={IMAGES.auth_image.w}
              height={IMAGES.auth_image.h}
              alt="Image"
              className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
            />
          </div> */}

        <VerticalImageCarousel />
      </div>
    </Suspense>
  );
};

export default RootLayout;
