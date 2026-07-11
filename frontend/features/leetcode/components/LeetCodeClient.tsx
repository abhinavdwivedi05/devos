"use client";

import React, { useMemo } from "react";
import { Award, AwardIcon, TrendingUp, Calendar, Zap, Flame, ShieldAlert } from "lucide-react";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";
import { cn } from "@/utils/cn";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";

export function LeetCodeClient({ stats }: { stats: any }) {
  const solvedRatio = ((stats.solved.total / stats.solved.totalAvailable) * 100).toFixed(1);
  const easyRatio = ((stats.solved.easy / stats.solved.easyAvailable) * 100).toFixed(1);
  const medRatio = ((stats.solved.medium / stats.solved.mediumAvailable) * 100).toFixed(1);
  const hardRatio = ((stats.solved.hard / stats.solved.hardAvailable) * 100).toFixed(1);

  const displayHeatmap = useMemo(() => {
    // Generate a simple array for the last 14 weeks (98 days)
    return stats.heatmap.slice(-98);
  }, [stats.heatmap]);

  return (
    <div className="space-y-6 select-none">
      {/* Brand Header */}
      <div className="flex items-center space-x-3 pb-4 border-b border-border/40 select-none">
        <Award className="h-6 w-6 text-accent-green" />
        <div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground">LeetCode Tracker</h1>
          <p className="text-xs text-muted font-medium mt-1">
            Connected profile: <span className="text-accent-green font-bold">@{stats.username}</span>
          </p>
        </div>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="border-border/60 p-5 flex flex-col justify-between">
          <div className="flex items-center justify-between text-xs font-bold text-muted pb-2">
            <span>Global Ranking</span>
            <ShieldAlert className="h-4 w-4 text-accent-green" />
          </div>
          <div className="text-2xl font-extrabold text-foreground">#{stats.ranking.toLocaleString()}</div>
          <p className="text-[9px] text-muted font-semibold mt-1">Top 5% of active users.</p>
        </Card>

        <Card className="border-border/60 p-5 flex flex-col justify-between">
          <div className="flex items-center justify-between text-xs font-bold text-muted pb-2">
            <span>Contest Rating</span>
            <TrendingUp className="h-4 w-4 text-accent-blue" />
          </div>
          <div className="text-2xl font-extrabold text-foreground">{stats.contestRating.rating}</div>
          <p className="text-[9px] text-muted font-semibold mt-1">Percentile: {stats.contestRating.percentile}%</p>
        </Card>

        <Card className="border-border/60 p-5 flex flex-col justify-between">
          <div className="flex items-center justify-between text-xs font-bold text-muted pb-2">
            <span>Badges Earned</span>
            <Zap className="h-4 w-4 text-accent-orange" />
          </div>
          <div className="text-2xl font-extrabold text-foreground">{stats.badges.length}</div>
          <p className="text-[9px] text-muted font-semibold mt-1">Latest: Knight Rating badge.</p>
        </Card>

        <Card className="border-border/60 p-5 flex flex-col justify-between">
          <div className="flex items-center justify-between text-xs font-bold text-muted pb-2">
            <span>Solved Ratios</span>
            <AwardIcon className="h-4 w-4 text-accent-purple" />
          </div>
          <div className="text-2xl font-extrabold text-foreground">{solvedRatio}%</div>
          <p className="text-[9px] text-muted font-semibold mt-1">
            {stats.solved.total} / {stats.solved.totalAvailable} completed.
          </p>
        </Card>
      </div>

      {/* Difficulty Ratios and Heatmap grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Difficulty progress card */}
        <Card className="border-border/60 p-5 flex flex-col justify-between">
          <CardHeader className="p-0 pb-3 select-none">
            <CardTitle className="text-xs font-bold text-muted uppercase">Difficulty Splits</CardTitle>
          </CardHeader>
          <CardContent className="p-0 space-y-4 pt-1 select-none">
            {/* Easy */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-bold">
                <span className="text-accent-green">Easy</span>
                <span className="text-foreground">{stats.solved.easy} / {stats.solved.easyAvailable} ({easyRatio}%)</span>
              </div>
              <div className="bg-border/30 h-2 rounded-full overflow-hidden">
                <div className="bg-accent-green h-2" style={{ width: `${easyRatio}%` }} />
              </div>
            </div>
            {/* Medium */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-bold">
                <span className="text-accent-orange">Medium</span>
                <span className="text-foreground">{stats.solved.medium} / {stats.solved.mediumAvailable} ({medRatio}%)</span>
              </div>
              <div className="bg-border/30 h-2 rounded-full overflow-hidden">
                <div className="bg-accent-orange h-2" style={{ width: `${medRatio}%` }} />
              </div>
            </div>
            {/* Hard */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-bold">
                <span className="text-accent-red">Hard</span>
                <span className="text-foreground">{stats.solved.hard} / {stats.solved.hardAvailable} ({hardRatio}%)</span>
              </div>
              <div className="bg-border/30 h-2 rounded-full overflow-hidden">
                <div className="bg-accent-red h-2" style={{ width: `${hardRatio}%` }} />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Contest history lines */}
        <Card className="lg:col-span-2 border-border/60">
          <CardHeader className="p-5 border-b border-border/40 pb-3">
            <CardTitle className="text-xs font-bold text-muted uppercase">Contest Rating Curve</CardTitle>
          </CardHeader>
          <CardContent className="p-5 pt-4">
            <div className="h-[180px] w-full text-[10px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={stats.contestRating.history} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#30363d" vertical={false} />
                  <XAxis dataKey="date" stroke="#8b949e" tickLine={false} />
                  <YAxis stroke="#8b949e" tickLine={false} domain={["dataMin - 100", "dataMax + 100"]} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#161b22",
                      borderColor: "#30363d",
                      borderRadius: "6px",
                      color: "#f0f6fc",
                    }}
                  />
                  <Line type="monotone" dataKey="rating" stroke="#3fb950" strokeWidth={1.5} activeDot={{ r: 6 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Badges Grid */}
      <Card className="border-border/60 p-5">
        <CardHeader className="p-0 pb-4 select-none">
          <CardTitle className="text-xs font-bold text-muted uppercase">Unlocked Credentials</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {stats.badges.map((badge: any) => (
              <div key={badge.id} className="flex items-center space-x-3.5 border border-border bg-card/25 p-3 rounded-md select-none text-xs">
                <span className="text-2xl shrink-0">{badge.icon}</span>
                <div>
                  <p className="font-bold text-foreground">{badge.name}</p>
                  <p className="text-[10px] text-muted font-semibold mt-0.5">Unlocked: {badge.earnedDate}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default LeetCodeClient;
