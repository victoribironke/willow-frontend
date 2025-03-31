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
import { cn, convertTextFromUppercase, formatNumber } from "@/lib/utils";
import { useEffect, useState } from "react";
import { Badge } from "../ui/badge";
import Star from "./star";
import ProductReviews from "./product-reviews";
import ProductDetails from "./product-details";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { PAGES } from "@/constants/constants";
import { Product } from "@/interfaces/general";
import { getSellerProduct } from "@/lib/requests/seller";
import { user_details } from "@/app/atoms/atoms";
import { useAtomValue } from "jotai";
import toast from "react-hot-toast";
import PageLoader from "./page-loader";
import { getProduct } from "@/lib/requests/general";
import { addItemToCart, getCart } from "@/lib/requests/customer";
import CuratedPicks from "../main/curated-picks";
import SimilarProducts from "../dashboard/similar-products";
import DelistProduct from "../dashboard/delist-product";

const ProductPage = ({ productId }: { productId: string }) => {
  const [tab, setTab] = useState("details");
  const pathname = usePathname();
  const [loading, setLoading] = useState(true);
  const [disabled, setDisabled] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [product, setProduct] = useState<Product | null>(null);
  const userInfo = useAtomValue(user_details);
  const [cartItems, setCartItems] = useState<string[]>([]);
  const { push } = useRouter();

  const totalRating =
    product?.reviews.map((a) => a.rating).reduce((a, b) => a + b, 0) || 0;
  const averageRating = Math.floor(
    (totalRating / (5 * (product?.reviews.length || 0))) * 5
  );

  const addToCart = async (productId: string) => {
    if (quantity === 0) return;

    setDisabled(true);

    const { error } = await addItemToCart(
      userInfo?.id || "",
      productId,
      quantity
    );

    if (error) {
      setDisabled(false);
      return;
    }

    toast.success("Added to cart.");
  };

  useEffect(() => {
    (async () => {
      const { data, error } = await (userInfo?.role === "SELLER"
        ? getSellerProduct(userInfo?.id || "", productId)
        : getProduct(productId));

      setLoading(false);

      if (error) {
        toast.error(error);

        if (error === "Product not found.")
          push(
            userInfo?.role === "SELLER"
              ? PAGES.dashboard.products
              : PAGES.main.shop.home
          );

        return;
      }

      if (userInfo?.role !== "SELLER") {
        setLoading(true);

        const { data: c } = await getCart(userInfo?.id || "");

        setLoading(false);

        setCartItems(c?.map((j) => j.productId) as string[]);
      }

      setProduct(data as Product);
    })();
  }, []);

  if (loading) return <PageLoader />;

  return (
    <>
      {pathname.includes("/dashboard/") && (
        <>
          <h1 className="text-xl lg:text-2xl font-medium">Product</h1>
          <p className="text-[#696969]">View product</p>
          <Separator />
        </>
      )}

      <div className="flex flex-col lg:flex-row gap-6">
        <div className="w-full flex items-center justify-center gap-4 flex-col">
          <Carousel className="w-full border shadow rounded-lg">
            <CarouselContent>
              {product?.images.map((img, index) => (
                <CarouselItem key={index}>
                  <div className="overflow-hidden aspect-square rounded-xl">
                    <img
                      src={img.url}
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
            {product?.images.map((img, index) => (
              <div
                className="overflow-hidden aspect-square rounded-lg w-full border shadow"
                key={index}
              >
                <img
                  src={img.url}
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
            <Leaf /> {convertTextFromUppercase(product?.sustainabilityTag)}
          </Button>

          <div className="flex flex-col gap-4">
            <h4 className="text-xl lg:text-2xl font-medium">{product?.name}</h4>

            <p className="text-[#696969] font-medium">{product?.category}</p>

            <h4 className="text-lg lg:text-xl font-medium">
              ₦ {formatNumber(product?.price || 0)}
            </h4>

            <div className="flex items-center gap-2">
              <Star filled={averageRating >= 1} />
              <Star filled={averageRating >= 2} />
              <Star filled={averageRating >= 3} />
              <Star filled={averageRating >= 4} />
              <Star filled={averageRating >= 5} />

              <p className="font-medium">{product?.reviews.length} reviews</p>
            </div>
          </div>

          <Separator />

          <div className="flex gap-8">
            <div>
              <p className="text-[#696969] font-medium mb-2">Sourcing</p>
              <p className="text-sm lg:text-base font-medium">
                {convertTextFromUppercase(product?.sourcing)}
              </p>
            </div>

            <div>
              <p className="text-[#696969] font-medium mb-2">Packaging</p>
              <p className="text-sm lg:text-base font-medium">
                {convertTextFromUppercase(product?.packaging)}
              </p>
            </div>
          </div>

          <Separator />

          <p className="text-[#696969]">
            {product?.inStock
              ? product.inStock + " left"
              : "Delivered on demand"}
          </p>

          {pathname.includes("/dashboard/") ? (
            <DelistProduct pid={product?.id || ""} uid={userInfo?.id || ""} />
          ) : cartItems.includes(product?.id || "") ? (
            <>
              <Link href={PAGES.main.shop.cart}>
                <Button className="w-fit bg-main hover:bg-main/90">
                  Visit cart
                </Button>
              </Link>

              <Link
                href={PAGES.main.shop.seller(product?.sellerId as string)}
                className="text-muted-foreground underline"
              >
                {product?.seller.businessName}
              </Link>
            </>
          ) : (
            <>
              <div className="w-full flex gap-4">
                <Button variant="outline" className="hover:bg-white gap-4">
                  <div
                    onClick={() => quantity !== 0 && setQuantity((k) => k - 1)}
                  >
                    <Minus size={18} />
                  </div>

                  <p className="font-medium">{quantity}</p>

                  <div onClick={() => setQuantity((k) => k + 1)}>
                    <Plus size={18} />
                  </div>
                </Button>

                <Button
                  className="w-fit bg-main hover:bg-main/90"
                  disabled={disabled}
                  onClick={() => addToCart(product?.id || "")}
                >
                  Add to cart
                </Button>
              </div>

              <Link
                href={PAGES.main.shop.seller(product?.sellerId as string)}
                className="text-muted-foreground underline"
              >
                {product?.seller.businessName}
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
              : "border-muted-foreground/50 text-muted-foreground/50 hover:text-muted-foreground/50"
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
              : "border-muted-foreground/50 text-muted-foreground/50 hover:text-muted-foreground/50"
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
            {product?.reviews.length}
          </Badge>
        </Button>
      </div>

      {tab === "details" && (
        <>
          <ProductDetails
            desc={product?.description || ""}
            eolInfo={product?.endOfLifeInfo || ""}
          />
          {pathname.includes("/dashboard/products/") && (
            <SimilarProducts id={product?.id || ""} />
          )}
        </>
      )}
      {tab === "ratings" && <ProductReviews reviews={product?.reviews || []} />}

      {pathname.includes("/product/") && <CuratedPicks />}
    </>
  );
};

export default ProductPage;
