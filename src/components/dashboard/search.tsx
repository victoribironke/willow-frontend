"use client";

import { Separator } from "../ui/separator";
import ProductCard from "../general/product-card";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { searchProducts } from "@/lib/requests/seller";
import { Product } from "@/interfaces/general";
import PageLoader from "../general/page-loader";
import { useAtomValue } from "jotai";
import { user_details } from "@/app/atoms/atoms";
import { useSearchParams } from "next/navigation";

const Search = () => {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState<Product[]>([]);
  const userInfo = useAtomValue(user_details);
  const searchParams = useSearchParams();
  const text = searchParams.get("text") as string;
  const filter = searchParams.get("status") as string;

  const filters: Record<string, any> = {
    Listed: "APPROVED",
    Pending: "PENDING",
    Rejected: "REJECTED",
  };

  useEffect(() => {
    (async () => {
      setLoading(true);

      const { data, error } = await searchProducts(
        userInfo?.id || "",
        encodeURIComponent(text),
        filters[filter as keyof typeof filters]
      );

      setLoading(false);

      if (error) return toast.error(error);

      setProducts(data as Product[]);
    })();
  }, [text, filter]);

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
            cartItems={[]}
            likedProducts={[]}
            product={p}
            setCartItems={() => {}}
            setLikedProducts={() => {}}
            isDashboard
            hideExtra
            key={i}
          />
        ))}
      </div>
    </>
  );
};

export default Search;
