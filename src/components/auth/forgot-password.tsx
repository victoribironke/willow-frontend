"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { PAGES } from "@/constants/constants";
import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // const login = (e: FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();

  //   alert(`${email} ${password}`);
  // };

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

        <Button className="w-full bg-main hover:bg-main/90" type="submit">
          Send password reset link
        </Button>
      </div>

      <div className="text-center text-sm">
        Already have an account?{" "}
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
