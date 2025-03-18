import { Leaf } from "lucide-react";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";

const SimilarProducts = () => {
  return (
    <>
      <h4 className="text-lg lg:text-xl font-medium">Your similar products</h4>

      <Separator />

      <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
        <div className="bg-white p-2 rounded-lg border shadow flex flex-col gap-2">
          <div className="text-main border px-2 py-1 flex items-center justify-center text-xs gap-1 rounded-md font-medium w-fit">
            <Leaf size={14} /> Biodegradable
          </div>

          <div className="overflow-hidden aspect-square rounded-md">
            <img
              src="https://github.com/victoribironke.png"
              alt="Image"
              className="w-full h-full object-cover"
            />
          </div>

          <p className="font-medium">Pine Scent Body Rub</p>

          <p className="text-sm text-[#696969]">Cosmetics</p>

          <p className="text-sm font-medium">₦ 23,500</p>
        </div>
      </div>
    </>
  );
};

export default SimilarProducts;
