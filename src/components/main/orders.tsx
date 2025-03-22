import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Separator } from "../ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import Link from "next/link";
import { PAGES } from "@/constants/constants";

const Orders = () => {
  return (
    <>
      <h1 className="text-xl lg:text-2xl font-medium">Ordered/Ongoing</h1>

      <Separator />

      <div className="border rounded-lg overflow-hidden">
        <Table className="bg-white">
          <TableHeader>
            <TableRow>
              <TableHead className="pl-4">Order</TableHead>
              <TableHead>ID & Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Quantity</TableHead>
              <TableHead>Total Price (₦)</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="pl-4">
                <div className="flex items-center gap-2">
                  <Avatar className="h-8 w-8 rounded-lg">
                    <AvatarImage
                      src="https://github.com/victoribironke.png"
                      alt="Track cover"
                    />
                    <AvatarFallback className="rounded-lg">DP</AvatarFallback>
                  </Avatar>

                  <div>
                    <Link
                      href={PAGES.main.shop.order("fklaj")}
                      className="font-medium hover:underline"
                    >
                      Mixed tote bag (Red bottoms)
                    </Link>

                    <p className="text-sm text-muted-foreground">Accessory</p>
                  </div>
                </div>
              </TableCell>

              <TableCell className="font-medium whitespace-nowrap">
                <div>
                  <p className="font-medium">#01ARZ3NDEKTS</p>

                  <p className="text-sm text-muted-foreground">Jan 24, 2025</p>
                </div>
              </TableCell>
              <TableCell className="whitespace-nowrap">
                <div className="text-main bg-main/10 border px-2 py-1 flex items-center justify-center text-xs gap-1 rounded-md font-medium w-fit">
                  Delivered
                </div>
              </TableCell>
              <TableCell className="whitespace-nowrap">127</TableCell>
              <TableCell>9,500</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </>
  );
};

export default Orders;
