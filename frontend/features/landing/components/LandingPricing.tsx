"use client";

import React, { useState } from "react";
import { Check } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/Card";
import Button from "@/components/ui/Button";

interface PricingPlan {
  name: string;
  monthlyPrice: number;
  yearlyPrice: number;
  description: string;
  features: string[];
  cta: string;
  isPopular?: boolean;
}

export function LandingPricing() {
  const [billingPeriod, setBillingPeriod] = useState<"monthly" | "yearly">("monthly");

  const plans: PricingPlan[] = [
    {
      name: "Hobbyist",
      monthlyPrice: 0,
      yearlyPrice: 0,
      description: "Basic features for personal developers looking to track tasks and journals.",
      features: [
        "Up to 3 active projects",
        "Markdown notes folder structures",
        "Standard Tasks Kanban view",
        "LeetCode difficulty metric breakdown",
        "Weekly email summaries",
      ],
      cta: "Get Started",
    },
    {
      name: "Developer",
      monthlyPrice: 19,
      yearlyPrice: 15,
      description: "Complete developer platform with automated GitHub tracking and AI career assistants.",
      features: [
        "Unlimited tasks and projects boards",
        "Interactive GitHub Contribution charts",
        "ATS Resume Score analyzes (v3)",
        "AI roadmaps and mock interviews feedback",
        "Connect GitHub & Leetcode APIs",
        "Priority customer support",
      ],
      cta: "Unlock Developer Mode",
      isPopular: true,
    },
    {
      name: "Enterprise",
      monthlyPrice: 49,
      yearlyPrice: 39,
      description: "Collaborative features for developer teams, bootcamps and recruiting agencies.",
      features: [
        "Includes everything in Developer plan",
        "Collaborative Kanban boards (5+ seats)",
        "Automated candidate ATS ranking logs",
        "Custom interview checklist guides",
        "SLA 24/7 technical support response",
        "Custom workspace analytics panels",
      ],
      cta: "Contact Sales",
    },
  ];

  return (
    <section id="pricing" className="py-20 md:py-28 px-6 select-none bg-radial-[circle_at_bottom] from-accent-purple/5 via-[#0d1117] to-[#0d1117]">
      <div className="max-w-6xl mx-auto space-y-12">
        <div className="text-center space-y-4">
          <h2 className="text-3xl md:text-5xl font-extrabold text-foreground tracking-tight">
            Simple, developer-first pricing
          </h2>
          <p className="text-xs md:text-sm text-muted max-w-lg mx-auto font-medium">
            Try the Hobbyist version for free. Upgrade to unlock full AI guidance and automation integration.
          </p>

          {/* Monthly/Yearly toggle */}
          <div className="inline-flex bg-card border border-border p-1 rounded-md mt-4 select-none">
            <button
              onClick={() => setBillingPeriod("monthly")}
              className={`px-4 py-1.5 rounded-sm text-xs font-semibold cursor-pointer transition-all ${
                billingPeriod === "monthly" ? "bg-border text-foreground" : "text-muted hover:text-foreground"
              }`}
            >
              Monthly billing
            </button>
            <button
              onClick={() => setBillingPeriod("yearly")}
              className={`px-4 py-1.5 rounded-sm text-xs font-semibold cursor-pointer transition-all ${
                billingPeriod === "yearly" ? "bg-border text-foreground" : "text-muted hover:text-foreground"
              }`}
            >
              Yearly billing (-20%)
            </button>
          </div>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-6">
          {plans.map((plan) => {
            const price = billingPeriod === "monthly" ? plan.monthlyPrice : plan.yearlyPrice;
            return (
              <Card
                key={plan.name}
                className={`relative flex flex-col justify-between border-border/80 ${
                  plan.isPopular ? "border-accent-blue/50 shadow-lg shadow-accent-blue/5" : ""
                }`}
              >
                {plan.isPopular && (
                  <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-accent-blue text-background text-[10px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider select-none">
                    Most Popular
                  </span>
                )}
                
                <div>
                  <CardHeader className="p-6 pb-2">
                    <CardTitle className="text-lg font-extrabold">{plan.name}</CardTitle>
                    <CardDescription className="text-xs text-muted leading-relaxed font-semibold mt-1">
                      {plan.description}
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="p-6 pt-0">
                    <div className="flex items-baseline space-x-1 my-4">
                      <span className="text-4xl font-extrabold text-foreground">${price}</span>
                      <span className="text-xs text-muted font-medium">/month</span>
                    </div>

                    <div className="h-px bg-border/50 my-6" />

                    <ul className="space-y-3.5 select-none" aria-label={`Features for ${plan.name} plan`}>
                      {plan.features.map((feat) => (
                        <li key={feat} className="flex items-start space-x-3 text-xs text-foreground/80 font-medium">
                          <Check className="h-4 w-4 text-accent-blue shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </div>

                <CardFooter className="p-6 pt-0 border-t-0 mt-0">
                  <Button
                    variant={plan.isPopular ? "default" : "secondary"}
                    className="w-full text-xs font-bold py-2.5"
                  >
                    {plan.cta}
                  </Button>
                </CardFooter>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default LandingPricing;
