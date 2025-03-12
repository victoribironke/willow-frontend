"use client";

import {
  ChartNoAxesColumn,
  MessageCircleMore,
  MonitorUp,
  Package,
  Settings,
  ShoppingBag,
  Table2,
} from "lucide-react";
import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { PAGES } from "@/constants/constants";
import { usePathname } from "next/navigation";

const NavMain = () => {
  const pathname = usePathname();

  const sidebarItems = [
    {
      title: "Dashboard",
      icon: Table2,
      isActive: pathname === PAGES.dashboard.home,
      link: PAGES.dashboard.home,
    },
    {
      title: "Chat",
      icon: MessageCircleMore,
      isActive: pathname === PAGES.dashboard.chat,
      link: PAGES.dashboard.chat,
    },
    {
      title: "Analytics",
      icon: ChartNoAxesColumn,
      isActive: pathname === PAGES.dashboard.analytics,
      link: PAGES.dashboard.analytics,
    },
    {
      title: "List product",
      icon: MonitorUp,
      isActive: pathname === PAGES.dashboard.list_product,
      link: PAGES.dashboard.list_product,
    },
    {
      title: "Products",
      icon: Package,
      isActive: pathname === PAGES.dashboard.products,
      link: PAGES.dashboard.products,
    },
    {
      title: "Orders",
      icon: ShoppingBag,
      isActive: pathname === PAGES.dashboard.orders,
      link: PAGES.dashboard.orders,
    },
    {
      title: "Settings",
      icon: Settings,
      isActive: pathname === PAGES.dashboard.settings,
      link: PAGES.dashboard.settings,
    },
  ];

  return (
    <SidebarGroup className="group-data-[collapsible=icon]:hidden">
      {/* <SidebarGroupLabel>Projects</SidebarGroupLabel> */}
      <SidebarMenu>
        {sidebarItems.map((s, i) => (
          <SidebarMenuItem key={i}>
            <Link href={s.link}>
              <SidebarMenuButton
                className={cn(s.isActive ? "bg-main/10 hover:bg-main/10" : "")}
              >
                <s.icon />
                <span className="font-medium">{s.title}</span>
              </SidebarMenuButton>
            </Link>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
};

export { NavMain };
