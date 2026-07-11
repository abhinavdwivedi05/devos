"use client";

import React, { useMemo } from "react";
import { Star, GitFork, GitPullRequest, AlertCircle, GitCommit, Flame, Code } from "lucide-react";
import { Github } from "@/components/ui/BrandIcons";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, PieChart, Pie, Cell } from "recharts";
import { cn } from "@/utils/cn";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";

export function GitHubClient({ data }: { data: any }) {
  // Pull requests array for small chart summary
  const prChartData = [
    { name: "Open", value: data.pullRequests.open, color: "#3fb950" },
    { name: "Merged", value: data.pullRequests.merged, color: "#bc8cff" },
    { name: "Closed", value: data.pullRequests.closed, color: "#f85149" }
  ];

  // Language shares donut chart
  const languageChartData = data.languages;

  // Render contribution days calendar grid.
  // Take last 24 weeks to fit the viewport nicely
  const displayContributions = useMemo(() => {
    return data.contributions.slice(-168); // 24 weeks * 7 days
  }, [data.contributions]);

  return (
    <div className="space-y-6 select-none">
      {/* Brand Profile header */}
      <div className="flex items-center space-x-3 pb-4 border-b border-border/40 select-none">
        <Github className="h-6 w-6 text-accent-blue" />
        <div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground">GitHub Integration</h1>
          <p className="text-xs text-muted font-medium mt-1">
            Connected profile: <span className="text-accent-blue font-bold">@{data.username}</span>
          </p>
        </div>
      </div>

      {/* GitHub Metric Statistics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="border-border/60 p-5 flex flex-col justify-between">
          <div className="flex items-center justify-between text-xs font-bold text-muted pb-2">
            <span>Commit activity</span>
            <GitCommit className="h-4 w-4 text-accent-blue" />
          </div>
          <div className="text-2xl font-extrabold text-foreground">{data.totalCommits}</div>
          <p className="text-[9px] text-muted font-semibold mt-1">Total commits logged this year.</p>
        </Card>

        <Card className="border-border/60 p-5 flex flex-col justify-between">
          <div className="flex items-center justify-between text-xs font-bold text-muted pb-2">
            <span>Commit Streak</span>
            <Flame className="h-4 w-4 text-accent-orange" />
          </div>
          <div className="text-2xl font-extrabold text-foreground">{data.contributionStreak} Days</div>
          <p className="text-[9px] text-muted font-semibold mt-1">Consecutive days contributing.</p>
        </Card>

        <Card className="border-border/60 p-5 flex flex-col justify-between">
          <div className="flex items-center justify-between text-xs font-bold text-muted pb-2">
            <span>Pull Requests</span>
            <GitPullRequest className="h-4 w-4 text-accent-purple" />
          </div>
          <div className="text-2xl font-extrabold text-foreground">
            {data.pullRequests.merged} Merged
          </div>
          <p className="text-[9px] text-muted font-semibold mt-1">
            {data.pullRequests.open} active open PRs remaining.
          </p>
        </Card>

        <Card className="border-border/60 p-5 flex flex-col justify-between">
          <div className="flex items-center justify-between text-xs font-bold text-muted pb-2">
            <span>Open issues</span>
            <AlertCircle className="h-4 w-4 text-accent-red" />
          </div>
          <div className="text-2xl font-extrabold text-foreground">{data.issues.open} Open</div>
          <p className="text-[9px] text-muted font-semibold mt-1">
            Total closed issues: {data.issues.closed}.
          </p>
        </Card>
      </div>

      {/* Contribution Heatmap calendar Grid */}
      <Card className="border-border/60 p-5">
        <CardHeader className="p-0 pb-4 select-none">
          <CardTitle className="text-xs font-bold text-muted uppercase">Contributions Calendar</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="flex flex-col space-y-2">
            {/* Heatmap Blocks grid layout */}
            <div className="grid grid-flow-col grid-rows-7 gap-1 w-full overflow-x-auto py-1">
              {displayContributions.map((day: any, idx: number) => (
                <div
                  key={idx}
                  title={`${day.date}: ${day.count} commits`}
                  className={cn("w-3 h-3 rounded-xs transition-all", {
                    "bg-[#161b22]": day.level === 0,
                    "bg-[#0e4429]": day.level === 1,
                    "bg-[#006d32]": day.level === 2,
                    "bg-[#26a641]": day.level === 3,
                    "bg-[#39d353]": day.level === 4,
                  })}
                />
              ))}
            </div>
            {/* Heatmap Key legend */}
            <div className="flex items-center justify-end space-x-1.5 text-[9px] text-muted select-none mt-2 pr-1 font-semibold">
              <span>Less</span>
              <div className="w-2.5 h-2.5 rounded-xs bg-[#161b22]" />
              <div className="w-2.5 h-2.5 rounded-xs bg-[#0e4429]" />
              <div className="w-2.5 h-2.5 rounded-xs bg-[#006d32]" />
              <div className="w-2.5 h-2.5 rounded-xs bg-[#26a641]" />
              <div className="w-2.5 h-2.5 rounded-xs bg-[#39d353]" />
              <span>More</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Timelines Charts & Language Shares Split Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Language distribution donut */}
        <Card className="border-border/60">
          <CardHeader className="p-5 border-b border-border/40 pb-3">
            <CardTitle className="text-xs font-bold text-muted uppercase">Language Distribution</CardTitle>
          </CardHeader>
          <CardContent className="p-5 pt-4 space-y-4">
            <div className="h-[140px] w-full flex justify-center text-[10px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={languageChartData}
                    cx="50%"
                    cy="50%"
                    innerRadius={36}
                    outerRadius={55}
                    paddingAngle={3}
                    dataKey="value"
                  >
                    {languageChartData.map((entry: any, index: number) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="grid grid-cols-2 gap-2 text-[10px] select-none font-bold">
              {languageChartData.map((lang: any) => (
                <div key={lang.name} className="flex items-center space-x-2">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: lang.color }} />
                  <span className="text-foreground">{lang.name}</span>
                  <span className="text-muted">({lang.value}%)</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Repositories Card Grid */}
        <Card className="lg:col-span-2 border-border/60">
          <CardHeader className="p-5 border-b border-border/40 pb-3">
            <CardTitle className="text-xs font-bold text-muted uppercase">Active Repositories</CardTitle>
          </CardHeader>
          <CardContent className="p-5 pt-4 space-y-4">
            {data.repositories.map((repo: any) => (
              <div key={repo.id} className="flex items-start justify-between border-b border-border/20 pb-3 last:border-0 last:pb-0">
                <div className="space-y-1 text-xs">
                  <h4 className="font-bold text-accent-blue hover:underline cursor-pointer">
                    {repo.name}
                  </h4>
                  <p className="text-[10px] text-muted leading-relaxed font-semibold max-w-lg">
                    {repo.description}
                  </p>
                  <div className="flex items-center space-x-3.5 text-[9px] text-muted font-bold pt-1 select-none">
                    <span className="flex items-center space-x-1">
                      <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: repo.languageColor }} />
                      <span>{repo.language}</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <Star className="h-3.5 w-3.5" />
                      <span>{repo.stars}</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <GitFork className="h-3.5 w-3.5" />
                      <span>{repo.forks}</span>
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default GitHubClient;
