"use client";

import Image from "next/image";
import { Separator } from "../ui/separator";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Button } from "../ui/button";
import { Leaf, Mail, ShoppingBag, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { Badge } from "../ui/badge";
import { usePathname } from "next/navigation";
import SimilarProducts from "../dashboard/similar-products";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const Order = () => {
  const [tab, setTab] = useState("details");
  const pathname = usePathname();

  const shipping = [
    { title: "Country:", value: "Nigeria" },
    { title: "State:", value: "Ogun" },
    { title: "City:", value: "Ibadan" },
    { title: "Line 1:", value: "Babcock University, Ilishan-Remo" },
    { title: "Line 2:", value: "" },
    { title: "Zipcode:", value: "" },
  ];

  return (
    <>
      <h1 className="text-xl lg:text-2xl font-medium">Order</h1>

      <p className="text-[#696969]">Payment after delivery</p>

      <Separator />

      <div className="w-full max-w-xl bg-white border shadow rounded-lg flex flex-col gap-4 p-4">
        <p className="lg:text-lg font-medium">Order item</p>

        <div className="text-main bg-main/10 border px-2 py-1 flex items-center justify-center text-xs lg:text-sm gap-1 rounded-md font-medium w-fit">
          Delivered
        </div>

        <div className="flex items-center gap-4">
          <Avatar className="size-12 rounded-lg">
            <AvatarImage
              src="https://github.com/victoribironke.png"
              alt="Image"
            />
            <AvatarFallback className="rounded-lg">DP</AvatarFallback>
          </Avatar>

          <div>
            <p className="text-sm text-muted-foreground">Accessory</p>
            <p className="font-medium">Mixed tote bag (Red bottoms)</p>
          </div>
        </div>

        <div className="flex items-center">
          <Button variant="outline" className="hover:bg-white">
            2 x ₦ 23,500
          </Button>

          <Button variant="ghost" className="hover:bg-transparent">
            ₦ 47,000
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
          <User className="lg:scale-110" /> Olugbesan Tamilore
        </Button>

        <Button
          variant="ghost"
          className="w-fit px-0 hover:bg-transparent lg:text-base lg:gap-3"
        >
          <Mail className="lg:scale-110" /> findtamilore@gmail.com
        </Button>

        <Button
          variant="ghost"
          className="w-fit px-0 hover:bg-transparent lg:text-base lg:gap-3"
        >
          <ShoppingBag className="lg:scale-110" /> 2 orders
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
