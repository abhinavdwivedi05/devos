"use client";

import React, { useState } from "react";
import { BarChart as ChartIcon, Clock, GitCommit, Award, CheckCircle2, TrendingUp, Calendar } from "lucide-react";
import { ResponsiveContainer, AreaChart, Area, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/Card";
import Tabs from "@/components/ui/Tabs";

export function AnalyticsClient({ stats }: { stats: any }) {
  const [activeSegment, setActiveSegment] = useState("hours");

  const segments = [
    { id: "hours", label: "Study Hours" },
    { id: "commits", label: "Commits Log" },
    { id: "solved", label: "Algorithms" },
    { id: "tasks", label: "Completed Tasks" },
  ];

  return (
    <div className="space-y-6 select-none">
      {/* Brand Header */}
      <div className="flex items-center space-x-3 pb-4 border-b border-border/40 select-none">
        <ChartIcon className="h-6 w-6 text-accent-blue" />
        <div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground">Global Analytics</h1>
          <p className="text-xs text-muted font-medium mt-1">Productivity metrics and week-over-week performance indices.</p>
        </div>
      </div>

      {/* Metrics Summary Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="border-border/60 p-5 flex flex-col justify-between">
          <div className="flex items-center justify-between text-xs font-bold text-muted pb-2">
            <span>Study Hours (Week)</span>
            <Clock className="h-4 w-4 text-accent-blue" />
          </div>
          <div className="text-2xl font-extrabold text-foreground">35.6 hrs</div>
          <p className="text-[9px] text-muted font-semibold mt-1">Average: 5.1 hours daily.</p>
        </Card>

        <Card className="border-border/60 p-5 flex flex-col justify-between">
          <div className="flex items-center justify-between text-xs font-bold text-muted pb-2">
            <span>Commits (Month)</span>
            <GitCommit className="h-4 w-4 text-accent-purple" />
          </div>
          <div className="text-2xl font-extrabold text-foreground">199</div>
          <p className="text-[9px] text-muted font-semibold mt-1">Streak rating: Excellent.</p>
        </Card>

        <Card className="border-border/60 p-5 flex flex-col justify-between">
          <div className="flex items-center justify-between text-xs font-bold text-muted pb-2">
            <span>Solved Algorithms</span>
            <Award className="h-4 w-4 text-accent-green" />
          </div>
          <div className="text-2xl font-extrabold text-foreground">52 Problems</div>
          <p className="text-[9px] text-muted font-semibold mt-1">Avg complexity: Medium.</p>
        </Card>

        <Card className="border-border/60 p-5 flex flex-col justify-between">
          <div className="flex items-center justify-between text-xs font-bold text-muted pb-2">
            <span>Completed Tasks</span>
            <CheckCircle2 className="h-4 w-4 text-accent-orange" />
          </div>
          <div className="text-2xl font-extrabold text-foreground">103 tasks</div>
          <p className="text-[9px] text-muted font-semibold mt-1">Completion rate: 94%</p>
        </Card>
      </div>

      {/* Main charting card */}
      <Card className="border-border/60">
        <CardHeader className="p-5 border-b border-border/40 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <CardTitle className="text-sm font-bold">Metrics Curves</CardTitle>
            <CardDescription className="text-[10px]">Select a category to display detailed charting trends.</CardDescription>
          </div>
          <Tabs tabs={segments} activeTab={activeSegment} onChange={setActiveSegment} variant="pill" />
        </CardHeader>
        <CardContent className="p-5 pt-4">
          <div className="h-[240px] w-full text-[10px]">
            {activeSegment === "hours" && (
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={stats.studyHours} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorHours" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#58a6ff" stopOpacity={0.25} />
                      <stop offset="95%" stopColor="#58a6ff" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="date" stroke="#8b949e" tickLine={false} />
                  <YAxis stroke="#8b949e" tickLine={false} />
                  <Tooltip contentStyle={{ backgroundColor: "#161b22", borderColor: "#30363d", borderRadius: "6px", color: "#f0f6fc" }} />
                  <Area type="monotone" dataKey="hours" stroke="#58a6ff" strokeWidth={1.5} fillOpacity={1} fill="url(#colorHours)" />
                </AreaChart>
              </ResponsiveContainer>
            )}

            {activeSegment === "commits" && (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={stats.commitsByWeek} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                  <XAxis dataKey="name" stroke="#8b949e" tickLine={false} />
                  <YAxis stroke="#8b949e" tickLine={false} />
                  <Tooltip contentStyle={{ backgroundColor: "#161b22", borderColor: "#30363d", borderRadius: "6px", color: "#f0f6fc" }} />
                  <Bar dataKey="commits" fill="#bc8cff" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            )}

            {activeSegment === "solved" && (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={stats.problemsSolvedByWeek} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                  <XAxis dataKey="name" stroke="#8b949e" tickLine={false} />
                  <YAxis stroke="#8b949e" tickLine={false} />
                  <Tooltip contentStyle={{ backgroundColor: "#161b22", borderColor: "#30363d", borderRadius: "6px", color: "#f0f6fc" }} />
                  <Bar dataKey="solved" fill="#3fb950" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            )}

            {activeSegment === "tasks" && (
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={stats.tasksCompletedByWeek} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorTasks" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#f0883e" stopOpacity={0.25} />
                      <stop offset="95%" stopColor="#f0883e" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="name" stroke="#8b949e" tickLine={false} />
                  <YAxis stroke="#8b949e" tickLine={false} />
                  <Tooltip contentStyle={{ backgroundColor: "#161b22", borderColor: "#30363d", borderRadius: "6px", color: "#f0f6fc" }} />
                  <Area type="monotone" dataKey="tasks" stroke="#f0883e" strokeWidth={1.5} fillOpacity={1} fill="url(#colorTasks)" />
                </AreaChart>
              </ResponsiveContainer>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Weekly Report summary panel */}
      <Card className="border-border/60">
        <CardHeader className="p-5 border-b border-border/40 pb-4">
          <CardTitle className="text-sm font-bold flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-accent-blue" />
            <span>Weekly Performance Report</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-5 pt-4 space-y-3.5 text-xs select-none">
          <p className="leading-relaxed text-foreground/90 font-semibold">
            Your overall productivity index has increased by **8.4%** compared to the previous week. You logged **35.6 hours** of active focus, pushing **42 commits** to active repositories and practicing **14 medium-level algorithms**.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div className="bg-card border border-border p-3 rounded-md space-y-1">
              <span className="text-[10px] font-bold text-muted uppercase">Top Focus Area</span>
              <p className="font-bold text-foreground">Next.js App Router Refactoring</p>
            </div>
            <div className="bg-card border border-border p-3 rounded-md space-y-1">
              <span className="text-[10px] font-bold text-muted uppercase">Optimal Focus Hours</span>
              <p className="font-bold text-foreground">10:00 AM - 1:00 PM EST (Tues/Thurs)</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default AnalyticsClient;
