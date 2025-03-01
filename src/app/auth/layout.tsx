"use client";

import "../globals.css";
import { Toaster } from "react-hot-toast";
import { Suspense, useEffect } from "react";
import { GalleryVerticalEnd } from "lucide-react";
import { IMAGES, PAGES } from "@/constants/constants";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";

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
  }, []);

  return (
    <html lang="en">
      <body className="antialiased">
        <Suspense>
          <Toaster
            toastOptions={
              {
                // style: {
                //   // backgroundColor: "hsl(var(--muted) / 0.5)",
                //   color: "#fff",
                // },
              }
            }
          />

          <div className="grid min-h-svh lg:grid-cols-2">
            <div className="flex flex-col gap-4 p-6 md:p-10">
              <div className="flex justify-center gap-2 md:justify-start">
                <a href="#" className="flex items-center gap-2 font-medium">
                  <div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
                    <GalleryVerticalEnd className="size-4" />
                  </div>
                  Willow
                </a>
              </div>
              <div className="flex flex-1 items-center justify-center">
                <div className="w-full max-w-sm">{children}</div>
              </div>
            </div>

            <div className="relative hidden bg-muted lg:block">
              <Image
                src={IMAGES.auth_image.src}
                width={IMAGES.auth_image.w}
                height={IMAGES.auth_image.h}
                alt="Image"
                className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
              />
            </div>
          </div>
        </Suspense>
      </body>
    </html>
  );
};

export default RootLayout;
