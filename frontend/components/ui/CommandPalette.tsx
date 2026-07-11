"use client";

import React, { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Folder, ClipboardList, Brain, Calendar, FileText, BarChart, Settings, User, LogOut, Terminal } from "lucide-react";
import { useStore } from "@/store/useStore";
import { cn } from "@/utils/cn";
import { toast } from "@/components/ui/Toast";

interface CommandItem {
  id: string;
  title: string;
  category: "Pages" | "Quick Actions" | "System";
  icon: React.ReactNode;
  action: () => void;
}

export function CommandPalette() {
  const router = useRouter();
  const { isCommandMenuOpen, setCommandMenuOpen, addNote, addTask } = useStore();
  const [search, setSearch] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setCommandMenuOpen(!isCommandMenuOpen);
      }
      if (e.key === "Escape") {
        setCommandMenuOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isCommandMenuOpen, setCommandMenuOpen]);

  // Focus input when opened
  useEffect(() => {
    if (isCommandMenuOpen) {
      setSearch("");
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isCommandMenuOpen]);

  const items: CommandItem[] = [
    // Pages
    { id: "nav-dash", title: "Go to Dashboard", category: "Pages", icon: <Terminal className="h-4 w-4" />, action: () => router.push("/dashboard") },
    { id: "nav-proj", title: "Go to Projects Board", category: "Pages", icon: <Folder className="h-4 w-4" />, action: () => router.push("/projects") },
    { id: "nav-task", title: "Go to Tasks List", category: "Pages", icon: <ClipboardList className="h-4 w-4" />, action: () => router.push("/tasks") },
    { id: "nav-ai", title: "Open AI Mentor Chat", category: "Pages", icon: <Brain className="h-4 w-4" />, action: () => router.push("/ai-mentor") },
    { id: "nav-cal", title: "View Calendar Schedule", category: "Pages", icon: <Calendar className="h-4 w-4" />, action: () => router.push("/calendar") },
    { id: "nav-notes", title: "Open Markdown Notes", category: "Pages", icon: <FileText className="h-4 w-4" />, action: () => router.push("/notes") },
    { id: "nav-anal", title: "Check Productivity Analytics", category: "Pages", icon: <BarChart className="h-4 w-4" />, action: () => router.push("/analytics") },
    { id: "nav-set", title: "Open Settings Panel", category: "Pages", icon: <Settings className="h-4 w-4" />, action: () => router.push("/settings") },
    
    // Quick Actions
    {
      id: "qa-note",
      title: "Create New Quick Note",
      category: "Quick Actions",
      icon: <FileText className="h-4 w-4 text-accent-blue" />,
      action: () => {
        addNote({
          title: "Untitled Note",
          content: "# Untitled Note\n\nWrite something here...",
          folderId: null,
          tags: ["quick"],
          isPinned: false,
          isArchived: false,
          isTrash: false,
        });
        toast("Quick note created!", "success");
        router.push("/notes");
      },
    },
    {
      id: "qa-task",
      title: "Add New Task",
      category: "Quick Actions",
      icon: <ClipboardList className="h-4 w-4 text-accent-green" />,
      action: () => {
        addTask({
          title: "New task via Command Menu",
          description: "Enter details here.",
          status: "todo",
          priority: "medium",
          labels: ["inbound"],
          dueDate: new Date().toISOString().split("T")[0],
          isRecurring: false,
        });
        toast("Task added to Todo column!", "success");
        router.push("/tasks");
      },
    },
    
    // System Actions
    { id: "sys-prof", title: "View Profile", category: "System", icon: <User className="h-4 w-4" />, action: () => router.push("/profile") },
    { id: "sys-logout", title: "Sign Out of DevOS", category: "System", icon: <LogOut className="h-4 w-4 text-accent-red" />, action: () => {
        toast("Signed out successfully (simulation)", "info");
        router.push("/auth/login");
      }
    },
  ];

  const filteredItems = items.filter((item) =>
    item.title.toLowerCase().includes(search.toLowerCase())
  );

  const categories = ["Pages", "Quick Actions", "System"] as const;

  return (
    <AnimatePresence>
      {isCommandMenuOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center p-4 pt-[15vh]">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setCommandMenuOpen(false)}
            className="absolute inset-0 bg-background/95 backdrop-blur-xs cursor-pointer"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97, y: -10 }}
            transition={{ duration: 0.12 }}
            className="relative z-10 w-full max-w-xl rounded-md border border-border bg-card shadow-2xl flex flex-col max-h-[450px] overflow-hidden"
          >
            {/* Search Input */}
            <div className="flex items-center space-x-3 px-4 border-b border-border py-3">
              <Search className="h-4 w-4 text-muted shrink-0" />
              <input
                ref={inputRef}
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Type a command or search..."
                className="w-full bg-transparent border-0 text-sm text-foreground placeholder:text-muted/65 focus:outline-hidden focus:ring-0"
              />
              <span className="text-[10px] bg-border/40 text-muted px-2 py-0.5 rounded-sm font-semibold select-none border border-border">
                ESC
              </span>
            </div>

            {/* List Content */}
            <div className="flex-1 overflow-y-auto p-2 space-y-3">
              {filteredItems.length > 0 ? (
                categories.map((cat) => {
                  const catItems = filteredItems.filter((i) => i.category === cat);
                  if (catItems.length === 0) return null;
                  return (
                    <div key={cat} className="space-y-1">
                      <div className="text-[10px] font-semibold text-muted uppercase tracking-wider px-2 py-1 select-none">
                        {cat}
                      </div>
                      {catItems.map((item) => (
                        <button
                          key={item.id}
                          onClick={() => {
                            item.action();
                            setCommandMenuOpen(false);
                          }}
                          className="w-full flex items-center space-x-3 text-left text-xs text-foreground/80 hover:text-foreground hover:bg-border/30 rounded-sm px-2 py-2 transition-all cursor-pointer font-medium"
                        >
                          <span className="text-muted shrink-0">{item.icon}</span>
                          <span className="flex-1">{item.title}</span>
                          <span className="text-[10px] text-muted opacity-0 group-hover:opacity-100">
                            ↵ Enter
                          </span>
                        </button>
                      ))}
                    </div>
                  );
                })
              ) : (
                <div className="text-center py-6 text-xs text-muted">
                  No matching actions or commands found.
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="bg-border/10 border-t border-border px-4 py-2 flex items-center justify-between text-[10px] text-muted select-none">
              <span className="flex items-center space-x-1.5 font-medium">
                <span>↑↓ Navigate</span>
                <span>•</span>
                <span>↵ Select</span>
              </span>
              <span>DevOS Commander v1.0</span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

export default CommandPalette;
