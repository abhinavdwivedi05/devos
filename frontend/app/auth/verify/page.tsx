"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "@/components/ui/Toast";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";

const verifySchema = z.object({
  code: z.string().length(6, "Code must be exactly 6 digits").regex(/^\d+$/, "Code must be numeric"),
});

type VerifyFormValues = z.infer<typeof verifySchema>;

export default function VerifyPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<VerifyFormValues>({
    resolver: zodResolver(verifySchema),
    defaultValues: { code: "" },
  });

  const onSubmit = (data: VerifyFormValues) => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      toast("Email verified! Redirecting to Dashboard...", "success");
      router.push("/dashboard");
    }, 1200);
  };

  const handleResendCode = () => {
    toast("A new code has been sent to your email.", "info");
  };

  return (
    <div className="space-y-6 select-none">
      <div className="space-y-1">
        <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground">
          Verify Email
        </h1>
        <p className="text-xs text-muted font-medium">
          We sent a 6-digit verification code to your email. Enter it below to unlock DevOS.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
        <Input
          type="text"
          label="Verification Code"
          placeholder="123456"
          maxLength={6}
          error={errors.code?.message}
          {...register("code")}
        />

        <Button type="submit" isLoading={isLoading} className="w-full text-xs font-bold py-2.5">
          Verify Account
        </Button>
      </form>

      <div className="text-center text-[11px] text-muted font-medium pt-2 select-none">
        Didn&apos;t receive code?{" "}
        <button
          onClick={handleResendCode}
          className="text-accent-blue hover:underline font-bold cursor-pointer bg-transparent border-none p-0"
        >
          Resend code
        </button>
      </div>
    </div>
  );
}
