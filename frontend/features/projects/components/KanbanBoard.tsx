import React from "react";
import { Trash, Calendar } from "lucide-react";
import Badge from "@/components/ui/Badge";

interface KanbanBoardProps {
  activeProject: any;
  onToggleStatus: (id: string, status: string) => void;
  onDeleteTask: (projectId: string, taskId: string) => void;
}

export function KanbanBoard({ activeProject, onToggleStatus, onDeleteTask }: KanbanBoardProps) {
  const stages = ["todo", "in-progress", "review", "done"] as const;

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-start select-none">
      {stages.map((stage) => {
        const stageTasks = activeProject.tasks.filter((t: any) => t.status === stage);
        return (
          <div key={stage} className="space-y-3 bg-card/25 border border-border/60 p-4 rounded-md">
            <div className="flex items-center justify-between text-xs font-bold border-b border-border/30 pb-2 mb-3">
              <span className="capitalize text-foreground select-none">
                {stage === "in-progress" ? "In Progress" : stage}
              </span>
              <Badge variant="secondary" className="px-1.5 py-0 font-extrabold text-[10px]">
                {stageTasks.length}
              </Badge>
            </div>

            <div className="space-y-2.5 max-h-[500px] overflow-y-auto pr-1">
              {stageTasks.map((t: any) => (
                <div
                  key={t.id}
                  onClick={() => onToggleStatus(t.id, t.status)}
                  className="bg-card border border-border hover:border-accent-blue/30 rounded-sm p-3 shadow-xs space-y-2 cursor-pointer transition-all hover:translate-y-[-1px]"
                >
                  <div className="flex items-start justify-between">
                    <h4 className="text-xs font-semibold text-foreground leading-snug line-clamp-2">
                      {t.title}
                    </h4>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onDeleteTask(activeProject.id, t.id);
                      }}
                      className="text-muted hover:text-accent-red cursor-pointer p-0.5"
                      aria-label="Delete task"
                    >
                      <Trash className="h-3 w-3" />
                    </button>
                  </div>
                  <div className="flex items-center justify-between select-none">
                    <span className="text-[9px] font-bold text-muted flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      <span>{t.dueDate}</span>
                    </span>
                    <Badge
                      variant={
                        t.priority === "high"
                          ? "danger"
                          : t.priority === "medium"
                          ? "warning"
                          : "secondary"
                      }
                      className="text-[8px] uppercase px-1 py-0"
                    >
                      {t.priority}
                    </Badge>
                  </div>
                </div>
              ))}
              {stageTasks.length === 0 && (
                <p className="text-center py-6 text-[10px] text-muted select-none">Empty stage</p>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
