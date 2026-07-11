import React from "react";
import { cn } from "@/utils/cn";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "secondary" | "outline" | "success" | "warning" | "danger" | "info" | "purple";
}

export function Badge({ className, variant = "default", children, ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-sm px-2 py-0.5 text-xs font-semibold select-none border",
        {
          "bg-accent-blue/10 text-accent-blue border-accent-blue/20": variant === "default" || variant === "info",
          "bg-card text-muted border-border": variant === "secondary",
          "bg-transparent text-foreground border-border": variant === "outline",
          "bg-accent-green/10 text-accent-green border-accent-green/20": variant === "success",
          "bg-accent-orange/10 text-accent-orange border-accent-orange/20": variant === "warning",
          "bg-accent-red/10 text-accent-red border-accent-red/20": variant === "danger",
          "bg-accent-purple/10 text-accent-purple border-accent-purple/20": variant === "purple",
        },
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}

export default Badge;
