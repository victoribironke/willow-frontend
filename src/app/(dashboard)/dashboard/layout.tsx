"use client";

import PageLoader from "@/components/general/page-loader";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import Link from "next/link";
import { PAGES, SIDEBAR_ITEMS } from "@/constants/constants";
import { Button } from "@/components/ui/button";
import { cn, getJwtExpiration } from "@/lib/utils";
import { usePathname, useSearchParams } from "next/navigation";
import Logo from "@/components/general/logo";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import { useRouter } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { logOut } from "@/lib/auth";
import { Menu, Search } from "lucide-react";
import { useSetAtom } from "jotai";
import { user_details } from "@/app/atoms/atoms";
import { Toaster } from "react-hot-toast";
import { Input } from "@/components/ui/input";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchInterval: 10000,
    },
  },
});

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const [loading, setLoading] = useState(true);
  const [avatar, setAvatar] = useState("");
  const { push } = useRouter();
  const pathname = usePathname();
  const setUserDetails = useSetAtom(user_details);
  const [search, setSearch] = useState("");

  const searchParams = useSearchParams();
  const f = searchParams.get("status") as string;

  const [filter, setFilter] = useState(f);

  useEffect(() => {
    // localStorage.removeItem("willow_auth_data");

    const data = localStorage.getItem("willow_auth_data");

    if (!data) {
      push(PAGES.auth.login);
      return;
    }

    if (JSON.parse(data).user.role !== "SELLER") {
      push(PAGES.main.shop.profile);
      return;
    }

    const { access_token, user } = JSON.parse(data);

    const date_ms = new Date().getTime();
    const expires_at = getJwtExpiration(access_token);

    if (!expires_at || date_ms >= expires_at) {
      localStorage.removeItem("willow_auth_data");
      push(PAGES.auth.login);
      return;
    }

    setUserDetails(user);
    setAvatar(
      user.seller.avatar?.url ||
        `https://api.dicebear.com/9.x/fun-emoji/svg?seed=${user.seller.businessName}`
    );
    setLoading(false);
  }, [push]);

  if (loading) return <PageLoader fullScreen />;

  return (
    <QueryClientProvider client={queryClient}>
      <Toaster />

      <div className="w-full [--header-height:calc(theme(spacing.14))] bg-[#f5f5f5]">
        <section className="w-full min-h-screen flex items-center flex-col relative pt-[4.5rem]">
          <div className="w-full bg-white border-b p-4 flex items-center justify-center fixed z-50 top-0">
            <div className="w-full max-w-[1280px] flex gap-4 items-center justify-between">
              <DropdownMenu>
                <DropdownMenuTrigger className="md:hidden">
                  <Menu />
                </DropdownMenuTrigger>
                <DropdownMenuContent className="mx-4 md:hidden">
                  {SIDEBAR_ITEMS(pathname).map((s, i) => (
                    <DropdownMenuItem key={i}>
                      <Link href={s.link} key={i} className="w-full">
                        <Button
                          className={cn(
                            "w-full justify-start hover:bg-gray-200 gap-2 px-3",
                            s.isActive ? "bg-main/10 hover:bg-main/10" : ""
                          )}
                          variant="ghost"
                        >
                          <s.icon />
                          {s.title}
                        </Button>
                      </Link>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>

              <Logo />

              <div className="w-full max-w-lg border gap-1 rounded-full relative flex items-center justify-center pr-1.5">
                <Input
                  className="w-full shadow-none border-none focus-visible:ring-0 focus-visible:border-none px-4"
                  placeholder="Search products"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  onKeyUp={(e) => {
                    if (e.currentTarget.value && e.key === "Enter") {
                      push(
                        PAGES.dashboard.search(e.currentTarget.value, filter)
                      );
                    }
                  }}
                />

                <Select value={filter} onValueChange={setFilter}>
                  <SelectTrigger
                    className="w-fit bg-white border-none shadow-none focus-visible:ring-0 focus-visible:border-none"
                    id="filters"
                  >
                    {/* <SelectValue placeholder="Select a source" /> */}
                  </SelectTrigger>
                  <SelectContent id="filters" className="bg-white">
                    <SelectGroup>
                      {["Listed", "Pending", "Rejected"].map((s, i) => (
                        <SelectItem value={s} key={i}>
                          {s}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>

                <div
                  className="bg-main rounded-full p-1.5 text-white cursor-pointer"
                  onClick={() => {
                    if (search) {
                      push(PAGES.dashboard.search(search, filter));
                    }
                  }}
                >
                  <Search size={15} />
                </div>
              </div>

              <DropdownMenu>
                <DropdownMenuTrigger>
                  <Avatar className="size-9 rounded-full">
                    <AvatarImage src={avatar} alt="Profile pic" />
                    <AvatarFallback className="rounded-lg">CN</AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="mx-4">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={logOut} className="cursor-pointer">
                    Log out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          <div className="w-full bg-gray-100 min-h-[calc(100vh-4rem)] p-4 pb-10 flex items-center flex-col">
            <div className="w-full flex gap-8 max-w-[1280px] h-auto relative">
              <div className="w-80 md:w-2/12 hidden md:flex flex-col gap-2 sticky top-20 h-full">
                {SIDEBAR_ITEMS(pathname).map((s, i) => (
                  <Link href={s.link} key={i}>
                    <Button
                      className={cn(
                        "w-full justify-start hover:bg-gray-200 gap-4 text-base",
                        s.isActive ? "bg-main/10 hover:bg-main/10" : ""
                      )}
                      variant="ghost"
                    >
                      <s.icon />
                      {s.title}
                    </Button>
                  </Link>
                ))}
              </div>

              <div className="w-full md:w-10/12 flex flex-col gap-6">
                {children}
              </div>
            </div>
          </div>
        </section>
      </div>
    </QueryClientProvider>
  );
};

export default RootLayout;
