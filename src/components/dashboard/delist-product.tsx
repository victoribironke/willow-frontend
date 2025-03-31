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
import { deleteProduct } from "@/lib/requests/seller";
import { LoaderCircle, Trash2 } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";

const DelistProduct = ({ uid, pid }: { uid: string; pid: string }) => {
  const [loading, setLoading] = useState(false);

  const delist = async () => {
    setLoading(true);

    const { data, error } = await deleteProduct(uid, pid);

    setLoading(false);

    if (error) return toast.error(error);

    toast.success(data);

    window.location.reload();
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
