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

// Login Validation Schema
const loginSchema = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email format"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { updateProfile } = useStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (data: LoginFormValues) => {
    setIsLoading(true);
    // Simulate API delay
    setTimeout(() => {
      setIsLoading(false);
      // Seed name from email if needed
      const name = data.email.split("@")[0];
      updateProfile({
        name: name.charAt(0).toUpperCase() + name.slice(1),
        username: name.toLowerCase(),
      });
      toast("Welcome back to DevOS!", "success");
      router.push("/dashboard");
    }, 1200);
  };

  const handleOAuthLogin = (provider: "GitHub" | "Google") => {
    toast(`Connecting to ${provider}...`, "info");
    setTimeout(() => {
      toast(`Successfully authenticated via ${provider}!`, "success");
      router.push("/dashboard");
    }, 800);
  };

  return (
    <div className="space-y-6 select-none">
      <div className="space-y-1">
        <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground">
          Welcome back
        </h1>
        <p className="text-xs text-muted font-medium">
          Enter your email to sign in to your workspace account.
        </p>
      </div>

      {/* Social Login Buttons */}
      <div className="grid grid-cols-2 gap-3">
        <Button
          variant="secondary"
          size="sm"
          className="flex items-center space-x-2 text-xs font-semibold"
          onClick={() => handleOAuthLogin("GitHub")}
        >
          <Github className="h-4 w-4" />
          <span>GitHub</span>
        </Button>
        <Button
          variant="secondary"
          size="sm"
          className="flex items-center space-x-2 text-xs font-semibold"
          onClick={() => handleOAuthLogin("Google")}
        >
          {/* Custom Google Icon */}
          <svg className="h-4 w-4 fill-current shrink-0" viewBox="0 0 24 24">
            <path d="M12.24 10.285V14.4h6.887c-.648 2.41-2.519 4.114-5.136 4.114-3.513 0-6.386-2.873-6.386-6.386 0-3.513 2.873-6.386 6.386-6.386 1.705 0 3.23.67 4.38 1.748l3.078-3.078C18.665 1.5 15.65 0 12.24 0 5.48 0 0 5.48 0 12.24s5.48 12.24 12.24 12.24c6.88 0 12.24-5.48 12.24-12.24 0-.768-.08-1.536-.24-2.285H12.24z" />
          </svg>
          <span>Google</span>
        </Button>
      </div>

      {/* Divider */}
      <div className="relative flex items-center justify-center">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-border/60" />
        </div>
        <span className="relative bg-[#0d1117] px-3.5 text-[10px] font-bold text-muted uppercase tracking-wider">
          Or continue with email
        </span>
      </div>

      {/* Email Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
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

        <div className="flex items-center justify-between text-[11px] font-bold select-none pt-0.5">
          <Link
            href="/auth/forgot-password"
            className="text-accent-blue hover:underline hover:text-accent-blue-hover"
          >
            Forgot Password?
          </Link>
        </div>

        <Button type="submit" isLoading={isLoading} className="w-full text-xs font-bold py-2.5">
          Sign In with Email
        </Button>
      </form>

      <div className="text-center text-[11px] text-muted font-medium pt-2">
        Don&apos;t have an account?{" "}
        <Link href="/auth/signup" className="text-accent-blue hover:underline font-bold">
          Sign up
        </Link>
      </div>
    </div>
  );
}
