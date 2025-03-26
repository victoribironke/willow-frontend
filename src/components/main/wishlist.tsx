"use client";

import { useEffect, useState } from "react";
import { Separator } from "../ui/separator";
import { LikedProduct, Product } from "@/interfaces/general";
import { useAtomValue } from "jotai";
import { user_details } from "@/app/atoms/atoms";
import {
  addItemToCart,
  addItemToLikedProducts,
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

const Wishlist = () => {
  const [loading, setLoading] = useState(true);
  const [cartItems, setCartItems] = useState<string[]>([]);
  const [likedProducts, setLikedProducts] = useState<LikedProduct[]>([]);
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
          <div className="bg-white p-2 rounded-lg border shadow flex flex-col gap-2 relative">
            <div className="w-full flex items-center justify-between">
              <div className="text-main border px-2 py-1 flex items-center justify-center text-xs gap-1 rounded-md font-medium w-fit whitespace-nowrap">
                {/* <Leaf size={14} />{" "} */}
                {p.product.sustainabilityFeatures[0].split("_").join(" ")}
              </div>

              <Heart
                fill="#00a606"
                size={18}
                className="cursor-pointer text-main"
                onClick={() => update(p.productId)}
              />
            </div>

            <div className="overflow-hidden aspect-square rounded-md">
              <img
                src={p.product.images[0].url}
                alt="Image"
                className="w-full h-full object-cover"
              />
            </div>

            <Link
              href={PAGES.main.shop.product(p.productId)}
              className="font-medium hover:underline"
            >
              {p.product.name.slice(0, 25).trim()}
              {p.product.name.length >= 25 && "..."}
            </Link>

            <p className="text-sm text-[#696969]">{p.product.category}</p>

            <p className="text-sm font-medium">
              ₦ {formatNumber(p.product.price)}
            </p>

            <Button
              className="text-white hover:bg-main/90 h-auto bg-main w-fit absolute bottom-2 right-2"
              onClick={() => addToCart(p.productId)}
              disabled={cartItems.includes(p.productId)}
            >
              <ShoppingBasket size={20} />
            </Button>
          </div>
        ))}
      </div>
    </>
  );
};

export default Wishlist;
