"use client";

import { Toaster } from "react-hot-toast";
import { Suspense, useEffect } from "react";
import { PAGES } from "@/constants/constants";
import { usePathname, useRouter } from "next/navigation";
import Logo from "@/components/general/logo";
import { RecoilRoot } from "recoil";
import VerticalImageCarousel from "@/components/auth/vertical-image-carousel";

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const data = localStorage.getItem("willow_auth_data");

    if (data && pathname === PAGES.auth.login)
      router.push(PAGES.dashboard.home);
  }, [router, pathname]);

  return (
    <RecoilRoot>
      <Suspense>
        <Toaster />

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
    </RecoilRoot>
  );
};

export default RootLayout;
