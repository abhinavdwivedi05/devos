"use client";

import React, { useState } from "react";
import { cn } from "@/utils/cn";

export interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  src?: string;
  alt?: string;
  fallback?: string;
  size?: "sm" | "md" | "lg";
}

export function Avatar({ src, alt = "avatar", fallback, size = "md", className, ...props }: AvatarProps) {
  const [error, setError] = useState(false);

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .slice(0, 2)
      .join("")
      .toUpperCase();
  };

  return (
    <div
      className={cn(
        "relative flex shrink-0 overflow-hidden rounded-full border border-border bg-card select-none items-center justify-center font-semibold text-muted text-xs",
        {
          "h-6 w-6 text-[10px]": size === "sm",
          "h-9 w-9 text-xs": size === "md",
          "h-12 w-12 text-sm": size === "lg",
        },
        className
      )}
      {...props}
    >
      {src && !error ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={src}
          alt={alt}
          onError={() => setError(true)}
          className="h-full w-full object-cover"
        />
      ) : (
        <span>{fallback ? getInitials(fallback) : alt.substring(0, 2).toUpperCase()}</span>
      )}
    </div>
  );
}

export default Avatar;
