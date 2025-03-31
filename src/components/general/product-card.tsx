import { user_details } from "@/app/atoms/atoms";
import { PAGES } from "@/constants/constants";
import { ProductCardProps } from "@/interfaces/general";
import {
  addItemToCart,
  addItemToLikedProducts,
  removeItemFromLikedProducts,
} from "@/lib/requests/customer";
import { useAtomValue } from "jotai";
import { Heart, Leaf, ShoppingBasket } from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";
import { convertTextFromUppercase, formatNumber } from "@/lib/utils";
import toast from "react-hot-toast";

const ProductCard = ({
  cartItems,
  likedProducts,
  product,
  setCartItems,
  setLikedProducts,
  hideExtra,
  isDashboard,
}: ProductCardProps) => {
  const userInfo = useAtomValue(user_details);

  const addToCart = async (productId: string) => {
    const { error } = await addItemToCart(userInfo?.id || "", productId, 1);

    if (!error) {
      setCartItems((k) => [...k, productId]);

      toast.success("Product added to cart.");
    }
  };

  const update = async (productId: string) => {
    if (likedProducts.includes(productId)) {
      const { error } = await removeItemFromLikedProducts(
        userInfo?.id || "",
        productId
      );

      if (!error) {
        setLikedProducts((k) => k.filter((j) => j !== productId));

        toast.success("Product removed from wishlist.");
      }

      return;
    }

    const { error } = await addItemToLikedProducts(
      userInfo?.id || "",
      productId
    );

    if (!error) {
      setLikedProducts((k) => [...k, productId]);

      toast.success("Product added to wishlist.");
    }
  };

  return (
    <div className="bg-white p-2 rounded-lg border shadow flex flex-col gap-2 relative">
      <div className="w-full flex items-center justify-between">
        <div className="text-main border px-2 py-1 flex items-center justify-center text-xs gap-1 rounded-md font-medium w-fit whitespace-nowrap">
          <Leaf size={14} />{" "}
          {convertTextFromUppercase(
            product.sustainabilityTag || product.sustainability_tag
          )}
        </div>

        {!hideExtra && (
          <Heart
            fill={likedProducts.includes(product.id) ? "#00a606" : "#fff"}
            size={18}
            className="cursor-pointer text-main"
            onClick={() => update(product.id)}
          />
        )}
      </div>

      <Link
        href={
          isDashboard
            ? PAGES.dashboard.product(product.id)
            : PAGES.main.shop.product(product.id)
        }
      >
        <div className="overflow-hidden aspect-square rounded-md border shadow">
          <img
            src={product.images[0].url}
            alt="Image"
            className="w-full h-full object-cover"
          />
        </div>
      </Link>

      <Link
        href={
          isDashboard
            ? PAGES.dashboard.product(product.id)
            : PAGES.main.shop.product(product.id)
        }
        className="font-medium"
      >
        {product.name.slice(0, 25).trim()}
        {product.name.length >= 25 && "..."}
      </Link>

      <p className="text-sm text-[#696969]">{product.category}</p>

      <p className="text-sm font-medium">₦ {formatNumber(product.price)}</p>

      {!hideExtra &&
        (cartItems.includes(product.id) ? (
          <Link
            href={PAGES.main.shop.cart}
            className="absolute bottom-2 hover:underline right-4 text-sm text-main"
          >
            Visit cart
          </Link>
        ) : (
          <Button
            className="text-white hover:bg-main/90 h-auto bg-main w-fit absolute bottom-2 right-2"
            onClick={() => addToCart(product.id)}
          >
            <ShoppingBasket size={20} />
          </Button>
        ))}
    </div>
  );
};

export default ProductCard;
