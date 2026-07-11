"use client";

import React, { useState, useRef, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Search, Bell, CheckCircle2, AlertTriangle, Info, XCircle, Check } from "lucide-react";
import { useStore } from "@/store/useStore";
import { cn } from "@/utils/cn";
import { Breadcrumbs, BreadcrumbItem } from "@/components/ui/Breadcrumbs";

export function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { setCommandMenuOpen, notifications, markNotificationRead, markAllNotificationsRead } = useStore();
  const [showNotifications, setShowNotifications] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close notifications dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setShowNotifications(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Map pathnames to breadcrumbs
  const getBreadcrumbs = (): BreadcrumbItem[] => {
    const paths = pathname.split("/").filter(Boolean);
    const crumbs: BreadcrumbItem[] = [{ label: "DevOS", href: "/dashboard" }];

    if (paths.length === 0) return crumbs;

    const formattedSegment = (s: string) => {
      return s
        .split("-")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
    };

    paths.forEach((p, idx) => {
      const href = "/" + paths.slice(0, idx + 1).join("/");
      crumbs.push({
        label: formattedSegment(p),
        href: idx === paths.length - 1 ? undefined : href,
      });
    });

    return crumbs;
  };

  const unreadNotifications = notifications.filter((n) => !n.isRead);

  const getNotificationIcon = (category: string) => {
    switch (category) {
      case "jobs":
        return <CheckCircle2 className="h-4 w-4 text-accent-green" />;
      case "leetcode":
        return <AlertTriangle className="h-4 w-4 text-accent-orange" />;
      case "ai":
        return <BrainIcon className="h-4 w-4 text-accent-blue" />;
      default:
        return <Info className="h-4 w-4 text-muted" />;
    }
  };

  return (
    <header className="sticky top-0 bg-[#0d1117]/85 backdrop-blur-md border-b border-border h-14 flex items-center justify-between px-6 z-20 select-none">
      {/* Dynamic Breadcrumbs */}
      <Breadcrumbs items={getBreadcrumbs()} />

      {/* Action items */}
      <div className="flex items-center space-x-4">
        {/* Command Palette Trigger */}
        <button
          onClick={() => setCommandMenuOpen(true)}
          className="flex items-center space-x-2 bg-card hover:bg-border/30 border border-border rounded-md px-3 py-1.5 text-xs text-muted hover:text-foreground cursor-pointer transition-all w-48 text-left"
        >
          <Search className="h-3.5 w-3.5" />
          <span className="flex-1 font-medium text-muted/65">Search console...</span>
          <span className="text-[10px] bg-border/40 text-muted border border-border px-1.5 py-0.5 rounded-sm font-semibold">
            ⌘K
          </span>
        </button>

        {/* Notifications Dropdown Container */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="p-2 text-muted hover:text-foreground hover:bg-card/50 rounded-full cursor-pointer transition-all relative border border-transparent hover:border-border"
            aria-label="Notifications center"
          >
            <Bell className="h-4 w-4" />
            {unreadNotifications.length > 0 && (
              <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-accent-red animate-pulse" />
            )}
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 bg-card border border-border rounded-md shadow-lg overflow-hidden z-50 flex flex-col max-h-[350px]">
              <div className="px-4 py-2.5 border-b border-border flex items-center justify-between bg-border/10">
                <span className="text-xs font-semibold text-foreground">Notifications</span>
                {unreadNotifications.length > 0 && (
                  <button
                    onClick={() => {
                      markAllNotificationsRead();
                      setShowNotifications(false);
                    }}
                    className="text-[10px] text-accent-blue hover:underline font-semibold flex items-center space-x-1 cursor-pointer"
                  >
                    <Check className="h-3 w-3" />
                    <span>Read all</span>
                  </button>
                )}
              </div>

              <div className="flex-1 overflow-y-auto divide-y divide-border/40">
                {notifications.length > 0 ? (
                  notifications.map((n) => (
                    <div
                      key={n.id}
                      onClick={() => {
                        markNotificationRead(n.id);
                        if (n.category === "jobs") router.push("/jobs");
                        if (n.category === "leetcode") router.push("/leetcode");
                        if (n.category === "ai") router.push("/ai-mentor");
                        setShowNotifications(false);
                      }}
                      className={cn(
                        "p-3 text-left transition-all hover:bg-border/20 cursor-pointer flex items-start space-x-3",
                        !n.isRead ? "bg-accent-blue/5" : ""
                      )}
                    >
                      <span className="shrink-0 mt-0.5">{getNotificationIcon(n.category)}</span>
                      <div className="flex-1 space-y-0.5">
                        <p className={cn("text-xs font-semibold text-foreground", !n.isRead ? "text-accent-blue" : "")}>
                          {n.title}
                        </p>
                        <p className="text-[10px] text-muted leading-relaxed truncate-2-lines">
                          {n.message}
                        </p>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="p-6 text-center text-xs text-muted">
                    No new notifications.
                  </div>
                )}
              </div>

              <div className="border-t border-border p-2 bg-border/5 text-center">
                <button
                  onClick={() => {
                    setShowNotifications(false);
                    router.push("/settings");
                  }}
                  className="text-[10px] text-muted hover:text-foreground font-semibold cursor-pointer"
                >
                  Configure Notifications Settings
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

// Inline brain icon fallback
function BrainIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z" />
      <path d="M12 5a3 3 0 1 1 5.997.125 4 4 0 0 1 2.526 5.77 4 4 0 0 1-.556 6.588A4 4 0 1 1 12 18Z" />
      <path d="M12 5v14" />
      <path d="M12 12h6" />
      <path d="M12 12H6" />
    </svg>
  );
}

export default Navbar;
