"use client";

import { Separator } from "../ui/separator";
import ProductCard from "../general/product-card";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  getCart,
  getLikedProducts,
  searchProducts,
} from "@/lib/requests/customer";
import { Product } from "@/interfaces/general";
import PageLoader from "../general/page-loader";
import { useAtomValue } from "jotai";
import { user_details } from "@/app/atoms/atoms";
import { useSearchParams } from "next/navigation";

const Search = () => {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState<Product[]>([]);
  const [cartItems, setCartItems] = useState<string[]>([]);
  const [likedProducts, setLikedProducts] = useState<string[]>([]);
  const userInfo = useAtomValue(user_details);

  const searchParams = useSearchParams();
  const text = searchParams.get("text") as string;

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);

        const [searchRes, cartRes, likedRes] = await Promise.all([
          searchProducts(text),
          getCart(userInfo?.id || ""),
          getLikedProducts(userInfo?.id || ""),
        ]);

        setLoading(false);

        if (searchRes.error) return toast.error(searchRes.error);

        setProducts(searchRes.data as Product[]);
        setCartItems(cartRes.data?.map((j) => j.productId) as string[]);
        setLikedProducts(likedRes.data?.map((j) => j.productId) as string[]);
      } catch (error) {
        setLoading(false);

        toast.error("An error occurred while fetching data.");
      }
    })();
  }, [text]);

  if (loading) return <PageLoader />;

  return (
    <>
      <h1 className="text-xl lg:text-2xl font-medium">
        Found <span className="text-main">{products.length}</span> similar
        products for &quot;
        <span className="text-main">{text}</span>&quot;
      </h1>

      <Separator />

      <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
        {products.map((p, i) => (
          <ProductCard
            cartItems={cartItems}
            likedProducts={likedProducts}
            product={p}
            setCartItems={setCartItems}
            setLikedProducts={setLikedProducts}
            key={i}
          />
        ))}
      </div>
    </>
  );
};

export default Search;
