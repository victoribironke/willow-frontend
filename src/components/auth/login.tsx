"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { PAGES } from "@/constants/constants";
import { useEffect, useState } from "react";
import { loginUser } from "@/lib/requests/auth";
import { Eye, EyeOff, LoaderCircle } from "lucide-react";
import { validateEmail } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { user_details } from "@/app/atoms/atoms";
import { useSetAtom } from "jotai";
import VerifyAccount from "./verify-account";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const setUserDetails = useSetAtom(user_details);
  const { push } = useRouter();

  const login = async () => {
    if (!validateEmail(email) || !password) {
      setError("Please enter a valid email and password.");
      return;
    }

    setLoading(true);

    const { data, error } = await loginUser(email, password);

    setLoading(false);

    if (error) {
      setError(error);
      return;
    }

    // console.log(data);

    setUserDetails(data);
    push(
      data.role === "SELLER" ? PAGES.dashboard.home : PAGES.main.shop.profile
    );
  };

  useEffect(() => setError(""), [email, password]);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-semibold">Login to your account</h1>
        <p className="text-balance text-sm text-muted-foreground">
          Enter your details below to login to your account
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

        <div className="grid gap-2">
          <div className="flex items-center">
            <Label htmlFor="password">Password</Label>
            <Link
              href={PAGES.auth.forgot_password}
              className="ml-auto text-sm underline-offset-4 hover:underline"
            >
              Forgot your password?
            </Link>
          </div>

          <div className="w-full relative flex items-center justify-center">
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
            />

            {showPassword ? (
              <EyeOff
                className="absolute right-3 cursor-pointer"
                size={18}
                onClick={() => setShowPassword((k) => !k)}
              />
            ) : (
              <Eye
                className="absolute right-3 cursor-pointer"
                size={18}
                onClick={() => setShowPassword((k) => !k)}
              />
            )}
          </div>
        </div>

        {error && (
          <p className="text-red text-sm w-full text-center">
            {error} <VerifyAccount e={error} email={email} />
          </p>
        )}

        <Button
          className="w-full bg-main hover:bg-main/90"
          onClick={login}
          disabled={loading}
        >
          Login {loading && <LoaderCircle className="animate-spin" />}
        </Button>
      </div>

      <div className="text-center text-sm">
        Don&apos;t have an account?{" "}
        <Link
          href={PAGES.auth.register}
          className="underline underline-offset-4 text-main"
        >
          Sign up
        </Link>
      </div>
    </div>
  );
};

export default Login;
