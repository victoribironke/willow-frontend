import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { PAGES } from "@/constants/constants";
import { Product } from "@/interfaces/general";
import { deleteProduct } from "@/lib/requests/seller";
import { LoaderCircle, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { Dispatch, useState, SetStateAction } from "react";
import toast from "react-hot-toast";

const DelistProduct = ({
  uid,
  pid,
  set,
  isDashboard,
}: {
  uid: string;
  pid: string;
  set?: Dispatch<SetStateAction<Product[]>>;
  isDashboard?: boolean;
}) => {
  const [loading, setLoading] = useState(false);
  const { push } = useRouter();

  const delist = async () => {
    setLoading(true);

    const { data, error } = await deleteProduct(uid, pid);

    setLoading(false);

    if (error) return toast.error(error);

    toast.success(data);

    if (set) set((k) => k.filter((a) => a.id !== pid));

    if (isDashboard) push(PAGES.dashboard.products);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="border-red text-red hover:text-red"
        >
          <Trash2 />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Delist product</DialogTitle>
          <DialogDescription>
            Are you sure you want to delist this product?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            disabled={loading}
            className="w-full bg-red hover:bg-red"
            onClick={delist}
          >
            Delist product{" "}
            {loading && <LoaderCircle className="animate-spin" />}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DelistProduct;
