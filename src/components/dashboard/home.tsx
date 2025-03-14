import {
  Calendar,
  CircleCheck,
  CircleX,
  MessagesSquare,
  Send,
  ShoppingCart,
  Undo2,
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Separator } from "../ui/separator";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

const Home = () => {
  const overview = [
    { title: "Product orders", icon: ShoppingCart, value: 0 },
    { title: "Chats", icon: MessagesSquare, value: 0 },
    { title: "Returned products", icon: Undo2, value: 0 },
    { title: "Products awaiting", icon: CircleCheck, value: 0 },
    { title: "Products shipped", icon: Send, value: 0 },
    { title: "Products out of stock", icon: CircleX, value: 0 },
  ];

  return (
    <>
      <h1 className="text-xl lg:text-2xl font-medium">Overview</h1>

      <p className="text-[#696969]">Monitor activities at a glance</p>

      <Separator />

      <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:w-2/3 lg:pr-4">
        {overview.map((o, i) => (
          <div
            className="flex flex-col gap-6 border shadow rounded-lg p-2 bg-white"
            key={i}
          >
            <div className="flex gap-4 items-center justify-start">
              <div className="flex border p-1.5 shadow bg-white items-center justify-center rounded-md">
                <o.icon size={15} className="text-main" />
              </div>

              <p className="text-xl font-medium">{o.value}</p>
            </div>
            <p>{o.title}</p>
          </div>
        ))}
      </div>

      <div className="w-full flex flex-col lg:flex-row gap-4 items-start">
        <div className="w-full lg:w-2/3 flex flex-col gap-4 bg-white p-4 border shadow rounded-lg">
          <div className="flex items-center justify-center gap-2">
            <h3 className="text-lg lg:text-xl font-medium mr-auto">
              Recent orders
            </h3>

            <Button variant="outline">
              <Calendar size={15} />
              <p className="text-sm">Mar 27, 2025</p>
            </Button>

            <Button variant="outline" className="text-main hover:text-main">
              See all
            </Button>
          </div>

          <div className="border rounded-lg">
            <Table>
              <TableHeader className="bg-muted">
                <TableRow>
                  <TableHead>Order ID</TableHead>
                  <TableHead>Product</TableHead>
                  <TableHead>Time</TableHead>
                  <TableHead>Quantity</TableHead>
                  <TableHead>Total price</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>#01ARZ3NDEKTS</TableCell>

                  <TableCell className="font-medium whitespace-nowrap">
                    Mixed tote bag (Red bottoms)
                  </TableCell>
                  <TableCell className="whitespace-nowrap">4:32 PM</TableCell>
                  <TableCell className="whitespace-nowrap">2</TableCell>
                  <TableCell>₦ 9,500</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </div>

        <div className="w-full lg:w-1/3 flex flex-col gap-4 bg-white p-4 border shadow rounded-lg">
          <div className="flex items-center justify-center gap-2">
            <h3 className="text-lg lg:text-xl font-medium mr-auto">
              Best selling
            </h3>

            <Button variant="outline" className="text-main hover:text-main">
              See all
            </Button>
          </div>

          <div className="flex gap-4 items-center justify-start">
            <Avatar className="size-10 rounded-lg">
              <AvatarImage
                src="https://github.com/victoribironke.png"
                alt={"user.name"}
              />
              <AvatarFallback className="rounded-lg">CN</AvatarFallback>
            </Avatar>

            <div className="flex flex-col ga">
              <p className="text-sm lg:text-base">
                Mixed tote bag (Red bottoms)
              </p>
              <p className="text-xs lg:text-sm text-muted-foreground">
                5 orders
              </p>
            </div>
          </div>

          <div className="flex gap-4 items-center justify-start">
            <Avatar className="size-10 rounded-lg">
              <AvatarImage
                src="https://github.com/victoribironke.png"
                alt={"user.name"}
              />
              <AvatarFallback className="rounded-lg">CN</AvatarFallback>
            </Avatar>

            <div className="flex flex-col ga">
              <p className="text-sm lg:text-base">
                Mixed tote bag (Red bottoms)
              </p>
              <p className="text-xs lg:text-sm text-muted-foreground">
                5 orders
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
