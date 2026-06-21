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
import { useState } from "react";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import Link from "next/link";

const FormSchema = z
  .object({
    newPassword: z.string().min(8, {
      message: "Password must be at least 8 characters long",
    }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export function ResetPasswordForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfPasswordVisible, setIsConfPasswordVisible] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams?.get("auth");

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      newPassword: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof FormSchema>) => {
    toast.loading("Resetting password...", {
      id: "reset-password-toast",
    });
    console.log(values, token);

    try {
      //! perform your api call here...
      toast.success("Password reset successfully", {
        id: "reset-password-toast",
      });
      router.push(`/login`);
    } catch (error: unknown) {
      console.log(error);
      toast.error("Failed to reset password", { id: "reset-password-toast" });
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
            Set a Password
          </CardTitle>
          <CardDescription className="text-xs md:text-sm text-zinc-400 mt-3 leading-relaxed max-w-xs mx-auto">
            Your previous password has been reset. Please set a new password for your account.
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-5">
              {/* new password */}
              <FormField
                control={form.control}
                name="newPassword"
                render={({ field }) => (
                  <FormItem className="flex flex-col gap-2">
                    <Label htmlFor="password font-semibold" className="text-sm font-semibold text-zinc-300">
                      Create Password
                    </Label>
                    <FormControl>
                      <div className="relative">
                        <Input
                          id="password"
                          type={isPasswordVisible ? "text" : "password"}
                          placeholder="••••••••••••"
                          className="bg-[#13161c] border border-zinc-800/80 text-white rounded-xl h-12 w-full pl-4 pr-12 placeholder:text-zinc-500 focus-visible:ring-2 focus-visible:ring-[#2ac5f4]/30 focus-visible:border-[#2ac5f4] transition-all"
                          {...field}
                        />
                        <span
                          onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                          className="text-zinc-500 absolute right-4 top-3.5 cursor-pointer hover:text-zinc-300 transition-colors"
                        >
                          {isPasswordVisible ? <EyeOffIcon className="size-5" /> : <EyeIcon className="size-5" />}
                        </span>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* confirm new password */}
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem className="flex flex-col gap-2">
                    <Label htmlFor="conf-password" className="text-sm font-semibold text-zinc-300">
                      Re-enter Password
                    </Label>
                    <FormControl>
                      <div className="relative">
                        <Input
                          id="conf-password"
                          type={isConfPasswordVisible ? "text" : "password"}
                          placeholder="••••••••••••"
                          className="bg-[#13161c] border border-zinc-800/80 text-white rounded-xl h-12 w-full pl-4 pr-12 placeholder:text-zinc-500 focus-visible:ring-2 focus-visible:ring-[#2ac5f4]/30 focus-visible:border-[#2ac5f4] transition-all"
                          {...field}
                        />
                        <span
                          onClick={() => setIsConfPasswordVisible(!isConfPasswordVisible)}
                          className="text-zinc-500 absolute right-4 top-3.5 cursor-pointer hover:text-zinc-300 transition-colors"
                        >
                          {isConfPasswordVisible ? <EyeOffIcon className="size-5" /> : <EyeIcon className="size-5" />}
                        </span>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* action button */}
              <div className="flex flex-col gap-4 items-center mt-3">
                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-[#00ADEF] to-[#3B82F6] hover:opacity-95 text-white font-extrabold h-12 rounded-xl transition-all shadow-[0_4px_20px_rgba(59,130,246,0.25)] active:scale-[0.98] border-none text-base"
                >
                  Reset Password
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
