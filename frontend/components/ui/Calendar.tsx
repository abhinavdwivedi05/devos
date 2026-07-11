"use client";

import React, { useState, useMemo } from "react";
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, CheckSquare, Briefcase, Plus, AlertCircle, Clock } from "lucide-react";
import { useStore } from "@/store/useStore";
import { cn } from "@/utils/cn";
import { Card, CardContent } from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import Tabs from "@/components/ui/Tabs";
import { toast } from "@/components/ui/Toast";

interface CalendarEvent {
  id: string;
  title: string;
  date: string; // YYYY-MM-DD
  type: "task" | "interview" | "personal";
  color: string;
}

export function CalendarClient() {
  const { tasks, interviews } = useStore();
  const [currentView, setCurrentView] = useState("month");
  const [selectedDate, setSelectedDate] = useState("2026-07-11");

  // Merge tasks and interviews into calendar events.
  // Standardize dates to YYYY-MM-DD for matching
  const events = useMemo((): CalendarEvent[] => {
    const calendarEvents: CalendarEvent[] = [];

    tasks.forEach((t) => {
      if (t.dueDate) {
        calendarEvents.push({
          id: `t-${t.id}`,
          title: t.title,
          date: t.dueDate,
          type: "task",
          color: t.priority === "high" ? "#f85149" : "#58a6ff",
        });
      }
    });

    interviews.forEach((i) => {
      if (i.date) {
        calendarEvents.push({
          id: `i-${i.id}`,
          title: `${i.company} Interview (${i.type})`,
          date: i.date,
          type: "interview",
          color: "#3fb950",
        });
      }
    });

    return calendarEvents;
  }, [tasks, interviews]);

  // July 2026 calendar helper grid.
  // July 2026 starts on Wednesday, June has 30 days, July has 31 days.
  const daysInMonth = useMemo(() => {
    const arr = [];
    // June filler blocks (starts on Wed July 1, so 3 filler blocks from June: 28, 29, 30)
    arr.push({ day: 28, dateStr: "2026-06-28", isCurrentMonth: false });
    arr.push({ day: 29, dateStr: "2026-06-29", isCurrentMonth: false });
    arr.push({ day: 30, dateStr: "2026-06-30", isCurrentMonth: false });
    
    // July days
    for (let i = 1; i <= 31; i++) {
      const dayStr = i < 10 ? `0${i}` : `${i}`;
      arr.push({
        day: i,
        dateStr: `2026-07-${dayStr}`,
        isCurrentMonth: true,
      });
    }

    // August filler blocks (to fill a standard grid of 35 or 42 blocks: we have 3 + 31 = 34. Need 8 to make 42)
    for (let i = 1; i <= 8; i++) {
      arr.push({
        day: i,
        dateStr: `2026-08-0${i}`,
        isCurrentMonth: false,
      });
    }
    return arr;
  }, []);

  const selectedDateEvents = useMemo(() => {
    return events.filter((e) => e.date === selectedDate);
  }, [events, selectedDate]);

  const viewTabs = [
    { id: "month", label: "Month View" },
    { id: "week", label: "Week View" },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 select-none h-[calc(100vh-100px)] overflow-hidden">
      {/* Month / Week Grid - Left 3 columns */}
      <div className="lg:col-span-3 flex flex-col justify-between border border-border rounded-md bg-card/10 overflow-hidden">
        {/* Toolbar Header */}
        <div className="px-5 py-3.5 border-b border-border/40 flex items-center justify-between bg-card/20 select-none">
          <div className="flex items-center space-x-4">
            <span className="font-extrabold text-xs sm:text-sm text-foreground">July 2026</span>
            <div className="flex bg-card border border-border p-0.5 rounded-md">
              <button
                onClick={() => setSelectedDate("2026-07-11")}
                className="px-2 py-1 text-[10px] font-bold text-muted hover:text-foreground cursor-pointer"
                aria-label="Navigate to today"
              >
                Today
              </button>
            </div>
          </div>
          <Tabs tabs={viewTabs} activeTab={currentView} onChange={setCurrentView} variant="pill" />
        </div>

        {/* Calendar days grid */}
        <div className="flex-1 grid grid-cols-7 border-b border-border/40 font-semibold select-none text-muted text-[10px] uppercase text-center bg-card/5 py-2.5">
          <span>Sun</span>
          <span>Mon</span>
          <span>Tue</span>
          <span>Wed</span>
          <span>Thu</span>
          <span>Fri</span>
          <span>Sat</span>
        </div>

        <div className="flex-[8] grid grid-cols-7 grid-rows-6 divide-x divide-y divide-border/20">
          {daysInMonth.map((d, idx) => {
            const isSelected = selectedDate === d.dateStr;
            const dayEvents = events.filter((e) => e.date === d.dateStr).slice(0, 2);
            return (
              <div
                key={idx}
                onClick={() => setSelectedDate(d.dateStr)}
                className={cn(
                  "p-2 flex flex-col justify-between cursor-pointer transition-all hover:bg-card/30 relative text-xs min-h-[70px]",
                  d.isCurrentMonth ? "text-foreground" : "text-muted/40",
                  isSelected ? "bg-accent-blue/5 border border-accent-blue/40" : ""
                )}
              >
                <div className="flex justify-between w-full select-none">
                  <span className={cn("font-bold text-[11px]", isSelected ? "text-accent-blue font-black" : "")}>
                    {d.day}
                  </span>
                  {isSelected && (
                    <span className="absolute top-1.5 right-1.5 h-1.5 w-1.5 bg-accent-blue rounded-full" />
                  )}
                </div>

                <div className="space-y-1 mt-1 truncate select-none">
                  {dayEvents.map((evt) => (
                    <div
                      key={evt.id}
                      className="text-[8px] font-bold px-1 py-0.5 rounded-xs truncate border border-transparent select-none leading-none"
                      style={{
                        backgroundColor: `${evt.color}15`,
                        color: evt.color,
                        borderColor: `${evt.color}35`,
                      }}
                    >
                      {evt.title}
                    </div>
                  ))}
                  {events.filter((e) => e.date === d.dateStr).length > 2 && (
                    <span className="text-[7px] text-muted font-bold select-none block text-right pr-1">
                      +{events.filter((e) => e.date === d.dateStr).length - 2} more
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Side Agenda Panel - Right 1 column */}
      <div className="border border-border rounded-md bg-card/25 p-5 flex flex-col overflow-hidden">
        <h3 className="text-xs font-bold text-muted uppercase tracking-wider border-b border-border/40 pb-2 mb-4 select-none flex items-center gap-1.5">
          <CalendarIcon className="h-4 w-4 text-accent-blue" />
          <span>Agenda Details</span>
        </h3>

        <div className="flex-1 overflow-y-auto space-y-4">
          <div className="text-xs font-bold text-foreground pb-1 border-b border-border/20 select-none">
            Date: {selectedDate}
          </div>

          <div className="space-y-3">
            {selectedDateEvents.length > 0 ? (
              selectedDateEvents.map((evt) => (
                <div
                  key={evt.id}
                  className="bg-card border border-border/60 p-3 rounded-md flex items-start space-x-2.5 text-xs"
                >
                  <span className="mt-0.5 shrink-0">
                    {evt.type === "task" ? (
                      <CheckSquare className="h-4 w-4 text-accent-blue" />
                    ) : (
                      <Briefcase className="h-4 w-4 text-accent-green" />
                    )}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-foreground truncate select-all">{evt.title}</p>
                    <p className="text-[9px] text-muted font-semibold mt-1 flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      <span>Scheduled for today</span>
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <div className="py-8 text-center text-[10px] text-muted select-none flex flex-col items-center justify-center space-y-1">
                <AlertCircle className="h-5 w-5 text-muted" />
                <p className="font-semibold">No scheduled events or tasks due on this date.</p>
              </div>
            )}
          </div>
        </div>

        <div className="pt-4 border-t border-border/40">
          <Button
            variant="secondary"
            size="sm"
            className="w-full text-xs font-bold py-2"
            onClick={() => {
              toast("Double click date in calendar grid to add custom logs (simulation)", "info");
            }}
          >
            <Plus className="h-3.5 w-3.5 mr-1" />
            <span>Create Calendar Event</span>
          </Button>
        </div>
      </div>
    </div>
  );
}

export default CalendarClient;
