"use client";

import { cn, formatDateTime } from "@/lib/utils";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import Link from "next/link";
import { PAGES } from "@/constants/constants";
import { Ellipsis } from "lucide-react";
import { useAtomValue } from "jotai";
import { user_details } from "@/app/atoms/atoms";
import { getSellerOrders } from "@/lib/requests/seller";
import toast from "react-hot-toast";
import PageLoader from "../general/page-loader";
import { OrderItem } from "@/interfaces/general";

const Orders = () => {
  const [tab, setTab] = useState("All");
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState<OrderItem[]>([]);
  const userInfo = useAtomValue(user_details);

  useEffect(() => {
    (async () => {
      console.log(userInfo);
      const { data, error } = await getSellerOrders(userInfo?.id || "");

      if (error) {
        toast.error(error);
        return;
      }

      setLoading(false);

      setOrders(data as OrderItem[]);
    })();
  }, []);

  if (loading) return <PageLoader />;

  return (
    <>
      <h1 className="text-xl lg:text-2xl font-medium">Orders</h1>

      <p className="text-[#696969]">Manage all your orders</p>

      <Separator />

      <div className="w-full flex items-center gap-4">
        {["All", "New", "Shipped", "Delivered"].map((t, i) => (
          <Button
            key={i}
            variant="ghost"
            className={cn(
              "border-b-2 rounded-none",
              tab === t ? "border-main" : "border-transparent"
            )}
            onClick={() => setTab(t)}
          >
            {t}
          </Button>
        ))}
      </div>

      <div className="border rounded-lg overflow-hidden">
        <Table className="bg-white">
          <TableHeader>
            <TableRow>
              <TableHead className="pl-4">Order</TableHead>
              <TableHead>ID & Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Quantity</TableHead>
              <TableHead>Total Price (₦)</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.map((o, i) => (
              <TableRow key={i}>
                <TableCell className="pl-4">
                  <div className="flex items-center gap-2">
                    <Avatar className="h-8 w-8 rounded-lg">
                      <AvatarImage src={o.product.images} alt="Product image" />
                      <AvatarFallback className="rounded-lg">DP</AvatarFallback>
                    </Avatar>

                    <div>
                      <Link
                        href={PAGES.dashboard.order(o.id)}
                        className="font-medium hover:underline"
                      >
                        {o.product.name}
                      </Link>

                      <p className="text-sm text-muted-foreground">
                        {o.product.category}
                      </p>
                    </div>
                  </div>
                </TableCell>

                <TableCell className="font-medium whitespace-nowrap">
                  <div>
                    <p className="font-medium">{o.id}</p>

                    <p className="text-sm text-muted-foreground">
                      {formatDateTime(o.product.createdAt)}
                    </p>
                  </div>
                </TableCell>
                <TableCell className="whitespace-nowrap">
                  <div className="text-main bg-main/10 border px-2 py-1 flex items-center justify-center text-xs gap-1 rounded-md font-medium w-fit">
                    {o.customerStatus}
                  </div>
                </TableCell>
                <TableCell className="whitespace-nowrap">
                  {o.quantity}
                </TableCell>
                <TableCell>{o.price}</TableCell>
                <TableCell>
                  <Button variant="ghost">
                    <Ellipsis />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  );
};

export default Orders;
