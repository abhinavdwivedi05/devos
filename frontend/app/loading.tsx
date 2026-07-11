"use client";

import React from "react";

export default function LoadingPage() {
  return (
    <div className="min-h-screen bg-[#0d1117] flex flex-col items-center justify-center p-6 text-center select-none font-mono">
      <div className="space-y-4">
        {/* Loading Spinner */}
        <div className="relative w-10 h-10 mx-auto">
          <div className="w-full h-full rounded-full border-2 border-border/60 border-t-accent-blue animate-spin" />
        </div>
        <p className="text-[10px] text-muted uppercase tracking-widest leading-none">
          Booting virtual modules...
        </p>
      </div>
    </div>
  );
}
