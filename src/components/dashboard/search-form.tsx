import { Search } from "lucide-react";
import { Label } from "@/components/ui/label";
import { SidebarInput } from "@/components/ui/sidebar";

const SearchForm = ({ ...props }: React.ComponentProps<"form">) => {
  return (
    <form {...props}>
      <div className="relative">
        <Label htmlFor="search" className="sr-only">
          Search
        </Label>
        <SidebarInput
          id="search"
          placeholder="Search products"
          className="h-8 pl-4 rounded-full"
        />

        <button className="bg-main rounded-full absolute right-1 top-1/2 p-1 -translate-y-1/2">
          <Search className="pointer-events-none size-4 select-none text-white" />
        </button>
      </div>
    </form>
  );
};

export { SearchForm };
