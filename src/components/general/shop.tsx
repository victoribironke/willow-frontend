"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { IMAGES } from "@/constants/constants";
import { Heart, Leaf, ShoppingBasket } from "lucide-react";
import Image from "next/image";
import PageLoader from "./page-loader";
import { useEffect, useState } from "react";
import { CartItem, LikedProduct, Product } from "@/interfaces/general";
import { useAtomValue } from "jotai";
import { user_details } from "@/app/atoms/atoms";
import { getProducts } from "@/lib/requests/general";
import toast from "react-hot-toast";
import {
  addItemToCart,
  addItemToLikedProducts,
  getCart,
  getLikedProducts,
  removeItemFromLikedProducts,
} from "@/lib/requests/customer";
import { formatNumber } from "@/lib/utils";

const Shop = () => {
  const [tab, setTab] = useState("Listed");
  const [loading, setLoading] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [cartItems, setCartItems] = useState<string[]>([]);
  const [likedProducts, setLikedProducts] = useState<string[]>([]);
  const userInfo = useAtomValue(user_details);

  const addToCart = async (productId: string) => {
    const { error } = await addItemToCart(userInfo?.id || "", productId, 1);

    if (!error) setCartItems((k) => [...k, productId]);
  };

  const update = async (productId: string) => {
    if (likedProducts.includes(productId)) {
      const { error } = await removeItemFromLikedProducts(
        userInfo?.id || "",
        productId
      );

      if (!error) setLikedProducts((k) => k.filter((j) => j !== productId));

      return;
    }

    const { error } = await addItemToLikedProducts(
      userInfo?.id || "",
      productId
    );

    if (!error) setLikedProducts((k) => [...k, productId]);
  };

  useEffect(() => {
    (async () => {
      const { data, error } = await getProducts();
      const { data: c } = await getCart(userInfo?.id || "");
      const { data: l } = await getLikedProducts(userInfo?.id || "");

      setLoading(false);

      if (error) {
        return toast.error(error);
      }

      setProducts(data as Product[]);
      setCartItems(c?.map((j) => j.productId) as string[]);
      setLikedProducts(l?.map((j) => j.productId) as string[]);
    })();
  }, []);

  if (loading) return <PageLoader />;

  return (
    <>
      <div className="flex items-center justify-center rounded-xl relative overflow-hidden aspect-[2/0.6]">
        <Image
          src={IMAGES.shop_image.src}
          width={IMAGES.shop_image.w}
          height={IMAGES.shop_image.h}
          alt="Image"
          className="w-full h-full object-cover"
        />

        <p className="absolute text-white font-semibold text-3xl sm:text-4xl md:text-5xl w-full max-w-3xl text-center">
          Revitalize your lifestyle with our sustainable collections.
        </p>
      </div>

      <section className="w-full flex items-start justify-start flex-col gap-4">
        <h5 className="text-lg md:text-xl font-medium">Top Best Selling</h5>

        <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
          {products.map((p, i) => (
            <div className="bg-white p-2 rounded-lg border shadow flex flex-col gap-2 relative">
              <div className="w-full flex items-center justify-between">
                <div className="text-main border px-2 py-1 flex items-center justify-center text-xs gap-1 rounded-md font-medium w-fit whitespace-nowrap">
                  {/* <Leaf size={14} />{" "} */}
                  {p.sustainabilityFeatures[0].split("_").join(" ")}
                </div>

                <Heart
                  fill={likedProducts.includes(p.id) ? "#00a606" : "#fff"}
                  size={18}
                  className="cursor-pointer text-main"
                  onClick={() => update(p.id)}
                />
              </div>

              <div className="overflow-hidden aspect-square rounded-md">
                <img
                  src={p.images[0].url}
                  alt="Image"
                  className="w-full h-full object-cover"
                />
              </div>

              <p className="font-medium">{p.name}</p>

              <p className="text-sm text-[#696969]">{p.category}</p>

              <p className="text-sm font-medium">₦ {formatNumber(p.price)}</p>

              {!cartItems.includes(p.id) && (
                <Button
                  className="text-white hover:bg-main/90 h-auto bg-main w-fit absolute bottom-2 right-2"
                  onClick={() => addToCart(p.id)}
                >
                  <ShoppingBasket size={20} />
                </Button>
              )}
            </div>
          ))}
        </div>
      </section>

      <section className="w-full flex items-center justify-center flex-col gap-4 my-10">
        <h3 className="font-semibold text-xl sm:text-2xl md:text-3xl w-full max-w-2xl text-center">
          Subscribe to our newsletter to get updates to our latest collections
          and features
        </h3>

        <p>Get tips and beta access to new features</p>

        <Input
          placeholder="Email address"
          type="email"
          className="max-w-xs bg-white"
        />

        <Button className="w-full bg-main hover:bg-main/90 max-w-xs">
          Subscribe
        </Button>
      </section>
    </>
  );
};

export default Shop;
