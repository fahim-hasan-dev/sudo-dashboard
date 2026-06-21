"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import Link from "next/link";
import toast from "react-hot-toast";
import { useRouter, useSearchParams } from "next/navigation";

export function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const router = useRouter();
  const redirect = useSearchParams().get("redirect");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    toast.loading("Logging in...", {
      id: "login",
    });
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const payload = {
      email: formData.get("email"),
      password: formData.get("password"),
    };
    console.log(payload);

    try {
      //! perform your api call here..
      toast.success("Login successful", { id: "login" });
      router.push(redirect || "/");
    } catch (error: unknown) {
      console.log("Error fetching data:", error);
    }
  };

  return (
    <div className={cn("w-full flex flex-col gap-6", className)} {...props}>
      <Card className="w-full bg-[#0e1015]/60 backdrop-blur-xl border border-[#2ac5f4]/20 rounded-2xl p-6 sm:p-8 md:p-12 shadow-[0_0_50px_-12px_rgba(42,197,244,0.15)] flex flex-col gap-6 text-white">
        <CardHeader className="text-center p-0 flex flex-col gap-1">
          {/* Logo container omitted per user request. Easily re-enabled. */}
          {/* 
          <figure className="flex justify-center mb-4 h-16">
            <img src="/logo.png" alt="logo" className="object-contain" />
          </figure> 
          */}
          <CardTitle className="text-4xl md:text-5xl font-extrabold text-white tracking-tight">
            Welcome!
          </CardTitle>
          <CardDescription className="text-lg md:text-xl font-bold text-white mt-1">
            to Admin Dashboard.
          </CardDescription>
          <p className="text-xs md:text-sm text-zinc-400 max-w-sm mx-auto mt-3 leading-relaxed">
            Please sign in to access your admin dashboard and manage your platform securely
          </p>
        </CardHeader>
        <CardContent className="p-0">
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            {/* email */}
            <div className="flex flex-col gap-2">
              <Label htmlFor="email" className="text-sm font-semibold text-zinc-300 flex items-center">
                Email<span className="text-red-500 ml-0.5">*</span>
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="noura@gmail.com"
                required
                className="bg-[#13161c] border border-zinc-800/80 text-white rounded-xl h-12 w-full px-4 placeholder:text-zinc-500 focus-visible:ring-2 focus-visible:ring-[#2ac5f4]/30 focus-visible:border-[#2ac5f4] transition-all"
              />
            </div>
            {/* password */}
            <div className="flex flex-col gap-2">
              <Label htmlFor="password" className="text-sm font-semibold text-zinc-300 flex items-center">
                Password<span className="text-red-500 ml-0.5">*</span>
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  name="password"
                  type={isPasswordVisible ? "text" : "password"}
                  placeholder="••••••••••••"
                  required
                  className="bg-[#13161c] border border-zinc-800/80 text-white rounded-xl h-12 w-full pl-4 pr-12 placeholder:text-zinc-500 focus-visible:ring-2 focus-visible:ring-[#2ac5f4]/30 focus-visible:border-[#2ac5f4] transition-all"
                />
                <span
                  onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                  className="text-zinc-500 absolute right-4 top-3.5 cursor-pointer hover:text-zinc-300 transition-colors"
                >
                  {isPasswordVisible ? <EyeOffIcon className="size-5" /> : <EyeIcon className="size-5" />}
                </span>
              </div>
            </div>
            {/* remember & forgot row */}
            <div className="flex items-center justify-between mt-1 select-none">
              <div className="flex items-center space-x-2.5">
                <Checkbox
                  id="remember"
                  className="size-4.5 rounded border-zinc-700/80 bg-[#13161c] text-white focus-visible:ring-[#2ac5f4]/30 data-[state=checked]:bg-[#2ac5f4] data-[state=checked]:border-[#2ac5f4]"
                />
                <label
                  htmlFor="remember"
                  className="text-xs sm:text-sm font-medium text-zinc-400 cursor-pointer"
                >
                  Remember me
                </label>
              </div>
              <Link
                href="/forgot-password"
                className="text-xs sm:text-sm font-bold text-red-500 hover:text-red-400 transition-colors"
              >
                Forgot Password?
              </Link>
            </div>
            {/* submit button */}
            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-[#00ADEF] to-[#3B82F6] hover:opacity-95 text-white font-extrabold h-12 rounded-xl mt-4 transition-all shadow-[0_4px_20px_rgba(59,130,246,0.25)] active:scale-[0.98] border-none text-base"
            >
              Login
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
