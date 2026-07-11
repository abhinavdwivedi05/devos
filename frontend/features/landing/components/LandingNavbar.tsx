"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { cn } from "@/utils/cn";

export function LandingNavbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const links = [
    { name: "Features", href: "#features" },
    { name: "Pricing", href: "#pricing" },
    { name: "Testimonials", href: "#testimonials" },
    { name: "FAQ", href: "#faq" },
  ];

  return (
    <nav className="sticky top-0 bg-[#0d1117]/80 backdrop-blur-md border-b border-border/50 h-16 flex items-center justify-between px-6 md:px-12 z-50 select-none">
      <Link href="/" className="flex items-center space-x-2">
        <span className="font-extrabold text-sm tracking-widest text-accent-blue bg-accent-blue/10 px-3 py-1 rounded-sm border border-accent-blue/20">
          DEVOS
        </span>
      </Link>

      {/* Desktop Links */}
      <div className="hidden md:flex items-center space-x-8 text-xs font-semibold text-muted">
        {links.map((link) => (
          <a
            key={link.name}
            href={link.href}
            className="hover:text-foreground transition-colors cursor-pointer"
          >
            {link.name}
          </a>
        ))}
      </div>

      <div className="hidden md:flex items-center space-x-4">
        <Link
          href="/auth/login"
          className="text-xs font-semibold text-muted hover:text-foreground transition-colors"
        >
          Sign In
        </Link>
        <Link
          href="/dashboard"
          className="bg-accent-blue hover:bg-accent-blue-hover text-background px-4 py-2 rounded-sm text-xs font-bold transition-all active:scale-95"
        >
          Launch Console
        </Link>
      </div>

      {/* Mobile Toggle */}
      <button
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        className="md:hidden text-muted hover:text-foreground p-1 cursor-pointer"
        aria-label="Toggle menu"
      >
        {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </button>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="absolute top-16 left-0 right-0 bg-[#0d1117]/95 border-b border-border flex flex-col p-6 space-y-4 md:hidden z-40 backdrop-blur-lg">
          {links.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="text-sm font-semibold text-muted hover:text-foreground transition-colors block"
            >
              {link.name}
            </a>
          ))}
          <div className="h-px bg-border/50 my-2" />
          <Link
            href="/auth/login"
            onClick={() => setMobileMenuOpen(false)}
            className="text-sm font-semibold text-muted hover:text-foreground transition-colors block"
          >
            Sign In
          </Link>
          <Link
            href="/dashboard"
            onClick={() => setMobileMenuOpen(false)}
            className="bg-accent-blue hover:bg-accent-blue-hover text-background px-4 py-2.5 rounded-sm text-sm font-bold text-center block"
          >
            Launch Console
          </Link>
        </div>
      )}
    </nav>
  );
}

export default LandingNavbar;
