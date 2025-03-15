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

const Products = () => {
  const [tab, setTab] = useState("Listed");

  return (
    <>
      <h1 className="text-xl lg:text-2xl font-medium">Products</h1>

      <p className="text-[#696969]">View all your products by status</p>

      <Separator />

      <div className="w-full flex items-center gap-4">
        {["Listed", "Pending", "Rejected", "Out of stock"].map((t, i) => (
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
              <TableHead className="pl-4">Product name</TableHead>
              <TableHead>ID & Date</TableHead>
              <TableHead>Key tag</TableHead>
              <TableHead>Stock</TableHead>
              <TableHead>Price (₦)</TableHead>
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
                    <p className="font-medium">Mixed tote bag (Red bottoms)</p>

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
              <TableCell className="whitespace-nowrap">Zero waste</TableCell>
              <TableCell className="whitespace-nowrap">127</TableCell>
              <TableCell>9,500</TableCell>
              <TableCell>
                <Button
                  variant="outline"
                  className="border-red text-red hover:text-red"
                >
                  Delist
                </Button>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </>
  );
};

export default Products;
