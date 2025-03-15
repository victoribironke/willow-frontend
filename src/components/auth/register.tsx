"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { IMAGES, PAGES } from "@/constants/constants";
import { useEffect, useState } from "react";
import { cn, validateEmail, validatePassword } from "@/lib/utils";
import { ArrowLeft, Eye, EyeOff, LoaderCircle } from "lucide-react";
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
import { registerUser, resendOtp, verifyOtp } from "@/lib/requests";
import { useRouter } from "next/navigation";
import { useSetRecoilState } from "recoil";
import { user_details } from "@/app/atoms/atoms";

const Register = () => {
  const [stage, setStage] = useState(1);
  const [description, setDescription] = useState("");
  const [accountType, setAccountType] = useState<AccountType>("CUSTOMER");
  const [email, setEmail] = useState("");
  const [otp, setOTP] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [timer, setTimer] = useState(60);
  const setUserDetails = useSetRecoilState(user_details);
  const [reloadTimer, setReloadTimer] = useState("");
  const router = useRouter();

  const register = async () => {
    setLoading(true);

    const { data, error } = await registerUser({
      businessName,
      email,
      firstname: fullName.split(" ")[0],
      lastname: fullName.split(" ")[1],
      password,
      role: accountType,
    });

    setLoading(false);

    if (error) {
      setError(error);
      return;
    }

    toast.success(data);
    setStage(3);
  };

  const vOtp = async () => {
    setLoading(true);

    const { data, error } = await verifyOtp(email, otp);

    setLoading(false);

    if (error) {
      setError(error);
      return;
    }

    setUserDetails(data);
    router.push(PAGES.dashboard.home);
  };

  const validate = () => {
    const isEmail = validateEmail(email);
    const isPassword = validatePassword(password);

    if (isEmail && (fullName || businessName) && isPassword.valid) register();
    else {
      if (
        (accountType === "CUSTOMER" && !fullName) ||
        (accountType === "SELLER" && !businessName)
      )
        setError("Please enter a valid name.");
      else if (!isEmail) setError("Please enter a valid email.");
      else if (!isPassword.valid) setError(isPassword.reason);
    }
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

  useEffect(() => {
    if (stage === 1) setDescription("What are you registering as?");
    else if (stage === 2)
      setDescription("Enter your details to continue the registration");
    else if (stage === 3)
      setDescription("We sent you an OTP to verify your email address");
  }, [stage]);

  useEffect(() => setError(""), [email, password, fullName, businessName, otp]);

  return (
    <div className="flex flex-col gap-6">
      {stage !== 1 && (
        <Button
          className="w-fit cursor-pointer"
          variant="ghost"
          onClick={() => setStage((k) => k - 1)}
        >
          <ArrowLeft /> Back
        </Button>
      )}

      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-semibold">Welcome to Willow</h1>
        <p className="text-balance text-sm text-muted-foreground">
          {description}
        </p>
      </div>

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
          <p className="text-red text-sm w-full text-center">{error}</p>
        )}

        <Button
          className="w-full bg-main hover:bg-main/90 cursor-pointer"
          onClick={() => validate()}
          disabled={loading}
        >
          Continue {loading && <LoaderCircle className="animate-spin" />}
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
          Verify & finish {loading && <LoaderCircle className="animate-spin" />}
        </Button>
      </div>

      <p className="w-full text-center text-muted-foreground text-sm font-medium">
        STEP {stage} OF 3
      </p>

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

export default Register;
