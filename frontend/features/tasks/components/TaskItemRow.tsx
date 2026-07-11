import React from "react";
import { CheckSquare, Square, Calendar, Trash } from "lucide-react";
import { cn } from "@/utils/cn";
import Badge from "@/components/ui/Badge";

interface TaskItemRowProps {
  task: any;
  onToggleComplete: (id: string, status: string) => void;
  onDeleteTask: (id: string) => void;
}

export function TaskItemRow({ task, onToggleComplete, onDeleteTask }: TaskItemRowProps) {
  return (
    <div className="flex items-start justify-between p-4 hover:bg-card/35 transition-all text-xs select-none">
      <div className="flex items-start space-x-3.5 min-w-0">
        <button
          onClick={() => onToggleComplete(task.id, task.status)}
          className="text-muted hover:text-foreground shrink-0 mt-0.5 cursor-pointer"
          aria-label={task.status === "done" ? "Mark incomplete" : "Mark complete"}
        >
          {task.status === "done" ? (
            <CheckSquare className="h-4.5 w-4.5 text-accent-blue" />
          ) : (
            <Square className="h-4.5 w-4.5" />
          )}
        </button>

        <div className="min-w-0 space-y-1">
          <p
            className={cn(
              "font-semibold text-foreground truncate max-w-sm sm:max-w-md",
              task.status === "done" ? "line-through text-muted/65" : ""
            )}
          >
            {task.title}
          </p>
          {task.description && (
            <p className="text-[10px] text-muted leading-relaxed truncate max-w-xs sm:max-w-sm font-medium">
              {task.description}
            </p>
          )}
          <div className="flex items-center flex-wrap gap-1.5 pt-1 select-none">
            <Badge
              variant={
                task.priority === "high"
                  ? "danger"
                  : task.priority === "medium"
                  ? "warning"
                  : "secondary"
              }
              className="text-[8px] uppercase px-1 py-0"
            >
              {task.priority}
            </Badge>
            {task.dueDate && (
              <span className="text-[9px] text-muted font-bold flex items-center gap-1 select-none">
                <Calendar className="h-3 w-3" />
                <span>{task.dueDate}</span>
              </span>
            )}
            {task.isRecurring && (
              <Badge variant="purple" className="text-[8px] uppercase px-1 py-0 select-none">
                🔁 {task.recurrenceRule}
              </Badge>
            )}
            {task.labels.map((l: string) => (
              <Badge key={l} variant="outline" className="text-[8px] px-1 py-0">
                {l}
              </Badge>
            ))}
          </div>
        </div>
      </div>

      <button
        onClick={() => onDeleteTask(task.id)}
        className="text-muted hover:text-accent-red cursor-pointer p-1"
        aria-label="Delete task"
      >
        <Trash className="h-3.5 w-3.5" />
      </button>
    </div>
  );
}
