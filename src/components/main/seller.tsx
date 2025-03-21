import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "../ui/button";
import { Heart, Leaf, MessageCircleMore, ShoppingBasket } from "lucide-react";

const Seller = () => {
  return (
    <>
      <h1 className="text-xl lg:text-2xl font-medium">Seller</h1>

      <div className="flex flex-col gap-6">
        <div className="flex gap-6 items-center justify-start">
          <Avatar className="size-12 rounded-full">
            <AvatarImage
              src="https://github.com/victoribironke.png"
              alt={"user.name"}
            />
            <AvatarFallback className="rounded-lg">CN</AvatarFallback>
          </Avatar>

          <div className="flex flex-col gap">
            <p className="font-medium">PureBody Ltd.</p>
            <p className="text-sm text-muted-foreground">Joined Jan 26, 2025</p>
          </div>

          <Button className="bg-main hover:bg-main/90 w-fit">
            <MessageCircleMore /> Message
          </Button>
        </div>

        <p className="w-full max-w-2xl">
          A striving place for Lorem ipsum dolor sit amet, consectetur adipisci
          elit, sed eiusmod tempor incidunt ut labore et dolore magna aliqua. Ut
          enim ad minim veniam, quis nostrum exercitationem ullam corporis
          suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur. Quis
          aute iure reprehenderit in voluptate velit esse cillum dolore eu
          fugiat nulla pariatur. Excepteur sint obcaecat cupiditat non proident,
          sunt in culpa qui officia deserunt mollit anim id est laborum
        </p>
      </div>

      <div className="flex flex-col gap-4 w-full">
        <h4 className="text-lg lg:text-xl font-medium">Catalogue</h4>

        <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
          <div className="bg-white p-2 rounded-lg border shadow flex flex-col gap-2 relative">
            <div className="w-full flex items-center justify-between">
              <div className="text-main border px-2 py-1 flex items-center justify-center text-xs gap-1 rounded-md font-medium w-fit">
                <Leaf size={14} /> Biodegradable
              </div>

              <Heart size={18} />
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

            <Button className="text-white hover:bg-main/90 h-auto bg-main w-fit absolute bottom-2 right-2">
              <ShoppingBasket size={20} />
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Seller;
