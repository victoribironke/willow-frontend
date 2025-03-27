import { Separator } from "../ui/separator";
import { useEffect, useState } from "react";
import { Product } from "@/interfaces/general";
import { useAtomValue } from "jotai";
import { user_details } from "@/app/atoms/atoms";
import { getSellerProducts } from "@/lib/requests/seller";
import toast from "react-hot-toast";
import ProductCard from "../general/product-card";

const SimilarProducts = ({ id }: { id: string }) => {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState<Product[]>([]);
  const userInfo = useAtomValue(user_details);

  const filtered_products = products.filter((p) => p.id !== id);

  useEffect(() => {
    (async () => {
      const { data, error } = await getSellerProducts(userInfo?.id || "");

      if (error) return toast.error(error);

      setLoading(false);
      setProducts(data as Product[]);
    })();
  }, []);

  if (filtered_products.length < 5) return <></>;

  return (
    <>
      <h4 className="text-lg lg:text-xl font-medium">Other products</h4>

      <Separator />

      {!loading && (
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filtered_products.map((p, i) => (
            <ProductCard
              cartItems={[]}
              likedProducts={[]}
              product={p}
              setCartItems={() => {}}
              setLikedProducts={() => {}}
              hideExtra
              key={i}
            />
          ))}
        </div>
      )}
    </>
  );
};

export default SimilarProducts;
