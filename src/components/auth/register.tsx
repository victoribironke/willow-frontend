"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { IMAGES, PAGES } from "@/constants/constants";
import { useEffect, useState } from "react";
import { cn, validateEmail, validatePassword } from "@/lib/utils";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowLeft } from "lucide-react";
import toast from "react-hot-toast";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { AccountType } from "@/types/general";
import Image from "next/image";

const Register = () => {
  const [stage, setStage] = useState(1);
  const [description, setDescription] = useState("");
  const [accountType, setAccountType] = useState<AccountType>("CUSTOMER");
  const [email, setEmail] = useState("");
  const [otp, setOTP] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // const register = (e: FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();

  //   alert(`${email} ${password} ${fullName}`);
  // };

  const validateAndUpdateStage = () => {
    const isEmail = validateEmail(email);
    const isPassword = validatePassword(password);

    if (isEmail && (fullName || businessName) && isPassword.valid) setStage(3);
    else {
      if (
        (accountType === "CUSTOMER" && !fullName) ||
        (accountType === "SELLER" && !businessName)
      )
        toast.error("Please enter a valid name.");
      else if (!isEmail) toast.error("Please enter a valid email.");
      else if (!isPassword.valid) toast.error(isPassword.reason);
    }
  };

  useEffect(() => {
    if (stage === 1) setDescription("What are you registering as?");
    else if (stage === 2)
      setDescription("Enter your details to continue the registration");
    else if (stage === 3)
      setDescription("We sent you an OTP to verify your email address");
  }, [stage]);

  return (
    <div className="flex flex-col gap-6">
      <Button
        className="w-fit cursor-pointer"
        variant="ghost"
        onClick={() => stage !== 1 && setStage((k) => k - 1)}
      >
        <ArrowLeft /> Back
      </Button>

      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-semibold">Welcome to Willow</h1>
        <p className="text-balance text-sm text-muted-foreground">
          {description}
        </p>
      </div>

      <p className="w-full text-center text-muted-foreground text-sm font-medium">
        STEP {stage} OF 3
      </p>

      <div className={cn("gap-6", stage === 1 ? "grid" : "hidden")}>
        <Select
          value={accountType}
          onValueChange={(e) => setAccountType(e as AccountType)}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select an account type" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Account types</SelectLabel>
              <SelectItem value="CUSTOMER">Customer</SelectItem>
              <SelectItem value="SELLER">Seller</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>

        <Button
          className="w-full bg-main hover:bg-main/90 cursor-pointer"
          onClick={() => setStage(2)}
          disabled={!accountType}
        >
          Continue
        </Button>
      </div>

      <div className={cn("gap-6", stage === 2 ? "grid" : "hidden")}>
        {accountType === "CUSTOMER" ? (
          <div className="grid gap-2">
            <Label htmlFor="full-name">Full name</Label>
            <Input
              id="full-name"
              type="text"
              placeholder="John Doe"
              required
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
          </div>
        ) : (
          <div className="grid gap-2">
            <Label htmlFor="business-name">Business name</Label>
            <Input
              id="business-name"
              type="text"
              placeholder="Orion & Sons"
              required
              value={businessName}
              onChange={(e) => setBusinessName(e.target.value)}
            />
          </div>
        )}

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

        <div className="flex items-center space-x-2">
          <Checkbox
            id="show-password"
            checked={showPassword}
            onClick={() => setShowPassword((k) => !k)}
          />
          <Label htmlFor="show-password">Show password</Label>
        </div>

        <Button
          className="w-full bg-main hover:bg-main/90 cursor-pointer"
          onClick={() => validateAndUpdateStage()}
        >
          Continue
        </Button>
      </div>

      <div className={cn("gap-6", stage === 3 ? "grid" : "hidden")}>
        <Image
          src={IMAGES.mail.src}
          width={IMAGES.mail.w}
          height={IMAGES.mail.h}
          alt="Image"
          className="w-20 self-center justify-self-center"
        />

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

        <Button className="w-full bg-main hover:bg-main/90">Finish</Button>
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

export default Register;
