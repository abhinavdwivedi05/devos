import React, { forwardRef } from "react";
import { cn } from "@/utils/cn";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = "text", label, error, ...props }, ref) => {
    return (
      <div className="w-full flex flex-col space-y-1.5">
        {label && (
          <label className="text-xs font-semibold text-muted select-none">
            {label}
          </label>
        )}
        <input
          type={type}
          ref={ref}
          className={cn(
            "flex h-10 w-full rounded-md border border-border bg-card px-3 py-2 text-sm text-foreground file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted/60 focus-visible:outline-hidden focus-visible:ring-1 focus-visible:ring-accent-blue focus-visible:border-accent-blue/50 disabled:cursor-not-allowed disabled:opacity-50 transition-all",
            error ? "border-accent-red focus-visible:ring-accent-red focus-visible:border-accent-red/50" : "",
            className
          )}
          {...props}
        />
        {error && <span className="text-[11px] text-accent-red mt-0.5">{error}</span>}
      </div>
    );
  }
);
Input.displayName = "Input";

export default Input;
