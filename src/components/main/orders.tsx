"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Separator } from "../ui/separator";
import Link from "next/link";
import { PAGES } from "@/constants/constants";
import { useEffect, useState } from "react";
import { user_details } from "@/app/atoms/atoms";
import { useAtomValue } from "jotai";
import { Order } from "@/interfaces/general";
import PageLoader from "../general/page-loader";
import toast from "react-hot-toast";
import { getOrders } from "@/lib/requests/customer";
import { formatDateTime, formatNumber } from "@/lib/utils";
import { useRouter } from "next/navigation";

const Orders = () => {
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState<Order[]>([]);
  const userInfo = useAtomValue(user_details);
  const { push } = useRouter();

  useEffect(() => {
    (async () => {
      const { data, error } = await getOrders(userInfo?.id || "");

      setLoading(false);

      if (error) return toast.error(error);

      setOrders(data as Order[]);
    })();
  }, []);

  if (loading) return <PageLoader />;

  return (
    <>
      <h1 className="text-xl lg:text-2xl font-medium">Ordered/Ongoing</h1>

      <Separator />

      <div className="border rounded-lg overflow-hidden">
        <Table className="bg-white">
          <TableHeader>
            <TableRow>
              <TableHead className="pl-4">ID</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Items</TableHead>
              <TableHead>Quantity</TableHead>
              <TableHead>Total Price (₦)</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.map((o, i) => (
              <TableRow
                key={i}
                onClick={() => push(PAGES.main.shop.order(o.id))}
                className="cursor-pointer"
              >
                <TableCell className="pl-4 font-medium">{o.id}</TableCell>

                <TableCell className="font-medium whitespace-nowrap">
                  {formatDateTime(o.createdAt)}
                </TableCell>
                <TableCell className="whitespace-nowrap">
                  {o.orderItems.length}
                </TableCell>
                <TableCell className="whitespace-nowrap">
                  {o.orderItems.reduce((a, b) => a + b.quantity, 0)}
                </TableCell>
                <TableCell className="font-medium">
                  {formatNumber(o.totalAmount)}
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
