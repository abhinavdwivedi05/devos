"use client";

import React from "react";
import { motion } from "framer-motion";
import { Github } from "@/components/ui/BrandIcons";
import {
  Award,
  FileSpreadsheet,
  Brain,
  FolderKanban,
  ClipboardList,
  BookOpen,
  Calendar,
  Layers,
  LineChart
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/Card";

interface FeatureCard {
  title: string;
  description: string;
  icon: React.ReactNode;
}

export function LandingFeatures() {
  const features: FeatureCard[] = [
    {
      title: "GitHub Integration",
      description: "Visual contribution grids and repository metrics aggregated in one clean chart.",
      icon: <Github className="h-5 w-5 text-accent-blue" />,
    },
    {
      title: "LeetCode Tracker",
      description: "Track solved challenges, difficulties breakdown and contest rating indices.",
      icon: <Award className="h-5 w-5 text-accent-green" />,
    },
    {
      title: "Resume ATS Manager",
      description: "Verify resume compatibility scores, keyword match densities, and downloads.",
      icon: <FileSpreadsheet className="h-5 w-5 text-accent-purple" />,
    },
    {
      title: "AI Career Guidance",
      description: "Instant roadmap creations, customized code refactor reviews and chat dialogues.",
      icon: <Brain className="h-5 w-5 text-accent-blue" />,
    },
    {
      title: "Projects Kanban",
      description: "Kanban task boards, timelines, files vaults and collaborator management logs.",
      icon: <FolderKanban className="h-5 w-5 text-accent-orange" />,
    },
    {
      title: "Tasks Checklist",
      description: "Checklist grids tracking labels, priority weights, due limits, and recurring events.",
      icon: <ClipboardList className="h-5 w-5 text-accent-blue" />,
    },
    {
      title: "Daily Journal diary",
      description: "Log daily logs, mood indicators and rating scores for study accountability.",
      icon: <BookOpen className="h-5 w-5 text-accent-purple" />,
    },
    {
      title: "Calendar Schedule",
      description: "Consolidate upcoming tasks, recruiter interviews, and team events on one calendar.",
      icon: <Calendar className="h-5 w-5 text-accent-green" />,
    },
  ];

  return (
    <section id="features" className="py-20 md:py-28 px-6 bg-card/25 border-y border-border/40 select-none">
      <div className="max-w-6xl mx-auto space-y-12">
        <div className="text-center space-y-3">
          <h2 className="text-3xl md:text-5xl font-extrabold text-foreground tracking-tight">
            Engineered for high-output developers
          </h2>
          <p className="text-xs md:text-sm text-muted max-w-xl mx-auto leading-relaxed font-semibold">
            Stop switching tabs. DevOS brings all the critical platforms, logs, checklists, and resume guidelines together in one sleek workspace.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feat, index) => (
            <motion.div
              key={feat.title}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05, duration: 0.4 }}
            >
              <Card hoverable className="h-full border-border/60 hover:bg-card select-none">
                <CardHeader className="p-5 flex flex-col space-y-3">
                  <div className="w-9 h-9 rounded-sm bg-border/40 flex items-center justify-center border border-border">
                    {feat.icon}
                  </div>
                  <CardTitle className="text-sm font-bold text-foreground">
                    {feat.title}
                  </CardTitle>
                  <CardDescription className="text-xs text-muted leading-relaxed font-medium">
                    {feat.description}
                  </CardDescription>
                </CardHeader>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default LandingFeatures;
