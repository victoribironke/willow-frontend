"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { PAGES } from "@/constants/constants";
import { useEffect, useState } from "react";
import { validateEmail } from "@/lib/utils";
import toast from "react-hot-toast";
import { sendPasswordResetLink } from "@/lib/requests";
import { LoaderCircle } from "lucide-react";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [timer, setTimer] = useState(0);
  const [reloadTimer, setReloadTimer] = useState("");
  const [loading, setLoading] = useState(false);
  const [disabled, setDisabled] = useState(true);

  const sendLink = async () => {
    if (!validateEmail(email)) {
      setError("Please enter a valid email.");
      return;
    }

    setLoading(true);

    const { data, error } = await sendPasswordResetLink(email);

    setLoading(false);

    if (error) {
      setError(error);
      return;
    }

    setTimer(60);
    setReloadTimer(`code sent @ ${Date.now()}`);
    toast.success(data);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((t) => t - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [reloadTimer]);

  useEffect(() => setDisabled(timer > 0), [timer]);

  useEffect(() => setError(""), [email]);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-semibold">Forgot password</h1>
        <p className="text-balance text-sm text-muted-foreground">
          Enter your email below to get a password reset link
        </p>
      </div>

      <div className="grid gap-6">
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="m@example.com"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        {error && (
          <p className="text-red text-sm w-full text-center">{error}</p>
        )}

        <Button
          className="w-full bg-main hover:bg-main/90"
          disabled={loading || disabled}
          onClick={sendLink}
        >
          Send password reset link{" "}
          {loading && <LoaderCircle className="animate-spin" />}
          {timer > 0 && <p>{timer}s</p>}
        </Button>
      </div>

      <div className="text-center text-sm">
        I have a Willow account.{" "}
        <Link
          href={PAGES.auth.login}
          className="underline underline-offset-4 text-main"
        >
          Login
        </Link>
      </div>
    </div>
  );
};

export default ForgotPassword;
