import { TaskItem } from "@/types";

const mockTasks: TaskItem[] = [
  { id: "task-1", title: "Complete DevOS landing page animations", description: "Add Framer Motion scroll highlights to features and pricing sliders.", status: "in-progress", priority: "high", labels: ["design", "frontend"], dueDate: "2026-07-12", isRecurring: false, createdAt: "2026-07-11T09:00:00Z", updatedAt: "2026-07-11T12:00:00Z" },
  { id: "task-2", title: "Solve LeetCode daily problem", description: "Daily challenge: Binary Tree Maximum Path Sum (Hard).", status: "todo", priority: "medium", labels: ["algorithms"], dueDate: "2026-07-11", isRecurring: true, recurrenceRule: "daily", createdAt: "2026-07-11T08:00:00Z", updatedAt: "2026-07-11T08:00:00Z" },
  { id: "task-3", title: "Review Resume version 3", description: "Optimize tech achievements with numbers and metrics.", status: "todo", priority: "high", labels: ["career"], dueDate: "2026-07-13", isRecurring: false, createdAt: "2026-07-10T10:00:00Z", updatedAt: "2026-07-10T10:00:00Z" },
  { id: "task-4", title: "Integrate Job Tracker mock API", description: "Create mock JSON entries and test visual state pipelines.", status: "done", priority: "medium", labels: ["backend", "frontend"], dueDate: "2026-07-10", isRecurring: false, createdAt: "2026-07-09T09:00:00Z", updatedAt: "2026-07-10T16:00:00Z" }
];

export const tasksService = {
  getTasks: async (): Promise<TaskItem[]> => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(mockTasks), 250);
    });
  }
};
