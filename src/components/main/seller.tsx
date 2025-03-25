"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "../ui/button";
import { Heart, Leaf, MessageCircleMore, ShoppingBasket } from "lucide-react";
import { useEffect, useState } from "react";
import { useAtomValue } from "jotai";
import { user_details } from "@/app/atoms/atoms";
import { Seller } from "@/interfaces/general";
import { getSellerDetails } from "@/lib/requests/seller";
import toast from "react-hot-toast";
import PageLoader from "../general/page-loader";
import { formatDateTime, formatNumber } from "@/lib/utils";
import {
  addItemToCart,
  getCart,
  getLikedProducts,
} from "@/lib/requests/customer";
import Link from "next/link";
import { PAGES } from "@/constants/constants";

const SellerPage = ({ id }: { id: string }) => {
  // `https://api.dicebear.com/9.x/fun-emoji/svg?seed=${seller?.businessName}`

  const [seller, setSeller] = useState<Seller | null>(null);
  const userInfo = useAtomValue(user_details);
  const [loading, setLoading] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [cartItems, setCartItems] = useState<string[]>([]);
  const [likedProducts, setLikedProducts] = useState<string[]>([]);

  const addToCart = async (productId: string) => {
    const { error } = await addItemToCart(userInfo?.id || "", productId, 1);

    if (!error) setCartItems((k) => [...k, productId]);
  };

  useEffect(() => {
    (async () => {
      const { data, error } = await getSellerDetails(id);
      const { data: c } = await getCart(userInfo?.id || "");
      const { data: l } = await getLikedProducts(userInfo?.id || "");

      setLoading(false);

      if (error) return toast.error(error);

      setSeller(data as Seller);
      setCartItems(c?.map((j) => j.productId) as string[]);
      setLikedProducts(l?.map((j) => j.productId) as string[]);
    })();
  }, []);

  if (loading) return <PageLoader />;

  return (
    <>
      <h1 className="text-xl lg:text-2xl font-medium">Seller</h1>

      <div className="flex flex-col gap-6">
        <div className="flex gap-6 items-center justify-start">
          <Avatar className="size-16 rounded-full">
            <AvatarImage
              src="https://github.com/victoribironke.png"
              alt={"user.name"}
            />
            <AvatarFallback className="rounded-lg">CN</AvatarFallback>
          </Avatar>

          <div className="flex flex-col gap-2">
            <p className="font-medium">{seller?.businessName}</p>
            {/* <p className="text-sm text-muted-foreground">
              Joined {seller?.user.id}
            </p> */}

            <Button className="bg-main hover:bg-main/90 w-fit">
              <MessageCircleMore /> Message
            </Button>
          </div>
        </div>

        <h4 className="text-lg lg:text-xl font-medium">Bio</h4>

        <p className="w-full max-w-2xl">{seller?.bio || "No bio found."}</p>
      </div>

      <div className="flex flex-col gap-4 w-full">
        <h4 className="text-lg lg:text-xl font-medium">Catalogue</h4>

        <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
          {seller?.products.map((p, i) => (
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
                  //  onClick={() => update(p.id)}
                />
              </div>

              <div className="overflow-hidden aspect-square rounded-md">
                <img
                  src={p.images[0].url}
                  alt="Image"
                  className="w-full h-full object-cover"
                />
              </div>

              <Link
                href={PAGES.main.shop.product(p.id)}
                className="font-medium hover:underline"
              >
                {p.name}
              </Link>

              <p className="text-sm text-[#696969]">{p.category}</p>

              <p className="text-sm font-medium">₦ {formatNumber(p.price)}</p>

              <Button
                className="text-white hover:bg-main/90 h-auto bg-main w-fit absolute bottom-2 right-2"
                onClick={() => addToCart(p.id)}
                disabled={cartItems.includes(p.id)}
              >
                <ShoppingBasket size={20} />
              </Button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default SellerPage;
