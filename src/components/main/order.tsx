"use client";

import { Separator } from "../ui/separator";
import { Button } from "../ui/button";
import { Leaf } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import Link from "next/link";
import { PAGES } from "@/constants/constants";

const Order = () => {
  const summary = [
    { title: "Number of items:", value: "2" },
    { title: "Total + shipping:", value: "₦ 60,500" },
  ];

  return (
    <>
      <h1 className="text-xl lg:text-2xl font-medium">Order</h1>

      <p>Ordrer #1JFDO903FVSA</p>

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

      <Separator />

      <p className="text-lg lg:text-xl font-medium">Items in your order</p>

      <div className="w-full max-w-4xl relative bg-white border shadow rounded-lg flex gap-6 p-4">
        <Avatar className="size-36 rounded-lg">
          <AvatarImage
            src="https://github.com/victoribironke.png"
            alt="Image"
          />
          <AvatarFallback className="rounded-lg">DP</AvatarFallback>
        </Avatar>

        <div className="w-full flex flex-col gap-4">
          <div className="w-full flex items-center justify-between">
            <Button
              variant="outline"
              className="text-main hover:text-main hover:bg-white cursor-default text-sm"
            >
              <Leaf /> Biodegradable
            </Button>

            <div className="text-main bg-main/10 border px-2 py-1 flex items-center justify-center text-xs lg:text-sm gap-1 rounded-md font-medium w-fit">
              Delivered
            </div>
          </div>

          <div>
            <p className="font-medium">Mixed tote bag (Red bottoms)</p>
            <p className="text-sm text-muted-foreground">Accessory</p>
          </div>

          <div className="flex items-center absolute bottom-4 right-4">
            <Button variant="outline" className="hover:bg-white">
              2 x ₦ 23,500
            </Button>

            <Button variant="ghost" className="hover:bg-transparent">
              ₦ 47,000
            </Button>
          </div>

          <Link
            href={PAGES.main.shop.seller("jf")}
            className="text-muted-foreground underline"
          >
            PureBody Ltd.
          </Link>
        </div>
      </div>

      <div className="w-full max-w-4xl relative bg-white border shadow rounded-lg flex gap-6 p-4">
        <p className="lg:text-lg">Payment methods</p>
      </div>

      <div className="w-full max-w-4xl relative bg-white border shadow rounded-lg flex flex-col gap-6 p-4">
        <p className="lg:text-lg">Set address</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 w-full max-w-sm gap-4">
          <div className="grid gap-1">
            <p className="text-muted-foreground">Country</p>

            <p>Nigeria</p>
          </div>

          {/* MAP THE REMAINING INTO HERE */}
        </div>

        <div className="grid gap-1">
          <p className="text-muted-foreground">Line 1</p>

          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati,
            quidem. Aperiam eaque veniam ea labore perspiciatis facilis quaerat
            repellat alias!
          </p>
        </div>

        {/* MAP THE SECOND LINE INTO HERE */}
      </div>
    </>
  );
};

export default Order;
