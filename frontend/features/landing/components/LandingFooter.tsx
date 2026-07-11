import React from "react";
import Link from "next/link";
import { Terminal } from "lucide-react";

export function LandingFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-[#0d1117] py-12 px-6 select-none text-xs">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center space-x-3">
          <span className="font-extrabold text-sm tracking-widest text-accent-blue bg-accent-blue/10 px-2.5 py-1 rounded-sm border border-accent-blue/20">
            DEVOS
          </span>
          <span className="text-muted font-medium">The Operating System for Developers.</span>
        </div>

        <div className="flex items-center space-x-8 text-muted font-semibold">
          <Link href="/dashboard" className="hover:text-foreground transition-colors">
            Workspace
          </Link>
          <a href="#features" className="hover:text-foreground transition-colors">
            Features
          </a>
          <a href="#pricing" className="hover:text-foreground transition-colors">
            Pricing
          </a>
          <Link href="/auth/login" className="hover:text-foreground transition-colors">
            Account login
          </Link>
        </div>

        <div className="text-muted/65 font-medium">
          &copy; {currentYear} DevOS Inc. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

export default LandingFooter;
