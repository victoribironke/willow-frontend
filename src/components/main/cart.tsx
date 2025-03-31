"use client";

import { Button } from "../ui/button";
import {
  Leaf,
  LoaderCircle,
  Minus,
  PencilLine,
  Plus,
  Trash2,
} from "lucide-react";
import { useEffect, useState } from "react";
import { CartItem, WillowAuthData } from "@/interfaces/general";
import { useAtomValue } from "jotai";
import { user_details } from "@/app/atoms/atoms";
import toast from "react-hot-toast";
import {
  getCart,
  removeItemFromCart,
  sendCheckoutRequest,
  updateCustomerDetails,
} from "@/lib/requests/customer";
import PageLoader from "../general/page-loader";
import { convertTextFromUppercase, formatNumber } from "@/lib/utils";
import Link from "next/link";
import { LOCAL_STORAGE_KEY, PAGES } from "@/constants/constants";
import PaystackPop from "@paystack/inline-js";
import { Input } from "../ui/input";

const Cart = () => {
  const [loading, setLoading] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingEditing, setIsLoadingEditing] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [address, setAddress] = useState({
    city: "",
    street: "",
    zip: "",
    state: "",
  });
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const userInfo = useAtomValue(user_details);

  const total = cartItems.reduce((a, b) => {
    return a + b.quantity * b.product.price;
  }, 0);

  const updateAddress = (which: string, value: string) => {
    setAddress((k) => {
      return {
        ...k,
        [which]: value,
      };
    });
  };

  const addressObj = [
    {
      title: "Street",
      val: address.street,
      setter: (e: string) => updateAddress("street", e),
    },
    {
      title: "City",
      val: address.city,
      setter: (e: string) => updateAddress("city", e),
    },
    {
      title: "State",
      val: address.state,
      setter: (e: string) => updateAddress("state", e),
    },
    {
      title: "Zip",
      val: address.zip,
      setter: (e: string) => updateAddress("zip", e),
    },
  ];

  const remove = async (productId: string) => {
    const { error } = await removeItemFromCart(userInfo?.id || "", productId);

    if (!error) {
      const item = cartItems.find((c) => c.productId === productId);

      toast.success("Product removed from cart.");

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

  const updateInfo = async () => {
    const { city, state, street, zip } = address;

    const values = [street, city, zip, state].filter((v) => v === "");

    if (values.length !== 0) {
      return toast.error("Please fill in all the fields.");
    }

    setIsLoadingEditing(true);

    const d = {
      address: {
        street,
        city,
        zip,
        state,
      },
    };

    const { data, error } = await updateCustomerDetails(userInfo?.id || "", d);

    setIsLoadingEditing(false);

    if (error) {
      return toast.error(error);
    }

    toast.success(data);
    setIsEditing(false);
  };

  const checkout = async () => {
    if (cartItems.length === 0) return;

    const { city, street, zip } = address;

    if ([city, street, zip].filter((a) => a === "").length !== 0) {
      return toast.error("Please fill in your address details.");
    }

    setIsLoading(true);

    const d = {
      email: userInfo?.email,
      amount: total,
      address,
      serviceFee: 100,
      deliveryFee: 5000,
    };

    const { data, error } = await sendCheckoutRequest(userInfo?.id || "", d);

    setIsLoading(false);

    if (error) return toast.error(error);

    const popup = new PaystackPop() as any;
    popup.resumeTransaction(data?.accessCode, {
      onSuccess: () => {
        toast.success("Payment successful!");
      },
      onCancel: () => {
        toast.error("Transaction canceled.");
      },
    });
  };

  useEffect(() => {
    (async () => {
      const { data, error } = await getCart(userInfo?.id || "");

      setLoading(false);

      if (error) return toast.error(error);

      const willowData: WillowAuthData = JSON.parse(
        localStorage.getItem(LOCAL_STORAGE_KEY)!
      );

      if (willowData.customer?.address) {
        const { city, street, zip, state } = willowData.customer.address;

        setAddress({
          city,
          street,
          zip,
          state: state || "",
        });
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

      <div className="bg-white w-full mx-auto p-4 rounded-lg shadow border max-w-4xl flex flex-col gap-4">
        {cartItems.map((c, i) => (
          <div className="w-full relative flex gap-6" key={i}>
            <Link href={PAGES.main.shop.product(c.product.id)}>
              <div className="overflow-hidden w-36 aspect-square rounded-lg border shadow">
                <img
                  src={c.product.images[0].url}
                  alt="Image"
                  className="w-full h-full object-cover"
                />
              </div>
            </Link>

            <div className="w-full flex flex-col gap-4">
              <div className="w-full flex items-center justify-between">
                <div className="text-main border px-2 py-1 flex items-center justify-center text-xs gap-1 rounded-md font-medium w-fit whitespace-nowrap">
                  <Leaf size={14} />{" "}
                  {convertTextFromUppercase(c.product.sustainabilityTag)}
                </div>

                {/* <div className="text-main bg-main/10 border px-2 py-1 flex items-center justify-center text-xs lg:text-sm gap-1 rounded-md font-medium w-fit">
                Delivered
                </div> */}
              </div>

              <div>
                <Link
                  href={PAGES.main.shop.product(c.product.id)}
                  className="font-medium"
                >
                  {c.product.name}
                </Link>
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
            </div>
          </div>
        ))}

        <div className="mt-4 flex flex-col gap-4">
          <div className="w-full flex items-center justify-center gap-2">
            <p className="font-medium">Total: </p>
            <div className="text-main border px-2 py-1 flex items-center justify-center text-sm gap-1 rounded-md font-medium w-fit whitespace-nowrap">
              ₦ {formatNumber(total)}
            </div>
          </div>
        </div>
      </div>

      <div className="w-full max-w-4xl relative mx-auto bg-white border shadow rounded-lg flex flex-col gap-6 p-4">
        <div className="flex justify-between items-center w-full">
          <p className="lg:text-lg">Shipping address</p>

          {!isEditing && (
            <Button
              variant="outline"
              className="rounded-full"
              onClick={() => setIsEditing(true)}
            >
              Edit <PencilLine />
            </Button>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 w-full gap-4">
          {addressObj.map((n, i) => (
            <div className="grid gap-1" key={i}>
              <p className="text-muted-foreground">{n.title}</p>

              {!isEditing ? (
                <p>{n.val}</p>
              ) : (
                <Input
                  value={n.val}
                  onChange={(e) => n.setter(e.target.value)}
                />
              )}
            </div>
          ))}
        </div>

        {isEditing && (
          <div className="flex gap-4 items-center w-full">
            <Button
              variant="outline"
              className="border-red text-red hover:text-red"
              onClick={() => setIsEditing(false)}
            >
              Cancel
            </Button>

            <Button
              className="bg-main hover:bg-main/90"
              disabled={isLoadingEditing}
              onClick={updateInfo}
            >
              Save changes{" "}
              {isLoadingEditing && <LoaderCircle className="animate-spin" />}
            </Button>
          </div>
        )}
      </div>

      <Button
        className="bg-main hover:bg-main/90 w-full max-w-4xl mx-auto"
        disabled={isLoading}
        onClick={checkout}
      >
        Checkout {isLoading && <LoaderCircle className="animate-spin" />}
      </Button>
    </>
  );
};

export default Cart;
