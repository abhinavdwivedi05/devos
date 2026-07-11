"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useStore } from "@/store/useStore";
import { cn } from "@/utils/cn";
import { Github } from "@/components/ui/BrandIcons";
import {
  Terminal,
  FolderKanban,
  ClipboardList,
  FileText,
  Calendar,
  Brain,
  FileSpreadsheet,
  Briefcase,
  MessagesSquare,
  Award,
  BookOpen,
  BarChart,
  User,
  Settings,
  Bell,
  Menu,
  ChevronLeft,
  ChevronRight,
  LogOut
} from "lucide-react";

interface SidebarGroup {
  title: string;
  items: {
    name: string;
    href: string;
    icon: React.ComponentType<any>;
    badge?: string | number;
    badgeVariant?: "default" | "success" | "warning";
  }[];
}

export function Sidebar() {
  const pathname = usePathname();
  const { notes, tasks, jobs, interviews, notifications, settings, updateSettings, profile } = useStore();
  
  const isCollapsed = settings.appearance.sidebarCollapsed;
  const toggleCollapse = () => {
    updateSettings({
      appearance: {
        ...settings.appearance,
        sidebarCollapsed: !isCollapsed,
      },
    });
  };

  // Compute badges dynamically from store state
  const activeTasksCount = tasks.filter((t) => t.status !== "done").length;
  const interviewingJobsCount = jobs.filter((j) => j.status === "interviewing").length;
  const upcomingInterviewsCount = interviews.filter((i) => i.status === "upcoming").length;
  const activeNotesCount = notes.filter((n) => !n.isArchived && !n.isTrash).length;
  const unreadNotificationsCount = notifications.filter((n) => !n.isRead).length;

  const navigationGroups: SidebarGroup[] = [
    {
      title: "Core Workspace",
      items: [
        { name: "Dashboard", href: "/dashboard", icon: Terminal },
        { name: "Tasks", href: "/tasks", icon: ClipboardList, badge: activeTasksCount > 0 ? activeTasksCount : undefined },
        { name: "Projects", href: "/projects", icon: FolderKanban },
        { name: "Notes", href: "/notes", icon: FileText, badge: activeNotesCount > 0 ? activeNotesCount : undefined },
        { name: "Calendar", href: "/calendar", icon: Calendar },
      ],
    },
    {
      title: "Career Hub",
      items: [
        { name: "AI Mentor", href: "/ai-mentor", icon: Brain },
        { name: "Resume Manager", href: "/resume", icon: FileSpreadsheet },
        { name: "Job Tracker", href: "/jobs", icon: Briefcase, badge: interviewingJobsCount > 0 ? interviewingJobsCount : undefined, badgeVariant: "warning" },
        { name: "Interviews", href: "/interviews", icon: MessagesSquare, badge: upcomingInterviewsCount > 0 ? upcomingInterviewsCount : undefined, badgeVariant: "success" },
      ],
    },
    {
      title: "Developer Metrics",
      items: [
        { name: "GitHub Stats", href: "/github", icon: Github },
        { name: "LeetCode Tracker", href: "/leetcode", icon: Award },
        { name: "Analytics", href: "/analytics", icon: BarChart },
      ],
    },
    {
      title: "Personal",
      items: [
        { name: "Coding Journal", href: "/journal", icon: BookOpen },
        { name: "Profile", href: "/profile", icon: User },
        { name: "Settings", href: "/settings", icon: Settings },
      ],
    },
  ];

  return (
    <aside
      className={cn(
        "h-screen sticky top-0 bg-[#0d1117] border-r border-border flex flex-col justify-between transition-all duration-350 z-30 select-none shrink-0",
        isCollapsed ? "w-16" : "w-60"
      )}
    >
      {/* Brand Header */}
      <div className="flex items-center justify-between px-4 py-4 border-b border-border">
        {!isCollapsed && (
          <Link href="/dashboard" className="flex items-center space-x-2">
            <span className="font-extrabold text-sm tracking-widest text-accent-blue bg-accent-blue/10 px-2.5 py-1 rounded-sm border border-accent-blue/20">
              DEVOS
            </span>
          </Link>
        )}
        {isCollapsed && (
          <div className="mx-auto font-black text-sm text-accent-blue bg-accent-blue/10 w-8 h-8 flex items-center justify-center rounded-sm border border-accent-blue/20">
            D
          </div>
        )}
        <button
          onClick={toggleCollapse}
          className="text-muted hover:text-foreground hidden md:block cursor-pointer"
          aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {isCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </button>
      </div>

      {/* Nav List */}
      <div className="flex-1 overflow-y-auto px-3 py-4 space-y-6">
        {navigationGroups.map((group, groupIdx) => (
          <div key={groupIdx} className="space-y-1">
            {!isCollapsed && (
              <h4 className="text-[10px] font-bold text-muted/60 uppercase tracking-wider px-2.5 py-1">
                {group.title}
              </h4>
            )}
            <nav className="space-y-0.5" aria-label={group.title}>
              {group.items.map((item) => {
                const isActive = pathname.startsWith(item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "flex items-center space-x-3 px-3 py-2 text-xs font-semibold rounded-sm transition-all group relative cursor-pointer",
                      isActive
                        ? "bg-border/50 text-foreground"
                        : "text-muted hover:bg-card/50 hover:text-foreground"
                    )}
                  >
                    <item.icon
                      className={cn(
                        "h-4 w-4 shrink-0 transition-colors",
                        isActive ? "text-accent-blue" : "text-muted group-hover:text-foreground"
                      )}
                    />
                    
                    {!isCollapsed && (
                      <span className="flex-1 truncate">{item.name}</span>
                    )}

                    {/* Badge */}
                    {!isCollapsed && item.badge !== undefined && (
                      <span
                        className={cn(
                          "px-1.5 py-0.5 text-[10px] font-bold rounded-sm border",
                          {
                            "bg-accent-blue/10 text-accent-blue border-accent-blue/20": !item.badgeVariant || item.badgeVariant === "default",
                            "bg-accent-green/10 text-accent-green border-accent-green/20": item.badgeVariant === "success",
                            "bg-accent-orange/10 text-accent-orange border-accent-orange/20": item.badgeVariant === "warning",
                          }
                        )}
                      >
                        {item.badge}
                      </span>
                    )}

                    {/* Tooltip on collapsed */}
                    {isCollapsed && (
                      <span className="absolute left-14 bg-card border border-border text-foreground px-2 py-1 text-[10px] rounded-sm opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap shadow-md">
                        {item.name}
                      </span>
                    )}
                  </Link>
                );
              })}
            </nav>
          </div>
        ))}
      </div>

      {/* Bottom Profile Footer */}
      <div className="border-t border-border p-3 flex flex-col space-y-2">
        <Link
          href="/profile"
          className={cn(
            "flex items-center space-x-3 p-1.5 hover:bg-card/50 rounded-sm transition-all cursor-pointer group relative",
            pathname === "/profile" ? "bg-border/40" : ""
          )}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={profile.avatarUrl}
            alt={profile.name}
            className="w-8 h-8 rounded-full border border-border object-cover shrink-0"
          />
          {!isCollapsed && (
            <div className="flex-1 truncate">
              <div className="text-[11px] font-bold text-foreground leading-none">
                {profile.name}
              </div>
              <div className="text-[10px] text-muted leading-none mt-1">
                @{profile.username}
              </div>
            </div>
          )}
          {isCollapsed && (
            <span className="absolute left-14 bg-card border border-border text-foreground px-2 py-1 text-[10px] rounded-sm opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap shadow-md">
              {profile.name} (@{profile.username})
            </span>
          )}
        </Link>
      </div>
    </aside>
  );
}

export default Sidebar;
