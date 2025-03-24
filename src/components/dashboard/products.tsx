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
import { Product } from "@/interfaces/general";
import { useAtomValue } from "jotai";
import { user_details } from "@/app/atoms/atoms";
import { getSellerProducts } from "@/lib/requests/seller";
import toast from "react-hot-toast";
import PageLoader from "../general/page-loader";

const Products = () => {
  const [tab, setTab] = useState("Listed");
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState<Product[]>([]);
  const userInfo = useAtomValue(user_details);

  useEffect(() => {
    (async () => {
      // console.log(userInfo);
      const { data, error } = await getSellerProducts(userInfo?.id || "");

      if (error) {
        toast.error(error);
        return;
      }

      setLoading(false);

      setProducts(data as Product[]);
    })();
  }, []);

  if (loading) return <PageLoader />;

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
            {products.map((p, i) => (
              <TableRow key={i}>
                <TableCell className="pl-4">
                  <div className="flex items-center gap-2">
                    <Avatar className="h-8 w-8 rounded-lg">
                      <AvatarImage src={p.images} alt="Product image" />
                      <AvatarFallback className="rounded-lg">DP</AvatarFallback>
                    </Avatar>

                    <div>
                      <Link
                        href={PAGES.dashboard.product(p.id)}
                        className="font-medium hover:underline"
                      >
                        {p.name}
                      </Link>

                      <p className="text-sm text-muted-foreground">
                        {p.category}
                      </p>
                    </div>
                  </div>
                </TableCell>

                <TableCell className="font-medium whitespace-nowrap">
                  <div>
                    <p className="font-medium">{p.id}</p>

                    <p className="text-sm text-muted-foreground">
                      {formatDateTime(p.createdAt)}
                    </p>
                  </div>
                </TableCell>
                <TableCell className="whitespace-nowrap">
                  {p.sustainabilityTag}
                </TableCell>
                <TableCell className="whitespace-nowrap">{p.inStock}</TableCell>
                <TableCell>{p.price}</TableCell>
                <TableCell>
                  <Button
                    variant="outline"
                    className="border-red text-red hover:text-red"
                  >
                    Delist
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

export default Products;
