"use client";

import { Separator } from "../ui/separator";
import { Button } from "../ui/button";
import { Leaf } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import Link from "next/link";
import { PAGES } from "@/constants/constants";
import { useAtomValue } from "jotai";
import { user_details } from "@/app/atoms/atoms";
import { useEffect, useState } from "react";
import { Order } from "@/interfaces/general";
import { useRouter } from "next/navigation";
import { getOrder } from "@/lib/requests/customer";
import toast from "react-hot-toast";
import PageLoader from "../general/page-loader";
import { cn, convertTextFromUppercase, formatNumber } from "@/lib/utils";

const OrderPage = ({ orderId }: { orderId: string }) => {
  const userInfo = useAtomValue(user_details);
  const [loading, setLoading] = useState(true);
  const [order, setOrder] = useState<Order | null>(null);
  const { push } = useRouter();

  const summary = [
    { title: "Number of items:", value: order?.orderItems.length },
    {
      title: "Total + shipping:",
      value: `₦ ${formatNumber(order?.totalAmount || 0)}`,
    },
  ];

  useEffect(() => {
    (async () => {
      const { data, error } = await getOrder(userInfo?.id || "", orderId);

      if (error) {
        toast.error(error);

        if (error === "Order not found.") push(PAGES.dashboard.orders);

        return;
      }

      setLoading(false);

      setOrder(data as Order);
    })();
  }, []);

  if (loading) return <PageLoader />;

  return (
    <>
      <h1 className="text-xl lg:text-2xl font-medium">Order</h1>

      <div className="flex flex-col gap-4">
        <p>
          Ordrer <span className="font-medium">{order?.id}</span>
        </p>

        <Table className="max-w-[15rem]">
          <TableBody>
            {summary.map((s, i) => (
              <TableRow key={i} className="border-none">
                <TableCell className="font-medium lg:text-base px-0">
                  {s.title}
                </TableCell>

                <TableCell className="font-medium whitespace-nowrap lg:text-base text-[#696969]">
                  {s.value}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <Separator />

      <p className="text-lg lg:text-xl font-medium">Items in your order</p>

      {order?.orderItems.map((o, i) => (
        <div
          key={i}
          className="w-full max-w-4xl relative bg-white border shadow rounded-lg flex gap-6 p-4"
        >
          <Avatar className="size-36 rounded-lg">
            <AvatarImage src={o.product.images[0].url} alt="Image" />
            <AvatarFallback className="rounded-lg">DP</AvatarFallback>
          </Avatar>

          <div className="w-full flex flex-col gap-4">
            <div className="w-full flex items-center justify-between">
              <Button
                variant="outline"
                className="text-main hover:text-main hover:bg-white cursor-default text-sm"
              >
                <Leaf /> {convertTextFromUppercase(o.product.sustainabilityTag)}
              </Button>

              <div
                className={cn(
                  "border px-2 py-1 flex items-center justify-center text-xs lg:text-sm gap-1 rounded-md font-medium w-fit",
                  o.order.transaction?.status === "FAILED"
                    ? "text-red bg-red/10"
                    : "text-main bg-main/10"
                )}
              >
                {o.order.transaction?.status === "FAILED"
                  ? "FAILED"
                  : o.customerStatus}
              </div>
            </div>

            <div>
              <p className="font-medium">{o.product.name}</p>
              <p className="text-sm text-muted-foreground">
                {o.product.category}
              </p>
            </div>

            <div className="flex items-center absolute bottom-4 right-4">
              <Button variant="outline" className="hover:bg-white">
                {o.quantity} x ₦ {formatNumber(o.price)}
              </Button>

              <Button variant="ghost" className="hover:bg-transparent">
                ₦ {formatNumber(o.quantity * o.price)}
              </Button>
            </div>

            <Link
              href={PAGES.main.shop.seller(o.sellerId)}
              className="text-muted-foreground underline"
            >
              {o.seller.businessName}
            </Link>
          </div>
        </div>
      ))}

      <div className="w-full max-w-4xl relative bg-white border shadow rounded-lg flex gap-6 p-4">
        <p className="lg:text-lg">Payment methods</p>
      </div>

      <div className="w-full max-w-4xl relative bg-white border shadow rounded-lg flex flex-col gap-6 p-4">
        <p className="lg:text-lg">Set address</p>

        <p>
          {order?.address.street}, {order?.address.city}, {order?.address.state}
          , Nigeria, {order?.address.zip}
        </p>
      </div>
    </>
  );
};

export default OrderPage;
