"use client";

import { Separator } from "../ui/separator";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Button } from "../ui/button";
import { Leaf, Minus, Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { Badge } from "../ui/badge";
import Star from "./star";
import ProductReviews from "./product-reviews";
import ProductDetails from "./product-details";
import { usePathname } from "next/navigation";
import SimilarProducts from "../dashboard/similar-products";
import CuratedPicks from "../main/curated-picks";
import Link from "next/link";
import { PAGES } from "@/constants/constants";

const Product = () => {
  const [tab, setTab] = useState("details");
  const pathname = usePathname();

  return (
    <>
      {pathname.includes("/dashboard/") && (
        <>
          <h1 className="text-xl lg:text-2xl font-medium">Products</h1>
          <p className="text-[#696969]">View product</p>
          <Separator />
        </>
      )}

      <div className="flex flex-col lg:flex-row gap-6">
        <div className="w-full flex items-center justify-center gap-4 flex-col">
          <Carousel className="w-full">
            <CarouselContent>
              {Array.from({ length: 5 }).map((_, index) => (
                <CarouselItem key={index}>
                  <div className="overflow-hidden aspect-square rounded-xl">
                    <img
                      src="https://github.com/victoribironke.png"
                      alt="Image"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-4 rounded-md" />
            <CarouselNext className="right-4 rounded-md" />
          </Carousel>

          <div className="grid grid-cols-5 w-full gap-4">
            {Array.from({ length: 5 }).map((_, index) => (
              <div
                className="overflow-hidden aspect-square rounded-xl w-full"
                key={index}
              >
                <img
                  src="https://github.com/victoribironke.png"
                  alt="Image"
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="w-full flex flex-col gap-6 items-start">
          <Button
            variant="outline"
            className="text-main hover:text-main hover:bg-white cursor-default"
          >
            <Leaf /> Biodegradable
          </Button>

          <div className="flex flex-col gap-2">
            <h4 className="text-xl lg:text-2xl font-medium">
              Pine Scent Body Rub
            </h4>

            <div className="flex items-center gap-2">
              <Star filled />
              <Star filled />
              <Star />
              <Star />
              <Star />

              <p className="font-medium">2.0</p>
            </div>

            <p className="text-[#696969] font-medium">Cosmetics</p>

            <h4 className="text-lg lg:text-xl font-medium">₦ 23,500</h4>
          </div>

          <Separator />

          <div className="flex gap-8">
            <div>
              <p className="lg:text-lg text-[#696969] font-medium mb-2">
                Sourcing
              </p>
              <p className="text-sm lg:text-base font-medium">International</p>
            </div>

            <div>
              <p className="lg:text-lg text-[#696969] font-medium mb-2">
                Packaging
              </p>
              <p className="text-sm lg:text-base font-medium">Reusable</p>
            </div>
          </div>

          <Separator />

          <p className="text-[#696969]">120 left</p>

          {pathname.includes("/dashboard/") ? (
            <Button variant="destructive">Delist</Button>
          ) : (
            <>
              <div className="w-full flex gap-4">
                <div className="border border-black bg-white flex items-center justify-center gap-4 py-1 px-2 rounded-md">
                  <button>
                    <Minus size={18} />
                  </button>
                  <p className="font-medium">0</p>
                  <button>
                    <Plus size={18} />
                  </button>
                </div>

                <Button className="w-fit bg-main hover:bg-main/90">
                  Add to cart
                </Button>
              </div>

              <Link
                href={PAGES.main.seller("jf")}
                className="text-muted-foreground underline"
              >
                PureBody Ltd.
              </Link>
            </>
          )}
        </div>
      </div>

      <div className="w-full flex items-center mt-6">
        <Button
          variant="ghost"
          className={cn(
            "border-b-2 rounded-none w-full text-base",
            tab === "details"
              ? "border-black text-black"
              : "border-muted-foreground text-muted-foreground hover:text-muted-foreground"
          )}
          onClick={() => setTab("details")}
        >
          Details
        </Button>

        <Button
          variant="ghost"
          className={cn(
            "border-b-2 rounded-none w-full text-base",
            tab === "ratings"
              ? "border-black text-black"
              : "border-muted-foreground text-muted-foreground hover:text-muted-foreground"
          )}
          onClick={() => setTab("ratings")}
        >
          Ratings & Reviews{" "}
          <Badge
            variant="outline"
            className={
              tab === "ratings" ? "text-black" : "text-muted-foreground"
            }
          >
            6
          </Badge>
        </Button>
      </div>

      {tab === "details" && (
        <>
          <ProductDetails />
          {pathname.includes("/dashboard/products/") && <SimilarProducts />}
        </>
      )}
      {tab === "ratings" && <ProductReviews />}

      {pathname.includes("/product/") && <CuratedPicks />}
    </>
  );
};

export default Product;
