import ProductCard from "../general/product-card";
import { useEffect, useState } from "react";
import { Recommendation } from "@/interfaces/general";
import { useAtomValue } from "jotai";
import { user_details } from "@/app/atoms/atoms";
import { getRecommendations } from "@/lib/requests/customer";
import toast from "react-hot-toast";

const CuratedPicks = () => {
  const [loading, setLoading] = useState(true);
  const [recs, setRecs] = useState<Recommendation[]>([]);
  const userInfo = useAtomValue(user_details);

  useEffect(() => {
    (async () => {
      const { data, error } = await getRecommendations(userInfo?.id || "");

      setLoading(false);

      if (error) return toast.error(error);

      setRecs(data as Recommendation[]);
    })();
  }, []);

  return (
    <section className="flex flex-col gap-4 w-full">
      <h4 className="text-lg lg:text-xl font-medium">Curated picks for you</h4>

      {!loading && (
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
          {recs.map((r, i) => (
            <ProductCard
              cartItems={[]}
              likedProducts={[]}
              product={r.product}
              setCartItems={() => {}}
              setLikedProducts={() => {}}
              hideExtra
              key={i}
            />
          ))}
        </div>
      )}
    </section>
  );
};

export default CuratedPicks;
