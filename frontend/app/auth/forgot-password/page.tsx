"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "@/components/ui/Toast";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";

const forgotSchema = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email format"),
});

type ForgotFormValues = z.infer<typeof forgotSchema>;

export default function ForgotPasswordPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotFormValues>({
    resolver: zodResolver(forgotSchema),
    defaultValues: { email: "" },
  });

  const onSubmit = (data: ForgotFormValues) => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setIsSent(true);
      toast("Password reset link sent to your email!", "success");
    }, 1200);
  };

  return (
    <div className="space-y-6 select-none">
      <div className="space-y-1">
        <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground">
          Reset Password
        </h1>
        <p className="text-xs text-muted font-medium">
          {isSent
            ? "Check your email for instructions to reset your password."
            : "Enter your email address and we will send you a reset link."}
        </p>
      </div>

      {isSent ? (
        <div className="space-y-4">
          <div className="p-4 rounded-md bg-accent-blue/10 border border-accent-blue/20 text-xs text-foreground leading-relaxed">
            We have emailed a password reset link to your address. Please click the link inside the email to finalize.
          </div>
          <Link href="/auth/login" className="block">
            <Button variant="secondary" className="w-full text-xs font-bold py-2.5">
              Return to Sign In
            </Button>
          </Link>
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
          <Input
            type="email"
            label="Email Address"
            placeholder="name@example.com"
            error={errors.email?.message}
            {...register("email")}
          />

          <Button type="submit" isLoading={isLoading} className="w-full text-xs font-bold py-2.5">
            Send Reset Link
          </Button>
        </form>
      )}

      {!isSent && (
        <div className="text-center text-[11px] text-muted font-medium pt-2">
          Remember your password?{" "}
          <Link href="/auth/login" className="text-accent-blue hover:underline font-bold">
            Sign in
          </Link>
        </div>
      )}
    </div>
  );
}
