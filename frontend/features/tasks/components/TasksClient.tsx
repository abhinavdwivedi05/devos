"use client";

import React, { useState, useMemo } from "react";
import { Plus, Calendar, AlertCircle } from "lucide-react";
import { useStore } from "@/store/useStore";
import { cn } from "@/utils/cn";
import { Card } from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Select from "@/components/ui/Select";
import Badge from "@/components/ui/Badge";
import Tabs from "@/components/ui/Tabs";
import { toast } from "@/components/ui/Toast";

// Import modular sub-components
import { TaskItemRow } from "./TaskItemRow";
import { CreateTaskDialog } from "./CreateTaskDialog";

export function TasksClient({ initialTasks }: { initialTasks: any[] }) {
  const { tasks, addTask, updateTask, deleteTask } = useStore();
  const [activeView, setActiveView] = useState("list");
  const [showTaskModal, setShowTaskModal] = useState(false);

  // Filters state
  const [statusFilter, setStatusFilter] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");
  const [search, setSearch] = useState("");

  // New task form fields
  const [taskTitle, setTaskTitle] = useState("");
  const [taskDesc, setTaskDesc] = useState("");
  const [taskPriority, setTaskPriority] = useState<"low" | "medium" | "high">("medium");
  const [taskDueDate, setTaskDueDate] = useState("");
  const [taskLabels, setTaskLabels] = useState("");
  const [taskRecurring, setTaskRecurring] = useState(false);
  const [taskRecurrenceRule, setTaskRecurrenceRule] = useState("daily");

  // Filter tasks list
  const filteredTasks = useMemo(() => {
    return tasks.filter((t) => {
      const matchesSearch =
        t.title.toLowerCase().includes(search.toLowerCase()) ||
        (t.description && t.description.toLowerCase().includes(search.toLowerCase()));
      
      const matchesStatus = statusFilter === "all" ? true : t.status === statusFilter;
      const matchesPriority = priorityFilter === "all" ? true : t.priority === priorityFilter;

      return matchesSearch && matchesStatus && matchesPriority;
    });
  }, [tasks, search, statusFilter, priorityFilter]);

  const handleCreateTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!taskTitle.trim()) return;

    addTask({
      title: taskTitle,
      description: taskDesc,
      status: "todo",
      priority: taskPriority,
      labels: taskLabels.split(",").map((l) => l.trim()).filter(Boolean),
      dueDate: taskDueDate || new Date().toISOString().split("T")[0],
      isRecurring: taskRecurring,
      recurrenceRule: taskRecurring ? taskRecurrenceRule : undefined,
    });

    // Reset fields
    setTaskTitle("");
    setTaskDesc("");
    setTaskPriority("medium");
    setTaskDueDate("");
    setTaskLabels("");
    setTaskRecurring(false);
    setShowTaskModal(false);

    toast("Task created successfully!", "success");
  };

  const handleToggleComplete = (id: string, currentStatus: string) => {
    const nextStatus = currentStatus === "done" ? "todo" : "done";
    updateTask(id, { status: nextStatus });
    toast(nextStatus === "done" ? "Task marked completed!" : "Task reopened", "info");
  };

  const viewTabs = [
    { id: "list", label: "Checklist View" },
    { id: "kanban", label: "Kanban Grid" },
  ];

  return (
    <div className="space-y-6 select-none">
      {/* Action Header & Filters bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border/40 pb-4">
        <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground flex items-center gap-2">
          <span>Workspace Task Manager</span>
        </h1>
        <Button variant="default" size="sm" onClick={() => setShowTaskModal(true)}>
          <Plus className="h-4 w-4 mr-1.5" />
          <span>Add Custom Task</span>
        </Button>
      </div>

      {/* Filter Options controls */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-3.5 bg-card/15 p-4 rounded-md border border-border/50 select-none">
        <div className="relative">
          <input
            type="text"
            placeholder="Search task items..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-card border border-border rounded-md px-3 py-1.5 text-xs text-foreground placeholder:text-muted/65 focus:outline-hidden focus:ring-1 focus:ring-accent-blue/50"
          />
        </div>

        <Select
          options={[
            { value: "all", label: "All Statuses" },
            { value: "todo", label: "Todo" },
            { value: "in-progress", label: "In Progress" },
            { value: "done", label: "Done" },
            { value: "backlog", label: "Backlog" },
          ]}
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="h-8 py-0.5 text-xs select-none"
        />

        <Select
          options={[
            { value: "all", label: "All Priorities" },
            { value: "high", label: "High" },
            { value: "medium", label: "Medium" },
            { value: "low", label: "Low" },
          ]}
          value={priorityFilter}
          onChange={(e) => setPriorityFilter(e.target.value)}
          className="h-8 py-0.5 text-xs select-none"
        />

        <div className="flex items-center justify-end select-none">
          <Tabs tabs={viewTabs} activeTab={activeView} onChange={setActiveView} variant="pill" />
        </div>
      </div>

      {/* List / Checklist View */}
      {activeView === "list" && (
        <Card className="border-border/60 select-none">
          <div className="divide-y divide-border/30">
            {filteredTasks.length > 0 ? (
              filteredTasks.map((t) => (
                <TaskItemRow
                  key={t.id}
                  task={t}
                  onToggleComplete={handleToggleComplete}
                  onDeleteTask={(id) => {
                    deleteTask(id);
                    toast("Task deleted", "info");
                  }}
                />
              ))
            ) : (
              <div className="p-8 text-center text-muted flex flex-col items-center justify-center space-y-2 select-none">
                <AlertCircle className="h-6 w-6 text-muted" />
                <p className="text-xs font-semibold">No tasks found matching criteria.</p>
              </div>
            )}
          </div>
        </Card>
      )}

      {/* Kanban Board View */}
      {activeView === "kanban" && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-start select-none">
          {(["backlog", "todo", "in-progress", "done"] as const).map((stage) => {
            const stageTasks = filteredTasks.filter((t) => t.status === stage);
            return (
              <div key={stage} className="bg-card/25 border border-border/60 p-4 rounded-md space-y-3.5">
                <div className="flex items-center justify-between text-xs font-bold border-b border-border/30 pb-2 mb-2 select-none">
                  <span className="capitalize text-foreground">
                    {stage === "in-progress" ? "In Progress" : stage}
                  </span>
                  <Badge variant="secondary" className="px-1.5 py-0 font-extrabold text-[10px]">
                    {stageTasks.length}
                  </Badge>
                </div>

                <div className="space-y-2 max-h-[500px] overflow-y-auto pr-1">
                  {stageTasks.map((t) => (
                    <div
                      key={t.id}
                      onClick={() => handleToggleComplete(t.id, t.status)}
                      className="bg-card border border-border hover:border-accent-blue/30 rounded-sm p-3 shadow-xs space-y-2 cursor-pointer transition-all hover:translate-y-[-1px]"
                    >
                      <div className="flex items-start justify-between min-w-0 gap-2">
                        <p className={cn("text-xs font-semibold leading-relaxed text-foreground truncate flex-1", t.status === "done" ? "line-through text-muted/65" : "")}>
                          {t.title}
                        </p>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            deleteTask(t.id);
                            toast("Task deleted", "info");
                          }}
                          className="text-muted hover:text-accent-red cursor-pointer shrink-0"
                          aria-label="Delete task card"
                        >
                          <TrashIcon className="h-3 w-3" />
                        </button>
                      </div>

                      <div className="flex items-center justify-between select-none">
                        <span className="text-[9px] font-bold text-muted flex items-center gap-1 select-none">
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
                          className="text-[8px] uppercase px-1 py-0 select-none"
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
      )}

      {/* Modal: Task Editor dialogue */}
      <CreateTaskDialog
        isOpen={showTaskModal}
        onClose={() => setShowTaskModal(false)}
        onSubmit={handleCreateTask}
        title={taskTitle}
        onChangeTitle={setTaskTitle}
        description={taskDesc}
        onChangeDescription={setTaskDesc}
        priority={taskPriority}
        onChangePriority={setTaskPriority}
        dueDate={taskDueDate}
        onChangeDueDate={setTaskDueDate}
        labels={taskLabels}
        onChangeLabels={setTaskLabels}
        isRecurring={taskRecurring}
        onToggleRecurring={setTaskRecurring}
        recurrenceRule={taskRecurrenceRule}
        onChangeRecurrenceRule={setTaskRecurrenceRule}
      />
    </div>
  );
}

// Inline trash icon local helper
function TrashIcon(props: React.SVGProps<SVGSVGElement>) {
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
      <path d="M3 6h18M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
    </svg>
  );
}

export default TasksClient;
