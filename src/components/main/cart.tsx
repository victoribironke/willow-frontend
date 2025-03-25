"use client";

import { Button } from "../ui/button";
import { Leaf, Minus, Plus, Trash2 } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { useEffect, useState } from "react";
import { CartItem } from "@/interfaces/general";
import { useAtomValue } from "jotai";
import { user_details } from "@/app/atoms/atoms";
import toast from "react-hot-toast";
import { getCart, removeItemFromCart } from "@/lib/requests/customer";
import PageLoader from "../general/page-loader";
import { formatNumber } from "@/lib/utils";
import Link from "next/link";
import { PAGES } from "@/constants/constants";

const Cart = () => {
  const [loading, setLoading] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const userInfo = useAtomValue(user_details);

  const total = cartItems.reduce((a, b) => {
    return a + b.quantity * b.product.price;
  }, 0);

  const remove = async (productId: string) => {
    const { error } = await removeItemFromCart(userInfo?.id || "", productId);

    if (!error) {
      const item = cartItems.find((c) => c.id === productId);

      setCartItems((k) => k.filter((i) => i.productId !== item?.productId));
    }
  };

  const increaseQuantity = (id: string) => {
    const item = cartItems.find((c) => c.productId === id);

    if (item) {
      const i: CartItem = { ...item, quantity: item.quantity + 1 };

      const index = cartItems.indexOf(item);

      const newCart = cartItems.slice();
      newCart[index] = i;

      setCartItems(newCart);
    }
  };

  const reduceQuantity = (id: string) => {
    const item = cartItems.find((c) => c.productId === id);

    if (item) {
      if (item.quantity === 1) return;

      const i: CartItem = { ...item, quantity: item.quantity - 1 };

      const index = cartItems.indexOf(item);

      const newCart = cartItems.slice();
      newCart[index] = i;

      setCartItems(newCart);
    }
  };

  useEffect(() => {
    (async () => {
      const { data, error } = await getCart(userInfo?.id || "");

      setLoading(false);

      if (error) {
        return toast.error(error);
      }

      setCartItems(data as CartItem[]);
    })();
  }, []);

  if (loading) return <PageLoader />;

  return (
    <>
      <h1 className="text-xl lg:text-2xl font-medium w-full text-center">
        Shopping Cart
      </h1>

      <div className="bg-white w-full mx-auto p-4 rounded-lg shadow border max-w-3xl flex flex-col gap-4">
        {cartItems.map((c, i) => (
          <div className="w-full relative flex gap-6" key={i}>
            <Avatar className="size-36 rounded-lg">
              <AvatarImage src={c.product.images[0].url} alt="Image" />
              <AvatarFallback className="rounded-lg">DP</AvatarFallback>
            </Avatar>

            <div className="w-full flex flex-col gap-4">
              <div className="w-full flex items-center justify-between">
                <div className="text-main border px-2 py-1 flex items-center justify-center text-xs gap-1 rounded-md font-medium w-fit whitespace-nowrap">
                  {/* <Leaf size={14} />{" "} */}
                  {c.product.sustainabilityFeatures[0].split("_").join(" ")}
                </div>

                {/* <div className="text-main bg-main/10 border px-2 py-1 flex items-center justify-center text-xs lg:text-sm gap-1 rounded-md font-medium w-fit">
                Delivered
                </div> */}
              </div>

              <div>
                <p className="font-medium">{c.product.name}</p>
                <p className="text-sm text-muted-foreground">
                  {c.product.category}
                </p>
              </div>

              <div className="flex items-center">
                <Button variant="outline" className="hover:bg-white gap-4">
                  <div onClick={() => reduceQuantity(c.productId)}>
                    <Minus size={18} />
                  </div>

                  <p className="font-medium">{c.quantity}</p>

                  <div onClick={() => increaseQuantity(c.productId)}>
                    <Plus size={18} />
                  </div>
                </Button>

                <Button variant="ghost" className="hover:bg-transparent">
                  ₦ {formatNumber(c.product.price * c.quantity)}
                </Button>

                <Button
                  variant="outline"
                  onClick={() => remove(c.productId)}
                  className="border-red text-red hover:bg-transparent hover:text-red"
                >
                  <Trash2 />
                </Button>
              </div>

              <Link
                href={PAGES.main.shop.seller("jf")}
                className="text-muted-foreground underline text-sm"
              >
                PureBody Ltd.
              </Link>
            </div>
          </div>
        ))}

        <p className="w-full text-center">
          Total + shipping: ₦ {formatNumber(total)}
        </p>

        <Button className="bg-main hover:bg-main/90">Checkout</Button>
      </div>
    </>
  );
};

export default Cart;
