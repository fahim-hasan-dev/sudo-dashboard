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
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { myFetch } from "@/utils/myFetch";

export function ForgotPasswordForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    toast.loading("Sending...", {
      id: "forgot-password-toast",
    });
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email");
    const payload = {
      email,
    };

    try {
      const res = await myFetch("/auth/forget-password", {
        method: "POST",
        body: payload,
      });

      if (res?.success) {
        toast.success(res?.message || "OTP sent to your email", { id: "forgot-password-toast" });
        router.push(`/otp-verify?email=${email}`);
      } else {
        toast.error(res?.message || "Failed to send OTP", { id: "forgot-password-toast" });
      }
    } catch (error: unknown) {
      console.log("Error fetching data:", error);
      toast.error("An error occurred", { id: "forgot-password-toast" });
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
          <CardTitle className="text-3xl font-extrabold text-white tracking-tight">
            Forgot your password?
          </CardTitle>
          <CardDescription className="text-xs md:text-sm text-zinc-450 mt-3 leading-relaxed max-w-sm mx-auto">
            Enter the email address associated with your account. We&apos;ll send you a verification code to your email.
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
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
            {/* actions row */}
            <div className="flex flex-col gap-4 items-center">
              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-[#00ADEF] to-[#3B82F6] hover:opacity-95 text-white font-extrabold h-12 rounded-xl transition-all shadow-[0_4px_20px_rgba(59,130,246,0.25)] active:scale-[0.98] border-none text-base"
              >
                Send Verification Code
              </Button>
              <Link
                href="/login"
                className="text-xs sm:text-sm font-bold text-zinc-400 hover:text-white transition-colors mt-2"
              >
                Back to login
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
