"use client";

import React, { useState, useMemo } from "react";
import { BookOpen, Plus, Trash, Search, Calendar, Smile, AlertCircle, Award } from "lucide-react";
import { useStore } from "@/store/useStore";
import { cn } from "@/utils/cn";
import { Card, CardContent } from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";
import Badge from "@/components/ui/Badge";
import { toast } from "@/components/ui/Toast";
import { MoodType } from "@/types";

export function JournalClient({ initialEntries }: { initialEntries: any[] }) {
  const { journalEntries, addJournalEntry, updateJournalEntry, deleteJournalEntry } = useStore();
  const [selectedEntryId, setSelectedEntryId] = useState<string | null>(null);
  
  // Filters
  const [search, setSearch] = useState("");
  const [moodFilter, setMoodFilter] = useState("all");

  // Form local states
  const [content, setContent] = useState("");
  const [mood, setMood] = useState<MoodType>("focused");
  const [prodScore, setProdScore] = useState(8);
  const [entryDate, setEntryDate] = useState("");

  const filteredEntries = useMemo(() => {
    return journalEntries.filter((j) => {
      const matchesSearch = j.content.toLowerCase().includes(search.toLowerCase());
      const matchesMood = moodFilter === "all" ? true : j.mood === moodFilter;
      return matchesSearch && matchesMood;
    });
  }, [journalEntries, search, moodFilter]);

  const selectedEntry = useMemo(() => {
    const entry = journalEntries.find((e) => e.id === selectedEntryId) || null;
    if (entry) {
      setContent(entry.content);
      setMood(entry.mood);
      setProdScore(entry.productivityScore);
    }
    return entry;
  }, [journalEntries, selectedEntryId]);

  const handleCreateEntry = () => {
    const today = new Date().toISOString().split("T")[0];
    const exists = journalEntries.find((j) => j.date === today);
    if (exists) {
      setSelectedEntryId(exists.id);
      toast("Today's journal entry already initialized!", "info");
      return;
    }

    addJournalEntry({
      date: today,
      content: "Write today's coding reflections...",
      mood: "focused",
      productivityScore: 8,
      tags: ["daily"],
    });

    toast("Today's journal initialized!", "success");
  };

  const handleSaveEntry = () => {
    if (!selectedEntryId) return;
    updateJournalEntry(selectedEntryId, {
      content,
      mood,
      productivityScore: prodScore,
    });
    toast("Journal entry saved successfully!", "success");
  };

  const getMoodEmoji = (m: MoodType) => {
    switch (m) {
      case "focused": return "🧠";
      case "productive": return "⚡";
      case "motivated": return "🎯";
      case "tired": return "🥱";
      case "frustrated": return "🤯";
      default: return "📝";
    }
  };

  return (
    <div className="h-[calc(100vh-100px)] flex border border-border rounded-md bg-[#0d1117] overflow-hidden select-none">
      {/* Entries search list - left column */}
      <div className="w-80 border-r border-border bg-card/25 flex flex-col shrink-0">
        <div className="p-4 border-b border-border/60 flex items-center space-x-2">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-muted/65" />
            <input
              type="text"
              placeholder="Search entries..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-card border border-border rounded-md pl-8 pr-3 py-1.5 text-xs text-foreground placeholder:text-muted/60 focus:outline-hidden focus:ring-1 focus:ring-accent-blue/50"
            />
          </div>
          <Button variant="secondary" size="icon" className="h-7 w-7 rounded-md shrink-0" onClick={handleCreateEntry} aria-label="Add journal entry">
            <Plus className="h-3.5 w-3.5" />
          </Button>
        </div>

        <div className="flex-1 overflow-y-auto p-2 space-y-1">
          {filteredEntries.map((e) => (
            <button
              key={e.id}
              onClick={() => setSelectedEntryId(e.id)}
              className={cn(
                "w-full flex flex-col text-left p-3 rounded-sm transition-all cursor-pointer space-y-1.5 border border-transparent",
                selectedEntryId === e.id
                  ? "bg-border/60 border-border text-foreground font-extrabold"
                  : "hover:bg-card/45 hover:text-foreground"
              )}
            >
              <div className="flex items-center justify-between w-full">
                <span className="text-xs font-bold text-foreground flex items-center gap-1.5">
                  <Calendar className="h-3.5 w-3.5 text-muted" />
                  <span>{e.date}</span>
                </span>
                <span className="text-xs" title={e.mood}>{getMoodEmoji(e.mood)}</span>
              </div>
              <p className="text-[10px] text-muted truncate font-semibold leading-relaxed">
                {e.content.replace(/[#*`_-]/g, "")}
              </p>
            </button>
          ))}
          {filteredEntries.length === 0 && (
            <p className="text-center py-8 text-muted text-[10px] select-none">No journal logs logged.</p>
          )}
        </div>
      </div>

      {/* Editor Details area - right column */}
      <div className="flex-1 flex flex-col bg-[#0d1117] overflow-hidden">
        {selectedEntry ? (
          <div className="flex-1 flex flex-col overflow-hidden">
            {/* Header info */}
            <div className="px-6 py-4 border-b border-border/40 flex items-center justify-between bg-card/10 select-none">
              <div className="flex items-center space-x-3 text-sm">
                <span className="font-extrabold text-foreground">Coding Log: {selectedEntry.date}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 rounded-md text-muted hover:text-accent-red"
                  onClick={() => {
                    deleteJournalEntry(selectedEntry.id);
                    setSelectedEntryId(null);
                    toast("Journal entry cleared", "info");
                  }}
                  aria-label="Delete entry"
                >
                  <Trash className="h-4 w-4" />
                </Button>
                <Button variant="default" size="sm" className="h-8 text-[11px]" onClick={handleSaveEntry}>
                  Save Reflections
                </Button>
              </div>
            </div>

            {/* Inputs Panel details */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {/* Mood selector & Productivity sliders */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-card/30 border border-border p-4 rounded-md select-none">
                {/* Mood Selector matrix */}
                <div className="space-y-2">
                  <span className="text-xs font-bold text-muted flex items-center gap-1">
                    <Smile className="h-4 w-4" />
                    <span>State Mood reflection</span>
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {(["focused", "productive", "motivated", "tired", "frustrated"] as MoodType[]).map((m) => (
                      <button
                        key={m}
                        type="button"
                        onClick={() => setMood(m)}
                        className={cn("px-2.5 py-1 text-[10px] font-bold border rounded-full transition-all cursor-pointer", {
                          "bg-accent-blue/10 border-accent-blue/40 text-accent-blue font-extrabold": mood === m,
                          "bg-card border-border text-muted hover:text-foreground": mood !== m,
                        })}
                      >
                        {getMoodEmoji(m)} {m}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Productivity Slider */}
                <div className="space-y-2">
                  <span className="text-xs font-bold text-muted flex items-center justify-between pr-2">
                    <span className="flex items-center gap-1">
                      <Award className="h-4 w-4" />
                      <span>Productivity Rating</span>
                    </span>
                    <span className="font-extrabold text-foreground">{prodScore} / 10</span>
                  </span>
                  <input
                    type="range"
                    min="1"
                    max="10"
                    value={prodScore}
                    onChange={(e) => setProdScore(parseInt(e.target.value))}
                    className="w-full accent-accent-blue h-1 bg-border rounded-full appearance-none cursor-pointer"
                  />
                </div>
              </div>

              {/* Text content details */}
              <div className="flex-1 min-h-[220px]">
                <textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Review achievements, bottlenecks, solved algorithms, and code strategies for today..."
                  className="w-full h-full min-h-[220px] bg-transparent border-0 text-xs sm:text-sm text-foreground focus:outline-hidden focus:ring-0 font-mono leading-relaxed resize-none"
                />
              </div>
            </div>
          </div>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center p-6 text-center select-none space-y-3">
            <BookOpen className="h-8 w-8 text-muted" />
            <h3 className="text-sm font-bold text-foreground">Notebook Scratchpad</h3>
            <p className="text-[10px] text-muted max-w-xs leading-relaxed font-semibold">
              Log today&apos;s developer diary entry to track performance ratios and focus indicators.
            </p>
            <Button variant="default" size="sm" onClick={handleCreateEntry}>
              Log Today&apos;s Entry
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

export default JournalClient;
