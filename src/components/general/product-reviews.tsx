import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Star from "./star";
import { BadgeCheck } from "lucide-react";
import { Review } from "@/interfaces/general";
import { formatDateTime } from "@/lib/utils";
import { useState } from "react";

const ProductReviews = ({ reviews }: { reviews: Review[] }) => {
  const [order, setOrder] = useState("newest");

  const new_reviews = reviews.sort((a, b) => {
    return order === "newest"
      ? a.createdAt > b.createdAt
        ? 1
        : -1
      : a.createdAt < b.createdAt
      ? 1
      : -1;
  });

  return (
    <>
      <h4 className="text-lg lg:text-xl font-medium">Reviews</h4>

      <div className="flex items-center gap-2">
        <p className="text-[#696969]">Sort by:</p>

        <Select value={order} onValueChange={setOrder}>
          <SelectTrigger className="w-full max-w-40 bg-white">
            <SelectValue placeholder="Select an order" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="newest">Newest</SelectItem>
              <SelectItem value="oldest">Oldest</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <div className="w-full border rounded-xl overflow-hidden">
        {new_reviews.map((r, i) => (
          <div
            className="flex flex-col w-full gap-2 p-4 border-b bg-white"
            key={i}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Star size="size-4" filled={Math.floor(r.rating) >= 1} />
                <Star size="size-4" filled={Math.floor(r.rating) >= 2} />
                <Star size="size-4" filled={Math.floor(r.rating) >= 3} />
                <Star size="size-4" filled={Math.floor(r.rating) >= 4} />
                <Star size="size-4" filled={Math.floor(r.rating) >= 5} />
              </div>

              <p className="text-[#696969] text-sm">
                {formatDateTime(r.createdAt)}
              </p>
            </div>

            <h4 className="lg:text-lg font-medium">
              {r.comment?.split(" ").slice(0, 5).join(" ")}
            </h4>

            <p>{r.comment}</p>

            <div className="flex items-center justify-between">
              <p className="text-[#696969] text-sm">
                by {r.customer.firstname} {r.customer.lastname}
              </p>

              <p className="text-main text-sm flex items-center justify-center gap-1 font-medium">
                <BadgeCheck size={16} /> Verified Purchase
              </p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default ProductReviews;
