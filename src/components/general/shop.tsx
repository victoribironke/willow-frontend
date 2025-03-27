"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { IMAGES } from "@/constants/constants";
import Image from "next/image";
import PageLoader from "./page-loader";
import { useEffect, useState } from "react";
import { Product } from "@/interfaces/general";
import { useAtomValue } from "jotai";
import { user_details } from "@/app/atoms/atoms";
import { getProducts } from "@/lib/requests/general";
import toast from "react-hot-toast";
import { getCart, getLikedProducts } from "@/lib/requests/customer";
import ProductCard from "./product-card";

const Shop = () => {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState<Product[]>([]);
  const [cartItems, setCartItems] = useState<string[]>([]);
  const [likedProducts, setLikedProducts] = useState<string[]>([]);
  const userInfo = useAtomValue(user_details);

  const new_products = products.filter((p) => p.approvalStatus === "APPROVED");

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
          {new_products.map((p, i) => (
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
