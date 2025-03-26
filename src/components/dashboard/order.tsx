"use client";

import { Separator } from "../ui/separator";
import { Button } from "../ui/button";
import { Mail, ShoppingBag, User } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { useAtomValue } from "jotai";
import { user_details } from "@/app/atoms/atoms";
import { useEffect, useState } from "react";
import PageLoader from "../general/page-loader";
import toast from "react-hot-toast";
import { getSellerOrder } from "@/lib/requests/seller";
import { OrderItem } from "@/interfaces/general";
import { useRouter } from "next/navigation";
import { PAGES } from "@/constants/constants";
import { formatNumber } from "@/lib/utils";

const Order = ({ orderId }: { orderId: string }) => {
  const shipping = [
    { title: "Country:", value: "Nigeria" },
    { title: "State:", value: "Ogun" },
    { title: "City:", value: "Ibadan" },
    { title: "Line 1:", value: "Babcock University, Ilishan-Remo" },
    { title: "Line 2:", value: "" },
    { title: "Zipcode:", value: "" },
  ];

  const userInfo = useAtomValue(user_details);
  const [loading, setLoading] = useState(true);
  const [order, setOrder] = useState<OrderItem | null>(null);
  const { push } = useRouter();

  useEffect(() => {
    (async () => {
      const { data, error } = await getSellerOrder(userInfo?.id || "", orderId);

      if (error) {
        toast.error(error);

        if (error === "Order not found.") push(PAGES.dashboard.orders);

        return;
      }

      setLoading(false);

      setOrder(data as OrderItem);
    })();
  }, []);

  if (loading) return <PageLoader />;

  return (
    <>
      <h1 className="text-xl lg:text-2xl font-medium">Order</h1>

      <p className="text-[#696969]">Payment after delivery</p>

      <Separator />

      <div className="w-full max-w-xl bg-white border shadow rounded-lg flex flex-col gap-4 p-4">
        <p className="lg:text-lg font-medium">Order item</p>

        <div className="text-main bg-main/10 border px-2 py-1 flex items-center justify-center text-xs lg:text-sm gap-1 rounded-md font-medium w-fit">
          {order?.customerStatus}
        </div>

        <div className="flex items-center gap-4">
          <Avatar className="size-12 rounded-lg">
            <AvatarImage src={order?.product.images[0].url} alt="Image" />
            <AvatarFallback className="rounded-lg">DP</AvatarFallback>
          </Avatar>

          <div>
            <p className="text-sm text-muted-foreground">
              {order?.product.category}
            </p>
            <p className="font-medium">{order?.product.name}</p>
          </div>
        </div>

        <div className="flex items-center">
          <Button variant="outline" className="hover:bg-white">
            {order?.quantity} x ₦ {order?.price}
          </Button>

          <Button variant="ghost" className="hover:bg-transparent">
            ₦ {formatNumber((order?.quantity || 0) * (order?.price || 0))}
          </Button>
        </div>
      </div>

      <h4 className="text-lg lg:text-xl font-medium">Customer information</h4>

      <Separator />

      <div className="flex flex-col gap-2">
        <Button
          variant="ghost"
          className="w-fit px-0 hover:bg-transparent lg:text-base lg:gap-3"
        >
          <User className="lg:scale-110" /> {order?.order.customer.firstname}
        </Button>

        <Button
          variant="ghost"
          className="w-fit px-0 hover:bg-transparent lg:text-base lg:gap-3"
        >
          <Mail className="lg:scale-110" /> {order?.order.customer.user.email}
        </Button>

        <Button
          variant="ghost"
          className="w-fit px-0 hover:bg-transparent lg:text-base lg:gap-3"
        >
          <ShoppingBag className="lg:scale-110" />{" "}
          {order?.order.orderItems.length} orders
        </Button>
      </div>

      <h4 className="text-lg lg:text-xl font-medium">Shipping address</h4>

      <Separator />

      <Table className="max-w-xs">
        <TableBody>
          {shipping.map((s, i) => (
            <TableRow key={i} className="border-none">
              <TableCell className="font-medium lg:text-base">
                {s.title}
              </TableCell>

              <TableCell className="font-medium whitespace-nowrap lg:text-base text-[#696969]">
                {s.value}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
};

export default Order;
