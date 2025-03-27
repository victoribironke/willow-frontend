"use client";

import { useEffect, useState } from "react";
import { Separator } from "../ui/separator";
import { LikedProduct } from "@/interfaces/general";
import { useAtomValue } from "jotai";
import { user_details } from "@/app/atoms/atoms";
import {
  addItemToCart,
  getCart,
  getLikedProducts,
  removeItemFromLikedProducts,
} from "@/lib/requests/customer";
import toast from "react-hot-toast";
import PageLoader from "../general/page-loader";
import { Button } from "../ui/button";
import { Heart, ShoppingBasket } from "lucide-react";
import { formatNumber } from "@/lib/utils";
import Link from "next/link";
import { PAGES } from "@/constants/constants";
import ProductCard from "../general/product-card";

const Wishlist = () => {
  const [loading, setLoading] = useState(true);
  const [cartItems, setCartItems] = useState<string[]>([]);
  const [likedProducts, setLikedProducts] = useState<LikedProduct[]>([]);
  const [lP, setLP] = useState<string[]>([]);
  const userInfo = useAtomValue(user_details);

  const addToCart = async (productId: string) => {
    const { error } = await addItemToCart(userInfo?.id || "", productId, 1);

    if (!error) setCartItems((k) => [...k, productId]);
  };

  const update = async (productId: string) => {
    const { error } = await removeItemFromLikedProducts(
      userInfo?.id || "",
      productId
    );

    if (!error)
      setLikedProducts((k) => k.filter((j) => j.productId !== productId));
  };

  useEffect(() => {
    (async () => {
      const { data: l, error } = await getLikedProducts(userInfo?.id || "");
      const { data: c } = await getCart(userInfo?.id || "");

      setLoading(false);

      if (error) return toast.error(error);

      setCartItems(c?.map((j) => j.productId) as string[]);
      setLikedProducts(l as LikedProduct[]);
      setLP(l?.map((j) => j.productId) as string[]);
    })();
  }, []);

  if (loading) return <PageLoader />;

  return (
    <>
      <h5 className="text-lg md:text-xl font-medium">
        Wishlist ({likedProducts.length})
      </h5>

      <Separator />

      <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
        {likedProducts.map((p, i) => (
          <ProductCard
            cartItems={cartItems}
            likedProducts={lP}
            product={p.product}
            setCartItems={setCartItems}
            setLikedProducts={setLP}
            key={i}
          />
        ))}
      </div>
    </>
  );
};

export default Wishlist;
