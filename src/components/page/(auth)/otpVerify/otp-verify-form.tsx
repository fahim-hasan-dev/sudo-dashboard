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
import { useSearchParams, useRouter } from "next/navigation";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { myFetch } from "@/utils/myFetch";
import { useState } from "react";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import Link from "next/link";

const FormSchema = z.object({
  oneTimeCode: z.string().min(4, {
    message: "Code must be at least 4 characters.",
  }),
});

export function OtpVerifyForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams?.get("email") || "noura@gmail.com";
  const [isCodeVisible, setIsCodeVisible] = useState(true);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      oneTimeCode: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof FormSchema>) => {
    toast.loading("Verifying...", {
      id: "verify-otp-toast",
    });

    const payload = {
      oneTimeCode: values.oneTimeCode,
      email,
    };
    console.log(payload);

    try {
      //! perform your api call here...
      toast.success("OTP verified successfully", { id: "verify-otp-toast" });
      router.push(`/reset-password?auth=demoAuthToken`);
    } catch (error: unknown) {
      console.log(error);
    }
  };

  const handleResend = async () => {
    toast.loading("Sending...", {
      id: "resend-otp-toast",
    });
    try {
      const res = await myFetch("/auth/forget-password", {
        method: "POST",
        body: { email },
      });

      if (res?.success) {
        toast.success(res?.message as string, { id: "resend-otp-toast" });
      } else {
        toast.error(res?.message || "Failed to resend", {
          id: "resend-otp-toast",
        });
      }
    } catch (error: unknown) {
      console.log("Error fetching data:", error);
      toast.error("Failed to resend verification code", { id: "resend-otp-toast" });
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
            Verify Code
          </CardTitle>
          <CardDescription className="text-xs md:text-sm text-zinc-400 mt-3 leading-relaxed max-w-sm mx-auto">
            An Authentication code has been sent to your email
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-5">
              {/* code input */}
              <FormField
                control={form.control}
                name="oneTimeCode"
                render={({ field }) => (
                  <FormItem className="flex flex-col gap-2">
                    <Label htmlFor="oneTimeCode" className="text-sm font-semibold text-zinc-300">
                      Enter Code
                    </Label>
                    <FormControl>
                      <div className="relative">
                        <Input
                          id="oneTimeCode"
                          type={isCodeVisible ? "text" : "password"}
                          placeholder="e.g. 7789BM6X"
                          required
                          className="bg-[#13161c] border border-zinc-800/80 text-white rounded-xl h-12 w-full pl-4 pr-12 placeholder:text-zinc-500 focus-visible:ring-2 focus-visible:ring-[#2ac5f4]/30 focus-visible:border-[#2ac5f4] transition-all"
                          {...field}
                        />
                        <span
                          onClick={() => setIsCodeVisible(!isCodeVisible)}
                          className="text-zinc-500 absolute right-4 top-3.5 cursor-pointer hover:text-zinc-300 transition-colors"
                        >
                          {isCodeVisible ? <EyeIcon className="size-5" /> : <EyeOffIcon className="size-5" />}
                        </span>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* resend row */}
              <div className="text-xs sm:text-sm text-zinc-400 mt-1 select-none">
                Didn&apos;t receive a code?{" "}
                <span
                  onClick={handleResend}
                  className="font-bold text-red-500 hover:text-red-400 cursor-pointer transition-colors hover:underline"
                >
                  Resend
                </span>
              </div>

              {/* actions buttons */}
              <div className="flex flex-col gap-4 items-center mt-3">
                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-[#00ADEF] to-[#3B82F6] hover:opacity-95 text-white font-extrabold h-12 rounded-xl transition-all shadow-[0_4px_20px_rgba(59,130,246,0.25)] active:scale-[0.98] border-none text-base"
                >
                  Next
                </Button>
                <Link
                  href="/login"
                  className="text-xs sm:text-sm font-bold text-zinc-400 hover:text-white transition-colors mt-2"
                >
                  Back to login
                </Link>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
