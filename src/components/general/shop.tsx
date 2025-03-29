"use client";

import { Button } from "@/components/ui/button";
import { IMAGES } from "@/constants/constants";
import Image from "next/image";
import PageLoader from "./page-loader";
import { useEffect, useState } from "react";
import { Product, WillowAuthData } from "@/interfaces/general";
import { useAtomValue } from "jotai";
import { user_details } from "@/app/atoms/atoms";
import { getProducts } from "@/lib/requests/general";
import toast from "react-hot-toast";
import {
  getCart,
  getLikedProducts,
  updateCustomerDetails,
} from "@/lib/requests/customer";
import ProductCard from "./product-card";
import { LoaderCircle } from "lucide-react";

const Shop = () => {
  const [loading, setLoading] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [subscribed, setSubscribed] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [cartItems, setCartItems] = useState<string[]>([]);
  const [likedProducts, setLikedProducts] = useState<string[]>([]);
  const userInfo = useAtomValue(user_details);

  const new_products = products.filter((p) => p.approvalStatus === "APPROVED");

  const updateInfo = async () => {
    setIsLoading(true);

    const d = { subscribed, firstname: userInfo?.customer?.firstname };

    const { error } = await updateCustomerDetails(userInfo?.id || "", d);

    setIsLoading(false);

    if (error) return toast.error(error);

    toast.success("Subscribed successfully.");
    setSubscribed(true);

    const authData = localStorage.getItem("willow_auth_data");

    if (authData) {
      const d: WillowAuthData = JSON.parse(authData);

      localStorage.setItem(
        "willow_auth_data",
        JSON.stringify({
          ...d,
          customer: { ...d.customer, subscribed: true },
        })
      );
    }
  };

  useEffect(() => {
    (async () => {
      const authData = localStorage.getItem("willow_auth_data");

      if (authData) {
        const d: WillowAuthData = JSON.parse(authData);

        setSubscribed(d.customer?.subscribed || false);
      }

      try {
        const [productsRes, cartRes, likedRes] = await Promise.all([
          getProducts(),
          getCart(userInfo?.id || ""),
          getLikedProducts(userInfo?.id || ""),
        ]);

        setLoading(false);

        if (productsRes.error) return toast.error(productsRes.error);

        setProducts(productsRes.data as Product[]);
        setCartItems(cartRes.data?.map((j) => j.productId) as string[]);
        setLikedProducts(likedRes.data?.map((j) => j.productId) as string[]);
      } catch (error) {
        setLoading(false);

        toast.error("An error occurred while fetching data.");
      }
    })();
  }, []);

  if (loading) return <PageLoader />;

  return (
    <>
      <div className="flex items-center justify-center rounded-lg relative overflow-hidden aspect-[2/0.6]">
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

      {!subscribed && (
        <section className="w-full flex items-center justify-center flex-col gap-4 my-10">
          <h3 className="font-semibold text-xl sm:text-2xl md:text-3xl w-full max-w-2xl text-center">
            Subscribe to our newsletter to get updates to our latest collections
            and features
          </h3>

          <p>Get tips and beta access to new features</p>

          <Button
            className="bg-main hover:bg-main/90 w-full max-w-xs"
            disabled={isLoading}
            onClick={updateInfo}
          >
            Subscribe {isLoading && <LoaderCircle className="animate-spin" />}
          </Button>
        </section>
      )}
    </>
  );
};

export default Shop;
