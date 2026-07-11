import React from "react";
import { Card } from "@/components/ui/Card";

interface ProjectTimelineProps {
  activeProject: any;
}

export function ProjectTimeline({ activeProject }: ProjectTimelineProps) {
  return (
    <Card className="border-border/60 p-5 space-y-6">
      <div className="space-y-4">
        {activeProject.tasks.map((t: any) => (
          <div key={t.id} className="flex items-center text-xs">
            <span className="w-36 font-semibold text-foreground truncate select-none">{t.title}</span>
            <div className="flex-1 bg-border/20 rounded-md h-5 relative overflow-hidden select-none">
              {/* Simulated timeline offset width */}
              <div
                className="bg-accent-blue/20 border border-accent-blue/35 h-full rounded-md absolute flex items-center px-2 text-[9px] font-bold text-accent-blue"
                style={{
                  left: t.status === "done" ? "40%" : t.status === "review" ? "25%" : "10%",
                  width: t.status === "done" ? "60%" : t.status === "review" ? "40%" : "30%",
                }}
              >
                {t.dueDate}
              </div>
            </div>
          </div>
        ))}
        {activeProject.tasks.length === 0 && (
          <p className="text-center py-8 text-muted">No task timelines available.</p>
        )}
      </div>
    </Card>
  );
}
