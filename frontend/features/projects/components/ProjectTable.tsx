import React from "react";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";

interface ProjectTableProps {
  activeProject: any;
  onDeleteTask: (projectId: string, taskId: string) => void;
}

export function ProjectTable({ activeProject, onDeleteTask }: ProjectTableProps) {
  return (
    <Card className="border-border/60 overflow-x-auto select-none">
      <table className="w-full text-xs text-left">
        <thead className="bg-border/10 text-muted uppercase text-[10px] font-bold border-b border-border/40 select-none">
          <tr>
            <th className="px-5 py-3">Task Title</th>
            <th className="px-5 py-3">Stage</th>
            <th className="px-5 py-3">Priority</th>
            <th className="px-5 py-3">Due Date</th>
            <th className="px-5 py-3 text-right">Action</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border/30 font-medium">
          {activeProject.tasks.map((t: any) => (
            <tr key={t.id} className="hover:bg-card/40 transition-colors">
              <td className="px-5 py-3.5 text-foreground font-semibold">{t.title}</td>
              <td className="px-5 py-3.5 capitalize">{t.status}</td>
              <td className="px-5 py-3.5">
                <Badge variant={t.priority === "high" ? "danger" : t.priority === "medium" ? "warning" : "secondary"}>
                  {t.priority}
                </Badge>
              </td>
              <td className="px-5 py-3.5 text-muted">{t.dueDate}</td>
              <td className="px-5 py-3.5 text-right">
                <button
                  onClick={() => onDeleteTask(activeProject.id, t.id)}
                  className="text-muted hover:text-accent-red cursor-pointer"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
          {activeProject.tasks.length === 0 && (
            <tr>
              <td colSpan={5} className="text-center py-8 text-muted">No tasks added to this project.</td>
            </tr>
          )}
        </tbody>
      </table>
    </Card>
  );
}
