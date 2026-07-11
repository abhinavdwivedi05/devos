"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/utils/cn";

export interface TabOption {
  id: string;
  label: string;
}

export interface TabsProps {
  tabs: TabOption[];
  activeTab: string;
  onChange: (id: string) => void;
  className?: string;
  variant?: "pill" | "underline";
}

export function Tabs({ tabs, activeTab, onChange, className, variant = "pill" }: TabsProps) {
  return (
    <div
      className={cn(
        "flex select-none",
        {
          "bg-card/50 border border-border p-1 rounded-md space-x-1": variant === "pill",
          "border-b border-border space-x-6": variant === "underline",
        },
        className
      )}
    >
      {tabs.map((tab) => {
        const isActive = tab.id === activeTab;
        return (
          <button
            key={tab.id}
            onClick={() => onChange(tab.id)}
            className={cn(
              "relative px-3 py-1.5 text-xs font-medium transition-colors cursor-pointer",
              {
                // Pill styles (like Raycast and Linear tabs)
                "rounded-sm text-muted hover:text-foreground z-10": variant === "pill",
                "text-foreground font-semibold": variant === "pill" && isActive,
                // Underline styles (like Github tabs)
                "text-muted hover:text-foreground pb-3 -mb-px border-b-2 border-transparent":
                  variant === "underline",
                "text-accent-blue border-accent-blue font-semibold":
                  variant === "underline" && isActive,
              }
            )}
          >
            {variant === "pill" && isActive && (
              <motion.div
                layoutId="active-tab-pill"
                className="absolute inset-0 bg-border/60 rounded-sm -z-10"
                transition={{ type: "spring", stiffness: 380, damping: 30 }}
              />
            )}
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}

export default Tabs;
