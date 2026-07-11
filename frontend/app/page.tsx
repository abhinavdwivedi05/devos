import React from "react";
import LandingNavbar from "@/features/landing/components/LandingNavbar";
import LandingHero from "@/features/landing/components/LandingHero";
import LandingFeatures from "@/features/landing/components/LandingFeatures";
import LandingPricing from "@/features/landing/components/LandingPricing";
import LandingFAQ from "@/features/landing/components/LandingFAQ";
import LandingFooter from "@/features/landing/components/LandingFooter";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-[#0d1117] text-foreground">
      <LandingNavbar />
      <main className="flex-1">
        <LandingHero />
        <LandingFeatures />
        <LandingPricing />
        <LandingFAQ />
      </main>
      <LandingFooter />
    </div>
  );
}
