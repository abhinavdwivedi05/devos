import React from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { cn } from "@/utils/cn";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  className?: string;
}

export function Breadcrumbs({ items, className }: BreadcrumbsProps) {
  return (
    <nav aria-label="Breadcrumb" className={cn("flex items-center space-x-1.5 text-xs text-muted", className)}>
      {items.map((item, idx) => {
        const isLast = idx === items.length - 1;
        return (
          <div key={idx} className="flex items-center space-x-1.5">
            {idx > 0 && <ChevronRight className="h-3 w-3 text-muted/50" />}
            {item.href && !isLast ? (
              <Link
                href={item.href}
                className="hover:text-foreground hover:underline transition-colors font-medium"
              >
                {item.label}
              </Link>
            ) : (
              <span className={cn("font-medium", isLast ? "text-foreground font-semibold" : "")}>
                {item.label}
              </span>
            )}
          </div>
        );
      })}
    </nav>
  );
}

export default Breadcrumbs;
