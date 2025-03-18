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

const ProductReviews = () => {
  return (
    <>
      <h4 className="text-lg lg:text-xl font-medium">Reviews</h4>

      <div className="flex items-center gap-2">
        <p className="text-[#696969]">Sort by:</p>

        <Select
        //   value={accountType}
        //   onValueChange={(e) => setAccountType(e as AccountType)}
        >
          <SelectTrigger className="w-full max-w-40">
            <SelectValue placeholder="Select an order" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="Newest">Newest</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <div className="w-full border rounded-xl overflow-hidden">
        <div className="flex flex-col w-full gap-2 p-4 border-b">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Star filled size="size-4" />
              <Star filled size="size-4" />
              <Star size="size-4" />
              <Star size="size-4" />
              <Star size="size-4" />
            </div>

            <p className="text-[#696969] text-sm">26-03-2025</p>
          </div>

          <h4 className="lg:text-lg font-medium">I hate it</h4>

          <p>
            It's too sensitive for me, this should be banned from all stores , I
            doubt its sustainability tah is actually truthful.
          </p>

          <div className="flex items-center justify-between">
            <p className="text-[#696969] text-sm">by galacticShopper</p>

            <p className="text-main text-sm flex items-center justify-center gap-1 font-medium">
              <BadgeCheck size={16} /> Verified Purchase
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductReviews;
