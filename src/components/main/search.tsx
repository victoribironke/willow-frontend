"use client";

import { Button } from "../ui/button";
import { Heart, Leaf, ShoppingBasket } from "lucide-react";
import { Separator } from "../ui/separator";
import { usePathname } from "next/navigation";
import ProductCard from "../general/product-card";

const Search = () => {
  const pathname = usePathname();

  return (
    <>
      <h1 className="text-xl lg:text-2xl font-medium">
        Found <span className="text-main">37</span> similar products for &quot;
        <span className="text-main">{pathname.split("/").at(-1)}</span>&quot;
      </h1>

      <Separator />

      <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
        {/* {<ProductCard />} */}
      </div>
    </>
  );
};

export default Search;
