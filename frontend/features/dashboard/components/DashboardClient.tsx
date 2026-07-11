"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Terminal,
  Award,
  FileSpreadsheet,
  Calendar,
  Briefcase,
  Plus,
  BookOpen,
  ArrowRight,
  GitCommit,
  CheckCircle2,
  Sparkles,
  ClipboardList
} from "lucide-react";
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip } from "recharts";
import { useStore } from "@/store/useStore";
import { cn } from "@/utils/cn";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import { toast } from "@/components/ui/Toast";

interface DashboardClientProps {
  initialGithubData: any;
  initialLeetcodeData: any;
  initialJobs: any[];
  initialInterviews: any[];
  initialAnalytics: any;
}

export function DashboardClient({
  initialGithubData,
  initialLeetcodeData,
  initialJobs,
  initialInterviews,
  initialAnalytics,
}: DashboardClientProps) {
  const router = useRouter();
  const { notes, tasks, jobs, interviews, profile, addTask, addNote } = useStore();
  const [mounted, setMounted] = useState(false);

  // Avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  const handleQuickTask = () => {
    addTask({
      title: "New dashboard task",
      description: "Quick task added from widgets console.",
      status: "todo",
      priority: "medium",
      labels: ["inbound"],
      dueDate: new Date().toISOString().split("T")[0],
      isRecurring: false,
    });
    toast("Task added successfully!", "success");
  };

  const handleQuickNote = () => {
    addNote({
      title: "Quick Dashboard Scratchpad",
      content: `# Quick Scratchpad\n\nNotes from dashboard quick actions:`,
      folderId: null,
      tags: ["scratch"],
      isPinned: false,
      isArchived: false,
      isTrash: false,
    });
    toast("Scratchpad created in Notes!", "success");
    router.push("/notes");
  };

  if (!mounted) return null;

  // Local data fallback merges resolved server states
  const displayTasks = tasks.filter((t) => t.status !== "done").slice(0, 3);
  const displayInterviews = interviews.filter((i) => i.status === "upcoming").slice(0, 2);
  const displayJobs = jobs.slice(0, 3);
  const displayNotes = notes.slice(0, 2);

  return (
    <div className="space-y-8 select-none">
      {/* Header welcome banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground flex items-center gap-2">
            <span>Welcome, {profile.name}</span>
            <Sparkles className="h-4.5 w-4.5 text-accent-blue" />
          </h1>
          <p className="text-xs text-muted font-medium mt-1">
            System status: nominal. Terminal integrations connected.
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="secondary" size="sm" onClick={handleQuickNote}>
            <Plus className="h-3.5 w-3.5 mr-1.5" />
            <span>New Note</span>
          </Button>
          <Button variant="default" size="sm" onClick={handleQuickTask}>
            <Plus className="h-3.5 w-3.5 mr-1.5" />
            <span>Add Task</span>
          </Button>
        </div>
      </div>

      {/* Stats Matrix Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* GitHub Contribution */}
        <Card hoverable className="border-border/60" onClick={() => router.push("/github")}>
          <CardHeader className="p-5 flex flex-row items-center justify-between pb-2">
            <span className="text-xs font-semibold text-muted">GitHub Streak</span>
            <GitCommit className="h-4.5 w-4.5 text-accent-blue" />
          </CardHeader>
          <CardContent className="p-5 pt-0">
            <div className="text-2xl font-extrabold text-foreground">
              {initialGithubData.contributionStreak} Days
            </div>
            <p className="text-[10px] text-muted font-medium mt-1">
              Active commits: {initialGithubData.totalCommits} this year.
            </p>
          </CardContent>
        </Card>

        {/* LeetCode stats */}
        <Card hoverable className="border-border/60" onClick={() => router.push("/leetcode")}>
          <CardHeader className="p-5 flex flex-row items-center justify-between pb-2">
            <span className="text-xs font-semibold text-muted">LeetCode Solved</span>
            <Award className="h-4.5 w-4.5 text-accent-green" />
          </CardHeader>
          <CardContent className="p-5 pt-0">
            <div className="text-2xl font-extrabold text-foreground">
              {initialLeetcodeData.solved.total}
            </div>
            <p className="text-[10px] text-muted font-medium mt-1">
              Rating: {initialLeetcodeData.contestRating.rating} (Knight rank).
            </p>
          </CardContent>
        </Card>

        {/* Resume ATS gauge */}
        <Card hoverable className="border-border/60" onClick={() => router.push("/resume")}>
          <CardHeader className="p-5 flex flex-row items-center justify-between pb-2">
            <span className="text-xs font-semibold text-muted">ATS Resume Rating</span>
            <FileSpreadsheet className="h-4.5 w-4.5 text-accent-purple" />
          </CardHeader>
          <CardContent className="p-5 pt-0">
            <div className="text-2xl font-extrabold text-foreground">
              82%
            </div>
            <p className="text-[10px] text-muted font-medium mt-1">
              Active template: v3. 3 optimizer tips pending.
            </p>
          </CardContent>
        </Card>

        {/* Applications pipeline */}
        <Card hoverable className="border-border/60" onClick={() => router.push("/jobs")}>
          <CardHeader className="p-5 flex flex-row items-center justify-between pb-2">
            <span className="text-xs font-semibold text-muted">Interview Pipelines</span>
            <Briefcase className="h-4.5 w-4.5 text-accent-orange" />
          </CardHeader>
          <CardContent className="p-5 pt-0">
            <div className="text-2xl font-extrabold text-foreground">
              {jobs.filter(j => j.status === "interviewing").length} Active
            </div>
            <p className="text-[10px] text-muted font-medium mt-1">
              Total applications: {jobs.length} companies.
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Main double column chart grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Productivity Analytics Chart */}
        <Card className="lg:col-span-2 border-border/60">
          <CardHeader className="p-5 border-b border-border/40 pb-4">
            <CardTitle className="text-sm font-bold">Workspace Study Hours</CardTitle>
            <CardDescription className="text-[10px]">Coding activity comparison logs for the past week.</CardDescription>
          </CardHeader>
          <CardContent className="p-5 pt-4">
            <div className="h-[220px] w-full text-[10px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={initialAnalytics.studyHours} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorHours" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#58a6ff" stopOpacity={0.2} />
                      <stop offset="95%" stopColor="#58a6ff" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="date" stroke="#8b949e" strokeWidth={0.5} tickLine={false} />
                  <YAxis stroke="#8b949e" strokeWidth={0.5} tickLine={false} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#161b22",
                      borderColor: "#30363d",
                      borderRadius: "6px",
                      color: "#f0f6fc",
                    }}
                  />
                  <Area type="monotone" dataKey="hours" stroke="#58a6ff" strokeWidth={1.5} fillOpacity={1} fill="url(#colorHours)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Quick Lists Panel */}
        <div className="space-y-6">
          {/* Today's Tasks */}
          <Card className="border-border/60">
            <CardHeader className="p-5 border-b border-border/40 pb-4">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-bold">Workspace Agenda</CardTitle>
                <Link href="/tasks" className="text-[10px] text-accent-blue hover:underline font-semibold flex items-center gap-0.5">
                  <span>View all</span>
                  <ArrowRight className="h-3 w-3" />
                </Link>
              </div>
            </CardHeader>
            <CardContent className="p-5 pt-4 space-y-3">
              {displayTasks.length > 0 ? (
                displayTasks.map((t) => (
                  <div key={t.id} className="flex items-start space-x-3 text-xs leading-relaxed border-b border-border/30 pb-2.5 last:border-0 last:pb-0">
                    <ClipboardList className="h-4 w-4 text-muted shrink-0 mt-0.5" />
                    <div className="flex-1 truncate">
                      <p className="font-semibold text-foreground truncate">{t.title}</p>
                      <p className="text-[10px] text-muted font-medium mt-0.5">
                        Due: {t.dueDate} • <span className="uppercase text-[9px] font-bold text-accent-orange">{t.priority}</span>
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-center py-4 text-[11px] text-muted">All clean! No pending tasks.</p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Interviews and Job Applications Split Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Interviews schedule */}
        <Card className="border-border/60">
          <CardHeader className="p-5 border-b border-border/40 pb-4">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-bold">Upcoming Panels</CardTitle>
              <Link href="/interviews" className="text-[10px] text-accent-blue hover:underline font-semibold">
                View Checklist
              </Link>
            </div>
          </CardHeader>
          <CardContent className="p-5 pt-4 space-y-4">
            {displayInterviews.length > 0 ? (
              displayInterviews.map((int) => (
                <div key={int.id} className="flex items-start space-x-3 text-xs">
                  <Calendar className="h-4.5 w-4.5 text-accent-green shrink-0 mt-0.5" />
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center space-x-1.5">
                      <span className="font-bold text-foreground">{int.company}</span>
                      <Badge variant="success" className="text-[9px] px-1 py-0">{int.type}</Badge>
                    </div>
                    <p className="text-[10px] text-muted font-medium leading-none">
                      {int.date} at {int.time}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center py-6 text-[11px] text-muted">No scheduled interviews.</p>
            )}
          </CardContent>
        </Card>

        {/* Job Tracker pipelines */}
        <Card className="border-border/60">
          <CardHeader className="p-5 border-b border-border/40 pb-4">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-bold">Pipelines Status</CardTitle>
              <Link href="/jobs" className="text-[10px] text-accent-blue hover:underline font-semibold">
                Manage
              </Link>
            </div>
          </CardHeader>
          <CardContent className="p-5 pt-4 space-y-4">
            {displayJobs.map((job) => (
              <div key={job.id} className="flex items-center justify-between text-xs border-b border-border/20 pb-2.5 last:border-0 last:pb-0">
                <div className="flex items-center space-x-2">
                  <span className="w-6 h-6 rounded-full bg-border/40 flex items-center justify-center font-bold text-xs select-none">
                    {job.logo || "B"}
                  </span>
                  <div>
                    <p className="font-bold text-foreground">{job.company}</p>
                    <p className="text-[10px] text-muted font-medium leading-none mt-0.5">{job.role}</p>
                  </div>
                </div>
                <Badge
                  variant={
                    job.status === "offered"
                      ? "success"
                      : job.status === "interviewing"
                      ? "warning"
                      : "secondary"
                  }
                  className="text-[9px] uppercase px-1 py-0 font-bold"
                >
                  {job.status}
                </Badge>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Recent notes */}
        <Card className="border-border/60">
          <CardHeader className="p-5 border-b border-border/40 pb-4">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-bold">Recent Notes</CardTitle>
              <Link href="/notes" className="text-[10px] text-accent-blue hover:underline font-semibold">
                Open Notebook
              </Link>
            </div>
          </CardHeader>
          <CardContent className="p-5 pt-4 space-y-4">
            {displayNotes.map((note) => (
              <div
                key={note.id}
                onClick={() => router.push("/notes")}
                className="flex items-start space-x-3 text-xs cursor-pointer hover:bg-border/10 p-1.5 rounded-sm transition-all"
              >
                <BookOpen className="h-4.5 w-4.5 text-accent-purple shrink-0 mt-0.5" />
                <div className="flex-1 truncate">
                  <p className="font-bold text-foreground truncate">{note.title}</p>
                  <p className="text-[10px] text-muted leading-relaxed font-semibold truncate mt-0.5">
                    {note.content.substring(0, 50).replace(/[#*`_-]/g, "")}...
                  </p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default DashboardClient;
