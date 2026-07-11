import React, { forwardRef } from "react";
import { cn } from "@/utils/cn";

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, label, error, ...props }, ref) => {
    return (
      <div className="w-full flex flex-col space-y-1.5">
        {label && (
          <label className="text-xs font-semibold text-muted select-none">
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          className={cn(
            "flex min-h-[80px] w-full rounded-md border border-border bg-card px-3 py-2 text-sm text-foreground placeholder:text-muted/60 focus-visible:outline-hidden focus-visible:ring-1 focus-visible:ring-accent-blue focus-visible:border-accent-blue/50 disabled:cursor-not-allowed disabled:opacity-50 transition-all resize-y",
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
Textarea.displayName = "Textarea";

export default Textarea;
