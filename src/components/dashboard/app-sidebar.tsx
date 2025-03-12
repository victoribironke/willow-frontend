"use client";

import * as React from "react";
import { NavMain } from "@/components/dashboard/nav-main";
import { Sidebar, SidebarContent } from "@/components/ui/sidebar";

const AppSidebar = ({ ...props }: React.ComponentProps<typeof Sidebar>) => {
  return (
    <Sidebar
      className="top-[--header-height] !h-[calc(100svh-var(--header-height))]"
      {...props}
    >
      <SidebarContent>
        <NavMain />
      </SidebarContent>
    </Sidebar>
  );
};

export { AppSidebar };
