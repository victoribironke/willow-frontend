"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { PAGES } from "@/constants/constants";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { resetPassword } from "@/lib/requests";
import { LoaderCircle } from "lucide-react";
import { Checkbox } from "../ui/checkbox";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { getJwtExpiration, validatePassword } from "@/lib/utils";
import { getJsPageSizeInKb } from "next/dist/build/utils";

const ResetPassword = () => {
  const searchParams = useSearchParams();
  const resetToken = searchParams.get("resetToken");

  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const router = useRouter();

  const sendLink = async () => {
    if (password !== passwordConfirm) {
      toast.error("Passwords do not match.");
      return;
    }

    const isPassword = validatePassword(password);

    if (!isPassword.valid) {
      toast.error(isPassword.reason);
      return;
    }

    setLoading(true);

    const { data, error } = await resetPassword(password, resetToken as string);

    setLoading(false);

    if (error) {
      toast.error(error);
      return;
    }

    toast.success(data);
    router.push(PAGES.auth.login);
  };

  useEffect(() => {
    if (!resetToken) setError(true);

    const expires_at = getJwtExpiration(resetToken as string);
    const date_ms = new Date().getTime();

    if (!expires_at || date_ms >= expires_at) setError(true);
  }, []);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-semibold">Reset password</h1>
        <p className="text-balance text-sm text-muted-foreground">
          {error ? "Invalid reset token" : "Enter your new password below"}
        </p>
      </div>

      {!error ? (
        <div className="grid gap-6">
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              required
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="password-confirm">Confirm password</Label>
            <Input
              id="password-confirm"
              type={showPassword ? "text" : "password"}
              required
              placeholder="••••••••"
              value={passwordConfirm}
              onChange={(e) => setPasswordConfirm(e.target.value)}
            />
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="show-password"
              checked={showPassword}
              onClick={() => setShowPassword((k) => !k)}
            />
            <Label htmlFor="show-password">Show password</Label>
          </div>

          <Button
            className="w-full bg-main hover:bg-main/90"
            disabled={loading}
            onClick={sendLink}
          >
            Reset password{" "}
            {loading && <LoaderCircle className="animate-spin" />}
          </Button>
        </div>
      ) : (
        <div className="grid gap-6">
          <p className="w-full text-center">
            Your reset token is either invalid or expired.
          </p>

          <Link href={PAGES.auth.login}>
            <Button className="w-full bg-main hover:bg-main/90">
              Back to login
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default ResetPassword;
