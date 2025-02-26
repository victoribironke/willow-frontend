"use client";

import * as React from "react";
import {
  BadgeCheck,
  Command,
  House,
  LifeBuoy,
  LogOut,
  Send,
} from "lucide-react";
import { MainNav } from "@/components/main-nav";
import { BottomNav } from "@/components/botton-nav";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { PAGES } from "@/constants/constants";
import { logOut } from "@/lib/auth";

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  mainNav: [
    {
      title: "Dashboard",
      url: PAGES.dashboard.home,
      icon: House,
    },
    // {
    //   title: "Top",
    //   url: "",
    //   icon: TrendingUp,
    //   items: [
    //     {
    //       title: "Tracks",
    //       url: PAGES.top_tracks,
    //       icon: Music2,
    //     },
    //     {
    //       title: "Artists",
    //       url: PAGES.top_artists,
    //       icon: User,
    //     },
    //   ],
    // },
    // {
    //   title: "Stats",
    //   url: PAGES.stats,
    //   icon: ChartNoAxesColumn,
    // },
  ],
  bottomNav: [
    {
      title: "Support",
      url: "#",
      icon: LifeBuoy,
    },
    {
      title: "Feedback",
      url: "#",
      icon: Send,
    },
    {
      title: "Account",
      url: "#",
      icon: BadgeCheck,
    },
    {
      title: "Log out",
      url: "#",
      icon: LogOut,
      is_button: true,
      action: logOut,
    },
  ],
};

const AppSidebar = ({ ...props }: React.ComponentProps<typeof Sidebar>) => {
  return (
    <Sidebar
      className="top-[--header-height] !h-[calc(100svh-var(--header-height))]"
      {...props}
    >
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href={PAGES.dashboard.home}>
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                  <Command className="size-4" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">Valse</span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <MainNav items={data.mainNav} />
        <BottomNav items={data.bottomNav} className="mt-auto" />
      </SidebarContent>
      {/* <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter> */}
    </Sidebar>
  );
};

export { AppSidebar };
