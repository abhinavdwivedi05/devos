"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Eye, EyeOff } from "lucide-react";
import { Github } from "@/components/ui/BrandIcons";
import { useStore } from "@/store/useStore";
import { toast } from "@/components/ui/Toast";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";

// Signup Schema
const signupSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().min(1, "Email is required").email("Invalid email format"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type SignupFormValues = z.infer<typeof signupSchema>;

export default function SignupPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { updateProfile } = useStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = (data: SignupFormValues) => {
    setIsLoading(true);
    // Simulate API delay
    setTimeout(() => {
      setIsLoading(false);
      updateProfile({
        name: data.name,
        username: data.email.split("@")[0].toLowerCase(),
      });
      toast("Account created! Please verify your email.", "success");
      router.push("/auth/verify");
    }, 1200);
  };

  return (
    <div className="space-y-6 select-none">
      <div className="space-y-1">
        <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground">
          Create an account
        </h1>
        <p className="text-xs text-muted font-medium">
          Enter your details below to bootstrap your developer console.
        </p>
      </div>

      {/* Email Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
        <Input
          type="text"
          label="Full Name"
          placeholder="Alex Rivera"
          error={errors.name?.message}
          {...register("name")}
        />

        <Input
          type="email"
          label="Email Address"
          placeholder="name@example.com"
          error={errors.email?.message}
          {...register("email")}
        />

        <div className="relative">
          <Input
            type={showPassword ? "text" : "password"}
            label="Password"
            placeholder="••••••••"
            error={errors.password?.message}
            {...register("password")}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute top-7 right-3.5 text-muted hover:text-foreground cursor-pointer"
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        </div>

        <Button type="submit" isLoading={isLoading} className="w-full text-xs font-bold py-2.5">
          Sign Up with Email
        </Button>
      </form>

      <div className="text-center text-[11px] text-muted font-medium pt-2">
        Already have an account?{" "}
        <Link href="/auth/login" className="text-accent-blue hover:underline font-bold">
          Sign in
        </Link>
      </div>
    </div>
  );
}
