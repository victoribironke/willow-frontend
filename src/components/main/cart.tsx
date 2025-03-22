import { Button } from "../ui/button";
import { Leaf, Minus, Plus } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

const Cart = () => {
  return (
    <>
      <h1 className="text-xl lg:text-2xl font-medium w-full text-center">
        Shopping Cart
      </h1>

      <div className="bg-white w-full mx-auto p-4 rounded-lg shadow border max-w-3xl flex flex-col gap-4">
        <div className="w-full relative flex gap-6">
          <Avatar className="size-36 rounded-lg">
            <AvatarImage
              src="https://github.com/victoribironke.png"
              alt="Image"
            />
            <AvatarFallback className="rounded-lg">DP</AvatarFallback>
          </Avatar>

          <div className="w-full flex flex-col gap-4">
            <div className="w-full flex items-center justify-between">
              <div className="text-main border px-2 py-1 flex items-center justify-center text-xs gap-1 rounded-md font-medium w-fit">
                <Leaf size={14} /> Biodegradable
              </div>

              {/* <div className="text-main bg-main/10 border px-2 py-1 flex items-center justify-center text-xs lg:text-sm gap-1 rounded-md font-medium w-fit">
                Delivered
              </div> */}
            </div>

            <div>
              <p className="font-medium">Mixed tote bag (Red bottoms)</p>
              <p className="text-sm text-muted-foreground">Accessory</p>
            </div>

            <div className="flex items-center">
              <Button variant="outline" className="hover:bg-white gap-4">
                <Minus size={18} />

                <p className="font-medium">1</p>

                <Plus size={18} />
              </Button>

              <Button variant="ghost" className="hover:bg-transparent">
                ₦ 47,000
              </Button>
            </div>

            {/* <Link
              href={PAGES.main.shop.seller("jf")}
              className="text-muted-foreground underline"
            >
              PureBody Ltd.
            </Link> */}
          </div>
        </div>

        <p className="w-full text-center">Total + shipping: ₦ 47,000</p>

        <Button className="bg-main hover:bg-main/90">Checkout</Button>
      </div>
    </>
  );
};

export default Cart;
