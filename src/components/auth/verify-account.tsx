"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { resendOtp, verifyOtp } from "@/lib/requests";
import { LoaderCircle } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const VerifyAccount = ({ e, email }: { e: string; email: string }) => {
  const [otp, setOTP] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [timer, setTimer] = useState(60);
  const [reloadTimer, setReloadTimer] = useState("");

  const vOtp = async () => {
    setLoading(true);

    const { error } = await verifyOtp(email, otp);

    setLoading(false);

    if (error) {
      setError(error);
      return;
    }

    toast.success("Account verified successfully.");
    setOpen(false);
  };

  const resend = async () => {
    const { data, error } = await resendOtp(email);

    if (error) {
      setError(error);
      return;
    }

    toast.success(data);
    setTimer(60);
    setReloadTimer(`code resent @ ${Date.now()}`);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((t) => t - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [reloadTimer]);

  useEffect(() => setDisabled(timer > 0), [timer]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {e === "Account is not verified." && (
          <span className="underline cursor-pointer" onClick={resend}>
            Click here.
          </span>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Verify account</DialogTitle>
          <DialogDescription>
            Enter your code sent to your email address below
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="otp">OTP</Label>
            <Input
              id="otp"
              type="text"
              placeholder="123456"
              required
              value={otp}
              onChange={(e) => setOTP(e.target.value)}
            />
          </div>

          {error && (
            <p className="text-red text-sm w-full text-center">{error}</p>
          )}

          <Button
            onClick={resend}
            disabled={disabled}
            variant="ghost"
            className="text-main text-sm hover:text-main w-fit"
          >
            Resend code {timer > 0 && <p className="text-gray-400">{timer}s</p>}
          </Button>

          <Button
            className="w-full bg-main hover:bg-main/90"
            onClick={vOtp}
            disabled={!otp || loading}
          >
            Verify {loading && <LoaderCircle className="animate-spin" />}
          </Button>
        </div>
        {/* <DialogFooter>
          <Button type="submit">Save changes</Button>
        </DialogFooter> */}
      </DialogContent>
    </Dialog>
  );
};

export default VerifyAccount;
