"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Terminal, ArrowRight } from "lucide-react";
import { Github } from "@/components/ui/BrandIcons";

export function LandingHero() {
  return (
    <section className="relative overflow-hidden pt-20 pb-16 md:pt-32 md:pb-24 flex flex-col items-center justify-center text-center px-6 select-none bg-radial-[circle_at_top] from-accent-blue/10 via-[#0d1117] to-[#0d1117]">
      {/* Decorative radial gradients for glowing backdrop */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-accent-blue/15 rounded-full blur-[120px] pointer-events-none -z-10" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="space-y-6 max-w-4xl"
      >
        <span className="inline-flex items-center space-x-2 bg-accent-blue/10 border border-accent-blue/20 text-accent-blue px-3.5 py-1 rounded-full text-xs font-semibold leading-none shadow-md">
          <Terminal className="h-3 w-3 animate-pulse" />
          <span>DevOS Beta Release v1.0.0</span>
        </span>

        <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-foreground leading-[1.1] max-w-3xl mx-auto">
          The Operating System <br />
          <span className="bg-gradient-to-r from-accent-blue via-accent-purple to-accent-blue bg-300% animate-gradient text-transparent bg-clip-text">
            for Developers
          </span>
        </h1>

        <p className="text-sm sm:text-lg text-muted max-w-2xl mx-auto leading-relaxed font-medium">
          DevOS combines GitHub analytics, LeetCode trackers, projects board, markdown notes, resume ATS scoring, job trackers, and AI mentors in one dark-first, highly responsive workspace dashboard.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <Link
            href="/dashboard"
            className="w-full sm:w-auto bg-accent-blue hover:bg-accent-blue-hover text-background px-6 py-3 rounded-md text-sm font-bold shadow-lg transition-all active:scale-95 flex items-center justify-center space-x-2"
          >
            <span>Start Free Workspace</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
          <a
            href="https://github.com"
            target="_blank"
            rel="noreferrer"
            className="w-full sm:w-auto bg-card border border-border hover:bg-border/30 text-foreground px-6 py-3 rounded-md text-sm font-bold transition-all active:scale-95 flex items-center justify-center space-x-2 cursor-pointer"
          >
            <Github className="h-4 w-4" />
            <span>GitHub Repository</span>
          </a>
        </div>
      </motion.div>

      {/* Decorative Mockup Panel */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.8 }}
        className="w-full max-w-5xl mt-16 md:mt-24 rounded-md border border-border bg-[#161b22]/70 shadow-2xl p-2.5 backdrop-blur-md relative"
      >
        <div className="flex items-center space-x-1.5 px-4 py-2 border-b border-border/60">
          <div className="w-2.5 h-2.5 rounded-full bg-[#f85149]" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#f0883e]" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#3fb950]" />
          <div className="flex-1 text-[10px] text-muted font-mono text-center">alex@devos:~</div>
        </div>
        
        {/* Mock screenshot of dashboard */}
        <div className="w-full h-[250px] sm:h-[450px] bg-background/50 rounded-xs flex flex-col items-center justify-center overflow-hidden border border-border/30 p-8 relative">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center space-y-3 z-10 select-none">
            <span className="font-extrabold text-xl tracking-widest text-accent-blue bg-accent-blue/10 px-6 py-3 rounded-sm border border-accent-blue/20">
              LAUNCH CONSOLE
            </span>
            <p className="text-[11px] text-muted font-mono leading-relaxed mt-2 uppercase tracking-wide">
              Initialize DevOS virtual directory modules...
            </p>
          </div>
          <div className="grid grid-cols-3 gap-4 w-full h-full opacity-15 filter blur-xs select-none">
            <div className="border border-border bg-card/65 rounded-md p-4 flex flex-col justify-between" />
            <div className="border border-border bg-card/65 rounded-md p-4 col-span-2" />
            <div className="border border-border bg-card/65 rounded-md p-4 col-span-2" />
            <div className="border border-border bg-card/65 rounded-md p-4" />
          </div>
        </div>
      </motion.div>
    </section>
  );
}

export default LandingHero;
