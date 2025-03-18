"use client";

import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { useState } from "react";
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

const Orders = () => {
  const [tab, setTab] = useState("All");

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
            <TableRow>
              <TableCell className="pl-4">
                <div className="flex items-center gap-2">
                  <Avatar className="h-8 w-8 rounded-lg">
                    <AvatarImage
                      src="https://github.com/victoribironke.png"
                      alt="Track cover"
                    />
                    <AvatarFallback className="rounded-lg">DP</AvatarFallback>
                  </Avatar>

                  <div>
                    <Link
                      href={PAGES.dashboard.orders.order("fklaj")}
                      className="font-medium hover:underline"
                    >
                      Mixed tote bag (Red bottoms)
                    </Link>

                    <p className="text-sm text-muted-foreground">Accessory</p>
                  </div>
                </div>
              </TableCell>

              <TableCell className="font-medium whitespace-nowrap">
                <div>
                  <p className="font-medium">#01ARZ3NDEKTS</p>

                  <p className="text-sm text-muted-foreground">Jan 24, 2025</p>
                </div>
              </TableCell>
              <TableCell className="whitespace-nowrap">
                <div className="text-main bg-main/10 border px-2 py-1 flex items-center justify-center text-xs gap-1 rounded-md font-medium w-fit">
                  Delivered
                </div>
              </TableCell>
              <TableCell className="whitespace-nowrap">127</TableCell>
              <TableCell>9,500</TableCell>
              <TableCell>
                <Button variant="ghost">
                  <Ellipsis />
                </Button>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </>
  );
};

export default Orders;
