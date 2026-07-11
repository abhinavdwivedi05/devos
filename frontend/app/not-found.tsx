"use client";

import React from "react";
import Link from "next/link";
import { Terminal, AlertTriangle, ArrowRight } from "lucide-react";
import Button from "@/components/ui/Button";

export default function NotFoundPage() {
  return (
    <div className="min-h-screen bg-[#0d1117] flex flex-col items-center justify-center p-6 text-center select-none">
      <div className="w-full max-w-md bg-[#161b22] border border-border rounded-md shadow-2xl p-6 space-y-6">
        <div className="flex items-center space-x-1.5 border-b border-border/60 pb-3 font-mono text-xs select-none">
          <div className="w-2.5 h-2.5 rounded-full bg-[#f85149]" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#f0883e]" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#3fb950]" />
          <span className="text-[10px] text-muted ml-2">devos-kernel-error.sh</span>
        </div>

        <div className="space-y-3 font-mono">
          <AlertTriangle className="h-10 w-10 text-accent-red mx-auto" />
          <h1 className="text-sm font-bold text-foreground">ERROR 404: DIRECTORY_NOT_FOUND</h1>
          <p className="text-[11px] text-muted leading-relaxed font-semibold max-w-xs mx-auto">
            The workspace segment you are trying to boot could not be mapped to any logical path.
          </p>
        </div>

        <div className="h-px bg-border/40" />

        <Link href="/dashboard" className="block">
          <Button variant="default" className="w-full text-xs font-bold py-2.5 flex items-center justify-center space-x-2">
            <span>Reboot Console</span>
            <ArrowRight className="h-4 w-4" />
          </Button>
        </Link>
      </div>
    </div>
  );
}
