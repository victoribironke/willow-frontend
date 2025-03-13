"use client";

import { Menu } from "lucide-react";

import { SearchForm } from "@/components/dashboard/search-form";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useSidebar } from "@/components/ui/sidebar";
import Logo from "../general/logo";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

const SiteHeader = () => {
  const { toggleSidebar } = useSidebar();

  return (
    <header className="sticky top-0 z-50 w-full items-center border-b bg-background">
      <div className="flex h-[--header-height] w-full items-center gap-2 p-4">
        <Button
          className="h-8 w-8"
          variant="ghost"
          size="icon"
          onClick={toggleSidebar}
        >
          <Menu />
        </Button>

        <Separator orientation="vertical" className="mr-2 h-4" />

        <Logo />

        <SearchForm className="w-full max-w-sm ml-4 mr-auto rounded-full" />

        <Avatar className="h-8 w-8 rounded-full">
          <AvatarImage
            src="https://github.com/victoribironke.png"
            alt={"user.name"}
          />
          <AvatarFallback className="rounded-lg">CN</AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
};

export { SiteHeader };
