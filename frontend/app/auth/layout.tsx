"use client";

import React from "react";
import Link from "next/link";
import { Terminal } from "lucide-react";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2 bg-[#0d1117] select-none">
      {/* Left panel: Product Branding & Terminal Mockup */}
      <div className="hidden lg:flex flex-col justify-between p-12 bg-radial-[circle_at_left] from-accent-blue/10 via-[#0d1117] to-[#0d1117] border-r border-border/60 relative overflow-hidden">
        {/* Glow */}
        <div className="absolute top-1/4 left-0 w-[400px] h-[400px] bg-accent-blue/15 rounded-full blur-[100px] pointer-events-none" />

        {/* Brand */}
        <Link href="/" className="flex items-center space-x-2 z-10">
          <span className="font-extrabold text-sm tracking-widest text-accent-blue bg-accent-blue/10 px-3 py-1 rounded-sm border border-accent-blue/20">
            DEVOS
          </span>
        </Link>

        {/* Terminal Illustration */}
        <div className="w-full max-w-md mx-auto bg-[#161b22]/80 border border-border p-4 rounded-md shadow-2xl backdrop-blur-md z-10 font-mono text-xs select-none">
          <div className="flex items-center space-x-1.5 border-b border-border/60 pb-2.5 mb-3">
            <div className="w-2.5 h-2.5 rounded-full bg-[#f85149]" />
            <div className="w-2.5 h-2.5 rounded-full bg-[#f0883e]" />
            <div className="w-2.5 h-2.5 rounded-full bg-[#3fb950]" />
            <span className="text-[10px] text-muted ml-2">devos-kernel.sh</span>
          </div>

          <div className="space-y-1.5 text-muted/95 leading-relaxed">
            <p className="text-accent-blue font-bold">$ devos init --workspace</p>
            <p className="text-accent-green">✓ Initialized virtual folder directories...</p>
            <p>✓ Connected GitHub commit metrics hooks (alexrivera)</p>
            <p>✓ Connected LeetCode algorithms scoreboard</p>
            <p>✓ AI Mentor career advisor activated (mode: general)</p>
            <p className="text-accent-blue mt-3">$ devos status --health</p>
            <p className="text-[#f0883e]">● Workspace offline (Awaiting authentication credentials...)</p>
          </div>
        </div>

        {/* Footer info */}
        <div className="text-[11px] text-muted z-10 font-medium">
          &copy; {new Date().getFullYear()} DevOS Inc. All systems operational.
        </div>
      </div>

      {/* Right panel: Form Views */}
      <div className="flex items-center justify-center p-8 bg-[#0d1117] relative">
        <div className="absolute top-8 right-8 lg:hidden">
          <Link href="/" className="font-extrabold text-xs tracking-widest text-accent-blue bg-accent-blue/10 px-2.5 py-1.5 rounded-sm border border-accent-blue/20">
            DEVOS
          </Link>
        </div>
        <div className="w-full max-w-sm flex flex-col justify-center">
          {children}
        </div>
      </div>
    </div>
  );
}
